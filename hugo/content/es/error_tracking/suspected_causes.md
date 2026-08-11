---
description: Conoce las causas sospechosas en el Rastreo de errores de backend.
further_reading:
- link: /error_tracking/monitors
  tag: Documentación
  text: Más información sobre los monitores de seguimiento de errores
title: Causas sospechosas
---

## Información general

Datadog asigna una etiqueta (label) de causa sospechosa a las incidencias en el momento de su creación. La etiqueta (label) de causa sospechosa representa la primera hipótesis que puede tener un desarrollador sobre la causa raíz de un error. Esta clasificación inicial ayuda a los equipos a racionalizar sus esfuerzos al solucionar problemas y a mejorar su comprensión de los problemas recurrentes.

La causa sospechosa puede ser una de las siguientes categorías:

- **Code Exception** (Excepción de código): se ha producido un error debido a un fallo en el código.
- **Failed Request** (Solicitud fallida): un endpoint de la API respondió con un código de estado de error.
- **Illegal Object Access** (Acceso ilegal al objeto): el código accedió a un objeto que era nulo o indefinido.
- **Invalid Argument** (Argumento no válido): se ha llamado a una función con un argumento no válido.
- **Network** (Red): un servidor tardó en responder, o la red era lenta.

Las causas sospechosas pueden utilizarse como filtros en la búsqueda, lo que permite localizar los problemas pertinentes.

{{< img src="/error_tracking/suspected-cause.png" alt="Filtra la búsqueda por la causa sospechosa." >}}

### Actualización de las etiquetas de causas sospechosas

Las causas sospechosas pueden editarse manualmente si se consideran incorrectas, lo que permite mejorar continuamente el proceso de etiquetado.

Para actualizar la causa sospechosa, haz clic en la etiqueta (label) y selecciona una diferente.

{{< img src="/error_tracking/suspected-cause-labels.png" alt="Actualizar la etiqueta de causa sospechosa." >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}