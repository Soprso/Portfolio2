import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
activeSection: string = 'home';
 isMenuOpen = false;
  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = document.querySelectorAll('section');
    let current = 'home';

    sections.forEach((section: Element) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id') || current;
      }
    });

    this.activeSection = current;
  }

  setActive(section: string) {
    this.activeSection = section;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

 

toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}


}
