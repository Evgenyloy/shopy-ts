import { IOrder, IProduct } from "../../types/types";
import Spinner from "../spinner/Spinner";

export function spinnerVisibility(
  databaseLoading: string,
  authentication: string,
  item: IOrder[] | IProduct[]
) {
  if (
    (databaseLoading === "loading" || authentication === "loading") &&
    item.length !== 0
  ) {
    return <Spinner className={"spinner-header"} />;
  }

  if (
    databaseLoading === "idle" &&
    authentication === "idle" &&
    item.length > 0
  ) {
    return item.length;
  }

  if (
    databaseLoading === "error" &&
    authentication === "error" &&
    item.length > 0
  ) {
    return item.length;
  }
}

export const changeBodyScroll = (popupVisible: boolean) => {
  if (popupVisible) {
    document.body.classList.add("noscroll");
  }
  if (!popupVisible) {
    document.body.classList.remove("noscroll");
  }
};
