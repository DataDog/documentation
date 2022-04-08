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

The cluster check feature provides the ability to Autodiscover and perform checks on load-balanced cluster services (eg. Kubernetes services). The [service based cluster checks][1] can be used to schedule one instance of the desired check with respect to the service and its IP address. In comparison Endpoint Checks extend this mechanism to monitor *each* endpoint managed by the Kubernetes service.

The [Cluster Agent][2] discovers the Endpoint Check configurations based on Autodiscovery Annotations on the Kubernetes services, then dispatches them to node-based Agents to individually run. The Endpoint Checks are dispatched to Agents that run on the same node as the pod(s) that back the endpoint(s) of the monitored Kubernetes service. This dispatching logic allows the Agent to add the pod and container tags it has already automatically collected for the respective pod(s).

The Agents connect to the Cluster Agent every 10 seconds and retrieve the check configurations to run. Metrics coming from endpoints checks are submitted with service tags, [kubernetes tags][3], host tags, and the `kube_endpoint_ip` tag based on the evaluated IP Address.

This feature is supported on Kubernetes for versions 6.12.0+ of the Agent, and versions 1.3.0+ of the Cluster Agent. Starting with version 1.4.0, the Cluster Agent converts every endpoints check of a non-pod-backed endpoint into a regular cluster check. Enable the [cluster check][4] feature alongside endpoints checks to take advantage of this functionality.

### Example: Service with Endpoints
In this example below a Kubernetes deployment for nginx was created with 3 pods.

```shell
# kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

A service was also created, linking up this service to the pods through these 3 endpoints.
```shell
# kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
# kubectl get endpoints nginx -o yaml
...
- addresses:
  - ip: 10.0.0.117
    nodeName: gke-cluster-default-pool-4658d5d4-k2sn
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-m4c7t
      ...
  - ip: 10.0.1.209
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-smsxv
      ...
  - ip: 10.0.1.210
    nodeName: gke-cluster-default-pool-4658d5d4-p39c
    targetRef:
      kind: Pod
      name: nginx-66d557f4cf-x2wzq
      ...
```
So while a Service based cluster check tests the Service's single IP Address, the Endpoint Checks are scheduled for *each* of these three endpoints associated with this Service. By design too, the Endpoint Checks are dispatched to Agents that run on the same node as the pods that back the endpoints of this `nginx` service. So in this example the Agents running on the nodes `gke-cluster-default-pool-4658d5d4-k2sn` and `gke-cluster-default-pool-4658d5d4-p39c` run the checks against these `nginx` pods.

## Set up Endpoint Check dispatching

{{< tabs >}}
{{% tab "Helm" %}}
This is enabled by default in the Helm deployment of the Cluster Agent through the `datadog.clusterChecks.enabled` configuration key:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```
This configuration enables both cluster check and Endpoint Check dispatching, between the Cluster Agent and the Agents.

{{% /tab %}}
{{% tab "Operator" %}}
Cluster check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `clusterAgent.config.clusterChecksEnabled` configuration key:
```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  # (...)
  clusterAgent:
    config:
      clusterChecksEnabled: true
```

This configuration enables both cluster check and Endpoint Check dispatching, between the Cluster Agent and the Agents.

{{% /tab %}}
{{% tab "Daemonset" %}}
### Cluster Agent setup

Enable the `kube_endpoints` configuration provider and listener on the Datadog **Cluster** Agent. This can be done by setting the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Note**: If the monitored endpoints are not backed by pods, you must [enable cluster checks][1]. This can be done by adding the `kube_services` configuration provider and listener:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Restart the Agent][2] to apply the configuration change.

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

**Note**: If the monitored endpoints are not backed by pods, you must [enable cluster checks][1]. This can be done by adding the `clusterchecks` configuration provider:

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Restart the Agent][2] to apply the configuration change.

[1]: /agent/cluster_agent/clusterchecks/
[2]: /agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Setting up check configurations with Kubernetes service annotations

