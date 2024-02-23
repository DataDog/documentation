---
title: Management
kind: documentation
further_reading:
- link: "https://opentelemetry.io/docs/collector/management/"
  tag: "Documentation"
  text: "OpenTelemetry Collector Management"
---

## Overview

This page describes key Collector management tasks and introduces the Open Agent Management Protocol (OpAMP) as a standard for managing your OpenTelemetry deployment.

To learn more about managing the Collector, read the [OpenTelemetry Management Configuration][2] documentation.

## Management tasks

OpenTelemetry Collector management involves a few key tasks:

- **Agent Monitoring and Configuration**: Monitor the health and performance of your Collector agents. This includes tracking CPU usage, memory usage, and processing rates.
- **Agent Upgrade and Package Management**: Upgrade your agents and manage their components ensure that your data collection infrastructure remains secure and efficient.
- **Telemetry Data Management**: Apply new configuration and ensure proper data collection as your monitored environment changes.

## Open Agent Management Protocol (OpAMP)

Open Agent Management Protocol (OpAMP) is an open-source, standardized approach to manage telemetry data agents. It offers a framework for managing OpenTelemetry Collectors or other telemetry data agents, focusing on:

- **Agent-Server Communication**: OpAMP facilitates bidirectional communication between the control plane (server) and the data plane (agents), supporting both HTTP and WebSockets.

- **Flexible Agent Management**: Whether implemented in-process or controlled using an external supervisor, OpAMP allows for detailed management tasks such as configuration updates, agent upgrades/downgrades, and performance monitoring.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases
[2]: https://opentelemetry.io/docs/collector/management/