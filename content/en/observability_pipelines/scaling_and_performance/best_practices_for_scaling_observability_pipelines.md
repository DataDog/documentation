---
title: Best Practices for Scaling Observability Pipelines
aliases:
    - /observability_pipelines/best_practices_for_scaling_observability_pipelines/
---

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## Overview

Deploy the Observability Pipelines Worker into your infrastructure, like you would any other service, to intercept, manipulate, and forward data to your destinations. Each Observability Pipelines Worker instance is designed to operate independently, allowing you to scale your architecture with load balancing.

This guide walks you through the recommended aggregator pattern for new Observability Pipelines Worker users, specifically:

- [Architecture models and approaches](#architecture)
- [Optimizing the instance](#optimize-the-instance) so you can horizontally scale the Observability Pipelines Worker aggregator.
- Starting points to estimate your resource capacity for [capacity planning and scaling](#capacity-planning-and-scaling) the Observability Pipelines Worker.

## Architecture

This section covers:

- Architecture models:
	- [VM-based model](#vm-based-architecture)
	- [Kubernetes-based model](#kubernetes-based-architecture)
- [Centralized vs decentralized approach](#centralized-vs-decentralized-approach)
- [Choosing a VM-based vs Kubernetes-based architecture](#choosing-a-vm-based-vs-kubernetes-based-architecture)

### Architecture models

There are two common architecture models:

- **Virtual-machine-based (VM-based) architecture**: A host-based model fronted by a load balancer.
- **Kubernetes-based architecture**: A container-based model that can optionally be fronted with an ingress controller or load balancer (for sources external to the cluster, a Kubernetes service handles internal cluster requests).

Both models can be applied to a centralized or decentralized approach. In a centralized approach, Workers operate on a global scale, across datacenters or regions. In a decentralized approach, Workers operate on a local scale, so in the region, datacenter, or cluster where the data source is located. For large scale environments spanning many datacenters, regions, or cloud provider accounts, a hybrid model may be appropriate.

Generally, Datadog recommends operating the Worker as close to the data source as possible. This might require more administrative and infrastructure overhead, but it reduces concerns about network transit issues and single point of failures.

For both models, Datadog recommends scaling Workers [horizontally][1] to handle increased load and maintain high availability. You can achieve this using a managed instance group (such as an autoscaling group) or horizontal pod autoscaling.

The Worker can also be scaled [vertically][2], which takes advantage of additional cores and memory without any additional configuration. For certain processors, such as the Sensitive Data Scanner processor with many rules enabled, or heavy processing use cases, the Worker benefits from additional cores to allow for parallel thread execution. When vertically scaling, Datadog recommends capping an instance's size to process no more than 33% of your total volume. This allows for high availability in the event of a node failure.

#### VM-based architecture

The following architecture diagram is for a host-based architecture, where a load balancer accepts traffic from push-based sources. If only pull-based sources are being used, a load balancer is not required. In the diagram, the Worker is part of a managed instance group that scales based on processing needs.

{{< img src="observability_pipelines/scaling_best_practices/vm-infra.png" alt="Diagram showing the Worker as part of a managed instance group" style="width:100%;" >}}

See [Observability Pipelines VM deployment](https://www.datadoghq.com/architecture/op-vm-deployment/) for more details.

#### Kubernetes-based architecture

The following architecture diagram is for a container-based architecture, where the Kubernetes service acts as the router to the statefulset and accepts traffic from push-based sources. If you are sending telemetry from outside the cluster, set the [service.type to `LoadBalancer`][3] or install an [ingress controller][4] and configure an [ingress][5] for routing. The Worker runs as part of a statefulset and supports horizontal pod autoscaling to adjust capacity based on processing needs. Like the VM-based architecture, Workers can also scale vertically and take advantage of multiple cores for parallel processing.

{{< img src="observability_pipelines/scaling_best_practices/containerized-infra.png" alt="Diagram showing the Worker as part of a statefulset" style="width:100%;" >}}

See [reference architecture for Kubernetes deployment](https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/) for more details.

### Choosing a VM-based vs Kubernetes-based architecture

Choose the Kubernetes-based architecture if:

- Your log sources are within a Kubernetes cluster and you want to use the decentralized approach
- Your organization uses Kubernetes heavily and is proficient with it

Choose the VM-based architecture if your organization is more VM centric and not proficient with Kubernetes.

Choosing between the two models comes down to what your organization is best equipped to do from an infrastructure perspective. Each model offers the ability to automatically scale based on CPU utilization, which is generally the primary constraint for Observability Pipelines. See [Optimize the instance][6] for more information.

### Centralized vs decentralized approach

Datadog recommends the decentralized approach of deploying the Workers as close to the data source as possible. This means placing Workers within each location where the data originates, such as the region, cluster, or datacenter. The decentralized model is better for environments with large volumes of data because it:

- Minimizes cross-region or cross-datacenter network transit
- Avoids potential performance issues related to inter-region or inter-account data transfer
- Helps reduce data transfer costs by keeping processing local to the data sources

A centralized deployment runs Workers in a single location, aggregating data from multiple regions, clusters, or datacenters. This approach works best for lower data volumes or when network peering already exists. Be aware that high-volume data transfers across regions or accounts may incur additional costs.

A hybrid model is a good compromise between the decentralized and centralized approaches, particularly for large wide-spread infrastructure deployments. For example, if you have six regions and in each region you have 10 Kubernetes clusters, rather than:

- Deploying Workers into each cluster, which results in 60 deployments
- Deploying Workers into one region and routing traffic across regions, which introduces a single point of failure

A hybrid approach uses a dedicated Kubernetes cluster or managed instance group in each region, resulting in only six deployments. The 10 clusters within each region send their data to the regional Observability Pipelines Worker (OPW) deployment.

## Optimize the instance

### Instance sizing

Based on performance benchmarking for a pipeline that is using 12 processors to transform data, the Worker can handle approximately 1 TB per vCPU per day. For example, if you have 4 TB of events per day, you should provision enough compute plus headroom to account for your volumes. This could be three two-core machines or containers, or one six-core machine or container. The Observability Pipelines Worker is almost always CPU constrained. CPU utilization is the strongest signal for autoscaling because CPU utilization metrics do not produce false positives. Datadog recommends deploying Workers as part of an autoscaling group or deployed with [Horizontal Pod Autoscaling][7] enabled. Do not rely on a statically configured number of VMs or containers. This helps ensure you can safely handle traffic spikes without data loss and maintain high availability if a Worker goes down.

For high throughput environments, Datadog recommends larger machine types because they typically have higher network bandwidth. Consult your cloud provider's documentation for details (for example, [Amazon EC2 instance network bandwith][8]).

| Cloud Provider| Recommendation (minimum) |
| ------------- | ------------------------ |
| AWS           | c7i.xlarge               |
| Azure         | F4s v2       	           |
| Google Cloud  | c2-standard-4            |

**Note**: 1 vCPU = 1 ARM physical CPU or 0.5 Intel physical CPU with hyperthreading.

### CPU sizing

Most Observability Pipelines Worker workloads are CPU constrained and benefit from modern CPUs.

| Cloud Provider| Recommendation                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Azure         | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Google Cloud  | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Private       | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |

### CPU architectures

Observability Pipelines Worker runs on modern x86 and ARM CPU architectures.

### Memory sizing

Due to Observability Pipelines Worker's affine type system, memory is rarely constrained for Observability Pipelines Worker workloads. Therefore, Datadog recommends ≥2 GiB of memory per vCPU minimum. Memory usage increases with the number of destinations due to the in-memory buffering and batching. If you have a lot of destinations, consider increasing the memory.

### Disk sizing

You need 500MB of disk space to install the Observability Pipelines Worker.

## Capacity planning and scaling

### Units for estimations

The following units are starting points for estimating your resource capacity, but can vary depending on your workload.

| Unit                  | Size      | Observability Pipelines Worker Throughput*|
| ----------------------| --------- | ----------------------------------------- |
| Unstructured log event| ~512 bytes| ~10 MiB/s/vCPU                            |
| Structured log event  | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*These numbers are conservative for estimation purposes. 1 vCPU = 1 ARM physical CPU and 0.5 Intel physical CPU.

### Scaling

#### Horizontal scaling

Horizontal scaling refers to distributing traffic across multiple Observability Pipelines Worker instances. Observability Pipelines Worker has a shared-nothing architecture and does not require leader nodes or any such coordination that could complicate scaling.

For push-based sources, front your Observability Pipelines Worker instances with a network load balancer and scale them up and down as needed.

A load balancer is not required for pull-based sources. Deploy Observability Pipelines Worker and scale it up and down as needed. Your publish-subscription system coordinates exclusive access to the data when Observability Pipelines Worker asks to read it.

##### Load balancing

A load balancer is only required for push-based sources, such as agents. You do not need a load balancer if you are exclusively using pull-based sources, such as Kafka.

###### Client-side load balancing

Client-side load balancing is not recommended. Client-side load balancing refers to clients doing the load balancing of traffic across multiple Observability Pipelines Worker instances. While this approach sounds simpler, it may be less reliable and more complicated because:

- Load balancing with proper failover is complex. Issues in this area are sensitive as they can result in data loss or incidents that disrupt your services. This is exacerbated if you are working with multiple types of clients.
- The point of the Observability Pipelines Worker aggregator is to shift responsibility away from your agents, and taking on load balancing helps to do that.

###### Load balancer types

Datadog recommends Layer 4 (L4) load balancers (network load balancers) since they support Observability Pipelines Worker's protocols (TCP, UDP, and HTTP). Even if you're exclusively sending HTTP traffic (Layer 7), Datadog recommends L4 load balancers for their performance and simplicity.

| Cloud Provider| Recommendation                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Internal Azure Load Balancer                                  |
| Google Cloud  | Internal TCP/UDP Network Load Balancer                        |
| Private       | HAProxy, NGINX, or another load balancer with layer-4 support |

###### Load balancer configurations

When configuring clients and load balancers, Datadog recommends the following general settings:

- Use a simple round-robin load balancing strategy.
- Do not enable cross-zone load balancing unless the traffic across zones is very imbalanced.
- Configure load balancers to use Observability Pipelines Worker's health API endpoint for target health.
- Ensure that your Observability Pipelines Worker instances automatically register or de-register as they scale.
- Enable keep-alive with no more than one minute idle timeout for both your clients and load balancers.
- If supported, enable connection concurrency and pooling on your agents. If that is not supported, consider the unified architecture which deploys Observability Pipelines Worker at the edge. Connection pooling ensures large volumes of data are spread across multiple connections to help balance traffic.

###### Load balancer hot spots

Load balancing hot spots occur when one or more Observability Pipelines Worker instance receives disproportionate traffic. Hot spots usually happen due to one of two reasons:

1. A substantial amount of traffic is being sent over a single connection.
2. Traffic in one availability zone is much higher than in the others.

In these cases, the following respective mitigation tactics are recommended:

1. Split large connections into multiple connections. Most clients allow connection concurrency and pooling that distributes data over multiple connections. This tactic allows your load balancer to distribute the connection across multiple Observability Pipelines Worker instances. If your client does not support this, consider the unified architecture, where Observability Pipelines Worker can be additionally deployed to the edge.
2. Enable cross-zone load balancing on your load balancer. Cross-zone balancing balances all availability zone traffic across all Observability Pipelines Worker instances.

#### Vertical scaling

Observability Pipelines Worker's concurrency model automatically scales to take advantage of all vCPUs. There are no concurrency settings or configuration changes required. When vertically scaling, Datadog recommends capping an instance's size to process no more than 50% of your total volume and deploying at least two Observability Pipelines Worker instances for high availability.

#### Auto-scaling

Auto-scaling should be based on average CPU utilization. For the vast majority of workloads, Observability Pipelines Worker is CPU constrained. CPU utilization is the strongest signal for auto-scaling since it does not produce false positives. Datadog recommends you use the following settings, adjusting as necessary:

- Average CPU with a 85% utilization target.
- A five minute stabilization period for scaling up and down.

[1]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#horizontal-scaling
[2]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#vertical-scaling
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L208-L209
[4]: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L238
[6]: /observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#optimize-the-instance
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
