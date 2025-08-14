---
title: Set up Runtime Code Analysis (IAST)
---

## Prerequisites
Before setting up Runtime Code Analysis (IAST), ensure the following prerequisites are met:

1. **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
2. **Datadog APM Configuration:** Datadog APM is configured for your application or service, and web traces (`type:web`) are being received by Datadog.
3. **Supported Tracing Library:** The Datadog Tracing Library used by your application or service supports Runtime Code Analysis (IAST) capabilities for the language of your application or service. For more details, see the **Compatibility Requirements** section below.

## Using Datadog Tracing Libraries

Choose your language to view setup instructions:

## Languages

{{< appsec-integrations >}}
  {{< appsec-integration name="Java" avatar="java" link="./java/" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="./dotnet/" >}}
  {{< appsec-integration name="Node.js" avatar="node" link="./nodejs/" >}}
  {{< appsec-integration name="Python" avatar="python" link="./python/" >}}
{{< /appsec-integrations >}}
