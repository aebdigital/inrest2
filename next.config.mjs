/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.inrestsro.sk',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/kontakt.html', destination: '/kontakt', permanent: true },
      { source: '/referencie', destination: '/realizacie', permanent: true },
      {
        source: '/referencie/referencie-hydroizolacie',
        destination: '/realizacie/hydroizolacie',
        permanent: true,
      },
      {
        source: '/referencie/referencie-oplastenia-budov',
        destination: '/realizacie/oplastenia-budov',
        permanent: true,
      },
      {
        source: '/referencie/referencie-svetliky',
        destination: '/realizacie/svetliky',
        permanent: true,
      },
      {
        source: '/referencie/referencie-rekonstrukcie-interierov-a-exterierov',
        destination: '/realizacie/rekonstrukcie-interierov-a-exterierov',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();
