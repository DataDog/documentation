---
algolia:
  tags:
  - anulación de unidades
  - unidades personalizadas
disable_toc: false
further_reading:
- link: metrics/units/
  tag: Documentación
  text: Unidades de métricas
- link: logs/explorer/facets/#units
  tag: Documentación
  text: Unidades de eventos
- link: dashboards/widgets/
  tag: Documentación
  text: Lista de widgets
kind: Guía
title: Personalizar visualizaciones con la anulación de unidades
---

## Información general

La función de anulación de unidades en las visualizaciones te permite personalizar la forma en que se etiquetan tus datos. Esta guía cubre las opciones de configuración de la anulación de unidades y cómo estas opciones te ayudan a analizar tus gráficos.

**Nota**: Muchos de los ejemplos de esta guía utilizan el [widget de tabla][1], aunque la anulación de unidades no es exclusiva de este widget.

{{< whatsnext desc="Para configurar una unidad a nivel de la organización, consulta la siguiente documentación: ">}}
    {{< nextlink href="/metrics/units">}} Configurar unidades de métricas{{< /nextlink >}}
    {{< nextlink href="/logs/explorer/facets/#units">}} Configurar unidades para consultas basadas en eventos{{< /nextlink >}}
{{< /whatsnext >}}

## Configuración

En tus notebooks y widgets de dashboards, busca el editor de gráficos de la celda o el widget. Para notebooks, haz clic en **More Options** (Más opciones), y para dashboards, busca la sección **Graph your data* (Gráfica tus datos).

{{< img src="dashboards/guide/unit_override/unit_override_config.png" alt="Opción de anulación de unidades en el gráfico que muestra tu sección de datos en un widget de cambio" style="width:100%;" >}}

## Cómo funciona la atribución de unidades y escalas

Cuando se detecta una unidad, Datadog elige automáticamente la escala de unidad más legible en función de la magnitud de tus datos. Por ejemplo, si los datos de origen son nanosegundos, el widget podría mostrar valores legibles en minutos y segundos, en lugar de hacerlo en millones de nanosegundos.

{{< img src="dashboards/guide/unit_override/unit_override_with_autoscale.png" alt="Widget de tabla que muestra valores escalados a minutos y segundos, junto a la configuración de la anulación de unidades con la unidad de escalado automático habilitada" style="width:100%;" >}}

Con la anulación de unidades, puedes elegir una única escala fija para comparar valores. En el ejemplo siguiente, todos los valores están configurados para escalarse a `minutes`. Esto sirve para comparar directamente valores en la misma escala. 

{{< img src="dashboards/guide/unit_override/unit_override_without_autoscale.png" alt="Widget de tabla que muestra todos los valores escalados a minutos, junto a la configuración de la anulación de unidades sin la unidad de escalado automático habilitada" style="width:100%;" >}}

## Asignar unidades personalizadas

Asigna unidades personalizadas a un widget para añadir contexto a métricas sin unidades (como recuentos). 

{{< img src="dashboards/guide/unit_override/custom_unit_tests.png" alt="Configuración de la anulación de unidades donde está resaltado el menú desplegable de la unidad para asignar unidades personalizadas" style="width:100%;" >}}

Define unidades completamente personalizadas que no estén incluidas en la lista de unidades proporcionada. En lugar de un recuento genérico de eventos, puedes especificar que quieres visualizar 10.000 tests o 100 sesiones. Esto te proporciona un contexto inmediato con los datos que estás analizando.

**Nota**: El escalado automático no está disponible para unidades personalizadas, ya que no se reconoce la familia de unidades.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/es/dashboards/widgets/table/