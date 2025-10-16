---
aliases:
- /es/guides/basic_agent_usage/docker/
- /es/agent/docker
- /es/agent/basic_agent_usage/docker/
- /es/integrations/docker_daemon/
- /es/docker/
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de la versión
  text: ¡Échale un vistazo a las últimas versiones de Datadog Containers! (Es necesario
    iniciar sesión en la aplicación).
- link: /agent/docker/log/
  tag: Documentación
  text: Recopilar tus logs de aplicación
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopila tus trazas de aplicaciones
- link: /agent/docker/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopila las métricas de tus aplicaciones y logs automáticamente
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos solo a un subconjunto de contenedores
- link: /agent/docker/tag/
  tag: Documentación
  text: Asignar etiquetas a todos los datos emitidos por un contenedor
title: Docker Agent para Docker, containerd y Podman
---

## Información general

El Datadog Docker Agent es la versión en contenedores del [Agent][1] host. El Docker Agent admite los tiempos de ejecución de Docker, containerd y Podman. La [imagen de Docker][2] oficial está disponible en Docker Hub, Google Container Registry (GCR) y ECR-Public.

<div class="alert alert-danger">Docker Hub está sujeto a límites en la tasa de extracción de imágenes. Si no eres cliente de Docker Hub, Datadog recomienda que actualices tu configuración de Datadog Agent y Cluster Agent para extraer desde GCR o ECR. Para obtener instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambiar tu registro de contenedor</a>.</div>

Las imágenes están disponibles para las arquitecturas de 64-bit x86 y Arm v8.

| ECR-Public                                                           | Google Container Registry                                       | Docker Hub                                             |
|----------------------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------------------------|
| [Agent v6+][4]<br>`docker pull public.ecr.aws/datadog/agent`         | [Agent v6+][3]<br>`docker pull gcr.io/datadoghq/agent`          | [Agent v6+][2]<br>`docker pull datadog/agent`          |
| [Agent v5][7]<br>`docker pull public.ecr.aws/datadog/docker-dd-agent`| [Agent v5][6]<br>`docker pull gcr.io/datadoghq/docker-dd-agent` | [Agent v5][5]<br>`docker pull datadog/docker-dd-agent` |


Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Sustituye `docker` por `nerdctl` para el tiempo de ejecución del containerd, o `podman` para el tiempo de ejecución del Podman.

## Ajustes

Si no has instalado Docker Agent, sigue las [instrucciones de instalación dentro de la aplicación][8] o consulta lo que se indica a continuación. Para [versiones compatibles][9], consulta la documentación de Agent. Utiliza el comando de instalación de un solo paso. Sustituye `<YOUR_DATADOG_API_KEY>` por tu [clave API de Datadog][10], y `<DATADOG_SITE>` por {{< region-param key=dd_site code="true" >}}.

{{< tabs >}}
{{% tab "Estándar" %}}a

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```

Para ECR-public:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

**Nota**: Si estás usando un registro que no sea ni GCR ni ECR-public, asegúrate de actualizar la imagen.

**Nota**: Para algunas de las funciones proporcionadas por system-probe, incluida la monitorización de redes, el agent de seguridad y el check de oom_kill, también necesitas montar el archivo `/etc/os-release` con `-v /etc/os-release:/host/etc/os-release:ro`. If your Linux distribution does not include an `/etc/os-release` file, mount the equivalent one provided, for example `/etc/redhat-release` or `/etc/fedora-release`.

{{% /tab %}}
{{% tab "Amazon Linux" %}}

Para Amazon Linux < v2:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
Para ECR-public:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

Para Amazon Linux v2:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7
```
Para ECR-public:

```shell
docker run -d --cgroupns host --pid host --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7
```

{{% /tab %}}
{{% tab "Windows" %}}

