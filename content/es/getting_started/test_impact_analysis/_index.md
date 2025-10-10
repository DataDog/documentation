---
algolia:
  tags:
  - test impact analysis
  - intelligent test runner
  - test de ci
  - tests de ci
  - flaky test
  - flaky tests
aliases:
- /es/getting_started/intelligent_test_runner
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Agiliza tus tests de CI con Datadog Intelligent Test Runner
- link: /test_impact_analysis/
  tag: Documentación
  text: Más información sobre Test Impact Analysis
- link: /tests/code_coverage/
  tag: Documentación
  text: Más información sobre la cobertura del código
title: Empezando con Test Impact Analysis
---

<div class="alert alert-danger"> Esta función se conocía anteriormente como Intelligent Test Runner, y algunas etiquetas (tags) todavía contienen "itr".</div>

## Información general

[Test Impact Analysis][1] permite omitir tests irrelevantes no afectados por un cambio de código.

Con la [optimización de test][2], los equipos de desarrollo pueden configurar Test Impact Analysis para sus servicios de test, establecer ramas a excluir (como la rama por defecto), y definir archivos para ser rastreados (lo que desencadena ejecuciones completas de todos los tests cuando cualquier archivo rastreado cambia).

{{< img src="/continuous_integration/itr_test_selection_diagram.png" alt="Un diagrama de Venn de los componentes de Test Impact Analysis: archivos rastreados, ramas excluidas y tests omitidos" caption="Un diagrama de Venn que muestra cómo Test Impact Analysis define un test excluido al utilizar archivos rastreados, ramas excluidas y tests exitosos." style="width:65%" >}}

Configura y habilita Test Impact Analysis para tus servicios de test con el fin de reducir el tiempo de test innecesario, mejorar la eficiencia de los tests de CI y reducir los costes, manteniendo al mismo tiempo la fiabilidad y el rendimiento a través de tus entornos de CI 

Test Impact Analysis utiliza [datos de cobertura de código][5] para determinar si los tests deben omitirse o no. Para más información, consulte [Cómo funciona Test Impact Analysis en Datadog][10].

## Configuración de Test Impact Analysis

Para configurar Test Impact Analysis, consulta la siguiente documentación para tu lenguaje de programación:

{{< partial name="continuous_integration/ci-itr-setup.html" >}}

</br>

## Activar Test Impact Analysis

Para activar Test Impact Analysis:

1. Ve a [**Software Delivery** > **Test Optimization** > **Settings**][3] (Entrega de software > Optimización de test > Configuración). 
1. En la pestaña **Test Services** (Servicios de test), haz clic en **Configure** (Configurar) en la columna `Test Impact Analysis` de un servicio.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration.png" alt="Habilitar Test Impact Analysis para un servicio de test en una página de configuración del Servicio de test" style="width:100%" >}}

Debes tener el permiso `Test Impact Analysis Activation Write`. Para obtener más información, consulta la [documentación de permisos de rol de Datadog][4].

Desactivar Test Impact Analysis en las ramas críticas (como la rama predeterminada) asegura una cobertura completa de los tests, mientras que activarlo para que se ejecute en las ramas de características o desarrollo ayuda a maximizar la eficacia de los tests.

## Configuración de Test Impact Analysis

Puedes configurar Test Impact Analysis para evitar que se omitan tests específicos. Estos tests se conocen como *tests no omitibles*, y se ejecutan independientemente de los [datos de cobertura de código][5]. 

Para configurar Test Impact Analysis:

1. Para el test en el que desea activarlo, haz clic en **Configure** (Configurar).
1. Haz clic en el conmutador **Status** (Estado) para activar Test Impact Analysis.
1. Especifica las ramas que deseas excluir (normalmente la rama por defecto de un repositorio). Test Impact Analysis no omite los tests de estas ramas.
1. Especifica los directorios de archivos y los archivos que deben rastrearse (por ejemplo, `documentation/content/**` o `domains/shopist/apps/api/BUILD.bazel`). Test Impact Analysis ejecuta todos los tests CI cuando cambia alguno de estos archivos rastreados.
1. Haz clic en **Save Settings** (Guardad ajustes).

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config.png" alt="Habilitar Test Impact Analysis, proporcionar ramas para Test Impact Analysis a excluir y añadir archivos para Test Impact Analysis a fin de rastrear y ejecutar tests cuando suceda cualquier cambio" style="width:100%" >}}

Una vez que hayas configurado el Test Impact Analysis en un servicio de test, ejecuta un conjunto de tests en tu rama por defecto. Esto establece una línea base para que Test Impact Analysis omita con precisión tests irrelevantes en futuras confirmaciones. 

## Utilizar los datos de Test Impact Analysis

