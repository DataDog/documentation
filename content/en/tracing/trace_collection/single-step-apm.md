---
title: Single Step APM Instrumentation (Beta)
kind: documentation
is_beta: true
---

## Requirements

Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` architectures.

## Enable APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM. This allows you to automatically instrument your application, without any additional installation or configuration steps. Restart services for this instrumentation to take effect.

The following examples show how it works on each infrastructure type. 

{{< tabs >}}
{{% tab "Linux host or VM" %}}

In one command, you can install, configure, and start the Agent with APM and [Remote Configuration][1] enabled, and set up automatic instrumentation of your services.

For an Ubuntu host:

1. Run the one-line install command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API][4].
   Replace `<YOUR_DD_SITE>` with your [Datadog site][3]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct **DATADOG SITE** is selected on this page).
2. Restart the services on the host or VM.
3. [Explore the performance observability of your services in Datadog][2].

   <div class="alert alert-info">You can optionally set an environment for your services and other telemetry that pass through the Agent. Read <a href="#tagging-observability-data-by-environment">tagging observability data by environment</a> to learn how. </div>

[1]: /agent/remote_config
[2]: /tracing/service_catalog/
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys

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
   Replace `<YOUR_DD_API_KEY>` with your [Datadog API][4].

3. Restart the Docker containers.
4. [Explore the performance observability of your services in Datadog][2].

   <div class="alert alert-info">You can optionally set an environment for your services and other telemetry that pass through the Agent. Read <a href="#tagging-observability-data-by-environment">tagging observability data by environment</a> to learn how. </div>

[1]: /agent/remote_config
[2]: /tracing/service_catalog/

{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable APM when installing the Agent with the [Datadog Operator](#operator) or [Helm chart](#helm-chart).

### Operator

The Datadog Operator is a way to deploy the Datadog Agent on Kubernetes and OpenShift.

#### Prerequisites

- Kubernetes Cluster version v1.20.X+: Tests were done on v1.20.0+; should be supported in v1.11.0+. For earlier versions, because of limited CRD support, the Operator may not work as expected.
- [`Helm`][2] for deploying the `datadog-operator`.
- [`Kubectl` CLI][3] for installing the `datadog-agent`.

#### Installation

To enable instrumentation with the Datadog Operator:

1. Install the [Datadog Operator][5]:

   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```

2. Create a Kubernetes secret with your API and app keys

   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY> --from-literal app-key=<DATADOG_APP_KEY>
   ```
   Replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your [Datadog API][6] and [application keys][7].

2. Create a file, `datadog-agent.yaml`, with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:

   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true  
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
   ```

   Replace `<DATADOG_SITE>` with your [Datadog site][10]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct **DATADOG SITE** is selected on this page).

3. Deploy the Datadog Agent with the above configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

### Helm chart

You can use the Datadog Helm chart to install the Datadog Agent on all nodes in your cluster with a DaemonSet.

#### Prerequisites

- [Helm][1]
- If this is a fresh install, add the Helm Datadog repo:
    ```bash
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```

#### Installation

To enable single step instrumentation with Helm:

1. Create an empty `datadog-values.yaml` file. Any parameters not specified in this file default to those set in [`values.yaml`][14].
2. Create a Kubernetes Secret to store your Datadog [API key][3] and [app key][15]:
   
   ```bash
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY --from-literal app-key=$DD_APP_KEY
   ```
3. Set the following parameters in your `datadog-values.yaml` to reference the secret and enable single step instrumentation:
   ```
   datadog:
    apiKeyExistingSecret: datadog-secret
    appKeyExistingSecret: datadog-secret
    site: <DATADOG_SITE>
    apm:
      instrumentation:
         enabled: true
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][13]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct SITE is selected on the right).
4. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

- `<RELEASE_NAME>`: Your release name. For example, `datadog-agent`.
- `<TARGET_SYSTEM>`: The name of your OS. For example, `linux` or `windows`.

**Note**: If you are using Helm `2.x`, run the following:
   ```bash
   helm install --name <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-state-metrics
[5]: /agent/kubernetes/apm?tab=helm
[6]: /agent/kubernetes/log?tab=helm
[8]: https://gcr.io/datadoghq
[9]: https://gallery.ecr.aws/datadog/
[10]: https://hub.docker.com/u/datadog/
[11]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/docs/Migration_1.x_to_2.x.md
[12]: /integrations/kubernetes_state_core
[13]: /getting_started/site
[14]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[15]: https://app.datadoghq.com/organization-settings/application-keys

