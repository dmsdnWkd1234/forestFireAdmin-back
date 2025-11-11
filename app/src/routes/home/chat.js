'use strict';

import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { SYSTEM_PROMPT } from './prompt.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ vertexai: false, apikey: GEMINI_API_KEY });
const model = 'gemini-2.5-flash-lite';

class Chat {
  constructor(body) {
    this.message = body.message;
    this.history = body.history;
  }

  async postToAi() {
    try {
      if (!this.message) {
        return { success: false, error: '메시지를 입력해주세요' };
      }

      console.log('Chat.js 모델이 받은 메시지:', this.message);

      const geminiHistory = this.history.map((chat) => ({
        role: chat.sender === 'user' ? 'user' : 'model',
        parts: [{ text: chat.text }],
      }));

      const newMessage = {
        role: 'user',
        parts: [{ text: this.message }],
      };

      const contents = [...geminiHistory, newMessage];

      // ★ 네가 쓴 코드 방식 그대로 API 호출
      const response = await ai.models.generateContent({
        model: model, // 네가 쓴 모델명
        contents: contents,
        config: {
          thinkingConfig: {
            thinkingBudget: 0,
          },
          systemInstruction: SYSTEM_PROMPT,
        },
      });
      console.log('답변:', response.text);

      return { success: true, reply: response.text };
    } catch (error) {
      console.error('Gemini API 에러 (in Chat.js):', error);
      return { success: false, error: 'gemini server error' };
    }
  }

  async getByAi() {}
}

export default Chat;
