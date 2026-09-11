---
app_id: typingdna-activelock
app_uuid: e4eb4314-400c-4c30-8842-60d74e7f455a
assets:
  dashboards:
    TypingDNA ActiveLock: assets/dashboards/TypingDNAActiveLock.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10339
    source_type_name: TypingDNA ActiveLock
author:
  homepage: https://www.typingdna.com/contact
  name: TypingDNA
  sales_email: datadog.support@typingdna.com
  support_email: datadog.support@typingdna.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/typingdna_activelock/README.md
display_on_public_website: true
draft: false
git_integration_title: typingdna_activelock
integration_id: typingdna-activelock
integration_title: TypingDNA ActiveLock
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: typingdna_activelock
public_title: TypingDNA ActiveLock
short_description: Ve y analiza tus logs de TypingDNA ActiveLock.
supported_os:
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Submitted Data Type::Logs
  - Offering::Integration
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Ve y analiza tus logs de TypingDNA ActiveLock.
  media:
  - caption: Ve y analiza tus logs de TypingDNA ActiveLock en un dashboard personalizado
      de Datadog.
    image_url: images/TypingDNAActiveLock.jpg
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: TypingDNA ActiveLock
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-extras -->



## Información general

[TypingDNA ActiveLock][1] es una aplicación de autenticación continua de endpoints que ayuda a evitar el acceso no autorizado a los ordenadores de tu empresa mediante la detección de patrones de escritura y el bloqueo de los ordenadores para proteger los datos confidenciales.

Esta integración te permite enviar logs desde tus aplicaciones de ActiveLock a Datadog y proporciona un dashboard predefinido para monitorizar los ordenadores de tu organización.

Para visualizar tus datos en Datadog, es necesario configurar e instalar una aplicación de ActiveLock personalizada. Se trata de la misma instalación para todos los ordenadores de la empresa.


## Configuración

### Configuración

Para generar una clave de API de Datadog:

1. Navega a [Organization settings > API keys][2] (Configuración de la organización > Claves de API) en tu cuenta de Datadog.
2. Haz clic en **+ New Key** (+ Nueva clave) para generar una clave de API.

Para obtener tu aplicación de instalación personalizada:

1. Rellena [este formulario de instalación personalizada][3] enviando tu clave de API recién generada, el [sitio de Datadog][4] y los datos de tu empresa.
2. Recibirás un correo electrónico con una aplicación de ActiveLock personalizada para instalar en los ordenadores de tu empresa, así como las instrucciones de instalación. 
    a. Esta instalación tiene un límite inicial de 10 plazas, y viene con un periodo de prueba por defecto de 30 días. Para eliminar las limitaciones de la versión de prueba necesitas una licencia comercial completa. Si aún no tienes una licencia comercial, ponte en contacto con [TypingDNA][5] para obtener la licencia o con el distribuidor/socio a través del cual nos conociste.
3. Tras la instalación, tus logs de ActiveLock deberían empezar a aparecer en el [Log Explorer][6].

Ten en cuenta que si has llegado a través de un distribuidor/socio debes seguir sus instrucciones para obtener tu aplicación de instalación personalizada (y licencia comercial).


### Validación

Para ver tus logs de ActiveLock en Datadog, navega hasta el [Log Explorer][6] e introduce `source:typingdna` o `service:activelock` en la consulta de búsqueda.

Para acceder al dashboard, navega hasta la [Lista de dashboard][7] y busca el dashboard **TypingDNA ActiveLock**.


## Datos recopilados

### Recopilación de logs

Los logs de TypingDNA ActiveLock se recopilan y envían a Datadog directamente desde cada aplicación.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [Datadog][8] o el [soporte de TypingDNA][5].

[1]: https://www.typingdna.com/activelock
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://www.typingdna.com/clients/altrial
[4]: https://docs.datadoghq.com/es/getting_started/site/#access-the-datadog-site
[5]: https://www.typingdna.com/contact
[6]: https://app.datadoghq.com/logs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://docs.datadoghq.com/es/help/