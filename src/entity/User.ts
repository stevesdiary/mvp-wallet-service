const { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString } = require("class-validator");

class User {
    id: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    userType: string;

    @IsAlphanumeric()
    password: string;

    @IsNumber()
    balance: number;

    @IsNotEmpty()
    accountNumber: string;

    userRepository: any; // Specify type if possible
}

module.exports = User;
