import {Component, Input, SecurityContext, SimpleChanges} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {PostData} from '../../../../post-data';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {LinkToMessage} from '../../../../link-to-message.pipe';

@Component({
  selector: 'app-post',
  imports: [
    ReactiveFormsModule,
    LinkToMessage,
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

  constructor(private sanitizer: DomSanitizer, private router:Router) {
  }


  ngOnChanges(changes: SimpleChanges) {
    if (changes['postData']) {
      this.style_tag = "color:" + this.colors[Math.abs(this.postData.id) % this.colors.length];
      this.postData.message = <string>(this.sanitizer.sanitize(SecurityContext.HTML, this.postData.message));

    }
  }

  onIdClick(event: MouseEvent): void { //Replaces default <a> functions with these ones
    const target = event.target as HTMLElement;
    if (target.tagName === 'A') {
      event.preventDefault();
      const route = target.getAttribute('data-route');
      this.router.navigate([route]);
    }
  }

  public style_tag = "";


  onFormInteraction(add: number) {
    this.holders += add;
    this.isExpanded = this.holders > 0;
    this.isExpanded = false;
  };
}