Explora los datos recopilados al activar Test Impact Analysis, como el ahorro de tiempo logrado al omitir tests, así como el uso que hace tu organización de Test Impact Analysis, para mejorar tu eficiencia de CI.

{{< img src="/getting_started/intelligent_test_runner/dashboard.png" alt="Dashboard predefinido que muestra información sobre el tiempo que ahorran los tests omitidos por Test Impact Analysis y el uso de tu organización de Test Impact Analysis" style="width:100%" >}}

Puedes crear [dashboards][6] para visualizar tus métricas de tests, o utilizar un [dashboard predefinido][7] que contenga widgets poblados con datos recopilados por Test Impact Analysis para ayudar a identificar áreas de mejora con patrones de uso y tendencias. 

## Examinar los resultados en Test Optimization Explorer

[Test Optimization Explorer][8] permite crear visualizaciones y filtrar tramos (spans) de tests a partir de los datos recopilados en Test Optimization y Test Impact Analysis. Cuando Test Impact Analysis está activo, muestra la cantidad de tiempo ahorrado en cada sesión de test o confirmación. Las barras de duración se vuelven de color morado para indicar la omisión de tests activos.

{{< tabs >}}
{{% tab "Sesión" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Session` para empezar a filtrar los resultados de tu tramo de sesión de test.

{{< img src="/getting_started/intelligent_test_runner/itr_sessions.png" alt="Resultados de sesión de test en Test Optimization Explorer filtrados en tests omitidos por Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asession

{{% /tab %}}
{{% tab "Módulo" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Module` para empezar a filtrar los resultados de tu tramo de módulo de test.

{{< img src="/getting_started/intelligent_test_runner/itr_modules.png" alt="Resultados de módulo de test en Test Optimization Explorer filtrados en tests omitidos por Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Amodule

{{% /tab %}}
{{% tab "Conjunto" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Suite` para empezar a filtrar los resultados de tu tramo de conjunto de tests.

{{< img src="/getting_started/intelligent_test_runner/itr_suites.png" alt="Resultados de conjunto de tests en Test Optimization Explorer filtrados en tests omitidos por Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Asuite

{{% /tab %}}
{{% tab "Test" %}}

Ve a [**Software Delivery** > **Test Optimization** > **Test Runs**][101] (Entrega de software > Test Optimization > Ejecuciones de tests) y selecciona `Test` para empezar a filtrar los resultados de tu tramo de tests.

{{< img src="/getting_started/intelligent_test_runner/itr_tests.png" alt="Resultados de tests en Test Optimization Explorer filtrados en tests omitidos por Test Impact Analysis" style="width:100%" >}}

[101]: https://app.datadoghq.com/ci/test-runs?query=test_level%3Atest

{{% /tab %}}
{{< /tabs >}}

Utiliza las siguientes [facetas][9] predefinidas de Test Impact Analysis para personalizar la consulta de búsqueda:

Cobertura de código activada
: indica si el rastreo de la cobertura de código estaba activo durante la sesión de test.

Omitido por ITR
: búmero de tests omitidos durante la sesión por Test Impact Analysis.

Salto de tests activado
: indica si se ha activado Test Impact Analysis para la sesión de test.

Tipo de omisión de test
: el método o criterio utilizado por el Test Impact Analysis para determinar qué tests omitir.

Tests omitidos
: recuento total de tests que no se ejecutaron durante la sesión de test, que puede incluir tests que se configuraron para omitirse o que se establecieron como exclusiones manuales.

Tiempo ahorrado
: el tiempo ahorrado para la sesión por el uso de Test Impact Analysis.

Por ejemplo, para filtrar las ejecuciones de sesiones de test que tienen `Test Skipping Enabled`, puedes utilizar `@test.itr.tests_skipping.enabled:true` en la consulta de búsqueda. 

{{< img src="/getting_started/intelligent_test_runner/session_run.png" alt="Un panel lateral que muestra la primera sesión de test en el que la característica de omisión de test para Test Impact Analysis" style="width:100%" >}}

A continuación, haz clic en la ejecución de una sesión de test y ve la cantidad de tiempo que ha ahorrado Test Impact Analysis en la sección **Test Session Details** (Detalles de la sesión de test) del panel lateral de la sesión de test.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/test_impact_analysis/
[2]: /es/tests/
[3]: https://app.datadoghq.com/ci/settings/test-service
[4]: /es/account_management/rbac/permissions/
[5]: /es/tests/code_coverage
[6]: /es/dashboards/
[7]: https://app.datadoghq.com/dash/integration/30941/ci-visibility---intelligent-test-runner
[8]: /es/tests/explorer/
[9]: /es/continuous_integration/explorer/facets/?tab=testruns
[10]: /es/tests/test_impact_analysis/how_it_works/