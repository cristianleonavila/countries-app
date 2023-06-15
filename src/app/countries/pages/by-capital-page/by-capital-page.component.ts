import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent {

  public placeholder:string = 'Búsqueda por capital...';

  public countries: Country[] = [];

  constructor(
    private countriesServ:CountriesService
  ) {

  }

  searchByCapital( termino:string ):void {
    this.countriesServ.searchCapital( termino )
      .subscribe( countries => {
        console.log(countries);
        this.countries = countries;
      } );
  }
}
