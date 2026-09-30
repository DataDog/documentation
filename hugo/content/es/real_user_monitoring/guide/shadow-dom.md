---
description: Guía sobre la compatibilidad de Shadow DOM con Session Replay.
further_reading:
- link: /session_replay/
  tag: Documentación
  text: Más información sobre Session Replay
title: Enriquezca sus Session Replay con componentes de Shadow DOM
---
<div class="alert alert-danger">
Datadog solo admite Shadow DOM abierto.
</div>

## Descripción general {#overview}

Shadow DOM ayuda a los desarrolladores a crear sitios web más modernos al permitirles incorporar componentes aislados y reutilizables en su código. A menudo utilizado para mantener una estructura de código limpia y evitar conflictos de estilo, el uso de Shadow DOM se ha vuelto más prominente en las prácticas modernas de desarrollo web. 

## Configuración {#setup}

A partir de la `v4.31.0` del [RUM Browser SDK][1], Datadog proporciona soporte para Shadow DOM abierto sin requerir configuración adicional. Los componentes que se encuentran dentro de una shadow root son capturados automáticamente por Session Replay. Esta función no es compatible con lo siguiente:
* Shadow DOM cerrado
* Shadow DOM dinámico
* Cambio en el estilo CSS dinámico

**Nota**: La compatibilidad con Shadow DOM abierto ha sido probada en marcos de trabajo populares.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/