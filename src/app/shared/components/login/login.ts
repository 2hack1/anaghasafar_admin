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
      pass: ['', [Validators.required]],
      role: ['',[Validators.required]]

    })
  }
  ngOnInit(): void {
    this.auth.checkAuthAndRedirect();

  }

  //  logindata:any;
  onlogin() {
    if (this.loginform.valid) {
       this.service.role = this.loginform.value.role;
      const logindata = new FormData();
      logindata.append("password", this.loginform.value.pass);
      logindata.append("email", this.loginform.value.email);
      if( this.loginform.value.role === 'admin') {
         logindata.append("role", this.loginform.value.role); 
          this.service.loginAdmin(logindata).subscribe({
        next: (res: any) => {
          console.log(res.access_token);
          if (res.access_token) {
         console.log("login success",res);
  
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('name', res.user.name);
            sessionStorage.setItem('email', res.user.email);
            sessionStorage.setItem('role',res.user.role);
            // check again when hotel login
           
            this.router.navigate(['/']);
          }
          this.loginform.reset()
        },
        error: (err) => {
          alert("this is not valide data")
        }
      });
            //  api for vendor login

      }else{
         logindata.append("role", this.loginform.value.role);
        sessionStorage.setItem('token','121');
          sessionStorage.setItem('role','hotel_vendor');
             this.router.navigate(['/']);
      //  logindata.append("role", this.loginform.value.role); 
      // this.service.loginAdmin(logindata).subscribe({

      //   next: (res: any) => {
      //     console.log(res.access_token);
      //     if (res.access_token) {
      //    console.log("login success",res);
  
      //       sessionStorage.setItem('token', res.access_token);
      //       sessionStorage.setItem('name', res.user.name);
      //       sessionStorage.setItem('email', res.user.email);
      //       sessionStorage.setItem('role',res.user.role);
      //       // check again when hotel login
      //       this.service.role = res.user.role;
      //       this.router.navigate(['/']);
      //     }
      //     this.loginform.reset()
      //   },
      //   error: (err) => {
      //     alert("this is not valide data")
      //   }
      // });
    
    }

      logindata.append("role", this.loginform.value.role);

      // this.service.loginAdmin(logindata).subscribe({


      //   next: (res: any) => {
      //     console.log(res.access_token);
      //     if (res.access_token) {
      //    console.log("login success",res);
  
      //       sessionStorage.setItem('token', res.access_token);
      //       sessionStorage.setItem('name', res.user.name);
      //       sessionStorage.setItem('email', res.user.email);
      //       sessionStorage.setItem('role',res.user.role);
      //       // check again when hotel login
      //       this.service.role = res.user.role;
      //       this.router.navigate(['/']);
      //     }
      //     this.loginform.reset()
      //   },
      //   error: (err) => {
      //     alert("this is not valide data")
      //   }
      // });

    } else {
      this.checkform = false;
    }
  }

}
