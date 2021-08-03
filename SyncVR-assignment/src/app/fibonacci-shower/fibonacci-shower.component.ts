import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-fibonacci-shower',
  templateUrl: './fibonacci-shower.component.html',
  styleUrls: ['./fibonacci-shower.component.scss']
})
export class FibonacciShowerComponent implements OnInit {

  letters = '0123456789ABCDEF';

  color = '#';

  fibonacciNumbers:any[] = []

  speed:any = 2;

  index = 1;

  subscription: Subscription

  interval:any

  constructor() { }

  ngOnInit(): void {
    this.interval = setInterval(() => this.getNumber(), this.speed * 1000);
  }
  
  setSpeed(value:any){
    clearInterval(this.interval)
    this.speed = value
    // setInterval(() => this.getNumber(), this.speed * 1000);
    this.interval = setInterval(() => this.getNumber(), this.speed * 1000);
  }

  getNumber(){
    this.fibonacciNumbers.push({
      result: this.fibonacci(this.index),
      color: this.getRandomColor()
    })
    this.index += 1
  }

  getRandomColor() {
    this.color = "#";
    for (var i = 0; i < 6; i++) {

      this.color += this.letters[Math.floor(Math.random() * 16)];
    }
    return this.color
  }
  
  fibonacci(number:any):any{
    if (number == 1){
      return 0
    }
    let x = 0
    let y = 1
    let result = 1
    let n = number
    while(n > 2){
      result = x + y
      x = y
      y = result
      n -= 1
    }
    return result
  }

}
