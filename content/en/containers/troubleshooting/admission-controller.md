---
title: Troubleshooting Admission Controller
further_reading:
- link: "https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/"
  tag: "Blog"
  text: "Auto Instrument Kubernetes Tracing"
- link: "/containers/cluster_agent/admission_controller/"
  tag: "Documentation"
  text: "Cluster Agent Admission Controller"
- link: "/tracing/trace_collection/library_injection_local/?tab=kubernetes"
  tag: "Documentation"
  text: "Kubernetes Library Injection"
---

## Overview

This page provides troubleshooting for the Datadog Cluster Agent's [Admission Controller][1].

## Common problems

### Update pre-existing pods
Admission Controller responds to the creation of new pods within your Kubernetes cluster: at pod creation, the Cluster Agent receives a request from Kubernetes and responds with the details of what changes (if any) to make to the pod.

Therefore, **Admission Controller does not mutate existing pods within your cluster**. If you recently enabled the Admission Controller or made other environmental changes, delete your existing pod and let Kubernetes recreate it. This ensures that Admission Controller updates your pod. 

### Labels and annotations
The Cluster Agent responds to labels and annotations on the created pod—**not** the workload (Deployment, DaemonSet, CronJob, etc.) that created that pod. Ensure that your pod template references this accordingly. 

For example, the following template sets the [label for APM configuration][2] and the [annotation for library injection][3]:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)  
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

### Application pods are not created

Admission Controller's injection mode (`socket`, `hostip`, `service`) is set by the configuration of your Cluster Agent. For example, if you have `socket` mode enabled in your Agent, Admission Controller also uses `socket` mode.

If you are using GKE Autopilot or OpenShift, you need to use a specific injection mode.

#### GKE Autopilot

GKE Autopilot restricts the use of any `volumes` with a `hostPath`. Therefore, if Admission Controller uses `socket` mode, the Pods are blocked from scheduling by the GKE Warden.

Enabling GKE Autopilot mode in the Helm chart disables the `socket` mode to prevent this from ocurring. To enable APM, enable the port and use the `hostip` or `service` method instead. The Admission Controller will default to `hostip` to match.

