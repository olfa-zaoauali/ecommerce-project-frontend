import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductIstComponent } from './components/product-ist/product-ist.component';
import {HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthGuard} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';

const oktaConfig= myAppConfig.oidc;
const oktaAuth= new OktaAuth(oktaConfig); 

function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector){
  // use inject to access any service available within your   application 
  const router= injector.get(Router)
  // Redirect the user to your custom login page 
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard],
                     data: {onAuthRequired: sendToLoginPage}
   },
  { path: 'login/callback', component: OktaCallbackComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'checkout', component: CheckoutComponent  },
  { path: 'cart-details', component: CartDetailsComponent  },
  { path: 'products/:id', component: ProductDetailsComponent  },
  { path: 'search/:keyword', component: ProductIstComponent },
  { path: 'category/:id', component: ProductIstComponent },
  { path: 'category', component: ProductIstComponent },
  { path: '', redirectTo: '/category', pathMatch: 'full' },
  { path: '**', redirectTo: '/category', pathMatch: 'full' }

];
@NgModule({
  declarations: [
    AppComponent,
    ProductIstComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent]
})
export class AppModule { }
