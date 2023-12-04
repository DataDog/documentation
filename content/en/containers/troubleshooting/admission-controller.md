---
title: Troubleshooting Admission Controller
kind: documentation
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

The [Cluster Agent's Admission Controller][1] feature helps setup APM in Kubernetes between [Library Injection][2], APM Configuration, and Unified Service Tagging. The document below can help diagnose common problems with the Admission Controller setup and networking requirements. 

## Common problems

### Order
The Admission Controller responds to the creation of new pods within your Kubernetes cluster. More specifically the Cluster Agent receives a request from Kubernetes at pod creation, and responds with the details of what changes to make to the pod. 

This does mean that the Admission Controller does not mutate existing pods within your cluster. If you have recently enabled the Admission Controller or made other environmental changes, you can delete your existing pod and let Kubernetes re-create it to verify if the Admission Controller has updated your pod. 

### Labels and Annotations
The Cluster Agent responds to labels and annotations on the created pod, not the workload (Deployment, DaemonSet, CronJob, etc) that created that pod. Be sure to double check that your pod template references this accordingly. For example:

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

## Review cluster agent logs and status

### Admission controller status
The Cluster Agent's status output provides information to verify that it has created the `datadog-webhook` for the `MutatingWebhookConfiguration` and has a valid certificate.

```
% kubectl exec -it <Cluster Agent Pod> -- agent status
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

The above output is relative to the Cluster Agent deployed in the `default` namespace. The Service and Secret should match your corresponding namespace used.

### Admission controller logs

It can be helpful to [enable debug logging][3] for the Cluster Agent, especially at startup to validate it has setup the Admission Controller properly. With debug logging you would see logs like:

#### Discovery of datadog-webhook
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

If you are not seeing that the `datadog-webhook` has been reconciled successfully, double check that you have enabled the Admission Controller correctly relative to the [provided configurations][1]. 

#### Processing a sample pod

```
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP>  | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

The Cluster Agent will print debug logs when it is working with a given pod. If you are seeing errors with the injection for a given pod reach out to Datadog support with your Datadog configuration as well as your pod configuration. 

If you are not seeing the injection attempts for *any pod* first double check your `mutateUnlabelled` settings and that your pod labels match up with the expected value. If these match up the issue is more likely with the networking between the control plane, webhook, and service.

## Networking

When a pod is creating the Kubernetes cluster will send a request from the control plane, to the datadog-webhook, through the service, and finally to the Cluster Agent pod. This request requires inbound connectivity from the control plane to the node that the Cluster Agent is on, over its Admission Controller port (`8000`). Once resolved the Cluster Agent will mutate your pod to configure the connection for the Datadog tracer.

Depending on your Kubernetes distribution this may have some additional requirements for your security rules and Admission Controller settings.

### Network policies

Kubernetes has the optional feature of [Network Policies][4]. These can take a few different forms between using the out-of-box resource (`NetworkPolicy`) or custom ones like [Cilium][5] (`CiliumNetworkPolicy`). These help control different Ingress (Inbound) and Egress (Outbound) flows of traffic to your pods.

If you are using these features we recommend to create the corresponding policies for the Cluster Agent to ensure the connectivity to the pod over this port. This can be configured with the configurations below. When setting the below option you can also specify a flavor. The default is `kubernetes` and corresponds to the creation of `NetworkPolicy` resources, alternatively set the flavor to `cilium` to create the corresponding `CiliumNetworkPolicy` for Cilium based environments.

{{< tabs >}}
{{% tab "Operator" %}}
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

### Kubernetes distributions

#### EKS
In EKS clusters the Cluster Agent pod can be deployed on any of your Linux based nodes by default. These nodes and their EC2 instances need to have a [Security Group which has an Inbound Rule][6] that allows access over the `TCP` protocol, port `8000`, and the "Source" matching *either* the Cluster Security Group or one of the Additional Security Groups of the EKS cluster. These security groups can be found on the EKS cluster's "Networking" page. This gives access for the Control Plane to access the node and the downstream Cluster Agent over its port `8000`.

You can use a "Port Range" as long as this covers the `8000` port and required "Source" Security Group. If you have multiple Managed Node Groups with distinct Security Groups in each, ensure this inbound connectivity is added to each.

Within EKS you can additionally turn on the [EKS Control Plane Logging for the “API server”][7].

Once this is enabled the delete one of your pods to re-trigger a request through the Admission Controller. If the request fail from the networking perspective you should see logs in your AWS CloudWatch log group and log stream(s) for this cluster like:

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

These failures were relative to a Cluster Agent deployed in the `default` namespace, the DNS name would adjust relative to your namespace used.

You would see failures for the other the other Admission Controller webhooks such as as well such as `datadog.webhook.tags` and `datadodg.webhook.config`. **Note:** EKS often generates two log streams within the CloudWatch log group for the cluster. Be sure to check both for these types of logs.

#### AKS
When creating the `datadog-webhook` for the `MutatingWebhookConfiguration` AKS will adjust the [format slightly to ensure you avoid the control-plane pods][8]. Provide the Cluster Agent the configuration below to ensure it can create and reconcile this format accordingly.

{{< tabs >}}
{{% tab "Operator" %}}

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

The `providers.aks.enabled` option sets the necessary environment variable `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` for you.
{{% /tab %}}
{{< /tabs >}}

#### GKE
If you are using a [GKE *Private* Cluster this restricts the flow of data][9] to the pod by default. You will need to add a firewal rule to allow the inbound access from the control plane to this port. By default, the network for the cluster should have a firewall rule named `gke-<CLUSTER_NAME>-master`. This rule’s source filters should match the cluster’s "Control plane address range" found in the "Networking" section. Edit this firewall rule to allow ingress to the `TCP` protocol and port `8000`.

#### Rancher

There can be issues with Rancher depending on the underlying environment used. You can consult the [Rancher documentation][10] for a similar issue with the Rancher-Webhook (another Mutating Admission Controller) within GKE Private Clusters or EKS Clusters using the Calico CNI.

In GKE Private clusters you can consult the [GKE steps above][#GKE] to add the corresponding firewall rule.

In EKS clusters you can similarly deploy the Cluster Agent pod with the `hostNetwork: true` setting to allow this connectivity.

{{< tabs >}}
{{% tab "Operator" %}}
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

## Application pods blocked
The Helm and Operator setups by default will match Admission Controller's injection config mode (`socket`, `hostip`, `service`) relative to the APM receivers enabled. In other words if you have the (UDS) socket mode enabled in your Agent and the Host Port disabled, the Admission Controller should use the `socket` mode. Preferring `socket` over `hostip`. The default APM receiver in the Agent is the `socket` mode, so by default the default Admission Controller mode is also `socket`.

This injection mode may need to be tailored depending on your environment.

### GKE Autopilot
GKE Autopilot restricts the use of any `volumes` with a `hostPath`. So if the Admission Controller is injecting the (UDS) `socket` the pods will be blocked from scheduling by the GKE Warden.

This setup is typically blocked when setting your Helm configuration in to GKE Autopilot mode (`providers.gke.autpilot=true`). However, be sure you are not explicitly attempting to override the configuration to use the `socket` mode when in GKE Autopilot. Instead use the `hostip` mode (the default) or `service` mode.

### OpenShift
In OpenShift there are `SecurityContextConstraints` (SCC) that are required to deploy pods with extra permissions, such as a `volume` using a `hostPath`. As we deploy our Datadog components we deploy SCCs to allow this activity specific to the Datadog pods, however we do not create SCCs for other pods. This can cause issues if the `socket` mode is used, as it will inject a `volume` with a `hostPath` into these other pods, which will make them forbidden from being deployed as they are unable to validate against any security context constraint.

With this in mind in OpenShift you can use either:

#### Port option
The port option enables the `hostPort` in your Agent pod and injects the `hostip` configuration into your appliction pods. This is a "safe" configuration and should not be forbidden within your security contexts.

{{< tabs >}}
{{% tab "Operator" %}}
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

#### Socket option
If you would like to use the (UDS) `socket` option for connectivity, you will need to [create a custom SCC][11] for your application pods and the Service Accounts that they are using. This SCC needs to allow the `volumes` of the type `hostPath`. For example:

```yaml
kind: SecurityContextConstraints
apiVersion: security.openshift.io/v1
metadata:
  name: <NAME>
users:
- system:serviceaccount:<NAMESPACE>:<SERVICE_ACCOUNT>
priority: <PRIORITY>
volumes:
- hostPath
```

[1]: /containers/cluster_agent/admission_controller
[2]: /tracing/trace_collection/library_injection_local/?tab=kubernetes
[3]: /agent/troubleshooting/debug_mode/
[4]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[5]: https://docs.cilium.io/en/latest/security/policy/language/
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[7]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[8]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[9]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[10]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[11]: https://docs.openshift.com/container-platform/4.14/rest_api/security_apis/securitycontextconstraints-security-openshift-io-v1.html