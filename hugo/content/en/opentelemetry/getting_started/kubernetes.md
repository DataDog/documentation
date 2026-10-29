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

Monitor your Kubernetes applications and infrastructure in Datadog with OpenTelemetry. This quickstart installs a Collector, adds instrumentation to your application, and shows you where to find your services, traces, and logs in Datadog.

Use DDOT or upstream OpenTelemetry components. The installation steps are the same; select your setup in the **DDOT** or **Upstream** tab in step 2. To compare the two, see [Choose a setup][25].

For other environments and installation options, see [Send OpenTelemetry Data to Datadog][17].

## Prerequisites

- A Kubernetes cluster with cluster-admin access through `kubectl`.
- [Helm][4] 3 or later, and `git`.
- A [Datadog API key][5].
- An application that runs in the cluster as a Deployment, written in Java, Python, Node.js, or .NET.

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

**Note**: The DDOT SDKs and the DDOT Collector are in Preview.

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="<DATADOG_SITE>"
export DD_INSTALL_FLOW=ddot
export DD_AGENT_ENABLED=false
export K8S_CLUSTER_TYPE="<CLUSTER_TYPE>"
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
```

**Optional:** Some Datadog features need the Datadog Agent. For which ones, see [Feature Compatibility](/opentelemetry/compatibility/#feature-compatibility). To install the Agent too, set `DD_AGENT_ENABLED=true`. The installer adds the Datadog Operator and the Agent in the `datadog` namespace.

{{% /tab %}}
{{% tab "Upstream" %}}

```shell
export DD_API_KEY="<DATADOG_API_KEY>"
export DD_SITE="<DATADOG_SITE>"
export DD_INSTALL_FLOW=upstream
export K8S_CLUSTER_TYPE="<CLUSTER_TYPE>"
export K8S_CLUSTER_NAME="<CLUSTER_NAME>"
export DEPLOYMENT_ENVIRONMENT_NAME="<ENVIRONMENT>"
```

{{% /tab %}}
{{< /tabs >}}

Replace the placeholders:

| Variable | Value |
|---|---|
| `DD_API_KEY` | Your Datadog API key. |
| `DD_SITE` | The domain of your [Datadog site][6]. For {{< region-param key=dd_datacenter code="true" >}}, it's {{< region-param key="dd_site" code="true" >}}. |
| `K8S_CLUSTER_TYPE` | `eks`, `gcp`, `aks`, or `other`. For `eks`, `gcp`, and `aks`, the Collectors detect the cluster name, so you can leave out `K8S_CLUSTER_NAME`. |
| `K8S_CLUSTER_NAME` | Set it when `K8S_CLUSTER_TYPE` is `other`. A name for your cluster, in lowercase letters, numbers, and hyphens. Datadog shows it in Kubernetes Explorer. |
| `DEPLOYMENT_ENVIRONMENT_NAME` | The `env` tag for all your data, such as `staging`, in lowercase letters, numbers, and hyphens. If you leave it out, the installer uses `production`. |

## 3. Run the installer

1. Run the installer:

   ```shell
   ./install
   ```

2. Wait for the Operator to be ready, then list the pods. The Operator only instruments pods that start after it's ready.

   ```shell
   kubectl rollout status deployment/opentelemetry-kube-stack-opentelemetry-operator -n opentelemetry-operator-system --timeout=5m
   kubectl get pods -n opentelemetry-operator-system
   ```

   Within a minute or two, these pods are `Running`: the Operator, kube-state-metrics, the `cluster` Collector, and one `daemon` Collector for each node.

## 4. Instrument your application

On the DDOT path, if your application's code already sets up an SDK, check [Before switching from an OpenTelemetry SDK][28] before you add the annotation.

1. Add the language annotation to your Deployment's pod template. Replace `<DEPLOYMENT_NAME>` and `<NAMESPACE>` with your Deployment's name and namespace, and `<LANGUAGE>` with `java`, `python`, `nodejs`, or `dotnet`:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type merge -p '{"spec":{"template":{"metadata":{"annotations":{"instrumentation.opentelemetry.io/inject-<LANGUAGE>":"opentelemetry-operator-system/opentelemetry-kube-stack"}}}}}'
   kubectl rollout status deployment/<DEPLOYMENT_NAME> -n <NAMESPACE> --timeout=5m
   ```

   The patch restarts the pods with instrumentation: the DDOT SDK on the DDOT path, or the OpenTelemetry SDK on the Upstream path. The second command waits for the restart to finish. The SDK sends data to the `daemon` Collector, so you don't need to set an endpoint.

