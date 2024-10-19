"use client";

import SignIn from "./signin/page";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex justify-center items-center h-screen">
        <SignIn />
      </div>
    </div>
  );
}
