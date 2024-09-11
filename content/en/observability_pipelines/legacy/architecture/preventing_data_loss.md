---
title: (LEGACY) Preventing Data Loss
aliases:
  - /observability_pipelines/architecture/preventing_data_loss/
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Observability Pipelines is not available on the US1-FED Datadog site.</div>
{{< /site-region >}}

<div class="alert alert-info">
This guide is for large-scale production-level deployments.
</div>

## High durability

High durability is the ability to retain data when there are system failures. The aggregator architecture is designed to take on the responsibility of high durability. This simplifies your durability strategy by shifting the burden away from your agents and localizing it to your aggregators. In addition, this concentrated approach allows for durability strategies that would be difficult to implement across all of your agent nodes.

{{< img src="observability_pipelines/production_deployment_overview/high_durability.png" alt="A diagram showing the Observability Pipelines Worker sending data to a replicated block storage" style="width:100%;" >}}

To achieve high durability:

1. Configure your agents to be simple data forwarders and stream data directly to your Observability Pipelines Worker aggregator. This reduces the amount of time your data is exposed to loss at the edge since it is not yet redundant.

2. Choose a highly durable destination that serves as your system of record (for example, Amazon S3). This system is responsible for the durability of data at rest and is commonly referred to as archives or data lakes.

Finally, configure the Observability Pipelines Worker sinks that write to your system of record to enable [end-to-end acknowledgments](#using-end-to-end-acknowledgment) and disk buffers. For example:

```
sinks:
	aws_s3:
		acknowledgments: true
		buffer:
			type: "disk"
```

## Data loss prevention guidelines

### Using end-to-end acknowledgment

An issue with the Observability Pipelines Worker operating system process could risk losing data held in memory during the time of the issue. Enable Observability Pipelines Worker's end-to-end acknowledgment feature to mitigate the risk of losing data:

```
sinks:
	aws_s3:
		acknowledgments: true
```

With this feature enabled, Observability Pipelines Worker does not respond to agents until the data has been durably persisted. This prevents the agent from releasing the data prematurely and sending it again if an acknowledgment has not been received.

{{< img src="observability_pipelines/production_deployment_overview/end_to_end_acknowledgments.png" alt="A diagram showing acknowledgments sent from the Observability Pipelines Worker's source back to the client" style="width:100%;" >}}

### Handling node failures

Node failures deal with the full failure of an individual node. These can also be addressed using end-to-end acknowledgments. See [Using end-to-end acknowledgment](#using-end-to-end-acknowledgment) for more details.

### Handling disk failures

Disk failures deal with the failure of an individual disk. Data loss related to disk failures can be mitigated by using a highly durable file system where data is replicated across multiple disks, such as block storage (for example, Amazon EBS).

### Handling data processing failures

The Observability Pipelines Worker can have problems, such as failing to parse a log, when trying to process malformed data. There are two ways to mitigate this issue:

1. **Direct archiving**: Route data directly from your sources to your archive. This ensures that data makes it to your archive without risk of being dropped. In addition, this data can be replayed after correcting the processing error.

2. **Failed event routing**: The Observability Pipelines Worker offers failed event routing for users who wish to archive processed data, such as structured and enriched data. Certain Observability Pipelines Worker transforms come with a dropped output that can be connected to a sink for durability and replay.

#### Which strategy is best?

If durability is the most important criteria, use the direct archiving method because it addresses data loss scenarios. Use the failed event routing method, also commonly referred to as a data lake, if you prefer to analyze data in your archive. It has the advantage of using your archive/data lake for long-term analysis. Datadog [Log Archives][1] and Amazon Athena are examples of archive storage solutions.

### Handling destination failures

Destination failures refer to the total failure of a downstream destination (for example, Elasticsearch). Data loss can be mitigated for issues with the downstream destination by using disk buffers large enough to sustain the outage time. This allows data to durably buffer while the service is down and then drain when the service comes back up. For this reason, disk buffers large enough to hold at least one hour's worth of data are recommended. See [Optimizing the Instance][2] for more details.

[1]: /logs/log_configuration/archives
[2]: /observability_pipelines/legacy/architecture/optimize