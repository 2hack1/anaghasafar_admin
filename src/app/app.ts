import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { UserServices } from './core/services/user-services';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [Header, CommonModule,RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected title = 'adminfrontend';
  status: 'active' | 'deactive' = 'deactive';

  // Routes that need full-screen layout
  isFullScreenPage = false;
  private fullScreenRoutes = ['/login', '/Venderform'];

  constructor(private user: UserServices, private router: Router) {
    this.user.state$.subscribe(state => {
      this.status = state as 'active' | 'deactive';
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const currentUrl = event.urlAfterRedirects;
        this.isFullScreenPage = this.fullScreenRoutes.some(path =>
          currentUrl.startsWith(path)
        );
      });
  }
}

