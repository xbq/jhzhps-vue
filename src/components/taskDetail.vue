<template>
	<div>
		<ul class="detailCons">
			<li class="rowCons">
				<h2>任务小类</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.smallLevel}}</span></div>
			</li>
			<li class="rowCons">
				<h2>细分类型</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.detailLevel}}</span></div>
			</li>
			<li class="rowCons">
				<h2>任务状态</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.status}}</span></div>
			</li>
			<li class="rowCons">
				<h2>上报单位</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.department}}</span></div>
			</li>
			<li class="rowCons">
				<h2>上报人</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.userName}}</span></div>
			</li>
			<li class="rowCons">
				<h2>任务地点</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.siteName}}</span><img src="../assets/img/wordMap.png" alt=""></div>
			</li>
			<li class="rowCons">
				<h2>问题详情</h2>
				<div class="rowDetail" title=""><span>{{this.rowTaskDetail.detail}}</span></div>
			</li>
		</ul>
		<div class="line"></div>
	</div>
</template>

<script>
	export default{
		data() {
			return{
				rowTaskDetail:this.details  //重新定义数据
			}
		},
		props: {
			details: {
				type: Object
			}
		},
		watch:{
			details: {
		　　　　handler(newValue, oldValue) {
					this.$get("task/getById",{'taskId':newValue.taskId}).then(res=>{
							this.rowTaskDetail = res.data.data;
							console.log(this.rowTaskDetail);
					})
		　　　　}
		　　}
		},
		created(){
			this.$get("task/getById",{'taskId':'1610'}).then(res=>{
					this.rowTaskDetail = res.data.data;
					console.log(this.rowTaskDetail);
			})
		}
	}
</script>

<style scoped="scoped" lang="scss">
	// 右侧内容
	.detailCons{
		width: 280px;
		margin:10px auto;
		height: 216px;
		font-size: 12px;
		.rowCons{
				width: 280px;
				height: 31px;
				line-height: 31px;
				border-bottom: 1px solid #eee;
				h2{
					color: #888;
					font-size: 12px;
					width: 54px;
					height: 31px;
					line-height: 31px;
					display: inline-block;
					letter-spacing:1px;
					overflow: hidden;
					margin-right: 14px;
					vertical-align: middle;
				}
				.rowDetail{
					width: 212px;
					height: 31px;
					line-height: 31px;
					display: inline-block;
					vertical-align: top;
					color: #333;
					position: relative;
					span{
						display: inline-block;
						width: 196px;
						vertical-align: top;
						overflow: hidden;
						cursor: pointer;
						text-overflow:ellipsis;
						white-space: nowrap;
					}
					img{
						cursor: pointer;
						position: absolute;
						right: 0;
						top:7px;
					}
				}
		}
		.rowCons:nth-last-child(1){
			border-bottom: 0;
		}
	}
	.line{
		width: 100%;
		height: 1px;
		background: #eee;
		margin-bottom: 15px;
	}
</style>
