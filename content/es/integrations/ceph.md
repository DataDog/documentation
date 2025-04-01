---
app_id: ceph
app_uuid: 485341cc-3dee-4136-b147-dda76171701a
assets:
  dashboards:
    ceph: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: ceph.write_bytes_sec
      metadata_path: metadata.csv
      prefix: ceph.
    process_signatures:
    - ceph-mon
    - ceph-mgr
    - ceph-osd
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 138
    source_type_name: Ceph
  saved_views:
    ceph_processes: assets/saved_views/ceph_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- os & system
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ceph/README.md
display_on_public_website: true
draft: false
git_integration_title: ceph
integration_id: ceph
integration_title: Ceph
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: ceph
public_title: Ceph
short_description: Recopila métricas de rendimiento por grupo y monitoriza el estado
  general del clúster.
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::Almacenes de datos
  - Category::Sistema operativo y sistema
  - Category::Recopilación de logs
  - Offering::integración
  configuration: README.md#Configuración
  description: Recopila métricas de rendimiento por grupo y monitoriza el estado general
    del clúster.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitor-ceph-datadog
  support: README.md#Soporte
  title: Ceph
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![dashboard de Ceph][1]

## Información general

Habilita la integración de Ceph con Datadog para:

- Rastrear el uso del disco en los grupos de almacenamiento
- Recibir checks de servicio en caso de problemas
- Monitorizar las métricas de rendimiento de E/S

## Configuración

### Instalación

El check de Ceph está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores Ceph.

### Configuración

Edita el archivo `ceph.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][3].
Para ver todas las opciones de configuración disponibles, consulta el [ceph.d/conf.yaml de ejemplo][4]:

```yaml
init_config:

instances:
  - ceph_cmd: /path/to/your/ceph # default is /usr/bin/ceph
    use_sudo: true # only if the ceph binary needs sudo on your nodes
```

Si has habilitado `use_sudo`, añade una línea como la siguiente a tu archivo `sudoers`:

```text
dd-agent ALL=(ALL) NOPASSWD:/path/to/your/ceph
```

#### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Luego, edita `ceph.d/conf.yaml` al quitar los comentarios de las líneas `logs` de la parte inferior. Actualiza la `path` de los logs con la ruta correcta a tus archivos de logs de Ceph.

   ```yaml
   logs:
     - type: file
       path: /var/log/ceph/*.log
       source: ceph
       service: "<APPLICATION_NAME>"
   ```

3. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `ceph` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ceph" >}}


**Nota**: Si estás ejecutando Ceph Luminous o posterior, la métrica `ceph.osd.pct_used` no está incluida.

### Eventos

El check de Ceph no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "ceph" >}}


## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

## Referencias adicionales

- [Monitor Ceph: desde el estado del nodo hasta el rendimiento de todo el clúster][10]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ceph/images/ceph_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/ceph/datadog_checks/ceph/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/ceph/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/ceph/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/help/
[10]: https://www.datadoghq.com/blog/monitor-ceph-datadog