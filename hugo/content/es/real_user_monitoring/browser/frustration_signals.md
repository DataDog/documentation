---
aliases:
- /es/real_user_monitoring/frustration_signals
description: Identifica los puntos de fricción del usuario con las señales de frustración
  de RUM (incluidos los clics repetidos, los clics sin resultados y los clics de error)
  para mejorar la experiencia del usuario y reducir el abandono.
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: Blog
  text: Detectar los puntos débiles del usuario con Datadog Frustration Signals
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: Documentación
  text: Dashboard de señales de frustración
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Información sobre el navegador RUM
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Más información sobre Session Replay
title: Señales de frustración
---

## Información general

Las señales de frustración te permiten identificar los puntos de mayor fricción para el usuario de tu aplicación, al sacar a la luz los momentos en los que los usuarios muestran frustración.

RUM recopila tres tipos de señales de frustración:

Clics de rabia
: Un usuario hace clic en un elemento más de tres veces en una ventana deslizante de un segundo.

Clics muertos
: Un usuario hace clic en un elemento estático que no produce ninguna acción en la página.

Clics de error
: Un usuario hace clic en un elemento justo antes de que se produzca un error en JavaScript.

Al activar las señales de frustración, Datadog recopila de modo predeterminado los tres tipos de señales.

## Requisitos

En primer lugar, necesitas la versión del Browser RUM SDK >= 4.14.0.

Para empezar a recopilar señales de frustración, añade lo siguiente a tu configuración de SDK:

<details open>
 <summary>Última versión</summary>

```JavaScript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

</details>
<details>
 <summary>Antes de <code>v5.0.0</code></summary>

```JavaScript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

Las señales de frustración requieren acciones. Activar `trackFrustrations` activa automáticamente `trackUserInteractions`.
</details>

## Utilización

Las señales de frustración aparecen como puntos de datos claros que representan las fuentes de frustración del usuario en la [página **Aplicaciones RUM**][1]. Para mostrar una lista de recuentos de casos de frustración en el [Explorador RUM][2], haz clic en el botón **Options** (Opciones) y añade una columna para `@session.frustration.count`.

### Lista de aplicaciones

Colócate sobre lista de las sesiones del navegador y haz clic en una sesión para observar el comportamiento de clics frustrados de un usuario. O bien haz clic en **Frustrated Sessions** (Sesiones frustradas) para acceder a las sesiones con una señal de frustración.

### Explora el dashboard de señales de frustración

El dashboard de **Señales de frustración** proporciona información general de los niveles de frustración en toda tu aplicación y te muestra temas como los usuarios más frustrados y las páginas con mayor número de señales de frustración.

Puedes clonar este dashboard y personalizarlo para adaptarlo a tus necesidades. Para más información, consulta el [Dashboard de señales de frustración][3].

### Buscar señales de frustración

Busca todos los datos recopilados por RUM en el [RUM Explorer][4] para sacar a la luz tendencias en las señales de frustración, analizar patrones con mayor contexto o exportarlos a [dashboards][5] y [monitores][6].

Introduce una faceta en la consulta de búsqueda para iniciar tu búsqueda. Los campos de búsqueda disponibles incluyen:

Tipo de frustración
: Busca acciones con señales de frustración. Por ejemplo, si quieres ver cualquier acción que haya tenido un clic de rabia, añade `action.frustration.type:rage_click` a la consulta de búsqueda.

Número de frustraciones
: Busca sesiones y vistas en las que se haya producido alguna señal de frustración. Por ejemplo, si deseas encontrar cualquier sesión de usuario o vista con al menos una señal de frustración, añade `session.frustration.count:>1` o `view.frustration.count:>1` a la consulta de búsqueda.

#### Sesiones

Haz clic en una sesión con un valor en la columna **Número de frustraciones** para examinar la frustración del usuario detectada. Puedes consultar el tipo de señal (`rage click`, `dead click` o `error click`) y la línea de tiempo del evento, que muestra lo ocurrido durante la sesión.

#### Vistas

Haz clic en una vista para identificar si un usuario se frustró en una página específica con la etiqueta (tag) `frustration detected`.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="Acciones de señales de frustración en el menú desplegable de eventos en el gráfico de cascada del rendimiento" style="width:90%;" >}}

La cascada de rendimiento muestra las acciones que contienen señales de frustración.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="Señales de frustración detectadas como una acción" style="width:90%;" >}}

#### Acciones

La pestaña **Acciones** muestra la etiqueta `frustration detected` si la acción seleccionada contiene una señal de frustración.

Si se producen varias señales de frustración en una acción, se muestran en el panel de acciones **Qué ha ocurrido**.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="Se detectaron varios tipos de señales de frustración en la acción en el panel “Qué ha ocurrido" style="width:90%;" >}}

#### Errores

Haz clic en un error en la pestaña **Errores** para abrir un panel lateral con los detalles del error. Puedes ver si se ha producido una señal de frustración.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="Pestaña de Errores en el panel lateral de Acciones" style="width:90%;" >}}

## Ver las señales de frustración en Session Replay

En [Session Replay][7], puedes observar una réplica en vídeo de la actividad real de un usuario. Las repeticiones proporcionan pruebas en vídeo de las acciones que realizan los usuarios cuando muestran señales de frustración.

El recorrido del usuario de una repetición de sesiones detalla los eventos que se producen en orden cronológico. Colócate sobre un evento para desplazarte a ese momento de la repetición: por ejemplo, cuando se produce un clic muerto.

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="Las señales de frustración se producen en la grabación del navegador" style="width:90%;" >}}

 Para obtener más información, consulta la [documentación de Session Replay][8].

## Crear alertas de señales de frustración

Puedes crear monitores y configurar alertas sobre señales de frustración para notificarte a ti o a tu equipo si se produce alguna señal de frustración en una página importante de tu aplicación.

Por ejemplo, para configurar una alerta que te notifique si se produce alguna señal de frustración en una página específica:

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="Crear un RUM Monitor que alerta sobre el número de señales de frustración" style="width:90%;" >}}

Para más información, consulta la [Documentación de Monitor sobre monitorización del usuario real][9].

## Solucionar problemas

### No se crean clics de rabia cuando un usuario pulsa una tecla (como Supr) en el teclado.

Las señales de frustración se generan a partir de los clics del ratón, no al pulsar el teclado.

### El panel lateral no muestra que una sesión tiene un número diferente de señales de frustración que en la línea de tiempo del evento 

Si una sesión está en vivo, está obteniendo información y puede hacer que los banners reflejen un número diferente a los de la línea de tiempo.

<div class="alert alert-danger">
Para hacernos llegar tus comentarios o solicitar una función, ponte en contacto con <a href="/help/">el servicio de asistencia de Datadog</a>.
</div>

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /es/real_user_monitoring/explorer/
[3]: /es/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /es/dashboards/
[6]: /es/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /es/real_user_monitoring/session_replay/browser/
[9]: /es/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com