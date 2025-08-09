import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserType } from "../interfaces/active-user.interface";


export const ActiveUser = createParamDecorator((data: keyof ActiveUserType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user: ActiveUserType =  request.user;

    return data ? user?.[data] : user;
})