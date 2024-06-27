---
title: Single Step APM Instrumentation (Beta)
is_beta: true
aliases:
- /tracing/trace_collection/single-step-apm
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---
## Overview

Single Step Instrumentation for APM installs the Datadog Agent and [instruments][4] your applications in one step, with no additional configuration steps required.

## Requirements

- **Languages and architectures**: Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` and `arm64` architectures.

- **Operating systems**: Linux VMs (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, Kubernetes clusters with Linux containers.

## Enabling APM on your applications

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This automatically instruments your application, without any additional installation or configuration steps.

The following examples show how it works for each deployment type.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

<div class="alert alert-warning">If you've previously used Single Step Instrumentation with Linux hosts, <a href="/tracing/trace_collection/automatic_instrumentation/ssi-0-13-1">update to the latest version</a>.</div>

For an Ubuntu host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][4], `<YOUR_DD_SITE>` with your [Datadog site][3], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>
2. Start a new shell session.
3. Restart the services on the host or VM.

[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-java/releases
[8]: https://github.com/DataDog/dd-trace-js/releases
[9]: https://github.com/DataDog/dd-trace-py/releases
[10]: https://github.com/DataDog/dd-trace-dotnet/releases
[11]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

For a Docker Linux container:

1. Run the one-line installation command:
   ```shell
   bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=<YOUR_DD_API_KEY> \
     -e DD_APM_ENABLED=true \
     -e DD_ENV=<AGENT_ENV> \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][5] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>
3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][6].

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /tracing/service_catalog/

{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable APM by installing the Agent with either:

- Datadog Operator
- Datadog Helm chart

<div class="alert alert-info">Single Step Instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.</div>

### Requirements

- Kubernetes v1.20+
- [`Helm`][1] for deploying the Datadog Operator.
- [`Kubectl` CLI][2] for installing the Datadog Agent.

{{< collapse-content title="Installing with Datadog Operator" level="h4" >}}
Follow these steps to enable Single Step Instrumentation across your entire cluster with the Datadog Operator. This automatically sends traces for all applications in the cluster that are written in supported languages.

To enable Single Step Instrumentation with the Datadog Operator:

1. Install the [Datadog Operator][36] v1.5.0+ with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Create a Kubernetes secret to store your Datadog [API key][10]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Create `datadog-agent.yaml` with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       tags:
         - env:<AGENT_ENV>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         instrumentation:
           enabled: true  
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][12] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).
   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>

4. Run the following command:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. After waiting a few minutes for the Datadog Cluster Agent changes to apply, restart your applications.
{{< /collapse-content >}} 

{{< collapse-content title="Installing with Helm" level="h4" >}}
Follow these steps to enable Single Step Instrumentation across your entire cluster with Helm. This automatically sends traces for all applications in the cluster that are written in supported languages.

To enable Single Step Instrumentation with Helm:

1. Add the Helm Datadog repo:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes secret to store your Datadog [API key][10]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Create `datadog-values.yaml` and add the following configuration:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    tags:
         - env:<AGENT_ENV>
    apm:
      instrumentation:
         enabled: true
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][12] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>

4. Run the following command:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. After waiting a few minutes for the Datadog Cluster Agent changes to apply, restart your applications.

{{< /collapse-content >}} 

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[36]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

After you complete these steps, you may want to enable [runtime metrics][2] or view observability data from your application in the [Service Catalog][3].

## Advanced options

When you run the one-line installation command, there are a few options to customize your experience:

{{< tabs >}}
{{% tab "Linux host or VM" %}}

### Specifying tracing library versions {#lib-linux}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET Core services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` in your one-line installation command.

For example, to install support for only v1.25.0 of the Java tracing library and the latest Python tracing library, add the following to the installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Available versions are listed in tracer source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)

[2]: /agent/remote_config
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Docker" %}}

### Specifying tracing library versions {#lib-docker}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` when running the installation script.

For example, to install support for only v1.25.0 of the Java tracing library and the latest Python tracing library, add the following to the installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Available versions are listed in tracer source repositories for each language:

- [Java][8] (`java`)
- [Node.js][9] (`js`)
- [Python][10] (`python`)
- [.NET][11] (`dotnet`)
- [Ruby][12] (`ruby`)

[5]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance
[8]: https://github.com/DataDog/dd-trace-java/releases
[9]: https://github.com/DataDog/dd-trace-js/releases
[10]: https://github.com/DataDog/dd-trace-py/releases
[11]: https://github.com/DataDog/dd-trace-dotnet/releases
[12]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Enabling or disabling instrumentation for namespaces

