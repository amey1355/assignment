import { useState, useEffect, useCallback } from 'react';
import { User } from '../types/User';

interface APIResponse<T> {
  data: T;
}

const FETCH_TIMEOUT = 5000;
const MAX_RETRIES = 3;

interface UseFetchUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchUsers = (): UseFetchUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWithTimeout = async (
    url: string,
    options: RequestInit = {},
    timeout: number = FETCH_TIMEOUT
  ): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      return response;
    } finally {
      clearTimeout(id);
    }
  };

  const fetchUsers = useCallback(async () => {
    let attempt = 0;
    setLoading(true);   // Always set loading true at start(while coding initially) this caused error when refetching but fixed later
    setError(null);

    while (attempt < MAX_RETRIES) {
      try {
        const response = await fetchWithTimeout(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        /**
         * Strong TYPE: using interface
         * If API returns raw array → use User[]
         * If wrapped → use APIResponse<User[]>
         */
        const data: User[] = await response.json();
        //Custom Example if API wrapped: (improvement for future APIs)
        //const result: APIResponse<User[]> = await response.json();
        //const data = result.data;
        setUsers(data);
        setLoading(false);  //Stop loading on SUCCESS
        return;

      } catch (err) {
        attempt++;

        const errorMessage =
          err instanceof Error
            ? err.name === 'AbortError'
              ? 'Request timed out. Please try again.'
              : err.message
            : 'Something went wrong. Please try again.';

        if (attempt >= MAX_RETRIES) {
          setError(errorMessage);
          setLoading(false);  // This stops loading after ALL retries fail
          return;
        }

        // Backoff delay before next retry
        await new Promise((res) => setTimeout(res, 1000 * attempt));
      }
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
};