import { Injectable } from '@angular/core';
import { ErrorHandler } from '@angular/core';

@Injectable()
export class ErrorLogging implements ErrorHandler {
  constructor() { }
  handleError(error) {
    // my custom error handling logic
    console.log('[MyFamilyLogging] ' + error);
  }
}
