---
app_id: cockroachdb
app_uuid: 7368f005-2333-4dc5-a2b5-14419e4995d1
assets:
  dashboards:
    CockroachDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cockroachdb.sys.uptime
      metadata_path: metadata.csv
      prefix: cockroachdb.
    process_signatures:
    - cockroach
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10036
    source_type_name: CockroachDB
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- nube
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cockroachdb/README.md
display_on_public_website: true
draft: false
git_integration_title: cockroachdb
integration_id: cockroachdb
integration_title: CockroachDB
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: cockroachdb
public_title: CockroachDB
short_description: Monitoriza el estado y el rendimiento general de tus clústeres
  de CockroachDB.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Cloud
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Monitoriza el estado y el rendimiento general de tus clústeres de CockroachDB.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog
  support: README.md#Soporte
  title: CockroachDB
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

El check de CockroachDB monitoriza el estado general y el rendimiento de un clúster de [CockroachDB][1].

## Configuración

### Instalación

El check de CockroachDB está incluido en el paquete del [Datadog Agent][2], por lo que no
necesitas instalar nada más en tu servidor.

A partir de la versión 1.9.0, esta integración basada en OpenMetrics cuenta con un modo más reciente (que se activa configurando `openmetrics_endpoint` para que apunte al endpoint de destino) y un modo heredado (que se activa configurando `prometheus_url`). Para obtener todas las funciones más actualizadas, Datadog recomienda activar el modo más reciente. Ten en cuenta que el último modo requiere Python 3. Para obtener más información, consulta [Versiones más recientes y heredadas de integraciones basadas en OpenMetrics][3].

Para los hosts que no pueden usar Python 3, o que no pueden usar el modo heredado, consulta la siguiente [configuración][4].

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `cockroachdb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu CockroachDB. Para un clúster de varios nodos, configura una instancia de check independiente para cada nodo. Para conocer todas las opciones de configuración disponibles, consulta el [cockroachdb.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
       ## @param openmetrics_endpoint - string - required
       ## The URL exposing metrics in the OpenMetrics format.
       #
     - openmetrics_endpoint: http://localhost:8080/_status/vars
   ```

2. [Reinicia el Agent][3].

##### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `cockroachdb.d/conf.yaml` para empezar a recopilar tus logs de CockroachDB:

   ```yaml
   logs:
    - type: file
      path: /var/lib/cockroach/logs/cockroach.log
      source: cockroachdb
      service: cockroachdb
      log_processing_rules:
      - type: multi_line
        name: new_log_start_with_status_and_date
        pattern: [A-Z]\d{6}\s\d+\:\d+\:\d+\.\d+
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [cockroachdb.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[2]: https://github.com/DataDog/integrations-core/blob/master/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                                    |
| -------------------- | -------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `cockroachdb`                                            |
| `<INIT_CONFIG>`      | en blanco o `{}`                                            |
| `<INSTANCE_CONFIG>`  | `{"openmetrics_endpoint":"http://%%host%%:8080/_status/vars"}` |

##### Recopilación de logs

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Docker][2].

Luego, configura las [integraciones de logs][2] como etiquetas de Docker:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source": "cockroachdb", "service": "<SERVICE_NAME>"}]'
```

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando `status` del Agent][5] y busca `cockroachdb` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cockroachdb" >}}


### Checks de servicio

El check de CockroachDB no incluye checks de servicio.

### Eventos

El check de CockroachDB no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar métricas de rendimiento de CockroachDB con Datadog][7]


[1]: https://www.cockroachlabs.com/product/cockroachdb
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/integrations/guide/versions-for-openmetrics-based-integrations
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/cockroachdb/datadog_checks/cockroachdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/
[7]: https://www.datadoghq.com/blog/monitor-cockroachdb-performance-metrics-with-datadog