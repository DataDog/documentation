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

Para ayudarte a empezar, Datadog te ofrece un completo recorrido guiado de los servicios Go:

{{< img src="profiler/guide-memory-leak/service-page-memory-leak-walkthrough.mp4" alt="Recorrido guiado de las fugas de memoria" video=true >}}

## Qué esperar

Este recorrido guiado no requiere ningún conocimiento previo y es accesible para quienes investigan por primera vez.

El recorrido guiado te ayuda a lo largo de diferentes pasos para que puedas:
1. Delimitar los datos pertinentes.
2. Recomendar integraciones y actualizaciones de Datadog que ayuden en la investigación.
3. Explicar cómo funciona la gestión de memoria en tu tiempo de ejecución.
4. Proponer posibles causas raíz a través de [comparaciones de perfiles][2].

## Requisitos

<div class="alert alert-warning">El recorrido guiado se encuentra en fase beta pública y está sujeto a cambios. En el transcurso del tiempo habrá nuevas compatibilidades para lenguajes e infraestructuras.</div>

Para utilizar este recorrido guiado necesitas:
* Un servicio Go que se ejecute en Kubernetes.
* El [Continuous Profiler habilitado][3].

## Para empezar

Investigar una fuga de memoria utilizando el recorrido guiado:

1. Ve a **APM > Service Page** (APM > Página de servicios) en el servicio que quieres investigar.
2. Haga clic en la pestaña **Memory Leaks* (Fugas de memoria):
{{< img src="profiler/guide-memory-leak/service-page-memory-leak-entrypoint.png" alt="Punto de entrada del recorrido guiado de las fugas de memoria en la página de servicios" style="width:100%;" >}}
3. Sigue los pasos guiados para completar tu investigación.


[1]: /es/profiler/enabling/supported_versions/#profile-types
[2]: /es/profiler/compare_profiles
[3]: /es/profiler/enabling

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}