import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './pages/login/login.component';
import {ContentComponent} from './pages/content/content.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginModule} from './pages/login/login.module';
import {AppRoutingModule} from './router/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
