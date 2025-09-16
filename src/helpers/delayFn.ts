export const delayFn = async (delay: number = 0): Promise<void> => {
  await new Promise<void>((resolve) => setTimeout(resolve, delay));
};
