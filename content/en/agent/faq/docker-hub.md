---
title: Docker Hub
---

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from GCR or ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

If you are using Docker, there are several container images available through [GCR][11], and [ECR][12]. If you need to use Docker Hub:

| Datadog service                         | Docker Hub                               | Docker Pull Command                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

Docker Hub supports [content trust][10] for the `agent`, `cluster-agent`, and `dogstatsd` images.
To ensure that the images are not tampered with, enable content trust by setting `DOCKER_CONTENT_TRUST=1`.

[1]: /agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: https://docs.docker.com/engine/security/trust/
[11]: /agent/guide/container-images-for-docker-environments/?tab=gcr
[12]: /agent/guide/container-images-for-docker-environments/?tab=ecr