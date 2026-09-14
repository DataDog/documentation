---
description: Haga un seguimiento y analice flujos de usuario críticos para solucionar
  problemas de experiencia del usuario y técnicos.
title: Journey Monitoring
---
{{< callout url="https://www.datadoghq.com/product-preview/journey-monitoring/" btn_hidden="false" header="¡Únase a la vista previa!">}}
Journey Monitoring está en vista previa.
{{< /callout >}}

## Descripción general {#overview}

**Journey Monitoring** le permite realizar un seguimiento del estado de flujos de usuario críticos, como el inicio de sesión, el pago o la transmisión de medios, todo desde un solo lugar. Para cualquier flujo determinado, usted puede responder:
- ¿Los usuarios experimentan fricción?
- ¿Qué tan rápido y confiable es el rendimiento?
- ¿Los problemas provienen del frontend, la red o el backend?

Un *recorrido* es un flujo de usuario definido por un evento de inicio y un evento de finalización. Por ejemplo, un recorrido de pago captura la experiencia desde que un usuario llega a la página de pago hasta que completa el proceso de pago. Journey Monitoring extrae datos de [Real User Monitoring][1], [Synthetic Monitoring & Testing][2], [Product Analytics][3] y [Session Replay][4] para mostrar el tráfico, las tasas de conversión, el tiempo de actividad y los errores de cada journey en un solo informe.

Esto brinda a los equipos de ingeniería, producto y operaciones de desarrollo una vista compartida del estado del recorrido sin tener que cambiar entre herramientas.

{{< img src="journey_monitoring/journey-monitoring-map-2.png" alt="El mapa de Journey Monitoring muestra un catálogo de recorridos a la izquierda con métricas de tráfico y conversión, y un mapa de flujo visual a la derecha que muestra las rutas de los usuarios entre las vistas y acciones de la aplicación." style="width:100%;" >}}

## Capacidades {#capabilities}

Para cada recorrido, usted puede:
- Medir el tráfico entrante, la tasa de conversión y el tiempo de finalización del recorrido
- Rastrear la disponibilidad del recorrido utilizando un SLO de tiempo de actividad basado en su [conjunto de pruebas Synthetic][10]
- Identificar dónde abandonan los usuarios e investigar sesiones individuales con [Session Replay][4]
- Mida el rendimiento de los pasos críticos en el recorrido con [operaciones de RUM][13]
- Comparta una vista unificada del estado del recorrido entre los equipos de ingeniería, producto y operaciones de desarrollo

## Requisitos previos {#prerequisites}

Journey Monitoring requiere **al menos uno** de los siguientes productos habilitados en las aplicaciones frontend, cada uno de los cuales aporta diferentes datos a sus recorridos:

- **[RUM without Limits][5]**: Seguimiento de errores y rendimiento del frontend a través de operaciones de RUM.
- **[Product Analytics][8]**: Métricas de tráfico, tasa de conversión y tiempo de conversión.
- **[Synthetic Browser Tests][6] o [Synthetic Mobile Tests][7]**: Seguimiento del tiempo de actividad a través del [conjunto de pruebas][14] creado automáticamente para el recorrido.

## Estructura del recorrido {#journey-structure}

El inicio y el fin de un recorrido pueden ser eventos de acción o de visualización de [Real User Monitoring][1].

Cada recorrido puede tener una o más variantes. Una variante es una secuencia específica de pasos intermedios que un usuario realiza entre el inicio y el final del recorrido. Diferentes usuarios toman naturalmente diferentes caminos. Por ejemplo, algunos pueden omitir pasos opcionales mientras que otros toman desvíos antes de completar el recorrido.

{{< img src="journey_monitoring/journey-monitoring-explainer-diagram-final.png" alt="Diagrama de un recorrido con un evento de inicio, un evento de fin y tres variantes, monitoreado por RUM y Product Analytics en el entorno en vivo y por pruebas Synthetic en el entorno sintético." style="width:100%;" >}}

## Configuración {#setup}

Defina un recorrido seleccionando sus eventos de inicio y fin, luego amplíe la cobertura con datos de sus otros productos de Experiencia Digital.

### Paso 1 - Crear un recorrido {#step-1-create-a-journey}

