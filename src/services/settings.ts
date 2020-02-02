import { SessionStorage } from "storage-manager-js";
import { COLORS } from "components/car";

const storage = new SessionStorage();
enum StorageKeys {
  CAR_COLOR = "carColor",
  RACE_TIME = "raceTime"
}

export const getCarColor = (): COLORS =>
  storage.get(StorageKeys.CAR_COLOR) ?? "original";

export const setCarColor = (color: COLORS) => {
  storage.set(StorageKeys.CAR_COLOR, color);
  return;
};
