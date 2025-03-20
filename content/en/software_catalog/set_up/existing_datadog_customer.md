---
title: Existing Datadog Customer
further_reading:
  - link: "/tracing/software_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Software Catalog"
---

Learn how Software Catalog discovers services from Datadog APM, USM, RUM, infrastructure metrics, and logs.

## APM, USM, RUM Users

Datadog Software Catalog is pre-populated with entries detected through [APM][5], eBPF-based autodiscovery with [Universal Service Monitoring][6], and RUM applications.

**Note:** 
Datadog APM automatically discovers dependencies--such as databases, queues, and third-party dependencies--for instrumented services, even if the dependencies haven't been instrumented yet. These un-instrumented dependencies are each categorized as *services*, and Datadog applies their names to service tags on client spans (`span.kind:client`). For example, a client span representing a client call from a service `auth-dotnet` to a PostgreSQL database would be tagged with `service:auth-dotnet-postgres`. 

If you are using APM and would like to remove the automatically named *services* from your Software Catalog and Service Map, you can opt in to [inferred entities][7] to filter Software Catalog entries by entity type, such as database, queue, or third-party dependencies. You can optionally [remove service overrides][8] like `service:my-service-http-client` from your catalog or map.

For information about discovering endpoints, see [Discovering Endpoints from APM][10].

## Infrastructure and Logs Users

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
[10]: /software_catalog/service_definitions/#add-metadata-with-automation
[11]: https://app.datadoghq.com/software/settings/get-started?currentTab=import

