import { FormControl, ValidationErrors } from '@angular/forms';

export class Luv2ShopValidators {
    static notOnlyWhitespace(control: FormControl): ValidationErrors | null {
        // Trim the value to remove leading and trailing white spaces
        const value = control.value?.trim();

        // Check if the trimmed value is an empty string
        if (!value) {
            // If empty or contains only white spaces, return error object
            return { 'notOnlyWhitespace': true };
        } else {
            // If not empty, return null (no error)
            return null;
        }
    }
}



