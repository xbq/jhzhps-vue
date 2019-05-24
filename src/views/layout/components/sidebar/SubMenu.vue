<template functional>
  <a-sub-menu
    :key="props.menuInfo.key"
  >
    <span slot="title">
      <a-icon type="item.meta.icon" /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="(item,index) in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="parentKey +'-'+ index"
      >
        <a-icon :type="item.meta.icon" />
        <span slot="title">
        <router-link :to="parentPath ? parentPath + '/' + item.path : item.path">12335556</router-link>
        </span>

      </a-menu-item>
      <sub-menu
        v-else
        :key="parentKey +'-'+ index"
        :menu-info="item"
        :parentKey="parentKey +'-'+ index" 
        :parentPath="parentPath ? parentPath + '/' + item.path : item.path"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: ['menuInfo','parentKey','parentPath'],
};
</script>