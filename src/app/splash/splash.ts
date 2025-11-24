import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class SplashComponent implements OnInit {
  showSplash = true;

  ngOnInit() {
    // Hide splash after 3 seconds
    setTimeout(() => {
      this.showSplash = false;
    }, 3000);
  }
}
