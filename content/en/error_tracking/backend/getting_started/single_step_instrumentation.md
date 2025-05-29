---
title: Single Step Instrumentation for Backend Error Tracking
aliases:
- /error_tracking/standalone_backend/getting_started/single_step_instrumentation
further_reading:
- link: "/error_tracking/issue_states/"
  tag: "Documentation"
  text: "Error Tracking Issue States and Workflows"
- link: "/error_tracking/explorer"
  tag: "Documentation"
  text: "Learn about the Error Tracking Explorer"
- link: "/error_tracking/guides/enable_infra"
  tag: "Guide"
  text: "Enable infrastructure monitoring"
- link: "/error_tracking/guides/enable_apm"
  tag: "Guide"
  text: "Enable APM"
---

## Overview

Install or update a Datadog Agent with the **Enable APM Instrumentation** and **Error Tracking Standalone** options to enable standalone Backend Error Tracking.
This allows you to automatically instrument your application, without any additional installation or configuration steps.

## Install standalone Backend Error Tracking

The following examples show how it works for each deployment type.

{{< tabs >}}
{{% tab "Linux host or VM" %}}

For a Linux host:

1. Run the one-line installation command:

   ```shell
   DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE="<YOUR_DD_SITE>" DD_APM_INSTRUMENTATION_ENABLED=host DD_APM_INSTRUMENTATION_LIBRARIES="java:1,python:2,js:5,dotnet:3,php:1" DD_APM_ERROR_TRACKING_STANDALONE=true DD_ENV=<AGENT_ENV> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
   ```

   Replace `<YOUR_DD_API_KEY>` with your [Datadog API key][1], `<YOUR_DD_SITE>` with your [Datadog site][2], and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `staging`).
2. Restart the services on the host or VM.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /getting_started/site/

{{% /tab %}}

{{% tab "Kubernetes" %}}

You can enable Backend Error Tracking by installing the Agent with either:

- Datadog Operator
- Datadog Helm chart

<div class="alert alert-info">Single Step Instrumentation doesn't instrument applications in the namespace where you install the Datadog Agent. It's recommended to install the Agent in a separate namespace in your cluster where you don't run your applications.</div>

### Requirements

- Kubernetes v1.20+
- [Helm][3] for deploying the Datadog Operator.
- [Kubectl CLI][4] for installing the Datadog Agent.

{{< collapse-content title="Installing with Datadog Operator" level="h4" >}}
Follow these steps to enable Single Step Instrumentation across your entire cluster using the Datadog Operator. This enables tracing for all applications written in supported languages.


1. Install the [Datadog Operator][7] v1.14.0+ with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   helm install my-datadog-operator datadog/datadog-operator
   ```
2. Create a Kubernetes secret to store your Datadog [API key][5]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<YOUR_DD_API_KEY>
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
       env:
         - name: DD_CORE_AGENT_ENABLED
           value: "false"
     features:
       apm:
         errorTrackingStandalone:
           enabled: true
         instrumentation:
           enabled: true
           libVersions:
             java: "1"
             dotnet: "3"
             python: "2"
             js: "5"
             php: "1"
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][6] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).
4. Run the following command:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
5. Wait a few minutes for the Datadog Cluster Agent changes to apply, then restart your applications.
{{< /collapse-content >}}

{{< collapse-content title="Installing with Helm" level="h4" >}}
Follow these steps to enable Single Step Instrumentation across your entire cluster using Helm. This enables tracing for all applications written in supported languages.


1. Add the Helm Datadog repo:
   ```shell
    helm repo add datadog https://helm.datadoghq.com
    helm repo update
    ```
2. Create a Kubernetes secret to store your Datadog [API key][5]:
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
   Replace `<DATADOG_SITE>` with your [Datadog site][6] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).
4. Run the following command to deploy the agent:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. Wait a few minutes for the Datadog Cluster Agent changes to apply, then restart your applications.

{{< /collapse-content >}}

[3]: https://v3.helm.sh/docs/intro/install/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: /getting_started/site/
[7]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
