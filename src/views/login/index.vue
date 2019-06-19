<template>
  <div class="login-bg">
      <div id="loginbox">
    <h2>登录账号</h2>
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
          placeholder="请输入用户名"
          name="username"
        style="height:50px">
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
          type="password"
          placeholder="请输入密码"
          name="password"
        style="height:50px">
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          }
        ]"
          name="remember"
        >记住密码</a-checkbox>
        <a class="login-form-forgot" href>忘记密码?</a>
        <a-button type="primary" html-type="submit" class="login-form-button" style="height:50px">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
  <div class="login-footer">
          <div class="footer-left">版权所有：©2018 金华市市政管理处</div>
          <div class="footer-right">联系电话：0572-8889590</div>
          <div class="footer-right" style="margin-right:50px">技术支持：浙江中海达空间信息技术有限公司</div>
        </div>
  </div>
</template>

<script>
import { savelocalStorageItem } from "../../utils/common";
import loginImg from '@/assets/img/login-bg.png';
export default {
  name: "login",
  data() {
    return {};
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
    // this.form.setFieldsValue({
    //   loginForm:{
    //     username:"admin",
    //     password:"admin",
    //     logintype:"web"
    //   }
    // })
  },
  methods: {
    handleSubmit(e) {
      //清空localstorage
      localStorage.clear();
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          var { username, password } = values;
          this.$post("user/user_login", {
            username: username,
            password: password,
            logintype: "web"
          })
            .then(res => {
              if (res) {
                console.log(res);
                var token = res.data.data.token;
                savelocalStorageItem("access_token", token);
                this.$router.push("/");
              }
            })
            .catch(err => {
              // this.$message.error("error submit!!"); //登录失败提示错误
              return false;
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
#loginbox {
  width: 350px;
  height: 403px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 64, 126, 0.3);
  border-radius: 5px;
  position: absolute;
  top: 55px;
  right: 0;
  h2 {
    font-size: 24px;
    color: #323232;
    font-family: FZLTZHUNHK--GBK1-0;
    text-align: center;
    padding: 0;
    margin: 0;
    line-height: 38px;
    margin: 30px 0;
  }
  .ant-form-item {
    width: 310px;
    margin-left: 20px;
  }
}

</style>


