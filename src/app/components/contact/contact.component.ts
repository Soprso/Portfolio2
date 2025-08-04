import { AfterViewInit, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const contactSection = this.elRef.nativeElement.querySelector('.contact-section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            contactSection.classList.add('active');
          } else {
            contactSection.classList.remove('active'); // Optional: replay animation
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% visible
    );

    observer.observe(contactSection);
  }
}
