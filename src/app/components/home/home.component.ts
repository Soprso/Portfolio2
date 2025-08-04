import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const elements = this.elRef.nativeElement.querySelectorAll('.home-animate');

    // 1. Run staggered page-load animation
    elements.forEach((el: HTMLElement, index: number) => {
      el.classList.remove('active'); // Ensure reset before animation
      setTimeout(() => {
        el.classList.add('active');
      }, index * 300); // Staggered delay
    });

    // 2. Initialize scroll observer AFTER stagger completes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            target.classList.add('active');
          } else {
            target.classList.remove('active'); // Replay when scrolling back
          }
        });
      },
      { threshold: 0.2 }
    );

    // Delay observer setup until stagger finishes
    const totalStaggerTime = elements.length * 300; // Total duration of stagger
    setTimeout(() => {
      elements.forEach((el: Element) => {
        observer.observe(el);
      });
    }, totalStaggerTime);
  }
}
