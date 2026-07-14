---
app_id: amixr
categories:
- events
- automatización
- colaboración
- rum
- notificaciones
- orquestación
custom_kind: integración
description: Gestión de alertas fácil para desarrolladores con una excelente integración
  con Slack
integration_version: 1.0.0
media: []
supported_os:
- Linux
- Windows
- macOS
title: Amixr
---
## Información general

Utiliza Amixr para gestionar alertas con una integración de Slack:

- Recopilar y analizar alertas y otros eventos de Datadog
- Configurar rotaciones de guardia con el calendario de Google o en Slack
- Configurar cadenas de escalamiento automático
- Recibir alertas con llamadas telefónicas y SMS
- Orquestar la gestión de incidencias con GitOps

![Amixr_Interface](https://raw.githubusercontent.com/DataDog/integrations-extras/master/amixr/images/amixr-interface.png)

## Configuración

### Instalación

No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

En Amixr:

1. Ve a *Settings > Connect New Monitorings > Datadog > How to connect*.
1. Copia la URL del webhook de Datadog.

En Datadog:

1. Ve a la página **Integrations** desde la barra lateral.
1. Busca **webhook** en la barra de búsqueda.
1. Introduce un nombre para la integración, por ejemplo: `amixr-alerts-prod`.
1. Pega la URL del webhook del paso anterior.
1. Haz clic en el botón de guardar.

### Validación

En Datadog:

1. Ve a la página **Events** desde la barra lateral.
1. Escribe `@webhook-<integration name><YOUR TEXT HERE>`, por ejemplo: `@webhook-amixr-alerts-prod test alert`.
1. Haz clic en el botón de publicar.

En Amixr:

1. Navega a **Incidents** desde la barra lateral para verificar si se recibió la alerta.

## Datos recopilados

### Métricas

La integración de Amixr no incluye ninguna métrica.

### Checks de servicio

La integración de Amixr no incluye ningún check de servicio.

### Eventos

La integración de Amixr no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Amixr](https://amixr.io/support/).