<template>
  <div class="hello">
    <div class="zone" id="drag">
      <div v-for="fruit in fruits" :key="fruit" v-draggable.fruits="fruit">
        {{ fruit }}
      </div>
    </div>

    <div class="zone" id="drop" v-droppable.fruits="send">
      <div class="sub-zone" style="pointer-events: none;">Sub Zone</div>
      <div v-for="item in home" :key="item">
        <div class="sub-item">
          {{ item }}
        </div>
      </div>
    </div>

    <draggable class="list-group" element="ul" v-model="list"> 
          <transition-group type="transition" :name="'flip-list'">
            <li class="list-group-item" v-for="element in list" :key="element.order"> 
              <i :class="element.fixed? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'" @click=" element.fixed=! element.fixed" aria-hidden="true"></i>
              {{element.name}}
              <span class="badge">{{element.order}}</span>
            </li> 
          </transition-group>
      </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
const message = [ 'vue.draggable', 'draggable', 'component', 'for', 'vue.js 2.0', 'based' , 'on', 'Sortablejs' ]

export default {
  name: 'hello',
  components: {
    draggable
  },
  data () {
    return {
      fruits: ['apple', 'peach', 'pear'],
      home: [],
      list: message.map( (name,index) => {return {name, order: index+1, fixed: false}; })
    }
  },
  methods: {
    send: function ($ev) {
    	console.log($ev)
    	this.home.push(JSON.parse($ev))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
