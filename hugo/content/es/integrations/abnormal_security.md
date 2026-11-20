---
app_id: abnormal-security
app_uuid: 15f718fe-3819-4305-9681-ce80974c1b4b
assets:
  dashboards:
    abnormal-security-overview: assets/dashboards/abnormal_security_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21175237
    source_type_name: Abnormal Security
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: abnormal_security
integration_id: abnormal-security
integration_title: Abnormal Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: abnormal_security
public_title: Abnormal Security
short_description: Intégrate con Abnormal Security para obtener amenazas, casos y
  logs de auditoría.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Category::Security
  - Category::Log Collection
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Intégrate con Abnormal Security para obtener amenazas, casos y logs
    de auditoría.
  media:
  - caption: Dashboard de información general de Abnormal
    image_url: images/overview-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Abnormal Security
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

Abnormal Security ofrece una protección completa del correo electrónico mediante una plataforma que comprende el comportamiento humano. Te protege frente a los ataques que se aprovechan del comportamiento humano, como el phishing, la ingeniería social y la apropiación de cuentas.

La integración de Datadog con Abnormal Security recopila logs utilizando [la API de Abnormal Security][1], que genera tres tipos de logs:
- **Logs de amenaza**: los logs de amenaza incluyen cualquier actividad maliciosa o ataque que pueda dañar a una organización, sus datos o su personal.
- **Logs de caso**: los logs de caso incluyen casos de Abnormal que son identificados por Abnormal Security. Estos casos suelen incluir amenazas relacionadas dentro de ellos.
- **Logs de auditoría**: estos logs incluyen las acciones tomadas en el Portal de Abnormal.


## Configuración

### Configuración

1. Inicia sesión en tu [Cuenta de Abnormal Security][2].
2. Haz clic en **Abnormal REST API** (API de REST de Abnormal).
3. Recupera tu token de autenticación en el Portal de Abnormal.

Este token se utiliza para ver tus amenazas detectadas, casos y logs de auditoría de Abnormal.

### Validación


## Datos recopilados

### Métricas

La integración de Abnormal Security no incluye ninguna métrica.

### Recopilación de logs

Las incidencias, los casos y los logs de auditoría de Abnormal Security aparecerán en la fuente `abnormal-security`.

### Eventos

La integración de Abnormal Security no incluye ningún evento.

### Checks de servicio

La integración de Abnormal Security no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://app.swaggerhub.com/apis/abnormal-security/abx/1.4.3#/info
[2]: https://portal.abnormalsecurity.com/home/settings/integrations
[3]: https://docs.datadoghq.com/es/help/