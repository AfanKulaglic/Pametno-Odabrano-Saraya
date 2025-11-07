"use client";

import { useRouter } from "next/navigation";

export default function ErrorFallback() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gray-50 min-h-[60vh]">
      <h2 className="text-3xl font-semibold text-gray-900 mb-4">
        Nešto je pošlo po zlu 😕
      </h2>
      <p className="text-gray-600 max-w-md mb-8">
        Nažalost, podaci se trenutno ne mogu učitati. Možda je privremeni problem s vezom ili serverom.
        Pokušaj ponovo za nekoliko trenutaka.
      </p>

      <button
        onClick={() => router.refresh()}
        className="inline-block bg-blue-600 text-white px-8 py-3 text-lg font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Pokušaj ponovo
      </button>
    </div>
  );
}
