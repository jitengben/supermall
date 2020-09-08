import Vue from 'vue'
import VueRouter from 'vue-router'
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};
const Home =()=> import ('views/home/Home')
const Cart =()=> import ('views/cart/Cart')
const List =()=> import ('views/list/List')
const Me =()=> import ('views/me/Me')
const Detail =()=> import('views/detail/Detail')
Vue.use(VueRouter)
  const routes = [
		{
			path: '',
			redirect:'/home',
		},
		{
			path: '/home',
			component:Home
		},
		{
			path: '/cart',
			component:Cart
		},
		{
			path: '/list',
			component:List
		},
		{
			path: '/me',
			component:Me
		},
		{
			path: '/detail/:iid',
			component:Detail
		},
 
]

const router = new VueRouter({
  routes,
	mode:"hash"
})

export default router
