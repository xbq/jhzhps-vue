<template>
    <a-menu v-model="current" mode="horizontal">
      <!-- <a-menu-item key="mail">
        <a-icon type="mail"/>Navigation One
      </a-menu-item> -->
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="user"/>管理员
        </span>
        <a-menu-item key="setting:1">基本信息</a-menu-item>
        <a-menu-item key="setting:2">修改密码</a-menu-item>
        <a-menu-item key="setting:4" @click="logout">退出登录</a-menu-item>
      </a-sub-menu>
    </a-menu>
</template>
<script>
import {removelocalStorageItem} from '@/utils/common'
export default {

  data() {
    return {
      current: ["mail"]
    };
  },
  methods:{
    logout:function(){
      //清空localStorage
      removelocalStorageItem('access_token');
      this.$router.push('/login');
    }
  }
};
</script>
