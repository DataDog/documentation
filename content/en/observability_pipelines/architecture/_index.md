---
title: Best Practices for OPW Aggregator Architecture
kind: Documentation
aliases:
  - /observability_pipelines/production_deployment_overview/aggregator_architecture
---

## Overview

The Observability Pipelines Worker's (OPW) aggregator architecture deploys the Observability Pipelines Worker as a standalone service for centralized data processing and routing:

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role2.png" alt="A diagram showing the network load balancer receiving data from various sources and sending the data to the Observability Pipelines Worker aggregator, which has multiple Workers in different availability zones and sends data to various sinks" style="width:100%;" >}}

Deploy Observability Pipelines Worker into your infrastructure, like any other service to intercept and manipulate data, and then forward it to your destinations. Each Observability Pipelines Worker instance operates independently, so that you can scale the architecture with a simple load balancer.

This guide walks you through the recommended aggregator architecture for new Observability Pipelines Worker users. Specifically, these topics include:

- [Configuring the Observability Pipelines Worker](#configuring-the-observability-pipelines-worker) to collect, process, and route data. 
- [Optimizing the instance][3] so you can horizontally scale the Observability Pipelines Worker aggregator. 
- Starting points to estimate your resource capacity for [capacity planning and scaling][4] the Observability Pipelines Worker.
- Determining your [network topology and configurations][5] for the Observability Pipelines Worker.
- Achieving [high durability][6] and [high availability](#high-availability).
- Using the Observability Pipelines Worker as part of your [disaster recovery][7].
- More [advanced configurations][8] for deploying multiple aggregators, publish-subscribe systems, and global aggregation.

[3]: /observability_pipelines/architecture/optimize
[4]: /observability_pipelines/architecture/capacity_planning_scaling
[5]: /observability_pipelines/architecture/networking
[6]: /observability_pipelines/architecture/preventing_data_loss
[7]: /observability_pipelines/architecture/availability_disaster_recovery
[8]: /observability_pipelines/architecture/advanced_configurations