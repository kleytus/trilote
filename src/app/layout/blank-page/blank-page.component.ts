import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss']
})
export class BlankPageComponent implements OnInit {
    lat: number = -17.398063498163726;
  	lng: number = -66.21776876063586;
    
    constructor() {
    	
    }
    click(event){
    	this.lat = event.coords.lat;
    	this.lng = event.coords.lng;
    	console.log(event);
    }
    ngOnInit() {}
}
