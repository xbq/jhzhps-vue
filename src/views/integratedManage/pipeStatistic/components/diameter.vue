<template>
  <div>
    <a-table bordered :columns="columns0" :dataSource="data0" size="middle" :pagination="false"
             :loading="loading[0]">
    </a-table>
    <a-table bordered :columns="columns" :dataSource="data" size="middle" :style="{marginTop: '20px'}"  @change="pagechange" :scroll="{y: 460}" :pagination="pagination"
             :loading="loading[1]">
    </a-table>
  </div>
</template>

<script>
  export default {
    name: "diameter",
    data() {
      return {
        columns0: [
          { title: '', width: 150, dataIndex: 'all', key: 'all', align: 'center'},
          {
            title: '管径',
            children: [
              {
                title: '0 - 300（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys1', key: 'ys1', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index === 1) {
                        obj.attrs.colSpan = 2;
                      }
                      if (index === 2) {
                        obj.attrs.colSpan = 8;
                      }
                      return obj;
                    }
                  },
                  { title: '污水（m）', dataIndex: 'ws1', key: 'ws1', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index > 0) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    }
                  },
                ]
              },
              { title: '300 - 600（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys2', key: 'ys2', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index === 1) {
                        obj.attrs.colSpan = 2;
                      }
                      if (index > 1) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    }
                  },
                  { title: '污水（m）', dataIndex: 'ws2', key: 'ws2', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index > 0) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    } },
                ] },
              { title: '600 - 1000（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys3', key: 'ys3', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index === 1) {
                        obj.attrs.colSpan = 2;
                      }
                      if (index > 1) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    } },
                  { title: '污水（m）', dataIndex: 'ws3', key: 'ws3', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index > 0) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    } },
                ] },
              { title: '1000以上（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys4', key: 'ys4', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index === 1) {
                        obj.attrs.colSpan = 2;
                      }
                      if (index > 1) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    } },
                  { title: '污水（m）', dataIndex: 'ws4', key: 'ws4', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index > 0) {
                        obj.attrs.rowSpan = 0;
                      }
                      return obj;
                    } },
                ] },
            ]
          },
        ], //统计表格列
        data0: [],  //统计表格数据
        columns: [
          { title: '序号', width: 60, dataIndex: 'ROW_ID', key: 'ROW_ID', align: 'center'},
          { title: '所在道路', width: 150, dataIndex: 'szdl', key: 'szdl', align: 'center'},
          {
            title: '管径',
            children: [
              {
                title: '0 - 300（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_len_1', key: 'ys_len_1', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_len_1', key: 'ws_len_1', width: 100, align: 'center'},
                ]
              },
              { title: '300 - 600（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_len_2', key: 'ys_len_2', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_len_2', key: 'ws_len_2', width: 100, align: 'center'},
                ] },
              { title: '600 - 1000（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_len_3', key: 'ys_len_3', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_len_3', key: 'ws_len_3', width: 100, align: 'center'},
                ] },
              { title: '1000以上（mm）',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_len_4', key: 'ys_len_4', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_len_4', key: 'ws_len_4', width: 100, align: 'center'},
                ] },
            ]
          },
        ], //数据列表表格列
        data: [],  //数据列表表格数据
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
        }, // 数据列表分页配置
        loading: [false, false], // 表格是否加载中
      }
    },
    created() {
      // 获取管径合计
      this.$get("lineSta/getCountGJ", {})
        .then(res => {
          if (res) {
            // console.log(res);
            this.data0.push(res.data.data.subtotal[0])
            this.data0.push({
              all: '合计',
              key: 2,
              ys1: res.data.data.aggregate[0].aggregate1,
              ys2: res.data.data.aggregate[0].aggregate2,
              ys3: res.data.data.aggregate[0].aggregate3,
              ys4: res.data.data.aggregate[0].aggregate4,
            })
            this.data0.push({
              all: '总计',
              key: 3,
              ys1: res.data.data.total[0].total,
            })
            this.$set(this.data0[0], 'key', 1)
            this.$set(this.data0[0], 'all', '小计')
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.getlist()
    },
    methods: {
      pagechange (pagination) {
        if(this.pagination.pageSize !== pagination.pageSize){
          pagination.current = 1;
        }
        this.pagination = pagination;
        this.getlist()
      },
      getlist() {
        // 获取管径合计列表
        this.$get("lineSta/getListGJ", {limit: this.pagination.pageSize, page: this.pagination.current})
          .then(res => {
            if (res) {
              // console.log(res);
              this.data = res.data.data
              if(this.data.length > 0){
                document.getElementsByClassName('ant-table-body')[1].style.height = '460px'
              }else {
                document.getElementsByClassName('ant-table-body')[1].style.height = 'unset'
              }
              this.data.forEach((val) => {
                val.key = val.ROW_ID
              })
              this.pagination.total = res.data.count
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped>

</style>