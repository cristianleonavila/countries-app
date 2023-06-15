import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Country } from '../interfaces/country';


@Injectable({providedIn: 'root'})

export class CountriesService {

  private endPoint:string = 'https://restcountries.com/v3.1';

  constructor(
    private http: HttpClient
  ) {

  }

  searchCapital( q: string ): Observable<Country[]> {
    const url = `${this.endPoint}/capital/${q}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( err => of([]) )
    );
  }

  searchCountry( q: string): Observable<Country[]> {
    const url = `${this.endPoint}/name/${q}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( err => of([]) )
    );

  }

  searchRegion( q: string): Observable<Country[]> {
    const url = `${this.endPoint}/region/${q}`;
    return this.http.get<Country[]>( url ).pipe(
      catchError( err => of([]) )
    );

  }



}
