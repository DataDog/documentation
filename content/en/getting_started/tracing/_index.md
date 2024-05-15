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

This guide demonstrates how to get started with APM from start to finish.

At a high level, you need to:

1. Set up Datadog APM to send observability data to Datadog.
2. Run your application to generate observability data.
3. Explore the collected observability data in Datadog.

## Set up Datadog APM

To set up Datadog APM without needing to touch your application code, use Single Step APM Instrumentation.

Use this approach to automatically:

- Install the Datadog Agent.
- Enable Datadog APM.
- Instrument your application.

To complete this, follow the steps in Single Step APM Instrumentation.

<div class="alert alert-info">There are also in-app instructions when you <a href="https://app.datadoghq.com/account/settings/agent/latest">install the Datadog Agent</a> and select <strong>Enable APM Instrumentation</strong>.</div>

## Run the application

After you complete the setup instructions, your application automatically sends observability data to Datadog. Because you started with Single Step APM Instrumentation, your application is instrumented at runtime. Execute and interact with your application to generate observability data.

## Explore observability data in Datadog

1. In Datadog, go to **APM** > **Services**. Storedog services are prefixed with storedog-.
2. Select a service to view its performance metrics, such as latency, throughput, and error rates.
3. Go to **APM** > **Traces**. Select a trace to see its details, including the flame graph, which helps identify performance bottlenecks.
4. Explore additional APM features, like [App Analytics][link-to-app-analytics-docs], [Trace Search][link-to-trace-search-docs], and [Watchdog][link-to-watchdog-docs], to gain deeper insights into Storedog's performance.

## Advanced APM setup

If there is 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://minikube.sigs.k8s.io/docs/start/
[3]: https://v3.helm.sh/docs/intro/install/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/