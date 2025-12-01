'use strict';

import { GoogleGenAI } from '@google/genai';
import 'dotenv/config';
import { SYSTEM_PROMPT } from './prompt.js';
import db from '../../config/db.js';

// ★ 날씨 API 키 (없으면 .env에 추가하거나 여기에 직접 넣으세요)
const WEATHER_API_KEY =
  process.env.WEATHER_API_KEY || process.env.VITE_WEATHER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ vertexai: false, apikey: GEMINI_API_KEY });
const model = 'gemini-2.5-flash-lite';

class Chat {
  constructor(body) {
    this.message = body.message;
    this.history = body.history;
  }

  // [기능 1] DB에서 최신 데이터 가져오기 (시간 포맷 수정 포함)
  async getRecentSensorData() {
    return new Promise((resolve) => {
      const query = `
        SELECT unicast_address, Temp, Humidity, Emergency, Time 
        FROM mesh 
        ORDER BY Time DESC 
        LIMIT 10;
      `;

      db.query(query, (err, data) => {
        if (err) {
          console.error('DB 조회 실패:', err);
          resolve('센서 데이터 조회 실패');
        } else {
          // ★ 여기서 시간 문제를 해결합니다. (UTC -> KST 변환 문자열)
          const formattedData = data
            .map((d) => {
              const kstDate = new Date(d.Time).toLocaleString('ko-KR', {
                timeZone: 'Asia/Seoul',
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });
              return `- [기기 ${d.unicast_address}] 시간: ${kstDate}, 온도: ${d.Temp}°C, 습도: ${d.Humidity}%, 신고: ${d.Emergency}`;
            })
            .join('\n');

          resolve(formattedData);
        }
      });
    });
  }

  // [기능 2] DB에서 '오늘의 통계' 가져오기 (똑똑해 보이는 기능)
  async getTodayStats() {
    return new Promise((resolve) => {
      // 오늘 평균 온도, 최고 온도, 총 신고 횟수 조회
      const query = `
        SELECT 
            AVG(Temp) as avg_temp, 
            MAX(Temp) as max_temp, 
            SUM(Emergency) as total_emergency 
        FROM mesh 
        WHERE Time >= CURDATE();
      `;

      db.query(query, (err, data) => {
        if (err || data.length === 0) {
          resolve('통계 데이터 없음');
        } else {
          const stat = data[0];
          const statString = `[오늘의 산불 현황 요약]\n- 오늘 평균 기온: ${Number(stat.avg_temp).toFixed(1)}°C\n- 오늘 최고 기온: ${stat.max_temp}°C\n- 오늘 누적 신고 건수: ${stat.total_emergency}건`;
          resolve(statString);
        }
      });
    });
  }

  // [기능 3] 외부 날씨 API 가져오기 (서울 기준)
  async getCurrentWeather() {
    try {
      if (!WEATHER_API_KEY) return '날씨 API 키가 설정되지 않음';

      const lat = 37.632239; // 노원구 (원하는 좌표로 수정)
      const lon = 127.05501;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}&lang=kr`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.cod !== 200) return '날씨 정보 불러오기 실패';

      return `[현재 서울 외부 날씨]\n- 날씨: ${data.weather[0].description}\n- 기온: ${data.main.temp}°C\n- 습도: ${data.main.humidity}%\n- 풍속: ${data.wind.speed}m/s`;
    } catch (e) {
      console.error('날씨 API 에러:', e);
      return '외부 날씨 정보 연결 불가';
    }
  }

  async postToAi() {
    try {
      if (!this.message) return { success: false, error: '메시지 입력 필요' };

      // 1. 모든 데이터 병렬로 가져오기 (속도 최적화)
      const [sensorDataStr, statsStr, weatherStr] = await Promise.all([
        this.getRecentSensorData(),
        this.getTodayStats(),
        this.getCurrentWeather(),
      ]);

      // 2. 시스템 프롬프트에 모든 정보 때려박기
      const dynamicSystemInstruction = `
${SYSTEM_PROMPT}

너는 산불 감지 시스템의 AI 비서다. 아래 제공된 **실시간 데이터**를 기반으로 답변해라.

${weatherStr}

${statsStr}

[최근 개별 센서 데이터 (최신순)]
${sensorDataStr}

[답변 규칙]
1. 사용자가 현재 상황을 물으면 **"오늘의 통계"**와 **"최근 센서 데이터"**를 종합해서 말해라.
   (예: "오늘 총 3건의 신고가 있었으며, 현재 17번 기기 온도가 26도로 안정적입니다.")
2. 데이터의 시간이 **한국 시간(KST)**임을 인지해라.
3. 외부 날씨(서울)와 우리 센서 데이터(산불 현장)를 구분해서 설명해라.
      `;

      const geminiHistory = this.history.map((chat) => ({
        role: chat.sender === 'user' ? 'user' : 'model',
        parts: [{ text: chat.text }],
      }));
      const contents = [
        ...geminiHistory,
        { role: 'user', parts: [{ text: this.message }] },
      ];

      const response = await ai.models.generateContent({
        model: model,
        contents: contents,
        config: {
          systemInstruction: dynamicSystemInstruction,
        },
      });

      console.log('AI 답변:', response.text);
      return { success: true, reply: response.text };
    } catch (error) {
      console.error('Gemini API 에러:', error);
      return { success: false, error: 'AI 서버 오류' };
    }
  }

  async getByAi() {}
}

export default Chat;
