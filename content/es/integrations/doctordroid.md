---
app_id: doctordroid
app_uuid: 5e75658c-065e-460f-b9f8-42bf100e361d
assets:
  dashboards:
    doctor_droid_overview: assets/dashboards/doctor_droid_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10443
    source_type_name: doctor_droid
  oauth: assets/oauth_clients.json
author:
  homepage: https://www.drdroid.io
  name: Doctor Droide
  sales_email: sales@drdroid.io
  support_email: support@drdroid.io
categories:
- automatización
- rum
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/doctordroid/README.md
display_on_public_website: true
draft: false
git_integration_title: doctordroid
integration_id: doctordroid
integration_title: Doctor Droide
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: doctordroid
public_title: Doctor Droide
short_description: Analiza tus alertas, identifica tendencias y mejora el ruido y
  la cobertura.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Automation
  - Category::Incidents
  - Offering::Integration
  - Queried Data Type::Metrics
  - Queried Data Type::Logs
  - Queried Data Type::Traces
  - Queried Data Type::Events
  - Queried Data Type::Incidents
  - Submitted Data Type::Events
  configuration: README.md#Setup
  description: Analiza tus alertas, identifica tendencias y mejora el ruido y la cobertura.
  media:
  - caption: Dashboard de información general de Doctor Droid
    image_url: images/doctor_droid_overview.png
    media_type: imagen
  - caption: Tendencias de las ocurrencias de alertas en Datadog
    image_url: images/alert_occurence_count_trends.png
    media_type: imagen
  - caption: Distribución de las 5 ocurrencias de alertas más frecuentes
    image_url: images/top_5_alerts_distribution.png
    media_type: imagen
  - caption: Los 10 tipos de alertas más frecuentes y servicios afectados
    image_url: images/top_10_lifetime_alert_counts.png
    media_type: imagen
  overview: README.md#Overview
  support: README.md#Support
  title: Doctor Droid
  uninstallation: README.md#Uninstallation
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general
Doctor Droid es una herramienta de mejora e investigación de alertas que permitirá a tu equipo agilizar los flujos de trabajo de depuración y diagnóstico:
* Cuando se activa una alerta, obtiene automáticamente métricas de Datadog, Cloud Provider y otras herramientas de observabilidad y _presenta los datos relevantes a tu equipo_.
* Publica información sobre la investigación en un dashboard de Datadog y en los monitores correspondientes en cuestión de segundos, lo que facilita el acceso y la revisión dentro del flujo de trabajo existente.
* Tiene la capacidad de personalizar en función de los requisitos de tu equipo y la arquitectura de la aplicación.

Nuestra integración de Datadog busca métricas, trazas (traces) o eventos en según las funciones que estés utilizando en Datadog y del tipo de investigación que necesites.

## Configuración

### Instalación
1. Navega hasta [cuadro de integración de Doctor Droid][1] en Datadog.
1. En la pestaña *Configure* (Configurar), haz clic en **Connect Accounts** (Conectar cuentas). Esto te lleva a la página Integraciones dentro de [Doctor Droid][2].
1. En Doctor Droid, navega hasta la [página de integraciones][3] y añade la integración de Datadog.
1. Sigue las instrucciones del flujo OAuth de Datadog para conceder a Doctor Droid acceso para consultar APM y métricas de infraestructura desde tu cuenta de Datadog.

### Configuración
Después de añadir la integración, explora tu historial de alertas en Doctor Droid para descubrir tendencias. Puedes crear informes y guías para mejorar los datos de las alertas generadas.

## Desinstalación

Para eliminar la integración de Datadog de Doctor Droid:
1. Navega hasta la página [Integraciones de Doctor Droid][3].
1. Haz clic en **Delete** (Borrar).
1. Navega hasta la página [Integraciones de Datadog][4]. Busca y selecciona el cuadro de integración de Doctor Droide. 
1. En el cuadro de integración de Doctor Droid, haz clic en el botón **Uninstall Integration** (Desinstalar integración) para desinstalarla de Datadog. 

Después de desinstalar esta integración, se revocan todas las autorizaciones anteriores.

Además, asegúrate de que todas las claves de API asociadas a esta integración se han desactivado buscando el nombre de la integración en la [página de gestión de claves de API][5].

## Agent

¿Necesitas ayuda? Ponte en contacto con el [soporte de Doctor Droid][6].

[1]: https://app.datadoghq.com/integrations?integrationId=doctordroid
[2]: https://alertops-app.drdroid.io/
[3]: https://alertops-app.drdroid.io/integrations
[4]: https://app.datadoghq.com/integrations
[5]: https://app.datadoghq.com/organization-settings/api-keys?filter=Doctor%20Droid
[6]: mailto:support@drdroid.io