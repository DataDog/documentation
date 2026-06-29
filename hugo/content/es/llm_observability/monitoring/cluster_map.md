---
aliases:
- /es/llm_observability/cluster_map
description: Identifica derivas en tu aplicación LLM consultando su Mapa de clústeres.
further_reading:
- link: /llm_observability/
  tag: Documentación
  text: Más información sobre LLM Observability
- link: /llm_observability/terms/
  tag: Documentación
  text: Más información sobre los términos y conceptos clave de la observabilidad
    en LLM
title: Rastrear un Mapa de clústeres
---

## Información general

Puedes identificar derivas en tus aplicaciones LLM visualizando los datos de rastreo en clústeres en la [página Clústeres][1]. Selecciona una aplicación configurada con LLM Observability para ver información de clúster.

**Nota:** La agrupación en clústeres puede tardar hasta **24 horas** después de la ingesta de los datos para estar completamente procesada y visible en el mapa de clústeres. Durante este tiempo, los intervalos que aún no se han agrupado aparecerán en un clúster **"Pendiente"**.

Los mapas de clústeres muestran entradas o salidas agrupadas por [tema][2]. Las entradas y salidas se agrupan por separado. Los temas se determinan agrupando la entrada o salida seleccionada en incrustaciones de texto en altas dimensiones y proyectándolas después en un espacio 2D.

{{< img src="llm_observability/cluster_map/scatter.png" alt="El diagrama de dispersión muestra clústeres de trazas (traces) con temas organizados por colores e incluye un panel con clústeres, recuentos de trazas y frecuencias de fallos." style="width:100%;" >}}

Puedes visualizar los clústeres utilizando un diseño **Box Packing** o **Scatter Plot**.

- Box Packing ofrece una vista agrupada de cada uno de los clústeres y superpone cualquier métrica o evaluación de cada traza (trace).
- Scatter Plot, por su parte, permite ver las incrustaciones de texto de alta dimensión en un espacio 2D, aunque la distancia entre cada trace puede ser engañosa debido a la distorsión de la proyección.

Los Mapas de clústeres ofrecen una visión general del rendimiento de cada clúster a través de métricas operativas, como los tipos de error y la latencia o [evaluaciones predefinidas o personalizadas][3], lo que permite identificar tendencias como la desviación temática y otros problemas de calidad.

<div class="alert alert-info"><strong>Creado con Llama</strong>: El mapa de clústeres utiliza Llama para generar etiquetas (labels) temáticas basadas en las entradas y salidas de tu aplicación LLM instrumentada. </div>

## Buscar y gestionar clústeres

Personaliza tu consulta de búsqueda seleccionando las opciones de clasificación para acotar los clústeres en función de tus criterios específicos, como las métricas de evaluación o los periodos de tiempo, para un análisis más específico.

1. Selecciona `inputs` o `outputs` en el menú desplegable para ver clústeres de entradas o salidas agrupadas por temas.
1. Selecciona un tipo de evaluación o una puntuación de evaluación para codificar por colores las agrupaciones. Por ejemplo, `Output Sentiment`, para "¿Cuál es el sentimiento de la salida?", o `duration`, para "¿Cuánto tarda un LLM en generar una salida (en nanosegundos)?".
1. Selecciona un campo para ordenar los clústeres por: tiempo, duración o color. A continuación, selecciona **desc** o **asc** para establecer el orden.

Selecciona un clúster de tema en la lista para examinar cómo se comportan las entradas o las salidas con respecto a temas específicos, en comparación con otros temas de cada métrica o evaluación. También puedes ver los avisos y las respuestas individuales de cada clúster. Por ejemplo, puedes obtener información general de los temas más lentos, si superpones por `duration`.

{{< img src="llm_observability/cluster_map/box.png" alt="El diseño de la caja de embalaje muestra clústeres de trazas representados mediante círculos de color e incluye un panel de clústeres con temas, recuentos de trazas y frecuencias de fallo." style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/clusters
[2]: /es/llm_observability/evaluations/managed_evaluations/#enter-a-topic
[3]: /es/llm_observability/terms/#evaluations