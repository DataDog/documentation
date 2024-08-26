---
core_product:
- apm
title: métrica de subcapa
---
Una métrica de subcapa es la duración de ejecución de un tipo o servicio determinado dentro de una traza (trace).

Algunas [métricas de rastreo de aplicaciones][1] se encuentran etiquetadas con `sublayer_service` y `sublayer_type` para que puedas ver el tiempo de ejecución de servicios individuales dentro de una traza.

Las métricas de subcapa solo se encuentran disponibles si un servicio tiene dependencias posteriores.

[1]: /es/tracing/metrics/metrics_namespace/