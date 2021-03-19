---
title: Serverless Tagging
kind: documentation
further_reading:
- link: "/getting_started/tagging/unified_service_tagging/#aws-lambda-functions"
  tag: "Documentation"
  text: "Unified Service Tagging"
---

{{< img src="serverless/serverless_tagging.mp4" video="true" alt="Unified Serverless Tagging" >}}

## Overview

Any tag applied to your AWS Lambda function automatically becomes a new dimension on which you can slice and dice your metrics, traces and logs.

Tags are especially powerful when consistent across the Datadog platform. First-class support is offered for the following tags: `env`, `service` and `version`.

With these tags, you can:

- Navigate seamlessly across metrics, traces, and logs with consistent tags
- Filter your functions on the Serverless Homepage
- View service data based on environment or version in a unified fashion within the Datadog app
- Organize your service map by service and environment

To tag your serverless application with `env`, `service` and `version`, see the [unified service tagging documentation][1].

Also note that Lambda function names should adhere to [Datadog's tagging convention][4]. This allows us to tie all of your function's traces, logs and metrics together seamlessly.

### The env tag

Use `env` to separate out your staging, development, and production environments. This works for any kind of infrastructure, not just for your serverless functions. As an example, you could tag your production EU Lambda functions with `env:prod-eu`.

By default, AWS Lambda functions are tagged with `env:none` in Datadog. Add your own tag to override this.

### The service tag

Add the `service` tag in order to group related Lambda functions into a service. 

The default behavior for new Datadog customers is for all Lambda functions to be grouped under the `aws.lambda` service, and represented as a single node on the Service map. Tag your functions by service to override this.

**Note:** For some Datadog customers, each Lambda function is treated as its own service. Add your own tag to override this, or reach out to Datadog Support if you would like to your account to adopt the new behavior.

### The version tag

Add the `version` tag to enable [Deployment Tracking][2].

## Organize your service map

The [Service Map][3] groups services into maps by the `env` tag, and uses the `service` tag to show relationships between services and the health of their monitors. Services are represented as individual nodes on the Service Map. The color of the nodes represents the health of the associated monitors. Tag any monitor with the same `service` tag to associate.

{{< img src="serverless/serverless_service_map.png" alt="Service Map" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[2]: /tracing/deployment_tracking/
[3]: /tracing/visualization/services_map/
[4]: /developers/guide/what-best-practices-are-recommended-for-naming-metrics-and-tags/#rules-and-best-practices-for-naming-tags
