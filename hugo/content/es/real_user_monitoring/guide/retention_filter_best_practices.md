---
description: Aprende las mejores prácticas para secuenciar tus filtros de retención
  para almacenar los datos de RUM que necesitas.
further_reading:
- link: /real_user_monitoring/rum_without_limits/retention_filters
  tag: Documentación
  text: Filtros de retención
- link: /real_user_monitoring/rum_without_limits/
  tag: Documentación
  text: RUM without Limits
- link: /real_user_monitoring/rum_without_limits/metrics
  tag: Documentación
  text: Analice el rendimiento con métricas
- link: https://www.datadoghq.com/blog/rum-apm-retention-filters
  tag: Blog
  text: Unifique y correlacione datos de frontend y backend con filtros de retención
- link: https://learn.datadoghq.com/courses/rum-retention-filters
  tag: Centro de aprendizaje
  text: 'Laboratorio interactivo: Filtros de retención de RUM'
title: Prácticas recomendadas para filtros de retención
---
{{< learning-center-callout header="Pruebe los filtros de retención de RUM en el Centro de aprendizaje" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/rum-retention-filters" hide_image="false" >}}
  Aprenda a utilizar los filtros de retención de RUM para controlar qué datos de sesión se almacenan y optimizar su presupuesto de observabilidad.
{{< /learning-center-callout >}}

## Descripción general {#overview}

RUM without Limits le permite capturar todos los datos de la sesión mientras solo conserva las sesiones que son valiosas para su organización. Esta herramienta mejora la gestión de sus datos mediante la separación de la ingesta de datos de sesión de la indexación.

## Características clave {#key-features}

- **Filtros de retención dinámicos**: Ajuste qué datos conservar sin cambiar ningún código
- **Métricas integrales**: Las métricas reflejan el 100% de las sesiones, lo que garantiza una visibilidad total
- **Retención de sesiones dirigida**: Priorice los datos de sesión cruciales para la optimización de costos

Esta guía proporciona estrategias para gestionar sus volúmenes de sesiones de RUM de manera efectiva dentro de su presupuesto de observabilidad.

## Secuenciación de filtros de retención {#understanding-retention-filter-sequencing}

Los filtros de retención de RUM le permiten elegir qué sesiones de usuario conservar. Así es como funcionan:

Cada sesión contiene múltiples eventos (como visualizaciones que representan la navegación, acciones del usuario, errores, recursos que representan solicitudes de red) y cada uno de ellos está lleno de atributos (como duración, contexto, etc.). El sistema evalúa cada evento individualmente con respecto a sus filtros de retención:

1. **Sesión conservada**: Si al menos un evento en una sesión coincide con un filtro de retención Y se selecciona para su retención, entonces se conserva toda la sesión.
2. **Sesión descartada**: Si ningún evento coincide con ningún filtro de retención para cuando termina la sesión, se elimina toda la sesión.

{{< img src="real_user_monitoring/rum_without_limits/rum-without-limits-how-retention-filters-work-3.png" alt="Diagrama de flujo que muestra cómo funcionan los filtros de retención: 1. Los eventos de una sesión se verifican con los filtros, 2. Si algún evento coincide y es seleccionado, se conserva toda la sesión, 3. Si ningún evento coincide con ningún filtro, la sesión se descarta" style="width:80%" >}}

### Cómo funcionan los diferentes tipos de eventos {#how-different-event-types-work}

Algunos eventos (como errores y acciones) no pueden cambiarse después de que ocurren. Datadog llama a estos **eventos inmutables**. Otros (como sesiones y visualizaciones) pueden cambiar a medida que el usuario continúa usando su aplicación. Datadog llama a estos **eventos mutables**.

- **Los eventos inmutables** (Acción, Error, Recurso, Tarea larga y Vital [eventos][1]) solo se verifican **una vez** frente a sus filtros y no se pueden cambiar una vez creados:

  1. El evento se detiene en el primer filtro que coincide con sus etiquetas y atributos.
  2. Se genera un número aleatorio y se compara con la tasa de muestreo del filtro para decidir si el evento debe conservarse o descartarse.
  3. Si el evento se conserva, toda la sesión (incluidos todos los eventos anteriores) se preserva, y los eventos futuros de la misma sesión omiten automáticamente los filtros de retención.
  4. Si el evento se descarta, no es evaluado por otros filtros, pero otros eventos de la misma sesión continúan procesándose de forma independiente.

- **Los eventos mutables** (Sesión, Visualización) se vuelven a verificar cada vez que se actualizan:
  - Los eventos de Visualización y Sesión son diferentes de los eventos inmutables porque pueden cambiar con el tiempo. Estos eventos reciben actualizaciones cada vez que ocurren nuevos eventos dentro de ellos.
  - A diferencia de los [eventos inmutables](#immutable-events) que se evalúan solo una vez, los eventos de Visualización y Sesión se vuelven a evaluar frente a los filtros de retención cada vez que reciben una actualización. Esto continúa hasta que coinciden con un filtro por primera vez.

## Mejores prácticas {#best-practices}

### Orden de los filtros de retención {#ordering-retention-filters}

El orden de sus [filtros de retención][2] es importante. Datadog recomienda colocar los filtros más específicos con las tasas de muestreo más altas en la parte superior de la lista, y sus filtros más generales con las tasas de muestreo más bajas en la parte inferior.

Por ejemplo, imagine que tiene un evento de bloqueo (un evento de Error con el atributo `@error.is_crash:true`). Este evento podría coincidir con más de un filtro, pero solo se evalúa frente al primer filtro coincidente en su lista.

- En el ejemplo a continuación, el filtro de retención \"Crashes\" se coloca por encima del filtro más general \"All errors\". Esto significa que todas las sesiones de bloqueo se conservan, porque coinciden primero con el filtro \"Crashes\".

  | ✅ Recomendado |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-good-3.png" alt="Ejemplo de buen orden de filtro: 1. Sesiones con reproducciones (100% de retención), 2. Sesiones con fallos (100% de retención), 3. Todas las sesiones con errores (50% de retención). Esto asegura que los fallos siempre se capturen." style="width:100%" >}} |

- En el siguiente ejemplo, el filtro más general \"Todos los errores\" aparece antes que el filtro \"Fallos\". Debido a esto, las sesiones con fallos solo se conservan si son seleccionadas por el filtro \"Todos los errores\" (por ejemplo, si tiene una tasa de muestreo del 50%). Si no son seleccionadas, no son evaluadas por el filtro \"Fallos\" y esas sesiones se pierden.

  | ❌ No recomendado |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-bad-3.png" alt="Ejemplo de orden de filtro deficiente: 1. Sesiones con reproducciones (100% de retención), 2. Todas las sesiones con errores (50% de retención), 3. Sesiones con fallos (100% de retención). Esto conlleva el riesgo de perder sesiones con fallos si no coinciden primero con el filtro de errores general." style="width:100%" >}} |

### Filtros de respaldo para capturar las sesiones restantes {#fallback-filters-for-capturing-remaining-sessions}

Un filtro de respaldo al final de su lista captura un pequeño porcentaje de sesiones que no coincidieron con otros filtros. Siempre debe incluir `@session.is_active:false` en su consulta de filtro de respaldo.

- **Con `@session.is_active:false`**: El filtro de respaldo solo evalúa las sesiones completadas, permitiendo que sus otros filtros capturen las sesiones primero

  | ✅ Recomendado |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-good-3.png" alt="Ejemplo de buen filtro de respaldo: 1. Sesiones con reproducciones (100% de retención), 2. Sesiones que duran más de 5 segundos (100% de retención), 3. Sesiones que no están activas (10% de retención). Esto garantiza que otros filtros tengan la primera oportunidad de capturar sesiones." style="width:100%" >}} |
  
- **Sin `@session.is_active:false`**: El filtro de respaldo captura todas las sesiones inmediatamente, lo que podría anular sus filtros más específicos

  | ❌ No recomendado |
  |---------|
  | {{< img src="real_user_monitoring/rum_without_limits/retention-filters-catchall-bad-3.png" alt="Ejemplo de mal filtro de respaldo: 1. Sesiones con reproducciones (100% de retención), 2. Sesiones que duran más de 5 segundos (100% de retención), 3. Todas las sesiones (10% de retención). Esto conlleva el riesgo de anular filtros más específicos al capturar todas las sesiones inmediatamente." style="width:100%" >}} |

### Exclusión de sesiones {#excluding-sessions}

Para evitar que un solo filtro coincida con un subconjunto de eventos, agregue la exclusión dentro de la consulta de ese filtro. Consulte [Exclusión de sesiones mediante filtros de retención][3].

Para excluir eventos en todos sus filtros de retención personalizados a la vez, sin repetir la misma exclusión en cada consulta, utilice [filtros de exclusión][4] en su lugar.

## Filtros de retención sugeridos y casos de uso {#suggested-retention-filters-and-use-cases}
A continuación, describimos el conjunto de filtros predeterminados, los filtros sugeridos y sus casos de uso típicos.

| Tipo de filtro | Ejemplo de consulta | Cuándo usarlo | Tasa de retención |
|-------------|---------------|-------------|----------------|
| Sesiones con reproducciones | `@session.has_replay:true` | Conserve las sesiones con una reproducción para asegurarse de que el sistema no descarte ninguna sesión con reproducciones de sesión disponibles. | 100% |
| Sesiones con errores | `@type:error` | Un filtro predeterminado que se puede aplicar para retener todas las sesiones que contienen al menos 1 error. | 100% |
| Sesiones con fallas | `@type:error @error.is_crash:true` | Un filtro que se puede aplicar para retener todas las sesiones que terminaron con una falla. | 100% |
| Sesiones | `@type:session` | Un filtro predeterminado, colocado al final de la lista, para aplicar a todas las sesiones, el cual le permite retener o descartar un porcentaje de ellas. | Variable |
| Versiones de la aplicación | `@type:session version:v1.1.0-beta` | Filtrar por versión de la aplicación (beta, alfa o versión específica) asegura que todas las sesiones de una compilación en particular se guarden para un análisis detallado y la resolución de problemas. | 100% |
| Entornos | `@type:session environment:stage` | Al recopilar sesiones de varios tipos de compilación o entornos, asegúrese de capturar al menos el 100% de las sesiones de los entornos de ensayo, mientras recopila un porcentaje menor de los entornos de desarrollo/prueba. | 100% |
| Indicadores de funciones | `@type:session feature_flags.checkout_type:treatment_v1` | Si ya está utilizando indicadores de funciones, puede elegir mantener el 100% de las sesiones con tratamientos de indicadores de funciones específicos. | 100% |
| Atributos personalizados | `@type:session @context.cartValue:>=500` | Cree filtros usando casi cualquier consulta, incluidos los atributos personalizados de sesión, para especificar criterios de retención. Por ejemplo, en la aplicación de demostración de Datadog, Shopist, el valor del carrito es un atributo de sesión personalizado. Esto permite la retención de sesiones con valores de carrito altos, lo que facilita la resolución eficiente de problemas que afectan los ingresos. | Variable |
| Sesión con atributos de usuario | `@type:session user.tier:paid` | Use la información del usuario de una sesión para crear un filtro. Por ejemplo, puede retener sesiones para todos sus usuarios de nivel de pago. | 100% |
| Sesiones con un usuario específico | `@type:session user.id:XXXXX` | Este filtro puede dirigirse a sesiones de usuarios específicos, como una cuenta de prueba de producción o un ejecutivo que prueba la aplicación regularmente. | 100% |
| Sesiones con una acción específica | `@type:action @action.name:XXXXX` | Puede retener todas las sesiones con una acción específica que el SDK rastrea automáticamente de forma predeterminada o una acción personalizada que usted instrumentó en su código. | 100% |
| Sesiones con una duración específica | `@session.view.count :> 3 OR @session.time_spent :> 15000000000` | Si nota muchas sesiones cortas, como un usuario que ve una página durante 10 segundos sin realizar más acciones ni errores, normalmente no son útiles. Puede usar un filtro de retención basado en la duración para reducir estas sesiones. **Nota**: Ingrese el valor de duración como un número en nanosegundos; no incluya ninguna unidad (por ejemplo, use `15000000000` para 15 segundos). | Variable |
| Sesiones con un error de red 4XX y 5XX | `@type:resource @resource.status_code:>=400` | Las aplicaciones frontend a menudo encuentran problemas con servicios posteriores que devuelven códigos de estado 4XX o 5XX. Usando este filtro, puede capturar todas las sesiones con llamadas a recursos que resultan en códigos de error. | 100% |


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy/
[2]: /es/real_user_monitoring/rum_without_limits/retention_filters/#how-it-works
[3]: /es/real_user_monitoring/rum_without_limits/retention_filters#excluding-events-with-a-filter-query
[4]: /es/real_user_monitoring/rum_without_limits/retention_filters#exclusion-filters