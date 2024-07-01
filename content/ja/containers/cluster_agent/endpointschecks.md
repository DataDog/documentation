---
title: Endpoint Checks with Autodiscovery
aliases:
    - /agent/autodiscovery/endpointchecks
    - /agent/autodiscovery/endpointschecks
    - /agent/cluster_agent/endpointschecks
further_reading:
    - link: /agent/kubernetes/cluster/
      tag: Documentation
      text: Cluster Agent
    - link: /containers/cluster_agent/clusterchecks/
      tag: Documentation
      text: Cluster Checks
    - link: /containers/troubleshooting/cluster-and-endpoint-checks
      tag: Documentation
      text: Troubleshooting Endpoint Checks

---

## Overview

The cluster check feature provides the ability to [Autodiscover][1] and perform checks on load-balanced cluster services, such as Kubernetes services. _Endpoints checks_ extend this mechanism to monitor each endpoint managed by a Kubernetes service.

The [Cluster Agent][2] discovers endpoint check configurations based on [Autodiscovery][1] annotations on the Kubernetes services. The Cluster Agent then dispatches these configurations to node-based Agents to individually run. Endpoint checks are dispatched to Agents that run on the same node as the Pod(s) that back the endpoint(s) of the monitored Kubernetes service. This dispatching logic allows the Agent to add the Pod and container tags it has already collected for each respective Pod.

The Agents connect to the Cluster Agent every ten seconds and retrieve the check configurations to run. Metrics coming from endpoints checks are submitted with service tags, [Kubernetes tags][3], host tags, and the `kube_endpoint_ip` tag based on the evaluated IP address.

**Versioning**:
This feature is supported on Kubernetes for Datadog Agent v6.12.0+ and Datadog Cluster Agent v1.3.0+. Starting with Cluster Agent v1.4.0, the Cluster Agent converts every endpoint check of a non-Pod-backed endpoint into a regular cluster check. Enable the [cluster check][4] feature (in addition to the endpoint check feature) to take advantage of this functionality.

**Note:** If the Pods behind your service are static, you need to add the annotation `ad.datadoghq.com/endpoints.resolve`. The Datadog Cluster Agent schedules the checks as endpoint checks and dispatches them to [cluster check runners][5]. [See an example][6] of using the annotation with the Kubernetes API server.

### Example: Service with endpoints
In the example below, a Kubernetes deployment for NGINX was created with three Pods.

```shell
kubectl get pods --selector app=nginx -o wide
NAME                     READY   STATUS    RESTARTS   AGE   IP           NODE
nginx-66d557f4cf-m4c7t   1/1     Running   0          3d    10.0.0.117   gke-cluster-default-pool-4658d5d4-k2sn
nginx-66d557f4cf-smsxv   1/1     Running   0          3d    10.0.1.209   gke-cluster-default-pool-4658d5d4-p39c
nginx-66d557f4cf-x2wzq   1/1     Running   0          3d    10.0.1.210   gke-cluster-default-pool-4658d5d4-p39c
```

A service was also created. It links to the Pods through these three endpoints.

```shell
kubectl get service nginx -o wide
NAME    TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)   AGE   SELECTOR
nginx   ClusterIP   10.3.253.165   <none>        80/TCP    1h    app=nginx
```

```shell
kubectl get endpoints nginx -o yaml
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

While a service-based cluster check tests the service's single IP address, endpoint checks are scheduled for **each** of the three endpoints associated with this service.

By design, endpoint checks are dispatched to Agents that run on the same node as the Pods that back the endpoints of this `nginx` service. In this example, the Agents running on the nodes `gke-cluster-default-pool-4658d5d4-k2sn` and `gke-cluster-default-pool-4658d5d4-p39c` run the checks against these `nginx` Pods.

## Set up endpoint check dispatching

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Endpoint check dispatching is enabled in the Operator deployment of the Cluster Agent by using the `features.clusterChecks.enabled` configuration key:
```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    clusterChecks:
      enabled: true
