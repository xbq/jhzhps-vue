<template>
    <div class="menu-wrapper">
    <template v-for="item in routes">
      <!-- 最后一级菜单 -->
      <el-menu-item
        v-if="!item.children"
        :key="item.path"
        :index="parent ? parent + '/' + item.path : item.path"
      >
        <span slot="title">{{ item.meta?item.meta.title:'未设定meta属性title' }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单，并且只有一个子菜单 -->
      <!--((item.path=='/'?'':item.path) +'/'+ item.children[0].path) 这段代码是为了应对path=""或者"/"-->
      <el-menu-item
        v-else-if="item.children.length==1&&!item.children.children"
        :key="item.children[0].path"
        :index="parent ? parent + '/' + item.children[0].path : ((item.path=='/'?'':item.path) +'/'+ item.children[0].path)"
      >
        <span slot="title">{{ item.meta?item.meta.title:'未设定meta属性title' }}</span>
      </el-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <el-submenu
        v-else
        :key="item.path"
        :index="parent ? parent + '/' + item.path : item.path"
      >
        <template slot="title">
          
          <span>{{ item.meta?item.meta.title:'未设定meta属性title' }}</span>
        </template>
        <!-- 递归 -->
        <sidebar-item
          :routes="item.children"
          :parent="parent ? parent + '/' + item.path : item.path"
        />
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: ["routes", "parent"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.title {
  color: #fff;
}
</style>