import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id',
})
export class IdPipe implements PipeTransform {
  transform(id: number): string {
    return id.toString().padStart(16, '0');
  }
}
