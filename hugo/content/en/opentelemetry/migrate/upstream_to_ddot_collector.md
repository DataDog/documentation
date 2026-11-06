---
title: Migrate to the DDOT Collector
description: Switch an upstream OpenTelemetry Collector on Kubernetes to the DDOT Collector by changing its container image, and switch back the same way.
further_reading:
- link: "/opentelemetry/setup/ddot_collector/"
  tag: "Documentation"
  text: "DDOT Collector"
- link: "/opentelemetry/setup/ddot_collector/kubernetes/"
  tag: "Documentation"
  text: "Install the DDOT Collector on Kubernetes"
---

## Overview

Switch an upstream OpenTelemetry Collector on Kubernetes to the [DDOT Collector][1] by changing its container image. You keep your pipeline configuration. To switch back, restore the original image.

To set up a new Collector instead, see [Install the DDOT Collector on Kubernetes][2]. To run your pipeline alongside the Datadog Agent, see [Migrate to the Agent's Collector][3].

## Before you switch

1. Check that the DDOT Collector includes every component your configuration uses. Compare the receivers, processors, exporters, connectors, and extensions in your configuration with the [included components][4]. If your configuration uses a component that the DDOT Collector doesn't include, the Collector doesn't start.
1. Store your Datadog API key in a Kubernetes secret, as described in [Store your Datadog API key][5]. The DDOT Collector sends data about itself and its host to Datadog, so it needs the API key even if your pipelines don't use the Datadog Exporter.
1. Add these variables to the Collector's `env` list. You don't need to change your pipeline configuration:

   ```yaml
   - name: DD_API_KEY
     valueFrom:
       secretKeyRef:
         name: datadog-secret
         key: api-key
   - name: DD_SITE
     valueFrom:
       secretKeyRef:
         name: datadog-secret
         key: site
   - name: NODE_NAME
     valueFrom:
       fieldRef:
         fieldPath: spec.nodeName
   - name: DD_HOSTNAME
     value: $(NODE_NAME)-<CLUSTER_NAME>
   ```

   `DD_HOSTNAME` gives each node a consistent hostname. Without it, the Collector exits if it can't detect a hostname, such as on a node without cloud provider metadata. Keep `NODE_NAME` above `DD_HOSTNAME`, because Kubernetes expands `$(NODE_NAME)` only from variables defined earlier in the list. Replace `<CLUSTER_NAME>` with your cluster's name.

   With the kube-stack chart, leave out `NODE_NAME` and set `DD_HOSTNAME` to `$(K8S_NODE_NAME)-<CLUSTER_NAME>`. The chart defines `K8S_NODE_NAME` for you, and it reorders `env` entries, so `$(NODE_NAME)` isn't expanded.
1. Choose an image tag. Replace `<DDOT_VERSION>` in the next steps with version 7.84.4 or later. Earlier versions can fail to start when your configuration doesn't use the Datadog Exporter. For available tags, see [datadog/ddot-collector][6] on Docker Hub.

## Change the image

{{< tabs >}}
{{% tab "Operator" %}}
In your `OpenTelemetryCollector` resource, set `spec.image`. This changes only this Collector:

```yaml
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: <COLLECTOR_NAME>
spec:
  image: datadog/ddot-collector:<DDOT_VERSION>
```

Apply the change:

```shell
kubectl apply -f <COLLECTOR_FILE>
```
{{% /tab %}}
{{% tab "Helm" %}}
1. In your Collector chart values file, set `image.repository` and `image.tag`:

   ```yaml
   image:
     repository: datadog/ddot-collector
     tag: <DDOT_VERSION>
   ```

1. If your values file sets `command.name`, remove it. The DDOT Collector image doesn't include the upstream binaries, such as `otelcol-contrib`.
1. Find your release name and chart version. The `CHART` column shows the version, such as `opentelemetry-collector-0.177.0`:

   ```shell
   helm list
   ```

1. Upgrade the release. Set `--version` to the chart version you already run, so the upgrade changes only the image:

   ```shell
   helm upgrade <RELEASE_NAME> open-telemetry/opentelemetry-collector \
     --version <CHART_VERSION> -f <VALUES_FILE>
   ```
{{% /tab %}}
{{% tab "Kube-stack" %}}
1. In your `opentelemetry-kube-stack` values file, set the Operator's default Collector image:

   ```yaml
   opentelemetry-operator:
     manager:
       collectorImage:
         repository: datadog/ddot-collector
         tag: <DDOT_VERSION>
   ```

   This image applies to every Collector in the release that doesn't set its own `image`.

1. Find your release name and chart version. The `CHART` column shows the version:

   ```shell
   helm list
   ```

1. Upgrade the release. Set `--version` to the chart version you already run, so the upgrade changes only the image:

   ```shell
   helm upgrade <RELEASE_NAME> open-telemetry/opentelemetry-kube-stack \
     --version <CHART_VERSION> -f <VALUES_FILE>
   ```

The Operator restarts, then updates each Collector. This can take a minute.
{{% /tab %}}
{{< /tabs >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">For FED, use the tag <code>&lt;DDOT_VERSION&gt;-fips</code> for the FIPS-compliant DDOT image. See <a href="/agent/configuration/fips-compliance/">FIPS compliance</a>.</div>
{{% /site-region %}}

## Check the switch

1. Wait for the new pods to run. Replace `<DAEMONSET_NAME>` with the name of your Collector's DaemonSet:
   - Operator: `<COLLECTOR_NAME>-collector`
   - Collector Helm chart: `<RELEASE_NAME>-opentelemetry-collector-agent`
   - Kube-stack: `<RELEASE_NAME>-<COLLECTOR_NAME>-collector`

   ```shell
   kubectl rollout status daemonset/<DAEMONSET_NAME> --timeout=5m
   ```

1. Check that the pods run the DDOT Collector image:

   ```shell
   kubectl get daemonset <DAEMONSET_NAME> -o jsonpath='{.spec.template.spec.containers[0].image}'
   ```

1. Check that your data reaches Datadog, as described in [Verify the setup][7]. If the pods don't start, see [Troubleshooting](#troubleshooting).

## Switch back

Restore the image you used before, and apply the change the same way: with `kubectl apply` for the Operator, or `helm upgrade` for a Helm chart. For the Operator, you can also remove `spec.image` to use the Operator's default image. If you removed `command.name` from Collector chart values, restore it.

The variables you added for the DDOT Collector, such as `DD_HOSTNAME`, can stay. The upstream Collector ignores them.

## Troubleshooting

Check the Collector's logs for these errors:

```shell
kubectl logs daemonset/<DAEMONSET_NAME>
```

`'receivers' unknown type: "<NAME>"`
: Your configuration uses a component that the DDOT Collector doesn't include. The error names the component type, such as `receivers` or `exporters`. Remove the component, or switch back.

`panic: config was not properly validated`
: The Collector can't find its API key. Check that `DD_API_KEY` is set from your secret, and that the secret is in the Collector's namespace.

`unable to reliably determine the host name`
: Set `DD_HOSTNAME`, as described in [Before you switch](#before-you-switch). If `DD_HOSTNAME` is set but the error continues, check that its value doesn't contain an unexpanded `$(NODE_NAME)`.

`exec: "/otelcol-contrib": stat /otelcol-contrib: no such file or directory`
: Your Collector chart values set `command.name`. Remove it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /opentelemetry/setup/ddot_collector/
[2]: /opentelemetry/setup/ddot_collector/kubernetes/
[3]: /opentelemetry/migrate/ddot_collector/
[4]: /opentelemetry/setup/ddot_collector/#opentelemetry-collector-components
[5]: /opentelemetry/setup/ddot_collector/kubernetes/#store-your-datadog-api-key
[6]: https://hub.docker.com/r/datadog/ddot-collector/tags
[7]: /opentelemetry/setup/ddot_collector/kubernetes/#verify-the-setup
