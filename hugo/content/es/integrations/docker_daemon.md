---
app_id: Docker
app_uuid: ca1a7870-7d95-40c7-9790-ef6c1e928967
assets:
  dashboards:
    docker: assets/dashboards/docker_dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: docker.containers.running
      metadata_path: metadata.csv
      prefix: Docker.
    process_signatures:
    - dockerd
    - docker-containerd
    - ejecución de Docker
    - docker daemon
    - docker-containerd-shim
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 73
    source_type_name: Docker
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- contenedores
- recopilación de logs
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/docker_daemon/README.md
display_on_public_website: true
draft: false
git_integration_title: docker_daemon
integration_id: Docker
integration_title: Docker Daemon
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: docker_daemon
public_title: Docker Daemon
short_description: Correlacionar el rendimiento del contenedor con el de los servicios
  que se ejecutan en su interior.
supported_os:
- linux
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Containers
  - Category::Log Collection
  - Category::Network
  - Offering::Integration
  configuration: README.md#Setup
  description: Correlacionar el rendimiento del contenedor con el de los servicios
    que se ejecutan en su interior.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent
  - resource_type: documentación
    url: https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/the-docker-monitoring-problem
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
  - resource_type: documentación
    url: https://www.datadoghq.com/docker-adoption
  support: README.md#Support
  title: Docker Daemon
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


**Nota**: El check de Docker Daemon todavía se mantiene, pero solo funciona con el **Agent v5**.

<div class="alert alert-danger">
<b>Para utilizar la integración de Docker con el Agent v6 consulta la <a href="#Agent-v6">sección Agent v6</a> a continuación.</b>
</div>

![Dashboard predeterminado de Docker][1]

## Información general

Configura este check del Agent para obtener métricas del servicio de Docker_daemon en tiempo real para lo siguiente:

* Visualizar y monitoritorizar los estados de Docker_daemon.
* Recibir notificaciones sobre las conmutaciones por error y eventos de Docker_daemon.

## Configuración
### Instalación

Para recopilar métricas de Docker sobre todos tus contenedores, ejecuta **un** Datadog Agent en cada host. Hay dos formas de ejecutar el Agent: directamente en cada host o en un [contenedor de docker-dd-agent][2] (recomendado).

Para cualquiera de las opciones, tus hosts necesitan una gestión de memoria de grupo activada para que el check de Docker tenga éxito. Consulta el [repositorio de docker-dd-agent][3] para saber cómo activarla.

#### Instalación del host

1. Asegúrate de que Docker se esté ejecutando en el host.
2. Instala el Agent tal y como se describe en [las instrucciones de instalación del Agent ][4] para tu sistema operativo del host.
3. Activa [el ícono de integración de Docker en la aplicación][5].
4. Añade el usuario del Agent al grupo de Docker: `usermod -a -G docker dd-agent`
5. Crea un archivo `docker_daemon.yaml` copiando [el archivo de ejemplo en el directorio de Agent conf.d][6]. Si tienes una instalación estándar de Docker en tu host, no debería haber nada que necesites cambiar para que la integración funcione.
6. Para activar otras integraciones, utiliza `docker ps` para identificar los puertos utilizados por las aplicaciones correspondientes.
    ![Comando ps de Docker][7]

#### Instalación del contenedor

1. Asegúrate de que Docker se esté ejecutando en el host.
2. Según [las instrucciones de instalación del contenedor de Docker][8], ejecuta lo siguiente:

        docker run -d --name dd-agent \
          -v /var/run/docker.sock:/var/run/docker.sock:ro \
          -v /proc/:/host/proc/:ro \
          -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
          -e API_KEY={YOUR_DD_API_KEY} \
          datadog/docker-dd-agent:latest

En el comando anterior, puedes pasar tu clave de la API al Datadog Agent utilizando la marca de la variable de entorno `-e` de Docker. Otras variables son:

