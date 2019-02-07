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
kubectl get pods -n kube-system
```

## Installing the Datadog Helm chart

To install the chart with the release name `<RELEASE_NAME>`, retrieve your Datadog API key from your [Agent installation instructions][4] and run:

```bash
helm install --name <RELEASE_NAME> --set datadog.apiKey=<DATADOG_API_KEY> stable/datadog
```

Refer to the section below for a list of configurable parameters.

This chart adds the Datadog Agent to all nodes in your cluster via a DaemonSet. It also optionally depends on the [kube-state-metrics chart][5]. A few minutes after installation, Datadog begins to report hosts and metrics.

### Configuration

The following table lists the configurable parameters of the Datadog chart and their default values.

| Parameter                                | Description                                                                               | Default                                     |
| -----------------------------            | ------------------------------------                                                      | ------------------------------------------- |
| `datadog.apiKey`                         | Your Datadog API key                                                                      | `Nil` You must provide your own key         |
| `datadog.apiKeyExistingSecret`           | If set, use the secret with a provided name instead of creating a new one                 | `nil`                                       |
| `datadog.appKey`                         | Datadog APP key required to use metricsProvider                                           | `Nil` You must provide your own key         |
| `datadog.appKeyExistingSecret`           | If set, use the secret with a provided name instead of creating a new one                 | `nil`                                       |
| `image.repository`                       | The image repository to pull from                                                         | `datadog/agent`                             |
| `image.tag`                              | The image tag to pull                                                                     | `6.9.0`                                     |
| `image.pullPolicy`                       | Image pull policy                                                                         | `IfNotPresent`                              |
| `image.pullSecrets`                      | Image pull secrets                                                                        | `nil`                                       |
| `rbac.create`                            | If true, create & use RBAC resources                                                      | `true`                                      |
| `rbac.serviceAccount`                    | existing ServiceAccount to use (ignored if rbac.create=true)                              | `default`                                   |
| `datadog.name`                           | Container name if Daemonset or Deployment                                                 | `datadog`                                   |
| `datadog.site`                           | Site (`datadoghq.com` or `datadoghq.eu`)                                                  | `nil`                                       |
| `datadog.dd_url`                         | Datadog intake server                                                                     | `nil`                                       |
| `datadog.env`                            | Additional Datadog environment variables                                                  | `nil`                                       |
| `datadog.logsEnabled`                    | Enable log collection                                                                     | `nil`                                       |
| `datadog.logsConfigContainerCollectAll`  | Collect logs from all containers                                                          | `nil`                                       |
| `datadog.logsPointerHostPath`            | Host path to store the log tailing state in                                               | `/var/lib/datadog-agent/logs`               |
| `datadog.apmEnabled`                     | Enable tracing from the host                                                              | `nil`                                       |
| `datadog.processAgentEnabled`            | Enable live process monitoring                                                            | `nil`                                       |
| `datadog.checksd`                        | Additional custom checks as python code                                                   | `nil`                                       |
| `datadog.confd`                          | Additional check configurations (static and Autodiscovery)                                | `nil`                                       |
| `datadog.criSocketPath`                  | Path to the container runtime socket (if different from Docker)                           | `nil`                                       |
| `datadog.tags`                           | Set host tags                                                                             | `nil`                                       |
| `datadog.nonLocalTraffic`                | Enable statsd reporting from any external ip                                              | `False`                                     |
| `datadog.useCriSocketVolume`             | Enable mounting the container runtime socket in Agent containers                          | `True`                                      |
| `datadog.volumes`                        | Additional volumes for the daemonset or deployment                                        | `nil`                                       |
| `datadog.volumeMounts`                   | Additional volumeMounts for the daemonset or deployment                                   | `nil`                                       |
| `datadog.podAnnotationsAsTags`           | Kubernetes Annotations to Datadog Tags mapping                                            | `nil`                                       |
| `datadog.podLabelsAsTags`                | Kubernetes Labels to Datadog Tags mapping                                                 | `nil`                                       |
| `datadog.resources.requests.cpu`         | CPU resource requests                                                                     | `200m`                                      |
| `datadog.resources.limits.cpu`           | CPU resource limits                                                                       | `200m`                                      |
| `datadog.resources.requests.memory`      | Memory resource requests                                                                  | `256Mi`                                     |
| `datadog.resources.limits.memory`        | Memory resource limits                                                                    | `256Mi`                                     |
| `datadog.securityContext`                | Allows you to overwrite the default securityContext applied to the container              | `nil`                                       |
| `datadog.livenessProbe`                  | Overrides the default liveness probe                                                      | http port 5555                              |
| `datadog.hostname`                       | Set the hostname (write it in datadog.conf)                                               | `nil`                                       |
| `datadog.acInclude`                      | Include containers based on image name                                                    | `nil`                                       |
| `datadog.acExclude`                      | Exclude containers based on image name                                                    | `nil`                                       |
| `daemonset.podAnnotations`               | Annotations to add to the DaemonSet's Pods                                                | `nil`                                       |
| `daemonset.tolerations`                  | List of node taints to tolerate (requires Kubernetes >= 1.6)                              | `nil`                                       |
| `daemonset.nodeSelector`                 | Node selectors                                                                            | `nil`                                       |
| `daemonset.affinity`                     | Node affinities                                                                           | `nil`                                       |
| `daemonset.useHostNetwork`               | If true, use the host's network                                                           | `nil`                                       |
| `daemonset.useHostPID`.                  | If true, use the host's PID namespace                                                     | `nil`                                       |
| `daemonset.useHostPort`                  | If true, use the same ports for both host and container                                   | `nil`                                       |
| `daemonset.priorityClassName`            | Which Priority Class to associate with the daemonset                                      | `nil`                                       |
| `datadog.leaderElection`                 | Enable the leader Election feature                                                        | `false`                                     |
| `datadog.leaderLeaseDuration`            | The duration for which a leader stays elected.                                            | `nil`                                       |
| `datadog.collectEvents`                  | Enable Kubernetes event collection. Requires leader election.                             | `false`                                     |
| `deployment.affinity`                    | Node / Pod affinities                                                                     | `{}`                                        |
| `deployment.tolerations`                 | List of node taints to tolerate                                                           | `[]`                                        |
| `deployment.priorityClassName`           | Which Priority Class to associate with the deployment                                     | `nil`                                       |
| `kubeStateMetrics.enabled`               | If true, create kube-state-metrics                                                        | `true`                                      |
| `kube-state-metrics.rbac.create`         | If true, create & use RBAC resources for kube-state-metrics                               | `true`                                      |
| `kube-state-metrics.rbac.serviceAccount` | existing ServiceAccount to use (ignored if rbac.create=true) for kube-state-metrics       | `default`                                   |
| `clusterAgent.enabled`                   | Use the cluster-agent for cluster metrics (Kubernetes 1.10+ only)                         | `false`                                     |
| `clusterAgent.token`                     | A cluster-internal secret for agent-to-agent communication. Must be 32+ characters a-zA-Z | Generates a random value                    |
| `clusterAgent.containerName`             | The container name for the Cluster Agent                                                  | `cluster-agent`                             |
| `clusterAgent.image.repository`          | The image repository for the cluster-agent                                                | `datadog/cluster-agent`                     |
| `clusterAgent.image.tag`                 | The image tag to pull                                                                     | `1.0.0`                                     |
| `clusterAgent.image.pullPolicy`          | Image pull policy                                                                         | `IfNotPresent`                              |
| `clusterAgent.image.pullSecrets`         | Image pull secrets                                                                        | `nil`                                       |
| `clusterAgent.metricsProvider.enabled`   | Enable Datadog metrics as a source for HPA scaling                                        | `false`                                     |
| `clusterAgent.resources.requests.cpu`    | CPU resource requests                                                                     | `200m`                                      |
| `clusterAgent.resources.limits.cpu`      | CPU resource limits                                                                       | `200m`                                      |
| `clusterAgent.resources.requests.memory` | Memory resource requests                                                                  | `256Mi`                                     |
| `clusterAgent.resources.limits.memory`   | Memory resource limits                                                                    | `256Mi`                                     |
| `clusterAgent.tolerations`               | List of node taints to tolerate                                                           | `[]`                                        |
| `clusterAgent.livenessProbe`             | Overrides the default liveness probe                                                      | http port 443 if external metrics enabled   |
| `clusterAgent.readinessProbe`            | Overrides the default readiness probe                                                     | http port 443 if external metrics enabled   |

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

You can copy and customize the default [values.yaml][6].

## Enabling integrations with Helm

The Datadog [entrypoint][7] copies files with a `.yaml` extension found in `/conf.d` and files with `.py` extension in `/check.d` to `/etc/datadog-agent/conf.d` and `/etc/datadog-agent/checks.d` respectively. The keys for `datadog.confd` and `datadog.checksd` should mirror the content found in their respective ConfigMaps, i.e.:

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
    redisdb.yaml: |-
      init_config:
      instances:
        - host: "outside-k8s.example.com"
          port: 6379
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
[4]: https://app.datadoghq.com/account/settings#agent/kubernetes
[5]: https://github.com/helm/charts/tree/master/stable/kube-state-metrics
[6]: https://github.com/helm/charts/blob/master/stable/datadog/values.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/entrypoint/89-copy-customfiles.sh
