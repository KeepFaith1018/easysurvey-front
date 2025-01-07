<script setup lang="ts">
import { reactive, ref } from "vue";
import type {} from "element-plus";

import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { loginAPI, registerAPI, sendEmailAPI } from "@/api/auth";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const router = useRouter();
// 页面控制
const isLogin = ref(true);
// 登录功能
const loginData = reactive({
	username: "",
	password: ""
});
const loginFormRef = ref<FormInstance>();
const loginRules = reactive<FormRules<typeof loginData>>({
	username: [
		{ required: true, message: "请填入用户名", trigger: "blur" },
		{ min: 2, max: 10, message: "长度为2~10位", trigger: "blur" }
	],
	password: [
		{ required: true, message: "请填入密码", trigger: "blur" },
		{ min: 6, max: 16, message: "长度为6~16位", trigger: "blur" }
	]
});
// 登录处理
const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		ElMessage({
			message: "异常错误，请刷新重试！",
			type: "error",
			duration: 2000
		});
		return;
	}
	// 校验表单
	await formEl.validate(async (valid) => {
		if (valid) {
			const res = await loginAPI(loginData);
			if (res.code != 200) {
				ElMessage({
					message: res.msg,
					type: "error",
					duration: 2000
				});
				return;
			}
			const { token, user } = res.data;
			userStore.setLoginInfo(token, user);
			ElMessage({
				showClose: true,
				message: "登录成功!",
				type: "success",
				duration: 2000
			});
			router.push({ path: "/" });
		} else {
			ElMessage({
				message: "请修改信息后，在提交！",
				type: "warning",
				duration: 2000
			});
		}
	});
};

// 注册功能
const registerData = reactive({
	username: "",
	password: "",
	rePassword: "",
	email: "",
	captcha: ""
});
const registerFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
	if (value === "") {
		callback(new Error("密码不能为空"));
	} else if (value.length < 6 || value.length > 16) {
		callback(new Error("密码位数为6~16位"));
	} else {
		if (registerData.rePassword !== "") {
			if (!registerFormRef.value) return;
			registerFormRef.value.validateField("password");
		}
		callback();
	}
};
const validatePass2 = (rule: any, value: any, callback: any) => {
	if (value === "") {
		callback(new Error("密码不能为空"));
	} else if (value !== registerData.password) {
		callback(new Error("两次密码不一致"));
	} else {
		if (!registerFormRef.value) return;
		registerFormRef.value.validateField("rePassword");
		callback();
	}
};
const validateUserName = (rule: any, value: any, callback: any) => {
	console.log("经过校验了");
	if (value === "") {
		callback(new Error("用户名不能为空"));
	} else if (value.length < 2 && value.length > 10) {
		callback(new Error("密码位数为2~10位"));
	} else {
		if (!registerFormRef.value) return;
		registerFormRef.value.validateField("username");
		callback();
	}
};
const validateEmail = (rule: any, value: any, callback: any) => {
	const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
	if (value === "") {
		callback(new Error("邮箱不能为空"));
	} else if (!emailReg.test(value)) {
		callback(new Error("无效的邮箱"));
	} else {
		if (!registerFormRef.value) return;
		registerFormRef.value.validateField("email");
		callback();
	}
};
const registerRules = reactive<FormRules<typeof registerData>>({
	username: [{ validator: validateUserName, trigger: "blur" }],
	password: [{ validator: validatePass, trigger: "blur" }],
	rePassword: [{ validator: validatePass2, trigger: "blur" }],
	email: [{ validator: validateEmail, trigger: "blur" }]
});
// 注册
const onRegister = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		ElMessage({
			message: "异常错误，请刷新重试！",
			type: "error",
			duration: 2000
		});
		return;
	}
	// 校验表单
	await formEl.validate(async (valid) => {
		if (registerData.captcha === "") {
			ElMessage({
				message: "验证码不能为空",
				type: "warning",
				duration: 2000
			});
			return;
		}
		const { username, password, email, captcha } = registerData;
		const data = {
			username,
			password,
			email,
			captcha
		};
		if (valid) {
			const res = await registerAPI(data);
			if (res.code != 200) {
				ElMessage({
					message: res.msg,
					type: "error",
					duration: 5000
				});
				return;
			}
			ElMessage({
				showClose: true,
				message: "注册成功!",
				type: "success",
				duration: 2000
			});
			isLogin.value = true;
		} else {
			ElMessage({
				message: "请修改信息后，在发送！",
				type: "warning",
				duration: 2000
			});
		}
	});
};
const sendLoading = ref(false);
const sendCode = ref<string>("获取验证码");
// 发送验证码
const onSendEmail = async (formEl: FormInstance | undefined) => {
	if (!formEl) {
		ElMessage({
			message: "异常错误，请刷新重试！",
			type: "error",
			duration: 2000
		});
		return;
	}
	// 校验表单
	await formEl.validate(async (valid) => {
		if (valid) {
			const res = await sendEmailAPI({ address: registerData.email });
			if (res.code != 200) {
				ElMessage({
					message: res.msg,
					type: "error",
					duration: 5000
				});
				return;
			}
			ElMessage({
				showClose: true,
				message: "发送成功!",
				type: "success",
				duration: 2000
			});
			// 开启验证码loading
			sendLoading.value = true;
			let num = 60;
			let timer = null;
			timer = setInterval(() => {
				sendCode.value = num + "";
				num--;
			}, 1000);
			setTimeout(() => {
				clearInterval(timer);
				sendLoading.value = false;
				sendCode.value = "获取验证码";
			}, 60000);
		} else {
			ElMessage({
				message: "请修改信息后，在发送！",
				type: "warning",
				duration: 2000
			});
		}
	});
};
</script>

