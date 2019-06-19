<template>
  <div class="L-editcard">
    <h4>{{data.name}}</h4>
    <div>
      <div class="title">
        <span>{{data.dataType}}({{data.unit}})</span>
        <div>
          <a-icon v-if="editboo" @click="editboo=false" type="form" />
          <a-icon v-else @click="cancel" type="close" />
        </div>
      </div>
      <ul class="cont">
        <li>
          <div>预警值</div>
          <div v-if="data.alarmConditionId === 4" class="range">
            <div>
              <span>≤</span>
              <input type="text" v-model="warning[0]" :disabled="editboo">
            </div>
            <div>
              <span>≥</span>
              <input type="text" v-model="warning[1]" :disabled="editboo">
            </div>
          </div>
          <div v-else>
            <input type="text" v-model="warning" :disabled="editboo">
          </div>
        </li>
        <li>
          <div>报警值</div>
          <div v-if="data.alarmConditionId === 4" class="range">
            <div>
              <span>≤</span>
              <input type="text" v-model="value[0]" :disabled="editboo">
            </div>
            <div>
              <span>≥</span>
              <input type="text" v-model="value[1]" :disabled="editboo">
            </div>
          </div>
          <div v-else>
            <input type="text" v-model="value" :disabled="editboo">
          </div>
        </li>
      </ul>
      <div class="foot">
        <div v-if="editboo">
          <span>更新时间</span>
          <span>{{data.modifyTime}}</span>
        </div>
        <p v-else @click="submit">确认</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "L-editcard",
  data () {
    return {
      editboo: true, //false为编辑状态
      warning: 0,
      value: 0
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    cancel() {
      this.warning = this.data.warning
      this.value = this.data.value
      this.editboo = true
    },
    submit() {
      this.editboo=true
      if (this.data.alarmConditionId === 4) {
        this.data.warning = this.warning.join('-')
        this.data.value = this.value.join('-')
      }
      console.log(typeof this.data.warning);
      this.$post("alarmCondition/updateById", {
        alarmConditionId: this.data.alarmConditionId,
        warning: this.data.warning,
        value: this.data.value
      })
        .then(res => {
          if (res) {
            console.log(res);
            this.$message.success('修改成功',1)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.data.alarmConditionId === 4) {
      this.data.warning = this.data.warning.split('-')
      this.data.value = this.data.value.split('-')
    }
    this.warning = this.data.warning
    this.value = this.data.value
  }
}
</script>

<style scoped lang="scss">
.L-editcard{
  width: 262px;
  height: 325px;
  padding: 20px;
  background-color: #f8f8f8;
  h4{
    letter-spacing: 1px;
    color: #323232;
    line-height: 20px;
    height: 20px;
    font-size: 18px;
    margin-bottom: 20px;
  }
  &>div{
    width: 222px;
    height: 245px;
    border: solid 1px #e6e6e6;
    letter-spacing: 0;
    padding: 13px 8px 11px;
    .title{
      display: flex;
      justify-content: space-between;
      height: 15px;
      line-height: 15px;
      padding: 0 2px;
      span{
        letter-spacing: 1px;
        color: #323232;
      }
      div{
        color: #888888;
        cursor: pointer;
      }
    }
    .cont{
      margin-top: 18px;
      padding: 0 2px;
      padding-bottom: 10px;
      border-bottom: solid 1px #e6e6e6;
      li{
        padding-top: 8px;
        div{
          color: #888888;
          font-size: 14px;
          line-height: 14px;
        }
        input{
          color: #323232;
          font-size: 28px;
          text-align: center;
          height: 50px;
          line-height: 50px;
          margin-top: 4px;
          margin-bottom: 0;
          border: 0;
          width: 100%;
          outline: none;
          background-color: transparent;
        }
        .range{
          display: flex;
          div{
            width: 50%;
            display: flex;
            span{
              padding-top: 25px;
              padding-left: 10px;
            }
            input{
              text-align: left;
              padding-left: 3px;
            }
          }
        }
      }
    }
    .foot{
      div{
        color: #888888;
        font-size: 12px;
        padding: 0 2px;
        margin-top: 10px;
        line-height: 12px;
        display: flex;
        justify-content: space-between;
      }
      p{
        color: #0095ff;
        font-size: 14px;
        line-height: 14px;
        height: 14px;
        text-align: center;
        margin-bottom: 0;
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>