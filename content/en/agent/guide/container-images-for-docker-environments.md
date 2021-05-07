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

{{< tabs >}}
{{% tab "Docker Hub" %}}

| Datadog Product                         | Docker Hub                               | Docker Pull Command                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull datadog/synthetics-private-location-worker`           |

[1]: /agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /getting_started/synthetics/private_location.md
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "GCR" %}}

| Datadog Product                          | GCR                                      | GCR Pull Command                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [Docker Agent][1]                        | [Docker Agent (v6+)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| Docker Agent (v 5)                       | [Docker Agent (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog Cluster Agent][5]               | [Cluster Agent][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Synthetics Private Location Worker][7]  | [Synthetics Private Location Worker][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |

[1]: /agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /getting_started/synthetics/private_location.md
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker

{{% /tab %}}
{{< /tabs >}}

{{< partial name="whats-next/whats-next.html" >}}
