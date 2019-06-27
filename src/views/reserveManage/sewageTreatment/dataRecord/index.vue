<template>
  <div class="app-container">
    <a-card :body-style="{padding: '0 10px'}">
      <h3>数据列表</h3>
      <ul class="L-tabtitle">
        <li :class="wateractive === 0 ? 'active' : ''" @click="waterechart(0)">泵井液位</li>
        <li :class="wateractive === 1 ? 'active' : ''" @click="waterechart(1)">PH值</li>
        <li :class="wateractive === 2 ? 'active' : ''" @click="waterechart(2)">COD</li>
        <li :class="wateractive === 3 ? 'active' : ''" @click="waterechart(3)">氨氮</li>
        <li :class="wateractive === 4 ? 'active' : ''" @click="waterechart(4)">总磷</li>
        <li :class="wateractive === 5 ? 'active' : ''" @click="waterechart(5)">总氮</li>
      </ul>
      <div id="L-waterecharts"  style="height: 400px;width: 100%"></div>
    </a-card>
    <a-card :body-style="{padding: '0 10px',marginTop: '15px'}">
      <h3>数据列表</h3>
      <div style="padding:27px 10px 0">
        <div class="query">
          <div>
            <a-range-picker size="large" allowClear  @change="onChange"></a-range-picker>
            <a-select v-model="quarydata.checkPointId" size="large"  placeholder="所有泵站" allowClear>
              <a-select-option value="">所有泵站</a-select-option>
              <a-select-option value="0">泵站1</a-select-option>
              <a-select-option value="1">泵站2</a-select-option>
              <a-select-option value="2">泵站3</a-select-option>
              <a-select-option value="3">泵站4</a-select-option>
              <a-select-option value="4">泵站5</a-select-option>
            </a-select>
            <a-select v-model="quarydata.alarmType" placeholder="所有数据类型" size="large" allowClear>
              <a-select-option value="">所有数据类型</a-select-option>
              <a-select-option value="0">类型1</a-select-option>
              <a-select-option value="1">类型2</a-select-option>
              <a-select-option value="2">类型3</a-select-option>
              <a-select-option value="3">类型4</a-select-option>
              <a-select-option value="4">类型5</a-select-option>
              <a-select-option value="5">类型6</a-select-option>
              <a-select-option value="6">类型7</a-select-option>
            </a-select>
            <a-button size="large" type="primary">查询</a-button>
          </div>
        </div>
        <a-table :columns="columns" :dataSource="data" :style="{marginTop: '20px'}" :scroll="{}" :pagination="pagination"
                 :loading="loading" :locale="{emptyText: '数据待接入'}">
        </a-table>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { title: '时间', width: 200, dataIndex: 'alarmTime', key: 'alarmTime'},
        { title: '泵站', width: 200, dataIndex: 'checkPointId', key: 'checkPointId',  },
        { title: '数据类型', dataIndex: 'alarmType', key: 'alarmType', width: 200 },
        { title: '数据值', dataIndex: 'dataValue', key: 'dataValue', width: 200 },
      ], //表格列
      data: [],  //表格数据
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
      quarydata: {
      }, // 查询数据
      wateractive: 0,
      options: [
        {
          color: ['#c23531', '#2f4554', '#61a0a8', '#6ea861', '#c37733', '#333ac3', '#a86161', '#61a884', '#8961a8', '#a89d61'],
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line', // 默认为直线，可选为：'line' | 'shadow'
              lineStyle: {
                color: '#e0e0e0'
              }
            }
          },
          legend: {
            y: 50,
            data:['婺剧院北','东阳街梅溪桥北','环城南路东市街','金星街G330','李渔桥下', '双龙南街二环路', '桐溪污水干管', '婺剧院南', '永济桥北桥头', '永济桥南桥头']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,
            boundaryGap: false,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: 'cm',
            nameLocation: 'end',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'line',
              smooth: false,
              name: '婺剧院北',
              barWidth: '40%',
              data: [10, 201, 151, 64, 30, 27, 130, 40, 30]
            },
            {
              type: 'line',
              smooth: false,
              name: '东阳街梅溪桥北',
              barWidth: '40%',
              data: [10, 21, 51, 164, 33, 56, 30, 140, 130]
            },
            {
              type: 'line',
              smooth: false,
              name: '环城南路东市街',
              barWidth: '40%',
              data: [110, 121, 59, 64, 133, 77, 82, 14, 13]
            },
            {
              type: 'line',
              smooth: false,
              name: '金星街G330',
              barWidth: '40%',
              data: [120, 121, 151, 34, 33, 133, 56, 79, 65]
            },
            {
              type: 'line',
              smooth: false,
              name: '李渔桥下',
              barWidth: '40%',
              data: [12, 23, 39, 130, 129, 120, 76, 88, 56]
            },
            {
              type: 'line',
              smooth: false,
              name: '双龙南街二环路',
              barWidth: '40%',
              data: [109, 100, 90, 80, 89, 109, 120, 45, 40]
            },
            {
              type: 'line',
              smooth: false,
              name: '桐溪污水干管',
              barWidth: '40%',
              data: [130, 121, 133, 89, 87, 67, 57, 40, 35]
            },
            {
              type: 'line',
              smooth: false,
              name: '婺剧院南',
              barWidth: '40%',
              data: [88, 34, 64, 87, 102, 110, 88, 56, 50]
            },
            {
              type: 'line',
              smooth: false,
              name: '永济桥北桥头',
              barWidth: '40%',
              data: [107, 29, 55, 78, 109, 201, 189, 156, 100]
            },
            {
              type: 'line',
              smooth: false,
              name: '永济桥南桥头',
              barWidth: '40%',
              data: [83, 30, 54, 108, 128, 155, 109, 99, 84]
            },
          ]
        },
        {
          color: ['#0084b7', '#00d099'],
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'line', // 默认为直线，可选为：'line' | 'shadow'
              lineStyle: {
                color: '#e0e0e0'
              }
            }
          },
          legend: {
            y: 50,
            data:['进水口','出水口']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,
            boundaryGap: false,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            min:0,
            max:14,
            name: '',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'line',
              // smooth: false,
              name: '进水口',
              data: [5, 8, 5, 8, 5, 4, 3, 7, 7, 5, 8, 5, 8, 5, 3, 4, 7, 6],
              markLine: {
                silent: true,
                data: [{
                  yAxis: 7
                }],
                lineStyle: {
                  color: '#c23531'
                }
              }
            },
            {
              type: 'line',
              // smooth: false,
              name: '出水口',
              data: [5, 7, 5, 6, 8, 5, 7, 6, 6, 7, 8, 6, 6, 5, 7, 6, 7, 8],
              markLine: {
                silent: true,
                data: [{
                  yAxis: 7
                }],
                lineStyle: {
                  color: '#c23531'
                }
              }
            },
          ]
        },
        {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 50,
            data:['进水口','出水口']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: 'mg/L',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#255a7e'
                }
              },
              name: '进水口',
              barWidth: '20%',
              barGap: 0,
              data: [660, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#007acc'
                }
              },
              name: '出水口',
              barWidth: '20%',
              barGap: 0,
              data: [160, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
          ]
        },
        {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 50,
            data:['进水口','出水口']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: 'mg/L',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#0084b7'
                }
              },
              name: '进水口',
              barWidth: '20%',
              barGap: 0,
              data: [660, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#5c9eb8'
                }
              },
              name: '出水口',
              barWidth: '20%',
              barGap: 0,
              data: [160, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
          ]
        },
        {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 50,
            data:['进水口','出水口']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: 'mg/L',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#009487'
                }
              },
              name: '进水口',
              barWidth: '20%',
              barGap: 0,
              data: [660, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#6bb2ac'
                }
              },
              name: '出水口',
              barWidth: '20%',
              barGap: 0,
              data: [160, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
          ]
        },
        {
          tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            y: 50,
            data:['进水口','出水口']
          },
          grid: {
            show: false,
            left: '3%',
            right: '4%',
            bottom: '5%',
            top: 100,
            containLabel: true
          },
          xAxis: {
            show: true,

            axisLabel: {
              interval: 0,
              // rotate:20,
              // margin: 20,
              textStyle: {
                color: '#323232',
                align: 'center'

              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00'],
            splitLine: {
              show: false,
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          },
          yAxis: [{
            type: 'value',
            name: 'mg/L',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
              color: '#BCBCBC',
              fontSize: 12
            },
            axisLabel: {
              textStyle: {
                color: '#323232',
              },
            },
            axisLine: {
              lineStyle: {
                color: '#e0e0e0'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: ['#e0e0e0'],
                type: 'solid'
              }
            },
          }],
          // dataZoom: [
          //     { type: "inside"}
          // ],

          dataZoom: [ //给x轴设置滚动条
            {
              start: 0, //默认为0
              end: 70,
              type: 'slider',
              show: false,
            },
            //下面这个属性是里面拖到
            {
              type: 'inside',
              show: true,
              xAxisIndex: [0],
              start: 0, //默认为1
              end: 50
            }
          ],
          series: [
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#3f9981'
                }
              },
              name: '进水口',
              barWidth: '20%',
              barGap: 0,
              data: [660, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
            {
              type: 'bar',
              label: {
                normal: {
                  show: false,
                  position: 'top',
                  textStyle: {
                    fontSize: 12,
                    color: '#0099FF'
                  }
                }
              },
              itemStyle: {
                normal: {
                  color: '#00d099'
                }
              },
              name: '出水口',
              barWidth: '20%',
              barGap: 0,
              data: [160, 841, 521, 820, 578, 127, 100, 730, 700, 660, 841, 521, 820, 578, 127, 100, 730, 700]
            },
          ]
        }], //图表配置
    }
  },
  created() {
  },
  mounted() {
    setTimeout(()=>{
      this.echarts(0)
    },0)
  },
  methods: {
    echarts(i) {
      let Lwaterecharts = this.$echarts.init(document.getElementById('L-waterecharts'))
      Lwaterecharts.clear()
      let options = this.options[i];
      Lwaterecharts.setOption(options);
      window.onresize = Lwaterecharts.resize;
      Lwaterecharts.resize()
    },
    waterechart(i) {
      this.wateractive = i
      this.echarts(i)
    },
    // 获取查询的时间段
    onChange (date,datestring) {
      this.quarydata.beginTime = datestring[0]
      this.quarydata.endTime = datestring[1]
    },
  },
}
</script>
<style scoped lang="scss">
.L-tabtitle{
  display: flex;
  justify-content: center;
  margin-top: 15px;
  li{
    padding: 0 15px;
    line-height: 30px;
    height: 30px;
    background-color: #ffffff;
    border: solid 1px #e0e0e0;
    border-right: 0;
    letter-spacing: 1px;
    color: #888888;
    cursor: pointer;
    &:nth-of-type(1){
      border-radius: 3px 0 0 3px;
    }
    &:nth-last-of-type(1){
      border-radius: 0 3px 3px 0;
      border-right: solid 1px #e0e0e0;
    }
  }
  .active{
    background-color: #0095ff;
    color: #ffffff;
  }
}
.query{
  display: flex;
  justify-content: space-between;
  .ant-select,.ant-calendar-picker{
    width: 200px;
    margin-right: 15px;
  }
  &>div:nth-of-type(2){
    .ant-btn{
      margin-left: 15px;
    }
  }
}
div{}
</style>