import { Component, OnInit } from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {finalize, map, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {
  uploads: any[];
  downloadURL: Observable<string>;
  downloadUrls:string[]=[];
  allPercentage: Observable<any>;
  pleaseWait: boolean;


  constructor(private toastr:ToastrService,private storage:AngularFireStorage) { }

  ngOnInit() {
    this.pleaseWait=false;
  }

  importImages(event) {
    this.pleaseWait=true;
    this.uploads = [];
    const filelist = event.target.files;
    const allPercentage: Observable<number>[] = [];
    for (const image of filelist){
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
            this.downloadURL.subscribe(data=>this.downloadUrls.push(data));
            //get image url from firebase
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
        tap(console.log)
      );
  }

}
