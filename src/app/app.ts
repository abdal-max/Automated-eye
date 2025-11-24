import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar';
import { HeroComponent } from './hero/hero';
import { ServicesComponent } from './services/services';
import { ProjectsComponent } from './projects/projects';
import { ContactComponent } from './contact/contact';
import { AboutComponent } from './about/about';
import { FooterComponent } from './footer/footer';
import { SplashComponent } from './splash/splash';
import { ServicesBarComponent } from './services-bar/services-bar';
import { LanguageBarComponent } from './language-bar/language-bar.component';
import { LogoCarouselComponent } from './logo-carousel/logo-carousel.component';
import { FloatingButtonsComponent } from './floating-buttons/floating-buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SplashComponent,
    ServicesBarComponent,
    LanguageBarComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    LogoCarouselComponent,
    ServicesComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    FloatingButtonsComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'العين المؤتمتة';
  showSplash = true;

  ngOnInit() {
    // Hide splash after 3 seconds
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
