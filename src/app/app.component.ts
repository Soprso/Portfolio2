import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { WorkSectionComponent } from "./components/work-section/work-section.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ContactComponent } from "./components/contact/contact.component";
import { BlogsComponent } from "./components/blogs/blogs.component";
import { CommonModule } from '@angular/common';
import { ProgressBarService } from './services/progress-bar.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeComponent,
    WorkSectionComponent,
    ProjectsComponent,
    ContactComponent,
    BlogsComponent,
    CommonModule,
    MatProgressBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly title = signal('portfolio2');
  isDetailPage = false;
  isLoading = false;

  // Routes that should display the full page with sections
  nonDetailRoutes = ['/', '/#home', '/#work', '/#projects', '/#blogs', '/#contact'];

  constructor(private router: Router, private progressBar: ProgressBarService) {
    // Listen to router events for determining page type
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isDetailPage = !this.nonDetailRoutes.includes(event.urlAfterRedirects);
      });

    // Subscribe to the progress bar service
    this.progressBar.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }
}
