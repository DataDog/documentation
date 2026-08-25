---
title: Docker Hub
---

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from the Datadog Container Registry, GCR, or ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

If you are using Docker, there are several container images available through the [Datadog Container Registry][12], [GCR][10], and [ECR][11]. If you need to use Docker Hub:

| Datadog service                         | Docker Hub                               | Docker Pull Command                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

[1]: /agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /extend/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /agent/guide/container-images-for-docker-environments/?tab=gcr
[11]: /agent/guide/container-images-for-docker-environments/?tab=ecr
[12]: /containers/guide/changing_container_registry/
