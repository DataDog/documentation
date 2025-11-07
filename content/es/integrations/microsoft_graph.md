---
app_id: microsoft-graph
app_uuid: 6341e6d9-953d-4fad-8ff1-7a80d6ba6821
assets:
  dashboards:
    microsoft-graph: assets/dashboards/microsoft_graph_security_alerts.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 30155012
    source_type_name: Microsoft Graph
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_graph
integration_id: microsoft-graph
integration_title: Microsoft Graph
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_graph
public_title: Microsoft Graph
short_description: Realiza una integración con Microsoft Graph para recopilar logs
  de seguridad de Defender, Purview, Entra ID y Sentinel.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  configuration: README.md#Configuración
  description: Realiza una integración con Microsoft Graph para recopilar logs de
    seguridad de Defender, Purview, Entra ID y Sentinel.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Microsoft Graph
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Utiliza la API de seguridad de [Microsoft Graph][1] para conectar los productos de seguridad, los servicios y los socios de Microsoft a fin de agilizar las operaciones de seguridad y mejorar las capacidades de protección, detección y respuesta ante amenazas.

La API de seguridad de Microsoft Graph es un servicio intermediario (o broker) que proporciona una única interfaz programática para conectar múltiples proveedores de seguridad de Microsoft Graph (también llamados proveedores de seguridad o proveedores). Las solicitudes a la API de seguridad de Microsoft Graph se federan a todos los proveedores de seguridad aplicables. Los resultados se agregan y se devuelven a la aplicación solicitante en un esquema común.

Esta integración recopila eventos de seguridad de los siguientes productos:

* Microsoft Entra ID Protection
* Microsoft 365 Defender
* Microsoft Defender for Cloud Apps
* Microsoft Defender for Endpoint
* Microsoft Defender for Identity
* Microsoft Defender for Office 365
* Microsoft Purview Data Loss Prevention
* Microsoft Sentinel

## Configuración

Para integrar Microsoft Graph con Datadog, Datadog se conecta a Microsoft utilizando OAuth. El usuario autenticado debe tener contextos de permiso de seguidor para integrarse:

- `offline_access`
- `APIConnectors.Read.All`
- `SecurityAlert.Read.All`

### Instalación

1. Ve a la página [Integraciones][2] y busca la integración "Microsoft Graph".
2. Haz clic en el cuadro.
3. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add Microsoft Account** (Añadir cuenta de Microsoft).
4. Luego de leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la página de inicio de sesión de Microsoft.
6. En la pantalla de solicitud de acceso, haz clic en **Authorize** (Autorizar). Esto permite a Datadog visualizar eventos de seguridad.
7. Se te redirigirá al cuadro de Microsoft Graph de Datadog con una nueva cuenta. Datadog recomienda cambiar el "Nombre de la cuenta" a uno más fácil de recordar.

### Configuración


### Validación


## Datos recopilados

### Logs

Microsoft Graph recopila todos los eventos de seguridad disponibles de Microsoft Graph.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://learn.microsoft.com/en-us/graph/security-concept-overview
[2]: https://app.datadoghq.com/integrations?integrationId=microsoft-graph
[3]: https://docs.datadoghq.com/es/help/