import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrls: ['./country-page.component.css']
})


export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(
    private actRoute: ActivatedRoute,
    private countryServ: CountriesService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.actRoute.params
      .pipe(
        switchMap( ({ id }) => this.countryServ.searchByAlphaCode(id) )
      )
      .subscribe( ( country ) => {
        if ( !country ) {
          return this.router.navigateByUrl('');
        }
        console.log(country);

        this.country = country;
        return true;
    });
  }
}
