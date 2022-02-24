<template>
  <li class="tree-node">
    <div class="tree-node__content" @click="handleChange({ target: { checked: !node.checked }})">
      <span
        v-if="hasChildren" 
        class="tree-node__toggle" 
        @click.stop="toggleCollapseChildren">
        <i 
          class="mdi" 
          :class="{ 
            'mdi-chevron-right': !collapseChildren,
            'mdi-chevron-down': collapseChildren 
          }"
        />
      </span>
      <input
        v-model="node.checked"
        type="checkbox"
        class="tree-node__checkbox"
        :indeterminate="isIndeterminate"
        @change="handleChange">
      <label class="tree-node__label">
        {{ node.name }}
      </label>
    </div>

    <ul 
      v-if="node.children.length" 
      v-show="collapseChildren" 
      class="tree-node__children">
      <tree-node 
        v-for="(node, index) in node.children" 
        :key="index" 
        :node="node" 
      />
    </ul>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
import useTreeNode from '@/composable/useTreeNode'
export default defineComponent({

  name: 'TreeNode',

  props: {
    node: {
      type: Object,
      required: true
    }
  },

  setup(props) {    
    return {
      ...useTreeNode(props)
    }
  }
})
</script>
<style lang="scss" scoped>
.tree-node {
  background-color: #fff;
  position: relative;
  padding: 0px 0px 0px 50px;
  cursor: pointer;  
  .tree-node__content {
    padding: 15px 0px;
    .tree-node__toggle {
      position: absolute;
      padding: 2px;
      left: 15px;
      font-size: 20px;
      border-radius: 20px;
      &:hover {
        background-color: darken(#efefef, 5%);
      }
    }
    .tree-node__checkbox {
      cursor: pointer;
      transform: scale(1.2);
      padding: 5px 0px!important
    }
    .tree-node__label {
      margin-left: 10px;
      font-size: 20px!important;
      cursor: pointer;
    }
  }
  .tree-node__children {
    list-style: none;
    padding: 0px;
  }
  &:hover {
    background-color: #efefef;
  }
}
</style>
