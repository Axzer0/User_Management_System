import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {filter} from "rxjs";
@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit, OnChanges{
  @Input() data: any[] = []
  @Input() displayedColumns: string[] = []
  @Input() allowedFilter: any;
  @Input() allowedSort: any;
  @Input() pageSize: number = 10
  @Input() action: any
  @Input() enableSearch: boolean = false

  dataSource: any[] = []
  displayFilterInput: boolean = false

  paginate = {
    start: 0, end: 10, pageSize: 10
  }

  searchTerm: string = ''

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = [...this.data]
    this.paginate.end = this.pageSize
    this.paginate.pageSize = this.pageSize
  }

  search(){
    let _temp: any[] = []
    _temp = [...this.data.filter(item => item?.name.
      toString().toLowerCase().
      startsWith(this.searchTerm.toLowerCase())
    )]
    this.filter(_temp)
  }

  // filter through each string in allowed filter
  filter(arr: any[], keys?: string[]){
    let _temp: any[] = []
    if (!keys){
      keys = Object.keys(this.allowedFilter)
    }
    console.log(keys)
    for (let key of keys){
      _temp = [...arr.filter(item => item[key].
        toString().toLowerCase().
        startsWith(this.allowedFilter[key].toLowerCase())
      )]
      keys.splice(keys.indexOf(key),1)
      if (keys.length > 0){
        this.filter(_temp, keys)
        return
      }
    }
    this.dataSource = [..._temp]
    this.cdr.detectChanges()
  }

  reset(){
    this.dataSource = [...this.data];
    Object.keys(this.allowedSort).forEach(key => {
      this.allowedSort[key] = 'asc'
    })
    this.cdr.detectChanges()
  }

  // sort the selected col and reset other cols icon display
  sort(key: string, state: string){
    Object.keys(this.allowedSort).forEach(k => {
      if (k != key ){
        console.log(k)
        this.allowedSort[k] = 'asc'
      }
    })
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

  handlePageEvent(e: PageEvent){
    console.log(e)
    console.log(this.pageSize, this.paginate)
    if (this.paginate.pageSize != e.pageSize){
      this.onPageSizeChange(e.pageSize); return;
    }
    if ((e.previousPageIndex === 0 || e.previousPageIndex) && (e.pageIndex || e.pageIndex === 0)){
      if (e.previousPageIndex < e.pageIndex){
        this.onNext(); return;
      }
      if (e.previousPageIndex > e.pageIndex){
        this.onPrev(); return;
      }
    }

  }

  onPageSizeChange(size: number){
    this.paginate = {
      start: 0, end: size, pageSize: size
    }
  }

  onNext(){
    this.paginate.start = this.paginate.start + this.paginate.pageSize
    this.paginate.end = this.paginate.end + this.paginate.pageSize
  }

  onPrev(){
    this.paginate.start = this.paginate.start - this.paginate.pageSize
    this.paginate.end = this.paginate.end - this.paginate.pageSize
  }
}


