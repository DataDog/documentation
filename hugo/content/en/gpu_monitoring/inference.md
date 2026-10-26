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
- **Deployment health at a glance**: Review the average concurrent requests, error rate, health status, monitors, and GPU key-value (KV) cache usage of each model deployment to identify which deployments need attention.

{{< img src="gpu_monitoring/inference-page3.png" alt="Inference page in GPU Monitoring showing for a given model deployment key metrics like time-to-first-token and output tokens." style="width:100%;" >}}

## Setup

Inference monitoring supports [vLLM][1] as the inference engine in the following deployments: standalone, with NVIDIA Dynamo as the inference router, or on Ray. Other inference engines and routers are not supported. To request support for them, contact your Datadog representative.

Select the tab that matches your deployment:

{{< tabs >}}
{{% tab "Standalone vLLM" %}}

Setup uses the vLLM integration, which collects engine metrics.

### Prerequisites

To begin monitoring your inference workloads, you must meet the following criteria:
- You have [GPU Monitoring enabled][1].
- You are running the inference Agent image (`7.85.0-rc.5`).
- Your inference workloads run on Kubernetes.
- You are serving models with vLLM.

### 0. Enable GPU Monitoring

If you haven't already, [set up GPU Monitoring][1] on your GPU hosts. The following steps require GPU Monitoring to be enabled.

### 1. Use the inference Agent image

The inference Agent image includes the vLLM check, so you don't need to install the vLLM integration separately.

Merge the following configuration into the existing `DatadogAgent` resource. Keep your existing credentials, site, and other features unchanged:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

To use a JMX-enabled or full Agent image, set `tag` to `7.85.0-rc.5-jmx` or `7.85.0-rc.5-full`.

Apply the resource and wait for the Agent DaemonSet to roll out:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirm the metrics endpoint and port

The vLLM integration collects metrics from the following endpoint:

| Target | Endpoint | Integration | Metrics |
|--------|----------|-------------|---------|
| vLLM server | `:8000/metrics` | vLLM | `vllm.*` |

vLLM serves metrics on the same port as its OpenAI-compatible API server, which is `8000` by default. If you start vLLM with a different `--port`, substitute it in the annotation in Step 3.

### 3. Configure the integration

Add the following [Autodiscovery annotation][2] to every vLLM pod template. In the annotation key, replace `<VLLM_CONTAINER_NAME>` with the value of the container's `name` field in `spec.template.spec.containers[]`, not the image name:

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

Replace `<SERVICE_NAME>` with a name for your model deployment, such as `inference-vllm-glm5.3`. The Inference page groups metrics by `service`.

Apply the updated workload resources and recreate the pods so that Autodiscovery detects the new annotations.

### 4. Verify setup

Use two terminals to confirm that the vLLM endpoint responds and that the Agent runs the check. Run the port-forward in your workload's Kubernetes namespace, or add `-n <WORKLOAD_NAMESPACE>` if it differs from your current namespace.

**Terminal 1**: Forward the vLLM metrics endpoint, and leave it running.

```shell
kubectl port-forward pod/<VLLM_POD> 18000:8000
```

**Terminal 2**: Verify the endpoint and the Agent check.

```shell
# Show vLLM metrics from the endpoint
curl -fsS http://localhost:18000/metrics | grep '^vllm:'

# Look for "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

When you finish, press **Ctrl+C** in terminal 1 to stop forwarding.

After you complete setup, Datadog collects `vllm.*` metrics from your vLLM pods.

If no metrics appear, send inference traffic to your deployment. vLLM emits some metrics only after it serves the first request.

### 5. Enable percentiles on your metrics

To graph percentiles on certain vLLM metrics, you must opt in to [advanced query functionality][3] on the following distribution metrics:

| Metric |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.time_per_output_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Enable GPU tracing (optional)

To correlate inference requests with GPU activity, set up [Continuous Tracing with GPU Monitoring][4] and label your vLLM workloads. Continuous Tracing requires CUDA and CUDA Profiling Tools Interface (CUPTI) version 13 or later.

[1]: /gpu_monitoring/setup
[2]: /containers/kubernetes/integrations/?tab=annotations
[3]: /metrics/distributions/#enabling-advanced-query-functionality
[4]: /gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM with Dynamo" %}}

Setup uses two integrations. The Dynamo integration collects frontend and worker runtime metrics, and the vLLM integration collects engine metrics.

### Prerequisites

To begin monitoring your inference workloads, you must meet the following criteria:
- You have [GPU Monitoring enabled][1].
- You are running the inference Agent image (`7.85.0-rc.5`).
- Your inference workloads run on Kubernetes.
- You are serving models with vLLM workers in an NVIDIA Dynamo deployment.

### 0. Enable GPU Monitoring

If you haven't already, [set up GPU Monitoring][1] on your GPU hosts. The following steps require GPU Monitoring to be enabled.

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
        tag: 7.85.0-rc.5
```

