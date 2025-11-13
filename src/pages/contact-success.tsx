import * as React from 'react';

export default function ContactSuccess() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Email sent ✅</h1>
        <p className="mb-6">
          Teşekkürler! Mesajını aldık, en kısa sürede sana geri döneceğiz.
        </p>
        <a
          href="/contactus"
          className="inline-block px-4 py-2 border rounded-lg"
        >
          Geri dön
        </a>
      </div>
    </main>
  );
}
