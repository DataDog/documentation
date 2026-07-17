---
app_id: windows-registry
app_uuid: cc166a5c-6742-4811-b3e1-93dbec0ac5b2
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 8444609
    source_type_name: windows-registry
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
- Windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/windows_registry/README.md
display_on_public_website: true
draft: false
git_integration_title: windows_registry
integration_id: windows-registry
integration_title: Windows Registry
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: windows_registry
public_title: Windows Registry
short_description: Monitoriza tus hosts de Windows en busca de cambios en las claves
  del registro.
supported_os:
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - Category::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tus hosts de Windows en busca de cambios en las claves del
    registro.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Windows Registry
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-core -->


## Información general

Mantente atento a los cambios en las claves de Windows Registry y reenvíalas a Datadog. Habilita esta integración para:

- Comprender el mantenimiento y el estado al nivel del sistema y de la aplicación a través de los valores de Windows Registry.
- Monitorizar cambios inesperados que afecten a los requisitos de seguridad y de cumplimiento.

## Configuración

### Instalación

La integración de Windows Registry está incluida en el paquete del [Datadog Agent][1]. No es necesaria ninguna instalación adicional.

### Configuración

Esta integración recopila y comunica información del Windows Registry utilizando los dos métodos siguientes:

- Como [métricas de Datadog][2]
- Como [logs de Datadog][3]


1. Edita el archivo `windows_registry.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración][4] del Agent para empezar a recopilar la información del registro de Windows. Consulta el [ejemplo de windows_registry.d/conf.yaml][5] para todas las opciones disponibles de configuración.

2. Para enviar los valores y cambios del registro como logs, es necesario habilitar la recopilación de logs en el Datadog Agent. Para habilitar la recopilación de logs, añade lo siguiente a tu archivo `datadog.yaml`: 

    ```yaml
    logs_enabled: true
    ```

3. [Reinicia el Agent][6].


### Validación

Check la página de información en el Datadog Agent Manager o ejecuta el [subcomando][7] `status` del Agent y busca `windows_registry` en la sección **Checks**.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por la integración de Windows Registry se reenvían a Datadog como [métricas personalizadas][11], lo que puede afectar tu facturación.

### Logs

Todos los logs recopilados por la integración de Windows Registry se reenvían a Datadog y están sujetos a la [Facturación de logs][8].

### Checks de servicio

La integración de Windows Registry no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][9] con un [Agent Flare][10].

[10]:https://docs.datadoghq.com/es/agent/troubleshooting/send_a_flare/?tab=agentv6v7
[11]:https://docs.datadoghq.com/es/account_management/billing/custom_metrics/?tab=countrate
[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://docs.datadoghq.com/es/metrics/#overview
[3]: https://docs.datadoghq.com/es/logs/
[4]: https://docs.datadoghq.com/es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/windows_registry.d/conf.yaml.example
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[7]: https://docs.datadoghq.com/es/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[8]: https://docs.datadoghq.com/es/account_management/billing/log_management/
[9]: https://docs.datadoghq.com/es/help/