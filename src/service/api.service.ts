import { environment } from 'environment';

import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.baseUrl;
  }
  public async blogResponse(): Promise<any> {
    return await this.http
      .get(`${this.apiUrl}/blog`, { responseType: 'json' })
      .toPromise();
  }
  createBlog(blog: any): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/blog`, blog).toPromise();
  }
  getByIdBlog(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/blog/${id}`);
  }
  editBlog(id: any, udpdatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/blog/${id}`, udpdatedData).pipe(tap(response => response.response_data));
  }
  deleteBlog(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/blog/${id}`);
  }
}
