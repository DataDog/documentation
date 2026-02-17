---
further_reading:
- link: /profiler
  tag: Documentación
  text: Datadog Continuous Profiler
- link: /profiler/compare_profiles/
  tag: Documentación
  text: Comparación de perfiles
title: Solucionar problemas de fuga de memoria mediante la generación de perfiles
---

## Información general

La generación de perfiles dispone de varios conjuntos de datos para ayuda resolver las fugas de memoria, como el tipo de perfil Live Heap, que está [disponible para varios lenguajes][1].

Para ayudarte a empezar, Datadog te ofrece un completo recorrido guiado de los servicios Go o Java:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak.png" alt="Punto de entrada del recorrido de las fugas de memoria en la página de servicio" style="width:100%;" >}}

## Qué esperar

Este recorrido guiado no requiere ningún conocimiento previo y es accesible para quienes investigan por primera vez.

El recorrido guiado te ayuda a lo largo de diferentes pasos para que puedas:
1. Delimitar los datos pertinentes.
2. Recomendar integraciones y actualizaciones de Datadog que ayuden en la investigación.
3. Explicar cómo funciona la gestión de memoria en tu tiempo de ejecución.
4. Proponer posibles causas raíz a través de [comparaciones de perfiles][2].

## Requisitos

Para utilizar este recorrido guiado necesitas:
* Un servicio Go o Java contenedorizado con las integraciones Datadog Kubernetes o Datadog Contenedor instaladas.
* El [Continuous Profiler habilitado][3].
  * Asegúrate de que tus perfiles están etiquetados con `container_id`. Esto es necesario para establecer un vínculo entre las métricas de uso de memoria de contenedores y los datos de perfiles.

## Para empezar

Investigar una fuga de memoria utilizando el recorrido guiado:

1. Ve a **[APM > Software Catalog] (APM > Catálogo de software)[4]**.
1. Pasa el cursor sobre el servicio que quieres investigar y haz clic en **Service Page** (Página de servicio).
1. Haz clic en la pestaña **Memory Leaks** (Fugas de memoria).
1. Sigue los pasos guiados para completar tu investigación.


[1]: /es/profiler/enabling/supported_versions/#profile-types
[2]: /es/profiler/compare_profiles
[3]: /es/profiler/enabling
[4]: https://app.datadoghq.com/services

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}