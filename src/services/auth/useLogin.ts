import { ref } from "vue"
import type { LoginRequest } from "../../models/auth/LoginRequest"
import type { LoginResponse } from "../../models/auth/LoginResponse"

export const useLogin = () => {
  const url = "http://localhost:3000/auth/login"
  const loading = ref(false)
  const data = ref<LoginResponse>()
  const error = ref()

  const login = async (params: LoginRequest) => {
    loading.value = true

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
      })

      if (!response.ok) {
        if (response.status === 401) {
          error.value = "Invalid credentials"
        } else {
          error.value = "An error occurred"
        }
      } else {
        data.value = await response.json();
      }

    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return {
    login,
    loading,
    data,
    error
  }
}