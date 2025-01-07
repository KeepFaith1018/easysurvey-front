import { ref } from 'vue'
import { defineStore } from 'pinia'
import { LStorage } from '@/utils/storage'
import type { UserInfo } from '@/types/auth'
export const useUserStore = defineStore('user', () => {
  const token = ref<string>(LStorage.get('token') || '')
  const userInfo = ref<UserInfo>(LStorage.get('userInfo'))
  const setLoginInfo = (_token: string, _userInfo: UserInfo) => {
    token.value = _token
    userInfo.value = _userInfo
    LStorage.set('token', _token)
    LStorage.set('userInfo', _userInfo)
  }
  const logout = () => {
    LStorage.clear()
  }
  return {
    token,
    userInfo,
    setLoginInfo,
    logout,
  }
})
