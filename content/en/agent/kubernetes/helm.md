---
title: Deploying Datadog in Kubernetes using Helm
kind: documentation
further_reading:
- link: "agent/kubernetes/daemonset_setup"
  tag: "documentation"
  text: "Kubernetes DaemonSet Setup"
- link: "agent/kubernetes/host_setup"
  tag: "documentation"
  text: "Kubernetes Host Setup"
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

Helm is a package management tool for Kubernetes.

## Installing Helm

### Installing the Helm client

{{< tabs >}}
{{% tab "macOS (Homebrew)" %}}

```bash
brew install kubernetes-helm
```

{{% /tab %}}
{{% tab "Linux (Snap)" %}}

```bash
sudo snap install helm --classic
```

{{% /tab %}}
{{% tab "Windows (Chocolatey)" %}}

```bash
choco install kubernetes-helm
```

{{% /tab %}}
{{< /tabs >}}

For other platforms and methods of installing Helm, refer to the [Helm documentation][1].

### Verify installation

To verify your installation, run:

```bash
kubectl get pods -n kube-system -l app=helm
```

This returns something resembling:

```bash
NAME READY STATUS RESTARTS AGE
tiller-deploy-f54b67464-jl5gm 1/1 Running 0 3h16m
```

## Installing the Datadog Helm chart

**Note** We recommend using Helm 3.0 or greater. If you're using a lower version, you may need to install the Helm Server, [Tiller][11].

To install the chart with the release name `<RELEASE_NAME>`, retrieve your Datadog API key from your [Agent installation instructions][4] and run:

{{< tabs >}}
{{% tab "Helm v3+" %}}
```bash
helm install <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY>,datadog.admissionController=true,datadog.apm.enabled=true,datadog.statsd.enabled=true stable/datadog 
```
{{% /tab %}}

{{% tab "Helm v1/v2" %}}
```bash
helm install --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY>,datadog.admissionController=true,datadog.apm.enabled=true,datadog.statsd.enabled=true stable/datadog
```
{{% /tab %}}
{{< /tabs >}}

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally deploys the [kube-state-metrics chart][5] and uses it as an additional source of metrics about the cluster. A few minutes after installation, Datadog begins to report hosts and metrics.

The default install command will enable [APM][12] and [DogStatsD Custom Metrics][13]. To disable one of the services, set the service values to false. The values can always be changed in the future by configuring the Helm chart (see next section).

Additionally, the default configuration takes advantage of Kuberentes admission controller. If this flag is disabled, downward API must be set to each instrumented app.


**Note**: For a full list of the Datadog chart's configurable parameters and their default values, refer to the [Datadog Helm repository README][6].

## Configuring the Datadog Helm chart

As a best practice, a YAML file that specifies the values for the chart parameters should be provided to configure the chart:

1.  **Copy the default [`datadog-values.yaml`][7] value file.**
2.  Set the `apiKey` parameter with your [Datadog API key][4].
3.  Upgrade the Datadog Helm chart with the new `datadog-values.yaml` file:

```bash
helm upgrade -f datadog-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

### Enable Log Collection

Update your [datadog-values.yaml][7] file with the following log collection configuration, then upgrade your Datadog Helm chart:

```text
datadog:
  (...)
 logsEnabled: true
 logsConfigContainerCollectAll: true
```

### Enable Custom Metrics Collection

To gather custom metrics with [DogStatsD][8], update your [datadog-values.yaml][7] file to enable non-local traffic.

```text
datadog:
  (...)
  nonLocalTraffic: true
```

### Enable APM and Distributed Tracing

**Note**: If you want to deploy the Datadog Agent as a deployment instead of a DaemonSet, configuration of APM via Helm is not supported.

The APM trace agent is listening on port 8126 by default. To enable APM, initalize the tracer in your instrumented app(s); there's no need to specify a host or port as the tracers will default to the agent location, `DD_AGENT_HOST`.

Refer to the [language-specific APM instrumentation docs][9] for more information.

To disable the APM agent from running and listening on port 8126, update your [datadog-values.yaml][7] file with the following APM configuration:

```text
datadog:
  (...)
  apmEnabled: false

(...)

daemonset:
  (...)
  useHostPort: false
```
Then upgrade your Datadog Helm chart.

### Enabling Process Collection

Update your [datadog-values.yaml][7] file with the following process collection configuration, then upgrade your Datadog Helm chart:

```text
datadog:
  (...)
  processAgentEnabled: true
```

### Enabling integrations with Helm

The Datadog [entrypoint][10] copies files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in `/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively. The keys for `datadog.confd` and `datadog.checksd` should mirror the content found in their respective ConfigMaps, i.e.:

```yaml
datadog:
  confd:
    redisdb.yaml: |-
      ad_identifiers:
        - redis
        - bitnami/redis
      init_config:
      instances:
        - host: "%%host%%"
          port: "%%port%%"
    jmx.yaml: |-
      ad_identifiers:
        - openjdk
      instance_config:
      instances:
        - host: "%%host%%"
          port: "%%port_0%%"
```

### Installing the Helm server (Tiller)

**Note**: This is not required for versions of Helm greater than 3.0.0. Skip to [Installing the Datadog Helm chart](#installing-the-datadog-helm-chart) if this applies to you.

If your Kubernetes environment does not use RBAC, the following command installs Tiller in your cluster:

```bash
helm init
```

Refer to [Helm's Tiller documentation][2] for further details.

If your Kubernetes cluster is RBAC-enabled, use the following RBAC to deploy Tiller.

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
 name: tiller
 namespace: kube-system
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
 name: tiller
roleRef:
 apiGroup: rbac.authorization.k8s.io
 kind: ClusterRole
 name: cluster-admin
subjects:
 - kind: ServiceAccount
   name: tiller
   namespace: kube-system
```

With this as your `tiller-rbac-config.yaml`, then run:

```bash
kubectl create -f tiller-rbac-config.yaml

helm init --service-account tiller
```

Refer to [Helm's Tiller/RBAC documentation][3] for further details.


## Uninstalling the Datadog Helm Chart

To uninstall or delete a deployment called `<RELEASE_NAME>`:

```bash
helm delete <RELEASE_NAME>
```

This command removes all Kubernetes components associated with the chart and deletes the release.

[1]: https://docs.helm.sh/using_helm/#installing-the-helm-client
[2]: https://docs.helm.sh/using_helm/#installing-tiller
[3]: https://docs.helm.sh/using_helm/#role-based-access-control
[4]: https://app.datadoghq.com/account/settings#api
[5]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[6]: https://github.com/helm/charts/tree/master/stable/datadog#configuration
[7]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
[8]: /developers/metrics/dogstatsd_metrics_submission
[9]: /tracing/setup
[10]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh
[11]: #installing-the-helm-server-tiller
[12]: /tracing/
[13]: /agent/kubernetes/dogstatsd/
