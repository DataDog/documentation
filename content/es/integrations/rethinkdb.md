---
app_id: rethinkdb
app_uuid: f8348717-0ba8-4d42-b856-983e0cde0314
assets:
  dashboards:
    RethinkDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: rethinkdb.config.servers
      metadata_path: metadata.csv
      prefix: rethinkdb.
    process_signatures:
    - rethinkdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10092
    source_type_name: RethinkDB
  saved_views:
    rethinkdb_processes: assets/saved_views/rethinkdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rethinkdb/README.md
display_on_public_website: true
draft: false
git_integration_title: rethinkdb
integration_id: rethinkdb
integration_title: RethinkDB
integration_version: 5.1.0
is_public: true
manifest_version: 2.0.0
name: rethinkdb
public_title: RethinkDB
short_description: Recopila métricas de estado, de rendimiento y otras de un clúster
  RethinkDB.
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
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopila métricas de estado, de rendimiento y otras de un clúster RethinkDB.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RethinkDB
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

[RethinkDB][1] es una base de datos distribuida NoSQL orientada a documentos, con compatibilidad de primera clase para feeds de cambios
en tiempo real.

Este check monitoriza un clúster RethinkDB a través del Datadog Agent y recopila métricas de rendimiento,
disponibilidad de datos, configuración de clúster y más.

**Nota**: Esta integración es compatible con la **versión 2.3.6 y posteriores** de RethinkDB.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para
entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas
instrucciones.

### Instalación

El check de RethinkDB está incluido en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Si utilizas la 2.4 o posterior de RethinkDB, añade un usuario `datadog-agent` con permisos de sólo lectura en la base de datos `rethinkdb`.
Puedes utilizar los siguientes comandos ReQL. Consulta [Permisos y cuentas de usuario][4] para ver
más detalles:

    ```python
    r.db('rethinkdb').table('users').insert({'id': 'datadog-agent', 'password': '<PASSWORD>'})
    r.db('rethinkdb').grant('datadog-agent', {'read': True})
    ```

    **Nota**: En RethinkDB v2.3.x, no es posible conceder permisos en la base de datos `rethinkdb`.
   En su lugar, omite este paso y utiliza tu [cuenta de administrador][5] a continuación.

2. Edita el archivo `rethinkdb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del
[directorio de configuración del Agent][6]. Consulta el [rethinkdb.d/conf.yaml de ejemplo][7] para ver todas las opciones disponibles.
Opciones de configuración.

    ```yaml
    init_config:

    instances:
      - host: localhost
        port: 28015
        user: "<USER>"
        password: "<PASSWORD>"
    ```

3. [Reinicia el Agent][8].

**Nota**: Esta integración recopila métricas de todos los servidores del clúster, por lo que sólo necesitas un único Agent.

#### Recopilación de logs


1. La recopilación de logs está deshabilitada por defecto en el Datadog Agent; habilítala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Edita este bloque de configuración en tu archivo `rethinkdb.d/conf.yaml` para empezar a recopilar tus logs de RethinkDB:

    ```yaml
    logs:
      - type: file
        path: "<LOG_FILE_PATH>"
        source: rethinkdb
        service: "<SERVICE_NAME>"
    ```


Cambia el valor del parámetro `path` en función de tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [conf.yaml de ejemplo][7].

3. [Reinicia el Agent][8].

Para habilitar logs en entornos Kubernetes, consulta [Recopilación de logs de Kubernetes][9].

### Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `rethinkdb` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "rethinkdb" >}}


### Eventos

RethinkDB no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "rethinkdb" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].


[1]: https://rethinkdb.com
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://rethinkdb.com/docs/permissions-and-accounts/
[5]: https://rethinkdb.com/docs/security/#the-admin-account
[6]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/datadog_checks/rethinkdb/data/conf.yaml.example
[8]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/es/agent/kubernetes/log/
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/rethinkdb/assets/service_checks.json
[13]: https://docs.datadoghq.com/es/help/