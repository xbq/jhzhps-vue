<template>
  <div>
    <div class="query">
      <div>
        <a-range-picker size="large" allowClear  @change="onChange"></a-range-picker>
        <a-button size="large" type="primary" @click="searchs">查询</a-button>
      </div>
    </div>
    <a-table :rowClassName="(record,index)=>{return record.key===tableactive?'tableactive':''}" size="middle" :customRow="customRow" :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{ y: 'calc(100vh - 379px)', x: 1330}" :pagination="pagination" @change="pagechange"
             :loading="loading">
      <a slot="action" slot-scope="text" href="javascript:;">打印</a>
    </a-table>
  </div>
</template>

<script>
  export default {
    name: "tables",
    data() {
      return {
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
        // rowDetails: {}, //选中行数据
        customRow:  (record) => {
          return {
            on: { // 事件
              click: () => {
                // console.log(record);
                this.tableactive = record.key
                // this.rowDetails = record
                this.$emit('rowDetails', record)
                // this.getmapplace(record.roadName)
              },       // 点击行
              mouseenter: () => {
              },  // 鼠标移入行
            },
          }
        }, // 设置表格行事件
        tableactive: 0, // 表格选中行的key
        quarydata: {}, //将要查询的时间段
        quarydatas: {}, //查询的时间段
      }
    },
    created() {
      this.getlist()
    },
    mounted() {
      // this.getlist()
    },
    props: {
      status: Number,
      columns: Array,
      getlistdata: {
        type: Object,
        default: () => {
          return {}
        }
      },
    },
    watch: {
      status() {
        this.quarydatas = {};
        this.pagination.pageSize = 10;
        this.pagination.current = 1;
        this.getlist()
      }
    },
    methods: {
      // 搜索
      searchs() {
        this.quarydatas = this.quarydata;
        this.pagination.pageSize = 10;
        this.pagination.current = 1;
        this.getlist()
      },
      getlist () {
        // 科室审核通过表格数据
        this.$get("task/getList", {status: this.status, ...this.getlistdata, limit: this.pagination.pageSize, page: this.pagination.current, ...this.quarydatas})
          .then(res => {
            if (res) {
              // console.log(res);
              this.pagination.total = res.data.count
              if (res.data.data.length > 0) {
                this.data = res.data.data
                this.data.forEach((val, index) => {
                  val.key = index
                })
                // this.rowDetails = this.data[0]
                this.$emit('rowDetails', this.data[0])
                this.tableactive = 0
              }else {
                this.data = []
                this.$emit('rowDetails', {})
              }
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
      // 获取查询的时间段
      onChange (date,datestring) {
        this.quarydata.beginTime = datestring[0]
        this.quarydata.endTime = datestring[1]
      },
    }
  }
</script>

<style scoped lang="scss">
.query{
  button{
    margin-left: 20px;
  }
}
</style>