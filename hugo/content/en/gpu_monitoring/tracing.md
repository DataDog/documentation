---
title: Set Up Continuous Tracing with GPU Monitoring
is_beta: true
private: true
description: Set up the Datadog Agent and native GPU tracer on Kubernetes to add continuous tracing to GPU-accelerated workloads.
further_reading:
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
- link: "/tracing/trace_collection/single-step-apm/kubernetes/"
  tag: "Documentation"
  text: "Single Step APM Instrumentation for Kubernetes"
- link: "/containers/kubernetes/installation"
  tag: "Documentation"
  text: "Install the Datadog Agent on Kubernetes"
---

{{< beta-callout url="#" btn_hidden="true" >}}
Continuous tracing with GPU Monitoring is in Preview and available through an opt-in Kubernetes design-partner rollout. To request access, contact your Datadog representative.
{{< /beta-callout >}}

## Overview

This guide sets up continuous tracing for GPU workloads on Kubernetes. The Datadog Operator runs an Agent on each Kubernetes node and a Cluster Agent that provides admission-time instrumentation. When Kubernetes creates a pod with the following label, the admission controller adds the native `dd-trace-c` GPU tracer to the pod before its containers start:

```
admission.datadoghq.com/gpu.enabled: "true"
```

The tracer observes supported CUDA, CUPTI, PyTorch, and NCCL activity inside the workload process and sends trace data to the local Datadog Agent. The Agent forwards that data to your Datadog organization over outbound HTTPS.

No application source code changes are required, and only pods explicitly labeled for GPU tracing are affected.

**Pinned versions**: This rollout uses Datadog Agent and Cluster Agent `7.81.2` with `dd-trace-c` `0.12.1`. Confirm any version changes with your Datadog representative before you deploy them.

## Prerequisites

| Owner | Required before deployment |
|---|---|
| Datadog admin | Create a Datadog organization and an API key. An application key is not required for this installation. Store the API key in your secret-management system. |
| Kubernetes admin | Have cluster-admin-equivalent access, Helm, and `kubectl`. |
| Workload owner | Identify one low-risk GPU workload for the initial test. The workload must run on Linux x86_64 or aarch64/ARM64, use dynamically linked libraries, and already have working NVIDIA drivers and GPU scheduling. |

## Create credentials

1. Confirm the [site parameter][1] for your organization. For example, the US1 site uses the UI hostname `app.datadoghq.com` and the manifest value `datadoghq.com`.
1. Go to **Organization Settings** > **API Keys**, select **New Key**, and create a key named for this cluster. Keep the value out of source control.

## Install the Datadog Operator

Install the Operator in a dedicated `datadog` namespace. Single Step Instrumentation doesn't inject pods that run in the Agent's own namespace.

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm upgrade --install datadog-operator datadog/datadog-operator \
  --namespace datadog \
  --create-namespace \
  --version 2.24.0

kubectl rollout status deployment/datadog-operator \
  --namespace datadog \
  --timeout=5m
```

Create the Kubernetes Secret interactively. The prompt doesn't echo the API key.

```shell
read -s "DD_API_KEY?Datadog API key: "
echo
kubectl create secret generic datadog-secret \
  --namespace datadog \
  --from-literal=api-key="$DD_API_KEY"
unset DD_API_KEY
```

## Deploy the pinned Agent configuration

Save the following as `datadog-agent.yaml`. Replace the four placeholders in angle brackets before you apply it.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    apm:
      enabled: true
      instrumentation:
        enabled: true
        targets:
          - name: gpu-monitoring
            podSelector:
              matchLabels:
                admission.datadoghq.com/gpu.enabled: "true"
            ddTraceConfigs:
              - name: DD_INJECT_NATIVE
                value: "always"
              - name: DD_TRACE_HOOK_MODULES
                value: "gpu"
              - name: DD_SERVICE
                value: "<GPU_SERVICE_NAME>"
              - name: DD_ENV
                value: "<ENVIRONMENT>"
            ddTraceVersions:
              c: "0.12.1"

  override:
    nodeAgent:
      image:
        name: agent
        tag: "7.81.2"
    clusterAgent:
      image:
        name: cluster-agent
        tag: "7.81.2"
```

Recommended placeholder values:

- `<CLUSTER_NAME>`: A stable, lowercase name, such as `reflection-gpu-test`. Use letters, numbers, and hyphens.
- `<DATADOG_SITE>`: The value confirmed during account setup, such as `datadoghq.com`.
- `<GPU_SERVICE_NAME>`: A stable workload identity, such as `ml-platform-training`. Don't use a unique name for every run.
- `<ENVIRONMENT>`: `gpu-test`, `staging`, or another existing environment convention.

Apply the configuration and wait for both components:

```shell
kubectl apply -f datadog-agent.yaml

kubectl rollout status daemonset/datadog-agent \
  --namespace datadog \
  --timeout=10m

kubectl rollout status deployment/datadog-cluster-agent \
  --namespace datadog \
  --timeout=10m

kubectl get pods --namespace datadog -o wide
kubectl get datadogagent/datadog --namespace datadog -o yaml
```

If either rollout fails, check the `status.conditions` output from the last command to confirm that the Node Agent DaemonSet and Cluster Agent Deployment reconciled successfully.

## Opt one workload into GPU tracing

**Note**: Add the label to the controller's pod-template `metadata.labels`, not to the Deployment, Job, RayJob, or other controller object itself. Adding the label only to the controller doesn't label its pods, and injection only happens when a new pod is created.

For a Deployment, add:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <GPU_WORKLOAD_NAME>
  namespace: <GPU_WORKLOAD_NAMESPACE>
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/gpu.enabled: "true"
    spec:
      # Keep the existing containers, resources, volumes, and configuration.
