export class User {

  constructor(id: number, name: string, email: string, password: string, balance: number, admin: boolean) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.balance = balance;
    this.admin = admin;
  }

  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  admin: boolean;
}
