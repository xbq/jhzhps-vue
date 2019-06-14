<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <!-- <img src="./assets/logo.png"> -->
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
export default {
  name: 'App',
  data () {
    return {
      zhCN
    }
  }
}
</script>

<style>
body{
  margin:0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.ant-layout-header{
  height: 50px;
  line-height: 50px;
}
</style>
