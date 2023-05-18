<template>
  <div>
    <h2>{{ currentQuestion.question }}</h2>
    <ul>
      <li v-for="answer in currentQuestion.answers" :key="answer.id">
        <input type="radio" :value="answer.id" v-model="selectedAnswerId" />
        {{ answer.text }}
      </li>
    </ul>
    <button @click="saveAnswer">Next</button>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useQuizStore } from "store/quizStore";
export default defineComponent({
  setup() {
    const quizStore = useQuizStore();
    const selectedOption = ref("");

    const currentQuestion = computed(() => quizStore.getCurrentQuestion());

    const submitAnswer = () => {
      quizStore.submitAnswer(selectedOption.value);
      selectedOption.value = "";
    };

    return {
      currentQuestion,
      selectedOption,
      submitAnswer,
    };
  },
});
</script>
