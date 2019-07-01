<template>
  <div class="app-container">
    <a-card :body-style="{padding: '0 10px'}">
      <h3>字典管理</h3>
      <div class="mycardcont">
        <a-tree
                :loadData="onLoadData"
                :treeData="treeData"
                @select="select"
        >
          <template slot="custom" slot-scope="item">
            <span @mouseenter="hoverkey=item.key" @mouseleave="hoverkey=0">{{ item.title }}</span>
            <span class="completeday" v-if="item.rank === 4">
              <input type="text" :value="item.completeDay">天
            </span>
            <div class="action" :style="item.rank === 4?'right: -130px':''" v-show="item.key===activekeys||item.key===hoverkey">
              <a title='添加子节点' @click="add(item)" v-if="!item.isLeaf"><a-icon type="plus" /></a>
              <a title='编辑当前节点' @click="edit(item)"><a-icon type="form" /></a>
              <a title='删除当前节点' @click="remove(item)"><a-icon type="delete" /></a>
            </div>
          </template>
        </a-tree>
      </div>
    </a-card>
    <a-modal
            :title="title"
            :visible="visible"
            @ok="handleOk"
            @cancel="handleCancel"
            width="518px"
            :centered=true
    >
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleOk">
          提交
        </a-button>
      </template>
      <a-form>
        <a-form-item label="输入字典name值" :labelCol="{span: 6, offset: 1}" :wrapperCol="{span: 15, offset: 1}" >
          <a-input v-model="datas.name">
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [], //树节点数据
      activekey: {}, //选中的节点
      activekeys: 0, //选中的节点key
      hoverkey: 0, //鼠标移入的节点
      title: '新增',
      visible: false,
      name: '', // 编辑或添加的name
      datas: {}, //提交的数据
    }
  },
  filters: {
   
  },
  created() {
    this.$get("dic/getType", {})
      .then(res => {
        if (res) {
          console.log(res);
          this.treeData.push({
            title: res.data.data.name,
            key: res.data.data.id,
            scopedSlots: { title: 'custom' },
            ...res.data.data,
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    // 添加节点
    add(data) {
      console.log(data);
      this.visible = true
      this.title = '新增'
      data.name = ''
      this.datas = data
    },
    // 删除节点
    remove(data) {
      let title = '确定要删除该条记录？'
      if(this.activekey.dataRef.children && this.activekey.dataRef.children.length > 0){
        title = '该节点有子节点，删除该节点，子节点也会被删除，确定删除？'
      }
      this.$modal.confirm({
        title: title,
        centered: true,
        onOk: () => {
          this.$get("dic/del", {dicId: data.id}).then(res => {
            if (res) {
              // console.log(res);
              this.getlist(this.activekey.$parent)
              if(res.data.msg === 'success'){
                this.$message.success('删除成功', 1)
              }else {
                this.$message.error('删除失败', 1)
              }
            }
          }).catch(err => {
            console.log(err);
          });
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    // 编辑节点
    edit(data) {
      this.title = '编辑'
      this.visible = true
      this.datas = data
    },
    // 选中节点
    select(data,treeNode){
      this.activekeys = data[0]
      this.activekey = treeNode.node
    },
    getlist(treeNode, resolve) {
      this.$get("dic/getList", {limit: -1, parentId: treeNode.dataRef.key})
        .then(res => {
          if (res) {
            console.log(res);
            treeNode.dataRef.children = []
            res.data.data.forEach((val) => {
              treeNode.dataRef.children.push({
                title: val.name,
                key: val.id,
                isLeaf: val.type === '任务类型管理'?val.rank === 4:val.rank === 2,
                scopedSlots: { title: 'custom' },
                ...val,
              })
            })
            this.treeData = [...this.treeData]
            if(resolve){
              resolve()
            }
            this.visible = false
          }
        })
        .catch(err => {
          console.log(err);
          if(resolve){
            resolve()
          }
          this.visible = false
        });
    },
    // 请求子节点
    onLoadData (treeNode) {
      // console.log(treeNode);
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve()
          return
        }
        this.getlist(treeNode, resolve)
      })
    },
    handleOk() {
      if (this.title === '新增'){
        this.$post("dic/create", {
          name: this.datas.name,
          type: this.datas.rank === 0 ? this.datas.name : this.datas.type,
          parentId: this.datas.id,
          rank: Number(this.datas.rank)+1
        }).then(res => {
          if (res) {
            // console.log(res);
            this.getlist(this.activekey)
            if(res.data.msg === 'success'){
              this.$message.success('添加成功', 1)
            }else {
              this.$message.error('修改失败', 1)
            }
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.$post("dic/update", {
          name: this.datas.name,
          id: this.datas.id
        }).then(res => {
          if (res) {
            // console.log(res);
            this.getlist(this.activekey.$parent)
            if(res.data.msg === 'success'){
              this.$message.success('修改成功', 1)
            }else {
              this.$message.error('修改失败', 1)
            }
          }
        }).catch(err => {
          console.log(err);
        });
      }
    },
    handleCancel() {
      this.visible = false
    }
  }
}
</script>
<style scoped lang="scss">
.mycardcont{
  height: unset;
}
.action{
  position: absolute;
  right: -80px;
  width: 70px;
  top: -2px;
  color: #0095ff;
  a{
    padding: 0 5px;
  }
}
.completeday{
  position: absolute;
  right: -58px;
  input{
    width: 30px;
    border-width: 1px;
    border-style: solid;
    border-color: #e6e6e6;
    height: 22px;
    line-height: 22px;
    box-sizing: border-box;
    padding: 0 5px;
    margin: 0 5px;
  }
}
div{}
</style>
