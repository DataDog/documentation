---
title: Aggregator Architecture
kind: Documentation
---

## Overview

The Observability Pipelines Worker's (OPW) aggregator architecture deploys the Observability Pipelines Worker as a standalone service for centralized data processing and routing:

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role.png" alt="A diagram showing the network load balancer receiving data from various sources and sending the data to the Observability Pipelines Worker aggregator, which has multiple Workers in different availability zones and sends data to various sinks" style="width:100%;" >}}

Deploy Observability Pipelines Worker into your infrastructure, like any other service to intercept and manipulate data, and then forward it to your destinations. Each Observability Pipelines Worker instance operates independently, so that you can scale the architecture with a simple load balancer.

This guide walks you through the recommended aggregator architecture for new Observability Pipelines Worker users. Specifically, these topics:

- [Configuring the Observability Pipelines Worker](#configuring-observability-pipelines-worker) to collect, process, and route data. 
- [Optimizing the instance][3] so you can horizontally scale the Observability Pipelines Worker aggregator. 
- Starting points to estimate your resource capacity for [capacity planning and scaling][4] the Observability Pipelines Worker.
- Determining your [network topology and configurations][5] for the Observability Pipelines Worker.
- Achieving [high durability][6] and [high availability](#high-availability).
- Using the Observability Pipelines Worker as part of your [disaster recovery][7].
- More [advanced configurations][8] for deploying multiple aggregators, publish-subscribe systems, and global aggregation.

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

When configuring the Observability Pipelines Worker (OPW), Datadog recommends following this general flow:

{{< img src="observability_pipelines/production_deployment_overview/recommended_config.png" alt="A diagram showing agents and clients sending data to the Observability Pipelines Worker aggregator, where the data goes through multiple sources, a transforms pipeline, and then out to a system of record or a system of analysis" style="width:100%;" >}}

While your configuration may vary, it should follow the following primary goals.

### Collecting data

Make it easy to send data to your Observability Pipelines Worker aggregator by integrating as many sources as possible. It's not uncommon for Observability Pipelines Worker aggregators to have dozens of sources. Configure the source component as long as it supports your security and durability requirements. This enables users across your company to adopt the Observability Pipelines Worker aggregator, even if they are using legacy services.

### Processing data

Use the Observability Pipelines Worker aggregator for processing most of your data, so that the responsibility is shifted away from your agents. This reduces your dependence on them, making it easier to change agents later on. See [Working with Data][2] for more information on data processing.

### Routing data

#### Choose a system of record 

Separate your system of analysis (for example, Datadog) from your system of record (for example, AWS S3). This allows you to optimize them independently towards their respective goals.

[1]: /observability_pipelines/setup/
[2]: /observability_pipelines/working_with_data/
[3]: /observability_pipelines/architecture/optimize
[4]: /observability_pipelines/architecture/capacity_planning_scaling
[5]: /observability_pipelines/architecture/networking
[6]: /observability_pipelines/architecture/preventing_data_loss
[7]: /observability_pipelines/architecture/availability_disaster_recovery
[8]: /observability_pipelines/architecture/advanced_configurations