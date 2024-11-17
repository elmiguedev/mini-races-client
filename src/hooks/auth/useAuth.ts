import { computed, ref } from "vue";
import type { LoginRequest } from "../../core/domain/auth/LoginRequest";
import type { LoginResponse } from "../../core/domain/auth/LoginResponse";
import { useRouter } from "vue-router";

export const useAuth = () => {
  const baseUrl = "http://localhost:3000"; //process.env.VUE_APP_BASE_URL;
  const loading = ref(false);
  const error = ref();
  const router = useRouter();

  const saveUserSession = (data: LoginResponse) => {
    localStorage.setItem("auth", JSON.stringify(data));
  }

  const getUserSession = () => {
    const data = localStorage.getItem("auth");
    return data ? JSON.parse(data) : undefined;
  }

  const removeUserSession = () => {
    localStorage.removeItem("auth");
  }

  const redirectToHome = () => {
    router.push({ name: "home" });
  }

  const redirectToLogin = () => {
    router.push({ name: "login" });
  }

  const login = async (params: LoginRequest) => {
    const url = `${baseUrl}/auth/login`;

    loading.value = true;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      if (response.status === 401) {
        error.value = "Invalid credentials";
      } else {
        error.value = "An error occurred";
      }
    } else {
      const data = await response.json();
      saveUserSession(data);
      redirectToHome();
    }
    loading.value = false;
  }

  const logout = () => {
    removeUserSession();
    redirectToLogin();
  }

  const isAuthenticated = computed(() => {
    return !!getUserSession();
  });

  const user = computed(() => {
    return getUserSession()?.user;
  });

  const token = computed(() => {
    return getUserSession()?.token || "";
  });

  return {
    isAuthenticated: isAuthenticated.value,
    user: user.value,
    loading,
    login,
    logout,
    error,
    token: token.value
  }
}