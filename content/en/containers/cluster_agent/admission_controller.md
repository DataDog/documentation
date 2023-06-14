---
title: Datadog Admission Controller
kind: documentation
aliases:
- /agent/cluster_agent/admission_controller
further_reading:
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
- link: "https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/"
  tag: "Blog"
  text: "Use library injection to auto-instrument tracing for Kubernetes applications with Datadog APM"
---

## Overview
The Datadog Admission Controller is a component of the Datadog Cluster Agent. The main benefit of the Admission Controller is to simplify your application Pod configuration. For that, it has two main functionalities:

- Inject environment variables (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL` and `DD_ENTITY_ID`) to configure DogStatsD and APM tracer libraries into the user's application containers.
- Inject Datadog standard tags (`env`, `service`, `version`) from application labels into the container environment variables.

Datadog's Admission Controller is `MutatingAdmissionWebhook` type. For more details on admission controllers, see the [Kubernetes guide on admission controllers][1].

## Requirements

- Datadog Cluster Agent v7.40+

## Setup
{{< tabs >}}
{{% tab "Operator" %}}

To enable the Admission Controller for the Datadog Operator, set the parameter `features.admissionController.enabled` to `true` in your `DatadogAgent` configuration:

{{< code-block lang="yaml" disable_copy="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    admissionController:
      enabled: true
      mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "Helm" %}}
Starting from Helm chart v2.35.0, Datadog Admission controller is activated by default. No extra configuration is needed to enable the Admission Controller.

To enable the Admission Controller for Helm chart v2.34.6 and earlier, set the parameter `clusterAgent.admissionController.enabled` to `true`:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="false" >}}
#(...)
clusterAgent:
  #(...)
  ## @param admissionController - object - required
  ## Enable the admissionController to automatically inject APM and
  ## DogStatsD config and standard tags (env, service, version) into
  ## your pods
  #
  admissionController:
    enabled: true

    ## @param mutateUnlabelled - boolean - optional
    ## Enable injecting config without having the pod label:
    ## admission.datadoghq.com/enabled="true"
    #
    mutateUnlabelled: false
{{< /code-block >}}
{{% /tab %}}
{{% tab "DaemonSet" %}}

To enable the Admission Controller without using Helm or the Datadog operator, add the following to your configuration:

First, download the [Cluster Agent RBAC permissions][1] manifest, and add the following under `rules`:

{{< code-block lang="yaml" filename="cluster-agent-rbac.yaml" disable_copy="true" >}}
- apiGroups:
  - admissionregistration.k8s.io
  resources:
  - mutatingwebhookconfigurations
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "watch", "update", "create"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "deployments"]
  verbs: ["get"]
{{< /code-block >}}

Add the following to the bottom of `agent-services.yaml`:

{{< code-block lang="yaml" filename="agent-services.yaml" disable_copy="true" >}}

apiVersion: v1
kind: Service
metadata:
  name: datadog-cluster-agent-admission-controller
  labels:
    app: "datadog"
    app.kubernetes.io/name: "datadog"
spec:
  selector:
    app: datadog-cluster-agent
  ports:
  - port: 443
    targetPort: 8000

{{< /code-block >}}

Add environment variables to the Cluster Agent deployment which enable the Admission Controller:

{{< code-block lang="yaml" filename="cluster-agent-deployment.yaml" disable_copy="true" >}}
- name: DD_ADMISSION_CONTROLLER_ENABLED
  value: "true"
- name: DD_ADMISSION_CONTROLLER_SERVICE_NAME
  value: "datadog-cluster-agent-admission-controller"

# Uncomment this to configure APM tracers automatically (see below)
# - name: DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED
#   value: "true"
{{< /code-block >}}

Finally, run the following commands:

- `kubectl apply -f cluster-agent-rbac.yaml`
- `kubectl apply -f agent-services.yaml`
- `kubectl apply -f cluster-agent-deployment.yaml`

[1]: https://raw.githubusercontent.com/DataDog/datadog-agent/master/Dockerfiles/manifests/cluster-agent/cluster-agent-rbac.yaml
{{% /tab %}}
{{< /tabs >}}

## Usage

Datadog Admission Controller can mutate pod resources in namespaces that are labelled with `admission.datadoghq.com/mutate-pods: "true"`. The Admission Controller can:

- Inject [environment variables](#injected-environment-variables)
- Mount extra volumes in the pod's containers (for example, `/var/run/datadog-agent` to mount the Agent socket)
- Manage [pod topology spread constraints](#pod-topology-spread-constraints)

### Injected environment variables

Only missing environment variables are added. For example, if a pod manifest defines `DD_ENV: foo`, its value is not mutated by the Admission Controller.

| Name | Description |
| ---- | ----------- |
| `AVAILABILITY_ZONE` | Cloud provider availability zone where the pod is running |
| `CONSUL_HTTP_ADDR` | Endpoint for Consul HTTP |
| `DD_DATACENTER` | Datacenter name (for example, `US1` or `AP1`) |
| `DD_ENTITY_ID` | Pod ID for origin detection. This is used by the Agent to attach the pod's tags to metrics. |
| `DD_ENV` | Datacenter environment (for example, `staging` or `prod`) |
| `DD_SERVICE` | The container service inherited from one of the following pod labels: `tags.datadoghq.com/service`, `service` |
| `DD_SITE` | Datadog site for the datacenter (for example, `datadoghq.com` or `ap1.datadoghq.com`) |
| `DD_VERSION` | The container version inhertied from one of the following pod labels: `tags.datadoghq.com/version`, `version` |
| `HOST_IP` | IP of the Kubernetes node on which the pod is scheduled |
| `K8S_CLUSTER_DNS_SERVICE_IP` | IP of service providing DNS for the Kubernetes cluster (for example, your CoreDNS IP) |
| `K8S_CLUSTER_INFRA_DOMAIN` | Discoverable DNS domain of the Kubernetes cluster |
| `K8S_CLUSTER_LOCAL_DOMAIN` | Local DNS domain of the Kubernetes cluster |
| `K8S_CLUSTER_NAME` | Name of the Kubernetes cluster |
| `POD_IP` | IP of the Kubernetes pod |
| `POD_NAMESPACE` | Namespace the pod is running in |
| `POD_SERVICE_ACCOUNT` | Kubernetes service account for the pod |
| `STATSD_URL` | StatsD endpoint for the pod (for example, `unix:///var/run/datadog-agent/statsd.sock`) |
| `TRACE_AGENT_URL` | Trace Agent endpoint |
| `VAULT_ADDR` | Vault endpoint for the datacenter |
| `VAULT_AUTH_PATH` | Vault auth mount for the Kubernetes cluster |
| `VAULT_ROLE` | Vault auth role for the pod. Defaults to the `VAULT_AUTH_BATCH_ROLE` for `initContainers` and `VAULT_AUTH_SERVICE_ROLE` for `containers`. `VAULT_ROLE` is effectively deprecated—instead, explicitly use `VAULT_AUTH_BATCH_ROLE` and `VAULT_AUTH_SERVICE_ROLE`. |
| `VAULT_AUTH_BATCH_ROLE` | Vault auth role for the pod to retrieve a non-renewable Vault batch token. Should be configured for all `initContainers`.
| `VAULT_AUTH_SERVICE_ROLE` | Vault auth role for the pod to retrieve a renewable Vault service token. |

### Pod topology spread constraints

_Topology spread constraints_ is a Kubernetes feature that controls how pods are spread across a cluster. The Datadog Admission Controller applies spread constraints on pods that are attached to a StatefulSet **and** have one of the following annotations in its pod template:

- `datadoghq.com/topologySpreadConstraints: ScheduleAnyway`
- `datadoghq.com/topologySpreadConstraints: DoNotSchedule`

See Kubernetes' documentation on [topology spread constraints][5].

### Instrumentation library injection
You can configure the Cluster Agent (version 7.39 and higher) to inject instrumentation libraries. Read [Instrumentation library injection with Admission Controller][2] for more information.

### APM and DogStatsD

To configure DogStatsD clients or other APM libraries that do not support library injection, inject the environment variables `DD_AGENT_HOST` and `DD_ENTITY_ID` by doing one of the following:
- Add the label `admission.datadoghq.com/enabled: "true"` to your Pod.
- Configure the Cluster Agent admission controller by setting `mutateUnlabelled` (or `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`, depending on your configuration method) to `true`.

Adding a `mutateUnlabelled: true` Agent config in the Helm chart causes the Cluster Agent to attempt to intercept every unlabelled Pod.

To prevent Pods from receiving environment variables, add the label `admission.datadoghq.com/enabled: "false"`. This works even if you set `mutateUnlabelled: true`.

If `mutateUnlabelled` is set to `false`, the Pod label must be set to `admission.datadoghq.com/enabled: "true"`.

Possible options:

| mutateUnlabelled | Pod label                               | Injection |
|------------------|-----------------------------------------|-----------|
| `true`           | No label                                | Yes       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Yes       |
| `true`           | `admission.datadoghq.com/enabled=false` | No        |
| `false`          | No label                                | No        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Yes       |
| `false`          | `admission.datadoghq.com/enabled=false` | No        |


#### Order of priority
The Datadog Admission Controller does not inject the environment variables `DD_VERSION`, `DD_ENV`, or `DD_SERVICE` if they already exist.

When these environment variables are not set, the Admission Controller uses standard tags value in the following order (highest first):

- Labels on the Pod
- Labels on the `ownerReference` (ReplicaSets, DaemonSets, Deployments, etc.)

#### Configure APM and DogstatsD communication mode
Starting from Datadog Cluster Agent v1.20.0, the Datadog Admission Controller can be configured to inject different modes of communication between the application and Datadog agent.

This feature can be configured by setting `admission_controller.inject_config.mode` or by defining a Pod-specific mode using the `admission.datadoghq.com/config.mode` Pod label.

Possible options:
| Mode               | Description                                                                                                       |
|--------------------|-------------------------------------------------------------------------------------------------------------------|
| `hostip` (Default) | Inject the host IP in `DD_AGENT_HOST` environment variable                                                        |
| `service`          | Inject Datadog's local-service DNS name in `DD_AGENT_HOST` environment variable (available with Kubernetes v1.22+)|
| `socket`           | Inject Unix Domain Socket path in `DD_TRACE_AGENT_URL` environment variable and the volume definition to access the corresponding path |

**Note**: Pod-specific mode takes precedence over the global mode defined at the Admission Controller level.

#### Notes

- The Admission Controller needs to be deployed and configured before the creation of new application Pods. It cannot update Pods that already exist.
- To disable the Admission Controller injection feature, use the Cluster Agent configuration: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`
- By using the Datadog Admission Controller, users can skip configuring the application Pods using downward API ([step 2 in Kubernetes Trace Collection setup][3]).
- In a private cluster, you need to [add a Firewall Rule for the control plane][4]. The webhook handling incoming connections receives the request on port `443` and directs it to a service implemented on port `8000`. By default, in the Network for the cluster there should be a Firewall Rule named like `gke-<CLUSTER_NAME>-master`. The "Source filters" of the rule match the "Control plane address range" of the cluster. Edit this Firewall Rule to allow ingress to the TCP port `8000`.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: /tracing/trace_collection/library_injection_local/
[3]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://kubernetes.io/docs/concepts/workloads/pods/pod-topology-spread-constraints/#spread-constraints-for-pods
