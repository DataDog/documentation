---
title: Integrating with CI Visibility
kind: guide
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

In the Delivery lens, you can see CI pipeline and static analysis results associated to your services.

By default, your service is associated to [CI pipeline(s)][4] via repository URL. 
You can edit the pipelines associated with each service by modifying the `ci-pipeline-fingerprints` field in your [service metadata][5].

To add or remove a pipeline associated to your service, first click on `Edit Metadata` in your service page and go to Software Delivery. Please note that this is only available for [Service Catalog schema v2.2][7].

{{< img src="tracing/service_catalog/service_catalog_delivery_lens.png" alt="Edit add pipeline in the UI" >}}

There are two ways to add or remove an associated pipeline:

You can search for and select the pipelines you want to associate.
{{< img src="tracing/service_catalog/add_pipelines_to_service.png" alt="Edit add pipeline in the UI" >}}

You can add the pipeline fingerprint directly to the service metadata. You can find a pipeline's fingerprint by clicking on a pipeline in the [Pipelines][6] page:
{{< img src="tracing/service_catalog/pipeline-fingerprint-location.png" alt="Pipeline fingerprint location." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /tracing/service_catalog/service_definition_api/
[3]: /continious-integration/pipelines/
[4]: /continuous_integration/
[5]: /tracing/service_catalog/service_metadata_structure
[6]: https://app.datadoghq.com/ci/pipeline
[7]: /tracing/service_catalog/adding_metadata/#metadata-structure-and-supported-versions
