---
aliases:
- /es/guides/basic_agent_usage/docker/
- /es/agent/docker
- /es/agent/basic_agent_usage/docker/
- /es/integrations/docker_daemon/
- /es/docker/
description: Instala y configura el Agente de Datadog para contenedores Docker y entornos
  de contenedores
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Container%20Monitoring
  tag: Notas de la versión
  text: ¡Consulta las últimas versiones de Datadog Containers! (Se requiere inicio
    de sesión en la aplicación).
- link: /agent/docker/log/
  tag: Documentación
  text: Recopila los registros de tu aplicación
- link: /agent/docker/apm/
  tag: Documentación
  text: Recopila las trazas de tu aplicación
- link: /agent/docker/prometheus/
  tag: Documentación
  text: Recopila tus métricas de Prometheus
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recopila automáticamente las métricas y registros de tu aplicación
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limita la recopilación de datos a un subconjunto de contenedores solamente
- link: /agent/docker/tag/
  tag: Documentación
  text: Asigna etiquetas a todos los datos emitidos por un contenedor
title: Agente de Docker para Docker, containerd y Podman
---
## Descripción general {#overview}

El Datadog Docker Agent es una versión del [Datadog Agent][1] que soporta los runtimes de Docker, containerd y Podman. Para las versiones de Docker soportadas, consulta [Plataformas soportadas][2].

## Instala el Agente de Docker de Datadog {#install-the-datadog-docker-agent}
Sigue el [flujo de instalación en la aplicación en Datadog][3]. Este es el flujo recomendado, que te ayuda a crear tu comando `docker run` con tu clave de API de Datadog, la configuración mínima requerida y las opciones para varias características de Datadog.

{{< img src="/agent/basic_agent_usage/agent_install_docker.png" alt="Pasos de instalación en la aplicación para el Agente de Datadog en Docker." style="width:90%;">}}

## Ejecuta manualmente el Agente de Docker de Datadog {#manually-run-the-datadog-docker-agent}

El flujo de Fleet Automation ayuda a configurar tu contenedor del Datadog Agent con las instrucciones recomendadas por Datadog. Para configurarlo manualmente, consulta los ejemplos a continuación.

Usa el siguiente comando para ejecutar el Agente como contenedor Docker una vez en cada host que quieras monitorear. Reemplaza `<DATADOG_API_KEY>` con tu clave de API de Datadog y `<DATADOG_SITE>` con tu {{< region-param key=dd_site code="true" >}}.

{{< tabs >}}
{{% tab "Linux" %}}

```shell
docker run -d --cgroupns host --pid host --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e DD_SITE=<DATADOG_SITE> \
  -e DD_API_KEY=<DATADOG_API_KEY> \
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{% tab "Windows" %}}
El Agente de Datadog es compatible con Windows Server 2019 (LTSC) y Windows Server 2022 (LTSC). El siguiente comando de PowerShell ejecuta el contenedor del Agente de Datadog:

```powershell
docker run -d --name dd-agent `
  -v \\.\pipe\docker_engine:\\.\pipe\docker_engine `
  -e DD_SITE=<DATADOG_SITE> `
  -e DD_API_KEY=<DATADOG_API_KEY> `
  registry.datadoghq.com/agent:7
