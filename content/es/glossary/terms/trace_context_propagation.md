---
core_product:
- apm
short_definition: La propagación del contexto de trazas (traces) es el método de pasar
  identificadores de trazas entre servicios en un sistema distribuido.
title: propagación del contexto de trazas
---
La propagación del contexto de trazas es el método para pasar identificadores de trazas entre servicios en un sistema distribuido. Permite a Datadog unir tramos (spans) individuales de diferentes servicios en una única traza distribuida. La propagación del contexto de trazas funciona insertando identificadores, como el ID de traza y el ID de tramo principal, en los encabezados HTTP a medida que la solicitud fluye por el sistema. Luego, el servicio de descarga extrae estos identificadores y continúa la traza. Esto permite a Datadog reconstruir la ruta completa de una solicitud a través de múltiples servicios.

Para más información, consulta la <a href="/tracing/trace_collection/trace_context_propagation">propagación del contexto trazas </a> para el lenguaje de tu aplicación.