import { ReactNode } from "react";
import { StoreProvider } from "@/redux/StoreProvider";

export default function Layout({ children }: { children: ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}
