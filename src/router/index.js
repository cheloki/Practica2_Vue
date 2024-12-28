import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortaobjetoView from '../views/portaobjeto/PortaobjetoView'
import ImagenView from '../views/imagen/ImagenView'
import CategoriaView from '../views/categoria/CategoriaView'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  
  {
    path: '/portaobjeto',
    name: 'portaobjeto',
    component: PortaobjetoView
  },
  {
    path: '/imagen',
    name: 'imagen',
    component: ImagenView
  },
  {
    path: '/categoria',
    name: 'categoria',
    component: CategoriaView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