```
{{% /tab %}}
{{< /tabs >}}

**Nota**: Para Docker Compose, consulta [Compose y el Agente de Datadog][4]. Para implementar el Agente en Podman, consulta las instrucciones en [Usando la integración de Docker con el runtime de contenedores Podman][5].

## Integrations {#integrations}

Después de que el Agente de Docker de Datadog esté en funcionamiento, puedes configurar las integraciones de Datadog para recopilar métricas y registros automáticamente de tus contenedores de aplicación. El [Container Autodiscovery][7] de Datadog te permite definir la configuración de monitoreo para recursos dinámicos en sistemas contenedorizados.

## Opciones de configuración para el Agente de Docker de Datadog {#configuration-options-for-the-datadog-docker-agent}

### Registros de contenedores {#container-registries}

Las imágenes están disponibles para arquitecturas de 64 bits x86 y Arm v8. Datadog publica imágenes de contenedores en el Registro de Contenedores de Datadog, Google Artifact Registry (GAR), Amazon ECR, Azure ACR y Docker Hub:

{{% container-images-table %}}

Por defecto, las instrucciones anteriores extraen la imagen del Registro de Contenedores de Datadog (`registry.datadoghq.com`). Si usas este registro, asegúrate de que tu firewall permita el tráfico a `us-docker.pkg.dev/datadog-prod/public-images`, ya que el registro puede redirigir solicitudes a esta URL.

<div class="alert alert-warning">Docker Hub está sujeto a límites de tasa de extracción de imágenes. Si no eres un cliente de Docker Hub, Datadog recomienda que actualices tu configuración para extraer de otro registro. Para instrucciones, consulta <a href="/agent/guide/changing_container_registry">Cambiando tu registro de contenedores</a>.</div>

### Variables de entorno {#environment-variables}

En un entorno no contenedorizado, las opciones de configuración para el Agente de Datadog se establecen en [`datadog.yaml`][8]. Para el Agente de Docker de Datadog, puedes establecer `datadog.yaml` opciones de configuración a través de variables de entorno.

#### Opciones globales {#global-options}

`DD_API_KEY`
: Tu clave de API de Datadog (**requerida**).

`DD_ENV`
: Establece la etiqueta global `env` para todos los datos emitidos.

`DD_HOSTNAME`
: Nombre de servidor a utilizar para métricas (si la autodetección falla).

`DD_HOSTNAME_FILE`
: En algunos entornos, la autodetección del nombre de servidor no es adecuada, y no puedes establecer el valor con variables de entorno. En estos casos, puedes usar un archivo en el servidor para proporcionar un valor apropiado. Si `DD_HOSTNAME` se establece en un valor no vacío, esta opción se ignora.

`DD_TAGS`
: Etiquetas de servidor separadas por espacios. Por ejemplo: `key1:value1 key2:value2`.

`DD_SITE`
: Sitio de destino para tus métricas, trazas y registros. Establece tu sitio de Datadog en: `{{< region-param key="dd_site" >}}`. Defaults to `datadoghq.com`.

`DD_DD_URL`
: Configuración opcional para anular la URL para la presentación de métricas.

`DD_URL` (6.36+/7.36+)
: Alias para `DD_DD_URL`. Ignorado si `DD_DD_URL` ya está configurado.

`DD_CHECK_RUNNERS`
: El Agente ejecuta todas las verificaciones de manera concurrente por defecto (valor por defecto = `4` ejecutores). Para ejecutar las verificaciones de manera secuencial, establece el valor en `1`. Si necesitas ejecutar un alto número de verificaciones (o verificaciones lentas), el componente `collector-queue` puede quedarse atrás y fallar la verificación de salud. Puedes aumentar el número de ejecutores para ejecutar verificaciones en paralelo.

`DD_APM_ENABLED`
: Habilita la recolección de trazas. El valor predeterminado es `true`. Para más información sobre variables de entorno adicionales para la recolección de traza, consulta [Trazado de aplicaciones Docker][9].

`DD_LOGS_CONFIG_EXPECTED_TAGS_DURATION`
: En algunos entornos, los registros iniciales de los servidores pueden no incluir las etiquetas correctas. Si te faltan etiquetas en nuevos servidores en tus registros, incluye esta variable de entorno y configúrala en `"10m"`.

#### Configuraciones de Proxy {#proxy-settings}

A partir de la versión 6.4.0 del Agent (y 6.5.0 para el Trace Agent), puedes anular las configuraciones de proxy del Agent con las siguientes variables de entorno:

`DD_PROXY_HTTP`
: Una URL HTTP para usar como proxy para solicitudes de `http`.

`DD_PROXY_HTTPS`
: Una URL HTTPS para usar como proxy para solicitudes de `https`.

`DD_PROXY_NO_PROXY`
: Una lista de URL separadas por espacios para las cuales no se debe usar proxy.

Para más información sobre configuraciones de proxy, consulta la [documentación del Agent v6 sobre proxy][10].

#### Agentes de recolección opcionales {#optional-collection-agents}

Los agentes de recolección opcionales están deshabilitados por defecto por razones de seguridad o rendimiento. Usa estas variables de entorno para habilitarlos:

`DD_APM_NON_LOCAL_TRAFFIC`
: Permite tráfico no local al [tracing from other containers][11].

`DD_LOGS_ENABLED`
: Habilita [la recolección de registros][12] con el Logs Agent.

`DD_PROCESS_CONFIG_PROCESS_COLLECTION_ENABLED`
: Habilita [la recolección de procesos en vivo][13] con el Process Agent. La [visualización de contenedor en vivo][14] ya está habilitada por defecto si el socket de Docker está disponible.

#### DogStatsD (métricas personalizadas) {#dogstatsd-custom-metrics}

Enviar métricas personalizadas con [el protocolo StatsD][15]:

`DD_DOGSTATSD_NON_LOCAL_TRAFFIC`
: Escuchar paquetes de DogStatsD de otros contenedores (requerido para enviar métricas personalizadas).

`DD_HISTOGRAM_PERCENTILES`
: Los percentiles del histograma a calcular (separados por espacios). El valor predeterminado es `0.95`.

`DD_HISTOGRAM_AGGREGATES`
: Los agregados del histograma a calcular (separados por espacios). El valor predeterminado es `"max median avg count"`.

`DD_DOGSTATSD_SOCKET`
: Ruta al socket unix para escuchar. Debe estar en un `rw` volumen montado.

`DD_DOGSTATSD_ORIGIN_DETECTION`
: Habilita la detección y etiquetado de contenedores para métricas de socket UNIX.

`DD_DOGSTATSD_TAGS`
: Etiquetas adicionales para agregar a todas las métricas, eventos y verificaciones de servicio recibidos por este servidor DogStatsD. Por ejemplo: `"env:golden group:retrievers"`.

`DD_USE_DOGSTATSD`
: Habilita o deshabilita el envío de métricas personalizadas desde la biblioteca DogStatsD.
Conoce más sobre [DogStatsD sobre Unix Domain Sockets][16].

#### Etiquetado {#tagging}

Como mejor práctica, Datadog recomienda usar [unified service tagging][17] al asignar etiquetas.

Datadog recopila automáticamente etiquetas comunes de Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher. Para extraer aún más etiquetas, utiliza las siguientes opciones:

`DD_CONTAINER_LABELS_AS_TAGS`
: Extraer etiquetas de contenedor. Este entorno es equivalente a `DD_DOCKER_LABELS_AS_TAGS`.

`DD_CONTAINER_ENV_AS_TAGS`
: Extraer variables de entorno del contenedor. Este entorno es equivalente a `DD_DOCKER_ENV_AS_TAGS`.

`DD_COLLECT_EC2_TAGS`
: Extraer etiquetas personalizadas de EC2 sin usar la integración de AWS.

Consulta la documentación de [Extracción de Etiquetas de Docker][18] para aprender más.

#### Usando archivos secretos {#using-secret-files}

Las credenciales de integración pueden almacenarse en secretos de Docker o Kubernetes y usarse en plantillas de Autodiscovery. Para más información, consulta la documentación de [Gestión de Secretos][19].

#### Ignorar contenedores {#ignore-containers}

Excluir contenedores de la recolección de registros, recolección de métricas y Autodiscovery. Datadog excluye contenedores de Kubernetes y OpenShift `pause` por defecto. Las listas de contenedores permitidos y bloqueados se aplican únicamente a Autodiscovery; las trazas y DogStatsD no se ven afectados. El valor de estas variables de entorno admite expresiones regulares.

`DD_CONTAINER_INCLUDE`
: Lista de contenedores permitidos a incluir (separados por espacios). Usa `.*` para incluir todos. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*` Cuando uses ImageStreams dentro de entornos de OpenShift, usa el nombre del contenedor en lugar de la imagen. Por ejemplo: `"name:container_name_1 name:container_name_2"`, `name:.*`

