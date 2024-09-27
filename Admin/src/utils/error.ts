import { AuthError } from "next-auth";

export class CustomError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();
    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Your email or password is incorrect";
}
export class UnactiveAccountError extends AuthError {
  static type = "Account is not active";
}
