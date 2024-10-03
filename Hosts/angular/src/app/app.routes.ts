import { Routes } from '@angular/router';
import { QuizComponent } from './components/quiz/quiz.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path: ':quizName', component: QuizComponent},
    {path: '', component: HomeComponent}

];
