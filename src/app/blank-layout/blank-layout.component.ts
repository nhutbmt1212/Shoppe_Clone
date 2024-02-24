import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SvLoginService } from '../Services/ServicesLogin/sv-login.service';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatProgressBarModule],
  templateUrl: './blank-layout.component.html',
  styleUrl: './blank-layout.component.css'
})
export class BlankLayoutComponent implements OnInit {
  progressBar: boolean = false;
  title_Page: string = ''
  constructor(private loginSerivce: SvLoginService,
  ) {

  }
  ngOnInit(): void {
    this.loginSerivce.currentStatus.subscribe(status => {
      this.progressBar = status;

    })
    this.loginSerivce.currentTitleStatus.subscribe(title => {
      Promise.resolve().then(() => {
        if (title) {
          this.title_Page = 'Đăng nhập';
        }
        else {
          this.title_Page = 'Đăng ký';

        }
        console.log(title);
      });
    });
  }

}
