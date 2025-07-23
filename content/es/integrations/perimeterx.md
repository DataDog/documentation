---
app_id: perimeterx
app_uuid: 47527216-ad8e-454b-8291-494f05c2d5c9
assets:
  dashboards:
    PerimeterX Overview: assets/dashboards/PerimeterX_Bot_Defender_Dashboard.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: perimeterx.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10105
    source_type_name: PerimeterX
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PerimeterX
  sales_email: support@perimeterx.com
  support_email: support@perimeterx.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/perimeterx/README.md
display_on_public_website: true
draft: false
git_integration_title: perimeterx
integration_id: perimeterx
integration_title: PerimeterX
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: perimeterx
public_title: PerimeterX
short_description: Integrar logs y métricas de PerimeterX con Datadog
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Integrar logs y métricas de PerimeterX con Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: PerimeterX
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Esta integración permite a los clientes de [PerimeterX][1] reenviar a Datadog sus logs y eventos relacionados con PerimeterX.

## Configuración

Toda la configuración es realizada por PerimeterX. Para ver integraciones de terceros, consulta la [documentación de PerimeterX][2].

### Instalación

No es necesaria ninguna instalación en tu host.

### Configuración

1. Genera una nueva clave de API para la integración en tu [portal Datadog][3].
2. Abre un ticket de asistencia con el [servicio de asistencia de PerimeterX][4] y solicita la integración de exportación de logs de Datadog. El servicio de asistencia necesita la siguiente información:
   - Tu clave API de la integración con Datadog
   - Si lo que quieres enviar son métricas o logs
   - El/los ID de la aplicación PerimeterX que debe(n) reenviarse a Datadog

### Validación

Una vez que el servicio de asistencia de PerimeterX haya confirmado que la integración con Datadog está lista, completa los siguientes pasos para confirmar que la integración funciona como se espera:

1. Inicia sesión en tu portal Datadog.
2. Ve a Logs -> Buscar.
3. Realiza una búsqueda con un filtro de consulta "Source:perimeterx".
4. Confirma que estás recibiendo logs de PerimeterX (pueden pasar unos minutos hasta que empiecen a aparecer los logs).

## Datos recopilados

### Métricas

PerimeterX no incluye métricas de [solicitudes][5].

### Checks de servicios

PerimeterX no incluye checks de servicio.

### Eventos

PerimeterX no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://www.perimeterx.com/
[2]: https://edocs.humansecurity.com/docs/configuring-the-export-via-portal
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: mailto:support@perimeterx.com
[5]: https://docs.perimeterx.com/pxconsole/docs/data-schema-metrics
[6]: https://docs.datadoghq.com/es/help/