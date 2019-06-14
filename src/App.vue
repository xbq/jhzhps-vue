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
h3 {
  height: 38px;
  /*font-family: AlibabaPuHuiTiR;*/
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 1px;
  color: #323232;
  padding-left: 10px;
  position: relative;
  line-height: 38px;
  margin-bottom: 0;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}
h3:before {
  content: '';
  width: 5px;
  height: 16px;
  background-color: #0095ff;
  position: absolute;
  left: 0px;
  top: 11px;
}
</style>
