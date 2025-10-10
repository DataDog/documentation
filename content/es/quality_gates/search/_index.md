---
description: Aprende cómo buscar las reglas de tus Puertas de calidad.
further_reading:
- link: /quality_gates
  tag: Documentación
  text: Más información sobre Puertas de calidad
title: Buscar y gestionar reglas de Puertas de calidad
---

## Información general

La página [**Reglas de las puertas de calidad**][1] es útil para los desarrolladores que quieren controlar las puertas de calidad de sus procesos de compilación. Puedes ver todas las reglas definidas por la organización.

{{< img src="quality_gates/rules_list_2.png" alt="Reglas de las puertas de calidad en Datadog, que muestran el nombre, la evaluación, el contexto, el estado de bloqueo, la fecha de última modificación y el avatar del creador de la regla" style="width:100%" >}}

Utiliza esta página para crear una regla, editar una regla existente o haz clic en una regla para investigar sus ejecuciones anteriores.

## Buscar normas

Para ver las reglas de tus puertas de calidad, ve a [**Entrega de software** > **Puertas de calidad** > **Reglas de las puertas de calidad**][1].

Puedes filtrar la página por nombre de regla para ver las reglas que más le interesan. Haz clic en una regla para investigar los detalles que muestran, por ejemplo, qué commit podría haber introducido una regresión de rendimiento o un error de compilación. 

## Explorar ejecuciones de reglas

Haz clic en una ejecución de regla específica para ver los resultados de la ejecución de la regla anterior, incluidos el estado y las condiciones específicas. 

{{< img src="quality_gates/executions_sidepanel.png" alt="Regla de las puertas de calidad que muestra el estado de ejecución de la regla a lo largo del tiempo y las ejecuciones de la regla" style="width:100%" >}}

Para cambiar a los resultados de Static Analysis o Software Composition Analysis relacionados en [Datadog Code Security][2], haz clic en `See related events`. Puedes editar la regla de las Puertas de calidad, de acuerdo con los resultados de tu ejecución, haciendo clic en **Manage Rule** (Gestionar regla).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/quality-gates
[2]: /es/security/code_security/