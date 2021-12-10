import EventService from "@/services/EventService.js"
export const state = {
    events: [],
    eventsTotal:0,
    event:{} //event object
  }

export const  mutations = {
    ADD_EVENT(state, event){
      state.events.push(event)
    },
    SET_EVENTS(state, events){//sets the state
      state.events = events
    },
    SET_EVENT(state, event){ //sets the value of the event
      state.event = event
    }
  }

export const actions ={
    createEvent({commit}, event){
      return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event)
    })
//when our EventService responds, then we'll commit the add event mutation
    },
    fetchEvents({commit}, {perPage, page}){
      EventService.getEvents(perPage, page)
      .then(response =>{
        console.log("Total events are " + response.headers["x-total-count"]);
        commit('SET_EVENTS', response.data)
      })
      .catch(error =>{
        console.log("There was an error:", error.response)
      })
    },
    fetchEvent({commit, getters}, id){
      const event = getters.getEventById(id)
      if(event){
        commit("SET_EVENT", event)
      }else{
      EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data)
      })
      .catch(error => {
        console.log("There was an error", error.response)
      })
    }
  }
}
 export const getters = {
    //catLength: state => state.categories.length,
    //doneTodos: state => state.todos.filter(todo => todo.done),
    //activeTodosCount1:(state, getters) =>{ //example of passing an entire getters  into another getters - wow - crazy!
    //  return state.todos.length - getters.doneTodos.length
    //},
    //activeTodosCount: state => state.todos.filter(todo => !todo.done).length, //returning the diff. between total todos and todos that are done
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
    //same as (state) =>{return    (id)=>{return state.events.find(event => event.id === id)}}
    //basically takes in the state and returns another function 
  }

