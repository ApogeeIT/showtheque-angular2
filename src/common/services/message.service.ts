import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

    public showSuccessMessage(msg:string) {
        toastr.success(msg);
    }

    public showErrorMessage(msg:string) {
        toastr.error(msg);
    }

}