import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {

  public placeholder:string = 'Búsqueda por capital...';

  public isLoading:boolean = false;

  public countries: Country[] = [];

  public lastTerm: string = '';

  constructor(
    private countriesServ:CountriesService
  ) {

  }

  ngOnInit(): void {
    this.countries = this.countriesServ.cacheStore.byCapital.countries;
    this.lastTerm = this.countriesServ.cacheStore.byCapital.term;
  }

  searchByCapital( termino:string ):void {
    this.isLoading = true;
    this.countriesServ.searchCapital( termino )
      .subscribe( (countries:Country[]) => {
        this.countries = countries;
        this.isLoading = false;
      } );
  }
}
