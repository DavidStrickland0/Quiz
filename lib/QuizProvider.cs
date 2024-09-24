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
        private static Dictionary<string,List<QuizQuestion>> _questions = new Dictionary<string, List<QuizQuestion>>();

        static QuizProvider()
        {
            LoadQuestions();
        }

        private static void LoadQuestions()
        {
            // Define the folder where the quiz files are located (current directory in this case)
            string quizDirectory = Directory.GetCurrentDirectory();

            // Get all files with the ".quiz" extension in the current directory
            var quizFiles = Directory.GetFiles(quizDirectory, "*.quiz");

            // Iterate over each file and load the questions
            foreach (var filePath in quizFiles)
            {
                // Extract the test name from the file name (without the extension)
                var testName = Path.GetFileNameWithoutExtension(filePath);

                // Read the contents of the quiz file
                var jsonData = File.ReadAllText(filePath);

                // Deserialize the JSON data into a list of QuizQuestion objects and add to the dictionary
                var questions = JsonSerializer.Deserialize<List<QuizQuestion>>(jsonData);

                // Add the deserialized questions to the _questions dictionary, using the test name as the key
                if (questions != null)
                {
                    _questions[testName] = questions;
                }
            }
        }

        // Method to get a random question
        public static RandomizedQuestion RandomQuestion(string test)
        {
            if (_questions == null || !_questions.ContainsKey(test) || _questions[test] == null)
            {
                return null;
            }

            var random = new Random();
            var randomQuestion = _questions[test][random.Next(_questions[test].Count)];

            var shuffledOptions = randomQuestion.Options
                                                .OrderBy(x => Guid.NewGuid())
                                                .ToList();

            return new RandomizedQuestion
            {
                Index = _questions[test].IndexOf(randomQuestion),
                text = randomQuestion.Question,
                answers = shuffledOptions,
                isMultiple = randomQuestion.CorrectAnswer.Count>1
            };
        }

        // Method to verify if the provided answers are correct
        public static bool AreAnswersCorrect(string test, int questionIndex, List<string> answerTexts)
        {
            if (_questions == null || !_questions.ContainsKey(test)|| _questions[test] == null || questionIndex < 0 || questionIndex >= _questions[test].Count)
            {
                return false; // Invalid question index
            }

            var question = _questions[test][questionIndex];

            // Get the correct answers from the question by their index
            var correctAnswers = question.CorrectAnswer.Select(index => question.Options[index]).ToList();

            // Compare if the provided answers match the correct answers
            return new HashSet<string>(correctAnswers).SetEquals(answerTexts);
        }
    }

}
