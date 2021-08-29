import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: number): unknown {
    return new Date().getFullYear() - value;
  }
}
