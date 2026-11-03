---
description: Comprenda cómo funciona el modelo de detección de anomalías para los
  monitores de Data Observability, incluyendo el entrenamiento, los estados del modelo,
  la estacionalidad y los comportamientos específicos de las métricas.
further_reading:
- link: /data_observability/quality_monitoring/
  tag: Documentación
  text: Quality Monitoring
- link: /monitors/types/data_observability/
  tag: Documentación
  text: Seguimiento de Data Observability
title: Detección de anomalías para monitores de Data Observability
---
**Nota**: Esta página se aplica únicamente a los monitores de Data Observability basados en anomalías. Si su monitor utiliza el método de detección **Umbral**, este contenido no es aplicable.

## Descripción general {#overview}

De forma predeterminada, los [monitores de Data Observability][1] utilizan un modelo de detección de anomalías adaptado a patrones comunes en métricas de calidad de datos, como la frescura de la tabla y el recuento de filas.

El modelo aprende del historial de la métrica para establecer los límites esperados. Cuando un valor observado cae fuera de esos límites, el monitor activa una alerta.

## Período de entrenamiento {#training-period}

Cuando crea un monitor de detección de anomalías, este entra en un período de entrenamiento. Durante el entrenamiento, el monitor recopila valores históricos para aprender el comportamiento de referencia de la métrica. No activa alertas durante este período y el gráfico del monitor aparece en azul.

El entrenamiento suele tardar entre 3 y 9 días. Debido a que muchas canalizaciones de datos se comportan de manera diferente los fines de semana, el modelo necesita observar el comportamiento tanto de los días de semana como de los fines de semana.

Una vez completado el entrenamiento, el monitor puede alertar. El gráfico muestra los valores observados a lo largo del tiempo, con límites por encima y por debajo de la línea como un área sombreada que muestra los valores esperados. El color muestra el estado actual:

| Color | Estado | Descripción |
|-------|-------|-------------|
| Azul | Entrenamiento | El monitor está aprendiendo el comportamiento de referencia. No se activan alertas. |
| Verde | Normal | El valor observado está dentro de los límites esperados. |
| Rojo | Alerting | El valor observado cayó fuera de los límites esperados. |

## Estado de alerta {#alert-state}

Cuando se encuentra una anomalía, el modelo permanecerá en estado de alerta durante algún tiempo, hasta que el valor observado regrese a los límites esperados originales o la anomalía haya persistido lo suficiente como para que el modelo la considere un nuevo estado normal. Para resolver el monitor manualmente y devolverlo al estado normal, utilice [annotations][2].

## Comportamiento específico de la métrica {#metric-specific-behavior}

El modelo funciona de manera diferente para diferentes métricas:

### Frescura {#freshness}

Los monitores de frescura alertan cuando el tiempo transcurrido desde la última actualización es mayor de lo esperado según los patrones de actualización históricos. El modelo añade un pequeño margen al límite superior para evitar activar alertas por retrasos menores.

### Recuento de filas {#row-count}

Los monitores de recuento de filas alertan no solo cuando hay un cambio inusual, sino también cuando el recuento de filas se estanca, lo que significa que no ha cambiado durante más tiempo de lo normal. Un recuento de filas estancado puede indicar una canalización rota.

### Porcentaje (p. ej., nulidad, unicidad) {#percentage-eg-nullness-uniqueness}

Las métricas de porcentaje se escalan de 0 a 100. Si la métrica nunca ha sido 0 o 100, un cambio a estos valores activa una alerta.

### SQL personalizado {#custom-sql}

Para los monitores de SQL personalizado, seleccione un tipo de modelo para su métrica: **Frescura**, **Porcentaje** o **Predeterminado**.  El modelo **Predeterminado** infiere el rango a partir del historial de la métrica. Por ejemplo, si una métrica personalizada nunca ha devuelto un valor negativo, el modelo limita el límite inferior a 0.

## Estacionalidad {#seasonality}

El modelo utiliza hasta 400 días de historial para ajustarse a los patrones estacionales, las tendencias y las anotaciones anteriores. Por ejemplo, si una métrica cae constantemente los domingos, el modelo trata los valores más bajos de los domingos como normales en lugar de anómalos.

Se detectan los siguientes patrones estacionales:

| Patrón | Descripción |
|---------|-------------|
| Hora del día | Métricas que siguen patrones intradía, como un mayor número de filas durante el horario laboral. |
| Hora de la semana | Métricas con patrones consistentes a lo largo de una semana completa con granularidad horaria. |
| Día de la semana | Métricas que difieren según el día de la semana, como una menor actividad los domingos. |
| Día del mes | Métricas con patrones recurrentes vinculados al mes calendario, como picos a fin de mes. |

No todos los patrones estacionales están disponibles para todos los tipos de métricas. Además, el modelo requiere varios ciclos completos de historial normal antes de que pueda detectar un patrón determinado.

## Tendencias {#trends}

El modelo tiene en cuenta si una métrica aumenta o disminuye con el tiempo. Para una métrica que agrega filas constantemente cada semana, el modelo ajusta las expectativas según la dirección y la tasa de cambio en lugar de tratar el crecimiento como anómalo.

## Anotaciones {#annotations}

Las anotaciones le permiten volver a entrenar el modelo inmediatamente cuando clasifica erróneamente un punto, ya sea omitiendo una alerta o generando una alerta falsa. Debido a que las expectativas de calidad de los datos a menudo son específicas de la métrica, las anotaciones son la forma principal de ajustar el modelo a las necesidades de su equipo.

Las anotaciones tienen dos efectos:
- **Corregir el estado actual**: Marcar un punto señalado como esperado mueve el monitor fuera del estado de Alerting y lo lleva al estado normal en la siguiente observación, para que pueda alertar sobre nuevas anomalías.
- **Dar forma a las predicciones futuras**: El modelo utiliza puntos anotados para ajustar los límites futuros, por lo que la retroalimentación mejora la precisión de inmediato.

Consulte [Annotate bounds][2] en la página Data Observability Monitor para conocer los tipos de anotación disponibles y cómo aplicarlos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/types/data_observability/
[2]: /es/monitors/types/data_observability/#annotate-bounds