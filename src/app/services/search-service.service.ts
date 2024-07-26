import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {
    constructor(private httpClient: HttpClient) {}

    getPostcode(code: string): Observable<PostcodeData> {
        const endpoint = `https://postcodes.io/postcodes/${code}`
        return this.httpClient.get<SearchResult>(endpoint).pipe(
            map((res: SearchResult) => res.result)
        )
    }
}

export interface PostcodeData {
    postcode: string;
    quality: number;
    eastings: number;
    northings: number;
    country: string;
    nhs_ha: string;
    longitude: number;
    latitude: number;
    european_electoral_region: string;
    primary_care_trust: string;
    region: string;
    lsoa: string;
    msoa: string;
    incode: string;
    outcode: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    admin_district: string;
    parish: string;
    admin_county: string;
    date_of_introduction: string;
    admin_ward: string;
    ced: string;
    ccg: string;
    nuts: string;
    pfa: string;
    codes: PostcodeDataCodes;
}

export interface PostcodeDataCodes {
    admin_district: string;
    admin_county: string;
    admin_ward: string;
    parish: string;
    parliamentary_constituency: string;
    parliamentary_constituency_2024: string;
    ccg: string;
    ccg_id: string;
    ced: string;
    nuts: string;
    lsoa: string;
    msoa: string;
    lau2: string;
    pfa: string;
}

export interface SearchResult {
    status: number;
    result: PostcodeData;
}
