import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from './result.component';
import { CommonModule } from '@angular/common';

describe('ResultComponent', () => {
    let component: ResultComponent;
    let fixture: ComponentFixture<ResultComponent>;

    const mockPostcodeDataResponse = {
        "postcode": "LS11 0ES",
        "quality": 1,
        "eastings": 428230,
        "northings": 431349,
        "country": "England",
        "nhs_ha": "Yorkshire and the Humber",
        "longitude": -1.573104,
        "latitude": 53.777714,
        "european_electoral_region": "Yorkshire and The Humber",
        "primary_care_trust": "Leeds",
        "region": "Yorkshire and The Humber",
        "lsoa": "Leeds 090E",
        "msoa": "Leeds 090",
        "incode": "0ES",
        "outcode": "LS11",
        "parliamentary_constituency": "Leeds Central",
        "parliamentary_constituency_2024": "Leeds South",
        "admin_district": "Leeds",
        "parish": null,
        "admin_county": null,
        "date_of_introduction": "198001",
        "admin_ward": "Beeston & Holbeck",
        "ced": null,
        "ccg": "NHS West Yorkshire",
        "nuts": "Leeds",
        "pfa": "West Yorkshire",
        "codes": {
            "admin_district": "E08000035",
            "admin_county": "E99999999",
            "admin_ward": "E05012647",
            "parish": "E43000294",
            "parliamentary_constituency": "E14000777",
            "parliamentary_constituency_2024": "E14001323",
            "ccg": "E38000225",
            "ccg_id": "15F",
            "ced": "E99999999",
            "nuts": "TLE42",
            "lsoa": "E01011369",
            "msoa": "E02002419",
            "lau2": "E08000035",
            "pfa": "E23000010"
        }
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [
            ResultComponent,
            CommonModule
        ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ResultComponent);
        component = fixture.componentInstance;
        component.postcodeData = mockPostcodeDataResponse;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