To use a JMX-enabled or full Agent image, set `tag` to `7.85.0-rc.5-jmx` or `7.85.0-rc.5-full`.

Apply the resource and wait for the Agent DaemonSet to roll out:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirm the metrics endpoints and ports

The integrations collect metrics from the following endpoints:

| Target | Endpoint | Integration | Metrics |
|--------|----------|-------------|---------|
| Dynamo frontend | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Dynamo worker | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| vLLM engine | `:9090/metrics` | vLLM | `vllm.*` |

By default, the Dynamo worker and vLLM engine share an endpoint. Dynamo exposes the vLLM engine metrics through the worker's metrics endpoint, and each integration collects its own metrics from that endpoint.

<div class="alert alert-info">If your deployment runs the vLLM engine separately from the Dynamo worker, such as in a sidecar, the worker and engine expose metrics on separate endpoints. In this case, point the <code>dynamo</code> check at the worker's metrics endpoint and the <code>vllm</code> check at the engine's metrics endpoint in Step 3.</div>

The Dynamo Kubernetes Operator sets `DYN_SYSTEM_PORT=9090` by default. If you launch a worker directly, set the port explicitly:

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

If your workers use a port other than `9090`, substitute it in the worker annotation in Step 3.

### 3. Configure the integrations

Add the following [Autodiscovery annotations][2] to the corresponding workload pod templates. In each annotation key, replace the placeholder with the value of the container's `name` field in `spec.template.spec.containers[]`, not the image name.

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

Replace `<SERVICE_NAME>` with a name for your model deployment, such as `inference-vllm-glm5.3`. The Inference page groups metrics by `service`.

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

Apply the updated workload resources and recreate the pods so that Autodiscovery detects the new annotations.

### 4. Verify setup

Use three terminals to confirm that each endpoint responds and that the Agent runs both checks. Run the port-forwards in your workloads' Kubernetes namespace, or add `-n <WORKLOAD_NAMESPACE>` if it differs from your current namespace.

**Terminal 1**: Forward the frontend metrics endpoint, and leave it running.

```shell
kubectl port-forward pod/<FRONTEND_POD> 18000:8000
```

**Terminal 2**: Forward the worker metrics endpoint, and leave it running. If your worker uses a different metrics port, replace `9090` with that port.

```shell
kubectl port-forward pod/<WORKER_POD> 19090:9090
```

**Terminal 3**: Verify both endpoints and the Agent checks.

```shell
# Show the first ten lines of frontend metrics
curl -fsS http://localhost:18000/metrics | sed -n '1,10p'

# Show Dynamo and vLLM metrics from the worker
curl -fsS http://localhost:19090/metrics | grep -E '^(dynamo_|vllm:)'

# Look for "dynamo" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

Confirm that the worker output includes both `dynamo_` and `vllm:` metric names, and that the Agent status lists both checks. When you finish, press **Ctrl+C** in terminals 1 and 2 to stop forwarding.

After you complete setup, Datadog collects the following:
- `dynamo.frontend.*` metrics from frontend pods
- `dynamo.component.*` metrics from worker pods
- `vllm.*` metrics from worker pods

If no metrics appear, send inference traffic to your deployment. Dynamo and vLLM emit some metrics only after they serve the first request.

### 5. Enable percentiles on your metrics

To graph percentiles on certain vLLM and Dynamo metrics, you must opt in to [advanced query functionality][3] on the following distribution metrics:

| Metric |
|--------|
| `dynamo.frontend.time_to_first_token.seconds` |
| `dynamo.frontend.inter_token_latency.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Enable GPU tracing (optional)

To correlate inference requests with GPU activity, set up [Continuous Tracing with GPU Monitoring][4] and label your vLLM worker workloads. Continuous Tracing requires CUDA and CUDA Profiling Tools Interface (CUPTI) version 13 or later.

