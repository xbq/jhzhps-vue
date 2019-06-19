<template>
  <a-locale-provider :locale="zhCN">
    <div id="app">
      <div class="bg">
        <div class="login-footer">
          <div class="footer-left">版权所有：©2018 金华市市政管理处</div>
          <div class="footer-right">联系电话：0572-8889590</div>
          <div class="footer-right" style="margin-right:50px">技术支持：浙江中海达空间信息技术有限公司</div>
        </div>
         <router-view/>
      </div>
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

<style lang="scss">
body{
  margin:0px;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
}
button{
  border-radius: 3px!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	height: 100%;
	background:  #0570CB;
}
.bg{
	position: absolute;
	color: #2c3e50;
	width: 1200px;
	height: 567px;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-60%);
	background: url(assets/img/login-bg.png) center center no-repeat;
  .login-footer{
    position: absolute;
    width: 100%;
    border-top:1px solid #fff;
    overflow: hidden;
    bottom: -60px;
    .footer-left{
      float: left;
    }
    .footer-right{
      float:right;
    }
    div{
      padding-top:25px;
      color: #ddecfe;
    }
  }
}
/*卡片内样式*/
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
.mycardcont {
  padding: 15px 5px;
  text-align: left;
  height: 202px;
}
.mycardcont2 {
  height: 121px;
}
.mycardcont>div {
  padding: 14px 0;
}
.mycardcont h6 {
  padding-left: 20px;
  margin-bottom: 10px;
  /*font-family: AlibabaPuHuiTiL;*/
  font-size: 12px;
  font-weight: normal;
  letter-spacing: 1px;
  color: #888888;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mycardcont p {
  padding-left: 20px;
  /*font-family: DIN-Regular;*/
  font-size: 28px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 2px;
  color: #323232;
  line-height: 24px;
  margin-bottom: 0;
}
.mycardcont p span{
  font-size: 14px;
  letter-spacing: 1px;
  color: #888888;
}
/*卡片外投影*/
.ant-card-bordered{
  border: 0;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.ant-layout-header{
	height:50px;
	line-height: 50px;
}
</style>
