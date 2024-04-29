---
title: Getting Started with APM
kind: documentation
aliases:
    - /getting_started/tracing/distributed-tracing
further_reading:
    - link: '/tracing/trace_collection/'
      tag: 'Documentation'
      text: 'Select your application language'
    - link: '/tracing/glossary/'
      tag: 'Documentation'
      text: 'Use the APM UI'
    - link: 'https://learn.datadoghq.com/courses/intro-to-apm'
      tag: 'Learning Center'
      text: 'Introduction to Application Performance Monitoring'
    - link: 'https://dtdg.co/fe'
      tag: 'Foundation Enablement'
      text: 'Join an interactive session to boost your APM understanding'
---

## Overview

Datadog Application Performance Monitoring (APM) provides deep visibility into your applications, enabling you to identify performance bottlenecks, troubleshoot issues, and optimize your services.

This guide demonstrates how to send observability data from a sample e-commerce application, Storedog, to Datadog.

Follow this guide to:

1. Instrument the Storedog application.
2. Run Storedog in a local Kubernetes environment using minikube.
3. Explore the collected observability data in Datadog.

## Prerequisites

Before you begin, you first need to:

1. Create a [Datadog account][1], if you haven't already.
1. Install [minikube][2].
1. Install [Helm][3] to deploy the Datadog Operator.
1. Install [Kubectl CLI][4] to install the Datadog Agent.
1. Clone the sample Storedog application:
   ```shell
   git clone https://github.com/DataDog/storedog.git
   ```

## Instrument the application

Enable APM with Single Step Instrumentation. This installs the Datadog Agent and automatically instruments the Storedog application.

1. Install the [Datadog Operator][5] v1.5.0+ with Helm:
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm install my-datadog-operator datadog/datadog-operator
   ```
1. Create a Kubernetes secret to store your Datadog [API key][6]:
   ```shell
   kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
   ```
1. Create a `datadog-agent.yaml` file with the following configuration:
   ```yaml
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
     features:
       apm:
         instrumentation:
           enabled: true
   ```
1. Apply the configuration:
   ```shell
   kubectl apply -f datadog-agent.yaml
   ```
1. After waiting a few minutes for the Datadog Cluster Agent changes to apply, restart your applications.

## Run the application

Generate observability data by running Storedog in Minikube:

1. Start minikube:
  ```shell
  minikube start
  ```
2. Apply the Kubernetes manifests:
  ```shell
  kubectl apply -f k8s-manifests/
  ```
3. Wait for the pods to start running:
  ```shell
  kubectl get pods
  ```
4. Access Storedog by opening the URL from the following command in your browser:
  ```shell
  minikube service storedog-frontend --url
  ```
5. Interact with the application to generate observability data.


## Explore observability data in Datadog

1. In Datadog, go to **APM** > **Services**. Storedog services are prefixed with storedog-.
2. Select a service to view its performance metrics, such as latency, throughput, and error rates.
3. Go to **APM** > **Traces**. Select a trace to see its details, including the flame graph, which helps identify performance bottlenecks.
4. Explore additional APM features, like [App Analytics][link-to-app-analytics-docs], [Trace Search][link-to-trace-search-docs], and [Watchdog][link-to-watchdog-docs], to gain deeper insights into Storedog's performance.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://minikube.sigs.k8s.io/docs/start/
[3]: https://v3.helm.sh/docs/intro/install/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/