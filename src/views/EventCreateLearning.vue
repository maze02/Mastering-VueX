<template>
  <div>
<h1>Create Event, {{ user.name}}</h1>
<p>This event was created by {{ user.id}}</p>
<p>There are {{catLength}} categories</p>
<p>{{getEventById(2)}}</p>
<ul>
  <li v-for="cat in categories" :key="cat">{{cat}}</li>
</ul>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"; //maps the state into computer properties
  export default {
    computed:{
      ...mapGetters(["getEventById"]),
      /*
      getEvent(){
        return this.$store.getters.getEventById
      },
      */
      catLength(){
        return this.$store.getters.catLength
      },
      ...mapState(["user", "categories"])
  }
  }

     /*
mapState({
        user: "user",
        categories: "categories",
      })
  

      mapState({
        userName: state => state.user.name,
        userID: state => state.user.id,
        categories: state => state.categories
      })
      userName(){
        return this.$store.state.user.name
      },
      userID(){
        return this.$store.state.user.id
      }
      */
</script>

<style scoped>

</style>