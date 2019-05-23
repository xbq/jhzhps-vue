export function getlocalStorageItm(name) { //localStorage 获取数组对象的方法
    return JSON.parse(window.localStorage.getItem(name));
  }

export function savelocalStorageItem(name, data) { //localStorage 存储数组对象的方法
    localStorage.setItem(name, JSON.stringify(data))
  }