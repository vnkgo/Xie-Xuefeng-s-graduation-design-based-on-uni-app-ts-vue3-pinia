import type { BannerItem } from '@/types/home'
import { http } from '@/utils/http'

export const getHomeBannerApi = (distributionSite = 1) => {
  return http<BannerItem[]>({
    url: '/home/banner',
    method: 'GET',
    data: { distributionSite },
  })
}

// 首页-前台分类-小程序
//Get
// /home/category/multi

export const getHomeCategoryAPI = () => {
  return http({
    url: '/home/category/multi',
    method: 'GET',
  })
}
