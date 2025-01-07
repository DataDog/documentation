---
title: Injecting Libraries Locally
description: "Inject instrumentation libraries into applications"
aliases:
 - /tracing/trace_collection/admission_controller/
 - /tracing/trace_collection/library_injection/
---

## Overview

To automatically instrument your application, you can:

- Use automatic instrumentation with local library injection, as described on this page.
- Use [Single Step Instrumentation][6].
- Use [Datadog libraries][7].

For more information, see [Automatic Instrumentation][5].

How to inject the library locally, without touching the application code at all, varies depending on where and how your Agent and application are installed. Select the scenario that represents your environment:

{{< tabs >}}
{{% tab "Kubernetes" %}}

With the [Admission Controller][1] approach, the Agent uses the Kubernetes Admission Controller to intercept requests to the Kubernetes API and mutate new pods to inject the specified instrumentation library.

<div class="alert alert-warning">Library injection is applied on new pods only and does not have any impact on running pods.</div>

To learn more about Kubernetes Admission Controller, read [Kubernetes Admission Controllers Reference][2].

## Requirements

* Kubernetes v1.14+
* Datadog [Cluster Agent v7.40+][3] for Java, Python, Node.js, Datadog [Cluster Agent v7.44+][3] for .NET and Ruby.
* Datadog Admission Controller enabled. **Note**: In Helm chart v2.35.0 and later, Datadog Admission Controller is activated by default in the Cluster Agent.
* For Python, uWSGI applications are not supported at this time.
* For Ruby, library injection support is in Preview. Instrumentation is only supported for Ruby on Rails applications with Bundler version greater than 2.3 and without vendored gems (deployment mode or `BUNDLE_PATH`).
* Applications in Java, JavaScript, Python, .NET, or Ruby deployed on Linux with a supported architecture. Check the [corresponding container registry](#container-registries) for the complete list of supported architectures by language.

## Container registries

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from GCR or ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

Datadog publishes instrumentation libraries images on gcr.io, Docker Hub, and Amazon ECR:
| Language   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][4]   | [hub.docker.com/r/datadog/dd-lib-java-init][5]   | [gallery.ecr.aws/datadog/dd-lib-java-init][6]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][7]     | [hub.docker.com/r/datadog/dd-lib-js-init][8]     | [gallery.ecr.aws/datadog/dd-lib-js-init][9]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][10] | [hub.docker.com/r/datadog/dd-lib-python-init][11] | [gallery.ecr.aws/datadog/dd-lib-python-init][12] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][13] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][14] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][15] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][23] | [hub.docker.com/r/datadog/dd-lib-ruby-init][24] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][25] |

The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent configuration specifies the registry used by the Admission Controller. The default value is `gcr.io/datadoghq`.

You can pull the tracing library from a different registry by changing it to `docker.io/datadog`, `public.ecr.aws/datadog`, or another URL if you are hosting the images in a local container registry.

## Configure instrumentation libraries injection

For your Kubernetes applications whose traces you want to send to Datadog, configure the Datadog Admission Controller to inject Java, JavaScript, Python, .NET or Ruby instrumentation libraries automatically. From a high level, this involves the following steps, described in detail below:

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
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
    spec:
      containers:
        - # (...)
```

### Step 2 - Annotate your pods for library injection

To select your pods for library injection, use the annotations provided in the following table within your pod spec:

| Language   | Pod annotation                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

The available library versions are listed in each container registry, as well as in the tracer source repositories for each language:
- [Java][16]
- [JavaScript][17]
- [Python][18]
- [.NET][19]
  - **Note**: For .NET library injection on musl-based Linux distributions (such as Alpine), append `-musl` to the pod annotation tag for versions 2.55 and earlier. For example, use `v2.29.0-musl` instead of `v2.29.0`. The `-musl` suffix is not required for versions after 2.55, including v3.0+.
- [Ruby][20]

**Note**: If you already have an application instrumented using version X of the library, and then use library injection to instrument using version Y of the same tracer library, the tracer does not break. Rather, the library version loaded first is used. Because library injection happens at the admission controller level prior to runtime, it takes precedence over manually configured libraries.

<div class="alert alert-warning"><strong>Note</strong>: Using the <code>latest</code> tag is supported, but use it with caution because major library releases can introduce breaking changes.</div>

For example, to inject a Java library:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # (...)
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods in this deployment
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # (...)
```

### Step 3 - Tag your pods with Unified Service Tags

With [Unified Service Tags][21], you can tie Datadog telemetry together and navigate seamlessly across traces, metrics, and logs with consistent tags. Set the Unified Service Tagging on both the deployment object and the pod template specs.
Set Unified Service tags by using the following labels:

