import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DestinationService} from '../../services/destination-service.service';
import {
  CityGetDto,
  CityPostDto,
  CountryDto,
  DestinationGetDto,
  DestinationPostDto
} from '../../interfaces/DestinationDtos';
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  countryConfig: any;
  cityConfig: any;
  destinationConfig: any;
  selectedCountry: any;
  selectedCiy: any;
  selectedDestination;
  countryList: CountryDto[];
  cities: CityGetDto[];
  destinationList: DestinationGetDto[];
  newCountryName: string;
  toAddNew: boolean;
  toAddNewCity: boolean;
  newCityName: string;
  toAddNewDestination: boolean;
  newDestinationName: string;
  newDestinationDescription: string;
  private settings = {};
  shteti = [];
  listaShteteve = [];
  listaQyteteve = [];
  qyteti = [];
  settingsQyteti = {};
  emri: any;
  pershkrimi: any;

  constructor(private destinationService: DestinationService,private router:Router, private chRef: ChangeDetectorRef, private toastr: ToastrService) {

  }

  ngOnInit() {
    this.initSelectDropdown();
    this.destinationService.getAllDestinations().subscribe(data => {
      this.destinationList = data;
      this.chRef.detectChanges();
      this.initDestinationConfig();
    });
    this.destinationService.getAllCities().subscribe(data => {
      this.cities = data;
      this.chRef.detectChanges();
      this.initCityConfig();
    });
    this.destinationService.getAllCountries().subscribe(data => {
      this.countryList = data;
      this.listaShteteve = data.map(d => this.mapCountriestoDList(d));
      this.chRef.detectChanges();
      this.initCountryConfig();
    });
  }

  private initCityConfig() {
    this.cityConfig = {
      displayKey: "description", //if objects array passed which key to be displayed defaults to description
      search: true,//true/false for the search functionlity defaults to false,
      height: 'auto',//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Select',// text to be displayed when no item is selected defaults to Select,
      customComparator: () => {
      },// a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 20,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more',// text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };
  }

  private initCountryConfig() {
    this.countryConfig = {
      displayKey: "description", //if objects array passed which key to be displayed defaults to description
      search: true,//true/false for the search functionlity defaults to false,
      height: 'auto',//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Select',// text to be displayed when no item is selected defaults to Select,
      customComparator: () => {
      },// a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 20,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more',// text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    };


  }

  private initDestinationConfig() {
    this.destinationConfig = {
      displayKey: "description", //if objects array passed which key to be displayed defaults to description
      search: true,//true/false for the search functionlity defaults to false,
      height: 'auto',//height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
      placeholder: 'Select',// text to be displayed when no item is selected defaults to Select,
      customComparator: () => {
      },// a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
      limitTo: 20,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
      moreText: 'more',// text to be displayed whenmore than one items are selected like Option 1 + 5 more
      noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
      searchPlaceholder: 'Search', // label thats displayed in search input,
      searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
  }

  getCountryOptions() {
    if (this.countryList.length == 0) return [""];
    return this.countryList.map(c => c.name);
  }

  getCityOptions() {
    if (this.cities.length == 0) return [""];
    return this.cities.map(c => c.name)
  }

  getDestinationOptions() {
    if (this.destinationList.length == 0) return [""];
    return this.destinationList.map(d => d.name)
  }

  removeCountry() {
    if (this.selectedCountry == null) this.toastr.error("Zgjidhni nje shtet qe do fshini!");
    this.destinationService.removeCountry(this.countryList.filter(c => c.name == this.selectedCountry).pop().id).subscribe(() => {
      this.toastr.success("Country removed")
      this.countryList = this.countryList.filter(c => c.name != this.selectedCountry)
    })
  }

  addCountry() {
    if (this.newCountryName == null || this.newCountryName.trim().length == 0) {
      this.toastr.error("Vendosni nje emer")
    } else if (this.countryList.filter(c => c.name.toLowerCase() == this.newCountryName).length > 0) {
      this.toastr.error("Ky Shtet egziston")
    } else {
      let countryPostDto: CountryDto = {} as CountryDto;
      countryPostDto.name = this.newCountryName;
      this.destinationService.addCountry(countryPostDto).subscribe(data => {
        this.countryList.push(data);
        this.toastr.success("Country Added");
      });
      this.toAddNew = false
    }
  }

  showNew() {
    this.toAddNew = true;
  }

  showNewCity() {
    this.toAddNewCity = true;
  }

  addCity() {
    if (this.selectedCountry == null) {
      this.toastr.error("Select a country");
    } else if (this.newCityName == null || this.newCityName.trim().length == 0) {
      this.toastr.error("Vendosni nje emer")
    } else if (this.cities.filter(c => c.name.toLowerCase() == this.newCityName.toLowerCase()).length > 0) {
      this.toastr.error("Ky Qytet egziston")
    } else {
      this.toAddNewCity = false;
      let cityPostDto: CityPostDto = {} as CityPostDto;
      cityPostDto.countryId = this.countryList.filter(cnt => cnt.name == this.selectedCountry).pop().id
      cityPostDto.name = this.newCityName;
      this.destinationService.addCity(cityPostDto).subscribe(data => {
        this.cities.push(data);
        this.toastr.success("City Added");
      })
    }
  }

  removeCity() {
    if (this.selectedCiy == null) this.toastr.error("Zgjidhni nje qytet qe do fshini!");
    this.destinationService.removeCity(this.cities.filter(ct => ct.name == this.selectedCiy).pop().id).subscribe(() => {
      this.toastr.success("City removed")
      this.cities = this.cities.filter(e => e.name != this.selectedCiy)
    })
  }


  addDestination() {
    if (this.selectedCiy == null) {
      this.toastr.error("Select a city");
    } else if (this.newDestinationName == null || this.newDestinationName.trim().length == 0) {
      this.toastr.error("Vendosni nje emer")
    } else if (this.newDestinationDescription == null || this.newDestinationDescription.trim().length == 0) {
      this.toastr.error("Vendosni nje emer")
    } else if (this.destinationList.filter(c => c.name.toLowerCase() == this.newDestinationName).length > 0) {
      this.toastr.error("Ky Destinacion egziston")
    } else {
      let destinationPost: DestinationPostDto = {} as DestinationPostDto;
      destinationPost.name = this.newDestinationName;
      destinationPost.description = this.newDestinationDescription;
      destinationPost.cityId = this.cities.filter(c => c.name == this.selectedCiy).pop().id
      this.destinationService.addDestination(destinationPost).subscribe(data => {
        this.destinationList.push(data)
        this.toastr.success("Destination added");
        this.toAddNewDestination = false;
      })
    }
  }

  showNewDestination() {
    this.toAddNewDestination = true;
  }

  removeDestination() {
    if (this.selectedDestination == null) this.toastr.error("Zgjidhni nje destinacion qe do fshini!");
    this.destinationService.removeDestination(this.destinationList.filter(d => d.name == this.selectedDestination).pop().id).subscribe(data => {
      this.toastr.success("Destination Removed");
      this.destinationList = this.destinationList.filter(data => data.name != this.selectedDestination)
    })
  }


  onItemSelect(item: any) {
    this.selectedCountry = item;
    this.updateQytetet();
  }

  private initSelectDropdown() {
    this.settings = {
      singleSelection: true,
      text: "Zgjidh Shtetin",
      noDataLabel: "Ky shtet nuk egziston",
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      addNewButtonText: 'Shtet I Ri'
    };

    this.settingsQyteti = {
      singleSelection: true,
      text: "Zgjidh Qytetin",
      noDataLabel: "Ky qytet nuk egziston",
      enableSearchFilter: true,
      addNewItemOnFilter: true,
      addNewButtonText: 'Qytet I Ri'
    }
  }

  shtoShtet(data: string) {
    let countryPostDto: CountryDto = {} as CountryDto;
    countryPostDto.name = data;
    this.destinationService.addCountry(countryPostDto).subscribe(data => {
      this.countryList.push(data);
      this.listaShteteve.push({id: data.id, itemName: data.name});
      this.shteti.push({id: data.id, itemName: data.name});
      this.selectedCountry = {id: data.id, itemName: data.name};
      this.updateQytetet();
      this.toastr.success("Shteti U Shtua");
    });
  }

  private mapCountriestoDList(d: CountryDto) {
    return {id: d.id, itemName: d.name}
  }


  onShtetDeselect() {
    this.selectedCountry = null;
    this.updateQytetet();
  }

  onQytetSelect($event: any) {
    this.selectedCiy = $event;
  }

  onQytetDeselect() {
    this.selectedCiy = null;
  }

  shtoQytet($event: any) {
    this.newCityName = $event;
    if (this.cities.filter(c => c.name.toLowerCase() == this.newCityName.toLowerCase()).length > 0) {
      this.toastr.error("Ky Qytet egziston")
    } else {
      let cityPostDto: CityPostDto = {} as CityPostDto;
      cityPostDto.countryId = this.selectedCountry.id;
      cityPostDto.name = this.newCityName;
      this.destinationService.addCity(cityPostDto).subscribe(data => {
        this.cities.push(data);
        this.listaQyteteve.push({id: data.id, itemName: data.name});
        this.qyteti.push({id: data.id, itemName: data.name});
        this.toastr.success("City Added");
      })
    }
  }

  private updateQytetet() {
    this.listaQyteteve = [];
    if (this.selectedCountry) {
      this.listaQyteteve = this.cities.filter(city => city.country.id == this.selectedCountry.id).map(city => this.mapCityToList(city));
    }
  }

  private mapCityToList(city: CityGetDto) {
    return {id: city.id, itemName: city.name};
  }

  shtoDestinacion() {
    if (this.qyteti.length == 0 || this.shteti.length == 0) {
      this.toastr.info("Zgjidhni shtetin dhe qytetin");
    } else if (!this.emri) {
      this.toastr.info("Vendosni nje emer")
    } else if (!this.pershkrimi) {
      this.toastr.info("Vendosni nje emer")
    }  else {
      let destinationPost: DestinationPostDto = {} as DestinationPostDto;
      destinationPost.name = this.emri;
      destinationPost.description = this.pershkrimi;
      destinationPost.cityId = this.qyteti[0].id;
      this.destinationService.addDestination(destinationPost).subscribe(data => {
        this.destinationList.push(data);
        this.toastr.success("Destination added");
        this.router.navigate(['travel-packages'])
        this.toAddNewDestination = false;
      })
    }
  }
}
