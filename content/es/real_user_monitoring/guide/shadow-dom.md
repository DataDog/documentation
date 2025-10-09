---
description: Guía sobre la compatibilidad de Shadow DOM con Session Replay.
further_reading:
- link: /real_user_monitoring/session_replay/browser/
  tag: Documentación
  text: Más información sobre Session Replay
title: Enriquecer tus repeticiones de sesiones con componentes Shadow DOM
---

<div class="alert alert-danger">
Datadog sólo admite Shadow DOM abierto.
</div>

## Información general

Shadow DOM ayuda a los desarrolladores a crear sitios web más modernos, ya que les permite incorporar componentes aislados y reutilizables en su código. Utilizado a menudo para mantener una estructura de código limpia y evitar choques de estilo, el uso de Shadow DOM se ha vuelto más prominente en las prácticas modernas de desarrollo web. 

## Configuración

A partir del [SDK del Navegador RUM][1] `v4.31.0`, Datadog proporciona soporte de Shadow DOM abierto sin requerir ninguna configuración adicional. Los componentes que se encuentran en una raíz Shadow son capturados automáticamente por Session Replay. Esta característica no es compatible con lo siguiente:
* Shadow DOM cerrado
* Shadow DOM dinámico
* Cambio en el estilo CSS dinámico

**Nota**: La compatibilidad con Shadow DOM abierto ha sido probada en marcos populares.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/