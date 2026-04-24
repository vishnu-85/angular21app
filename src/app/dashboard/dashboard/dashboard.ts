import { Component } from '@angular/core';
import { selectUser } from '../../auth/store/auth.selectors';
import * as AuthActions from '../../auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../core/services/storage.service';
import { ChatService } from '../../shared/services/chat-bot.service';
import { ChatResponse } from '../../shared/models/chat-response';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, FormsModule, ReactiveFormsModule, RouterModule],
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  user$: any;
  user: any = { name: '', email: '' };

  messages: Array<{
    isUser: boolean;
    text?: string;
    summary?: string;
    data?: any[];
    links?: Array<{ label: string; url: string }>;
  }> = [];
 
  sessionId = crypto.randomUUID();

  chatForm!: FormGroup;

  constructor(
    private store: Store,
    private storageService: StorageService,
    private chatService: ChatService,
  ) {
    this.chatForm = new FormGroup({
      userInput: new FormControl('')
    });
    this.user$ = this.store.select(selectUser);
    this.user$.subscribe((data: any) => {
      this.user = data;
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  sendMessage() {
    if (!this.chatForm.get('userInput')?.value.trim()) return;
    this.messages.push({ isUser: true, text: this.chatForm.get('userInput')?.value });
    const query = this.chatForm.get('userInput')?.value;
    this.chatForm.get('userInput')?.setValue('');
    this.chatService.sendMessage(query, this.sessionId).subscribe({
      next: (res: ChatResponse) => {
        this.messages.push({
          isUser: false,
          summary: res.summary,
          data: res.data,
          links: res.links,
        });
      },
      error: (err) => {
        this.messages.push({ isUser: false, summary: 'Sorry, an error occurred.' });
      },
    });
  }

  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
}
