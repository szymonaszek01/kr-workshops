import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue',
  standalone: true,
})
export class DefaultValuePipe implements PipeTransform {
  transform(value: any, replacement: string = 'N/A') {
    return value ? value : replacement;
  }
}
