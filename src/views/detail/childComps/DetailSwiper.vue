<template>
 <div>
	 	<swiper>
			<swiper-item v-for="item in images" class="item">
				<img :src="item" alt="">
			</swiper-item>
		</swiper>
 </div>
</template>

<script>
	import {Swiper, SwiperItem} from 'components/common/swiper'
	export default{
		name: 'DetailSwiper',
		props:{
			images: {
				type: Array,
				default(){
					return []
				}
			}
		},
		components:{
			Swiper,
			SwiperItem
		}
	}
</script>

<style scoped="scoped">
	.item {
	    text-align: center;
	    height: 300px;
	  }
</style>
