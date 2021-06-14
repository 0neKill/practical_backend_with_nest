import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exeptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    console.log(obj);
    const errors = await validate(obj);
    if (errors.length) {
      let message = errors.map(item=>{
        return `${item.property}  -${Object.values(item.constraints).join(', ')}`
      })
      throw new ValidationException(message);
    }
    return value;
  }

}