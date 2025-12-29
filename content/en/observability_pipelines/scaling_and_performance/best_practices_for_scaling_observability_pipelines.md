---
title: Best Practices for Scaling Observability Pipelines
aliases:
    - /observability_pipelines/best_practices_for_scaling_observability_pipelines/
---

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## Overview

Deploy Observability Pipelines Worker into your infrastructure like any other service to intercept and manipulate data, and then forward it to your destinations. Each Observability Pipelines Worker instance operates independently, so that you can scale the architecture with a simple load balancer.

This guide walks you through the recommended aggregator architecture for new Observability Pipelines Worker users. Specifically these topics:

- [Optimizing the instance](#optimize-the-instance) so you can horizontally scale the Observability Pipelines Worker aggregator.
- Starting points to estimate your resource capacity for [capacity planning and scaling](#capacity-planning-and-scaling) the Observability Pipelines Worker.

## Optimize the instance

### Instance sizing

Based on performance benchmarking for a pipeline that is using 12 processors to transform data, the Worker can handle approximately 1 TB per vCPU per day. For example, if you have 4 TB of events per day, you should provision enough compute plus headroom to account for your volumes. This could be three two-core machines or containers, or one six-core machine or container. Datadog recommends deploying Workers as part of an autoscaling group or deployed with [Horizontal Pod Autoscaling][1] enabled. Do not rely on a statically configured number of VMs or containers. This ensures that if the number of events spike, you can safely handle the traffic without data loss. It also ensures high availability should a Worker go down for any reason.

For high throughput environments, Datadog recommends larger machine types because they typically have higher network bandwidth. Consult your cloud provider's documentation for details (for example, [Amazon EC2 instance network bandwith][2]).

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

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="A diagram showing a cloud region broken down into agents, network load balancers, and an Observability Pipelines Worker aggregator, and the data from the agents are sent to the load balancer, Observability Pipelines Workers, and then to other destinations" style="width:60%;" >}}

A load balancer is not required for pull-based sources. Deploy Observability Pipelines Worker and scale it up and down as needed. Your publish-subscription system coordinates exclusive access to the data when Observability Pipelines Worker asks to read it.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_pull.png" alt="A diagram showing a cloud region broken down into agents, brokers, and an Observability Pipelines aggregator. Data from the agents are sent to the brokers, and then sent and received between the broker and the Observability Pipelines Workers, and then sent from the Workers out to the other destinations" style="width:60%;" >}}

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

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