2. Send a few requests to your application so it produces traces.

## 5. Verify your data in Datadog

Data appears within a few minutes. `<SERVICE_NAME>` is your Deployment's name, unless you set a different service name. `<ENVIRONMENT>` is the value you set in step 2.

| Check | Where to look | What you see |
|---|---|---|
| Services | [Catalog][9]: set the environment to `<ENVIRONMENT>` and search for `<SERVICE_NAME>`. | The service page, with requests, errors, and latency. |
| Traces | [Trace Explorer][10]: search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. | Traces you can open to see their spans. |
| Logs | [Log Explorer][15]: search for `service:<SERVICE_NAME> env:<ENVIRONMENT>`. | Your application's logs. |

## Troubleshooting

### No data in Datadog

Check that `DD_SITE` matches your Datadog site and that your API key is valid. Search the `daemon` Collector's logs for export errors:

```shell
kubectl logs -n opentelemetry-operator-system daemonset/opentelemetry-kube-stack-daemon-collector | grep -iE "403|401|forbidden|exporting failed"
```

A `403` or `401` usually means the API key or the site is wrong.

### Your service doesn't appear

Check that the annotation names your application's language. If it does, the pods probably started before the Operator was ready. Restart the Deployment so its pods start with instrumentation:

```shell
kubectl rollout restart deployment <DEPLOYMENT_NAME> -n <NAMESPACE>
```

For more help, see [OpenTelemetry Troubleshooting][16].

## Change your configuration

The installer installs the [OpenTelemetry Kube Stack][7] Helm chart with its own values files. To change the configuration, put your changes in a values file. Then, in the installer's folder and with the variables from step 2 set, run the installer again with your file:

```shell
./install my-values.yaml
```

The installer applies your file on top of its own values files. For what you can set, see the [installer's README][24].

## Next steps

- **Instrument more services**: Annotate their Deployments as in [step 4](#4-instrument-your-application). To add custom spans and metrics, see [Instrument Your Applications][8].
- **Tag your data**: Learn how Datadog uses `service.name`, `deployment.environment.name`, and `service.version` in [Unified service tagging][18].
- **Manage the Collector yourself (optional)**: To install and manage the Collector with your own Helm or Operator configuration instead of the installer, see [Install the DDOT Collector on Kubernetes][19] or [Set up the upstream OpenTelemetry Collector][20].

## Uninstall

<div class="alert alert-warning">The uninstall script deletes the <code>opentelemetry-operator-system</code>, <code>cert-manager</code>, and <code>datadog</code> namespaces. It also deletes the custom resource definitions for cert-manager, the OpenTelemetry Operator, and the Datadog Operator. That removes every matching resource in the cluster, including resources that other tools created, such as a Datadog Agent you installed separately.</div>

1. Remove the annotation from your Deployment. Its pods restart without instrumentation:

   ```shell
   kubectl patch deployment <DEPLOYMENT_NAME> -n <NAMESPACE> --type json -p '[{"op":"remove","path":"/spec/template/metadata/annotations/instrumentation.opentelemetry.io~1inject-<LANGUAGE>"}]'
   ```

2. In the installer's folder, run the uninstall script, and type `yes` when it asks:

   ```shell
   ./uninstall
   ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[4]: https://helm.sh/docs/intro/install/
[5]: /account_management/api-app-keys/#api-keys
[6]: /getting_started/site/
[7]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[8]: /opentelemetry/instrument/
[9]: https://app.datadoghq.com/software
[10]: https://app.datadoghq.com/apm/traces
[15]: https://app.datadoghq.com/logs
[16]: /opentelemetry/troubleshooting/
[17]: /opentelemetry/setup/
[18]: /opentelemetry/correlate/#prerequisite-unified-service-tagging
[19]: /opentelemetry/setup/ddot_collector/kubernetes/
[20]: /opentelemetry/setup/collector_exporter/?tab=kubernetes
[24]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack#readme
[25]: /opentelemetry/#choose-a-setup
[28]: /opentelemetry/instrument/dd_sdks/ddot_setup/#before-switching-from-an-opentelemetry-sdk

