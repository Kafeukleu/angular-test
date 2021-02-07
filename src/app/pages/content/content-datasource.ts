import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {BehaviorSubject, Observable} from 'rxjs';
import {ContentApiService} from '../../services/content-api.service';

export interface ContentItem {
  name: string;
}

export class ContentDataSource extends DataSource<ContentItem> {

  private contentSubject = new BehaviorSubject<ContentItem[]>([]);
  paginator: MatPaginator;
  sort: MatSort;

  constructor(private contentApiService: ContentApiService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ContentItem[]> {
    return this.contentSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
    this.contentSubject.complete();
  }


  public loadContent(pageIndex = 0, pageSize = 20): void {
    this.contentApiService.getContent().subscribe(
      (contentItems: ContentItem[]) => this.contentSubject.next(contentItems)
    );
  }
}
