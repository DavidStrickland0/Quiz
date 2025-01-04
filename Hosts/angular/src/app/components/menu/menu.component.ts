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
    uiux: false,
    concepts: false,
    fintech: false,
    compliance: false
  };

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(event: Event, section: 'quizzes' | 'general' |  'fintech' | 'uiux'| 'concepts'| 'compliance') {
    event.preventDefault(); // Prevents default link behavior
    // Close all sections
    this.isDropdownOpen = {
      quizzes: false,
      general: false,
      uiux: false,
      concepts: false,
      fintech: false,
      compliance: false,
    };
    // Toggle the selected section
    this.isDropdownOpen[section] = !this.isDropdownOpen[section];
  }
}
