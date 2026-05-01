---
title: Endpoint Scanning
description: Verify whether discovered API endpoints are publicly accessible and require authentication.
---

Endpoint Scanning is an opt-in [App and API Protection][1] (AAP) feature. Instead of inferring endpoint behavior from observed traffic, Datadog scans your endpoints from outside your environment to verify how they respond. The results enrich the [API Security Inventory][2] with verified authentication and accessibility data.

<div class="alert alert-info">Endpoint Scanning only scans endpoints AAP has discovered from APM traces.</div>

## What Endpoint Scanning verifies

For each scanned endpoint, Datadog records:

- **Authentication status**: Whether the endpoint requires authentication.
- **Public accessibility**: Whether the endpoint is reachable without credentials.
- **HTTP response status**: The status code returned by the endpoint.
- **Last evaluation timestamp**: When the endpoint was last scanned.

Use this information to prioritize exposed endpoints, confirm whether important APIs enforce authentication, and investigate API findings with stronger evidence about how the endpoint behaves.

## Enable Endpoint Scanning

Endpoint Scanning is off by default. To enable it:

1. In App and API Protection settings, go to [API Security Testing][3].
2. Toggle **Enable Endpoint Scanning** on.

After you enable it, Datadog scans eligible endpoints in the background in batches, using `GET` requests. Endpoints are retested approximately every seven days.

[1]: /security/application_security/
[2]: /security/application_security/api_security/api_inventory/
[3]: https://app.datadoghq.com/security/configuration/asm/api-security-testing
