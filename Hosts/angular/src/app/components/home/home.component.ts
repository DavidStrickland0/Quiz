import { Component } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatExpansionModule, CommonModule, MenuComponent], // Ensure expansion modules are imported
})
export class HomeComponent {
  constructor(  private titleService: Title ){}
  ngOnInit(): void {
    this.titleService.setTitle(`David Strickland`);

  }
}
