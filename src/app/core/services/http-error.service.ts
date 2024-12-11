import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorService {

  constructor() { }

  formatError(err: HttpErrorResponse): string {
    return this.httpErrorFormatter(err);
  }

  private httpErrorFormatter(err: HttpErrorResponse): string {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occured.
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else {
      // The backend returned and unsuccessful response code.
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.statusText}`;
    }

    return errorMessage;
  }
}
