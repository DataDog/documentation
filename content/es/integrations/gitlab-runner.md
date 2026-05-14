---
aliases:
- /es/integrations/gitlab_runner
app_id: gitlab-runner
categories:
- colaboración
- control de fuentes
- seguimiento de problemas
- recopilación de logs
custom_kind: integración
description: Realiza un seguimiento de todas las métricas de tus GitLab Runners con
  Datadog.
integration_version: 7.0.0
media: []
supported_os:
- linux
- macos
- windows
title: GitLab Runners
---
## Información general

Una integración que te permite:

- visualizar y monitorizar las métricas recopiladas con GitLab Runners a través de Prometheus;
- comprobar que el GitLab Runner puede conectarse a GitLab.

Para obtener más información sobre el GitLab Runner y su integración con Prometheus, consulta la [documentación de GitLab Runner](https://docs.gitlab.com/runner/monitoring/).

## Configuración

Sigue las siguientes instrucciones para instalar y configurar este check para un Agent que se ejecute en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de GitLab Runner está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tus servidores GitLab.

### Configuración

Edita el archivo `gitlab_runner.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) para apuntar a tu endpoint de métricas Prometheus del Runner y al máster GitLab para contar con un check de servicio. Consulta el [ejemplo gitlab_runner.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

El elemento `allowed_metrics` de la sección `init_config` permite especificar las métricas que deben extraerse. Algunas métricas deben informarse como `rate`, por ejemplo: `ci_runner_errors`.

### Validación

[Ejecuta el subcomando `status` del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `gitlab_runner` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_bucket** <br>(gauge) | Histograma del tiempo de creación de la máquina Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_count** <br>(gauge) | Recuento del tiempo de creación de la máquina Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_docker_machines_provider_machine_creation_duration_seconds_sum** <br>(gauge) | Suma del tiempo de creación de la máquina Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_docker_machines_provider_machine_states** <br>(gauge) | Número actual de máquinas CI por estado en este proveedor. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_runner_builds** <br>(gauge) | Número actual de compilaciones en ejecución. Se aplica a GitLab Runner \< v1.11.0|
| **gitlab_runner.ci_runner_errors** <br>(count) | Número de errores capturados. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_runner_version_info** <br>(gauge) | Métrica con un valor constante '1' etiquetado por diferentes campos de estadísticas de compilación. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_bucket** <br>(gauge) | Histograma del tiempo de creación de la máquina SSH Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_count** <br>(gauge) | Recuento del tiempo de creación de la máquina SSH Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_creation_duration_seconds_sum** <br>(gauge) | Suma del tiempo de creación de la máquina SSH Docker. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.ci_ssh_docker_machines_provider_machine_states** <br>(gauge) | Número actual de máquinas SSH por estado en este proveedor SSH. Se aplica a GitLab Runner \< v1.11.0<br>_Se muestra como solicitud_ |
| **gitlab_runner.gitlab_runner_autoscaling_machine_creation_duration_seconds** <br>(gauge) | Histograma del tiempo de creación de la máquina Docker. Se aplica a GitLab Runner \< v1.11.0 o posterior<br>_Se muestra como solicitud_ |
| **gitlab_runner.gitlab_runner_autoscaling_machine_states** <br>(gauge) | Número actual de máquinas por estado en este proveedor. Se aplica a GitLab Runner \< v1.11.0 o posterior<br>_Se muestra como solicitud_ |
| **gitlab_runner.gitlab_runner_errors_total** <br>(count) | Número de errores detectados. Se aplica a GitLab Runner v1.11.0 o posterior<br>_Se muestra como solicitud_ |
| **gitlab_runner.gitlab_runner_jobs** <br>(gauge) | Número actual de compilaciones en ejecución. Se aplica a GitLab Runner \< v1.11.0 o posterior|
| **gitlab_runner.gitlab_runner_jobs_total** <br>(count) | Número total de trabajos ejecutados.|
| **gitlab_runner.gitlab_runner_version_info** <br>(gauge) | Métrica con un valor constante '1' etiquetado por diferentes campos de estadísticas de compilación. Se aplica a GitLab Runner \< v1.11.0 o posterior<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_gc_duration_seconds** <br>(gauge) | Resumen de las duraciones de invocaciones de recolección de basura<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_gc_duration_seconds_count** <br>(gauge) | Recuento de las duraciones de invocaciones de recolección de basura<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_gc_duration_seconds_sum** <br>(gauge) | Suma de las duraciones de invocaciones de recolección de basura<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_goroutines** <br>(gauge) | Número de goroutines que existen actualmente<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_alloc_bytes** <br>(gauge) | Número de bytes asignados y aún en uso<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_alloc_bytes_total** <br>(count) | Número total de bytes asignados<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_buck_hash_sys_bytes** <br>(gauge) | Número de bytes utilizados por la tabla hash del bucket de perfiles<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_frees_total** <br>(count) | Número total de libres<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_gc_sys_bytes** <br>(gauge) | Número de bytes utilizados para los metadatos del sistema de recolección de basura<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_heap_alloc_bytes** <br>(gauge) | Número de bytes heap asignados y aún en uso<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_heap_idle_bytes** <br>(gauge) | Número de bytes heap en espera de ser utilizados<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_heap_inuse_bytes** <br>(gauge) | Número de bytes heap en uso<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_heap_objects** <br>(gauge) | Número de objetos asignados<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_heap_released_bytes_total** <br>(count) | Número total de bytes heap liberados al SO<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_heap_sys_bytes** <br>(gauge) | Número de bytes heap obtenidos del sistema<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_last_gc_time_seconds** <br>(gauge) | Número de segundos desde 1970 de la última recolección de basura<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_lookups_total** <br>(count) | Número total de búsquedas de punteros<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_mallocs_total** <br>(count) | Número total de mallocs<br>_Se muestra como solicitud_ |
| **gitlab_runner.go_memstats_mcache_inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mcache<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_mcache_sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mcache obtenidas del sistema<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_mspan_inuse_bytes** <br>(gauge) | Número de bytes en uso por estructuras mspan<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_mspan_sys_bytes** <br>(gauge) | Número de bytes utilizados para estructuras mspan obtenidas del sistema<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_next_gc_bytes** <br>(gauge) | Número de bytes heap en que se realizará la próxima recolección de basura<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_other_sys_bytes** <br>(gauge) | Número de bytes utilizados para otras asignaciones del sistema<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_stack_inuse_bytes** <br>(gauge) | Número de bytes en uso por el asignador de stacks tecnológicos<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_stack_sys_bytes** <br>(gauge) | Número de bytes obtenidos del sistema para el asignador de stacks tecnológicos<br>_Se muestra en bytes_ |
| **gitlab_runner.go_memstats_sys_bytes** <br>(gauge) | Número de bytes obtenidos por sistema. Suma de todas las asignaciones del sistema<br>_Se muestra en bytes_ |
| **gitlab_runner.process_cpu_seconds_total** <br>(count) | Tiempo total de CPU del usuario y del sistema empleado en segundos<br>_Se muestra como solicitud_ |
| **gitlab_runner.process_max_fds** <br>(gauge) | Número máximo de descriptores de archivo abiertos<br>_Se muestra como solicitud_ |
| **gitlab_runner.process_open_fds** <br>(gauge) | Número de descriptores de archivo abiertos<br>_Se muestra como solicitud_ |
| **gitlab_runner.process_resident_memory_bytes** <br>(gauge) | Tamaño de la memoria residente en bytes<br>_Se muestra en bytes_ |
| **gitlab_runner.process_start_time_seconds** <br>(gauge) | Hora de inicio del proceso desde unix epoch en segundos<br>_Se muestra como solicitud_ |
| **gitlab_runner.process_virtual_memory_bytes** <br>(gauge) | Tamaño de la memoria virtual en bytes<br>_Se muestra en bytes_ |

### Recopilación de logs

1. En tu [archivo de configuración](https://docs.gitlab.com/runner/configuration/advanced-configuration.html) de `gitlab_runner`, cambia el formato de log a `json` (_Disponible para versiones de GitLab Runner >= v11.4.0_ ):

   ```toml
   log_format = "json"
   ```

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade el usuario `dd-agent` al grupo `systemd-journal` ejecutando:

   ```text
   usermod -a -G systemd-journal dd-agent
   ```

1. Añade este bloque de configuración al archivo `gitlab_runner.d/conf.yaml` para empezar a recopilar logs del GitLab Runner:

   ```yaml
   logs:
     - type: journald
       source: gitlab-runner
   ```

   Consulta el [ejemplo gitlab_runner.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/gitlab_runner/datadog_checks/gitlab_runner/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

### Eventos

El check del GitLab Runner no incluye eventos.

### Checks de servicio

El check del GitLab Runner brinda un check de servicios para confirmar que el Runner puede comunicarse con el master de GitLab y otro para comprobar que el endpoint local de Prometheus está disponible.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).