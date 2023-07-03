import {Directive, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {CurrentUserService} from "../service/current-user.service";
import {user} from "@angular/fire/auth";

@Directive({
  selector: '[checkView]'
})
export class CheckViewDirective {

  uid: any = '';
  current: any;

  constructor(
    private templateRef: TemplateRef<any>,
    private currentUser: CurrentUserService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.current = this.currentUser.currentUser.getValue()
    this.uid = this.currentUser.uid
  }

  @Input() set checkView(condition: any) {
    console.log(condition)
    if (condition === 'role') {
      if (this.current?.role.toLowerCase() === 'admin'){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    } else {
      if (condition == this.uid){
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    }
  }
}
