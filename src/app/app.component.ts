import { Component, OnInit, ViewChild } from '@angular/core';
import * as AdaptiveCards from 'adaptivecards';
import { ElementRef } from '@angular/core';
import { AdaptiveCardsService } from './services/adaptive-cards.service';
import { ViewEncapsulation } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  // Card container reference
  @ViewChild('cardContainer') cardContainer: ElementRef;

  // payload
  json: {};

  constructor(private ac: AdaptiveCardsService) {}

  ngOnInit(): void {
      this.json = this.ac.json;
  }

  ngAfterViewInit(): void {
    // 1. Create an instance of adaptive cards
    let adaptiveCard = new AdaptiveCards.AdaptiveCard();
    // 2. Parse de json payload
    adaptiveCard.parse(this.json);
    // 3. Render the card
    let renderCard = adaptiveCard.render();
    // Attach card to the DOM
    this.cardContainer.nativeElement.append(renderCard);

    $(document).ready(() => {
      let chats = $('#message ~ div.ac-textBlock');
      this.changeRowBg(chats);

      adaptiveCard.onExecuteAction = (action: AdaptiveCards.Action) => {
        let chats = $('#message ~ div.ac-textBlock');
        this.changeRowBg(chats);
        if (action instanceof AdaptiveCards.SubmitAction) {
            if (action.data) {
              let msg  = (action.data as any).message;
              let chat = $(chats[chats.length - 1]).clone();
              if ($(chat).hasClass('even')) {
                $(chat).removeClass('even').addClass('odd');
              } else {
                $(chat).removeClass('odd').addClass('even');
              }
              $(chat).text(msg).insertAfter($(chats[chats.length - 1]));
              $('<br>').insertBefore($(chat));
              
              this.ac.addMessage(msg);
              console.log(chats.length);
            }
        }
      }

    });
    
  }

  changeRowBg(chats: []) {
    for (let i = 0; i < chats.length; i++) {
      if (i % 2 == 0) {
        $(chats[i]).addClass('even');
      } else {
        $(chats[i]).addClass('odd');
      }
    }
  }
  
}
