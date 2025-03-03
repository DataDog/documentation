---
app_id: arangodb
app_uuid: 2851c4fa-97d2-4949-9673-b21671b57b0a
assets:
  dashboards:
    ArangoDB Overview: assets/dashboards/arangodb_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: arangodb.process.system_time
      metadata_path: metadata.csv
      prefix: arangodb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10266
    source_type_name: ArangoDB
  monitors:
    ArangoDB's server Kernel mode usage is higher: assets/monitors/high_server_kernel_mode.json
    ArangoDB's server User mode usage is higher: assets/monitors/high_server_user_mode.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenamiento en caché
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/arangodb/README.md
display_on_public_website: true
draft: false
git_integration_title: arangodb
integration_id: arangodb
integration_title: ArangoDB
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: arangodb
public_title: ArangoDB
short_description: Realiza un seguimiento de las métricas de tu configuración de ArangoDB.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Almacenamiento en caché
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza un seguimiento de las métricas de tu configuración de ArangoDB.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: ArangoDB
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [ArangoDB][1] a través del Datadog Agent. ArangoDB v3.8 y posteriores son compatibles.

Habilita la integración Datadog-ArangoDB para:

- Identificar las consultas lentas en función de umbrales definidos por el usuario.
- Comprender el impacto de una solicitud larga y solucionar problemas de latencia.
- Monitorizar los límites subyacentes de memoria, disco y caché de RocksDB.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][2] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de ArangoDB está incluido en el paquete del [Datadog Agent][3].

### Configuración

1. Edita el archivo `arangodb.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu ArangoDB. Para conocer todas las opciones de configuración disponibles, consulta el [arangodb.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `arangodb` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "arangodb" >}}


### Recopilación de logs

_Disponible para la versión 6.0 o posteriores del Agent_

Para recopilar logs de tu instancia de ArangoDB, primero asegúrate de que tu ArangoDB está configurado para enviar logs a un archivo.
Por ejemplo, si utilizas el archivo `arangod.conf` para configurar tu instancia de ArangoDB, debes incluir lo siguiente:

```
# ArangoDB configuration file
#
# Documentation:
# https://www.arangodb.com/docs/stable/administration-configuration.html
#

...

[log]
file = /var/log/arangodb3/arangod.log 

...
```

Los logs de ArangoDB contiene [muchas opciones][8] de verbosidad de los logs y archivos de salida. La integración Datadog admite el patrón de conversión por defecto.

1. La recopilación de logs está desactivada por defecto en el Datadog Agent. Actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita el bloque de configuración de logs en tu archivo `arangodb.d/conf.yaml`:

   ```yaml
   logs:
      - type: file
        path: /var/log/arangodb3/arangod.log
        source: arangodb
   ```

### Eventos

La integración ArangoDB no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "arangodb" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].


[1]: https://www.arangodb.com/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/arangodb/datadog_checks/arangodb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/arangodb/metadata.csv
[8]: https://www.arangodb.com/docs/3.8/programs-arangod-log.html
[9]: https://github.com/DataDog/integrations-core/blob/master/arangodb/assets/service_checks.json
[10]: https://docs.datadoghq.com/es/help/