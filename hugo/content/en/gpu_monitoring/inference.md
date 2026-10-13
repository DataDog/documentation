---
title: Monitor Inference Workloads with GPU Monitoring
description: Monitor the latency, throughput, and health of your model deployments alongside the GPUs they run on.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring/tracing"
  tag: "Documentation"
  text: "Continuous Tracing with GPU Monitoring"
- link: "/gpu_monitoring"
  tag: "Documentation"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout url="https://www.datadoghq.com/product-preview/gpu-tracing/" >}}
Optimizing inference workloads with Continuous Tracing with GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Inference workloads serve live traffic, so slow responses and errors directly affect your users. Underused GPUs also drive up serving costs. The Inference page in GPU Monitoring shows the performance of each model deployment alongside the health of the GPUs it runs on. Your MLOps, platform, and ML engineering teams can find and fix serving issues in one place.

With the Inference page, you get:

- **Latency and throughput across model deployments**: Compare time to first token (TTFT), inter-token latency (ITL), and output tokens per second across your model deployments, and filter by environment, deployment, or Kubernetes namespace.
- **Deployment health at a glance**: Review the request rate, error rate, health status, monitors, and GPU key-value (KV) cache usage of each model deployment to identify which deployments need attention.

{{< img src="gpu_monitoring/inference-page.png" alt="Inference page in GPU Monitoring showing time to first token, inter-token latency, and output token graphs, and a list of model deployments." style="width:100%;" >}}

## Setup

Inference monitoring supports [vLLM][1] as the inference engine, either standalone or with NVIDIA Dynamo as the inference router. Other inference engines and routers are not supported. To request support for them, contact your Datadog representative.

Setup depends on whether you run vLLM standalone or with Dynamo. Standalone vLLM deployments use the vLLM integration, which collects engine metrics. vLLM and Dynamo deployments also use the Dynamo integration, which collects frontend and worker runtime metrics.

### Prerequisites

To begin monitoring your inference workloads, you must meet the following criteria:
- You have [GPU Monitoring enabled][2] and access to the inference Agent image, which Datadog provides when you join the Preview.
- Your inference workloads run on Kubernetes.
- You are serving models with vLLM, either standalone or in an NVIDIA Dynamo deployment.

### 1. Use the inference Agent image

The inference Agent image includes both the Dynamo and vLLM checks, so you don't need to install either integration separately.

Merge the following configuration into the existing `DatadogAgent` resource. Keep your existing credentials, site, and other features unchanged:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        name: <INFERENCE_AGENT_IMAGE>
```

Apply the resource and wait for the Agent DaemonSet to roll out:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirm the metrics endpoints and ports

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

The vLLM integration collects metrics from the following endpoint:

| Target | Endpoint | Integration | Metrics |
|--------|----------|-------------|---------|
| vLLM server | `:8000/metrics` | vLLM | `vllm.*` |

vLLM serves metrics on the same port as its OpenAI-compatible API server, which is `8000` by default. If you start vLLM with a different `--port`, substitute it in the annotation in [Step 3: Configure the integrations](#3-configure-the-integrations).

{{% /tab %}}
{{% tab "vLLM & Dynamo" %}}

The integrations collect metrics from the following endpoints:

| Target | Endpoint | Integration | Metrics |
|--------|----------|-------------|---------|
| Dynamo frontend | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Dynamo worker | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| vLLM engine | `:9090/metrics` | vLLM | `vllm.*` |

By default, the Dynamo worker and vLLM engine share an endpoint. Dynamo exposes the vLLM engine metrics through the worker's metrics endpoint, and each integration collects its own metrics from that endpoint.

<div class="alert alert-info">If your deployment runs the vLLM engine separately from the Dynamo worker, such as in a sidecar, the worker and engine expose metrics on separate endpoints. In this case, point the <code>dynamo</code> check at the worker's metrics endpoint and the <code>vllm</code> check at the engine's metrics endpoint in <a href="#3-configure-the-integrations">Step 3: Configure the integrations</a>.</div>

The Dynamo Kubernetes Operator sets `DYN_SYSTEM_PORT=9090` by default. If you launch a worker directly, set the port explicitly:

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

If your workers use a port other than `9090`, substitute it in the worker annotation in [Step 3: Configure the integrations](#3-configure-the-integrations).

{{% /tab %}}
{{< /tabs >}}

### 3. Configure the integrations

Add the following [Autodiscovery annotations][3] to the corresponding workload pod templates. In each annotation key, replace the placeholder with the value of the container's `name` field in `spec.template.spec.containers[]`, not the image name.

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

Add the following annotation to every vLLM pod template:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<VLLM_CONTAINER_NAME>.checks: |-
      {
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

{{% /tab %}}
{{% tab "vLLM & Dynamo" %}}

Add the following annotation to the Dynamo frontend pod template:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<FRONTEND_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8000/metrics"
          }]
        }
      }
```

