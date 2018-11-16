import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { SearchEditKeywordComponent } from '../edit/edit.component';

@Component({
  selector: 'app-search-search',
  templateUrl: './search.component.html',
})
export class SearchSearchComponent implements OnInit {
   

  title = '搜索结果';
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
  ) { }

  ngOnInit() {
  }

  @ViewChild('st')
  st: STComponent;
  columns: STColumn[] = [
    { title: '', index: 'key', type: 'checkbox' },
    { title: 'Avatar', index: 'avatar' },
    { title: 'WechatId', index: 'wechatId' },
    { title: 'OfficialName', index: 'officialName' },
    {
      title: '更新时间',
      index: 'dataTime',
      type: 'date',
      sort: {
        compare: (a: any, b: any) => a.dataTime - b.dataTime,
      },
    },
    {
      title: 'Action',
      buttons: [
        {
          icon: 'edit',
          type: 'modal',
          modal: {
            component: SearchEditKeywordComponent,
          },
          click: (record: any, modal: any) =>{}
            // this.message.success(
            //   `重新加载页面，回传值：${JSON.stringify(modal)}`,
            // ),
        },
        {
          text: 'Delete',
          // click: (item: any) => this.msg.success(`订阅警报${item.no}`),
        },
      ],
    },
  ];
  selectedRows: STData[] = [];

  openEdit(record: any ) {
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

}
