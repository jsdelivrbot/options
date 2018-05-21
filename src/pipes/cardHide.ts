import {Injectable, Pipe} from '@angular/core';

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'cardHide'
})
@Injectable()
export class cardHide {
    transform(str: string):string {
        if(str){
            let len=str.length;
            return '********'+str.substring(len-6,len)
        }
    }
}
