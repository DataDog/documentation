---
app_id: google-cloud-armor
app_uuid: a48ba755-80f5-4d7d-bcde-2239af983021
assets:
  dashboards:
    google-cloud-armor: assets/dashboards/google_cloud_armor_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - recuento_gcp.networksecurity.https.request
      metadata_path: metadata.csv
      prefix: gcp.networksecurity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10410
    source_type_name: Google Cloud Armor
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- google cloud
- la red
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: google_cloud_armor
integration_id: google-cloud-armor
integration_title: Google Cloud Armor
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: google_cloud_armor
public_title: Google Cloud Armor
short_description: Consultar métricas, eventos y logs de Google Cloud Armor en Datadog
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Google Cloud
  - Categoría::Red
  - Categoría::Seguridad
  - Tipo de datos enviados::Métricas
  - Tipo de datos enviados::Logs
  - Tipo de datos enviados::Eventos
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Consultar métricas, eventos y logs de Google Cloud Armor en Datadog
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/
  support: README.md#Soporte
  title: Google Cloud Armor
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

[Google Cloud Armor][1] ayuda a proteger los despliegues de Google Cloud frente a diferentes tipos de amenazas, incluidos los ataques de denegación de servicio distribuidos (DDoS) y los ataques a aplicaciones como cross-site scripting (XSS) y SQL injection (SQLi).

Managed Protection de Armor es el servicio gestionado de protección para aplicaciones que ayuda a proteger las aplicaciones y los servicios web frente a ataques DDoS distribuidos y otras amenazas de Internet. Managed Protection cuenta con protecciones siempre activas para los balanceadores de carga y proporciona acceso a las reglas WAF.

Google Cloud Armor se integra automáticamente con Security Command Center y exporta dos hallazgos al dashboard del Security Command Center: pico de tráfico permitido e índice de denegación creciente.

Habilita esta integración junto con la integración del Security Command Center con Google Cloud para visualizar las amenazas DDoS a tu entorno Google Cloud en Datadog. Con esta integración, Datadog recopila importantes eventos de seguridad de tus configuraciones y métricas de seguridad de red de Google Cloud desde Google Cloud Armor.

Esta integración ofrece información de la actividad de los usuarios sobre cambios en recursos de nube y en cada solicitud evaluada por una política de seguridad, desde logs de auditoría a logs de solicitudes.


## Configuración

### Instalación

1. Antes de empezar, asegúrate de que las siguientes API están habilitadas para los proyectos de los que quieres recopilar eventos de Google Cloud Armor:
* [API del gestor de recursos en la nube][2]
* [API de facturación de Google Cloud][3]
* [API de monitorización de Google Cloud][4]
* [API del Security Command Center de Google Cloud][5]

2. Dado que los eventos de Google Cloud Armor se simplifican como hallazgos en el Security Command Center de Google, asegúrate de que Google Cloud Armor está habilitado en el Security Command Center en tu consola de Google Cloud. Para obtener más información, consulta [Configuración del Security Command Center][6].

3. A continuación, habilita la recopilación de hallazgos de seguridad en la [principal integración Google Cloud Platform][7].

### Configuración

Para recopilar métricas de Google Cloud Armor, configura la principal integración Google Cloud.

Para recopilar eventos de Google Cloud Armor, debes añadir el rol de Visor de hallazgos del Security Center a la cuenta de servicio.
Instala la integración del Security Command Center de Google Cloud y habilita la recopilación de hallazgos de seguridad en la principal integración de Google Cloud.

Para configurar el reenvío de logs desde tu entorno Google Cloud a Datadog, consulta la sección [Recopilación de logs][8].

Los logs de auditoría pueden reenviarse utilizando el reenvío estándar de logs. Estos logs de auditoría utilizan los tipos de recursos
`gce_backend_service` y `network_security_policy` de Google Cloud. Para incluir únicamente logs de auditoría,
utiliza filtros como `protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog"` al
crear el sumidero de logs.

Los logs de solicitudes pueden reenviarse utilizando el reenvío estándar de logs. Estos logs se recopilan automáticamente
en logs de balanceo de carga de Google Cloud. Utiliza filtros como
`jsonPayload.enforcedSecurityPolicy.outcome="DENY"` al crear el sumidero de logs para ver las solicitudes
denegadas por una política de seguridad.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "google_cloud_armor" >}}


### Checks de servicio

La integración Google Cloud Armor no incluye checks de servicios.

### Eventos

La integración Google Cloud Armor no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar ataques de red con Google Cloud Armor y Datadog][11]

[1]: https://app.datadoghq.com/integrations/google-cloud-armor
[2]: https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com
[3]: https://console.cloud.google.com/apis/library/cloudbilling.googleapis.com
[4]: https://console.cloud.google.com/apis/library/monitoring.googleapis.com
[5]: https://console.cloud.google.com/apis/library/securitycenter.googleapis.com
[6]: https://console.cloud.google.com/security/command-center/overview
[7]: https://app.datadoghq.com/integrations/google-cloud-platform
[8]: https://docs.datadoghq.com/es/integrations/google_cloud_platform/#log-collection
[9]: https://github.com/DataDog/integrations-internal-core/blob/main/google_cloud_armor/metadata.csv
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/network-attacks-google-cloud-armor/