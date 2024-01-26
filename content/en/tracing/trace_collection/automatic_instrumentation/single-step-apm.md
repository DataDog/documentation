---
title: Single Step APM Instrumentation (Beta)
kind: documentation
is_beta: true
aliases:
- /tracing/trace_collection/single-step-apm
---

## Requirements

Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` and `arm64` architectures.

## Enabling APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This allows you to automatically instrument your application, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.

The following examples show how it works on each infrastructure type. 

{{< tabs >}}
{{% tab "Linux host or VM" %}}

With one command, you can install, configure, and start the Agent, while also instrumenting your services with APM.

For an Ubuntu host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
   ```

   a. Replace `<YOUR_DD_API_KEY>` with your [Datadog API][4].

   b. Replace `<YOUR_DD_SITE>` with your [Datadog site][3].  
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-linux">Specifying tracing library versions.</a></li>
         <li><a href="#env-linux">Tagging observability data by environment.</a></li>
      </ul>
   </div>
2. Exit your current shell session.
3. Start a new shell session.
4. Restart the services on the host or VM.
5. [Explore the performance observability of your services in Datadog][5].

### Specifying tracing library versions {#lib-linux}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET Core services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` in your one-line installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. Language names are comma-separated.

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][6] for more information.

### Tagging observability data by environment {#env-linux}

Set `DD_ENV` in your one-line installation command for Linux to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_ENV=staging bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

[2]: /agent/remote_config
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /tracing/service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

For a Docker Linux container:

1. Install the library injector:
   ```shell
   bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
     -v /opt/datadog/apm:/opt/datadog/apm \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     gcr.io/datadoghq/agent:7
   ```
   Replace `<YOUR_DD_API_KEY>` with your [Datadog API][5].
   <div class="alert alert-info">
      You can also optionally configure the following:
      <ul>
         <li><a href="#lib-docker">Specifying tracing library versions.</a></li>
         <li><a href="#env-docker">Tagging observability data by environment.</a></li>
      </ul>
   </div>
3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][6].

### Specifying tracing library versions {#lib-docker}

By default, enabling APM on your server installs support for Java, Python, Ruby, Node.js, and .NET services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` when running the installation script.

For example, to install support for only v1.25.0 of the Java tracing library and the latest Python tracing library, add the following to the installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_docker_injection.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. Language names are comma-separated.

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][7] for more information.

### Tagging observability data by environment {#env-docker}

Set `DD_ENV` in the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

{{< highlight shell "hl_lines=4" >}}
docker run -d --name dd-agent \
  -e DD_API_KEY=${YOUR_DD_API_KEY} \
  -e DD_APM_ENABLED=true \
  -e DD_ENV=staging \
  -e DD_APM_NON_LOCAL_TRAFFIC=true \
  -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC=true \
  -e DD_APM_RECEIVER_SOCKET=/opt/datadog/apm/inject/run/apm.socket \
  -e DD_DOGSTATSD_SOCKET=/opt/datadog/apm/inject/run/dsd.socket \
  -v /opt/datadog/apm:/opt/datadog/apm \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  gcr.io/datadoghq/agent:7
{{< /highlight >}}

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable APM by installing the Agent with the Datadog Helm chart. This deploys the Datadog Agent across all nodes in your Linux-based Kubernetes cluster with a DaemonSet.

### Requirements

- Make sure you have [Helm][13] installed.

### Installation

To enable single step instrumentation with Helm:

1. Add the Helm Datadog repo:
   ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes secret to store your Datadog [API key][10]:
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
3. Create `datadog-values.yaml` and add the following configuration:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    apm:
      instrumentation:
         enabled: true
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][12].

   <div class="alert alert-info">
      Here you can also optionally configure the following:
      <ul>
         <li><a href="#enabling-or-disabling-instrumentation-for-namespaces">Enabling or disabling instrumentation for namespaces.</a></li>
         <li><a href="#specifying-tracing-library-versions">Specifying tracing library versions.</a></li>
         <li><a href="#env-k8">Tagging observability data by environment.</a></li>
         <li><a href="https://docs.datadoghq.com/tracing/trace_collection/library_injection_local/">Choosing specific pod specifications.</a></li>
      </ul>
   </div>


4. Run the following command:
   ```bash
   helm install datadog-agent -f datadog-values.yaml
   ```

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml

### Enabling or disabling instrumentation for namespaces

You can choose to selectively instrument specific namespaces or choose to not instrument them.

To enable instrumentation for specific namespaces, replace `enabled: true` with `enabledNamespaces` configuration in your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=6-8" >}}
      datadog:
        apiKeyExistingSecret: datadog-secret
        site: <DATADOG_SITE>
        apm:
          instrumentation:
            enabledNamespaces: # Add namespaces to instrument
               - namespace_1
               - namespace_2
 {{< /highlight >}}

<div class="alert alert-info">The <code>enabled: true</code> option enables instrumentation for the entire cluster. You need to remove this to only enable instrumentation for specific namespaces.</a></div>

To disable instrumentation for specific namespaces, add the `disabledNamespaces` configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=7-9" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

### Specifying tracing library versions

You can optionally set specific tracing library versions to use. If you don't specify a version, it defaults to the latest version. To find the latest version for a library, go to **Releases** in the dd-trace-&lt;language&gt; GitHub repo. For example, [dd-trace-dotnet releases][15].

To set specific tracing library versions, add the following configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=7-12" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any versions you want to set
            dotnet: v2.40.0
            python: v1.20.6
            java: v1.22.0
            js: v4.17.0
            ruby: v1.15.0 
{{< /highlight >}}

Supported languages include:

- .NET (`dotnet`)
- Python (`python`)
- Java (`java`)
- Node.js (`js`)
- Ruby (`ruby`)

### Tagging observability data by environment {#env-k8}

Automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `env:staging` to associate your observability data with `staging`.

For example, add the following configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=4-5" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
         - env:staging
     apm:
       instrumentation:
         enabled: true
{{< /highlight >}}

[15]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}
{{< /tabs >}}

## Removing Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the follow steps:

### Removing instrumentation for specific services

Run the following commands and restart the service to stop injecting the library into the service and stop producing traces from that service.

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
   ```bash
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Restart the services you want to remove instrumentation for.

{{% /tab %}}

{{< /tabs >}}

### Removing APM for all services on the infrastructure

To stop producing traces, remove library injectors and restart the infrastructure:

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Run:
   ```shell
   dd-host-install --uninstall
   ```
2. Restart your host.

{{% /tab %}}

{{% tab "Docker" %}}

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

{{% tab "Kubernetes" %}}

1. Under `apm:`, remove `instrumentation:` and all following configuration in `datadog-values.yaml`.
2. Run the following command:
   ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
3. Restart your services.

{{% /tab %}}

{{< /tabs >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/remote_config
