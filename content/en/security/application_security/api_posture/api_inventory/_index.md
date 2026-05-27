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

API security relies on visibility. The biggest failure mode in most applications isn't missed vulnerabilities, it's missed APIs.

[API Inventory][1] provides a comprehensive, up-to-date catalog and risk assessment of all API endpoints and services in your environment.

**Inventory** is comprised of explorers that correspond to distinct layers in the API security lifecycle:

1. **API Endpoints:** *What APIs exist, and what risk do they expose?*
    
    Each API endpoint is a unique entry point where data or functionality can be accessed. The API Endpoints explorer enables shadow API (undocumented endpoints with no API definition and not detected from Amazon API Gateway) and orphan API (documented endpoints without traffic) detection, asset management, and risk prioritization at the granularity attackers exploit.

2. **Services:** *Where do risky APIs live, who owns them, and how severe is their collective risk?*
    
    A service groups multiple endpoints into a logical or deployed component (typically aligned with a microservice, app, or backend system).

These explorers correspond to the common API security operational flow:

1. **Discover:** Identify what endpoints exist using **API Endpoints**.
2. **Contextualize:** Identify ownership and dependencies using **Services**.

Findings detected against endpoints in your inventory appear in [API Findings][2]. Each endpoint row in the API Endpoints explorer displays a findings chip; selecting it opens the finding in API Findings.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /security/application_security/api_posture/api_findings/
