import type { Metadata } from "next";
import { DemoApp } from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "TaxStack Demo — Interactive product mock",
  description:
    "Fully interactive demo of TaxStack: client portal, e-signatures, scheduling, documents, and onboarding automation.",
};

export default function DemoPage() {
  return (
    <div className="-mt-0">
      <DemoApp />
    </div>
  );
}
