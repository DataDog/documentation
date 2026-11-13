---
title: Benchmark Inference Endpoints with GPU Monitoring
description: Send controlled load to an OpenAI-compatible inference endpoint and measure time to first token, time per output token, and throughput, next to the GPUs and inference server that served it.
further_reading:
- link: "/gpu_monitoring/inference"
  tag: "Documentation"
  text: "Monitor Inference Workloads with GPU Monitoring"
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/gpu_monitoring"
  tag: "Documentation"
  text: "Learn more about what GPU Monitoring offers"
---

{{< callout btn_hidden="true" >}}
Benchmarks in GPU Monitoring are in Preview. To request access, contact <a href="/help/">Datadog support</a> or your account team.
{{< /callout >}}

## Overview

Before you change a model server's version, its deployments settings, kernels, or the GPUs it runs on, you need to know how the change affects your users. Benchmarks in GPU Monitoring send controlled load to an ChatCompletion endpoint and measure what users experience: how long the first token takes, how fast tokens stream after it, and how many requests and tokens the endpoint serves per second. Because the runs are in Datadog, you can read them next to your GPU, inference server, and cost data, and compare each run with earlier ones.

With Benchmarks, you can answer questions such as:

- **How does my endpoint perform under load?** Measure time to first token (TTFT) and time per output token at the concurrency you expect.
- **Did my last change make things better or worse?** Rerun the same benchmark after a change and compare the results.
- **How much load can my deployment take?** Run a load sweep to find the highest concurrency that stays within your latency targets.

## Prerequisites

- An inference endpoint that serves the OpenAI chat completions API, such as vLLM, SGLang, TensorRT-LLM, or NVIDIA Dynamo.
- A Datadog role with the GPU benchmark permissions:
  - `gpu_benchmarks_read` to view benchmarks, runs, and sweeps.
  - `gpu_benchmarks_write` to create, edit, and delete benchmarks, and to test an endpoint.
  - `gpu_benchmarks_run` to start and cancel runs and sweeps, which send load to your endpoint.

## Where runs execute

Each benchmark has a location, which sets where its traffic comes from:

From Datadog
: Datadog sends the traffic from its own infrastructure. The endpoint must be reachable over public HTTPS. Use this location for hosted endpoints and public gateways.

