<template>
  <a-carousel arrows autoplay  dotsClass="slick-dots slick-thumb">
    <a slot="customPaging">
      <div></div>
    </a>
    <div
            slot="prevArrow" slot-scope=""
            class="custom-slick-arrow"
            style="left: 10px;z-index: 1"
    >
      <a-icon type="left-circle" theme="filled" />
    </div>
    <div
            slot="nextArrow" slot-scope=""
            class="custom-slick-arrow"
            style="right: 10px"
    >
      <a-icon type="right-circle" theme="filled" />
    </div>
    <div class="imgitem" @click="seeimg" :style="{height}" v-for="(item,index) in imgs" :key="index">
      {{item}}
    </div>
<!--    <div class="imgitem" v-for="(item,index) in imgs" :key="index">-->
<!--      {{item}}-->
<!--    </div>-->
  </a-carousel>
</template>

<script>
export default {
  name: "imgcarousel",
  data() {
    return {
    }
  },
  props: ['imgs', 'height', 'imgvisible'],
  watch: {
    imgs() {
      // console.log(this.imgs);
    }
  },
  mounted() {
  },
  methods: {
    seeimg() {
      if(!this.imgdetail){
        this.$emit('imgdetail', true)
      }
    }
  }
}
</script>

<style scoped>
.ant-carousel >>> .slick-thumb {
  bottom: 15px;
  height: 20px;
  background-color:  rgba(0,0,0,.2);
  width: auto;
  padding: 5px;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%);
}
.slick-thumb li div{
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: rgba(255,255,255,.5);
}
.slick-thumb .slick-active div{
  background-color: #fff;
}
.custom-slick-arrow{
  width: 36px;
  height: 36px;
  font-size: 36px;
  color: rgba(0,0,0,.2);
}
.custom-slick-arrow:hover {
  color: rgba(0,0,0,.35);
}
.custom-slick-arrow:before {
  display: none;
}
.imgitem{
  background-color:  #f8f8f8;
  cursor: pointer;
}
div{}

</style>