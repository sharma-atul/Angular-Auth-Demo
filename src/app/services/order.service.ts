import { Http, RequestOptions, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
//This is client service that calls to an end-point.
// The end point is protected expecting token.
// Incumbent on client to send this. 

export class OrderService {

  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  getOrders() {

    // let token = localStorage.getItem('token');
    // let headers = new Headers();
    // headers.append('Authorization','Bearer '+ token);
    //
    // let options = new RequestOptions({ headers: headers
    //                                   });
    //return this.http.get('/api/orders', options)

    //this is same as above!
    return this.authHttp.get('/api/orders')
      .map(response => response.json());
  }
}
