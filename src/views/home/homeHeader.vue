<template>
	<header class="home-header">
		<div class="logo">问卷星</div>
		<div class="user-profile">
			<el-avatar
				:size="30"
				:src="
					userStrore.userInfo.avatar == 'default'
						? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' // 默认头像
						: userStrore.userInfo.avatar
				"
			/>
			<span>{{ userStrore.userInfo.username }}</span>
			<span
				><el-icon><ArrowDownBold /></el-icon
			></span>
			<div class="dropdown-menu">
				<button class="dropdown-item">个人中心</button>
				<button class="dropdown-item" @click="logout">退出</button>
			</div>
		</div>
	</header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const userStrore = useUserStore();
const router = useRouter();
const logout = () => {
	userStrore.logout();
	router.push("auth/login");
};
</script>

<style scoped lang="scss">
.home-header {
	width: 100%;
	height: 6rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 15rem;
	background-color: #fff;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	.logo {
		font-size: 1.8rem;
		font-weight: bold;
		font-family: "Comic Sans MS", cursive, sans-serif;
	}
	.user-profile {
		height: 4rem;
		line-height: 4rem;
		border-radius: 2rem;
		width: 12rem;
		background-color: #f7f7f7;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0.5rem;
		position: relative;
		cursor: pointer;
		.dropdown-menu {
			position: absolute;
			top: 100%;
			right: 0;
			background-color: #fff;
			box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
			padding: 1rem 0;
			width: 12rem;
			display: none;
		}

		.dropdown-item {
			display: block;
			width: 100%;
			padding: 0.8rem 1.6rem;
			font-size: 1.4rem;
			text-align: left;
			background: none;
			border: none;
			cursor: pointer;
			outline: none;
		}

		.dropdown-item:hover {
			background-color: #f0f0f0;
		}

		&:hover .dropdown-menu {
			display: block;
		}
	}
	.profile-img {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		margin-left: 1rem;
	}
}
</style>
