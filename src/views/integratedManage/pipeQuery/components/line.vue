<template>
  <div>
    <div class="query">
      <span>埋设类型：</span>
      <a-select v-model="quarydatas.mslx" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in line.mslx" :key="index" :value="item.MSLX">{{item.MSLX}}</a-select-option>
      </a-select>
      <span>管径：</span>
      <a-select v-model="quarydatas.gj" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in line.gj" :key="index" :value="item.GJ">{{item.GJ}}</a-select-option>
      </a-select>
      <span>材质：</span>
      <a-select v-model="quarydatas.cz" size="large"  placeholder="请选择" allowClear>
        <a-select-option v-for="(item,index) in line.cz" :key="index" :value="item.CZ">{{item.CZ}}</a-select-option>
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
        <li><div>管线性质</div><div>{{detailinfo.gxxz}}</div></li>
        <li><div>线型</div><div>{{detailinfo.xx}}</div></li>
        <li><div>起点点号</div><div>{{detailinfo.qddh}}</div></li>
        <li><div>终点点号</div><div>{{detailinfo.zddh}}</div></li>
        <li><div>起点埋深  (m)</div><div>{{detailinfo.qdms}}</div></li>
        <li><div>终点埋深 (m)</div><div>{{detailinfo.zdms}}</div></li>
        <li><div>起点高程 (m)</div><div>{{detailinfo.qdgc}}</div></li>
        <li><div>终点高程 (m)</div><div>{{detailinfo.zdgc}}</div></li>
        <li><div>管径 (mm)</div><div>{{detailinfo.gj}}</div></li>
        <li><div>沟截面宽高  (mm)</div><div>{{detailinfo.gjmkg}}</div></li>
        <li><div>材质</div><div>{{detailinfo.cz}}</div></li>
        <li><div>总孔数</div><div>{{detailinfo.zks}}</div></li>
        <li><div>已用孔数</div><div>{{detailinfo.yyks}}</div></li>
        <li><div>流向</div><div>{{detailinfo.lx}}</div></li>
        <li><div>埋设类型</div><div>{{detailinfo.mslx}}</div></li>
        <li><div>建设年代</div><div>{{detailinfo.buildtime}}</div></li>
        <li><div>使用年限</div><div>{{detailinfo.synx}}</div></li>
        <li><div>权属单位</div><div>{{detailinfo.qsdw}}</div></li>
        <li><div>通道权属</div><div>{{detailinfo.tdqs}}</div></li>
        <li><div>使用状态</div><div>{{detailinfo.syzt}}</div></li>
        <li><div>探测状态</div><div>{{detailinfo.tczt}}</div></li>
        <li><div>探测单位</div><div :title="detailinfo.tcdw">{{detailinfo.tcdw}}</div></li>
        <li><div>探测时间</div><div>{{detailinfo.tcsj}}</div></li>
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
          { title: '起始点号', width: 150, dataIndex: 'qddh', key: 'qddh',  },
          { title: '截止点号', dataIndex: 'zddh', key: 'zddh', width: 150 },
          { title: '材质', dataIndex: 'cz', key: 'cz', width: 150 },
          { title: '管径 (mm)', dataIndex: 'gj', key: 'gj', width: 150 },
          { title: '埋设类型', dataIndex: 'mslx', key: 'mslx', width: 120 },
          { title: '附属物', dataIndex: 'tcsj', key: 'tcsj', width: 120 },
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
        line: {
          mslx: [],
          gj: [],
          cz: [],
        }, // 污水管井下拉选项数据
        visible: false,
        confirmLoading: false,
        detailinfo: {}
      }
    },
    props: ['type'],
    created() {
      // console.log(this.type);
      for(let i in this.line) {
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
              this.$set(this.line, column, res.data.data)
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
      padding: 0 10px;
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