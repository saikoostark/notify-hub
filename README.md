This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Adding env variables

add those

## Core Firebase Config

NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here # Firebase API Key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com # Firebase Auth Domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here # Firebase Project ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com # Firebase Storage Bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here # Firebase Messaging Sender ID
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id_here # Firebase App ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-your_measurement_id_here # Firebase Measurement ID
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com # Firebase Realtime Database URL

## Admin SDK Service Account Keys (Optional - Used for Server-Side Operations)

FIREBASE_SERVICE_ACCOUNT_TYPE=service_account # Type of service account
FIREBASE_SERVICE_ACCOUNT_PROJECT_ID=your_project_id_here # Project ID
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID=your_private_key_id_here # Private Key ID
FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY=your_private_key_here # Private Key (Keep secure, wrap it in quotes)
FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL=your_service_account_email_here # Service Account Email
FIREBASE_SERVICE_ACCOUNT_CLIENT_ID=your_client_id_here # Client ID
FIREBASE_SERVICE_ACCOUNT_AUTH_URI=https://accounts.google.com/o/oauth2/auth # Auth URI
FIREBASE_SERVICE_ACCOUNT_TOKEN_URI=https://oauth2.googleapis.com/token # Token URI
FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs # Provider Cert URL
FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your_project_email_here # Client Cert URL

## Firebase VAPID Keys (For Web Push Notifications)

NEXT_PUBLIC_FIREBASE_VAPID_KEY=your_public_vapid_key_here # Public VAPID Key
FIREBASE_VAPID_PRIVATE_KEY=your_private_vapid_key_here # Private VAPID Key

## Optional Configurations

NEXT_PUBLIC_FIREBASE_DEBUG_MODE=true # Enable Firebase Debug Mode (if applicable)
NEXT_PUBLIC_FIREBASE_REGION=your_default_region_here # Set Firebase Region
