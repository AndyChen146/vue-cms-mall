<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  </div>

</template>
<script>
// @ is an alias to /src
import { mapState, mapActions, mapMutations } from 'vuex'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  created() {

  },
  computed: {
    ...mapState('demo', ['vuexres', 'count'])
  },
  methods: {
    ...mapActions('demo', ['increment', 'decrement', 'getProvince'])
  },
  mounted() {

  },
}
</script>
<style lang="scss" scoped>
</style>
