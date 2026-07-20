---
title: API Posture
description: Discover API endpoints, assess endpoint risk, and verify endpoint behavior with API Posture in App and API Protection.
further_reading:
- link: "https://www.datadoghq.com/blog/secure-api-with-datadog"
  tag: "Blog"
  text: "From discovery to defense: Securing APIs with Datadog App and API Protection"
---

Use API Posture in [App and API Protection][1] (AAP) to discover your APIs, assess the risks they expose, and track your security posture.

To get started, [set up AAP][2] on your services to discover endpoints from your live traffic. Other data sources, such as Amazon API Gateway and source code, require additional setup; see [API Endpoints][3] for details.

## How API Posture works

API Posture brings together several capabilities, all built on the same live API data. With them, you can:

- Discover which APIs exist with [API Inventory][4]. Inventory is a continuously updated catalog of the endpoints and services discovered across your environment, including those that are undocumented or no longer in use.
- Assess what each API exposes with [API Findings][5] and [Sensitive Data][6]. Findings aggregate the vulnerabilities and misconfigurations tied to your endpoints, and sensitive data tagging shows which endpoints process PII, credentials, or payment data.
- Verify which endpoints are publicly accessible, and which require authentication, using [Endpoint Scanning][7]. Endpoint Scanning probes your endpoints from outside your environment, rather than inferring behavior from observed traffic.
- Measure your organization-wide posture in the API Posture section of the [{{< ui >}}Overview{{< /ui >}} page][8]. It shows how your endpoints are discovered, which ones are exposed to attacks or process sensitive data, and your open findings by severity.
- Track your security posture against industry-standard frameworks with [Compliance][9]. It maps API security detection rules to OWASP API Security Top 10 controls and shows a real-time score of passing and failing controls across your services.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/
[2]: /security/application_security/setup/
[3]: /security/application_security/api_posture/api_inventory/api_endpoints/
[4]: /security/application_security/api_posture/api_inventory/
[5]: /security/application_security/api_posture/api_findings/
[6]: /security/application_security/api_posture/sensitive_data/
[7]: /security/application_security/api_posture/endpoint_scanning/
[8]: https://app.datadoghq.com/security/appsec/overview/summary
[9]: /security/application_security/api_posture/compliance/