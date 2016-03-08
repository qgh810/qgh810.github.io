<template>
    <h1>{{ msg }}</h1>
    <a v-link="{'path':'/test1'}">test1</a>
    <a v-link="{'path':'/test2'}">test2</a>
    <img src="../assets/logo.png">
    <div style="height:200px;overflow:auto" v-scrollbottom="test">
      <div style="height:1000px;background:red;">
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '主页面'
    }
  },
  methods: {
    test () {
      console.log(123132131)
    }
  }
}
</script>

<style>
  @import '../assets/style/base.css';

</style>
