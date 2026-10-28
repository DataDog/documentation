---
title: "Quickstart: OpenTelemetry on Kubernetes"
description: "Install OpenTelemetry on a Kubernetes cluster and send traces, metrics, and logs to Datadog."
aliases:
- /opentelemetry/getting_started/kubernetes/
further_reading:
- link: "/opentelemetry/correlate/"
  tag: "Documentation"
  text: "Correlate OpenTelemetry Data"
- link: "/opentelemetry/config/hostname_tagging/"
  tag: "Documentation"
  text: "Hostname and Tagging"
- link: "/opentelemetry/compatibility/"
  tag: "Documentation"
  text: "Datadog and OpenTelemetry Compatibility"
---

## Overview

Install OpenTelemetry on a Kubernetes cluster with an installer script. In about 10 minutes, your application's services, traces, and logs appear in Datadog, along with your cluster's hosts and metrics.

For production, install with Helm and your own configuration instead: see [Install the DDOT Collector on Kubernetes][19] or [Set up the OpenTelemetry Collector][20].

This quickstart uses Kubernetes. For other environments:

- **A host, a VM, or Docker, or an OpenTelemetry Collector you already run**: [Set up the OpenTelemetry Collector][17].
- **Serverless functions or managed platforms**: [Datadog OTLP intake endpoint][21].
- **The Datadog Agent, already running**: [Send OpenTelemetry data through the Datadog Agent][22].

Choose a path: Datadog OpenTelemetry (DDOT) or upstream OpenTelemetry. Steps that differ by path have a **DDOT** tab and an **Upstream** tab.

| Path | What runs in your cluster | How data reaches Datadog |
|---|---|---|
| **DDOT** | The DDOT Collector and DDOT SDKs. The Datadog Agent is optional. | The DDOT Collector's Datadog Exporter. |
| **Upstream** | The upstream OpenTelemetry Collector and OpenTelemetry SDKs. No Datadog Agent or Datadog Exporter. | OTLP over HTTP to the Datadog OTLP intake. |

## Prerequisites

- A dedicated test Kubernetes cluster. Don't use a shared cluster, because the uninstall removes cluster-wide OpenTelemetry Operator and cert-manager resources, including ones it didn't create.
- `kubectl` access with cluster-admin permissions.
- [Helm][4] 3 or later, and `git`.
- A [Datadog API key][5].
- An application that runs in the cluster as a Deployment, written in Java, Python, Node.js, or .NET. Other languages, such as Go, need extra setup. See [Instrument Your Applications][8].

## 1. Download the installer

Clone the `opentelemetry-examples` repository and go to the installer's folder:

```shell
git clone https://github.com/DataDog/opentelemetry-examples.git
cd opentelemetry-examples/guides/kubernetes/configuration/opentelemetry-kube-stack
```

## 2. Set your configuration

Set these environment variables in the terminal you use for the rest of this quickstart:

{{< tabs >}}
{{% tab "DDOT" %}}

**[Placeholder: release-stage banner]**

With `DD_INSTALL_FLOW=ddot`, the installer sets up the DDOT Collector and DDOT SDKs. The Datadog Agent is optional, and `DD_AGENT_ENABLED=false` leaves it out.

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"
export DD_INSTALL_FLOW=ddot
export DD_AGENT_ENABLED=false
export K8S_CLUSTER_TYPE=other
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
export DD_HOST_PROFILER_ENABLED=false
export DD_HOST_PROFILER_NETWORK_POLICY=none
```

**Optional: install the Datadog Agent.** Some features need the Agent: **[Placeholder: features that need the Agent]**. To install it, set `DD_AGENT_ENABLED` to `true` before you run the installer:

```shell
export DD_AGENT_ENABLED=true
```

The installer then also installs the Datadog Operator and the Datadog Agent in the `datadog` namespace.

{{% /tab %}}
{{% tab "Upstream" %}}

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"
export DD_INSTALL_FLOW=upstream
export K8S_CLUSTER_TYPE=other
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
export DD_HOST_PROFILER_ENABLED=false
export DD_HOST_PROFILER_NETWORK_POLICY=none
```

