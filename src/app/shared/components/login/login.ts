import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServices } from '../../../core/services/user-services';
import { Auth } from '../../../core/services/auth';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {
  loginform: FormGroup;

  checkform = true;

  constructor(private fb: FormBuilder, private service: UserServices, private auth: Auth, private router: Router) {

    this.loginform = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    })
  }
  ngOnInit(): void {
    this.auth.checkAuthAndRedirect();

  }

  //  logindata:any;
  onlogin() {
    if (this.loginform.valid) {
      const logindata = new FormData();
      logindata.append("password", this.loginform.value.pass);
      logindata.append("email", this.loginform.value.email);
      logindata.append("role", "admin");

      this.service.loginAdmin(logindata).subscribe({


        next: (res: any) => {
          console.log(res.access_token);
          if (res.access_token) {

            // localStorage.setItem('token',res.access_token);
            // localStorage.setItem('name',res.user.name);
            // localStorage.setItem('email',res.user.email);
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('name', res.user.name);
            sessionStorage.setItem('email', res.user.email);
            this.router.navigate(['/']);
          }
          this.loginform.reset()
        },
        error: (err) => {
          alert("this is not valide data")
        }
      });

    } else {
      this.checkform = false;
    }
  }

}
