---
title: Datadog Admission Controller
aliases:
- /agent/cluster_agent/admission_controller
further_reading:
- link: /agent/cluster_agent/troubleshooting/
  tag: Documentation
  text: Troubleshooting the Datadog Cluster Agent
- link: /containers/troubleshooting/admission-controller
  tag: Documentation
  text: Troubleshooting the Admission Controller
- link: "https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/"
  tag: Blog
  text: Use library injection to auto-instrument tracing for Kubernetes applications with Datadog APM
---

## Overview
The Datadog Admission Controller is a component of the Datadog Cluster Agent. The main benefit of the Admission Controller is to simplify your application Pod configuration. For that, it has two main functionalities:

- Inject environment variables (`DD_AGENT_HOST`, `DD_TRACE_AGENT_URL` and `DD_ENTITY_ID`) to configure DogStatsD and APM tracer libraries into the user's application containers.
- Inject Datadog standard tags (`env`, `service`, `version`) from application labels into the container environment variables.

Datadog's Admission Controller is `MutatingAdmissionWebhook` type. For more details on admission controllers, see the [Kubernetes guide on admission controllers][1].

## Requirements

- Datadog Cluster Agent v7.40+

## Configuration
{{< tabs >}}
{{% tab "Datadog Operator" %}}

To enable the Admission Controller for the Datadog Operator, set the parameter `features.admissionController.enabled` to `true` in your `DatadogAgent` configuration:

{{< code-block lang="yaml" filename="datadog-agent.yaml" disable_copy="false" >}}
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

{{< code-block lang="yaml" filename="datadog-values.yaml" disable_copy="false" >}}
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
| `socket`           | Inject Unix Domain Socket path in `DD_TRACE_AGENT_URL` environment variable and the volume definition to access the corresponding path. Inject URL to use to connect the Datadog Agent for DogStatsD metrics in `DD_DOGSTATSD_URL`.  |

**Note**: Pod-specific mode takes precedence over the global mode defined at the Admission Controller level.

## Troubleshooting

See [Admission Controller Troubleshooting][6].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: /tracing/trace_collection/library_injection_local/
[3]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm#setup
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[5]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[6]: /containers/troubleshooting/admission-controller
