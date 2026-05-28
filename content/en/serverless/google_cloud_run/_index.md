---
title: Google Cloud Run
aliases:
    - /serverless/gcp
    - /serverless/google_cloud
    - /serverless/google
further_reading:
  - link: "/integrations/google-cloud-run/"
    tag: "Documentation"
    text: "Google Cloud Run Integration"
  - link: "/serverless/guide/disable_serverless"
    tag: "Documentation"
    text: "Disable Serverless Monitoring"
  - link: 'https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/'
    tag: 'Blog'
    text: 'Collect traces, logs, and custom metrics from Cloud Run services'
---

Google Cloud Run is a fully managed compute platform that lets you run stateless containers and serverless functions with automatic scaling, built-in load balancing, and pay-only-for-what-you-use billing.

Datadog provides monitoring and log collection for Cloud Run through the [Google Cloud integration][1].

Datadog also provides a solution for instrumenting your Cloud Run applications with a Serverless Agent to enable tracing, enhanced metrics, custom metrics, and direct log collection. [Enhanced metrics][2] are distinguished with the `gcp.run.container.enhanced.*` and `gcp.run.job.enhanced.*` namespaces.

For instrumentation, select your workload below for instructions.

## Choose your workload

{{< card-grid min_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Jobs" subtitle="(Preview)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Functions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Functions" subtitle="(1st generation)" >}}
{{< /card-grid >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]:/integrations/google_cloud_platform/
[2]:/integrations/google-cloud-run/#metrics
