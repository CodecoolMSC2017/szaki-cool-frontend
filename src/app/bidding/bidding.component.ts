import { Component, OnInit, Input } from '@angular/core';
import { ClockserviceService } from '../clockservice.service';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})

export class BiddingComponent implements OnInit {
  @Input()
  workFull;
  bidMoney;

  constructor(private clockservice: ClockserviceService) { }

  ngOnInit() {
    this.workFull = this.clockservice.workFull;
    console.log(this.workFull);
    this.bidMoney = this.clockservice.workFull.price - this.workFull.min_bidder_user_rate ;
  }

}
