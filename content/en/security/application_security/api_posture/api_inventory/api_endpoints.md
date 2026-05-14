---
title: API Endpoints
description: Monitor API traffic to assess endpoint risk, authentication, sensitive data flows, and exposure.
---

[API Endpoints][1] monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: Whether the API enforces authentication.
- **Authentication Method**: Type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Sensitive data flows**: Sensitive data handled by the API and flows between APIs.
- **Attack Exposure**: If the endpoint is targeted by attacks.
- **Business Logic**: Business logic and associated business logic suggestions for this API.
- **Vulnerabilities**: If the endpoint contains a vulnerability (powered by [Code Security][2] and [Software Composition Analysis][3]).
- **Findings**: Security findings identified on this API.
- **Dependencies**: APIs and Databases the API depends on.

Using API Endpoints you can:

- See which endpoints process sensitive data, are authenticated, have vulnerabilities or findings, or are publicly available.
- See which endpoints are at risk, and pivot directly into the [Threat Monitoring and Protection][4] service for further investigation or response.
- See which endpoints are associated to your business's logic, and find business logic suggestions based on your endpoint's traffic history.

## Configuration

To view API Endpoints on your services, **you must have App and API Protection Threats Protection enabled**. 

For Amazon Web Services (AWS) API Gateway integration, you must set up the following:

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

API Endpoints are discovered from the Datadog Software Catalog and specifically from API definitions [uploaded to Datadog][7]. For instructions on uploading API definitions, see [Create Entities][8].

For information on what library versions are compatible with API Posture Inventory, see [Enabling App and API Protection][9]. [Remote Configuration][10] is required.

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

API Endpoints gathers security metadata about API traffic by leveraging the Datadog SDK with App and API Protection enabled, alongside configurations from Amazon API Gateway and uploaded API Definitions. This data includes the discovered API schema, the types of sensitive data (PII) processed, and the authentication scheme in use. The API information is continuously evaluated, ensuring a comprehensive and up-to-date view of your entire API attack surface.

API Endpoints uses [Remote Configuration][10] to manage and configure scanning rules that detect sensitive data and authentication.

To verify whether discovered endpoints are publicly accessible and require authentication, enable [Endpoint Scanning][11]. Endpoint Scanning actively scans eligible endpoints and enriches API Posture Inventory with verified public accessibility, authentication status, HTTP response status, and last evaluation data.

For details on where endpoint visibility originates, see [Data sources][12].

The following risks are calculated for each endpoint.

## Business logic

These tags (`(users.login.success`, `users.login.failure`, etc.) are determined by the presence of business logic traces associated with the endpoint.

<div class="alert alert-tip">Datadog can suggest a business logic tag for your endpoint based on its HTTP method, response status codes, and URL.</div>

## Publicly accessible

Datadog marks an endpoint as public if the client IP address is outside these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header][13] for more information on the required library configuration.

## Endpoint authentication

Authentication is determined by:

- The presence of `Authorization`, `Token` or `X-Api-Key` headers.
- The presence of a user ID within the trace (for example, the `@usr.id` APM attribute).
- The request has responded with a 401 or 403 status code.
- Custom [Endpoint Tagging][14] rules that you configured


When the type of authentication is available, Datadog reports it in a header through the **Authentication Method** facet.

### Supported authentication methods

| Category                                          | Category facet   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| Bearer tokens (found in `Authorization` headers)  | `bearer_token`   |
| Basic Authentication                              | `basic_auth`     |
| Digest access authentication                      | `digest_auth`    |

### Custom Authentication support

Custom authentication detection is possible by configuring [Endpoint Tagging Rules][14]. These rules require the following minimum tracer versions:

|Technology| Minimum tracer version |
|----------|------------------------|
|Java      | v1.55.0                |
|.NET      | Coming Soon            |
|Node.js   | v5.76.0                |
|Python    | v3.17.0                |
|Ruby      | v2.23.0                |
|PHP       | v1.15.0                |
|Golang    | v2.4.0                 |

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /security/code_security/iast/
[3]: /security/code_security/software_composition_analysis/
[4]: /security/application_security/
[5]: /integrations/amazon-web-services
[6]: /integrations/amazon-api-gateway
[7]: /internal_developer_portal/software_catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /internal_developer_portal/software_catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /security/application_security/setup/
[10]: /tracing/guide/remote_config/
[11]: /security/application_security/api_posture/endpoint_scanning/
[12]: /security/application_security/api_posture/api_inventory/data_sources/
[13]: /security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[14]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
