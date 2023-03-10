import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // {path:'*',redirect:'/'},
    {path:'/',name: 'Login',component: () => import('@/components/menu/Login.vue')},
    //管理员界面
    {path:'/admin',name:'Admin',redirect:'admin/homepage', component:() => import('@/components/menu/CommonLayout.vue'),
        children:[
         /* {path:'home',name:'home', component:() => import('@/components/homepage/homepage.vue')},
          {path:'student', component:() => import('@/components/main/Admin/studentAdmin.vue')},
            {path:'teacher', component:() => import('@/components/main/Admin/teacherAdmin.vue')},
            {path:'noticeSend', component:() => import('@/components/main/Common/noticeSend.vue')},
            {path:'add', component:() => import('@/components/main/Admin/addclass.vue')}, */
          ]},
    {path:'/student',name:'Student',redirect:'student/myNotice', component:() => import('@/components/menu/CommonLayout.vue'),
        children:[
            // {path:'home',component:() => import('@/components/homepage/homepage.vue')},
/*             {path:'myNotice',component:() => import('@/components/main/Student/myNotice.vue')},
            {path:'health',component:() => import('@/components/main/Student/healthTable.vue')},
            {path:'application', component:() => import('@/components/main/Student/application.vue')},
            {path:'user',component:() => import('@/components/main/Common/user.vue')}, */
          ]},
    {path:'/teacher',name:'Teacher',redirect:'teacher/noticeSend', component:() => import('@/components/menu/CommonLayout.vue'),
        children:[
            // {path:'home',component:() => import('@/components/homepage/homepage.vue')},
/*             {path:'notice',component:() => import('@/components/main/Common/noticeSend.vue')},
            {path:'leave',component:() => import('@/components/main/Teacher/leave.vue')},
            {path:'user',component:() => import('@/components/main/Common/user.vue')}, */
          ]},
]

const router = new VueRouter({
  routes
})

export default router
