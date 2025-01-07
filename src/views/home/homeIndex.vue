<script setup lang="ts">
import Header from "./homeHeader.vue";
import Sidebar from "./homeSiderbar.vue";
import MainContent from "./homeMainContent.vue";
</script>
<template>
	<div class="home">
		<Header />
		<div class="layout">
			<Sidebar />
			<MainContent />
		</div>
	</div>
</template>

<style scoped>
.home {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f7f7f7;
}
.layout {
	display: flex;
	flex: 1;
	padding: 1rem 15rem;
}
</style>
