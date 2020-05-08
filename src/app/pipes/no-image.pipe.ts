import { Pipe, PipeTransform } from '@angular/core';
import { ConstantsUtils } from '../utils/constants.utils';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(imagePath: string): string {
    if (imagePath === null) {
      return 'assets/img/noimage.png';
    }
    return ConstantsUtils.BACKEND_URL.concat('/user/image/').concat(imagePath);
  }

}
