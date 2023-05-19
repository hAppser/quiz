<template>
  <v-form>
    <h1>{{ currentQuestion.question }}</h1>
    <ul>
      <li v-for="answer in currentQuestion.answers" :key="answer.id">
        <v-btn
          :value="answer.id"
          v-model="selectedAnswer"
          :disabled="currentQuestion.selectedAnswer !== null"
          @onchange="handleAnswerSelection"
        >
          {{ answer.text }}
        </v-btn>
      </li>
    </ul>
    <div v-if="quizCompleted">
      <h2>Quiz Completed!</h2>
    </div>
  </v-form>
</template>

<script>
import { ref } from "vue";
import { useQuizStore } from "../../store/quizStore";
import { computed } from "@vue/reactivity";

export default {
  setup() {
    const quizStore = useQuizStore();

    const selectedAnswer = ref(null);
    const currentQuestion = computed(() => quizStore.currentQuestion);
    const handleAnswerSelection = (answer) => {
      quizStore.selectedAnswers.push(answer);
      quizStore.selectedAnswer(answer.id);
      console.log(answer);
      if (currentQuestion.selectedAnswer !== null) {
        quizStore.nextQuestion();
      }
    };
    return {
      currentQuestion,
      selectedAnswer,
      questions: quizStore.questions,
      score: quizStore.score,
      quizCompleted:
        quizStore.currentQuestionIndex === quizStore.questions.length,
      handleAnswerSelection,
    };
  },
};
</script>
<style>
ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
</style>
