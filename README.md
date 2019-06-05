# jhzhps_vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 路由绑定
第一次尝试将路由用router-link的方式实现，不完善的地方是，router-link会生成一个没有占满整个menuitem的a标签，你要想跳转必须要点击到a标签
后来改为将path绑定为menuitem的key属性，然后跳转操作都在menuitem的click事件里，通过this.$router.push()来跳转，这不用担心a标签被访问之后的样式变化

### layout的加载
还是没有弄清楚，为什么加载上了layout，暂时只知道应该是因为layout是一级菜单引起的，但不知道为什么

### webpack打包之后部署，出现资源路径不正确的问题
解决办法就是给router添加baseUrl属性，然后打包完成之后把dist文件夹改名为该属性的值，然后放到服务器上直接访问即可