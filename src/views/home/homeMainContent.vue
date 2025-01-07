<template>
	<main class="main-content">
		<div class="search-bar">
			<input type="text" placeholder="请输入问卷名进行搜索..." />
			<button>搜索</button>
		</div>
		<div class="content">
			<table class="questionnaire-table">
				<thead>
					<tr>
						<th>问卷标题</th>
						<th>操作</th>
						<th>时间</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>阿萨德</td>
						<td>
							<button>设计问卷</button>
							<button>发送问卷</button>
							<button>分析下载</button>
						</td>
						<td>2025/01/07 18:22</td>
					</tr>
					<tr>
						<td>javascript: 收款</td>
						<td>
							<button>设计问卷</button>
							<button>发送问卷</button>
							<button>分析下载</button>
						</td>
						<td>2024/09/10 16:10</td>
					</tr>
				</tbody>
			</table>
		</div>
	</main>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-content {
	padding: 2rem;
	flex: 1;
}
.search-bar {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 2rem;
}
.search-bar input {
	padding: 0.8rem;
	border: 0.1rem solid #eaeaea;
	border-radius: 0.4rem;
	margin-right: 1rem;
}
.search-bar button {
	padding: 0.8rem 1.6rem;
	background-color: #007bff;
	color: #fff;
	border: none;
	cursor: pointer;
}
.questionnaire-table {
	width: 100%;
	border-collapse: collapse;
}
.questionnaire-table th,
.questionnaire-table td {
	padding: 1rem;
	border: 0.1rem solid #eaeaea;
}
.questionnaire-table th {
	background-color: #f8f8f8;
	text-align: left;
}
.questionnaire-table tr:nth-child(even) {
	background-color: #f9f9f9;
}
</style>
