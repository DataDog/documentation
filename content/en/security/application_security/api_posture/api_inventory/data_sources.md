---
title: Data sources
description: Understand the sources Datadog uses to populate the API endpoint inventory.
---

In the [API Endpoints][1] explorer, the **Data Sources** show where visibility originates.

The following data sources are explored.

## Amazon API Gateway

The Amazon API Gateway service formally defines your API structure. Datadog AWS integration reads this pre-defined configuration from the Amazon API Gateway, and then Datadog uses this configuration to create API endpoint entries in **Inventory**.

Use **AWS API Gateway** in **Data Source** to gain visibility into these exposed endpoints. You can also use the query `datasource:aws_apigateway`.

## Software Catalog

The **Software Catalog** data source shows API endpoints that Datadog learned about from the formal specification uploaded to Datadog. The API specification is attached to, or registered as, a dedicated API component within the IDP service entity.

This source ensures that your API inventory is complete by including all planned and formally documented endpoints.

## APM traces

The **Spans** data source shows real traffic and data exposure. Remediation should be performed in code, config, or access controls immediately.

What actions you take depend on each of the attack surfaces:

- **Vulnerabilities:** Patch any vulnerable libraries surfaced by SCA or Runtime Code Analysis, then redeploy the service.
- **API findings discovered:** Review each issue in context of the traced service, fix any code or configurations, and then validate using new traces.
- **Processing sensitive data:** Confirm data handling complies with policy, sanitize or encrypt PII, and limit access to necessary services.
- **Unauthenticated endpoint:** If the endpoint is not intentionally public, enforce authentication and update service configurations.

## Static Endpoint Discovery

<div class="alert alert-info">Static Endpoint Discovery is in Preview.</div>

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">Static Endpoint Discovery is not available for the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

The **Source Code** data source shows API endpoints discovered directly from your source code. This complements runtime-based discovery by surfacing endpoints earlier in the development life cycle, including endpoints that may not receive live traffic.

To use this data source, configure the [Source Code Integration][2] with GitHub, GitLab, or Azure DevOps. The following languages and frameworks are supported:

| Language | Framework |
|----------|-----------|
| Python   | FastAPI, Flask, Tornado |
| Java     | Spring    |
| Go       | Beego, Chi, Echo, Fiber, Gin, Gorilla Mux, fasthttp, go-zero |
| C#       | ASP.NET Core MVC |
| Node.js  | Express, Fastify |

To filter for source code endpoints, use **Source Code** in the **Data Source** facet or the query `datasource:source_code`. Scans run when code is pushed to the default branch and on an 8-hour recurring schedule. Discovered endpoints are removed after 12 hours if they are not re-discovered by a subsequent scan.

### Map source code endpoints to services

Static Endpoint Discovery uses heuristics to infer which service an endpoint belongs to. For more accurate mapping, explicitly define service-to-code relationships using the `codeLocations` field in your [Software Catalog service definition (v3 schema)][3]:

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

[1]: https://app.datadoghq.com/security/appsec/inventory/apis
[2]: /integrations/guide/source-code-integration/
[3]: /internal_developer_portal/software_catalog/entity_model/
