<template>
  <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      label="Note"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'note',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label="Gender"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-select
        v-decorator="[
          'gender',
          {rules: [{ required: true, message: 'Please select your gender!' }]}
        ]"
        placeholder="Select a option and change input text above"
        @change="handleSelectChange"
      >
        <a-select-option value="male">
          male
        </a-select-option>
        <a-select-option value="female">
          female
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      :wrapper-col="{ span: 12, offset: 5 }"
    >
      <AButton
        type="primary"
        html-type="submit"
      >
        Submit
      </AButton>
    </a-form-item>
  </a-form>
</template>

<script>

export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange (value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
  },
};
</script>

// <script>
// import serveiceManage from "../../service/index";
// import {savelocalStorageItem} from '../../utils/common'
// import axios from 'axios'
// export default {
//   name: "Login",
//   data() {
//     const validateUsername = (rule, value, callback) => {
//       if (value.length < 2) {
//         callback(new Error("用户名密码不能小于5位"));
//       } else {
//         callback();
//       }
//     };
//     const validatePass = (rule, value, callback) => {
//       if (value.length < 5) {
//         callback(new Error("密码不能小于5位"));
//       } else {
//         callback();
//       }
//     };
//     return {
//       loginForm: {
//         username: "admin",
//         password: "admin",
//         logintype:"web"
//       },
//       loginRules: {
//         username: [
//           { required: true, trigger: "blur", validator: validateUsername }
//         ],
//         password: [{ required: true, trigger: "blur", validator: validatePass }]
//       },
//       loading: false,
//       pwdType: "password",
//       redirect: undefined
//     };
//   },
//   watch: {},
//   methods: {
//     handleLogin() {
//       var {username,password,logintype} = this.loginForm;
//       this.$post('user/user_login',{username,password,logintype}).then(res=>{
//         debugger
//         this.loading = false;
//               if (res) {
//                 var token = res.data.data.token
//                 savelocalStorageItem('access_token',token);
//                 this.$router.push("/");
//               }
//       }).catch(err=>{
//         this.$message.error("error submit!!"); //登录失败提示错误
//           return false;
//       });
//     }
//   }
// };
// </script>
<style scoped>
div span + span {
  margin-left: 20px;
}
</style>

