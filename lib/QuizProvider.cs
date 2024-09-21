using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace lib
{
    public class QuizProvider
    {
        private static List<QuizQuestion> _questions;

        static QuizProvider()
        {
            LoadQuestions();
        }

        private static void LoadQuestions()
        {
            // Load questions from the JSON file
            string filePath = Path.Combine(Directory.GetCurrentDirectory(),  "az-900.json");
            var jsonData = File.ReadAllText(filePath);
            _questions = JsonSerializer.Deserialize<List<QuizQuestion>>(jsonData);
        }

        // Method to get a random question
        public static RandomizedQuestion RandomQuestion()
        {
            if (_questions == null || !_questions.Any())
            {
                return null;
            }

            var random = new Random();
            var randomQuestion = _questions[random.Next(_questions.Count)];

            var shuffledOptions = randomQuestion.Options
                                                .OrderBy(x => Guid.NewGuid())
                                                .ToList();

            return new RandomizedQuestion
            {
                Index = _questions.IndexOf(randomQuestion),
                text = randomQuestion.Question,
                answers = shuffledOptions,
                isMultiple = randomQuestion.CorrectAnswer.Count>1
            };
        }

        // Method to verify if the provided answers are correct
        public static bool AreAnswersCorrect(int questionIndex, List<string> answerTexts)
        {
            if (_questions == null || questionIndex < 0 || questionIndex >= _questions.Count)
            {
                return false; // Invalid question index
            }

            var question = _questions[questionIndex];

            // Get the correct answers from the question by their index
            var correctAnswers = question.CorrectAnswer.Select(index => question.Options[index]).ToList();

            // Compare if the provided answers match the correct answers
            return new HashSet<string>(correctAnswers).SetEquals(answerTexts);
        }
    }

}
