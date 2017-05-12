---
title: Datadog-Kubernetes Integration
integration_title: Kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
updated_for_agent: 5.8.5
---
# Overview

![Kubernetes Dashboard](/static/images/k8sdashboard.png)

Get metrics from your Kubelets in real time to:

* Visualize your Kubernetes cluster performance
* Collect performances metrics for your containers, pods, container namespaces
* Create monitors on the status of your Kubelets
* Ingest Kubernetes labels as tags in Datadog.

# Installation

The Kubernetes integration is deployed as a docker container along side your existing workloads.

## Installation via DaemonSets (Kubernetes >=1.1.0)

If you are running Kubernetes >= 1.2.0, you can take advantage of DaemonSets to automatically deploy the Datadog Agent on all your nodes. On clusters running 1.1.x you will need to explicitly [enable the DaemonSets extension](http://kubernetes.io/v1.1/docs/admin/daemons.html#caveats).

1. Download the [dd-agent.yaml](https://app.datadoghq.com/account/settings#agent/kubernetes) manifest file.
1. Launch dd-agent:

    kubectl create -f dd-agent.yaml

## Manual Installation

If DaemonSets are not an option for your Kubernetes cluster, you will need to install the Datadog agent as a sidecar container on each Kubernetes node.

    docker run -d --name dd-agent -h `hostname` \
      -v /var/run/docker.sock:/var/run/docker.sock \
      -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY='YOUR_API_KEY_HERE' -e KUBERNETES=yes datadog/docker-dd-agent:latest

# Configuration

Configure the agent by editing the kubernetes.yaml file in conf.d:

    init_config:

    instances:
      # The kubernetes check retrieves metrics from cadvisor running under kubelet.
      # By default we will assume we're running under docker and will use the address
      # of the default router to reach the cadvisor api.
      #
      # To override, e.g. in the case of a standalone cadvisor instance, use the following:
      #
      # host: localhost
      # port: 4194
      # method: http
      - port: 4194

      # use_histogram controls whether we send detailed metrics, i.e. one per container.
      # When false, we send detailed metrics corresponding to individual containers, tagging by container id
      # to keep them unique.
      # When true, we aggregate data based on container image.
      # Defaults to false

      # use_histogram: True
      #
      # kubelet_port: 10255
      #
      # We can define a whitelist of patterns that permit publishing raw metrics.
      # enabled_rates:
      #   - cpu.*
      #   - network.*
      #
      # enabled_gauges:
      #   - filesystem.*
      #
      # Custom tags that should be applied to kubernetes metrics
      # tags:
      #  - optional_tag1
      #  - optional_tag2
{:.language-yaml}

Since the agent is deployed as a docker container, refer to the Agent [container documentation](https://github.com/DataDog/docker-dd-agent).

<%= insert_example_links%>

## Kubernetes State Metrics

If you are running Kubernetes >= 1.2.0, you can use the [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) project to provide additional metrics (identified by the `kubernetes_state` prefix in the metrics list below) to Datadog.

To run kube-state-metrics, create a `kube-state-metrics.yaml` file using the following manifest to deploy the kube-state-metrics service:

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
            image: gcr.io/google_containers/kube-state-metrics:v0.3.0
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
{:.language-yaml}

Then deploy it by running:

    kubectl create -f kube-state-metrics.yaml

The manifest above uses Google's publicly available kube-state-metrics container. If you would like to build your own, you can do so by:

1. Clone the [kube-state-metrics Github repository](https://github.com/kubernetes/kube-state-metrics)
1. Run `make container` to build the container
1. Run `kubectl apply -f kubernetes`

If you configure your Kubernetes State Metrics service to run on a different URL or port, you can configure the Datadog Agent by setting the `kube_state_url` parameter in `conf.d/kubernetes_state.yaml`, then restarting the agent. For more information, see the [kubernetes_state.yaml.example file](https://github.com/DataDog/integrations-core/blob/master/kubernetes_state/conf.yaml.example). If you have enabled [Autodiscovery](/guides/autodiscovery/), the kube state URL will be configured and managed automatically.

# Validation

To verify the Datadog agent is running in your environment as a daemonset, execute:

    kubectl get daemonset

If the agent is deployed you will see similar output to the text below, where desired and current are equal to the number of running nodes in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

# Limitations

Please be aware that Kubernetes relies on Heapster to report metrics, rather than the cgroup file directly. The collection interval for Heapster is unknown which can lead to innacurate time-related data, such as CPU usage. If you require more precise metrics, we recommend using the [Datadog-Docker Integration](/integrations/docker/).

Additionally please note that Heapster must be running in [standalone mode](https://github.com/kubernetes/heapster/tree/master/deploy/kube-config/standalone).

# Metrics

<%= get_metrics_from_git()%>
