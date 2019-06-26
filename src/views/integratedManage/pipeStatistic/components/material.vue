<template>
  <div>
    <a-table bordered :columns="columns0" :dataSource="data0" size="middle" :pagination="false"
             :loading="loading[0]">
    </a-table>
    <a-table bordered :columns="columns" :dataSource="data" size="middle" :style="{marginTop: '20px'}" @change="pagechange" :scroll="{x: 1800, y: 477}" :pagination="pagination"
             :loading="loading[1]">
    </a-table>
  </div>
</template>

<script>
  export default {
    name: "material",
    data() {
      return {
        columns0: [
          { title: '', width: 150, dataIndex: 'all', key: 'all', align: 'center'},
          {
            title: '材质',
            children: [
              {
                title: '砖',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_z', key: 'ys_z', width: 150, align: 'center',
                    customRender: (value, row, index) => {
                      const obj = {
                        children: value,
                        attrs: {},
                      };
                      if (index === 1) {
                        obj.attrs.colSpan = 2;
                      }
                      if (index === 2) {
                        obj.attrs.colSpan = 16;
                      }
                      return obj;
                    }
                  },
                  { title: '污水（m）', dataIndex: 'ws_z', key: 'ws_z', width: 150, align: 'center',
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
              {
                title: '砖混',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zh', key: 'ys_zh', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_zh', key: 'ws_zh', width: 150, align: 'center',
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
              {
                title: 'PVC',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_pvc', key: 'ys_pvc', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_pvc', key: 'ws_pvc', width: 150, align: 'center',
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
              {
                title: 'PE',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_pe', key: 'ys_pe', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_pe', key: 'ws_pe', width: 150, align: 'center',
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
              {
                title: '砖石',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zs', key: 'ys_zs', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_zs', key: 'ws_zs', width: 150, align: 'center',
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
              {
                title: '钢',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_g', key: 'ys_g', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_g', key: 'ws_g', width: 150, align: 'center',
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
              {
                title: '铸铁',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zt', key: 'ys_zt', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_zt', key: 'ws_zt', width: 150, align: 'center',
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
              {
                title: '砼',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_hnt', key: 'ys_hnt', width: 150, align: 'center',
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
                  { title: '污水（m）', dataIndex: 'ws_hnt', key: 'ws_hnt', width: 150, align: 'center',
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
              }
            ]
          },
        ], //统计表格列
        data0: [],  //统计表格数据
        columns: [
          { title: '序号', width: 60, dataIndex: 'ROW_ID', key: 'ROW_ID', align: 'center'},
          { title: '所在道路', width: 150, dataIndex: 'szdl', key: 'szdl', align: 'center'},
          {
            title: '材质',
            children: [
              {
                title: '砖',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_z', key: 'ys_z', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_z', key: 'ws_z', width: 100, align: 'center'},
                ]
              },
              {
                title: '砖混',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zh', key: 'ys_zh', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_zh', key: 'ws_zh', width: 100, align: 'center'},
                ]
              },
              {
                title: 'PVC',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_pvc', key: 'ys_pvc', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_pvc', key: 'ws_pvc', width: 100, align: 'center'},
                ]
              },
              {
                title: 'PE',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_pe', key: 'ys_pe', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_pe', key: 'ws_pe', width: 100, align: 'center'},
                ]
              },
              {
                title: '砖石',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zs', key: 'ys_zs', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_zs', key: 'ws_zs', width: 100, align: 'center'},
                ]
              },
              {
                title: '钢',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_g', key: 'ys_g', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_g', key: 'ws_g', width: 100, align: 'center'},
                ]
              },
              {
                title: '铸铁',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_zt', key: 'ys_zt', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_zt', key: 'ws_zt', width: 100, align: 'center'},
                ]
              },
              {
                title: '砼',
                children: [
                  { title: '雨水（m）', dataIndex: 'ys_hnt', key: 'ys_hnt', width: 100, align: 'center'},
                  { title: '污水（m）', dataIndex: 'ws_hnt', key: 'ws_hnt', width: 100, align: 'center'},
                ]
              }
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
      // 获取材料统计
      this.$get("lineSta/getCountCZ", {})
        .then(res => {
          if (res) {
            // console.log(res);
            this.data0.push(res.data.data.subtotal[0])
            this.data0.push({
              all: '合计',
              key: 2,
              ys_g: res.data.data.aggregate[0].g,
              ys_hnt: res.data.data.aggregate[0].hnt,
              ys_pe: res.data.data.aggregate[0].pe,
              ys_pvc: res.data.data.aggregate[0].pvc,
              ys_z: res.data.data.aggregate[0].z,
              ys_zh: res.data.data.aggregate[0].zh,
              ys_zs: res.data.data.aggregate[0].zs,
              ys_zt: res.data.data.aggregate[0].zt,
            })
            this.data0.push({
              all: '总计',
              key: 3,
              ys_z: res.data.data.total[0].total,
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
        // 获取材料统计列表
        this.$get("lineSta/getListCZ", {limit: this.pagination.pageSize, page: this.pagination.current})
          .then(res => {
            if (res) {
              // console.log(res);
              this.data = res.data.data
              if(this.data.length > 0){
                document.getElementsByClassName('ant-table-body')[1].style.height = '477px'
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