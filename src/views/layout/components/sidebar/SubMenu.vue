<template functional>
  <a-sub-menu :key="props.menuInfo.parentPath">
    <span slot="title">
      <a-icon :type="props.menuInfo.meta.icon"/>
      <span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="props.parentPath ? props.parentPath + '/' + item.path : item.path">
        <a-icon :type="item.meta.icon" v-if="item.meta.icon!=''||item.meta.icon!=undefined"/>
        <span>
          {{ item.meta?item.meta.title:'未设定meta属性title' }}
        </span>
      </a-menu-item>
      <a-menu-item
        v-else-if="item.children.length==1&&!item.children[0].children"
        :key="props.parentPath ? props.parentPath + '/' + item.children[0].path : ((item.path=='/'?'':item.path) +'/'+ item.children[0].path)"
      >
        <a-icon :type="item.children[0].meta.icon" v-if="item.meta.icon!=''||item.meta.icon!=undefined"/>
        <span>
          {{item.children[0].meta.title}}
        </span>
      </a-menu-item>
      <sub-menu
        v-else
        :menu-info="item"
        :key="props.parentPath ? props.parentPath + '/' + item.path : item.path"
        :parentPath="props.parentPath ? props.parentPath + '/' + item.path : item.path"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ["menuInfo", "parentPath"]
};
</script>
<style lang="scss" scoped>
.ant-menu-item{
  text-align: left
}
.ant-menu-submenu.ant-menu-submenu-inline{
  text-align: left
}
</style>
