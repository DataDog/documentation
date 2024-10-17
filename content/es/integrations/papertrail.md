---
app_id: papertrail
app_uuid: 630c6ff6-e853-4ef7-8be4-371a55269208
assets:
  integration:
    auto_install: true
    events:
      creates_events: true
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 147
    source_type_name: PaperTrail
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- event management
- notifications
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: papertrail
integration_id: papertrail
integration_title: Papertrail
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: papertrail
public_title: Papertrail
short_description: Visualiza, realiza búsquedas y discute sobre logs de Papertrail
  en tu flujo (stream) de eventos de Datadog.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Gestión de eventos
  - Category::Notificaciones
  - Offering::Integración
  configuration: README.md#Configuración
  description: Visualiza, realiza búsquedas y discute sobre logs de Papertrail en
    tu flujo de eventos de Datadog.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Papertrail
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/papertrail/papertrailexample.png" alt="Papertrail example" popup="true">}}

## Información general

Utiliza Papertrail y Datadog para:

- Convertir los datos de logs de formato libre en métricas procesables.
- Evitar los conocimientos operativos aislados. Visualiza y correlaciona métricas derivadas de logs junto con métricas a nivel de sistema.

## Configuración

### Instalación

Para capturar métricas de Papertrail:

1. En el [visor de eventos][1] de Papertrail, guarda una búsqueda de los eventos de logs que deben ser graficados.
2. Introduce el nombre de la búsqueda y haz clic en el botón **Guardar y configurar una alerta**.
3. En Gráficas y métricas, elige Datadog.
    {{< img src="integrations/papertrail/papertrailnotify.png" style="max-width:500px;" alt="Notificaciones de Papertrail" popup="true">}}

4. Elige la frecuencia de tus alertas y otros detalles.
5. Proporciona tu clave de API Datadog, introduce el nombre elegido para tu métrica y, opcionalmente, introduce algunas etiquetas (tags) para asociar a la métrica.
    {{< img src="integrations/papertrail/papertraildetails.png" style="max-width:500px;" alt="Notificaciones de Papertrail" popup="true">}}

6. Haz clic en el botón **Crear alerta**.

Papertrail actualiza Datadog según el intervalo elegido.

### Configuración

No es necesario ningún paso de configuración para esta integración.

## Datos recopilados

### Métricas

La integración de Papertrail no incluye métricas.

### Eventos

La integración de Papertrail recopila eventos.

### Checks de servicio

La integración de Papertrail no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][2].

[1]: https://papertrailapp.com/events
[2]: https://docs.datadoghq.com/es/help/