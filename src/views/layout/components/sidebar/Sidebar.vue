<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <template v-for="(item,index) in routes">
        <a-menu-item v-if="!item.children" :key="index">
          <a-icon type="item.meta.icon" />
        <span slot="title">
        <router-link :to="parentPath ? parentPath + '/' + item.path : item.path">{{ item.meta?item.meta.title:'未设定meta属性title' }}</router-link>
        </span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="index" :parentKey="index"  :parentPath="parentPath ? parentPath + '/' + item.path : item.path"/>
      </template>
    </a-menu>
  </div>
</template>

<script>
/* 
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import SubMenu from './SubMenu'
export default {
  components: {
    'sub-menu': SubMenu,
  },
  props:['routes','parentPath','parentKey'],
  data () {
    return {
      collapsed: false
    }
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
  },
}
</script>