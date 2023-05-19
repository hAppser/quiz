<template>
  <div>
    <h1>Quiz</h1>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