<template>
	<div class="page">
		<div class="login-img"></div>
		<div class="form-container">
			<div class="login-form">
				<div class="form-title">易问卷</div>

				<div class="form-main" v-if="isLogin">
					<el-form
						:model="loginData"
						ref="loginFormRef"
						label-position="top"
						label-width="auto"
						style="width: 20vw"
						:rules="loginRules"
						hide-required-asterisk
					>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="loginData.username" />
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="loginData.password" type="password" autocomplete="off" show-password />
						</el-form-item>
						<el-form-item>
							<el-button class="loginBtn" color="#626aef" size="large" @click="onLogin(loginFormRef)">登录</el-button>
						</el-form-item>
					</el-form>
				</div>
				<div class="form-main" v-else>
					<el-form
						:model="registerData"
						ref="registerFormRef"
						:rules="registerRules"
						label-position="left"
						label-width="auto"
						style="width: 20vw"
					>
						<el-form-item label="用户名" prop="username">
							<el-input v-model="registerData.username" />
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input v-model="registerData.password" type="password" autocomplete="off" />
						</el-form-item>
						<el-form-item label="重复密码" prop="rePassword">
							<el-input v-model="registerData.rePassword" type="password" autocomplete="off" />
						</el-form-item>
						<el-form-item label="邮箱" prop="email">
							<el-input v-model="registerData.email" />
						</el-form-item>
						<el-form-item label="验证码">
							<el-row :gutter="20">
								<el-col :span="12">
									<el-input v-model="registerData.captcha" />
								</el-col>
								<el-col :span="12">
									<el-button
										:loading="sendLoading"
										class="loginBtn"
										type="primary"
										size="default"
										@click="onSendEmail(registerFormRef)"
										>{{ sendCode }}</el-button
									>
								</el-col>
							</el-row>
						</el-form-item>
						<el-form-item>
							<el-button class="loginBtn" type="success" size="large" @click="onRegister(registerFormRef)"
								>注册</el-button
							>
						</el-form-item>
					</el-form>
				</div>
				<transition name="fade">
					<div class="form-footer-login" v-if="isLogin">
						<p>还没有账号?<span @click="isLogin = false">前往注册</span></p>
					</div>
					<div class="form-footer-register" v-else>
						<p><span @click="isLogin = true">返回登录</span></p>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<style scoped lang="scss">
.page {
	display: flex;
	flex-direction: row;
	overflow: hidden;
	.login-img {
		width: 40vw;
		height: 100vh;
		background-image: url("../../assets/images/login.jpg");
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
	}
	.form-container {
		flex: 1;
		background-color: #f4f4f5;
		position: relative;
		.login-form {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translatey(-50%) translateX(-50%);
			padding: 2rem;
			width: 25vw;
			height: 50vh;
			background-color: #fff;
			border-radius: 1rem;
			box-shadow: 0 0 2px 2px #b1b3b8;
			display: flex;
			flex-direction: column;
			.form-title {
				height: 8vh;
				line-height: 8vh;
				border-bottom: 0.02rem rgb(207, 219, 228) solid;
				font-size: 4rem;
				font-weight: bold;
				font-family: "Microsoft Yahei";
			}
			.form-main {
				height: 40vh;
				display: flex;
				justify-content: center;
				align-items: center;

				.el-button {
					flex: 1;
				}
			}
			.form-footer-login {
				position: absolute;
				bottom: 0;
				right: 2.5vw;
				height: 5vh;
				p {
					font-size: 1.2rem;
					color: #b1b3b8;
					span {
						margin-left: 0.05rem;
						font-weight: bold;
						color: #000000;
					}
				}
			}
			.fade-enter-active,
			.fade-leave-active {
				transition: opacity 0.5s;
			}
			.fade-enter-from,
			.fade-leave-to {
				opacity: 0;
			}
			.form-footer-register {
				position: absolute;
				bottom: 0;
				left: 2.5vw;
				height: 5vh;
				p {
					font-size: 1.2rem;
					color: #b1b3b8;
					span {
						margin-left: 0.05rem;
						font-weight: bold;
						color: #000000;
					}
				}
			}
		}
	}
}
</style>
