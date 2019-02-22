import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  config: any;
  selected:string;
  countryList:string[]
  constructor() {

  }

  ngOnInit() {
    this.countryList=['AL','KS']
    this.initConfig()
  }

  private initConfig() {
    this.config = {
      displayKey:"description", //if objects array passed which key to be displayed defaults to description
      search:true ,//true/false for the search functionlity defaults to false,
      height: 'auto' ,//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder:'Select' ,// text to be displayed when no item is selected defaults to Select,
      customComparator: ()=>{} ,// a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: this.countryList.length ,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more' ,// text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder:'Search', // label thats displayed in search input,
      searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }
}
