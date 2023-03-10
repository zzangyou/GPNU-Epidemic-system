<template>
    <el-container>
  <el-aside width="200px">
         <!-- Brand Logo -->

      <!-- Sidebar -->
      <div class="sidebar">
        <!-- Sidebar user panel (optional) -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img
              :src="touxiang"
              class="img-circle elevation-2"
              alt="User Image"
              style="width: 3rem;height: 3rem"
            />
          </div>
          <div class="info">
            <a href="#" style="color:#3F51B5" v-text="username" class="d-block"></a>
          </div>
        </div>
        <!-- Sidebar Menu -->
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo"   text-color="#606266" active-text-color="#3F51B5" :width="$store.state.isCollapse?'180px':'64px'">
          <!-- <h3>{{isCollapse ? '后台':'通用后台管理系统'}}</h3> -->
       <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
          <i :class="item.icon" ></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
        <el-submenu v-for="item in hasChildren" :index="item.title" :key="item.label">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item-group v-for="(subitem,subindex) in item.children" :key="subitem.path">
            <el-menu-item @click="clickMenu(subitem)" :index="subindex.toString()">{{subitem.title}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>      
      </el-menu>
  
        <nav class="mt-2">
          <ul
            class="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <!-- <router-link
              tag="li"
              v-for="(item,index) in navActive"
              :key="index"
              class="nav-item"
              :to="item.path"
            >
              <a class="nav-link">
                <i :class="item.icon"></i>
                <p>
                  {{item.title}}
                </p>
              </a>
            </router-link> -->

            <!-- <li class="nav-item has-treeview">
              <a class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                  聊天
                  <i class="fas fa-angle-left right"></i>
                  <span class="badge badge-info right">2</span>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <router-link tag="li" to="/admin/otp" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>群聊</p>
                  </a>
                </router-link>
                <router-link tag="li" to="/admin/oto" class="nav-item">
                  <a class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>私聊</p>
                  </a>
                </router-link>
              </ul>
            </li> -->
          </ul>
        </nav>
        <!-- /.sidebar-menu -->
      </div>
      <!-- /.sidebar -->
  </el-aside>
  <el-container>
    <el-header>
           <nav class=" navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" @click="handleMenu"  role="button">
            <i class="fas fa-bars"></i>
          </a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
          <router-link tag="a" :to="homeurl" class="nav-link">Home</router-link>
        </li>
      </ul>
      <!--//新消息提示-->
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
        <el-dropdown>
          <span class="el-dropdown-link">
            <a class="nav-link"  href="#" role="button">
              <i class="el-icon-s-tools"></i>
            </a>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <i class="el-icon-switch-button"></i>
              <el-button type="text" @click="outlogin">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="dropdown-divider"></div>
      </ul>
    </nav>
    </el-header>
    <el-main>
       <div class="container-fluid">
          <el-row style="padding: 10px 10px">
            <el-col :span="24">
              <transition name="el-fade-in-linear" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </el-row>
        </div>
    </el-main>
    <el-footer>
     <strong>
        @zzangyou-2022
        <a href="https://gitee.com/hongjilin">广师疫掌通--校园疫情防控系统</a>.
      </strong>
        All rights reserved.
       <div class="float-right d-none d-sm-inline-block">
      </div>
    </el-footer>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: "CommonLayout",
  data() {
    return {
      type: "",
      touxiang: "https://img2.baidu.com/it/u=2846851606,1790189027&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1678381200&t=ea94c6f6d8b897c703581889f6700ccb",
      username: "",
      navActive: [],
      homeurl:""

    };
  },

  created() {
    /**
             * 渲染菜单信息
             this.touxiang 头像路径
             this.username 用户名
             this.type 显示的类型
             */
    this.$axiosjwt({
      url: "/users/getUserDataByToken",
      method: "get",
      data: {},
      success: result => {
        if (result.type == 1) 
        {this.type = "Admin";this.homeurl="/admin/homepage";}
        else if (result.type == 2) 
        {this.type = "Student";this.homeurl="/student/myNotice";}
        else if (result.type == 3) 
        {this.type = "Teacher";this.homeurl="/teacher/noticeSend";}
        if(this.touxiang) {this.touxiang = this.basePath + "/file/" + result.head;}
        this.username = result.username;
      }
    });
    
  },

  methods: {
    handleMenu(){
      this.$store.commit('updateIscollapse')
    },
    outlogin() {
      window.location.href = "http://localhost:81/#/Login";
    },
    clickMenu(item){
      this.$router.push({
      name:item.name
     })
    this.$store.commit('selectMenu',item)
     }
  },
  computed: {
     asyncMenu(){
        return this.$store.state.menu
      },
     noChildren(){
        return this.asyncMenu.filter(item=>!item.children)
      },
     hasChildren(){
        return this.asyncMenu.filter(item=>item.children)
      },
  },
};
</script>
<style lang="scss" scoped>
.content::-webkit-scrollbar {
  display: none;
}
</style>
