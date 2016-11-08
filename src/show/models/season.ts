import { Episode } from './episode';

export class Season {

    constructor(number:number){
        this.number = number;
    }

    number:number;
    episodes:Episode[];
}