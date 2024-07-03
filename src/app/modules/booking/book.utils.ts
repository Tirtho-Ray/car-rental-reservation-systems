export const calculateTotalCost = (
    startTime: string,
    endTime: string,
    pricePerHour: number
  ): number => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Duration in hours
    return durationHours * pricePerHour;
  };
  