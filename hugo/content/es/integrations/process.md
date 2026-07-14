---
app_id: sistema
categories:
- os & system
custom_kind: integración
description: Captura métricas y monitoriza el estado de los procesos en ejecución.
further_reading:
- link: https://www.datadoghq.com/blog/process-check-monitoring
  tag: blog
  text: Monitorizar el consumo de recursos por parte de los procesos de un vistazo
integration_version: 5.1.0
media: []
supported_os:
- linux
- macos
- windows
title: Procesos
---
## Información general

El check de procesos te permite:

- Recopila métricas del uso de recursos para procesos en ejecución específicos en cualquier host. Por ejemplo, CPU, memoria, E/S y número de subprocesos.
- Utiliza [monitores de procesos](https://docs.datadoghq.com/monitors/create/types/process_check/?tab=checkalert) para configurar umbrales sobre cuántas instancias de un proceso específico deben ejecutarse y recibir alertas cuando los umbrales no se cumplen (consulta **Checks de servicio** más abajo).

## Configuración

### Instalación

El check de procesos está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest), por lo que no necesitas instalar nada más en tu servidor.

### Configuración

A diferencia de muchos checks, el check de procesos no monitoriza nada útil por defecto. Debes configurar los procesos que quieres monitorizar.

Si bien no existe una configuración de check estándar por defecto, aquí hay un ejemplo de `process.d/conf.yaml` que monitoriza los procesos SSH/SSHD. Consulta el [ejemplo process.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles:

```yaml
init_config:
instances:
  - name: ssh
    search_string:
      - ssh
      - sshd
```

**Nota**: Después de realizar cambios en la configuración, asegúrate de [reiniciar el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

La recuperación de algunas métricas de procesos requiere que el recopilador de Datadog se ejecute como el usuario del proceso monitorizado o con acceso privilegiado. Para la métrica`open_file_descriptors` en plataformas Unix, existe una opción de configuración adicional. Configurar `try_sudo` como `true` en el archivo `conf.yaml` permite que el check de procesos intente utilizar `sudo` para recopilar la métrica `open_file_descriptors`. El uso de esta opción de configuración requiere definir reglas para sudoers apropiadas en `/etc/sudoers`:

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### Validación

Ejecuta el [subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `process` en la sección Checks.

### Notas de métricas

Las siguientes métricas no están disponibles en Linux o macOS:

- Las métricas de E/S del proceso **no** están disponibles en Linux o macOS, ya que los archivos que lee el Agent (`/proc/<PID>/io`) solo son legibles por el propietario del proceso. Para obtener más información, [lee las FAQ del Agent](https://docs.datadoghq.com/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/).

Las siguientes métricas no están disponibles en Windows:

- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`
- `system.processes.mem.real`

**Nota**: Utiliza un [check de WMI](https://docs.datadoghq.com/integrations/wmi_check/) para recopilar métricas de fallos de páginas en Windows.

**Nota**: En la versión 6.11 o posteriores en Windows, el Agent se ejecuta como `ddagentuser` en lugar de `Local System`. Debido a [esto](https://docs.datadoghq.com/agent/guide/windows-agent-ddagent-user/#process-check), no tiene acceso a la línea de comandos completa de los procesos que se ejecutan bajo otros usuarios y al usuario de los procesos de otros usuarios. Esto provoca que las siguientes opciones del check no funcionen:

- `exact_match`, cuando se configura como `false`
- `user`, que permite seleccionar los procesos que pertenecen a un usuario específico

Todas las métricas se configuran por `instance` en process.yaml y están etiquetados como `process_name:<instance_name>`.

La métrica `system.processes.cpu.pct` enviada por este check solo es precisa para los procesos que viven más de
de 30 segundos. No esperes que su valor sea exacto para procesos de vida más corta.

Para ver la lista completa de métricas, consulta la sección [Métricas](#metrics).

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **system.processes.cpu.pct** <br>(gauge) | Uso de CPU de un proceso.<br>_Se muestra como porcentaje_ |
| **system.processes.cpu.normalized_pct** <br>(gauge) | Uso normalizado de CPU de un proceso.<br>_Se muestra como porcentaje_ |
| **system.processes.involuntary_ctx_switches** <br>(gauge) | Número de cambios de contexto involuntarios realizados por este proceso.<br>_Se muestra como evento_ |
| **system.processes.ioread_bytes** <br>(gauge) | Número de bytes leídos del disco por este proceso. En Windows: el número de bytes leídos.<br>_Se muestra como bytes_ |
| **system.processes.ioread_bytes_count** <br>(count) | Número de bytes leídos del disco por este proceso. En Windows: el número de bytes leídos.<br>_Se muestra como bytes_ |
| **system.processes.ioread_count** <br>(gauge) | Número de lecturas del disco realizadas por este proceso. En Windows: el número de lecturas realizadas por este proceso.<br>_Se muestra como lectura_ |
| **system.processes.iowrite_bytes** <br>(gauge) | Número de bytes escritos en el disco por este proceso. En Windows: el número de bytes escritos por este proceso.<br>_Se muestra como bytes_ |
| **system.processes.iowrite_bytes_count** <br>(count) | Número de bytes escritos en el disco por este proceso. En Windows: el número de bytes escritos por este proceso.<br>_Se muestra como bytes_ |
| **system.processes.iowrite_count** <br>(gauge) | Número de escrituras en el disco realizadas por este proceso. En Windows: el número de escrituras de este proceso.<br>_Se muestra como escritura_ |
| **system.processes.mem.page_faults.minor_faults** <br>(gauge) | En Unix/Linux y macOS: el número de fallos menores de página por segundo para este proceso.<br>_Se muestra como caso_ |
| **system.processes.mem.page_faults.children_minor_faults** <br>(gauge) | En Unix/Linux y macOS: el número de fallos menores de página por segundo por cada elemento secundario para este proceso.<br>_Se muestra como caso_ |
| **system.processes.mem.page_faults.major_faults** <br>(gauge) | En Unix/Linux y macOS: el número de fallos mayores de página por segundo para este proceso.<br>_Se muestra como caso_ |
| **system.processes.mem.page_faults.children_major_faults** <br>(gauge) | En Unix/Linux y macOS: el número de fallos mayores de página por segundo por cada elemento secundario para este proceso.<br>_Se muestra como caso_ |
| **system.processes.mem.pct** <br>(gauge) | Consumo de memoria del proceso.<br>_Se muestra como porcentaje_ |
| **system.processes.mem.real** <br>(gauge) | Memoria física no intercambiada que un proceso ha utilizado y no puede ser compartida con otro proceso (solo Linux).<br>_Se muestra como bytes_ |
| **system.processes.mem.rss** <br>(gauge) | Memoria física no intercambiada que un proceso ha utilizado. también conocido como "Tamaño del conjunto residente".<br>_Se muestra como bytes_ |
| **system.processes.mem.vms** <br>(gauge) | Cantidad total de memoria virtual utilizada por el proceso. también conocido como "Tamaño de memoria virtual".<br>_Se muestra como bytes_ |
| **system.processes.number** <br>(gauge) | Número de procesos.<br>_Se muestra como proceso_ |
| **system.processes.open_file_descriptors** <br>(gauge) | Número de descriptores de archivos utilizados por este proceso (solo disponible para procesos ejecutados como usuario dd-agent)|
| **system.processes.open_handles** <br>(gauge) | Número de manejadores utilizados por este proceso.|
| **system.processes.threads** <br>(gauge) | Número de subprocesos utilizados por este proceso.<br>_Se muestra como subproceso_ |
| **system.processes.voluntary_ctx_switches** <br>(gauge) | Número de cambios de contexto voluntarios realizados por este proceso.<br>_Se muestra como evento_ |
| **system.processes.run_time.avg** <br>(gauge) | Tiempo medio de ejecución de todas las instancias de este proceso<br>_Se muestra como segundos_ |
| **system.processes.run_time.max** <br>(gauge) | Tiempo más largo de ejecución de todas las instancias de este proceso<br>_Se muestra como segundos_ |
| **system.processes.run_time.min** <br>(gauge) | Tiempo más corto de ejecución de todas las instancias de este proceso<br>_Se muestra como segundos_ |

### Eventos

El check de procesos no incluye eventos.

### Checks de servicio

**process.up**

Devuelve OK si el check está dentro de los umbrales de advertencia, CRITICAL si está fuera de los umbrales críticos y WARNING si está fuera de los umbrales de advertencia.

_Estados: ok, advertencia, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Para hacerte una mejor idea de cómo (o por qué) monitorizar el consumo de recursos por parte de los proceso con Datadog, consulta esta [serie de entradas de blog](https://www.datadoghq.com/blog/process-check-monitoring).