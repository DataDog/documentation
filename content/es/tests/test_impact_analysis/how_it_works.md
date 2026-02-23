---
aliases:
- /es/intelligent_test_runner/how_it_works
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Agiliza los tests de CI con Datadog Intelligent Test Runner
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorización de todos tus pipelines de CI con Datadog
- link: /intelligent_test_runner
  tag: Documentación
  text: Más información sobre Test Impact Analysis
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization (optimización de tests)
title: Cómo funciona Test Impact Analysis en Datadog
---

## Información general

Test Impact Analysis es la solución de análisis de impacto de tests de Datadog. Test Impact Analysis es una técnica que ha ganado popularidad en las últimas décadas. Sin embargo, suele ser difícil de aplicar y requiere mucho tiempo. Test Impact Analysis simplifica esta complejidad.

Test Impact Analysis asigna cada test al conjunto de archivos de código de tu repositorio que utiliza el test (por cobertura de código del test). Su objetivo es omitir los tests no afectados por los cambios de código. Esto conlleva una reducción directa del tiempo dedicado a los tests en CI.

Un ejemplo extremo es una solicitud pull que sólo cambia una errata en un archivo README. Para esa solicitud pull, ejecutar todos los tests no aporta ningún valor. Por el contrario, los tests defectuosos pueden hacer que tu CI falle, obligándote a reintentar el proceso, potencialmente varias veces, antes de fusionarlo. Esto es una pérdida de tiempo tanto para el desarrollador como para el CI. Con Tests Impact Analysis, una solicitud pull que cambia un archivo README omitiría todos los tests.

## Lo que lo distingue

Algunas soluciones de selección de test no se basan en datos de cobertura del código y lo compensan utilizando Machine Learning. Estos sistemas infieren qué tests son relevantes de una manera probabilística y pueden pasar por alto tests que eran relevantes, provocando fallos de compilación en tu rama por defecto. Las técnicas basadas en Machine Learning también suelen requerir períodos más largos de recopilación de datos antes de que sean capaces de funcionar. Test Impact Analysis empieza a funcionar inmediatamente después de recopilar una línea de base de cobertura del código.

Mientras que otras soluciones de tests calculan el Test Imapact Analysis utilizando también la cobertura del código, sólo tienen en cuenta la última diferencia de confirmación a la hora de evaluar qué tests ejecutar. Por ejemplo, esto es un problema con las solicitudes pull de GitHub, que sólo tienen en cuenta el estado CI de la última confirmación para permitir la fusión. Como resultado, debes ejecutar todas las confirmaciones a través de CI o arriesgarse a saltarse tests que deberían haberse ejecutado.

Test Impact Analysis aprovecha la información de cobertura de código por test junto con los datos de [Test Optimization][1] para buscar tests anteriores en todas las confirmaciones anteriores relevantes. La configuración de Test Impact Analysis es una operación de un solo clic en la mayoría de los lenguajes, y los resultados son exactos y más precisos que otros métodos.

## Cómo funciona la selección de tests

Al activar Test Impact Analysis, la cobertura de código por test (o por conjunto, dependiendo del marco de trabajo) se recopila de forma transparente y se envía a Datadog.

El backend de Datadog utiliza esa información para buscar a través de ejecuciones de tests anteriores para determinar si un test dado puede ser omitido. Si Datadog tiene un registro del test superado en una confirmación en la que los archivos cubiertos y [rastreados][2] son idénticos a la confirmación actual, el test se omite. Esto se utiliza como test de que el cambio de código no afectó al test.

{{< img src="continuous_integration/itr_test_selection_diagram.png" alt="Un diagrama de Venn que explica qué hace que un test sea omitible en el proceso de selección de Test Impact Analysis" style="width:80%;">}}

A continuación, la librería de Datadog elimina los tests marcados como no omitibles en la fuente de la lista de tests omitibles. A continuación, procede a ejecutar los tests, pero ordena al marco de tests que omita los que están en la lista de tests omitibles.

{{< img src="continuous_integration/itr_skipped_test_run.png" alt="Un test omitible por Test Impact Analysis" style="width:80%;">}}

Veamos un ejemplo concreto:

{{< img src="continuous_integration/itr_example_3.png" alt="Un diagrama que explica cómo una solicitud pull con múltiples confirmaciones para las ramas principales y características pueden tener diferentes resultados con archivos rastreados" style="width:80%;">}}

El diagrama anterior muestra una rama de desarrollador que se ramifica desde `main` y tiene varias confirmaciones. En cada confirmación, el CI ha estado ejecutando dos tests (A y B) con resultados diferentes.

- **Commit 1** ejecutó ambos tests. Esta confirmación contenía cambios que afectaban a los archivos rastreados y a los archivos cubiertos tanto de A como de B.
- **Commit 2** ejecutó ambos tests de nuevo:
  - Test A tiene que ejecutarse porque, aunque esta confirmación no afectó al test A (no hay cambios en los archivos rastreados ni en los archivos cubiertos), no hay ejecuciones de tests anteriores que hayan pasado el test A. Dado que Test Impact Analysis no puede garantizar un estado de aprobación si se ejecutara, no lo omite. Esta vez, el test se aprueba, lo que indica que se trata de un test defectuoso.
  - El test B se ejecutó tanto porque no hay ningún test anterior ejecutado con éxito para este test, como porque la confirmación 2 cambia archivos que la afectan.
- **Commit 3** ejecuta todos los tests porque se ha modificado un archivo rastreado.
- **Commit 4** ejecuta todos los tests:
  - Test A se ejecuta porque no hay ningún test previo que cumpla todos los criterios: los tests de las confirmaciones 1 y 3 no pueden usarse porque fallaron, y el test de la confirmación 2 no puede usarse porque se han cambiado archivos de seguimiento desde la confirmación 2 hasta la 4.
  - Test B también se ejecuta porque no hay ningún test anterior que cumpla todos los criterios: los tests de las confirmaciones 1 y 2 no pueden utilizarse porque fallaron, y eñ test de la confirmación 3 no puede utilizarse porque los archivos cubiertos para el test B se modificaron entre las confirmaciones 3 y 4.
- **Commit 5** fue capaz de omitir un test:
  - El test A podría omitirse gracias a la ejecución del test en la confirmación 4. Este test cumple con todos los criterios necesarios: los archivos rastreados no han cambiado entre las confirmaciones 4 y 5, tampoco los archivos afectados por el test A, y el test A aprobó la confirmación 4. Por lo tanto, si se ejecutara el test, se ejercitarían las mismas rutas de código que en la confirmación 4, y no proporcionaría ninguna información nueva en el CI. Por lo tanto, si se ejecutara el test, ejercitaría las mismas rutas de código que en la confirmación 4, y no proporcionaría ninguna información nueva en el CI. En este caso, omitir el test A tiene dos ventajas: la rentabilidad de no ejecutar el test y el aumento de la fiabilidad del CI, ya que el test A es defectuoso.
  - Test B tuvo que ejecutarse porque sus archivos cubiertos cambiaron en la confirmación 5.
- **Commit 6** pudo omitir ambos tests:
  - Test A podría omitirse gracias al test realizado en la confirmación 4.
  - Test B podría omitirse gracias al test realizado en la confirmación 5.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/
[2]: /es/tests/test_impact_analysis/#tracked-files
