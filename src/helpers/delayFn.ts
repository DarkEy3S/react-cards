export const delayFn = async (delay: number = 500): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, delay));
};
