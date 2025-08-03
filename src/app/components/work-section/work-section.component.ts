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
  selectedExperience: any = null;
  setTab(tab: string) {
    this.activeTab = tab;
  }

  openModal(role: string) {
    const experiences: any = {
      technicalLead: {
        title: 'Technical Lead',
        company: 'LTIMindtree',
        duration: '2022 – 2023',
        details: 'Provided L2/L3 support, managed incidents via ServiceNow/JIRA, led a team, and monitored applications using SolarWinds.'
      },
      fullStackDev: {
        title: 'Full Stack Developer',
        company: 'Cognizant',
        duration: '2021 – 2022',
        details: 'Migrated .NET services to 4.8, developed travel apps, resolved incidents within sprints using SQL Server, Web API 2.0, and Entity Framework.'
      },
      technicalAnalyst: {
        title: 'Technical Analyst',
        company: 'Cognizant',
        duration: '2017 – 2021',
        details: 'Delivered L2/L3 support, stabilized platforms, and built expertise in AngularJS, ASP.NET Web API, and ServiceNow.'
      },
      programmerTrainee: {
        title: 'Analyst Trainee',
        company: 'Cognizant',
        duration: '2015 – 2017',
        details: 'Gained foundational experience with .NET, SQL Server, and application support in the insurance domain.'
      }
    };
    this.selectedExperience = experiences[role];
  }

  closeModal() {
    this.selectedExperience = null;
  }
}
