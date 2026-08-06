---
app_id: trend-micro-vision-one-endpoint-security
app_uuid: 107091d5-4e2d-4592-b197-af848e5abf67
assets:
  dashboards:
    Trend Micro Vision One Endpoint Security - Data Loss Prevention: assets/dashboards/trend_micro_vision_one_endpoint_security_data_loss_prevention.json
    Trend Micro Vision One Endpoint Security - Network Events: assets/dashboards/trend_micro_vision_one_endpoint_security_network_events.json
    Trend Micro Vision One Endpoint Security - Overview: assets/dashboards/trend_micro_vision_one_endpoint_security_overview.json
    Trend Micro Vision One Endpoint Security - System Events: assets/dashboards/trend_micro_vision_one_endpoint_security_system_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 22213943
    source_type_name: Trend Micro Vision One Endpoint Security
  logs:
    source: trend-micro-vision-one-endpoint-security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_vision_one_endpoint_security/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_vision_one_endpoint_security
integration_id: trend-micro-vision-one-endpoint-security
integration_title: Trend Micro Vision One Endpoint Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_vision_one_endpoint_security
public_title: Trend Micro Vision One Endpoint Security
short_description: Obtener información sobre logs de Trend Micro Vision One Endpoint
  Security
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Obtener información sobre logs de Trend Micro Vision One Endpoint Security
  media:
  - caption: Trend Micro Vision One Endpoint Security - Información general
    image_url: images/trend_micro_vision_one_endpoint_security_overview.png
    media_type: imagen
  - caption: Trend Micro Vision One Endpoint Security - Eventos de sistema
    image_url: images/trend_micro_vision_one_endpoint_security_system_events.png
    media_type: imagen
  - caption: Trend Micro Vision One Endpoint Security - Eventos de red
    image_url: images/trend_micro_vision_one_endpoint_security_network_events.png
    media_type: imagen
  - caption: Trend Micro Vision One Endpoint Security - Prevención de la pérdida de
      datos
    image_url: images/trend_micro_vision_one_endpoint_security_data_loss_prevention.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Trend Micro Vision One Endpoint Security
---

<!--  FUENTE https://github.com/DataDog/integrations-core -->
## Información general

[Trend Micro Vision One Endpoint Security][1] es una solución basada en la nube diseñada específicamente para endpoints, servidores y cargas de trabajo en la nube.

Esta integración ingiere los siguientes logs:

- Application Control: Los logs de Application Control proporcionan información sobre las infracciones de control de las aplicaciones de tu red, como las infracciones de la política y los criterios de Security Agent
- Attack Discovery: Los logs de detección de ataques proporcionan información sobre las amenazas detectadas por Attack Discovery
- Behavior Monitoring: Los logs de Behavior Monitoring proporcionan información sobre eventos de monitorización de comportamientos en tu red
- C&C Callback: Los logs de C&C callback proporcionan información sobre eventos de llamadas C&C detectados en tu red
- Content Violation: Los logs de Content Violation proporcionan información sobre los mensajes de correo electrónico con infracciones del contenido, como el producto gestionado que detectó la infracción del contenido, el/los remitente(s) y el/los destinatario(s) del mensaje de correo electrónico, el nombre de la política de infracción del contenido y el número total de infracciones detectadas
- Data Loss Prevention: Los logs de Data Loss Prevention proporcionan información sobre las incidencias detectadas por Data Loss Prevention
- Device Control: Los logs de Device Control proporcionan información sobre eventos de control del acceso a dispositivos en tu red
- Intrusion Prevention: Los logs de Intrusion Prevention proporcionan información para ayudarte a lograr una protección oportuna contra ataques conocidos y de día cero, defenderte contra las vulnerabilidades de las aplicaciones web e identificar el software malicioso que accede a la red
- Network Content Inspection: Los logs de Network Content Inspection proporcionan información sobre infracciones del contenido de red en tu red
- Predictive Machine Learning: Los logs de Predictive Machine Learning proporcionan información sobre amenazas desconocidas avanzadas detectadas por Predictive Machine Learning
- Spyware/Grayware: Los logs de Spyware/Grayware proporcionan información sobre detecciones de spyware/grayware en tu red, como el producto gestionado que detectó el spyware/grayware, el nombre del spyware/grayware y el nombre del endpoint infectado
- Suspicious File Information: Los logs de Suspicious File Information proporcionan información sobre archivos sospechosos detectados en tu red
- Virtual Analyzer Detections: Los logs de Virtual Analyzer Detections proporcionan información sobre amenazas desconocidas avanzadas detectadas por Virtual Analyzer
- Virus/Malware: Los logs de Virus/Malware proporcionan información sobre las detecciones de virus/malware en tu red, como el producto gestionado que detectó los virus/malwares, el nombre del virus/malware y el endpoint infectado
- Web Violation: Los logs de Web Violation proporcionan información sobre infracciones web en tu red

