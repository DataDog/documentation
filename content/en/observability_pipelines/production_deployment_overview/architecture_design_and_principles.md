---
title: Architecture Design and Principles
kind: Documentation
---

## Overview

When you start deploying Observability Pipelines Worker into your infrastructure, you may run into questions such as: 

- Where should the Observability Pipelines Worker be deployed within the network?
- How should the data be collected?
- Where should the data be processed?

This guide walks you through what to consider when designing your Observability Pipelines Worker architecture, specifically these topics:

- [Networking](#networking)
- [Collecting data](#collecting-data)
- [Processing data](#processing-data)
- [Buffering data](#buffering-data)
- [Routing data](#routing-data)

## Networking

The first step to architecting your Observability Pipelines Worker deployment is understanding where Observability Pipelines Worker fits within your network and where to deploy it.

### Working with network boundaries

When deploying the Observability Pipelines Worker as an aggregator, it should be deployed within your network boundaries to minimize egress costs. Ingress into the Observability Pipelines Worker should never travel over the public internet. Therefore, Datadog recommends starting with one aggregator per region to keep things simple.

### Using firewalls and proxies

When using firewalls, restrict agent communication to your aggregators and restrict aggregator communication to your configured sources and sinks.

If you prefer to use a HTTP proxy, Observability Pipelines Worker offers a global proxy option to route all Observability Pipelines Worker HTTP traffic through a proxy.

### Using DNS and service discovery

Discovery of your Observability Pipelines Worker aggregators and services should resolve through DNS or service discovery. This strategy facilitates routing and load balancing of your traffic, and is how your agents and load balancers discover your aggregators. For proper separation of concerns, the Observability Pipelines Worker does not resolve DNS queries and, instead, delegates this to a system-level resolver (for example, [Linux resolving][1]).

### Choosing protocols

When sending data to the Observability Pipelines Worker, Datadog recommends choosing a protocol that allows easy load-balancing and application-level delivery acknowledgment. HTTP and gRPC are preferred due to their ubiquitous nature and the amount of available tools and documentation to help operate HTTP/gRPC-based services effectively and efficiently.

Choose the source that aligns with your protocol. Each Observability Pipelines Worker source implements different protocols. For example, Observability Pipelines Worker sources and sinks use gRPC for inter-Observability Pipelines Worker communication, and the HTTP source allows you to receive data over HTTP. See [Sources][2] for their respective protocols.

## Collecting data

Your pipeline begins with data collection. Your services and systems generate logs, metrics, and traces that can be collected and sent downstream to your destinations. Data collection is achieved with agents, and understanding which agents to use ensures you are collecting the data you want.

### Choosing agents

Following the guideline to [start with one aggregator][3], choose the agent that optimizes your engineering team's ability to monitor their systems. Therefore, integrate Observability Pipelines Worker with the best agent for the job and replace the other agents with the Observability Pipelines Worker. 

#### When Observability Pipelines Worker can replace agents

The Observability Pipelines Worker can replace agents performing generic data forwarding functions, such as:

- Tailing and forwarding log files
- Collecting and forwarding service metrics without enrichment
- Collecting and forwarding service logs without enrichment
- Collecting and forwarding service traces without enrichment

These functions collect and forward existing data without modifying data. Since these functions are not unique, these agents can be replaced with the Observability Pipelines Worker to provide more configuration options that may be needed as your environment evolves. 

If you decide to replace an agent, configure Observability Pipelines Worker to perform the same function as the agent you are replacing. Use source components such as the `file`, `journald`, and `host_metrics` sources to collect and forward data. You can process data locally on the node or remotely on your aggregators. See [Choosing where to process data](#choosing-where-to-process-data) for more information.

#### When Observability Pipelines Worker should integrate with agents

The Observability Pipelines Worker should integrate with agents that produce vendor-specific data that the Observability Pipelines Worker cannot replicate.

For example, Datadog [Network Performance Monitoring][4] integrates the Datadog Agent with vendor-specific systems and produces vendor-specific data. Therefore, the Datadog Agent should collect the data and send it directly to Datadog, since the data is not a supported data type in the Observability Pipelines Worker.

As another example, the Datadog Agent collects service metrics and enriches them with vendor-specific Datadog tags. In this case, the Datadog Agent should send the metrics directly to Datadog or route them through the Observability Pipelines Worker. The Observability Pipelines Worker should not replace the Datadog Agent because the data being produced is enriched in a vendor-specific way.

If you integrate with an agent, configure the Observability Pipelines Worker to receive data directly from the agent over the local network, routing data through the Observability Pipelines Worker. Use source components such as the `datadog_agent` or `open_telemetry` to receive data from your agents.

Alternatively, you can deploy the Observability Pipelines Worker on separate nodes as an aggregator. See [Choosing where to process data](#choosing-where-to-process-data) for more details.

##### Reducing agent risk

When integrating with an agent, configure the agent to be a simple data forwarder and route supported data types through the Observability Pipelines Worker. This reduces the risk of data loss and service disruption by minimizing the agent's responsibilities.

## Processing data

If you want to design an efficient pipeline between your Observability Pipelines Worker's sources and sinks, it helps to understand which types of data to process and where to process it.

### Choosing which data to process

You can use Observability Pipelines Worker to process logs, metrics, and traces. However, real-time, vendor-specific data, such as continuous profiling data, is not interoperable and typically does not benefit from processing.

### Choosing where to process data

Observability Pipelines Worker can be deployed anywhere in your infrastructure. Deploy it directly on your node as an agent for local processing, or on separate nodes as an aggregator for remote processing. Where the processing happens depends largely on your use case and environment.

#### Local processing

With local processing, Observability Pipelines Worker is deployed on each node as an agent. Data is processed on the same node from which the data originated. This provides operational simplicity since the Observability Pipelines Worker has direct access to your data and scales along with your infrastructure.

Local processing is recommended for:

- Simple environments that do not require high durability or high availability.
- Use cases, such as fast, stateless processing, and streaming delivery, that do not require holding onto data for long periods of time.
- Operators that can make node-level changes without a lot of friction.

#### Remote processing

For remote processing, the Observability Pipelines Worker can be deployed on separate nodes as an aggregator. Data processing is shifted off your nodes and onto remote aggregator nodes. Remote processing is recommended for environments that require high durability and high availability (most environments). In addition, this is easier to set up since it does not require the infrastructure restructuring necessary when adding an agent.

See [Aggregator Architecture][5] for more details.

#### Unified processing

Finally, you can also combine local and remote data processing to create a unified observability data pipeline. Datadog recommends evolving towards unified processing after starting with [remote processing](#remote-processing).

## Buffering data

Where and how you buffer your data can also affect the efficiency of your pipeline. 

### Choosing where to buffer data

Buffering should happen close to your destinations, and each destination should have its own isolated buffer, which offers the following benefits:

1. Each destination can configure its buffer to meet the sink's requirements. See [Choosing how to buffer data](#choosing-how-to-buffer-data) for more details.
2. Isolating buffers for each destination prevents one misbehaving destination from halting the entire pipeline until the buffer reaches the configured capacity.

For these reasons, the Observability Pipelines Worker couples buffers with its sinks.

### Choosing how to buffer data

Observability Pipelines Worker's built-in buffers simplify operation and eliminate the need for complex external buffers.

When choosing an Observability Pipelines Worker buffer type, select the type that is optimal for the destination's purpose. For example, your system of record should use disk buffers for high durability, and your system of analysis should use memory buffers for low latency. Additionally, both buffers can overflow to another buffer to prevent back pressure from propagating to your clients.

## Routing data

Routing data, so that your aggregators send data to the proper destination, is the final piece in your pipeline design. Use aggregators to route data flexibly to the best system for your team(s).

### Separating systems of record and analysis

Separate your system of record from your system of analysis to optimize cost without making trade-offs that affect their purpose. For example, your system of record can batch large amounts of data over time and compress it to minimize cost while ensuring high durability for all data. And your system of analysis can sample and clean data to reduce cost while keeping latency low for real-time analysis.

### Routing to your systems of record (Archiving)

Optimize your system of record for durability while minimizing costs by doing the following:

- Only write to your archive from the aggregator role to reduce data loss due to node restarts and software failures.
- Front the sink with a disk buffer.
- Enable end-to-end acknowledgments on all sources.
- Set `batch.max_bytes` to ≥ 5MiB, `batch.timeout_secs` to ≥ 5 minutes, and enable compression (the default for archiving sinks, such as the `aws_s3` sink).
- Archive raw, unprocessed data to allow for data replay and reduce the risk of accidental data corruption during processing.

### Routing to your system of analysis

Optimize your system of analysis for analysis while reducing costs by doing the following:

- Front the sink with a memory buffer.
- Set `batch.timeout_sec` to ≤ 5 seconds (the default for analytical sinks, such as `datadog_logs`).
- Use the `remap` transform to remove attributes not used for analysis.
- Filter events not used for analysis
- Consider sampling logs with `level` `info` or lower to reduce their volume


[1]: https://wiki.archlinux.org/title/Domain_name_resolution
[2]: /observability_pipelines/reference/sources/
[3]: /observability_pipelines/production_deployment_overview/#start-with-one-aggregator
[4]: /network_monitoring/performance/
[5]: /observability_pipelines/production_deployment_overview/aggregator_architecture/
