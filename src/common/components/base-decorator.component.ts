import { routerTransition } from '../../app.transitions';

export const BaseDecorator: {
    animations: any[],
    host: { [key: string]: string; }
} = {
        animations: [routerTransition()],
        host: { '[@routerTransition]': '' }
    };
