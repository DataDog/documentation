---
description: Descubre cómo el muestreo dinámico en el seguimiento de errores puede
  asegurar que tu volumen no se consuma de golpe.
further_reading:
- link: /logs/error_tracking/manage_data_collection
  tag: Documentación
  text: Más información sobre la gestión de datos en el seguimiento de errores
- link: /logs/error_tracking
  tag: Documentación
  text: Más información sobre el seguimiento de errores para logs
is_beta: false
private: true
title: Muestreo dinámico del seguimiento de errores
---

## Información general

Dado que la facturación del seguimiento de errores se basa en el número de errores, los grandes aumentos en los errores de una sola incidencia pueden consumir rápidamente tu presupuesto de seguimiento de errores. El muestreo dinámico te protege mediante un umbral para la tasa de error por incidencia basado en tu límite de tasa diario y en los volúmenes de error históricos; muestrea los errores cuando se alcanza dicho umbral. El muestreo dinámico se desactiva automáticamente cuando la tasa de error de tu incidencia disminuye por debajo del umbral dado.

## Configuración

El muestreo dinámico se activa automáticamente con el seguimiento de errores con un umbral de consumo por defecto basado en tu límite de tasa diaria y volumen histórico.

Para obtener mejores resultados, establece un límite de tasa diario en la página [Límites de tasa de seguimiento de errores][2]: haz clic en **Edit Rate Limit** (Editar límite de tasa) e introduce un nuevo valor.

{{< img src="error_tracking/dynamic-sampling-rate-limit.png" alt="Límite de tasa del seguimiento de errores" style="width:90%" >}}

## Desactivar el muestreo dinámico

El muestreo dinámico puede desactivarse en la página [Configuración de seguimiento de errores][4].

{{< img src="error_tracking/dynamic-sampling-settings.png" alt="Configuración de muestreo dinámico del seguimiento de errores" style="width:90%" >}}

## Monitorización del muestreo dinámico

Se genera un evento `Dynamic Sampling activated` cuando se aplica el muestreo dinámico a una incidencia. Consulta la [Documentación de gestión de eventos][1] para obtener más información sobre la visualización y el uso de eventos.

{{< img src="error_tracking/dynamic-sampling-event.png" alt="Límite de tasa del seguimiento de errores" style="width:90%" >}}

### Investigación y pasos de mitigación

Cuando se aplica el muestreo dinámico, los siguientes pasos son recomendados:

- Comprueba qué incidencia está consumiendo tu cuota. La incidencia a la que se aplica el muestreo dinámico está vinculada en el evento generado en la Gestión de eventos.
- Si deseas recopilar muestras adicionales para esta edición, aumenta tu cuota diaria en la página [Límites de la tasa de seguimiento de errores][2].
- Si deseas evitar la recopilación de muestras para este problema en el futuro, considera la posibilidad de crear un [filtro de exclusión][3] para evitar que se ingieran eventos adicionales en el seguimiento de errores.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/service_management/events/
[2]: https://app.datadoghq.com/error-tracking/settings/rate-limits
[3]: /es/logs/error_tracking/manage_data_collection#add-a-rule
[4]: https://app.datadoghq.com/error-tracking/settings