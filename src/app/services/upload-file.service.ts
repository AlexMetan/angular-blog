import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http:HttpClient) { }
  uploadFile(file){
    return this.http.post(`http://rest-service.madbunny.pl/uploads/uploadImg.php`,file);
  }
}
