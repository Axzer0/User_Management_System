import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[inputFilterDirective]'
})
export class InputFilterDirective {
  @Input() filter: string = 'none';

  alphaNumeric: RegExp = /[^a-zA-Z0-9]/g
  onlyNumber: RegExp = /[^0-9]/g
  onlyString: RegExp = /[^a-zA-Z]/g

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    const inputValue = inputElement.value;
    let sanitizedValue = '';

    switch (this.filter){
      case 'onlyString': sanitizedValue = inputValue.replace(this.onlyString, ''); break;
      case 'onlyNumber': sanitizedValue = inputValue.replace(this.onlyNumber, ''); break;
      case 'alphaNumeric':  sanitizedValue = inputValue.replace(this.alphaNumeric, ''); break;
      case 'none': sanitizedValue = inputValue; break;
      default: sanitizedValue = inputValue; break;
    }

    inputElement.value = sanitizedValue;
    event.preventDefault();
  }
}
