import { useState } from "react";
import { delayFn } from "../helpers/delayFn.ts";
import { toast } from "react-toastify";

export function useFetch<TArgs = void, TResult = unknown>(callback: (arg: TArgs) => Promise<TResult>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFn = async (arg: TArgs): Promise<TResult | undefined> => {
    try {
      setIsLoading(true);
      setError(null);
      await delayFn();
      return await callback(arg);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        toast.error(err.message);
      } else {
        setError(String(err));
        toast.error(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetchFn, isLoading, error] as const;
}
