---
title: Running Endpoints Checks with Autodiscovery
kind: documentation
aliases:
    - /agent/autodiscovery/endpointchecks
    - /agent/autodiscovery/endpointschecks
further_reading:
    - link: '/agent/cluster_agent/clusterchecks/'
      tag: 'Documentation'
      text: 'Cluster Checks documentation'
    - link: '/agent/kubernetes/cluster/'
      tag: 'Documentation'
      text: 'Cluster Agent documentation'
---

## Overview

The cluster check feature provides the ability to Autodiscover and perform checks on load-balanced cluster services (eg. Kubernetes services).

Endpoint checks extend this mechanism to monitor any endpoint behind cluster services.

The [Cluster Agent][1] holds the configurations and exposes them to node-based Agents so they can consume and convert them into endpoints checks.

Endpoints checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the monitored service.

The Agents connect to the Cluster Agent every 10 seconds and retrieve the check configurations to run. Metrics coming from endpoints checks are submitted with service, pod, and host tags.

This feature is supported on Kubernetes for versions 6.12.0+ of the Agent, and versions 1.3.0+ of the Cluster Agent.

Starting with version 1.4.0, the Cluster Agent converts every endpoints check of a non-pod-backed endpoint into a regular cluster check. Enable the [cluster check][2] feature alongside endpoints checks to take advantage of this functionality.

#### Example: three NGINX pods exposed by the `nginx` service

```shell
# kubectl get svc nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
# kubectl get pods --selector app=nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-758655469f-59q9z   1/1     Running   0          20h
nginx-758655469f-k8zrc   1/1     Running   0          20h
nginx-758655469f-lk9p6   1/1     Running   0          20h
```

```shell
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

By design, endpoints checks are scheduled by Agents that run on the same node as the pods that back the endpoints of the `nginx` service, so only Agents running on the nodes `gke-cluster-default-pool-4658d5d4-k2sn` and `gke-cluster-default-pool-4658d5d4-p39c` will schedule the checks on the `nginx` pods.

This works like that to leverage [Autodiscovery][3], and attach pod and container tags to the metrics coming from these pods.

## How to set it up

### Cluster Agent setup

Enable the `kube_endpoints` configuration provider and listener on the Datadog **Cluster** Agent. This can be done by setting the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Note**: If the monitored endpoints are not backed by pods, you must [enable cluster checks][4]. This can be done by adding the `kube_services` configuration provider and listener:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Restart the Agent][5] to apply the configuration change.

### Agent setup

Enable the `endpointschecks` configuration providers on the Datadog **Node** Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable. This takes a space separated string if you have multiple values:

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- Or adding it to the `datadog.yaml` configuration file:

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**Note**: If the monitored endpoints are not backed by pods, you must [enable cluster checks][2]. This can be done by adding the `clusterchecks` configuration provider:

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Restart the Agent][5] to apply the configuration change.

## Setting up check configurations with Kubernetes service annotations

Similar to [annotating Kubernetes Pods][6], services can be annotated with the following syntax:

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

The `%%host%%` [template variable][7] is supported and is replaced by the endpoints' IPs. The `kube_namespace`, `kube_service`, and `kube_endpoint_ip` tags are automatically added to the instances.

### Template source: standard labels

```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

The `tags.datadoghq.com` labels set the `env`, `service`, and even `version` as tags on data generated by the check.
These standard labels are part of [Unified Service Tagging][8].

#### Example: HTTP check on an NGINX-backed service with NGINX check on the service's endpoints

The following service definition exposes the pods from the `my-nginx` deployment. It then runs an [HTTP check][9] to measure the latency of the load-balanced service and an [NGINX check][10] on the pod(s) that back the endpoint(s) of the service to collect `NGINX` metrics and service checks on the pod level:

```yaml
apiVersion: v1
kind: Service
metadata:
    name: my-nginx
    labels:
        run: my-nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
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
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        run: my-nginx
```

## Troubleshooting

Troubleshooting endpoints checks is similar to [troubleshooting cluster checks][11]—the only difference is on the node-based Agents, where scheduled endpoints checks appear alongside the cluster check.

**Note**: Endpoints checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the service. If an endpoint is not backed by a pod, the Cluster Agent converts the check into a cluster check. This cluster check can be run by any node Agent.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `endpoints-checks` source:

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- pod_phase:running
- kube_deployment:nginx
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
```

### Agent status

The Agent `status` command should show the check instance running and reporting successfully.

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent status
...
    nginx (3.4.0)
    -------------
      Instance ID: nginx:My Nginx Service Endpoints:2f7fd6b090782d6b [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Autodiscovery in the Cluster Agent

The Agent `clusterchecks` command should show the instance, with the `kubernetes-endpoints` source:

```shell
# kubectl exec <CLUSTER_AGENT_POD_NAME> agent clusterchecks
...
===== 3 Pod-backed Endpoints-Checks scheduled =====

=== nginx check ===
Configuration provider: kubernetes-endpoints
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:My Nginx Service Endpoints:f139adc46c81828e
name: My Nginx Endpoints
nginx_status_url: http://10.0.0.75/nginx_status/
tags:
- kube_service:nginx
- kube_namespace:default
- kube_endpoint_ip:10.0.0.75
- cluster_name:cluster
~
Init Config:
{}
Auto-discovery IDs:
* kube_endpoint_uid://default/nginx/10.0.0.75
* kubernetes_pod://4e733448-f57e-11e9-8123-42010af001ed
State: dispatched to gke-cluster-default-pool-4658d5d4-qfnt
===
...
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/cluster/
[2]: /agent/cluster_agent/clusterchecks/
[3]: /agent/kubernetes/integrations/
[4]: /agent/kubernetes/cluster/#cluster-checks-autodiscovery
[5]: /agent/guide/agent-commands/
[6]: /agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[7]: /agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[8]: /getting_started/tagging/unified_service_tagging
[9]: /integrations/http_check/
[10]: /integrations/nginx/
[11]: /agent/cluster_agent/troubleshooting/
