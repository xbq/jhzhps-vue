<template>
  <div>
    <a-card :body-style="{padding: '0 10px',height: '160px'}">
      <h3>添加单位</h3>
      <a-form layout="inline" :form="form" class="form" @submit="handleSubmit">
        <a-form-item
                label="单位名称"
                :validate-status="userNameError() ? 'error' : ''"
                :help="userNameError() || ''"
                style="width: 380px"
        >
          <a-input
                  v-decorator="[
          'name',
          {rules: [{ required: true, message: 'Please input your username!' }]}
        ]"
                  placeholder="请输入单位名称"
                  style="width: 260px"
          >
            <!--          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>-->
          </a-input>
        </a-form-item>
        <a-form-item
                label="单位简称"
                style="width: 265px"
        >
          <a-input
                  v-decorator="[
          'abbreviation'
        ]"
                  placeholder="请输入单位简称"
                  style="width: 145px"
          >
            <!--          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>-->
          </a-input>
        </a-form-item>

        <a-form-item
                label="单位类型"
        >
          <a-select
                  v-decorator="[
          'type'
        ]"
                  placeholder="请选择单位类型"
                  :allowClear='true'
                  style="width: 145px"
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
          >添加</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :body-style="{padding: '0 10px',height: '160px',maginTop: '15px'}">
      <h3>单位列表</h3>
      <a-table :columns="columns"
               size="small"
               :style="{wordBreak: 'break-all'}"
               :dataSource="data"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ y: 'calc(100vh - 440px)'}"
      >
        <template slot="operation" slot-scope="text, record, index">
          <div class='editable-row-operations'>
            <a @click="edit(record.id)">编辑</a>
            <a style="padding: 0 6px;color: #e6e6e6;">|</a>
            <a @click="deleted(record.id)">删除</a>
          </div>
        </template>
      </a-table>
    </a-card>
    <a-modal
            title="信息编辑"
            :visible="visible"
            @ok="handleOk"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            :centered=true
    >
      <a-form>
        <a-form-item label="单位名称" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}" >
          <a-input v-model="editinfo.name">
          </a-input>
        </a-form-item>
        <a-form-item label="单位简称" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
          <a-input  v-model="editinfo.abbreviation">
          </a-input>
        </a-form-item>
        <a-form-item label="单位类型" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}" :style="{marginBottom: 0}">
          <a-select :allowClear='true'  v-model="editinfo.type">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
            <a-select-option
                    v-for="departmentType in departmentTypes"
                    :key="departmentType.id"
                    :value="departmentType.id"
            >{{departmentType.name}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
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
      departmentTypes:[],
      visible: false, //企业信息编辑
      confirmLoading: false, // 是否加载中
      editinfo: {}, //编辑信息
      columns: [
        {
          title: '单位类型',
          dataIndex: 'type',
          width: 100,
        },
        {
          title: '单位名称',
          dataIndex: 'name',
          width: 100,
        },
        {
          title: '单位简称',
          dataIndex: 'abbreviation',
          width: 100,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 100,
          scopedSlots: { customRender: 'operation' },
        }
      ], // 表格列
      data: [], // 表格数据
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 5,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['5', '10', '20', '30']
      }, // 分页配置
      loading: false, // 表格是否加载中
    };
  },
  created(){
      this.$get("dic/getList",{type:'单位类型',rank:2}).then(res=>{
          this.departmentTypes = res.data.data;
      })
  },
  mounted () {
    this.$nextTick(() => {
      // this.form.validateFields();
    });
    this.getlist()
  },
  methods: {
    userNameError () {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched('name') && getFieldError('name');
    },
    // 添加单位请求
    handleSubmit  (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          var { names, abbreviation, types } = values
          this.$post("department/create", {name: names,abbreviation:abbreviation,type:types})
            .then(res => {
              if (res) {
                console.log(res);
              }
            })
            .catch(err => {
              console.log(err);
              // return false;
            });
        }
      });
    },
    // 获取单位列表
    getlist () {
      this.$get("department/queryList")
        .then(res => {
          if (res) {
            console.log(res);
            this.data = res.data.data
            this.data.forEach((val) => {
              val.key = val.id
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改单位数据
    edit (id) {
      this.$get("department/getDetail", {id: id})
        .then(res => {
          if (res) {
            console.log(res);
            this.editinfo = res.data.data
            this.visible = true
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 确认修改
    handleOk () {
      this.$post("department/updateById", this.editinfo)
        .then(res => {
          if (res) {
            console.log(res);
            this.getlist()
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.visible = false
      console.log('ok');
    },
    // 取消修改
    handleCancel () {
      this.visible = false
      console.log('cancel');
    },
    // 删除单位信息
    deleted (id) {
      this.$post("department/delete", {id: id})
        .then(res => {
          if (res) {
            console.log(res);
            this.getlist()
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
};
</script>
<style scoped>
div{}
.form{
  margin-top: 30px;
  text-align: left;
}
.ant-card-bordered{
  border: 0;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
div{}
</style>