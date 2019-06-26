<template>
  <div>
    <div class="query">
      <span>附属物：</span>
      <a-select v-model="quarydatas.fsw" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in point.fsw" :key="index" :value="item.FSW">{{item.FSW}}</a-select-option>
      </a-select>
      <span>特征点：</span>
      <a-select v-model="quarydatas.tzd" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in point.tzd" :key="index" :value="item.TZD">{{item.TZD}}</a-select-option>
      </a-select>
      <span>材质：</span>
      <a-select v-model="quarydatas.jgcz" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in point.jgcz" :key="index" :value="item.JGCZ">{{item.JGCZ}}</a-select-option>
      </a-select>
      <span>所在道路：</span>
      <a-input size="large" v-model="quarydatas.szdl"></a-input>
      <a-button size="large" type="primary" @click="query">查询</a-button>
    </div>
    <a-table bordered :columns="columns" :dataSource="data" size="middle" :style="{marginTop: '10px'}" :scroll="{ x: 1620, y: 'calc(100vh - 320px)' }"  @change="pagechange" :pagination="pagination"
             :loading="loading">
      <div slot="action" slot-scope="text" style="text-align: center">
        <a @click="see(text.id)">查看</a>
        <span style="padding: 0 8px;color: #e6e6e6;">|</span>
        <a>定位</a>
      </div>
    </a-table>
    <a-modal
            title="查看详细信息"
            :visible="visible"
            :confirmLoading="confirmLoading"
            @cancel="handleCancel"
            :centered=true
            :footer="null"
            width="800px"
    >
      <ul class="detail">
        <li><div>物探点号</div><div>{{detailinfo.wtdh}}</div></li>
        <li><div>图上点号</div><div>{{detailinfo.tsdh}}</div></li>
        <li><div>X坐标  (m)</div><div>{{detailinfo.xzb}}</div></li>
        <li><div>Y坐标  (m)</div><div>{{detailinfo.yzb}}</div></li>
        <li><div>地面高程  (m)</div><div>{{detailinfo.dmgc}}</div></li>
        <li><div>特征点</div><div>{{detailinfo.tzd}}</div></li>
        <li><div>附属物</div><div>{{detailinfo.fsw}}</div></li>
        <li><div>偏心井位</div><div>{{detailinfo.pxjw}}</div></li>
        <li><div>井室附属物代码</div><div>{{detailinfo.jsfswdm}}</div></li>
        <li><div>井盖材质</div><div>{{detailinfo.jgcz}}</div></li>
        <li><div>井盖规格</div><div>{{detailinfo.jggg}}</div></li>
        <li><div>井底深  (m)</div><div>{{detailinfo.jds}}</div></li>
        <li><div>井室规格 (mm)</div><div>{{detailinfo.jsgg}}</div></li>
        <li><div>井脖高 (mm)</div><div>{{detailinfo.jbg}}</div></li>
        <li><div>井脖规格 (mm)</div><div>{{detailinfo.jbgg}}</div></li>
        <li><div>井室角度 (rad)</div><div>{{detailinfo.jsjd}}</div></li>
        <li><div>井盖照片代码</div><div>{{detailinfo.jgzpdm}}</div></li>
        <li><div>图幅号</div><div>{{detailinfo.tfh}}</div></li>
        <li><div>图例角度  (°)</div><div>{{detailinfo.tljd}}</div></li>
        <li><div>所在道路</div><div>{{detailinfo.szdl}}</div></li>
        <li><div>建设年代</div><div>{{detailinfo.buildtime}}</div></li>
        <li><div>备注</div><div  :title="detailinfo.remark">{{detailinfo.remark}}</div></li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "gj",
    data() {
      return {
        columns: [
          { title: '所在道路', width: 150, dataIndex: 'szdl', key: 'szdl'},
          { title: '附属物', width: 120, dataIndex: 'fsw', key: 'fsw',  },
          { title: '特征点', dataIndex: 'tzd', key: 'tzd', width: 100 },
          { title: '井盖规格 (mm)', dataIndex: 'jggg', key: 'jggg', width: 150 },
          { title: '井盖材质', dataIndex: 'jgcz', key: 'jgcz', width: 120 },
          { title: '井底深 (m)', dataIndex: 'jds', key: 'jds', width: 120 },
          { title: '井室规格 (mm)', dataIndex: 'jsgg', key: 'jsgg', width: 200 },
          { title: '井室角度 (rad)', dataIndex: 'jsjd', key: 'jsjd', width: 200 },
          { title: '井脖高 (mm)', dataIndex: 'jbg', key: 'jbg', width: 150 },
          { title: '井脖规格 (mm)', dataIndex: 'jbgg', key: 'jbgg', width: 200 },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 110,
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
        }, // 准备查询数据的参数
        quarydata: {
        }, // 查询数据参数
        point: {
          fsw: [],
          tzd: [],
          jgcz: [],
        }, // 污水管井下拉选项数据
        visible: false,
        confirmLoading: false,
        detailinfo: {}
      }
    },
    props: ['type'],
    created() {
      // console.log(this.type);
      for(let i in this.point) {
        this.getquerylist(this.type, i)
      }
      this.getlist()
    },
    mounted() {

    },
    methods: {
      // 查询
      query () {
        this.quarydata = this.quarydatas;
        this.pagination.current = 1;
        this.getlist()
      },
      // 获取表格数据
      getlist () {
        this.$get("guanWang/getList", {type: this.type,limit: this.pagination.pageSize, page: this.pagination.current, ...this.quarydata})
          .then(res => {
            if (res) {
              this.data = res.data.data;
              if(this.data.length > 0){
                document.getElementsByClassName('ant-table-body')[0].style.height = 'calc(100vh - 320px)'
              }else {
                document.getElementsByClassName('ant-table-body')[0].style.height = 'unset'
              }
              this.data.forEach( (val)=> {
                val.key = val.id
                for(let item in val){
                  if(!val[item]){
                    val[item] = '--'
                  }
                }
              });
              this.pagination.total = res.data.count
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取查询下拉框数据
      getquerylist (tableName, column) {
        this.$get("guanWang/getComboBox", {tableName: tableName, column: column})
          .then(res => {
            if (res) {
              // console.log(res);
              this.$set(this.point, column, res.data.data)
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 页码改变时重新获取数据
      pagechange (pagination) {
        if(this.pagination.pageSize !== pagination.pageSize){
          pagination.current = 1;
        }
        this.pagination = pagination;
        this.getlist()
      },
      handleCancel () {
        this.visible = false
        console.log('cancel');
      },
      see (id) {
        this.visible = true
        this.$get("guanWang/getById", {type: this.type, id: id})
          .then(res => {
            if (res) {
              console.log(res);
              this.detailinfo = res.data.data
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped lang="scss">
.query{
  .ant-select,.ant-input{
    width: 160px;
    margin-right: 10px;
  }
  @media screen and (min-width: 1440px) {
    .ant-select,.ant-input{
      width: 200px;
    }
  }
  @media screen and (min-width: 1600px) {
    .ant-select,.ant-input{
      width: 240px;
    }
  }
}
.detail{
  display: flex;
  flex-wrap: wrap;
  li{
    width: 367px;
    display: flex;
    height: 38px;
    line-height: 38px;
    border: 1px solid #e6e6e6;
    div:nth-of-type(1){
      width: 140px;
      background-color: #FBFBFB;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-right: 1px solid #e6e6e6;
      padding: 0 15px;
    }
    div:nth-of-type(2){
      width: 225px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      padding: 0 15px;
    }
  }
  li:nth-of-type(2n){
    margin-left: 15px;
  }
  li:nth-of-type(n+3){
    margin-top: 15px;
  }
}
</style>