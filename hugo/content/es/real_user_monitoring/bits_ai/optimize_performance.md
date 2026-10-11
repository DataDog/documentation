---
aliases:
- /es/real_user_monitoring/ai_investigations/multi_view_ai_investigation/
- /es/real_user_monitoring/ai_investigations/operation_ai_investigation/
description: Inicie Bits Investigations desde las tarjetas de recomendación de RUM
  para mejorar las Core Web Vitals y la salud de sus recorridos críticos de usuario.
further_reading:
- link: /real_user_monitoring/bits_ai/
  tag: Documentación
  text: Bits en RUM
- link: /real_user_monitoring/application_monitoring/browser/optimizing_performance/
  tag: Documentación
  text: Optimización del rendimiento
- link: /real_user_monitoring/operations_monitoring/
  tag: Documentación
  text: Seguimiento de operaciones
title: Optimice el rendimiento con Bits AI
---
## Descripción general {#overview}

RUM analiza sus sesiones y muestra tarjetas de recomendación que señalan las mejoras de mayor impacto en sus páginas y sus recorridos críticos de usuario. Desde cualquier tarjeta, puede iniciar una [Bits Investigation][1] que analiza el problema, incluido el código responsable cuando la integración del código fuente está configurada.

Puede iniciar investigaciones desde dos lugares:

- [La página de optimización](#optimization-page), para mejorar las Core Web Vitals de una página específica
- [Seguimiento de operaciones](#operations-monitoring), para mejorar la tasa de éxito y la latencia de una operación

## Página de optimización {#optimization-page}

La [**página de optimización**][2] muestra cómo funciona cada página de su aplicación en una métrica vital determinada. Para cada página y métrica vital, RUM muestra tarjetas de recomendación clasificadas por impacto. Cada tarjeta describe una causa probable de bajo rendimiento, como un script que bloquea la renderización, una tarea larga en el hilo principal o un recurso lento que retrasa el Largest Contentful Paint.

Puede iniciar una Bits Investigation desde las tarjetas de recomendación para las siguientes métricas vitales:

| Plataforma | Métricas vitales |
|---|---|
| Navegador | Largest Contentful Paint (LCP), Interaction to Next Paint (INP) |
| Móvil | Time to Initial Display (TTID) |

### Iniciar una investigación {#start-an-investigation}

1. Vaya a la [página de **optimización**][2] y seleccione una aplicación.
2. Seleccione una página y una métrica vital compatible.
3. En una tarjeta de recomendación, haga clic en **Investigar**.

La Bits Investigation se abre en una nueva pestaña, con el alcance de la página, la métrica vital y la ventana de tiempo de la tarjeta.

{{< img src="real_user_monitoring/bits_ai/optimization-recommendation-cards.png" alt="La página de optimización para el Largest Contentful Paint de una página, que muestra tarjetas de recomendación clasificadas por impacto, cada una con un botón Investigar." style="width:100%;" >}}

### Qué investiga Bits {#what-bits-investigates}

Bits compara las cargas de página lentas con las rápidas y reconstruye lo que sucedió en el tiempo previo a la métrica vital: qué recursos se cargaron, qué scripts se ejecutaron y qué tareas largas bloquearon el hilo principal. Cuando las solicitudes de la página están [correlacionadas con trazas de APM][3], Bits sigue las solicitudes lentas hasta sus servicios de backend. Cuando la [Integración de código fuente][4] está configurada, Bits vincula el problema con los archivos y funciones responsables.

{{< img src="real_user_monitoring/bits_ai/optimization-bits-investigation.png" alt="Una Bits Investigation iniciada desde una tarjeta de recomendación de optimización, que concluye que el descubrimiento tardío de la imagen principal degradó el Largest Contentful Paint de la página de inicio, con su impacto, una línea de tiempo y los siguientes pasos sugeridos." style="width:100%;" >}}

## Seguimiento de operaciones {#operations-monitoring}

[Seguimiento de operaciones][5] rastrea la tasa de éxito y la latencia de los recorridos del usuario en su aplicación, como registrarse, buscar o finalizar la compra. Cuando abre una operación, RUM muestra tarjetas de recomendación clasificadas por gravedad. Cada tarjeta cubre un tipo de problema.

### Iniciar una investigación {#start-an-investigation-1}

1. Vaya a [Seguimiento de operaciones][5] y seleccione una operación.
2. En una tarjeta de recomendación, haga clic en **Investigar**. También puede hacer clic en **Investigar con Bits** en la tabla de operaciones.

La Bits Investigation se abre en una nueva pestaña, con el alcance de la operación, el tipo de problema y la ventana de tiempo de la tarjeta.

{{< img src="real_user_monitoring/bits_ai/operations-recommendation-cards.png" alt="La página de una operación en Seguimiento de operaciones, que muestra tarjetas de recomendación para errores y tiempos de espera clasificados por gravedad, cada una con un botón Investigar." style="width:100%;" >}}

### Qué investiga Bits {#what-bits-investigates-1}

Bits adapta su análisis al tipo de problema en la tarjeta:

| Tipo de problema | Qué examina Bits |
|---|---|
| Errores | El desglose y la tendencia de fallas de la operación, los principales puntos finales con fallas, los atributos sobrerrepresentados en ejecuciones fallidas y las trazas de backend correlacionadas. |
| Abandono | Cuánto tiempo esperaron los usuarios antes de rendirse, qué recursos seguían cargándose cuando se fueron, a dónde navegaron después y si el abandono se concentra en un navegador, dispositivo, país o versión de aplicación en particular. |
| Bloqueos | Trazas de pila de las sesiones afectadas y si el bloqueo se concentra en una versión de aplicación, dispositivo o sistema operativo específico. |
| Lentitud | Una comparación de ejecuciones lentas y rápidas para determinar si el tiempo se dedica al backend, al frontend o a la carga de recursos, seguido hasta la traza de backend o la tarea larga responsable. |
| Tiempos de espera | Si una brecha de instrumentación causa los tiempos de espera, como una definición de operación que ya no coincide con una ruta renombrada o una ruta reagrupada. Bits verifica esto antes de investigar el rendimiento. |

{{< img src="real_user_monitoring/bits_ai/operations-bits-investigation.png" alt="Una Bits Investigation iniciada desde una tarjeta de recomendación de Seguimiento de operaciones, que concluyó que un límite de tasa de API de pago de terceros agotado interrumpió el proceso de pago, con su impacto, una línea de tiempo y los siguientes pasos sugeridos." style="width:100%;" >}}

## Después de la investigación {#after-the-investigation}

Las Bits Investigations iniciadas desde RUM son estándar. Usted puede:

- Encuéntrelas más tarde en la [lista de Bits Investigations][6] y compártalas con su equipo.
- [Envíe comentarios][7] que Bits tomará en cuenta en futuras investigaciones.
- Envíe la investigación a [Bits Code][8] para generar un cambio de código sugerido o abrir una solicitud de extracción.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/bits_ai/bits_investigation/
[2]: https://app.datadoghq.com/rum/optimization
[3]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[4]: /es/source_code/
[5]: /es/real_user_monitoring/operations_monitoring/
[6]: https://app.datadoghq.com/bits-ai/investigations
[7]: /es/bits_ai/bits_investigation/improve_accuracy/
[8]: /es/bits_ai/bits_code/