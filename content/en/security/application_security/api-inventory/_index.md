---
title: API Security Inventory
further_reading:
- link: "https://www.datadoghq.com/blog/primary-risks-to-api-security/"
  tag: "Blog"
  text: "Mitigate the primary risks to API security"
---

## Overview

[API Security Inventory][7] monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: Whether the API enforces authentication.
- **Authentication Method**: Type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: If the endpoint is targeted by attacks (powered by [App and API Protection][2]).
- **Business Logic**: Business logic and associated business logic suggestions for this API.
- **Vulnerabilities**: If the endpoint contains a vulnerability (powered by [Code Security][8] and [Software Composition Analysis][3]).
- **Findings**: Security findings found on this API.
- **Dependencies**: APIs and Databases the API depends on.

Using the API Security Inventory you can:

- See at a glance which endpoints process sensitive data, are authenticated, have vulnerabilities or findings, or are publicly available.
- See which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection][2] service for further investigation or response.
- See which endpoints are associated to your business's logic, and find business logic suggestions based on your endpoint's traffic history.

<!-- {{< img src="security/application_security/api/api_endpoints_revamp.png" alt="API Security Inventory main page">}} -->

## Configuration

To use API Security on your services, **you must have AAP Threats Protection enabled**. The following library versions are compatible with API Security Inventory. [Remote Configuration][1] is required.

|Technology|Minimum tracer version| Support for sensitive data scanning |
|----------|----------|----------|
|Python    | v2.1.6   | Requests and responses |
|Java      | v1.31.0  | Requests only |
|PHP      | v0.98.0  | Requests and responses |
|.NET Core | v2.42.0  | Requests and responses |
|.NET Fx   | v2.47.0  | Requests and responses |
|Ruby      | v1.15.0  | Requests only |
|Golang    | v1.59.0  | Requests only |
|Node.js   | v3.51.0, v4.30.0 or v5.6.0 | Requests and responses |

**Note**: On .NET Core and .NET Fx tracers, you need to set the environment variable `DD_API_SECURITY_ENABLED=true` for API Security features to work properly.

## How it works

API Inventory leverages the Datadog tracing library with AAP enabled to gather security metadata about API traffic, including the API schema, types of sensitive data processed, and the authentication scheme. API information is evaluated per endpoint, every 30 seconds, which should ensure minimal performance impact.

API Inventory Security uses [Remote Configuration][1] to manage and configure scanning rules that detect sensitive data and authentication.

The following risks are calculated for each endpoint:

### Security trace activity

See the number of [attacks][2] your API experienced within the last week.

### Processing sensitive data

[AAP][2] matches known patterns for sensitive data in API requests. If it finds a match, the endpoint is tagged with the type of sensitive data processed.

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
| American Express card number                      | `payment`        | `card`            |
| Diners Club card number                           | `payment`        | `card`            |
| JCB card number                                   | `payment`        | `card`            |
| Maestro card number                               | `payment`        | `card`            |
| Mastercard card number                            | `payment`        | `card`            |
| VISA card number                                  | `payment`        | `card`            |
| IBAN bank account number                          | `payment`        | `iban`            |

### Business logic

These tags are determined by the presence of business logic traces, associated to the endpoint.

#### Suggested business logic

We can suggest a business logic tag for your endpoint based on its HTTP method, response status codes, and URL.

### Publicly accessible

Datadog marks an endpoint as public if the client IP address is outside these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header][6] for more information on the required library configuration.

### Endpoint authentication

Authentication is determined by:

- The presence of `Authorization`, `Token` or `X-Api-Key` headers.
- The presence of a user ID within the trace (for example, the `@usr.id` APM attribute).
- The request has responded with a 401 or 403 status code.

Datadog reports the type of authentication when available in a header through the Authentication Method facet.

#### Supported authentication methods

| Category                                          | Category facet   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| Bearer tokens (found in `Authorization` headers)  | `bearer_token`   |
| Basic Authentication                              | `basic_auth`     |
| Digest access authentication                      | `digest_auth`    |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/remote_config/
[2]: /security/workload_protection/
[3]: /security/code_security/software_composition_analysis/
[6]: /security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[7]: https://app.datadoghq.com/security/appsec/inventory/apis
[8]: /security/code_security/iast/
