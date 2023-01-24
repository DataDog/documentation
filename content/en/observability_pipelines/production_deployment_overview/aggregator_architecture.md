---
title: Aggregator Architecture
kind: Documentation
---

## Overview

The Observability Pipelines Worker's aggregator architecture deploys the Observability Pipelines Worker as a standalone service for centralized data processing and routing.

Deploy Observability Pipelines Worker into your infrastructure, like any other service to intercept and manipulate data, and then forward it to your destinations. Each Observability Pipelines Worker instance operates independently, so that you can scale the architecture with a simple load balancer.

This guide walks you through the recommended aggregator architecture for new Observability Pipelines Worker users. Specifically, these topics:

- [Configuring the Observability Pipelines Worker](#configuring-observability-pipelines-worker) to collect, process, and route data. 
- [Optimizing the instance](#optimizing-the-instance) so you can horizontally scale the Observability Pipelines Worker aggregator. 
- Starting points to estimate your resource capacity for [capacity planning](#capacity-planning).
- [Scaling](#scaling) the Observability Pipelines Worker.
- Determining your [network topology and configurations](#networking) for the Observability Pipelines Worker.
- Achieving [high durability](#high-durability) and [high availability](#high-availability).
- Using the Observability Pipelines Worker as part of your [disaster recovery](#disaster-recovery).
- More [advanced configurations](#advanced-configurations) for deploying multiple aggregators, publish-subscribe systems, and global aggregation.

 ## Requirements

| Type              | Minimum Value                                         			|
| ----------------- | ----------------------------------------------------------------- |
| CPU Cores         | ≥ 2 vCPUs (see [CPU sizing](#cpu-sizing))             			|
| CPU Architectures | X86_64, AMD64, ARM64, ARMHF, ARMv7                   		 		|
| Memory            | ≥ 2 GiB per vCPU (see [memory sizing](#memory-sizing))			|
| Disk              | ≥ 1 Gib, more for disk buffers (see [disk sizing](#disk-sizing))  |

 ## Install the Observability Pipelines Worker

 See the [Installation][1] documentation.

## Configuring the Observability Pipelines Worker

While your configuration may vary, it should follow the following primary goals.

### Collecting data

Make it easy to send data to your Observability Pipelines Worker aggregator by integrating as many sources as possible. It's not uncommon for Observability Pipelines Worker aggregators to have dozens of sources. Configure the source component as long as it supports your security and durability requirements. This enables users across your company to adopt the Observability Pipelines Worker aggregator, even if they are using legacy services.

### Processing data

Use the Observability Pipelines Worker aggregator for processing most of your data, so that the responsibility is shifted away from your agents. This reduces your dependence on them, making it easier to change agents later on. See [Working with Data][2] for more information on data processing.

### Routing data

#### Choose a system of record 

Separate your system of analysis (for example, Datadog) from your system of record (for example, AWS S3). This allows you to optimize them independently towards their respective goals.

## Optimizing the instance

### Instance sizing

Compute optimized instances with at least 8 vCPUs and 16 GiB of memory. These are ideal units for horizontally scaling the Observability Pipelines Worker aggregator. Observability Pipelines Worker can vertically scale and automatically take advantage of additional resources if you choose larger instances. Choose a size that allows for at least two Observability Pipelines Worker instances for your data volume to improve availability.

| Cloud Provider| Recommendation                                    	|
| ------------- | ----------------------------------------------------- |
| AWS           | c6i.2xlarge (recommended) or c6g.2xlarge          	|
| Azure         | f8                                                	|
| GCP           | c2 (8 vCPUs, 16 GiB memory)                       	|
| Private       | 8 vCPUs, 16 GiB of memory, local disk is not required	|

### CPU sizing

Most Observability Pipelines Worker workloads are CPU constrained and benefit from modern CPUs.

| Cloud Provider| Recommendation                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Azure         | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| GCP           | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |
| Private       | Latest generation Intel Xeon, 8 vCPUs (recommended), at least 4 vCPUs |

### CPU architectures

Observability Pipelines Worker runs on modern CPU architectures. X86_64 architectures offer the best return on performance for Observability Pipelines Worker.

### Memory sizing

Due to Observability Pipelines Worker's affine type system, memory is rarely constrained for Observability Pipelines Worker workloads. Therefore, Datadog recommends ≥2 GiB of memory per vCPU minimum. Memory usage increases with the number of sinks due to the in-memory buffering and batching. If you have a lot of sinks, consider increasing the memory or switching to disk buffers.

### Disk sizing

If you're using Observability Pipelines Worker's disk buffers for high durability (recommended), provision at least 36 GiB per vCPU of disk space. Following the recommendation of 8 vCPUs, provision 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs).

| Cloud Provider| Recommendation*                                               |
| ------------- | --------------------------------------------------------------|
| AWS           | EBS gp3, 36 GiB per vCPU, no additional IOPS or throughput    |
| Azure         | Ultra-disk or standard SSD, 36 GiB per vCPU                   |
| GCP           | Balanced or SSD persistent disks, 36 GiB per vCPU             |
| Private       | Network-based block storage equivalent, 36 GiB per vCPU       |

*The recommended sizes are calculated at Observability Pipelines Worker's 10 MiB/s/vCPU throughput for one hour. For example, an 8 vCPU machine would require 288 GiB of disk space (10 MiB * 60 seconds * 60 minutes * 8 vCPUs).

#### Disk types

Choose a disk type that optimizes for durability and recovery. For example, standard block storage is ideal because it is decoupled from the instance and replicates data across multiple disks for high durability. High-performance local drives are not recommended because their throughput exceeds Observability Pipelines Worker's needs, and their durability is reduced relative to block storage.

See [High durability](#high-durability) for more information on why disks are used in this architecture.

#### Operating systems and GCC

Choose a Linux-based operating system with glibc (GNU) ≥ 2.14 (released in 2011) if possible. Observability Pipelines Worker runs on other platforms, but this combination produces the best performance in Datadog's benchmarks.

## Capacity planning

### Units for estimations

The following units are starting points for estimating your resource capacity, but can vary depending on your workload.

| Unit                  | Size      | Observability Pipelines Worker Throughput*|
| ----------------------| --------- | ----------------------------------------- |
| Unstructured log event| ~512 bytes| ~10 MiB/s/vCPU                            |
| Structured log event  | ~1.5 KB   | ~25 MiB/s/vCPU                            |
| Metric event          | ~256 bytes| ~25 MiB/s/vCPU                            |
| Trace span event      | ~1.5 KB   | ~25 MiB/s/vCPU                            |

*These numbers are conservative for estimation purposes. 1 vCPU = 1 ARM physical CPU and 0.5 Intel physical CPU.

## Scaling

### Horizontal scaling

Horizontal scaling refers to distributing traffic across multiple Observability Pipelines Worker instances. Observability Pipelines Worker has a shared-nothing architecture and does not require leader nodes or any such coordination that could complicate scaling.

For push-based sources, front your Observability Pipelines Worker instances with a network load balancer and scale them up and down as needed.

A load balancer is not required for pull-based sources; deploy Observability Pipelines Worker and scale it up and down as needed. Your publish-subscription system coordinates exclusive access to the data when Observability Pipelines Worker asks to read it.

See [Advanced configurations](#advanced-configurations) for more information on mixed workloads (push and pull-based sources).

#### Load balancing

A load balancer is only required for push-based sources, such as agents. You do not need a load balancer if you are exclusively using pull-based sources, such as Kafka.

##### Client-side load balancing

Client-side load balancing is not recommended. Client-side load balancing refers to clients doing the load balancing of traffic across multiple Observability Pipelines Worker instances. While this approach sounds simpler, it may be less reliable and more complicated because:

- Load balancing with proper failover is complex. Issues in this area are sensitive as they can result in data loss or incidents that disrupt your services. This is exacerbated if you are working with multiple types of clients.
- The point of the Observability Pipelines Worker aggregator is to shift responsibility away from your agents and taking on load balancing helps to do that.

##### Load balancer types

Datadog recommends Layer 4 (L4) load balancers (network load balancers) since they support Observability Pipelines Worker's protocols (TCP, UDP, and HTTP). Even if you're exclusively sending HTTP traffic (Layer 7), Datadog recommends L4 load balancers for their performance and simplicity. 

| Cloud Provider| Recommendation                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Internal Azure Load Balancer                                  |
| GCP           | Internal TCP/UDP Network Load Balancer                        |
| Private       | HAProxy, Nginx, or another load balancer with layer-4 support |

##### Load balancer configurations

When configuring clients and load balancers, Datadog recommends the following general settings:

- Use a simple round-robin load balancing strategy.
- Do not enable cross-zone load balancing unless the traffic across zones is very imbalanced.
- Configure load balancers to use Observability Pipelines Worker's health API endpoint for target health.
- Ensure that your Observability Pipelines Worker instances automatically register or de-register as they scale. See [service discovery](#dns-and-service-discovery) for more information).
- Enable keep-alive with no more than one minute idle timeout for both your clients and load balancers.
- If supported, enable connection concurrency and pooling on your agents. If that is not supported, consider the unified architecture which deploys Observability Pipelines Worker at the edge. Connection pooling ensures large volumes of data are spread across multiple connections to help balance traffic.

##### Load balancer hot spots

Load balancing hot spots occur when one or more Observability Pipelines Worker instance receives disproportionate traffic. Hot spots usually happen due to one of two reasons:

1. A substantial amount of traffic is being sent over a single connection.
2. Traffic in one availability zone is much higher than in the others.

In these cases, the following respective mitigation tactics are recommended:

1. Split large connections into multiple connections. Most clients allow connection concurrency and pooling that distributes data over multiple connections. This tactic allows your load balancer to distribute the connection across multiple Observability Pipelines Worker instances. If your client does not support this, consider the unified architecture, where Observability Pipelines Worker can be additionally deployed to the edge.
2. Enable cross-zone load balancing on your load balancer. Cross-zone balancing balances all availability zone traffic across all Observability Pipelines Worker instances.

### Vertical scaling

Observability Pipelines Worker's concurrency model automatically scales to take advantage of all vCPUs. There are no concurrency settings or configuration changes required. When vertically scaling, Datadog recommends capping an instance's size to process no more than 50% of your total volume and deploying at least two Observability Pipelines Worker instances for high availability.

### Autoscaling

Autoscaling should be based on average CPU utilization. For the vast majority of workloads, Observability Pipelines Worker is CPU constrained. CPU utilization is the strongest signal for autoscaling since it does not produce false positives. Datadog recommends you use the following settings, adjusting as necessary:

- Average CPU with a 85% utilization target.
- A five minute stabilization period for scaling up and down.

## Networking

### Network topology

#### Network boundaries

Most users have complex production environments with many network boundaries, including multiple clouds, regions, VPCs, and clusters. It can get complicated when determining where Observability Pipelines Worker fits within those boundaries. Therefore, Datadog recommends starting with one Observability Pipelines Worker aggregator per region, even if you have multiple accounts, VPCs, and clusters. This boundary is the broadest networking granularity that avoids sending data over the public internet. If you have multiple clusters, deploy Observability Pipelines Worker into your utility or tools cluster, or pick a cluster that is most appropriate for shared services.

As your Observability Pipelines Worker usage increases, it can then become clear where multiple Observability Pipelines Worker deployments fit in.

See [Advanced configurations](#advanced-configurations) for more information on multiple deployments.

#### DNS and service discovery

Your organization may have adopted some form of service discovery, even if it's facilitated through basic DNS. Discovery of your Observability Pipelines Worker aggregators and services should resolve through your service discovery mechanism.

Service discovery allows you to configure your agents with named hostnames (not static IP addresses), facilitating routing and load balancing of your traffic. This is how your agents discover your load balancers and how your load balancers discover your Observability Pipelines Worker aggregators.

Observability Pipelines Worker itself does not resolve DNS queries and delegates this to a system-level resolver (for example, [Linux resolving][3]).

### Network traffic

#### Proxies

Observability Pipelines Worker offers a global proxy option to route all outgoing HTTP traffic through a proxy. Whether you use a proxy depends on your organization's security and networking preferences.

#### Ports

The Observability Pipelines Worker requires all ports to be explicitly configured for easy discovery by network administrators. Therefore, by viewing Observability Pipelines Worker's configuration file you get a complete inventory of every port exposed. The Observability Pipelines Worker aggregator ships with a default configuration that exposes the following ports:

| Port | Source         | Protocol  | Direction| Description                            |
| ---  | -------------- | ----------| -------- | ---------------------------------------|
| 8282 | Datadog Agent  | HTTP      | Incoming | Accepts data from the fluent source.   |
| 123  | Files          | Syslog    | Incoming | Accepts data from the Syslog source.   |

Be sure to review your Observability Pipelines Worker configuration for the exact ports exposed, as your administrator may have changed them.

#### Protocols

The Observability Pipelines Worker is designed to receive and send data over a variety of protocols. Datadog recommends using the protocol best supported for your integration. Choose HTTP-based protocols for their application-level delivery acknowledgments and ubiquitous support across platforms when possible. Otherwise, choose TCP-based protocols. UDP is not recommended, as there is risk of losing data. 

##### Worker-to-worker communication

Use the Observability Pipelines Worker source and sink to send data between Observability Pipelines Worker instances (for example, with the unified architecture). These sources use the GRPC protocol for efficient lossless communication.

##### Agent communication

The Observability Pipelines Worker provides specific sources for many agents. For example, the datadog_agent source handles receiving all data types from the Datadog Agent in a lossless structured format.

#### Compression

Compression can impose a 50% decrease in throughput based on Datadog benchmarks. Use compression with caution and monitor performance after enabling.

Compression of network traffic should only be used for cost-sensitive egress scenarios due to its impact on performance (for example, sending data over the public internet). Therefore, compression is not recommended for internal network traffic.

## High durability

High durability is the ability to retain data when there are system failures. The aggregator architecture is designed to take on the responsibility of high durability. This simplifies your durability strategy by shifting the burden away from your agents and localizing it to your aggregators. In addition, this concentrated approach allows for durability strategies that would be difficult to implement across all of your agent nodes.

To achieve high durability:

1. Configure your agents to be simple data forwarders and stream data directly to your Observability Pipelines Worker aggregator. This reduces the amount of time your data is exposed to loss at the edge since it is not yet redundant.

2. Choose a highly durable destination that serves as your system of record (for example, AWS S3). This system is responsible for the durability of data at rest and commonly referred to as archives or data lakes.

Finally, configure the Observability Pipelines Worker sink(s) that writes to your system of record to enable [end-to-end acknowledgments](#using-end-to-end-acknowledgment) and disk buffers. For example:

```
sinks:
	aws_s3:
		acknowledgments: true
		buffer:
			type: "disk"
```

## Preventing data loss

### Using end-to-end acknowledgment

An issue with the Observability Pipelines Worker operating system process could risk losing data held in memory during the time of the issue. Enable Observability Pipelines Worker's end-to-end acknowledgment feature to mitigate the risk of losing data:

```
sinks:
	aws_s3:
		acknowledgments: true
```

With this feature enabled, Observability Pipelines Worker does not respond to agents until the data has been durably persisted. This prevents the agent from releasing the data prematurely and sending it again if an acknowledgment has not been received.

### Handling node failures

Node failures deal with the full failure of an individual node. These can also be addressed using end-to-end acknowledgements. See [Using end-to-end acknowledgment](#using-end-to-end-acknowledgment) for more details.

### Handling disk failures

Disk failures deal with the failure of an individual disk. Data loss related to disk failures can be mitigated by using a highly durable file system where data is replicated across multiple disks, such as block storage (for example, AWS EBS).

### Handling data processing failures

The Observability Pipelines Worker can have problems, such as failing to parse a log, when trying to process malformed data. There are two ways to mitigate this issue:

1. **Direct archiving**: Route data directly from your sources to your archive. This ensures that data makes it to your archive without risk of being dropped. In addition, this data can be replayed after correcting the processing error.

2. **Failed event routing**: The Observability Pipelines Worker offers failed event routing for users who wish to archive processed data, such as structured and enriched data. Certain Observability Pipelines Worker transforms come with a dropped output that can be connected to a sink for durability and replay.

#### Which strategy is best?

If durability is the most important criteria, use the direct archiving method because it addresses data loss scenarios. Use the failed event routing method, also commonly referred to as a data lake, if you prefer to analyze data in your archive. It has the advantage of using your archive/data lake for long-term analysis. Datadog [Log Archives][4] and AWS Athena are examples of archive storage solutions.

### Handling destination failures

Destination failures refer to the total failure of a downstream destination (for example, Elasticsearch). Data loss can be mitigated for issues with the downstream destination by using disk buffers large enough to sustain the outage time. This allows data to durably buffer while the service is down and then drain when the service comes back up. For this reason, disk buffers large enough to hold at least one hour's worth of data are recommended. See [disk sizing](#disk-sizing) for more details.

## High availability

High availability refers to Observability Pipelines Worker remaining available if there are any system issues.

To achieve high durability:

1. Deploy at least two Observability Pipelines Worker instances in each Availability Zone.
2. Deploy Observability Pipelines Worker in at least two Availability Zones.
3. Front your Observability Pipelines Worker instances with a load balancer that balances traffic across Observability Pipelines Worker instances. See the horizontal scaling section for more information.

### Mitigating failure scenarios

#### Handling Observability Pipelines Worker process issues

To mitigate a system process issue, distribute the Observability Pipelines Worker across multiple nodes and front them with a network load balancer that can redirect traffic to another Observability Pipelines Worker instance as needed. In addition, platform-level automated self-healing should eventually restart the process or replace the node.

#### Mitigating node failures

To mitigate node issues, distribute the Observability Pipelines Worker across multiple nodes and front them with a network load balancer that can redirect traffic to another Observability Pipelines Worker node. In addition, platform-level automated self-healing should eventually replace the node.

#### Handling availability zone failures

To mitigate issues with availability zones, deploy the Observability Pipelines Worker across multiple availability zones.

#### Mitigating region failures

Observability Pipelines Worker is designed to route internal observability data, and it should not failover to another region. Instead, Observability Pipelines Worker should be deployed in all of your regions as recommended in the [network boundaries](#network-boundaries) section. Therefore, if your entire network or region fails, Observability Pipelines Worker would fail with it.

## Disaster recovery

### Internal disaster recovery

Observability Pipelines Worker is an infrastructure-level tool designed to route internal observability data. It implements a shared-nothing architecture and does not manage state that should be replicated or transferred to a disaster recovery (DR) site. Therefore, if your entire region fails, Observability Pipelines Worker would fail with it. Therefore, you should install the Observability Pipelines Worker in your DR site as part of your broader DR plan.

### External disaster recovery

If you're using a managed destination, such as Datadog, Observability Pipelines Worker can facilitate automatic routing data to your Datadog DR site using Observability Pipelines Worker's circuit breaker feature.

## Advanced configurations

### Multiple aggregator deployments

As covered in [network boundaries](#network-boundaries), Datadog recommends to start with one Observability Pipelines Worker aggregator per region. This is to prevent overcomplicating your initial deployment of Observability Pipelines Worker, but there are circumstances where starting with multiple deployments is ideal:

1. **Prevent sending data over the public internet.** If you have multiple clouds and regions, deploy the Observability Pipelines Worker aggregator in each of them to prevent sending large amounts of data over the internet. Your Observability Pipelines Worker aggregator should receive internal data and serve as the single point of egress for your network.

2. **Independent management.** You have teams that can operate and manage an Observability Pipelines Worker aggregator independently for their use case. For example, your Data Science team may be responsible for operating their own infrastructure and has the means to independently operate their own Observability Pipelines Worker aggregator.

### Multiple cloud accounts

Many users have multiple cloud accounts with VPCs and clusters inside. Datadog still recommends in this case to deploy one Observability Pipelines Worker aggregator per region. Deploy Observability Pipelines Worker into your utility or tools cluster and configure all your cloud accounts to send data to this cluster. See [network boundaries](#network-boundaries) for more information.

### Publish-subscribe (pub-sub) systems

Using a pub-sub system such as Kafka is not required to make your architecture highly available or highly durable (see the high durability and high availability sections), but they do offer the following advantages:

1. **Improved reliability.** Pub-sub systems are designed to be highly reliable and durable systems that change infrequently. They are especially reliable if you are using a managed option. The Observability Pipelines Worker is likely to change more often based on its purpose. Isolate Observability Pipelines Worker downtime behind a pub-sub system to increase availability from the perception of your clients and make recovery simpler.


2. **Load balancer not required.** Pub-sub systems eliminate the need for a load balancer. Your pub-sub system handles the coordination of consumers, making it easy to scale Observability Pipelines Worker horizontally.

#### Pub-sub partitioning

Partitioning, or "topics" in Kafka terminology, refers to separating data in your pub-sub systems. You should partition along data origin lines, such as the service or host that generated the data.

#### Pub-sub configuration

When using a pub-sub system, Datadog recommends the following configuration changes for Observability Pipelines Worker:

- **Enable end-to-end acknowledgements for all sinks.** This setting ensures that the pub-sub checkpoint is not advanced until data is successfully written.
- **Use memory buffers.** There is no need to use Observability Pipelines Worker's disk buffers when it sits behind a pub-sub system. Your pub-sub system is designed for long-term buffering with high durability. Observability Pipelines Worker should only be responsible for reading, processing, and routing the data (not durability).

### Global aggregation

This section provides recommendations for performing global calculations for legacy destinations. Modern destinations already support global calculations. For example, Datadog supports distributions (such as DDSketch) that solve global observations of your metrics data.

Global aggregation refers to the ability to aggregate data for an entire region. For example, computing global quantiles for CPU load averages. To achieve this, a single Observability Pipelines Worker instance must have access to every node's CPU load average statistics. This is not possible with horizontal scaling; each individual Observability Pipelines Worker instance only has access to a slice of the overall data. Therefore, aggregation should be tiered.

The structure is that tier two aggregators receive an aggregated sub-stream of the overall data from tier one aggregators. This allows a single instance to get a global view without processing the entire stream and introducing a single point of failure.

#### Recommendations

- Limit global aggregation to tasks that can reduce data, such as computing global histograms. Never send all data to your global aggregators.
- Continue to use your local aggregators to process and deliver most data so that you do not introduce a single point of failure.

[1]: /observability_pipelines/installation/
[2]: /observability_pipelines/working_with_data/
[3]: https://wiki.archlinux.org/title/Domain_name_resolution
[4]: /logs/log_configuration/archives
