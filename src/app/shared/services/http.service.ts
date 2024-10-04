import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CustomerInterface} from '../types/customer.interface';
import {catchError, map, Observable, of} from 'rxjs';
import {RequestCustomerInterface} from '../types/requestCustomer.interface';
import {ResponseCustomerInterface} from '../types/responseCustomer.interface';

const url = 'https://crud-with-bootstrap-21290-default-rtdb.europe-west1.firebasedatabase.app';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  customers: CustomerInterface[] = [];

  constructor(private http: HttpClient) {
  }

  createData(customer: CustomerInterface): Observable<CustomerInterface> {
    return this.http.post<RequestCustomerInterface>(`${url}/customers.json`, customer, httpOptions).pipe(
      map((res: RequestCustomerInterface) => this.customers.push({...{key: res.name, ...customer}})),
      catchError(this.errorHandler<RequestCustomerInterface>('POST'))
    );
  }

  getData(): Observable<CustomerInterface[]> {
    return this.http.get<ResponseCustomerInterface>(`${url}/customers.json`).pipe(
      map(res => {
        Object.keys(res).forEach(key => this.customers.push({key, ...res[key]}));
        return this.customers;
      }),
      catchError(this.errorHandler<ResponseCustomerInterface>('GET'))
    );
  }

  updateData(customer: CustomerInterface, i: number): Observable<CustomerInterface> {
    const {key, ...data} = customer;

    return this.http.put<CustomerInterface>(`${url}/customers/${key}.json`, data, httpOptions).pipe(
      map(() => this.customers[i] = customer),
      catchError(this.errorHandler<CustomerInterface>('PUT'))
    );
  }

  deleteData(customer: CustomerInterface, i: number): Observable<CustomerInterface[]> {
    return this.http.delete(`${url}/customers/${customer.key}.json`).pipe(
      // map(res => console.log(this.customers.splice(i, 1)))
      map(() => this.customers.splice(i, 1)),
      catchError(this.errorHandler('DELETE'))
    );
  }

  private errorHandler<T>(operation: string, res?: T): any {
    return ((error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(res as T);
    });
  }
}
