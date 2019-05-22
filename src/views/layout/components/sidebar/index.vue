<template>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF" :router="true">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
</template>

<script>
import sidebarItem from './sidebarItem'

export default {
  components: { "sidebar-item":sidebarItem },
  data(){
    return {
      routes: global.antRouter
    }
  }
}
</script>
