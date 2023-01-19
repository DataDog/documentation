---
title: Injecting Libraries
kind: documentation
description: "Inject instrumentation libraries into applications"
aliases:
 - /tracing/trace_collection/admission_controller/
is_beta: true
---

{{< beta-callout url="#" btn_hidden="true">}}
  Tracing library injection is in beta. 
{{< /beta-callout >}}

## Overview

There are two ways to instrument your application:
* Injecting the instrumentation library, as described on this page; or
* [Manually adding the instrumentation library in the application][2].

How to inject the library, without touching the application code at all, varies depending on where and how your Agent and application are installed. Select the scenario that represents your environment:

{{< tabs >}}
{{% tab "Kubernetes" %}}

With the [Admission Controller][1] approach, the Agent uses the Kubernetes Admission Controller to intercept requests to the Kubernetes API and mutate new pods to inject the specified instrumentation library.

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

<div class="alert alert-info">You do not need to generate a new application image to inject the library. The library injection is taken care of adding the instrumentation library, so no change is required in your application image.</div>

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

{{% /tab %}}

{{% tab "Host" %}}

When both the Agent and your services are running on a host, real or virtual, Datadog injects the tracing library by using a library that is preloaded and that overrides calls to `execve`. Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

## Requirements

- A recent [Datadog Agent v7][1] installation 


## Install the preload library

1. Run the following commands, for example, with `apt`, where `<LANG>` is one of `java`, `nodejs`, `dotnet`, or `all`:

   ```sh
   sudo apt update
   sudo apt install -y datadog-apm-inject datadog-apm-library-<LANG>
   dd-install-ld-preload
   ```

2. The preload library injection only works in a new shell, so exit and open a new shell.

## Install the language and your app

1. For Java applications, ensure you have a JDK installed, for example:
   ```sh
   sudo apt install openjdk-17-jdk -y
   ```
   For NodeJS applications, ensure you have NodeJS installed, for example:
   ```sh
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install nodejs -y
   ```
2. If you haven't already, install your app.

## Configure the injection

The following environment variables configure library injection. You can pass these in by `export` on the command line (`export DD_AUTO_INJECT=1`) or by creating a configuration file and passing it in using the `DD_CONFIG_SOURCES` variable:

`DD_AUTO_INJECT`
: Set to `TRUE` or `1` to enable injection. Set to `FALSE` or `0` to turn injection off.<br>
**Default**: 

`DD_INJECT_DEBUG`
: Set to `TRUE` or `1` to log debug information.<br>
**Default**: `FALSE`

`DD_OUTPUT_PATHS`
: A comma-separated list of places to write the debug logs.<br>
**Default**: `stderr`

`DD_CONFIG_SOURCES`
: Specifies a location to load configuration from. Optionally, separate multiple values with semicolons to indicate multiple possible locations. The first value that returns without an error is used. Configuration is not merged across configuration sources.The valid values are:
  - `BLOB:<URL>` - Load from a blob store located at `<URL>`.
  - `LOCAL:<PATH>` - load from a local file located at `<PATH>`.
  - `BASIC` - Use exported or default values.
  - `OFF` - Default. Don't configure.<br>
  
If you specify `BLOB` or `LOCAL` configuration source, provide the configuration either as JSON:

```json
{
	"version": 1,
	"service_language": "<LANG>",
	"tracing_enabled": true,
	"log_injection_enabled": true,
	"health_metrics_enabled": true,
	"runtime_metrics_enabled": true,
	"tracing_sampling_rate": 1.0,
	"tracing_rate_limit": 1,
	"tracing_tags": ["a=b", "foo"],
	"tracing_service_mapping": [
		{ "from_key": "mysql", "to_name": "super_db"},
		{ "from_key": "postgres", "to_name": "my_pg"}
	],
	"tracing_agent_timeout": 1,
	"tracing_header_tags": [
		{"header": "HEADER", "tag_name":"tag"}
	],
	"tracing_partial_flush_min_spans": 1,
	"tracing_debug": true,
	"tracing_log_level": "debug",
}

```

or as YAML:
```yaml
---
version: 1
service_language: <LANG>
tracing_enabled: true
log_injection_enabled: true
health_metrics_enabled: true
runtime_metrics_enabled: true
tracing_sampling_rate: 1.0
tracing_rate_limit: 1
tracing_tags: 
- a=b 
- foo
tracing_service_mapping:
- from_key: mysql
  to_name: super_db
- from_key: postgres
  to_name: my_pg
tracing_agent_timeout: 1
tracing_header_tags:
- header: HEADER
  tag_name: tag
tracing_partial_flush_min_spans: 1
tracing_debug: true
tracing_log_level: debug
```

Set `service_language` to one of the following values:
- `java`
- `node`
- `nodemon` (NodeJS launched with nodemon)
- Experimental: `npm` (NodeJS launched with npm)
- `dotnet`

Other values in the configuration map to similar ones in [tracing library configuration][2].

## Launch your services

Launch your service 


[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: /tracing/trace_collection/library_config/
{{% /tab %}}

{{% tab "Agent on host, app in containers" %}}

The first is a library that is preloaded to override calls to execve. The second part is a runc shim that intercepts container creation, and configures the initial process launched in a docker container. The primary use case for the preload library is when a service runs directly on the host alongside the agent. The runc shim is for docker containers. 
With these two libraries to facilitate tracer injection, any newly started processes will be intercepted to inject the specified instrumentation library into services.


{{% /tab %}}

{{% tab "Agent and app in containers" %}}

{{% /tab %}}

{{< /tabs >}}



## Configuring the library

The supported features and configuration options for the tracing library are the same for library injection as for other installation methods, and can be set with environment variables. Read the [Datadog Library configuration page][16] for your language for more details.


[2]: /tracing/trace_collection/
[16]: /tracing/trace_collection/library_config/