{{% /tab %}}
{{< /tabs >}}

Replace the placeholders, and set `K8S_CLUSTER_TYPE` for your cluster:

| Variable | Value |
|---|---|
| `DD_API_KEY` | Your Datadog API key. |
| `DD_SITE` | The domain of your [Datadog site][6]. For {{< region-param key=dd_datacenter code="true" >}}, it's {{< region-param key="dd_site" code="true" >}}. |
| `K8S_CLUSTER_TYPE` | `eks`, `gcp`, `aks`, or `other`. For `eks`, `gcp`, and `aks`, the Collectors detect the cluster name, so you can leave out `K8S_CLUSTER_NAME`. |
| `K8S_CLUSTER_NAME` | Set it when `K8S_CLUSTER_TYPE` is `other`. A name for your cluster, in lowercase letters, numbers, and hyphens. Datadog shows it in Kubernetes Explorer and, with `other`, in each node's hostname. |
| `DEPLOYMENT_ENVIRONMENT_NAME` | The `env` tag for all your data, such as `staging`, in lowercase letters, numbers, and hyphens. If you leave it out, the installer uses `production`. |
| `DD_HOST_PROFILER_ENABLED` | `true` turns on the optional host profiler, described after this table. |
| `DD_HOST_PROFILER_NETWORK_POLICY` | The host profiler's egress policy: `none`, `standard`, or `cilium`. Used only when the host profiler is on. |

**Optional: turn on the host profiler.** **[Placeholder: host profiler name, release stage, and image]** The host profiler runs on every node and profiles every process on it. It works with both paths. It needs Linux nodes with kernel 5.10 or later and Kubernetes 1.30 or later, and its pods need more privileges than the Collectors. To turn it on, set `DD_HOST_PROFILER_ENABLED` to `true`. If your cluster blocks outgoing traffic by default with network policies, also set `DD_HOST_PROFILER_NETWORK_POLICY` to `standard`, or to `cilium` if your cluster uses Cilium, so the profiler can reach Datadog.

## 3. Run the installer

1. Run the installer:

   ```shell
   ./install
   ```

   If your cluster doesn't use Cilium, the installer prints `error: the server doesn't have a resource type "ciliumnetworkpolicy"` and continues. Ignore that line and any `[DEPRECATION]` warnings.

2. Wait for the Operator to be ready, then list the pods. The Operator only instruments pods that start after it's ready.

   ```shell
   kubectl rollout status deployment/opentelemetry-kube-stack-opentelemetry-operator -n opentelemetry-operator-system --timeout=5m
   kubectl get pods -n opentelemetry-operator-system
   ```

   The Collectors can take a minute to be ready. You get one `daemon` Collector pod for each node. On a one-node cluster, the output looks like this:

   ```text
   NAME                                                              READY   STATUS    RESTARTS   AGE
   kube-state-metrics-574848497d-b7g79                               1/1     Running   0          2m
   opentelemetry-kube-stack-cluster-collector-848ff96d77-trdsp       1/1     Running   0          2m
   opentelemetry-kube-stack-daemon-collector-zv6lx                   1/1     Running   0          2m
   opentelemetry-kube-stack-opentelemetry-operator-5ccfd8f959fjmvm   1/1     Running   0          2m
   ```

## 4. Instrument your application

1. Add the language annotation to your Deployment's pod template. Replace `<DEPLOYMENT_NAME>` and `<NAMESPACE>` with your Deployment's name and namespace, and `<LANGUAGE>` with `java`, `python`, `nodejs`, or `dotnet`:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type merge -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-<LANGUAGE>":"opentelemetry-operator-system/opentelemetry-kube-stack"}}}}}'
   ```

   The patch restarts the pods with instrumentation: the DDOT SDK on the DDOT path, or the OpenTelemetry SDK on the Upstream path. It sends data to the `daemon` Collector, so you don't need to set an endpoint.

