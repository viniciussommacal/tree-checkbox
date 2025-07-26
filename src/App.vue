<template>
  <div class="app">
    <tree :data="data" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import data from '@/assets/data.json'
import Tree from '@/components/Tree.vue'
export default defineComponent({

  name: 'App',

  components: {
    Tree
  },

  setup() {
    return {
      data
    }
  }
})
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: center;
  font-family: "Poppins", sans-serif;
}
</style>