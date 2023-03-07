---
title: Injecting Libraries
kind: documentation
description: "Inject instrumentation libraries into applications"
aliases:
 - /tracing/trace_collection/admission_controller/
---

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

The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent configuration specifies the registry used by the Admission Controller. The default value is `gcr.io/datadoghq`.

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

**Note**: If you already have an application instrumented using version X of the library, and then use library injection to instrument using version Y of the same tracer library, the tracer does not break. Rather, the library version loaded first is used. Because library injection happens at the admission controller level prior to runtime, it takes precedent over manually configured libraries.

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

<div class="alert alert-info">Tracing Library Injection on a host is in beta.</a></div>

When both the Agent and your services are running on a host, real or virtual, Datadog injects the tracing library by using a preload library that overrides calls to `execve`. Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

## Requirements

- A recent [Datadog Agent v7][1] installation

**Note**: Injection on arm64, and injection with `musl` on Alpine Linux container images are not supported.
## Install the preload library

1. Ensure your [Agent is running][6].

2. Install the library with one of the following sets of commands, where `<LANG>` is one of `java`, `js`, `dotnet`, or `all`:

   **For Ubuntu, Debian or other Debian-based Linux distributions:**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **For CentOS, RedHat, or another distribution that uses yum/RPM:**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. Run the command `dd-host-install`.

4. Exit and open a new shell to use the preload library.


## Install the language and your app

1. For Java applications, ensure you have a JDK or JRE installed, for example:
   ```sh
   sudo apt install openjdk-17-jdk -y
   ```
   For NodeJS applications, ensure you have NodeJS installed, for example:
   ```sh
   curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install nodejs -y
   ```
   For .NET applications, ensure you have the [.NET runtime installed][3].

2. If you haven't already, install your app.

## Configure the injection

The following environment variables configure library injection. You can pass these in by `export` through the command line (`export DD_CONFIG_SOURCES=BASIC`), shell configuration, or launch command:


`DD_CONFIG_SOURCES`
: Turn on or off library injection and specify a location to load configuration from. Optionally, separate multiple values with semicolons to indicate multiple possible locations. The first value that returns without an error is used. Configuration is not merged across configuration sources. The valid values are:
  - `BLOB:<URL>` - Load configuration from a blob store (S3-compatible) located at `<URL>`.
  - `LOCAL:<PATH>` - Load from a file on the local file system at `<PATH>`.
  - `BASIC` - Use exported or default values.
  - `OFF` - Default. No injection performed.<br>
For more information about configuring `BLOB` or `LOCAL` settings, see [Supplying configuration source](#supplying-configuration-source-host).

`DD_LIBRARY_INJECT`
: Set to `FALSE` to turn off library injection altogether.<br>
**Default**: `TRUE`

`DD_INJECT_DEBUG`
: Set to `TRUE` or `1` to log debug information.<br>
**Default**: `FALSE`

`DD_OUTPUT_PATHS`
: A comma-separated list of places to write the debug logs.<br>
**Default**: `stderr`

<a id="supplying-configuration-source-host"></a>

### Supplying configuration source 

If you specify `BLOB` or `LOCAL` configuration source, create a JSON or YAML file at `etc/<APP_NAME>/config.json` or `.yaml`, and provide the configuration either as JSON:

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
- `dotnet`

In this configuration file, the value of `version` is always `1`. This refers to the configuration schema version in use, not the version of the content.

The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][2]:

| Injection | Java tracer | NodeJS tracer | .NET tracer |
| --------- | ----------- | ------------- | ----------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` |
| `tracing_rate_limit` | n/a       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

## Launch your services

Launch your services, indicating the preload library configuration in the launch command:

**Java app example**:
```sh
DD_CONFIG_SOURCES=BASIC java -jar <SERVICE_1>.jar &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC java -jar <SERVICE_2>.jar &
```

**Node app example**:
```sh
DD_CONFIG_SOURCES=BASIC node index.js &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC node index.js &
```

**.NET app example**:
```sh
DD_CONFIG_SOURCES=BASIC dotnet <SERVICE_1>.dll &
DD_CONFIG_SOURCES=LOCAL:/etc/<SERVICE_2>/config.yaml;BASIC dotnet <SERVICE_2>.dll &
```

Exercise your application to start generating telemetry data, which you can see as [traces in APM][4].

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: /tracing/trace_collection/library_config/
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: https://app.datadoghq.com/apm/traces
[5]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[6]: /agent/guide/agent-commands/?tab=agentv6v7#start-the-agent

{{% /tab %}}

{{% tab "Agent on host, app in containers" %}}

<div class="alert alert-info">Tracing Library Injection on hosts and containers is in beta.</a></div>


When your Agent is running on a host, and your services are running in containers, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

## Requirements

- A recent [Datadog Agent v7][1] installation 
- [Docker Engine][2]

**Note**: Injection on arm64, and injection with `musl` on Alpine Linux container images are not supported.

## Install the preload library

1. Ensure your [Agent is running][6].

2. Install the library with one of the following sets of commands, where `<LANG>` is one of `java`, `js`, `dotnet`, or `all`:

   **For Ubuntu, Debian or other Debian-based Linux distributions:**
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   **For CentOS, RedHat, or another distribution that uses yum/RPM:**
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```

3. Run the command `dd-host-container-install`.


## Configure Docker injection

Edit `/etc/datadog-agent/inject/docker_config.yaml` and add the following YAML configuration for the injection:

```yaml
---
config_sources: BASIC
library_inject: true
log_level: debug
output_paths:
- stderr
```

`config_sources`
: Turn on or off library injection and specify a semicolon-separated ordered list of places where configuration is stored. The first value that returns without an error is used. Configuration is not merged across configuration sources. The valid values are:
  - `BLOB:<URL>` - Load configuration from a blob store (S3-compatible) located at `<URL>`.
  - `LOCAL:<PATH>` - Load from a file on the local file system at `<PATH>`.
  - `BASIC` - Uses a default set of properties and stops looking for additional configurations.
  - `OFF` - Default. No injection performed.<br>
For more information about configuring `BLOB` or `LOCAL` settings, see [Supplying configuration source](#supplying-configuration-source-hc).

`library_inject`
: Set to `false` to disable library injection altogether.<br> 
**Default**: `true`

`log_level`
: Set to `debug` to log detailed information about what is happening, or `info` to log far less.

`output_paths`
: A list of one or more places to write logs.<br>
**Default**: `stderr`

Optional: `env`
: Specifies the `DD_ENV` tag for the containers running in Docker, for example, `dev`, `prod`, `staging`. <br>
**Default** None.

<a id="supplying-configuration-source-hc"></a>

### Supplying configuration source

If you specify `BLOB` or `LOCAL` configuration source, create a JSON or YAML file there, and provide the configuration either as JSON:

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
- `dotnet`

In this configuration file, the value of `version` is always `1`. This refers to the configuration schema version in use, not the version of the content.

The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][3]:

| Injection | Java tracer | NodeJS tracer | .NET tracer |
| --------- | ----------- | ------------- | ----------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` |
| `tracing_rate_limit` | n/a       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

## Specifying Unified Service Tags on containers

If the environment variables `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` are specified in a service container image, those values are used to tag telemetry from the container.

If they are not specified, `DD_ENV` uses the `env` value set in the `/etc/datadog-agent/inject/docker_config.yaml` config file, if any. `DD_SERVICE` and `DD_VERSION` are derived from the name of the Docker image. An image with the name `my-service:1.0` is tagged with `DD_SERVICE` of `my-service` and a `DD_VERSION` of `1.0`.

## Launch your services

Start your Agent and launch your containerized services as usual.

Exercise your application to start generating telemetry data, which you can see as [traces in APM][4].


[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[6]: /agent/guide/agent-commands/?tab=agentv6v7#start-the-agent

{{% /tab %}}

{{% tab "Agent and app in separate containers" %}}

<div class="alert alert-info">Tracing Library Injection in containers is in beta.</a></div>

When your Agent and services are running in separate Docker containers on the same host, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

## Requirements

- [Docker Engine][2]

**Note**: Injection on arm64, and injection with `musl` on Alpine Linux container images are not supported.

## Install the preload library

**For Ubuntu, Debian or other Debian-based Linux distributions:**

1. Set up the Datadog deb repo on your system and create a Datadog archive keyring:
   ```sh
   sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable 7' > /etc/apt/sources.list.d/datadog.list"
   sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
   sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg

   curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_382E94DE.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
   ```
2. Update your local apt repo and install the library:
   ```sh
   sudo apt-get update
   sudo apt-get install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   where `<LANG>` is one of `java`, `js`, `dotnet`, or `all`.

3. Run the command `dd-container-install`.

**For CentOS, RedHat, or another distribution that uses yum/RPM:**

1. Set up Datadog’s Yum repo on your system by creating a file called `/etc/yum.repos.d/datadog.repo` with the following contents:
   ```
   [datadog]
   name = Datadog, Inc.
   baseurl = https://yum.datadoghq.com/stable/7/x86_64/
   enabled=1
   gpgcheck=1
   repo_gpgcheck=1
   gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public https://keys.datadoghq.com/DATADOG_RPM_KEY_E09422B3.public
   ```
   **Note**: Due to a [bug in dnf][5], on RedHat/CentOS 8.1 set `repo_gpgcheck=0` instead of `1`.

2. Update the yum cache and install the library:
   ```sh
   sudo yum makecache
   sudo yum install datadog-apm-inject datadog-apm-library-<LANG>
   ```
   where `<LANG>` is one of `java`, `js`, `dotnet`, or `all`.

3. Run the command `dd-container-install`.

## Configure Docker injection

Edit `/etc/datadog-agent/inject/docker_config.yaml` and add the following YAML configuration for the injection:

```yaml
---
library_inject: true
log_level: debug
output_paths:
- stderr
config_sources: BASIC
```

`config_sources`
: Turn on or off library injection and specify a semicolon-separated ordered list of places where configuration is stored. The first value that returns without an error is used. Configuration is not merged across configuration sources. The valid values are:
  - `BLOB:<URL>` - Load configuration from a blob store (S3-compatible) located at `<URL>`.
  - `LOCAL:<PATH>` - Load from a file on the local file system at `<PATH>`.
  - `BASIC` - Uses a default set of properties and stops looking for additional configurations.
  - `OFF` - Default. No injection performed.<br>
