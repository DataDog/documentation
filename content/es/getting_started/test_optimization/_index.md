---
algolia:
  tags:
  - test visibility
  - test de ci
  - tests de ci
  - flaky test
  - flaky tests
  - ejecución de test
  - tests de funcionamiento
  - Tramo de tests
  - Tramos de tests
aliases:
- /es/getting_started/test_visibility
description: Comprende el rendimiento de los tests e identifica tests fallidos, regresiones
  en el rendimiento y fallos en entornos CI.
further_reading:
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Resolución de problemas en tests de extremo a extremo con CI Test Visibility
    y RUM
- link: /tests/
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /tests/flaky_test_management/
  tag: Documentación
  text: Más información sobre Gestión de tests defectuosos
- link: /tests/developer_workflows
  tag: Documentación
  text: Más información sobre cómo mejorar los flujos de trabajo de los desarrolladores
    en Datadog
title: Empezando con Test Optimization
---

## Información general

[Test Optimization][1] te permite comprender mejor tu postura ante los tests, identificar confirmaciones que introducen tests defectuosos, identificar regresiones de rendimiento y solucionar fallos de tests complejos. 

{{< img src="getting_started/test_visibility/list.png" alt="Lista de servicios de tests en Test Optimization" style="width:100%;" >}}

Puedes visualizar el rendimiento de tus ejecuciones de test como trazas (traces), donde los tramos (spans) representan la ejecución de diferentes partes del test.

Test Optimization permite a los equipos de desarrollo depurar, optimizar y acelerar los tests de software en entornos de CI, al proporcionar información sobre el rendimiento de los tests, los fallos y los errores. Test Optimization instrumenta automáticamente cada test e integra la selección inteligente de tests mediante el [Test Impact Analysis][2], lo que mejora la eficacia de los tests y reduce la redundancia. 

Con los datos históricos de los tests, los equipos pueden comprender las regresiones de rendimiento, comparar el resultado de los tests de las ramas de características con las ramas predeterminadas y establecer puntos de referencia de rendimiento. Gracias a la optimización de tests, los equipos pueden mejorar sus [flujos de trabajo de desarrollo][14] y mantener la calidad del código resultante. 

## Configurar un test de servicio

Test Optimization realiza un seguimiento del rendimiento y los resultados de tus tests CI, y muestra los resultados de las ejecuciones de los tests.

Para empezar a instrumentar y ejecutar tests, consulta la documentación de uno de los siguientes idiomas.

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

Test Optimization es compatible con cualquier proveedor de CI y no se limita a los compatibles con CI Visibility. Para obtener más información sobre las funciones compatibles, consulta [Test Optimization][3].

## Utilizar datos de tests CI

Accede a métricas de tus tests (como ejecuciones, duración, distribución de la duración, tasa global de éxito, tasa de fracaso y más) para empezar a identificar tendencias y patrones importantes utilizando los datos recopilados de tus tests a través de los pipelines de CI.

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Dashboard predefinido de Test Optimization en Datadog" style="width:100%;" >}}

Puedes crear [dashboards][4] para la monitorización de tests defectuosos, regresiones de rendimiento y fallos de tests que ocurran dentro de tus tests. Alternativamente, puedes utilizar un [dashboard predefinido][5] que contiene widgets rellenados con datos recopilados en Test Optimization para visualizar el estado y el rendimiento de tus sesiones de test CI, módulos, conjuntos y tests.

## Gestión de tests defectuosos

Un [test defectuoso][6] es un test que muestra tanto un estado de aprobado como de suspenso en varias ejecuciones de la misma confirmación. Si confirmas un código y lo ejecutas a través de CI, y un test falla, y lo ejecuta a través de CI de nuevo y el mismo test ahora pasa, ese test no es fiable y está marcado como defectuoso.

Puedes acceder a la información de los tests defectuosos en la sección **Tests defectuosos** de la página de resumen de una ejecución de test, o como una columna en tu lista de los servicios de test en la página [**Lista de tests**][7].

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="Los tests defectuosos que se pueden ignorar en la sección Confirmaciones de una ejecución de test" style="width:100%;" >}}

Para cada rama, la lista muestra el número de tests nuevos, el número de confirmaciones realizadas por los tests, el tiempo total de los tests y los detalles de la última confirmación de la rama. 

Duración media
: El tiempo medio de ejecución del test.

Primer error y Último error
: la fecha y el SHA de confirmación de la primera y la última vez que el test mostró un comportamiento defectuoso. 

Confirmación defectuosa
: número de confirmaciones en las que el test ha mostrado un comportamiento defectuoso. 

Tasa de fallos
: el porcentaje de ejecuciones de tests que han fallado para este test desde que se desconfiguró por primera vez.

Tendencia
: visualización que indica si un test defectuoso se ha solucionado o si sigue defectuoso.

Test Optimization muestra los siguientes gráficos para que comprendas las tendencias de tus test defectuosos y el impacto de las mismas en la sección **Test defectuosos** de una confirmación:

Nuevas ejecuciones de test defectuosos
: frecuencia con la que se detectan nuevos tests defectuosos.

