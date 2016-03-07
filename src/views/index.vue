<template>
    <h1>{{ msg }}</h1>
    <a v-link="{'path':'/test1'}">test1</a>
    <a v-link="{'path':'/test2'}">test2</a>
    <img src="../assets/logo.png">
</template>

<script>
export default {
  data () {
    return {
      msg: '主页面'
    }
  }
}
</script>
