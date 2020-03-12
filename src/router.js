import HelloWorld from './components/HelloWorld'
import VueRouter from 'vue-router'

const routes = [
    { path: '/hello-vue', component: HelloWorld },
    { path: '/', redirect: '/hello-vue' }
]

const router = new VueRouter({routes, mode: 'history'})
export default router