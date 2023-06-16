import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { ValidRegion } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})


export class ByRegionPageComponent implements OnInit {

  public placeholder: string = 'Seleccione una región';

  public regions:ValidRegion[] = ['America', 'Africa', 'Europe', 'Oceania', 'Asia'];

  public selectedRegion?:ValidRegion;

  public countries:Country[] = [];

  constructor(
    private countryServ: CountriesService
  ) {

  }

  ngOnInit(): void {
    this.selectedRegion = this.countryServ.cacheStore.byRegion.region;
    this.countries = this.countryServ.cacheStore.byRegion.countries;
  }

  searchByRegion( q: ValidRegion ):void {
    this.countryServ.searchRegion( q )
      .subscribe( countries => {
        this.countries = countries;
        this.selectedRegion = q;
      });
  }
}
