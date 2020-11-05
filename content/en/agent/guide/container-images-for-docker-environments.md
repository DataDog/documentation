---
title: Container Images for Docker Environments
kind: documentation
further_reading:
- link: "/agent/docker/"
  tag: "Documentation"
  text: "Get started with the Docker Agent"
---

## Overview

If you are currently using Docker, there are several container images available through Docker Hub and GCR:

| Docker Hub                                   | GCR                             |
|----------------------------------------------|---------------------------------|
| [Datadog Agent (v6+)][1]                     | [Datadog Agent (v6+)][2]        |
| [Datadog Agent (v5)][3]                      | [Datadog Agent (v5)][2]         |
| [DogStatsD][4]                               | [DogStatsD][5]                  |
| [Cluster Agent][6]                           | [Cluster Agent][7]              |
| [Synthetics Private Location Worker][8]      | N/A                             |

[1]: https://hub.docker.com/r/datadog/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: https://hub.docker.com/r/datadog/dogstatsd
[5]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[6]: https://hub.docker.com/r/datadog/cluster-agent
[7]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[8]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
