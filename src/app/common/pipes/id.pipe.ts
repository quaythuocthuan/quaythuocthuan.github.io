import { displayID } from 'src/app/utils';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id',
})
export class IDPipe implements PipeTransform {
  transform(value?: string): unknown {
    return `${displayID(value || '')}`;
  }
}