For more information about configuring `BLOB` or `LOCAL` settings, see [Supplying configuration source](#supplying-configuration-source-c).

`library_inject`
: Set to `false` to disable library injection altogether.<br> 
**Default**: `true`

`log_level`
: Set to `debug` to log detailed information about what is happening, or `info` to log far less.

`output_paths`
: A list of one or more places to write logs.<br>
**Default**: `stderr`

Optional: `env`
: Specifies the `DD_ENV` tag for the containers running in Docker, for example, `dev`, `prod`, `staging`. <br>
**Default** None.

<a id="supplying-configuration-source-c"></a>

### Supplying configuration source 

If you specify `BLOB` or `LOCAL` configuration source, create a JSON or YAML file there, and provide the configuration either as JSON:

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
- `dotnet`

In this configuration file, the value of `version` is always `1`. This refers to the configuration schema version in use, not the version of the content.

The following table shows how the injection configuration values map to the corresponding [tracing library configuration options][3]:

| Injection | Java tracer | NodeJS tracer | .NET tracer |
| --------- | ----------- | ------------- | ----------- |
| `tracing_enabled` | `dd.trace.enabled` | `DD_TRACE_ENABLED` | `DD_TRACE_ENABLED` |
| `log_injection_enabled` | `dd.logs.injection` | `DD_LOGS_INJECTION` | `DD_LOGS_INJECTION` |
| `health_metrics_enabled` | `dd.trace.health.metrics.enabled` |    n/a   |    n/a  |
| `runtime_metrics_enabled` | `dd.jmxfetch.enabled` | `DD_RUNTIME_METRICS_ENABLED` | `DD_RUNTIME_METRICS_ENABLED` |
| `tracing_sampling_rate` | `dd.trace.sample.rate` | `DD_TRACE_SAMPLE_RATE` | `DD_TRACE_SAMPLE_RATE` |
| `tracing_rate_limit` | n/a       | `DD_TRACE_RATE_LIMIT` | `DD_TRACE_RATE_LIMIT` |
| `tracing_tags` | `dd.tags` | `DD_TAGS` | `DD_TAGS` |
| `tracing_service_mapping` | `dd.service.mapping` | `DD_SERVICE_MAPPING` | `DD_TRACE_SERVICE_MAPPING` |
| `tracing_agent_timeout` | `dd.trace.agent.timeout` |  n/a | n/a |
| `tracing_header_tags` | `dd.trace.header.tags` |    n/a    | `DD_TRACE_HEADER_TAGS` |
| `tracing_partial_flush_min_spans` | `dd.trace.partial.flush.min.spans` | `DD_TRACE_PARTIAL_FLUSH_MIN_SPANS` | `DD_TRACE_PARTIAL_FLUSH_ENABLED ` |
| `tracing_debug` | `dd.trace.debug` | `DD_TRACE_DEBUG` | `DD_TRACE_DEBUG` |
| `tracing_log_level` | `datadog.slf4j.simpleLogger.defaultLogLevel` | `DD_TRACE_LOG_LEVEL` |   n/a    |

Tracer library configuration options that aren't mentioned in the injection configuration are still available for use through properties or environment variables the usual way.

## Configure the Agent

In the Docker compose file that launches your containers, use the following settings for the Agent, securely setting your own Datadog API key for `${DD_API_KEY}`:

```yaml
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_LOG_LEVEL=TRACE
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_AC_EXCLUDE=name:datadog-agent
      - DD_SYSTEM_PROBE_ENABLED=true
      - DD_PROCESS_AGENT_ENABLED=true
      - DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket
    volumes:
      - /opt/datadog/apm:/opt/datadog/apm
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /proc/:/host/proc/:ro
      - /sys/fs/cgroup/:/host/sys/fs/cgroup:ro
      - /sys/kernel/debug:/sys/kernel/debug
    cap_add:
      - SYS_ADMIN
      - SYS_RESOURCE
      - SYS_PTRACE
      - NET_ADMIN
      - NET_BROADCAST
      - NET_RAW
      - IPC_LOCK
      - CHOWN
    security_opt:
      - apparmor:unconfined
```
## Specifying Unified Service Tags on containers

If the environment variables `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` are specified in a service container image, those values are used to tag telemetry from the container.

If they are not specified, `DD_ENV` uses the `env` value set in the `/etc/datadog-agent/inject/docker_config.yaml` config file, if any. `DD_SERVICE` and `DD_VERSION` are derived from the name of the Docker image. An image with the name `my-service:1.0` is tagged with `DD_SERVICE` of `my-service` and a `DD_VERSION` of `1.0`.

## Launch the Agent on Docker

The `dd-agent` container must be launched before any service containers. Run:

```sh
docker-compose up -d dd-agent
```

## Launch your services

Launch your containerized services as usual.

Exercise your application to start generating telemetry data, which you can see as [traces in APM][4].


[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506

{{% /tab %}}


{{< /tabs >}}


## Configuring the library

The supported features and configuration options for the tracing library are the same for library injection as for other installation methods, and can be set with environment variables. Read the [Datadog Library configuration page][16] for your language for more details.


[2]: /tracing/trace_collection/
[16]: /tracing/trace_collection/library_config/
