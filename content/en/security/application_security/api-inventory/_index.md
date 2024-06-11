---
title: API Security Inventory
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary risks to API security"
---

## Overview

[API Security Inventory][7] monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: Type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Production status**: If the API is running in a production environment.
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: If the endpoint is targeted by attacks (powered by [Application Threat Management][2]).
- **Vulnerabilities**: If the endpoint contains a vulnerability (powered by [Software Composition Analysis][3]).

Using the API Security Inventory you can:

- See at a glance your publicly exposed endpoints that are not requiring authenticated requests.
- See at a glance your publicly exposed endpoints that are handling sensitive data, such as payment card numbers.
- See which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection][2] service for further investigation or response.

{{< img src="security/application_security/api/api_endpoints.png" alt="API Security Inventory main page">}}

## Configuration

The following library versions are compatible with API Security Inventory. [Remote Configuration][1] is required.

|Technology|Minimum version| Support for sensitive data scanning |
|----------|----------|----------|
|Python    | v2.1.6   | Requests and responses |
|Java      | v1.31.0  | Requests only |
|PHP      | v0.98.0  | Requests and responses |
|.NET Core | v2.42.0  | Requests and responses |
|.NET Fx   | v2.47.0  | Requests and responses |
|Ruby      | v1.15.0  | Requests only |
|Golang    | v1.59.0  | Requests only |
|Node.js   | v3.51.0, v4.30.0 or v5.6.0 | Requests and responses |

## How it works

API Inventory leverages the Datadog tracing library with [ASM enabled][5] to gather security metadata about API traffic, including the API schema, types of sensitive data processed, and the authentication scheme.

API Inventory Security uses [Remote Configuration][4] to manage and configure scanning rules that detect sensitive data and authentication.

The following risks are calculated for each endpoint:

### Service in production

The `env` tag is checked for patterns that frequently represent non-production environments. For example, if it detects values of `dev`, `alpha`, `beta`, `sandbox`, or similar, it marks the environment as non-production. All other environments are marked as production.


### Service under attack

This risk is detected for API endpoints that have experienced [attacks][2] within the last week.

### Processing sensitive data

[ASM][2] matches known patterns for sensitive data in API requests. If it finds a match, the endpoint is tagged with the type of sensitive data processed.

The matching occurs within your application, and none of the sensitive data is sent to Datadog.

#### Supported data types

| Category                                          | Category facet   | Type facet        |
|---------------------------------------------------|------------------|-------------------|
| Canadian social insurance numbers                 | `pii`            | `canadian_sin`    |
| United States social security numbers             | `pii`            | `us_ssn`          |
| UK national insurance numbers                     | `pii`            | `uk_nin`          |
| US vehicle identification numbers                 | `pii`            | `vin`             |
| Passport numbers                                  | `pii`            | `passport_number` |
| E-mail addresses                                  | `pii`            | `email`           |
| JSON Web Token (JWT)                              | `credentials`    | `json_web_token`  |
| Bearer tokens (found in `Authorization` headers)  | `credentials`    | `bearer_token`    |
| American Express card number                      | `payment`        | `card`            |
| Diners Club card number                           | `payment`        | `card`            |
| JCB card number                                   | `payment`        | `card`            |
| Maestro card number                               | `payment`        | `card`            |
| Mastercard card number                            | `payment`        | `card`            |
| VISA card number                                  | `payment`        | `card`            |
| IBAN bank account number                          | `payment`        | `iban`            |
 
### Publicly accessible

Datadog marks an endpoint as public if the client IP address is outside these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header][6] for more information on the required library configuration.

### Unauthenticated endpoint

Authentication is determined by:

- The presence of `Authorization`, `Token` or `X-Api-Key` headers.
- The presence of a user ID within the trace (for example, the `@usr.id` APM attribute).
- The request has responded with a 401 or 403 status code.

### Contains exploitable vulnerabilities

This risk is determined by [Software Composition Analysis][3] for the service hosting the endpoint.

## Performance impact

By default, API Security Inventory evaluates every tenth request (10% sample rate).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[2]: /security/application_security/threats/
[3]: /security/application_security/software_composition_analysis/
[4]: /agent/remote_config/
[5]: /security/application_security/enabling/
[6]: /security/application_security/threats/library_configuration/#configuring-a-client-ip-header
[7]: https://app.datadoghq.com/security/appsec/inventory/apis
