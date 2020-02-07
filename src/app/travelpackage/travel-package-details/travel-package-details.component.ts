import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { MakePaymentComponent } from 'src/app/make-payment/make-payment.component';
// @ts-ignore
import {PackageGetDto} from '../../interfaces/PackageDtos';
import {TravelPackageService} from '../../services/travel-package.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {CustomerDto} from '../../interfaces/customerDto';
import {Toast, ToastrService} from 'ngx-toastr';
import {PackageDatesDto} from '../../interfaces/PackageDatesDto';
import {DataServiceService} from '../../services/data-service.service';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'travel-package-details',
  templateUrl: './travel-package-details.component.html',
  styleUrls: ['./travel-package-details.component.css']
})
export class TravelPackageDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  radioModel= null;
  travelPackageDetail:PackageGetDto
  priceRange: string;
  buy=false;
  private modal:BsModalRef;
  logged:boolean
  constructor(private route: ActivatedRoute,private tokenStorageService:TokenStorageService,private router:Router,private dataService:DataServiceService,private toastr:ToastrService,private modalService: BsModalService,private travelPackageService:TravelPackageService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.travelPackageService.getPackageById(this.id).subscribe(data=>{
        this.travelPackageDetail=data;
        this.priceRange=this.getPriceRange();
      })
      if(this.tokenStorageService.getUsername()!=null)this.logged=true
    });

    }

  Buy(): void {
    this.buy = !this.buy;
  }

  getActiveClass(i: number) {
    if(i==0)return "active"
    return ""
  }

  private getPriceRange() {
    let prices = this.travelPackageDetail.packageDates.map(e => e.pricePerPerson);
    let min=Math.min.apply(Math,prices);
    let max=Math.max.apply(Math,prices);
    if(max==min)return "$"+max;
    return '$'+min+'-'+max;
  }

  getDateFromTime(arrivalTime: string) {
    let formatedDate=this.formatDate(new Date(arrivalTime));
    return formatedDate
  }
  formatDate(date) {
    const monthNames = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }



  fieldArray: Array<CustomerDto> = [];
  newAttribute: any = {};

  firstField = true;
  firstFieldName = 'First Item name';

  addFieldValue(index) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }


  showPopup(tempateRef: TemplateRef<any>) {
    this.fieldArray=[];
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
    if(this.radioModel==null){
      this.toastr.error("Zgjidhni nje Date");
      return;
    }
    this.modal=this.modalService.show(tempateRef);

  }

  openPayment() {
    var arr=this.fieldArray.filter(e=>e.lastName!=null||e.age!=null||e.firstName!=null);
    arr.forEach(e=>{

      if(e.firstName==null||e.firstName.trim().length==0){this.toastr.error("Vendosni Emrin");return;}
      else  if(e.lastName==null||e.lastName.trim().length==0){this.toastr.error("Vendosni Mbiemrin");return;}
      else if(e.age==null){this.toastr.error("Vendosni Moshen");return;}

    });
    if(arr.length==0){this.toastr.error("Vendosni te pakten nje person.");return;}

    this.fieldArray=arr;
    this.dataService.customers=arr;
    this.dataService.packageDateR=this.travelPackageDetail.packageDates.filter(e=>e.id==this.radioModel)[0];
    this.modal.hide();
    this.router.navigate(['/payment'])
  }

  changePrice() {
    let packageDate =  this.travelPackageDetail.packageDates.filter(e=>e.id==this.radioModel)[0];
    this.priceRange='$'+packageDate.pricePerPerson
  }
}
