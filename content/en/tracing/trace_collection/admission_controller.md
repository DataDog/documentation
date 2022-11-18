---
title: Injecting Libraries Using Admission Controller
kind: documentation
description: "Inject instrumentation libraries into applications using Cluster Agent and Admission Controller"
is_beta: true
---

{{< beta-callout url="#" btn_hidden="true">}}
  Tracing library injection using Admission Controller is in beta. 
{{< /beta-callout >}}

# Overview
With Kubernetes environment, there are two ways to instrument your application by:
* [Adding manually the instrumentation library in the application][5]
* Injecting the instrumentation library using the Admission Controller

This page provides instructions on how to inject instrumentation libraries in your applications with the [Datadog Admission Controller][2].
With this approach, Datadog agent leverages the Kubernetes Admission Controller concept to intercept requests to the Kubernetes API and mutate new pods to inject selected instrumentation library.

<div class="alert alert-warning">Library injection will be applied on new pods only and does not have any impact on running pods</div>

To know more about Kubernetes Admission Controller, see [Kubernetes Admission Controllers Reference][6].

## Container registery
Datadog publishes instrumentation libraries images in gcr.io, AWS’ ECR, and on Docker Hub:
| Language   | gcr.io                              | hub.docker.com                              | public.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | gcr.io/datadoghq/dd-lib-java-init   | hub.docker.com/r/datadog/dd-lib-java-init   | public.ecr.aws/datadog/dd-lib-java-init   |
| Javascript | gcr.io/datadoghq/dd-lib-js-init     | hub.docker.com/r/datadog/dd-lib-js-init     | public.ecr.aws/datadog/dd-lib-js-init     |
| Python     | gcr.io/datadoghq/dd-lib-python-init | hub.docker.com/r/datadog/dd-lib-python-init | public.ecr.aws/datadog/dd-lib-python-init |

# Pre-requisites
* Kubernetes v1.14+
* Datadog Cluster Agent v7.40+ with Datadog Admission Controller enabled
    * Learn how to install the [Datadog Agent in Kubernetes][3]
    * Note Starting from Helm chart v2.35.0, Datadog Admission controller is activated by default in the Datadog Cluster agent
* Application in Java, Javascript or Python deployed on Linux with supported architecture. Refer to the corresponding container registery for the complete list of supported architecture by language.

# Configure instrumentation libraries injection
For your Kubernetes applications that send traces to Datadog Agent, you can configure the Datadog admission controller to inject Java, JavaScript, and Python libraries automatically.

There are three steps to start using this feature with an existing Datadog Agent setup:
1. Enable Datadog Admission controller to mutate your pods
2. Annotate your pods to select which instrumentation library to inject
3. Tag your pods with Unified Service Tags to tie Datadog telemetry together and navigate seemlessly across traces, metrics and logs with consistent tags
4. Apply your new configuration

## Step 1 - Enable Datadog Admission controller to mutate your pods
By default, Datadog Admission controller only mutates pods labeled with a specific label.
To enable mutation on your pods, add the label `admission.datadoghq.com/enabled: "true"` to your pod spec.

Note that you can configure Datadog Admission Controller to enable injection config without having this pod label by configuring the cluster agent with `clusterAgent.admissionController.mutateUnlabelled` (or `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) to `true`.

For more details on how to configure and use Datadog Admission Controller refer to the [dedicated documentation][2].

### Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
  containers:
  -  ...
```

## Step 2 - Annotate your pods for library injection
To select your pods for library injection, the annotation corresponding to your application language in your pod spec:

| Language   | Pod annotation                                              |
|------------|-------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: <lib-version>`   |
| Javascript | `admission.datadoghq.com/js-lib.version: <lib-version>`     |
| Python     | `admission.datadoghq.com/python-lib.version: <lib-version>` |

The available library versions are available in the corresponding container registery.

**Note**: `latest` tag is supported but use this option with caution as major library releases can introduce breaking changes.

### Example

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Enable java instrumentation (version 0.114.0) injection
  containers:
  -  ...
```

## Step 3 - Tag your pods with Unified Service Tags
With Unified Service Tags you can tie Datadog telemetry together and navigate seemlessly across traces, metrics and logs with consistent tags. 
We recommend to set the Unified Service Tagging on both the deployment object and the pod template specs.
Unified Service tags can be set with the following labels:
```yaml
...
    metadata:
        labels:
            tags.datadoghq.com/env: "<ENV>"
            tags.datadoghq.com/service: "<SERVICE>"
            tags.datadoghq.com/version: "<VERSION>"
...
```

Note that it is not necessary to set `DD_ENV`, `DD_SERVICE`, `DD_VERSION` environment variables in the pod template spec as the Admission Controller will take care of propagating tag values as environement variables when injecting the library.

### Example
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod"
    tags.datadoghq.com/service: "my-service"
    tags.datadoghq.com/version: "1.1"
...
template:
  metadata:
    labels:
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-service"
        tags.datadoghq.com/version: "1.1"
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Enable java instrumentation (version 0.114.0) injection
  containers:
  -  ...
```

# Step 4 - Apply the configuration
With that, your pods are all set to be instrumented after a their new configuration is applied.

<div class="alert alert-warning">The library will be injected only on new pods and will not have any impact on running pods</div>

# FAQ
## How to check if the library injection was successful?
Library injection leverages the injection of a dedicated init container in pods.
If the injection was sucessfull you should see an init container called datadog-lib-init in your pod:

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="datadog-lib-init">}}

The instrumentation will also start sending telemetry to Datadog (such as traces to [APM][8]).

## Do I need to generate a new application image to instrument it with Datadog?
No, the library injection is taking care of adding the instrumentation library without any change in your application image.

## How can I configure the library when using library injection feature?
The supported features and configurations options remain the same with library injection as with other installation methods and can be set via environment variables.
Refer to the corresponding [Datadog Library configuration page][7] for more details.

## How can I use a different container registery?
You may pull the APM library from a different registry using the `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent.

The default value is set to `grc.io/datadoghq` and can be set to `docker.io/datadog`, `public.ecr.aws/datadog` or another URL if you are hosting the images in a local container registery.

[1]: /containers/cluster_agent/setup/?tab=helm
[2]: /containers/cluster_agent/admission_controller/
[3]: /containers/kubernetes/installation/?tab=helm
[4]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[5]: /tracing/trace_collection/
[6]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[7]: tracing/trace_collection/library_config/
[8]: https://app.datadoghq.com/apm/traces