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

### Installing the Helm server (Tiller)

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

To install the chart with the release name `<RELEASE_NAME>`, retrieve your Datadog API key from your [Agent installation instructions][4] and run:

```bash
helm install --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
```

Refer to the section below for a list of configurable parameters.

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally deploys the [kube-state-metrics chart][5] and uses it as an additional source of metrics about the cluster. A few minutes after installation, Datadog begins to report hosts and metrics.

### Configuration

For a full list of the Datadog chart's configurable parameters and their default values, refer to the [Datadog Helm repository readme][6].

Specify each parameter using the `--set key=value[,key=value]` argument to `helm install`. For example:

```bash
helm install --name <RELEASE_NAME> \
  --set datadog.apiKey=<DATADOG_API_KEY>,datadog.logLevel=DEBUG \
  stable/datadog
```

Alternatively, a YAML file that specifies the values for the parameters can be provided while installing the chart. For example:

```bash
helm install --name <RELEASE_NAME> -f my-values.yaml stable/datadog
```

You can copy and customize the default [values.yaml][7].

## Upgrading the chart

Use the `helm upgrade` command to upgrade to a new version of the chart, or to change the configuration of your release. 

```bash
helm upgrade -f my-values.yaml <RELEASE_NAME> stable/datadog --recreate-pods
```

## Enabling integrations with Helm

The Datadog [entrypoint][8] copies files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in `/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively. The keys for `datadog.confd` and `datadog.checksd` should mirror the content found in their respective ConfigMaps, i.e.:

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
[8]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh
