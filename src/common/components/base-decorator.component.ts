import { routerTransition } from '../../app.transitions';

export let BaseDecorator = { 
    animations: [routerTransition()],
    host: {'[@routerTransition]': ''}
}