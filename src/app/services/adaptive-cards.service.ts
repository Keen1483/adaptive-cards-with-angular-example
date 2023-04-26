import { Injectable } from '@angular/core';
import * as AdaptiveCards from 'adaptivecards';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdaptiveCardsService {

  messageSubject$ = new Subject<any[]>();
  textBlocks: any[] = [
    {
      "type": "Input.Text",
      "id": "message",
      "isMultiline": true,
      "placeholder": "Write your message here",
      "wrap": true
    },
    {
      "type": "TextBlock",
      "text": "Adaptive Cards test"
    }
  ];

  json = {
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "type": "AdaptiveCard",
    "version": "2.11.2",
    "body": [
      {
        "type": "Container",
        "items": [
          {
            "type": "ColumnSet",
            "columns": [
              {
                "type": "Column",
                "width": "auto",
                "items": [
                  {
                    "type": "Image",
                    "url": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg",
                    "altText": "Matt Hidinger",
                    "size": "small",
                    "style": "person"
                  }
                ]
              },
              {
                "type": "Column",
                "width": "stretch",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "Matt Hidinger",
                    "weight": "bolder",
                    "wrap": true
                  },
                  {
                    "type": "TextBlock",
                    "spacing": "none",
                    "text": "Created {{DATE(2017-02-14T06:08:39Z, SHORT)}}",
                    "isSubtle": true,
                    "wrap": true
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "Container",
        "items": this.textBlocks
      }
    ],
    "actions": [
      {
        "type": "Action.Submit",
        "title": "Send"
      }
    ]
  };

  constructor() {
    for (let i = 0; i < 5; i++) {
      this.textBlocks.push({
        'type': 'TextBlock',
        'text': `TextBlock ${i}`
      });
    }
  }

  addMessage(message: string) {
    this.textBlocks.push({
      'type': 'TextBlock',
      'text': message
    });
  }
}
