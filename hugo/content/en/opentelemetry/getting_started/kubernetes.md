---
title: "Quickstart: OpenTelemetry on Kubernetes"
description: "Install OpenTelemetry on a Kubernetes cluster and send traces, metrics, and logs to Datadog."
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

Install OpenTelemetry on a test Kubernetes cluster with an installer script. In about 10 minutes, your application's services, traces, and logs appear in Datadog, along with your cluster's hosts and metrics.

Not using Kubernetes? See [Send OpenTelemetry Data to Datadog][3].

Choose a path. Steps that differ by path have an **Upstream** tab and a **DDOT** tab.

| Path | What runs in your cluster | How data reaches Datadog |
|---|---|---|
| **Upstream** | The upstream OpenTelemetry Collector and OpenTelemetry SDKs. No Datadog Agent or Datadog exporter. | OTLP over HTTP to the Datadog OTLP intake. |
| **DDOT** | **[Placeholder: DDOT components]** | **[Placeholder]** |

## Prerequisites

- A test Kubernetes cluster that no other workloads depend on. The [uninstall script](#uninstall) removes cert-manager and other shared components.
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
{{% tab "Upstream" %}}

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"
export DD_INSTALL_FLOW=upstream
export K8S_CLUSTER_TYPE=other
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
```

{{% /tab %}}
{{% tab "DDOT" %}}

**[Placeholder: release-stage banner]**

**[Placeholder: DDOT settings]**

On the DDOT path, the installer also installs the Datadog Operator and the Datadog Agent in the `datadog` namespace. To install without the Agent, also set `DD_AGENT_ENABLED=false`.

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"
export DD_INSTALL_FLOW=ddot
export K8S_CLUSTER_TYPE=other
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
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

   The patch restarts the pods with instrumentation, which sends data to the `daemon` Collector. You don't need to set an endpoint.

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
| Hosts | [Host List][11] | Each node, listed one time. With `K8S_CLUSTER_TYPE=other`, the name is `<NODE_NAME>-<CLUSTER_NAME>`. |
| Kubernetes | [Kubernetes Explorer][13]: filter by your cluster name. | Your pods, Deployments, and nodes. |
| Metrics, Upstream path | [Metrics Explorer][14]: graph `k8s.node.cpu.usage` filtered by `k8s.cluster.name:<CLUSTER_NAME>`. | Node CPU usage for your cluster. |
| Metrics, DDOT path | [Metrics Explorer][14]: graph `k8s.node.cpu.usage` filtered by `kube_cluster_name:<CLUSTER_NAME>`. | Node CPU usage for your cluster. |

## Troubleshooting

For more help, see [OpenTelemetry Troubleshooting][16].

### No data in Datadog

1. Check that `DD_SITE` matches your Datadog site and that the API key is valid.
2. Search the `daemon` Collector's logs for export errors:

   ```shell
   kubectl logs -n opentelemetry-operator-system daemonset/opentelemetry-kube-stack-daemon-collector | grep -i "exporting failed"
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

## Uninstall

<div class="alert alert-warning">The uninstall script is for test clusters. It deletes cert-manager, the OpenTelemetry Operator's custom resource definitions and every resource that uses them, and the <code>cert-manager</code>, <code>opentelemetry-operator-system</code>, and <code>datadog</code> namespaces. That includes any Datadog Agent installed in the <code>datadog</code> namespace.</div>

1. Remove the annotation from your Deployment. Its pods restart without instrumentation:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
   ```

2. Run the uninstall script, and type `yes` when it asks:

   ```shell
   ./uninstall
   ```

   On the Upstream path, the script also tries to remove Datadog Agent components that it didn't install. Ignore the errors it prints about them.

3. The script leaves the Prometheus Operator custom resource definitions that the Helm chart adds. If nothing else in your cluster uses them, delete them:

   ```shell
   kubectl delete crd podmonitors.monitoring.coreos.com probes.monitoring.coreos.com scrapeconfigs.monitoring.coreos.com servicemonitors.monitoring.coreos.com
   ```

## Next steps

- Instrument more services, or add custom spans and metrics: [Instrument Your Applications][8].
- Install for production without the script:
  - Upstream: [Set up the OpenTelemetry Collector][17].
  - DDOT: [Install the DDOT Collector on Kubernetes][19].
- Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version`: [Unified service tagging][18].

{{% collapse-content title="What the installer set up" level="h4" expanded=false %}}

The installer uses Helm to install the [OpenTelemetry Kube Stack][7] chart. The Collectors' configuration comes from the values files in the installer's folder, such as `values-otlp-http.yaml` for the Upstream path.

| Component | Where | What it does |
|---|---|---|
| `datadog-secret` | `opentelemetry-operator-system` namespace | Stores your API key and site. |
| [cert-manager][2] | `cert-manager` namespace | Issues the certificate for the Operator's admission webhook. The installer adds it only if your cluster doesn't have it. |
| `opentelemetry-kube-stack` Helm release | `opentelemetry-operator-system` namespace | Runs the [OpenTelemetry Operator][1], kube-state-metrics, and the two Collectors. The Operator manages the Collectors and adds instrumentation to your applications. |
| `cluster` Collector | Deployment | Collects cluster-level metrics and Kubernetes objects. |
| `daemon` Collector | DaemonSet | Runs on every node. Collects node metrics and container logs, and receives your application's telemetry. |
| `opentelemetry-kube-stack` instrumentation settings | `Instrumentation` resource | Tells the Operator how to instrument annotated pods and where they send data. |
| Datadog Operator and Datadog Agent (DDOT path only) | `datadog` namespace | Installed unless you set `DD_AGENT_ENABLED=false`. |

{{% /collapse-content %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[2]: https://cert-manager.io/
[3]: /opentelemetry/setup/
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
