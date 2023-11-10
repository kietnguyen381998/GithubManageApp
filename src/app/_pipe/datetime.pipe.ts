import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(str: string) {
    if (!str) {
      return '';
    }
    const datePipe = new DatePipe('en-US', 'UTC');
    const formattedDate = datePipe.transform(str, 'MMM d, y HH:mm:ss');
    return formattedDate || '';
  }
}
