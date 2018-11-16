import { environment } from '@env/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SearchEditKeywordComponent } from '../edit/edit.component';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-keyword-manager',
  templateUrl: './keyword-manager.component.html',
})
export class SearchKeywordManagerComponent implements OnInit {

  title = '名单管理';
  data: any;
  loading = false;

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper
  ) { }

  ngOnInit() {
    console.log('ngOnInit---');
    this.getData();
  }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    {
      title: '', index: 'key'
      // , type: 'checkbox' 
    },
    { title: 'Keywords', index: 'keyWord' },
    { title: 'Sector', index: 'sector' },
    { title: 'Filter', index: 'filter' },
    {
      title: '更新时间',
      index: 'dataTime',
      // type: 'date',
      // sort: {
      //   compare: (a: any, b: any) => a.dataTime - b.dataTime,
      // },
    },
    {
      title: 'Action',
      buttons: [
        {
          text: 'Edit',
          type: 'modal',
          modal: {
            component: SearchEditKeywordComponent,
          },
          click: (record: any, modal: any) => {

          }
        },
        {
          text: 'Delete',
          // click: (item: any) => this.msg.success(`订阅警报${item.no}`),
        },
      ],
    },
  ];
  selectedRows: STData[] = [];

  openEdit(record: any) {
    console.log("新建")
    this.modal
      .create(SearchEditKeywordComponent, { record }, { size: 'md' })
      .subscribe(res => {
        console.log(res);
        // if (record.id) {
        //   // record = Object.assign(record, { id: 'mock_id', percent: 0 }, res);
        // } else {
        //   this.data.splice(0, 0, res);
        //   this.data = [...this.data];
        // }
      });
  }

  getData() {
    this.loading = true;
    console.log(environment.SERVER_URL + 'search/result');
    // this.http.get('https://41c0ede7-bac0-49e6-a786-ea1a8952d855.mock.pstmn.io/search/result')
      this.http.get('search/result')
      .pipe(
        tap(() => {
          console.log('tap');

          this.loading = false;
        })
      )
      .subscribe(res => {
        // this.loading = false;
        console.log("res.values");
        console.log(res);
        this.data = res['data'];
      }
      );
  }

}
