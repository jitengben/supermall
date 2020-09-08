<template>
	<div id="detail">
		<detail-nav-bar></detail-nav-bar>
		<scroll class="content" :probe-type = "3">
			<detail-swiper :images="topImages"></detail-swiper>
			<detail-base-info :goods="goodsInfo"></detail-base-info>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import{getDetail,Goods} from 'network/detail.js'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from'./childComps/DetailBaseInfo.vue'//商品详细信息
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	export default{
		name: 'Detail',
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			Scroll
		},
		data(){
			return{
				iid: null,
				topImages: [],
				goodsInfo: {}
			}
		},
		created() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid
			//2.请求和商品有关的数据
			getDetail(this.iid).then(res => {
				const data = res.result;
				
				this.topImages = res.result.itemInfo.topImages
				
				//创建商品对象
				this.goodsInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
			})
			
		}
	}
</script>

<style scoped="scoped">
	#detail{
		height: 100vh;
		background-color: #FFFFFF;
		position: relative;
		z-index: 1;
	}
	.content{
		background-color: #fff;
		height: calc(100%-44px);
	}
</style>
