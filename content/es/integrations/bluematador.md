---
aliases:
- /es/integrations/bluematador
app_id: blue-matador
categories:
- events
- automatización
custom_kind: integración
description: Blue Matador configura automáticamente y mantiene dinámicamente cientos
  de alertas
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Blue Matador
---
## Información general

La integración de Datadog de Blue Matador te permite enviar eventos de Blue Matador al flujo de eventos en Datadog.

![eventstream_from_blue_matador](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/eventstream.png)

Puedes utilizarlo para mejorar tus dashboards existentes o para correlacionarlo con métricas que estás recopilando en Datadog.

![dashboard](https://raw.githubusercontent.com/DataDog/integrations-extras/master/bluematador/images/dashboard.png)

Para obtener una lista completa de los eventos y las métricas que Blue Matador monitoriza y que puedes importar a Datadog, consulta su [página de monitores](https://www.bluematador.com/monitored-events).

## Configuración

Para obtener eventos de Blue Matador en Datadog, utiliza una [clave de API Datadog](https://app.datadoghq.com/organization-settings/api-keys) para crear un nuevo método de notificación en Blue Matador.

**Nota**: Los eventos ya existentes no se importan a Datadog, pero los nuevos eventos aparecen a medida que ocurren.

## Datos recopilados

### Métricas

La integración Blue Matador no incluye ninguna métrica.

### Eventos

Todos los eventos se envían al flujo (stream) de eventos de Datadog.

### Checks de servicio

La integración Blue Matador no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [responsable](https://github.com/DataDog/integrations-extras/blob/master/bluematador/manifest.json) de esta integración.