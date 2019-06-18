<template>
  <div class="L-editcard">
    <div class="title">
      <span>水位(m)</span>
      <div>
        <a-icon v-if="editboo" @click="editboo=false" type="form" />
        <a-icon v-else @click="editboo=true" type="close" />
      </div>
    </div>
    <ul class="cont">
      <li>
        <div>预警值</div>
        <p v-if="editboo">{{aa}}</p>
        <input v-else type="text" v-model="aa">
      </li>
      <li>
        <div>预警值</div>
        <p v-if="editboo">82</p>
        <input v-else type="text" value="15">
      </li>
    </ul>
    <div class="foot">
      <div v-if="editboo">
        <span>更新时间</span>
        <span>2018/02/12</span>
      </div>
      <p v-else @click="editboo=true">确认</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "L-editcard",
    data () {
      return {
        editboo: true, //false为编辑状态
        aa: 4
      }
    }
  }
</script>

<style scoped lang="scss">
.L-editcard{
  width: 222px;
  height: 245px;
  background-color: #f8f8f8;
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
      p{
        color: #323232;
        font-size: 28px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin-top: 4px;
        margin-bottom: 0;
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
</style>