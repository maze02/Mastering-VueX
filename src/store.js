import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: "abc123", name: "Adam Jahr"},
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
    events: [
      {id: 1, title: "...", organizer: "..."},
      {id:2, title: "...", organizer: "..."},
      {id:3, title: "...", organizer: "..."},
      {id:4, title: "...", organizer: "..."},
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => state.todos.filter(todo => todo.done),
    activeTodosCount1:(state, getters) =>{ //example of passing an entire getters  into another getters - wow - crazy!
      return state.todos.length - getters.doneTodos.length
    },
    activeTodosCount: state => state.todos.filter(todo => !todo.done).length, //returning the diff. between total todos and todos that are done
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
    //same as (state) =>{return    (id)=>{return state.events.find(event => event.id === id)}}
    //basically takes in the state and returns another function 
  }
})
