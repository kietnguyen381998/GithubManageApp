import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(str: string) {
    const date = new Date(str);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
}
