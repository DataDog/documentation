---
aliases:
- /es/integrations/docker_daemon
app_id: Docker
categories:
- rastreo
- recopilación de logs
- red
custom_kind: integración
description: Correlacionar el rendimiento del contenedor con el de los servicios que
  se ejecutan en su interior.
further_reading:
- link: https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent
  tag: documentación
  text: Documentación sobre el daemon de Docker
- link: https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker
  tag: documentación
  text: Documentación sobre el daemon de Docker
- link: https://www.datadoghq.com/blog/the-docker-monitoring-problem
  tag: blog
  text: El problema de la monitorización de Docker
- link: https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics
  tag: blog
  text: Cómo monitorizar métricas de recursos de Docker
- link: https://www.datadoghq.com/blog/how-to-collect-docker-metrics
  tag: blog
  text: Cómo recopilar métricas de Docker
- link: https://www.datadoghq.com/docker-adoption
  tag: documentación
  text: 8 datos sorprendentes sobre la adopción real de Docker
integration_version: 1.12.0
media: []
supported_os:
- linux
- macos
title: Docker Daemon
---
**Nota**: El check de Docker Daemon todavía se mantiene, pero solo funciona con el **Agent v5**.

<div class="alert alert-warning">
<b>Para utilizar la integración de Docker con el Agent v6 consulta la <a href="#Agent-v6">sección Agent v6</a> a continuación.</b>
</div>

![Dashboard predeterminado de Docker](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/docker.png)

## Información general

Configura este check del Agent para obtener métricas del servicio de Docker_daemon en tiempo real para lo siguiente:

- Visualizar y monitoritorizar los estados de Docker_daemon.
- Recibir notificaciones sobre las conmutaciones por error y eventos de Docker_daemon.

## Configuración

### Instalación

