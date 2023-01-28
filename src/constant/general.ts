const environment = process.env.NEXT_PUBLIC_APP_ENV

export const BASE_URL =
  environment === 'PRODUCTION'
    ? 'https://api.convy-app.cloud/api/v1'
    : environment === 'STAGING'
    ? 'https://api.convy-app.cloud/api/v1'
    : 'https://api.convy-app.cloud/api/v1'
