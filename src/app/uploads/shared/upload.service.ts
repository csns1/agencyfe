import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs/internal/Observable';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  downloadURL: Observable<string>;
  downloadUrls:Observable<string>[];
  constructor(private storage: AngularFireStorage,private toastr:ToastrService) { }
  uploadFile(listFiles): Observable<string>[] {
    listFiles.forEach(image=> {
      if (image.file.type.split('/')[0] !== 'image') {
        this.toastr.error("Only images allowed!", "Check file type!");
        return;
      } else {
        const path = `packages/${new Date().getTime()}_${image.fileName}`;
        const fileRef = this.storage.ref(path);
        const task = this.storage.upload(path, image.file);
        task.snapshotChanges().pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadUrls.push(this.downloadURL);
            //get image url from firebase
          })
        ).subscribe();
      }
    });
    return this.downloadUrls;

  }
}