{{< tabs >}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
  #(...)

providers:
  gke:
    autopilot: true
```
{{% /tab %}}
{{< /tabs >}}

Refer to the [Kubernetes Distributions][17] for more configuration details regarding Autopilot.

#### OpenShift

OpenShift has `SecurityContextConstraints` (SCCs) that are required to deploy pods with extra permissions, such as a `volume` with a `hostPath`. Datadog components are deployed with SCCs to allow activity specific to Datadog pods, but Datadog does not create SCCs for other pods. 

If you are using OpenShift, use `hostip` mode. The following configuration enables `hostip` mode:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
{{% /tab %}}
{{< /tabs >}}

Refer to the [Kubernetes Distributions][18] for more configuration details regarding Autopilot.

## View Admission Controller status

The Cluster Agent's status output provides information to verify that it has created the `datadog-webhook` for the `MutatingWebhookConfiguration` and has a valid certificate.

Run the following command:

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

Your output resembles the following:

```
...
Admission Controller
====================
  
    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags
  
    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

This output is relative to the Cluster Agent deployed in the `default` namespace. The `Service` and `Secret` should match the namespace used.

## View Admission Controller logs

Debug logs help validate that you have set up Admission Controller properly. [Enable debug logs][3] with the following configuration:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
    site: <DATADOG_SITE>
    logLevel: debug
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  logLevel: debug
```

{{% /tab %}}
{{< /tabs >}}

### Validate `datadog-webhook`

**Example logs**:

```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

If do not see that the `datadog-webhook` webhook has been reconciled successfully, ensure that you have correctly enabled Admission Controller according to the [configuration instructions][1]. 

### Validate injection

**Example logs**:

```
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

If you see errors with the injection for a given pod, contact Datadog support with your Datadog configuration and your pod configuration.

If you do not see the injection attempts for *any* pod, verify your `mutateUnlabelled` settings and ensure your pod labels match up with the expected values. If these match up, your problem is likely with the networking between the control plane, webhook, and service. See [Networking](#networking) for further information.

## Networking

### Network policies

Kubernetes [Network Policies][5] help you control different ingress (inbound) and egress (outbound) flows of traffic to your pods.

If you are using network policies, Datadog recommends creating corresponding policies for the Cluster Agent to ensure connectivity to the pod over this port. You can do this with the following configuration:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
    networkPolicy:
      create: true
      flavor: kubernetes
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)
  networkPolicy:
    create: true
    flavor: kubernetes
```
{{% /tab %}}
{{< /tabs >}}

Set `flavor` to `kubernetes` to create a `NetworkPolicy` resource. 

Alternatively, for Cilium-based environments, set `flavor` to `cilium` to create a `CiliumNetworkPolicy` resource.

### Network troubleshooting for Kubernetes distributions

When a pod is created, the Kubernetes cluster sends a request from the control plane, to `datadog-webhook`, through the service, and finally to the Cluster Agent pod. This request requires inbound connectivity from the control plane to the node that the Cluster Agent is on, over its Admission Controller port (`8000`). After this request is resolved, the Cluster Agent mutates your pod to configure the network connection for the Datadog tracer.

Depending on your Kubernetes distribution, this may have some additional requirements for your security rules and Admission Controller settings.

#### Amazon Elastic Kubernetes Service (EKS)

In an EKS cluster, you can deploy the Cluster Agent pod on any of your Linux-based nodes by default. These nodes and their EC2 instances need a [security group][6] with the following [inbound rule][7]:
- **Protocol**: TCP
- **Port range**: `8000`, or a range that covers `8000`
- **Source**: The ID of _either_ the cluster security group, or one of your cluster's additional security groups. You can find these IDs in the EKS console, under the _Networking_ tab for your EKS cluster.

This security group rule allows the control plane to access the node and the downstream Cluster Agent over port `8000`.

If you have multiple [managed node groups][8], each with distinct security groups, add this inbound rule to each security group.

##### Control plane logging

To validate your networking configuration, enable [EKS control plane logging][9] for the API server. You can view these logs in the [CloudWatch console][10].

Then, delete one of your pods to re-trigger a request through Admission Controller. When the request fails, you can view logs that resemble the following:

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

These failures are relative to a Cluster Agent deployed in the `default` namespace; the DNS name adjusts relative to the namespace used.

You may also see failures for the other Admission Controller webhooks, such as `datadog.webhook.tags` and `datadodg.webhook.config`. 

**Note:** EKS often generates two log streams within the CloudWatch log group for the cluster. Be sure to check both for these types of logs.

#### Azure Kubernetes Service (AKS)

To use [admission controller webhooks on AKS][11], use the following configuration:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)

providers:
  aks:
    enabled: true
```

The `providers.aks.enabled` option sets the environment variable `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"`.
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE)

If you are using a [GKE private cluster][12], you need to adjust your firewall rules to allow inbound access from the control plane to port `8000`.

[Add a firewall rule][13] to allow ingress over TCP on port `8000`.

You can also edit an existing rule. By default, the network for your cluster has a firewall rule named `gke-<CLUSTER_NAME>-master`. Ensure that this rule's _source filters_ include [your cluster control plane's CIDR block][14]. Edit this rule to allow access over protocol `tcp` on port `8000`.

For more information, see [Adding firewall rules for specific use cases][15] in the GKE documentation.

#### Rancher

If you are using Rancher with an EKS cluster or a private GKE cluster, additional configuration is required. For more information, see [Rancher Webhook - Common Issues][16] in the Rancher documentation.

##### Rancher and EKS
To use Rancher in an EKS cluster, deploy the Cluster Agent pod with the following configuration:

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      hostNetwork: true
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
datadog:
  #(...)

clusterAgent:
  useHostNetwork: true
```
{{% /tab %}}
{{< /tabs >}}

You must also add a security group inbound rule, as described in the [Amazon EKS](#amazon-elastic-kubernetes-service-eks) section on this page.

##### Rancher and GKE
To use Rancher in a private GKE cluster, edit your firewall rules to allow inbound access over TCP on port `8000` and port `9443`. See the [GKE](#google-kubernetes-engine-gke) section on this page.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller
[2]: /containers/cluster_agent/admission_controller/#apm-and-dogstatsd
[3]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[4]: /agent/troubleshooting/debug_mode/
[5]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[8]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[10]: https://console.aws.amazon.com/cloudwatch/home#logs:prefix=/aws/eks
[11]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[12]: https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_3_add_a_firewall_rule
[14]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_1_view_control_planes_cidr_block
[15]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[16]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[17]: /containers/kubernetes/distributions/#autopilot
[18]: /containers/kubernetes/distributions/#Openshift