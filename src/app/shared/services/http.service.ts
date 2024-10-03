import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const url = 'https://crud-with-bootstrap-21290-default-rtdb.europe-west1.firebasedatabase.app/customers';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  createData() {
  }

  getData() {
  }

  updateData() {
  }

  deleteData() {
  }
}
