---
title: How to get more out of your Kubernetes integration ?
kind: faq
customnav: agentnav
---

## Metrics

It is possible to collect more Kubernetes metrics. Via cAdvisor, many metrics are available for you to visualize and monitor. Our [kubernetes integration](https://github.com/DataDog/integrations-core/blob/master/kubernetes/check.py) only collects some of them but there is a way to collect other ones!

This is a quick example of how to see what is available after you have your cluster running:
```
cluster :> kubectl proxy &
[1] 13874
Starting to serve on 127.0.0.1:8001
cluster :> NODE=$(kubectl get nodes -o=jsonpath="{.items[0].metadata.name}")
cluster :> curl localhost:8001/api/v1/proxy/nodes/${NODE}:10255/stats/summary
```

This will return [the following output](https://gist.github.com/CharlyF/2d9e7741bef9398386a84fd66f4c8c7d#file-summary-json).

```
cluster :> curl localhost:8001/api/v1/proxy/nodes/${NODE}:10255/stats/
```

This will return [the following output](https://gist.github.com/CharlyF/2d9e7741bef9398386a84fd66f4c8c7d#file-stats-json).  

The last output, despite being very large is very interesting. Say you are interested in monitoring the filesystems data:
```
[...]
"inodes": 2097152,
"inodes_free": 1961006,
"reads_completed": 122114,
"reads_merged": 5356,
"sectors_read": 6773608,
[...]

The memory that is not already captured:
[...]
"cache": 61157376,
"rss": 90644480,
"swap": 0,
"working_set": 872525824,
"failcnt": 0,
[...]

And the network tcp6 information:
[...]
"Established": 0,
"SynSent": 0,
"SynRecv": 0,
"FinWait1": 0,
"FinWait2": 0,
"TimeWait": 0, 
[...]
```

Then, you can update your `kubernetes.yaml` on [these following lines](https://github.com/DataDog/integrations-core/blob/master/kubernetes/conf.yaml.example#L108-L109) with :

{{< img src="agent/faq/additional_lines.png" alt="Additional Lines" responsive="true" >}}

Quick tip, as per the original Kubernetes article, you can use the configmaps to configure your integration on the go, thus, you can use the following configmap and daemonset description.

And as you spin up the daemonset and the configmap, you can see the metrics starting to populate UI :

{{< img src="agent/faq/metric_in_ui.gif" alt="Metric UI" responsive="true" >}}

## Events

You can collect events from the Kubernetes API, by simply enabling [this option](https://github.com/DataDog/integrations-core/blob/master/kubernetes/conf.yaml.example#L78):

It is important to note that this option has to be enabled on only 1 agent across the whole cluster, to avoid duplicates.

You can also use the environment variable KUBERNETES_COLLECT_EVENTS in your Daemoset/Deployment [as follows](https://gist.github.com/CharlyF/754a5033e6ceea701c32bab5b0f19024#file-ddmaster-ds-kubernetes-events-yaml-L28-L29).

Since you have to deploy it only on one node, the best approach if you are using a Daemoset is to use the NodeSelectors.

1. Label your nodes:
```
kubectl get nodes
kubectl label no <NODE_NAME> key=value
```

2. Then add the node selector in your Daemonset/Deployment. For example, [here](https://gist.github.com/CharlyF/754a5033e6ceea701c32bab5b0f19024#file-ddmaster-ds-kubernetes-events-yaml-L57-L58) we label the node with run=mongo and by running:
```
kubectl apply -f ddmaster-ds-kubernetes-events.yaml
```

You will only deploy on the agent on one node and this agent will collect kubernetes events.

{{< img src="agent/faq/kubernetes_events.png" alt="Kubernetes Events" responsive="true" >}}