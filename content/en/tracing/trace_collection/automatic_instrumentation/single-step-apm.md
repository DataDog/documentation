---
title: Single Step Instrumentation (Beta)
kind: documentation
is_beta: true
aliases:
- /tracing/trace_collection/single-step-apm
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Requirements

- **Languages and architectures**: Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` and `arm64` architectures.

- **Operating systems**: Linux VMs (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, Kubernetes clusters with Linux containers.

## Enabling Single Step Instrumentation

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This allows you to automatically instrument your application, without any additional installation or configuration steps.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For an Ubuntu host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API][4] and `<YOUR_DD_SITE>` with your [Datadog site][3].

3. Start a new shell session.
4. Restart the services on the host or VM.

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

3. Restart the Docker containers.

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /tracing/service_catalog/
[7]: https://github.com/DataDog/dd-trace-js?tab=readme-ov-file#version-release-lines-and-maintenance


{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable APM by installing the Agent with the Datadog Helm chart. This deploys the Datadog Agent across all nodes in your Linux-based Kubernetes cluster with a DaemonSet.

**Note**: Single step instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.

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

4. Run the following command:
   ```bash
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Do a rolling restart on your applications for instrumentation to take effect.

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[14]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[15]: https://github.com/DataDog/dd-trace-dotnet/releases

{{% /tab %}}
{{< /tabs >}}

## Configuring Single Step Instrumentation

There are a few options to customize your experience:

- Enabling or disabling instrumentation by namespace.
- Specifying tracing library versions.
- Choosing specific pod specifications.

To learn more, read [Configuring Single Step Instrumentation][3].

## Removing Single Step Instrumentation from your Agent

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /agent/remote_config
[3]: /tracing/trace_collection/automatic_instrumentation/single-step-config/
