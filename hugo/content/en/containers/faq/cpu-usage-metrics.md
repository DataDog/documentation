---
title: Discrepancies in Kubernetes CPU Usage Metrics
---

As you analyze the CPU usage metrics that Datadog collects from your Kubernetes infrastructure, you may notice discrepancies between Kubernetes metrics (`kubernetes.cpu.*`) and container runtime metrics (`container.cpu.*`).

The Datadog Agent collects its metrics from a variety of sources. To collect `kubernetes.*` metrics, the Datadog Agent makes requests to the kubelet on the same node at a variety of endpoints. These are calculated relative to the metrics that cAdvisor has itself collected and exposed as OpenMetrics formatted data. Specifically, the Agent collects `kubernetes.cpu.*` metrics from `/metrics/cadvisor`. CPU measurements are relative to the monotonically increasing counter for CPU time used per container. The Agent's rate calculations use a slightly different timestamp for the exposed data than the actual timestamp.

Meanwhile, Datadog collects container metrics (such as `container.*` and `docker.*`) by communicating with the container runtime sockets and raw cgroup files. These metrics are not impacted by the timestamp discrepancy.

For the most precision, refer to `container.cpu.*` metrics over `kubernetes.cpu.*` metrics.