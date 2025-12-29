---
title: Discover Entities
disable_toc: false
aliases:
  - /software_catalog/set_up/existing_datadog_user ## aliases for Existing Datadog User page
  - /software_catalog/import_entries_dd/
  - /software_catalog/enrich_default_catalog/import_entries_dd
  - /service_catalog/import_entries_dd/
  - /service_catalog/enrich_default_catalog/import_entries_dd
  - /service_catalog/customize/import_entries_dd
  - /software_catalog/customize/import_entries_dd
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
---

## Overview

Software Catalog automatically discovers entities from Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), and Real User Monitoring (RUM). You can also configure it to import entities from infrastructure metrics and logs.

## Automatic discovery with APM, USM, and RUM 

Datadog Software Catalog is pre-populated with entries detected through [APM][1], eBPF-based autodiscovery with [Universal Service Monitoring][2], and RUM applications.

All automatically detected entities appear in the Component Selector within Software Catalog.

APM and USM automatically detect the following entities types: `service`,`datastore`, `queue`, `external providers`, `inferred services`, and `endpoints`. APM SDKs identify dependencies of instrumented services and classify them as databases, queues, or third-party APIs—even if those dependencies are not directly instrumented. Custom instrumentation may affect how entities are discovered and how the `service tag` is assigned. To learn more, see [APM Inferred Services][3].

RUM is responsible for discovering `frontend apps` entities.

For information about discovering endpoints, see [Discovering Endpoints from APM][5].

**Note**: The [performance metrics][6] for an entity are tied to its [primary operations][7]. If a service is detected only by USM, the performance view shows [USM metrics][9]; if a entity is detected only by APM, or by both APM and USM, the performance view shows APM [trace metrics][8].

### Managing automatically-named services 

To adjust how inferred entities appear in Software Catalog, you can:

- [Create a renaming rule][18] to identify an entity by a custom name.
- [Filter out entities][3] by type (database, queue, third-party).
- [Remove service overrides][4] such as `service:my-service-http-client` from your catalog or map.

### Correlation requirements for APM

To ensure proper auto-correlation between APM and Software Catalog, follow these best practices:

- Ensure your APM SDK and Datadog Agent versions support [inferred entities][15].
- Avoid arbitrary [service overrides][16] and use [inferred entities][15] instead. 
  - Arbitrary service overrides can make correlation unreliable and clutter your catalog. They also make Software Catalog hard to use for those unfamiliar with the override names.
- [Rename inferred entities][14], like datastores and queues, to match your team's naming conventions.
- Use [Unified Service Tagging][17] to ensure service names, environments, and versions match across APM, infrastructure, and catalog definitions.
  - In Datadog APM, a service is an identifier used to group traces and aggregate metrics, not necessarily a logical service. Define what constitutes a "service" for your organization (for example, a Kubernetes namespace, deployment, or individual pod) and apply this definition consistently across all telemetry sources. 


## Import entities from Infrastructure and Logs

You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][10] to populate the Software Catalog. To discover `kind:service` entities through Datadog infrastructure metrics or logs, navigate to the Software Catalog [**Import Entries** tab][11]. 

{{< img src="tracing/software_catalog/import_entries.png" alt="Import Entries tab in the Software Catalog setup and configuration section" style="width:90%;" >}}

After importing, entries appear in the **Explore** tab. Entries may expire unless you add metadata, such as the owner or contacts, by [using the API][12] or the [GitHub integration][13].

To remove imported services from the default **Explore** view, click **Clear Previously Imported Services** on the [**Import Entries** tab][11]. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Software Catalog setup and configuration section" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/
[2]: /universal_service_monitoring/
[3]: /tracing/services/inferred_services/
[4]: /tracing/guide/service_overrides/#remove-service-overrides
[5]: /software_catalog/endpoints/
[6]: https://app.datadoghq.com/software?lens=performance
[7]: /tracing/guide/configuring-primary-operation/
[8]: /tracing/metrics/metrics_namespace/
[9]: /universal_service_monitoring/guide/using_usm_metrics/#usm-metrics-vs-apm-metrics
[10]: /getting_started/tagging/unified_service_tagging/
[11]: https://app.datadoghq.com/software/settings/get-started
[12]: /software_catalog/apis/
[13]: /integrations/github/
[14]: /tracing/services/renaming_rules/#step-3-name-your-rule-and-review
[15]: /tracing/services/inferred_services/?tab=agentv7600#set-up-inferred-services
[16]: /tracing/guide/service_overrides/#how-service-overrides-are-set
[17]: /getting_started/tagging/unified_service_tagging/
[18]: /tracing/services/renaming_rules/
