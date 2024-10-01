import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private questions: any[] = [];

  constructor(private httpClient: HttpClient) { }

  // Retrieve a question from the quiz specified by quizName, with randomized options
  retrieveQuestion(quizName: string): Observable<any> {
    const quizUrl = `${quizName}.quiz`;  // Use the quizName to dynamically construct the URL

    if (this.questions.length > 0) {
      return of(this.getRandomizedQuestion());
    } else {
      return this.httpClient.get<any[]>(quizUrl).pipe(
        map((questions: any[]) => {
          this.questions = questions.map((q, i) => ({ ...q, index: i }));  // Assign index to each question
          return this.getRandomizedQuestion();
        }),
        catchError(error => {
          if (error.status === 404) {
            console.error(`Quiz file not found: ${quizUrl}`);  // Log the error
            return throwError(`Quiz file ${quizName}.quiz not found (404).`);  // Throw a descriptive error
          } else {
            return throwError(`An error occurred while loading the quiz: ${error.message}`);  // Handle other errors
          }
        })
      );
    }
  }

  // Check the answer based on the original order of options
  checkAnswer(quizName: string, questionIndex: number, submittedAnswers: string[]): Observable<any> {
    const question = this.questions[questionIndex];
    if (!question) {
      return of(false);  // If question not found, return false
    }

    // Get the original correct answers' positions (ordinal index in the original options array)
    const correctOrdinals = question.correctAnswer.map((correct: string) =>
      question.options.indexOf(correct)
    );

    // Map submitted answers (text) to their original positions (ordinal index in the original options array)
    const submittedOrdinals = submittedAnswers.map((answer: string) =>
      question.options.indexOf(answer)
    );

    // Check if the submitted ordinals match the correct ordinals (ignoring order)
    const isCorrect = this.arraysEqual(question.correctAnswer.sort(), submittedOrdinals.sort());

    return of(isCorrect);
  }

  // Helper function to compare two arrays
  private arraysEqual(arr1: number[], arr2: number[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  // Randomize the options of a question and return it
  private getRandomizedQuestion(): any {
    const randomIndex = Math.floor(Math.random() * this.questions.filter(q=>q.correctAnswer.length>1).length);
    const randomQuestion = this.questions.filter(q=>q.correctAnswer.length>1)[randomIndex];

    // Shuffle the options
    const shuffledOptions = [...randomQuestion.options].sort(() => Math.random() - 0.5);

    // Return the question with shuffled options but keep the original order in the service
    return { ...randomQuestion, options: shuffledOptions };
  }
}
