import type { LoginResultType } from "@/types/auth";
import request from "@/utils/request";

export const loginAPI = (data: { username: string; password: string }) => {
	return request<LoginResultType>({
		method: "POST",
		url: "user/login",
		data,
		needLoading: true
	});
};
export const sendEmailAPI = (data: { address: string }) => {
	return request<null>({
		method: "POST",
		url: "user/register/captcha",
		data,
		needLoading: true
	});
};

export const registerAPI = (data: { username: string; password: string; email: string; captcha: string }) => {
	return request<null>({
		method: "POST",
		url: "user/register",
		data,
		needLoading: true
	});
};
