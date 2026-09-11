---
app_id: couchdb
app_uuid: 0a7006e2-c76d-4ef0-8af7-347bad2db768
assets:
  dashboards:
    couchdb: assets/dashboards/CouchDB-overview_dashboard.json
    couchdb-v1: assets/dashboards/CouchDBv1-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - couchdb.couchdb.request_time.n
      - couchdb.couchdb.request_time
      metadata_path: metadata.csv
      prefix: couchdb.
    process_signatures:
    - couchjs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20
    source_type_name: CouchDB
  saved_views:
    couchdb_processes: assets/saved_views/couchdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couch/README.md
display_on_public_website: true
draft: false
git_integration_title: couch
integration_id: couchdb
integration_title: CouchDB
integration_version: 8.3.0
is_public: true
manifest_version: 2.0.0
name: couch
public_title: CouchDB
short_description: Realiza un seguimiento y grafica tus métricas de actividad y rendimiento
  de CouchDB.
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
    de CouchDB.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog
  support: README.md#Soporte
  title: CouchDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![dashboard de CouchDB][1]

## Información general

Captura los datos de CouchDB en Datadog para:

- Visualizar métricas claves de CouchDB.
- Correlacionar el rendimiento de CouchDB con el del resto de tus aplicaciones.

Por razones de rendimiento, la versión de CouchDB que estás utilizando se almacena en caché, por lo que no puedes monitorizar instancias de CouchDB con diferentes versiones con la misma instancia del Agent.

## Configuración

### Instalación

El check de CouchDB está incluido en el paquete del [Datadog Agent][2], por lo que no necesitas instalar nada más en tus servidores de CouchDB.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `couch.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1], para empezar a recopilar los datos de rendimiento de tu CouchDB. Para conocer todas las opciones de configuración disponibles, consulta el [couch.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

    **Nota**: Proporciona `db_include` y `db_exclude` para determinar de qué bases de datos el Agent debe y no debe recopilar métricas.

2. [Reinicia el Agent][3].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `couch.d/conf.yaml` para empezar a recopilar tus logs de CouchDB:

   ```yaml
   logs:
     - type: file
       path: /var/log/couchdb/couch.log
       source: couchdb
       service: couch
   ```

   Cambia los valores de los parámetros `path` y `service` y configúralos para tu entorno. Consulta el [couch.d/conf.yaml de ejemplo][2] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][3].

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couch`                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:5984"}` |

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `couch` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "couch" >}}


### Eventos

El check de Couch no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "couch" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].

## Referencias adicionales

- [Monitorización del rendimiento de CouchDB con Datadog][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog