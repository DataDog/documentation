---
app_id: marklogic
app_uuid: 92342b09-db9a-4542-b442-76bb9b7f716e
assets:
  dashboards:
    MarkLogic - Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marklogic.hosts.total_hosts
      metadata_path: metadata.csv
      prefix: marklogic.
    process_signatures:
    - MarkLogic
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10124
    source_type_name: MarkLogic
  monitors:
    Active requests are taking too long: assets/monitors/marklogic_long_requests.json
    Cache is not large enough: assets/monitors/marklogic_low_cache.json
    Forest processing load is high: assets/monitors/marklogic_high_load.json
  saved_views:
    marklogic_processes: assets/saved_views/marklogic_processes.json
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
- https://github.com/DataDog/integrations-core/blob/master/marklogic/README.md
display_on_public_website: true
draft: false
git_integration_title: marklogic
integration_id: marklogic
integration_title: MarkLogic
integration_version: 6.1.0
is_public: true
manifest_version: 2.0.0
name: marklogic
public_title: MarkLogic
short_description: Rastrea métricas sobre bases de datos, bosques, hosts y servidores
  MarkLogic.
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
  description: Rastrea métricas sobre bases de datos, bosques, hosts y servidores
    MarkLogic.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: MarkLogic
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [MarkLogic][1] a través del Datadog Agent. MarkLogic Server es una base de datos multimodelo diseñada para ser un centro de datos para datos operativos y analíticos.

## Configuración

Sigue las instrucciones de abajo para instalar y configurar este check para un Agent que se ejecuta en un host. En el caso de entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de MarkLogic está incluido en el paquete del [Datadog Agent][3].
No necesitas instalar nada más en tu servidor.

#### Preparación de MarkLogic

Mediante la API o la interfaz de administrador, crea un usuario para el Datadog Agent con los permisos de rol [`manage-user`][4] como mínimo.
Si planeas utilizar la configuración `enable_health_service_checks`, asigna al usuario MarkLogic de Datadog al menos el rol [`manage-admin`][5].

##### API

1. Crea el usuario de Datadog modificando esta solicitud con tus valores específicos:
    ```shell
    curl -X POST --anyauth --user <ADMIN_USER>:<ADMIN_PASSWORD> -i -H "Content-Type: application/json" -d '{"user-name": "<USER>", "password": "<PASSWORD>", "roles": {"role": "manage-user"}}' http://<HOSTNAME>:8002/manage/v2/users
    ```
    Utiliza los `<ADMIN_USER>` y `<ADMIN_PASSWORD>` correctos, y sustituye `<USER>` y `<PASSWORD>` por el nombre de usuario y la contraseña que utiliza el Datadog Agent.
    Para obtener más información, consulta la documentación de MarkLogic: [POST /manage/v2/users][6].

2. Para verificar que el usuario se creó con suficientes permisos:
    ```shell
    curl -X GET --anyauth --user <USER>:<PASSWORD> -i http://<HOSTNAME>:8002/manage/v2
    ```

##### Interfaz de administrador

1. Inicia sesión en QConsole con una cuenta de administrador. Por defecto, QConsole está disponible en `http://<HOSTNAME>:8000/qconsole`.

2. Selecciona `Security` como base de datos y `XQuery` como tipo de consulta.

3. Ejecuta esta consulta, sustituyendo `<USER>` y `<PASSWORD>` por los que utiliza el Datadog Agent:
    ```
    xquery version "1.0-ml";
    import module namespace sec="http://marklogic.com/xdmp/security" at 
        "/MarkLogic/security.xqy";

    sec:create-user(
        "<USER>",
        "Datadog Agent user",
        "<PASSWORD>",
        "manage-user",
        (xdmp:permission("security", "read")),
        ("http://marklogic.com/dev_modules"))

    ```
   Para obtener más información, consulta la documentación de MarkLogic: [sec:create-user][7].

4. Para verificar que el usuario se creó con suficientes permisos, utiliza `<USER>` y `<PASSWORD>` para autenticarte en `http://<HOSTNAME>:8002` (puerto predeterminado).

### Configuración

#### Host

1. Edita el archivo `marklogic.d/conf.yaml` en la carpeta `conf.d/` que se encuentra en la raíz del directorio de configuración de tu Agent para comenzar a recopilar los datos de rendimiento de MarkLogic. Consulta el [archivo de muestra `marklogic.d/conf.yaml`][8] para ver todas las opciones de configuración disponibles. Para las configuraciones relacionadas con el usuario en el archivo de configuración, utiliza el usuario del Datadog Agent que creaste.

2. [Reinicia el Agent][9].

#### Recopilación de logs

_Disponible para las versiones del Agent a partir de la 6.0_

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `marklogic.d/conf.yaml` para empezar a recopilar logs de MarkLogic:

   ```yaml
     logs:
       - type: file
         path: /var/opt/MarkLogic/Logs/ErrorLog.txt
         source: marklogic
       - type: file
         path: /var/opt/MarkLogic/Logs/80002_AccessLog.txt
         source: marklogic
   ```

    Cambia el valor `path` y configúralo para tu entorno. Consulta el [archivo de muestra `marklogic.d/conf.yaml`][8] para ver todas las opciones de configuración disponibles.

3. [Reinicia el Agent][9].

### Validación

Ejecuta el [subcomando de estado del Agent][10] y busca `marklogic` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "marklogic" >}}


### Eventos

MarkLogic no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "marklogic" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][13].


[1]: https://www.marklogic.com
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_64197
[5]: https://docs.marklogic.com/guide/admin/pre_def_roles#id_28243
[6]: https://docs.marklogic.com/REST/POST/manage/v2/users
[7]: https://docs.marklogic.com/sec:create-user
[8]: https://github.com/DataDog/integrations-core/blob/master/marklogic/datadog_checks/marklogic/data/conf.yaml.example
[9]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[11]: https://github.com/DataDog/integrations-core/blob/master/marklogic/metadata.csv
[12]: https://github.com/DataDog/integrations-core/blob/master/marklogic/assets/service_checks.json
[13]: https://docs.datadoghq.com/es/help