```yaml
  metadata:
    labels:
      tags.datadoghq.com/env: "<ENV>"
      tags.datadoghq.com/service: "<SERVICE>"
      tags.datadoghq.com/version: "<VERSION>"
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
  # (...)
spec:
  template:
    metadata:
      labels:
        tags.datadoghq.com/env: "prod" # Unified service tag - Pod Env tag
        tags.datadoghq.com/service: "my-service" # Unified service tag - Pod Service tag
        tags.datadoghq.com/version: "1.1" # Unified service tag - Pod Version tag
        admission.datadoghq.com/enabled: "true" # Enable Admission Controller to mutate new pods part of this deployment
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # (...)
```

### Step 4 - Apply the configuration

Your pods are ready to be instrumented when their new configuration is applied.

<div class="alert alert-warning">The library is injected on new pods only and does not have any impact on running pods.</div>

## Check that the library injection was successful

Library injection leverages the injection of a dedicated `init` container in pods.
If the injection was successful you can see an `init` container called `datadog-lib-init` in your pod:

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="Kubernetes environment details page showing init container in the pod.">}}

Or run `kubectl describe pod <my-pod>` to see the `datadog-lib-init` init container listed.

The instrumentation also starts sending telemetry to Datadog (for example, traces to [APM][22]).

### Troubleshooting installation issues

If the application pod fails to start, run `kubectl logs <my-pod> --all-containers` to print out the logs and compare them to the known issues below.

#### .NET installation issues
##### `dotnet: error while loading shared libraries: libc.musl-x86_64.so.1: cannot open shared object file: No such file or directory`

- **Problem**: The pod annotation for the dotnet library version included a `-musl` suffix, but the application container runs on a Linux distribution that uses glibc.
- **Solution**: Remove the `-musl` suffix from the dotnet library version.

##### `Error loading shared library ld-linux-x86-64.so.2: No such file or directory (needed by /datadog-lib/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so)`

- **Problem**: The application container runs on a Linux distribution that uses musl-libc (for example, Alpine), but the pod annotation does not include the `-musl` suffix.
- **Solution**: Add the `-musl` suffix to the dotnet library version.


#### Python installation issues

##### Noisy library logs

In Python `< 1.20.3`, Python injection logs output to `stderr`. Upgrade to `1.20.3` or above to suppress the logs by default. The logs can be enabled by setting the environment variable `DD_TRACE_DEBUG` to `1`.


##### Incompatible Python version

The library injection mechanism for Python only supports injecting the Python library in Python v3.7+.

##### `user-installed ddtrace found, aborting`

- **Problem**: The `ddtrace` library is already installed on the system so the injection logic aborts injecting the library to avoid introducing a breaking change in the application.
- **Solution**: Remove the installation of `ddtrace` if library injection is desired. Otherwise, use the installed library ([see documentation][26]) instead of library injection.


#### TLS issues

##### `tls: protocol version not supported`

- **Problem**: Since Cluster Agent v1.20, the API is only served using TLS v1.3 by default. If the Kubernetes cluster is configured with TLS v1.2 or older, library injection fails.

- **Solution**: Set `DD_CLUSTER_AGENT_ALLOW_LEGACY_TLS` to `true` for Cluster Agent.


[1]: /containers/cluster_agent/admission_controller/
[2]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[3]: /containers/kubernetes/installation/?tab=helm
[4]: http://gcr.io/datadoghq/dd-lib-java-init
[5]: http://hub.docker.com/r/datadog/dd-lib-java-init
[6]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[7]: http://gcr.io/datadoghq/dd-lib-js-init
[8]: http://hub.docker.com/r/datadog/dd-lib-js-init
[9]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[10]: http://gcr.io/datadoghq/dd-lib-python-init
[11]: http://hub.docker.com/r/datadog/dd-lib-python-init
[12]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[13]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[14]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[15]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[16]: https://github.com/DataDog/dd-trace-java/releases
[17]: https://github.com/DataDog/dd-trace-js/releases
[18]: https://github.com/DataDog/dd-trace-py/releases
[19]: https://github.com/DataDog/dd-trace-dotnet/releases
[20]: https://github.com/DataDog/dd-trace-rb/releases
[21]: /getting_started/tagging/unified_service_tagging/
[22]: https://app.datadoghq.com/apm/traces
[23]: http://gcr.io/datadoghq/dd-lib-ruby-init
[24]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[25]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[26]: /tracing/trace_collection/dd_libraries/python/
{{% /tab %}}

{{% tab "Host" %}}

<div class="alert alert-info">Tracing Library Injection on a host is in Preview.</div>

When both the Agent and your services are running on a host, real or virtual, Datadog injects the tracing library by using a preload library that overrides calls to `execve`. Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Note**: Injection on arm64 is not supported.

## Install both library injection and the Datadog Agent

