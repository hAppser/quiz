<template>
  <v-form>
    <h1>{{ currentQuestion.question }}</h1>
    <ul v-if="currentQuestion.id < 5">
      <li v-for="answer in currentQuestion.answers" :key="answer.id">
        <v-btn
          v-if="currentQuestion.selectedAnswer === null"
          :value="answer.id"
          v-model="selectedAnswer"
          :disabled="currentQuestion.selectedAnswer !== null"
          @click="handleAnswerSelection(answer)"
        >
          {{ answer.text }}
        </v-btn>
      </li>
    </ul>
    <div v-if="currentQuestion.selectedAnswer !== null">
      <h2>Quiz Completed! Your answers:</h2>
      <ul>
        <li v-for="answer in selectedAnswers" :key="answer.index">
          {{ answer.text }}
        </li>
      </ul>
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
    const selectedAnswers = quizStore.selectedAnswers;
    const selectedAnswer = ref(null);
    const currentQuestion = computed(() => quizStore.currentQuestion);
    const handleAnswerSelection = (answer) => {
      quizStore.selectedAnswers.push(answer);
      quizStore.selectedAnswer(answer.id);
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
      selectedAnswers,
    };
  },
};
</script>
<style>
form {
  width: 75%;
  height: 50vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 2px solid black;
}
ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
</style>
