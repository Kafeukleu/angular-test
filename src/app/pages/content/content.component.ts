import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {ContentDataSource, ContentItem} from './content-datasource';
import {ContentApiService} from '../../services/content-api.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ContentItem>;
  dataSource: ContentDataSource;
  paginationSize = 20;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name'];

  constructor(private contentApiService: ContentApiService, private authenticationService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.dataSource = new ContentDataSource(this.contentApiService);
    this.dataSource.loadContent(0, this.paginationSize);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.paginator.page
      .pipe(
        tap(() => this.loadContentPage())
      )
      .subscribe();
  }

  private loadContentPage(): void {
    this.dataSource.loadContent(
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
