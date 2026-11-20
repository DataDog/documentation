---
algolia:
  tags:
  - test visibility
  - ci test
  - ci tests
  - flaky test
  - flaky tests
  - test run
  - test runs
  - test span
  - test spans
aliases:
- /es/getting_started/test_visibility
description: Comprenda el rendimiento de las pruebas e identifique pruebas inestables,
  regresiones de rendimiento y fallas en los entornos de CI.
further_reading:
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Solucione problemas de pruebas de extremo a extremo con CI Test Visibility
    y RUM
- link: /tests/
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /tests/flaky_test_management/
  tag: Documentación
  text: Obtenga información sobre Flaky Test Management
- link: /tests/developer_workflows
  tag: Documentación
  text: Obtenga información sobre cómo mejorar los flujos de trabajo de los desarrolladores
    en Datadog
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centro de aprendizaje
  text: Introducción a Test Optimization
title: Introducción a Test Optimization
---
## Descripción general {#overview}

[Test Optimization][1] le permite comprender mejor su postura de prueba, identificar confirmaciones que introducen pruebas inestables, identificar regresiones de rendimiento y solucionar problemas complejos de fallas en las pruebas. 

{{< img src="getting_started/test_visibility/list.png" alt="Lista de servicios de pruebas en Test Optimization" style="width:100%;" >}}

Puede visualizar el rendimiento de sus ejecuciones de prueba como trazas, donde los tramos representan la ejecución de diferentes partes de la prueba.

Test Optimization permite a los equipos de desarrollo depurar, optimizar y acelerar las pruebas de software en entornos de CI al proporcionar información sobre el rendimiento, la inestabilidad y las fallas de las pruebas. Test Optimization instrumenta automáticamente cada prueba e integra la selección inteligente de pruebas mediante [Test Impact Analysis][2], lo que mejora la eficiencia de las pruebas y reduce la redundancia. 

Con datos históricos de pruebas, los equipos pueden comprender las regresiones de rendimiento, comparar el resultado de las pruebas de las ramas de funciones con las ramas predeterminadas y establecer puntos de referencia de rendimiento. Al usar Test Optimization, los equipos pueden mejorar sus [flujos de trabajo de desarrollador][14] y mantener una producción de código de calidad. 

## Configure un servicio de pruebas {#set-up-a-test-service}

Test Optimization rastrea el rendimiento y los resultados de sus pruebas de CI, y muestra los resultados de las ejecuciones de prueba.

Para comenzar a instrumentar y ejecutar pruebas, consulte la documentación de uno de los siguientes lenguajes.

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="Go" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="subir pruebas junit a Datadog" >}}
{{< /card-grid >}}

Test Optimization es compatible con cualquier proveedor de CI y no se limita a los admitidos por CI Visibility. Para obtener más información sobre las funciones admitidas, consulte [Test Optimization][3].

## Utilice datos de pruebas de CI {#use-ci-test-data}

Acceda a las métricas de sus pruebas (como ejecuciones, duración, distribución de la duración, tasa de éxito general, tasa de fallas y más) para comenzar a identificar tendencias y patrones importantes utilizando los datos recopilados de sus pruebas en todas las canalizaciones de CI.

{{< img src="getting_started/test_visibility/tests_dashboard.png" alt="Panel de Test Optimization listo para usar en Datadog" style="width:100%;" >}}

Puede crear [paneles][4] para monitorear pruebas inestables, regresiones de rendimiento y fallas que ocurren dentro de sus pruebas. Como alternativa, puede utilizar un [panel listo para usar][5] que contiene widgets con datos recopilados en Test Optimization para visualizar el estado y el rendimiento de sus sesiones, módulos, suites y pruebas de CI.

## Administre las pruebas inestables {#manage-flaky-tests}

Una [prueba inestable][6] es una prueba que muestra un estado de aprobación y de falla en múltiples ejecuciones de prueba para la misma confirmación. Si confirma algo de código y lo ejecuta a través de CI, y una prueba falla, y vuelve a ejecutar el código a través de CI y la misma prueba ahora pasa, esa prueba no es confiable y se marca como inestable.

Puede acceder a la información de pruebas inestables en la sección {{< ui >}}Flaky Tests{{< /ui >}} de la página de resumen de una ejecución de prueba, o como una columna en su lista de servicios de pruebas en la [página {{< ui >}}Test List{{< /ui >}}][7].

{{< img src="getting_started/test_visibility/commit_flaky_tests.png" alt="Pruebas inestables que se pueden ignorar en la sección Commits de una ejecución de prueba" style="width:100%;" >}}

Para cada rama, la lista muestra la cantidad de nuevas pruebas inestables, la cantidad de confirmaciones afectadas por las pruebas, el tiempo total de prueba y los detalles de la última confirmación de la rama. 

Average duration
: El tiempo promedio que tarda la prueba en ejecutarse.

First flaked and Last flaked
: La fecha y los SHA de confirmación de cuando la prueba mostró un comportamiento inestable por primera vez y más recientemente. 

Commits flaked
: La cantidad de confirmaciones en las que la prueba mostró un comportamiento inestable. 

Failure rate
: El porcentaje de ejecuciones de prueba que han fallado para esta prueba desde que se volvió inestable por primera vez. 

Trend
: Una visualización que indica si una prueba inestable fue corregida o si todavía sigue siendo inestable.

Test Optimization muestra los siguientes gráficos para ayudarle a comprender sus tendencias de pruebas inestables y el impacto de sus pruebas inestables en la sección {{< ui >}}Flaky Tests{{< /ui >}} de una confirmación:

New Flaky Test Runs
: Con qué frecuencia se detectan nuevas pruebas inestables.

