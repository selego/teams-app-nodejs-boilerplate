const environment = getEnvironment()

let apiURL = ''
if (environment === 'development') apiURL = 'http://localhost:3000'
if (environment === 'production') apiURL = 'https://matteriality-api.cleverapps.io'

const SENTRY_URL = 'https://3981b0ed2f58cf857e26fd8eb58546f4@sentry.selego.co/93'
const GLEAP_API_KEY = 'E0XtgOtsiCsPWTaxX5v6d3Pqrrdf8DnC'

function getEnvironment() {
  if (window.location.href.indexOf('app-staging') !== -1) return 'staging'
  if (window.location.href.indexOf('localhost') !== -1 || window.location.href.indexOf('127.0.0.1') !== -1) return 'development'
  return 'production'
}

export { apiURL, SENTRY_URL, environment, GLEAP_API_KEY }
