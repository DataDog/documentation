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

This guide demonstrates how to configure a sample e-commerce application, Storedog, to send APM data to Datadog. You will instrument the application, run it in a local Kubernetes environment using Minikube, and explore the collected APM data in the Datadog UI.

Follow this guide to:

1. Instrument the application with Datadog's Single Step Instrumentation.
2. Run the application in Minikube to generate APM data.
3. Explore APM data in the Datadog UI.

## Prerequisites

To complete this guide, you need:

1. A [Datadog account][link-to-dd-signup].
2. Your [Datadog API key][link-to-dd-api-key-docs].
3. The [Storedog][link-to-storedog-repo] sample application.
  a. Clone the storedog repository:
  ```shell
  git clone https://github.com/DataDog/storedog.git
  ```
  b. Navigate to the storedog directory:
  ```shell
  cd storedog
  ```
4. [Minikube][link-to-minikube-install-docs] installed.

## Instrument the application

Enable APM with Datadog's Single Step Instrumentation. This installs the Datadog Agent and automatically instruments the Storedog application.

1. Install the [Datadog Operator][link-to-dd-operator] with Helm:
  ```shell
  helm repo add datadog https://helm.datadoghq.com
  helm install my-datadog-operator datadog/datadog-operator
  ```
2. Create a Kubernetes secret with your [Datadog API key][link-to-dd-api-key-docs]:
  ```shell
  kubectl create secret generic datadog-secret --from-literal api-key=<DATADOG_API_KEY>
  ```
3. Create a `datadog-agent.yaml` file with the following configuration:
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
4. Apply the configuration:
  ```shell
  kubectl apply -f datadog-agent.yaml
  ```

## Run the application

Generate observability data by running Storedog in Minikube:

1. Start Minikube:
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