### Enabling or disabling namespaces

You can choose to selectively instrument or to not instrument specific namespaces.

#### Operator

To enable instrumentation for specific namespaces:

1. Add the `enabledNamespaces` configuration to your `datadog-agent.yaml` file:
{{< highlight yaml "hl_lines=19-21" >}}
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true 
         enabledNamespaces:
           - default
           - applications
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
{{< /highlight >}}

2. Restart your services.

To disable instrumentation for specific namespaces:

1. Add the `disabledNamespaces` configuration to your `datadog-agent.yaml` file:
{{< highlight yaml "hl_lines=19-21" >}}
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true 
         disabledNamespaces:
           - default
           - applications
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
{{< /highlight >}}

2. Restart your services.

#### Helm chart

To enable instrumentation for specific namespaces:

1. Add the `enabledNamespaces` configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=8-10" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     appKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces:
            - default
            - applications
{{< /highlight >}}

4. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

To disable instrumentation for specific namespaces:

1. Add the `disabledNamespaces` configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=8-10" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     appKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces:
            - default
            - applications
{{< /highlight >}}

4. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

### Specifying tracing library versions

You can optionally set specific tracing library versions to use. If you don't set a specific version, it defaults to the latest version.

#### Operator

1. Add the following configuration to your `datadog-agent.yaml` file:
{{< highlight yaml "hl_lines=19-24" >}}
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
   metadata:
     name: datadog
   spec:
     global:
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true 
         libVersions:
            dotnet: v2.40.0
            python: v1.20.6
            java: v1.22.0
            js: v4.17.0
            ruby: v1.15.0 
     override:
       clusterAgent:
         image:
           name: gcr.io/datadoghq/cluster-agent:latest
       nodeAgent:
         image:
           name: gcr.io/datadoghq/agent:latest
{{< /highlight >}}

2. Restart your services.

#### Helm chart

1. Add the following configuration to your `datadog-values.yaml` file:
{{< highlight yaml "hl_lines=8-13" >}}
   datadog:
     apiKeyExistingSecret: datadog-secret
     appKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     apm:
       instrumentation:
       enabled: true
       libVersions:
            dotnet: v2.40.0
            python: v1.20.6
            java: v1.22.0
            js: v4.17.0
            ruby: v1.15.0 
{{< /highlight >}}

4. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

[3]: /containers/kubernetes/installation/?tab=operator
[4]: /containers/kubernetes/installation/?tab=helm
[5]: https://artifacthub.io/packages/helm/datadog/datadog-operator
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: https://app.datadoghq.com/organization-settings/application-keys
[9]: /getting_started/site

{{% /tab %}}
{{< /tabs >}}

### Tagging observability data by environment

Set `DD_ENV` in your one-line install command for Linux and the library injector installation command for Docker to automatically tag instrumented services and other telemetry that pass through the Agent with a specific environment. For example, if the Agent is installed in your staging environment, set `DD_ENV=staging` to associate your observability data with `staging`.

For Kubernetes, you can add this to your configuration files:
- Datadog Operator: Add a `- env:<env-name>` tag to `datadog-agent.yaml`.
   ```yaml
   spec:
      global:
         tags:
            - env:staging
   ```
- Helm charts: Add a `- env:<env-name>` tag to `datadog-values.yaml`
   ```yaml
   datadog:
      tags:
         - env:staging
   ```

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

1. Go to the configuration file for the Kubernetes service you want to disable instrumentation for.
2. Add the `admission.datadoghq.com/enabled=false` annotation to the file:
   ```yaml
   metadata:
      annotations:
         admission.datadoghq.com/enabled: "false"
   ```
3. Update the service:
   ```bash
   kubectl apply -f /path/to/your/service.yaml
   ```

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

For the Datadog Operator:

1. Update the following configuration in `datadog-agent.yaml`:
{{< highlight yaml "hl_lines=4" >}}
   features:  
     apm:
       instrumentation:
         enabled: false
{{< /highlight >}}

2. Deploy the Datadog Agent with the updated configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```

For Helm charts: 

1. Update the following configuration in `datadog-values.yaml`:
{{< highlight yaml "hl_lines=4" >}}
   datadog:  
     apm:
       instrumentation:
         enabled: false
{{< /highlight >}}

4. Run the following command:
   ```bash
   helm install <RELEASE_NAME> \
    -f datadog-values.yaml \
    --set targetSystem=<TARGET_SYSTEM> \
    datadog/datadog
   ```

{{% /tab %}}

{{< /tabs >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

