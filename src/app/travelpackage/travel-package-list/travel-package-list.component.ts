import {ChangeDetectorRef, Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {AuthService} from '../../auth/auth.service';
import * as $ from 'jquery';
import {User} from '../../interfaces/User';
// @ts-ignore
import {PackageGetDto, PackagePostDto} from '../../interfaces/PackageDtos';
import {TravelPackageService} from '../../services/travel-package.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-travel-package-list',
  templateUrl: './travel-package-list.component.html',
  styleUrls: ['./travel-package-list.component.css']
})
export class TravelPackageListComponent implements OnInit {
  dataTable: any;
  modalRef: BsModalRef;
  createPackageModalRef:BsModalRef;
  packages:PackageGetDto[];
  toBeDeleted:PackageGetDto
  newPackage: PackagePostDto={}as PackagePostDto;
  constructor(private toastr: ToastrService,private travelPackageService:TravelPackageService,private modalService: BsModalService,private tokenService:TokenStorageService, private chRef: ChangeDetectorRef,private authService: AuthService,private router:Router) { }

  ngOnInit() {
    this.travelPackageService.getPackageList().subscribe(value =>{
      this.packages=value;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
    });

  }
  delete(packageGetDto: PackageGetDto,template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.toBeDeleted=packageGetDto;
  }
  confirmDelete(){
    this.travelPackageService.deletePackage(this.toBeDeleted.id).subscribe(obs=>{
        this.modalRef.hide();
        this.packages= this.packages.filter(value => value.id!=this.toBeDeleted.id);
        this.toastr.success("Travel Package Deleted","Success");
      },
      error=>{
        this.toastr.error(error.message,"Error");
      })
  }
  updatePackage(travelPackage:PackageGetDto){
    this.router.navigate(['/travel-package-edit/'+travelPackage.id]);
  }

  showNewPackagePopup(template: TemplateRef<any>) {
    this.createPackageModalRef =this.modalService.show(template)
  }

  createNewPackage() {
    this.travelPackageService.createTravelPackage(this.newPackage).subscribe(data=>{
      this.createPackageModalRef.hide();
      this.packages.push(data)
    })
  }
}
