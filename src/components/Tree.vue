<template>
  <ul class="tree">
    <tree-node
      v-for="(node, index) in nodes"
      :key="index"
      :node="node" 
    />
  </ul>
</template>
<script>
import { defineComponent } from 'vue'
import useTree from '@/composable/useTree'
import TreeNode from './TreeNode.vue'
export default defineComponent({

  name: 'Tree',

  props: {
    data: {
      type: [Array, Object],
      default: []
    }
  },

  components: {
    TreeNode
  },

  setup(props) {
    return {
      ...useTree(props)
    }
  }
})
</script>
<style lang="scss">
.tree {
  list-style: none!important;
  padding-left: 0px;
  background-color: #fff;
  overflow-x: hidden;
  width: 700px;
  height: 90vh;
  &:hover {
    background-color: #efefef;
  }
}
</style>