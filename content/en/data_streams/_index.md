---
title: Data Streams Monitoring
kind: documentation
---

{{< img src="data_streams/data_streams_hero.png" alt="Datadog Data Streams Monitoring" style="width:100%;" >}}

## Overview

Data Streams Monitoring provides a standardized method for teams to understand and manage pipelines at scale by making it easy to:

* Measure pipeline health with end-to-end latencies for events traversing across your system.
* Pinpoint faulty producers, consumers or queues, then pivot to related logs or clusters to troubleshoot faster.
* Prevent cascading delays by equipping service owners to stop backed up events from overwhelming downstream services.

### Setup

| Runtime | Supported technologies |
|---|----|
| Java | Kafka (self-hosted, Amazon MSK), RabbitMQ, HTTP, gRPC |
| Go | All (through [manual instrumentation][1]) |
| .NET | Kafka (self-hosted, Amazon MSK) |
| Other | See [Agent installation requirements][2] |

{{< partial name="data_streams/setup-languages.html" >}}


[1]: /data_streams/go#manual-instrumentation
[2]: /agent/basic_agent_usage
