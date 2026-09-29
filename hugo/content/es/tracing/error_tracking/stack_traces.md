---
description: Obtenga información sobre cómo Error Tracking utiliza trazas de pila
  para identificar y agrupar errores.
further_reading:
- link: /tracing/error_tracking/
  tag: Documentación
  text: Obtenga información sobre Error Tracking para servicios backend
- link: /tracing/error_tracking/error_grouping/
  tag: Documentación
  text: Obtenga información sobre la agrupación de errores
title: Trazas de pila en Error Tracking
---
## Descripción general {#overview}

Error Tracking utiliza trazas de pila en tramos de error para identificar errores, agruparlos en incidencias y mostrar dónde ocurrieron. Esta página describe qué atributo de tramo lee Error Tracking para la traza de pila, y cómo varía según el lenguaje de su servicio y la versión del tracer.

## Atributos de tramo de traza de pila {#stack-trace-span-attributes}

Un tramo de error informa su traza de pila en el `error.stack` [atributo de tramo][1]. Para la mayoría de los tracers, `error.stack` contiene la traza de pila capturada cuando se manejó el error (por ejemplo, en un bloque `catch` o middleware). Este no siempre es el lugar donde se produjo el error.

Para servicios de Go instrumentados con `dd-trace-go` v2.7.0 o posterior, la traza de pila de manejo se informa por separado, en el atributo `error.handling_stack`. En este caso, `error.stack` contiene en su lugar la traza de pila capturada en el punto donde se produjo el error, si está disponible.

## Qué traza de pila utiliza Error Tracking {#which-stack-trace-is-used-by-error-tracking}

### Para servicios de Go {#for-go-services}

Para servicios de Go, Error Tracking tiene un mecanismo de respaldo para decidir qué traza de pila utilizar:

- Go tracer v2.7.0 y posterior:
  - La traza de pila de lanzamiento se informa en `error.stack`. Esta traza de pila se utiliza si está disponible.
  - La traza de pila de manejo se informa en `error.handling_stack`. Esta traza de pila se utiliza si la traza de pila de lanzamiento no está disponible.
- Go tracer anterior a v2.7.0:
  - La traza de pila de lanzamiento se informa en `error.details`. Esta traza de pila se utiliza si está disponible.
  - La traza de pila de manejo se informa en `error.stack`. Esta traza de pila se utiliza si la traza de pila de lanzamiento no está disponible.

### Para todos los demás lenguajes {#for-all-other-languages}

Para todos los demás lenguajes, la traza de pila de manejo se captura y se informa en `error.stack`. Este atributo es utilizado por Error Tracking para agrupar incidencias y obtener información como el commit sospechoso.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/visualization/trace/?tab=spantags#more-information