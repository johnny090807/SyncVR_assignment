import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Fibonacci, FibonacciService } from './fibonacci.service';

@Component({
  selector: 'app-fibonacci',
  templateUrl: './fibonacci.component.html',
  styleUrls: ['./fibonacci.component.scss']
})
export class FibbonaciComponent implements OnInit {

  fibonacciFormGroup: FormGroup

  numberinput: any;

  ready = false;

  allFibonacciEntries: any[] = []

  fibonacciNumber: any;

  constructor(private fibo:FibonacciService,
              private auth:AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fibonacciFormGroup = this.fb.group({
      numberinput: new FormControl('', Validators.nullValidator)
    })
    this.fibo.getFibonaccisFromFirebase().then((data:any) =>{
      data.docs.forEach((fib:any) => {
        let entry:any = fib.data()
        let one:Fibonacci = {
          email: entry.email,
          number: entry.number,
          result: entry.result,
          date: entry.date
        }
        this.allFibonacciEntries.unshift(one)
      });
      this.ready = true;
    })
  }
  fibonacci():any{
    this.numberinput = this.fibonacciFormGroup.value.numberinput
    let number = this.numberinput
    if (this.numberinput < 1){
      return this.fibonacciNumber= 0
    }
    let x = 0
    let y = 1
    let result = 1
    let n = this.numberinput
    while(n > 2){
      result = x + y
      x = y
      y = result
      n -= 1
    }
    this.fibonacciNumber = result
    this.addFiboToDatabase(number, result)
  }
  addFiboToDatabase(number:any, result:any){
    let email = "";
    if (this.auth.userState == null){
      email = "Unknown"
    }else{
      email = this.auth.userState.email
    }
    let entry:Fibonacci = {
      email,
      number,
      result,
      date: new Date()
    }
    this.allFibonacciEntries.unshift(entry)
    this.fibo.addFibonacci(entry)
  }
}
