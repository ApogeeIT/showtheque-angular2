import { Season } from './season';

export class Show {
    id:string | number;
    title:string;
    year:number;
    seasons:Season[];
    sync:boolean;
}