Similar to [annotating Kubernetes Pods][5], services can be annotated with the following syntax:

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

The `%%host%%` [template variable][6] is supported and is replaced by the endpoints' IPs. The `kube_namespace`, `kube_service`, and `kube_endpoint_ip` tags are automatically added to the instances.

**Note:** The custom endpoints logs configuration is only supported during Docker socket log collection and not Kubernetes log file collection.

### Unified Service Tagging
You can optionally add the standard labels to the Kubernetes service for [Unified Service Tagging][7] to set the `env`, `service`, and `version` tags on data generated by these checks.
```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

#### Example: HTTP check on an NGINX-backed service with NGINX check on the service's endpoints

The example below takes advantage of all these options. This Service is associated to the pods of the `nginx` deployment. Based on this configuration:
- An [`nginx`][8] based endpoint check will be dispatched for each Nginx pod backing this Service, this `nginx` check will be ran by the Agents on the same respective nodes as the Nginx pods using the Pod IP as the `%%host%%`.
- An [`http_check`][9] based cluster check will be dispatched to a single Agent in the cluster, this `http_check` will use the IP of the Service as the `%%host%%` automatically getting load balanced to the respective endpoints
- The checks will be dispatched out with the tags `env:prod`, `service:my-nginx`, and `version:1.19.0` corresponding to the Unified Service Tagging labels

```yaml
apiVersion: v1
kind: Service
metadata:
    name: nginx
    labels:
        app: nginx
        tags.datadoghq.com/env: "prod"
        tags.datadoghq.com/service: "my-nginx"
        tags.datadoghq.com/version: "1.19.0"
    annotations:
        ad.datadoghq.com/endpoints.check_names: '["nginx"]'
        ad.datadoghq.com/endpoints.init_configs: '[{}]'
        ad.datadoghq.com/endpoints.instances: |
            [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/nginx_status"
              }
            ]
        ad.datadoghq.com/service.check_names: '["http_check"]'
        ad.datadoghq.com/service.init_configs: '[{}]'
        ad.datadoghq.com/service.instances: |
            [
              {
                "name": "My Nginx Service",
                "url": "http://%%host%%"
              }
            ]
        ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

## Troubleshooting

Troubleshooting endpoints checks is similar to [troubleshooting cluster checks][10]—the only difference is on the node-based Agents, where scheduled endpoints checks appear alongside the cluster check.

**Note**: Endpoints checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the service. If an endpoint is not backed by a pod, the Cluster Agent converts the check into a cluster check. This cluster check can be run by any node Agent.

### Autodiscovery in the node-based Agent

The Agent `configcheck` command should show the instance, with the `endpoints-checks` source:

```shell
# kubectl exec <NODE_AGENT_POD_NAME> agent configcheck
...
=== nginx check ===
Configuration provider: endpoints-checks
Configuration source: kube_endpoints:kube_endpoint_uid://default/nginx/
Instance ID: nginx:956741d8796d940c
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
    nginx (4.0.0)
    -------------
      Instance ID: nginx:956741d8796d940c [OK]
      Configuration Source: kube_endpoints:kube_endpoint_uid://default/nginx/
      Total Runs: 443
      Metric Samples: Last Run: 7, Total: 3,101
      Events: Last Run: 0, Total: 0
      Service Checks: Last Run: 1, Total: 443
      Average Execution Time : 5ms
```

### Autodiscovery in the Cluster Agent

The Cluster Agent `clusterchecks` command should show the instance(s), with the `kubernetes-endpoints` source:

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

[1]: /agent/cluster_agent/clusterchecks/?tab=helm#configuration-from-kubernetes-service-annotations
[2]: /agent/cluster_agent
[3]: /agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /agent/cluster_agent/clusterchecks/
[5]: /agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[6]: /agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[7]: /getting_started/tagging/unified_service_tagging
[8]: /integrations/nginx/
[9]: /integrations/http_check/
[10]: /agent/cluster_agent/troubleshooting/
