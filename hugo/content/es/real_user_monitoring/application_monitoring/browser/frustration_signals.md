---
aliases:
- /es/real_user_monitoring/frustration_signals
- /es/real_user_monitoring/browser/frustration_signals/
description: Identifique los puntos de fricción del usuario con las señales de frustración
  de RUM (incluyendo clics de rabia, clics muertos y clics de error) para mejorar
  la experiencia del usuario y reducir el abandono.
further_reading:
- link: https://www.datadoghq.com/blog/analyze-user-experience-frustration-signals-with-rum/
  tag: Blog
  text: Detecte los puntos de dolor del usuario con las señales de frustración de
    Datadog
- link: /real_user_monitoring/platform/dashboards/usage#frustration-signals
  tag: Documentación
  text: Dashboard de señales de frustración
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Obtenga información sobre el Explorador de RUM
- link: /session_replay/
  tag: Documentación
  text: Más información sobre Session Replay
title: Señales de frustración
---
## Descripción general {#overview}

Las señales de frustración le ayudan a identificar los puntos de mayor fricción del usuario en su aplicación al mostrar los momentos en los que los usuarios exhiben frustración.

RUM recopila tres tipos de señales de frustración:

Clics de rabia
: Un usuario hace clic en un elemento más de tres veces en una ventana deslizante de un segundo.

Clics muertos
: Un usuario hace clic en un elemento estático que no produce ninguna acción en la página.

Clics de error
: Un usuario hace clic en un elemento justo antes de que ocurra un error de JavaScript.

Al habilitar las señales de frustración, Datadog recopila los tres tipos de señales de forma predeterminada.

## Requisitos {#requirements}

Primero, necesita la versión del SDK de RUM para navegador >= 4.14.0.

Para comenzar a recopilar señales de frustración, agregue lo siguiente a su configuración del SDK:

