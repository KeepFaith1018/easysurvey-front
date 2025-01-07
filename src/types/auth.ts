export interface UserInfo {
	id: number;
	username: string;
	email: string;
	avatar: string;
}
export interface LoginResultType {
	token: string;
	user: UserInfo;
}
