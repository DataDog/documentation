---
title: Images de conteneur pour environnements Docker
kind: documentation
further_reading:
  - link: /agent/docker/
    tag: Documentation
    text: Débuter avec l'Agent Docker
  - link: /agent/cluster_agent/
    tag: Documentation
    text: Débuter avec l'Agent de cluster
---
## Présentation

Si vous utilisez actuellement Docker, plusieurs images de conteneur disponibles via Docker Hub et GCR peuvent être utilisées dans votre environnement :

{{< tabs >}}
{{% tab "Docker Hub" %}}

| Produit Datadog                           | Docker Hub                                | Commande Pull Docker                                       |
|-------------------------------------------|-------------------------------------------|------------------------------------------------------------|
| [Agent Docker][1]                         | [Agent Docker (v6+)][2]                   | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| Agent Docker (v5)                         | [Agent Docker (v5)][3]                    | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                            | [DogStatsD][5]                            | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Agent de cluster Datadog][6]             | [Agent de cluster][7]                     | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Worker d'emplacement privé Synthetic][8] | [Worker d'emplacement privé Synthetic][9] | `docker pull synthetics-private-location-worker`           |

[1]: /fr/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /fr/developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /fr/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /fr/getting_started/synthetics/private_location.md
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker

{{% /tab %}}
{{% tab "GCR" %}}

| Produit Datadog                           | GCR                                       | Commande Pull GCR                                                 |
|-------------------------------------------|-------------------------------------------|-------------------------------------------------------------------|
| [Agent Docker][1]                         | [Agent Docker (v6+)][2]                   | `docker pull gcr.io/datadoghq/agent`                              |
| Agent Docker (v5)                         | [Agent Docker (v5)][2]                    | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                            | [DogStatsD][4]                            | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Agent de cluster Datadog][5]             | [Agent de Cluster][6]                     | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Worker d'emplacement privé Synthetic][7] | [Worker d'emplacement privé Synthetic][8] | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |

[1]: /fr/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /fr/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /fr/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /fr/getting_started/synthetics/private_location.md
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker

{{% /tab %}}
{{< /tabs >}}

{{< partial name="whats-next/whats-next.html" >}}