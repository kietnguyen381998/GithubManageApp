import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatetimePipe} from "../../_pipe/datetime.pipe";
import {SelectTemplateComponent} from './select-template/select-template.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule} from "@angular/router";
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MatTooltipModule} from "@angular/material/tooltip";

const COMPONENT = [
  DatetimePipe,
  SelectTemplateComponent,
  HeaderComponent,
  SidebarComponent,
]

const MODULE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgSelectModule,
  MatSliderModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule
]

@NgModule({
  declarations: [
    ...COMPONENT,
  ],
  imports: [
    ...MODULE
  ],
  exports: [
    ...COMPONENT,
    ...MODULE,
  ],
})
export class SharedModule {
}
