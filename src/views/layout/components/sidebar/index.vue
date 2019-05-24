<template><div>
<Sidebar :routes="routes"></Sidebar>
</div>
    
</template>

<script>
import Sidebar from './Sidebar'

export default {
  components: { "Sidebar":Sidebar },
  data(){
    return {
      routes: global.antRouter
    }
  }
}
</script>