Para recopilar métricas de Docker sobre todos tus contenedores, ejecuta **un** Datadog Agent en cada host. Hay dos maneras de ejecutar el Agent: directamente en cada host, o dentro de un [contenedor docker-dd-agent](https://github.com/DataDog/docker-dd-agent) (recomendado).

Para cualquiera de las opciones, tus hosts necesitan la gestión de memoria cgroup habilitada para que el check de Docker tenga éxito. Consulta el [repositorio docker-dd-agent](https://github.com/DataDog/docker-dd-agent#cgroups) para saber cómo habilitarlo.

#### Instalación del host

1. Asegúrate de que Docker se esté ejecutando en el host.
1. Instala el Agent como se describe en [las instrucciones de instalación del Agent ](https://app.datadoghq.com/account/settings/agent/latest) para tu sistema operativo anfitrión.
1. Activa [el cuadro de integración de Docker en la aplicación](https://app.datadoghq.com/account/settings#integrations/docker).
1. Añade el usuario del Agent al grupo de Docker: `usermod -a -G docker dd-agent`
1. Crea un archivo `docker_daemon.yaml` copiando [el archivo de ejemplo en el directorio conf.d del Agent](https://github.com/DataDog/integrations-core/blob/master/docker_daemon/datadog_checks/docker_daemon/data/conf.yaml.example). Si tienes una instalación estándar de Docker en tu host, no debería haber nada que necesites cambiar para que la integración funcione.
1. Para activar otras integraciones, utiliza `docker ps` para identificar los puertos utilizados por las aplicaciones correspondientes.
   ![Comando ps de Docker](https://raw.githubusercontent.com/DataDog/integrations-core/master/docker_daemon/images/integrations-docker-dockerps.png)

#### Instalación del contenedor

1. Asegúrate de que Docker se esté ejecutando en el host.

1. Según [las instrucciones de instalación del contenedor de Docker](https://app.datadoghq.com/account/settings/agent/latest?platform=docker), ejecuta:

   ```
    docker run -d --name dd-agent \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      -v /proc/:/host/proc/:ro \
      -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
      -e API_KEY={YOUR_DD_API_KEY} \
      datadog/docker-dd-agent:latest
   ```

En el comando anterior, puedes pasar tu clave de la API al Datadog Agent utilizando la marca de la variable de entorno `-e` de Docker. Otras variables son:

| **Variable**                                                                                      | **Descripción**                                                                                                                                                                                                                  |
|---------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| API_KEY                                                                                           | Configura tu clave de la API de Datadog.                                                                                                                                                                                                       |
| DD_HOSTNAME                                                                                       | Configura el nombre del host en el archivo `datadog.conf`del contenedor del Agent. Si no se configura esta variable, el contenedor del Agent utiliza valores predeterminados para el campo `Name` (tal y como se indica en el comando `docker info`) como el nombre del host del contenedor del Agent.  |
| DD_URL                                                                                            | Establece la URL del servidor de admisión de Datadog donde el Agent envía los datos. Esto es útil cuando [se utiliza el Agent como proxy](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-the-agent-as-a-proxy).                                                                                                              |
| LOG_LEVEL                                                                                         | Configura el nivel de detalle del registro (CRÍTICO, ERROR, ADVERTENCIA, INFORMACIÓN, DEPURAR). Por ejemplo, `-e LOG_LEVEL=DEBUG` configura el registro en el modo de depuración.                                                                                                    |
| ETIQUETAS                                                                                              | Configura etiquetas (tags) del host como una cadena delimitada por comas. Están disponibles tanto etiquetas (tags) simples como etiquetas clave-valor, por ejemplo: `-e etiquetas (tags)="simple-etiquetar, etiquetar-clave:etiquetar-valor"`.                                                                           |
| EC2_TAGS                                                                                          | Activar esta función permite al Agent consultar y capturar el conjunto de etiquetas personalizadas utilizando la API de EC2 durante el inicio. Para activarla, utiliza `-e EC2_TAGS=yes`. **Nota**: Esta función requiere un rol IAM asociado a la instancia.        |
| NON_LOCAL_TRAFFIC                                                                                 | Habilitar esta función permite la generación de informes StatsD desde cualquier IP externa. Para habilitarla, utiliza `-e NON_LOCAL_TRAFFIC=yes`. Esto se usa para informar métricas desde otros contenedores o sistemas. Consulta [configuración de red](https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration) para obtener más detalles. |
| PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASSWORD                                                | Define los detalles de configuración del proxy. **Nota**: `PROXY_PASSWORD` es necesario para pasar una contraseña de autenticación y no puede renombrarse. Para más información, consulta la [documentación del proxy del Agent](https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration#using-a-web-proxy-as-proxy).                                                                                                                                  |
| SD_BACKEND, SD_CONFIG_BACKEND, SD_BACKEND_HOST, SD_BACKEND_PORT, SD_TEMPLATE_DIR, SD_CONSUL_TOKEN | Habilita y configura Autodiscovery. Para más información, consulta la [guía de Autodiscovery](https://docs.datadoghq.com/agent/autodiscovery).                                                                                                                                   |

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

La imagen estándar de Docker se basa en Debian Linux, pero a partir del Datadog Agent v5.7, existe una imagen basada en [Alpine Linux](https://alpinelinux.org). La imagen Alpine Linux es considerablemente más pequeña que la imagen tradicional basada en Debian. También hereda el diseño orientado a la seguridad de Alpine.

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

Para obtener más información sobre la creación de contenedores de Docker personalizados con el Datadog Agent, la imagen basada en Alpine Linux, el control de versiones, etc., consulta el [proyecto docker-dd-agent en Github](https://github.com/DataDog/docker-dd-agent).

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `docker_daemon` en la sección Checks.

## Agent v6

El último check de Docker se denomina `docker` y está escrito en Go para aprovechar la nueva arquitectura interna. A partir de la versión 6.0, el Agent ya no carga el check `docker_daemon`, aunque siga disponible y se mantenga para el Agent v5. Todas las funciones se portan en la versión >6.0, excepto las obsoletas siguientes:

- Las opciones `url`, `api_version` y `tags*` están obsoletas. Se recomienda el uso directo de las [variables de entorno estándar de Docker](https://docs.docker.com/engine/reference/commandline/cli/#environment-variables).
- Las opciones `ecs_tags`, `performance_tags` y `container_tags` están obsoletas. Cada etiqueta relevante se recopila de modo predeterminado.
- La opción `collect_container_count` para activar la métrica`docker.container.count` no es compatible. Deben utilizarse `docker.containers.running` y `.stopped`.

Algunas opciones se han movido de `docker_daemon.yaml` al archivo `datadog.yaml` principal:

- `collect_labels_as_tags` ha pasado a llamarse `docker_labels_as_tags` y admite etiquetas de cardinalidad alta. Consulta los detalles en `datadog.yaml.example`.
- `exclude` y `include` han pasado a denominarse `ac_include` y `ac_exclude`. Para que el filtrado sea coherente en todos los componentes del Agent, se ha suprimido el filtrado en etiquetas  arbitrario. Los únicos filtros admitidos en etiquetas son `image` (nombre de la imagen) y `name` (nombre del contenedor). El filtrado de expresiones regulares sigue estando disponible; consulta `datadog.yaml.example` para ver ejemplos.
- La opción `docker_root` se ha dividido en dos opciones: `container_cgroup_root` y `container_proc_root`.
- `exclude_pause_container` se ha añadido para excluir los contenedores en pausa en Kubernetes y Openshift (el valor predeterminado es true). Esto evita eliminarlos de la lista por error.

Cambios adicionales:

- La variable de entorno `TAGS` ha pasado a llamarse `DD_TAGS`.
- El repositorio de Docker Hub ha cambiado de [datadog/docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent) a [datadog/agent](https://hub.docker.com/r/datadog/agent).

El comando [`import`](https://docs.datadoghq.com/agent/#cli) convierte el antiguo `docker_daemon.yaml` en el nuevo `docker.yaml`. El comando también mueve los ajustes necesarios de `docker_daemon.yaml` a `datadog.yaml`.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **docker.container.open_fds** <br>(gauge) | El número de descriptores de archivo abiertos<br>_Se muestra como archivo_ |
| **docker.container.size_rootfs** <br>(gauge) | Tamaño total de todos los archivos del contenedor<br>_Se muestra en bytes_ |
| **docker.container.size_rootfs.95percentile** <br>(gauge) | Percentil 95 de docker.container.size_rootfs<br>_Se muestra como byte_ |
| **docker.container.size_rootfs.avg** <br>(gauge) | Valor medio de docker.container.size_rootfs<br>_Se muestra como byte_ |
| **docker.container.size_rootfs.count** <br>(rate) | La tasa a la que el valor de docker.container.size_rw fue muestreado<br>_Se muestra como muestra_ |
| **docker.container.size_rootfs.max** <br>(gauge) | Valor máximo de docker.container.size_rootfs<br>_Se muestra como byte_ |
| **docker.container.size_rootfs.median** <br>(gauge) | Valor medio de docker.container.size_rootfs<br>_Se muestra como byte_ |
| **docker.container.size_rw** <br>(gauge) | Tamaño total de todos los archivos del contenedor que han sido creados o modificados por procesos que se ejecutan en el contenedor<br>_Se muestra en bytes_ |
| **docker.container.size_rw.95percentile** <br>(gauge) | Percentil 95 de docker.container.size_rw<br>_Se muestra como byte_ |
| **docker.container.size_rw.avg** <br>(gauge) | Valor medio de docker.container.size_rw<br>_Se muestra como byte_ |
| **docker.container.size_rw.count** <br>(rate) | La tasa a la que el valor de docker.container.size_rw fue muestreado<br>_Se muestra como muestra_ |
| **docker.container.size_rw.max** <br>(gauge) | Valor máximo de docker.container.size_rw<br>_Se muestra como byte_ |
| **docker.container.size_rw.median** <br>(gauge) | Valor medio de docker.container.size_rw<br>_Se muestra como byte_ |
| **docker.containers.running** <br>(gauge) | Número de contenedores que se ejecutan en este host etiquetados por imagen|
| **docker.containers.running.total** <br>(gauge) | El número total de contenedores que se ejecutan en este host|
| **docker.containers.stopped** <br>(gauge) | Número de contenedores detenidos en este host etiquetados por imagen|
| **docker.containers.stopped.total** <br>(gauge) | Número total de contenedores detenidos en este host|
| **docker.cpu.limit** <br>(gauge) | Límite de CPU disponible para el contenedor, expresado como porcentaje de un núcleo<br>_Se muestra como porcentaje_ |
| **docker.cpu.shares** <br>(gauge) | Cuotas de uso de CPU asignadas al contenedor|
| **docker.cpu.system** <br>(gauge) | El porcentaje de tiempo que la CPU está ejecutando llamadas al sistema en nombre de los procesos de este contenedor, sin normalizar<br>_Se muestra como porcentaje_ |
| **docker.cpu.system.95percentile** <br>(gauge) | Percentil 95 de docker.cpu.system \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.system.avg** <br>(gauge) | Valor medio de docker.cpu.system \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.system.count** <br>(rate) | La tasa a la que el valor de docker.cpu.system fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.cpu.system.max** <br>(gauge) | Valor máximo de docker.cpu.system<br>_Se muestra como porcentaje_ |
| **docker.cpu.system.median** <br>(gauge) | Valor medio de docker.cpu.system \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.throttled** <br>(gauge) | Número de veces que el cgroup ha sido limitado|
| **docker.cpu.usage** <br>(gauge) | El porcentaje de tiempo de CPU obtenido por este contenedor<br>_Se muestra como porcentaje_ |
| **docker.cpu.user** <br>(gauge) | El porcentaje de tiempo que la CPU está bajo el control directo de los procesos de este contenedor, sin normalizar<br>_Se muestra como porcentaje_ |
| **docker.cpu.user.95percentile** <br>(gauge) | Percentil 95 de docker.cpu.user \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.user.avg** <br>(gauge) | Valor medio de docker.cpu.user \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.user.count** <br>(rate) | La tasa a la que el valor de docker.cpu.user fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.cpu.user.max** <br>(gauge) | Valor máximo de docker.cpu.user \[obsoleto en el agent 6.0\]<br>_Se muestra como porcentaje_ |
| **docker.cpu.user.median** <br>(gauge) | Valor medio de docker.cpu.user [obsoleto en el agent 6.0]<br>_Se muestra como porcentaje_ |
| **docker.data.free** <br>(gauge) | Espacio libre en disco del grupo de almacenamiento<br>_Se muestra como byte_ |
| **docker.data.percent** <br>(gauge) | Porcentaje de almacenamiento utilizado<br>_Se muestra en porcentaje_ |
| **docker.data.total** <br>(gauge) | Espacio total en disco del grupo de almacenamiento<br>_Se muestra como byte_ |
| **docker.data.used** <br>(gauge) | Espacio de disco del grupo de almacenamiento utilizado<br>_Se muestra como byte_ |
| **docker.image.size** <br>(gauge) | Tamaño de todas las capas de la imagen en disco<br>_Se muestra como byte_ |
| **docker.image.virtual_size** <br>(gauge) | Tamaño de todas las capas de la imagen en disco<br>_Se muestra como byte_ |
| **docker.images.available** <br>(gauge) | El número de imágenes de nivel superior|
| **docker.images.intermediate** <br>(gauge) | El número de imágenes intermedias, que son capas intermedias que componen otras imágenes.|
| **docker.io.read_bytes** <br>(gauge) | Bytes leídos por segundo del disco por los procesos del contenedor<br>_Se muestra como byte_ |
| **docker.io.read_bytes.95percentile** <br>(gauge) | Percentil 95 de docker.io.read_bytes [obsoleto en el agent 6.0]<br>_Se muestra como byte_ |
| **docker.io.read_bytes.avg** <br>(gauge) | Valor medio de docker.io.read_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.io.read_bytes.count** <br>(rate) | La tasa a la que el valor de docker.io.read_bytes fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.io.read_bytes.max** <br>(gauge) | Valor máximo de docker.container.io.read_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.io.read_bytes.median** <br>(gauge) | Valor medio de docker.container.io.read_bytes [obsoleto en el agent 6.0]<br>_Se muestra como byte_ |
| **docker.io.write_bytes** <br>(gauge) | Bytes escritos por segundo en el disco por los procesos del contenedor<br>_Se muestra como byte_ |
| **docker.io.write_bytes.95percentile** <br>(gauge) | Percentil 95 de docker.io.write_bytes [obsoleto en el agent 6.0]<br>_Se muestra como byte_ |
| **docker.io.write_bytes.avg** <br>(gauge) | Valor medio de docker.io.write_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.io.write_bytes.count** <br>(rate) | La tasa a la que el valor de docker.io.write_bytes fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.io.write_bytes.max** <br>(gauge) | Valor máximo de docker.container.io.write_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.io.write_bytes.median** <br>(gauge) | Valor medio de docker.container.io.write_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.kmem.usage** <br>(gauge) | La cantidad de memoria del núcleo que pertenece a los procesos del contenedor.<br>_Se muestra como byte_ |
| **docker.mem.cache** <br>(gauge) | La cantidad de memoria que se está utilizando para almacenar en caché los datos del disco (por ejemplo, el contenido de la memoria que se puede asociar con precisión a un bloque en un dispositivo de bloques)<br>_Se muestra como byte_ |
| **docker.mem.cache.95percentile** <br>(gauge) | Valor del percentil 95 de docker.mem.cache \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.cache.avg** <br>(gauge) | Valor medio de docker.mem.cache \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.cache.count** <br>(rate) | La tasa a la que el valor de docker.mem.cache fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.cache.max** <br>(gauge) | Valor máximo de docker.mem.cache \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.cache.median** <br>(gauge) | Valor medio de docker.mem.cache \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.in_use** <br>(gauge) | La fracción de memoria utilizada respecto a la memoria disponible, SI EL LÍMITE ESTÁ ESTABLECIDO<br>_Se muestra como fracción_ |
| **docker.mem.in_use.95percentile** <br>(gauge) | Percentil 95 de docker.mem.in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.in_use.avg** <br>(gauge) | Valor medio de docker.mem.in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.in_use.count** <br>(rate) | La tasa a la que se muestreó el valor de docker.mem.in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.in_use.max** <br>(gauge) | Valor máximo de docker.container.mem.in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.in_use.median** <br>(gauge) | Valor medio de docker.container.mem.in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.limit** <br>(gauge) | El límite de memoria para el contenedor, si se establece<br>_Se muestra como byte_ |
| **docker.mem.limit.95percentile** <br>(gauge) | Percentil 95 de docker.mem.limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.limit.avg** <br>(gauge) | Valor medio de docker.mem.limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.limit.count** <br>(rate) | La tasa a la que el valor de docker.mem.limit fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.limit.max** <br>(gauge) | Valor máximo de docker.mem.limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.limit.median** <br>(gauge) | Valor medio de docker.mem.limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.rss** <br>(gauge) | La cantidad de memoria no caché que pertenece a los procesos del contenedor. Se utiliza para stacks tecnológicos, heaps, etc.<br>_Se muestra como byte_ |
| **docker.mem.rss.95percentile** <br>(gauge) | Valor del percentil 95 de docker.mem.rss \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.rss.avg** <br>(gauge) | Valor medio de docker.mem.rss \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.rss.count** <br>(rate) | La tasa a la que el valor de docker.mem.rss fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.rss.max** <br>(gauge) | Valor máximo de docker.mem.rss \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.rss.median** <br>(gauge) | Valor medio de docker.mem.rss \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.soft_limit** <br>(gauge) | El límite de reserva de memoria para el contenedor, si está establecido<br>_Se muestra como byte_ |
| **docker.mem.soft_limit.95percentile** <br>(gauge) | Percentil 95 de docker.mem.soft_limit. Normalmente este valor no cambiará<br>_Se muestra como byte_ |
| **docker.mem.soft_limit.avg** <br>(gauge) | Valor medio de docker.mem.soft_limit. Normalmente este valor no cambiará<br>_Se muestra como byte_ |
| **docker.mem.soft_limit.count** <br>(rate) | La tasa a la que el valor de docker.mem.soft_limit fue muestreado<br>_Se muestra como muestra_ |
| **docker.mem.soft_limit.max** <br>(gauge) | Valor máximo de docker.mem.soft_limit. Normalmente este valor no cambiará<br>_Se muestra como byte_ |
| **docker.mem.soft_limit.median** <br>(gauge) | Valor medio de docker.mem.soft_limit. Normalmente este valor no cambiará<br>_Se muestra como byte_ |
| **docker.mem.sw_in_use** <br>(gauge) | La fracción de swap + memoria utilizada según el swap + memoria disponible, si el límite se establece<br>_Se muestra como fracción_ |
| **docker.mem.sw_in_use.95percentile** <br>(gauge) | Percentil 95 de docker.mem.sw_in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.sw_in_use.avg** <br>(gauge) | Valor medio de docker.mem.sw_in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.sw_in_use.count** <br>(rate) | La tasa a la que el valor de docker.mem.sw_in_use fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.sw_in_use.max** <br>(gauge) | Valor máximo de docker.container.mem.sw_in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.sw_in_use.median** <br>(gauge) | Valor medio de docker.container.mem.sw_in_use \[obsoleto en el agent 6.0\]<br>_Se muestra como fracción_ |
| **docker.mem.sw_limit** <br>(gauge) | El límite de swap + memoria para el contenedor, si se establece<br>_Se muestra como byte_ |
| **docker.mem.sw_limit.95percentile** <br>(gauge) | Percentil 95 de docker.mem.sw_limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.sw_limit.avg** <br>(gauge) | Valor medio de docker.mem.sw_limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.sw_limit.count** <br>(rate) | La tasa a la que el valor de docker.mem.sw_limit fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.sw_limit.max** <br>(gauge) | Valor máximo de docker.mem.sw_limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.sw_limit.median** <br>(gauge) | Valor medio de docker.mem.sw_limit. Normalmente este valor no cambiará \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.swap** <br>(gauge) | La cantidad de swap utilizada actualmente por el contenedor<br>_Se muestra como byte_ |
| **docker.mem.swap.95percentile** <br>(gauge) | Valor del percentil 95 de docker.mem.swap \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.swap.avg** <br>(gauge) | Valor medio de docker.mem.swap \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.swap.count** <br>(rate) | La tasa a la que el valor de docker.mem.swap fue muestreado \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.mem.swap.max** <br>(gauge) | Valor máximo de docker.mem.swap \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.mem.swap.median** <br>(gauge) | Valor medio de docker.mem.swap \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.metadata.free** <br>(gauge) | Espacio libre de metadatos del grupo de almacenamiento<br>_Se muestra como byte_ |
| **docker.metadata.percent** <br>(gauge) | Porcentaje de metadatos del grupo de almacenamiento utilizados<br>_Se muestra como porcentaje_ |
| **docker.metadata.total** <br>(gauge) | Espacio total de metadatos del grupo de almacenamiento<br>_Se muestra como byte_ |
| **docker.metadata.used** <br>(gauge) | Espacio de metadatos del grupo de almacenamiento utilizado<br>_Se muestra como byte_ |
| **docker.net.bytes_rcvd** <br>(gauge) | Bytes recibidos por segundo de la red<br>_Se muestra como byte_ |
| **docker.net.bytes_rcvd.95percentile** <br>(gauge) | Percentil 95 de docker.net.bytes_rcvd \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_rcvd.avg** <br>(gauge) | Valor medio de docker.net.bytes_rcvd \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_rcvd.count** <br>(rate) | La tasa a la que se muestreó el valor de docker.net.bytes_rcvd \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.net.bytes_rcvd.max** <br>(gauge) | Valor máximo de docker.container.net.bytes_rcvd \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_rcvd.median** <br>(gauge) | Valor medio de docker.container.net.bytes_rcvd \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_sent** <br>(gauge) | Bytes enviados por segundo a la red<br>_Se muestra como byte_ |
| **docker.net.bytes_sent_bytes.95percentile** <br>(gauge) | Percentil 95 de docker.net.bytes_sent_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_sent_bytes.avg** <br>(gauge) | Valor medio de docker.net.bytes_sent_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como byte_ |
| **docker.net.bytes_sent_bytes.count** <br>(rate) | La tasa a la que se muestreó el valor de docker.net.bytes_sent_bytes \[obsoleto en el agent 6.0\]<br>_Se muestra como muestra_ |
| **docker.net.bytes_sent_bytes.max** <br>(gauge) | Valor máximo de docker.container.net.bytes_sent_bytes \[obsoleto en el agent 6.0]<br>_Se muestra como byte_ |
| **docker.net.bytes_sent_bytes.median** <br>(gauge) | Valor medio de docker.container.net.bytes_sent_bytes \[obsoleto en el agent 6.0]<br>_Se muestra como byte_ |
| **docker.thread.count** <br>(gauge) | Recuento actual de subprocesos del contenedor<br>_Se muestra como subproceso_ |
| **docker.thread.limit** <br>(gauge) | Límite de número de subprocesos para el contenedor, si se ha establecido<br>_Se muestra como subproceso_ |
| **docker.uptime** <br>(gauge) | Tiempo transcurrido desde que se inició el contenedor<br>_Se muestra como segundo_ |

### Eventos

La integración de Docker produce los siguientes eventos:

- Eliminar imagen
- Expirar
- Error
- Fallo
- Terminar
- Sin memoria (oom)
- Pausa
- Reiniciar el contenedor
- Reiniciar el Daemon
- Actualización

### Checks de servicio

**docker.service_up**

Devuelve `CRITICAL` si el Agent no puede recopilar la lista de contenedores del daemon de Docker. Devuelve `OK` en caso contrario.

_Estado: ok, critical_

**docker.container_health**

Devuelve `CRITICAL` si un contenedor no está en buen estado. Devuelve `OK` en caso contrario o `UNKNOWN` si se desconoce el estado.

_Estados: ok, critical, unknown_

**docker.exit**

Devuelve `CRITICAL` si un contenedor ha salido con un código de salida distinto de cero. En caso contrario, devuelve `OK`.

_Estados: ok, critical_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help).

## Referencias adicionales

- [Compose y el Datadog Agent](https://docs.datadoghq.com/agent/guide/compose-and-the-datadog-agent)
- [DogStatsD y Docker](https://docs.datadoghq.com/integrations/faq/dogstatsd-and-docker)
- [El problema de la monitorización en Docker](https://www.datadoghq.com/blog/the-docker-monitoring-problem) (serie)
- [Cómo monitorizar las métricas de recursos de Docker](https://www.datadoghq.com/blog/how-to-monitor-docker-resource-metrics)
- [Cómo recopilar métricas de Docker](https://www.datadoghq.com/blog/how-to-collect-docker-metrics)
- [8 datos sorprendentes sobre la adopción real de Docker](https://www.datadoghq.com/docker-adoption)
- [Monitorizar Docker en Amazon ECS](https://www.datadoghq.com/blog/monitor-docker-on-aws-ecs)
- [Dockerize Datadog](https://www.datadoghq.com/blog/docker-performance-datadog)
- [Monitorizar Docker con Datadog](https://www.datadoghq.com/blog/monitor-docker-datadog)