1. Navegue a **Experiencia Digital > Journey Monitoring**.
2. Haga clic en **New Journey** o seleccione un [recorrido sugerido][11].

### Paso 2 - Especifique los detalles del recorrido {#step-2-specify-journey-details}

1. Seleccione una aplicación frontend.
2. Agregue un nombre de recorrido.
3. Seleccione uno o más eventos de inicio.
4. Seleccione uno o más eventos de finalización.
5. Haga clic en **Save Journey**.

El gráfico de embudo de la derecha se actualiza automáticamente según los eventos de inicio y finalización seleccionados. El embudo muestra el volumen, la tasa de conversión y el tiempo promedio de finalización para cada paso.

**Nota**: Los campos obligatorios se completan previamente si comienza desde un recorrido sugerido.

También puede agregar una descripción, filtros de atributos, propiedad del equipo, etiquetas y [variantes][9]. Al hacer clic en **Save Journey** se crea el recorrido y se le redirige al [informe de detalles][12] del recorrido. El [informe de detalles] incluye métricas sobre el volumen, la tasa de conversión y el tiempo promedio de finalización del recorrido.

### Paso 3 - Agregar cobertura de otros productos {#step-3-add-coverage-from-other-products}

En el [informe de detalles] del recorrido, puede ampliar la cobertura de seguimiento según los productos que tenga:

- Cree [RUM operations][13] para monitorear el rendimiento de los pasos críticos del recorrido en su entorno de usuario real
- Agregue pruebas Synthetic al [conjunto de pruebas][14] del recorrido para comenzar a realizar un seguimiento del tiempo de actividad

Si ya tiene creo previamente operaciones de RUM o pruebas Synthetic que cubren el recorrido, Datadog muestra la operación o prueba en el [informe de detalles] del recorrido.

## Métricas {#metrics}

Cada recorrido y sus variantes tienen las siguientes métricas de rendimiento:
- **Tráfico**: Número total de intentos de recorrido en las sesiones de usuario. Basado en la métrica `rum.measure.journey`.
- **Conversión**: Porcentaje de intentos de recorrido que se completaron. Basado en la métrica `rum.measure.journey`.
- **Tiempo de conversión**: Tiempo promedio para completar el recorrido en todas las sesiones de usuario. Basado en la métrica `rum.measure.journey.duration`.
- **Tiempo de actividad**: Disponibilidad del recorrido basada en el tiempo de actividad de su [conjunto de pruebas Synthetic][14].

## ¿Qué sigue? {#whats-next}

{{< whatsnext desc="Explore Journey Monitoring:" >}}
   {{< nextlink href="/journey_monitoring/map/" >}}<strong>Map</strong>: Visualice todos sus recorridos y sus métricas de tráfico y conversión.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/map/suggested_journeys/" >}}<strong>Suggested Journeys</strong>: Obtenga sugerencias de recorridos generadas automáticamente basadas en el comportamiento real del usuario en su aplicación.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/" >}}<strong>Details Report</strong>: Analice el tráfico, la conversión, los errores y el tiempo de actividad de un recorrido en un informe unificado.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/details_report/variants/" >}}<strong>Variants</strong>: Rastree y compare las diferentes rutas que siguen los usuarios a través de un recorrido.{{< /nextlink >}}
   {{< nextlink href="/journey_monitoring/uptime/" >}}<strong>Uptime</strong>: Mida la disponibilidad de un recorrido con un conjunto de pruebas Synthetic creado automáticamente.{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/real_user_monitoring/
[2]: /es/synthetics/
[3]: /es/product_analytics/
[4]: /es/session_replay/
[5]: /es/real_user_monitoring/rum_without_limits/
[6]: /es/synthetics/browser_tests/
[7]: /es/synthetics/mobile_app_testing/
[8]: /es/product_analytics/
[9]: /es/journey_monitoring/details_report/variants/
[10]: /es/journey_monitoring/uptime/
[11]: /es/journey_monitoring/map/suggested_journeys/
[12]: /es/journey_monitoring/details_report/
[13]: /es/real_user_monitoring/operations_monitoring/
[14]: /es/synthetics/test_suites/#service-level-objectives