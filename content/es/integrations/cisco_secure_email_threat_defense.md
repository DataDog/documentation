---
app_id: cisco-secure-email-threat-defense
app_uuid: 9776e6c8-2031-4dda-98b5-3628b181625b
assets:
  dashboards:
    Cisco Secure Email Threat Defense: assets/dashboards/cisco_secure_email_threat_defense.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21617758
    source_type_name: Cisco Secure Email Threat Defense
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
- https://github.com/DataDog/integrations-core/blob/master/cisco_secure_email_threat_defense/README.md
display_on_public_website: true
draft: false
git_integration_title: cisco_secure_email_threat_defense
integration_id: cisco-secure-email-threat-defense
integration_title: Cisco Secure Email Threat Defense
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cisco_secure_email_threat_defense
public_title: Cisco Secure Email Threat Defense
short_description: Obtén información sobre los logs de mensaje de Cisco Secure Email
  Threat Defense.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Category::Security
  - Category::Cloud
  - Oferta::Integración
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Obtén información sobre los logs de mensaje de Cisco Secure Email Threat
    Defense.
  media:
  - caption: Cisco Secure Email Threat Defense
    image_url: images/cisco_secure_email_threat_defense.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Cisco Secure Email Threat Defense
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->
## Información general

[Cisco Secure Email Threat Defense][1] es una solución integrada de seguridad nativa en la nube para Microsoft 365. Se centra en un despliegue sencillo, una corrección fácil de los ataques y una visibilidad superior de los mensajes entrantes, salientes e internos de usuario a usuario.

Esta integración ingiere los siguientes logs:
- Mensaje: los logs de mensaje proporciona información detallada sobre las comunicaciones por correo electrónico, incluidos remitente, destinatario, marcas temporales, asunto y datos relacionados con amenazas para su análisis y monitorización.

La integración de Cisco Secure Email Threat Defense proporciona dashboards predefinidos para que puedas obtener información sobre los logs de mensaje de Cisco Secure Email Threat Defense, lo que te permite tomar las medidas necesarias. Además, las reglas de detección predefinidas están disponibles para ayudarte a monitorizar y responder a las amenazas potenciales de seguridad de manera efectiva.

**Advertencia**: el uso de esta integración, que puede recopilar datos que incluyan información personal, está sujeto a tus acuerdos con Datadog. Cisco no se hace responsable de la privacidad, seguridad o integridad de la información de los usuarios finales, incluidos los datos personales, transmitida a través de la integración.

## Configuración

### Generar credenciales de API en Cisco Secure Email Threat Defense

1. Inicia sesión en la interfaz de usuario de Cisco Secure Email Threat Defense.
2. Navega a **Administration** (Administración) y selecciona la pestaña **API Clients** (Clientes de API).
3. Haz clic en **Add New Client** (Añadir nuevo cliente).
4. Introduce un **Cliente Name** (Nombre del cliente) y una descripción opcional.
5. Haz clic en **Submit** (Enviar). Esto genera tu **Client ID** (Identificación de cliente) y **Client Passboard** (Contraseña de cliente).
6. Recupera la clave de API de la sección **API Key** (Clave de API).

### Conecta tu cuenta de Cisco Secure Email Threat Defense a Datadog

1. Añade tus credenciales de Cisco Secure Email Threat Defense

    | Parámetros | Descripción |
    | ---------- | ----------- |
    | Nombre de host | Nombre de host se basa en la región donde se encuentra tu servidor de Cisco Secure Email Threat Defense. Para obtener más información, ponte en contacto con el administrador del sistema. |
    | ID de cliente | ID de cliente de la cuenta de Cisco Secure Email Threat Defense. |
    | Contraseña de cliente | Contraseña de cliente de tu cuenta de Cisco Secure Email Threat Defense. |
    | Clave de API | Clave de API de tu cuenta de Cisco Secure Email Threat Defense. |
    | Retraso del veredicto | Los eventos se obtienen con un retraso según el tiempo (en minutos) especificado en el Retraso del veredicto. |


2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.


## Datos recopilados

### Logs

La integración de Cisco Secure Email Threat Defense recopila y reenvía logs de mensaje de Cisco Secure Email Threat Defense a Datadog. Esta integración ingerirá mensajes con valores de veredicto de scam, malicioso, phishing, BEC, spam, graymail y neutral.

**Nota**: Los eventos se obtienen con un retraso según el tiempo especificado en el Retraso de veredicto. Este retraso es necesario para garantizar que los logs incluyan veredictos retrospectivos. Sin embargo, esto no garantiza que todos los veredictos retrospectivos se capturen dentro de este plazo, ya que el tiempo necesario para las actualizaciones puede variar. Para obtener información completa sobre los veredictos, inicia sesión en tu sistema de Cisco Secure Email Threat Defense.

### Métricas

La integración de Cisco Secure Email Threat Defense no incluye ninguna métrica.

### Eventos

La integración de Cisco Secure Email Threat Defense no incluye ningún evento.

## Soporte

Para obtener más ayuda, ponte en contacto con el [soporte de Datadog][2].

[1]: https://www.cisco.com/site/us/en/products/security/secure-email/index.html?dtid=osscdc000283
[2]: https://docs.datadoghq.com/es/help/