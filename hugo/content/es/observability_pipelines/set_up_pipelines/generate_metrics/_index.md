---
disable_toc: false
title: Generar métricas
---

## Información general

Algunas fuentes de log, como los cortafuegos y los dispositivos de red, generan un gran volumen de eventos de log que contienen datos que no necesariamente tienen que ser almacenados. A menudo, sólo se desea ver un resumen de los logs y compararlos con los datos históricos. Utiliza la plantilla Generate metrics (Generar métricas) para generar una métrica count (recuento) de logs que coincidan con una métrica query (consulta) o distribution (distribución) de un valor numérico contenido en los logs, como la duración de una solicitud. La plantilla comienza con los siguientes procesadores:

- **Filtro**: añade una consulta para enviar sólo un subconjunto de logs en función de tus condiciones.
- **Analizador Grok**: analiza tus logs utilizando las reglas de parseo grok disponibles para un conjunto de fuentes o reglas de parseo personalizadas.
- **Generar métricas**: genera métricas para tus logs o un subconjunto de ellas. Consulta [tipos de métricas](#metrics-types) para conocer los tipos de métricas que puedes generar.

{{% observability_pipelines/use_case_images/generate_metrics %}}

## Tipos de métricas

{{% observability_pipelines/metrics_types %}}