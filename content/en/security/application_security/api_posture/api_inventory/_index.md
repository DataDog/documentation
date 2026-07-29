---
title: API Inventory
description: Catalog API endpoints and services, and assess API security risk across your environment.
aliases:
  - /security/application_security/api-inventory/
further_reading:
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary API security risks"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

[API Inventory][1] is a continuously updated catalog of the API endpoints and services API Posture discovers across your environment. It shows security context for each endpoint, such as authentication status, public exposure, sensitive data flows, and associated findings.

Inventory consists of two explorers:

- **[API Endpoints][2]**: The API Endpoints explorer catalogs your individual endpoints, surfacing shadow APIs (undocumented endpoints with no API definition and not detected from Amazon API Gateway) and orphan APIs (documented endpoints without traffic), and helps you prioritize the endpoints most at risk.
- **[Services][3]**: The Services explorer aggregates findings, vulnerabilities, and runtime signals by service, so you can assess each service's risk and security coverage.

To detect and respond to weaknesses, attacks, or misconfigurations on these endpoints, use [API Findings][4]. In the API Endpoints explorer, each row displays a findings chip that opens the related finding in API Findings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /security/application_security/api_posture/api_inventory/api_endpoints/
[3]: /security/application_security/api_posture/api_inventory/services/
[4]: /security/application_security/api_posture/api_findings/
