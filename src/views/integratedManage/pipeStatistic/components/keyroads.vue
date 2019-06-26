<template>
  <div>
    <a-table bordered :columns="columns0" :dataSource="data0" size="middle" :scroll="{x: 1600}" :pagination="false"
             :loading="loading[0]">
    </a-table>
    <a-table bordered :columns="columns" :dataSource="data" size="middle" :style="{marginTop: '20px'}"  @change="pagechange" :scroll="{x: 2390, y: 477}" :pagination="pagination"
             :loading="loading[1]">
    </a-table>
  </div>
</template>

<script>
export default {
  name: "keyroads",
  data() {
    return {
      columns0: [
        { title: '', width: 150, dataIndex: 'all', key: 'all', align: 'center'},
        {
          title: '道路长度（m）', width: 150, dataIndex: 'TOTALLENGTH', key: 'TOTALLENGTH', align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        {
          title: '道路面积（m²）', width: 150, dataIndex: 'TOTALAREA', key: 'TOTALAREA',align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        {
          title: '雨水管道长度（m）', dataIndex: 'YSTOTALLEN', key: 'YSTOTALLEN', width: 150,align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        {
          title: '污水管道长度（m）', dataIndex: 'WSTOTALLEN', key: 'WSTOTALLEN', width: 150, align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        {
          title: '管径',
          children: [
            {
              title: '0 - 300（mm）',
              children: [
                { title: '雨水（m）', dataIndex: 'YS1', key: 'YS1', width: 150, align: 'center',
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
                { title: '污水（m）', dataIndex: 'WS1', key: 'WS1', width: 150, align: 'center',
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
                { title: '雨水（m）', dataIndex: 'YS2', key: 'YS2', width: 150, align: 'center',
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
                { title: '污水（m）', dataIndex: 'WS2', key: 'WS2', width: 150, align: 'center',
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
                { title: '雨水（m）', dataIndex: 'YS3', key: 'YS3', width: 150, align: 'center',
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
                { title: '污水（m）', dataIndex: 'WS3', key: 'WS3', width: 150, align: 'center',
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
                { title: '雨水（m）', dataIndex: 'YS4', key: 'YS4', width: 150, align: 'center',
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
                { title: '污水（m）', dataIndex: 'WS4', key: 'WS4', width: 150, align: 'center',
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
        { title: '污水井（个）', dataIndex: 'WSJCOUNT', key: 'WSJCOUNT', width: 150, align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        { title: '雨水井（个）', dataIndex: 'YSJCOUNT', key: 'YSJCOUNT', width: 150, align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          }
        },
        { title: '雨水篦（个）', dataIndex: 'BZCOUNT', key: 'BZCOUNT', width: 150, align: 'center',
          customRender: (value, row, index) => {
            const obj = {
              children: value,
              attrs: {},
            };
            if (index === 0) {
              obj.attrs.rowSpan = 3;
            }
            if (index > 0) {
              obj.attrs.colSpan = 0;
            }
            return obj;
          } },
      ], //统计表格列
      data0: [],  //统计表格数据
      columns: [
        { title: '序号', width: 60, dataIndex: 'ROW_ID', key: 'ROW_ID', align: 'center'},
        { title: '所在道路', width: 150, dataIndex: 'szdl', key: 'szdl', align: 'center'},
        { title: '起点', width: 120, dataIndex: 'start', key: 'start', align: 'center'},
        { title: '终点', dataIndex: 'end', key: 'end', width: 120, align: 'center'},
        {title: '道路长度（m）', width: 150, dataIndex: 'length', key: 'length', align: 'center'},
        {title: '道路宽度（m）', width: 150, dataIndex: 'width', key: 'width', align: 'center'},
        {title: '道路面积（m²）', width: 150, dataIndex: 'area', key: 'area',align: 'center'},
        {title: '雨水管道长度（m）', dataIndex: 'ys_len_total', key: 'ys_len_total', width: 150,align: 'center'},
        {title: '污水管道长度（m）', dataIndex: 'ws_len_total', key: 'ws_len_total', width: 150, align: 'center'},
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
        { title: '污水井（个）', dataIndex: 'wsj', key: 'wsj', width: 150, align: 'center'},
        { title: '雨水井（个）', dataIndex: 'ysj', key: 'ysj', width: 150, align: 'center'},
        { title: '雨水篦（个）', dataIndex: 'bz', key: 'bz', width: 150, align: 'center'},
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
    // 获取重点道路
    this.$get("lineSta/getTotalEmphasis", {})
      .then(res => {
        if (res) {
          this.data0.push(res.data.data)
          this.data0.push({
            all: '合计',
            key: 2,
            YS1: res.data.data.TOTAL1,
            YS2: res.data.data.TOTAL2,
            YS3: res.data.data.TOTAL3,
            YS4: res.data.data.TOTAL4,
          })
          this.data0.push({
            all: '总计',
            key: 3,
            YS1: res.data.data.TOTAL1+res.data.data.TOTAL2+res.data.data.TOTAL3+res.data.data.TOTAL4
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
      // 获取重点道路列表
      this.$get("lineSta/getListEmphasis", {limit: this.pagination.pageSize, page: this.pagination.current})
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