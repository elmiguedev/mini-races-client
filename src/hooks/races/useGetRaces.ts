import { useGet } from "../common/useGet";

export const useGetRaces = () => {
  const { data, loading, error, refresh } = useGet('/races');
  return {
    races: data,
    loading,
    error,
    refresh
  }
}