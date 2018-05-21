import {Injectable, Pipe} from '@angular/core';

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'phoneHide'
})
@Injectable()
export class phoneHide {
    transform(str: string):string {
        if(str)
        return str.substring(0,3)+'****'+str.substring(7,11)
    }
}
