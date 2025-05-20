---
title: Google Cloud Run
aliases:
    - /serverless/gcp/gcr
---

## Overview

[Google Cloud Run](https://cloud.google.com/run/docs/overview/what-is-cloud-run) is a way to run container-based services and jobs in Google Cloud Platform.

Note about service monitors and logs through the Google Cloud Integration.

## Setup

Traces and custom metrics are provided by our tracer libraries, along with profiling where it is available. Application logs are collected through a volume shared between the application container and the Datadog sidecar container.

### Applications

{{< tabs >}}
{{% tab "Node.js" %}}
#### Example Code
```js
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "Python" %}}
#### Example Code
```python
# add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "Java" %}}
#### Example Code
```java
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "Go" %}}
#### Example Code
```go
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab ".NET" %}}
#### Example Code
```csharp
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{% tab "PHP" %}}
#### Example Code
```php
// add the example code here, with traces, custom metrics, profiling, and logs
```

#### Details
##### Tracing

##### Profiling

##### Metrics

##### Logs

{{% /tab %}}
{{< /tabs >}}

### Containers

A high level overview of the things we need to do, including a shared volume for logs, the environment variables we need to set up on the application container and the sidecar container.

#### Environment Variables

A table of the important environment variables, which container they are set on, and some notes about them.

{{< tabs >}}
{{% tab "GCR UI" %}}
1. Step
1. by
1. step
1. instructions
    - with some details.
{{% /tab %}}
{{% tab "YAML deploy" %}}
1. Step
1. by
1. step
1. instructions
    - with some details.
{{% /tab %}}
{{% tab "Terraform" %}}
1. Step
1. by
1. step
1. instructions
    - with some details.
{{% /tab %}}
{{< /tabs >}}
