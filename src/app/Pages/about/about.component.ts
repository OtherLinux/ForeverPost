import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  aboutIcons = {
    missionIconSrc: "images/sports_score_200dp_32CBED_FILL0_wght400_GRAD0_opsz48.svg",
    whyIconSrc: "images/question_mark_200dp_EA3323_FILL0_wght400_GRAD0_opsz48.svg",
    personSolid: "images/person_200dp_32ED64_FILL0_wght400_GRAD0_opsz48.svg",
  };
}
