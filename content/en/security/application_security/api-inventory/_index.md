---
title: API Security Inventory
kind: documentation
---

## Overview

API Security Inventory works in tandem with the [Datadog API Catalog](tracing/api_catalog/) to surface security insights for your API assets.

Using the API Security Inventory you can:

- see at a glance your publicly exposed endpoints, which are not requiring authenticated requests
- see at a glance your publicly exposed endpoints, which are handling sensitive data, such as payment card numbers
- see which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection](/security/application_security/threats/) service for further investigation or response

{{< img src="security/application_security/api/welcome.png" alt="API Security Inventory main page">}}

## How Does it Work?

When API Inventory Security is enabled, every endpoint from the [Datadog API Catalog](tracing/api_catalog/) is cross-correlated with the detections from both:

- [Threat Monitoring and Protection](/security/application_security/threats/), and
- [Vulnerability Management](/security/application_security/vulnerability_management/)

As a prerequisite, you should have [enabled ASM](/security/application_security/enabling/) with Remote Configuration support.

For each endpoint we calculate the risks outlined below.

### Service in Production

A regular expression is applied to the `env` tag for detecting non-production environments. Environments that do not match this, are assumed to be production.

    ^(.*-)?(dev|pdev|dit|alpha|beta|lab|perf|uat|sit|sat|sandbox|pre-prod|preprod|test|develop|development|loadtest|testing|integ|int|integration|stag|stage|staging|stg|tst|ci|qa|qual|accept)\\d*(-.*)?$

### Service Under Attack

This risk is detected for API endpoints that have experienced [attacks](/security/application_security/threats/) in the selected timeframe. 

### Processing Sensitive Data

This feature relies on [the ASM client libraries](/security/application_security/threats/) being present in your application. They match known patterns for sensitive data in both API request, and the corresponding response values. If anything matches, that endpoint is marked as containing sensitive data.

The matching happens entirely in your application, and none of the sensitive data is sent to Datadog.

The currently supported sensitive data categories are:

- `PII` (Personally Identifiable Information)
 
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

