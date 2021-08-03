import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import firebase from 'firebase/app';
import 'firebase/app';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userState: any;
  allUsers: Array<any> = [];
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    ){
      this.afAuth.authState.subscribe((user:any) => {
        if (user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user')|| '{}');
        } else {
          localStorage.setItem('user', '{}');
          JSON.parse(localStorage.getItem('user')|| '{}');
        }
      })
      
    }
  
    SignIn(email:any, password:any) {
      return this.afAuth.signInWithEmailAndPassword(email, password)
        .then((result: any) => {
          this.ngZone.run(() => {
            this.router.navigate(['/fibonacci']);
          });
          // if(!result.user.emailVerified){
          //   alert("You need to verify your email first.")
          // }
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    getAllUsers(){
      return this.afs.collection('users').get().toPromise().then(data => {
        data.forEach(user => {
          this.allUsers.push(user.data())
        });
      })
    }
  
    SignUp(email:any, password:any) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

    SendVerificationMail() {
        return this.afAuth.currentUser.then((u:any) => u.sendEmailVerification())
        .then(() => {
          this.afAuth.currentUser.then((u:any) => alert(u.email + " has been added!"))
        })
    }    
  
    ForgotPassword(passwordResetEmail:any) {
      return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    isLoggedInWithoutVerified(): boolean {
      const user = JSON.parse(localStorage.getItem('user')|| '{}');
      return (user !== null) ? true : false;
    }

    isLoggedInWithverified(): boolean {
      const user = JSON.parse(localStorage.getItem('user')|| '{}');
      return (user !== null && user.emailVerified !== false) ? true : false;
    }

    GoogleAuth() {
      return this.AuthLogin(new firebase.auth.GoogleAuthProvider);
    }
    FacebookAuth() {
      return this.AuthLogin(new firebase.auth.FacebookAuthProvider);
    }
  
    AuthLogin(provider:any) {
      return this.afAuth.signInWithPopup(provider)
      .then((result) => {
         this.ngZone.run((res) => {
            console.log(res)
          })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
    }
  
    SetUserData(user:any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      const userState: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified
      }
      return userRef.set(userState, {
        merge: true
      })
    }
   
    updateUser(user:any){
      this.SetUserData(user)
      localStorage.setItem('user', JSON.stringify(this.userState));
      return this.afs.doc(`users/${this.userState.uid}`).update(user)
    }

    SignOut() {
      this.userState == null;
      return this.afAuth.signOut().then(() => {
        localStorage.setItem('user', '{}');
        location.reload();
      })
    }  

}
