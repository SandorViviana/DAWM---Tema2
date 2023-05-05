import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static yearValidator(
    year: FormControl
  ): ValidationErrors | null {
    if (!year?.value?.match(/^\d+$/) && parseInt(year.value)<=new Date().getFullYear() ) {
      return { containsNumber: true };
    }   
    return null;
  }
}