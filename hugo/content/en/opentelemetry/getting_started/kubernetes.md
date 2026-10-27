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

Use this quickstart to install OpenTelemetry on a test Kubernetes cluster and send traces, metrics, and logs to Datadog. It takes about 10 minutes. When you finish, your application's services, traces, and logs appear in Datadog, along with your cluster's hosts and metrics.

For a production install with your own Helm values, see [Next steps](#next-steps). Not using Kubernetes? See [Send OpenTelemetry Data to Datadog][3].

The installer script uses Helm to install these components:

- The [OpenTelemetry Operator][1]. It runs the Collectors and adds OpenTelemetry instrumentation to your applications.
- Two Collectors. The `cluster` Collector collects cluster-level metrics and Kubernetes objects. The `daemon` Collector runs on every node, collects node metrics and logs, and receives your application's telemetry.
- [cert-manager][2], which the Operator needs for its admission webhook.

Choose a path. Where a step differs by path, it shows an **Upstream** tab and a **DDOT** tab.

| Path | What runs in your cluster | How data reaches Datadog |
|---|---|---|
| **Upstream** | The upstream OpenTelemetry Collector and OpenTelemetry SDKs. No Datadog Agent or Datadog exporter. | OTLP over HTTP to the Datadog OTLP intake. |
| **DDOT** | **[Placeholder: DDOT components]** | **[Placeholder]** |

## Prerequisites

- A test Kubernetes cluster. The uninstall script at the end of this quickstart removes cert-manager and other shared components, so don't use a cluster that other workloads depend on.
- `kubectl` access with cluster-admin permissions.
- [Helm][4] 3 or later.
- `git`.
- A [Datadog API key][5].
- An application running in the cluster as a Deployment, written in Java, Python, Node.js, or .NET. Go and other languages need extra setup that this quickstart doesn't cover. See [Instrument Your Applications][8].

## 1. Download the installer

Clone the `opentelemetry-examples` repository and go to the installer's folder:

```shell
git clone https://github.com/DataDog/opentelemetry-examples.git
cd opentelemetry-examples/guides/kubernetes/configuration/opentelemetry-kube-stack
```

## 2. Set your configuration

In the terminal you use for the rest of this quickstart, set these environment variables:

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

Replace the placeholder values, and set `K8S_CLUSTER_TYPE` for your cluster:

| Variable | Value |
|---|---|
| `DD_API_KEY` | Your Datadog API key. |
| `DD_SITE` | The domain of your [Datadog site][6]. For your site, {{< region-param key=dd_datacenter code="true" >}}, the value is {{< region-param key="dd_site" code="true" >}}. |
| `K8S_CLUSTER_TYPE` | `eks`, `gcp`, `aks`, or `other`. For `eks`, `gcp`, and `aks`, the Collectors detect the cluster name, so you can leave out `K8S_CLUSTER_NAME`. |
| `K8S_CLUSTER_NAME` | A name for your cluster, using lowercase letters, numbers, and hyphens. Datadog shows it in Kubernetes Explorer. With `other`, Datadog also adds it to each node's hostname. Set it when `K8S_CLUSTER_TYPE` is `other`. |
| `DEPLOYMENT_ENVIRONMENT_NAME` | The environment name, such as `staging`, using lowercase letters, numbers, and hyphens. It becomes the `env` tag on all your data. If you leave it out, the installer uses `production`. |

## 3. Run the installer

```shell
./install
```

The installer creates the `opentelemetry-operator-system` namespace and stores your API key and site in a secret named `datadog-secret`. It installs cert-manager if your cluster doesn't have it, then installs the [OpenTelemetry Kube Stack][7] Helm chart.

If your cluster doesn't use Cilium, the installer prints `error: the server doesn't have a resource type "ciliumnetworkpolicy"` and continues. You can ignore that line and any `[DEPRECATION]` warnings.

After the installer finishes, wait for the Operator to be ready. The Operator only instruments pods that start after it's ready.

```shell
kubectl rollout status deployment/opentelemetry-kube-stack-opentelemetry-operator -n opentelemetry-operator-system --timeout=5m
kubectl get pods -n opentelemetry-operator-system
```

The output lists the Operator, kube-state-metrics, the `cluster` Collector, and one `daemon` Collector pod for each node. The Collectors can take a minute to be ready. On a one-node cluster, the output looks like this:

```text
NAME                                                              READY   STATUS    RESTARTS   AGE
kube-state-metrics-574848497d-b7g79                               1/1     Running   0          2m
opentelemetry-kube-stack-cluster-collector-848ff96d77-trdsp       1/1     Running   0          2m
opentelemetry-kube-stack-daemon-collector-zv6lx                   1/1     Running   0          2m
opentelemetry-kube-stack-opentelemetry-operator-5ccfd8f959fjmvm   1/1     Running   0          2m
```

### What the installer set up

| Component | Where | What it does |
|---|---|---|
| `datadog-secret` | `opentelemetry-operator-system` namespace | Stores your API key and site. |
| cert-manager | `cert-manager` namespace | Issues the certificate for the Operator's admission webhook. |
| `opentelemetry-kube-stack` Helm release | `opentelemetry-operator-system` namespace | Runs the OpenTelemetry Operator, kube-state-metrics, and the two Collectors. |
| `cluster` Collector | Deployment | Collects cluster-level metrics and Kubernetes objects. |
| `daemon` Collector | DaemonSet | Collects node metrics and container logs, and receives your application's telemetry. |
| `opentelemetry-kube-stack` instrumentation settings | `Instrumentation` resource | Tells the Operator how to instrument annotated pods and where they send data. |

The Collectors' configuration comes from the values files in the installer's folder, such as `values-otlp-http.yaml` for the Upstream path.

## 4. Instrument your application

The Operator adds OpenTelemetry instrumentation to a pod when the pod has an annotation for its language. The annotation points to the `opentelemetry-kube-stack` instrumentation settings that the installer created.

Add the annotation to your Deployment's pod template:

```shell
kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type merge -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-<LANGUAGE>":"opentelemetry-operator-system/opentelemetry-kube-stack"}}}}}'
```

Replace `<DEPLOYMENT_NAME>` and `<NAMESPACE>` with your Deployment's name and namespace. Replace `<LANGUAGE>` with `java`, `python`, `nodejs`, or `dotnet`.

The patch restarts the Deployment's pods with instrumentation. The instrumentation sends data to the `daemon` Collector, so you don't need to set an endpoint. By default, the service name in Datadog is the Deployment's name, and the version is the container image's tag.

Send a few requests to your application so it produces traces.

## 5. Verify your data in Datadog

Data appears in Datadog within a few minutes. In the searches below, replace `<SERVICE_NAME>` with your service name, which is your Deployment's name by default. Use the cluster and environment names from step 2.

- **Services**: In the [Software Catalog][9], set the environment to `<ENVIRONMENT>` and search for `<SERVICE_NAME>`. Its service page shows requests, errors, and latency.
- **Traces**: In the [Trace Explorer][10], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>` and open a trace to see its spans. Traces can take about five minutes to appear.
- **Hosts**: In the [Host List][11], each node appears once. With `K8S_CLUSTER_TYPE=other`, the name is `<NODE_NAME>-<CLUSTER_NAME>`.
- **Kubernetes**: In [Kubernetes Explorer][13], filter by your cluster name. The resource sections list your pods, Deployments, and nodes.
- **Metrics**: In the [Metrics Explorer][14], graph `k8s.node.cpu.usage`. On the Upstream path, filter by `k8s.cluster.name:<CLUSTER_NAME>`. On the DDOT path, filter by `kube_cluster_name:<CLUSTER_NAME>`.
- **Logs**: In the [Log Explorer][15], search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`.

## Troubleshooting

No data in Datadog
: Check that `DD_SITE` matches your Datadog site and that the API key is valid. Then search the `daemon` Collector's logs for export errors:

  ```shell
  kubectl logs -n opentelemetry-operator-system daemonset/opentelemetry-kube-stack-daemon-collector | grep -i "exporting failed"
  ```

  A `403` or `401` in the output means the API key or the site is wrong. Errors from the `file_log` receiver are about reading container logs and don't stop data from reaching Datadog.

Your service doesn't appear
: Check that the annotation names your application's language. Then check that the Operator instrumented the pod. List the pod's init containers, which include `opentelemetry-auto-instrumentation-<LANGUAGE>`:

  ```shell
  kubectl get pod <POD_NAME> -n <NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
  ```

  If the list is empty, the pod started before the Operator was ready. Restart the Deployment so its pods start again with instrumentation:

  ```shell
  kubectl rollout restart deployment <DEPLOYMENT_NAME> -n <NAMESPACE>
  ```

Hostnames don't include your cluster name
: With `K8S_CLUSTER_TYPE=other`, set `K8S_CLUSTER_NAME` and run `./install` again.

For more help, see [OpenTelemetry Troubleshooting][16].

## Uninstall

Remove the annotation from your Deployment. Its pods restart without instrumentation:

```shell
kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
```

<div class="alert alert-warning">The uninstall script is for test clusters. It deletes cert-manager, the OpenTelemetry Operator's custom resource definitions and every resource that uses them, and the <code>cert-manager</code>, <code>opentelemetry-operator-system</code>, and <code>datadog</code> namespaces. That includes any Datadog Agent installed in the <code>datadog</code> namespace.</div>

Run the uninstall script and type `yes` when it asks. It also tries to remove Datadog Agent components that the Upstream path doesn't install, and prints errors about them that you can ignore.

```shell
./uninstall
```

The script leaves the Prometheus Operator custom resource definitions that the Helm chart adds. If nothing else in your cluster uses them, delete them:

```shell
kubectl delete crd podmonitors.monitoring.coreos.com probes.monitoring.coreos.com scrapeconfigs.monitoring.coreos.com servicemonitors.monitoring.coreos.com
```

## Next steps

- Instrument more services, or add custom spans and metrics: [Instrument Your Applications][8].
- Install for production without the script:
  - Upstream: [Set up the OpenTelemetry Collector][17].
  - DDOT: [Install the DDOT Collector on Kubernetes][19].
- Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version`: [Unified service tagging][18].

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
[19]: /opentelemetry/setup/ddot_collector/install/kubernetes_standalone/
