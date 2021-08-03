import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { FibbonaciComponent } from './fibonacci/fibonacci.component';
import { RegisterComponent } from './auth/register/register.component';
import { FibonacciService } from './fibonacci/fibonacci.service';

const appConfig = {
  apiKey: "AIzaSyCVT0cjIqGOiOMnanq8lsEHuVociEYKzQg",
  authDomain: "syncvr-assignment-76674.firebaseapp.com",
  databaseURL: "https://syncvr-assignment-76674-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "syncvr-assignment-76674",
  storageBucket: "syncvr-assignment-76674.appspot.com",
  messagingSenderId: "740049390212",
  appId: "1:740049390212:web:0746ac969d317e9fb910d1",
  measurementId: "G-ZMGBN6KH0H"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FibbonaciComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(appConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule, NgbModule
  ],
  providers: [AuthService,
              FibonacciService],
  bootstrap: [AppComponent]
})
export class AppModule { }
