import { TREE_KEY } from './tokens'
import {
  ref,
  watch,
  inject,
  computed
} from 'vue'
export default function useTreeItem (props) {

  const { checkNode } = inject(TREE_KEY)
  
  const collapseChildren = ref(false)

  const hasChildren = computed(() => props.node.children.length > 0)

  const children = computed(() => {
    const _children = []

    const joinChildren = node => {
      _children.push(node)
      node.children.forEach(joinChildren)
    }
    
    props.node.children.forEach(joinChildren)

    return _children
  })

  const childrenChecked = computed(() => children.value.filter(item => item.checked))

  const allChecked = computed(() => children.value.length === childrenChecked.value.length)

  const isIndeterminate = computed(() => childrenChecked.value.length > 0 && childrenChecked.value.length < children.value.length)

  watch(allChecked, value => (props.node.checked = value))

  const toggleCollapseChildren = () => (collapseChildren.value = !collapseChildren.value)

  const handleChange = event => {
    const { checked } = event.target
    checkNode(props.node, checked)
  }
  
  return {
    collapseChildren,
    hasChildren,
    isIndeterminate,
    toggleCollapseChildren,
    handleChange
  }
}