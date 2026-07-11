import { api } from './api'

export const logger = {
  async sendLog(level, message, context = {}) {
    try {
      const event = {
        level,
        message,
        context,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent
      }
      // Отправляем асинхронно, не блокируя UI
      api.postLog(event).catch(() => {})
    } catch {
      // Игнорируем ошибки сериализации и т.д., чтобы не уронить приложение из-за логов
    }
  },
  
  info(msg, ctx) { 
    this.sendLog('info', msg, ctx); 
    console.info('[AppLog Info]', msg, ctx || '');
  },
  
  warn(msg, ctx) { 
    this.sendLog('warn', msg, ctx); 
    console.warn('[AppLog Warn]', msg, ctx || '');
  },
  
  error(msg, ctx) { 
    this.sendLog('error', msg, ctx); 
    console.error('[AppLog Error]', msg, ctx || '');
  },
  
  debug(msg, ctx) { 
    this.sendLog('debug', msg, ctx); 
    console.debug('[AppLog Debug]', msg, ctx || '');
  }
}
