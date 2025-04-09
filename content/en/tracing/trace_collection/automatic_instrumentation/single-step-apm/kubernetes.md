---
title: Single Step APM Instrumentation on Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
---

## Overview

## Requirements

TODO: Determine if we want to remove platform-specific requirements from Compatibility page and instead include them here 

## Enable APM on your applications

*Note**: Single Step Instrumentation for Kubernetes is GA for Agent versions 7.64+, and in Preview for Agent versions <=7.63.

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

**Note**: To configure Single Step Instrumentation for specific namespace or pods, see [Advanced options](#advanced-options).

To enable Single Step Instrumentation with the Datadog Operator:

1. Install the [Datadog Operator][36] with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
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
     override:
       clusterAgent:
         image:
           tag: 7.64.1
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
           targets:
             - name: "default-target"
               ddTracerVersions:
                 java: "1"
                 dotnet: "3"
                 python: "2"
                 js: "5"
                 php: "1"
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

**Note**: To configure Single Step Instrumentation for specific namespace or pods, see [Advanced options](#advanced-options).

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
         targets:
           - name: "default-target"
             ddTracerVersions:
               java: "1"
               dotnet: "3"
               python: "2"
               js: "5"
               php: "1"
   ```
   Replace `<DATADOG_SITE>` with your [Datadog site][12] and `<AGENT_ENV>` with the environment your Agent is installed on (for example, `env:staging`).

   <div class="alert alert-info">See <a href=#advanced-options>Advanced options</a> for more options.</div>

4. Run the following command:
   ```shell
   helm install datadog-agent -f datadog-values.yaml datadog/datadog
   ```
5. After waiting a few minutes for the Datadog Cluster Agent changes to apply, restart your applications.

{{< /collapse-content >}}

After you complete these steps, you may want to enable [runtime metrics][3] or view observability data from your application in the [Software Catalog][4].

## Advanced Options

## Removing Single Step APM instrumentation from your Agent

### Removing instrumentation for specific services

### Removing APM for all services on the infrastructure

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /tracing/metrics/runtime_metrics/
[4]: /tracing/software_catalog/
[9]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: https://app.datadoghq.com/organization-settings/application-keys
[12]: /getting_started/site
[13]: https://v3.helm.sh/docs/intro/install/
[36]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog-operator


