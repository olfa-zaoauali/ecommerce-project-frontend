import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl= 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient: HttpClient ) { }

  placeOrder(purchase: Purchase): Observable<any>{
    console.log("object", this.httpClient.post<Purchase>(this.purchaseUrl, purchase) );
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase); 
  }
}
