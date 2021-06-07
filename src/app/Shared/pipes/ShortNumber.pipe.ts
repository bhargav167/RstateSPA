import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ShortNumber'
})
export class ShortNumberPipe implements PipeTransform {

  transform(number: number, args?: any): any {
    let num=parseInt(number.toString().replace(/,/g, ''));
    if (isNaN(num)) return null; // will only work value is a number
    if (num === null) return null;
    if (num === 0) return null;
    let abs = Math.abs(num);
    const rounder = Math.pow(10, 2);
    const isNegative = num < 0; // will also work for Negetive numbers
    let key = '';

    const powers = [
      { key: 'Cr', value: Math.pow(10, 7) },
      { key: ' Lacs', value: Math.pow(10, 5) },
      { key: 'K',  value: 1000 }
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = Number(reduced);
        key = powers[i].key;
        break;
      }
    }
    return (isNegative ? '-' : '') + abs + key;
  }
}
