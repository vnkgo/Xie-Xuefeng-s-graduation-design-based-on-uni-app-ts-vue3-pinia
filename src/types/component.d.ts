/**
 * declare module '@vue/runtime-core'
 *   现调整为
 * declare module 'vue'
 */
import 'vue'
import XtzSwiper from '@/components/XtzSwiper.vue'
import XtzGuessLike from '@/components/XtzGuessLike.vue'
declare module 'vue' {
  export interface GlobalComponents {
    //
    XtzSwiper: typeof XtzSwiper
    XtzGuessLike: typeof XtzGuessLike
  }
}
