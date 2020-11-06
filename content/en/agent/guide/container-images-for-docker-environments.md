---
title: Container Images for Docker Environments
kind: documentation
further_reading:
- link: "/agent/docker/"
  tag: "Documentation"
  text: "Get started with the Docker Agent"
- link: "/agent/cluster_agent/"
  tag: "Documentation"
  text: "Get started with the Cluster Agent"
---

## Overview

If you are currently using Docker, there are several container images available through Docker Hub and GCR that you may want to use within your environment:

| Datadog Product                          | Docker Hub Image                             | GCR Image                            |
|------------------------------------------|----------------------------------------------|---------------------------------|
| [Docker Agent][1]                        | [Docker Agent (v6+)][2]                      | [Docker Agent (v6+)][3]         |
|                                          | [Docker Agent (v5)][4]                       | [Docker Agent (v5)][3]          |
| [DogStatsD][5]                          | [DogStatsD][6]                               | [DogStatsD][7]                  |
| [Datadog Cluster Agent][8]              | [Cluster Agent][9]                           | [Cluster Agent][10]              |
| [Synthetics Private Location Worker][11] | [Synthetics Private Location Worker][12]      | N/A                             |

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://hub.docker.com/r/datadog/docker-dd-agent
[5]: /developers/dogstatsd/
[6]: https://hub.docker.com/r/datadog/dogstatsd
[7]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[8]: /agent/cluster_agent/
[9]: https://hub.docker.com/r/datadog/cluster-agent
[10]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[11]: /getting_started/synthetics/private_location.md
[12]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
