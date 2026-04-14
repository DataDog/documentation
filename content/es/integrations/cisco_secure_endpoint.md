---
app_id: cisco-secure-endpoint
app_uuid: 9636c2eb-34f6-4aa4-a236-c39e47b21c79
assets:
  dashboards:
    Cisco Secure Endpoint - Audit: assets/dashboards/cisco_secure_endpoint_audit.json
    Cisco Secure Endpoint - Event: assets/dashboards/cisco_secure_endpoint_event.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18601889
    source_type_name: Cisco Secure Endpoint
  logs:
    source: cisco-secure-endpoint
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
- nube
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_endpoint/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_endpoint
integration_id: cisco-secure-endpoint
integration_title: Cisco Secure Endpoint
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_endpoint
public_title: Cisco Secure Endpoint
short_description: Obtén información sobre logs de auditoría y de eventos de Cisco
  Secure Endpoint.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Categoría::Seguridad
  - Category::Cloud
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtén información sobre logs de auditoría y de eventos de Cisco Secure
    Endpoint.
  media:
  - caption: Cisco Secure Endpoint - Auditoría
    image_url: images/cisco_secure_endpoint_audit.png
    media_type: imagen
  - caption: Cisco Secure Endpoint - Evento
    image_url: images/cisco_secure_endpoint_event.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cisco Secure Endpoint
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Cisco Secure Endpoint][1] es una solución de Agent único que proporciona protección, detección, respuesta y cobertura de acceso de usuario integrales para defenderte de las amenazas a tus endpoints. Cisco Secure Endpoint puede detectar y neutralizar la actividad maliciosa en tiempo real, garantizando una sólida protección de tus recursos digitales.

Esta integración ingiere los siguientes logs:
- Auditoría: Los logs de auditoría muestran las actividades realizadas por un usuario en la consola de Cisco Secure Endpoint.
- Evento: Los logs de eventos son esenciales en el seguimiento de eventos de seguridad para permitir la rápida detección, respuesta y análisis de posibles amenazas.

La integración Cisco Secure Endpoint proporciona dashboards predefinidos para que puedas obtener información sobre los logs de auditoría y de eventos de Cisco Secure Endpoint, lo que te permite tomar las medidas necesarias. Además, las reglas de detección predefinidas están disponibles para ayudarte a monitorizar y responder a las amenazas potenciales de seguridad de manera efectiva.

**Exención de responsabilidad**: El uso de esta integración, que puede recopilar datos que incluyan información personal, está sujeto a tus acuerdos con Datadog. Cisco no se hace responsable de la privacidad, seguridad o integridad de la información de los usuarios finales, incluyendo los datos personales, transmitidos a través de la integración.

## Configuración

### Generar credenciales de API en Cisco Secure Endpoint

1. Inicia sesión en la consola Cisco Secure Endpoint y ve al panel de menús de la izquierda.
2. Selecciona `Administration` y, a continuación, `Organization Settings`.
3. Haz clic en `Configure API Credentials` (Configurar credenciales de API) en la sección `Features` para generar nuevas credenciales de API.
4. Haz clic en el botón `New API Credentials` (Nuevas credenciales de API) situado a la derecha, debajo de la sección `Legacy API Credentials (version 0 and 1)`.
5. Añade la siguiente información en el modal emergente:
    - Nombre de la aplicación: cualquier nombre preferido.
    - Contexto: selecciona `Read-only`.
    - Haz clic en `Create` (Crear).
    - Una vez que hagas clic en **Create** (Crear), la página redirigida mostrará el ID de cliente (como un ID de cliente de API de terceros) y los valores de la clave de API.

### Conectar tu cuenta de Cisco Secure Endpoint a Datadog

1. Añade tus credenciales de Cisco Secure Endpoint.

    | Parámetros | Descripción |
    | ---------- | ------------ |
    Nombre de dominio de la API | El nombre de dominio de la API para Cisco Secure Endpoint Cloud es "api.\<region\>.amp.cisco.com". Ajusta la parte "región" en función de la región del servidor de Cisco Secure Endpoint. Si Cisco Secure Endpoint está alojado en VPC (Virtual Private Cloud), proporciona directamente el nombre de dominio de la API. |
    | ID de cliente | ID de cliente de Cisco Secure Endpoint. |
    | Clave de API | Clave de API de Cisco Secure Endpoint. |
    | Obtener detalles del endpoint | Mantén el valor predeterminado de "true" para recopilar metadatos de endpoint de logs de eventos Cisco Secure Endpoint. De lo contrario, configúralo como "false". |

2. Haz clic en el botón Save (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración Cisco Secure Endpoint recopila y reenvía logs de auditoría y de eventos de Cisco Secure Endpoint a Datadog.

### Métricas

La integración Cisco Secure Endpoint no incluye métricas.

### Eventos

La integración Cisco Secure Endpoint no incluye eventos.

## Soporte

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://www.cisco.com/site/in/en/products/security/endpoint-security/secure-endpoint/index.html
[2]: https://docs.datadoghq.com/es/help/