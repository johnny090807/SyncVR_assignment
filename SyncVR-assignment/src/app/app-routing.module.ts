import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FibonacciShowerComponent } from './fibonacci-shower/fibonacci-shower.component';
import { FibbonaciComponent } from './fibonacci/fibonacci.component';

const routes: Routes = [
  {path: 'fibonacci', component: FibbonaciComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'fibofun', component: FibonacciShowerComponent},
  {path: '**', component: FibbonaciComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
