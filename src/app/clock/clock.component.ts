import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClockserviceService } from '../clockservice.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit, OnDestroy {
  @Input()
  workFull;

  bidMoney;
  timer;
  days;
  hours;
  minutes;
  seconds;
  compareDates;
  endMessage = ' ';

  constructor(private service: ClockserviceService, private http: HttpClient) { }

  ngOnInit() {
    this.workFull = this.service.workFull;
    this.processDueDate(this.workFull.due_date);
    console.log(this.workFull);
    this.compareDates = this.processDueDate(this.workFull.due_date);
    this.timer = setInterval(() => this.timeRemaining(this.compareDates), 1000);
    this.bidMoney = this.service.workFull.price - this.workFull.min_bidder_user_rate ;

  }

  processDueDate(dueDate) {
    return new Date(dueDate);
  }

  timeRemaining(dueDate){
    let dateEntered = dueDate;
    let now = new Date();
    let difference = dateEntered.getTime() - now.getTime();

    if(difference <= 0) {
      this.endMessage = 'Sorry, this auction is over...';
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      clearInterval(this.timer);
    }
    else {
      let currentSeconds = Math.floor(difference / 1000);
      let currentMinutes = Math.floor(currentSeconds / 60);
      let currentHours = Math.floor(currentMinutes / 60);
      let currentDays = Math.floor(currentHours / 24);

      currentHours %= 24;
      currentMinutes %= 60;
      currentSeconds %= 60;

      this.days = currentDays;
      this.hours = currentHours;
      this.minutes = currentMinutes;
      this.seconds = currentSeconds;
    }
  }

  ngOnDestroy() {
  }

  getUserId(){
    return JSON.parse(sessionStorage.getItem("user")).id;
  }


  onBidClick(){
    console.log("LLLLLLLLLLLL  BID CLICKED");
    this.http.post("api/bid",
      {workId: this.workFull.id, price: this.bidMoney, userId: this.getUserId()}).subscribe((newPrice) =>
        {this.workFull.price = newPrice; console.log(this.workFull)});

  }


  onBuyClick(){
    console.log("KKKKKKKKKKKK   BUY CLICKED");
    this.http.post("api/bid", {workId: this.workFull.id, price: this.workFull.price, userId: this.getUserId()}).subscribe(console.log);

    }
  }



