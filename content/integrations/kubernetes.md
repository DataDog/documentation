---
title: Datadog-Kubernetes Integration
integration_title: Kubernetes
kind: integration
git_integration_title: kubernetes
newhlevel: true
---

# Overview

Get metrics from your Kubelets in real time to:

* Vizualize your Kubernetes cluster performance
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

    docker run -d --name dd-agent -h `hostname` -v /var/run/docker.sock:/var/run/docker.sock -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e API_KEY='YOUR_API_KEY_HERE' datadog/docker-dd-agent:kubernetes

# Configuration

If you would like to customize your Agent configuration, please refer to the Agent [container documentation](https://github.com/DataDog/docker-dd-agent).

<%= insert_example_links%>

# Validation

To verify the Datadog agent is running in your environment as a daemonset, execeute:

    $ kubectl get daemonset

If the agent is deployed you will see similar output to the text below, where desired and current are equal to the number of running nodes in your cluster.

    NAME       DESIRED   CURRENT   NODE-SELECTOR   AGE
    dd-agent   3         3         <none>          11h

# Limitations

Please be aware that Kubernetes relies on Heapster to report metrics, rather than the cgroup file directly. The collection interval for Heapster is unknown which can lead to innacurate time-related data, such as CPU usage. If you require more precise metrics, we recommend using the [Datadog-Docker Integration](/integrations/docker/).

# Metrics

<%= get_metrics_from_git()%>
