---
title: Endpoint Scanning
description: Verify whether discovered API endpoints are publicly accessible and require authentication.
---

Endpoint Scanning is an opt-in App and API Protection (AAP) feature that actively tests discovered API endpoints and enriches the [API Security Inventory][1] with verified security posture data.

Instead of relying only on observed traffic, Endpoint Scanning probes endpoints from outside your environment to verify how they respond.

## What Endpoint Scanning verifies

For each scanned endpoint, Datadog records:

- **Authentication status**: Whether the endpoint requires authentication.
- **Public accessibility**: Whether the endpoint is reachable without credentials.
- **HTTP response status**: The status code returned by the endpoint.
- **Last evaluation timestamp**: When the endpoint was last scanned.

Use this information to prioritize exposed endpoints, confirm whether important APIs enforce authentication, and investigate API findings with stronger evidence about the endpoint's current behavior.

## Eligible endpoints

Endpoint Scanning currently probes endpoints discovered through distributed tracing.

Endpoints discovered only from static source code, Software Catalog API definitions, or Amazon API Gateway are not scanned.

## How scans run

Endpoint Scanning is off by default. After you enable it, Datadog scans eligible endpoints in the background on a recurring cadence. Scans run in batches, and endpoints are retested approximately every seven days.

Scans use `GET` requests to verify reachability and authentication posture.

## Enable Endpoint Scanning

Endpoint Scanning is off by default. To enable it, go to [App and API Protection settings][2] and turn on **Endpoint Scanning** in **API Testing and Endpoint Scanning**.

After you enable Endpoint Scanning, results appear in the [API Endpoints][3] explorer as Datadog scans eligible endpoints.

[1]: /security/application_security/api_security/api_inventory/
[2]: https://app.datadoghq.com/security/configuration/asm/api-security-testing
[3]: https://app.datadoghq.com/security/appsec/inventory/apis
