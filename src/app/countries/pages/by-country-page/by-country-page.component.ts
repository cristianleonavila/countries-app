import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent {

  public placeholder:string = 'Buscar por país...';

  public countries: Country[] = [];

  constructor(
    private countryServ:CountriesService
  ) {

  }

  searchByCountry( q: string ):void {
    this.countryServ.searchCountry( q ).
      subscribe( countries => {
        this.countries = countries;
      });
  }


}
