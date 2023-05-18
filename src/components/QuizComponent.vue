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
export default {
  data() {
    return {
      questions: [
        {
          id: 1,
          question: "Question 1",
          answers: [
            { id: 1, text: "Answer 1" },
            { id: 2, text: "Answer 2" },
            { id: 3, text: "Answer 3" },
          ],
        },
        {
          id: 2,
          question: "Question 2",
          answers: [
            { id: 1, text: "Answer 1" },
            { id: 2, text: "Answer 2" },
            { id: 3, text: "Answer 3" },
          ],
        },
      ],
      currentQuestionIndex: 0,
      selectedAnswerId: null,
      selectedAnswers: [], // массив выбранных ответов
    };
  },
  computed: {
    // currentQuestion() {
    //   return this.questions[this.currentQuestionIndex];
    // },
  },
  methods: {
    saveAnswer() {
      // находим выбраный ответ
      const selectedAnswer = this.currentQuestion.answers.find(
        (answer) => answer.id === this.selectedAnswerId
      );

      // Добавляем выбранный ответ в массив selectedAnswers
      this.selectedAnswers.push({
        question: this.currentQuestion.question,
        selectedAnswer: selectedAnswer ? selectedAnswer.text : "No answer",
      });

      // обнуляем выбранное

      this.selectedAnswerId = null;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        console.log("Quiz completed!");
        console.log(this.selectedAnswers); // массив со всеми выбранными ответами
      }
    },
  },
};
</script>
