import { Suspense } from "react";
import PaymentHistoryClient from "@/components/PaymentHistoryClient";

export const metadata = {
  title: "Top-up History - Nhan Gia Toi Thuong",
  description: "Track the account's card and bank top-up history.",
};

export default function PaymentHistoryPage() {
  return (
    <Suspense fallback={null}>
      <PaymentHistoryClient />
    </Suspense>
  );
}
