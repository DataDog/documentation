---
app_id: teradata
app_uuid: 8cac0599-64ca-4a46-8c68-1c5db6cc65ca
assets:
  dashboards:
    Teradata Overview: assets/dashboards/teradata_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: teradata.disk_space.curr_perm.total
      metadata_path: metadata.csv
      prefix: teradata.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10275
    source_type_name: Teradata
  monitors:
    Database ready thread count is too low: assets/monitors/low_ready_threads.json
    Datadase disk space usage is high: assets/monitors/high_disk_space.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/teradata/README.md
display_on_public_website: true
draft: false
git_integration_title: teradata
integration_id: teradata
integration_title: Teradata
integration_version: 4.0.0
is_public: true
manifest_version: 2.0.0
name: teradata
public_title: Teradata
short_description: Monitoriza el estado y el rendimiento de tu base de datos de Teradata
  Vantage.
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Supported OS::Linux
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza el estado y el rendimiento de tu base de datos de Teradata
    Vantage.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Teradata
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

[Teradata][1] es un sistema de gestión de bases de datos relacionales de nivel empresarial dentro de una plataforma de datos multinube. 

Este check monitoriza Teradata a través del Datadog Agent. Activa la integración de Datadog y Teradata para ver el rendimiento de Teradata, el uso del disco y el consumo de recursos.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de Teradata se incluye en el paquete de [Datadog Agent][3].

#### Preparar Teradata

1. Descarga e instala el [controlador de Teradata SQL para Python][4] utilizando el comando pip del Agent integrado para tu [sistema operativo][5]:

**Linux**

```
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install teradatasql
```

**Windows**

```
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<PYTHON_MAJOR_VERSION>\python -m pip install teradatasql
```

2. Crea un usuario `datadog` de sólo lectura con acceso adecuado a tu Teradata Database. Inicia una sesión de `BTEQ` en Teradata Database:

```shell
CREATE USER "datadog" AS PASSWORD="<PASSWORD>";
```

Opcional, pero encarecidamente recomendado: concede un rol nuevo o existente al usuario `datadog` designado para fines de monitorización de sólo lectura. 

```shell
GRANT "<READ_ONLY_ROLE>" TO "datadog"; 
```

El sistema Teradata concede el privilegio `SELECT` a PUBLIC en la mayoría de las [vistas del diccionario de datos][12] de forma predeterminada. Todos los usuarios de Teradata Database tienen privilegios `PUBLIC`.

3. Para recopilar métricas de uso de recursos, activa la [Tabla de uso de recursos SPMA][6]. Esto se hace con la [`ctl` Teradata Utility][7]:

```shell
# Start ctl session
ctl

# View RSS screen
screen rss

# Enable SPMA resource usage table
SPMA=yes

# Save the configuration setting
write
```

Nota: La tabla de recursos SPMA loguea estadísticas cada 10 minutos por defecto. El intervalo de registro puede configurarse en la pantalla `rss` utilizando `ctl`. El registro del uso de recursos puede afectar al rendimiento de la base de datos. Para reducir la frecuencia del registro de uso de recursos, aumenta el intervalo de registro de la configuración de `Node Logging Rate`. Consulta la [documentación][8] de Teradata para obtener más información sobre el registro de uso de recursos.

4. La integración de Teradata recopila métricas de espacio en disco de la vista del sistema DBC.DiskSpaceV de forma predeterminada. Para recopilar métricas de espacio en disco adicionales en las tablas de la base de datos, activa la opción `collect_table_disk_metrics`.

```
collect_table_disk_metrics: true
```

Para filtrar las tablas monitorizadas, configura la opción `tables`:

Especifica las tablas para monitorizar con una lista:

```
tables:
    - <TABLE_1>
    - <TABLE_2>
```

Personaliza tus tablas monitorizadas especificando un mapa con las opciones `include` y `exclude`:

```
tables:
    include:
        - <TABLE_1>
        - <TABLE_2>
    exclude:
        - <TABLE_3>
```

### Configuración

1. Edita el archivo `teradata.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento de teradata. Consulta el [teradata.d/conf.yaml de ejemplo][9] para conocer todas las opciones disponibles de configuración.

2. [Reinicia el Agent][10].

### Validación

[Ejecuta el subcomando de estado del Agent][11] y busca `teradata` en la sección de Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "teradata" >}}


### Eventos

La integración de Teradata no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "teradata" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][14].


[12]:https://docs.teradata.com/r/Teradata-VantageTM-Data-Dictionary/July-2021/Data-Dictionary-Views/Access-to-Data-Dictionary-Views/Default-PUBLIC-Privileges-for-Views
[1]: https://www.teradata.com/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/Teradata/python-driver#Installation
[5]: https://docs.datadoghq.com/es/developers/guide/custom-python-package/?tab=linux#pagetitle
[6]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/ResUsageSpma-Table
[7]: https://docs.teradata.com/r/Teradata-VantageTM-Database-Utilities/July-2021/Control-GDO-Editor-ctl/Ctl-Commands/SCREEN
[8]: https://docs.teradata.com/r/Teradata-VantageTM-Resource-Usage-Macros-and-Tables/July-2021/Planning-Your-Resource-Usage-Data/Resource-Usage-Logging
[9]: https://github.com/DataDog/integrations-core/blob/master/teradata/datadog_checks/teradata/data/conf.yaml.example
[10]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/teradata/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/teradata/assets/service_checks.json
[14]: https://docs.datadoghq.com/es/help/