2. Send a few requests to your application so it produces traces.

## 5. Verify your data in Datadog

Data appears within a few minutes. In the following table:

- `<SERVICE_NAME>` is your Deployment's name, unless you set a different service name. The service version is the container image's tag.
- `<ENVIRONMENT>` and `<CLUSTER_NAME>` are the values you set in step 2.

| Check | Where to look | What you see |
|---|---|---|
| Services | [Software Catalog][9]: set the environment to `<ENVIRONMENT>` and search for `<SERVICE_NAME>`. | The service page, with requests, errors, and latency. |
| Traces | [Trace Explorer][10]: search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. | Traces you can open to see their spans. Traces can take about five minutes to appear. |
| Logs | [Log Explorer][15]: search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. | Your application's logs. |
| Hosts | [Host List][11] | Find your nodes and check their hostnames. With `K8S_CLUSTER_TYPE=other`, each hostname is `<NODE_NAME>-<CLUSTER_NAME>`. With the Datadog Agent installed, each node also appears by its node name, with `<NODE_NAME>-<CLUSTER_NAME>` as an alias. For `eks`, `gcp`, and `aks`, see [Hostnames and Tagging][23]. |
| Kubernetes | [Kubernetes Explorer][13]: filter by your cluster name. | Your pods, Deployments, and nodes. |
| Metrics, DDOT path | [Metrics Explorer][14]: graph `k8s.node.cpu.usage` filtered by `kube_cluster_name:<CLUSTER_NAME>`. | Node CPU usage for your cluster. |
| Metrics, Upstream path | [Metrics Explorer][14]: graph `k8s.node.cpu.usage` filtered by `k8s.cluster.name:<CLUSTER_NAME>`. | Node CPU usage for your cluster. |
| Profiles, if you turned on the host profiler | **[Placeholder: where to find host profiles]** | Profiles from the processes on your nodes. |

## Troubleshooting

For more help, see [OpenTelemetry Troubleshooting][16].

### No data in Datadog

1. Check that `DD_SITE` matches your Datadog site and that the API key is valid.
2. Search the `daemon` Collector's logs for export errors:

   ```shell
   kubectl logs -n opentelemetry-operator-system daemonset/opentelemetry-kube-stack-daemon-collector | grep -iE "403|401|forbidden|exporting failed"
   ```

   A `403` or `401` means the API key or the site is wrong. Errors from the `file_log` receiver are about reading container logs and don't stop data from reaching Datadog.

### Your service doesn't appear

1. Check that the annotation names your application's language.
2. List the pod's init containers to check that the Operator instrumented it. The list includes `opentelemetry-auto-instrumentation-<LANGUAGE>`:

   ```shell
   kubectl get pod <POD_NAME> -n <NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

3. If the list is empty, the pod started before the Operator was ready. Restart the Deployment so its pods start with instrumentation:

   ```shell
   kubectl rollout restart deployment <DEPLOYMENT_NAME> -n <NAMESPACE>
   ```

### Hostnames don't include your cluster name

With `K8S_CLUSTER_TYPE=other`, set `K8S_CLUSTER_NAME` and run `./install` again.

When you run the installer again, it prints `Error: INSTALLATION FAILED: release name check failed: cannot reuse a name that is still in use` for cert-manager, because cert-manager is already installed, and continues. Ignore that error.

If you installed the Datadog Agent, delete the Agent's secret before you run `./install` again. Otherwise, the installer stops because the secret already exists, after it updates the Collectors but before it updates the Agent:

```shell
kubectl delete secret datadog-secret -n datadog
```

## Uninstall

<div class="alert alert-warning">The uninstall script is for test clusters. It deletes cert-manager, the OpenTelemetry Operator's custom resource definitions and every resource that uses them, and the <code>cert-manager</code>, <code>opentelemetry-operator-system</code>, and <code>datadog</code> namespaces. That includes any Datadog Agent installed in the <code>datadog</code> namespace. If you installed the Datadog Agent, it also removes the Datadog Operator and its custom resource definitions, which deletes every Datadog Operator resource in the cluster, such as <code>DatadogAgent</code> resources.</div>

1. Remove the annotation from your Deployment. Its pods restart without instrumentation:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
   ```

