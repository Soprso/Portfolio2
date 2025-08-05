import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ContactComponent implements AfterViewInit {
  contactForm: FormGroup;
  isSending = false;
  messageStatus = '';

  constructor(private elRef: ElementRef, private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: [
        '',
        [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')]
      ],
      message: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const contactSection = this.elRef.nativeElement.querySelector('.contact-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          contactSection.classList.toggle('active', entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(contactSection);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    this.messageStatus = '';

    const { name, email, message } = this.contactForm.value;

    emailjs
      .send(
        'service_tek9n12',
        'template_i8g94bj',
        { from_name: name, from_email: email, message: message },
        'tn5GV0k1376UbJ4MS'
      )
      .then(
        (response: EmailJSResponseStatus) => {
          this.isSending = false;
          this.messageStatus = 'Message sent successfully!';
          this.contactForm.reset();
        },
        (error) => {
          this.isSending = false;
          this.messageStatus = 'Failed to send message. Try again later.';
          console.error('EmailJS Error:', error);
        }
      );
  }

  hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.touched && control?.hasError(error));
  }
}
