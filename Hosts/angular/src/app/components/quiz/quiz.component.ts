import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  question: any;
  selectedAnswers: string[] = [];
  result: any;
  isAnswerCorrect: boolean | null = null;
  timeLeft: number = 5;
  progressPercentage: number = 100;
  countdownInterval: any;

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuestion();
  }

  loadQuestion(): void {
    this.quizService.retrieveQuestion().subscribe(
      (data) => {
        this.question = data;
        this.selectedAnswers = [];
        this.isAnswerCorrect = null;
        this.resetCountdown();
      },
      (error) => {
        console.error('Error retrieving question', error);
      }
    );
  }

  submitAnswer(): void {
    this.quizService.checkAnswer(this.question.index, this.selectedAnswers).subscribe(
      (response) => {
        this.result = response;
        this.isAnswerCorrect = response;

        if (this.isAnswerCorrect) {
          this.startCountdown();
        }
      },
      (error) => {
        console.error('Error checking answer', error);
      }
    );
  }

  onAnswerSelected(answer: string): void {
    if (this.question.isMultiple) {
      const index = this.selectedAnswers.indexOf(answer);
      if (index === -1) {
        this.selectedAnswers.push(answer);
      } else {
        this.selectedAnswers.splice(index, 1);
      }
    } else {
      this.selectedAnswers = [answer]; // Only one answer allowed for single-answer questions
    }
  }

  startCountdown(): void {
    this.timeLeft = 5;
    this.progressPercentage = 100;
    this.countdownInterval = setInterval(() => {
      this.timeLeft--;
      this.progressPercentage = (this.timeLeft / 5) * 100;
      if (this.timeLeft === 0) {
        clearInterval(this.countdownInterval);
        this.loadQuestion();
      }
    }, 1000);
  }

  resetCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.timeLeft = 5;
    this.progressPercentage = 100;
  }
}
