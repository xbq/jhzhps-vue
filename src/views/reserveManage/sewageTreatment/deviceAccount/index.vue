<template>
  <div class="app-container">
    <a-row :gutter="15">
      <a-col :span="6">
        <a-card class="newalarm" :body-style="{padding: '0 10px'}">
          <h3>最新报警记录</h3>
          <a-row class="mycardcont" :gutter="10">
            <a-col :span="12" v-for="(item,index) in device" :key="index">
              <h6>{{item.name}}</h6>
              <p>{{item.num}}</p>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :body-style="{padding: '0 10px'}">
          <h3>报警类型统计</h3>
          <div class="mycardcont" id="type_gather"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-card :body-style="{padding: '0 10px',marginTop: '15px'}">
      <h3>数据列表</h3>
      <div style="padding:27px 10px">
        <div class="query">
          <div>
            <a-select v-model="quarydatas.type" size="large"  placeholder="设备类型" allowClear>
              <a-select-option v-for="(item,index) in quaryselect.type" :key="index" :value="item.type">{{item.type}}</a-select-option>
            </a-select>
            <a-select v-model="quarydatas.adminDepartment" size="large"  placeholder="管理部门" allowClear>
              <a-select-option v-for="(item,index) in quaryselect.adminDepartment" :key="index" :value="item.adminDepartment">{{item.adminDepartment}}</a-select-option>
            </a-select>
            <a-select v-model="quarydatas.ownership" size="large"  placeholder="权属单位" allowClear>
              <a-select-option v-for="(item,index) in quaryselect.ownership" :key="index" :value="item.ownership">{{item.ownership}}</a-select-option>
            </a-select>
            <a-select v-model="quarydatas.runningStatus" size="large"  placeholder="运行状态" allowClear>
              <a-select-option v-for="(item,index) in quaryselect.runningStatus" :key="index" :value="item.runningStatus">{{item.runningStatus}}</a-select-option>
            </a-select>
            <a-button size="large" @click="query" type="primary">查询</a-button>
          </div>
          <div>
            <a-button size="large"  @click="add" icon="plus-circle">添加</a-button>
            <a-button size="large" icon="upload">导出</a-button>
            <a-button size="large" icon="printer">打印</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{x: 1810}" :pagination="pagination"  @change="pagechange"
                 :loading="loading">
          <div slot="action" slot-scope="text">
            <a @click="see(text.id)">查看</a>
            <a  style="padding:0 6px;color:#e6e6e6;">|</a>
            <a @click="edit(text.id)">编辑</a>
            <a  style="padding:0 6px;color:#e6e6e6;">|</a>
            <a @click="deletes(text.id)">删除</a>
          </div>
        </a-table>
      </div>
    </a-card>
    <a-modal
            :title="title"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            width="800px"
            :centered=true
            :footer="()=>{if(action===2)return null}"
    >
      <a-form
              :form="form"
              disabled
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
                    label="设备类型"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-select
                      allowClear
                      v-decorator="['type']"
                      placeholder="设备类型"
                      :disabled="action===2"
              >
                <a-select-option v-for="(item,index) in quaryselect.type" :key="index" :value="item.type">{{item.type}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="设备名称"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['name']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="管理人员"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['custodian']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="管理部门"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-select
                      allowClear
                      v-decorator="['adminDepartment']"
                      placeholder="管理部门"
                      :disabled="action===2"
              >
                <a-select-option v-for="(item,index) in quaryselect.adminDepartment" :key="index" :value="item.adminDepartment">{{item.adminDepartment}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="权属单位"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-select
                      allowClear
                      v-decorator="['ownership']"
                      placeholder="权属单位"
                      :disabled="action===2"
              >
                <a-select-option v-for="(item,index) in quaryselect.ownership" :key="index" :value="item.ownership">{{item.ownership}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="安装地点"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['site']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="运行状态"
                    :labelCol="{ span: 5 }"
                    :wrapperCol="{ span: 16, offset: 2 }"
            >
              <a-select
                      allowClear
                      v-decorator="['runningStatus']"
                      placeholder="运行状态"
                      :disabled="action===2"
              >
                <a-select-option v-for="(item,index) in quaryselect.runningStatus" :key="index" :value="item.runningStatus">{{item.runningStatus}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="备品备件"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['spare']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="使用手册"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['manual']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="制造商"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['manufacturer']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="售后服务商"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['afterSale']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="维修记录"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['repairRecord']"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
                    label="备注"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 16, offset: 2 }"
            >
              <a-input :disabled="action===2" v-decorator="['remark']"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      device: [
        {
          name: '格栅数量',
          num: 6
        },
        {
          name: '水泵数量',
          num: 14
        },
        {
          name: '闸门数量',
          num: 3
        },
        {
          name: '启闭机数量',
          num: 4
        },
        {
          name: '鼓风机数量',
          num: 4
        },
        {
          name: '变压器数量',
          num: 4
        },
        {
          name: '配电柜数量',
          num: 4
        },
      ], //设备统计
      columns: [
        { title: '设备类型', width: 160, dataIndex: 'type', key: 'type'},
        { title: '设备名称', width: 120, dataIndex: 'name', key: 'name',  },
        { title: '管理人员', dataIndex: 'custodian', key: 'custodian', width: 120 },
        { title: '管理部门', dataIndex: 'adminDepartment', key: 'adminDepartment', width: 120 },
        { title: '权属单位', dataIndex: 'ownership', key: 'ownership', width: 120 },
        { title: '安装地点', dataIndex: 'site', key: 'site', width: 120 },
        { title: '运行状态', dataIndex: 'runningStatus', key: 'runningStatus', width: 140 },
        { title: '备品备件', dataIndex: 'spare', key: 'spare', width: 120 },
        { title: '使用手册', dataIndex: 'manual', key: 'manual', width: 120 },
        { title: '制造商', dataIndex: 'manufacturer', key: 'manufacturer', width: 120 },
        { title: '售后服务商', dataIndex: 'afterSale', key: 'afterSale', width: 120 },
        { title: '维修记录', dataIndex: 'repairRecord', key: 'repairRecord', width: 120 },
        { title: '备注', dataIndex: 'remark', key: 'remark', width: 150 },
        {
          title: '操作',
          key: 'toolBar',
          fixed: 'right',
          width: 160,
          scopedSlots: { customRender: 'action' },
        },
      ], //表格列
      data: [],  //表格数据
      pagination: {
        current: 1,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'small',
        total: 0,
        showTotal: total => `共 ${total} 条`,
        // onShowSizeChange:(current, pageSize)=>this.pageSize = pageSize,
        pageSizeOptions: ['10', '20', '30', '40', '50']
      }, // 分页配置
      loading: false, // 表格是否加载中
      quarydatas: {
      }, // 准备查询的数据
      quarydata: {
      }, // 查询数据
      quaryselect: {}, //下拉选项
      visible: false,
      form: this.$form.createForm(this),
      title: '新增设备信息',
      action: 0,  //0为新增，1为编辑，2为查看
      id: 0
    }
  },
  created() {
    // 获取全部下拉框选项
    this.$get("equipment/ledger/getDic", {})
      .then(res => {
        if (res) {
          // console.log(res);
          this.quaryselect = res.data.data
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.getlist()
  },
  mounted() {
    setTimeout(() => {
      this.echartstype()
    }, 0)
  },
  methods: {
    //绘制设备类型统计图表
    echartstype () {
      var echarts_type = this.$echarts.init(document.getElementById('type_gather')),
        options_type = {
          //报警类型统计图表
          title: {
            text: '所有设备分类统计',
            x: 'center',
            y: 10,
            textStyle: {
              fontSize: 18,
              color: '#323232'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}",
            extraCssText: 'width:100px;height:50px;',
            // position:function(p){
            // 	return [p[0] + 20, p[1] - 20];
            // },
          },
          legend: {
            orient: 'vertical',
            left: 15,
            top: '10%',
            itemGap: 20,
            data: ['格栅', '水泵', '自控', '变压器', '配电柜', '变压器1', '配电柜1']
          },
          series: [{
            name: '设备类型',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [{
              value: 2,
              name: '格栅'
            },
              {
                value: 1,
                name: '水泵'
              },
              {
                value: 2,
                name: '自控'
              },
              {
                value: 2,
                name: '变压器'
              },
              {
                value: 2,
                name: '配电柜'
              },
              {
                value: 2,
                name: '变压器1'
              },
              {
                value: 2,
                name: '配电柜1'
              }
            ],
            color: ['#d0e5bb', '#384852', '#417e98', '#86b9c4', '#b4d5d8'],
            label: {

              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: {
              normal: {
                show: false,
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
          }]
        };
      echarts_type.setOption(options_type);
      window.onresize = echarts_type.resize;
      echarts_type.resize()
    },
    // 获取数据列表
    getlist () {
      this.$get("equipment/ledger/getList", {...this.quarydata,limit: this.pagination.pageSize, page: this.pagination.current,})
        .then(res => {
          if (res) {
            // console.log(res);
            res.data.data.forEach((val) => {
              val.key = val.id
            })
            this.pagination.total = res.data.count
            this.data = res.data.data
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 添加
    add () {
      this.action = 0
      this.visible = true;
    },
    // 确认
    handleOk () {
      if (this.action === 0) {
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.$post("equipment/ledger/create", {...values})
              .then(res => {
                if (res) {
                  // console.log(res);
                  this.visible = false
                  this.getlist()
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }else if (this.action === 1){
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.$post("equipment/ledger/update", {...values, id: this.id})
              .then(res => {
                if (res) {
                  // console.log(res);
                  this.visible = false
                  this.getlist()
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
      this.form.resetFields()
    },
    // 取消
    handleCancel () {
      this.visible = false;
      this.form.resetFields()
    },
    // 编辑
    edit (id) {
      this.visible = true;
      this.title = '信息编辑'
      this.action = 1
      this.id = id
      this.$get("equipment/ledger/getDetail", {id})
        .then(res => {
          if (res) {
            // console.log(res);
            // delete res.data.data.id
            this.form.setFieldsValue(res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除
    deletes (id) {
      this.$post("equipment/ledger/del", {id})
        .then(res => {
          if (res) {
            // console.log(res);
            this.getlist()
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查看
    see (id) {
      this.visible = true;
      this.title = '查看详细信息'
      this.action = 2
      this.$get("equipment/ledger/getDetail", {id})
        .then(res => {
          if (res) {
            // console.log(res);
            delete res.data.data.id
            this.form.setFieldsValue(res.data.data)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 查询
    query () {
      this.quarydata = this.quarydatas;
      this.pagination.current = 1;
      this.getlist()
    },
    // 页码改变时重新获取数据
    pagechange (pagination) {
      if(this.pagination.pageSize !== pagination.pageSize){
        pagination.current = 1;
      }
      this.pagination = pagination;
      this.getlist()
    },
  },
}
</script>
<style scoped lang="scss">
.mycardcont{
  height: 440px;
}
#type_gather{
  height: 440px;
  width: 100%;
}
.query{
  display: flex;
  justify-content: space-between;
  &>div:nth-of-type(1){
    flex: 1;
    .ant-select{
      width: calc(25% - 40px);
      margin-right: 15px;
      max-width: 250px;
    }
  }
  &>div:nth-of-type(2){
    .ant-btn{
      margin-left: 15px;
    }
  }
}
.ant-select-disabled,.ant-select-disabled .ant-select-selection, .ant-input-disabled {
  background-color: #fff;
  cursor: default;
  color: rgba(0, 0, 0, 0.65);
}
div{}
</style>