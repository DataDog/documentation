---
app_id: sistema
app_uuid: 43bff15c-c943-4153-a0dc-25bb557ac763
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: system.processes.cpu.pct
      metadata_path: metadata.csv
      prefix: sistema
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Proceso
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- os & system
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/process/README.md
display_on_public_website: true
draft: false
git_integration_title: proceso
integration_id: sistema
integration_title: Procesos
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: proceso
public_title: Procesos
short_description: Captura métricas y monitoriza el estado de procesos en ejecución.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Sistema operativo y sistema
  - Offering::Integración
  configuration: README.md#Configuración
  description: Captura métricas y monitoriza el estado de procesos en ejecución.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/process-check-monitoring
  support: README.md#Soporte
  title: Procesos
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

El check de proceso te permite:
- Recopila métricas del uso de recursos para procesos en ejecución específicos en cualquier host. Por ejemplo, CPU, memoria, E/S y número de subprocesos.
- Utiliza [monitores de procesos][1] para configurar umbrales de cuántas instancias de un proceso específico deben ejecutarse y recibe alertas cuando no se cumplen los umbrales (consulta **Checks de servicio* a continuación).

## Configuración

### Instalación

El check de procesos está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tu servidor.

### Configuración

A diferencia de muchos checks, el check de procesos no monitoriza nada útil por defecto. Debes configurar los procesos que quieres monitorizar.

Aunque no hay una configuración de check por defecto, aquí hay un ejemplo de `process.d/conf.yaml` que monitoriza procesos SSH/SSHD. Para ver todas las opciones de configuración disponibles, consulta el [process.d/conf.yaml de ejemplo][3]:

```yaml
init_config:
instances:
  - name: ssh
    search_string:
      - ssh
      - sshd
```

**Nota**: Asegúrate de [reiniciar el Agent][4] después de realizar cambios de configuración.

La recuperación de algunas métricas de procesos requiere que el recopilador de Datadog se ejecute como el usuario del proceso monitorizado o con acceso privilegiado. Para la métrica`open_file_descriptors` en plataformas Unix, existe una opción de configuración adicional. Configurar `try_sudo` como `true` en el archivo `conf.yaml` permite que el El check de procesos intente utilizar `sudo` para recopilar la métrica `open_file_descriptors`. El uso de esta opción de configuración requiere definir reglas para sudoers apropiadas en `/etc/sudoers`:

```shell
dd-agent ALL=NOPASSWD: /bin/ls /proc/*/fd/
```

### Validación

Ejecuta el [subcomando de estado del Agent][5] y busca `process` en la sección Checks.

### Notas de métricas

Las siguientes métricas no están disponibles en Linux o macOS:
- Las métricas de I/O de procesos **no** están disponibles en Linux o macOS, ya que los archivos que lee el Agent (`/proc//io`) sólo pueden ser leídos por el propietario del proceso. Para obtener más información, [lee las FAQ del Agent][6].

Las siguientes métricas no están disponibles en Windows:
- `system.cpu.iowait`
- `system.processes.mem.page_faults.minor_faults`
- `system.processes.mem.page_faults.children_minor_faults`
- `system.processes.mem.page_faults.major_faults`
- `system.processes.mem.page_faults.children_major_faults`
- `system.processes.mem.real`

**Nota**: Utiliza un [check de WMI][7] para reunir métricas de fallos de páginas en Windows.

**Nota**: En la versión 6.11 o posteriores en Windows, el Agent se ejecuta como `ddagentuser` en lugar de `Local System`. Debido a [esto][8], no tiene acceso a la línea de comandos completa de los procesos que se ejecutan bajo otros usuarios y al usuario de otros procesos de usuarios. Esto provoca que las siguientes opciones de check no funcionen:
- `exact_match`, cuando se configura como `false`
- `user`, que permite seleccionar los procesos que pertenecen a un usuario específico

Todas las métricas se configuran por `instance` en process.yaml y están etiquetados como `process_name:<instance_name>`.

La métrica `system.processes.cpu.pct` enviada por este check sólo es exacta en procesos que duran más
de 30 segundos. No esperes que tu valor sea exacto en procesos con duraciones más cortas.

Para ver la lista completa de métricas, consulta la sección [Métricas](#metrics).

## Datos recopilados

### Métricas
{{< get-metrics-from-git "process" >}}


### Eventos

El check de procesos no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "process" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

## Referencias adicionales

Para hacerse una mejor idea de cómo (o por qué) monitorizar el consumo de recursos de los proceso con Datadog, consulta esta [serie de entradas de blog][12].

[1]: https://docs.datadoghq.com/es/monitors/create/types/process_check/?tab=checkalert
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/process/datadog_checks/process/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/agent/faq/why-don-t-i-see-the-system-processes-open-file-descriptors-metric/
[7]: https://docs.datadoghq.com/es/integrations/wmi_check/
[8]: https://docs.datadoghq.com/es/agent/guide/windows-agent-ddagent-user/#process-check
[9]: https://github.com/DataDog/integrations-core/blob/master/process/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/process/assets/service_checks.json
[11]: https://docs.datadoghq.com/es/help/
[12]: https://www.datadoghq.com/blog/process-check-monitoring