import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noHTML'
})
export class NoHTMLPipe implements PipeTransform {
  //remove html tags from string 
  transform(content: string): string {
    return content.replace(/<\/?[^>]+(>|$)/g, " ");
  }

}