El Datadog Agent es compatible con Windows Server 2019 (LTSC) y Windows Server 2022 (LTSC).

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine gcr.io/datadoghq/agent
```

Para ECR-Public:

```shell
docker run -d --name dd-agent -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<API_KEY> -v \\.\pipe\docker_engine:\\.\pipe\docker_engine public.ecr.aws/datadog/agent
```

{{% /tab %}}
{{% tab "Unprivileged" %}}

(Opcional) Para ejecutar una instalación no privilegiada, añade `--group-add=<DOCKER_GROUP_ID>` al comando de instalación, por ejemplo:

```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> gcr.io/datadoghq/agent:7 --group-add=<DOCKER_GROUP_ID>
```
Para ECR-Public:


```shell
docker run -d --name dd-agent -v /var/run/docker.sock:/var/run/docker.sock:ro -v /proc/:/host/proc/:ro -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro -e DD_SITE=<DATADOG_SITE> -e DD_API_KEY=<DATADOG_API_KEY> public.ecr.aws/datadog/agent:7 --group-add=<DOCKER_GROUP_ID>
```

{{% /tab %}}
{{< /tabs >}}

**Nota**: Para Docker Compose, consulta [Compose y el Datadog Agent][11].

## Integraciones

Una vez que el Agent está funcionando, usa la [Función Autodiscovery de Datadog][12] para recopilar las métricas y los logs automáticamente de los contenedores de tu aplicación.


## Variables de entorno

El [archivo principal de configuración][13] del Agent es `datadog.yaml`. Para el Docker Agent, las opciones de configuración `datadog.yaml` se habilitan con variables de entorno.

### Opciones globales

| Variable de Env         | Descripción                                                                                                                                                                                                                                                                                                                                      |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`         | Tu clave de Datadog API key (**obligatorio**).                                                                                                                                                                                                                                                                                                              |
| `DD_ENV`             | Configura la etiqueta (tag) global `env` para todos los datos emitidos.                                                                                                                                                                                                                                                                                                  |
| `DD_HOSTNAME`        | El nombre de host que hay que usar para las métricas (si falla la detección automática).                                                                                                                                                                                                                                                                                             |
| `DD_HOSTNAME_FILE`        | En algunos entornos, la detección automática del nombre del host no es adecuada y no podrás configurar el valor con variables de entorno. En estos casos, se puede usar un archivo en el host para proporcionar un valor adecuado. Si `DD_HOSTNAME` está configurado como un valor no vacío, esta opción se ignora.                                              |
| `DD_TAGS`            | Etiquetas (tags) de host separadas por espacios. Por ejemplo: `key1:value1 key2:value2`.                                                                                                                                                                                                                                                                 |
| `DD_SITE`            | Lugar de destino para tus métricas, trazas y logs. Configura tu sitio Datadog como: `{{< region-param key="dd_site" >}}`. Esto cambia por defecto a `datadoghq.com`.                                                                                                                                                                                                |
| `DD_DD_URL`          | Configuración opcional para sobreescribir la URL para enviar métricas.                                                                                                                                                                                                                                                                                      |
| `DD_URL` (6.36+/7.36+)            | Alias para `DD_DD_URL`. Se ignora si `DD_DD_URL` ya está configurada.                                                                                                                                                                                                                                                                                    |
| `DD_CHECK_RUNNERS`   | El Agent ejecuta todos los checks simultáneamente por defecto (valor por defecto = `4` ejecutores). Para ejecutar los checks en secuencia, cambia el valor a `1`. Si hace falta un alto número de checks (o checks lentos), se puede dejar atrás el componente `collector-queue` para que no pase el check de salud. Se puede incrementar el número de ejecutores para ejecutar checks en paralelo. |
| `DD_APM_ENABLED`             | Activa la recogida de traza (trace). Por defecto es `true`. Para obtener más información sobre variables adicionales de entorno de la recogida de trazas, consulta [Aplicaciones de traza de Docker][14].   |
| `DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION` | En algunos entornos, los logs iniciales de los hosts quizás no incluyan las etiquetas (tags) correctas. Si te faltan etiquetas (tags) en los nuevos hosts de tus logs, incluye esta variable de entorno y configúralo como `"10m"`.|

