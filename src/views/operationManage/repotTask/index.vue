<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header>
				<page-header titles="任务基本信息"></page-header>
			</a-layout-header>
      <a-layout>
        <a-layout-content>map</a-layout-content>
        <a-layout-sider style="flex:0 0 400px;width:400px;max-width: 400px;margin-left: 15px;">
					<page-header titles="养护前照片上传"></page-header>
				</a-layout-sider>
      </a-layout>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped="scoped" lang="scss">
.ant-layout-header{
	height: 170px;
	padding:0;
	line-height: 1;
}
.ant-layout-footer{
	height: 80px;
	padding:0;
	line-height: 1;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #fff;
  color: #333;
}
#components-layout-demo-basic .ant-layout-footer {
  // line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #fff;
  color: #333;
	margin:15px 0;
}
#components-layout-demo-basic .ant-layout-content {
  background: #fff;
  color: #333;
  height: 570px;
	margin:15px 0;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
</style>
<script>
	import pageHeader from '@/components/pageHeader.vue'
	export default{
		data(){
			return {
				
			}
		},
		components: {
			'page-header': pageHeader
		}
	}
</script>