Test defectuosos conocidos
: todos los fallos de test asociados con los tests defectuosos que se están rastreando. Se muestra cada vez que un test defectuoso "falla".

Para ignorar nuevos tests defectuosos para una confirmación en la que has determinado que los tests defectuosos se detectaron por error, haz clic en un test que contenga un valor **Nuevo test defectuoso** con una opción desplegable y haz clic en **Ignore flaky tests** (Ignorar tests defectuosos). Para obtener más información, consulta [Gestión de tests defectuosos][8].

## Examina los resultados en el Test Optimization Explorer

Test Optimization Explorer te permite crear visualizaciones y filtrar los tramos de test utilizando los datos recopilados de tus tests. Cada ejecución de test se notifica como una traza, que incluye tramos adicionales generados por la solicitud de test. 

{{< tabs >}}
{{% tab "Sesión" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Session` para empezar a filtrar los resultados de tu tramo de sesión de test.

{{< img src="/getting_started/test_visibility/session.png" alt="Resultados de sesión de test en el Test Optimization Explorer filtrados en el repositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Módulo" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Module` para empezar a filtrar los resultados de tu tramo de módulo de test.

{{< img src="/getting_started/test_visibility/module.png" alt="Resultados de módulo de test en el Test Optimization Explorer filtrados en el repositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Conjunto" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Suite` para empezar a filtrar los resultados de tu tramo de conjunto de tests.

{{< img src="/getting_started/test_visibility/suite.png" alt="Resultados de conjunto de tests en el Test Optimization Explorer filtrados en el repositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Test` para empezar a filtrar los resultados de tu tramo de tests.

{{< img src="/getting_started/test_visibility/test.png" alt="Resultados de tests en el Test Optimization Explorer filtrados en el repositorio de Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

Utiliza [facetas][9] para personalizar la consulta de búsqueda e identificar los cambios en el tiempo empleado en cada nivel de tu ejecución de test.

Una vez que hagas clic en un test en la página **Test List** (Lista de tests), podrás ver una gráfica de llamas o una lista de tramos en la pestaña **Trace** (Traza).

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="Un stack trace de una ejecución de test fallida en la página Lista de tests" style="width:100%" >}}

Puedes identificar cuellos de botella en tus ejecuciones de test y examinar niveles individuales ordenados de mayor a menor porcentaje de tiempo de ejecución.

## Añadir medidas personalizadas a los tests

Puede buscar y gestionar los eventos de test mediante programación utilizando el endpoint de la API de CI Visibility Tests. Para obtener más información, consulta [la documentación de la API][10].

Para mejorar los datos recopilados de tus tests de CI, puedes añadir mediante programación etiquetas (tags) o medidas (como el uso de memoria) directamente a tramos creados durante la ejecución del test. Para obtener más información, consulta [Añadir medidas personalizadas a tus tests][11].

## Crear un monitor de CI

Alerta a los equipos pertinentes de tu organización sobre las regresiones en el rendimiento de los tests cuando se produzcan fallos o aparezcan nuevos tests defectuosos. 

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="Un monitor de test de CI que activa alertas cuando la cantidad de fallos de test supere un fallo" style="width:100%" >}}

Para configurar un monitor que alerte cuando la cantidad de fallos en laos tests supere un umbral de 1 fallo:

1. Ve a [**Monitors** > **New Monitor**][12] (Monitores > Nuevo monitor) y selecciona **CI**. 
1. Selecciona un tipo de monitor común para los tests de CI para empezar, por ejemplo: `New Flaky Test` para activar alertas cuando se añaden nuevos tests defectuosos a tu base de código, `Test Failures` para activar alertas de fallos de test, o `Test Performance` para activar alertas de regresiones de rendimiento de test, o personaliza tu propia consulta de búsqueda. En este ejemplo, selecciona la faceta `Branch (@git.branch)` para filtrar los tests realizados en la rama `main`.
1. En la sección `Evaluate the query over the`, selecciona los últimos 15 minutos. 
1. Configura las condiciones de alerta para que se activen cuando el valor evaluado supere el umbral y especifique valores para los umbrales de alerta o advertencia, como `Alert threshold > 1`.
1. Define la notificación del monitor.
1. Establece permisos para el monitor.
1. Haz clic en **Create** (Crear).

Para más información, consulta la [documentación del monitor de CI][13]. 

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/
[2]: /es/tests/test_impact_analysis
[3]: /es/tests/#supported-features
[4]: /es/dashboards/
[5]: https://app.datadoghq.com/dash/integration/30897/ci-visibility---tests-dashboard
[6]: /es/glossary/?product=ci-cd#flaky-test
[7]: https://app.datadoghq.com/ci/test-services
[8]: /es/tests/flaky_test_management/
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /es/continuous_integration/explorer/facets/?tab=testruns
[10]: /es/api/latest/ci-visibility-tests/
[11]: /es/tests/guides/add_custom_measures/
[12]: https://app.datadoghq.com/monitors/create
[13]: /es/monitors/types/ci/?tab=tests#track-new-flaky-tests
[14]: /es/tests/developer_workflows