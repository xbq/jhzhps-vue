<template>
  <div class="app-container">
    <a-card  :body-style="{padding: '0',height: 'calc(100vh - 100px)',overflow: 'hidden'}">
      <a-tabs
              hideAdd
              v-model="activeKey"
              type="card"
              :style="{height: '100%'}"
              :tabBarGutter="0"
      >
        <a-tab-pane tab="污水管井" key="1" :closable=false>
          <div class="item">
            <point type="wspoint"></point>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="污水管线" key="2" :closable=false>
          <div class="item">
            <lines type="wsline"></lines>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="雨水管井" key="3" :closable=false>
          <div class="item">
            <point type="yspoint"></point>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="雨水管线" key="4" :closable=false>
          <div class="item">
            <lines type="ysline"></lines>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import point from './components/point'
import lines from './components/line'
export default {
  components: {
    point,
    lines
  },
  data() {
    return {
      activeKey: '1',
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.app-container{
  height: 100%;
  .item{
    padding: 4px 25px 20px;
  }
}
div{}
</style>