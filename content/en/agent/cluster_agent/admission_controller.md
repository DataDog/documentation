---
title: Datadog Admission Controller
kind: documentation
further_reading:
- link: "/agent/cluster_agent/clusterchecks/"
  tag: "Documentation"
  text: "Running Cluster Checks with Autodiscovery"
- link: "/agent/cluster_agent/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting the Datadog Cluster Agent"
---

## Overview
The Datadog admission controller is a component of the Datadog Cluster Agent. The main benefit of the admission controller is to simplify the user's application pod configuration. For that, It has two main functionalities:

- Inject environment variables (`DD_AGENT_HOST` and `DD_ENTITY_ID`) to configure DogStatsD and APM tracer libraries into the user's application containers.
- Inject Datadog standard tags (`env`, `service`, `version`) from application labels into the container environment variables.

Datadog's admission controller is `MutatingAdmissionWebhook` type. For more details on admission controllers, see the [Kubernetes guide][1].

## Requirements

- Datadog Cluster Agent v1.7.0+

## Configuration

### Helm chart

To enable the admission controller for Helm chart, set the parameter `clusterAgent.admissionController.enabled` to `true`:

{{< code-block lang="yaml" filename="values.yaml" disable_copy="true" >}}
[...]
 clusterAgent:
[...]
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
[...]
{{< /code-block >}}

### Datadog operator

To enable the admission controller for the Datadog operator, set the parameter `clusterAgent.config.admissionController.enabled` to `true` in the custom resource:

```yaml
[...]
 clusterAgent:
[...]
    config:
      admissionController:
        enabled: true
        mutateUnlabelled: false
[...]
```

### APM and DogStatsD

To configure DogstatsD clients and APM tracers automatically, inject the environment variables `DD_AGENT_HOST` and `DD_ENTITY_ID` by using one of the following:

- Add the label `admission.datadoghq.com/enabled: "true"` to your pod.
- Configure the Cluster Agent admission controller by setting `mutateUnlabelled: true`.

To prevent pods from receiving environment variables, add the label `admission.datadoghq.com/enabled: "false"`. This works even if you set `mutateUnlabelled: true`.

Possible options:

| mutateUnlabelled | Pod label                               | Injection |
|------------------|-----------------------------------------|-----------|
| `true`           | No label                                | Yes       |
| `true`           | `admission.datadoghq.com/enabled=true`  | Yes       |
| `true`           | `admission.datadoghq.com/enabled=false` | No        |
| `false`          | No label                                | No        |
| `false`          | `admission.datadoghq.com/enabled=true`  | Yes       |
| `false`          | `admission.datadoghq.com/enabled=false` | No        |

#### Notes

- The admission controller needs to be deployed and configured before the creation of new application pods. It cannot update pods that already exist.
- The admission controller doesn't inject the environment variables `DD_VERSION, DD_ENV`, and `DD_SERVICE` if they already exist.
- To disable the admission controller injection feature, use the Cluster Agent configuration: `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`
- By using the Datadog admission controller, users can skip configuring the application pods using downward API ([step 2 in Kubernetes Trace Collection setup][2]).


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/blog/2019/03/21/a-guide-to-kubernetes-admission-controllers/
[2]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=helm#setup