### Configuraciones de proxy

A partir del Agent v6.4.0 (y v6.5.0 para el Trace Agent), se pueden sobreescribir los valores de configuración de proxy del Agent con las siguientes variables de entorno:

| Variable de Env        | Descripción                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | Una URL de HTTP para usar como proxy para solicitudes de `http`.                |
| `DD_PROXY_HTTPS`    | Una URL de HTTP para usar como proxy para solicitudes de `https`.              |
| `DD_PROXY_NO_PROXY` | Una lista separada por espacios de URLs para las que no se debe utilizar ningún proxy. |

Para más información sobre la configuración de una proxy, consulta la [Documentación del Agent v6 Proxy][15].

### Agents de recopilación opcionales

Los Agents de recopilación opcionales se desactivan por defecto por razones de seguridad o rendimiento. Usa estas variables de entorno para activarlos:

| Variable de Env                                   | Descripción                                                                                                                                                   |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_NON_LOCAL_TRAFFIC`                     | Permite tráfico no local cuando se está [rastreando desde otros contendedores][16].                                                                                             |
| `DD_LOGS_ENABLED`                              | Activa [recopilación de logs][17] con el Logs Agent.                                                                                                              |
| `DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED` | Habilita la [recopilación de procesos activos][18] con el Process Agent. La [vista activa del contenedor][19] ya está habilitada por defecto si el socket de Docker está disponible. |

### DogStatsD (métricas personalizadas)

Envía las métricas con el [protocolo de StatsD][20]:

| Variable de Env                     | Descripción                                                                                                                                                |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` | Escucha los paquetes de DogStatsD de otros contenedores (obligatorio para enviar métricas personalizadas).                                                                       |
| `DD_HISTOGRAM_PERCENTILES`       | Los percentiles de histogramas para calcular (separados por espacios). Por defecto es `0.95`.                                                                         |
| `DD_HISTOGRAM_AGGREGATES`        | Las agregaciones de histograma que hay que calcular (separadas por espacios). El valor por defecto es "max median avg count".                                                          |
| `DD_DOGSTATSD_SOCKET`            | La ruta al socket Unix que hay que escuchar. Debe estar en un volumen montado `rw`.                                                                                    |
| `DD_DOGSTATSD_ORIGIN_DETECTION`  | Activa detección de contenedores y etiquetado para métricas de socket Unix.                                                                                            |
| `DD_DOGSTATSD_TAGS`              | Etiquetas adicionales para anexar a todas las métricas, los eventos y los checks de servicios recibidos por este servidor de DogStatsD, por ejemplo: `"env:golden group:retrievers"`. |
| `DD_USE_DOGSTATSD`           | Activar o desactivar el envío de métricas personalizadas desde la librería de DogStatsD.                                                                                                |
Aprende más sobre [DogStatsD en Sockets de Dominio de Unix][21].

### Etiquetado

Como buena práctica, Datadog recomienda usar el [etiquetado de servicios unificado][22] cuando se asignan etiquetas (tags).

Datadog recopila etiquetas comunes automáticamente de Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher. Usa las opciones a continuación para extraer más etiquetas (tags):

