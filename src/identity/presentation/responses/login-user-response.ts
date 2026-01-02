import type { UserResponse } from "./register-user-response";

export interface LoginUserResponse {
    token: string;
    user: UserResponse;
}
