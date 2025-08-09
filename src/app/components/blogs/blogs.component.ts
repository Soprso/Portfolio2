import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [RouterLink, CommonModule, MatProgressBarModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements AfterViewInit {
  searchTerm: string = '';
  loading: boolean = false;

  blogs = [
    { id: 1, title: 'Understanding Angular Signals', content: 'Angular 20 introduces signals for reactivity...' },
    { id: 2, title: 'CSS Tricks for Modern UI', content: 'Let’s explore flexbox and grid layout tips...' },
    { id: 3, title: 'Deploying to Vercel', content: 'Here’s a step-by-step guide to deploy Angular apps to Vercel...' },
  ];

  constructor(private router: Router, private elRef: ElementRef) {}

  get filteredBlogs() {
    return this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openBlog(blogId: number) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/blog-detail', blogId]);
    }, 2000);
  }

  ngAfterViewInit(): void {
    this.initializeBlogAnimations();
  }

  private initializeBlogAnimations() {
    const blogCards = this.elRef.nativeElement.querySelectorAll('.blog-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const index = Array.from(blogCards).indexOf(target);

        if (entry.isIntersecting) {
          target.style.transitionDelay = `${index * 150}ms`;
          target.classList.add('active');
        } else {
          target.style.transitionDelay = `0ms`;
          target.classList.remove('active');
        }
      });
    }, { threshold: 0.2 });

    blogCards.forEach((el: Element) => {
      (el as HTMLElement).classList.remove('active');
      observer.observe(el);
    });
  }
}
