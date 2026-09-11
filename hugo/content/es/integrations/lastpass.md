---
app_id: lastpass
app_uuid: 74cf38da-74b5-487f-9b9b-0d01776d1fea
assets:
  dashboards:
    LastPass - Reporting Events: assets/dashboards/lastpass_reporting_events.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21175115
    source_type_name: LastPass
  logs:
    source: lastpass
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
- https://github.com/DataDog/integrations-core/blob/master/lastpass/README.md
display_on_public_website: true
draft: false
git_integration_title: lastpass
integration_id: lastpass
integration_title: LastPass
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: lastpass
public_title: LastPass
short_description: Obtener información sobre los logs de notificación de LastPass
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  configuration: README.md#Configuración
  description: Obtener información sobre los logs de notificación de LastPass
  media:
  - caption: LastPass - Eventos de notificación 1
    image_url: images/lastpass_reporting_events_1.png
    media_type: imagen
  - caption: LastPass - Eventos de notificación 2
    image_url: images/lastpass_reporting_events_2.png
    media_type: imagen
  - caption: LastPass - Eventos de notificación 3
    image_url: images/lastpass_reporting_events_3.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: LastPass
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

[LastPass][1] es una solución de gestión de contraseñas que almacena y gestiona de forma segura contraseñas y otras informaciones
confidenciales. LastPass proporciona a los usuarios la capacidad de generar contraseñas, sincronizar contraseñas de varios
dispositivos y añadir una capa adicional de seguridad a través de la autenticación multifactor.

Integra LastPass con Datadog para obtener información sobre logs de eventos de notificación a través de la API de empresa de LastPass. Los datos se
normalizan y enriquecen antes de la ingestión. Las visualizaciones en los dashboards preconfigurados proporcionan información inmediata sobre eventos de notificación
de LastPass, mientras que las reglas de detección predefinidas mejoran las capacidades de detección y respuesta.

## Configuración

### Generar credenciales de API en LastPass

1. Inicia sesión en la [consola de administración][2] con tu dirección de correo electrónico y contraseña maestra.
2. Ve a **Avanzado** > **API de empresa**.
3. Busca el número de cuenta. Puedes crear un hash de aprovisionamiento.

### Obtener la zona horaria de LastPass

1. Las opciones del menú desplegable **Zona horaria** se basan en los valores de la zona horaria de LastPass.
2. Debes seleccionar la zona horaria configurada en tu cuenta de LastPass.
3. Para verificar la zona horaria de tu cuenta de LastPass, haz lo siguiente:
    - Inicia sesión en tu cuenta LastPass Business.
    - Accede a la [página de Vault][3].
    - Ve a **Configuración de la cuenta**.
    - Busca la zona horaria seleccionada en la sección **Información de la cuenta**.


### Conecta tu cuenta de LastPass a Datadog

1. Añade tu número de cuenta, el hash de aprovisionamiento y la zona horaria.  
    |Parámetros | Descripción
    |--------------------|--------------------|
    |Número de cuenta| El número de tu cuenta registrada en LastPass.|
    |Hash de aprovisionamiento| El secreto del hash de aprovisionamiento de tu cuenta registrada en LastPass.|
    |Zona horaria| La zona horaria de tu cuenta registrada en LastPass.

2. Haz clic en el botón **Save** (Guardar) para guardar la configuración.


## Datos recopilados

### Logs

La integración de LastPass recopila y envía logs de eventos de notificación a Datadog.

### Métricas

La integración LastPass no incluye métricas.

### Eventos

La integración LastPass no incluye eventos.

## Soporte

Para obtener más ayuda, ponte en contacto con el [servicio de asistencia de Datadog][4].

[1]: https://www.lastpass.com/products/business
[2]: https://admin.lastpass.com/
[3]: https://lastpass.com/vault/
[4]: https://docs.datadoghq.com/es/help/