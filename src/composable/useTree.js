import { TREE_KEY } from './tokens'
import {
  ref,
  watch,
  toRefs,
  provide,
  reactive,
  computed,
  onMounted
} from 'vue'
export default function useTree (props) {

  const nodes = ref([])
  
  const checkedNodes = computed(() => {
    const checkedNodes = []

    const joinCheckedChildren = node => {
      const { children, ...rest } = node
      if (node.checked)
        checkedNodes.push(rest)

      children.forEach(joinCheckedChildren)
    }

    nodes.value.forEach(joinCheckedChildren)

    return checkedNodes
  })

  const checkNode = (node, checked) => {
    node.checked = checked
    node.children.forEach(item => checkNode(item, checked))
  }

  watch(
    checkedNodes,
    value => {
      const payload = JSON.stringify(value.map(({ id }) => id))
      localStorage.setItem('checked_nodes', payload)
    }
  )

  const tree = reactive({
    checkNode,
    ...toRefs(props)
  })
  
  provide(TREE_KEY, tree)
  
  const formatNodes = () => {
    const traverse = node => {
      node.children = Object.values(node.children)
        .map(item => ({ ...item, checked: false }))

      node.children.length && node.children.forEach(traverse)
    }
    nodes.value = Object.values(props.data).map(item => ({ ...item, checked: false }))
    nodes.value.forEach(traverse)
  }

  const recoverCheckedNodes = () => {
    const checkedNodes = JSON.parse(localStorage.getItem('checked_nodes')) ?? []
    
    const traverse = node => {
      if (checkedNodes.includes(node.id))
        checkNode(node, true)

      node.children.forEach(traverse)
    }

    nodes.value.forEach(traverse)
  }
  
  onMounted(() => {
    formatNodes()
    recoverCheckedNodes()
  })

  return {
    nodes
  }
}