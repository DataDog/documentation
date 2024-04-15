---

title: Docker Hub
---

<div class="alert alert-warning">El 10 de julio de 2023, Docker Hub comenzará a aplicar límites de velocidad de descarga a los registros Docker Hub de Datadog. Las imágenes extraídas de estos registros cuentan para tu cuota de límite de velocidad.<br/><br/>

Datadog recomienda que actualices la configuración de tu Datadog Agent y Cluster Agent para utilizar otros registros donde no se apliquen límites de velocidad. Para obtener instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambiar el registro de tu contenedor.</a>.</div>

Si utilizas Docker, hay varias imágenes de contenedor disponibles a través de [GCR][11] y [ECR][12]. Si necesitas usar Docker Hub:

| Servicio de Datadog                         | Docker Hub                               | Comando Pull de Docker                                        |
|-----------------------------------------|------------------------------------------|------------------------------------------------------------|
| [Docker Agent][1]                       | [Docker Agent (v6 y posteriores)][2]                  | `DOCKER_CONTENT_TRUST=1 docker pull datadog/agent`         |
| Docker Agent (v5)                      | [Docker Agent (v5)][3]                   | `docker pull datadog/docker-dd-agent`                      |
| [DogStatsD][4]                          | [DogStatsD][5]                           | `DOCKER_CONTENT_TRUST=1 docker pull datadog/dogstatsd`     |
| [Datadog Cluster Agent][6]              | [Cluster Agent][7]                       | `DOCKER_CONTENT_TRUST=1 docker pull datadog/cluster-agent` |
| [Worker de localizaciones privadas de Synthetics][8] | [Worker de localizaciones privadas de Synthetics][9]  | `docker pull synthetics-private-location-worker`           |

Docker Hub es compatible con la [confianza en el contenido][10] para imágenes `agent`, `cluster-agent` y `dogstatsd`.
Para asegurarte de que las imágenes no se manipulen, habilita la confianza en el contenido configurando `DOCKER_CONTENT_TRUST=1`.

[1]: /es/agent/docker/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://hub.docker.com/r/datadog/docker-dd-agent
[4]: /es/developers/dogstatsd/
[5]: https://hub.docker.com/r/datadog/dogstatsd
[6]: /es/agent/cluster_agent/
[7]: https://hub.docker.com/r/datadog/cluster-agent
[8]: /es/getting_started/synthetics/private_location
[9]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[10]: https://docs.docker.com/engine/security/trust/
[11]: /es/agent/guide/container-images-for-docker-environments/?tab=gcr
[12]: /es/agent/guide/container-images-for-docker-environments/?tab=ecr
