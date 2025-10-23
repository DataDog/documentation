---
title: Software Catalog
aliases:
  - /tracing/faq/software_catalog/
  - /tracing/services/services_list/
  - /tracing/visualization/services_list/
  - /tracing/software_catalog/
  - /tracing/faq/service_catalog/
  - /tracing/service_catalog/
  - /service_catalog/
  - /software_catalog/
further_reading:
- link: "/internal_developer_portal/use_cases"
  tag: "Documentation"
  text: "Learn about Software Catalog Use Cases"
algolia:
  tags: ['software catalog']
---

{{< img src="tracing/software_catalog/software-catalog-landing-page.mp4" video=true alt="Navigating the Software Catalog" style="width:100%;" >}}

## Overview

[Software Catalog][1] provides a centralized, dynamic view of your software ecosystem, enabling teams to track ownership, monitor performance, manage dependencies, and enforce security and compliance standards.

Built on real-time telemetry and automated metadata collection, Software Catalog offers integrations with observability, security, and cost management tools. This empowers engineering, SRE, security, and platform teams to maintain visibility, streamline operations, and ensure service reliability at scale.

## What you can do in Software Catalog

Software Catalog offers multiple views to help you explore and manage your entities.

- [**Ownership**][8]: Access your team's Slack, repo, or on-call information.
- **Reliability**: Address risks by surfacing entities with recent deploys, rising error rates, open incidents, or failing monitors.
- **Performance**: Compare latency, traffic, error rate, and Apdex by environment.
- **Security**: Find vulnerable libraries and live attacks from a single list to harden security posture.
- **Costs**: Track AWS costs linked to code and infrastructure changes to control cloud spend.
- **Software Delivery**: Monitor CI pipeline health, static analysis violations, and DORA metrics to shorten delivery cycles.

See the [Use Cases documentation][4] to learn how teams use Datadog Software Catalog to centralize knowledge, streamline processes, improve operational efficiency, and more.

{{< callout url="https://www.datadoghq.com/product-preview/idp-preview-features/" d_target="#signupModal" btn_hidden="false" header="Sign up for early access to our upcoming features!" >}}
{{< /callout >}}

## What appears in Software Catalog

Software Catalog includes an entity when:
- Datadog [detects it from telemetry][5],
- You [declare it in an Entity Definition][6], or
- You [import it from a third-party source][7] such as Backstage or ServiceNow.

[Learn more][3] about entity types and how to configure them for your needs.

**Note**: 
- Use the entity type for more precise filtering than the legacy `type` filter (from the `span.type` attribute). For example, use the `datastore type` facet to filter by specific datastore technology.
- Span summaries and service and resource statistics are retained for up to 30 days. For deeper analysis on APM trace metrics, use Metric Explorer. [Learn more about data retention for APM][2].

{{< site-region region="gov" >}}
### Service types

Every monitored service is associated with a type. Datadog automatically determines type based on the `span.type` attribute attached to incoming spans data. The type specifies the name of the application or framework that the Datadog Agent is integrating with.

For example, if you use the official Flask Integration, the `Type` is set to "Web". If you are monitoring a custom application, the `Type` appears as "Custom".

The service type can be one of:

*  Cache
*  Custom
*  DB
*  Serverless function
*  Web

Some integrations alias to certain types. For example, Postgres, MySQL, and Cassandra map to the type "DB". Redis and Memcache integrations map to the type "Cache".

{{< /site-region >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: /data_security/data_retention_periods/
[3]: /internal_developer_portal/software_catalog/entity_model/entity_types
[4]: /internal_developer_portal/use_cases
[5]: /internal_developer_portal/software_catalog/set_up/discover_entities
[6]: /internal_developer_portal/software_catalog/set_up/create_entities
[7]: /internal_developer_portal/software_catalog/set_up/import_entities
[8]: /internal_developer_portal/software_catalog/set_up/ownership

