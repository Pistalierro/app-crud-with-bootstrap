import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerInterface} from '../types/customer.interface';
import {catchError, map, Observable, of} from 'rxjs';
import {RequestCustomerInterface} from '../types/requestCustomer.interface';

const url = 'https://crud-with-bootstrap-21290-default-rtdb.europe-west1.firebasedatabase.app/customers';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers!: CustomerInterface[];

  constructor(private http: HttpClient) {
  }

  createData(customer: CustomerInterface): Observable<CustomerInterface> {
    return this.http.post<RequestCustomerInterface>(`${url}.json`, customer, httpOptions).pipe(
      map((res: RequestCustomerInterface) => ({...{key: res.name, ...customer}})),
      catchError(this.errorHandler<RequestCustomerInterface>('POST'))
    );
  }

  getData() {
  }

  updateData() {
  }

  deleteData() {
  }

  private errorHandler<T>(operation: string, res?: T): any {
    return ((error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(res as T);
    });
  }
}
