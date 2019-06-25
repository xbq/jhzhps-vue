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
    <a-table :columns="columns" :dataSource="data" size="middle" :style="{marginTop: '10px'}" :scroll="{ x: 1620, y: 'calc(100vh - 320px)' }"  @change="pagechange" :pagination="pagination"
             :loading="loading">
      <div slot="action" slot-scope="text">
        <a>查看</a>
        <span style="padding: 0 3px;color: #e6e6e6;">|</span>
        <a>定位</a>
      </div>
    </a-table>
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
      let tab = document.getElementsByClassName('ant-table-body')
      for (let i = 0; i < tab.length; i++) {
        tab[i].style.height = 'calc(100vh - 320px)'
      }
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
</style>