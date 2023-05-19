<template>
  <v-form>
    <v-toolbar>
      <div
        @click="previousQuestion"
        v-if="currentQuestion.id > 1"
        class="previousQuestion"
      >
        &#8592;
      </div>
      <v-toolbar-title> Quiz </v-toolbar-title>
      <div class="questionCounter" v-if="currentQuestion.id < 5">
        <div>{{ currentQuestion.id }}</div>
        /4
      </div>
    </v-toolbar>

    <div v-if="currentQuestion.id <= 4">
      <h1 class="questionTitle">{{ currentQuestion.question }}</h1>
      <ul>
        <li v-for="answer in currentQuestion.answers" :key="answer.id">
          <v-btn
            class="v-btn"
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
    <ol v-else class="userResults">
      <h1>Quiz Completed! Your answers:</h1>
      <li
        class="userAnswer"
        v-for="answer in selectedAnswers"
        :key="answer.index"
      >
        {{ answer.text }}
      </li>
    </ol>
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
    const previousQuestion = computed(() => quizStore.previousQuestion);
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
      previousQuestion,
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
  background-color: #fff;
  width: 40vw;
  min-height: 50vh;
  margin: 0 auto;
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
}

ul {
  list-style-type: none;
  display: flex;
  gap: 20px;
  flex-direction: column;
}
ol,
ul {
  padding-bottom: 20px;
}
.questionTitle {
  margin-bottom: 80px;
}
h1 {
  margin-bottom: 70px;
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
form .v-btn {
  width: 50%;
  color: #fff;
  background-color: rgb(252, 92, 101);
}
form .v-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-bottom: 1px solid #000;
  margin-bottom: 20px;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
}
form .v-toolbar__content {
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
}
.previousQuestion {
  font-size: 35px;
  cursor: pointer;
  font-weight: 800;
}
.questionCounter {
  display: flex;
  width: 40px;
  color: rgb(252, 92, 101);
}
.questionCounter div {
  background-color: rgb(252, 92, 101);
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 2px;
}
</style>
