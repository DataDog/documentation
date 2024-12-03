---
app_id: couchbase
app_uuid: e7fac1cd-65ba-4a58-af73-ee5f160cc6f9
assets:
  dashboards:
    couchbase: assets/dashboards/couchbase_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: couchbase.ram.used
      metadata_path: metadata.csv
      prefix: couchbase.
    process_signatures:
    - beam.smp couchbase
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 59
    source_type_name: Couchbase
  logs:
    source: couchdb
  saved_views:
    couchbase_processes: assets/saved_views/couchbase_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md
display_on_public_website: true
draft: false
git_integration_title: couchbase
integration_id: couchbase
integration_title: CouchBase
integration_version: 5.0.0
is_public: true
manifest_version: 2.0.0
name: couchbase
public_title: CouchBase
short_description: Realiza un seguimiento y grafica tus métricas de actividad y rendimiento
  de Couchbase.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Almacenamiento en caché
  - Category::Almacenes de datos
  - Category::Recopilación de logs
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento y grafica tus métricas de actividad y rendimiento
    de Couchbase.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog
  support: README.md#Soporte
  title: CouchBase
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


[Bytes leídos de Couchbase][1]

## Información general

Identifica los buckets ocupados, realiza un seguimiento de los ratios de fallo de caché y mucho más. Este check del Agent recopila métricas como:

- Disco duro y memoria utilizados por los datos
- Conexiones actuales
- Total de objetos
- Operaciones por segundo
- Tamaño de la cola de escritura en disco

Y mucho más.

## Configuración

### Instalación

El check de Couchbase está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores de Couchbase.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `couchbase.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu Couchbase. Para conocer todas las opciones de configuración disponibles, consulta el [couchbase.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

2. [Reinicia el Agent][3].

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `couchbase.d/conf.yaml` para empezar a recopilar tus logs de Couchbase:

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [couchbase.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couchbase`                          |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:8091"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `couchbase` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "couchbase" >}}


### Eventos

El check de Couchbase emite un evento a Datadog cada vez que se reequilibra el clúster.

### Checks de servicio
{{< get-service-checks-from-git "couchbase" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

- [Monitoriza métricas claves de Couchbase][5].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog