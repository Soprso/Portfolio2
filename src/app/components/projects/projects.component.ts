import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'] // <-- FIXED (plural)
})
export class ProjectsComponent implements AfterViewInit {

  constructor(private elRef: ElementRef) { }

  private initializeProjectAnimations() {
    const projectCards = this.elRef.nativeElement.querySelectorAll('.project-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          const index = Array.from(projectCards).indexOf(target);

          if (entry.isIntersecting) {
            target.style.transitionDelay = `${index * 150}ms`;
            target.classList.add('active');
          } else {
            target.style.transitionDelay = `0ms`;
            target.classList.remove('active');
          }
        });
      },
      { threshold: 0.2 }
    );

    projectCards.forEach((el: Element) => {
      (el as HTMLElement).classList.remove('active');
      observer.observe(el);
    });
  }

  ngAfterViewInit(): void {
    this.initializeProjectAnimations();
  }

}
