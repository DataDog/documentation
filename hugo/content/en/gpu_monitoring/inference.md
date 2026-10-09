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
Optimizing inference workloads with Continuous Tracing in GPU Monitoring is in Early Access Preview. Complete the form to request access.
{{< /callout >}}

## Overview

Inference workloads serve live traffic, so slow responses and errors directly affect your users. Underused GPUs also drive up serving costs. The Inference page in GPU Monitoring shows the performance of each model deployment alongside the health of the GPUs it runs on. Your MLOps, platform, and ML engineering teams can find and fix serving issues in one place.

With the Inference page, you get:

- **Latency and throughput across model deployments**: Compare time to first token (TTFT), inter-token latency (ITL), and output tokens per second across your model deployments, and filter by environment, deployment, or Kubernetes namespace.
- **Deployment health at a glance**: Review the request rate, error rate, health status, monitors, and GPU key-value (KV) cache usage of each model deployment to identify which deployments need attention.

{{< img src="gpu_monitoring/inference-page.png" alt="Inference page in GPU Monitoring showing time to first token, inter-token latency, and output token graphs, and a list of model deployments." style="width:100%;" >}}

## Setup

Inference monitoring supports [vLLM][1] as the inference engine and NVIDIA Dynamo as the inference router. Other inference engines and routers are not supported. To request support for them, contact your Datadog representative.

Setup uses two integrations. The Dynamo integration collects frontend and worker runtime metrics, and the vLLM integration collects engine metrics.

### Prerequisites

To begin monitoring your inference workloads, you must meet the following criteria:
- You have [GPU Monitoring enabled][2] and access to the inference Agent image, which Datadog provides when you join the Preview.
- Your inference workloads run on Kubernetes.
- You are serving models with vLLM workers in an NVIDIA Dynamo deployment.
- You are running CUDA and CUPTI version 13 or later.

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

The integrations collect metrics from the following endpoints:

| Target | Endpoint | Integration | Metrics |
|--------|----------|-------------|---------|
| Dynamo frontend | `:8000/metrics` | Dynamo | `dynamo.frontend.*` |
| Dynamo worker | `:9090/metrics` | Dynamo | `dynamo.component.*` |
| vLLM engine | `:9090/metrics` | vLLM | `vllm.*` |

The Dynamo worker and vLLM engine share an endpoint. Dynamo exposes the vLLM engine metrics through the worker's metrics endpoint, and each integration collects its own metrics from that endpoint.

The Dynamo Kubernetes Operator sets `DYN_SYSTEM_PORT=9090` by default. If you launch a worker directly, set the port explicitly:

```yaml
env:
  - name: DYN_SYSTEM_PORT
    value: "9090"
```

For local CLI deployments, port `8081` is common. If your workers use a different port, substitute it in the worker annotation in [Step 3: Configure the integrations](#3-configure-the-integrations).

### 3. Configure the integrations

Add the following [Autodiscovery annotations][3] to the corresponding workload pod templates. In each annotation key, replace the placeholder with the value of the container's `name` field in `spec.template.spec.containers[]`, not the image name.

Add the following annotation to the Dynamo frontend pod template:

```yaml
metadata:
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
            "openmetrics_endpoint": "http://%%host%%:9090/metrics"
          }]
        }
      }
```

Apply the updated workload resources and recreate the pods so that Autodiscovery detects the new annotations.

### 4. Verify setup

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

If no metrics appear, send inference traffic to your deployment. Dynamo and vLLM emit some metrics only after they serve the first request.

### 5. Enable GPU tracing (optional)

To correlate inference requests with GPU activity, follow the [GPU Monitoring tracing setup][4] and label your vLLM worker workloads.

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
