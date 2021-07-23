import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(birthday: number): number {
    return new Date().getFullYear() - birthday;
  }
}
