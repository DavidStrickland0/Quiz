import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';

export const routes: Routes = [
    {
        path: ':quizName', component: QuizComponent
    }
];
