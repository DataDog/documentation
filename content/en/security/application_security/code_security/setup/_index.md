---
title: Code Security Setup
disable_toc: false
aliases:
- /security/application_security/enabling/single_step/code_security/
- /security/application_security/enabling/tracing_libraries/code_security/
further_reading:
- link: "logs/processing/pipelines"
  tag: "Documentation"
  text: "Log processing pipelines"
- link: "/security/application_security/code_security"
  tag: "Documentation"
  text: "Code Security"
- link: "https://www.datadoghq.com/blog/iast-datadog-code-security/"
  tag: "Blog"
  text: "Enhance application security in production with Datadog Code Security"
- link: "https://www.datadoghq.com/blog/code-security-owasp-benchmark/"
  tag: "Blog"
  text: "Datadog Code Security achieves 100 percent accuracy in OWASP Benchmark by using an IAST approach"
---

## Prerequisites
Before setting up Code Security, ensure the following prerequisites are met:

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
3. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Code Security capabilities for the language of your application or service. For more details, refer to the [Library Compatibility][1] page.

## Code Security Enablement Types

There are two main approaches to enable Code Security on your tracing libraries: Single-Step Instrumentation and Datadog Tracing Libraries.

### Single-Step Instrumentation

Run a one-line install command to install the Datadog Agent, and enable Code Security with Single-Step Instrumentation.

### Datadog Tracing Libraries
Add an environment variable or a new argument to your Datadog Tracing Library configuration.

By following these steps, you'll successfully set up Code Security for your application or service, ensuring comprehensive monitoring and identification of code-level vulnerabilities at runtime.


## Enabling Code Security using single step instrumentation


<div class="alert alert-info">Enabling Code Security using single step instrumentation is in beta.</div>


### Requirements

- **Minimum Agent version 7.53.0**
- **Minimum Datadog Helm chart version 3.62.0** (for Kubernetes deployments).
- **Languages and architectures**: Single step instrumentation for Code Security only supports tracing Java, Node.js, .NET Core services on `x86_64` and `arm64` architectures, and Python (support available in private beta).
- **Operating systems**: Linux VMs (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, Kubernetes clusters with Linux containers.

### Enabling in one step

If you install or update a Datadog Agent with the **Enable Code Security** option selected, the Agent is installed and configured to enable detection of code-level vulnerabilities in your applications. This allows you to automatically instrument your application, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.


{{< img src="/security/application_security/single_step/asm_single_step_code_security.png" alt="Account settings Ubuntu setup page highlighting the toggle for Enabling APM instrumentation and ASM for Code Security." style="width:100%;" >}}

The following examples show how it works on each infrastructure type.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

With one command, you can install, configure, and start the Agent, while also instrumenting your services with Application Security options.

For an Ubuntu host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   a. Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][4].

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

**Note:** To configure single-step for **both** Code Security and Threat Protection, add **both** the `DD_IAST_ENABLED=true` _and_ `DD_APPSEC_ENABLED=true` environment variables to your one-line installation command.

### Specifying tracing library versions {#lib-linux}

