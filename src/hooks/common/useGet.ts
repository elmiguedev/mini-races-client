import { onMounted, ref } from "vue"
import { useAuth } from "../auth/useAuth";

export const useGet = (url: string) => {
  const baseUrl = "http://localhost:3000"; // TODO: env var
  const fetchUrl = `${baseUrl}${url}`
  const { logout, token } = useAuth();
  const data = ref();
  const error = ref("");
  const loading = ref(false);

  const fetchData = async () => {
    loading.value = true;
    error.value = "";
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }

    try {
      const response = await fetch(fetchUrl, {
        headers
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
        } else {
          throw new Error(response.statusText);
        }
      }
      const ladata = await response.json();
      data.value = ladata;
    } catch (e: any) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  // try {
  //   
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${token}`
  //   }
  //   const response = await fetch(fetchUrl, {
  //     headers
  //   });
  //   if (!response.ok) {
  //     if (response.status === 401) {
  //       logout();
  //     } else {
  //       throw new Error(response.statusText);
  //     }
  //   }
  //   data.value = await response.json();
  // } catch (e: any) {
  //   error.value = e.message;
  // } finally {
  //   loading.value = false;
  // }

  const refresh = () => {
    fetchData();
  };

  onMounted(fetchData);

  return { data, error, loading, refresh };
}