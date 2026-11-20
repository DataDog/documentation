---
app_id: tenable
app_uuid: 09a46b1b-a940-4aba-8e9f-bde9e5ae2c3f
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10089
    source_type_name: Tenable
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tenable/README.md
display_on_public_website: true
draft: false
git_integration_title: tenable
integration_id: tenable
integration_title: Tenable Nessus
integration_version: 3.0.0
is_public: true
manifest_version: 2.0.0
name: tenable
public_title: Tenable Nessus
short_description: Seguimiento de backends de Nessus y logs de servidor web
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Seguimiento de backends de Nessus y logs de servidor web
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Tenable Nessus
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Información general

Esta integración monitoriza logs de [Tenable Nessus][1] a través del Datadog Agent.

## Configuración

Sigue las instrucciones a continuación para instalar y configurar esta integración para un Agent que se ejecuta en un host.

### Instalación

Para instalar la configuración de la integración Tenable en tu Agent:

**Nota**: Este paso no es necesario para el Agent v7.18.0 o posterior.

1. [Instala][2] la versión 1.0 (`tenable==1.0.0`).

### Configuración

El Agent rastrea los logs `webserver` y `backend` de Tenable Nessus para recopilar datos de los análisis de Nessus.

#### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Descomenta y edita este bloque de configuración en la parte inferior de tu `tenable.d/conf.yaml`:

   Para conocer todas las opciones de configuración disponibles, consulta el [tenable.d/conf.yaml de ejemplo][3].

   ```yaml
      logs:
       - type: file
         path: /opt/nessus/var/nessus/logs/backend.log
         service: nessus_backend
         source: tenable

       - type: file
         path: /opt/nessus/var/nessus/logs/www_server.log
         service: nessus_webserver
         source: tenable
   ```

   Personaliza los valores de los parámetros `path` y `service` si es necesario para tu entorno.

3. [Reinicia el Agent][4].

#### Datos de logs recopilados

1. Los logs del backend de Nessus recopilan datos sobre los nombres de los análisis, la hora de inicio, la hora de finalización, la duración y los objetivos.
2. Los logs del servidor web de Nessus recopilan datos sobre los logs de acceso al servidor web de Nessus, incluidas las IP de los clientes, los Agents de usuarios y los intentos/fracasos/éxitos de inicio de sesión.

### Métricas

Esta integración no incluye métricas.

### Eventos

Esta integración no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://www.tenable.com/products/nessus
[2]: https://docs.datadoghq.com/es/agent/guide/integration-management/#install
[3]: https://github.com/DataDog/integrations-core/blob/master/tenable/datadog_checks/tenable/data/conf.yaml.example
[4]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/es/help/