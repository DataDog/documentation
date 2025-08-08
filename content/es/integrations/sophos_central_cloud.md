---
app_id: sophos-central-cloud
app_uuid: 7293cd88-ceda-4094-94cd-09851f203f0e
assets:
  dashboards:
    Sophos Central Cloud - Alerts: assets/dashboards/sophos_central_cloud_alerts.json
    Sophos Central Cloud - Events: assets/dashboards/sophos_central_cloud_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18598661
    source_type_name: Sophos Central Cloud
  logs:
    source: sophos-central-cloud
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
- https://github.com/DataDog/integrations-core/blob/master/sophos_central_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: sophos_central_cloud
integration_id: sophos-central-cloud
integration_title: Sophos Central Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sophos_central_cloud
public_title: Sophos Central Cloud
short_description: Obtén información sobre logs de auditoría y de eventos de Sophos
  Central Cloud.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtén información sobre logs de auditoría y de eventos de Sophos Central
    Cloud.
  media:
  - caption: Sophos Central Cloud - Alertas
    image_url: images/sophos_central_cloud_alerts.png
    media_type: imagen
  - caption: Sophos Central Cloud - Eventos
    image_url: images/sophos_central_cloud_events.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Sophos Central Cloud
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[Sophos Central][1] es una plataforma de gestión unificada basada en la nube para monitorizar y proteger tu organización de las amenazas. Es utilizada por empresas de todos los tamaños para consolidar las soluciones del paquete Sophos en una única solución de gestión.

Esta integración ingiere los siguientes logs:

- Alerta: representa una notificación o advertencia generada por Sophos Central Cloud en respuesta a una amenaza potencial o un evento de seguridad. Las alertas se activan en función de las políticas de seguridad, las reglas de detección o las actividades anómalas predefinidas, identificadas por Sophos Central Cloud.
- Evento: representa un suceso específico, detectado y registrado por Sophos Central Cloud. Los eventos pueden incluir diferentes actividades relacionadas con la seguridad, como la detección de programas maliciosos, los intentos de acceso no autorizado, las vulnerabilidades del sistema y otros eventos de seguridad.

La integración Sophos Central Cloud recopila sin interrupciones todos los logs enumerados más arriba y los envía a Datadog para su análisis. Aprovechando el pipeline de logs integrado, estos logs se analizan y enriquecen, lo que permite realizar análisis y búsquedas sin esfuerzo. La integración proporciona información sobre alertas y eventos a través de dashboards predefinidos. Además, la integración enriquece los detalles del endpoint correspondiente, junto con los logs de alertas y eventos, a través del marcador **get_endpoint_details**.

## Configuración

### Generar credenciales de API en Sophos Central Cloud

1. Inicia sesión en tu [**cuenta de Sophos Central**][2].
2. Desde Sophos Central Admin, ve a **My Products** > **General Settings** > **API Credentials Management** (Mis productos > Configuración general > Gestión de credenciales de API).
3. Haz clic en **Add Credential** (Añadir credencial).
4. Proporciona un nombre de credencial, selecciona el rol apropiado, añade una descripción opcional y haz clic en el botón **Add** (Añadir). Aparecerá la página de resumen de credenciales de API con el ID de cliente.
5. Haz clic en **Show Client Secret** (Mostrar secreto de cliente) para mostrar el **secreto de cliente**.

### Conectar tu cuenta de Sophos Central Cloud a Datadog

1. Añade tus credenciales de Sophos Central Cloud.

    | Parámetros | Descripción |
    | ------------------------------- | -------------------------------------------------------------------------- |
    | ID de cliente | El ID de cliente de Sophos Central Cloud.                                   |
    | Secreto de cliente | El secreto de cliente de Sophos Central Cloud.                               |
    | Obtener detalles de endpoint | Mantén el valor predeterminado de "true" para recopilar detalles del endpoint de logs de alertas y eventos de Sophos Central Cloud. De lo contrario, configúralo como "false". |

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración recopila y reenvía logs de alertas y eventos de Sophos Central Cloud a Datadog.

### Métricas

La integración Sophos Central Cloud no incluye métricas.

### Eventos

La integración Sophos Central Cloud no incluye eventos.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://www.sophos.com/en-us/products/sophos-central
[2]: https://cloud.sophos.com/manage/login
[3]: https://docs.datadoghq.com/es/help/