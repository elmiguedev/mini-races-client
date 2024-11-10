import { usePost } from "../common/usePost";

export const useCreateRace = () => {
  const { postData, loading, error } = usePost('/races');
  return {
    createRace: () => postData({}),
    loading,
    error
  }
}