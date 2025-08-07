import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { WorkSectionComponent } from "./components/work-section/work-section.component";
import { ProjectsComponent } from "./components/projects/projects.component";
import { ContactComponent } from "./components/contact/contact.component";
import { BlogsComponent } from "./components/blogs/blogs.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, WorkSectionComponent, ProjectsComponent, ContactComponent, BlogsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('portfolio2');
}

