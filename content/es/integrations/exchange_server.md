---
app_id: exchange-server
app_uuid: e334d30a-a7df-4c06-9d1f-d8b6663df38a
assets:
  dashboards:
    Exchange Server Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: exchange.processor.cpu_user
      metadata_path: metadata.csv
      prefix: intercambio.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10023
    source_type_name: Exchange Server
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- Windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/exchange_server/README.md
display_on_public_website: true
draft: false
git_integration_title: exchange_server
integration_id: exchange-server
integration_title: Microsoft Exchange Server
integration_version: 4.2.0
is_public: true
manifest_version: 2.0.0
name: exchange_server
public_title: Microsoft Exchange Server
short_description: Recopilar y representar gráficamente las métricas de Microsoft
  Exchange Server
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Windows
  - Supported OS::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilar y representar gráficamente las métricas de Microsoft Exchange
    Server
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Exchange Server
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtener métricas de Microsoft Exchange Server

- Visualizar y monitorizar el rendimiento del Exchange Server

## Configuración

### Instalación

El check de Exchange está incluido en el paquete del [Datadog Agent][1], por lo que no necesitas instalar nada más en tus servidores.

### Configuración

1. Edita el archivo `exchange_server.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][2], para empezar a recopilar tus datos de rendimiento del Exchange Server.

2. [Reinicia el Agent][3].

**Nota**: Las versiones 1.11.0 o posteriores de este check utilizan una nueva implementación para la recopilación de métricas, que requiere Python 3. Para los hosts que no pueden utilizar Python 3, o si quieres utilizar una versión legacy de este check, consulta la siguiente [configuración][4].

### Recopilación de logs

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent; debes habilitarla en el archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `exchange_server.d/conf.yaml` para empezar a recopilar tus logs de Exchange Server:

   ```yaml
   logs:
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\CommonDiagnosticsLog\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\ThrottlingService\\*"
       source: exchange-server
     - type: file
       path: "C:\\Program Files\\Microsoft\\Exchange Server\\V15\\TransportRoles\\Logs\\Hub\\Connectivity\\*"
       source: exchange-server
   ```
    **Nota**: Los únicos Logs compatibles son CommonDiagnosticsLog, ThrottlingService y Connectivity, debido a que Exchange Server emite muchos tipos diferentes de logs. Para solicitar otros formatos de logs, ponte en contacto con el [servicio de asistencia de Datadog][5].

   Cambia el valor del parámetro `path` y configúralo para tu entorno.
   Consulta el [exchange_server.d/conf.yaml de ejemplo][6] para conocer todas las opciones de configuración disponibles.

3. [Reinicia el Agent][3].


### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `exchange_server` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "exchange_server" >}}


### Eventos

El check de Exchange Server no incluye eventos.

### Checks de servicios

El check de Exchange Server no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://github.com/DataDog/integrations-core/blob/7.33.x/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/help/
[6]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/datadog_checks/exchange_server/data/conf.yaml.example
[7]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/exchange_server/metadata.csv