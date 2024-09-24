import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = "https://quiz-c5c5fvb0f6dndabe.centralus-01.azurewebsites.net"
  question : any
  correct : any

  constructor(private httpClient: HttpClient) { }

 // Retrieve question
  retrieveQuestion(quizName:string): Observable<any> {
    const url = `${this.apiUrl}/${quizName}/question`
    return this.httpClient.get(url);
  }

  // Check answer
  checkAnswer(quizName:string,questionIndex: number, answer: string[]): Observable<any> {
    const url = `${this.apiUrl}/${quizName}/check-answer`
    const params = { questionIndex: questionIndex.toString() };
    return this.httpClient.post(url, answer, { params });
  }
}
