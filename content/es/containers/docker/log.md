---
aliases:
- /es/logs/docker
- /es/logs/languages/docker
- /es/logs/log_collection/docker
- /es/agent/docker/log
further_reading:
- link: logs/explorer
  tag: Documentación
  text: Aprende a explorar tus logs
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
title: Recopilación de logs de Docker
---

## Información general

Datadog Agent v6 y posteriores recopila logs de contenedores. Hay dos tipos de instalaciones disponibles:

La configuración de recopilación de logs depende del entorno actual. Elige una de las siguientes instalaciones para empezar:

- Si tu entorno escribe **todos** los logs en `stdout`/`stderr`, sigue la instalación del [Agent contenedorizado](?tab=containerized-agent#installation).

- Si no puedes desplegar el Agent contenedorizado y tu contenedor escribe **todos** los logs en `stdout`/`stderr`, sigue la instalación del [host del Agent](?tab=hostagent#installation) para activar la creación de logs contenedorizados en tu archivo de configuración del Agent.

- Si tu contenedor escribe logs en archivos (solo escribe logs parcialmente en `stdout`/`stderr` y escribe logs en archivos O escribe logs en archivos completamente), sigue la instalación del [host del Agent con recopilación de logs personalizada](?tab=hostagentwithcustomlogging#installation) o sigue la instalación del [Agent contenedorizado](?tab=containerized-agent#installation) y comprueba la [colección de logs del archivo con el ejemplo de configuración de Autodiscovery](?tab=logcollectionfromfile#examples).

Los comandos CLI en esta página son para el tiempo de ejecución del Docker. Sustituye `docker` por `nerdctl` para el tiempo de ejecución de containerd, o `podman` para el tiempo de ejecución de Podman. La compatibilidad con containerd y la colección de logs de Podman es limitada.

## Instalación

{{< tabs >}}
{{% tab "Container Installation" (Instalación del contenedor) %}}

Para ejecutar un [contenedor Docker][1] que integra el Datadog Agent para monitorizar tu host, usa el comando a continuación para el sistema operativo que estés usando:

### Linux
Para la siguiente configuración, sustituye `<DD_SITE>` por {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
Docker run -d --name Datadog-Agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<Datadog_API_KEY> \
           DD_LOGS_ENABLED=true -e
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \e
           -e DD_CONTAINER_EXCLUDE="nombre:Datadog-Agent" \e
           -e DD_SITE=<DD_SITE>
           -v /var/run/Docker.sock:/var/run/Docker.sock:ro \
           -v /var/lib/Docker/contenedores:/var/lib/Docker/contenedores:ro \ \
           -v /proc/:/host/proc/:ro \ \
           -v /opt/Datadog-Agent/run:/opt/Datadog-Agent/run:rw \
           -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
           gcr.io/datadoghq/Agent:latest
```
{{< /site-region >}}

### Windows
Para la siguiente configuración, sustituye `<DD_SITE>` por {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
Docker run -d --name Datadog-Agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           DD_LOGS_ENABLED=true -e
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \e
           -e DD_CONTAINER_EXCLUDE="nombre:Datadog-Agent" \e
           -e DD_SITE=<DD_SITE> \
           -v \\\pipe\docker_engine:\\pipe\docker_engine \\i
           -v c:\programdata\Docker\containers:c:\programdata\Docker\containers:ro
           gcr.io/datadoghq/Agent:latest
```
{{< /site-region >}}

### macOS
Añade la ruta `/opt/datadog-agent/run` en Docker Desktop -> Settings -> Resources -> File sharing.

Para la siguiente configuración, sustituye `<DD_SITE>` por {{< region-param key="dd_site" >}}:
{{< site-region region="us,eu,us3,us5,ap1,gov" >}}
```shell
Docker run -d --name Datadog-Agent \
           --cgroupns host \
           --pid host \
           -e DD_API_KEY=<DATADOG_API_KEY> \
           DD_LOGS_ENABLED=true -e
           -e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true \e
           -e DD_LOGS_CONFIG_DOCKER_CONTAINER_USE_FILE=true \true
           -e DD_CONTAINER_EXCLUDE="nombre:Datadog-Agent" \e
           -e DD_SITE=<DD_SITE> \
           -v /var/run/Docker.sock:/var/run/Docker.sock:ro \
           -v /var/lib/Docker/containers:/var/lib/Docker/containers:ro \ -v /opt/ 
           -v /opt/Datadog-Agent/run:/opt/Datadog-Agent/run:rw \
           gcr.io/datadoghq/Agent:latest
```
{{< /site-region >}}

Se recomienda que elijas la última versión del Datadog Agent. Consulta la lista completa de [imagenes para Agent v6][2] disponibles en GCR.

Los comandos asociados a la recopilación de logs son:

`-e DD_LOGS_ENABLED=true`                                     
: activa la recopilación de logs cuando está configurado como `true`. El Agent busca instrucciones de logs en los archivos de configuración.

`-e DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL=true`                
: añade una configuración de logs que activa la recopilación de logs para todos los contenedores.

`-v /opt/datadog-agent/run:/opt/datadog-agent/run:rw`         
: para evitar la pérdida de logs de contenedores durante reinicios o problemas con la red, la última línea de log recopilada para cada contenedor en este directorio se almacena en el host.

`-e DD_CONTAINER_EXCLUDE="name:datadog-agent"`                
: esto evita que el Datadog Agent recopile y envie sus propios logs y métricas. Elimina este parámetro si quieres recopìlar logs o métricas del Datadog Agent. El valor de este parámetro es compatible con expresiones regulares.

`-v /var/run/docker.sock:/var/run/docker.sock:ro`             
: para conectar con el Docker daemon y descubrir contenedores y recopilar `stdout/stderr` del socket de Docker.

`-v /var/lib/docker/containers:/var/lib/docker/containers:ro` 
: para recopilar logs de contenedores de archivos. Disponible en el Datadog Agent 6.27.0/7.27.0+

**Nota**: Si utilizas Docker Compose, el valor de `DD_CONTAINER_EXCLUDE` no debe estar entre comillas. Configura la variable de entorno en tu archivo docker-compose.yaml como en el ejemplo siguiente:

```yaml
entorno:
    - DD_CONTAINER_EXCLUDE=imagen:Datadog/Agent:*
```

[1]: https://github.com/DataDog/datadog-agent/tree/main/Dockerfiles/agent
[2]: https://console.cloud.google.com/gcr/images/datadoghq/GLOBAL/agent
{{% /tab %}}
{{% tab "Agent de host" %}}

1. Instala la [última versión del Agent][1] en tu host.
2. La recopilación de logs está _disabled_ por defecto en el Datadog Agent. Para activarlo, añade las líneas a continuación en tu archivo `datadog.yaml` de configuración:

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
3. **Solo Windows 10**: el usuario del Datadog Agent debe ser miembro del grupo `docker-users` para tener los permisos necesarios para trabajar con contenedores de Docker. Ejecuta `net localgroup docker-users "ddagentuser" /ADD` desde la indicación de comando Administrador o sigue los pasos de configuración del [grupo de usuarios de Docker][2].
4. [Reinicia el Agent][3] para ver todos tus logs de contenedor en Datadog.

[1]: /es/agent/basic_agent_usage/
[2]: https://docs.microsoft.com/en-us/visualstudio/containers/troubleshooting-docker-errors?view=vs-2019#docker-users-group
[3]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{% tab "Host Agent with Custom Logging" (Agent de host con creación de logs personalizada) %}}

1. Instala la [última versión del Agent][1] en tu host.
2. Sigue la [documentación de recopilación de logs personalizada][2] para verificar logs en archivos.

   Para agrupar logs de tu aplicación `<APP_NAME>` almacenada en `<PATH_LOG_FILE>/<LOG_FILE_NAME>.log` crea un archivo `<APP_NAME>.d/conf.yaml` en la raíz de tu [directorio de configuración del Agent][3] con el siguiente contenido:

    ```yaml
    logs:
      - type: file
        path: "<PATH_LOG_FILE>/<LOG_FILE_NAME>.log"
        service: "<APP_NAME>"
        source: "<SOURCE>"
    ```

3. [Reinicia el Agent][4] para ver todos tus logs de contenedores en Datadog.

**Nota**: Para que el Agent recopile logs producidos por un contenedor con una configuración de logs personalizada, los logs deben incluirse en un volumen que sea accesible desde el host. Se recomienda que los logs de contenedores se escriban en `stdout` y `stderr` para que puedan ser recopilados automáticamente. 

[1]: /es/agent/basic_agent_usage/
[2]: /es/agent/logs/#custom-log-collection
[3]: /es/agent/configuration/agent-configuration-files/
[4]: /es/agent/configuration/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

**Notas importantes**:

- Los metadatos de contenedor no se recuperan con la recopilación de logs personalizada, por lo tanto el Agent no asigna etiquetas (tags) a logs automáticamente. Usa [etiquetas personalizadas][1] para crear etiquetas de contenedor.

- El `source` y el `service` pasan por defecto al valor de etiqueta `short_image` en el Datadog Agent v6.8 o posteriores. Los valores del origen y el servicio se pueden sobreescribir con Autodiscovery, tal como se describe a continuación. Si se configura el valor del `source` como un nombre de integración, el resultado es la instalación de pipelines de integración que analizan tus logs y extraen información relevante de ellos.

- Los logs que provienen del contenedor `Stderr` tienen un estado `Error` por defecto.

- Si estás usando el controlador de creación de logs _journald_ en lugar del controlador de creación de logs por defecto json-file de Docker, consulta la [documentación de integración journald][2] para ver más información sobre la configuración de entornos contenedorizados. Consulta la [documentación de unidades de filtro journald][2] para ver más información sobre parámetros de filtrado.


## Integraciones de logs

En el Datadog Agent v6.8 o posteriores, el `source` y el `service` pasan por defecto al valor de etiqueta `short_image`. Esto permite a Datadog identificar el origen del log para cada contenedor e instalar la integración correspondiente automáticamente.

Es posible que el nombre corto de imagen del contenedor no coincida con el nombre de integración para imágenes personalizadas y que se pueda sobrescribir para mostrar el nombre de tu aplicación más claramente. Esto se puede hacer con [Autodiscovery de Datadog][3], [anotaciones de pod en Kubernetes][4] o etiquetas de contenedores.

Autodiscovery espera que las etiquetas sigan este formato, dependiendo del tipo de archivo:

{{< tabs >}}
{{% tab "Dockerfile" (Archivo Docker) %}}

Añade la `LABEL` a continuación a tu archivo Docker:

```text
LABEL "com.datadoghq.ad.logs"='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Añade la etiqueta a continuación en tu archivo `docker-compose.yaml`:

```yaml
labels:
    com.datadoghq.ad.logs: '["<LOGS_CONFIG>"]'
```

{{% /tab %}}
{{% tab "Run Command" (Ejecutar comando) %}}

Añade la etiqueta a continuación como un comando de ejecución:

```text
-l com.datadoghq.ad.logs='[<LOGS_CONFIG>]'
```

{{% /tab %}}
{{< /tabs >}}

Donde `<LOG_CONFIG>` es la configuración de la recopilación de logs que encontraríamos dentro de un archivo de configuración de una integración. [Para más información consulta la configuración de recopilación de logs][5].

**Nota**: Cuando se configura el valor del `service` mediante etiquetas de Docker, Datadog recomienda usar un servicio de etiquetado unificado como práctica recomendada. El etiquetado de servicios unificado asocia toda la telemetría de Datadog, incluidos los logs, mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para aprender a configurar tu entorno con el etiquetado unificado, consulta la [documentación de etiquetado de servicios unificado][6].

### Ejemplos

{{< tabs >}}
{{% tab "NGINX Dockerfile" (Archivo Docker NGINX) %}}

El archivo de Docker a continuación activa la integración de logs NGINX en el contenedor correspondiente (el valor `service` se puede cambiar):

```text
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

Para activar tanto la métrica como las integraciones NGINX de los logs:

```text
LABEL "com.datadoghq.ad.check_names"='["nginx"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"nginx_status_url": "http://%%host%%:%%port%%/nginx_status"}]'
LABEL "com.datadoghq.ad.logs"='[{"source": "nginx", "service": "webapp"}]'
```

{{% /tab %}}
{{% tab "Java multi-line logs" (Logs de múltiples líneas Java) %}}

Para logs de múltiples líneas como trazas de stack, el Agent cuenta con [reglas de procesamiento de múltiples líneas][1] para agregar líneas dentro de un único log.

Ejemplo de log (trazas de stack Java):

```text
2018-01-03T09:24:24.983Z UTC Exception in thread "main" java.lang.NullPointerException
        at com.example.myproject.Book.getTitle(Book.java:16)
        at com.example.myproject.Author.getBookTitles(Author.java:25)
        at com.example.myproject.Bootstrap.main(Bootstrap.java:14)
```

Usa la etiqueta `com.datadoghq.ad.logs` en tus contenedores (como se muestra a continuación) para asegurarte de que el log descrito anteriormente se recopila correctamente:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"source": "java", "service": "myapp", "log_processing_rules": [{"type": "multi_line", "name": "log_start_with_date", "pattern" : "\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])"}]}]'
```

Consulta la [documentación de reglas de procesamiento de múltiples líneas][1] para ver más ejemplos de patrones.


[1]: /es/agent/logs/advanced_log_collection/?tab=docker#multi-line-aggregation
{{% /tab %}}
{{% tab "From file" (Desde archivo) %}}

El Agent v7.25.0/v6.25.0 o posteriores puede recopilar logs directamente de un archivo basado en una etiqueta Autodiscovery de un contenedor. Para recopilar estos logs, usa la etiqueta `com.datadoghq.ad.logs` en tus contenedores (como se muestra a continuación) para recopilar `/logs/app/prod.log`:

```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "sample_app", "service": "sample_service", "path": "/logs/app/prod.log"}]'
```

Los logs recopilados de un archivo son etiquetados con los metadatos del contenedor. La recopilación de logs está vinculada al ciclo de vida del contenedor. En cuanto se detiene el contenedor, también se detiene la recopilación de logs de ese archivo.


**Notas**:

- La ruta del archivo es **relativa** al Agent, así que el directorio que contiene el archivo debería ser compartido entre el contenedor que está ejecutando la aplicación y el contenedor del Agent. Por ejemplo, si el contenedor monta `/logs`, cada contenedor que crea logs en el archivo puede montar un volumen, como por ejemplo `/logs/app`, donde está escrito el archivo del log.

- Cuando se usa este tipo de etiqueta en un contenedor, sus logs `stderr`/`stdout` no se recopilan automáticamente. Si se necesita una recopilación tanto de `stderr`/`stdout` como de un archivo, se debe activar expresamente usando una etiqueta, por ejemplo:
```yaml
labels:
    com.datadoghq.ad.logs: '[{"type":"file", "source": "java", "service": "app", "path": "/logs/app/prod.log"}, {"type": "docker", "source": "app_container", "service": "app"}]'
