<template>
	<div id="main-tab-bar">
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
		<tab-bar>
			<tab-bar-item path="/home" activeColor='red'>
				<img src="../../../assets/img/tabbar/home.svg" slot='item-icon'>
				<img src="../../../assets/img/tabbar/home_active.svg" slot='item-icon-active'>
				<div slot='item-text'>首页</div>
			</tab-bar-item>
			<tab-bar-item path="/list" activeColor='red'>
				<img src="../../../assets/img/tabbar/category.svg" slot='item-icon'>
				<img src="../../../assets/img/tabbar/category_active.svg" slot='item-icon-active'>
				<div slot='item-text'>分类</div>
			</tab-bar-item>
			<tab-bar-item path="/cart" activeColor='red'>
				<img src="../../../assets/img/tabbar/cart.svg" slot='item-icon'>
				<img src="../../../assets/img/tabbar/cart_active.svg" slot='item-icon-active'>
				<div slot='item-text'>购物车</div>
			</tab-bar-item>
			<tab-bar-item path="/me" activeColor='red'>
				<img src="../../../assets/img/tabbar/profile.svg" slot='item-icon'>
				<img src="../../../assets/img/tabbar/profile_active.svg" slot='item-icon-active'>
				<div slot='item-text'>我的</div>
			</tab-bar-item>
		</tab-bar>
	</div>
	
</template>

<script>
	import TabBar from 'components/common/tabbar/TabBar.vue'
	import TabBarItem from '../../common/tabbar/TabBarItem.vue'
	export default{
		name: 'MainTabBar',
		components:{
			TabBar,
			TabBarItem
		}
	}
</script>

<style scoped="scoped">
</style>
