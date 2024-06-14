---
aliases:
- /es/monitors/faq/why-did-i-get-a-recovery-event-from-a-monitor-that-was-in-a-downtime-when-it-alerted/
- /es/monitors/faq/i-have-a-downtime-scheduled-on-my-monitor-why-did-it-still-alert/
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
- link: /monitors/downtimes/
  tag: Documentación
  text: Obtener más información sobre los tiempos de inactividad
kind: Guía
title: Evitar alertas de monitores que estaban en tiempo de inactividad
---

Cuando un grupo está [en tiempo de inactividad][1] y pasa de **`OK`** a uno de los estados **`ALERT`**, **`WARNING`** o **`NO DATA`**, se suprimen las notificaciones por parte de este evento. 
Cuando este tiempo de inactividad finaliza o se cancela, se permite el envío de eventos de renotificación (si están configurados) y de recuperación.

Una opción es resolver el monitor antes de cancelar el tiempo de inactividad para suprimir las notificaciones de recuperación. Sin embargo, cualquier grupo que estuviera en un estado diferente de **`OK`** podría volver a su estado anterior, lo que generaría otra notificación.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/downtimes/