```

- Cuando se usa este tipo de combinación, `source` y `service` no tienen un valor por defecto y deben configurarse expresamente en la etiqueta de Autodiscovery.

{{% /tab %}}
{{< /tabs >}}

**Nota**: Las funciones de Autodiscovery se pueden usar con o sin la variable de entorno `DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL`. Elige una de las siguientes opciones:

- Usa etiquetas de contenedor o anotaciones de pod para elegir los contenedores desde los que quieres recopilar logs.
- Usa la variable de entorno para recopilar logs de todos los contenedores y luego sobrescribe los valores por defecto `source` y `service`.
- Añade las reglas de procesamiento para el subconjunto deseado de contenedores.

## Recopilación avanzada de logs

Usa las etiquetas de logs de Autodiscovery para aplicar la lógica de procesos para la recopilación avanzada de logs, por ejemplo:

- [Filtra los logs antes de enviarlos a Datadog][7].
- [Limpia los datos confidenciales de tus logs][8].
- [Continúa con la agregación de múltiples líneas][9].

## Recopilación de logs de contenedores Docker desde un archivo

La recopilación de logs de contenedores Docker desde un archivo es una alternativa a la recopilación por el socket de Docker. La recopilación basada en archivos tiene mejor rendimiento que la recopilación basada en sockets.

En las versiones 7.27.0/6.27.0 o posteriores, se puede configurar el Agent para recopilar logs de contenedores Docker desde un archivo. En las versiones 6.33.0+/7.33.0 o posteriores, el Agent recopila logs de contenedores Docker desde un archivo por defecto. 

La recopilación basada en archivos requiere que el directorio donde se almacenan los logs de contenedores Docker esté expuesto al Agent en la ubicación siguiente: `/var/lib/docker/containers` (`c:\programdata\docker\containers` en Windows). Consulta la [Guía de resolución de problemas para la recopilación de logs de Docker][10] para más información.

**Nota**:
- Cuando se migra desde la recopilación de logs de contenedores basada en sockets de Docker a la recopilación de logs basada en archivos, solo los nuevos contenedores son supervisados desde sus archivos. Se puede forzar al Agent a que recopile todos los logs de contenedores desde archivos si la configuración de la variable de entorno `DD_LOGS_CONFIG_DOCKER_CONTAINER_FORCE_USE_FILE` es `true`. Forzar al Agent a recopilar todos los logs de contenedores desde archivos puede generar la duplicación de logs en los contenedores existentes.
- Si vuelves a cambiar el Agent desde la recopilación de logs desde archivos de contenedores a la recopilación por el socket de Docker, es probable que veas logs duplicados en contenedores existentes.

## Filtrar contenedores

Es posible gestionar los contenedores desde los que quieres recopilar logs. Esto puede ser útil para evitar la recopilación de logs del Datadog AgentContenedor, por ejemplo. Consulta [Gestión de containers Discovery][11] para obtener más información.

## Contenedores de corta duración

En un entorno Docker, el Agent recibe actualizaciones sobre contenedores en tiempo real a través de eventos de Docker. El Agent extrae y actualiza la configuración desde las etiquetas del contenedor (Autodiscovery) cada 1 segundo.

A partir del Agent v6.14 o posterior, el Agent recopila logs de todos los contenedores (en ejecución o detenidos), lo que significa que los logs de contenedores de corta duración que se han iniciado y detenido en el último segundo continúan siendo recopilados, siempre y cuando no se eliminen.

Para entornos Kubernetes, consulta la [documentación de contendores Kubernetes de corta duración][12].

## Leer más

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