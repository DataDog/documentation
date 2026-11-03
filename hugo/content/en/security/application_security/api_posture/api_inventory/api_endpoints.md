---
title: API Endpoints
description: Monitor API traffic to assess endpoint risk, authentication, sensitive data flows, and exposure.
---

The [API Endpoints][1] explorer monitors your API traffic to provide visibility into the security posture of your APIs, including:

- **Authentication**: Whether the API enforces authentication.
- **Authentication Method**: Type of authentication used, such as Basic Auth and API key.
- **Public Exposure**: Whether the API is processing traffic from the internet.
- **Sensitive data flows**: Sensitive data handled by the API, and the flows between APIs.
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

To view API Endpoints on your services, **you must have App and API Protection Threat Detection enabled**.

For Amazon Web Services (AWS) API Gateway integration, you must set up the following:

- [Amazon Web Services][5]
- [Amazon API Gateway Integration][6]

API Endpoints are discovered from the Datadog Catalog and specifically from API definitions [uploaded to Datadog][7]. For instructions on uploading API definitions, see [Create Entities][8].

For information on what library versions are compatible with API Inventory, see [Enabling App and API Protection][9]. [Remote Configuration][10] is required.

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

API Endpoints gathers security metadata about API traffic by using the Datadog SDK with App and API Protection enabled, alongside configurations from Amazon API Gateway and uploaded API Definitions. This data includes the discovered API schema, the types of sensitive data (PII) processed, and the authentication scheme in use. The API information is continuously evaluated, helping ensure a comprehensive and up-to-date view of your entire API attack surface.

API Endpoints uses [Remote Configuration][10] to manage and configure scanning rules that detect sensitive data and authentication.

To verify whether discovered endpoints are publicly accessible and require authentication, enable [Endpoint Scanning][11]. Endpoint Scanning actively scans eligible endpoints and enriches API Inventory with verified public accessibility, authentication status, HTTP response status, and last evaluation data.

The following risks are calculated for each endpoint.

## Data sources

In the [API Endpoints][1] explorer, the {{< ui >}}Data Sources{{< /ui >}} show where visibility originates.

The following data sources are explored.

### Amazon API Gateway

<div class="alert alert-info">To disable this integration for a specific API, add the <code>dd_skip_endpoint:true</code> tag to the resource.</div>

The Amazon API Gateway service formally defines your API structure. Datadog AWS integration reads this pre-defined configuration from the Amazon API Gateway, and then Datadog uses this configuration to create API endpoint entries in {{< ui >}}Inventory{{< /ui >}}.

Use {{< ui >}}AWS API Gateway{{< /ui >}} in {{< ui >}}Data Source{{< /ui >}} to gain visibility into these exposed endpoints. You can also use the query `datasource:aws_apigateway`.

### Catalog

The {{< ui >}}Catalog{{< /ui >}} data source shows API endpoints that Datadog learned about from the formal specification uploaded to Datadog. The API specification is attached to, or registered as, a dedicated API component within the IDP service entity.

This source ensures that your API inventory is complete by including all planned and formally documented endpoints.

### APM traces

The {{< ui >}}Spans{{< /ui >}} data source shows real traffic and data exposure. Remediation should be performed in code, config, or access controls immediately.

The actions you take depend on the attack surface:

- **Vulnerabilities:** Patch any vulnerable libraries surfaced by SCA or Runtime Code Analysis, then redeploy the service.
- **API findings discovered:** Review each issue in context of the traced service, fix any code or configurations, and then validate using new traces.
- **Processing sensitive data:** Confirm data handling complies with policy, sanitize or encrypt PII, and limit access to necessary services.
- **Unauthenticated endpoint:** If the endpoint is not intentionally public, enforce authentication and update service configurations.

### Static Endpoint Discovery

<div class="alert alert-info">Static Endpoint Discovery is in Preview.</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Static Endpoint Discovery is not available for the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

The {{< ui >}}Source Code{{< /ui >}} data source shows API endpoints discovered directly from your source code. This complements runtime-based discovery by surfacing endpoints earlier in the development life cycle, including endpoints that may not receive live traffic.

To use this data source, configure the [Source Code Integration][12] with GitHub, GitLab, or Azure DevOps. The following languages and frameworks are supported:

| Language | Framework |
|----------|-----------|
| Python   | FastAPI, Flask, Tornado |
| Java     | Spring    |
| Go       | Beego, Chi, Echo, Fiber, Gin, Gorilla Mux, fasthttp, go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express, Fastify |

To filter for source code endpoints, use {{< ui >}}Source Code{{< /ui >}} in the {{< ui >}}Data Source{{< /ui >}} facet or the query `datasource:source_code`. Scans run when code is pushed to the default branch and on an 8-hour recurring schedule. Discovered endpoints are removed after 12 hours if they are not re-discovered by a subsequent scan.

#### Map source code endpoints to services

Static Endpoint Discovery uses heuristics to infer which service an endpoint belongs to. For more accurate mapping, explicitly define service-to-code relationships using the `codeLocations` field in your [Catalog service definition (v3 schema)][13]:

```yaml
apiVersion: v3
kind: service
metadata:
  name: my-service
  owner: my-team
datadog:
  codeLocations:
    - repositoryURL: https://github.com/org/myrepo.git
      paths:
        - path/to/service/code/**
```

Without explicit `codeLocations`, endpoints may not merge correctly with data from other sources.

## View and compare endpoint schemas

API Posture builds an OpenAPI schema for each endpoint from the traffic it observes. This **inferred** schema describes what your API exposes in production: its paths, parameters, request and response bodies, and authentication. When your team also publishes a **declared** schema, an OpenAPI definition registered in the Datadog Software Catalog, you can compare the two to find where the running API has diverged from its documentation.

