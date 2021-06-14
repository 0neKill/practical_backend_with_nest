import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest(); //Достаем запрос (request) как middleware
    try {
      const tokenHeader = req.headers.authorization.split(" ");
      if (tokenHeader[0] !== "Bearer" || !tokenHeader[1]) {
        throw  new UnauthorizedException({ message: "пользоваетль не авторизован" });
      }
      req.user = this.jwtService.verify(tokenHeader[1]);
      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "пользоваетль не авторизован" });
    }

  }

}