import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  searchTerm: string = '';

  blogs = [
    { title: 'Understanding Angular Signals', content: 'Angular 20 introduces signals for reactivity...' },
    { title: 'CSS Tricks for Modern UI', content: 'Let’s explore flexbox and grid layout tips...' },
    { title: 'Deploying to Vercel', content: 'Here’s a step-by-step guide to deploy Angular apps to Vercel...' },
    // Add more blogs
  ];

  get filteredBlogs() {
    return this.blogs.filter(blog =>
      blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
