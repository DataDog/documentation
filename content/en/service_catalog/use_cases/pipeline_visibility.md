---
title: Streamline the Development Lifecycle with CI Visibility
aliases:
  - /service_catalog/use_cases/pipeline_visibility
  - /service_catalog/use_cases/streamlining-development-lifecycle-with-ci-visibility/
  - /tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
further_reading:
  - link: "/tracing/service_catalog/"
    tag: "Documentation"
    text: "Datadog Service Catalog"
---

The Software Delivery tab in Service Catalog provides several ways to assess and improve the pre-production status of your services. This includes understanding the status of your CI pipelines and viewing your static analysis violations. You can:

- View performance of the CI pipelines related to your services.
- Find security and code quality issues from Static Analysis.
- Easily pivot from Service Catalog to troubleshoot pre-production slowdowns and failures.
- See your Change Lead Time by integrating with DORA Metrics.

By default, your service is associated with CI pipeline(s) through a repository URL. You can edit the pipelines associated with each service by modifying the ci-pipeline-fingerprints field in your service metadata.

To add or remove a pipeline associated with your service, click Edit Metadata in your service page, and go to Software Delivery. Please note that this is only available for Service Catalog schema v2.2.

{{< img src="tracing/service_catalog/pipeline-visibility-software-delivery.png" alt="The Delivery tab for monitoring pre-production status in Service Catalog" style="width:100%;" >}}

There are two ways to add or remove an associated pipeline:

1. Search for and select the pipelines you want to associate.

{{< img src="tracing/service_catalog/pipeline-visibility-update-metadata.png" alt="The configuration page for updating service metadata, featuring the Software Delivery field for adding and removing related pipelines" style="width:100%;" >}}

2. Add the pipeline fingerprint directly to the service metadata. You can locate a pipeline’s fingerprint by clicking on a pipeline in the Pipelines page, then click the gear icon:

{{< img src="tracing/service_catalog/pipeline-visibility-pipeline-fingerprint.png" alt="An example of a pipeline fingerprint" style="width:100%;" >}}

To access additional details describing your CI status and static analysis violations, click on a service and see the status of each pipeline and rule violation.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}
