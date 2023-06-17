import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { ValidRegion } from '../interfaces/region.type';


@Injectable({providedIn: 'root'})

export class CountriesService {

  private endPoint:string = 'https://restcountries.com/v3.1';

  public cacheStore:CacheStore = {
    byCapital: {
      term: '',
      countries: []
    },
    byCountries: {
      term: '',
      countries: []
    },
    byRegion:{
      region: 'Asia',
      countries: []
    }
  };

  constructor(
    private http: HttpClient
  ) {

    this.load();


  }

  private getCountriesRequest( url:string ):Observable<Country[]> {
    return this.http.get<Country[]>( url )
    .pipe(
      catchError( () => of([]))
    );
  }

  private save() {
    localStorage.setItem('countriesStorage', JSON.stringify( this.cacheStore ));
  }

  private load() {
    if ( !localStorage.getItem('countriesStorage') ) return;
    this.cacheStore = JSON.parse( localStorage.getItem('countriesStorage')! );
  }

  searchCapital( term: string ): Observable<Country[]> {
    const url = `${this.endPoint}/capital/${term}`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries}),
      tap(() => this.save() )
    );
  }

  searchCountry( term: string): Observable<Country[]> {
    const url = `${this.endPoint}/name/${term}`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byCountries = {term, countries}),
      tap(() => this.save() )
    );

  }

  searchRegion( region: ValidRegion): Observable<Country[]> {
    const url = `${this.endPoint}/region/${region}`;
    return this.getCountriesRequest( url ).pipe(
      tap( countries => this.cacheStore.byRegion = {region, countries}),
      tap(() => this.save() )
    );
  }

  searchByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.endPoint}/alpha/${code}`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( (countries:Country[]) => countries.length > 0 ? countries[0] : null ),
        catchError( err => of(null) )
    );
  }



}
