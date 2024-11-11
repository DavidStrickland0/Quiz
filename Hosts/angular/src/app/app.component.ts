import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule  } from '../app/components/menu/menu.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
}
