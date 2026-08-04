---
title: Docker Hub
---
<div class="alert alert-warning">Docker Hub est soumis à des limites de taux de pull d'images. Si vous n’êtes pas client de Docker Hub, Datadog vous recommande de mettre à jour la configuration de votre Datadog Agent et de votre Cluster Agent pour effectuer des pulls depuis le Datadog Container Registry, GCR ou ECR. Pour obtenir des instructions, consultez <a href="/agent/guide/changing_container_registry">Modification de votre registre de container</a>.</div>

Si vous utilisez Docker, plusieurs images de conteneur sont disponibles via le [Datadog Container Registry][12], [GCR][10] et [ECR][11]. Si vous devez utiliser Docker Hub :

| Service Datadog                         | Docker Hub                               | Commande Docker Pull                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6+)][2]                  | `docker pull datadog/agent`         |
| Docker Agent (v 5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull datadog/cluster-agent` |
| [Synthetics Private Location Worker][8] | [Synthetics Private Location Worker][9]  | `docker pull synthetics-private-location-worker`           |

[1]: /fr/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /fr/extend/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /fr/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /fr/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: /fr/agent/guide/container-images-for-docker-environments/?tab=gcr
[11]: /fr/agent/guide/container-images-for-docker-environments/?tab=ecr
[12]: /fr/containers/guide/changing_container_registry/