import {ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.scss']

})
export class ViewFileComponent implements OnChanges{
  @Input() file: any = null;

  content: SafeResourceUrl = ''

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
  }

  ngOnChanges() {
      if (this.file && this.file.file instanceof File){
        this.readFromFile(this.file.file)
      }
  }

  readFromFile(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.content = this.sanitizer.bypassSecurityTrustResourceUrl(e.target.result)
        this.cdr.detectChanges()
      };
      reader.readAsDataURL(file);
    }
  }
}
