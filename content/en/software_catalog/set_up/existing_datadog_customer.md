---
title: Existing Datadog Customer
further_reading:
  - link: "/tracing/software_catalog/setup/"
    tag: "Documentation"
    text: "Setting Up Software Catalog"
---

## APM, USM, RUM Users

Datadog Software Catalog is pre-populated with entries detected through [APM][5], eBPF-based autodiscovery with [Universal Service Monitoring][6], and RUM applications.

With APM, Datadog can automatically discover the dependencies for an instrumented service, such as a database, a queue, or a third-party dependencies, even if that dependency hasn't been instrumented yet. These uninstrumented dependencies are categorized as separate *services*. Datadog changed service names of client spans (span.kind:client) to represent dependencies of your instrumented services. For example, a span representing a client call from a service auth-dotnet to a PostgreSQL database would be tagged with service:auth-dotnet-postgres. 

If you are using APM and would like to remove the automatically named *services* from your Software Catalog and Service Map, you can opt in to new [inferred entities experience][7], which allows you to filter Software Catalog entries by entity type, such as database, queue, or third-party dependencies. You can optionally [remove][8] any [service overrides][9] like service:my-service-http-client from your catalog or map.

For information about discovering endpoints, see [Discovering Endpoints from APM][10].

## Infrastructure and Logs Users

To discover additional services through existing Datadog telemetry such as infrastructure metrics, navigate to the [**Setup & Config** tab][1] on the top of the page and click on the **Import Entries** tab. You can import services from other Datadog telemetry containing the `DD_SERVICE` [tag][2].

{{< img src="tracing/software_catalog/import_entries.png" alt="Import Entries tab in the Software Catalog setup and configuration section" style="width:90%;" >}}

After you have imported some entries, they appear in the **Explore** tab. Entries may expire unless you add metadata such as the owner or contacts by [using the API][3] or the [GitHub integration][4].

To remove your imported services from the default **Explore** view, click **Clear Previously Imported Services**. This removes all services that do not have metadata or do not have APM, Universal Service Monitoring (USM), or Real User Monitoring (RUM) telemetry.

{{< img src="tracing/software_catalog/clear_imported_services.png" alt="Confirm the deletion of previously imported services in the Software Catalog setup and configuration section" style="width:90%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/services/settings/get-started
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/software_catalog/service_definition_api/
[4]: /integrations/github/
[5]: /tracing/
[6]: /universal_service_monitoring/
[7]: /tracing/services/inferred_services
[8]: /tracing/guide/service_overrides/#remove-service-overrides
[9]: /tracing/guide/service_overrides/
[10]: /software_catalog/service_definitions/#add-metadata-with-automation

