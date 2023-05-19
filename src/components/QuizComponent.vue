<template>
  <v-form>
    <div v-if="currentQuestion.id <= 4">
      <h1>{{ currentQuestion.question }}</h1>
      <ul>
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
    </div>
    <div v-else class="userResults">
      <h1>Quiz Completed! Your answers:</h1>
      <div
        class="userAnswer"
        v-for="answer in selectedAnswers"
        :key="answer.index"
      >
        {{ answer.text }}
      </div>
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
  width: 75vw;
  min-height: 40vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  border: 2px solid #eb3b5a;
  background-color: rgba(252, 92, 101, 0.9);
  color: #fff;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
h1 {
  margin-bottom: 40px;
}
.userResults {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.userAnswer {
  padding: 5px;
  font-weight: bolder;
  border-radius: 10%;
}
</style>
