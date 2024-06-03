---
aliases:
- /fr/agent/guide/container-images-for-docker-environments
further_reading:
- link: /agent/docker/
  tag: Documentation
  text: Débuter avec l'Agent Docker
- link: /agent/cluster_agent/
  tag: Documentation
  text: Débuter avec l'Agent de cluster
kind: documentation
title: Images de conteneur pour environnements Docker
---

## Présentation

Si vous utilisez Docker, plusieurs images de conteneur disponibles via GCR et ECR peuvent être utilisées dans votre environnement :

{{< tabs >}}
{{% tab "GCR" %}}

| Service Datadog                          | GCR                                      | Commande Pull GCR                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [Agent Docker][1]                        | [Agent Docker (v6+)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| Agent Docker (v5)                       | [Agent Docker (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Agent de cluster Datadog][5]               | [Agent de Cluster][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Worker d'emplacement privé Synthetic][7]  | [Worker d'emplacement privé Synthetic][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |


[1]: /fr/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /fr/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /fr/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /fr/getting_started/synthetics/private_location/
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ECR" %}}

| Service Datadog                         | Docker Hub                               | Commande Pull Docker                                                     |
|-----------------------------------------|------------------------------------------|-------------------------------------------------------------------------|
| [Agent Docker][1]                       | [Agent Docker (v6+)][2]                  | `docker pull public.ecr.aws/datadog/agent`                              |
| Agent Docker (v5)                      | [Agent Docker (v5)][3]                   | `docker pull public.ecr.aws/datadog/docker-dd-agent`                    |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull public.ecr.aws/datadog/dogstatsd`                          |
| [Agent de cluster Datadog][6]              | [Agent de cluster][7]                       | `docker pull public.ecr.aws/datadog/cluster-agent`                      |
| [Worker d'emplacement privé Synthetic][8] | [Worker d'emplacement privé Synthetic][9]  | `docker pull public.ecr.aws/datadog/synthetics-private-location-worker` |


[1]: /fr/agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /fr/developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /fr/agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /fr/getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{< /tabs >}}

Si vous devez utiliser Docker Hub, consultez [Docker Hub][1].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/docker-hub/