**Requirements**: A host running Linux.

If the host does not yet have a Datadog Agent installed, or if you want to upgrade your Datadog Agent installation, use the Datadog Agent install script to install both the injection libraries and the Datadog Agent:

```shell
DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3" DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

By default, running the script installs support for Java, Node.js, Python, Ruby, and .NET all pinned to the latest major version. If you want to specify which language support is installed, also set the `DD_APM_INSTRUMENTATION_LIBRARIES` environment variable. The valid values are `java`, `js`, `python` and `dotnet`. Use a comma-separated list to specify more than one language:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES=java:1,js:5 DD_APM_INSTRUMENTATION_ENABLED=host DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Exit and open a new shell to use the injection library.

## Next steps

If you haven't already, install your app and any supporting languages or libraries it requires.

When an app that is written in a supported language is launched, it is automatically injected with tracing enabled.

## Configure the injection

Configure host injection in one of the following ways:
- Set environment variables on the process being launched.

Values in environment variables override settings in the configuration file on a per-process basis.

### Configuration file

| Property name | Purpose | Default value | Valid values |
| --------- | ----------- | ------------- | ----------- |
|`log_level`  | The logging level|`off`|`off`, `debug`, `info`, `warn`, `error`|
|`output_paths`|The location where log output is written|`stderr`|`stderr` or a `file://` URL|
|`env`|The default environment assigned to a process|none|n/a|


#### Example

```yaml
---
log_level: debug
output_paths:
  - file:///tmp/host_injection.log
env: dev
```

### Environment variables

The following environment variables configure library injection. You can pass these in by `export` through the command line (`export DD_CONFIG_SOURCES=BASIC`), shell configuration, or launch command.

Each of the fields in the config file corresponds to an environment variable. This environment variable is read from the environment of the process that’s being launched and affects only the process currently being launched.

|Config file property|Environment Variable|
| --------- | ----------- |
|`log_level`|`DD_APM_INSTRUMENTATION_DEBUG`|
|`output_paths`|`DD_APM_INSTRUMENTATION_OUTPUT_PATHS`|
|`env`|`DD_ENV`|

The `DD_APM_INSTRUMENTATION_DEBUG` environment variable is limited to the values `true` and `false` (default value `false`). Setting it to `true` sets `log_level` to `debug` and setting it to `false` (or not setting it at all) uses the `log_level` specified in the configuration file. The environment variable can only set the log level to `debug`, not any other log level values.

The `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable controls whether or not injection is enabled. It defaults to `TRUE`. Set it to `FALSE` to turn off library injection altogether.

### Default configuration

By default, the following settings are enabled in an instrumented process:
- Tracing
- Log injection, assuming the application uses structured logging (usually JSON). For traces to appear in non-structured logs, you must change your application’s log configuration to include placeholders for trace ID and span ID. See [Connect Logs and Traces][6] for more information.
- Health metrics
- Runtime metrics


Exercise your application to start generating telemetry data, which you can see as [traces in APM][5].


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: /agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[3]: https://learn.microsoft.com/en-us/dotnet/core/install/linux-ubuntu
[4]: /tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}

{{% tab "Agent on host, app in containers" %}}

<div class="alert alert-info">Tracing Library Injection on hosts and containers is in Preview.</div>


When your Agent is running on a host, and your services are running in containers, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Note**: Injection on arm64 is not supported.

## Install both library injection and the Datadog Agent

**Requirements**:
- A host running Linux.
- [Docker Engine][2].

If the host does not yet have a Datadog Agent installed, or if you want to upgrade your Datadog Agent installation, use the Datadog Agent install script to install both the injection libraries and the Datadog Agent:

```shell
DD_APM_INSTRUMENTATION_ENABLED=all DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3" DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

By default, running the script installs support for Java, Node.js, Python, Ruby, and .NET. If you want to specify which language support is installed, also set the `DD_APM_INSTRUMENTATION_LIBRARIES` environment variable. The valid values are `java`, `js`, `python`, and `dotnet`. Use a comma-separated list to specify more than one language:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES=java:1,js:5 DD_APM_INSTRUMENTATION_ENABLED=all DD_API_KEY=<YOUR KEY> DD_SITE="<YOUR SITE>" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

## Specifying Unified Service Tags on containers

If the environment variables `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` are specified in a service container image, those values are used to tag telemetry from the container.

If they are not specified, `DD_ENV` uses the `env` value set in the `/etc/datadog-agent/inject/docker_config.yaml` config file, if any. `DD_SERVICE` is derived from the name of the Docker image. An image with the name `my-service:1.0` is tagged with `DD_SERVICE` of `my-service`.

## Launch your services

Start your Agent and launch your containerized services as usual.

