---
aliases:
- /es/developers/faq/what-best-practices-are-recommended-for-naming-metrics-and-tags
further_reading:
- link: /metrics/
  tag: Documentación
  text: Más información sobre las métricas de Datadog
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
title: ¿Cuáles son las prácticas recomendadas para nombrar métricas y etiquetas (tags)?
---

La convención de nomenclatura es un arte y posiblemente una de las decisiones más difíciles de consensuar. Definir una convención de nomenclatura para tus métricas, etiquetas y servicios es crucial para tener datos de telemetría limpios, legibles y mantenibles. He aquí algunas recomendaciones:

* Proporciona nombres descriptivos y significativos: las métricas o etiquetas describen claramente la finalidad o el significado del valor.
* Respeta el formato y las limitaciones que se describen a continuación.
* Evita abreviaturas que puedan tener múltiples significados
* Mantén la coherencia en todos los equipos, aplicaciones y servicios.
* Evita las palabras clave reservadas que puedan provocar conflictos con el resto de las etiquetas o métricas.
* En el caso de métricas, coloca un prefijo con un espacio de nombres que represente la aplicación o servicio que genera los datos.

## Reglas y prácticas recomendadas para nombrar métricas

* Los nombres de métrica deben empezar por una letra.
* Solo puede contener caracteres alfanuméricos ASCII, guiones bajos y puntos. Los demás caracteres se convierten en guiones bajos.
* No debe superar los 200 caracteres (aunque, desde el punto de vista de la interfaz de usuario, es preferible que tenga menos de 100).
* No se admite Unicode.
* Es recomendado para evitar espacios.

Las métricas informadas por el Agent tienen un formato pseudojerárquico de puntos, por ejemplo: `http.nginx.response_time`. Se describe como pseudojerárquico porque en realidad no se impone una jerarquía, pero la estructura se utiliza para inferir ciertas relaciones, por ejemplo: "_Veo que hostA y hostB informan de `http.nginx.*`, deben ser frontend web"_).

**Nota**: Los nombres de métrica distinguen entre mayúsculas y minúsculas en Datadog.

## Normas y prácticas recomendadas para nombrar etiquetas

Datadog recomienda utilizar el etiquetado de servicios unificado al asignar etiquetas. Este sistema asocia toda la telemetría de Datadog mediante el uso de tres etiquetas estándar: `env`, `service` y `version`. Para saber cómo configurar tu entorno con el etiquetado unificado, consulta la sección [Etiquetado de servicios unificado][1].

* Las etiquetas deben empezar por una letra.
* Puede contener caracteres alfanuméricos, guiones bajos, rayas, dos puntos, puntos y barras oblicuas. Los demás caracteres se convierten en guiones bajos.
* Se elimina el guión bajo final, tanto si procede de un carácter convertido como si estaba en el valor original de la etiqueta.
* Los guiones bajos contiguos se reducen a un solo guión bajo.
* Las etiquetas pueden tener un máximo de 200 caracteres (incluyendo tanto la clave como el valor) y admiten Unicode. Los caracteres adicionales que superen este límite se truncarán.
* Las etiquetas se convierten a minúsculas.
* Para una funcionalidad óptima, es recomendado utilizar la sintaxis `key:value`.

Ejemplos de claves de etiqueta de métrica comunes son `instance`, `name` y `role`.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging