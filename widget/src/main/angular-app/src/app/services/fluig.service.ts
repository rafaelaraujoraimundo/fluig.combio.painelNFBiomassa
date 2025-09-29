import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable()
export class FluigService {

httpOptions: any;
      
      constructor(
        private http: HttpClient,
      ) { this.httpOptions = environment.development ? {
        headers: new HttpHeaders({
          'Authorization': '***REMOVED***',
        })
      } : undefined; }


  public getDataset(dataset: string): Observable<any> {
        const url = '/api/public/ecm/dataset/datasets/';
        const body = {
          "name": dataset,
          "constraints": [
          ]
        };
        return this.http.post(url, body, this.httpOptions);
      }

      exportAsExcelFile(json: any[], excelFileName: string): void {
        console.log(json);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
      }
    
      private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
