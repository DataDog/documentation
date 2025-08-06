---
title: Streamline the Development Lifecycle with CI Visibility
aliases:
  - /tracing/software_catalog/use_cases/pipeline_visibility
  - /service_catalog/use_cases/pipeline_visibility
  - /service_catalog/use_cases/streamlining-development-lifecycle-with-ci-visibility/
  - /tracing/service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /service_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /tracing/service_catalog/use_cases/pipeline_visibility
  - /tracing/software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /software_catalog/guides/streamlining-development-lifecycle-with-ci-visibility
  - /service_catalog/use_cases/ci_visibility
  - /software_catalog/use_cases/ci_visibility
  - /software_catalog/use_cases/pipeline_visibility
further_reading:
  - link: "/security/code_security/static_analysis/"
    tag: "Documentation"
    text: "Static Analysis"
  - link: "/dora_metrics/"
    tag: "Documentation"
    text: "DORA Metrics"
  - link: "https://www.datadoghq.com/blog/memory-leak-workflow/"
    tag: "Blog"
    text: "Investigate memory leaks and OOMs with Datadog's guided workflow"
  - link: "https://www.datadoghq.com/blog/shift-left-datadog-service-catalog/"
    tag: "Blog"
    text: "Improve your shift-left observability with the Datadog Service Catalog"
---


The Delivery tab in Software Catalog helps you assess and optimize your service's pre-production status by providing insights into CI pipelines and static analysis violations. 

{{< img src="tracing/software_catalog/pipeline-visibility-software-delivery.png" alt="The Delivery tab for monitoring pre-production status in Software Catalog" style="width:100%;" >}}

With Delivery, you can:

- Monitor the performance of CI pipelines related to your services.
- Identify security and code quality issues from [Static Analysis][1].
- Troubleshoot pre-production slowdowns and failures.
- Track Change Lead Time by integrating with [DORA Metrics][2].

By default, your service is linked to CI pipelines through its repository URL. To add or remove a pipeline associated with your service:

1. Click on your service in [Software Catalog][4] to open the service side panel, click on the Ownership tab, and find the edit options for Entity Metadata.

   **Note**: This is only available for Software Catalog schema v2.2 and above.

   {{< img src="tracing/software_catalog/edit_metadata.png" alt="The detailed side panel view for a service, highlighting metadata editing options" style="width:100%;" >}}

2. Edit the service metadata to add or remove a pipeline:

   - **Edit in UI**: Find the Software Delivery section, then search for and select the pipelines you want to associate with the service.

      {{< img src="tracing/software_catalog/pipeline-visibility-update-metadata.png" alt="The configuration page for updating service metadata, featuring the Software Delivery field for adding and removing related pipelines" style="width:100%;" >}}

   - **Edit in GitHub**: Manually add a pipeline fingerprint under `ci-pipeline-fingerprints` in the service metadata YAML file (see [this example][6]). To find a pipeline's fingerprint, go to the [Pipelines][5] page, click on the pipeline, and select the gear icon. 

      {{< img src="tracing/software_catalog/pipeline-visibility-pipeline-fingerprint.png" alt="An example of a pipeline fingerprint" style="width:100%;" >}}

For more details on CI status and static analysis violations for the pipelines associated with a particular service, click on the service and navigate to the **Delivery** tab.

{{< img src="tracing/software_catalog/delivery_tab.png" alt="The Delivery tab for a service, showing pipeline information like success rate and date of last execution" style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/static_analysis/
[2]: /dora_metrics/
[4]: https://app.datadoghq.com/software
[5]: https://app.datadoghq.com/ci/pipelines
[6]: /software_catalog/service_definitions/v2-2/#example-yaml
