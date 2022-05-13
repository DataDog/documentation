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

The Cluster Check feature provides the ability to Autodiscover and perform checks on load-balanced cluster services, such as Kubernetes services. [Service-based Cluster Checks][1] can be used to schedule one instance of a desired check with respect to the service and its IP address. Endpoints Checks extend this mechanism to monitor *each* endpoint managed by the Kubernetes service.

The [Cluster Agent][2] discovers Endpoints Check configurations based on Autodiscovery annotations on the Kubernetes services. The Cluster Agent then dispatches these configurations to node-based Agents to individually run. Endpoints Checks are dispatched to Agents that run on the same node as the pod(s) that back the endpoint(s) of the monitored Kubernetes service. This dispatching logic allows the Agent to add the pod and container tags it has already automatically collected for the respective pod(s).

The Agents connect to the Cluster Agent every ten seconds and retrieve the check configurations to run. Metrics coming from Endpoints Checks are submitted with service tags, [Kubernetes tags][3], host tags, and the `kube_endpoint_ip` tag based on the evaluated IP address.

This feature is supported on Kubernetes for Agent v6.12.0+ and Cluster Agent v1.3.0+. Starting with v1.4.0, the Cluster Agent converts every Endpoints Check of a non-pod-backed endpoint into a regular Cluster Check. Enable the [Cluster Check][4] feature alongside Endpoints Checks to take advantage of this functionality.

### Example: Service with endpoints
In the example below, a Kubernetes deployment for NGINX was created with three pods.

```shell
# kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

A service was also created. It links to the pods through these three endpoints.

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

While a service-based Cluster Check tests the service's single IP address,  Endpoints Checks are scheduled for *each* of the three endpoints associated with this service. 

By design, Endpoints Checks are dispatched to Agents that run on the same node as the pods that back the endpoints of this `nginx` service. In this example, the Agents running on the nodes `gke-cluster-default-pool-4658d5d4-k2sn` and `gke-cluster-default-pool-4658d5d4-p39c` run the checks against these `nginx` pods.

## Set up Endpoints Check dispatching

{{< tabs >}}
{{% tab "Operator" %}}

Cluster Check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `clusterAgent.config.clusterChecksEnabled` configuration key:
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

This configuration enables both Cluster Check and Endpoints Check dispatching between the Cluster Agent and the Agents.

{{% /tab %}}
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

This configuration enables both Cluster Check and Endpoints Check dispatching between the Cluster Agent and the Agents.

{{% /tab %}}

{{% tab "Daemonset" %}}
### Cluster Agent setup

Enable the `kube_endpoints` configuration provider and listener on the Datadog **Cluster** Agent. This can be done by setting the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Note**: If the monitored endpoints are not backed by pods, you must [enable Cluster Checks][1]. This can be done by adding the `kube_services` configuration provider and listener:

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

**Note**: If the monitored endpoints are not backed by pods, you must [enable Cluster Checks][1]. This can be done by adding the `clusterchecks` configuration provider:

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Restart the Agent][2] to apply the configuration change.

[1]: /agent/cluster_agent/clusterchecks/
[2]: /agent/guide/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Setting up check configurations

### Configuration from static configuration files

Starting Datadog Agent 1.18.0 you can use `advanced_ad_identifiers` and [Autodiscovery template variables][11] in you check configuration to target Kubernetes endpoints ([see example][12]).

#### Example: HTTP_Check on Kubernetes endpoints

{{< tabs >}}
{{% tab "Helm" %}}
If there is a Kubernetes service you would like the to perform an [HTTP check][1] against its endpoints, use the `clusterAgent.confd` field to define your check configuration:

```yaml
#(...)
clusterAgent:
  confd:
    <INTEGRATION_NAME>.yaml: |-
      advanced_ad_identifiers:
        - kube_endpoints:
            name: "<ENDPOINTS_NAME>"
            namespace: "<ENDPOINTS_NAMESPACE>"
      cluster_check: true
      init_config:
      instances:
        - url: "http://%%host%%"
          name: "<EXAMPLE_NAME>"
```

[1]: /integrations/http_check/
{{% /tab %}}
{{% tab "Daemonset" %}}
If there is a Kubernetes service you would like the to perform an [HTTP check][1] against against its endpoints, mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

```yaml
advanced_ad_identifiers:
  - kube_endpoints:
      name: "<ENDPOINTS_NAME>"
      namespace: "<ENDPOINTS_NAMESPACE>"
cluster_check: true
init_config:
instances:
  - url: "http://%%host%%"
    name: "<EXAMPLE_NAME>"
```

[1]: /integrations/http_check/
{{% /tab %}}
{{< /tabs >}}

**Note:** The field `advanced_ad_identifiers` is supported starting Datadog Cluster Agent 1.18+.

### Configuration from Kubernetes service annotations

Similar to how [Kubernetes Pods][5] are annotated, services can be annotated with the following syntax:

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

The `%%host%%` [template variable][6] is supported and is replaced by the endpoints' IPs. The `kube_namespace`, `kube_service`, and `kube_endpoint_ip` tags are automatically added to the instances.

**Note**: Custom endpoints log configuration is only supported during Docker socket log collection, and not Kubernetes log file collection.

### Unified Service Tagging
Optionally, to leverage [Unified Service Tagging][7], set the `env`, `service`, and `version` tags on data generated by these checks.
```yaml
tags.datadoghq.com/env: "<ENV>"
tags.datadoghq.com/service: "<SERVICE>"
tags.datadoghq.com/version: "<VERSION>"
```

#### Example: HTTP check on an NGINX-backed service with NGINX check on the service's endpoints

The example below takes advantage of all these options. This service is associated with the pods of the `nginx` deployment. Based on this configuration:

- An [`nginx`][8]-based Endpoints Check is dispatched for each NGINX pod backing this service. This check is run by Agents on the same respective nodes as the NGINX pods (using the pod IP as `%%host%%`).
- An [`http_check`][9]-based Cluster Check is dispatched to a single Agent in the cluster. This check uses the IP of the service as `%%host%%` , automatically getting load balanced to the respective endpoints.
- The checks are dispatched with the tags `env:prod`, `service:my-nginx`, and `version:1.19.0`, corresponding to Unified Service Tagging labels.

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

Troubleshooting Endpoints Checks is similar to [troubleshooting Cluster Checks][10]. The only difference is on Node-based Agents, where scheduled Endpoints Checks appear alongside Cluster Checks.

**Note**: Endpoints Checks are scheduled by Agents that run on the same node as the pod(s) that back the endpoint(s) of the service. If an endpoint is not backed by a pod, the Cluster Agent converts the check into a Cluster Check. This Cluster Check can be run by any Node Agent.

### Autodiscovery in the Node-based Agent

The Agent `configcheck` command shows the instance, with the `endpoints-checks` source:

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

The Cluster Agent `clusterchecks` command shows the instance(s), with the `kubernetes-endpoints` source:

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
[11]: /agent/guide/template_variables/
[12]: /agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
