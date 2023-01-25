---
title: Injecting Libraries Using Admission Controller
kind: documentation
description: "Inject instrumentation libraries into applications using Cluster Agent and Admission Controller"
---

## Overview

In a Kubernetes environment, there are two ways to instrument your application:
* Injecting the instrumentation library using the [Admission Controller][1], as described on this page; or
* [Manually adding the instrumentation library in the application][2].

With the Admission Controller approach, the Agent uses the Kubernetes Admission Controller to intercept requests to the Kubernetes API and mutate new pods to inject the specified instrumentation library.

<div class="alert alert-warning">Library injection is applied on new pods only and does not have any impact on running pods.</div>

To learn more about Kubernetes Admission Controller, read [Kubernetes Admission Controllers Reference][3].

## Requirements

* Kubernetes v1.14+
* Datadog [Cluster Agent v7.40+][4] with Datadog Admission Controller enabled. **Note**: In Helm chart v2.35.0 and later, Datadog Admission Controller is activated by default in the Cluster Agent.
* Applications in Java, JavaScript, or Python deployed on Linux with a supported architecture. Check the [corresponding container registry](#container-registries) for the complete list of supported architectures by language.


## Container registries

Datadog publishes instrumentation libraries images on gcr.io, Docker Hub, and AWS ECR:
| Language   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][5]   | [hub.docker.com/r/datadog/dd-lib-java-init][6]   | [gallery.ecr.aws/datadog/dd-lib-java-init][7]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][8]     | [hub.docker.com/r/datadog/dd-lib-js-init][9]     | [gallery.ecr.aws/datadog/dd-lib-js-init][10]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][11] | [hub.docker.com/r/datadog/dd-lib-python-init][12] | [gallery.ecr.aws/datadog/dd-lib-python-init][13] |

The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent configuration specifies the registry used by the Admission Controller. The default value is `grc.io/datadoghq`.

You can pull the tracing library from a different registry by changing it to `docker.io/datadog`, `public.ecr.aws/datadog`, or another URL if you are hosting the images in a local container registry.

## Configure instrumentation libraries injection

For your Kubernetes applications whose traces you want to send to Datadog, configure the Datadog Admission Controller to inject Java, JavaScript, or Python instrumentation libraries automatically. From a high level, this involves the following steps, described in detail below:

1. Enable Datadog Admission Controller to mutate your pods.
2. Annotate your pods to select which instrumentation library to inject.
3. Tag your pods with Unified Service Tags to tie Datadog telemetry together and navigate seamlessly across traces, metrics, and logs with consistent tags.
4. Apply your new configuration.

<div class="alert alert-info">You do not need to generate a new application image to inject the library. The library injection is taking care of adding the instrumentation library, so no change is required in your application image.</div>

### Step 1 - Enable Datadog Admission Controller to mutate your pods

By default, Datadog Admission controller mutates only pods labeled with a specific label. To enable mutation on your pods, add the label `admission.datadoghq.com/enabled: "true"` to your pod spec.

**Note**: You can configure Datadog Admission Controller to enable injection config without having this pod label by configuring the Cluster Agent with `clusterAgent.admissionController.mutateUnlabelled` (or `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) to `true`.

For more details on how to configure, read [Datadog Admission Controller page][1].

For example:

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

### Step 2 - Annotate your pods for library injection

To select your pods for library injection, annotate them with the following, corresponding to your application language, in your pod spec:

| Language   | Pod annotation                                              |
|------------|-------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<lib-version>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<lib-version>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<lib-version>"` |

The available library versions are listed in each container registry.

**Note**: If you already have an application instrumented using version X of the library, and then use library injection to instrument using version Y of the same tracer library, the tracer does not break. Rather, the library version loaded first is used. As Library Injection happens at the admission controller level prior to runtime, it will take precedent over any manually configured libraries.

<div class="alert alert-warning"><strong>Note</strong>: Using the <code>latest</code> tag is supported, but use it with caution because major library releases can introduce breaking changes.</div>

For example:

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
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods in this deployment
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Enable Java instrumentation (version 0.114.0) injection
  containers:
  -  ...
```

### Step 3 - Tag your pods with Unified Service Tags

With [Unified Service Tags][14], you can tie Datadog telemetry together and navigate seamlessly across traces, metrics, and logs with consistent tags. Set the Unified Service Tagging on both the deployment object and the pod template specs.
Set Unified Service tags by using the following labels:

```yaml
...
    metadata:
        labels:
            tags.datadoghq.com/env: "<ENV>"
            tags.datadoghq.com/service: "<SERVICE>"
            tags.datadoghq.com/version: "<VERSION>"
...
```

**Note**: It is not necessary to set the _environment variables_ for universal service tagging (`DD_ENV`, `DD_SERVICE`, `DD_VERSION`) in the pod template spec, because the Admission Controller propagates the tag values as environment variables when injecting the library.

For example:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod" # Unified service tag - Deployment Env tag
    tags.datadoghq.com/service: "my-service" # Unified service tag - Deployment Service tag
    tags.datadoghq.com/version: "1.1" # Unified service tag - Deployment Version tag
...
template:
  metadata:
    labels:
        tags.datadoghq.com/env: "prod" # Unified service tag - Pod Env tag
        tags.datadoghq.com/service: "my-service" # Unified service tag - Pod Service tag
        tags.datadoghq.com/version: "1.1" # Unified service tag - Pod Version tag
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Enable Java instrumentation (version 0.114.0) injection
  containers:
  -  ...
```

### Step 4 - Apply the configuration

Your pods are ready to be instrumented when their new configuration is applied.

<div class="alert alert-warning">The library is injected on new pods only and does not have any impact on running pods.</div>

## Check that the library injection was successful

Library injection leverages the injection of a dedicated `init` container in pods.
If the injection was successful you can see an `init` container called `datadog-lib-init` in your pod:

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="Kubernetes environment details page showing init container in the pod.">}}

Or run `kubectl describe pod <my-pod>` to see the `datadog-lib-init` init container listed.

The instrumentation also starts sending telemetry to Datadog (for example, traces to [APM][15]).

## Configuring the library

The supported features and configuration options for the tracing library are the same for library injection as for other installation methods, and can be set with environment variables. Read the [Datadog Library configuration page][16] for your language for more details.



[1]: /containers/cluster_agent/admission_controller/
[2]: /tracing/trace_collection/
[3]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[4]: /containers/kubernetes/installation/?tab=helm
[5]: http://gcr.io/datadoghq/dd-lib-java-init
[6]: http://hub.docker.com/r/datadog/dd-lib-java-init
[7]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[8]: http://gcr.io/datadoghq/dd-lib-js-init
[9]: http://hub.docker.com/r/datadog/dd-lib-js-init
[10]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[11]: http://gcr.io/datadoghq/dd-lib-python-init
[12]: http://hub.docker.com/r/datadog/dd-lib-python-init
[13]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[14]: /getting_started/tagging/unified_service_tagging/
[15]: https://app.datadoghq.com/apm/traces
[16]: /tracing/trace_collection/library_config/
