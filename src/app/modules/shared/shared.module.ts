import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatetimePipe} from "../../_pipe/datetime.pipe";
import {SelectTemplateComponent} from './select-template/select-template.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {RouterModule} from "@angular/router";

const COMPONENT = [
  DatetimePipe,
  SelectTemplateComponent
]

const MODULE = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  NgSelectModule,
]

@NgModule({
  declarations: [
    ...COMPONENT,
    SelectTemplateComponent,
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
