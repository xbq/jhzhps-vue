<template>
  <a-card title="添加单位">
    <a-form layout="inline" :form="form" @submit="handleSubmit" type="flex">
      <a-form-item
        label="单位名称"
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
      >
        <a-input
          v-decorator="[
          'userName',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
          placeholder="Username"
        >
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>
      <a-form-item
        label="单位简称"
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
      >
        <a-input
          v-decorator="[
          'password',
          {rules: [{ required: true, message: 'Please input your Password!' }]}
        ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
        </a-input>
      </a-form-item>

      <a-form-item
        label="单位类型"
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
      >
        <a-select
          v-decorator="[
          'departmentType',
          {rules: [{ required: true, message: '请选择单位类型!' }]}
        ]"
          placeholder="请选择单位类型"
        >
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          <a-select-option
            v-for="departmentType in departmentTypes"
            :key="departmentType.id"
            :value="departmentType.id"
          >{{departmentType.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="hasErrors(form.getFieldsError())"
        >Log in</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>
function hasErrors (fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  data () {
    return {
      hasErrors,
      form: this.$form.createForm(this),
      departmentTypes:[]
    };
  },
  created(){
      this.$get("dic/getList",{type:'单位类型',rank:2}).then(res=>{
          this.departmentTypes = res.data.data;
      })
  },
  mounted () {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('userName') && getFieldError('userName');
    },
    passwordError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('password') && getFieldError('password');
    },
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
  },
};
</script>
<style scoped>
.form {
  float: left;
}
</style>