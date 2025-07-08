import { addHours, addMinutes } from "date-fns";

export const shouldUnblockUser = (
  lastTimestamp: string,
  resendAfterMinutes: number
) => {
  const currentTime = new Date().toISOString();
  const validateLastTimestamp = addMinutes(
    new Date(lastTimestamp),
    resendAfterMinutes
  ).toISOString();
  const unblockUserTimeStamp = currentTime > validateLastTimestamp;
  return { validateLastTimestamp, unblockUserTimeStamp };
};
