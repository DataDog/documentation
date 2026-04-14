---
app_id: airbrake
categories:
- metrics
- event management
- issue tracking
custom_kind: integración
description: Visualiza, busca y debate las excepciones de Airbrake en tu flujo (stream)
  de eventos.
integration_version: 1.0.0
media: []
title: Airbrake
---
## Información general

Conecta Airbrake a Datadog para:

- Visualiza excepciones en tiempo real como [eventos](https://docs.datadoghq.com/events/) en Datadog.
- Busca excepciones en tus gráficos.
- Discute las excepciones con tu equipo.

![airbrake_event](images/snapshot_event.png)

## Configuración

### Configuración

Configura la integración de Airbrake utilizando webhooks:

1. Ve a la página de configuración en tu cuenta de Airbrake.

1. Para cada proyecto que quieras activar, haz clic en **Integrations** (Integraciones).

1. Haz clic en **WebHooks** e introduce esta URL en el campo **URL**:

   ```text
   https://app.datadoghq.com/intake/webhook/airbrake?api_key=<YOUR_DATADOG_API_KEY>
   ```

1. Haz clic en **Save** (Guardar).

Ve al [Explorador de eventos](https://app.datadoghq.com/event/explorer) para ver los nuevos errores de Airbrake.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **airbrake.exception_rate** <br>(gauge) | Índice de excepciones.<br>_Se muestra como evento_ |

### Eventos

La integración de Airbrake muestra errores de Airbrake como eventos.

### Checks de servicio

La integración de Airbrake no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).