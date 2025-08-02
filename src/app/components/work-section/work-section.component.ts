import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-work-section',
  imports: [CommonModule],
  templateUrl: './work-section.component.html',
  styleUrl: './work-section.component.scss'
})
export class WorkSectionComponent {
   activeTab: string = 'experience';

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
