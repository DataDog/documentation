---
categories:
- log collection
- security
description: 'Detect and aggregate CSP violations with Datadog'
doc_link: /integrations/content_security_policy_logs/
dependencies:
    ['https://github.com/DataDog/documentation/blob/master/content/en/integrations/content_security_policy_logs.md']
has_logo: true
integration_title: Content Security Policy Logs
is_public: true
kind: integration
name: content_security_policy_logs
public_title: Datadog-Content Security Policy logs
short_description: 'Detect CSP violations'
version: '1.0'
integration_id: "content_security_policy_logs"
further_reading:
  - link: "/getting_started/tagging/unified_service_tagging/"
    tag: "Documentation"
    text: "Learn about Unified Service Tagging"
---

## Overview

The Datadog Content Security Policy (CSP) integration sends logs to Datadog from web browsers as they interpret your CSP and detect violations. By using the CSP integration, you don't have to host or manage a dedicated endpoint to aggregate your CSP data.

For more information about CSPs, see [Google's web.dev post][1].

## Prerequisites

Before you add a directive to a CSP header, [generate a client token in your Datadog account][2].

<div class="alert alert-info">For security reasons, you must use a client token to collect logs from web browsers. You cannot use Datadog API keys to configure the Datadog Browser Logs SDK as they would be exposed client-side. For more information, see the <a href="https://docs.datadoghq.com/logs/log_collection/?tab=host#setup">client token documentation for more details</a>.</div>

## Prepare a URL for the CSP

You need a URL where browsers can send policy violation reports. The URL must have the following format:

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
```

Optionally, add the `ddtags` key (service name, the environment, and service version) to the URL to set up [Unified Service Tagging][3]:
- `env`: the application's environment.
- `service`: the service name for your application.
- `version`: the application's version.

When formatting the `ddtags` values, you must:
- Group keys and values with a colon (`:`)
- Concatenate keys and values with a comma (`,`)
- Use URL encoding

For example, given the key-value pairs `{“service”: “billingService”, “env”: “production”}`, the URL-encoded string would look like this:

```
service%3AbillingService%2Cenv%3Aproduction
```

And the final URL with tags would be:

```
https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report&ddtags=service%3AbillingService%2Cenv%3Aproduction
```

## Add the URL to the CSP

You can either embed the URL in an HTTP header (recommended), or embed it in a `<meta>` HTML tag.

### Embed the policy in an HTTP header

Datadog recommends embedding the Content Security Policy in an HTTP header. You can either use the `report-uri` directive or the `report-to` directive. The `report-to` directive will eventually supersede `report-uri`, but is not yet supported by all browsers.

- If you're using the `report-uri` directive:
  ```bash
  Content-Security-Policy: ...; report-uri https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report
  ```

- If you're using the `report-to` directive:
  ```json
  Content-Security-Policy: ...; report-to browser-intake-datadoghq
  Report-To: { "group": "browser-intake-datadoghq",
              "max_age": 10886400,
              "endpoints": [
                  { "url": " https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report" }
              ] }
  ```

### Policy embedded in a `<meta>` HTML tag

You can also embed the URL in a `<meta>` HTML tag.

```html
<meta http-equiv="Content-Security-Policy"
    content="...; report-uri 'https://csp-report.browser-intake-datadoghq.com/api/v2/logs?dd-api-key=<client -token>&dd-evp-origin=content-security-policy&ddsource=csp-report'">
```
## Violation reports examples

Each browser interprets the report format differently:

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
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://web.dev/csp/
[2]: https://app.datadoghq.com/organization-settings/client-tokens
[3]: /getting_started/tagging/unified_service_tagging
