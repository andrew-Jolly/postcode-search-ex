import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchService } from './services/search.service';
import { DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgpButton } from 'ng-primitives/button';
import { NgpFormField, NgpLabel, NgpDescription, NgpFormControl } from 'ng-primitives/form-field';
import { ResultComponent } from './result/result.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let mockSearchService: any;

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
        mockSearchService = {
            getPostcode: jasmine.createSpy('getPostcode')
        };

        await TestBed.configureTestingModule({
            imports: [
                AppComponent,
                RouterOutlet,
                NgpFormField,
                NgpLabel,
                NgpDescription,
                NgpFormControl,
                FormsModule,
                ReactiveFormsModule,
                CommonModule,
                ResultComponent,
                NgpButton
            ],
            providers: [
                DestroyRef,
                { provide: SearchService, useValue: mockSearchService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('initialization', () => {
        it('should create the app', () => {
            expect(component).toBeTruthy();
        });

        it('should have initialized the postcode input form control', () => {
            expect(component.postcodeInput).not.toBeUndefined();
        });

        it('should not have a result', () => {
            expect(component.result).toBeUndefined();
        });

        it('should not have defined an error message', () => {
            expect(component.errorMessage).toBeUndefined();
        });

        describe('regarding the search button', () => {
            let searchButton;
            beforeEach(() => {
                searchButton = fixture.debugElement.nativeElement.querySelector('button');
            });

            it('should have the correct button text', () => {
                expect(searchButton.textContent.trim()).toBe('SEARCH');
            });

            it('should be disabled when the postcode input is invalid', () => {
                spyOn(component, 'onSearchBtnClick');

                searchButton.click();

                expect(searchButton.disabled).toBeTrue();
                expect(component.onSearchBtnClick).not.toHaveBeenCalled();
            });
        });
    });

    describe('when searching for a valid postcode', () => {
        let searchButton;
        beforeEach(() => {
            searchButton = fixture.debugElement.nativeElement.querySelector('button');
            component.postcodeInput.setValue('LS11 0ES');
            fixture.detectChanges();
        });

        it('should have enabled the search button', () => {
            expect(searchButton.disabled).toBeFalse();
        });

        it('should fetch the postcode data when the search button is clicked', () => {
            mockSearchService.getPostcode.and.returnValue(of(mockPostcodeDataResponse));
            spyOn(component, 'onSearchBtnClick').and.callThrough();

            searchButton.click();

            expect(component.onSearchBtnClick).toHaveBeenCalled();
            expect(mockSearchService.getPostcode).toHaveBeenCalledWith('LS11 0ES');
            expect(component.result).toEqual(mockPostcodeDataResponse);
        });
    });

    describe('when searching for an invalid postcode', () => {
        let searchButton;
        beforeEach(() => {
            searchButton = fixture.debugElement.nativeElement.querySelector('button');
            component.postcodeInput.setValue('LS1111111');
            fixture.detectChanges();
        });

        it('should have enabled the search button', () => {
            expect(searchButton.disabled).toBeFalse();
        });

        it('should not fetch the postcode data when the search button is clicked', () => {
            const errorResponse = new HttpErrorResponse({
                status: 404,
                statusText: 'invalid postcode',
            });
            mockSearchService.getPostcode.and.returnValue(throwError(() => errorResponse));
            spyOn(component, 'onSearchBtnClick').and.callThrough();

            searchButton.click();

            expect(component.onSearchBtnClick).toHaveBeenCalled();
            expect(mockSearchService.getPostcode).toHaveBeenCalledWith('LS1111111');
            expect(component.result).toBeNull();
            expect(component.errorMessage).toBe('The postcode you entered is invalid. Please try again.');
        });
    });
});
