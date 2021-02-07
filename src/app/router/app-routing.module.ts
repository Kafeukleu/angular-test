import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '../pages/login/login.component';
import {ContentComponent} from '../pages/content/content.component';
import {CONTENT_ROUTE} from './routes.const';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: CONTENT_ROUTE, component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