[1]: /gpu_monitoring/setup
[2]: /containers/kubernetes/integrations/?tab=annotations
[3]: /metrics/distributions/#enabling-advanced-query-functionality
[4]: /gpu_monitoring/tracing

{{% /tab %}}
{{% tab "vLLM with Ray" %}}

Setup uses two integrations. The [Ray integration][5] collects Ray cluster metrics, and the [vLLM integration][6] collects engine metrics.

### Prerequisites

To begin monitoring your inference workloads, you must meet the following criteria:
- You have [GPU Monitoring enabled][1] with the inference Agent image (`7.85.0-rc.5`).
- Your inference workloads run on Kubernetes, with Ray clusters managed by KubeRay.
- You are serving models with vLLM inside Ray, for example with Ray Serve.

### 1. Use the inference Agent image

The inference Agent image includes both the Ray and vLLM checks, so you don't need to install either integration separately.

Merge the following configuration into the existing `DatadogAgent` resource. Keep your existing credentials, site, and other features unchanged:

```yaml
spec:
  features:
    gpu:
      enabled: true
  override:
    nodeAgent:
      image:
        tag: 7.85.0-rc.5
```

To use a JMX-enabled or full Agent image, set `tag` to `7.85.0-rc.5-jmx` or `7.85.0-rc.5-full`.

Apply the resource and wait for the Agent DaemonSet to roll out:

```shell
kubectl apply -f datadog-agent.yaml
kubectl get pods -n <DATADOG_NAMESPACE> -w
```

### 2. Confirm the metrics endpoint and port

When vLLM runs inside Ray, it does not serve its own metrics endpoint. Instead, vLLM records its engine metrics through Ray, and each Ray node publishes them with a `ray_vllm_` prefix on the same endpoint as Ray's own metrics. The Ray and vLLM integrations both collect from that endpoint.

The examples use port `8080`, the port set by `--metrics-export-port` when Ray starts. If your Ray nodes use a different port, replace `8080` in the annotation in Step 3.

### 3. Configure the integrations

Add the following [Autodiscovery annotation][2] to the pod template of every KubeRay worker group that runs vLLM. In a `RayCluster` or `RayService` resource, pod templates are under `workerGroupSpecs[].template`. In the annotation key, replace `<RAY_CONTAINER_NAME>` with the value of the Ray container's `name` field, not the image name.

The vLLM integration uses `extra_metrics` to map each `ray_vllm_` metric to the name the Inference page uses:

```yaml
metadata:
  labels:
    tags.datadoghq.com/service: "<SERVICE_NAME>"
  annotations:
    ad.datadoghq.com/<RAY_CONTAINER_NAME>.checks: |-
      {
        "ray": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080"
          }]
        },
        "vllm": {
          "init_config": {},
          "instances": [{
            "openmetrics_endpoint": "http://%%host%%:8080",
            "histogram_buckets_as_distributions": true,
            "collect_counters_with_distributions": true,
            "exclude_metrics": ["python_.+", "process_.+"],
            "exclude_labels": ["WorkerId", "SessionName", "otel_scope_name", "otel_scope_schema_url", "otel_scope_version"],
            "extra_metrics": [{
              "ray_vllm_time_to_first_token_seconds": "time_to_first_token.seconds",
              "ray_vllm_e2e_request_latency_seconds": "e2e_request_latency.seconds",
              "ray_vllm_request_prompt_tokens": "request.prompt_tokens",
              "ray_vllm_request_generation_tokens": "request.generation_tokens",
              "ray_vllm_request_params_n": "request.params.n",
              "ray_vllm_prompt_tokens": "prompt_tokens",
              "ray_vllm_generation_tokens": "generation_tokens",
              "ray_vllm_request_success": "request.success",
              "ray_vllm_request_decode_time_seconds": "request.decode_time.seconds",
              "ray_vllm_request_prefill_time_seconds": "request.prefill_time.seconds",
              "ray_vllm_request_queue_time_seconds": "request.queue_time.seconds",
              "ray_vllm_request_prefill_kv_computed_tokens": "request.prefill_kv_computed_tokens",
              "ray_vllm_prompt_tokens_cached": "prompt_tokens.cached"
            }]
          }]
        }
      }
```

Replace `<SERVICE_NAME>` with a name for your model deployment, such as `inference-vllm-glm5.3`. The Inference page groups metrics by `service`.

In the `vllm` instance:
- The `exclude_metrics` option skips the Python and process metrics on the Ray endpoint, which describe Ray processes rather than the vLLM engine.
- The `exclude_labels` option drops Ray labels that change whenever a worker or cluster restarts.