```

This configuration enables both cluster check and endpoint check dispatching between the Cluster Agent and the Agents.

{{% /tab %}}
{{% tab "Helm" %}}

Endpoint check dispatching is enabled by default in the Helm deployment of the Cluster Agent through the `datadog.clusterChecks.enabled` configuration key:
```yaml
datadog:
  clusterChecks:
    enabled: true
  # (...)
clusterAgent:
  enabled: true
  # (...)
```

This configuration enables both cluster check and endpoint Check dispatching between the Cluster Agent and the Agents.

{{% /tab %}}

{{% tab "DaemonSet" %}}
### Cluster Agent setup

Enable the `kube_endpoints` configuration provider and listener on the Datadog Cluster Agent. Set the `DD_EXTRA_CONFIG_PROVIDERS` and `DD_EXTRA_LISTENERS` environment variables:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints"
DD_EXTRA_LISTENERS="kube_endpoints"
```

**Note**: If the monitored endpoints are not backed by Pods, you must [enable Cluster Checks][1]. Add the `kube_services` configuration provider and listener:

```shell
DD_EXTRA_CONFIG_PROVIDERS="kube_endpoints kube_services"
DD_EXTRA_LISTENERS="kube_endpoints kube_services"
```

[Restart the Agent][2] to apply the configuration change.

### Agent setup

Enable the `endpointschecks` configuration providers on the node-based Agent. This can be done in two ways:

- By setting the `DD_EXTRA_CONFIG_PROVIDERS` environment variable. This takes a space-separated string if you have multiple values:

    ```shell
    DD_EXTRA_CONFIG_PROVIDERS="endpointschecks"
    ```

- Or adding it to the `datadog.yaml` configuration file:

    ```yaml
    config_providers:
        - name: endpointschecks
          polling: true
    ```

**Note**: If the monitored endpoints are not backed by Pods, you must [enable cluster checks][1]. This can be done by adding the `clusterchecks` configuration provider:

```shell
DD_EXTRA_CONFIG_PROVIDERS="endpointschecks clusterchecks"
```

[Restart the Agent][2] to apply the configuration change.

[1]: /agent/cluster_agent/clusterchecks/
[2]: /agent/configuration/agent-commands/
{{% /tab %}}
{{< /tabs >}}


## Setting up check configurations

### Configuration from static configuration files

In Cluster Agent v1.18.0+, you can use `advanced_ad_identifiers` and [Autodiscovery template variables][7] in your check configuration to target Kubernetes endpoints ([see example][8]).

#### Example: HTTP check on Kubernetes endpoints

To perform an [HTTP check][9] against the endpoints of a Kubernetes service,

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Use the `spec.override.clusterAgent.extraConfd.configDataMap` section to define your check configuration:

```yaml
spec:
#(...)
  override:
    clusterAgent:
      extraConfd:
        configDataMap:
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

{{% /tab %}}
{{% tab "Helm" %}}
Use the `clusterAgent.confd` field to define your check configuration:

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

{{% /tab %}}
{{% tab "DaemonSet" %}}
Mount a `/conf.d/http_check.yaml` file in the Cluster Agent container with the following content:

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

{{% /tab %}}
{{< /tabs >}}

### Configuration from Kubernetes service annotations

{{< tabs >}}
{{% tab "Kubernetes (AD v2)" %}}

**Note:** AD Annotations v2 was introduced in Datadog Agent 7.36 to simplify integration configuration. For previous versions of the Datadog Agent, use AD Annotations v1.

The syntax for annotating services is similar to that for [annotating Kubernetes Pods][1]:

```yaml
ad.datadoghq.com/endpoints.checks: |
  {
    "<INTEGRATION_NAME>": {
      "init_config": <INIT_CONFIG>,
      "instances": [<INSTANCE_CONFIG>]
    }
  }
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

This syntax supports a `%%host%%` [template variable][11] which is replaced by the IP of each endpoint. The `kube_namespace`, `kube_service`, and `kube_endpoint_ip` tags are automatically added to the instances.

**Note**: Custom endpoints log configuration is only supported during Docker socket log collection, and not Kubernetes log file collection.

