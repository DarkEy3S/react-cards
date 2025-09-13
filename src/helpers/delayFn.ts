export const delayFn = async (delay: number = 1000): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, delay));
};
