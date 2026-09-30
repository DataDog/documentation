---
app_id: trend-micro-email-security
app_uuid: 0f19a81b-93c1-477a-ad5d-bbabed937f85
assets:
  dashboards:
    Trend Micro Email Security - Mail Tracking: assets/dashboards/trend_micro_email_security_mail_tracking.json
    Trend Micro Email Security - Policy Events: assets/dashboards/trend_micro_email_security_policy_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 18089572
    source_type_name: Trend Micro Email Security
  logs:
    source: trend-micro-email-security
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
- https://github.com/DataDog/integrations-core/blob/master/trend_micro_email_security/README.md
display_on_public_website: true
draft: false
git_integration_title: trend_micro_email_security
integration_id: trend-micro-email-security
integration_title: Trend Micro Email Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: trend_micro_email_security
public_title: Trend Micro Email Security
short_description: Obtén información sobre logs de Trend Micro Email Security.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Submitted Data Type::Logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtén información sobre logs de Trend Micro Email Security.
  media:
  - caption: Trend Micro Email Security - Seguimiento del correo electrónico
    image_url: images/trend_micro_email_security_mail_tracking.png
    media_type: imagen
  - caption: Trend Micro Email Security - Eventos de políticas
    image_url: images/trend_micro_email_security_policy_events.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Trend Micro Email Security
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->
## Información general

[Trend Micro Email Security][1] es una solución basada en la nube que detiene los ataques de phishing, ransomware y compromiso del correo electrónico empresarial (BEC). Esta solución utiliza una combinación de técnicas contra amenazas intergeneracionales, como Machine Learning, análisis de sandbox, prevención de pérdida de datos (DLP) y otros métodos, para detener todo tipo de amenazas mediante correo electrónico.

Esta integración ingiere los siguientes logs:

- Eventos y detección de políticas - Estos logs proporcionan información sobre eventos y detección de políticas, lo que te permite monitorizar y responder a potenciales amenazas de seguridad de manera efectiva.
- Seguimiento del correo - Estos logs proporcionan información sobre las actividades de correo electrónico, incluido el tráfico aceptado y bloqueado, lo que te permite realizar un seguimiento de los mensajes de correo electrónico que pasaron por el sistema y monitorizar su estado de entrega.

Utiliza dashboards predefinidos para obtener información detallada sobre el análisis del tráfico de correos electrónicos, la detección en tiempo real de las amenazas, la detección y observación de la seguridad y la monitorización del cumplimiento.

## Configuración

### Generar credenciales de API en Trend Micro Email Security

1. Inicia sesión en la consola de Trend Micro Email Security.
2. Ve a **Administration** > **Service Integration** > **API Access** (Administración > Integración de servicios > Acceso a la API).
3. Haz clic en **Add** (Añadir) para generar una clave de API.
4. Cambia a la pestaña **Recuperación de logs** y asegúrate de que el **estado** de recuperación de logs esté activado.
5. Para identificar la **región host** de tu Trend Micro Email Security, consulta este [enlace][2].
6. El **Nombre de usuario** es el **ID de inicio de sesión** de la consola de Trend Micro Email Security.

### Conectar tu cuenta de Trend Micro Email Security a Datadog

1. Añade tu región host, tu nombre de usuario y tu clave de API.
    | Parámetros | Descripción |
    | ----------- | --------------------------------------------------------------------- |
    | Región host  | La región de tu consola de administrador de Trend Micro Email Security.  |
    | Nombre de usuario | El nombre de usuario de la consola de administrador de Trend Micro Email Security. |
    | Clave de API | La clave API de la consola de administrador de Trend Micro Email Security.  |

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.

## Datos recopilados

### Logs

La integración Trend Micro Email Security recopila y reenvía eventos y detección de políticas y el seguimiento del correo electrónico a Datadog.

### Métricas

La integración Trend Micro Email Security no incluye métricas.

### Eventos

La integración Trend Micro Email Security no incluye eventos.

## Ayuda

Si necesitas más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://www.trendmicro.com/en_in/business/products/user-protection/sps/email-and-collaboration/email-security.html
[2]: https://success.trendmicro.com/en-US/solution/KA-0016673#:~:text=Trend%20micro%20email%20security
[3]: https://docs.datadoghq.com/es/help/