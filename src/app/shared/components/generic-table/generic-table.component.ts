import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnChanges{
  @Input() data: any[] = []
  @Input() displayedColumns: string[] = []

  dataSource: any[] = []

  @ViewChild(MatPaginator) paginator: any;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = this.data
    console.log(this.dataSource)
  }

  search(){
    //search
  }

  filter(){
    this.dataSource.sort((a,b ) => a.position - b.position)

  }

  sort(key: string, state: string){
    if (typeof this.dataSource[0][key] === 'string'){
      if (state == 'asc'){
        this.sortStringAsc(key)
      }
      if (state == 'dsc'){
        this.sortStringDsc(key)
      }
    }
    if (typeof this.dataSource[0][key] === 'number'){
      if (state == 'asc'){
        this.sortNumberAsc(key)
      }
      if (state == 'dsc'){
        this.sortNumberDsc(key)
      }
    }
    console.log(this.dataSource)
    this.cdr.detectChanges()
  }

  sortNumberAsc(key: string){
    this.dataSource = [...this.dataSource.sort((a, b) => {
      return a[key] - b[key]
    })]
    this.cdr.detectChanges()
  }

  sortNumberDsc(key: string){
    this.dataSource = [...this.dataSource.sort((a, b) => {
      return b[key] - a[key]
    })]
    this.cdr.detectChanges()
  }

  sortStringAsc(key: string){
    this.dataSource = [...this.dataSource.sort((a, b) => {
      return a[key].localeCompare(b[key])
    })]
    this.cdr.detectChanges()
  }

  sortStringDsc(key: string){
    this.dataSource = [...this.dataSource.sort((a, b) => {
      return b[key].localeCompare(a[key])
    })]
    this.cdr.detectChanges()
  }
}


