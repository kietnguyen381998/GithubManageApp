import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  convertMatDateToYYYYMMDD(date: any) {
    const d = new Date(date);
    return [this.convertToString(d.getFullYear()), this.convertToString(d.getMonth() + 1), this.convertToString(d.getDate())].join('-');
  }

  convertToString(n: any): any {
    return n > 9 ? '' + n.toString() : '0' + n.toString();
  }
}
