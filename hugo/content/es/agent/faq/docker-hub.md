---
title: Docker Hub
---
<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de extracción de imágenes. Si usted no es cliente de Docker Hub, Datadog recomienda que actualice la configuración de su Datadog Agent y Cluster Agent para extraer desde el Datadog Container Registry, GCR o ECR. Para obtener instrucciones, consulte <a href="/agent/guide/changing_container_registry">Cambiar su Container Registry</a>.</div>

Si está utilizando Docker, hay varias Container Images disponibles a través del [Datadog Container Registry][12], [GCR][10] y [ECR][11]. Si necesita utilizar Docker Hub:

| Datadog service                         | Docker Hub                               | Docker Pull Command                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

[1]: /es/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /es/extend/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /es/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /es/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /es/agent/guide/container-images-for-docker-environments/?tab=gcr
[11]: /es/agent/guide/container-images-for-docker-environments/?tab=ecr
[12]: /es/containers/guide/changing_container_registry/