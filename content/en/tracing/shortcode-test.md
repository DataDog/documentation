---
title: Test collapse-content shortcode (DELETE BEFORE MERGE)
kind: documentation
---

## Requirements

- **Languages and architectures**: Single step APM instrumentation only supports tracing Java, Python, Ruby, Node.js, and .NET Core services on `x86_64` and `arm64` architectures.

- **Operating systems**: Linux VMs (Debian, Ubuntu, Amazon Linux, CentOS/Red Hat, Fedora), Docker, Kubernetes clusters with Linux containers.

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

[2]: /agent/remote_config
[3]: /getting_started/site/
[4]: https://app.datadoghq.com/organization-settings/api-keys
[5]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
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

{{< collapse-content title="Installing with Datadog Operator" level="h4" >}}

To enable single step instrumentation with the Datadog Operator:

1. Install the [Datadog Operator][5] with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Create a Kubernetes secret to store your Datadog [API key][3]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
2. Create `datadog-agent.yaml` with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:
   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
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
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true  
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][6] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

      <div class="alert alert-info">
      Here you can also optionally configure the following:
      <ul>
         <li><a href="#enabling-or-disabling-instrumentation-for-namespaces">Enabling or disabling instrumentation for namespaces.</a></li>
         <li><a href="#specifying-tracing-library-versions">Specifying tracing library versions.</a></li>
         <li><a href="/tracing/trace_collection/library_injection_local/">Choosing specific pod specifications.</a></li>
      </ul>
   </div>

3. Run the following command:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
4. Restart your applications.
{{< /collapse-content >}} 

{{< collapse-content title="Installing with Helm" level="h4" >}}

To enable single step instrumentation with Helm:

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

   <div class="alert alert-info">
      Here you can also optionally configure the following:
      <ul>
         <li><a href="#enabling-or-disabling-instrumentation-for-namespaces">Enabling or disabling instrumentation for namespaces.</a></li>
         <li><a href="#specifying-tracing-library-versions">Specifying tracing library versions.</a></li>
         <li><a href="/tracing/trace_collection/library_injection_local/">Choosing specific pod specifications.</a></li>
      </ul>
   </div>


4. Run the following command:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Restart your applications.

{{< /collapse-content >}} 

[5]: https://app.datadoghq.com/organization-settings/api-keys
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

## Test without tabs

{{% collapse-content title="Installing with Datadog Operator" level="h4" %}}

To enable single step instrumentation with the Datadog Operator:

1. Install the [Datadog Operator][5] with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Create a Kubernetes secret to store your Datadog API key:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
   ```
2. Create `datadog-agent.yaml` with the spec of your Datadog Agent deployment configuration. The simplest configuration is as follows:
   ```yaml
   kind: DatadogAgent
   apiVersion: datadoghq.com/v2alpha1
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
         appSecret:
           secretName: datadog-secret
           keyName: app-key
   features:
     apm:
       instrumentation:
         enabled: true  
   ```
   Replace `<DATADOG_SITE>` with your Datadog site and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

      <div class="alert alert-info">
      Here you can also optionally configure the following:
      <ul>
         <li><a href="#enabling-or-disabling-instrumentation-for-namespaces">Enabling or disabling instrumentation for namespaces.</a></li>
         <li><a href="#specifying-tracing-library-versions">Specifying tracing library versions.</a></li>
         <li><a href="/tracing/trace_collection/library_injection_local/">Choosing specific pod specifications.</a></li>
      </ul>
   </div>

3. Run the following command:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
4. Restart your applications.
{{% /collapse-content %}} 

{{% collapse-content title="Installing with Helm" level="h4" %}}

To enable single step instrumentation with Helm:

1. Add the Helm Datadog repo:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes secret to store your Datadog API key:
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
   Replace `<DATADOG_SITE>` with your Datadog site and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

   <div class="alert alert-info">
      Here you can also optionally configure the following:
      <ul>
         <li><a href="#enabling-or-disabling-instrumentation-for-namespaces">Enabling or disabling instrumentation for namespaces.</a></li>
         <li><a href="#specifying-tracing-library-versions">Specifying tracing library versions.</a></li>
         <li><a href="/tracing/trace_collection/library_injection_local/">Choosing specific pod specifications.</a></li>
      </ul>
   </div>


4. Run the following command:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Restart your applications.

{{% /collapse-content %}} 

