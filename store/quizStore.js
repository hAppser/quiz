import { defineStore } from "pinia";

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [
      {
        id: 1,
        question: "Select your baby`s gender",
        answers: [
          { id: 1, text: "BOY" },
          { id: 2, text: "GIRL" },
        ],
        selectedAnswer: null,
      },
      {
        id: 2,
        question: "How old is your baby?",
        answers: [
          { id: 1, text: "Under 6 months" },
          { id: 2, text: "6-8 months" },
          { id: 3, text: "8-10 months" },
          { id: 4, text: "Over 10 months" },
        ],
        selectedAnswer: null,
      },
      {
        id: 3,
        question: "What is your baby's current weight? ",
        answers: [
          { id: 1, text: "Under 10 pounds" },
          { id: 2, text: "10-15 pounds" },
          { id: 3, text: "15-20 pounds" },
          { id: 4, text: "Over 20 pounds" },
        ],
        selectedAnswer: null,
      },
      {
        id: 4,
        question: "Your baby's overall health and development  ",
        answers: [
          { id: 1, text: "Healthy and thriving" },
          { id: 2, text: "Some health concerns" },
          { id: 3, text: "Developmental delays or concerns" },
        ],
        selectedAnswer: null,
      },
      {
        id: 5,
        question: " ",
        selectedAnswer: null,
      },
    ],
    currentQuestionIndex: 0,
    selectedAnswers: [], // массив выбранных ответов
  }),
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
  },
  actions: {
    selectedAnswer(answerId) {
      this.questions[this.currentQuestionIndex].selectedAnswer = answerId;
    },

    nextQuestion() {
      const currentQuestion = this.currentQuestion;

      if (currentQuestion.id < this.questions.length) {
        if (currentQuestion.selectedAnswer !== null) {
          this.currentQuestionIndex++;
        }
        return;
      }
    },
    previousQuestion() {
      this.selectedAnswers.pop();
      this.currentQuestionIndex -= 1;
      this.currentQuestion.selectedAnswer = null;
    },
  },
});
