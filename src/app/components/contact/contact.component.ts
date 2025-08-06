import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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
    // Initialize form
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

  // Submit form and call serverless function
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSending = true;
    this.messageStatus = '';

    const { name, email, message } = this.contactForm.value;

    // Directly using tokens here
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_tek9n12',
        template_id: 'template_i8g94bj',
        user_id: 'tn5GV0k1376UbJ4MS',
        template_params: {
          from_name: name,
          from_email: email,
          message: message
        }
      })
    })
      .then(async res => {
        const text = await res.text(); // EmailJS returns "OK"
        return { ok: res.ok, text };
      })
      .then(result => {
        this.isSending = false;
        if (result.ok && result.text === 'OK') {
          this.messageStatus = 'Message sent successfully!';
          this.contactForm.reset();
        } else {
          this.messageStatus = 'Failed to send message. Try again later.';
          console.error('EmailJS Error:', result.text);
        }
      })
      .catch(err => {
        this.isSending = false;
        this.messageStatus = 'Failed to send message. Try again later.';
        console.error('Error:', err);
      });

  }

  // Helper for field errors
  hasError(field: string, error: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.touched && control?.hasError(error));
  }
}
