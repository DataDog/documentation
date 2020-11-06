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
| [Docker Agent][1]                        | [Docker Agent (v6+)][2]<br>`docker pull datadog/agent`                                       | [Docker Agent (v6+)][3]<br>`docker pull gcr.io/datadoghq/agent`                                                |
|                                          | [Docker Agent (v5)][4]<br>`docker pull datadog/docker-dd-agent`                              | [Docker Agent (v5)][3]<br>`docker pull gcr.io/datadoghq/docker-dd-agent`                                       |
| [DogStatsD][5]                           | [DogStatsD][6]<br>`docker pull datadog/dogstatsd`                                            | [DogStatsD][7]<br>`docker pull gcr.io/datadoghq/dogstatsd`                                                     |
| [Datadog Cluster Agent][8]               | [Cluster Agent][9]<br>`docker pull datadog/cluster-agent`                                    | [Cluster Agent][10]<br>`docker pull gcr.io/datadoghq/cluster-agent`                                            |
| [Synthetics Private Location Worker][11] | [Synthetics Private Location Worker][12]<br>`docker pull synthetics-private-location-worker` | [Synthetics Private Location Worker][13]<br>`docker pull gcr.io/datadoghq/synthetics-private-location-worker`  |                            |

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
[13]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
