---
title: Content Security Policy logs
name: content_security_policy_logs
kind: integration
description: 'Detect and aggregate CSP violations with Datadog'
short_description: 'Detect CSP violations'
dependencies: 
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md']
categories:
    - log collection
    - security
doc_link: /integrations/content_security_policy_logs/
has_logo: false
integration_title: Content Security Policy logs
is_public: true
kind: integration
name: 
public_title: Datadog-Content Security Policy logs 
version: '1.0'
further_reading:
    - link: ''
      tag: ''
      text: ''
integration_id: "content_security_policy_logs"      
---

## Overview

The Datadog Content Security Policy (CSP) integration sends logs to Datadog from web browsers as they interpret your CSP and detect violations. Using the CSP integration means you don't have to host or manage a dedicated endpoint that is responsible for aggregating all this data for you.

For more information about CSPs, see [Google's web.dev post][1].

## Setup




Setup (from https://docs.datadoghq.com/logs/log_collection/?tab=host#setup)

Datadog client token: For security reasons, API keys cannot be used to configure the browser logs SDK, because they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a client token must be used. See the client token documentation for more details.

Browsers send policy violation reports to the endpoint listed in the report-uri directive. The URL must have the following format: 

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

Optionally, the `ddtags` key can be added to the URL to convey additional information such as the service name, the environment (production, staging, development…) and the service version:
- `env`: the application's environment
- `service`: the service name for your application
- `version`: the application's version

The `ddtags` value is formatted in this way:
- Keys and values grouped with `:`
- Keys and values concatenated with `,`
- And the URL encoded.

For instance, in order to encode:
```
{“service”: “billingService”, “env”: “production”}
```

The following should be used:

```
service%3AbillingService%2Cenv%3Aproduction
```

The new URL with tags is then: 

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## Adding the URL in the Content Security Policy

### Policy embedded in an HTTP header
This is the recommended way to embed Content Security Policy. Two options are available:

#### Using the report-uri directive:

```shell
Content-Security-Policy: ...; report-uri https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

#### Using the report-to directive:

Report-to will supersede report-uri at some point but only Chrome supports it today. See browser compatibility here.

```json
Content-Security-Policy: ...; report-to browser-intake-datadoghq
Report-To: { "group": "browser-intake-datadoghq",
             "max_age": 10886400,
             "endpoints": [
                { "url": " https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report" }
             ] }
```

### Policy embedded in a <meta> HTML tag

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## Violation reports examples

Each browser interprets the reports format differently:

{{< tabs >}}
{{% tab "Firefox" %}}
```json
{
  'csp-report': {
    'blocked-uri': 'https://evil.com/malicious.js',
    'document-uri': 'http://localhost:8000/',
    'original-policy': 'script-src http://good.com; report-uri http://127.0.0.1:8000/csp_reports',
    referrer: '',
    'violated-directive': 'script-src'
  }
}
```
{{% /tab %}}

{{% tab "Chrome" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src-elem',
    'effective-directive': 'script-src-elem',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    disposition: 'enforce',
    'blocked-uri': 'https://evil.com/malicious.js',
    'status-code': 200,
    'script-sample': ''
  }
}
```
{{% /tab %}}

{{% tab "Safari" %}}
```json
{
  'csp-report': {
    'document-uri': 'http://localhost:8000/',
    referrer: '',
    'violated-directive': 'script-src good.com',
    'effective-directive': 'script-src',
    'original-policy': 'trusted-types toto; script-src good.com; report-uri http://127.0.0.1:8000/csp_reports',
    'blocked-uri': 'https://evil.com',
    'status-code': 200
  }
}
```
{{% /tab %}}
{{< /tabs >}}[1]: https://web.dev/csp/