2. Run the uninstall script, and type `yes` when it asks:

   ```shell
   ./uninstall
   ```

   If you didn't install the Datadog Agent, the script also tries to remove Agent components. Ignore the errors it prints about them.

3. The script leaves the Prometheus Operator custom resource definitions that the Helm chart adds. If nothing else in your cluster uses them, delete them:

   ```shell
   kubectl delete crd podmonitors.monitoring.coreos.com probes.monitoring.coreos.com scrapeconfigs.monitoring.coreos.com servicemonitors.monitoring.coreos.com
   ```

## Next steps

- Instrument more services, or add custom spans and metrics: [Instrument Your Applications][8].
- Install for production without the script. These pages install the Collector with your own configuration. They don't convert the quickstart's installation.
  - DDOT: [Install the DDOT Collector on Kubernetes][19].
  - Upstream: [Set up the OpenTelemetry Collector][20].
- Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version`: [Unified service tagging][18].

{{% collapse-content title="What the installer set up" level="h4" expanded=false %}}

The installer uses Helm to install the [OpenTelemetry Kube Stack][7] chart. The Collectors' configuration comes from the values files in the installer's folder, such as `values-otlp-http.yaml` for the Upstream path. To change it, pass your own values file to the installer, such as `./install my-values.yaml`. The installer applies it on top of its own values files.

| Component | Where | What it does |
|---|---|---|
| `datadog-secret` | `opentelemetry-operator-system` namespace | Stores your API key and site. |
| [cert-manager][2] | `cert-manager` namespace | Issues the certificate for the Operator's admission webhook. The installer adds it only if your cluster doesn't have it. |
| `opentelemetry-kube-stack` Helm release | `opentelemetry-operator-system` namespace | Runs the [OpenTelemetry Operator][1], kube-state-metrics, and the two Collectors. The Operator manages the Collectors and adds instrumentation to your applications. |
| `cluster` Collector | Deployment | Collects cluster-level metrics and Kubernetes objects. |
| `daemon` Collector | DaemonSet | Runs on every node. Collects node metrics and container logs, and receives your application's telemetry. |
| `opentelemetry-kube-stack` instrumentation settings | `Instrumentation` resource | Tells the Operator how to instrument annotated pods and where they send data. |
| `host-profiler` Collector | DaemonSet | Installed only if you set `DD_HOST_PROFILER_ENABLED=true`. Profiles every process on its node. |
| Datadog Operator and Datadog Agent (DDOT path only) | `datadog` namespace | Installed when `DD_AGENT_ENABLED` is `true`, the installer's default. |

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[2]: https://cert-manager.io/
[4]: https://helm.sh/docs/intro/install/
[5]: /account_management/api-app-keys/#api-keys
[6]: /getting_started/site/
[7]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[8]: /opentelemetry/instrument/
[9]: https://app.datadoghq.com/software
[10]: https://app.datadoghq.com/apm/traces
[11]: https://app.datadoghq.com/infrastructure
[13]: https://app.datadoghq.com/orchestration/overview
[14]: https://app.datadoghq.com/metric/explorer
[15]: https://app.datadoghq.com/logs
[16]: /opentelemetry/troubleshooting/
[17]: /opentelemetry/setup/collector_exporter/
[18]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[19]: /opentelemetry/setup/ddot_collector/kubernetes/
[20]: /opentelemetry/setup/collector_exporter/?tab=kubernetes
[21]: /opentelemetry/setup/otlp_ingest/
[22]: /opentelemetry/setup/agent/
[23]: /opentelemetry/config/hostname_tagging/
