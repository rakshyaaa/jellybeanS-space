import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  imports: [FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})

export class ChatbotComponent {
  isChatOpen = false;
  userMessage = '';
  messages: { text: string; user: boolean }[] = [];

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  async sendMessage() {
    if (this.userMessage.trim()) {
      this.messages.push({ text: this.userMessage, user: true });

      try {
        const response = await axios.post('http://127.0.0.1:5000/chat', {
          message: this.userMessage,
        });
        this.messages.push({ text: response.data.response, user: false });
      } catch (error) {
        console.error('Error sending message:', error);
        this.messages.push({
          text: "Sorry, I couldn't connect to the server.",
          user: false,
        });
      }

      this.userMessage = '';
    }
  }
}