<div class="alert alert-info">If your <code>ray</code> check already collects <code>ray_vllm_</code> metrics through <code>extra_metrics</code>, they are submitted twice: as <code>ray.ray_vllm_*</code> and as <code>vllm.*</code>. Remove those patterns from the <code>ray</code> check after you migrate any dashboards and monitors that use the <code>ray.ray_vllm_*</code> names.</div>

Apply the updated workload resources. With KubeRay, changing a worker group's pod template recreates the worker pods. For a `RayService`, KubeRay can create a new Ray cluster instead, depending on the upgrade strategy.

### 4. Verify setup

Use two terminals to confirm that the Ray endpoint exposes vLLM metrics and that the Agent runs both checks. Run the port-forward in your workload's Kubernetes namespace, or add `-n <WORKLOAD_NAMESPACE>` if it differs from your current namespace.

**Terminal 1**: Forward the Ray metrics endpoint of a worker pod, and leave it running.

```shell
kubectl port-forward pod/<RAY_WORKER_POD> 18080:8080
```

**Terminal 2**: Verify the endpoint and the Agent checks.

```shell
# Show vLLM metrics published by Ray
curl -fsS http://localhost:18080 | grep '^ray_vllm_'

# Look for "ray" and "vllm" under Checks
kubectl exec -n <DATADOG_NAMESPACE> <AGENT_POD> -c agent -- agent status
```

When you finish, press **Ctrl+C** in terminal 1 to stop forwarding.

After you complete setup, Datadog collects the following:
- `ray.*` metrics from Ray pods
- `vllm.*` metrics from Ray worker pods that run vLLM

If no metrics appear, send inference traffic to your deployment. vLLM emits some metrics only after it serves the first request.

<div class="alert alert-info">Some vLLM versions do not publish gauge metrics, such as the number of running and waiting requests or the KV cache usage, through Ray. If the endpoint has no <code>ray_vllm_num_requests_running</code> or <code>ray_vllm_kv_cache_usage_perc</code> metrics, the <strong>Requests</strong> and <strong>GPU Cache</strong> columns on the Inference page stay empty.</div>

### 5. Enable percentiles on your metrics

To graph percentiles on certain vLLM metrics, you must opt in to [advanced query functionality][3] on the following distribution metrics:

| Metric |
|--------|
| `vllm.time_to_first_token.seconds` |
| `vllm.request.prompt_tokens` |
| `vllm.request.generation_tokens` |

### 6. Enable GPU tracing (optional)

To correlate inference requests with GPU activity, set up [Continuous Tracing with GPU Monitoring][4] and label your Ray worker workloads. Continuous Tracing requires CUDA and CUDA Profiling Tools Interface (CUPTI) version 13 or later.

[1]: /gpu_monitoring/setup
[2]: /containers/kubernetes/integrations/?tab=annotations
[3]: /metrics/distributions/#enabling-advanced-query-functionality
[4]: /gpu_monitoring/tracing
[5]: /integrations/ray/
[6]: /integrations/vllm/

{{% /tab %}}
{{< /tabs >}}

## Explore the Inference page

To get started, navigate to the [Inference page][2] in GPU Monitoring.

### Filter model deployments

Use the search bar at the top of the page to search for model deployments, models, engines, or namespaces. You can also filter by {{< ui >}}Env{{< /ui >}}, {{< ui >}}Deployment{{< /ui >}}, and {{< ui >}}Kube Namespace{{< /ui >}}, or click {{< ui >}}Filter{{< /ui >}} to add other filters.

### Understand latency and throughput

The graphs at the top of the page show the latency and throughput of your model deployments:

| Graph | Description |
|-------|-------------|
| Time to First Token | Time from when a request is received to when the first output token is generated. |
| Inter-Token Latency | Time between consecutive output tokens. |
| Output Tokens | Output tokens generated per second. |

A spike in time to first token or inter-token latency for one deployment, without a matching change in the others, points to an issue with that deployment rather than with shared infrastructure.

### Review model deployment health

The table at the bottom of the page lists each model deployment with its inference engine, environment, and Kubernetes namespace, along with the following columns:

| Column | Description |
|--------|-------------|
| Output Tok/s | Output tokens generated per second. |
| Requests | Average concurrent running requests for the selected time frame. |
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
[2]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=inference-monitoring
