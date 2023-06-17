import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {

  public placeholder:string = 'Buscar por país...';

  public countries: Country[] = [];

  public lastTerm:string = '';

  constructor(
    private countryServ:CountriesService
  ) {

  }

  ngOnInit(): void {
    this.countries = this.countryServ.cacheStore.byCountries.countries;
    this.lastTerm = this.countryServ.cacheStore.byCountries.term;    
  }

  searchByCountry( q: string ):void {
    this.countryServ.searchCountry( q ).
      subscribe( countries => {
        this.countries = countries;
      });
  }


}
