import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.userState != null){
      this.router.navigate(['/fibonacci'])
    }
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
    })
  }
  LoginViaGoogle(){
    this.authService.GoogleAuth().then(data=>{
      if(this.authService.userState != null){
        this.router.navigate(['/login'])
      }
    }), (error:any) => {
      alert("Something went wrong")
    };
  }
  Login(){
    this.authService.SignUp(this.loginForm.value.email, this.loginForm.value.password).then(data =>{
      this.router.navigate(['/register']);
    }, error => {
      alert("Something went wrong " + error.message)
      return
    })

  }
}
