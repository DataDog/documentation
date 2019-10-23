---
title: Running Endpoints Checks with Autodiscovery
kind: documentation
further_reading:
- link: "/agent/autodiscovery"
  tag: "Documentation"
  text: "Main Autodiscovery documentation"
- link: "/agent/autodiscovery/clusterchecks/"
  tag: "Documentation"
  text: "Cluster Checks documentation"
- link: "/agent/kubernetes/cluster/"
  tag: "Documentation"
  text: "Cluster Agent documentation"
---

## How it Works

The [Cluster Check][1] feature provides the ability to autodiscover and perform checks on load-balanced cluster services (eg. Kubernetes services). The Endpoints Checks feature extends this mechanism to monitor any endpoint behind cluster services.

The [Cluster Agent][2] holds the configurations and exposes them to node-based Agents so they can consume and convert them into Endpoints Checks.

Endpoints Checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the monitored service.

The Agents connect to the Cluster Agent every 10 seconds and retrieve the check configurations to run. Metrics coming from Endpoints Checks will be submitted with service, pod, and host tags.

This feature is currently supported on Kubernetes for versions 6.12.0+ of the Agent, and versions 1.3.0+ of the Cluster Agent.

#### Example: three NGINX pods exposed by the `nginx` service
```
# kubectl get svc nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```
```
# kubectl get pods --selector app=nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-758655469f-59q9z   1/1     Running   0          20h
nginx-758655469f-k8zrc   1/1     Running   0          20h
nginx-758655469f-lk9p6   1/1     Running   0          20h
```
```
# kubectl get ep nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-758655469f-lk9p6
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-59q9z
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-758655469f-k8zrc
      ...
```
By design, Endpoints Checks are scheduled by Agents that run on the same node as the pods that back the endpoints of the `nginx` service, so only Agents running on the nodes `gke-cluster-default-pool-4658d5d4-k2sn` and `gke-cluster-default-pool-4658d5d4-p39c` will schedule the checks on the `nginx` pods.

This works like that to leverage [autodiscovery][3], and attach pod and container tags to the metrics coming from these pods.

## How to set it up

### Cluster Agent setup

This feature requires a running [Cluster Agent with the Cluster Checks feature enabled][4].

### Agent setup

Enable the `endpointschecks` configuration providers on the Datadog **Node** Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable. This takes a space separated string if you have multiple values:

```
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
```

- Or adding it to the `datadog.yaml` configuration file:

```yaml
config_providers:
  - name: endpointschecks
    polling: true
```

[Restart the Agent][5] to apply the configuration change.

**Note**: To enable both Cluster Checks and Endpoints Checks, `clusterchecks` and `endpointschecks` configuration providers should be both enabled on the Datadog **Node** Agent.

## Setting up Check Configurations via Kubernetes Service Annotations

Similar to [annotating Kubernetes Pods][6], Services can be annotated with the following syntax:

```yaml
  ad.datadoghq.com/service.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/service.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/service.instances: '[<INSTANCE_CONFIG>]'
  ad.datadoghq.com/endpoints.check_names: '[<CHECK_NAME>]'
  ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
  ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
```

The `%%host%%` [template variable][7] is supported and is replaced by the service's and endpoints' IPs. The `kube_namespace` and `kube_service` tags are automatically added to the instances.

**Note**: For now, it is required to set both `ad.datadoghq.com/service.*` and `ad.datadoghq.com/endpoints.*` annotations to enable the Endpoints Checks on the service's endpoints.

#### Example: HTTP check on an NGINX-backed service with NGINX check on the service's endpoints

The following service definition exposes the pods from the `my-nginx` deployment. It then runs an [HTTP check][8] to measure the latency of the load-balanced service and an [NGINX check][9] on the pod(s) that back the endpoint(s) of the service to collect `NGINX` metrics and service checks on the pod level:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-nginx
  labels:
    run: my-nginx
  annotations:
    ad.datadoghq.com/service.check_names: '["http_check"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "name": "My Nginx Service",
          "url": "http://%%host%%",
          "timeout": 1
        }
      ]
    ad.datadoghq.com/endpoints.check_names: '["nginx"]'
    ad.datadoghq.com/endpoints.init_configs: '[{}]'
    ad.datadoghq.com/endpoints.instances: |
      [
        {
          "name": "My Nginx Service Endpoints",
          "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
        }
      ]
spec:
  ports:
  - port: 80
    protocol: TCP
  selector:
    run: my-nginx
```

## Troubleshooting

Troubleshooting Endpoints Checks is similar to [troubleshooting Cluster Checks][10]—the only difference is on the node-based Agents, where scheduled Endpoints Checks appear alongside the Cluster Check.

**Note**: Endpoints Checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the service.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `endpoints-checks` source:

```
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Source: endpoints-checks
Instance ID: nginx:My Nginx Service Endpoints:96eff84ce7d742b9
name: My Nginx Service Endpoints
nginx_status_url: http://10.0.0.116/nginx_status/
tags:
- kube_deployment:nginx
- kube_namespace:default
- kube_service:nginx
- pod_phase:running
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint://default/nginx
* kubernetes_pod://e8667db4-5f8e-11e9-ae71-42010af0016b
* kube_service://6c964fcf-5d35-11e9-ae71-42010af0016b
===
```

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (3.1.0)
    -------------
      Instance ID: nginx:My Nginx Service Endpoints:96eff84ce7d742b9 [OK]
      Total Runs: 2
      Metric Samples: Last Run: 7, Total: 14
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 2
      Average Execution Time : 86ms
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/clusterchecks
[2]: /agent/kubernetes/cluster
[3]: /agent/autodiscovery
[4]: /agent/kubernetes/cluster/#cluster-checks-autodiscovery
[5]: /agent/guide/agent-commands
[6]: /agent/autodiscovery/?tab=kubernetes#template-source-kubernetes-pod-annotations
[7]: /agent/autodiscovery/?tab=kubernetes#supported-template-variables
[8]: /integrations/http_check
[9]: /integrations/nginx
[10]: /agent/autodiscovery/clusterchecks/#troubleshooting
