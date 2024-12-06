---
categories:
- notifications
custom_kind: integración
dependencies: []
description: Rastrea de forma centralizada las tasas de error en todas tus aplicaciones.
doc_link: https://docs.datadoghq.com/integrations/bugsnag/
draft: false
git_integration_title: bugsnag
has_logo: true
integration_id: bugsnag
integration_title: Bugsnag
integration_version: ''
is_public: true
manifest_version: '1.0'
name: bugsnag
public_title: Integración de Datadog y Bugsnag
short_description: Rastrea de forma centralizada las tasas de error en todas tus aplicaciones
  a medida que aumentan y disminuyen.
team: web-integrations
version: '1.0'
---

<!--  EXTRAÍDO DE https://github.com/DataDog/dogweb -->
## Información general

Bugsnag ofrece a los equipos de software una plataforma de detección automática de fallos para sus aplicaciones web y móviles. Bugsnag captura y alerta automáticamente sobre los errores a medida que ocurren. Integra Datadog con Bugsnag para enviar notificaciones de errores a tu flujo de eventos de Datadog.

Con esta integración:

- Obtén un resumen del error en tu flujo de eventos de Datadog.
- Recibe una notificación cuando un proyecto tenga un pico en las tasas de error.
- Filtra notificaciones por severidad y etapa de lanzamiento.

## Configuración

### Instalación

No requiere instalación.

### Configuración

Para integrar Bugsnag con Datadog:

1. Ve a **Settings** en [Bugsnag][1] para el proyecto que deseas configurar para enviar notificaciones a Datadog.
2. Selecciona **Team Notifications** y luego **Datadog**.
3. Personaliza las notificaciones que se ven en Datadog seleccionando los activadores de notificación de error.
   {{< img src="integrations/bugsnag/bugsnag_1.png" alt="bugsnag_notification_setting" popup="true">}}

4. Aplica filtros personalizados a tus activadores de notificación para ver los errores de etapas de lanzamiento y severidades específicas.
   {{< img src="integrations/bugsnag/bugsnag_2.png" alt="bugsnag_filters_setting" popup="true">}}

5. Introduce tu clave de API Datadog.
6. Selecciona **Test Notification** para probar la configuración. Debería aparecer un error de prueba de Bugsnag en Datadog.
7. Guarda la configuración.
8. Añade más flujos del mismo proyecto para ver eventos de errores basados en un conjunto diferente de criterios de notificación.

## Datos recopilados

### Métricas

La integración Bugsnag no incluye métricas.

### Eventos

La integración de Bugsnag envía errores y alertas de Bugsnag configurados a tu flujo de eventos de Datadog.

### Checks de servicios

La integración Bugsnag no incluye checks de servicio.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][2].

[1]: https://bugsnag.com
[2]: https://docs.datadoghq.com/es/help/