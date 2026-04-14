---
title: Container Monitoring
description: An overview of Datadog's Container Monitoring UI capabilities.
---

After [installing the Datadog Agent][1], you can use Datadog Container Monitoring to visualize your container resources. For Kubernetes environments, you can also track resource utilization, automatically scale workloads, and investigate and remediate issues.

## Explore containers

{{< img src="infrastructure/livecontainers/live-containers-overview_2.png" alt="Live containers with summaries" width="80%" >}}

In Datadog, [**Containers Explorer**][2] provides real-time visibility into all of your containers. To configure this page, read the [Containers Explorer documentation][3].

## Explore container images

{{< img src="security/vulnerabilities/container_images.png" alt="The container images view highlighting vulnerabilities and container column sort feature" width="80%">}}

[**Container Images Explorer**][4] provides insights into every image used in your environment to help you assess your images' deployment footprint, including [Cloud Security][5] vulnerabilities. To configure this page, read the [Container Images Explorer documentation][6]. 

## Explore Kubernetes resources

{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Orchestrator Explorer, showing Kubernetes Pods." style="width:80%;">}}

[**Kubernetes Explorer**][7] allows you to monitor pods, clusters, workloads, and other Kubernetes resources. To configure this page, read the [Kubernetes Explorer documentation][8].

### Kubernetes Resource Utilization

Select the [**Resource Utilization**][9] tab in the Kubernetes section for insights into how compute resources are used across your infrastructure. For more information, read the [Kubernetes Resource Utilization documentation][10].

### Kubernetes Autoscaling

Select the [**Autoscaling**][11] tab in the Kubernetes section to view scaling recommendations and deploy autoscaling. For more information, read the [Autoscaling documentation][12].

### Kubernetes Remediation

Select the [**Remediation**][13] tab in the Kubernetes section to investigate and remediate errors with [Bits AI Dev Agent][14]. For more information, read the [Bits AI Kubernetes Remediation documentation][15].

{{< callout url="https://www.datadoghq.com/product-preview/kubernetes-remediation/"
 btn_hidden="false" header="Join the Preview!">}}
Automated fixes from Bits AI Kubernetes Remediation is in Preview. To sign up, click <strong>Request Access</strong> and complete the form.
{{< /callout >}}

## Explore Amazon Elastic Container Service (ECS) resources

{{< img src="infrastructure/livecontainers/orch_ecs_ex.png" alt="ECS Explorer displaying ECS tasks." style="width:80%;">}}

[**ECS Explorer**][16] allows you to monitor tasks, services, and other Amazon ECS components across your AWS accounts. To configure this page, read the [ECS Explorer documentation][17].


[1]: https://app.datadoghq.com/fleet/install-agent/latest?platform=overview
[2]: https://app.datadoghq.com/containers
[3]: /infrastructure/containers/explorer
[4]: https://app.datadoghq.com/container-images
[5]: /security/cloud_security_management
[6]: /infrastructure/containers/container_images/
[7]: https://app.datadoghq.com/orchestration/explorer
[8]: /infrastructure/containers/kubernetes_explorer
[9]: https://app.datadoghq.com/orchestration/resource/pod
[10]: /infrastructure/containers/kubernetes_resource_utilization
[11]: https://demo.datadoghq.com/orchestration/scaling/summary
[12]: /containers/monitoring/autoscaling
[13]: https://app.datadoghq.com/orchestration/remediation
[14]: /bits_ai/bits_ai_dev_agent
[15]: /containers/bits_ai_kubernetes_remediation/
[16]: https://app.datadoghq.com/orchestration/explorer/ecsTask
[17]: /infrastructure/containers/amazon_elastic_container_explorer