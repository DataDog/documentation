---
aliases:
- /es/continuous_integration/guides/find_flaky_tests/
- /es/continuous_integration/guides/flaky_test_management/
- /es/tests/guides/flaky_test_management/
- /es/tests/flaky_test_management/
description: Identificar los tests con errores y poco fiables.
further_reading:
- link: /continuous_integration/tests/
  tag: Documentación
  text: Más información sobre Test Optimization
- link: https://www.datadoghq.com/knowledge-center/flaky-tests/
  tag: Centro de conocimiento
  text: Información general de Flaky Tests
title: Trabajar con tests con errores
---

## Información general

Un test con errores es un test que muestra tanto un estado de aprobado como fallido en múltiples ejecuciones de tests para la misma confirmación. Si confirmas un código y lo ejecutas a través de CI y un test falla, y lo ejecuta de nuevo a través de CI y el test pasa, ese test no es fiable como prueba de código de calidad.

Los tests con errores introducen riesgo e imprevisibilidad en el sistema de CI y en el producto final. Cuando las personas tienen que recordar qué tests tienen errores, pierden la confianza en los resultados del test y se desperdicia una enorme cantidad de tiempo y recursos en reintentos de pipeline.

Para cada rama, la lista muestra el número de nuevos tests con errores introducidos por la confirmación, el número de confirmaciones con errores, el tiempo total del test y los detalles de la última confirmación de la rama.

Utiliza la siguiente información para ayudar a priorizar los con errores:

* **Duración media**: El tiempo medio que tarda en ejecutarse el test.
* **Primer error** y **Último error**: La fecha y el SHA de confirmación de la primera y la última vez que el test mostró un comportamiento defectuoso.
* **Confirmaciones con errores**: El número de confirmaciones en los que el test mostró un comportamiento defectuoso.
* **Porcentaje de fallos**: El porcentaje de ejecuciones de tests que han fallado para este test desde que falló por primera vez.
* **Tendencia**: Una visualización que indica si un test defectuoso se ha reparado o sigue defectuoso.

Una vez que identifiques un fallo en un test que desees corregir, haz clic en el test para ver los enlaces que permiten visualizar la última ejecución fallida del test o la primera ejecución fallida del test.

{{< img src="continuous_integration/flaky_test_options.png" alt="Opciones avanzadas para tests con errores" style="width:100%;">}}

Si un test defectuoso no ha fallado en los últimos 30 días, se lo elimina automáticamente de la tabla. También puedes eliminar manualmente un test defectuoso haciendo clic en el icono de la papelera que aparece al pasar el ratón por encima de la fila tests. Se añadirá de nuevo si vuelve a mostrar un comportamiento defectuoso.

### Tests con errores en la rama predeterminada

La tabla de tests con errores para la rama predeterminada incluye tests que han fallado en la rama predeterminada así como cualquier test que haya mostrado errores en una rama de funciones que se fusionó en la rama predeterminada.

Los tests defectuosos de las ramas de funciones fusionadas se encuentran comprobando qué tests han mostrado defectos en las últimas 5000 confirmaciones utilizando el historial de confirmaciones de Git. El historial de confirmaciones de Git es recopilado por las [bibliotecas de test optimization (optimización de tests)][4] y cargado junto con los resultados de tests cada vez que se ejecuta la fase de test de una confirmación concreta en tu compilación CI.

Limitaciones:
* Si fusionas o reinicias e insertas a la fuerza confirmaciones en tu rama de funciones, los testds defectuosos que se han detectado en esa rama no se muestran en la rama en forma predeterminada porque se ha alterado el historial de confirmaciones.
* Si se detecta un test defectuoso y posteriormente se corrige en la misma rama de funciones, sigue apareciendo como test defectuoso en la rama predeterminada, porque no se puede detectar la corrección del test defectuoso. Sin embargo, [puedes eliminar manualmente ese test defectuoso de la tabla de tests defectuosos][5].

#### Métrica de tests defectuosos 

Para las ramas predeterminadas, una métrica rastrea los tests defectuosos a lo largo del tiempo. Esta métrica se genera cada 30 minutos y cuenta todos los tests defectuosos en la rama predeterminada en ese momento.

Busca esta métrica en el gráfico **Total de tests defectuosos** en la vista de la rama predeterminada:

{{< img src="continuous_integration/flaky_test_metric.png" alt="Métrica de tests defectuosos" style="width:100%;">}}

La métrica también está disponible en [CI Visibility - Dashboard de tests][6].

### Nuevos tests con errores

Los nuevos tests con errores son tests que muestran un comportamiento defectuoso y que no existían previamente en la tabla de tests defectuosos para la rama actual o la rama predeterminada del repositorio.

<div class="alert alert-info">La tabla se limita a los 1000 tests con errores con el mayor número de confirmaciones con errores para el periodo de tiempo seleccionado.</div>

#### Página de ejecuciones de tests

1. Ve a la page (página) [Ejecuciones de tests][2].
2. En la lista de facetas de la barra lateral izquierda, expande la faceta **New Flaky** (Nuevo flaky test) en la sección **Test**, y marca `true`.
Se muestran todas las ejecuciones de test que mostraron un comportamiento defectuoso por primera vez según la definición anterior.

#### Página de ramas

1. En la página [Tests][3], selecciona la vista **Branches** (Ramas).
2. Filtra la tabla para ver las ramas, servicios, o confirmaciones que te interesen.
3. Mira la columna **New Flaky** (Nuevo Flaky Test) para ver el número de nuevos Flaky Tests introducidos por la última confirmación según la definición anterior.

### Ignorar nuevos Flaky Test detectados por error

Puedes ignorar nuevos Flaky Tests para una confirmación concreta si determinas que esos Flaky Tests se detectaron por error. Los tests reaparecerán si la confirmación vuelve a mostrar fallos.

Haz clic en el número **New Flaky** (Nuevo flaky test) y, a continuación, en **Ignore flaky tests** (Ignorar flaky tests).

{{< img src="ci/ignore-new-flaky-tests.png" alt="Ignorar todos los nuevos flaky tests para una confirmación" style="width:100%;">}}

### Flaky tests con error conocidos

Los flaky tests con error conocidos son tests que tienen un comportamiento defectuoso en la rama actual o la rama por defecto del repositorio.

#### Página de ejecuciones de tests

1. Ve a la página [Test Runs][2] (Ejecuciones de tests).
2. En la lista de facetas de la barra lateral izquierda, expande la faceta **Known Flaky** (Flaky test conocido) en la sección **Test**, y marca `true`.
Se muestran las ejecuciones de test que se sabía que eran defectuosas según la definición anterior.

#### Página de ramas

1. En la página [Tests][3], selecciona la vista **Branches** (Ramas).
2. Filtra la tabla para ver las ramas, servicios, o confirmaciones que te interesen.
3. La columna **Failed** (Fallidos) contiene el número de test fallidos y flaky tests conocidos en la última confirmación.

{{< img src="ci/known-flaky-failed-tests.png" alt="Vista de ramas de CI Tests con una rama seleccionada y una casilla te texto en la columna Fallido que muestra 1 test fallido y 1 flaky test conocido" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#flaky-test
[2]: https://app.datadoghq.com/ci/test-runs
[3]: https://app.datadoghq.com/ci/test-repositories?view=branches
[4]: /es/tests/#use-ci-tests-data
[5]: /es/tests/flaky_test_management/#ignore-new-flaky-tests-detected-by-mistake
[6]: https://app.datadoghq.com/dash/integration/ci_app_tests