#### Example: HTTP check on an NGINX-backed service with an NGINX check on the service's endpoints

This service is associated with the Pods of the `nginx` deployment. Based on this configuration:

- An [`nginx`][12]-based endpoint check is dispatched for each NGINX Pod backing this service. This check is run by Agents on the same respective nodes as the NGINX Pods (using the Pod IP as `%%host%%`).
- An [`http_check`][9]-based cluster check is dispatched to a single Agent in the cluster. This check uses the IP of the service as `%%host%%`, automatically getting load balanced to the respective endpoints.
- The checks are dispatched with the tags `env:prod`, `service:my-nginx`, and `version:1.19.0`, corresponding to [Unified Service Tagging][13] labels.

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
      ad.datadoghq.com/service.checks: |
        {
          "http_check": {
            "init_config": {},
            "instances": [
              {
                "url": "http://%%host%%",
                "name": "My Nginx",
                "timeout": 1
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.checks: |
        {
          "nginx": {
            "init_config": {},
            "instances": [
              {
                "name": "My Nginx Service Endpoints",
                "nginx_status_url": "http://%%host%%:%%port%%/status/"
              }
            ]
          }
        }
      ad.datadoghq.com/endpoints.logs: '[{"source":"nginx","service":"webapp"}]'
spec:
    ports:
        - port: 80
          protocol: TCP
    selector:
        app: nginx
```

[1]: /containers/kubernetes/integrations/?tab=kubernetesadv2
[9]: /integrations/http_check/
[11]: /agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /integrations/nginx/
[13]: /getting_started/tagging/unified_service_tagging

{{% /tab %}}

{{% tab "Kubernetes (AD v1)" %}}

The syntax for annotating services is similar to that for [annotating Kubernetes Pods][10]:

```yaml
ad.datadoghq.com/endpoints.check_names: '[<INTEGRATION_NAME>]'
ad.datadoghq.com/endpoints.init_configs: '[<INIT_CONFIG>]'
ad.datadoghq.com/endpoints.instances: '[<INSTANCE_CONFIG>]'
ad.datadoghq.com/endpoints.logs: '[<LOGS_CONFIG>]'
```

This syntax supports a `%%host%%` [template variable][11] which is replaced by the IP of each endpoint. The `kube_namespace`, `kube_service`, and `kube_endpoint_ip` tags are automatically added to the instances.

**Note**: Custom endpoints log configuration is only supported during Docker socket log collection, and not Kubernetes log file collection.

#### Example: HTTP check on an NGINX-backed service with an NGINX check on the service's endpoints

This service is associated with the Pods of the `nginx` deployment. Based on this configuration:

- An [`nginx`][12]-based endpoint check is dispatched for each NGINX Pod backing this service. This check is run by Agents on the same respective nodes as the NGINX Pods (using the Pod IP as `%%host%%`).
- An [`http_check`][9]-based cluster check is dispatched to a single Agent in the cluster. This check uses the IP of the service as `%%host%%`, automatically getting load balanced to the respective endpoints.
- The checks are dispatched with the tags `env:prod`, `service:my-nginx`, and `version:1.19.0`, corresponding to [Unified Service Tagging][13] labels.

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

[9]: /integrations/http_check/
[10]: /agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /integrations/nginx/
[13]: /getting_started/tagging/unified_service_tagging
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/integrations/?tab=kubernetesadv2
[2]: /agent/cluster_agent
[3]: /agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[4]: /agent/cluster_agent/clusterchecks/
[5]: /containers/guide/clustercheckrunners
[6]: /containers/kubernetes/control_plane/?tab=helm#api-server-2
[7]: /agent/guide/template_variables/
[8]: /agent/cluster_agent/endpointschecks/#example-http_check-on-kubernetes-endpoints
[9]: /integrations/http_check/
[10]: /agent/kubernetes/integrations/?tab=kubernetes#template-source-kubernetes-pod-annotations
[11]: /agent/kubernetes/integrations/?tab=kubernetes#supported-template-variables
[12]: /integrations/nginx/
[13]: /getting_started/tagging/unified_service_tagging
