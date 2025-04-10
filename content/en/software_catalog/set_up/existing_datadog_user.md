---
title: Discover Components in Software Catalog
further_reading:
  - link: "/tracing/software_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Software Catalog"
aliases:
    - /software_catalog/import_entries_dd/
    - /software_catalog/enrich_default_catalog/import_entries_dd
    - /service_catalog/import_entries_dd/
    - /service_catalog/enrich_default_catalog/import_entries_dd
    - /service_catalog/customize/import_entries_dd
    - /software_catalog/customize/import_entries_dd
---

Learn how Software Catalog discovers services from Datadog Application Performance Monitoring (APM), Universal Service Monitoring (USM), Real User Monitoring (RUM), infrastructure metrics, and logs.

## Automatic discovery with APM, USM, and RUM

Datadog Software Catalog is pre-populated with entries detected through [APM][5], eBPF-based autodiscovery with [Universal Service Monitoring][6], and RUM applications.

All automatically detected components appear in the Component Selector within Software Catalog.

APM and USM products are responsible for discovery of component types: `service`,`datastore`, `queue`, `external providers`, `inferred services`, and `endpoints`. APM SDKs automatically discover the dependencies for instrumented services, and classify these dependencies as databases, queues, or third-party APIs, even if these dependencies are not directly instrumented. Custom instrumentation choices may affect how the auto-discovery and audo-assigned `service` tag values. To learn more about how auto-discovery works, see [APM Inferred Services][12].

RUM is responsible for discovery of component type: `frontend apps`.

**Managing automatically-named services:**
- You can opt-in to [inferred entities][7] to filter out entities by type (database, queue, third-party).
- You can optionally [remove service overrides][8] such as `service:my-service-http-client` from your catalog or map.

For information about discovering endpoints, see [Discovering Endpoints from APM][10].

## Discover Infrastructure and Logs services

To discover services through Datadog infrastructure metrics or logs, navigate to the Software Catalog [**Import Entries** tab][11]. You can import services from Datadog telemetry containing the `DD_SERVICE` [tag][2].

{{< img src="tracing/software_catalog/import_entries.png" alt="Import Entries tab in the Software Catalog setup and configuration section" style="width:90%;" >}}

After importing, entries appear in the **Explore** tab. Entries may expire unless you add metadata, such as the owner or contacts, by [using the API][3] or the [GitHub integration][4].

To remove imported services from the default **Explore** view, click **Clear Previously Imported Services** on the [**Import Entries** tab][11]. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Software Catalog setup and configuration section" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/software/settings/get-started
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/software_catalog/service_definition_api/
[4]: /integrations/github/
[5]: /tracing/
[6]: /universal_service_monitoring/
[7]: /tracing/services/inferred_services
[8]: /tracing/guide/service_overrides/#remove-service-overrides
[9]: /tracing/guide/service_overrides/
[10]: /software_catalog/endpoints/
[11]: https://app.datadoghq.com/software/settings/get-started?currentTab=import
[12]: /tracing/services/inferred_services

