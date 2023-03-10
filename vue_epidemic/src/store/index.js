import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'js-cookie'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse:true,
    currentMenu:null,
    tabsList:[
        {
            path:'/',
            name:'home',
            label:'首页',
            icon:'home'
        }
    ],
    menu:[],
    token:'',
    type:''
  },
  mutations: {
    updateIscollapse(state){
        state.isCollapse=!state.isCollapse
         },
         selectMenu(state,val){
             // 判断
      /*        val.name=='home'?(state.currentMenu=null):         (state.currentMenu=val) */
             // eslint-disable-next-line no-constant-condition
             if(val.name=='Admin'||'Student'||'Teacher'){
                 state.currentMenu=null
             }else{
                 state.currentMenu=val
                 let result = state.tabsList.findIndex(item=>
                     item.name===val.name
                 )
                 result == -1 ?state.tabsList.push(val):''
             }
         },
         closeTab(state,val){
            let res =  state.tabsList.findIndex(item=>item.name===val.name)
            state.tabsList.splice(res,1)
         },
         setType(state,val){
            state.type=val
            localStorage.setItem('type',val)
         },
         getType(state){
             state.type=state.type||localStorage.getItem('type')
         },
         setMenu(state,val){
             state.menu=val
             // 使vuex数据持久化
             localStorage.setItem('menu',JSON.stringify(val))
         },
           // 页面刷新vuex数据会更新 若想数据持久化需要借助localstorage
           //传入多个参数 需要以对象的形式传递
         addMenu(state,params){
            if(!localStorage.getItem('menu')){
                return 
            }
            const menu = JSON.parse(localStorage.getItem('menu'))
            state.menu=menu
            const menuArray=[]
            menu.forEach(item=>{
                if(item.children){
                    item.children=item.children.map(item=>{
                        item.component=()=>import(`../components/main/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                 item.component=()=>import(`../components/main/${item.url}`)
                 menuArray.push(item)
                }
            })
            menuArray.forEach(item=>{
               params.router.addRoute(params.type,item)
            //    console.log(router.getRoutes())
            })
         },
         cleanMenu(state){
             state.menu=[]
             localStorage.removeItem('menu')
 
         },
         setToken(state,val){
             state.token=val
             localStorage.setItem('token',val)
             Cookie.set('token',val)
         },
         clearToken(state){
             state.token=''
             localStorage.removeItem('token')
             Cookie.remove('token')
         },
         getToken(state){
             state.token = state.token||localStorage.removeItem('token')
         }
  },
  actions: {
  },
  modules: {
  }
})