| Variable de Env                  | Descripción                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS` | Extrae etiquetas (labels) del contenedor. Esta variable de entorno es equivalente a la antigua `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`    | Extrae variables de entorno del contenedor. Esta variable de entorno es equivalente a la antigua `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_COLLECT_EC2_TAGS`         | Extrae etiquetas (tags) EC2 sin usar la integración de AWS.                                              |

Consulta la documentación de [Extracción de Docker Tag][23] para aprender más.

### Usar archivos secretos

Las credenciales se pueden almacenar en secretos de Docker o Kubernetes y usar en las plantillas de Autodiscovery. Para más información, consulta la [Documentación de Gestión de Secretos][24].

### Ignora los contenedores

Excluye los contenedores de la recopilación de logs, recopilación de métricas y Autodiscovery. Datadog excluye contenedores Kubernetes y OpenShift `pause` por defecto. Estas listas de autorización y bloqueo solo son aplicables a Autodiscovery; las trazas y DogStatsD no se ven afectados. El valor de estas variables de entorno es compatible con expresiones regulares.

| Variable de Env                   | Descripción                                                                                                                                                                                                                                                                                                               |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_INCLUDE`         | Lista de autorización de contenedores para ser incluidos (separados por espacios). Usa `.*` para incluir todos. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*`  Cuando se usa ImageStreams dentro de entornos OpenShift, usa el nombre del contenedor en lugar de la imagen. Por ejemplo: "name:container_name_1 name:container_name_2", name:.* |
| `DD_CONTAINER_EXCLUDE`         | Lista de bloqueos de contenedores para excluir (separados por espacios). Usa `.*` para excluir todos. Por ejemplo: `"image:image_name_3 image:image_name_4"` (**Nota**: Esta variable solo se respeta para Autodiscovery.), `image:.*`                                                                                                        |
| `DD_CONTAINER_INCLUDE_METRICS` | Lista de autorizaciones cuyas métricas quieres incluir.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_EXCLUDE_METRICS` | Lista de bloqueos de contenedores cuyas métricas quieres excluir.                                                                                                                                                                                                                                                                |
| `DD_CONTAINER_INCLUDE_LOGS`    | Lista de autorizaciones de contenedores cuyos logs quieres incluir.                                                                                                                                                                                                                                                                   |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Lista de bloqueos de contenedores cuyos logs quieres excluir.                                                                                                                                                                                                                                                                   |
| `DD_AC_INCLUDE`                | **Obsoleto**. Lista de autorizaciones de contenedores a incluir (separados por espacios). Usa `.*` para incluir todos. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*`                                                                                                                                                     |
| `DD_AC_EXCLUDE`                | **Obsoleto**.  Lista de bloqueos de contenedores a excluir (separados por espacios). Usa `.*` para excluir todos. Por ejemplo: `"image:image_name_3 image:image_name_4"` (**Nota**: Esta variable solo se respeta para Autodiscovery), `image:.*`                                                                                        |

Hay ejemplos adicionales disponibles en la página de [Gestión de Container Discover][25].

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estos valores de configuración. Todos los contenedores se cuentan. Esto no afecta tu facturación por contenedor.

**Nota**: Cuando se está usando containerd, se pueden ignorar contenedores según el espacio de nombre mediante el uso de `DD_CONTAINERD_NAMESPACES` y `DD_CONTAINERD_EXCLUDE_NAMESPACES`. Ambos son una lista de espacios de nombres separados por espacios. Cuando la configuración es `DD_CONTAINERD_NAMESPACES`, el agent presenta datos de los contenedores que pertenecen a un espacio de nombre dentro de la lista. Cuando la configuración es `DD_CONTAINERD_EXCLUDE_NAMESPACES`, el agent presenta datos de todos los contenedores menos aquellos que pertenecen a un espacio de nombre de la lista.

### Autodiscovery

| Variable de Env                 | Descripción                                                                                                                                                                           |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LISTENERS`               | Oyentes de Autodiscovery para ejecutar.                                                                                                                                                       |
| `DD_EXTRA_LISTENERS`         | Oyentes de Autodiscovery adicionales para ejecutar. Se añaden además de las variables definidas en la sección `listeners` del archivo de configuración `datadog.yaml`.                   |
| `DD_CONFIG_PROVIDERS`        | Los proveedores a los que Agent debe llamar para recopilar configuraciones de checks. El proveedor por defecto es `docker`. El proveedor de Docker gestiona las plantillas incrustadas en las etiquetas de contenedor. |
| `DD_EXTRA_CONFIG_PROVIDERS`  | Proveedores de configuración de Autodiscovery adicionales a utilizar. Se añaden además de las variables definidas en la sección `config_providers` del archivo de configuración `datadog.yaml`. |

