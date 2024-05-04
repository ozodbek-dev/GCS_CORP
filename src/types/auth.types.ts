export interface AuthResponseData {
	id: number;
	name: string;
	email: string;
	key: string;
	secret: string;
}
export interface AuthResponseType {
	data: AuthResponseData;
	isOk: boolean;
	message: string;
}
