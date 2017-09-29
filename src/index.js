let DnD = {}
let dragEnterTarget = null
let isFunction = function(functionToCheck) {
  var getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}
DnD.install = (Vue) => {
  Vue.directive('draggable', {
    bind (el, binding, vnode) {
      if (Object.keys(binding.modifiers).length === 0) {
        throw new Error('You have to specify almost one group in the modifier of draggable element')
      }
      const dragStart = (ev) => {
        ev.dataTransfer.effectAllowed = 'all'
        ev.dataTransfer.setData('data', JSON.stringify(binding.value))
        ev.dataTransfer.setData('group', JSON.stringify(Object.keys(binding.modifiers)))
      }
      el.setAttribute('draggable', true)
      el.addEventListener('dragstart', dragStart)
    },
    update (el, binding, vnode) {
      el.removeEventListener('dragstart', {})
      if (Object.keys(binding.modifiers).length === 0) {
        throw new Error('You have to specify almost one group in the modifier of draggable element')
      }
      const dragStart = (ev) => {
        ev.dataTransfer.effectAllowed = 'all'
        ev.dataTransfer.setData('data', JSON.stringify(binding.value))
        ev.dataTransfer.setData('group', JSON.stringify(Object.keys(binding.modifiers)))
      }
      el.setAttribute('draggable', true)
      el.addEventListener('dragstart', dragStart)
    },
    unbind (el, binding, vnode) {
      el.setAttribute('draggable', false)
      el.removeEventListener('dragstart', {})
    }
  })

  Vue.directive('droppable', {
    bind (el, binding, vnode) {
      const drop = (ev) => {
        if (ev.preventDefault) ev.preventDefault()
        if (ev.stopPropagation) ev.stopPropagation()
        const vData = ev.dataTransfer.getData('data')
        const vGroup = ev.dataTransfer.getData('group')
        if (vGroup === "") {
          return;
        }
        const myGroup = JSON.parse(vGroup)
        let imIn = false
        if (binding.modifiers.length === 0) {
          imIn = true
        } else {
          imIn = myGroup.find((element, index, array) => { return binding.modifiers[element] })
        }
        dragEnterTarget = null;
        if (imIn) {
          if (isFunction(binding.value)) {
            binding.value.call(el, vData, el, ev)
          } else {
            binding.value.event.call(el, vData, el, ev, binding.value.data)
          }          
          ev.target.classList.remove('dragover')
        } else {
          ev.target.classList.remove('dragover')
        }
      }
      const dragOver = (ev) => {
        if (ev.preventDefault) ev.preventDefault()
        if (dragEnterTarget == null){
          dragEnterTarget = ev.target
          ev.target.classList.add('dragover')
          console.log('dragenter')
        }
      }
      const dragLeave = (ev) => {
        if (ev.preventDefault) ev.preventDefault()
        if (ev.target == dragEnterTarget){
          ev.target.classList.remove('dragover')
          dragEnterTarget = null
          console.log('dragLeave')
        }            
         
      }
      el.addEventListener('drop', drop)
      el.addEventListener('dragover', dragOver)
      el.addEventListener('dragenter', dragOver)
      el.addEventListener('dragleave', dragLeave)
    },
    unbind (el, binding, vnode) {
      el.setAttribute('draggable', false)
      el.removeEventListener('dragstart', {})
    }
  })

  Vue.directive('dragenter', {
    bind (el, binding, vnode) {
      const dragEnter = (ev) => {
        if (ev.preventDefault) ev.preventDefault()
        if (ev.stopPropagation) ev.stopPropagation()
        ev.target.classList.add('dragover')
        binding.value.call(el)
      }
      el.addEventListener('dragenter', dragEnter)
    },
    unbind (el, binding, vnode) {
      el.removeEventListener('dragenter', {})
    }
  })

  Vue.directive('dragleave', {
    bind (el, binding, vnode) {
      const dragLeave = (ev) => {
        if (ev.preventDefault) ev.preventDefault()
        if (ev.stopPropagation) ev.stopPropagation()
        binding.value.call(el)
      }
      el.addEventListener('dragleave', dragLeave)
    },
    unbind (el, binding, vnode) {
      el.removeEventListener('dragleave', {})
    }
  })
}

export default DnD
