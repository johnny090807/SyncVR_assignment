import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required]),
    })
  }
  LoginViaGoogle(){
    this.authService.GoogleAuth().then(data=>{
    }), (error:any) => {
      alert("Something went wrong")
    };
  }
  Login(){
    this.authService.SignIn(this.loginForm.value.email, this.loginForm.value.password).then(data =>{
    }, error => {
      alert("Something went wrong " + error.message)
      return
    })

  }
}
