<template>
  <div class="container">
    <div class="row pt-5">
      <div class="col-3">
        <Sidebar />
      </div>
      <div class="col-9">
        <Content />
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  fetch(){
    this.GET()
  },
  methods:{
    ...mapActions(['GET'])
  },
}
</script>

<style>
.hotels-wrapper{
  display: flex;
  padding-top: 20px;
}
</style>