| **Variable**                                                                                      | **Descripción**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Configura tu clave de la API de Datadog.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | Configura el nombre del host en el archivo `datadog.conf`del contenedor del Agent. Si no se configura esta variable, el contenedor del Agent utiliza valores predeterminados para el campo `Name` (tal y como se indica en el comando `docker info`) como el nombre del host del contenedor del Agent.  |
| DD_URL                                                                                            | Configura la URL del servidor de entrada de Datadog al que el Agent envía los datos. Esto es útil cuando [se utiliza el Agent como proxy][9].                                                                                                              |
| LOG_LEVEL                                                                                         | Configura el nivel de detalle del registro (CRÍTICO, ERROR, ADVERTENCIA, INFORMACIÓN, DEPURAR). Por ejemplo, `-e LOG_LEVEL=DEBUG` configura el registro en el modo de depuración.                                                                                                    |
| ETIQUETAS                                                                                              | Configura etiquetas (tags) del host como una cadena delimitada por comas. Están disponibles tanto etiquetas (tags) simples como etiquetas clave-valor, por ejemplo: `-e etiquetas (tags)="simple-etiquetar, etiquetar-clave:etiquetar-valor"`.                                                                           |
| EC2_TAGS                                                                                          | Activar esta función permite al Agent consultar y capturar el conjunto de etiquetas personalizadas utilizando la API de EC2 durante el inicio. Para activarla, utiliza `-e EC2_TAGS=yes`. **Nota**: Esta función requiere un rol IAM asociado a la instancia.        |
| NON_LOCAL_TRAFFIC                                                                                 | Activar esta función permite informar StatsD desde cualquier IP externa. Para activarla, utiliza `-e NON_LOCAL_TRAFFIC=yes`. Esto se usa para informar métricas desde otros contenedores o sistemas. Consulta la [configuración de red][10] para obtener más detalles. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | Define detalles de la configuración de proxy. **Nota**: `PROXY_PASSWORD` es obligatorio para pasar una contraseña de autenticación y no puede renombrarse. Para más información, consulta la [documentación de proxy del Agent][11].                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Activa y configura Autodiscovery. Para más información, consulta la [guía de Autodiscovery][12].                                                                                                                                   |

**Nota**: Añade `--restart=unless-stopped` si quieres que tu Agent sea resistente a los reinicios.

#### Ejecutar el contenedor del Agent en Amazon Linux

Para ejecutar el contenedor del Datadog Agent en Amazon Linux, haz este cambio en la localización de montaje de volumen `cgroup`:

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest
```

#### Contenedor basado en Alpine Linux

La imagen estándar de Docker está basada en Debian Linux, pero a partir del Datadog Agent v5.7, existe una imagen basada en [Alpine Linux][13]. La imagen de Alpine Linux es considerablemente más pequeña que la imagen tradicional basada en Debian. También hereda el diseño orientado a la seguridad de Alpine.

Para utilizar la imagen de Alpine Linux, añade `-alpine` a la etiqueta de la versión. Por ejemplo:

```
docker run -d --name dd-agent \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -v /proc/:/host/proc/:ro \
  -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
  -e API_KEY={YOUR API KEY} \
  datadog/docker-dd-agent:latest-alpine
