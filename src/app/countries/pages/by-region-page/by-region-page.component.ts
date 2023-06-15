import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public placeholder: string = 'Buscar por región...';

  public countries:Country[] = [];

  constructor(
    private countryServ: CountriesService
  ) {

  }

  searchByRegion( q: string ):void {
    this.countryServ.searchRegion( q )
      .subscribe( countries => {
        this.countries = countries;
      });
  }
}
