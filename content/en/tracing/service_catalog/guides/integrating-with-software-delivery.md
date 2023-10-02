---
title: Integrating with Software Delivery
kind: guide
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

In the Software Delivery lens you can see data from your pipeline executions associated to your services. 

By default, the pipelines are associated to your service by matching the repository URLs with the ones in CI Visibility. 
However, you might want more control into what pipelines match with your services. You can configure the pipelines associated 
with each service by editing the `ciPipelineFingerprints` field in your service metadata.

To add a pipeline via the UI, click on `Edit Metadata` in your service and go to Software Delivery. There you will be able to 
select the pipelines you want. You can also add the pipeline fingerprint directly to the service metadata metadata. You can find
the pipeline fingerprint for one pipeline by clicking on a pipeline in the pipelines page:

{{< img src="tracing/service_catalog/pipeline-fingerprint-information.png" alt="Pipeline fingerprint location." >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apm/services
[2]: /tracing/service_catalog/service_definition_api/
[3]: /continious-integration/pipelines/
