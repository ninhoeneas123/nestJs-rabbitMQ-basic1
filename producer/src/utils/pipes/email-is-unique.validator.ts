import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Model } from "mongoose";
import { UsersService } from "src/users/users.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(
        private usersService: UsersService,
    ) { }
    async validate(email: string, args: ValidationArguments) {
        console.log(email)
        const user = await this.usersService.getByEmail(email)
        console.log(user)
        if (user) {
            return true
        }
    }
}
export function EmailIsUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailIsUniqueConstraint,
        });
    };
}