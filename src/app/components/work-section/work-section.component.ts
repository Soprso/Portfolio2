import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-work-section',
  imports: [CommonModule],
  templateUrl: './work-section.component.html',
  styleUrl: './work-section.component.scss'
})
export class WorkSectionComponent implements AfterViewInit {
  activeTab: string = 'experience';
  selectedExperience: any = null;

  constructor(private elRef: ElementRef) { }

  /**
   * Handle tab switching
   */
  setTab(tab: string) {
    this.activeTab = tab;

    // Reinitialize animations only when switching back to "Experience"
    setTimeout(() => {
      if (tab === 'experience') {
        this.initializeTimelineAnimations();
        this.onScroll();
      } else if (tab === 'skills') {
        this.initializeSkillsAnimations();
      } else if (tab === 'education') {
        this.initializeEducationAnimations();
      }
    }, 50);
  }

  private initializeEducationAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active'); // Replay animation when re-entering
          }
        });
      },
      { threshold: 0.2 }
    );

    this.elRef.nativeElement.querySelectorAll('.resume-card').forEach((el: Element) => {
      el.classList.remove('active');
      observer.observe(el);
    });
  }


  /**
   * Initialize IntersectionObserver for timeline items
   */
  private initializeTimelineAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active'); // Replay animation on re-enter
          }
        });
      },
      { threshold: 0.2 }
    );

    // Reset and observe all timeline items
    this.elRef.nativeElement.querySelectorAll('.timeline-item').forEach((el: Element) => {
      el.classList.remove('active');
      observer.observe(el);
    });
  }

  private initializeSkillsAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          } else {
            entry.target.classList.remove('active'); // Replay animation on re-enter
          }
        });
      },
      { threshold: 0.2 }
    );

    this.elRef.nativeElement.querySelectorAll('.tech-card').forEach((el: Element) => {
      el.classList.remove('active');
      observer.observe(el);
    });
  }


  /**
   * Open modal with experience details
   */
  openModal(role: string) {
    const experiences: any = {
      technicalLead: { title: 'Technical Lead', company: 'LTIMindtree', duration: '2022 – 2023', details: 'Provided L2/L3 support, managed incidents via ServiceNow/JIRA, led a team, and monitored applications using SolarWinds.' },
      fullStackDev: { title: 'Full Stack Developer', company: 'Cognizant', duration: '2021 – 2022', details: 'Migrated .NET services to 4.8, developed travel apps, resolved incidents within sprints using SQL Server, Web API 2.0, and Entity Framework.' },
      technicalAnalyst: { title: 'Technical Analyst', company: 'Cognizant', duration: '2017 – 2021', details: 'Delivered L2/L3 support, stabilized platforms, and built expertise in AngularJS, ASP.NET Web API, and ServiceNow.' },
      programmerTrainee: { title: 'Analyst Trainee', company: 'Cognizant', duration: '2015 – 2017', details: 'Gained foundational experience with .NET, SQL Server, and application support in the insurance domain.' }
    };
    this.selectedExperience = experiences[role];
  }

  /**
   * Close modal
   */
  closeModal() {
    this.selectedExperience = null;
  }

  /**
   * Initialize animations after component view loads
   */
  ngAfterViewInit(): void {
    if (this.activeTab === 'experience') {
      this.initializeTimelineAnimations();
      setTimeout(() => this.onScroll(), 100);
    }
  }

  /**
   * Draw timeline line and activate circles on scroll
   */
  @HostListener('window:scroll', [])
  onScroll() {
    const container = this.elRef.nativeElement.querySelector('.timeline-container');
    const line = this.elRef.nativeElement.querySelector('.timeline-line');
    const circles = Array.from(this.elRef.nativeElement.querySelectorAll('.timeline-circle')) as HTMLElement[];
    if (!container || !line) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Hide line if section is below viewport
    if (rect.top >= windowHeight) {
      line.style.height = `0px`;
      circles.forEach(c => c.classList.remove('active'));
      return;
    }

    // Full line if section is above viewport
    if (rect.bottom <= 0) {
      line.style.height = `${rect.height}px`;
      circles.forEach(c => c.classList.add('active'));
      return;
    }

    // Calculate visible line height
    const visibleHeight = Math.min(rect.height, Math.max(windowHeight - rect.top, 0));
    line.style.height = `${visibleHeight}px`;

    // Activate circles as line passes
    circles.forEach((circle) => {
      const circleOffset = circle.offsetTop;
      if (visibleHeight >= circleOffset) {
        circle.classList.add('active');
      } else {
        circle.classList.remove('active');
      }
    });
  }
}
