---
related_terms:
- intervalo de recopilación
title: resolución mínima
---
La resolución mínima es el intervalo más corto entre puntos de datos para el que Datadog puede conservar registros únicos. Por ejemplo, si la resolución mínima es de 1 segundo, sólo se puede almacenar un valor por combinación única de etiquetas (tags) y métricas dentro de cada ventana de 1 segundo. Cualquier valor posterior enviado dentro del mismo segundo sobrescribe el valor anterior.

Mientras que la resolución mínima define la granularidad temporal mínima que Datadog *puede* soportar, el <a href="/glossary/#collection-interval">intervalo de recopilación</a> define la frecuencia *por defecto* con la que Datadog informa de los puntos de datos.