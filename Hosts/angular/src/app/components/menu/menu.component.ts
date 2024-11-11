import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isMenuOpen = false;
  isDropdownOpen = {
    quizzes: false,
    general: false,
    angular: false,
    fintech: false
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(event: Event, section: 'quizzes' | 'general' | 'angular' | 'fintech') {
    event.preventDefault(); // Prevents default link behavior
    // Close all sections
    this.isDropdownOpen = {
      quizzes: false,
      general: false,
      angular: false,
      fintech: false
    };
    // Toggle the selected section
    this.isDropdownOpen[section] = !this.isDropdownOpen[section];
  }
}
