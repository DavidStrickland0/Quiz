import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiQuestionUrl = "https://localhost:7257/question"
  private apiCheckAnswerUrl = "https://localhost:7257/check-answer";
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
