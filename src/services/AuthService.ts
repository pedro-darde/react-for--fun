import { BaseService } from "./BaseService";

export class AuthService extends BaseService<{}> {
    constructor() {
        super("auth")
    }
}