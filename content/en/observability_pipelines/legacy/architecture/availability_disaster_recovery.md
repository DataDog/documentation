---
title: (LEGACY) High Availability and Disaster Recovery
kind: Documentation
aliases:
  - /observability_pipelines/architecture/availability_disaster_recovery/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

In the context of Observability Pipelines, high availability refers to the Observability Pipelines Worker remaining available if there are any system issues.

{{< img src="observability_pipelines/production_deployment_overview/high_availability.png" alt="A diagram showing availability zone one with load balancer one offline, and both agents sending data to load balancer two and then to Worker one and Worker two. In availability zone two, Worker three is down, so both load balancers are sending data to Worker N" style="width:65%;" >}}

To achieve high availability:

1. Deploy at least two Observability Pipelines Worker instances in each Availability Zone.
2. Deploy Observability Pipelines Worker in at least two Availability Zones.
3. Front your Observability Pipelines Worker instances with a load balancer that balances traffic across Observability Pipelines Worker instances. See [Capacity Planning and Scaling][1] for more information.

## Mitigating failure scenarios

### Handling Observability Pipelines Worker process issues

To mitigate a system process issue, distribute the Observability Pipelines Worker across multiple nodes and front them with a network load balancer that can redirect traffic to another Observability Pipelines Worker instance as needed. In addition, platform-level automated self-healing should eventually restart the process or replace the node.

{{< img src="observability_pipelines/production_deployment_overview/process_failure.png" alt="A diagram showing three nodes, where each node has an Observability Pipelines Worker" style="width:45%;" >}}

### Mitigating node failures

To mitigate node issues, distribute the Observability Pipelines Worker across multiple nodes and front them with a network load balancer that can redirect traffic to another Observability Pipelines Worker node. In addition, platform-level automated self-healing should eventually replace the node.

{{< img src="observability_pipelines/production_deployment_overview/node_failure.png" alt="A diagram showing data going to node one's load balancer, but because the Observability Pipelines Worker is down in node one, the data is sent to the Workers in node two and node N" style="width:40%;" >}}

### Handling availability zone failures

To mitigate issues with availability zones, deploy the Observability Pipelines Worker across multiple availability zones.

{{< img src="observability_pipelines/production_deployment_overview/availability_zone_failure.png" alt="A diagram showing the load balancers and Observability Pipelines Worker down in availability zone one, but load balancers and Workers in zone N still receiving and sending data" style="width:45%;" >}}

### Mitigating region failures

Observability Pipelines Worker is designed to route internal observability data, and it should not failover to another region. Instead, Observability Pipelines Worker should be deployed in all of your regions. Therefore, if your entire network or region fails, Observability Pipelines Worker would fail with it. See [Networking][2] for more information.

## Disaster recovery

### Internal disaster recovery

Observability Pipelines Worker is an infrastructure-level tool designed to route internal observability data. It implements a shared-nothing architecture and does not manage state that should be replicated or transferred to a disaster recovery (DR) site. Therefore, if your entire region fails, Observability Pipelines Worker would fail with it. Therefore, you should install the Observability Pipelines Worker in your DR site as part of your broader DR plan.

### External disaster recovery

If you're using a managed destination, such as Datadog, Observability Pipelines Worker can facilitate automatic routing of data to your Datadog DR site using Observability Pipelines Worker's circuit breaker feature.

{{< img src="observability_pipelines/production_deployment_overview/external_disaster_recovery.png" alt="A diagram showing Observability Pipelines Workers in different zones, and all sending data to the same disaster recovery destination" style="width:75%;" >}}

[1]: /observability_pipelines/legacy/architecture/capacity_planning_scaling
[2]: /observability_pipelines/legacy/architecture/networking