### Varios

| Variable de Env                        | Descripción                                                                                                                                                     |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_PROCESS_AGENT_CONTAINER_SOURCE` | Sobreescribe la detección automática del origen del contenedor para forzar un único origen. Por ejemplo: `"docker"`, `"ecs_fargate"`, `"kubelet"`. Esto ya no es necesario a partir de Agent v7.35.0. |
| `DD_HEALTH_PORT`                    | Configura esto como `5555` para exponer el check de estado del Agent en el puerto `5555`.                                                                                             |

## Comandos

Consulta las [Guías de comandos del Agent][26] para descubrir todos los comandos del Docker Agent.

## Datos recopilados

### Métricas

Por defecto, el Docker Agent recopila las métricas con los siguientes checks básicos. Para recopilar métricas de otras tecnologías, consulta la sección [Integraciones](#integrations).

| Check       | Métricas       |
|-------------|---------------|
| Contenedor   | [Métricas][27]
| CPU         | [Sistema][28]  |
| Disco        | [Disco][29]    |
| Docker      | [Docker][30]  |
| Identificador de archivos | [Sistema][28]  |
| E/S          | [Sistema][28]  |
| Carga        | [Sistema][28]  |
| Memoria      | [Sistema][28]  |
| Red     | [Red][31] |
| NTP         | [NTP][32]     |
| Tiempo de actividad      | [Sistema][28]  |

### Eventos

El Docker Agent envía eventos a Datadog cuando se inicia o reinicia un Agent.

### Checks de servicio

**datadog.agent.up**: <br>
devuelve `CRITICAL` si el Agent no se puede conectar a Datadog; de lo contrario, devuelve `OK`.

**datadog.agent.check_status**: <br>
devuelve `CRITICAL` si un check de Agent no puede enviar las métricas a Datadog; de lo contrario, devuelve `OK`.

## Desinstalar la Instrumentación de un paso de APM

Si has instalado Datadog Docker Agent con la Instrumentación de un paso de APM y deseas desinstalar el Agent, deberás [ejecutar comandos adicionales][33] para desinstalar la Instrumentación de APM.

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: https://hub.docker.com/r/datadog/agent
[3]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
[4]: https://gallery.ecr.aws/datadog/agent
[5]: https://hub.docker.com/r/datadog/docker-dd-agent
[6]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/docker-dd-agent?gcrImageListsize=30
[7]: https://gallery.ecr.aws/datadog/docker-dd-agent
[8]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[9]: /es/agent/supported_platforms/?tab=cloudandcontainers
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: /es/agent/guide/compose-and-the-datadog-agent/
[12]: /es/agent/docker/integrations/
[13]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[14]: /es/agent/docker/apm/
[15]: /es/agent/configuration/proxy/#agent-v6
[16]: /es/agent/docker/apm/#tracing-from-other-containers
[17]: /es/agent/docker/log/
[18]: /es/infrastructure/process/
[19]: /es/infrastructure/livecontainers/
[20]: /es/developers/dogstatsd/
[21]: /es/developers/dogstatsd/unix_socket/
[22]: /es/getting_started/tagging/unified_service_tagging/
[23]: /es/agent/docker/tag/
[24]: /es/agent/configuration/secrets-management/?tab=linux
[25]: /es/agent/guide/autodiscovery-management/
[26]: /es/agent/configuration/agent-commands/
[27]: /es/integrations/container/
[28]: /es/integrations/system/#metrics
[29]: /es/integrations/disk/#metrics
[30]: /es/agent/docker/data_collected/#metrics
[31]: /es/integrations/network/#metrics
[32]: /es/integrations/ntp/#metrics
[33]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/?tab=docker#removing-apm-for-all-services-on-the-infrastructure
