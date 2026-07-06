'use client';
import React from 'react';

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "INREST",
    "url": "https://inrest.sk",
    "telephone": "+421 908 264 970",
    "email": "inrestsro@inrestsro.sk",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "a ISO 45001",
      "addressCountry": "SK"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
