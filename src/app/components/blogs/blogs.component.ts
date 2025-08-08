import { Component } from '@angular/core';
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
export class BlogsComponent {
  searchTerm: string = '';
  loading: boolean = false; // ✅ for progress bar

  blogs = [
    { id: 1, title: 'Understanding Angular Signals', content: 'Angular 20 introduces signals for reactivity...' },
    { id: 2, title: 'CSS Tricks for Modern UI', content: 'Let’s explore flexbox and grid layout tips...' },
    { id: 3, title: 'Deploying to Vercel', content: 'Here’s a step-by-step guide to deploy Angular apps to Vercel...' },
  ];

  constructor(private router: Router) {}

  get filteredBlogs() {
    return this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openBlog(blogId: number) {
    this.loading = true; // show progress bar
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/blog-detail', blogId]);
    }, 2000); // 2 second delay
  }
}
