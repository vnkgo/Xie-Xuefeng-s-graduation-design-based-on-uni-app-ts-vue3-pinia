// src/types/components.d.ts
import XtzSwiper from './XtzSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    XtzSwiper: typeof XtzSwiper
  }
}
