import { Country } from "./country";
import { ValidRegion } from "./region.type";

export interface CacheStore {
  byCapital: TermCountries,
  byCountries: TermCountries,
  byRegion: RegionCountries
}

export interface TermCountries {
  term: string,
  countries: Country[]
}

export interface RegionCountries {
  region?: ValidRegion,
  countries: Country[]
}
