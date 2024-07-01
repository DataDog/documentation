---
title: Streamlining the Development Lifecycle with CI Visibility
kind: guide
aliases:
  - /tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
further_reading:
- link: /tracing/service_catalog/
  tag: Documentation
  text: Datadog Service Catalog
- link: /continuous_integration/search/?tab=pipelines
  tag: Documentation
  text: Datadog CI Pipeline Visibility
---

In the Delivery view in Service Catalog, you can view CI pipeline and static analysis results associated to your services.

By default, your service is associated to [CI pipeline(s)][4] through repository URL. 
You can edit the pipelines associated with each service by modifying the `ci-pipeline-fingerprints` field in your [service metadata][5].

To add or remove a pipeline associated to your service, click `Edit Metadata` in your service page, and go to Software Delivery. Please note that this is only available for [Service Catalog schema v2.2][7].

{{< img src="tracing/service_catalog/service_catalog_delivery_lens.png" alt="The delivery view in the service catalog" >}}

There are two ways to add or remove an associated pipeline:

1. Search for and select the pipelines you want to associate.
{{< img src="tracing/service_catalog/add_pipelines_to_service.png" alt="Edit or add a pipeline in the UI" >}}

2. Add the pipeline fingerprint directly to the service metadata. You can locate a pipeline's fingerprint by clicking on a pipeline in the [Pipelines][6] page, then click the gear icon:
{{< img src="tracing/service_catalog/pipeline-fingerprint-location.png" alt="Pipeline fingerprint location." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /tracing/service_catalog/service_definition_api/
[3]: /continious-integration/pipelines/
[4]: /continuous_integration/
[5]: /tracing/service_catalog/service_metadata_structure
[6]: https://app.datadoghq.com/ci/pipelines
[7]: /tracing/service_catalog/adding_metadata/#metadata-structure-and-supported-versions