```

#### Versión de imágenes
A partir de la versión 5.5.0 del Datadog Agent, la imagen de Docker sigue un nuevo patrón de versión. Esto permite a Datadog publicar cambios en la imagen de Docker del Datadog Agent, pero con la misma versión del Agent.

La versión de la imagen de Docker tiene el siguiente patrón: **X.Y.Z** donde **X** es la versión principal de la imagen de Docker, **Y** es la versión secundaria y **Z** representa la versión del Agent.

Por ejemplo, la primera versión de la imagen de Docker que incluye el Datadog Agent 5.5.0 es: `10.0.550`

#### Contenedores personalizados e información adicional

Para obtener más información sobre la creación de contenedores personalizados de Docker con el Datadog Agent, la imagen basada en Alpine Linux, el control de versiones, etc., consulta el [proyecto docker-dd-agent en Github][2].

### Validación

[Ejecuta el subcomando de estado del Agent][14] y busca `docker_daemon` en la sección Checks.

## Agent v6

El último check de Docker se denomina `docker` y está escrito en Go para aprovechar la nueva arquitectura interna. A partir de la versión 6.0, el Agent ya no carga el check `docker_daemon`, aunque siga disponible y se mantenga para el Agent v5. Todas las funciones se portan en la versión >6.0, excepto las obsoletas siguientes:

  * Las opciones `url`, `api_version` y `tags*` están obsoletas. Se fomenta el uso directo de las [variables de entorno estándar de Docker][15].
  * Las opciones `ecs_tags`, `performance_tags` y `container_tags` están obsoletas. Cada etiqueta relevante se recopila de modo predeterminado.
  * La opción `collect_container_count` para activar la métrica`docker.container.count` no es compatible. Deben utilizarse `docker.containers.running` y `.stopped`.

Algunas opciones se han movido de `docker_daemon.yaml` al archivo `datadog.yaml` principal:

  * `collect_labels_as_tags` ha pasado a llamarse `docker_labels_as_tags` y admite etiquetas de cardinalidad alta. Consulta los detalles en `datadog.yaml.example`.
  * `exclude` y `include` han pasado a denominarse `ac_include` y `ac_exclude`. Para que el filtrado sea coherente en todos los componentes del Agent, se ha suprimido el filtrado en etiquetas  arbitrario. Los únicos filtros admitidos en etiquetas son `image` (nombre de la imagen) y `name` (nombre del contenedor). El filtrado de expresiones regulares sigue estando disponible; consulta `datadog.yaml.example` para ver ejemplos.
  * La opción `docker_root` se ha dividido en dos opciones: `container_cgroup_root` y `container_proc_root`.
  * `exclude_pause_container` se ha añadido para excluir los contenedores en pausa en Kubernetes y Openshift (el valor predeterminado es true). Esto evita eliminarlos de la lista por error.

Cambios adicionales:

  * La variable de entorno `TAGS` ha pasado a llamarse `DD_TAGS`.
  * El repositorio de Docker Hub ha cambiado de [datadog/docker-dd-agent][16] a [datadog/agent][17].

El comando [`import`][18] convierte el antiguo `docker_daemon.yaml` en el nuevo `docker.yaml`. El comando también traslada las configuraciones necesarias de `docker_daemon.yaml` a `datadog.yaml`.

## Datos recopilados
### Métricas
{{< get-metrics-from-git "docker" >}}


### Eventos
La integración de Docker produce los siguientes eventos:

* Eliminar imagen
* Expirar
* Error
* Fallo
* Terminar
* Sin memoria (oom)
* Pausa
* Reiniciar el contenedor
* Reiniciar el Daemon
* Actualización

### Checks de servicio
{{< get-service-checks-from-git "docker" >}}


**Nota**: Para utilizar `docker.exit`, añade `collect_exit_codes: true` en tu [archivo Docker YAML][21] y reinicia el Agent.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][22].

## Referencias adicionales

* [Compose y el Datadog Agent ][23]
* [DogStatsD y Docker][24]
* [El problema de la monitorización de Docker][25] (serie)
* [Cómo monitorizar métricas de recursos de Docker][26]
* [Cómo recopilar métricas de Docker][27]
* [8 Datos sorprendentes sobre la adopción de Real Docker ][28]
* [Monitorización de Docker en Amazon ECS][29]
* [Adaptar Datadog a Docker][30]
* [Monitorizar Docker con Datadog][31]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png
[2]: https://github.com/DataDog/docker-dd-agent
[3]: https://github.com/DataDog/docker-dd-agent#cgroups
[4]: https://app.datadoghq.com/account/settings/agent/latest
[5]: https://app.datadoghq.com/account/settings#integrations/docker
[6]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example
[7]: https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png
[8]: https://app.datadoghq.com/account/settings/agent/latest?platform=docker
[9]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy
[10]: https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration
[11]: https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy
[12]: https://docs.datadoghq.com/es/agent/autodiscovery
[13]: https://alpinelinux.org
[14]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[15]: https://docs.docker.com/engine/reference/commandline/cli/#environment-variables
[16]: https://hub.docker.com/r/datadog/docker-dd-agent
[17]: https://hub.docker.com/r/datadog/agent
[18]: https://docs.datadoghq.com/es/agent/#cli
[19]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/metadata.csv
[20]: https://github.com/DataDog/integrations-core/blob/master/docker_daemon/assets/service_checks.json
[21]: https://github.com/DataDog/integrations-core/blob/7.39.0/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example#L151-L154
[22]: https://docs.datadoghq.com/es/help
[23]: https://docs.datadoghq.com/es/agent/guide/compose-and-the-datadog-agent
[24]: https://docs.datadoghq.com/es/integrations/faq/dogstatsd-and-docker
[25]: https://www.datadoghq.com/blog/the-docker-monitoring-problem
[26]: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
[27]: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
[28]: https://www.datadoghq.com/docker-adoption
[29]: https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs
[30]: https://www.datadoghq.com/blog/docker-performance-datadog
[31]: https://www.datadoghq.com/blog/monitor-docker-datadog
