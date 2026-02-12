---
aliases:
- /es/path-to-old-doc/
disable_toc: false
further_reading:
- link: /opentelemetry/reference/trace_context_propagation
  tag: Documentación
  text: Propagación de contextos de trazas (traces)
title: ID de traza
---

Las trazas W3C contienen implícitamente ID de traza de 128 bits, en lugar de los ID de traza de 64 bits que las trazas de Datadog han utilizado históricamente. La configuración de las bibliotecas de rastreo de Datadog más reciente por defecto utiliza el parámetro `DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED=True` para que también Datadog produzca datos de traza con ID de traza de 128 bits. 

Siguiendo las [recomendaciones del contexto de rastreo W3C][9], los ID de traza de 128 bits de Datadog tienen aleatoriedad en los 64 bits de orden inferior. Esta restricción proporciona compatibilidad con versiones anteriores para los sistemas que entremezclan bibliotecas que generan ID de traza de 64 bits con otras más recientes que admiten ID de 128 bits. En tales sistemas, los tramos (spans) con el ID de traza completo de 128 bits, y los tramos, con el ID de traza truncado de 64 bits de orden inferior, pueden llegar al backend y ser tratados como coincidentes y partes de la misma traza.

{{< img src="opentelemetry/guide/otel_api_tracing_interop/128-62-bit-trace-ids.png" alt="Los ID de traza de 128 bits pueden pasarse con un contexto de traza para codificar aquellas bibliotecas de rastreo que generan ID de traza de 64 bits, y Datadog puede correlacionarlos correctamente en el backend." style="width:100%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/trace-context/#handling-trace-id-for-compliant-platforms-with-shorter-internal-identifiers