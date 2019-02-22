export interface DestinationGetDto {
  city: CityGetDto;
  description: string;
  id: number;
  name: string;
}

export interface CountryDto {
  id: number;
  name: string;
}

export interface CityGetDto {
  country: CountryDto;
  id: number;
  name: string;
}

export interface CityPostDto {
  countryId: number;
  id: number;
  name: string;
}

export interface DestinationPostDto {
  cityId: number;
  description: string;
  id: number;
  name: string;
}

