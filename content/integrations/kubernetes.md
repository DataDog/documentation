---
title: Datadog-Kubernetes Integration
integration_title: Kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 5.8.5
description: "Monitor the health of your Kubernetes cluster and the applications running on it. Capture Pod scheduling events, track the status of your Kubelets, and more."
is_public: true
aliases:
    - /tracing/api/
    - /integrations/kubernetes_state/
---

{{< img src="integrations/kubernetes/k8sdashboard.png" alt="Kubernetes Dashboard" responsive="true" popup="true">}}

## Overview

Get metrics from kubernetes service in real time to:

* Visualize and monitor kubernetes states
* Be notified about kubernetes failovers and events.

For Kubernetes, it’s recommended to run the [Agent in a DaemonSet](https://github.com/DataDog/docker-dd-agent). We have created a [Docker image](https://hub.docker.com/r/datadog/docker-dd-agent/) with both the Docker and the Kubernetes integrations enabled.

You can also just [run the Datadog Agent on your host](/#host-setup) and configure it to gather your Kubernetes metrics.

## Setup Kubernetes
### Installation
#### Container Installation

Thanks to Kubernetes, you can take advantage of DaemonSets to automatically deploy the Datadog Agent on all your nodes (or on specific nodes by using nodeSelectors).

*If DaemonSets are not an option for your Kubernetes cluster, [install the Datadog agent](https://docs.datadoghq.com/integrations/docker_daemon/) as a sidecar container on each Kubernetes node.*

If your Kubernetes has RBAC enabled, see the [documentation on how to configure RBAC permissions with your Datadog-Kubernetes integration](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration).

* Create the following `dd-agent.yaml` manifest:

```yaml

apiVersion: extensions/v1beta1
kind: DaemonSet
metadata:
  name: dd-agent
spec:
  template:
    metadata:
      labels:
        app: dd-agent
      name: dd-agent
    spec:
      containers:
      - image: datadog/docker-dd-agent:latest
        imagePullPolicy: Always
        name: dd-agent
        ports:
          - containerPort: 8125
            name: dogstatsdport
            protocol: UDP
        env:
          - name: API_KEY
            value: "YOUR_API_KEY"
          - name: KUBERNETES
            value: "yes"
        volumeMounts:
          - name: dockersocket
            mountPath: /var/run/docker.sock
          - name: procdir
            mountPath: /host/proc
            readOnly: true
          - name: cgroups
            mountPath: /host/sys/fs/cgroup
            readOnly: true
      volumes:
        - hostPath:
            path: /var/run/docker.sock
          name: dockersocket
        - hostPath:
            path: /proc
          name: procdir
        - hostPath:
            path: /sys/fs/cgroup
          name: cgroups
```

Replace `YOUR_API_KEY` with [your api key](https://app.datadoghq.com/account/settings#api) or use [Kubernetes secrets](https://kubernetes.io/docs/concepts/configuration/secret/) to set your API key [as an environement variable](https://kubernetes.io/docs/concepts/configuration/secret/#using-secrets-as-environment-variables).

* Deploy the DaemonSet with the command:
  ```
  kubectl create -f dd-agent.yaml
  ```

**Note**:  This manifest enables autodiscovery's auto configuration feature. To disable it, remove the `SD_BACKEND` environment variable definition. To learn how to configure autodiscovery, please refer to [its documentation](https://docs.datadoghq.com/agent/autodiscovery).

#### Host Installation

Install the `dd-check-kubernetes` package manually or with your favorite configuration manager.

### Configuration

Edit the `kubernetes.yaml` file to point to your server and port, set the masters to monitor:

```yaml

instances:
    host: localhost
    port: 4194
    method: http
```

See the [example kubernetes.yaml](https://github.com/DataDog/integrations-core/blob/master/kubernetes/conf.yaml.example) for all available configuration options.

### Validation
#### Container Running

To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see output similar to the text below, where desired and current are equal to the number of nodes running in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

#### Agent check running

[Run the Agent's `info` subcommand](/agent/faq/agent-status-and-information) and look for `kubernetes` under the Checks section:

    Checks
    ======

        kubernetes
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks


## Setup Kubernetes State
### Installation
#### Container Installation

If you are running Kubernetes >= 1.2.0, you can use the [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) project to provide additional metrics (identified by the `kubernetes_state` prefix in the metrics list below) to Datadog.

To run kube-state-metrics, create a `kube-state-metrics.yaml` file using the following manifest to deploy the kube-state-metrics service:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: kube-state-metrics
spec:
  replicas: 1
  template:
    metadata:
      labels:
        app: kube-state-metrics
    spec:
      containers:
      - name: kube-state-metrics
        image: gcr.io/google_containers/kube-state-metrics:v1.1.0
        ports:
        - name: metrics
          containerPort: 8080
        resources:
          requests:
            memory: 30Mi
            cpu: 100m
          limits:
            memory: 50Mi
            cpu: 200m
---
apiVersion: v1
kind: Service
metadata:
  annotations:
    prometheus.io/scrape: 'true'
  labels:
    app: kube-state-metrics
  name: kube-state-metrics
spec:
  ports:
  - name: metrics
    port: 8080
    targetPort: metrics
    protocol: TCP
  selector:
    app: kube-state-metrics
```

Then deploy it by running:
```
kubectl create -f kube-state-metrics.yaml
```

The manifest above uses Google’s publicly available `kube-state-metrics` container, it’s also available on https://quay.io/coreos/kube-state-metrics, If you want to build it manually please refer [to the official project documentation](https://github.com/kubernetes/kube-state-metrics).

If you configure your Kubernetes State Metrics service to run on a different URL or port, you can configure the Datadog Agent by setting the `kube_state_url` parameter in `conf.d/kubernetes_state.yaml`, then restarting the Agent.
For more information, see the [kubernetes_state.yaml.example file](https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/conf.yaml.example). If you have enabled [Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery), the kube state URL will be configured and managed automatically.

#### Host Installation

Install the `dd-check-kubernetes_state` package manually or with your favorite configuration manager (On CentOS/AWS, [Find your rpm package here](https://yum.datadoghq.com/rpm/x86_64/), and information on installation on [this page](/agent/faq/how-do-i-install-the-agent-on-a-server-with-limited-internet-connectivity).  
Then edit the `kubernetes_state.yaml` file to point to your server and port and set the masters to monitor. See the [example kubernetes_state.yaml](https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/conf.yaml.example) for all available configuration options.

### Validation
#### Container validation
To verify the Datadog Agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the Agent is deployed you will see similar output to the text below, where desired and current are equal to the number of running nodes in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

#### Agent check validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `kubernetes_state` under the Checks section:

    Checks
    ======

        kubernetes_state
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks


## Setup Kubernetes DNS
### Installation

Install the `dd-check-kube_dns` package manually or with your favorite configuration manager.

### Configuration

Edit the `kube_dns.yaml` file to point to your server and port, set the masters to monitor. See the [sample kube_dns.yaml](https://github.com/DataDog/integrations-core/blob/master/kube_dns/conf.yaml.example) for all available configuration options.

#### Using with service discovery

If you are using one dd-agent pod per kubernetes worker node, you could use the following annotations on your kube-dns pod to retrieve the data automatically.

```yaml

apiVersion: v1
kind: Pod
metadata:
  annotations:
    service-discovery.datadoghq.com/kubedns.check_names: '["kube_dns"]'
    service-discovery.datadoghq.com/kubedns.init_configs: '[{}]'
    service-discovery.datadoghq.com/kubedns.instances: '[[{"prometheus_endpoint":"http://%%host%%:10055/metrics", "tags":["dns-pod:%%host%%"]}]]'
```

**Remarks:**

 - Notice the "dns-pod" tag will keep track of the target DNS pod IP. The other tags will be related to the dd-agent that is polling the informations using the service discovery.
 - The service discovery annotations need to be applied to the pod. In case of a deployment, add the annotations to the metadata of the template's spec.


### Validation

[Run the Agent's `info` subcommand](https://help.datadoghq.com/hc/en-us/articles/203764635-Agent-Status-and-Information) and look for `kube_dns` under the Checks section:

    Checks
    ======

        kube_dns
        -----------
          - instance #0 [OK]
          - Collected 39 metrics, 0 events & 7 service checks

## Data Collected
### Metrics
#### Kubernetes
{{< get-metrics-from-git "kubernetes" >}}

#### Kubernetes State
{{< get-metrics-from-git "kubernetes_state" >}}

#### Kubernetes DNS
{{< get-metrics-from-git "kube_dns" >}}

### Events

As the 5.17.0 release, Datadog Agent now supports built in [leader election option](/integrations/faq/gathering-kubernetes-events) for the Kubernetes event collector. Once enabled, you no longer need to deploy an additional event collection container to your cluster. Instead, Agents will coordinate to ensure only one Agent instance is gathering events at a given time, events below will be available:

* Backoff
* Conflict
* Delete
* DeletingAllPods
* Didn't have enough resource
* Error
* Failed
* FailedCreate
* FailedDelete
* FailedMount
* FailedSync
* Failedvalidation
* FreeDiskSpaceFailed
* HostPortConflict
* InsufficientFreeCPU
* InsufficientFreeMemory
* InvalidDiskCapacity
* Killing
* KubeletsetupFailed
* NodeNotReady
* NodeoutofDisk
* OutofDisk
* Rebooted
* TerminatedAllPods
* Unable
* Unhealthy

### Service Checks
The Kubernetes check does not include any service check at this time.

## Troubleshooting

* [Can I install the Agent on my Kubernetes master node(s)](/integrations/faq/can-i-install-the-agent-on-my-kubernetes-master-node-s)
* [Why is the Kubernetes check failing with a ConnectTimeout error to port 10250?](/integrations/faq/why-is-the-kubernetes-check-failing-with-a-connecttimeout-error-to-port-10250)
* [How to get more out of your Kubernetes integration?](/agent/faq/how-to-get-more-out-of-your-kubernetes-integration)
* [How to report host disk metrics when dd-agent runs in a docker container?](/agent/faq/how-to-report-host-disk-metrics-when-dd-agent-runs-in-a-docker-container)
* [Client Authentication against the apiserver and kubelet](/integrations/faq/client-authentication-against-the-apiserver-and-kubelet)
* [Gathering Kubernetes events](/integrations/faq/gathering-kubernetes-events)
* [Using RBAC permission with your Kubernetes integration](/integrations/faq/using-rbac-permission-with-your-kubernetes-integration)

## Further Reading
To get a better idea of how (or why) to integrate your Kubernetes service, check out our [series of blog posts](https://www.datadoghq.com/blog/monitoring-kubernetes-era/) about it.
