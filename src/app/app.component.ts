import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgpDescription, NgpFormControl, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { map, tap } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NgpFormField,
        NgpLabel,
        NgpDescription,
        NgpFormControl,
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    postcode = new FormControl<string>('');

    mockData = {
        "postcode": "BT53 7HX",
        "quality": 1,
        "eastings": 294866,
        "northings": 424744,
        "country": "Northern Ireland",
        "nhs_ha": "Health & Social Care Board",
        "longitude": -6.516078,
        "latitude": 55.060991,
        "european_electoral_region": "Northern Ireland",
        "primary_care_trust": "Northern",
        "region": null,
        "lsoa": "Seacon",
        "msoa": null,
        "incode": "7HX",
        "outcode": "BT53",
        "parliamentary_constituency": "North Antrim",
        "parliamentary_constituency_2024": "North Antrim",
        "admin_district": "Causeway Coast and Glens",
        "parish": null,
        "admin_county": null,
        "date_of_introduction": "200411",
        "admin_ward": "Route",
        "ced": null,
        "ccg": "Northern",
        "nuts": "Causeway Coast and Glens",
        "pfa": "(pseudo) Northern Ireland",
        "codes": {
            "admin_district": "N09000004",
            "admin_county": "N99999999",
            "admin_ward": "N08000436",
            "parish": "N99999999",
            "parliamentary_constituency": "N06000012",
            "parliamentary_constituency_2024": "N05000012",
            "ccg": "ZC020",
            "ccg_id": "ZC020",
            "ced": "N99999999",
            "nuts": "TLN0C",
            "lsoa": "95EE14W1",
            "msoa": "N99999999",
            "lau2": "N09000004",
            "pfa": "N99999999"
        }
    }

    constructor(private httpClient: HttpClient) {}

    ngOnInit(): void {
        // TODO - add search service
        const endpoint = 'https://postcodes.io/postcodes/BT53 7HX'
        this.httpClient.get<SearchResult>(encodeURI(endpoint)).pipe(
            map((res: SearchResult) => res.result)
        ).subscribe({
            next: (res) => console.log(res),
            error: (error) => console.log(error)
        })
    }

    // mock response
    // {
    //     "status": 200,
    //     "result": {
    //         "postcode": "BT53 7HX",
    //         "quality": 1,
    //         "eastings": 294866,
    //         "northings": 424744,
    //         "country": "Northern Ireland",
    //         "nhs_ha": "Health & Social Care Board",
    //         "longitude": -6.516078,
    //         "latitude": 55.060991,
    //         "european_electoral_region": "Northern Ireland",
    //         "primary_care_trust": "Northern",
    //         "region": null,
    //         "lsoa": "Seacon",
    //         "msoa": null,
    //         "incode": "7HX",
    //         "outcode": "BT53",
    //         "parliamentary_constituency": "North Antrim",
    //         "parliamentary_constituency_2024": "North Antrim",
    //         "admin_district": "Causeway Coast and Glens",
    //         "parish": null,
    //         "admin_county": null,
    //         "date_of_introduction": "200411",
    //         "admin_ward": "Route",
    //         "ced": null,
    //         "ccg": "Northern",
    //         "nuts": "Causeway Coast and Glens",
    //         "pfa": "(pseudo) Northern Ireland",
    //         "codes": {
    //             "admin_district": "N09000004",
    //             "admin_county": "N99999999",
    //             "admin_ward": "N08000436",
    //             "parish": "N99999999",
    //             "parliamentary_constituency": "N06000012",
    //             "parliamentary_constituency_2024": "N05000012",
    //             "ccg": "ZC020",
    //             "ccg_id": "ZC020",
    //             "ced": "N99999999",
    //             "nuts": "TLN0C",
    //             "lsoa": "95EE14W1",
    //             "msoa": "N99999999",
    //             "lau2": "N09000004",
    //             "pfa": "N99999999"
    //         }
    //     }
    // }
}

interface PostcodeData {
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

interface PostcodeDataCodes {
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

interface SearchResult {
    status: number;
    result: PostcodeData;
}
