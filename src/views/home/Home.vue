<template>
	<div id="home">
		<nav-bar class= 'home-nav'>
			<div  slot = 'center'> 购物街</div>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" class="tab-control" v-show="isTabFixed" ref="tabcontrol2"></tab-control>
		<scroll class="content" 
						ref="scroll" 
						:probe-type = "3"
						 @scroll="contentScroll" 
						 :pull-up-load = "true" 
						 @pullingUp = "loadMore">
			<home-swiper :banner='banner' @swiperImageLoad='swiperImageLoad'></home-swiper>
			<recommend-view :recommend="recommend"></recommend-view>
			<feature-view></feature-view>	
			<tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick" ref="tabcontrol1"></tab-control>
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
	  <back-top @click.native="backtop" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	
	import FeatureView from './childComps/FeatureView.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import BackTop from 'components/content/backTop/BackTop.vue'
	
	
	import {getHomeMultidata,getHomeGoods} from 'network/home'
	import {debounce} from 'common/utils.js'
	
	import Scroll from 'components/common/scroll/Scroll.vue'
	export default{
		name: 'Home',
		components:{
			NavBar,
			HomeSwiper,
			RecommendView,
			TabControl,
			FeatureView,
			GoodsList,
			Scroll,
			BackTop
			
		},
		data() {
			return{
				banner: [],
				recommend: [],
				goods:{
					'pop': {page: 0,list: []},
					'new': {page: 0,list: []},
					'sell': {page: 0,list: []}
				},
				currentType : 'pop',
				isShowBackTop: false,
				tabcontroloffset: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created() {
			//请求多个数据
			this.getHomeMultidata()
			//请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			//监听商品图片加载完成
			const refresh = debounce(this.$refs.scroll.refresh , 50)
			this.$bus.$on('finishLoad' , () => {
				refresh()
			})
		},
		activated() {
			this.$refs.scroll.refresh();
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			
		},
		deactivated() {
			this.saveY = this.$refs.scroll.getScrollY()
		},
		methods:{

			//事件监听相关
			tabClick(index){
				switch(index){
					case 0:
						this.currentType = 'pop'
						break
					case 1:
						this.currentType = 'new'
						break
					case 2:
						this.currentType = 'sell'
						break
				}
				this.$refs.tabcontrol1.currentIndex = index
				this.$refs.tabcontrol2.currentIndex = index
				this.$refs.scroll.scrollTo(0,-this.tabcontroloffset,0)
			},
			//回到顶部
			backtop(){
				this.$refs.scroll.scrollTo(0 , 0)
			},
			contentScroll(position){
				//backtop是否显示
				this.isShowBackTop = (-position.y )> 1000
				//tabcontrol是否吸顶
				this.isTabFixed = (-position.y ) > this.tabcontroloffset
			},
			//上拉加载更多
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			
			
			//网络请求相关
			getHomeMultidata(){
				getHomeMultidata().then(res => {
					this.banner = res.data.banner.list
					this.recommend = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type,page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.finishPullUp()
				})
			},
			//图片加载完成计算offsettop
			swiperImageLoad(){
				this.tabcontroloffset = this.$refs.tabcontrol1.$el.offsetTop
			}
		}
		
	}
</script>

<style scoped="scoped">
	.home-nav{
		background-color: var(--color-tint);
		color: #fff;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
	}
	#home{
		padding-top: 44px;
		height: 100vh;
		position: relative;
	}
	.tab-control{
		position: relative;
		z-index: 9;
	}
	.content{
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>
