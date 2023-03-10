<template>
    <div style="width: 25%;position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);">
        <transition name="el-fade-in-linear">
            <el-card class="box-card" shadow="hover" style="text-align: center"    @keyup.enter.native="login" >
                <div slot="header" class="clearfix" style="text-align: center">
                    <h2 style="color: #3F51B5;font-size: 1.3rem;">广师疫掌通--校园疫情防控系统
                    </h2>
                </div>
                <el-input prefix-icon="el-icon-user-solid" v-model="input_user" placeholder="请输入用户名" class="inp"></el-input>
                <div style="height: 1.3rem"></div>
                <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="input_pwd" show-password class="inp" ></el-input>
                <el-radio-group v-model="radio3" size="small" style="display: flex;justify-content: space-around;margin-top: 1.3rem;">
                    <el-radio label="1" border>管理员</el-radio>
                    <el-radio label="2" border>学生</el-radio>
                    <el-radio label="3" border>教师</el-radio>
                </el-radio-group>
                <el-button type="primary" class="button" size="small" @click="login">登录</el-button>
            </el-card>
        </transition>
    </div>

</template>
<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Login',
    data() {
    return {
        input_user: '',
        input_pwd:'',
        radio3: "1"
    }
  },
  methods:{
      /**
       * 登录
       * 用户名：username:this.input_user,
       * 密码：password:this.input_pwd,
       */
      login(){
          if (!this.input_user || !this.input_pwd){
                this.open3("用户名,密码不能为空")
              this.input_user=""
              this.input_pwd=""
          }else{
            this.$Axios({
                url:'/users/login',
                method:'post',
                data:{
                    username:this.input_user,
                    password:this.input_pwd,
                    type:this.radio3
                },
                success:(result)=>{
                    console.log(result);
                 if (result=="用户名或者账号输入错误"){
                     this.$message.error("用户名或者账号输入错误")
                     this.input_pwd=""
                     this.input_user=""
                 }else{
                    //  window.localStorage.setItem("token",result.jwt_token)
                  //方便后来群聊使用
                     const socketData={
                         "id":result.loginData[0].id,
                         "name":result.loginData[0].username,
                         "img":result.loginData[0].head,
                         }
                    window.localStorage.setItem("socketData",JSON.stringify(socketData)) 
                    //  window.localStorage.setItem("id",id);
                     if (this.radio3==1) 
                     {   
                         let type='Admin'
                         let menu= [
                           {
                             path: "homepage",
                             title: "首页",
                             name:"Homepage",
                             url:'homepage/homePage',
                             icon: "el-icon-s-home"
                           },
                           {
                             path: "student",
                             title: "学生管理",
                             name:"studentAdmin",
                             url:'Admin/studentAdmin',
                             icon: "el-icon-user"
                           },
                           {
                             path: "teacher",
                             title: "教师管理",
                             name:"teacherAdmin",
                             url:'Admin/teacherAdmin',
                             icon: "el-icon-document"
                           },
                           {
                             path: "noticeSend",
                             title: "通知管理",
                             name:"noticeSend",
                             url:'Common/noticeSend',
                             icon: "el-icon-date"
                           },
                           {
                             path: "add",
                             title: "添加班级",
                             name:"addclass",
                             url:'Admin/addClass',
                             icon: "el-icon-plus"
                           },
                            {
                             path: "socket",
                             title: "群聊",
                             name:"adminSocket",
                             url:'socket/socket',
                             icon: "el-icon-chat-dot-square"
                           }                          
                         ]
                         this.$store.commit('setType',type)
                         this.$store.commit('setMenu',menu)
                         this.$store.commit('addMenu',{router:this.$router,type})
                         this.$store.commit('setToken',result.jwt_token)
                         window.location.href=' http://localhost:81/#/admin'
                     } 
                     if (this.radio3==2) {
                         let type='Student'
                         let menu= [
                          {
                            path: "myNotice",
                            title: "我的通知",
                            name:"myNotice",
                            url:'Student/myNotice',
                            icon: "el-icon-date"
                          },
                          {
                            path: "health",
                            title: "健康填报",
                            name:"studentHealth",
                            url:'Student/healthTable',
                            icon: "el-icon-tickets"
                          },
                          {
                            path: "application",
                            title: "请假申请",
                            name:"application",
                            url:'Student/application',
                            icon: "el-icon-edit-outline"
                          },
                          {
                            path: "user",
                            title: "个人信息",
                            name:"studentUser",
                            url:'Common/user',
                            icon: "el-icon-setting"
                          },
                          {
                             path: "socket",
                             title: "群聊",
                             name:"studentSocket",
                             url:'socket/socket',
                             icon: "el-icon-chat-dot-square"
                           } 
                        ]
                        this.$store.commit('setType',type)
                        this.$store.commit('setMenu',menu)
                        this.$store.commit('addMenu',{router:this.$router,type})
                         this.$store.commit('setToken',result.jwt_token)  
                         window.location.href=' http://localhost:81/#/student'                      
                     } 
                     if (this.radio3==3) {
                         let type='Teacher'
                         let menu = [
                         {
                         path: "noticeSend",
                         title: "通知管理",
                         name:"noticeSetting",
                         url:'Common/noticeSend',
                         icon: "el-icon-date"
                           },
                         {
                           path: "leave",
                           title: "请假管理",
                           name:"leave",
                           url:'Teacher/teacherLeave',
                           icon: "el-icon-coordinate"
                         },
                         {
                           path: "user",
                           title: "个人信息",
                           name:"teacherUser",
                           url:'Common/user',
                           icon: "el-icon-setting"
                         },
                         {
                             path: "socket",
                             title: "群聊",
                             name:"teacherSocket",
                             url:'socket/socket',
                             icon: "el-icon-chat-dot-square"
                           } 
                       ]
                         this.$store.commit('setType',type)
                         this.$store.commit('setMenu',menu)
                         this.$store.commit('addMenu',{router:this.$router,type})
                         this.$store.commit('setToken',result.jwt_token)  
                         window.location.href='http://localhost:81/#/teacher'
                     }  
                 }
                }
            })
          }
    },
      open3(v) {
          this.$message({
              message:v,
              type: 'warning'
          });
      },
  }
}
</script>
<style lang="scss" scoped>
    .login{
        h3{
            text-align: center;
            height: 60px;
            line-height: 20px;
            border-bottom: 1px solid rgb(170, 170, 170);
            color: rgb(92, 92, 92);
        }
        .inp{
            margin-top: 10px;
        }
        .button{
            margin-top: 20px;
            position: fixed;left:50%;transform: translateX(-50%);
        }
    }
</style>