---
title: Troubleshooting Data Streams Monitoring
kind: documentation
description: Troubleshoot Data Streams Monitoring
---

{{% site-region region="gov,ap1" %}}
<div class="alert alert-warning">
    Data Streams Monitoring is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}
  

This page explains common issues with setting up and using Data Streams Monitoring, and how to resolve them. Datadog recommends staying up to date with the latest version of the Datadog tracing libraries you use, as each release contains improvements and fixes.

## Diagnosing common problems
### Services aren't showing up in the DSM Map

If you do not see your services in the DSM Map or Overview page after following the [setup instructions][1], ensure these requirements are met: 
* You're running the Datadog Agent v7.34.0 or later.
* Your service is directly producing or consuming from Kafka or RabbitMQ.
* You're running the following tracing library agent versions:
   * Java: Agent v1.9.0 or later
   * .NET: Tracer v2.28.0 or later (.NET Core, .NET Framework)
   * Go (manual instrumentation): Data Streams Library v0.2 or later

  
### End-to-end latency metric doesn't look accurate

Latency calculations on a pathway require messages traversing through the pathway to be single threaded. If the messages in your data pipelines are multi-threaded, manual instrumentation is required, which is currently available for [Go applications][2] and [Java applications][3]. If you require manual instrumentation for .NET, contact [Support][8].

In the Pathways tab, if you see the message **latency values may be approximate for these pathways**, view the documentation for [instrumentation guidelines][4].

  
### Kafka metrics are missing
If your application is running in Java, ensure you're running version v1.9.0 or later of the Java Agent, and that both the producer and the consumer services are instrumented.

If your applications are running in .NET or Go, the [Kafka Consumer Integration][5] is required for the Kafka metrics to populate.

### RabbitMQ metrics are missing
Ensure the [RabbitMQ integration][6] is set up correctly.
  
### Queue metrics are missing
The [Kafka integration][7] must be set up for self-hosted, MSK, and Confluent Platform/Cloud environments for metrics to populate on the Queue tab.
 
### Cluster tag is not appearing
The cluster tag is set differently depending on the environment:  
* Self-hosted Kafka: The `kafka_cluster` tag must be added to the configuration of your agent running in the same cluster as your Kafka brokers, with the key set to `kafka_cluster` and value set to your cluster name.
* Amazon MSK: Cluster information is automatically propagated to DSM if the [MSK Integration][9] is turned on. MSK sends the cluster to DSM as `cluster_name`.
* Confluent Cloud: Cluster information is automatically propagated to DSM if the [Confluent Cloud Integration][10] is set up on the cluster you instrumented with DSM. 
* Confluent Platform: Similar to self-hosted Kafka above, the `kafka_cluster` tag must be added to your agent configuration. 
  
[1]: /data_streams/#setup  
[2]: /data_streams/go/
[3]: https://github.com/DataDog/dd-trace-java/blob/76f25aedf70254cb04d55eedbed6e12921c6e509/dd-trace-api/src/main/java/datadog/trace/api/experimental/DataStreamsCheckpointer.java#L25
[4]: /data_streams/#setup
[5]: /integrations/kafka/?tab=host#kafka-consumer-integration
[6]: /integrations/rabbitmq/?tab=host
[7]: /integrations/kafka/?tab=host
[8]: /help/
[9]: https://docs.datadoghq.com/integrations/amazon_msk/ 
[10]: https://docs.datadoghq.com/integrations/confluent_cloud/
