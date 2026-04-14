---
app_id: gearman
app_uuid: 7e1b6c42-8f40-4f4c-8d58-a3f7f39cb3e5
assets:
  dashboards:
    gearman: assets/dashboards/gearman_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: gearman.unique_tasks
      metadata_path: metadata.csv
      prefix: gearman.
    process_signatures:
    - gearmand
    - gearman
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 52
    source_type_name: Gearman
  saved_views:
    gearman_processes: assets/saved_views/gearman_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/gearmand/README.md
display_on_public_website: true
draft: false
git_integration_title: gearmand
integration_id: gearman
integration_title: Gearman
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: gearmand
public_title: Gearman
short_description: Rastrea el número de trabajos en cola y en ejecución, en total
  o por tarea.
supported_os:
- Linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Rastrea el número de trabajos en cola y en ejecución, en total o por
    tarea.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Gearman
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Recopila métricas de Gearman para:

- Visualizar el rendimiento de Gearman.
- Saber cuántas tareas están en cola o en ejecución.
- Correlacionar el rendimiento de Gearman con el del resto de tus aplicaciones.

## Configuración

### Instalación

El check de Gearman está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores de Gearman.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `gearmand.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu Gearman. Para conocer todas las opciones de configuración disponibles, consulta el [gearmand.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     - server: localhost
       port: 4730
   ```

2. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

En el caso de los entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `gearmand`                             |
| `<INIT_CONFIG>`      | en blanco o `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server":"%%host%%", "port":"4730"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

#### Recopilación de logs

1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `gearmand.d/conf.yaml` para empezar a recopilar tus logs de Gearman:

    ```yaml
    logs:
      - type: file
        path: /var/log/gearmand.log
        source: gearman
    ```

    Cambia el valor del parámetro `path` en función de tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [gearmand.d/conf.yaml de ejemplo][2].

3. [Reinicia el Agent][3].

Para obtener más información sobre la configuración del Agent para recopilar logs en entornos Kubernetes, consulta [Recopilación de logs de Kubernetes][4].

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca `gearmand` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "gearmand" >}}


### Eventos

El check de Gearman no incluye eventos.

### Checks de servicios
{{< get-service-checks-from-git "gearmand" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://github.com/DataDog/integrations-core/blob/master/gearmand/datadog_checks/gearmand/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/