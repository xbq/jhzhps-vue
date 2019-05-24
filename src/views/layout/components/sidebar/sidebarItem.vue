<template>
    <div class="menu-wrapper">
    <template v-for="item in routes">
      <!-- 最后一级菜单 -->
      <a-menu-item
        v-if="!item.children"
        :key="item.name"
      >
        <span slot="title">
        <router-link :to="parent ? parent + '/' + item.path : item.path">{{ item.meta?item.meta.title:'未设定meta属性title' }}</router-link>
        </span>
      </a-menu-item>

      <!-- 此菜单下还有子菜单，并且只有一个子菜单 -->
      <!--((item.path=='/'?'':item.path) +'/'+ item.children[0].path) 这段代码是为了应对path=""或者"/"-->
      <a-menu-item
        v-else-if="item.children.length==1&&!item.children.children"
        :key="item.children[0].name"
        
      >
        <span slot="title"></span>
        <router-link :to="parent ? parent + '/' + item.children[0].path : ((item.path=='/'?'':item.path) +'/'+ item.children[0].path)">{{ item.meta?item.meta.title:'未设定meta属性title' }}</router-link>
      </a-menu-item>

      <!-- 此菜单下还有子菜单 -->
      <a-sub-menu
        v-else
        :key="item.name"
        :title = "item.children[0].name"
      >
          <span  slot="title">{{ item.meta?item.meta.title:'未设定meta属性title' }}</span>
        <!-- 递归 -->
        <sidebar-item
          :routes="item.children"
          :parent="parent ? parent + '/' + item.path : item.path"
        />
      </a-sub-menu>
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