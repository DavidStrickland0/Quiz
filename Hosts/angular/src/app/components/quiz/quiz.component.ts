import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

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
  quizName: string = ''; // Holds the quiz name from the route parameter

  constructor(
    private quizService: QuizService, 
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Get the quiz name from the route parameter
    this.route.paramMap.subscribe(params => {
      this.quizName = params.get('quizName') || '';
      this.loadQuestion();
    });
  }

  loadQuestion(): void {
    if (this.quizName) {
      this.quizService.retrieveQuestion(this.quizName).subscribe(
        (data) => {
          this.question = data;
          this.question.isMultiple = data.correctAnswer.length>1;
          this.selectedAnswers = [];
          this.isAnswerCorrect = null;
          this.resetCountdown();
          this.cdr.markForCheck();  // Force change detection
        },
        (error) => {
          console.error('Error retrieving question', error);
        }
      );
    }
  }

  submitAnswer(): void {
    if (this.quizName && this.question) {
      this.quizService.checkAnswer(this.quizName, this.question.index, this.selectedAnswers).subscribe(
        (response) => {
          this.result = response;
          this.isAnswerCorrect = response;

          if (this.isAnswerCorrect) {
            this.startCountdown();
          }
          this.cdr.markForCheck();  // Force change detection after checking answer
        },
        (error) => {
          console.error('Error checking answer', error);
        }
      );
    }
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
