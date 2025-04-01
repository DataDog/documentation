---
title: Backend Error Tracking
aliases:
- /error_tracking/standalone_backend/getting_started
further_reading:
- link: '/error_tracking/issue_states/'
  tag: 'Documentation'
  text: 'Error Tracking Issue States and Workflows'
- link: '/error_tracking/backend/exception_replay'
  tag: 'Documentation'
  text: 'Simplify production debugging with Datadog Exception Replay'
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
---

## Overview

[Error Tracking][1] processes errors collected by the Datadog Agent. Whenever an error is collected, Error Tracking processes and groups it under an issue, or group of similar errors.

## Getting started

Follow the [in-app setup instructions][4] or choose an instrumentation approach to start collecting backend errors:

- [Single step instrumentation](#using-single-step-instrumentation)
- [Manual instrumentation](#using-datadog-tracing-libraries)

### Using Single Step Instrumentation

Install or update a Datadog Agent with the **Enable APM Instrumentation** and **Error Tracking Standalone** options to enable standalone Backend Error Tracking. This allows you to automatically instrument your application, without any additional installation or configuration steps.

The following examples show how it works for each deployment type.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For a Linux host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_APM_ERROR_TRACKING_STANDALONE=true DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][5], `<YOUR_DD_SITE>` with your [Datadog site][6], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
2. Restart the services on the host or VM.

[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /getting_started/site/

{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable Backend Error Tracking by installing the Agent with either:

- Datadog Operator
- Datadog Helm chart

<div class="alert alert-info">Single Step Instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.</div>

### Requirements

- Kubernetes v1.20+
- [Helm][7] for deploying the Datadog Operator.
- [Kubectl CLI][8] for installing the Datadog Agent.

{{< collapse-content title="Installing with Datadog Operator" level="h4" >}}
Coming soon
{{< /collapse-content >}}

{{< collapse-content title="Installing with Helm" level="h4" >}}
Follow these steps to enable Single Step Instrumentation across your entire cluster with Helm. This automatically sends errors for all applications in the cluster that are written in supported languages.

To enable Single Step Instrumentation with Helm:

1. Add the Helm Datadog repo:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes secret to store your Datadog [API key][9]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
   ```
3. Create `datadog-values.yaml` and add the following configuration:
   ```yaml
   agents:
     containers:
       agent:
         env:
           - name: DD_CORE_AGENT_ENABLED
             value: "false"
   datadog:
     processAgent:
       enabled: false
       containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
       errorTrackingStandalone:
         enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][10] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

4. Run the following command to deploy the agent:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. After waiting a few minutes for the Datadog Cluster Agent changes to apply, restart your applications.

{{< /collapse-content >}}

[7]: https://v3.helm.sh/docs/intro/install/
[8]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: /getting_started/site/

{{% /tab %}}
{{< /tabs >}}

### Using Datadog tracing libraries

To instrument your application with Datadog libraries:

1. [Install and configure the Agent](#install-and-configure-the-agent).
2. [Add the Datadog tracing library to your code](#instrument-your-application).

#### Install and configure the Agent

Install the Datadog Agent by following the [relevant documentation][11].

To configure the agent for Error Tracking Backend only, you must be running Agent v7.61+.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

1. Open the [datadog.yaml configuration file][12].
2. Add `core_agent` and `apm_config` as top-level attributes anywhere in the configuration file with the following settings:

   ```yaml
   core_agent:
     enabled: false
   apm_config:
     error_tracking_standalone:
       enabled: true
   ```

3. [Restart the Agent][13].

[12]: /agent/configuration/agent-configuration-files/
[13]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Docker" %}}

If you're using the Docker containerized Agent, set the following environment variables:
- `DD_CORE_AGENT_ENABLED=false`
- `DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true`

Here's an example of how you can include these settings in your Docker run command:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_CORE_AGENT_ENABLED=false \
           -e DD_APM_ERROR_TRACKING_STANDALONE_ENABLED=true \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/agent:latest
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

If you're deploying the Agent in Kubernetes, make the following changes in your Helm chart in addition to your Agent configuration:

```yaml
agents:
  containers:
    agent:
      env:
        - name: DD_CORE_AGENT_ENABLED
          value: "false"
datadog:
[...]
  processAgent:
    enabled: false
    containerCollection: false
[...]
  apm:
    errorTrackingStandalone:
      enabled: true
```

{{% /tab %}}
{{< /tabs >}}

#### Instrument your application

Follow the relevant [documentation][14] to set up your application to send traces using one of the official Datadog tracing libraries.
Follow the [OpenTelemetry API guide][3] for your application language to manually send errors through span events.

### Advanced options

#### Enable Infrastructure Monitoring

Update the Datadog Agent configuration to enable [Infrastructure monitoring][15].

{{< tabs >}}
{{% tab "Linux host or VM" %}}

If your agent is deployed on a Linux host, the configuration update depends on the method you used to install the agent.

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
For a Datadog agent installed using the one-line installation command:

1. Open the [datadog.yaml configuration file][16].
2. Remove the `enable_payloads` top-level attribute:

   ```diff
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     apm_config:
       enabled: true
       error_tracking_standalone:
         enabled: true
   ```

3. [Restart the Agent][17].
{{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
For a Datadog agent configured manually for Backend Error Tracking:

1. Open the [datadog.yaml configuration file][16].
2. Remove the `core_agent` top-level attribute:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
       error_tracking_standalone:
         enabled: true
   ```

3. [Restart the Agent][17].
{{< /collapse-content >}}

[16]: /agent/configuration/agent-configuration-files
[17]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

If your agent is deployed in Kubernetes, you need to update its configuration in Datadog Operator or Helm depending on the method you used to install the agent.

{{< collapse-content title="Helm" level="h5" >}}
For a Datadog agent installed with Helm:

1. Update your datadog-values.yaml file

   ```diff
     agents:
       containers:
         agent:
           env:
             [...]
   -         - name: DD_CORE_AGENT_ENABLED
   -           value: "false"
     datadog:
   -   processAgent:
   -     enabled: false
   -     containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
       errorTrackingStandalone:
         enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```

2. After making your changes, upgrade your Datadog Helm chart
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
Coming soon
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

#### Enable APM

Update the Datadog Agent configuration to enable [APM][18].

{{< tabs >}}
{{% tab "Linux host or VM" %}}

If your agent is deployed on a Linux host, the configuration update depends on the method you used to install the agent.

{{< collapse-content title="Single Step Instrumentation" level="h5" >}}
For a Datadog agent installed using the one-line installation command:

1. Open the [datadog.yaml configuration file][19].
2. Remove the `enable_payloads` and `error_tracking_standalone` attributes:

   ```diff
   - # Configuration to prevent sending metric data so that hosts don't show up in Datadog.
   - enable_payloads:
   -   series: false
   -   events: false
   -   service_checks: false
   -   sketches: false

     # Configuration to enable the collection of errors so they show up in Error Tracking.
     apm_config:
       enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Restart the Agent][20].
{{< /collapse-content >}}

{{< collapse-content title="Using Datadog tracing libraries" level="h5" >}}
For a Datadog agent configured manually for Backend Error Tracking:

1. Open the [datadog.yaml configuration file][19].
2. Remove the `core_agent` and `error_tracking_standalone` attributes:

   ```diff
   - core_agent:
   -   enabled: false
     apm_config:
   +   enabled: true
   -   error_tracking_standalone:
   -     enabled: true
   ```

3. [Restart the Agent][20].
{{< /collapse-content >}}

[19]: /agent/configuration/agent-configuration-files
[20]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}
{{% tab "Kubernetes" %}}

If your agent is deployed in Kubernetes, you need to update its configuration in Datadog Operator or Helm depending on the method you used to install the Agent.

{{< collapse-content title="Helm" level="h5" >}}
For a Datadog Agent installed with Helm:

1. Update your datadog-values.yaml file

   ```diff
     agents:
       containers:
         agent:
           env:
             [...]
   -         - name: DD_CORE_AGENT_ENABLED
   -           value: "false"
     datadog:
   -   processAgent:
   -     enabled: false
   -     containerCollection: false
     apiKeyExistingSecret: datadog-secret
     site: <DATADOG_SITE>
     tags:
       - env:<AGENT_ENV>
     apm:
   -   errorTrackingStandalone:
   -     enabled: true
       # Required to enable Single-Step Instrumentation
       instrumentation:
         enabled: true
         libVersions:
           java: "1"
           dotnet: "3"
           python: "2"
           js: "5"
           php: "1"
   ```

2. After making your changes, upgrade your Datadog Helm chart
   ```shell
   helm upgrade -f datadog-values.yaml datadog-agent datadog/datadog
   ```
{{< /collapse-content >}}

{{< collapse-content title="Datadog Operator" level="h5" >}}
Coming soon
{{< /collapse-content >}}

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking
[2]: /tracing/error_tracking/#use-span-attributes-to-track-error-spans
[3]: /tracing/trace_collection/custom_instrumentation/?tab=opentelemetryapi#getting-started
[4]: https://app.datadoghq.com/error-tracking/settings/setup/backend
[11]: /agent
[14]: /tracing/trace_collection/automatic_instrumentation/dd_libraries
[15]: /infrastructure
[18]: /tracing
