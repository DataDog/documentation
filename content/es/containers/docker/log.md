---
aliases:
- /es/logs/docker
- /es/logs/languages/docker
- /es/logs/log_collection/docker
- /es/agent/docker/log
description: Configure la colección de logs de aplicaciones que se ejecutan en contenedores
  Docker utilizando el Datadog Agent.
further_reading:
- link: logs/explorer
  tag: Documentación
  text: Aprenda cómo explorar sus logs.
- link: /agent/docker/apm/
  tag: Documentación
  text: Recoja las trazas de su aplicación.
- link: /agent/docker/prometheus/
  tag: Documentación
  text: Recoja sus métricas de Prometheus.
- link: /agent/docker/integrations/
  tag: Documentación
  text: Recoja automáticamente las métricas y logs de sus aplicaciones.
- link: /agent/guide/autodiscovery-management/
  tag: Documentación
  text: Limite la recolección de datos a un subconjunto de contenedores.
- link: /agent/docker/tag/
  tag: Documentación
  text: Asigne etiquetas a todos los datos emitidos por un contenedor.
- link: /containers/troubleshooting/log-collection
  tag: Documentación
  text: Solución de problemas de colección de logs de contenedores
title: Colección de logs de Docker
---
## Descripción general {#overview}

El Datadog Agent 6+ recolecta logs de contenedores. Hay dos tipos de instalación disponibles:

Configurar la colección de logs depende de su entorno actual. Elija una de las siguientes instalaciones para comenzar:

