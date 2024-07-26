import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgpDescription, NgpFormControl, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { PostcodeData, SearchService } from './services/search.service';
import { ResultComponent } from "./result/result.component";

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
        CommonModule,
        ResultComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    postcode = new FormControl<string>('');

    result = {
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

    constructor(private _searchService: SearchService) {}

    ngOnInit(): void {
        console.log('remove this')
    }
}
