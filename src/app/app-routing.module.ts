import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from 'src/app/app.component';
import {ApplyLeaveFormComponent} from 'src/app/apply-leave-form/apply-leave-form.component';
import {ApproveLeaveFormComponent} from 'src/app/approve-leave-form/approve-leave-form.component';
import {DynamicFormComponent} from 'src/app/dynamic-form/dynamic-form.component';

const routes: Routes = [
  // {path: 'home', component: AppComponent},
  { path: 'apply-leave-form', component: ApplyLeaveFormComponent },
  { path: 'approve-leave-form', component: ApproveLeaveFormComponent },
  { path: 'dynamic-form', component: DynamicFormComponent },
  { path: '', redirectTo: './', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
