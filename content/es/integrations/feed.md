---
app_id: feed
categories:
- gestión de eventos
- notificaciones
custom_kind: integración
description: Recopilar eventos de RSS Feed en Datadog
further_reading:
- link: https://docs.datadoghq.com/service_management/events/usage
  tag: documentación
  text: Proporcionar documentación
integration_version: 1.0.0
media:
- caption: Configuración de RSS Feed
  image_url: images/rss_setup.png
  media_type: imagen
title: Feed
---
## Información general

![Un evento RSS en el Datadog Events Explorer](images/rss_event.png)

La integración de RSS Feed te permite recopilar todos tus eventos de RSS Feed en Datadog, como los feeds de estado del proveedor de la nube o el feed de notas de la versión de Datadog. Utiliza tus eventos de RSS Feed para:

- Establecer alertas para actividades nuevas o inesperadas
- Visualizar y analizar eventos en dashboards
- Debatir eventos de feed con tu equipo

## Configuración

Puedes configurar esta integración utilizando URLs tanto `http://` como `https://`. Sin embargo, sólo las URLs de `https://` con TLS validado cumplen los requisitos de conformidad. Aunque las URLs de `http://` funcionarán correctamente, no cumplen las normas de conformidad.

Para los entornos que deben prestar conformidad, asegúrate de utilizar URLs `https://` en lugar de `http://`.

### Instalación

La configuración requiere:

- Una URL completa a un feed RSS o ATOM
- Al menos una etiqueta personalizada por feed

Si lo deseas, introduce un nombre de usuario y una contraseña para acceder al RSS feed.

![Configuración RSS](images/rss_setup_2.png)

### Validación

Consulta el [Events Explorer](https://app.datadoghq.com/event/explorer) para ver la actividad de RSS en Datadog.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Uso de eventos](https://docs.datadoghq.com/service_management/events/usage)