---
app_id: wincrashdetect
app_uuid: 44210c4a-0fe6-4702-88bf-d720e492a806
assets:
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10389
    source_type_name: Detección de fallos de Windows
  monitors:
    Windows Crash Detection: assets/monitors/windows_crash.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- sistema operativo y sistema
- windows
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/wincrashdetect/README.md
display_on_public_website: true
draft: false
git_integration_title: wincrashdetect
integration_id: wincrashdetect
integration_title: Detección de fallos de Windows
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wincrashdetect
public_title: Detección de fallos de Windows
short_description: Monitoriza tus hosts de Windows para los fallos del sistema.
supported_os:
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Windows
  - Category::OS & System
  - Category::Windows
  - Offering::Integration
  configuration: README.md#Setup
  description: Monitoriza tus hosts de Windows para los fallos del sistema.
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: documentación
    url: https://docs.datadoghq.com/integraciones/wincrashdetect/
  - resource_type: blog
    url: https://www.datadoghq.com/blog/troubleshoot-Windows-pantalla-azul-errores/
  support: README.md#Support
  title: Detección de fallos de Windows
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Obtén los eventos de Datadog tras un fallo del sistema Windows para crear monitores en Datadog.

**Nota**: La lista de métricas que se recopilan en esta integración puede cambiar entre las versiones anteriores del Agent. Es posible que estos cambios no se mencionen en el registro de cambios del Agent.

## Configuración

### Instalación

La integración de Detección de fallos de Windows está incluida en el paquete del [Datadog Agent][1]. No se necesita realizar ninguna instalación adicional.

### Configuración

1. Edita el archivo `wincrashdetect.d/conf.yaml` en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][2] para establecer `enabled: true`. Consulta el [ejemplo wincrashdetect.d/conf.yaml.example][3] para ver todas las opciones de configuración disponibles.

2. Activa el módulo de Detección de fallos de Windows en `C:\ProgramData\Datadog\system-probe.yaml` con el indicador activado como 'true':

   ```yaml
    windows_crash_detection:
        enabled: true
    ```
3. [Reinicia el Agent][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `wincrashdetect` en la sección Checks.

## Datos recopilados

### Métricas

No se recopilan métricas en esta integración.

### Eventos

La integración de detección de fallos de Windows envía un evento cuando se detecta un fallo que no se informó previamente en el arranque del Agent.  La integración informará de un evento de fallo.

### Checks de servicio

La integración de la memoria del núcleo de Windows no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/wincrashdetect.d/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/agent/basic_agent_usage/windows/?tab=gui#agent-status-and-information
[6]: https://docs.datadoghq.com/es/help/