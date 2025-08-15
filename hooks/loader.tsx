import { useCallback, useState } from "react";

export function useSceneLoader(totalSteps: number) {
  const [loadedSteps, setLoadedSteps] = useState(0);

  const markStepLoaded = useCallback(() => {
    setLoadedSteps((prev) => prev + 1);
  }, []);

  const isLoading = loadedSteps < totalSteps;

  return { isLoading, markStepLoaded };
}
