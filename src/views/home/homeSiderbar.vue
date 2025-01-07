<template>
	<aside class="sidebar">
		<el-button type="primary" class="create-btn">+ 创建问卷</el-button>
		<ul class="menu">
			<li>
				<el-icon><Document /></el-icon>全部问卷
			</li>
			<li>
				<el-icon><Box /></el-icon>回收站
			</li>
		</ul>
	</aside>
</template>

<script setup lang="ts"></script>

<style scoped>
.sidebar {
	width: 24rem;
	padding: 2rem;
}
::v-deep(.create-btn) {
	width: 100%;
	padding: 1rem;
	color: #fff;
	border: none;
	cursor: pointer;
	font-size: 1.6rem;
	margin-bottom: 2rem;
}
.menu {
	list-style: none;
	padding: 0 1rem;
	margin: 0;
	font-size: 1.4rem;
}
.menu li {
	height: 3rem;
	line-height: 3rem;
	margin: 1rem 0;
	cursor: pointer;
	display: flex;
	align-items: center;
	gap: 0.6rem;
}
.menu li:hover {
	color: #007bff;
	background-color: #ddd;
}
</style>
