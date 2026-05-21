---
title: Endpoint Scanning
description: Verify whether discovered API endpoints are publicly accessible and require authentication.
---

<div class="alert alert-warning">Endpoint Scanning is in Preview and is subject to change.</div>

Endpoint Scanning probes your API endpoints from outside your environment and records their HTTP responses, rather than inferring behavior from observed traffic. The results enrich the [API Inventory][2] with verified authentication and visibility data.

<div class="alert alert-info">
<strong>Note:</strong>
<ul>
  <li>Endpoint Scanning sends only <code>GET</code> requests. It does not call <code>POST</code>, <code>PUT</code>, <code>PATCH</code>, or <code>DELETE</code> endpoints, and never modifies data on your endpoints.</li>
  <li>At this time, Endpoint Scanning only scans endpoints that AAP discovers from APM traces.</li>
</ul>
</div>

## What Endpoint Scanning verifies

For each scanned endpoint, Datadog records:

- **Authentication status**: Whether the endpoint requires authentication.
- **Public visibility**: Whether the endpoint is reachable without credentials.
- **HTTP response status**: The status code returned by the endpoint.
- **Last evaluation timestamp**: When the endpoint was last scanned.

Use this information to prioritize exposed endpoints, confirm whether important APIs enforce authentication, and investigate API findings with stronger evidence about how the endpoint behaves.

## Enable Endpoint Scanning

Endpoint Scanning is off by default. To enable it:

1. In App and API Protection settings, go to [API Security Testing][3].
2. Toggle **Enable Endpoint Scanning** on.

After you enable it, Datadog scans eligible endpoints in the background in batches. Endpoints are retested approximately every seven days.

[1]: /security/application_security/
[2]: /security/application_security/api_posture/api_inventory/
[3]: https://app.datadoghq.com/security/configuration/asm/api-security-testing
