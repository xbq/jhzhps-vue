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
        <a-tab-pane tab="重点道路" key="1" :closable=false>
          <div class="item">
            <roads></roads>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="管径统计" key="2" :closable=false>
          <div class="item">
            <diameter></diameter>
          </div>
        </a-tab-pane>
        <a-tab-pane tab="材质统计" key="3" :closable=false>
          <div class="item">
            <material></material>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script>
import roads from './components/keyroads'
import diameter from './components/diameter'
import material from './components/material'
export default {
  data() {
    return {
      activeKey: '1',
      data: [],
    }
  },
  components: {
    roads,
    diameter,
    material
  },
  created() {
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
    height: calc(100vh - 156px);
    overflow: auto;
  }
}
</style>