```

For KubeRay, add the same label to the head or worker `template.metadata.labels` block that creates the GPU worker pods. For a Kubernetes Job, add it to `spec.template.metadata.labels`.

Apply the modified workload definition, then recreate the selected pods:

```shell
kubectl apply -f <GPU_WORKLOAD_MANIFEST>

# Deployments only:
kubectl rollout restart deployment/<GPU_WORKLOAD_NAME> \
  --namespace <GPU_WORKLOAD_NAMESPACE>

kubectl rollout status deployment/<GPU_WORKLOAD_NAME> \
  --namespace <GPU_WORKLOAD_NAMESPACE> \
  --timeout=10m
```

**Warning**: Don't label the whole namespace or cluster for the initial test. Expand the selector only after you validate the initial workload.

## Verify the installation

### Confirm that the new pod matched

```shell
kubectl get pods --namespace <GPU_WORKLOAD_NAMESPACE> \
  --selector='admission.datadoghq.com/gpu.enabled=true' \
  --show-labels

kubectl get pod <NEW_GPU_POD> \
  --namespace <GPU_WORKLOAD_NAMESPACE> \
  -o jsonpath='{.spec.initContainers[*].name}{"\n"}'
```

The new pod's init containers should include the Datadog injection setup in addition to the workload's original init containers. If they don't, see [Troubleshooting](#troubleshooting) before you run a long GPU job.

### Confirm the injected configuration

```shell
kubectl exec <NEW_GPU_POD> \
  --namespace <GPU_WORKLOAD_NAMESPACE> \
  -- <SHELL> -c \
  'env | grep -E "^(DD_INJECT_NATIVE|DD_TRACE_HOOK_MODULES|DD_SERVICE|DD_ENV)="'
```

Expected values include `DD_INJECT_NATIVE=always` and `DD_TRACE_HOOK_MODULES=gpu`. Replace `<SHELL>` with a shell present in the image, commonly `sh` or `bash`. For distroless images, inspect the pod specification instead of using `exec`.

### Run a representative workload

Start a short but real GPU job that includes several training or inference iterations. For distributed validation, include the workload's normal NCCL collective operations. A pod that starts and exits without CUDA activity isn't a sufficient test.

### Confirm data in Datadog

Allow several minutes after the job begins. In Datadog, open **APM** > **Trace Explorer** and query:

```
service:<GPU_SERVICE_NAME> env:<ENVIRONMENT>
```

Confirm that:

- Traces arrive from the expected cluster and service.
- GPU-related spans or attributes appear during the active workload.
- Distributed work shows the expected ranks and NCCL activity, if used.
- The unlabeled control workload wasn't injected.

Share the Datadog trace link, workload name, namespace, pod name, and test time window with your Datadog representative for final validation.

## Troubleshooting

| Symptom | Checks |
|---|---|
| No Datadog Agent pods | Run `kubectl describe datadogagent/datadog -n datadog`. Inspect the Operator logs, confirm the API key Secret is in the `datadog` namespace, and verify registry egress and image credentials. |
| Agent pods run, but no injection | Confirm the Agent and Cluster Agent are both `7.81.2`, confirm the workload is outside the `datadog` namespace, check that the label is on the pod template, create a pod, and inspect the Cluster Agent admission-controller logs. |
| Injection init container fails | Describe the pod and inspect the init container logs. Verify the cluster can pull the injection images and that its admission and security policies permit the added volumes, mounts, and environment variables. |
| Pod starts, but no GPU data | Confirm the injected variables, verify the application executes CUDA, check that `libcudart.so` is dynamically loaded, and confirm the host is Linux x86_64 or aarch64. Share workload logs with Datadog. |
| CUDA spans but limited NCCL detail | Confirm that the workload uses NCCL rather than another collective backend. NCCL 2.18+ supports base collective hooks. The bundled detailed NCCL Inspector requires NCCL 2.27+ and must remain version-matched with tracer `0.12.1`. |
| Traces leave the pod but don't appear | Inspect the Trace Agent logs, verify the site value and API key, and test outbound TCP 443 to the site-specific trace intake. Confirm the workload sends to the same Datadog organization used to create the API key. |

Useful diagnostics:

```shell
kubectl logs deployment/datadog-cluster-agent \
  --namespace datadog --all-containers --tail=300

kubectl logs daemonset/datadog-agent \
  --namespace datadog --all-containers --tail=300

kubectl describe pod <NEW_GPU_POD> \
  --namespace <GPU_WORKLOAD_NAMESPACE>
```

## Roll back

Remove the opt-in label from the workload's pod template and recreate its pods. This stops injection for that workload without removing cluster monitoring:

```shell
kubectl patch deployment/<GPU_WORKLOAD_NAME> \
  --namespace <GPU_WORKLOAD_NAMESPACE> \
  --type=json \
  -p='[{"op":"remove","path":"/spec/template/metadata/labels/admission.datadoghq.com~1gpu.enabled"}]'
```

The pod-template patch starts a Deployment rollout automatically. If the label is managed declaratively, also remove it from the source manifest so the next deployment doesn't restore it. Use the equivalent pod-template edit for Jobs, RayJobs, or other controllers.

To remove Datadog completely after the evaluation:

```shell
kubectl delete datadogagent/datadog --namespace datadog
helm uninstall datadog-operator --namespace datadog
```

Delete the namespace or API key Secret only after you confirm no other Datadog configuration uses it. Revoke the cluster API key in Datadog when it's no longer needed.

This guide is scoped to the opt-in Kubernetes design-partner rollout described above. Confirm version changes and broader production enablement with your Datadog representative.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
