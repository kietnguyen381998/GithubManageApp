import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemLanguage, ResponseSearchGithubRepos} from "../_models/repository.model";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private apiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  getRepository(query: string): Observable<ResponseSearchGithubRepos> {
    const url = `${this.apiUrl}/search/repositories?${query}`;
    return this.http.get<ResponseSearchGithubRepos>(url);
  }

  getLanguage(): Observable<ItemLanguage[]> {
    return this.http.get<ItemLanguage[]>(`${this.apiUrl}/languages`);
  }
}