By default, enabling APM on your server installs support for Java, Node.js, .NET Core, and Python services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` in your one-line installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true  DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Supported languages include:

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][6] for more information.

### Tagging observability data by environment {#env-linux}

Set `DD_ENV` in your one-line installation command for Linux to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_IAST_ENABLED=true DD_ENV=staging bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

[2]: /agent/remote_config
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: /service_catalog/
[6]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance

{{% /tab %}}

{{% tab "Docker" %}}

For a Docker Linux container:

1. Install the library injector:
   ```shell
   DD_IAST_ENABLED=true DD_APM_INSTRUMENTATION_ENABLED=docker DD_NO_AGENT_INSTALL=true bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```
2. Configure the Agent in Docker:
   ```shell
   docker run -d --name dd-agent \
     -e DD_API_KEY=${YOUR_DD_API_KEY} \
     -e DD_SITE=${YOUR_DD_SITE} \
     -e DD_APM_ENABLED=true \
     -e DD_APM_NON_LOCAL_TRAFFIC=true \
     -e DD_APM_RECEIVER_SOCKET=/var/run/datadog/apm.socket \
     -e DD_DOGSTATSD_SOCKET=/var/run/datadog/dsd.socket \
     -v /var/run/datadog:/var/run/datadog \
     -v /var/run/docker.sock:/var/run/docker.sock:ro \
     -v /proc/:/host/proc/:ro \
     -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
     -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
     gcr.io/datadoghq/agent:7
   ```
   a. Replace `<YOUR_DD_API_KEY>` with your [Datadog API][5].

   b. Replace `<YOUR_DD_SITE>` with your [Datadog site][3].
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

By default, enabling APM on your server installs support for Java, Python, Node.js, and .NET services. If you only have services implemented in some of these languages, set `DD_APM_INSTRUMENTATION_LIBRARIES` when running the installation script.

For example, to install support for only v1.25.0 of the Java tracing library and the latest Python tracing library, add the following to the installation command:

```shell
DD_APM_INSTRUMENTATION_LIBRARIES="java:1.25.0,python" bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_docker_injection.sh)"
```

You can optionally provide a version number for the tracing library by placing a colon after the language name and specifying the tracing library version. If you don't specify a version, it defaults to the latest version. Language names are comma-separated.

Supported languages include:

- Java (`java`)
- Node.js (`js`)
- .NET (`dotnet`)
- Python (`python`)

**Note**: For the Node.js tracing library, different versions of Node.js are compatible with different versions of the Node.js tracing library. See [DataDog/dd-trace-js: JavaScript APM Tracer][7] for more information.

### Tagging observability data by environment {#env-docker}

Set `DD_ENV` in the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For example:

{{< highlight shell "hl_lines=5" >}}
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

[3]: /getting_started/site/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable APM by installing the Agent with the Datadog Helm chart. This deploys the Datadog Agent across all nodes in your Linux-based Kubernetes cluster with a DaemonSet.

<div class="alert alert-info">Single step instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.</div>

### Requirements

- Make sure you have [Helm][13] installed.

### Installation

To enable single step instrumentation with Helm:

1. Add the Helm Datadog repo:
   ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes Secret to store your Datadog [API key][10]:
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
    asm:
      iast:
        enabled: true
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][12].

4. Run the following command:
   ```bash
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Do a rolling restart on your applications for instrumentation to take effect.

For more information on Kubernetes single step instrumentation, see the following:

* [Enabling or Disabling Single Step Instrumentation by namespaces][15]
* [Specifying Instrumentation libraries versions][16]
* [Removing Instrumentation on specific deployments][17]

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#enabling-or-disabling-instrumentation-for-namespaces
[16]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#specifying-tracing-library-versions
[17]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=kubernetes#removing-instrumentation-for-specific-services

{{% /tab %}}
{{< /tabs >}}

### Removing Single Step APM and Application Security instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the follow steps:

#### Removing instrumentation for specific services

Run the following commands and restart the service to stop injecting the library into the service and stop producing traces from that service.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:

   ```shell
   DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

3. To disable Code Security, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.



{{% /tab %}}

{{% tab "Docker" %}}

1. Add the `DD_INSTRUMENT_SERVICE_WITH_APM` environment variable to the service startup command:
   ```shell
   docker run -e DD_INSTRUMENT_SERVICE_WITH_APM=false <service_start_command>
   ```
2. Restart the service.

3. To disable Code Security, remove the `DD_IAST_ENABLED=true` environment variable from your application configuration, and restart your service.
{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Set the `admission.datadoghq.com/enabled:` label to `"false"` for the pod spec:
  
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"

<div class="alert alert-info"> You can disable Code Security while keeping APM up by adding the <code>DD_IAST_ENABLED=false</code> environment variable to your deployments.</div>

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
2. Under `asm:`, remove `iast:` and all following configuration in`datadog-values.yaml`.
3. Run the following command:
  
    ```bash
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog

{{% /tab %}}

{{< /tabs >}}

## Using Datadog Tracing Libraries

Select your application language for details on how to enable Code Security for your language and infrastructure types.

{{< partial name="security-platform/appsec-languages-code-security.html" >}}</br>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /security/application_security/code_security/setup/compatibility/
