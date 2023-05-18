import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [
      {
        id: 1,
        question: "Select your baby’s gender ",
        options: ["BOY", "GIRL"],
        answered: false,
      },
      {
        id: 2,
        question: "How old is your baby? ",
        options: [
          "Under 6 months",
          "6-8 months",
          "8-10 months",
          "Over 10 months",
        ],
        answered: false,
      },
      {
        id: 3,
        question: "What is your baby's current weight? ",
        options: [
          "Under 10 pounds",
          "10-15 pounds",
          "15-20 pounds",
          "Over 20 pounds",
        ],
        answered: false,
      },
      {
        id: 4,
        question: "Your baby's overall health and development  ",
        options: [
          "Healthy and thriving",
          "Some health concerns",
          "Developmental delays or concerns",
        ],
        answered: false,
      },
    ],
    currentQuestionIndex: 0,
    selectedAnswers: [],
  }),
  getters: {
    getCurrentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
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
});
