<template>
  <div>
    <h1>Events for {{ user.user.name}}</h1> <!--referring to module by adding an extra '.user' 
    First value is the module name and the second is the state inside the module-->
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
     <template v-if="page != 1">
          <router-link :to="{ name: 'event-list', query: { page: page - 1 } }" rel="prev">Prev Page</router-link> | 
     </template>
    <router-link  v-if="hasNextPage" :to="{ name: 'event-list', query: { page: page + 1 } }" rel="next">Next Page</router-link>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import {mapState} from "vuex"


export default {
  components: {
    EventCard
  },
  created() {  
    this.$store.dispatch("fetchEvents", {
      perPage: 3, 
      page: this.page
    })    
  },
  computed: {
    page(){
      return parseInt(this.$route.query.page) || 1 //if no URL parameters, assume the first page
    },
    hasNextPage() {
      return this.event.eventsTotal > this.page * this.perPage
    },
    ...mapState(['events', 'user'])
  }
}
</script>
