---
aliases:
- /es/agent/guide/container-images-for-docker-environments
further_reading:
- link: /agent/docker/
  tag: Documentación
  text: Empezando con el Docker Agent
- link: /agent/cluster_agent/
  tag: Documentación
  text: Empezando con el Cluster Agent
kind: documentation
title: Imágenes de contenedor para entornos de Docker
---

## Información general

Si utilizas Docker, hay varias imágenes de contenedor disponibles a través de GCR y ECR que podría interesarte usar en tu entorno:

{{< tabs >}}
{{% tab "GCR" %}}

| Servicio de Datadog                          | GCR                                      | Comando Pull de GCR                                                  |
|------------------------------------------|------------------------------------------|-------------------------------------------------------------------|
| [Docker Agent][1]                        | [Docker Agent (v6 y posteriores)][2]                  | `docker pull gcr.io/datadoghq/agent`                              |
| Docker Agent (v5)                       | [Docker Agent (v5)][2]                   | `docker pull gcr.io/datadoghq/docker-dd-agent`                    |
| [DogStatsD][3]                           | [DogStatsD][4]                           | `docker pull gcr.io/datadoghq/dogstatsd`                          |
| [Datadog Cluster Agent][5]               | [Cluster Agent][6]                       | `docker pull gcr.io/datadoghq/cluster-agent`                      |
| [Worker de localizaciones privadas de Synthetics][7]  | [Worker de localizaciones privadas de Synthetics][8]  | `docker pull gcr.io/datadoghq/synthetics-private-location-worker` |


[1]: /es/agent/docker/
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[3]: /es/developers/dogstatsd/
[4]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/dogstatsd
[5]: /es/agent/cluster_agent/
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/cluster-agent
[7]: /es/getting_started/synthetics/private_location/
[8]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/synthetics-private-location-worker
{{% /tab %}}
{{% tab "ECR" %}}

| Servicio de Datadog                         | Docker Hub                               | Comando Pull de Docker                                                     |
|-----------------------------------------|------------------------------------------|-------------------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6 y posteriores)][2]                  | `docker pull public.ecr.aws/datadog/agent`                              |
| Docker Agent (v5)                      | [Docker Agent (v5)][3]                   | `docker pull public.ecr.aws/datadog/docker-dd-agent`                    |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `docker pull public.ecr.aws/datadog/dogstatsd`                          |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `docker pull public.ecr.aws/datadog/cluster-agent`                      |
| [Worker de localizaciones privadas de Synthetics][8] | [Worker de localizaciones privadas de Synthetics][9]  | `docker pull public.ecr.aws/datadog/synthetics-private-location-worker` |


[1]: /es/agent/docker/
[2]: https://gallery.ecr.aws/datadog/agent
[3]: https://gallery.ecr.aws/datadog/docker-dd-agent
[4]: /es/developers/dogstatsd/
[5]: https://gallery.ecr.aws/datadog/dogstatsd
[6]: /es/agent/cluster_agent/
[7]: https://gallery.ecr.aws/datadog/cluster-agent
[8]: /es/getting_started/synthetics/private_location
[9]: https://gallery.ecr.aws/datadog/synthetics-private-location-worker
{{% /tab %}}
{{< /tabs >}}

Si necesitas usar Docker Hub, consulta [Docker Hub][1].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/faq/docker-hub/