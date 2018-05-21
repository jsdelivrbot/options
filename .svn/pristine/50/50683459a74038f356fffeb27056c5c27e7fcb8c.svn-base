import {Injectable, Pipe} from '@angular/core';

/*
 Generated class for the Conversion pipe.

 See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 Angular 2 Pipes.
 */
@Pipe({
  name: 'nameReplace'
})
@Injectable()
export class nameReplace {
    transform(str: string):string {
        if(str){
            if(str.length==2)str=str.substring(0,1)+'*';
            if(str.length>=3)str=str.substring(0,1)+'**';
        }
        return str
    }
}
