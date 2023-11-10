import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {DatetimePipe} from "../../_pipe/datetime.pipe";

const COMPONENT = [
  DatetimePipe
]

const MODULE = [
  CommonModule,
  FormsModule
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
