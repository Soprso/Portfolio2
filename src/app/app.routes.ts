// app.routes.ts
import { Routes } from '@angular/router';
import { BlogsComponent } from './components/blogs/blogs.component';
import { AngularAnimationsComponent } from './components/blogs/angular-animations/angular-animations.component';
import { DotnetDependencyInjectionComponent } from './components/blogs/dotnet-dependency-injection/dotnet-dependency-injection.component';
import { JavascriptClosuresComponent } from './components/blogs/javascript-closures/javascript-closures.component';

export const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'angular-animations', component: AngularAnimationsComponent },
  { path: 'dotnet-dependency-injection', component: DotnetDependencyInjectionComponent },
  { path: 'javascript-closures', component: JavascriptClosuresComponent },
  { path: '**', redirectTo: '' }
];
