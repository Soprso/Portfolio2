import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { WorkSectionComponent } from "./components/work-section/work-section.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, WorkSectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class App {
  protected readonly title = signal('portfolio2');
}

