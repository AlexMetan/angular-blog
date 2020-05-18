import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimWords'
})
export class TrimWordsPipe implements PipeTransform {

    //change string length  
  transform(text:string,length:number): string {    
    return text.substr(0,length)+"...";
  }

}
