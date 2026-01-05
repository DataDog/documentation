---
app_id: gitlab
categories:
- collaboration
- developer tools
- issue tracking
- log collection
- source control
custom_kind: integración
description: Realiza un seguimiento de todas tus métricas de GitLab con Datadog.
integration_version: 10.0.0
media: []
supported_os:
- linux
- windows
- macos
title: GitLab
---
## Información general

Una integración que te permite:

- visualizar y monitorizar las métricas recopiladas con GitLab y Gitaly a través de Prometheus.

Consulta [Monitorización de GitLab con Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus) para obtener más información.

Para una monitorización más exhaustiva de tus pipelines de GitLab, consulta [CI Pipeline Visibility](https://app.datadoghq.com/ci/getting-started). CI Pipeline Visibility proporciona información detallada sobre tu proceso de usuario, te permite acceder a metadatos detallados de Git y realiza un seguimiento del pipeline de rendimiento a lo largo del tiempo.

## Configuración

Esta integración basada en OpenMetrics tiene un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo heredado (que se activa configurando `prometheus_url` en su lugar). Para obtener todas las características más actualizadas, Datadog recomienda activar el modo más reciente. Para obtener más información, consulta [Última versión y versión heredada para integraciones basadas en OpenMetrics](https://docs.datadoghq.com/integrations/guide/versions-for-openmetrics-based-integrations).

Las métricas marcadas como `[OpenMetricsV1]` o `[OpenMetricsV2]` solo están disponibles utilizando el modo correspondiente de la integración de GitLab. El resto de métricas se recopilan en ambos modos.

### Instalación

La comprobación de GitLab está incluida en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores de GitLab.

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `gitlab.d/conf.yaml`, en la carpeta `conf.d/` en la raíz del [directorio de configuración tu Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory), para que apunte al [endpoint] de métricas de GitLab(https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html#collecting-the-metrics).
   Consulta el [gitlab.d/conf.yaml de ejemplo](https://github.com/DataDog/integrations-core/blob/master/gitlab/datadog_checks/gitlab/data/conf.yaml.example) para ver todas las opciones de configuración disponibles. Si previamente implementaste esta integración, consulta el [ejemplo heredado](https://github.com/DataDog/integrations-core/blob/7.43.x/gitlab/datadog_checks/gitlab/data/conf.yaml.example).

1. En la página de configuración de GitLab, asegúrate de que la opción `Enable Prometheus Metrics` está activada (se requiere acceso de administrador). Para obtener más información sobre cómo habilitar la recopilación de métricas, consulta [Métricas de GitLab Prometheus](https://docs.gitlab.com/ee/administration/monitoring/prometheus/gitlab_metrics.html).

1. Permite el acceso a los endpoints de monitorización al actualizar `/etc/gitlab/gitlab.rb` con la siguiente línea:

   ```
   gitlab_rails['monitoring_whitelist'] = ['127.0.0.0/8', '192.168.0.1']
   ```

   **Nota** Guarda y reinicia GitLab para ver los cambios.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### Recopilación de logs

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Luego, edita `gitlab.d/conf.yaml` y quita los comentarios de las líneas `logs` de la parte inferior. Actualiza `path` con la ruta correcta a tus archivos de logs de GitLab.

   ```yaml
     logs:
       - type: file
         path: /var/log/gitlab/gitlab-rails/production_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/production.log
         service: '<SERVICE_NAME>'
         source: gitlab
       - type: file
         path: /var/log/gitlab/gitlab-rails/api_json.log
         service: '<SERVICE_NAME>'
         source: gitlab
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                         |
| -------------------- |-----------------------------------------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `gitlab`                                                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"gitlab_url":"http://%%host%%/", "openmetrics_endpoint":"http://%%host%%:10055/-/metrics"}` |

##### Recopilación de logs

La recopilación de logs está desactivada por defecto en el Datadog Agent. Para activarla, consulta [recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                       |
| -------------- | ------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "gitlab", "service": "gitlab"}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gitlab` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gitlab.action_cable.active_connections** <br>(gauge) | Número de clientes de ActionCable WS conectados actualmente<br>_Se muestra como conexión_ |
| **gitlab.auto_devops_pipelines_completed.count** <br>(count) | \[OpenMetrics V2\] El contador de pipelines de Auto DevOps completados, etiquetados por estado.|
| **gitlab.auto_devops_pipelines_completed_total** <br>(count) | \[OpenMetrics V1\] El contador de pipelines de Auto DevOps completados, etiquetados por estado.|
| **gitlab.banzai.cached_render_real_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] La duración de la representación de Markdown en HTML cuando existe salida en caché<br>_Se muestra como segundo_ |
| **gitlab.banzai.cached_render_real_duration_seconds.count** <br>(count) | El recuento de la duración de la renderización de Markdown en HTML cuando existe salida en caché|
| **gitlab.banzai.cached_render_real_duration_seconds.sum** <br>(count) | La suma de la duración de la renderización de Markdown en HTML cuando existe salida en caché<br>_Se muestra como segundo_ |
| **gitlab.banzai.cacheless_render_real_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] La duración de la representación de Markdown en HTML cuando la salida en caché no existe<br>_Se muestra como segundo_ |
| **gitlab.banzai.cacheless_render_real_duration_seconds.count** <br>(count) | El recuento de la duración de la renderización de Markdown en HTML cuando la salida en caché no existe.|
| **gitlab.banzai.cacheless_render_real_duration_seconds.sum** <br>(count) | La suma de la duración de la renderización de Markdown en HTML cuando la salida en caché no existe<br>_Se muestra como segundo_ |
| **gitlab.cache.misses.count** <br>(count) | \[OpenMetrics V2\] El recuento de fallos de lectura de caché<br>_Se muestra como segundo_ |
| **gitlab.cache.misses_total** <br>(count) | \[OpenMetrics V1\] El recuento de fallos de lectura de caché<br>_Se muestra como segundo_ |
| **gitlab.cache.operation_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de tiempo de acceso a la caché<br>_Se muestra como segundo_ |
| **gitlab.cache.operation_duration_seconds.count** <br>(count) | El recuento del tiempo de acceso a la caché|
| **gitlab.cache.operation_duration_seconds.sum** <br>(count) | La suma del tiempo de acceso a la caché<br>_Se muestra como segundo_ |
| **gitlab.cache_operations.count** <br>(count) | \[OpenMetrics V2\] El recuento de operaciones de caché por controlador/acción|
| **gitlab.cache_operations_total** <br>(count) | \[OpenMetrics V1\] El recuento de operaciones de caché por controlador/acción|
| **gitlab.ci_pipeline_creation_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento del tiempo en segundos que se tarda en crear un pipeline de Continuous Integration Continuous Delivery|
| **gitlab.ci_pipeline_creation_duration_seconds.count** <br>(count) | El recuento del tiempo en segundos que se tarda en crear un pipeline de Continuous Integration Continuous Delivery|
| **gitlab.ci_pipeline_creation_duration_seconds.sum** <br>(count) | La suma del tiempo en segundos que se tarda en crear un pipeline de Continuous Integration Continuous Delivery<br> _Se muestra como segundo_ |
| **gitlab.ci_pipeline_size_builds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento del número total de compilaciones dentro de un pipeline agrupadas por una fuente de pipeline|
| **gitlab.ci_pipeline_size_builds.count** <br>(count) | El recuento del número total de compilaciones dentro de un pipeline agrupadas por una fuente de pipeline|
| **gitlab.ci_pipeline_size_builds.sum** <br>(count) | La suma del número total de compilaciones dentro de un pipeline agrupadas por una fuente de pipeline|
| **gitlab.database.connection_pool_busy** <br>(gauge) | Conexiones en uso cuyo propietario sigue vivo<br>_Se muestra como conexión_ |
| **gitlab.database.connection_pool_connections** <br>(gauge) | Conexiones actuales en el grupo<br>_Se muestra como conexión_ |
| **gitlab.database.connection_pool_dead** <br>(gauge) | Conexiones en uso cuyo propietario no está vivo<br>_Se muestra como conexión_ |
| **gitlab.database.connection_pool_idle** <br>(gauge) | Conexiones no utilizadas<br>_Se muestra como conexión_ |
| **gitlab.database.connection_pool_size** <br>(gauge) | Capacidad total de conexión del grupo<br> _Se muestra como conexión_ |
| **gitlab.database.connection_pool_waiting** <br>(gauge) | Subprocesos actualmente en espera en esta cola<br>_Se muestra como subproceso_ |
| **gitlab.database.transaction_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El tiempo empleado en transacciones de base de datos en segundos<br>_Se muestra como segundo_ |
| **gitlab.database.transaction_seconds.count** <br>(count) | El recuento del tiempo empleado en transacciones de base de datos en segundos|
| **gitlab.database.transaction_seconds.sum** <br>(count) | La suma del tiempo empleado en transacciones de base de datos en segundos<br>_Se muestra como segundo_ |
| **gitlab.db_load_balancing_hosts** <br>(gauge) | El número actual de hosts de equilibrio de carga<br>_Se muestra como host_ |
| **gitlab.db_partitions_missing** <br>(gauge) | Número de particiones de base de datos esperadas actualmente, pero no presentes|
| **gitlab.db_partitions_present** <br>(gauge) | Número de particiones de base de datos presentes|
| **gitlab.failed_login_captcha.count** <br>(count) | \[OpenMetrics V2\] El contador de intentos fallidos de CAPTCHA durante el inicio de sesión|
| **gitlab.failed_login_captcha_total** <br>(count) | \[OpenMetrics V1\] El contador de intentos fallidos de CAPTCHA durante el inicio de sesión|
| **gitlab.geo.attachments** <br>(gauge) | El número total de archivos adjuntos disponibles en la entidad primaria|
| **gitlab.geo.attachments_failed** <br>(gauge) | El número de archivos adjuntos no sincronizados en la entidad secundaria|
| **gitlab.geo.attachments_synced** <br>(gauge) | El número de archivos adjuntos sincronizados en la entidad secundaria|
| **gitlab.geo.attachments_synced_missing_on_primary** <br>(gauge) | El número de archivos adjuntos marcados como sincronizados debido a que falta el archivo en la entidad primaria.|
| **gitlab.geo.cursor_last_event_id** <br>(gauge) | El último ID de base de datos del log de evento procesado por la entidad secundaria|
| **gitlab.geo.cursor_last_event_timestamp** <br>(gauge) | La última marca de tiempo UNIX del log de evento procesado por la entidad secundaria|
| **gitlab.geo.db_replication_lag_seconds** <br>(gauge) | El retardo de replicación de la base de datos (segundos)<br>_Se muestra como segundo_ |
| **gitlab.geo.group.wiki.repositories** <br>(gauge) | Número de wikis de grupo en la entidad primaria (13.10)|
| **gitlab.geo.group.wiki.repositories_checksum_failed** <br>(gauge) | Número de wikis de grupo que no han podido calcular la suma de comprobación en la entidad primaria (13.10)|
| **gitlab.geo.group.wiki.repositories_checksum_total** <br>(gauge) | Número de wikis de grupo para la suma de comprobación en la entidad primaria (16.3)|
| **gitlab.geo.group.wiki.repositories_checksummed** <br>(gauge) | Número de wikis de grupo que han calculado correctamente la suma de comprobación en la entidad primaria (13.10)|
| **gitlab.geo.group.wiki.repositories_failed** <br>(gauge) | Número de wikis de grupo sincronizables que no se sincronizan en la entidad secundaria (13.10)|
| **gitlab.geo.group.wiki.repositories_registry** <br>(gauge) | Número de wikis de grupo en el registro (13.10)|
| **gitlab.geo.group.wiki.repositories_synced** <br>(gauge) | Número de wikis de grupo sincronizables en la entidad secundaria (13.10)|
| **gitlab.geo.group.wiki.repositories_verification_failed** <br>(gauge) | Número de wikis de grupo que no han superado la verificación en la entidad secundaria (16.3)|
| **gitlab.geo.group.wiki.repositories_verification_total** <br>(gauge) | Número de wikis de grupo para intentar verificar en la entidad secundaria (16.3)|
| **gitlab.geo.group.wiki.repositories_verified** <br>(gauge) | Número de wikis de grupo verificados con éxito en la entidad secundaria (16.3)|
| **gitlab.geo.job_artifacts_synced_missing_on_primary** <br>(gauge) | El número de artefactos de trabajo marcados como sincronizados debido a que falta el archivo en la entidad primaria.|
| **gitlab.geo.last_event_id** <br>(gauge) | El ID de la base de datos de la última entrada del log de evento en la entidad primaria.|
| **gitlab.geo.last_event_timestamp** <br>(gauge) | La marca de tiempo UNIX de la última entrada del log de evento en la entidad primaria|
| **gitlab.geo.last_successful_status_check_timestamp** <br>(gauge) | La última fecha y hora en la que el estado se actualizó correctamente|
| **gitlab.geo.lfs_objects** <br>(gauge) | El número total de objetos LFS disponibles en la entidad primaria|
| **gitlab.geo.lfs_objects_failed** <br>(gauge) | Número de objetos LFS no sincronizados en la entidad secundaria|
| **gitlab.geo.lfs_objects_synced** <br>(gauge) | Número de objetos LFS sincronizados en la entidad secundaria|
| **gitlab.geo.lfs_objects_synced_missing_on_primary** <br>(gauge) | El número de objetos LFS marcados como sincronizados debido a que falta el archivo en la primaria.|
| **gitlab.geo.merge_request_diffs** <br>(gauge) | Número de diferencias de solicitudes de fusión en la entidad primaria|
| **gitlab.geo.merge_request_diffs_checksum_failed** <br>(gauge) | Número de diferencias de solicitud de fusión en las que no se ha podido calcular la suma de comprobación en la entidad primaria|
| **gitlab.geo.merge_request_diffs_checksummed** <br>(gauge) | Número de diferencias de solicitud de fusión con suma de comprobación en la entidad primaria|
| **gitlab.geo.merge_request_diffs_failed** <br>(gauge) | Número de diferencias de solicitudes de fusión sincronizables que no se han sincronizado en la entidad secundaria|
| **gitlab.geo.merge_request_diffs_registry** <br>(gauge) | Número de diferencias de solicitudes de fusión en el registro|
| **gitlab.geo.merge_request_diffs_synced** <br>(gauge) | Número de diferencias de solicitudes de fusión sincronizables en la entidad secundaria|
| **gitlab.geo.package_files** <br>(gauge) | Número de archivos de paquetes en la entidad primaria|
| **gitlab.geo.package_files_checksum_failed** <br>(gauge) | Número de archivos de paquetes en los que no se ha podido calcular la suma de comprobación en la entidad primaria|
| **gitlab.geo.package_files_checksummed** <br>(gauge) | Número de archivos de paquetes comprobados en la entidad primaria|
| **gitlab.geo.package_files_failed** <br>(gauge) | Número de archivos de paquetes sincronizables no sincronizados en la entidad secundaria|
| **gitlab.geo.package_files_registry** <br>(gauge) | Número de archivos de paquetes en el registro|
| **gitlab.geo.package_files_synced** <br>(gauge) | Número de archivos de paquetes sincronizables en la entidad secundaria|
| **gitlab.geo.project.repositories** <br>(gauge) | Número de repositorios de proyecto en la entidad primaria (16.2)|
| **gitlab.geo.project.repositories_checksum_failed** <br>(gauge) | Número de repositorios de proyecto que no han podido calcular la suma de comprobación en la entidad primaria (16.2)|
| **gitlab.geo.project.repositories_checksum_total** <br>(gauge) | Número de repositorios de proyecto para la suma de comprobación en la entidad primaria (16.2)|
| **gitlab.geo.project.repositories_checksummed** <br>(gauge) | Número de repositorios de proyecto que han calculado correctamente la suma de comprobación en la entidad primaria (16.2)|
| **gitlab.geo.project.repositories_failed** <br>(gauge) | Número de repositorios sincronizables de proyecto no sincronizados en la entidad secundaria (16.2)|
| **gitlab.geo.project.repositories_registry** <br>(gauge) | Número de repositorios de proyecto en el registro (16.2)|
| **gitlab.geo.project.repositories_synced** <br>(gauge) | Número de repositorios de proyecto sincronizables en la entidad secundaria (16.2)|
| **gitlab.geo.project.repositories_verification_failed** <br>(gauge) | Número de repositorios de proyecto que no han pasado la verificación en la entidad secundaria (16.2)|
| **gitlab.geo.project.repositories_verification_total** <br>(gauge) | Número de repositorios de proyecto a intentar verificar en la entidad secundaria (16.2)|
| **gitlab.geo.project.repositories_verified** <br>(gauge) | Número de repositorios de proyecto verificados con éxito en la entidad secundaria (16.2)|
| **gitlab.geo.project.wiki.repositories** <br>(gauge) | Número de repositorios wiki de proyecto en la entidad primaria (15.10)|
| **gitlab.geo.project.wiki.repositories_checksum_failed** <br>(gauge) | Número de repositorios wiki de proyecto que fallaron al calcular la suma de comprobación en la entidad primaria (15.10)|
| **gitlab.geo.project.wiki.repositories_checksum_total** <br>(gauge) | Número de repositorios de wiki de proyecto para comprobar la suma en la entidad primaria (15.10)|
| **gitlab.geo.project.wiki.repositories_checksummed** <br>(gauge) | Número de repositorios de wiki de proyecto que han calculado correctamente la suma de comprobación en la entidad primaria (15.10)|
| **gitlab.geo.project.wiki.repositories_failed** <br>(gauge) | Número de repositorios de wiki de proyecto sincronizables que no se sincronizan en la entidad secundaria (15.10)|
| **gitlab.geo.project.wiki.repositories_registry** <br>(gauge) | Número de repositorios de wiki de proyecto en el registro (15.10)|
| **gitlab.geo.project.wiki.repositories_synced** <br>(gauge) | Número de repositorios de wiki de proyecto sincronizables en la entidad secundaria (15.10)|
| **gitlab.geo.project.wiki.repositories_verification_failed** <br>(gauge) | Número de repositorios de wiki de proyecto que fallaron la verificación en la entidad secundaria (15.10)|
| **gitlab.geo.project.wiki.repositories_verification_total** <br>(gauge) | Número de repositorios de wiki de proyecto a intentar verificar en la entidad secundaria (15.10)|
| **gitlab.geo.project.wiki.repositories_verified** <br>(gauge) | Número de repositorios de wiki de proyecto verificados con éxito en la entidad secundaria (15.10)|
| **gitlab.geo.repositories** <br>(gauge) | El número total de repositorios disponibles en la entidad primaria|
| **gitlab.geo.repositories_checked_count** <br>(gauge) | El número de repositorios que se han comprobado mediante git fsck|
| **gitlab.geo.repositories_checked_failed_count** <br>(gauge) | El número de repositorios que tienen un fallo de git fsck|
| **gitlab.geo.repositories_checksum_failed_count** <br>(gauge) | El número de repositorios que no han podido calcular la suma de comprobación en la entidad primaria|
| **gitlab.geo.repositories_checksum_mismatch_count** <br>(gauge) | Número de repositorios cuya suma de comprobación no coincide en la entidad secundaria|
| **gitlab.geo.repositories_checksummed_count** <br>(gauge) | Número de repositorios comprobados en la entidad primaria|
| **gitlab.geo.repositories_failed** <br>(gauge) | Número de repositorios no sincronizados en la entidad secundaria|
| **gitlab.geo.repositories_retrying_verification_count** <br>(gauge) | Número de fallos de verificación de repositorios que Geo está intentando corregir activamente en la entidad secundaria.|
| **gitlab.geo.repositories_synced** <br>(gauge) | Número de repositorios sincronizados en la entidad secundaria|
| **gitlab.geo.repositories_verification_failed_count** <br>(gauge) | Número de repositorios no verificados en la entidad secundaria|
| **gitlab.geo.repositories_verified_count** <br>(gauge) | El número de repositorios verificados en la entidad secundaria|
| **gitlab.geo.status_failed.count** <br>(count) | \[OpenMetrics V2\] Número de veces que ha fallado la recuperación del estado del nodo de Geo.|
| **gitlab.geo.status_failed_total** <br>(count) | \[OpenMetrics V1\] El número de veces que falló la recuperación del estado del nodo de Geo.|
| **gitlab.geo.terraform_states** <br>(gauge) | Número de estados de terraform en la entidad primaria|
| **gitlab.geo.terraform_states_checksum_failed** <br>(gauge) | Número de estados de terraform en los que no se ha podido calcular la suma de comprobación en la entidad primaria|
| **gitlab.geo.terraform_states_checksummed** <br>(gauge) | Número de estados de terraform comprobados en la entidad primaria|
| **gitlab.geo.terraform_states_failed** <br>(gauge) | Número de estados de terraform sincronizables no sincronizados en la entidad secundaria|
| **gitlab.geo.terraform_states_registry** <br>(gauge) | Número de estados de terraform en el registro|
| **gitlab.geo.terraform_states_synced** <br>(gauge) | Número de estados de terraform sincronizables en la entidad secundaria|
| **gitlab.geo.wikis_checksum_failed_count** <br>(gauge) | El número de wikis que no han podido calcular la suma de comprobación en la entidad primaria|
| **gitlab.geo.wikis_checksum_mismatch_count** <br>(gauge) | Número de wikis cuya suma de comprobación no coincide en la entidad secundaria|
| **gitlab.geo.wikis_checksummed_count** <br>(gauge) | Número de wikis verificados en la entidad primaria|
| **gitlab.geo.wikis_retrying_verification_count** <br>(gauge) | Número de fallos de verificación de wikis que Geo está intentando corregir activamente en la entidad secundaria.|
| **gitlab.geo.wikis_verification_failed_count** <br>(gauge) | El número de wikis no verificadas en la entidad secundaria|
| **gitlab.geo.wikis_verified_count** <br>(gauge) | El número de wikis verificados en la entidad secundaria|
| **gitlab.gitaly.cacheinvalidator_rpc.count** <br>(count) | \[OpenMetrics V2\] Número total de RPCs encontrados por el invalidador de caché.|
| **gitlab.gitaly.catfile_cache_members** <br>(gauge) | \[OpenMetrics V2\] Indicador de los miembros de la caché catfile por tipo de proceso.|
| **gitlab.gitaly.catfile_processes** <br>(gauge) | \[OpenMetrics V2\] .|
| **gitlab.gitaly.command.context_switches.count** <br>(count) | \[OpenMetrics V2\] Suma de cambios de contexto realizados durante el proceso de shell.|
| **gitlab.gitaly.command.cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] Suma del tiempo de CPU gastado en el proceso de shell.|
| **gitlab.gitaly.command.major_page_faults.count** <br>(count) | \[OpenMetrics V2\] Suma de los fallos graves de la página realizados en el proceso de shell.|
| **gitlab.gitaly.command.minor_page_faults.count** <br>(count) | \[OpenMetrics V2\] Suma de los fallos secundarios de la página realizados en el proceso de shell.|
| **gitlab.gitaly.command.real_seconds.count** <br>(count) | \[OpenMetrics V2\] Suma de tiempo real gastado en el proceso de shell.|
| **gitlab.gitaly.command.signals_received.count** <br>(count) | \[OpenMetrics V2\] Suma de tiempo real gastado en el proceso de shell.|
| **gitlab.gitaly.command.spawn_token_acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] Suma de tiempo de espera de un token de spawn.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.commands_running** <br>(gauge) | \[OpenMetrics V2\] Número total de procesos que se están ejecutando actualmente.|
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Buckets de histograma del tiempo que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] Recuento del tiempo en que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.concurrency_limiting_acquiring_seconds.sum** <br>(count) | \[OpenMetrics V2\] Suma de tiempo en que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.concurrency_limiting_in_progress** <br>(gauge) | \[OpenMetrics V2\] Indicador del número de llamadas concurrentes en curso.|
| **gitlab.gitaly.concurrency_limiting_queued** <br>(gauge) | \[OpenMetrics V2\] Indicador del número de llamadas en cola.|
| **gitlab.gitaly.diskcache.bytes_fetched.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de caché de disco recuperados.<br>_Se muestra como byte_ |
| **gitlab.gitaly.diskcache.bytes_loser.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de caché de disco por pérdida de escrituras.<br>_Se muestra como byte_ |
| **gitlab.gitaly.diskcache.bytes_stored.count** <br>(count) | \[OpenMetrics V2\] Número total de bytes de caché de disco almacenados.<br>_Se muestra como byte_ |
| **gitlab.gitaly.diskcache.miss.count** <br>(count) | \[OpenMetrics V2\] Número total de pérdidas de caché de disco.|
| **gitlab.gitaly.diskcache.requests.count** <br>(count) | \[OpenMetrics V2\] Número total de solicitudes de caché de disco.|
| **gitlab.gitaly.diskcache.walker_empty_dir.count** <br>(count) | \[OpenMetrics V2\] Número total de directorios vacíos encontrados.|
| **gitlab.gitaly.diskcache.walker_empty_dir_removal.count** <br>(count) | \[OpenMetrics V2\] Número total de directorios vacíos eliminados.|
| **gitlab.gitaly.diskcache.walker_error.count** <br>(count) | \[OpenMetrics V2\] Número total de eventos durante los recorridos por el sistema de archivos diskcache.|
| **gitlab.gitaly.diskcache.walker_removal.count** <br>(count) | \[OpenMetrics V2\] Retraso entre la llamada al servicio de transacciones y la recepción de una respuesta.|
| **gitlab.gitaly.go.gc_duration_seconds.count** <br>(count) | \[OpenMetrics V2\] Resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados.<br>_Se muestra en segundos_ |
| **gitlab.gitaly.go.gc_duration_seconds.quantile** <br>(gauge) | \[OpenMetrics V2\] Resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados.<br>_Se muestra en segundos_ |
| **gitlab.gitaly.go.gc_duration_seconds.sum** <br>(count) | \[OpenMetrics V2\] Resumen de la duración de la pausa de los ciclos de recopilación de elementos no usados.<br>_Se muestra en segundos_ |
| **gitlab.gitaly.go.goroutines** <br>(gauge) | \[OpenMetrics V2\] Número de goroutines que existen actualmente.|
| **gitlab.gitaly.go.info** <br>(gauge) | \[OpenMetrics V2\] Información sobre el entorno de Go.|
| **gitlab.gitaly.go.memstats_alloc_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes asignados y aún en uso.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_buck_hash_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes utilizados por la tabla hash del bucket de perfiles.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_frees.count** <br>(count) | \[OpenMetrics V2\] Número total de libres.|
| **gitlab.gitaly.go.memstats_gc_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_heap_alloc_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes de heap asignados y aún en uso.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_heap_idle_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes del heap en espera de ser utilizados.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_heap_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes del heap que están en uso.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_heap_objects** <br>(gauge) | \[OpenMetrics V2\] Número de objetos asignados.|
| **gitlab.gitaly.go.memstats_heap_released_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes de heap liberados al SO.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_heap_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes de heap obtenidos del sistema.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_last_gc_time_seconds** <br>(gauge) | \[OpenMetrics V2\] Número de segundos transcurridos desde 1970 de la última recopilación de elementos no usados.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.go.memstats_lookups.count** <br>(count) | \[OpenMetrics V2\] Número total de búsquedas de punteros.|
| **gitlab.gitaly.go.memstats_mallocs.count** <br>(count) | \[OpenMetrics V2\] Número total de mallocs.|
| **gitlab.gitaly.go.memstats_mcache_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes en uso por las estructuras mcache.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_mcache_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes utilizados para las estructuras mcache obtenidas del sistema.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_mspan_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes en uso por las estructuras mspan.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_mspan_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes utilizados para las estructuras mspan obtenidas del sistema.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_next_gc_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes del heap cuando se realice la próxima recopilación de elementos no usados.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_other_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes utilizados para otras asignaciones del sistema.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_stack_inuse_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes en uso por el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_stack_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes obtenidos del sistema para el asignador de stack tecnológico.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.memstats_sys_bytes** <br>(gauge) | \[OpenMetrics V2\] Número de bytes obtenidos del sistema.<br>_Se muestra como byte_ |
| **gitlab.gitaly.go.threads** <br>(gauge) | \[OpenMetrics V2\] Número de subprocesos de SO creados.|
| **gitlab.gitaly.grpc_server.handled.count** <br>(count) | \[OpenMetrics V2\] Número total de RPCs completados en el servidor, independientemente del éxito o fracaso.|
| **gitlab.gitaly.grpc_server.handling_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Bucket de histograma de la latencia de respuesta de gRPC que había sido gestionada a nivel de aplicación por el servidor.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.grpc_server.handling_seconds.count** <br>(count) | \[OpenMetrics V2\] Recuento de la latencia de respuesta de gRPC que había sido gestionada a nivel de aplicación por el servidor.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.grpc_server.handling_seconds.sum** <br>(count) | \[OpenMetrics V2\] Suma de la latencia de respuesta de gRPC que ha sido gestionada a nivel de aplicación por el servidor.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.grpc_server.msg_received.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de flujo de RPC recibidos en el servidor.|
| **gitlab.gitaly.grpc_server.msg_sent.count** <br>(count) | \[OpenMetrics V2\] Número total de mensajes de flujo de gRPC enviados por el servidor.|
| **gitlab.gitaly.grpc_server.started.count** <br>(count) | \[OpenMetrics V2\] Número total de RPCs iniciados en el servidor.|
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Retraso entre la llamada al servicio de transacciones y la recepción de una respuesta.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.count** <br>(count) | \[OpenMetrics V2\] Retraso entre la llamada al servicio de transacciones y la recepción de una respuesta.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.hook_transaction_voting_delay_seconds.sum** <br>(count) | \[OpenMetrics V2\] Retraso entre la llamada al servicio de transacciones y la recepción de una respuesta.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.inforef_cache_attempt.count** <br>(count) | \[OpenMetrics V2\] Número total de RPCs smarthttp info-ref que acceden a la caché.|
| **gitlab.gitaly.list_commits_by_oid_request_size.bucket** <br>(count) | \[OpenMetrics V2\] Número de confirmaciones solicitadas en una solicitud ListCommitsByOid.|
| **gitlab.gitaly.list_commits_by_oid_request_size.count** <br>(count) | \[OpenMetrics V2\] Número de confirmaciones solicitadas en una solicitud ListCommitsByOid.|
| **gitlab.gitaly.list_commits_by_oid_request_size.sum** <br>(count) | \[OpenMetrics V2\] Número de confirmaciones solicitadas en una solicitud ListCommitsByOid.|
| **gitlab.gitaly.pack_objects.acquiring_seconds.bucket** <br>(count) | \[OpenMetrics V2\] Bucket de histograma de tiempo en que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.pack_objects.acquiring_seconds.count** <br>(count) | \[OpenMetrics V2\] Recuento del tiempo en que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.pack_objects.acquiring_seconds.sum** <br>(count) | \[OpenMetrics V2\] Suma de tiempo en que las llamadas tienen tarifa limitada.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.pack_objects.generated_bytes.count** <br>(count) | \[OpenMetrics V2\] Número de bytes generados en PackObjectsHook al ejecutar git-pack-objects.<br>_Se muestra como byte_ |
| **gitlab.gitaly.pack_objects.in_progress** <br>(gauge) | \[OpenMetrics V2\] Indicador del número de llamadas concurrentes en curso.|
| **gitlab.gitaly.pack_objects.queued** <br>(gauge) | \[OpenMetrics V2\] Indicador del número de llamadas en cola.|
| **gitlab.gitaly.pack_objects.served_bytes.count** <br>(count) | \[OpenMetrics V2\] Número de bytes de datos git-pack-objects entregados a clientes.<br>_Se muestra como byte_ |
| **gitlab.gitaly.process_cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] Tiempo total de CPU del usuario y del sistema empleado en segundos.<br>_Se muestra en segundos_ |
| **gitlab.gitaly.process_max_fds** <br>(gauge) | \[OpenMetrics V2\] Número máximo de descriptores de archivo abiertos.|
| **gitlab.gitaly.process_open_fds** <br>(gauge) | \[OpenMetrics V2\] Número de descriptores de archivo abiertos.|
| **gitlab.gitaly.process_resident_memory_bytes** <br>(gauge) | \[OpenMetrics V2\] Tamaño de la memoria residente en bytes.<br>_Se muestra como byte_ |
| **gitlab.gitaly.process_start_time_seconds** <br>(gauge) | \[OpenMetrics V2\] Tiempo de inicio del proceso desde unix epoch en segundos.<br>_Se muestra como segundo_ |
| **gitlab.gitaly.process_virtual_memory_bytes** <br>(gauge) | \[OpenMetrics V2\] Tamaño de la memoria virtual en bytes.<br>_Se muestra como byte_ |
| **gitlab.gitaly.process_virtual_memory_max_bytes** <br>(gauge) | \[OpenMetrics V2\] Cantidad máxima de memoria virtual disponible en bytes.<br>_Se muestra como byte_ |
| **gitlab.gitaly.promhttp_metric_handler_requests.count** <br>(count) | \[OpenMetrics V2\] Número total de scrapes por código de estado HTTP.|
| **gitlab.gitaly.promhttp_metric_handler_requests_in_flight** <br>(gauge) | \[OpenMetrics V2\] Número actual de scrapes que se están entregando.|
| **gitlab.gitaly.spawn_timeouts.count** <br>(count) | \[OpenMetrics V2\] Número de procesos de tiempo de espera de spawn.|
| **gitlab.gitaly.streamcache_sendfile_bytes.count** <br>(count) | \[OpenMetrics V2\] Número de bytes enviados usando sendfile.<br>_Se muestra como byte_ |
| **gitlab.global_search_awaiting_indexing_queue_size** <br>(gauge) | Número de actualizaciones de la base de datos en espera de ser sincronizadas con Elasticsearch mientras la indexación está en pausa|
| **gitlab.global_search_bulk_cron_queue_size** <br>(gauge) | Número de registros de la base de datos a la espera de ser sincronizados con Elasticsearch|
| **gitlab.go_gc_duration_seconds** <br>(gauge) | Un resumen de las duraciones de invocación de GC<br>_Se muestra como solicitud_ |
| **gitlab.go_gc_duration_seconds_count** <br>(gauge) | El recuento de las duraciones de invocación de GC<br>_Se muestra como solicitud_ |
| **gitlab.go_gc_duration_seconds_sum** <br>(count) | La suma de las duraciones de invocación de GC<br>_Se muestra como solicitud_ |
| **gitlab.go_goroutines** <br>(gauge) | El número de goroutines que existen actualmente<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_alloc_bytes** <br>(gauge) | El número de bytes asignados y aún en uso<br>_Se muestra como byte_ |
| **gitlab.go_memstats_alloc_bytes.count** <br>(count) | \[OpenMetrics V2\] El número total de bytes asignados<br>_Se muestra como byte_ |
| **gitlab.go_memstats_alloc_bytes_total** <br>(count) | \[OpenMetrics V1\] El número total de bytes asignados<br>_Se muestra como byte_ |
| **gitlab.go_memstats_buck_hash_sys_bytes** <br>(gauge) | El número de bytes utilizados por la tabla hash del bucket de perfiles<br>_Se muestra como byte_ |
| **gitlab.go_memstats_frees.count** <br>(count) | \[OpenMetrics V2\] El número total de libres<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_frees_total** <br>(count) | \[OpenMetrics V1\] El número total de libres<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_gc_cpu_fraction** <br>(gauge) | La fracción del tiempo de CPU disponible de este programa utilizado por el GC desde que el programa se inició<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_gc_sys_bytes** <br>(gauge) | El número de bytes utilizados para los metadatos del sistema de recopilación de elementos no usados<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_alloc_bytes** <br>(gauge) | El número de bytes del heap asignados y aún en uso<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_idle_bytes** <br>(gauge) | El número de bytes del heap en espera de ser utilizados<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_inuse_bytes** <br>(gauge) | El número de bytes del heap que están en uso<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_objects** <br>(gauge) | El número de objetos asignados<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_heap_released_bytes.count** <br>(count) | \[OpenMetrics V2\] El número total de bytes de heap liberados al SO<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_released_bytes_total** <br>(count) | \[OpenMetrics V1\] El número total de bytes de heap liberados al SO<br>_Se muestra como byte_ |
| **gitlab.go_memstats_heap_sys_bytes** <br>(gauge) | El número de bytes del heap obtenidos del sistema<br>_Se muestra como byte_ |
| **gitlab.go_memstats_last_gc_time_seconds** <br>(gauge) | El número de segundos desde 1970 de la última recopilación de elementos no usados<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_lookups.count** <br>(count) | \[OpenMetrics V2\] El número total de búsquedas de punteros<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_lookups_total** <br>(count) | \[OpenMetrics V1\] El número total de búsquedas de punteros<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_mallocs.count** <br>(count) | \[OpenMetrics V2\] El número total de mallocs<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_mallocs_total** <br>(count) | \[OpenMetrics V1\] El número total de mallocs<br>_Se muestra como solicitud_ |
| **gitlab.go_memstats_mcache_inuse_bytes** <br>(gauge) | El número de bytes en uso por las estructuras mcache<br>_Se muestra como byte_ |
| **gitlab.go_memstats_mcache_sys_bytes** <br>(gauge) | El número de bytes utilizados para las estructuras mcache obtenidas del sistema<br>_Se muestra como byte_ |
| **gitlab.go_memstats_mspan_inuse_bytes** <br>(gauge) | El número de bytes en uso por las estructuras mspan<br>_Se muestra como byte_ |
| **gitlab.go_memstats_mspan_sys_bytes** <br>(gauge) | El número de bytes utilizados para las estructuras mspan obtenidas del sistema<br>_Se muestra como byte_ |
| **gitlab.go_memstats_next_gc_bytes** <br>(gauge) | El número de bytes del heap cuando la próxima recopilación de elementos no usados se llevará a cabo<br>_Se muestra como byte_ |
| **gitlab.go_memstats_other_sys_bytes** <br>(gauge) | El número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra como byte_ |
| **gitlab.go_memstats_stack_inuse_bytes** <br>(gauge) | El número de bytes en uso por el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **gitlab.go_memstats_stack_sys_bytes** <br>(gauge) | El número de bytes obtenidos del sistema para el asignador de stack tecnológico<br>_Se muestra como byte_ |
| **gitlab.go_memstats_sys_bytes** <br>(gauge) | Número de bytes obtenidos por sistema. Suma de todas las asignaciones del sistema<br>_Se muestra como byte_ |
| **gitlab.go_threads** <br>(gauge) | El número de subprocesos de SO create<br>_Se muestra como solicitud_ |
| **gitlab.http.elasticsearch_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración de las solicitudes elasticsearch durante las transacciones web.|
| **gitlab.http.elasticsearch_requests_duration_seconds.count** <br>(count) | El recuento de la duración de las solicitudes elasticsearch durante las transacciones web|
| **gitlab.http.elasticsearch_requests_duration_seconds.sum** <br>(count) | La suma de la duración de las solicitudes elasticsearch durante las transacciones web<br>_Se muestra como segundo_ |
| **gitlab.http.elasticsearch_requests_total** <br>(count) | Recuento de solicitudes de Elasticsearch durante las transacciones web<br>_Se muestra como solicitud_ |
| **gitlab.http_request_duration_microseconds** <br>(gauge) | Las latencias de las solicitudes HTTP en microsegundos<br>_Se muestra como solicitud_ |
| **gitlab.http_request_size_bytes** <br>(gauge) | El tamaño de las solicitudes HTTP en bytes<br>_Se muestra como byte_ |
| **gitlab.http_response_size_bytes** <br>(gauge) | El tamaño de la respuesta HTTP en bytes<br>_Se muestra como byte_ |
| **gitlab.job.waiter_started.count** <br>(count) | \[OpenMetrics V2\] El número de lotes de trabajos iniciados donde una solicitud web está esperando a que los trabajos se completen<br>_Se muestra como trabajo_ |
| **gitlab.job.waiter_started_total** <br>(count) | \[OpenMetrics V1\] El número de lotes de trabajos iniciados donde una solicitud web está esperando a que los trabajos se completen<br>_Se muestra como trabajo_ |
| **gitlab.job.waiter_timeouts.count** <br>(count) | \[OpenMetrics V2\] El número de lotes de trabajos que expiraron cuando una solicitud web está esperando a que los trabajos se completen<br>_Se muestra como trabajo_ |
| **gitlab.job.waiter_timeouts_total** <br>(count) | \[OpenMetrics V1\] El número de lotes de trabajos que expiraron cuando una solicitud web está esperando a que los trabajos se completen<br>_Se muestra como trabajo_ |
| **gitlab.method_call_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración real de las llamadas al método<br>_Se muestra como segundo_ |
| **gitlab.method_call_duration_seconds.count** <br>(count) | El recuento de duración real de llamadas al método|
| **gitlab.method_call_duration_seconds.sum** <br>(count) | La suma de duración real de las llamadas al método<br>_Se muestra como segundo_ |
| **gitlab.page_out_of_bounds** <br>(count) | Contador del límite de paginación PageLimiter alcanzado|
| **gitlab.pipelines_created.count** <br>(count) | \[OpenMetrics V2\] El contador de pipelines creados.|
| **gitlab.pipelines_created_total** <br>(count) | \[OpenMetrics V1\] El contador de pipelines creados|
| **gitlab.process_cpu_seconds.count** <br>(count) | \[OpenMetrics V2\] El tiempo total de CPU del usuario y del sistema empleado en segundos<br>_Se muestra como solicitud_ |
| **gitlab.process_cpu_seconds_total** <br>(count) | \[OpenMetrics V1\] El tiempo total de CPU del usuario y del sistema empleado en segundos<br>_Se muestra como solicitud_ |
| **gitlab.process_max_fds** <br>(gauge) | El número máximo de descriptores de archivo abiertos<br>_Se muestra como solicitud_ |
| **gitlab.process_open_fds** <br>(gauge) | El número de descriptores de archivo abiertos<br>_Se muestra como solicitud_ |
| **gitlab.process_resident_memory_bytes** <br>(gauge) | El tamaño de la memoria residente en bytes<br>_Se muestra como byte_ |
| **gitlab.process_start_time_seconds** <br>(gauge) | La hora de inicio del proceso desde unix epoch en segundos<br>_Se muestra como solicitud_ |
| **gitlab.process_virtual_memory_bytes** <br>(gauge) | El tamaño de la memoria virtual en bytes<br>_Se muestra como byte_ |
| **gitlab.prometheus_build_info** <br>(gauge) | Una métrica con un valor constante de '1' etiquetada por rama de revisión de versión y goversion a partir de la cual se construyó prometheus<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_config_last_reload_success_timestamp_seconds** <br>(gauge) | La marca de tiempo de la última recarga de configuración con éxito<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_config_last_reload_successful** <br>(gauge) | Si el último intento de recarga de la configuración se ha realizado correctamente<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_engine_queries** <br>(gauge) | El número actual de consultas en ejecución o en espera<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_engine_queries_concurrent_max** <br>(gauge) | El número máximo de consultas concurrentes<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_engine_query_duration_seconds** <br>(gauge) | El tiempo de consulta<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_duration_seconds** <br>(gauge) | La duración de las evaluaciones de los grupos de reglas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations.count** <br>(count) | \[OpenMetrics V2\] Número total de evaluaciones de grupos de reglas programadas, tanto si se han ejecutado como si se han omitido<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations_missed.count** <br>(count) | \[OpenMetrics V2\] Número total de evaluaciones de grupos de reglas perdidas debido a la lentitud de la evaluación de grupos de reglas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations_missed_total** <br>(count) | \[OpenMetrics V1\] El número total de evaluaciones de grupos de reglas perdidas debido a la lentitud de la evaluación de grupos de reglas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations_skipped.count** <br>(count) | \[OpenMetrics V2\] Número total de evaluaciones de grupos de reglas omitidas debido al almacenamiento limitado de métricas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations_skipped_total** <br>(count) | \[OpenMetrics V1\] Número total de evaluaciones de grupos de reglas omitidas debido al almacenamiento de métricas limitado<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_evaluator_iterations_total** <br>(count) | \[OpenMetrics V1\] Número total de evaluaciones de grupos de reglas programadas, tanto si se han ejecutado como si se han omitido<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_checkpoint_duration_seconds** <br>(gauge) | La duración en segundos de la comprobación de los chunks abiertos y los chunks pendientes de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_checkpoint_last_duration_seconds** <br>(gauge) | La duración en segundos del último punto de control de los chunks abiertos y los chunks pendientes de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_checkpoint_last_size_bytes** <br>(gauge) | El tamaño del último punto de control de chunks abiertos y chunks pendientes de persistencia<br>_Se muestra como byte_ |
| **gitlab.prometheus_local_storage_checkpoint_series_chunks_written** <br>(gauge) | El número de chunk escritos por serie durante la comprobación de chunks abiertos y chunks pendientes de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_checkpointing** <br>(gauge) | 1 si el almacenamiento se comprueba y 0 en caso contrario<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_chunk_ops.count** <br>(count) | \[OpenMetrics V2\] El número total de operaciones chunk por su tipo<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_chunk_ops_total** <br>(count) | \[OpenMetrics V1\] El número total de operaciones chunk por su tipo<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_chunks_to_persist** <br>(count) | El número actual de chunks en espera de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_fingerprint_mappings.count** <br>(count) | \[OpenMetrics V2\] El número total de huellas dactilares que se asignan para evitar colisiones<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_fingerprint_mappings_total** <br>(count) | \[OpenMetrics V1\] El número total de huellas dactilares que se asignan para evitar colisiones<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_inconsistencies.count** <br>(count) | \[OpenMetrics V2\] Contador que se incrementa cada vez que se detecta una inconsistencia en el almacenamiento local. Si es mayor que cero, reinicia el servidor lo antes posible<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_inconsistencies_total** <br>(count) | \[OpenMetrics V1\] Contador que se incrementa cada vez que se detecta una inconsistencia en el almacenamiento local. Si es mayor que cero entonces reinicia el servidor tan pronto como sea posible<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_indexing_batch_duration_seconds** <br>(gauge) | Los cuantiles para la duración de la indexación por lotes en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_indexing_batch_sizes** <br>(gauge) | Los cuantiles de los tamaños de los lotes de indexación (número de métricas por lote)<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_indexing_queue_capacity** <br>(gauge) | La capacidad de la cola de indexación<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_indexing_queue_length** <br>(gauge) | El número de métricas en espera de ser indexadas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_ingested_samples.count** <br>(count) | \[OpenMetrics V2\] El número total de muestras ingeridas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_ingested_samples_total** <br>(count) | \[OpenMetrics V1\] El número total de muestras ingeridas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_maintain_series_duration_seconds** <br>(gauge) | La duración en segundos que se tardó en realizar el mantenimiento de una serie<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_memory_chunkdescs** <br>(gauge) | El número actual de descriptores de chunk en memoria<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_memory_chunks** <br>(gauge) | El número actual de chunks en memoria. El número no incluye los chunks clonados (es decir, chunks sin descriptor)<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_memory_dirty_series** <br>(gauge) | El número actual de series que requerirían una búsqueda de disco durante la recuperación de un fallo<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_memory_series** <br>(gauge) | El número actual de series en memoria<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_non_existent_series_matches.count** <br>(count) | \[OpenMetrics V2\] Cuántas veces se hizo referencia a una serie inexistente durante la coincidencia de etiquetas o la precarga de chunks. Esto indica que los índices de etiquetas no están actualizados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_non_existent_series_matches_total** <br>(count) | \[OpenMetrics V1\] Cuántas veces se hizo referencia a una serie inexistente durante la coincidencia de etiquetas o la precarga de checks. Esto indica que los índices de etiquetas no están actualizados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_open_head_chunks** <br>(gauge) | El número actual de chunks de encabezado abiertos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_out_of_order_samples.count** <br>(count) | \[OpenMetrics V2\] Número total de muestras descartadas porque sus marcas temporales eran iguales o anteriores a la última muestra recibida de una serie<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_out_of_order_samples_total** <br>(count) | \[OpenMetrics V1\] El número total de muestras que se descartaron porque sus marcas temporales eran iguales o anteriores a la última muestra recibida de una serie<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_persist_errors.count** <br>(count) | \[OpenMetrics V2\] El número total de errores al escribir en la capa de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_persist_errors_total** <br>(count) | \[OpenMetrics V1\] El número total de errores al escribir en la capa de persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_persistence_urgency_score** <br>(gauge) | Una puntuación de urgencia para la persistencia de chunks. 0 es menos urgente y 1 más<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_queued_chunks_to_persist.count** <br>(count) | \[OpenMetrics V2\] El número total de chunks en cola para la persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_queued_chunks_to_persist_total** <br>(count) | \[OpenMetrics V1\] El número total de chunks en cola para la persistencia<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_rushed_mode** <br>(gauge) | 1 si el almacenamiento está en modo rápido y 0 en caso contrario<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_series_chunks_persisted** <br>(gauge) | El número de chunks persistidos por serie<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_series_ops.count** <br>(count) | \[OpenMetrics V2\] El número total de operaciones en serie por su tipo<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_series_ops_total** <br>(count) | \[OpenMetrics V1\] El número total de operaciones en serie por su tipo<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_started_dirty** <br>(gauge) | Si el almacenamiento local se encontró sucio (y se produjo la recuperación del fallo) durante el inicio de Prometheus<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_local_storage_target_heap_size_bytes** <br>(gauge) | El tamaño del heap de destino configurado en bytes<br>_Se muestra como byte_ |
| **gitlab.prometheus_notifications_alertmanagers_discovered** <br>(gauge) | El número de alertmanagers descubiertos y activos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_notifications_dropped.count** <br>(count) | \[OpenMetrics V2\] Número total de alertas descartadas debido a errores al enviarlas a Alertmanager<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_notifications_dropped_total** <br>(count) | \[OpenMetrics V1\] Número total de alertas descartadas por errores al enviarlas a Alertmanager<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_notifications_queue_capacity** <br>(gauge) | La capacidad de la cola de notificaciones de alerta<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_notifications_queue_length** <br>(gauge) | El número de notificaciones de alerta en la cola<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_rule_evaluation_failures.count** <br>(count) | \[OpenMetrics V2\] El número total de fallos en la evaluación de reglas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_rule_evaluation_failures_total** <br>(count) | \[OpenMetrics V1\] El número total de fallos en la evaluación de reglas<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_azure_refresh_duration_seconds** <br>(gauge) | La duración de una actualización de Azure-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_azure_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de actualización de Azure-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_azure_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de actualización de Azure-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_consul_rpc_duration_seconds** <br>(gauge) | La duración de una llamada RPC de Consul en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_consul_rpc_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de llamadas RPC de Consul<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_consul_rpc_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de llamadas RPC de Consul<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_dns_lookup_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de búsqueda DNS-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_dns_lookup_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de búsqueda DNS-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_dns_lookups.count** <br>(count) | \[OpenMetrics V2\] El número de búsquedas DNS-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_dns_lookups_total** <br>(count) | \[OpenMetrics V1\] El número de búsquedas DNS-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_ec2_refresh_duration_seconds** <br>(gauge) | La duración de una actualización de EC2-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_ec2_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de scrape EC2-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_ec2_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de scrape EC2-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_file_read_errors.count** <br>(count) | \[OpenMetrics V2\] El número de errores de lectura File-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_file_read_errors_total** <br>(count) | \[OpenMetrics V1\] El número de errores de lectura de File-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_file_scan_duration_seconds** <br>(gauge) | La duración de la exploración del File-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_gce_refresh_duration** <br>(gauge) | La duración de una actualización de GCE-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_gce_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de actualización GCE-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_gce_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de actualización GCE-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_kubernetes_events.count** <br>(count) | \[OpenMetrics V2\] Número de eventos de Kubernetes gestionados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_kubernetes_events_total** <br>(count) | \[OpenMetrics V1\] Número de eventos de Kubernetes gestionados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_marathon_refresh_duration_seconds** <br>(gauge) | La duración de una actualización de Marathon-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_marathon_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de actualización de Marathon-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_marathon_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de actualización de Marathon-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_openstack_refresh_duration_seconds** <br>(gauge) | La duración de una actualización de OpenStack-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_openstack_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de scrape OpenStack-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_openstack_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de scrape OpenStack-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_triton_refresh_duration_seconds** <br>(gauge) | La duración de una actualización de Triton-SD en segundos<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_triton_refresh_failures.count** <br>(count) | \[OpenMetrics V2\] El número de fallos de scrape Triton-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_sd_triton_refresh_failures_total** <br>(count) | \[OpenMetrics V1\] El número de fallos de scrape Triton-SD<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_interval_length_seconds** <br>(gauge) | Los intervalos reales entre scrapes<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_scrape_pool_sync.count** <br>(count) | \[OpenMetrics V2\] El número total de sincronizaciones que se ejecutaron en un grupo de scrape<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_scrape_pool_sync_total** <br>(count) | \[OpenMetrics V1\] El número total de sincronizaciones que se ejecutaron en un grupo de scrape<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_scrapes_exceeded_sample_limit.count** <br>(count) | \[OpenMetrics V2\] Número total de scrape que alcanzaron el límite de muestra y fueron rechazados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_scrapes_exceeded_sample_limit_total** <br>(count) | \[OpenMetrics V1\] Número total de scrape que alcanzaron el límite de muestra y fueron rechazados<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_skipped_scrapes.count** <br>(count) | \[OpenMetrics V2\] El número total de scrapes que se omitieron porque el almacenamiento de métricas se limitó<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_skipped_scrapes_total** <br>(count) | \[OpenMetrics V1\] El número total de scrapes que se omitieron debido a que el almacenamiento de métricas se limitó<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_target_sync_length_seconds** <br>(gauge) | El intervalo real para sincronizar el grupo de scrape<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_treecache_watcher_goroutines** <br>(gauge) | El número actual de goroutines de observador<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_treecache_zookeeper_failures.count** <br>(count) | \[OpenMetrics V2\] El número total de fallos de ZooKeeper<br>_Se muestra como solicitud_ |
| **gitlab.prometheus_treecache_zookeeper_failures_total** <br>(count) | \[OpenMetrics V1\] El número total de fallos de ZooKeeper<br>_Se muestra como solicitud_ |
| **gitlab.puma.active_connections** <br>(gauge) | El número de subprocesos de puma que procesan una solicitud<br>_Se muestra como subproceso_ |
| **gitlab.puma.idle_threads** <br>(gauge) | El número de subprocesos de puma generados que no están procesando una solicitud<br>_Se muestra como subproceso_ |
| **gitlab.puma.killer_terminations.count** <br>(count) | \[OpenMetrics V2\] El número de workers terminados por PumaWorkerKiller<br>_Se muestra como worker_ |
| **gitlab.puma.killer_terminations_total** <br>(count) | \[OpenMetrics V1\] El número de workers terminados por PumaWorkerKiller<br>_Se muestra como worker_ |
| **gitlab.puma.max_threads** <br>(gauge) | El número máximo de subprocesos del worker de puma<br>_Se muestra como subproceso_ |
| **gitlab.puma.pool_capacity** <br>(gauge) | El número de solicitudes que el worker de puma es capaz de tomar en este momento<br>_Se muestra como solicitud_ |
| **gitlab.puma.queued_connections** <br>(gauge) | El número de conexiones en el conjunto `todo` de ese worker de puma en espera de un subproceso de worker<br>_Se muestra como conexión_ |
| **gitlab.puma.running** <br>(gauge) | El número de subproceso de puma en ejecución<br>_Se muestra como subproceso_ |
| **gitlab.puma.running_workers** <br>(gauge) | El número de worker de puma arrancado<br>_Se muestra como worker_ |
| **gitlab.puma.stale_workers** <br>(gauge) | El número de workers de puma antiguos<br>_Se muestra como worker_ |
| **gitlab.puma.workers** <br>(gauge) | Número total de workers de puma<br>_Se muestra como worker_ |
| **gitlab.rack.http_request_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El tiempo de respuesta HTTP de rack middleware<br>_Se muestra como segundo_ |
| **gitlab.rack.http_request_duration_seconds.count** <br>(count) | Recuento del tiempo de respuesta HTTP de rack middleware|
| **gitlab.rack.http_request_duration_seconds.sum** <br>(count) | La suma del tiempo de respuesta HTTP de rack middleware<br>_Se muestra en segundos_ |
| **gitlab.rack.http_requests.count** <br>(count) | \[OpenMetrics V2\] El recuento de solicitudes de rack<br>_Se muestra como solicitud_ |
| **gitlab.rack.http_requests_total** <br>(count) | \[OpenMetrics V1\] El recuento de solicitudes de rack<br>_Se muestra como solicitud_ |
| **gitlab.rack.uncaught_errors.count** <br>(count) | \[OpenMetrics V2\] El recuento de conexiones de rack que manejan errores uncaught<br>_Se muestra como conexión_ |
| **gitlab.rack.uncaught_errors_total** <br>(count) | \[OpenMetrics V1\] El recuento de conexiones de rack que manejan errores uncaught<br>_Se muestra como conexión_ |
| **gitlab.rails_queue_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] La latencia entre GitLab Workhorse reenviando una solicitud a Rails<br>_Se muestra como segundo_ |
| **gitlab.rails_queue_duration_seconds.count** <br>(count) | El contador de latencia entre que GitLab Workhorse reenvía una solicitud a Rails|
| **gitlab.rails_queue_duration_seconds.sum** <br>(count) | La suma de la latencia entre que GitLab Workhorse reenvía una solicitud a Rails<br>_Se muestra como segundo_ |
| **gitlab.redis.client_exceptions.count** <br>(count) | \[OpenMetrics V2\] Número de excepciones de cliente de Redis, desglosado por clase de excepción<br>_Se muestra como error_ |
| **gitlab.redis.client_exceptions_total** <br>(count) | \[OpenMetrics V1\] Número de excepciones de cliente de Redis, desglosado por clase de excepción<br>_Se muestra como error_ |
| **gitlab.redis.client_requests.count** <br>(count) | \[OpenMetrics V2\] Número de solicitudes de clientes de Redis<br>_Se muestra como solicitud_ |
| **gitlab.redis.client_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la latencia de las solicitudes de redis, excluyendo los comandos de bloqueo.|
| **gitlab.redis.client_requests_duration_seconds.count** <br>(count) | El recuento de la latencia de las solicitudes de redis, excluyendo los comandos de bloqueo|
| **gitlab.redis.client_requests_duration_seconds.sum** <br>(count) | La suma de la latencia de las peticiones de redis, excluyendo los comandos de bloqueo<br>_Se muestra como segundo_ |
| **gitlab.redis.client_requests_total** <br>(count) | \[OpenMetrics V1\] Número de solicitudes de clientes de Redis<br>_Se muestra como solicitud_ |
| **gitlab.ruby.file_descriptors** <br>(gauge) | Número de descriptores de archivo por proceso|
| **gitlab.ruby.gc_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El tiempo empleado por Ruby en GC<br>_Se muestra como segundo_ |
| **gitlab.ruby.gc_duration_seconds.count** <br>(count) | El recuento del tiempo empleado por Ruby en GC|
| **gitlab.ruby.gc_duration_seconds.sum** <br>(count) | La suma del tiempo empleado por Ruby en GC<br>_Se muestra como segundo_ |
| **gitlab.ruby.gc_stat** <br>(gauge) | \[OpenMetrics V2\] El número de recolectores de elementos no usados de ruby|
| **gitlab.ruby.gc_stat.count** <br>(gauge) | \[OpenMetrics V1\] El número de recolectores de elementos no usados de ruby|
| **gitlab.ruby.gc_stat.heap_allocatable_pages** <br>(gauge) | El número de páginas malloced que se pueden utilizar<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.heap_allocated_pages** <br>(gauge) | El número de páginas del heap asignadas actualmente<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.heap_available_slots** <br>(gauge) | El número de ranuras en las páginas del heap|
| **gitlab.ruby.gc_stat.heap_eden_pages** <br>(gauge) | El número de páginas del heap que contienen un objeto activo<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.heap_final_slots** <br>(gauge) | El número de ranuras en el heap con finalizadores|
| **gitlab.ruby.gc_stat.heap_free_slots** <br>(gauge) | Número de ranuras vacías en el heap|
| **gitlab.ruby.gc_stat.heap_live_slots** <br>(gauge) | Número de ranuras activas en el heap|
| **gitlab.ruby.gc_stat.heap_marked_slots** <br>(gauge) | El número de ranuras que están marcadas o son antiguas<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.heap_sorted_length** <br>(gauge) | La longitud del heap en memoria|
| **gitlab.ruby.gc_stat.heap_tomb_pages** <br>(gauge) | El número de páginas del heap que no contienen un objeto activo<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.major_gc_count** <br>(gauge) | El número de recolectores de elementos no usados principales<br>_Se muestra como recolección de elementos no usados_ |
| **gitlab.ruby.gc_stat.malloc_increase_bytes** <br>(gauge) | El número de bytes asignados fuera del heap<br>_Se muestra como byte_ |
| **gitlab.ruby.gc_stat.malloc_increase_bytes_limit** <br>(gauge) | El límite de bytes que se pueden asignar fuera del heap<br>_Se muestra como byte_ |
| **gitlab.ruby.gc_stat.minor_gc_count** <br>(gauge) | El número de recolectores de elementos no usados menores<br>_Se muestra como recolección de elementos no usados_ |
| **gitlab.ruby.gc_stat.old_objects** <br>(gauge) | El número de objetos antiguos|
| **gitlab.ruby.gc_stat.old_objects_limit** <br>(gauge) | El límite del número de objetos antiguos|
| **gitlab.ruby.gc_stat.oldmalloc_increase_bytes** <br>(gauge) | El número de bytes asignados fuera del stack tecnológico para objetos antiguos<br>_Se muestra como byte_ |
| **gitlab.ruby.gc_stat.oldmalloc_increase_bytes_limit** <br>(gauge) | El límite de cuántos bytes se pueden asignar fuera del heap para objetos antiguos<br>_Se muestra como byte_ |
| **gitlab.ruby.gc_stat.remembered_wb_unprotected_objects** <br>(gauge) | Número de objetos antiguos que hacen referencia a objetos nuevos|
| **gitlab.ruby.gc_stat.remembered_wb_unprotected_objects_limit** <br>(gauge) | El límite de objetos wb no protegidos|
| **gitlab.ruby.gc_stat.total_allocated_objects** <br>(gauge) | El número total de objetos asignados|
| **gitlab.ruby.gc_stat.total_allocated_pages** <br>(gauge) | El número de páginas asignadas<br>_Se muestra como página_ |
| **gitlab.ruby.gc_stat.total_freed_objects** <br>(gauge) | El número de objetos liberados|
| **gitlab.ruby.gc_stat.total_freed_pages** <br>(gauge) | El número de páginas liberadas<br>_Se muestra como página_ |
| **gitlab.ruby.memory_bytes** <br>(gauge) | El uso de memoria<br>_Se muestra como byte_ |
| **gitlab.ruby.process_cpu_seconds_total** <br>(gauge) | \[OpenMetrics V1 y V2\] La cantidad total de tiempo de CPU por proceso<br>_Se muestra como segundo_ |
| **gitlab.ruby.process_max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos por proceso|
| **gitlab.ruby.process_proportional_memory_bytes** <br>(gauge) | Uso de memoria por proceso (PSS/Proportional Set Size)<br>_Se muestra como byte_ |
| **gitlab.ruby.process_resident_memory_bytes** <br>(gauge) | El uso de memoria por proceso<br>_Se muestra como byte_ |
| **gitlab.ruby.process_start_time_seconds** <br>(gauge) | La marca de tiempo UNIX de la hora de inicio del proceso<br>_Se muestra como segundo_ |
| **gitlab.ruby.process_unique_memory_bytes** <br>(gauge) | Uso de memoria por proceso (USS/Unique Set Size)<br>_Se muestra como byte_ |
| **gitlab.ruby.sampler_duration_seconds.count** <br>(count) | \[OpenMetrics V2\] El tiempo dedicado a la recopilación de estadísticas<br>_Se muestra como segundo_ |
| **gitlab.ruby.sampler_duration_seconds_total** <br>(count) | \[OpenMetrics V1\] El tiempo dedicado a la recopilación de estadísticas<br>_Se muestra como segundo_ |
| **gitlab.ruby.threads_max_expected_threads** <br>(gauge) | Número máximo de subprocesos que se espera que se ejecuten y realicen el trabajo de la aplicación<br>_Se muestra como subproceso_ |
| **gitlab.ruby.threads_running_threads** <br>(gauge) | Número de subprocesos de Ruby en ejecución por nombre<br>_Se muestra como subproceso_ |
| **gitlab.sidekiq.concurrency** <br>(gauge) | El número máximo de trabajos de Sidekiq<br>_Se muestra como trabajo_ |
| **gitlab.sidekiq.elasticsearch_requests.count** <br>(count) | \[OpenMetrics V2\] Solicitudes de Elasticsearch durante una ejecución de trabajo de Sidekiq<br> _Se muestra como solicitud_ |
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración en segundos que un trabajo de Sidekiq gastado en las solicitudes a un servidor de Elasticsearch|
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.count** <br>(count) | El recuento de la duración en segundos que un trabajo de Sidekiq gastado en solicitudes a un servidor de Elasticsearch|
| **gitlab.sidekiq.elasticsearch_requests_duration_seconds.sum** <br>(count) | La suma de la duración en segundos que un trabajo de Sidekiq pasó en solicitudes a un servidor de Elasticsearch<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.elasticsearch_requests_total** <br>(count) | \[OpenMetrics V1\] Solicitudes de Elasticsearch durante una ejecución de trabajo de Sidekiq<br> _Se muestra como solicitud_ |
| **gitlab.sidekiq.jobs_completion_seconds.count** <br>(count) | El recuento de segundos para completar un trabajo de Sidekiq<br> _Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_completion_seconds.sum** <br>(count) | La suma de segundos para completar un trabajo de Sidekiq<br> _Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_cpu_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de segundos de tiempo de cpu para ejecutar un trabajo de Sidekiq<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_cpu_seconds.count** <br>(count) | El recuento de segundos de tiempo de cpu para ejecutar un trabajo de Sidekiq|
| **gitlab.sidekiq.jobs_cpu_seconds.sum** <br>(count) | El recuento de segundos de tiempo de cpu para ejecutar un trabajo de Sidekiq<br> _Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_db_second.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de segundos de tiempo de DB para ejecutar un trabajo de Sidekiq<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_db_second.count** <br>(count) | La cuenta de segundos de tiempo DB para ejecutar un trabajo de Sidekiq|
| **gitlab.sidekiq.jobs_db_second.sum** <br>(count) | La suma de segundos de tiempo DB para ejecutar un trabajo de Sidekiq<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_failed.count** <br>(count) | \[OpenMetrics V2\] El número de trabajos sidekiq fallidos<br>_Se muestra como trabajo_ |
| **gitlab.sidekiq.jobs_failed_total** <br>(count) | \[OpenMetrics V1\] El número de trabajos sidekiq fallidos<br>_Se muestra como trabajo_ |
| **gitlab.sidekiq.jobs_gitaly_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de segundos de tiempo de Gitaly para ejecutar un trabajo de Sidekiq<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_gitaly_seconds.count** <br>(count) | El recuento de segundos de tiempo de Gitaly para ejecutar un trabajo de Sidekiq|
| **gitlab.sidekiq.jobs_gitaly_seconds.sum** <br>(count) | La suma de segundos de tiempo de Gitaly para ejecutar un trabajo de Sidekiq<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_queue_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración en segundos que un trabajo de Sidekiq estuvo en cola antes de ser ejecutado<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_queue_duration_seconds.count** <br>(count) | El recuento de la duración en segundos que un trabajo de Sidekiq estuvo en cola antes de ser ejecutado|
| **gitlab.sidekiq.jobs_queue_duration_seconds.sum** <br>(count) | La suma de la duración en segundos que un trabajo de Sidekiq estuvo en cola antes de ser ejecutado<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.jobs_retried.count** <br>(count) | \[OpenMetrics V2\] El número de trabajos sidekiq reintentados<br>_Se muestra como trabajo_ |
| **gitlab.sidekiq.jobs_retried_total** <br>(count) | \[OpenMetrics V1\] El número de trabajos sidekiq reintentados<br>_Se muestra como trabajo_ |
| **gitlab.sidekiq.redis_requests.count** <br>(count) | \[OpenMetrics V2\] Solicitudes de Redis durante una ejecución de trabajo de Sidekiq<br>_Se muestra como solicitud_ |
| **gitlab.sidekiq.redis_requests_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración en segundos que un trabajo de Sidekiq pasó consultando un servidor de Redis.|
| **gitlab.sidekiq.redis_requests_duration_seconds.count** <br>(count) | El recuento de la duración en segundos que un trabajo de Sidekiq pasó consultando un servidor de Redis|
| **gitlab.sidekiq.redis_requests_duration_seconds.sum** <br>(count) | La suma de la duración en segundos que un trabajo de Sidekiq pasó consultando un servidor de Redis<br>_Se muestra como segundo_ |
| **gitlab.sidekiq.redis_requests_total** <br>(count) | \[OpenMetrics V1\] Solicitudes de Redis durante una ejecución de trabajo de Sidekiq<br>_Se muestra como solicitud_ |
| **gitlab.sidekiq.running_jobs** <br>(gauge) | El número de trabajos sidekiq en ejecución<br>_Se muestra como trabajo_ |
| **gitlab.sql_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El tiempo total de ejecución de SQL, excluyendo las operaciones SCHEMA y BEGIN/COMMIT<br>_Se muestra en segundos_ |
| **gitlab.sql_duration_seconds.count** <br>(count) | El tiempo total de ejecución de SQL, excluyendo las operaciones SCHEMA y BEGIN/COMMIT|
| **gitlab.sql_duration_seconds.sum** <br>(count) | La suma del tiempo de ejecución de SQL, excluyendo las operaciones SCHEMA y BEGIN/COMMIT<br>_Se muestra en segundos_ |
| **gitlab.successful_login_captcha.count** <br>(count) | El contador de intentos de CAPTCHA con éxito durante el inicio de sesión|
| **gitlab.successful_login_captcha_total** <br>(count) | El contador de intentos de CAPTCHA con éxito durante el inicio de sesión|
| **gitlab.transaction.allocated_memory_bytes.bucket** <br>(count) | \[OpenMetrics V2\] La memoria asignada para todas las transacciones (métricas gitlab_transaction\_\*)<br>_Se muestra como byte_ |
| **gitlab.transaction.allocated_memory_bytes.count** <br>(count) | El recuento de memoria asignada para todas las transacciones (métricas gitlab_transaction\_\*)<br>_Se muestra como byte_ |
| **gitlab.transaction.allocated_memory_bytes.sum** <br>(count) | La suma de la memoria asignada para todas las transacciones (métricas gitlab_transaction\_\*)<br>_Se muestra como byte_ |
| **gitlab.transaction.cache_count.count** <br>(count) | \[OpenMetrics V2\] Contador del total de llamadas a la caché de Rails (agregado)|
| **gitlab.transaction.cache_count_total** <br>(count) | \[OpenMetrics V1\] Contador del total de llamadas a la caché de Rails (agregado)|
| **gitlab.transaction.cache_duration.count** <br>(count) | \[OpenMetrics V2\] Contador del tiempo total (segundos) empleado en llamadas a la caché de Rails (agregado)<br>_Se muestra en segundos_. |
| **gitlab.transaction.cache_duration_total** <br>(count) | \[OpenMetrics V1\] El contador del tiempo total (segundos) empleado en llamadas a la caché de Rails (agregado)<br>_Se muestra como segundo_ |
| **gitlab.transaction.cache_read_hit_count.count** <br>(count) | \[OpenMetrics V2\] El contador de visitas a la caché para las llamadas a la caché de Rails<br>_Se muestra como acierto_ |
| **gitlab.transaction.cache_read_hit_count_total** <br>(count) | \[OpenMetrics V1\] El contador de visitas a la caché para las llamadas a la caché de Rails<br>_Se muestra como acierto_ |
| **gitlab.transaction.cache_read_miss_count.count** <br>(count) | \[OpenMetrics V2\] El contador de fallos de caché para las llamadas de caché Rails<br>_Se muestra como fallo_ |
| **gitlab.transaction.cache_read_miss_count_total** <br>(count) | \[OpenMetrics V1\] El contador de fallos de caché para las llamadas de caché de Rails<br>_Se muestra como fallo_ |
| **gitlab.transaction.duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración de todas las transacciones (métricas gitlab_transaction\_\*)<br>_Se muestra como segundo_ |
| **gitlab.transaction.duration_seconds.count** <br>(count) | El recuento de la duración de todas las transacciones (métricas gitlab_transaction_\*)|
| **gitlab.transaction.duration_seconds.sum** <br>(count) | La suma de la duración de todas las transacciones (métricas gitlab_transaction_\*)<br>_Se muestra como segundo_ |
| **gitlab.transaction.event_build_found.count** <br>(count) | \[OpenMetrics V2\] El contador de compilación encontrado para API/trabajos/solicitud|
| **gitlab.transaction.event_build_found_total** <br>(count) | \[OpenMetrics V1\] El contador de compilación encontrado para API/trabajos/solicitud|
| **gitlab.transaction.event_build_invalid.count** <br>(count) | \[OpenMetrics V2\] El contador para compilación inválido debido al conflicto de concurrencia para API/trabajos/solicitud|
| **gitlab.transaction.event_build_invalid_total** <br>(count) | \[OpenMetrics V1\] El contador para compilación inválido debido al conflicto de concurrencia para API/trabajos/solicitud|
| **gitlab.transaction.event_build_not_found.count** <br>(count) | \[OpenMetrics V2\] El contador de compilación no se encuentra para API/trabajos/solicitud|
| **gitlab.transaction.event_build_not_found_cached.count** <br>(count) | \[OpenMetrics V2\] El contador para la respuesta en caché de la compilación no se encuentra para API/trabajos/solicitud|
| **gitlab.transaction.event_build_not_found_cached_total** <br>(count) | \[OpenMetrics V1\] El contador para la respuesta en caché de la compilación no se encuentra para API/trabajos/solicitud|
| **gitlab.transaction.event_build_not_found_total** <br>(count) | \[OpenMetrics V1\] El contador de compilación no se encuentra para API/trabajos/solicitud|
| **gitlab.transaction.event_change_default_branch.count** <br>(count) | \[OpenMetrics V2\] El contador cuando la rama por defecto se cambia para cualquier repositorio|
| **gitlab.transaction.event_change_default_branch_total** <br>(count) | \[OpenMetrics V1\] El contador cuando se cambia la rama por defecto para cualquier repositorio|
| **gitlab.transaction.event_create_repository.count** <br>(count) | \[OpenMetrics V2\] El contador cuando se crea cualquier repositorio|
| **gitlab.transaction.event_create_repository_total** <br>(count) | \[OpenMetrics V1\] El contador cuando se crea cualquier repositorio.|
| **gitlab.transaction.event_etag_caching_cache_hit.count** <br>(count) | \[OpenMetrics V2\] El contador por acierto de caché etag.<br>_Se muestra como acierto_ |
| **gitlab.transaction.event_etag_caching_cache_hit_total** <br>(count) | \[OpenMetrics V1\] El contador por acierto de caché etag.<br>_Se muestra como acierto_ |
| **gitlab.transaction.event_etag_caching_header_missing.count** <br>(count) | \[OpenMetrics V2\] El contador de fallo de caché etag, falta encabezado<br>_Se muestra como fallo_ |
| **gitlab.transaction.event_etag_caching_header_missing_total** <br>(count) | \[OpenMetrics V1\] El contador de fallo de caché etag, falta encabezado<br>_Se muestra como fallo_ |
| **gitlab.transaction.event_etag_caching_key_not_found.count** <br>(count) | \[OpenMetrics V2\] El contador de fallo de caché etag, clave no encontrada<br>_Se muestra como fallo_ |
| **gitlab.transaction.event_etag_caching_key_not_found_total** <br>(count) | \[OpenMetrics V1\] El contador de fallo de caché etag, clave no encontrada<br>_Se muestra como fallo_ |
| **gitlab.transaction.event_etag_caching_middleware_used.count** <br>(count) | \[OpenMetrics V2\] El contador de etag middleware accedido|
| **gitlab.transaction.event_etag_caching_middleware_used_total** <br>(count) | \[OpenMetrics V1\] El contador de etag middleware accedido|
| **gitlab.transaction.event_etag_caching_resource_changed.count** <br>(count) | \[OpenMetrics V2\] El contador de fallo de caché etag, recurso cambiado|
| **gitlab.transaction.event_etag_caching_resource_changed_total** <br>(count) | \[OpenMetrics V1\] El contador de fallo de caché etag, recurso cambiado|
| **gitlab.transaction.event_fork_repository.count** <br>(count) | \[OpenMetrics V2\] El contador de bifurcaciones de repositorios (RepositoryForkWorker). Solo se incrementa cuando existe la fuente de repositorio|
| **gitlab.transaction.event_fork_repository_total** <br>(count) | \[OpenMetrics V1\] El contador de bifurcaciones de repositorios (RepositoryForkWorker). Solo se incrementa cuando existe la fuente de repositorio|
| **gitlab.transaction.event_import_repository.count** <br>(count) | \[OpenMetrics V2\] El contador de importaciones de repositorios (RepositoryImportWorker)|
| **gitlab.transaction.event_import_repository_total** <br>(count) | \[OpenMetrics V1\] El contador de importaciones de repositorios (RepositoryImportWorker)|
| **gitlab.transaction.event_push_branch.count** <br>(count) | \[OpenMetrics V2\] El contador de todos los push de rama|
| **gitlab.transaction.event_push_branch_total** <br>(count) | \[OpenMetrics V1\] El contador de todos los push de rama|
| **gitlab.transaction.event_push_commit.count** <br>(count) | \[OpenMetrics V2\] El contador de confirmaciones|
| **gitlab.transaction.event_push_commit_total** <br>(count) | \[OpenMetrics V1\] El contador de confirmaciones|
| **gitlab.transaction.event_push_tag.count** <br>(count) | \[OpenMetrics V2\] El contador de push de etiqueta|
| **gitlab.transaction.event_push_tag_total** <br>(count) | \[OpenMetrics V1\] El contador de push de etiquetas|
| **gitlab.transaction.event_rails_exception.count** <br>(count) | \[OpenMetrics V2\] El contador del número de excepciones de rails.|
| **gitlab.transaction.event_rails_exception_total** <br>(count) | \[OpenMetrics V1\] El contador del número de excepciones de rails.|
| **gitlab.transaction.event_receive_email.count** <br>(count) | \[OpenMetrics V2\] El contador de correos electrónicos recibidos<br>_Se muestra como correo electrónico_ |
| **gitlab.transaction.event_receive_email_total** <br>(count) | \[OpenMetrics V1\] El contador de correos electrónicos recibidos<br>_Se muestra como correo electrónico_ |
| **gitlab.transaction.event_remote_mirrors_failed.count** <br>(count) | \[OpenMetrics V2\] El contador de réplicas remotas fallidas.|
| **gitlab.transaction.event_remote_mirrors_failed_total** <br>(count) | \[OpenMetrics V1\] El contador de réplicas remotas fallidas.|
| **gitlab.transaction.event_remote_mirrors_finished.count** <br>(count) | \[OpenMetrics V2\] El contador de las réplicas remotas terminadas.|
| **gitlab.transaction.event_remote_mirrors_finished_total** <br>(count) | \[OpenMetrics V1\] El contador de reflejos remotos terminados.|
| **gitlab.transaction.event_remote_mirrors_running.count** <br>(count) | \[OpenMetrics V2\] El contador para ejecutar réplicas remotas|
| **gitlab.transaction.event_remote_mirrors_running_total** <br>(count) | \[OpenMetrics V1\] El contador para ejecutar réplicas remotas|
| **gitlab.transaction.event_remove_branch.count** <br>(count) | \[OpenMetrics V2\] El contador cuando se elimina una rama para cualquier repositorio.|
| **gitlab.transaction.event_remove_branch_total** <br>(count) | \[OpenMetrics V1\] El contador cuando se elimina una rama para cualquier repositorio.|
| **gitlab.transaction.event_remove_repository.count** <br>(count) | \[OpenMetrics V2\] El contador cuando se elimina un repositorio|
| **gitlab.transaction.event_remove_repository_total** <br>(count) | \[OpenMetrics V1\] El contador cuando se elimina un repositorio|
| **gitlab.transaction.event_remove_tag.count** <br>(count) | \[OpenMetrics V2\] El contador cuando se elimina una etiqueta para cualquier repositorio.|
| **gitlab.transaction.event_remove_tag_total** <br>(count) | \[OpenMetrics V1\] El contador cuando se elimina una etiqueta para cualquier repositorio.|
| **gitlab.transaction.event_sidekiq_exception.count** <br>(count) | \[OpenMetrics V2\] El contador de excepciones de Sidekiq|
| **gitlab.transaction.event_sidekiq_exception_total** <br>(count) | \[OpenMetrics V1\] El contador de excepciones de Sidekiq|
| **gitlab.transaction.event_stuck_import_jobs.count** <br>(count) | \[OpenMetrics V2\] El recuento de trabajos de importación atascados.|
| **gitlab.transaction.event_stuck_import_jobs_total** <br>(count) | \[OpenMetrics V1\] El recuento de trabajos de importación atascados.|
| **gitlab.transaction.event_update_build.count** <br>(count) | \[OpenMetrics V2\] El contador de actualización de API/trabajos/solicitud/:id|
| **gitlab.transaction.event_update_build_total** <br>(count) | \[OpenMetrics V1\] El contador de actualización de la compilación para API/trabajos/solicitud/:id|
| **gitlab.transaction.new_redis_connections.count** <br>(count) | \[OpenMetrics V2\] El contador de nuevas conexiones de Redis<br>_Se muestra como conexión_ |
| **gitlab.transaction.new_redis_connections_total** <br>(count) | \[OpenMetrics V1\] El contador de nuevas conexiones de Redis<br>_Se muestra como conexión_ |
| **gitlab.transaction.queue_duration.count** <br>(count) | \[OpenMetrics V2\] La duración de los trabajos se pusieron en cola antes de procesar|
| **gitlab.transaction.queue_duration_total** <br>(count) | \[OpenMetrics V1\] La duración de los trabajos se pusieron en cola antes de procesar|
| **gitlab.transaction.rails_queue_duration_total** <br>(gauge) | \[OpenMetrics V1 y V2\] La latencia entre que GitLab Workhorse reenvía una solicitud a Rails|
| **gitlab.transaction.view_duration.count** <br>(count) | \[OpenMetrics V2\] La duración de las vistas|
| **gitlab.transaction.view_duration_total** <br>(count) | \[OpenMetrics V1\] La duración de las vistas|
| **gitlab.unicorn.active_connections** <br>(gauge) | El número de conexiones Unicorn (workers) activas<br>_Se muestra como conexión_ |
| **gitlab.unicorn.queued_connections** <br>(gauge) | El número de conexiones Unicorn en cola<br>_Se muestra como conexión_ |
| **gitlab.unicorn.workers** <br>(gauge) | El número de workers de Unicorn<br>_Se muestra como worker_ |
| **gitlab.upload_file_does_not_exist** <br>(count) | El número de veces que un registro de carga no pudo encontrar su archivo|
| **gitlab.user_session_logins.count** <br>(count) | \[OpenMetrics V2\] El contador de cuántos usuarios han iniciado sesión|
| **gitlab.user_session_logins_total** <br>(count) | \[OpenMetrics V1\] El contador de cuántos usuarios se han conectado|
| **gitlab.view_rendering_duration_seconds.bucket** <br>(count) | \[OpenMetrics V2\] El recuento de la duración de las vistas (histograma)<br>_Se muestra como segundo_ |
| **gitlab.view_rendering_duration_seconds.count** <br>(count) | El recuento de la duración de las vistas (histograma)|
| **gitlab.view_rendering_duration_seconds.sum** <br>(count) | La suma de la duración de las vistas (histograma)<br>_Se muestra como segundo_ |

### Eventos

El check de GitLab no incluye eventos.

### Checks de servicio

**gitlab.prometheus_endpoint_up**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia de Gitlab.

_Estados: ok, critical_

**gitlab.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia de Gitlab.

_Estados: ok, critical_

**gitlab.gitaly.openmetrics.health**

Devuelve `CRITICAL` si el check no puede acceder al endpoint de métricas de Prometheus de la instancia de Gitaly.

_Estados: ok, critical_

**gitlab.health**

Devuelve `CRITICAL` si el check no puede acceder a la instancia de Gitlab.

_Estados: ok, critical_

**gitlab.liveness**

Devuelve `CRITICAL` si el check no puede acceder a la instancia de Gitlab debido a un bloqueo con los controladores de Rails.

_Estados: ok, critical_

**gitlab.readiness**

Devuelve `CRITICAL` si la instancia de Gitlab no puede aceptar tráfico a través de los controladores de Rails.

_Estados: ok, critical_

**gitlab.readiness.master**

Devuelve `CRITICAL` si el maestro no está listo.

_Estados: ok, critical, unknown_

**gitlab.readiness.database**

Devuelve `CRITICAL` si la base de datos no está lista.

_Estados: ok, critical, unknown_

**gitlab.readiness.cache**

Devuelve `CRITICAL` si la caché no está lista.

_Estados: ok, critical, unknown_

**gitlab.readiness.database_load_balancing**

Devuelve `CRITICAL` si el equilibrio de carga de la base de datos no está listo.

_Estados: ok, critical, unknown_

**gitlab.readiness.queues**

Devuelve `CRITICAL` si las colas no están listas.

_Estados: ok, critical, unknown_

**gitlab.readiness.rate_limiting**

Devuelve `CRITICAL` si la limitación de velocidad no está lista.

_Estados: ok, critical, unknown_

**gitlab.readiness.repository_cache**

Devuelve `CRITICAL` si la caché del repositorio no está lista.

_Estados: ok, critical, unknown_

**gitlab.readiness.cluster_rate_limiting**

Devuelve `CRITICAL` si la limitación de velocidad del clúster no está lista.

_Estados: ok, critical, unknown_

**gitlab.readiness.sessions**

Devuelve `CRITICAL` si las sesiones no están listas.

_Estados: ok, critical, unknown_

**gitlab.readiness.shared_state**

Devuelve `CRITICAL` si el estado compartido no está listo.

_Estados: ok, critical, unknown_

**gitlab.readiness.trace_chunks**

Devuelve `CRITICAL` si los chunks de traza no están listos.

_Estados: ok, critical, unknown_

**gitlab.readiness.gitaly**

Devuelve `CRITICAL` si gitaly no está listo.

_Estados: ok, critical, unknown_

**gitlab.readiness.redis**

Devuelve `CRITICAL` si redis no está listo.

_Estados: ok, critical, unknown_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).