---
title: API Security Inventory
kind: documentation
---

<div class="alert alert-info">API Security Inventory is in beta.</div>

## Overview

API Security Inventory monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Production status**: If the API is running in a production environment.
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: If the endpoint is targeted by attacks (powered by [Application Threat Management][2]).
- **Vulnerabilities**: If the endpoint contains a vulnerability (powered by [Application Vulnerability Management][3]).

Using the API Security Inventory you can:

- See at a glance your publicly exposed endpoints that are not requiring authenticated requests.
- See at a glance your publicly exposed endpoints that are handling sensitive data, such as payment card numbers.
- See which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection](/security/application_security/threats/) service for further investigation or response.

{{< img src="security/application_security/api/welcome.png" alt="API Security Inventory main page">}}

## How to Enable

If your library is configured to use [Remote Configuration][1], the following tracer versions
are compatible without any additional configuration.

|Technology|Minimum version|
|----------|----------|
|Python    | v2.1.6   |

## How it works

API Inventory leverages the Datadog tracing library with [ASM enabled](/security/application_security/enabling/) to gather security metadata about API traffic, including the API schema, types of sensitive data processed, and the authentication scheme.


- [Threat Monitoring and Protection](/security/application_security/threats/), and
- [Vulnerability Management](/security/application_security/vulnerability_management/)

API Inventory Security leverages [Remote Configuration][4] to manage and configure scanning rules detecting sensitive data and authentication.

The following risks are calculated for each endpoint:

### Service in production

The `env` tag is checked for patterns that frequently represent non-production environments. For example, detecting `dev`, `alpha`, `beta`, `sandbox`, and similar values will mark the environment as non-production. All other environments are marked as production.


### Service under attack

This risk is detected for API endpoints that have experienced [attacks](/security/application_security/threats/) within the last week.

### Processing sensitive data

[ASM](/security/application_security/threats/) matches known patterns for sensitive data in API requests. If anything matches, that endpoint is tagged with the type of sensitive data processed.

<div class="alert alert-info">
Sensitive data scanning in API responses is planned, but is not currently available.
</div>

The matching happens entirely in your application, and none of the sensitive data is sent to Datadog.

The currently supported sensitive data categories are:

- `pii` (Personally Identifiable Information), detecting:
  - Canadian social insurance numbers
  - United States social security numbers
  - UK national insurance numbers
  - US vehicle identification numbers
  - Passport numbers
- `payments`:
  - Credit card numbers
 
### Publicly Accessible

We mark an endpoint as public if the client IP address is not within one of these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header](/security/application_security/threats/library_configuration/#configuring-a-client-ip-header) for more information on the required library configuration.

### Unauthenticated endpoint

Authentication is determined by:

- The presence of `Authorization`, `Token` or `X-Api-Key` headers.
- The presence of a user id within the trace (example, the `@usr.id` APM attribute).
- The request has responded with a 401 or 403 status code.

### Contains exploitable vulnerabilities

This risk is determined by [Vulnerability Management](/security/application_security/vulnerability_management/) for the service hosting the endpoint.

## Performance Impact

By default, API Security Inventory will evaluate every 10th request (10% sample rate).

[1]: /agent/remote_config/
[2]: /security/application_security/threats/
[3]: /security/application_security/vulnerability_management/