{{% collapse-content title="Versión más reciente" level="h3" expanded=true %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
})
```

{{% /collapse-content %}}

{{% collapse-content title="Antes de la v5.0.0" level="h3" expanded=false %}}

```javascript
window.DD_RUM.init({
  trackUserInteractions: true,
  trackFrustrations: true
})
```

Las señales de frustración requieren acciones. Habilitar `trackFrustrations` habilita automáticamente `trackUserInteractions`.

{{% /collapse-content %}}

## Uso {#usage}

Las señales de frustración aparecen como puntos de datos de alto nivel que representan fuentes de frustración del usuario en la [{{< ui >}}RUM Applications{{< /ui >}} página][1]. Para mostrar una lista de conteos de frustración en el [Explorador de RUM][2], haga clic en el botón {{< ui >}}Options{{< /ui >}} y agregue una columna para `@session.frustration.count`.

### Lista de aplicaciones {#application-list}

Pase el cursor sobre la lista de sesiones del navegador y haga clic en una sesión para observar el comportamiento de clic frustrado de un usuario. O bien, haga clic en {{< ui >}}Frustrated Sessions{{< /ui >}} para acceder a las sesiones con una señal de frustración.

### Explore el Dashboard de señales de frustración {#explore-the-frustration-signals-dashboard}

El {{< ui >}}Frustration Signals{{< /ui >}} Dashboard proporciona una descripción general de los niveles de frustración en toda su aplicación, mostrándole temas como los usuarios más frustrados y las páginas con la mayor cantidad de señales de frustración.

Puede clonar este Dashboard y personalizarlo para que se ajuste a sus necesidades. Para obtener más información, consulte [Dashboard de señales de frustración][3].

### Buscar señales de frustración {#search-for-frustration-signals}

Busque en todos los datos recopilados por RUM en el [RUM Explorer][4] para identificar tendencias en las señales de frustración, analizar patrones con mayor contexto o exportarlos a [Dashboards][5] y [Monitors][6].

Ingrese una faceta en la consulta de búsqueda para comenzar su búsqueda. Los campos de búsqueda disponibles incluyen:

Tipo de frustración
: Encuentre acciones con señales de frustración. Por ejemplo, si desea ver cualquier acción que haya tenido un clic de rabia, agregue `action.frustration.type:rage_click` a la consulta de búsqueda.

Conteo de frustración
: Encuentre sesiones y visualizaciones donde ocurrió alguna señal de frustración. Por ejemplo, si desea encontrar sesiones de usuario o visualizaciones con al menos una señal de frustración, agregue `session.frustration.count:>1` o `view.frustration.count:>1` a la consulta de búsqueda.

#### Sesiones {#sessions}

Haga clic en una sesión con un valor en la columna {{< ui >}}Frustration Count{{< /ui >}} para examinar la frustración del usuario detectada. Puede ver el tipo de señal (`rage click`, `dead click` o `error click`) y la línea de tiempo del evento, que muestra lo que ocurrió durante la sesión.

#### Visualizaciones {#views}

Haga clic en una visualización para identificar si un usuario estuvo frustrado en una página específica con la etiqueta `frustration detected`.

{{< img src="real_user_monitoring/frustration_signals/frustration_signals_in_performance_tab.png" alt="Acciones de señales de frustración en el menú desplegable de eventos en el gráfico de cascada de rendimiento" style="width:90%;" >}}

La cascada de rendimiento muestra las acciones que contienen señales de frustración.

{{< img src="real_user_monitoring/frustration_signals/actions_frustration_signal.png" alt="Señales de frustración detectadas como una acción" style="width:90%;" >}}

#### Acciones {#actions}

La {{< ui >}}Actions{{< /ui >}} pestaña muestra la etiqueta `frustration detected` si la acción seleccionada contiene una señal de frustración.

Si ocurren múltiples señales de frustración en una acción, se muestran bajo {{< ui >}}What Happened{{< /ui >}} en el panel de acciones.

{{< img src="real_user_monitoring/frustration_signals/actions_panel_multiple_frustration_signals.png" alt="Múltiples tipos de señales de frustración detectados en la acción bajo Qué sucedió" style="width:90%;" >}}

#### Errores {#errors}

Haga clic en un error en la {{< ui >}}Errors{{< /ui >}} pestaña para abrir un panel lateral con los detalles del error. Puede ver si ocurrió una señal de frustración.

{{< img src="real_user_monitoring/frustration_signals/errors_tab.png" alt="Pestaña Errores en el panel lateral de Acciones" style="width:90%;" >}}

## Observe las señales de frustración en Session Replay {#watch-frustration-signals-in-session-replay}

En [Session Replay][7], puede observar una réplica similar a un video de la actividad real del usuario. Las reproducciones proporcionan evidencia en video de las acciones que realizan los usuarios cuando muestran signos de frustración.

El recorrido del usuario en una reproducción de sesión detalla los eventos que ocurren en orden cronológico. Pase el cursor sobre un evento para moverse a ese punto en el tiempo en la reproducción: por ejemplo, cuando ocurrió un clic muerto.

{{< img src="real_user_monitoring/frustration_signals/session_replay_frustration_signals.png" alt="Las señales de frustración aparecen en una grabación del navegador" style="width:90%;" >}}

 Para obtener más información, consulte la [documentación de Session Replay][8].

## Crear alertas para señales de frustración {#create-alerts-for-frustration-signals}

Puede crear Monitors y configurar alertas sobre señales de frustración para notificarle a usted o a su equipo si ocurre alguna señal de frustración en una página importante de su aplicación.

Por ejemplo, para configurar una alerta que le notifique si ocurre alguna señal de frustración en una página específica:

{{< img src="real_user_monitoring/frustration_signals/rum_monitor_frustration_count.png" alt="Crear un RUM Monitor que alerte sobre el conteo de señales de frustración" style="width:90%;" >}}

Para obtener más información, consulte la [Real User Monitoring Monitor documentation][9].

## Solución de problemas {#troubleshooting}

### Los clics de rabia no se crean cuando un usuario presiona una tecla (como Suprimir) en el teclado {#rage-clicks-are-not-being-created-when-a-user-presses-a-key-like-delete-on-the-keyboard}

Las señales de frustración se generan a partir de clics del mouse, no de pulsaciones de teclado.

### El panel lateral no muestra que una sesión tiene una cantidad diferente de señales de frustración que en la línea de tiempo de eventos {#the-side-panel-does-not-show-that-a-session-has-a-different-number-of-frustration-signals-than-in-the-event-timeline}

Si una sesión está activa, está obteniendo información y puede hacer que los banners reflejen un número diferente al de la línea de tiempo.

<div class="alert alert-danger">
Para enviar comentarios o solicitar una función, comuníquese con <a href="/help/">Soporte de Datadog</a>.
</div>

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/list
[2]: /es/real_user_monitoring/explorer/
[3]: /es/real_user_monitoring/platform/dashboards/usage#frustration-signals
[4]: https://app.datadoghq.com/rum/explorer
[5]: /es/dashboards/
[6]: /es/monitors/
[7]: https://app.datadoghq.com/rum/replay/sessions/
[8]: /es/session_replay/
[9]: /es/monitors/types/real_user_monitoring/
[10]: mailto:success@datadoghq.com