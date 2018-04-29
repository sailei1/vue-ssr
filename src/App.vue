<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
      name: 'app',

      data() {
          return {

          }
      }
  }
</script>

<style lang="scss" scoped>
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 15px;
    background-color: #f2f3f5;
    margin: 0;
    padding-top: 55px;
    color: #34495e;
    overflow-y: scroll;
  }

  a {
    color: #34495e;
    text-decoration: none;
  }
  .logo {
    width: 24px;
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
  }

  .view {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  @media (max-width: 860px) {
    .header .inner {
      padding: 15px 30px;
    }
  }

  @media (max-width: 600px) {
    .header .inner {
      padding: 15px;
    }

    .header a {
      margin-right: 1em;
    }

    .header .github {
      display: none;
    }
  }
</style>
