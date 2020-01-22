import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplyLeaveFormComponent } from './apply-leave-form/apply-leave-form.component';
import { ApproveLeaveFormComponent } from './approve-leave-form/approve-leave-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FlowableIframeComponent } from './flowable-iframe/flowable-iframe.component';

@NgModule({
  declarations: [
    AppComponent,
    ApplyLeaveFormComponent,
    ApproveLeaveFormComponent,
    DynamicFormComponent,
    FlowableIframeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