You can choose to enable or disable instrumentation for applications in specific namespaces. You can only set enabledNamespaces or disabledNamespaces, not both.

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

To enable instrumentation for specific namespaces, add `enabledNamespaces` configuration to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true 
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

To disable instrumentation for specific namespaces, add `disabledNamespaces` configuration to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true 
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

To enable instrumentation for specific namespaces, add `enabledNamespaces` configuration to `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

To disable instrumentation for specific namespaces, add `disabledNamespaces` configuration to `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

### Specifying tracing library versions

<div class="alert alert-info">Starting with Datadog Cluster Agent v7.52.0+, you can automatically instrument a subset of your applications, based on the tracing libraries you specify.</div>

Specify Datadog tracing libraries and their versions to automatically instrument applications written in those languages. You can configure this in two ways, which are applied in the following order of precedence:

1. [Specify at the service level](#specifying-at-the-service-level), or
2. [Specify at the cluster level](#specifying-at-the-cluster-level).

**Default**: If you don't specify any library versions and `apm.instrumentation.enabled=true`, applications written in supported languages are automatically instrumented using the latest tracing library versions.

#### Specifying at the service level

To automatically instrument applications in specific pods, add the appropriate language annotation and library version for your application in your pod spec:

| Language   | Pod annotation                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |

Replace `<CONTAINER IMAGE TAG>` with the desired library version. Available versions are listed in the [Datadog container registries](#container-registries) and tracer source repositories for each language:

- [Java][31]
- [Node.js][32]
- [Python][33]
- [.NET][34] (For .NET applications using a musl-based Linux distribution like Alpine, specify a tag with the `-musl` suffix, such as `v2.29.0-musl`.)
- [Ruby][35]

<div class="alert alert-warning">Exercise caution when using the <code>latest</code> tag, as major library releases may introduce breaking changes.</div>

For example, to automatically instrument Java applications:

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

#### Specifying at the cluster level

If you don't enable automatic instrumentation for specific pods using annotations, you can specify which languages to instrument across the entire cluster using the Single Step Instrumentation configuration. When `apm.instrumentation.libVersions` is set, only applications written in the specified languages will be instrumented, using the specified library versions.

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

For example, to instrument .NET, Python, and Node.js applications, add the following configuration to your `datadog-agent.yaml` file:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: v2.46.0
            python: v1.20.6
            js: v4.17.0
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

For example, to instrument .NET, Python, and Node.js applications, add the following configuration to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: v2.46.0
            python: v1.20.6
            js: v4.17.0
{{< /highlight >}}

{{< /collapse-content >}}


#### Container registries

Datadog publishes instrumentation libraries images on gcr.io, Docker Hub, and Amazon ECR:

| Language   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js  | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |

The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent configuration specifies the registry used by the Admission Controller. The default value is `gcr.io/datadoghq`.

You can pull the tracing library from a different registry by changing it to `docker.io/datadog`, `public.ecr.aws/datadog`, or another URL if you are hosting the images in a local container registry.

For instructions on changing your container registry, see [Changing Your Container Registry][30].

[1]: https://helm.sh/
[2]: https://kubernetes.io/docs/tasks/tools/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: /getting_started/site/
[5]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[6]: /getting_started/site
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: /containers/guide/changing_container_registry/
[31]: https://github.com/DataDog/dd-trace-java/releases
[32]: https://github.com/DataDog/dd-trace-js/releases
[33]: https://github.com/DataDog/dd-trace-py/releases
[34]: https://github.com/DataDog/dd-trace-dotnet/releases
[35]: https://github.com/DataDog/dd-trace-rb/releases

{{% /tab %}}
{{< /tabs >}}

## Removing Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Removing instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service, follow these steps:

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

{{% /tab %}}

{{% tab "Docker" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Set the `admission.datadoghq.com/enabled:` label to `"false"` for the pod spec:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Apply the configuration:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Restart the services you want to remove instrumentation for.

{{% /tab %}}
{{< /tabs >}}

### Removing APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Docker" %}}

1. Run:
   ```shell
   dd-container-install --uninstall
   ```
2. Restart Docker:
   ```shell
   systemctl restart docker
   ```
   Or use the equivalent for your environment.

{{% /tab %}}

{{% tab "Kubernetes" %}}

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h4" >}}

1. Set `instrumentation.enabled=false` in `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Deploy the Datadog Agent with the updated configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h4" >}}

1. Set `instrumentation.enabled=false` in `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Run the following command:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/metrics/runtime_metrics/
[3]: /tracing/service_catalog/
[4]: /tracing/glossary/#instrumentation
