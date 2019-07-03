<template>
  <div>
    <a-card :body-style="{padding: '0 10px',height: '160px',marginBottom: '15px'}">
      <h3>添加单位</h3>
      <a-form  :form="form" class="form ant-advanced-search-form" @submit="handleSubmit">
        <a-row  :gutter="15">
          <a-col :span="6">
            <a-form-item
                    label="角色名称"
                    :validate-status="userNameError() ? 'error' : ''"
                    :help="userNameError() || ''"
            >
              <a-input
                      v-decorator="[
          'name',
          {rules: [{ required: true, message: 'Please input your name!' }]}
        ]"
                      placeholder="请输入角色名称"
              >
                <!--          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>-->
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="14">
            <a-form-item
                    label="描述"
            >
              <a-input
                      v-decorator="[
          'instruction',
        ]"
                      placeholder="请输入描述文字"
              >
                <!--          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>-->
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-form-item>
              <a-button
                      type="primary"
                      html-type="submit"
                      :disabled="hasErrors(form.getFieldsError())"
              >添加</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card :body-style="{padding: '0 10px',height: 'calc(100vh - 275px)'}">
      <h3>单位列表</h3>
      <div style="padding:30px 5px 15px">
        <a-table :columns="columns"
                 size="middle"
                 :style="{wordBreak: 'break-all'}"
                 :dataSource="data"
                 :pagination="pagination"
                 :loading="loading"
                 :scroll="{ y: 'calc(100vh - 460px)'}"
        >
          <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
              <a @click="edit(record.id)">编辑</a>
              <a style="padding: 0 6px;color: #e6e6e6;">|</a>
              <a @click="deleted(record.id, record.name)">删除</a>
            </div>
          </template>
        </a-table>
      </div>
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
          <a-input v-model="editinfo.name" v-decorator="[
          'type',
          {rules: [{ required: true, message: 'Please select!' }]}
        ]">
          </a-input>
        </a-form-item>
        <a-form-item label="单位简称" :labelCol="{span: 5}" :wrapperCol="{span: 16, offset: 1}">
          <a-input  v-model="editinfo.instruction">
          </a-input>
        </a-form-item>
      </a-form>
      <div class="tree">
        <a-tree
                showLine
                checkable
                :treeData="treeData"
                v-model="checkedKeys"
                @check="onCheck"
        />
      </div>
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
      visible: false, //企业信息编辑
      confirmLoading: false, // 是否加载中
      editinfo: {}, //编辑信息
      columns: [
        {
          title: '角色名称',
          dataIndex: 'name',
          width: 200,
        },
        {
          title: '角色描述',
          dataIndex: 'instruction',
          width: 700,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          scopedSlots: { customRender: 'operation' },
        }
      ], // 表格列
      data: [], // 表格数据
      pagination: {
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['10', '20', '30']
      }, // 分页配置
      loading: false, // 表格是否加载中
      treeData: [], // 树的数据
      checkedKeys: [], // 选中的数据key值
      key: 0, // 设置key值
    };
  },
  created(){
  },
  mounted () {
    this.$nextTick(() => {
      this.form.validateFields();
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
          // console.log('Received values of form: ', values);
          this.$post("role/create", values)
            .then(res => {
              if (res) {
                // console.log(res);
                this.$message.success('添加成功', 1);
                this.getlist()
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
      this.$get("role/getList", {})
        .then(res => {
          if (res) {
            // console.log(res);
            this.data = res.data.data
            if(this.data.length > 0){
              document.getElementsByClassName('ant-table-body')[0].style.height = 'calc(100vh - 460px)'
              this.data.forEach((val) => {
                val.key = val.id
              })
            }else {
              document.getElementsByClassName('ant-table-body')[0].style.height = 'unset'
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改单位数据
    edit (roleId) {
      this.$get("role/getAuthByRoleId", {roleId})
        .then(res => {
          if (res) {
            console.log(res);
            this.editinfo = res.data.data
            console.log(JSON.parse(res.data.data.auth));
            this.treeData = JSON.parse(res.data.data.auth);
            this.rearr(this.treeData);
            // this.editinfo = res.data.data
            // this.editinfo.type = Number(this.editinfo.typeId)
            this.visible = true;
            console.log(this.treeData);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 递归处理
    rearr(arr){
      arr.forEach(val => {
        if(val.children){
          this.rearr(val.children)
          val.class = 'blue'
        } else {
          val.class = 'hiddenicon'
        }
        val.title = val.meta.title
        val.key = this.key++
        if (val.checked) {
          this.checkedKeys.push(val.key)
        }
      })
    },
    // 递归反处理
    rearrparse(arr) {
      arr.forEach(val => {
        if (val.children) {
          this.rearrparse(val.children)
        }
        val.checked = this.checkedKeys.includes(val.key);
        delete val.title
        delete val.key
        delete val.class
      })
    },
    onCheck (checkedKeys) {
      // console.log('onCheck', checkedKeys, info)
      this.checkedKeys = checkedKeys
    },
    // 确认修改
    handleOk () {
      this.rearrparse(this.treeData);
      this.editinfo.auth = JSON.stringify(this.treeData);
      this.checkedKeys = [];
      this.treeData = [];
      // this.$post("department/updateById", this.editinfo)
      //   .then(res => {
      //     if (res) {
      //       console.log(res);
      //       this.getlist()
      //       this.visible = false
      //       this.$message.success('编辑成功', 1);
      //     }
      //   })
      //   .catch(err => {
      //     this.visible = false
      //     console.log(err);
      //   });
    },
    // 取消修改
    handleCancel () {
      this.visible = false
      // console.log('cancel');
    },
    // 删除单位信息
    deleted (roleId, name) {
      this.$modal.confirm({
        title: '是否确认删除' + name,
        centered: true,
        onOk: () => {
          this.$get("role/del", {roleId})
            .then(res => {
              if (res) {
                // console.log(res);
                this.$message.success('删除成功', 1)
                this.getlist()
              }
            })
            .catch(err => {
              console.log(err);
            });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
};
</script>
<style scoped>
.form{
  margin-top: 30px;
  text-align: left;
}
.ant-card-bordered{
  border: 0;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
}
.tree{
  height: 380px;
  overflow: auto;
  padding: 0 60px;
}
</style>