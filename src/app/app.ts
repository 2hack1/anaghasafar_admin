import { Component } from '@angular/core';
import {  Router, RouterOutlet,NavigationEnd, Event as RouterEvent } from '@angular/router';
import { Header } from './shared/components/header/header';
import { UserServices } from './core/services/user-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'adminfrontend';

  status: 'active' | 'deactive' = 'deactive';
 isLoginPage = false;
  constructor(private user: UserServices,private router: Router) {
    this.user.state$.subscribe(state => {
      this.status = state as 'active' | 'deactive';
    });
    console.log("status", this.status);
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.urlAfterRedirects === '/login';
      }
    });
  }
}
