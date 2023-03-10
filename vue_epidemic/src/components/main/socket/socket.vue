<template>
  <div>
    <el-row class="box">
      <template v-if="false">
        <el-button :plain="true"></el-button>
      </template>
      <el-col :span="24" style>
        <el-card class="group">
          <div class="group_head">
            <el-page-header class="title" @back="goBack" content="校园群聊">
              <!--<div class="title"><span>魏工养老培训班</span></div>-->
            </el-page-header>
            <div class="group_head_online">
              <el-button
                @click="drawer = true"
                type="primary"
                style="margin-left: 16px;background: none;border: none;color: dodgerblue"
              >
                <span v-text="'在线'+online+'人'"></span>
              </el-button>
            </div>
          </div>
          <div class="comment" id="divDetail">
            <ul>
              <li v-for="item in commlist" :key="item.id" style=" list-style-type:none;">
                <div class="msgOther" v-if="!item.if">
                  <div class="head_img">
                    <img :src="imgpath+item.msgData.img" alt />
                  </div>
                  <div class="msg">
                    <div class="msg_title">
                      <span v-text="item.msgData.name"></span>
                      <i v-text="timeDetia(item.date)">2020-8-28</i>
                    </div>
                    <div>
                      <pre>{{item.msgData.msg}}</pre>
                    </div>
                  </div>
                </div>
                <div class="msgMy" v-if="item.if">
                  <div class="msg">
                    <div class="msg_title">
                      <i v-text="timeDetia(item.date)">2020-8-28</i>
                      <span v-text="item.msgData.name"></span>
                    </div>
                    <div>
                      <pre>{{item.msgData.msg}}</pre>
                    </div>
                  </div>
                  <div class="head_img">
                    <img :src="imgpath+item.msgData.img" alt />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="send">
            <div style="margin-top: 15px;">
              <el-input
                @keyup.enter.native="send"
                type="textarea"
                :rows="7"
                placeholder="请输入内容"
                v-model="comm"
                size="medium"
              ></el-input>
              <!--<button @click="quit">推出</button>-->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import './index.scss'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "socket",
  data() {
    return {
      drawer: false,
      online: 5,
      comm: "",
      u_id: 0,
      imgpath: this.socketpath + "/file/",
      commlist: [
        {
          msgData: {
            msg: "系统提示:请不要轻易相信陌生人的交易信息",
            name: "系统提示",
            uid: 2,
            img: "999.png"
          },
          date: new Date()
        }
      ]
    };
  },
  sockets: {
    connect() {
      console.log("[SYSTERM]握手成功");
    },
    //获取聊天数据
    getmsg(data) {
      if (
        data.msgData.uid ==
        JSON.parse(window.localStorage.getItem("socketData"))?.id)
        data.if = true;
      else data.if = false;
      this.commlist.push(data);
      this.goDivbo("divDetail");
    },
    //欢迎用户加入
    welcome(users) {
      this.online = users.length;
      this.open(
        "欢迎" + users[users.length - 1].name + "加入群聊",
        1000,
        "success"
      );
    },
    disconnects(users) {
      this.online = users.length;
      // this.open( users[users.length - 1].name + "离开了群聊22", 1000, "info")
    },
    //手动离开群聊提示
    quit(name) {
      this.open(name + "离开了群聊", 1000, "info");
    }
  },
  ///生命周期函数
  created() {
    // sessionStorage.setItem('user', "sss");
    // this.u_id= window.localStorage.getItem("id")
    this.join();
    // this.quit()
  },
  methods: {
    goBack() {
      // this.$router.push('/home')
      this.$router.go(-1);
      this.quit();
    },
    //退出群提醒
    quit() {
      //获取即时信息渲染
      this.socket.emit("quit", this.getItem());
    },
    //获取浏览器的用户信息
    getItem() {
      let socketData = window.localStorage.getItem("socketData");
      socketData = JSON.parse(socketData);
      let msgData = { ...socketData };
      msgData.uid = msgData?.id;
      return msgData;
    },
    goDivbo(id) {
      let div = document.getElementById(id);
      div.scrollTop = div.scrollHeight;
    },
    send(e) {
      if (!window.localStorage.getItem("socketData")) {
        alert("您未登录,处于游客模式 不能发信息");
        return;
      } else if (e.keyCode == 13 && e.shiftKey) {
        return;
      } else if (this.comm.length == 1) {
        this.open("输入框不能为空", 500, "info");
        this.comm = "";
        return;
      }
      this.goDivbo("divDetail");
      if (this.comm.length > 0) {
        let msgData = this.getItem();
        msgData.msg = this.comm;
        this.socket.emit("message", msgData);
        this.comm = "";
      }
    },
    //加入群聊
    join() {
      if (!window.localStorage.getItem("socketData")) {
        alert("您未登录,处于游客模式 不能发信息");
        return;
      }
      let socketData = window.localStorage.getItem("socketData");
      socketData = JSON.parse(socketData);
      let joinData = { ...socketData };
      joinData.uid = joinData?.id;
      this.socket.emit("join", joinData);
    },
    timeDetia: function(date) {
      var time;
      var d = new Date(date);
      var n = new Date();
      //获取时间戳
    //   var dd = d.getTime();
      var h = d.getHours();
      var m = d.getMinutes();
      var Y = d.getFullYear();
      var M = d.getMonth() + 1;
      var D = d.getDate();
      //现在时间
    //   var nn = n.getTime();
    //   var hh = n.getHours();
    //   var mm = n.getMinutes();
      var YY = n.getFullYear();
      var MM = n.getMonth() + 1;
      var DD = n.getDate();
      if (D == DD && M == MM && Y == YY) {
        if (h < 10) {
          h = "0" + h;
        }
        if (m < 10) {
          m = "0" + m;
        }
        time = h + ":" + m;
        return time;
      } else if (D + 1 == DD && M == MM && Y == YY) {
        if (h < 10) {
          h = "0" + h;
        }
        if (m < 10) {
          m = "0" + m;
        }
        time = "昨天" + " " + h + ":" + m;
        return time;
      } else {
        if (M < 10) {
          M = "0" + M;
        }
        if (D < 10) {
          D = "0" + D;
        }
        if (h < 10) {
          h = "0" + h;
        }
        if (m < 10) {
          m = "0" + m;
        }
        time = Y + "年" + M + "月" + D + "日" + " " + h + ":" + m;
        return time;
      }
    },
    open(message, duration, type) {
      this.$message({
        // showClose: true,
        message: message,
        duration: duration,
        type: type
      });
    }
  }
};
</script>
