import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-scraping',
  templateUrl: './scraping.component.html',
  styleUrls: ['./scraping.component.scss']
})
export class ScrapingComponent implements OnInit {

	items: Item[];
	constructor(private _dataService: DataService) { 
		/*this._dataService.getUsers()
	    .map(res => this.items = res);*/
	}

 	ngOnInit() {
  	}

}

interface Item {

id : number;
title : string;
url : string; 

}
