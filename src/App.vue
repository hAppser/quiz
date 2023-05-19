<template>
  <div>
    <QuizComponent />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import { createPinia } from "pinia";
import QuizComponent from "./components/QuizComponent.vue";

const pinia = createPinia();

export default defineComponent({
  components: {
    QuizComponent,
  },
  setup() {
    return {
      pinia,
    };
  },
});
</script>

<style>
body {
  background-color: rgba(252, 92, 101, 0.9);
}
#app {
  height: 95vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #4b6584;
}
</style>
