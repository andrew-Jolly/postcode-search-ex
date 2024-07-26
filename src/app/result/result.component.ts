import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostcodeData } from '../services/search.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-result',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './result.component.html',
    styleUrl: './result.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultComponent {
    @Input() postcodeData: PostcodeData;
}
