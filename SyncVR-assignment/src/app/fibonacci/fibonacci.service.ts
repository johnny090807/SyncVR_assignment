import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import 'firebase/app';

export interface Fibonacci {
  email: string,
  number: number,
  result: number,
  date: Date
}

@Injectable({
  providedIn: 'root'
})

export class FibonacciService {
  allFibonacciRequests: Array<any> = [];
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    ){}
  
   

    getFibonacciById(id:string):any{
        return this.afs.collection('fibonacci').doc(id).get().toPromise().then(data => {
            return data.data()
        })

    }

    addFibonacci(Fibonacci:any):any{
        return this.afs.collection('fibonacci').add(Fibonacci)
    }

    getFibonaccisFromFirebase():any{
        return this.afs.collection('fibonacci', ref => ref.orderBy('date')).get().toPromise().then((data:any) =>{
            return data
        }, (error:any) => {
            console.error(error)
        })
    }
}
