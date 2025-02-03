---
title: Streamline the Development Lifecycle with CI Visibility
aliases:
  - /service_catalog/use_cases/pipeline_visibility
  - /service_catalog/use_cases/streamlining-development-lifecycle-with-ci-visibility/
  - /tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /tracing/service_catalog/use_cases/pipeline_visibility
further_reading:
  - link: "/security/code_security/static_analysis/"
    tag: "Documentation"
    text: "Learn about Datadog Static Analysis"
  - link: "/dora_metrics/"
    tag: "Documentation"
    text: "Learn about DORA Metrics"
---


The Software Delivery tab in Service Catalog helps you assess and optimize your service’s pre-production status by providing insights into CI pipelines and static analysis violations. You can:

- Monitor the performance of CI pipelines related to your services.
- Identify security and code quality issues from [Static Analysis][1].
- Troubleshoot pre-production slowdowns and failures.
- Track Change Lead Time by integrating with [DORA Metrics][2].

By default, your service is linked to CI pipelines through its repository URL. To modify associated pipelines, update the `ci-pipeline-fingerprints` field in your service metadata.

To add or remove a pipeline associated with your service:

1. Click Edit Metadata in your service page, and go to Software Delivery. **Note**: This is only available for [Service Catalog schema v2.2][3].

   {{< img src="tracing/service_catalog/pipeline-visibility-software-delivery.png" alt="The Delivery tab for monitoring pre-production status in Service Catalog" style="width:100%;" >}}

2. Then, you can either:

   1. Search for and select the pipelines you want to associate.

      {{< img src="tracing/service_catalog/pipeline-visibility-update-metadata.png" alt="The configuration page for updating service metadata, featuring the Software Delivery field for adding and removing related pipelines" style="width:100%;" >}}

   2. Manually add a pipeline fingerprint to the service metadata. To find a pipeline’s fingerprint, go to the Pipelines page, click on the pipeline, and select the gear icon.

      {{< img src="tracing/service_catalog/pipeline-visibility-pipeline-fingerprint.png" alt="An example of a pipeline fingerprint" style="width:100%;" >}}

For more details on CI status and static analysis violations, click on a service to review the status of each pipeline and rule violation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /dora_metrics/
[3]: /service_catalog/service_definitions/v2-2/
