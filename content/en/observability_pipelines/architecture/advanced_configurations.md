---
title: Advanced Configurations
kind: Documentation
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

### Multiple aggregator deployments

As covered in [Networking][1], Datadog recommends to start with one Observability Pipelines Worker aggregator per region. This is to prevent overcomplicating your initial deployment of Observability Pipelines Worker, but there are circumstances where starting with multiple deployments is ideal:

1. **Prevent sending data over the public internet.** If you have multiple clouds and regions, deploy the Observability Pipelines Worker aggregator in each of them to prevent sending large amounts of data over the internet. Your Observability Pipelines Worker aggregator should receive internal data and serve as the single point of egress for your network.

2. **Independent management.** You have teams that can operate and manage an Observability Pipelines Worker aggregator independently for their use case. For example, your Data Science team may be responsible for operating their own infrastructure and has the means to independently operate their own Observability Pipelines Worker aggregator.

### Multiple cloud accounts

Many users have multiple cloud accounts with VPCs and clusters inside. Datadog still recommends in this case to deploy one Observability Pipelines Worker aggregator per region. Deploy Observability Pipelines Worker into your utility or tools cluster and configure all your cloud accounts to send data to this cluster. See [Networking][1] for more information.

### Pub-sub systems

Using a publish-subscribe (pub-sub) system such as Kafka is not required to make your architecture highly available or highly durable (see [High Availability and Disaster Recovery][2]), but they do offer the following advantages:

1. **Improved reliability.** Pub-sub systems are designed to be highly reliable and durable systems that change infrequently. They are especially reliable if you are using a managed option. The Observability Pipelines Worker is likely to change more often based on its purpose. Isolate Observability Pipelines Worker downtime behind a pub-sub system to increase availability from the perception of your clients and make recovery simpler.


2. **Load balancer not required.** Pub-sub systems eliminate the need for a load balancer. Your pub-sub system handles the coordination of consumers, making it easy to scale Observability Pipelines Worker horizontally.

#### Pub-sub partitioning

Partitioning, or "topics" in Kafka terminology, refers to separating data in your pub-sub systems. You should partition along data origin lines, such as the service or host that generated the data.

{{< img src="observability_pipelines/production_deployment_overview/partitioning.png" alt="A diagram showing an agent on a node, sending data to four services in a pub-sub that then sends the data to four Observability Pipelines Workers" style="width:55%;" >}}

#### Pub-sub configuration

When using a pub-sub system, Datadog recommends the following configuration changes for Observability Pipelines Worker:

- **Enable end-to-end acknowledgments for all sinks.** This setting ensures that the pub-sub checkpoint is not advanced until data is successfully written.
- **Use memory buffers.** There is no need to use Observability Pipelines Worker's disk buffers when it sits behind a pub-sub system. Your pub-sub system is designed for long-term buffering with high durability. Observability Pipelines Worker should only be responsible for reading, processing, and routing the data (not durability).

### Global aggregation

This section provides recommendations for performing global calculations for legacy destinations. Modern destinations already support global calculations. For example, Datadog supports distributions (such as DDSketch) that solve global observations of your metrics data.

Global aggregation refers to the ability to aggregate data for an entire region. For example, computing global quantiles for CPU load averages. To achieve this, a single Observability Pipelines Worker instance must have access to every node's CPU load average statistics. This is not possible with horizontal scaling; each individual Observability Pipelines Worker instance only has access to a slice of the overall data. Therefore, aggregation should be tiered.

{{< img src="observability_pipelines/production_deployment_overview/global_aggregation.png" alt="A diagram showing load balancers sending data to a tier one aggregator, which has multiple Observability Pipelines Workers, and then from tier one the data is sent to the tier two aggregator, which has one Worker" style="width:90%;" >}}

In the above diagram, the tier two aggregators receive an aggregated sub-stream of the overall data from the tier one aggregators. This allows a single instance to get a global view without processing the entire stream and introducing a single point of failure.

#### Recommendations

- Limit global aggregation to tasks that can reduce data, such as computing global histograms. Never send all data to your global aggregators.
- Continue to use your local aggregators to process and deliver most data so that you do not introduce a single point of failure.

[1]: /observability_pipelines/architecture/networking
[2]: /observability_pipelines/architecture/availability_disaster_recovery