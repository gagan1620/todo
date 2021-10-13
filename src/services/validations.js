import checkemail from "./checkemail";
import checkpassword from "./checkpassword";

export default class validations {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }
  checkvalidations() {
    let errors = [];
    if (!checkemail.checkEmail(this.email)) {
      errors["email"] = "Invalid Email";
    }
    if (!checkpassword.checkPassword(this.password, 6)) {
      errors["password"] = "password must be of 6 characters";
    }
    return errors;
  }
  static getErrorMessageFromCode(errorcode) {
    switch (errorcode) {
      case "EMAIL_EXISTS":
        return "Email Already Exists";
      case "EMAIL_NOT_FOUND":
        return "Email Not Found";
      case "INVALID_PASSWORD":
        return "Invalid Password";
      default:
        return "Please Try Again";
    }
  }
}
