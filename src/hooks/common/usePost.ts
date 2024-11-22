import { onMounted, ref } from "vue"
import { useAuth } from "../auth/useAuth";
import { API_URL } from "@/core/utils/Constants";

export const usePost = (url: string) => {
  const baseUrl = API_URL; // TODO: env var
  const fetchUrl = `${baseUrl}${url}`
  const { logout, token } = useAuth();
  const error = ref("");
  const loading = ref(false);

  const postData = async (body: any) => {
    loading.value = true;
    error.value = "";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    try {
      const response = await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers
      });
      if (!response.ok) {
        if (response.status === 401) {
          logout();
        } else {
          throw new Error(response.statusText);
        }
      }
      return response.json();
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  return { postData, error, loading };
}