In your Kubernetes cluster
: Datadog creates a Kubernetes Job in your cluster for each run, through the Private Action Runner of your Datadog Cluster Agent. The Job can reach any endpoint your cluster can, including internal services. See [Run benchmarks in your Kubernetes cluster](#run-benchmarks-in-your-kubernetes-cluster).

## Create a benchmark

A benchmark defines an endpoint, where runs execute, and the traffic they send. Only the endpoint is required.

### Endpoint

- **URL** and **Model**: the base URL of the endpoint and the model name sent in requests.
- **Streaming**: whether requests stream their responses. Time per output token is only measured for streamed responses.
- **Custom headers** (optional): up to 20 headers sent with every request, such as an `Authorization` header. Header values are encrypted and never shown again. Custom headers are only available for runs from Datadog.

Use **Test connection** to send one short request to the endpoint before you save. The test reports the HTTP status, the time to the first token, the total latency, the number of output tokens, whether the response streamed, and whether `/v1/models` lists the model. The test request is sent from Datadog, so it can't reach endpoints that are only reachable from inside your cluster.

### Load and prompts

Runs send synthetic prompts:

| Setting | Description | Values |
| --- | --- | --- |
| Concurrency | Number of requests in flight at once. | 1 to 1,024 |
| Requests | Number of requests measured. Every turn of a conversation counts. | 1 to 10,000 |
| Warmup requests | Requests sent before measuring, with their own concurrency. | 0 to 1,000 |
| Input and output tokens | Tokens per turn, as a mean and a standard deviation. | Up to 1,000,000 |
| Conversations | Number of synthetic conversations generated and cycled through. | 1 to 10,000 |
| Turns | Requests per conversation, as a mean and a standard deviation. Later turns resend the conversation's history. | 1 to 50 |
| Random seed | Optional. Runs with the same seed send the same prompts, which makes runs easier to compare. | Integer |

Runs from Datadog can instead replay the **AgentX** scenario, the coding agent traces published by [SemiAnalysis](https://inferencex.semianalysis.com/infx/agentx), with up to 128 concurrent sessions and a profiling phase of 15 to 60 minutes.

A run that lasts longer than the benchmark's maximum duration, up to 24 hours, is stopped.

### Targets

Optionally, set latency targets for time to first token and for time per output token. Each run then reports the share of requests that met every target. Targets do not fail a run.

### Model deployment

Optionally, link the benchmark to a model deployment that GPU Monitoring already tracks. Runs then appear on the deployment's page, and each run records how the deployment was configured when the run started and when it ended: the inference engine and its version, replicas, GPUs, parallelism, and the engine's settings. You can also start from a deployment on the [Inference page][1].

## Run a benchmark and read the results

Start a run from the benchmark. Runs execute asynchronously, and a benchmark runs one run or sweep at a time. You can cancel a run in progress.

A run's status is `queued`, `applying`, `running`, or `collecting` while it is in progress, and `completed`, `cancelled`, `failed`, `invalid`, or `timeout` when it is done. A failed, invalid, or timed out run includes the reason.

A completed run reports:

- **Time to first token** (TTFT): p50, p90, and p99, in milliseconds.
- **Time per output token** (inter-token latency): p50, p90, and p99, in milliseconds.
- **Throughput**: output tokens, total tokens, and requests per second.
- **Requests within targets**: the share of requests that met every target, when the benchmark has targets.

Each run records the benchmark's definition when it started. Editing the endpoint, the location, or the load creates a new definition version, so you can tell which runs are directly comparable.

## Run a load sweep

A load sweep runs the benchmark at several concurrency levels, one after another:

Search
: Finds the highest concurrency at which the share of requests within your targets stays above a threshold (95% by default). A search needs targets.

Curve
: Runs every concurrency level you list, up to 16 levels, to show how latency and throughput change with load.

Sweeps go up to a concurrency of 1,024, or 128 for the AgentX scenario. Each step of a sweep is a run that you can open on its own.

## Run benchmarks in your Kubernetes cluster

Runs in your cluster execute as Kubernetes Jobs in the `datadog-gpu-benchmark` namespace. Datadog creates and deletes them through the Private Action Runner of your Datadog Cluster Agent. Runner pods need no GPU, never call the Kubernetes API, and report their progress and results through their logs.

### Requirements

- The Datadog Cluster Agent 7.85 or later.
- CPU capacity for the runs, outside your GPU nodes.
- Network access from the `datadog-gpu-benchmark` namespace to the endpoints you benchmark.
- Image pulls from Datadog's public registries, or from a mirror (see [Use an image mirror](#use-an-image-mirror)).

### 1. Enable the Private Action Runner in the Cluster Agent

Enable the runner and allow the actions that benchmarks use. With the Datadog Helm chart, add the following to your values:

```yaml
clusterAgent:
  privateActionRunner:
    enabled: true
    actionsAllowlist:
      - com.datadoghq.kubernetes.batch.createJob
      - com.datadoghq.kubernetes.batch.getJob
      - com.datadoghq.kubernetes.batch.deleteJob
      - com.datadoghq.kubernetes.core.listPod
      - com.datadoghq.kubernetes.core.getPodLogs
      - com.datadoghq.kubernetes.core.getConfigMap
```

### 2. Install the datadog-gpu-benchmark chart

The `datadog-gpu-benchmark` Helm chart gives the Cluster Agent's ServiceAccount permission to manage benchmark Jobs in the `datadog-gpu-benchmark` namespace, and nothing outside it. It also creates the ServiceAccount of the runner pods, which has no permissions and no token.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-gpu-benchmark datadog/datadog-gpu-benchmark \
  --namespace datadog-gpu-benchmark --create-namespace \
  --set clusterAgent.namespace=<CLUSTER_AGENT_NAMESPACE> \
  --set clusterAgent.serviceAccount=<CLUSTER_AGENT_SERVICE_ACCOUNT>
```

The Cluster Agent's ServiceAccount is `<RELEASE_NAME>-cluster-agent` when you install the Agent with the Datadog Helm chart, and `<DATADOGAGENT_NAME>-cluster-agent` with the Datadog Operator. To find it, run `kubectl get serviceaccounts --all-namespaces | grep cluster-agent`.

The chart must be installed in the `datadog-gpu-benchmark` namespace, where Datadog creates the Jobs. Runner pods run as non-root, with no capabilities and a read-only root filesystem, so the namespace can enforce the `restricted` Pod Security Standard:

```shell
kubectl label namespace datadog-gpu-benchmark pod-security.kubernetes.io/enforce=restricted
```

### 3. Place the runner pods

To keep runner pods off your GPU nodes and away from your inference workloads, set `podOverrides` in the chart's values. For example, to run them on a tainted CPU node pool:

```yaml
podOverrides:
  nodeSelector:
    node-pool: cpu
  tolerations:
    - key: dedicated
      operator: Equal
      value: benchmarks
      effect: NoSchedule
```

### Use an image mirror

If your cluster can't pull from Datadog's public registries, mirror the benchmark image (`gpu-benchmark`) and set `podOverrides.imageRepository` to the mirror's repository, without a tag or digest. Datadog pins the image by digest, so the mirror must hold that exact image. Set `podOverrides.imagePullSecrets` if your registry needs credentials.

### Create a benchmark that runs in your cluster

When you create the benchmark, choose your cluster as its location. Endpoints can then be internal URLs, including `http://` services in your cluster.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /gpu_monitoring/inference
