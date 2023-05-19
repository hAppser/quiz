<template>
  <div>
    <h1>{{ currentQuestion.text }}</h1>
    <ul>
      <li v-for="answer in currentQuestion.answers" :key="answer.id">
        <label>
          <input
            type="radio"
            :value="answer.id"
            v-model="selectedAnswer"
            :disabled="currentQuestion.selectedAnswer !== null"
            @change="handleAnswerSelection"
          />
          {{ answer.text }}
        </label>
      </li>
    </ul>
    <div v-if="quizCompleted">
      <h2>Quiz Completed!</h2>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuizStore } from "../../store/quizStore";

export default {
  setup() {
    const quizStore = useQuizStore();

    const selectedAnswer = ref(null);

    const handleAnswerSelection = (answerId) => {
      quizStore.selectedAnswer(answerId);
      if (quizStore.currentQuestion.selectedAnswer !== null) {
        quizStore.nextQuestion();
      }
    };
    return {
      currentQuestion: quizStore.currentQuestion,
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
}
</style>
