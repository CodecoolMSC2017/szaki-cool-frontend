import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adspreview',
  templateUrl: './adspreview.component.html',
  styleUrls: ['./adspreview.component.css']
})
export class AdspreviewComponent implements OnInit {

  @Input() work;
  imglink;

  constructor() { }

  ngOnInit() {
    console.log(this.work)
    this.imglink = "api/pics/" + this.work.links[0];  
  }

}