`DD_CONTAINER_EXCLUDE`
: Lista de contenedores bloqueados a excluir (separados por espacios). Utiliza `.*` para excluir todo. Por ejemplo: `"image:image_name_3 image:image_name_4"`, `image:.*` (**Nota**: Esta variable solo se aplica para Autodiscovery.)

`DD_CONTAINER_INCLUDE_METRICS`
: Lista de contenedores permitidos cuyas métricas deseas incluir.

`DD_CONTAINER_EXCLUDE_METRICS`
: Lista de contenedores bloqueados cuyas métricas deseas excluir.

`DD_CONTAINER_INCLUDE_LOGS`
: Lista de contenedores permitidos cuyos registros deseas incluir.

`DD_CONTAINER_EXCLUDE_LOGS`
: Lista de contenedores bloqueados cuyos registros deseas excluir.

`DD_AC_INCLUDE`
: **Obsoleto**. Lista de contenedores permitidos a incluir (separados por espacios). Utiliza `.*` para incluir todo. Por ejemplo: `"image:image_name_1 image:image_name_2"`, `image:.*`

`DD_AC_EXCLUDE`
: **Obsoleto**. Lista de contenedores bloqueados a excluir (separados por espacios). Utiliza `.*` para excluir todo. Por ejemplo: `"image:image_name_3 image:image_name_4"`, `image:.*` (**Nota**: Esta variable solo se aplica para Autodiscovery.)

Ejemplos adicionales están disponibles en la página de [Gestión de Descubrimiento de Contenedores][20].

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estas configuraciones. Todos los contenedores se cuentan. Esto no afecta tu facturación por contenedor.

**Nota**: Al usar containerd, es posible ignorar contenedores por espacio de nombres usando `DD_CONTAINERD_NAMESPACES` y `DD_CONTAINERD_EXCLUDE_NAMESPACES`. Ambos son una lista de espacios de nombres separados por espacios. Cuando `DD_CONTAINERD_NAMESPACES` está configurado, el agente informa datos para los contenedores que pertenecen a un espacio de nombres presente en la lista. Cuando `DD_CONTAINERD_EXCLUDE_NAMESPACES` está configurado, el agente informa datos para todos los contenedores excepto los que pertenecen a un espacio de nombres de la lista.

