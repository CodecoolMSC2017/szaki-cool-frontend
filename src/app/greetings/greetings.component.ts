import { Component, OnInit } from '@angular/core';
import { GreetingsService } from '../greetings.service';

@Component({
  selector: 'app-greetings',
  templateUrl: './greetings.component.html',
  styleUrls: ['./greetings.component.css']
})
export class GreetingsComponent implements OnInit {

  newGreeting = {}
  greetings = []

  constructor(private greetingsService : GreetingsService) {
  }

  ngOnInit() {
    let observable = this.greetingsService.getGreetings();
    observable.subscribe(response => {
      this.greetings = response
    });
  }

  addNewGreeting() {
    this.greetingsService.addNewGreeting(this.newGreeting).subscribe(response => {
      console.log(response);
      this.greetings.push(response);
      this.newGreeting = {}
    });
  }

  deleteGreeting(greeting) {
    this.greetingsService.deleteGreeting(greeting.id).subscribe(response => {
      let idx = this.greetings.indexOf(greeting);
      this.greetings.splice(idx, 1);
    });
  }
}
