---
aliases:
- /es/real_user_monitoring/ai_investigations/single_view_ai_investigation/
description: Pregunte a Bits Chat por qué una visualizar específica es lenta, analice
  los gráficos de RUM y complete tareas de RUM en lenguaje sencillo.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentación
  text: Bits en RUM
- link: /bits_ai/bits_chat/
  tag: Documentación
  text: Bits Chat
- link: /real_user_monitoring/explorer/events/
  tag: Documentación
  text: Visualizar panel lateral de evento
title: Use Bits Chat en RUM
---
## Descripción general {#overview}

[Bits Chat][1] está disponible en cada página de RUM. Bits Chat utiliza la página en la que se encuentra y lo que está visualizando como contexto, y puede consultar sus datos de RUM junto con sus trazas, registros y perfiles. Úselo para:

- [Descubra por qué una visualizar específica es lenta](#find-out-why-a-view-is-slow)
- [Analice un gráfico](#analyze-a-chart)
- [Haga preguntas y complete tareas](#ask-questions-and-complete-tasks)

## Descubra por qué una visualizar es lenta {#find-out-why-a-view-is-slow}

1. Abra una visualizar en el [RUM Explorer][2] o en [Session Replay][3].
2. En la sección de rendimiento del panel lateral de la visualizar, haga clic en **Ask Bits**.

Bits Chat se abre e investiga esa carga de página específica. Reconstruye la línea de tiempo de carga de la visualizar a partir de sus [recursos][4], [tareas largas][5], [errores][6] y [acciones del usuario][7], y examina cuatro fuentes de causas raíz:

| Fuente | Lo que Bits examina |
|---|---|
| Rendimiento de la aplicación | Problemas del lado del cliente, como contención del hilo principal, ejecución de código y retrasos en el renderizado. |
| Terceros | El impacto de los scripts y bibliotecas de terceros cargados por la aplicación. |
| Lado del servidor | Latencia del backend y errores del lado del servidor que afectaron la visualizar, utilizando [trazas de APM correlacionadas][8]. |
| Entorno | El dispositivo y las condiciones de red del usuario. |

Bits devuelve hallazgos clasificados con enlaces a los eventos subyacentes. Luego puede hacer preguntas de seguimiento, como `Is this happening to other users on this page?` o `Which backend endpoint is the slowest here?`

{{< img src="real_user_monitoring/bits_ai/ask-bits-view.png" alt="El panel lateral de visualizar con Bits Chat abierto después de hacer clic en Ask Bits, mostrando los hallazgos clasificados para una carga de página lenta." style="width:100%;" >}}

## Analice un gráfico {#analyze-a-chart}

En la página de resumen de RUM, haga clic en **Analizar con Bits AI** en un gráfico vital o en el gráfico de tasa de error. Bits Chat resume cómo está evolucionando la métrica y qué la está impulsando.

{{< img src="real_user_monitoring/bits_ai/analyze-with-bits-chart.png" alt="Un gráfico de tiempo de carga de RUM abierto en modo de inspección, con Bits Chat resumiendo cómo evolucionó la métrica durante el último mes." style="width:100%;" >}}

## Haga preguntas y complete tareas {#ask-questions-and-complete-tasks}

Puede preguntarle a Bits Chat sobre su frontend en lenguaje sencillo desde cualquier página de RUM, y pedirle que complete tareas de RUM por usted. Por ejemplo:

- `Which pages in this application have the worst INP right now, and which interactions cause it?`
- `Find sessions with 5xx errors on the checkout page in the last hour, grouped by error type.` En el explorador de RUM, Bits aplica la consulta por usted.
- `Which functions are slowing down my LCP?` Pregunte esto en la página de Perfilado de RUM.
- `Create a retention filter that keeps 25% of sessions with errors.`
- `Create an operation that tracks checkout from the cart page to the order confirmation page.`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_chat/
[2]: /es/real_user_monitoring/explorer/
[3]: /es/session_replay/
[4]: /es/real_user_monitoring/application_monitoring/browser/monitoring_resource_performance/
[5]: /es/real_user_monitoring/application_monitoring/browser/data_collected/#long-task-timing-attributes
[6]: /es/real_user_monitoring/error_tracking/
[7]: /es/real_user_monitoring/application_monitoring/browser/tracking_user_actions/
[8]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/