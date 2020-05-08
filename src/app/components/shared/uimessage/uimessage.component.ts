import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-uimessage',
  templateUrl: './uimessage.component.html',
  styleUrls: ['./uimessage.component.css']
})
export class UIMessageComponent implements OnInit {

  @Input()
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
