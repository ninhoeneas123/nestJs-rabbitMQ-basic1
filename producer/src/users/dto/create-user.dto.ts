import { IsEmail, IsString } from "class-validator";
import { EmailIsUnique } from "src/utils/pipes/email-is-unique.validator";
import { PasswordIsValid } from "src/utils/pipes/password-validation.validator";

export class CreateUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @PasswordIsValid({message: "A senha deve conter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial."})
    password: string;

}
