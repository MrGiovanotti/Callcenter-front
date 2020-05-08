import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changeBoolean'
})
export class ChangeBooleanPipe implements PipeTransform {

  transform(value: boolean, args: Array<string>): any {
    if (value) {
      return args[0];
    } else {
      return args[1];
    }
  }

}
