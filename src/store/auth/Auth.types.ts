import { AuthResponseData } from "types/auth.types";


export interface AuthState {
	isLoggedIn: boolean;
	data: Omit<AuthResponseData, "key" | "secret"> | null;
}
