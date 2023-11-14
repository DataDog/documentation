---
title: API Security Inventory
kind: documentation
---

## Overview

API Security Inventory monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: type of authentication used (e.g. Basic Auth, API key, etc.)
- **Public Exposure**: Whether the API is processing traffic from the internet
- **Production status**: if the API is running in production environment
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: if the endpoint is targeted by attacks (powered by Application Threat Management)
- **Vulnerabilities**:  if the endpoint contains vulnerability (powered by Application Vulnerability Management)

Using the API Security Inventory you can:

- see at a glance your publicly exposed endpoints, which are not requiring authenticated requests
- see at a glance your publicly exposed endpoints, which are handling sensitive data, such as payment card numbers
- see which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection](/security/application_security/threats/) service for further investigation or response

{{< img src="security/application_security/api/welcome.png" alt="API Security Inventory main page">}}

## How Does it Work?

API Inventory leverages the datadog tracing library with [ASM enabled](/security/application_security/enabling/) to gather security metadata about API traffic, including the API schema, types of sensitive data processed and the authentication scheme.


- [Threat Monitoring and Protection](/security/application_security/threats/), and
- [Vulnerability Management](/security/application_security/vulnerability_management/)

API Inventory Security leverages remote configuration to manage and configure scanning rules detecting sensitive data and authentication.

For each endpoint we calculate the risks outlined below.

### Service in Production

The `env` tag is checked for patterns that frequently represent non-production environments. For example, detecting `dev`, `alpha`, `beta`, `sandbox`, and similar valuesm, will mark the environment as a non-production one.

All other environments are marked as production.

### Service Under Attack

This risk is detected for API endpoints that have experienced [attacks](/security/application_security/threats/) in the selected timeframe. 

### Processing Sensitive Data

[ASM](/security/application_security/threats/) matches known patterns for sensitive data in both API requests and responses. If anything matches, that endpoint is tagged with the type of sensitive data processed.

The matching happens entirely in your application, and none of the sensitive data is sent to Datadog.

The currently supported sensitive data categories are:

- `PII` (Personally Identifiable Information), detecting:
  - Canadian social insurance numbers
  - UK national insurance numbers
  - US vehicle identification numbers
  - Passport numbers
 
### Publicly Accessible

We mark an endpoint as public if the client IP address is not within one of these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header](/security/application_security/threats/library_configuration/#configuring-a-client-ip-header) for more information on the required library configuration.

If the `X-Forwarded-For` header is present in the request, this risk will be determined against this header's value.

### Unauthenticated Endpoint

Authentication is determined by:

- the presence of `Authorization`, `Token` or `X-Api-Key` headers
- the presence of a user id within the trace (i.e. the `@usr.id` APM attribute)
- the request has responded with the 401 or 403 status code

### Contains Exploitable Vulnerabilities

This risk is determined by [Vulnerability Management](/security/application_security/vulnerability_management/) for the service hosting the endpoint.

## Performance Impact

By default, API Security Inventory will evaluate every 10th request (10% sample rate).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

