---
title: API Posture
description: Discover API endpoints, assess endpoint risk, and verify endpoint behavior with API Posture in App and API Protection.
---

API Posture in Datadog [App and API Protection][1] (AAP) helps you discover API endpoints, understand the risk they expose, and verify how they behave.

API Inventory provides the catalog and risk view: it lists the APIs in your environment, the services that own them, and the findings tied to each. Endpoint Scanning enriches the inventory by actively scanning eligible endpoints to confirm whether they are publicly accessible and whether they require authentication.

{{< whatsnext desc="Explore API Posture capabilities:" >}}
    {{< nextlink href="/security/application_security/api_posture/api_inventory/" >}}API Inventory: View and triage API endpoints, services, and API findings in one place.{{< /nextlink >}}
    {{< nextlink href="/security/application_security/api_posture/endpoint_scanning/" >}}Endpoint Scanning: Actively scan discovered endpoints to verify public accessibility and authentication status.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /security/application_security/