Exercise your application to start generating telemetry data, which you can see as [traces in APM][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://docs.docker.com/engine/install/ubuntu/
[3]: /agent/configuration/agent-commands/?tab=agentv6v7#start-the-agent
[4]: /tracing/trace_collection/library_config/
[5]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts

{{% /tab %}}

{{% tab "Agent and app in separate containers" %}}

<div class="alert alert-info">Tracing Library Injection in containers is in Preview.</div>

When your Agent and services are running in separate Docker containers on the same host, Datadog injects the tracing library by intercepting container creation and configuring the Docker container.

Any newly started processes are intercepted and the specified instrumentation library is injected into the services.

**Requirements**:
- [Docker Engine][1].

**Note**: Injection on arm64 is not supported.

## Install the preload library

Use the `install_script_agent7.sh` shell script to automatically install Docker injection support. Docker must already be installed on the host machine.

```shell
DD_APM_INSTRUMENTATION_ENABLED=docker DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3" DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

This installs language libraries for all supported languages. To install specific languages, set the `DD_APM_INSTRUMENTATION_LIBRARIES` variable. The valid values are `java`, `js`, `python`, and `dotnet`:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1,js:5" DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```


## Configure the Agent

In the Docker compose file that launches your containers, use the following settings for the Agent, securely setting your own Datadog API key for `${DD_API_KEY}`:

```yaml
  dd-agent:
    container_name: dd-agent
    image: datadog/agent:7
    environment:
      - DD_API_KEY=${DD_API_KEY}
      - DD_APM_ENABLED=true
      - DD_APM_NON_LOCAL_TRAFFIC=true
      - DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true
      - DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket
      - DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket
    volumes:
      - /var/run/datadog:/var/run/datadog
      - /var/run/docker.sock:/var/run/docker.sock:ro
```

## Specifying Unified Service Tags on containers

If the environment variables `DD_ENV`, `DD_SERVICE`, or `DD_VERSION` are specified in a service container image, those values are used to tag telemetry from the container.

If they are not specified, `DD_ENV` uses the `env` value set in the `/etc/datadog-agent/inject/docker_config.yaml` config file, if any. `DD_SERVICE` is derived from the name of the Docker image. An image with the name `my-service:1.0` is tagged with `DD_SERVICE` of `my-service`.

## Launch the Agent on Docker

The `dd-agent` container must be launched before any service containers. Run:

```sh
docker-compose up -d dd-agent
```

## Launch your services

Launch your containerized services as usual.

Exercise your application to start generating telemetry data, which you can see as [traces in APM][4].



[1]: https://docs.docker.com/engine/install/ubuntu/
[2]: https://bugzilla.redhat.com/show_bug.cgi?id=1792506
[3]: /tracing/trace_collection/library_config/
[4]: https://app.datadoghq.com/apm/traces
[7]: https://docs.aws.amazon.com/sdk-for-go/api/aws/session/
[8]: https://cloud.google.com/docs/authentication#service-accounts
{{% /tab %}}


{{< /tabs >}}

## Uninstall library injection

### Remove instrumentation for specific services

To stop producing traces for a specific service, run the following commands and restart the service:

{{< tabs >}}
{{% tab "Host" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

{{% /tab %}}

{{% tab "Agent and app in separate containers" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false
   ```
2. Restart the service.
{{% /tab %}}

{{< /tabs >}}

### Remove APM for all services on the infrastructure

To stop producing traces, remove library injectors and restart the infrastructure:


{{< tabs >}}
{{% tab "Host" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Agent and app in separate containers" %}}

1. Uninstall local library injection:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart Docker:
   ```shell
   systemctl restart docker
   ```
   Or use the equivalent for your environment.

{{% /tab %}}

{{< /tabs >}}

## Configuring the library

The supported features and configuration options for the tracing library are the same for library injection as for other installation methods, and can be set with environment variables. Read the [Datadog library configuration page][2] for your language for more details.

For example, you can turn on [Application Security Monitoring][3] or [Continuous Profiler][4], each of which may have billing impact:

- For **Kubernetes**, set the `DD_APPSEC_ENABLED` or `DD_PROFILING_ENABLED` environment variables to `true` in the underlying application pod's deployment file.

- For **hosts and containers**, set the `DD_APPSEC_ENABLED` or `DD_PROFILING_ENABLED` container environment variables to `true`.


[1]: /tracing/trace_collection/
[2]: /tracing/trace_collection/library_config/
[3]: /security/application_security/threats/setup/threat_detection/java/
[4]: /profiler/enabling/java/?tab=environmentvariables#installation
[5]: /tracing/trace_collection/automatic_instrumentation/
[6]: /tracing/trace_collection/single-step-apm
[7]: /tracing/trace_collection/dd_libraries/
