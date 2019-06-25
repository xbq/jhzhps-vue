<template>
    <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed"
      :style="{overflow: 'hidden'}"
    >
      <div class="logo" />
      <div style="overflow: auto;height: calc(100% - 64px);width: 217px">
        <sidebar/>
      </div>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
<headerMenu class="headerNav"/>
      </a-layout-header>
      
      <a-layout-content :style="{ margin: '24px 16px',background: '#fff', minHeight: '280px',overflowY: 'auto',overflowX: 'hidden' }">
        <AppMain/>
      </a-layout-content>
    </a-layout>
  </a-layout>

</template>


<script>
import AppMain  from '@/views/layout/components/AppMain'//页面布局的右侧区域
import sidebar  from '@/views/layout/components/sidebar'//页面布局的左侧菜单
import headerMenu from '@/views/layout/components/headerMenu'

export default {
  name: 'layout',
  components: {
    sidebar,
    AppMain,
    headerMenu
  },
  data(){
    return {
      collapsed: false
    }
  }
}
</script>

<style scoped>
#components-layout-demo-custom-trigger{
  height: 100%;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 50px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
  float: left;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}

#components-layout-demo-custom-trigger .headerNav {
  float: right;
}
#components-layout-demo-custom-trigger .ant-menu{
  width: 200px;
}
</style>