### View an endpoint's schema

In [API Endpoints][1], click an endpoint to open its detail panel. The **Definition** section displays the endpoint's request parameters, request body, and responses. Fields that contain sensitive data are marked with the type of sensitive data observed.

{{< img src="/security/application_security/api/api_endpoint_definition_schema_cropped.png" alt="The Definition section of an endpoint's detail panel, showing its request parameters and the View Raw Schema and View Inferred Schemas buttons" style="width:100%;" >}}

When the endpoint is associated with an API in Datadog Software Catalog, the **Definition** section displays the declared OpenAPI specification. Otherwise, it displays the schema inferred from live traffic.

In the **Definition** section, you can:

- {{< ui >}}View Raw Schema{{< /ui >}}: View the displayed schema as raw YAML.
- {{< ui >}}View Inferred Schemas{{< /ui >}}: View the schema inferred from live traffic as a preview or YAML, even when a declared schema is available. The inferred schema can be exported as an OpenAPI file in YAML or JSON.

To reduce noise, the inferred schema only includes fields observed at least three times, and drops fields that haven't been observed again within 7 days. This keeps one-off traffic, such as a single malformed request or an attacker probing an endpoint with an unexpected field, from polluting the inferred schema. Otherwise, it could appear as drift when compared against the declared schema.

### Compare declared and inferred schemas

To compare inferred and declared schemas, you must:

- [Enable App and API Protection][9] on the service so endpoints are discovered from live traffic.
- Register the declared schema's OpenAPI definition in the Datadog Software Catalog. See [Create Entities][8].

The schema differences appear directly in the endpoint's schema view, highlighted by severity:

| Severity | Meaning |
|----------|---------|
| Breaking | The change likely breaks clients that rely on the declared contract, such as a field that became required or a parameter type change. |
| Warning | The change is drift worth reviewing, such as an undeclared field observed in traffic or a parameter that became optional. |
| Info | The difference is low risk, such as an endpoint that is declared but has no observed traffic. |

Differences can appear in the following areas of the schema:

- **Parameters**: A parameter added, removed, or changed from optional to required (or the reverse).
- **Request body**: A request body added, removed, or changed from optional to required (or the reverse).
- **Schema properties**: A property added, removed, changed from optional to required (or the reverse), or changed type, format, nullability, or enum values.
- **Value constraints**: A numeric or length limit (`minimum`, `maximum`, `minLength`, `maxLength`), pattern, or uniqueness constraint changed.
- **Schema composition**: A mismatch introduced in `oneOf` or `allOf` composition, or in a discriminator.
- **Responses**: A status code, response header, or content type added or removed.

To reduce noise, some differences are excluded because they don't represent meaningful contract drift:

- **Request header and cookie parameters:** They often carry values such as authentication tokens or session identifiers that aren't part of the API contract.
- **Type changes on query parameters:** Query parameters are always observed as strings in traffic, even when declared as another type, such as an integer or Boolean.
- **Removed status codes:** The inferred schema only includes status codes observed in traffic, so a declared status code that hasn't occurred yet during observation always appears as removed.
- **`anyOf` composition mismatches:** The declared and inferred schemas can use `anyOf` at different levels of the schema while remaining equivalent.

## Processing sensitive data

App and API Protection detects and classifies sensitive data processed by your endpoints, tagging each endpoint with the category and type of data found. To see which endpoints process sensitive data and to create custom API data scanners, see [Sensitive Data][16].

## Business logic

These tags (`users.login.success`, `users.login.failure`, etc.) are determined by the presence of business logic traces associated with the endpoint.

<div class="alert alert-tip">Datadog can suggest a business logic tag for your endpoint based on its HTTP method, response status codes, and URL.</div>

## Publicly accessible

Datadog marks an endpoint as public if the client IP address is outside these ranges:

- 10.0.0.0/8
- 172.16.0.0/12
- 192.168.0.0/16
- 169.254.1.0/16

See [Configuring a client IP header][14] for more information on the required library configuration.

## Endpoint authentication

Authentication is determined by:

- The presence of `Authorization`, `Token`, or `X-Api-Key` headers.
- The presence of a user ID within the trace (for example, the `@usr.id` APM attribute).
- A 401 or 403 status code returned by the endpoint.
- Custom [Endpoint Tagging][15] rules that you configured


When the type of authentication is available, Datadog reports it in a header through the {{< ui >}}Authentication Method{{< /ui >}} facet.

### Supported authentication methods

| Category                                          | Category facet   |
|---------------------------------------------------|------------------|
| JSON Web Token (JWT)                              | `json_web_token` |
| Bearer tokens (found in `Authorization` headers)  | `bearer_token`   |
| Basic Authentication                              | `basic_auth`     |
| Digest access authentication                      | `digest_auth`    |

### Custom authentication support

Custom authentication detection is possible by configuring [Endpoint Tagging Rules][15]. These rules require the following minimum tracer versions:

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
[7]: /internal_developer_portal/catalog/entity_model/native_entities/?tab=api#native-entity-types
[8]: /internal_developer_portal/catalog/set_up/create_entities/#through-the-datadog-ui
[9]: /security/application_security/setup/
[10]: /tracing/guide/remote_config/
[11]: /security/application_security/api_posture/endpoint_scanning/
[12]: /integrations/guide/source-code-integration/
[13]: /internal_developer_portal/catalog/entity_model/
[14]: /security/application_security/policies/library_configuration/#configuring-a-client-ip-header
[15]: https://app.datadoghq.com/security/configuration/asm/trace-tagging
[16]: /security/application_security/api_posture/sensitive_data/