Add the following annotation to every vLLM worker pod template. Both integrations use the worker's metrics endpoint on port `9090`:

```yaml
metadata:
  annotations:
    ad.datadoghq.com/<WORKER_CONTAINER_NAME>.checks: |-
      {
        "dynamo": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:9090/metrics",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true
          }]
        }
      }
```

{{% /tab %}}
{{< /tabs >}}

Apply the updated workload resources and recreate the pods so that Autodiscovery detects the new annotations.

### 4. Verify setup

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

Run the following commands to confirm that the vLLM endpoint responds and that the Agent runs the check:

```shell
# Confirm the vLLM endpoint responds
kubectl port-forward pod/<VLLM_POD> 18000:8000
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Confirm that "vllm" appears under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

After you complete setup, Datadog collects `vllm.*` metrics from your vLLM pods.

{{% /tab %}}
{{% tab "vLLM & Dynamo" %}}

Run the following commands to confirm that each endpoint responds and that the Agent runs both checks:

```shell
# Confirm the frontend endpoint responds
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
curl -fsS http://localhost:18000/metrics | head

# Confirm the worker endpoint responds
kubectl port-forward pod/<WORKER_POD> 19090:9090
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Confirm that "dynamo" and "vllm" appear under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

After you complete setup, Datadog collects the following:
- `dynamo.frontend.*` metrics from frontend pods
- `dynamo.component.*` metrics from worker pods
- `vllm.*` metrics from worker pods

{{% /tab %}}
{{< /tabs >}}

If no metrics appear, send inference traffic to your deployment. vLLM and Dynamo emit some metrics only after they serve the first request.

### 5. Enable percentiles on your metrics

To graph percentiles on latency and token metrics, you must opt in to [advanced query functionality][6] on the following distribution metrics:

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

| Metric |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.time_per_output_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

{{% /tab %}}
{{% tab "vLLM & Dynamo" %}}

| Metric |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

{{% /tab %}}
{{< /tabs >}}

### 6. Enable GPU tracing (optional)

To correlate inference requests with GPU activity, set up [Continuous Tracing with GPU Monitoring][4] and label your vLLM workloads. Continuous Tracing requires CUDA and CUPTI version 13 or later.

## Explore the Inference page

To get started, navigate to the [Inference page][5] in GPU Monitoring.

### Filter model deployments

Use the search bar at the top of the page to search for model deployments, models, engines, or namespaces. You can also filter by {{< ui >}}Env{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}}, and {{< ui >}}Kube Namespace{{< /ui >}}, or click {{< ui >}}Filter{{< /ui >}} to add other filters.

### Latency and throughput

The graphs at the top of the page show the latency and throughput of your model deployments, grouped by `app`:

| Graph | Description |
|-------|-------------|
| Time to First Token | Time from when a request is received to when the first output token is generated. |
| Inter-Token Latency | Time between consecutive output tokens. |
| Output Tokens | Output tokens generated per second. |

A spike in time to first token or inter-token latency for one deployment, without a matching change in the others, points to an issue with that deployment rather than with shared infrastructure.

### Model deployments

The table at the bottom of the page lists each model deployment with its inference engine, environment, and Kubernetes namespace, along with the following columns:

| Column | Description |
|--------|-------------|
| Output Tok/s | Output tokens generated per second. |
| Requests | Request rate. |
| TTFT | Time to first token. |
| ITL | Inter-token latency. |
| Error Rate | Percentage of requests that return an error. |
| Health | Health status of the deployment, such as {{< ui >}}Warning{{< /ui >}} or {{< ui >}}Critical{{< /ui >}}. |
| Monitors | Monitors associated with the deployment. |
| GPU Cache | GPU KV cache usage. |

Click {{< ui >}}Column Settings{{< /ui >}} to choose which columns to display.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/vllm/
[2]: /gpu_monitoring/setup
[3]: /containers/kubernetes/integrations/?tab=annotations
[4]: /gpu_monitoring/tracing
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring
[6]: /metrics/distributions/#enabling-advanced-query-functionality