Known Flaky Test Runs
: Todas las fallas de las pruebas asociadas con las pruebas inestables que se están rastreando. Esto muestra cada vez que una prueba inestable "presenta un comportamiento inestable".

Para ignorar nuevas pruebas inestables para una confirmación en la que haya determinado que las pruebas inestables se detectaron por error, haga clic en una prueba que contenga un valor {{< ui >}}New Flaky{{< /ui >}} con una opción de menú desplegable y haga clic en {{< ui >}}Ignore flaky tests{{< /ui >}}. Para obtener más información, consulte [Gestión de pruebas inestables][8].

## Examine los resultados en el Test Optimization Explorer {#examine-results-in-the-test-optimization-explorer}

El Test Optimization Explorer le permite crear visualizaciones y filtrar spans de prueba utilizando los datos recopilados de sus pruebas. Cada ejecución de prueba se informa como una traza, que incluye tramos adicionales generados por la solicitud de prueba. 

{{< tabs >}}
{{% tab "Sesión" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Test Optimization{{< /ui >}} > {{< ui >}}Test Runs{{< /ui >}}][101] y seleccione {{< ui >}}Session{{< /ui >}} para comenzar a filtrar los resultados de los tramos de su sesión de prueba. 

{{< img src="/getting_started/test_visibility/session.png" alt="Resultados de la sesión de prueba en el Test Optimization Explorer filtrados en el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Módulo" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Test Optimization{{< /ui >}} > {{< ui >}}Test Runs{{< /ui >}}][101] y seleccione {{< ui >}}Module{{< /ui >}} para comenzar a filtrar los resultados de los tramos de su módulo de prueba. 

{{< img src="/getting_started/test_visibility/module.png" alt="Resultados del módulo de prueba en el Test Optimization Explorer filtrados en el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Suite" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Test Optimization{{< /ui >}} > {{< ui >}}Test Runs{{< /ui >}}][101] y seleccione {{< ui >}}Suite{{< /ui >}} para comenzar a filtrar los resultados de los tramos de su conjunto de pruebas. 

{{< img src="/getting_started/test_visibility/suite.png" alt="Resultados del conjunto de pruebas en el Test Optimization Explorer filtrados en el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Prueba" %}}

Navegue a [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Test Optimization{{< /ui >}} > {{< ui >}}Test Runs{{< /ui >}}][101] y seleccione {{< ui >}}Test{{< /ui >}} para comenzar a filtrar los resultados de sus spans de prueba. 

{{< img src="/getting_started/test_visibility/test.png" alt="Resultados de la prueba en el Test Optimization Explorer filtrados en el repositorio Shopist" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

Utilice [facetas][9] para personalizar la consulta de búsqueda e identificar cambios en el tiempo dedicado a cada nivel de su ejecución de prueba.

Una vez que haga clic en una prueba en la página {{< ui >}}Test List{{< /ui >}}, puede ver un gráfico de llama o una lista de tramos en la pestaña {{< ui >}}Trace{{< /ui >}}. 

{{< img src="/getting_started/test_visibility/failed_test_trace.png" alt="Una traza de pila de una ejecución de prueba fallida en la página Test List" style="width:100%" >}}

Puede identificar cuellos de botella en sus ejecuciones de prueba y examinar los niveles individuales clasificados desde el mayor al menor porcentaje de tiempo de ejecución.

## Agregue medidas personalizadas a las pruebas {#add-custom-measures-to-tests}

Puede buscar y administrar eventos de prueba mediante programación utilizando el punto de conexión de CI Visibility Tests API. Para obtener más información, consulte [la documentación de la API][10].

Para mejorar los datos recopilados de sus pruebas de CI, puede agregar mediante programación etiquetas o medidas (como el uso de memoria) directamente a los tramos creados durante la ejecución de la prueba. Para obtener más información, consulte [Agregue medidas personalizadas a sus pruebas][11].

## Cree un monitor de CI {#create-a-ci-monitor}

Alerte a los equipos pertinentes de su organización sobre regresiones en el rendimiento de las pruebas cuando ocurran fallas o aparezcan nuevas pruebas inestables. 

{{< img src="/getting_started/test_visibility/test_monitor.png" alt="Un monitor de pruebas de CI que activa alertas cuando la cantidad de fallas en las pruebas supera una falla" style="width:100%" >}}

Para configurar un monitor que alerte cuando la cantidad de fallas en las pruebas supere un umbral de 1 falla:

1. Navegue a [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][12] y seleccione {{< ui >}}CI{{< /ui >}}. 
1. Seleccione un tipo de monitor común para pruebas de CI para comenzar, por ejemplo: `New Flaky Test` para activar alertas cuando se agreguen nuevas pruebas inestables a su base de código, `Test Failures` para activar alertas por fallas en las pruebas o `Test Performance` para activar alertas por regresiones en el rendimiento de las pruebas, o personalice su propia consulta de búsqueda. En este ejemplo, seleccione la `Branch (@git.branch)` faceta para filtrar sus ejecuciones de prueba en la `main` rama.
1. En la `Evaluate the query over the` sección, seleccione los últimos 15 minutos. 
1. Establezca las condiciones de alerta para que se activen cuando el valor evaluado esté por encima del umbral y especifique los valores para los umbrales de alerta o advertencia, como `Alert threshold > 1`.
1. Defina la notificación del monitor.
1. Establezca los permisos para el monitor.
1. Haga clic en {{< ui >}}Create{{< /ui >}}.

Para obtener más información, consulte la [documentación de CI Monitor][13]. 

## Lecturas adicionales {#further-reading}

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