import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiQuestionUrl = "https://quiz-c5c5fvb0f6dndabe.centralus-01.azurewebsites.net/question"
  private apiCheckAnswerUrl = "https://quiz-c5c5fvb0f6dndabe.centralus-01.azurewebsites.net/check-answer";
  question : any
  correct : any

  constructor(private httpClient: HttpClient) { }

 // Retrieve question
  retrieveQuestion(): Observable<any> {
    return this.httpClient.get(this.apiQuestionUrl);
  }

  // Check answer
  checkAnswer(questionIndex: number, answer: string[]): Observable<any> {
    const params = { questionIndex: questionIndex.toString() };
    return this.httpClient.post(this.apiCheckAnswerUrl, answer, { params });
  }
}
