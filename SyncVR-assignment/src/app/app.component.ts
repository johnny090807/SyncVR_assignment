import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'SyncVR-assignment';

  constructor(public authService: AuthService){}

  ngOnInit(){

  }

  logout(){
    console.log(this.authService.userState)
    this.authService.SignOut()
    console.log(this.authService.userState)
  }
}
