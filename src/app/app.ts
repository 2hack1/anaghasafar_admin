import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { UserServices } from './core/services/user-services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'adminfrontend';

  status: 'active' | 'deactive' = 'deactive';

  constructor(private user:UserServices) {
    this.user.state$.subscribe(state => {
      this.status = state as 'active' | 'deactive';
    });

    console.log("status",this.status);
  }
}
