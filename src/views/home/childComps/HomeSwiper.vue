<template>
  <swiper ref="swiper" v-if="banner.length">
    <swiper-item v-for="(item, index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="finishupLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
	import {Swiper,SwiperItem} from 'components/common/swiper/index'
	export default{
		name: 'HomeSwiper',
		components:{
			Swiper,
			SwiperItem
		},
		data(){
			return{
				isLoad: false
			}
		},
		props:{
			banner: {
				type: Array,
				default(){
					return []
				}
			}
		},
		methods:{
			finishupLoad(){
				if(!this.isLoad){
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}
			}
		}
	}
</script>
	
<style scoped="scoped">
</style>
