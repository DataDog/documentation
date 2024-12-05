---
aliases:
- /es/monitors/faq/how-do-i-monitor-ephemeral-servers-for-reboots
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
kind: Guía
title: Monitorizar reinicios en servidores efímeros
---

Los entornos efímeros activan y cierran hosts constantemente, lo que puede dificultar la distinción entre hosts nuevos y hosts reiniciados.

Para solucionarlo, puedes utilizar un monitor de métricas en la métrica `system.uptime`. La métrica de tiempo de actividad es un temporizador creciente que se reinicia a 0 cuando se inicia un host. Puedes utilizar la función `diff()` con la métrica para distinguir entre un nuevo servidor, que tiene un tiempo de actividad de 0 (nuevo servidor), y un servidor reiniciado, que mostrará un cambio (diff) de un valor de tiempo de actividad en ejecución a 0.

El siguiente ejemplo muestra cómo puedes configurarlo:

{{< img src="monitors/guide/ephemeral_set_up.png" alt="ephemeral_set_up" >}}


{{< partial name="whats-next/whats-next.html" >}}