- Si su entorno escribe **todos** los logs en `stdout`/`stderr`, siga la instalación del [Datadog Agent en contenedor](?tab=containerized-agent#installation).

- Si no puede desplegar el Datadog Agent en contenedor y su contenedor escribe **todos** los logs en `stdout`/`stderr`, siga la instalación del [host Agent](?tab=hostagent#installation) para habilitar la colección de logs en contenedor dentro de su archivo de configuración del Datadog Agent.

- Si su contenedor escribe logs en archivos (escribe solo parcialmente logs en `stdout`/`stderr` y escribe logs en archivos o escribe completamente logs en archivos), siga la instalación del [host Agent con colección de logs personalizada](?tab=hostagentwithcustomlogging#installation) o siga la instalación del [Datadog Agent en contenedor](?tab=containerized-agent#installation) y verifique el [ejemplo de configuración de colección de logs desde archivo con Autodiscovery](?tab=logcollectionfromfile#examples).

Los comandos de CLI en esta página son para el tiempo de ejecución de Docker. Reemplace `docker` con `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman. El soporte para la colección de logs de containerd y Podman es limitado.

## Instalación {#installation}

{{< tabs >}}
{{% tab "Instalación de contenedores" %}}

Para ejecutar un [contenedor de Docker][1] que incorpora el Datadog Agent para monitorear su servidor, utilice el siguiente comando para su respectivo sistema operativo:

### Linux {#linux}
Para la siguiente configuración, reemplace `<DD_SITE>` con {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /proc/:/host/proc/:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           registry.datadoghq.com/agent:latest
```

### Windows {#windows}
Para la siguiente configuración, reemplace `<DD_SITE>` con {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v \\.\pipe\docker_engine:\\.\pipe\docker_engine \
           -v c:\programdata\docker\containers:c:\programdata\docker\containers:ro
           registry.datadoghq.com/agent:latest
```

### macOS {#macos}
Agregue la ruta `/opt/datadog-agent/run` en Docker Desktop -> Configuración -> Recursos -> Compartición de archivos.

Para la siguiente configuración, reemplace `<DD_SITE>` con {{< region-param key="dd_site" code="true">}}:

```shell
docker run -d --name datadog-agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           -e DD_LOGS_ENABLED=true \
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \
           -e DD_CONTAINER_EXCLUDE="name:datadog-agent" \
           -e DD_SITE=<DD_SITE> \
           -v /var/run/docker.sock:/var/run/docker.sock:ro \
           -v /var/lib/docker/containers:/var/lib/docker/containers:ro \
           -v /opt/datadog-agent/run:/opt/datadog-agent/run:rw \
           registry.datadoghq.com/agent:latest
```

Se recomienda que elija la última versión del Datadog Agent. Consulte la lista completa de [imágenes disponibles para el Agent v6][2] en GCR.

Los comandos relacionados con la recolección de registros son:

`-e DD_LOGS_ENABLED=true`                                     
: Habilita la recolección de registros cuando se establece en `true`. El Agente busca instrucciones de registro en los archivos de configuración.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: Agrega una configuración de registro que habilita la recolección de registros para todos los contenedores.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: Para prevenir la pérdida de los registros de contenedores durante reinicios o problemas de red, la última línea de registro recopilada para cada contenedor en este directorio se almacena en el servidor.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: Previene que el Datadog Agent recopile y envíe sus propios registros y métricas. Elimina este parámetro si deseas recopilar los registros o métricas del Datadog Agent. Este valor de parámetro admite expresiones regulares.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: Para conectarse al demonio de Docker y descubrir contenedores y recopilar `stdout/stderr` del socket de Docker.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: Para recopilar registros de contenedores desde archivos. Disponible en el Datadog Agent 6.27.0/7.27.0+

**Nota**: Si utiliza Docker Compose, el valor para `DD_CONTAINER_EXCLUDE` no debe estar entre comillas. Configure la variable de entorno en su archivo docker-compose.yaml como en el ejemplo a continuación:

```yaml
environment:
    - DD_CONTAINER_EXCLUDE=image:datadog/agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Agent en el servidor" %}}

1. Instale la [última versión del Agent][1] en su servidor.
2. La recopilación de registros está _deshabilitada_ por defecto en el Datadog Agent. Para habilitarlo, agregue las siguientes líneas en su archivo de configuración `datadog.yaml`:

    ```yaml
    logs_enabled: true
    listeners:
        - name: docker
    config_providers:
        - name: docker
          polling: true
    logs_config:
        container_collect_all: true
    ```
3. **Solo Windows 10**: El usuario del Datadog Agent debe ser miembro del grupo `docker-users` para tener permisos para trabajar con contenedores de Docker. Ejecute `net localgroup docker-users "ddagentuser" /ADD` desde su símbolo del sistema de Administrador o siga los pasos de configuración del [Docker User Group][2].  
4. [Reinicie el Agent][3] para ver todos sus logs de contenedores en Datadog.

[1]: /es/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Agent en el servidor con registro personalizado" %}}

1. Instala la [última versión del Agent][1] en tu servidor.
2. Siga la [documentación de Recolección de Registros Personalizados][2] para realizar el seguimiento de las últimas líneas de archivos de logs.

    Para recopilar logs de su aplicación `<APP_NAME>` almacenada en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log`, cree un archivo `<APP_NAME>.d/conf.yaml` en la raíz de su [directorio de configuración del Agent][3] con el siguiente contenido:

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Reinicie el Agent][4] para ver todos sus logs de contenedores en Datadog.

**Nota**: Para que el Datadog Agent recopile los logs producidos por un contenedor con una configuración de logs personalizada, dichos logs deben escribirse en un volumen accesible desde el servidor. Se recomienda que los logs de contenedores se escriban en `stdout` y `stderr` para que puedan ser recopilados automáticamente. 

[1]: /es/agent/basic_agent_usage/
[2]: /es/agent/logs/#custom-log-collection
[3]: /es/agent/configuration/agent-configuration-files/
[4]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Notas importantes**:

- Los metadatos del contenedor no se recuperan con la recolección de logs personalizada, por lo tanto, el Datadog Agent no asigna automáticamente etiquetas de contenedor a los logs. Utilice [etiquetas personalizadas][1] para crear etiquetas de contenedor.

- `source` y `service` se establecen por defecto en el valor de etiqueta `short_image` en Datadog Agent 6.8+. Los valores de fuente y servicio pueden ser sobrescritos con Autodiscovery como se describe a continuación. Establecer el valor `source` en un nombre de integración resulta en la instalación de Pipelines de integración que analizan sus logs y extraen información relevante de ellos.

- Los registros provenientes del contenedor `Stderr` tienen un estado predeterminado de `Error`.

- Si utiliza el controlador de logs _journald_ en lugar del controlador de logs json-file predeterminado de Docker, consulte la [documentación de integración de journald][2] para obtener detalles sobre la configuración para entornos contenedorizados. Consulte la [documentación de unidades de filtro de journald][2] para obtener más información sobre los parámetros de filtrado.


## Integraciones de logs {#log-integrations}

En Datadog Agent 6.8+, `source` y `service` se establecen por defecto en el valor de etiqueta `short_image`. Esto permite a Datadog identificar la fuente de logs para cada contenedor e instalar automáticamente la integración correspondiente.

El nombre corto de la imagen del contenedor puede no coincidir con el nombre de integración para imágenes personalizadas, y se puede sobrescribir para reflejar mejor el nombre de su aplicación. Esto se puede hacer con [Datadog Autodiscovery][3] y [anotaciones de pod en Kubernetes][4] o etiquetas de contenedor.

Autodiscovery espera que las etiquetas sigan este formato, dependiendo del tipo de archivo:

{{< tabs >}}
{{% tab "Dockerfile" %}}

Agregue lo siguiente `LABEL` a su Dockerfile:

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Agregue la siguiente etiqueta en su archivo `docker-compose.yaml`:

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Comando de ejecución" %}}

Agregue la siguiente etiqueta como un comando de ejecución:

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

Donde `<LOG_CONFIG>` es la configuración de recolección de logs que encontraría en un archivo de configuración de integración. [Vea la configuración de recolección de logs para aprender más][5].

**Nota**: Al configurar el valor `service` mediante etiquetas de Docker, Datadog recomienda utilizar unified service tagging como mejor práctica. Unified service tagging une toda la telemetría de Datadog, incluidos los logs, a través del uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender cómo configurar su entorno con unified service tagging, consulte la [documentación de unified service tagging][6].

### Ejemplos {#examples}

{{< tabs >}}
{{% tab "Dockerfile de NGINX" %}}

El siguiente Dockerfile habilita la integración de registros de NGINX en el contenedor correspondiente (el valor `service` se puede cambiar):

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

Para habilitar tanto la integración de métricas como la de registros de NGINX:

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Registros de múltiples líneas de Java" %}}

Para registros de múltiples líneas como trazas de pila, el Agente tiene [reglas de procesamiento de múltiples líneas][1] para agregar líneas en un solo registro.

Ejemplo de registro (trazas de pila de Java):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Utilice la etiqueta `com.datadoghq.ad.logs` como se muestra a continuación en sus contenedores para asegurarse de que el registro anterior se recolecte correctamente:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

Consulte la documentación de las reglas de procesamiento de múltiples líneas [1] para obtener más ejemplos de patrones.


[1]: /es/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "Desde el archivo" %}}

El Agente v7.25.0+/6.25.0+ puede recolectar registros directamente de un archivo basado en una etiqueta de Autodiscovery del contenedor. Para recolectar estos registros, utilice la etiqueta `com.datadoghq.ad.logs` como se muestra a continuación en sus contenedores para recolectar `/logs/app/prod.log`:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

Los registros recolectados de un archivo están etiquetados con los metadatos del contenedor. La recolección de registros está vinculada al ciclo de vida del contenedor; tan pronto como el contenedor se detiene, la recolección de registros de ese archivo se detiene.


**Notas**:

- La ruta del archivo es **relativa** al Agente, por lo que el directorio que contiene el archivo debe ser compartido entre el contenedor que ejecuta la aplicación y el contenedor del Agente. Por ejemplo, si el contenedor monta `/logs`, cada contenedor que registre en un archivo puede montar un volumen como `/logs/app` donde se escribe el archivo de registro.

- Al usar este tipo de etiqueta en un contenedor, sus `stderr`/`stdout` registros no se recolectan automáticamente. Si se necesita la recolección de ambos `stderr`/`stdout` y un archivo, debe habilitarse explícitamente utilizando una etiqueta, por ejemplo:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- Al usar este tipo de combinación, `source` y `service` no tienen un valor predeterminado y deben establecerse explícitamente en la etiqueta de Autodiscovery.

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las características de Autodiscovery se pueden usar con o sin la variable de entorno `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Elija una de las siguientes opciones:

- Utilice etiquetas de contenedor o anotaciones de pod para elegir los contenedores de los cuales recolectar registros.
- Utilice la variable de entorno para recolectar registros de todos los contenedores y luego sobrescriba los valores predeterminados `source` y `service`.
- Agregue reglas de procesamiento para el subconjunto deseado de contenedores.

## Recolección de registros avanzada {#advanced-log-collection}

Utilice etiquetas de registro de Autodiscovery para aplicar lógica avanzada de procesamiento de recolección de registros, por ejemplo:

- [Filtrar registros antes de enviarlos a Datadog][7].
- [Eliminar datos sensibles de sus registros][8].
- [Proceda a la agregación de múltiples líneas][9].

## Recolección de registros de contenedores de Docker desde un archivo {#docker-container-log-collection-from-a-file}

La recolección de registros de contenedores de Docker desde un archivo es una alternativa a la recolección a través del socket de Docker. La recolección basada en archivos ofrece un mejor rendimiento que la recolección basada en sockets.

En las versiones 7.27.0/6.27.0+, puede configurar el Agente para recolectar registros de contenedores de Docker desde un archivo. En las versiones 6.33.0+/7.33.0+, el Agente recolecta registros de contenedores de Docker desde un archivo por defecto. 

La recolección basada en archivos requiere que el directorio que almacena los registros de contenedores de Docker esté expuesto al Agente en la siguiente ubicación: `/var/lib/docker/containers` (`c:\programdata\docker\containers` en Windows). Consulte la [guía de solución de problemas de recolección de registros de Docker][10] para más información.

**Nota**:
- Cuando migre de la recolección de registros de contenedores basada en el socket de Docker a la recolección de registros basada en archivos, solo se realizará el seguimiento de las últimas líneas de los archivos de los nuevos contenedores. Puede forzar al Agente a recolectar todos los registros de contenedores desde archivos configurando la variable de entorno `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` a `true`. Forzar al Agente a recolectar todos los registros de contenedores desde archivos puede resultar en registros duplicados para los contenedores existentes.
- Si cambia el Agente de nuevo de la recolección de registros de contenedores desde archivos a la recolección a través del socket de Docker, es probable que vea registros duplicados para los contenedores existentes.

## Filtre contenedores {#filter-containers}

Es posible gestionar desde qué contenedores desea recolectar registros. Esto puede ser útil para evitar la recolección de los registros del Agente de Datadog, por ejemplo. Consulte la [Gestión de Descubrimiento de Contenedores][11] para aprender más.

## Contenedores de corta duración {#short-lived-containers}

En un entorno de Docker, el Agente recibe actualizaciones de contenedores en tiempo real a través de eventos de Docker. El Agente extrae y actualiza la configuración de las etiquetas de los contenedores (Autodiscovery) cada 1 segundo.

Desde la versión 6.14+ del Agente, este recolecta registros de todos los contenedores (en ejecución o detenidos), lo que significa que los registros de contenedores de corta duración que han comenzado y se han detenido en el último segundo aún se recolectan siempre que no sean eliminados.

Para entornos de Kubernetes, consulte la [documentación de contenedor de corta duración de Kubernetes][12].

## Solución de problemas {#troubleshooting}

Para los pasos de solución de problemas, consulte [Solución de problemas de recolección de registros de contenedores][13].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/assigning_tags/?tab=noncontainerizedenvironments#methods-for-assigning-tags
[2]: /es/integrations/journald/
[3]: /es/agent/docker/integrations/
[4]: /es/agent/kubernetes/integrations/?tab=kubernetespodannotations#configuration
[5]: /es/agent/logs/#custom-log-collection
[6]: /es/getting_started/tagging/unified_service_tagging
[7]: /es/agent/logs/advanced_log_collection/?tab=docker#filter-logs
[8]: /es/agent/logs/advanced_log_collection/?tab=docker#scrub-sensitive-data-from-your-logs
[9]: /es/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
[10]: /es/logs/guide/docker-logs-collection-troubleshooting-guide/
[11]: /es/agent/guide/autodiscovery-management/
[12]: /es/agent/kubernetes/log/?tab=daemonset#short-lived-containers
[13]: /es/containers/troubleshooting/log-collection/