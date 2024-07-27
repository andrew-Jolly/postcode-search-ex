import { CommonModule } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgpDescription, NgpFormControl, NgpFormField, NgpLabel } from 'ng-primitives/form-field';
import { PostcodeData, SearchService } from './services/search.service';
import { ResultComponent } from "./result/result.component";
import { NgpButton } from 'ng-primitives/button';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
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
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
    postcodeInput = new FormControl<string>('', [Validators.required, Validators.minLength(6), this.noWhitespaceValidator]);
    result: PostcodeData;
    errorMessage: string;

    constructor(
        private _title: Title,
        private _searchService: SearchService,
        private _destroyRef: DestroyRef
    ) {
        this._title.setTitle('Postcode Search');
        this.postcodeInput.valueChanges.pipe(
            takeUntilDestroyed(this._destroyRef)
        ).subscribe(() => this.errorMessage = null);
    }

    onSearchBtnClick(): void {
        this.result = null;
        this._searchService.getPostcode(this.postcodeInput.value.trim()).subscribe({
            next: (postcodeData: PostcodeData) => {
                this.result = postcodeData;
                this.postcodeInput.setValue('');
            },
            error: (error) => this.handleError(error)
        });
    }

    private handleError(error: HttpErrorResponse): void {
        if (error.status === 404) {
            this.errorMessage = "The postcode you entered is invalid. Please try again.";
        }
        else {
            this.errorMessage = "There was an error fetching the postcode data. Please try again.";
        }
    }

    private noWhitespaceValidator(control: FormControl<string>): { 'whitespace': boolean } {
        return (control.value || '').trim().length === 0 ? { 'whitespace': true } : null;
    }
}
