<template>
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
        placeholder="username"
        name="username"
      >
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
        placeholder="password"
        name="password"
      >
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
      >Remember me</a-checkbox>
      <a class="login-form-forgot" href>Forgot password</a>
      <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
      <a href>register now!</a>
    </a-form-item>
  </a-form>
</template>

<script>
 import { savelocalStorageItem } from "../../utils/common"
export default {
  name:'login',
  data(){
    return {

    }
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
          this.$post("user/user_login", { username:username, password:password,logintype:'web' })
            .then(res => {
              if (res) {
                var token = res.data.data.token;
                savelocalStorageItem("access_token", token);
                this.$router.push("/");
              }
            })
            .catch(err => {
              this.$message.error("error submit!!"); //登录失败提示错误
              return false;
            });
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>


