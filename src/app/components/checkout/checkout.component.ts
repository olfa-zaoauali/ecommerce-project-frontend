import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { Customer } from 'src/app/common/customer';
import { Address } from 'src/app/common/address';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent  implements OnInit {

  checkoutFormGroup!: FormGroup; 

  totalPrice: number= 0;
  totalQuantity: number=0;

  creditCardYear: number[]= [];
  creditCardMonth: number[]= [];


  countries: Country[]=[];

  shippingAddressStates: State[]=[]; 
  billingAddressStates: State[]=[]; 




  constructor(private formBuilder: FormBuilder, private lu2ShopFormService : Luv2ShopFormService, private cartService : CartService, private checkoutService: CheckoutService, private router: Router){

  }
  ngOnInit(): void {
    this.reviewCartDetails(); 
    this.checkoutFormGroup= this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName:new FormControl('',
        [Validators.required, 
        Validators.minLength(2), 
        Luv2ShopValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhitespace]),
        email:new FormControl('',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Luv2ShopValidators.notOnlyWhitespace]),
      }),
      shippingAddress: this.formBuilder.group({
        street:new FormControl('',[Validators.required, Validators.minLength(2), 
                                  Luv2ShopValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required, Validators.minLength(2), 
                                  Luv2ShopValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required, Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhitespace]),
      }),
      billingAddress: this.formBuilder.group({
        street:new FormControl('',[Validators.required, Validators.minLength(2), 
        Luv2ShopValidators.notOnlyWhitespace]),
        city:new FormControl('',[Validators.required, Validators.minLength(2), 
        Luv2ShopValidators.notOnlyWhitespace]),
        state:new FormControl('',[Validators.required]),
        country:new FormControl('',[Validators.required]),
        zipCode:new FormControl('',[Validators.required, Validators.minLength(2), 
        Luv2ShopValidators.notOnlyWhitespace]),
      }),
      creditCard: this.formBuilder.group({
        cardType:new FormControl('',[Validators.required]),
        nameOnCard:new FormControl('',[Validators.required, Validators.minLength(2), 
        Luv2ShopValidators.notOnlyWhitespace]),
        cardNumber:new FormControl('',[Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode:new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}')]),
        expirationMonth:[''],
        expirationYear:['']

      }),
    });
    // populte credit card months

    const startMonth : number = new Date().getMonth()+1; 
    console.log("startMonth", startMonth);
    this.lu2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonth= data;
      }
    )
    // populate credit card years
    this.lu2ShopFormService.getCreditCardYear().subscribe(
      data => {
        console.log("Retrieved credit card Years: "+JSON.stringify(data));
        this.creditCardYear= data;
      }
    );
    //populate countries
    this.lu2ShopFormService.getCountries().subscribe(
      data => {
        console.log("Retrieved countries:"+ JSON.stringify(data));
        this.countries= data;
      }
    )
  }
  reviewCartDetails() {
    // subscribe to cartService. totalQuality
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity= totalQuantity
    );
    //  subscribe to cartservice totalPrice 
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice= totalPrice
    );
  }
  get firstName(){
    return this.checkoutFormGroup.get('customer.firstName')
  }
  get lastName(){
    return this.checkoutFormGroup.get('customer.lastName')
  }
  get email(){
    return this.checkoutFormGroup.get('customer.email')
  }

  get shippingAddressSreet(){
    return this.checkoutFormGroup.get('shippingAddress.street');
  }
  get shippingAddressCity(){
    return this.checkoutFormGroup.get('shippingAddress.city');
  }
  get shippingAddressState(){
    return this.checkoutFormGroup.get('shippingAddress.state');
  }
  get shippingAddressZipCode(){
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }
  get shippingAddressCountry(){
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get billingAddressSreet(){
    return this.checkoutFormGroup.get('billingAddress.street');
  }
  get billingAddressCity(){
    return this.checkoutFormGroup.get('billingAddress.city');
  }
  get billingAddressState(){
    return this.checkoutFormGroup.get('billingAddress.state');
  }
  get billingAddressZipCode(){
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }
  get billingAddressCountry(){
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get CreditCardType(){
    return this.checkoutFormGroup.get('creditCard.cardType');
  }
  get CreditCardNameOnCard(){
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }
  get CreditCardNumber(){
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }
  get CreditCardSecurityCode(){
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
  
  copyShippingAddressToBillingAddress(event: any) {
    if (event && event.target instanceof HTMLInputElement) {
      if (event.target.checked) {
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
        // bug fix for states 
        this.billingAddressStates = this.shippingAddressStates;
      } else {
        this.checkoutFormGroup.controls['billingAddress'].reset();
        // bug fix for states 
        this.billingAddressStates = [];

      }
    }
  }
  onSubmit(){
    console.log("Handling the submit button");
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return; 
    }

    // set up order
    let order = new Order(0,0); 
    order.totalPrice= this.totalPrice;
    order.totalQuantity= this.totalQuantity;
    // get cart items 
    const cartItems= this.cartService.cartItems; 

    // create orderItems from cartItems
    // - long way
    /*let orderItems : OrderItem[]= []; 
    for(let i=0; i< cartItems.length; i++){
      orderItems[i]= new OrderItem(cartItems[i]); 
    }
    //- short way 
    */
    let orderItems: OrderItem[]= cartItems.map(tempCartItem => new OrderItem("",0,0,"",tempCartItem)); 

    // set up purchase 
   
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer= this.checkoutFormGroup.controls['customer'].value;


    // populate purchase - shipping address
    purchase.shippingAddress= this.checkoutFormGroup.controls['shippingAddress'].value; 
    const shippingState: State= JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country= JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state= shippingState.name;
    purchase.shippingAddress.country= shippingCountry.name;
    // populate purchase - billing address
    purchase.billingAddress= this.checkoutFormGroup.controls['billingAddress'].value; 
    const billingState: State= JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country= JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state= billingState.name;
    purchase.billingAddress.country= billingCountry.name;


    // populate purchase - order amd orderItems
    purchase.order= order;
    purchase.orderItems= orderItems; 

    // call REST  API via the CheckoutService

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          console.log("response", response)
          alert(` Your order has been recieved.`)
          // rest cart
         this.restCart(); 
        },

        error: err => {
          alert(`there was an error: ${err.message}`);

        }
      }
    )
  }
  restCart() {
    // rest cart data *
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0); 
    // rest the form 
    this.checkoutFormGroup.reset();
    // navigate back to the products page 
    this.router.navigateByUrl("/products");
  }
  handleMonthsAndYears(){
    const creditCardFormGroup= this.checkoutFormGroup.get('creditCard');
    const currentYear: number= new Date().getFullYear();
    const selectedYear: number= Number(creditCardFormGroup?.value.expirationYear)
    // if the current year equals the selected year , then start with the current month 
    let startMonth: number;
    if(currentYear=== selectedYear){
      startMonth= new Date().getMonth() +1 ;
    }
    else{
      startMonth= 1;
    }
    this.lu2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: "+JSON.stringify(data));
        this.creditCardMonth= data;
      }
    )

  }
  getStates(formGroupName: string)
  {
    const formGroup= this.checkoutFormGroup.get(formGroupName);

    const countryCode= formGroup?.value.country.code;
    const countryName= formGroup?.value.country.name;
    console.log(` ${formGroupName} country code : ${countryCode}`);
    console.log(` ${formGroupName} country name : ${countryName}`);

    this.lu2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates= data; 
        }
        else{
          this.billingAddressStates= data; 
        }
        // select first item by default 
        formGroup?.get('state')?.setValue(data[0]);
      }

    );


  }

}
