import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';
import {combineLatest, Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {of} from 'rxjs';
import 'datatables.net';
import 'datatables.net-bs4';

// @ts-ignore
import {PackageGetDto, PackagePostDto} from '../../interfaces/PackageDtos';
import {TravelPackageService} from '../../services/travel-package.service';
import {DestinationGetDto} from '../../interfaces/DestinationDtos';
// @ts-ignore
import {DestinationPerPackageGetDto} from './/src/app/interfaces/DestinationPerPackagesDtos.ts';
import {DestinationService} from '../../services/destination-service.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
// @ts-ignore
import {DestinationPerPackagePostDto} from '../../interfaces/DestinationPerPackagesDtos';
import {PackageDatesDto, PackageDatesPostDto} from '../../interfaces/PackageDatesDto';

@Component({
  selector: 'app-travel-package-edit',
  templateUrl: './travel-package-edit.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./travel-package-edit.component.css']
})
export class TravelPackageEditComponent implements OnInit {
  dataTable: any;
  id: number;
  private sub: any;
  pleaseWait: boolean;
  uploads: any[];
  downloadURL: Observable<string>;
  downloadUrls: string[] = [];
  allPercentage: Observable<any>;
  toBeUpdated: PackageGetDto;
  form: PackagePostDto = {} as PackagePostDto;
  allDestinations: Observable<DestinationPerPackageGetDto>;
  images: string[];
  imgObs: Observable<string[]>;
  allDestination: DestinationGetDto[];
  newDestination: DestinationGetDto;
  @ViewChild('destinationModal') newDestinationPopup: TemplateRef<any>;
  @ViewChild('datesModal') datesModal: TemplateRef<any>;
  private nDPopup: BsModalRef;
  private dMPopup: BsModalRef;
  newDestinationNrNights: number;
  packageDatesObs: Observable<PackageDatesDto[]>;
  private allPackageDates: PackageDatesDto[];
  startDate: Date = new Date();
  arrivalDate: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'yyyy-MM-dd',
    defaultOpen: false,
    minDate: this.startDate,
    closeOnSelect: true
  }
  pricePerPerson: number;
  totalPersons: number;
  today: Date =new Date();

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private chRef: ChangeDetectorRef, private toastr: ToastrService, private storage: AngularFireStorage, private packageService: TravelPackageService, private destinationService: DestinationService) {
  }

  ngOnInit() {
    this.pleaseWait = false;
    this.destinationService.getAllDestinations().subscribe(data => {
      this.allDestination = data
      this.chRef.detectChanges();
      const table: any = $('#destTable');
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.initialiseToBeUpdated()
      this.initialisePackageDates()
    });

  }

  importImages(event) {
    this.toastr.info("Uploading Photo");
    this.pleaseWait = true;
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];
    for (const image of filelist) {
      if (image.type.split('/')[0] !== 'image') {
        this.toastr.error("Only images allowed!", "Check file type!");
        return;
      } else {
        const path = `packages/${new Date().getTime()}_${image.name}`;
        const fileRef = this.storage.ref(path);
        const task = this.storage.upload(path, image);
        const _percentage$ = task.percentageChanges();
        allPercentage.push(_percentage$);
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadURL.subscribe(data => {
              this.packageService.addPhotoToPackage(this.id, data).subscribe(
                dt => {
                  this.toastr.success("Photo Uploaded");
                  this.images.push(data);
                  this.imgObs = of<string[]>(this.images);
                  this.removePhoto("none");
                },
                error1 => {
                  this.toastr.error("Photo couldn't be downloaded.")
                }
              );


            });
          })
        ).subscribe();
      }
    }
    this.allPercentage = combineLatest(allPercentage)
      .pipe(
        map((percentages) => {
          let result = 0;
          for (const percentage of percentages) {
            result = result + percentage;
          }
          return result / percentages.length;
        }),
      );
  }

  addNewImageTab() {
    if (this.images.indexOf("none") == -1) {
      this.images.push("none");
      this.imgObs = of<string[]>(this.images);
    }
  }

  removePhoto(img) {
    let index = this.images.indexOf(img);
    if (index > -1) {
      if (img != "none") {
        this.packageService.removePhoto(this.id, img).subscribe(data => {
            this.images.splice(index, 1);
            this.imgObs = of<string[]>(this.images)
          },
          error => this.toastr.error("Photo couldn't be deleted"));
      } else {
        this.images.splice(index, 1);
        this.imgObs = of<string[]>(this.images)

      }
    }
  }

  onSubmit() {
    let packagePostDto = {} as PackagePostDto;
    packagePostDto.description = this.toBeUpdated.description;
    packagePostDto.name = this.toBeUpdated.name
    packagePostDto.id = this.id
    this.packageService.editPackageDetails(this.id, packagePostDto).subscribe(data => {
      this.toastr.success("Travel Package Details Updated");
    }, e => this.toastr.error("Travel Package Couldn't Be Updated"));
  }

  initialiseToBeUpdated() {
    this.packageService.getPackageById(this.id).subscribe(data => {
      this.toBeUpdated = data;
      this.images = this.toBeUpdated.images
      this.imgObs = of<string[]>(this.toBeUpdated.images);
      this.allDestinations = of(this.toBeUpdated.destinationList)
      this.chRef.detectChanges()
    }, error1 => this.toastr.error("An Error Has Happened"));
  }

  removeDestination(destination: DestinationPerPackageGetDto) {
    this.packageService.removeDestination(this.id, destination).subscribe(data => {
      this.initialiseToBeUpdated();
      this.toastr.success("Destination Removed")
    })

  }

  addDestination(destination: DestinationPerPackagePostDto) {
    this.packageService.addDestination(this.id, destination).subscribe(data => {
      this.initialiseToBeUpdated();
      this.toastr.success("Destination Added")
    })
  }

  showDestinationModal() {
    this.nDPopup = this.modalService.show(this.newDestinationPopup)
  }

  addNewDestination() {
    let destinationPerPackage: DestinationPerPackagePostDto = {} as DestinationPerPackagePostDto ;
    destinationPerPackage.destinationId = +this.newDestination;
    destinationPerPackage.numberOfNights = this.newDestinationNrNights;
    this.addDestination(destinationPerPackage);
    this.nDPopup.hide();
  }

  removePackageDate(dateId) {
    this.packageService.removePackageDate(this.id, dateId).subscribe(data => {
      this.initialisePackageDates()
      this.toastr.success("Date Deleted")
    })
  }

  getDate(startTime: number) {
    return new Date(startTime * 1000).toDateString()
  }

  private initialisePackageDates() {
    this.packageService.getPackageDates(this.id).subscribe(data => {
      this.allPackageDates = data;
      this.packageDatesObs = of(this.allPackageDates)
    })
  }

  showDatesModal() {
    this.dMPopup = this.modalService.show(this.datesModal)
  }

  addNewDate() {
    var packageDatePostDto: PackageDatesPostDto = {} as PackageDatesPostDto;
    packageDatePostDto.arrivalTime = new Date(this.startDate).toISOString()
    packageDatePostDto.startTime = new Date(this.startDate).toISOString()
    packageDatePostDto.pricePerPerson = this.pricePerPerson;
    packageDatePostDto.numberOfPersons = this.totalPersons
    this.packageService.addPackageDate(this.id, packageDatePostDto).subscribe(data => {
      this.toastr.success("Date Added");
      this.initialisePackageDates();
      this.dMPopup.hide();
    })
  }
}
