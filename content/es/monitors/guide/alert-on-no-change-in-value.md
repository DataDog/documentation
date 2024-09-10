---
aliases:
- /es/monitors/faq/how-can-i-configure-a-metric-monitor-to-alert-on-no-change-in-value
further_reading:
- link: /monitors/
  tag: Documentación
  text: Aprender a crear un monitor
- link: /monitors/notify/
  tag: Documentación
  text: Configurar las notificaciones de tu monitor
kind: Guía
title: Alerta por ausencia de variación del valor
---

Una forma sencilla de activar una alerta, cuando un valor de métrica no cambia durante un periodo de tiempo determinado, es empezar utilizando la función `diff()` en tu consulta. Esto generará valores delta a partir de puntos de datos consecutivos.

* `diff(avg:system.mem.free{*})`

Luego, necesitas aplicar la función abs() para obtener el valor absoluto de estos valores delta.

* `abs(diff(avg:system.mem.free{*}))`

Estas funciones se pueden aplicar a tu consulta en la interfaz de usuario.

{{< img src="monitors/guide/alert_value_difference.png" alt="Apply diff function through Sigma icon > Rate > Value difference" (Aplicar la función diff a través de Icono sigma > Tasa > Diferencia de valores) >}}

También puedes introducir tu consulta compleja manualmente en la interfaz de usuario 'edit monitor' (editar monitor'), a través de la pestaña Source (Fuente) (o aplicarla mediante programación a través de la [API][1]). Consulta la siguiente imagen.

Para definir las [condiciones de alerta][2] en el propio monitor de métricas, configura lo siguiente:

* Selecciona el umbral de alerta.
* Configura el selector desplegable "Trigger when the metric is..." (Activar cuando la métrica sea...) como **below** (inferior a) o **equal to** (igual a).
* Configurar el campo "Alert Threshold" (Umbral de alerta) en 0 (cero)

Esta configuración activa un evento de alerta cuando no se registra ningún cambio en el valor durante el periodo seleccionado.

Puedes establecer otras [condiciones/opciones de alerta][2] según tus preferencias. La configuración de la interfaz de usuario de tu monitor debería tener la siguiente apariencia:

{{< img src="monitors/faq/zero_alert.png" alt="zero_alert" >}}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/
[2]: /es/monitors/configuration/