import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ConstantsUtils } from 'src/app/utils/constants.utils';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input()
  paginator: any;

  @Input()
  route = '/users/page';

  pages: number[];
  fromPage: number;
  toPage: number;

  constructor() { }

  ngOnInit(): void {
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    const paginatorUpdated = changes[`paginator`];
    if (paginatorUpdated.previousValue) {
      this.initPaginator();
    }
  }

  private initPaginator(): void {
    const numberOfPages = ConstantsUtils.NUM_OF_PAGES_PAGINATOR;
    this.fromPage = Math.min(Math.max(1, this.paginator.number - (numberOfPages - 1)), this.paginator.totalPages - numberOfPages);
    this.toPage = Math.max(Math.min(this.paginator.totalPages, this.paginator.number + (numberOfPages - 1)), numberOfPages + 1);
    if (this.paginator.totalPages > numberOfPages) {
      this.pages = new Array(this.toPage - this.fromPage + 1).fill(1).map((value, index) => index + this.fromPage);
    } else {
      this.pages = new Array(this.paginator.totalPages).fill(1).map((value, index) => index + 1);
    }
  }

}
