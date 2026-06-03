---
title: API Inventory
description: Catalog API endpoints and services, and assess API security risk across your environment.
aliases:
  - /security/application_security/api-inventory/
further_reading:
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary risks to API security"
---

[API Inventory][1] is a continuously updated catalog of the API endpoints and services discovered across your environment. It shows security context for each endpoint, such as authentication status, public exposure, sensitive data flows, and associated findings.

Inventory consists of two explorers:

- **[API Endpoints][3]**: Each endpoint is a unique entry point where data or functionality can be accessed. The API Endpoints explorer surfaces shadow APIs (undocumented endpoints with no API definition and not detected from Amazon API Gateway) and orphan APIs (documented endpoints without traffic), and prioritizes risk at the endpoint level.
- **[Services][4]**: A service groups multiple endpoints into a logical or deployed component, typically aligned with a microservice, app, or backend system. The Services explorer shows who owns each service and its overall risk.

The rest of [API Posture][2] builds on what Inventory collects. To detect and respond to weaknesses, attacks, or misconfigurations, use [API Findings][5]. Each row in the API Endpoints explorer displays a findings chip; selecting it opens the finding in API Findings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /security/application_security/api_posture/
[3]: /security/application_security/api_posture/api_inventory/api_endpoints/
[4]: /security/application_security/api_posture/api_inventory/services/
[5]: /security/application_security/api_posture/api_findings/