#### Autodiscovery {#autodiscovery}

`DD_LISTENERS`
: Listeners de Autodiscovery para ejecutar.

`DD_EXTRA_LISTENERS`
: Listeners adicionales de Autodiscovery para ejecutar. Se añaden además de las variables definidas en la sección `listeners` del archivo de configuración `datadog.yaml`.

`DD_CONFIG_PROVIDERS`
: Los proveedores que el Agente debe llamar para recopilar configuraciones de chequeo. El proveedor predeterminado es `docker`. El proveedor de Docker maneja plantillas incrustadas en las etiquetas de los contenedores.

`DD_EXTRA_CONFIG_PROVIDERS`
: Proveedores de configuración de Autodiscovery adicionales a utilizar. Se añaden además de las variables definidas en la sección `config_providers` del archivo de configuración `datadog.yaml`.

#### Varios {#miscellaneous}

`DD_PROCESS_AGENT_CONTAINER_SOURCE`
: Anula la detección automática de la fuente del contenedor para forzar una única fuente. p. ej. `"docker"`, `"ecs_fargate"`, `"kubelet"`. Esto ya no es necesario desde la versión 7.35.0 del Agente.

`DD_HEALTH_PORT`
: Establezca esto en `5555` para exponer la verificación de salud del Agente en el puerto `5555`.

## Comandos {#commands}

Consulte las [guías de comandos del Agente][21] para descubrir todos los comandos del Agente de Docker.

## Datos recopilados {#data-collected}

### Métricas {#metrics}

Por defecto, el Agente de Docker recopila métricas con las siguientes verificaciones principales. Para recopilar métricas de otras tecnologías, consulte la sección [Integraciones](#integrations).

| Verificación       | Métricas       |
| ----------- | ------------- |
| Contenedor   | [Métricas][22] |
| CPU         | [System][23]  |
| Disco        | [Disco][24]    |
| Docker      | [Docker][25]  |
| Manejador de Archivos | [Sistema][23]  |
| IO          | [Sistema][23]  |
| Carga        | [Sistema][23]  |
| Memoria      | [Sistema][23]  |
| Red         | [Red][26] |
| NTP         | [NTP][27]     |
| Tiempo de actividad | [Sistema][23]  |

### Eventos {#events}

El Agente de Docker envía eventos a Datadog cuando se inicia o reinicia un Agente.

### Verificaciones de servicio {#service-checks}

**datadog.agent.up** <br>
Devuelve `CRITICAL` si el Agente no puede conectarse a Datadog, de lo contrario devuelve `OK`.

**datadog.agent.check_status** <br>
Devuelve `CRITICAL` si una verificación del Agente no puede enviar métricas a Datadog, de lo contrario devuelve `OK`.

## Desinstalar instrumentación APM de un solo paso {#uninstall-single-step-apm-instrumentation}

Si instalaste el Agente de Docker de Datadog con instrumentación APM de un solo paso y deseas desinstalar el Agente, necesitas [ejecutar comandos adicionales][28] para desinstalar la instrumentación APM.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/
[2]: /es/agent/supported_platforms/?tab=cloudandcontainers
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[4]: /es/containers/guide/compose-and-the-datadog-agent/
[5]: /es/containers/guide/podman-support-with-docker-integration/
[6]: /es/containers/docker/integrations/
[7]: /es/getting_started/containers/autodiscovery
[8]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file
[9]: /es/containers/docker/apm/
[10]: /es/agent/configuration/proxy/#agent-v6
[11]: /es/containers/docker/apm/?tab=linux#tracing-from-other-containers
[12]: /es/containers/docker/log/
[13]: /es/infrastructure/process/
[14]: /es/infrastructure/livecontainers/
[15]: /es/extend/dogstatsd/
[16]: /es/extend/dogstatsd/unix_socket/
[17]: /es/getting_started/tagging/unified_service_tagging/?tab=docker
[18]: /es/containers/docker/tag
[19]: /es/agent/configuration/secrets-management/?tab=linux
[20]: /es/containers/guide/container-discovery-management/?tab=containerizedagent
[21]: /es/agent/configuration/agent-commands/
[22]: /es/integrations/container/
[23]: /es/integrations/system/#metrics
[24]: /es/integrations/disk/#metrics
[25]: /es/containers/docker/data_collected/#metrics
[26]: /es/integrations/network/#metrics
[27]: /es/integrations/ntp/#metrics
[28]: /es/tracing/trace_collection/automatic_instrumentation/single-step-apm/docker/#remove-single-step-apm-instrumentation-from-your-agent