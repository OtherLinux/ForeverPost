import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Pipe({
  name: 'linkToMessage'
})
export class LinkToMessage implements PipeTransform {

  constructor(private sanitize: DomSanitizer) {
  }

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

  transform(value: string): SafeHtml {
    let startIndex: number = -1;
    let search_terms = ["id:", "id: "]
    for (const search_term of search_terms) {
      while (value.toLowerCase().indexOf(search_term, startIndex) != -1) {
        startIndex = value.toLowerCase().indexOf("id:", startIndex);
        let curIndex = startIndex + search_term.length;
        let linkId = "";
        while (!isNaN(Number(value[curIndex]))) {
          linkId += value[curIndex];
          curIndex++;
        }
        let colour = "color: " + this.colors[Math.abs(Number(linkId)) % this.colors.length]
        let pre = value.length
        value = value.slice(0, startIndex) + "<a data-route='search/" + Number(linkId) + "' style='cursor: pointer; " + colour + "'>" + value.slice(startIndex, startIndex + linkId.length + search_term.length) + "</a>" + value.slice(startIndex + linkId.length + search_term.length);
        startIndex += value.length - pre - search_term.length
      }
    }
    return this.sanitize.bypassSecurityTrustHtml(value);
  }

}