Utiliza dashboards predefinidos para obtener información detallada sobre los eventos del sistema, eventos de red y eventos de prevención de pérdida de datos, sobre la detección y observación de la seguridad y sobre la monitorización del cumplimiento.

## Configuración

### Generar credentiales API en Trend Micro Vision One Endpoint Security

1. Inicia sesión en la consola de Trend Micro Vision One.
2. Ve a **Endpoint Security** (barra lateral) > **Standard Endpoint Protection** > **Administration** > **Settings** > **Automation API Access Settings** (Seguridad del endpoint > Protección de endpoints estándar > Administración > Configuración > Configuración de la automatización de acceso a la API).
3. Haz clic en **Add** (Añadir).<br> Aparece la sección Application Access Settings (Configuración de acceso a la aplicación), que muestra la siguiente información:
   1. **API URL** (URL DE LA API): Host de la API de la consola de Trend Micro Vision One Endpoint Security.
   2. **Application ID** (ID de aplicación): ID de aplicación de la consola de Trend Micro Vision One Endpoint Security.
   3. **API key** (Clave de API): Clave de API de la consola de Trend Micro Vision One Endpoint Security.
4. Marca la casilla **Enable application integration using Apex Central Automation APIs** (Habilitar la integración de aplicaciones mediante las API de Apex Central Automation).
5. Configura los siguientes parámetros.
   1. **Application name** (Nombre de la aplicación): Especifica un nombre fácilmente identificable para la aplicación.
   2. **Communication time-out** (Tiempo de espera de la comunicación): Selecciona 120 segundos para que una solicitud llegue a Apex Central después de que la aplicación genere la solicitud.
6. Haz clic en **Save** (Guardar).

### Obtener la zona horaria de la consola de Trend Micro Vision One

1. Inicia sesión en la consola de Trend Micro Vision One.
2. Ve a **Administration** (barra lateral) > **Console Settings** > **Time Zone** (Administración > Configuración de la consola > Zona horaria).
3. Marca la **zona horaria** a partir de la **hora actual de la consola**.

### Conecta tu cuenta de Trend Micro Vision One Endpoint Security a Datadog.

1. Añade tu host de API, ID de aplicación y clave de API, y selecciona la zona horaria en el menú desplegable.
   | Parámetros | Descripción |
   | -------------- | ----------------------------------------------------------------------- |
   | Host de API | Host de API de la consola de Trend Micro Vision One Endpoint Security.       |
   | ID de aplicación | ID de aplicación de la consola de Trend Micro Vision One Endpoint Security. |
   | Clave de API | Clave API de la consola de Trend Micro Vision One Endpoint Security.     |
   | Zona horaria | Zona horaria de la consola Trend Micro Vision One.                    |

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración Trend Micro Vision One Endpoint Security recopila y reenvía eventos de seguridad, incluyendo eventos de sistema, eventos de red y eventos de prevención de pérdida de datos a Datadog.

### Métricas

La integración Trend Micro Vision One Endpoint Security no incluye métricas.

### Eventos

La integración Trend Micro Vision One Endpoint Security no incluye eventos.

## Ayuda

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://www.trendmicro.com/en_in/business/products/endpoint-security.html
[2]: https://docs.datadoghq.com/es/help/