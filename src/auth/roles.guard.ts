import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  private jwtService: JwtService;
  private reflector: Reflector;

  constructor(jwtService: JwtService, reflector: Reflector) {
    this.jwtService = jwtService;
    this.reflector = reflector;
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Array<string>>(ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]);
      console.log(requiredRoles);
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest(); //Достаем запрос (request) как middleware
      const tokenHeader = req.headers.authorization.split(" ");
      if (tokenHeader[0] !== "Bearer" || !tokenHeader[1]) {
        throw  new UnauthorizedException({ message: "пользоваетль не авторизован" });
      }

      const user = this.jwtService.verify(tokenHeader[1]);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new HttpException({ message: "Нет доступа" },HttpStatus.FORBIDDEN);
    }

  }

}