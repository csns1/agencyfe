export class SignUpInfo {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    email: string;
    role: {name:string};
    password: string;
    address:string

    constructor(name: string, username: string, email: string, password: string,firstName: string,lastName:string,phone:string,address:string) {
        this.firstName = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = {name:'KLIENT'};
        this.lastName=lastName;
        this.firstName=firstName;
        this.phone=phone;
        this.address=address;
    }
}
