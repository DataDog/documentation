---
app_id: flowdock
categories:
- colaboración
- notificaciones
custom_kind: integración
description: FlowDock es un chat de grupo y mensajería instantánea para empresas y
  equipos.
media: []
title: FlowDock
---
{{< img src="integrations/flowdock/flowdock_overview.png" alt="Información general de Flowdock" popup="true">}}

## Información general

Aprovecha la integración con FlowDock para:

- Recibir notificaciones cuando alguien publica en tu flujo (stream).
- Recibir alertas de monitor, cambios de estado de una integración (y mucho más) directamente en tus flujos.

Datadog aprovecha los subprocesos de Flowdock para evitar contaminar tus flujos con notificaciones: para un flujo dado, cada notificación va en su propio subproceso y otras notificaciones relacionadas van en el mismo subproceso (por ejemplo si una alerta de monitor específica se activa y luego se resuelve, las notificaciones correspondientes se agrupan en Flowdock).

## Configuración

### Instalación

Para integrar Flowdock con Datadog, utiliza la pestaña **Configuration** (Configuración) en Flowdock. Esta acción recupera todos los flujos abiertos. Si no quieres publicar en todos ellos, puedes eliminar los que no quieres que aparezcan en la lista autocompletada. A continuación, puedes utilizar los manejadores `@flowdock` en cualquier mensaje de usuario o monitor para enviar mensajes a tus flujos.

Los mensajes y snapshots de usuario van al subproceso principal de tu flujo, mientras que cada alerta se publica en su propio subproceso de Flowdock. Esto evita que el subproceso principal se sature de alertas y mantiene el chat de tu equipo limpio y organizado. Por otra parte, siempre tendrás una vista inmediata de los estados de los monitores que informaron recientemente en la vista Bandeja de entrada.

## Datos recopilados

### Métricas

La integración de Flowdock no incluye métricas.

### Eventos

La integración de Flowdock no incluye eventos.

### Checks de servicio

La integración de Flowdock no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).