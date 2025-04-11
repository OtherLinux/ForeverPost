import {Component, Input, Sanitizer, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {PostData} from '../../../../post-data';

@Component({
  selector: 'app-post',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  @Input() postData!: PostData;

  isExpanded = false;
  holders = 0;
  colors: string[] = [
  '#FF6B6B', // Soft Red
  '#FFD93D', // Bright Yellow
  '#6BCB77', // Mint Green
  '#4D96FF', // Vivid Blue
  '#FF6FF2', // Neon Pink
  '#FF914D', // Orange
  '#845EC2', // Purple
  '#00C9A7', // Aqua
  '#FFC75F', // Light Gold
  '#FF5E78', // Watermelon
  '#2C73D2', // Royal Blue
  '#00B8A9', // Teal
  '#FF9671', // Peach
  '#C34A36', // Terra Cotta
  '#D65DB1', // Orchid
  '#9B5DE5', // Violet
  '#00F5D4', // Electric Aqua
  '#F9F871', // Lemon Yellow
  '#FF3F00', // Flame
  '#58D68D', // Spring Green
];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['postData']) {
      this.style_tag = "color:" + this.colors[Math.abs(this.postData.id) % this.colors.length];
    }
  }

  public style_tag = "";


  onFormInteraction(add: number) {
    this.holders += add;
    this.isExpanded = this.holders > 0;
    this.isExpanded = false;
  };
}
