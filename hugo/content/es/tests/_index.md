---
aliases:
- /es/continuous_integration/explore_tests/
- /es/continuous_integration/guides/test_configurations/
- /es/continuous_integration/integrate_tests/
- /es/continuous_integration/tests/
- /es/tests/repositories/
- /es/tests/search/
cascade:
  algolia:
    rank: 70
    tags:
    - ci test
    - ci tests
    - test optimization
    - test visibility
    - failed test
    - flaky test
    - supported features
  site_support_id: test_optimization
further_reading:
- link: /monitors/types/ci/
  tag: Documentación
  text: Conozca CI Test Monitors
- link: /tests/flaky_test_management/
  tag: Documentación
  text: Obtenga información sobre Flaky Test Management
- link: /tests/browser_tests/
  tag: Documentación
  text: Aprenda a instrumentar sus pruebas de navegador con RUM
- link: /tests/troubleshooting/
  tag: Documentación
  text: Aprenda a solucionar problemas de Test Optimization
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centro de aprendizaje
  text: Introducción a Test Optimization
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Monitoree sus pipelines de CI y sus pruebas con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Solucione problemas de pruebas de extremo a extremo con CI Visibility y RUM
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: Blog
  text: Implemente comprobaciones de calidad de datos de dbt con dbt-expectations
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métricas de éxito para Platform Engineering Teams.
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación)
title: Test Optimization en Datadog
---
{{< callout url=# btn_hidden="true" header="Test Optimization es parte de CI/CD Optimization">}}CI/CD Optimization combina CI Visibility y Test Optimization en una interfaz unificada. Esta página cubre Test Optimization; para conocer las funciones compartidas con CI Visibility, consulte [CI/CD Optimization][1].

[1]: /es/cicd/
{{< /callout >}}

{{< learning-center-callout header="Pruebe Getting Started with Test Optimization en Learning Center" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  Aprenda a acelerar sus pipelines de CI configurando el monitoreo de pruebas, identificando pruebas inestables (flaky tests) y utilizando Test Impact Analysis para ejecutar solo las pruebas que importan.
{{< /learning-center-callout >}}

## Descripción general {#overview}

[Test Optimization][1] proporciona una vista centrada en las pruebas sobre el estado de su CI al mostrar métricas y resultados importantes de sus pruebas. Puede ayudarle a investigar problemas de rendimiento y fallas en las pruebas que son más relevantes para su trabajo, centrándose en el código del que usted es responsable, en lugar de en los pipelines que ejecutan sus pruebas.

## Configuración {#setup}

Seleccione una opción para configurar Test Optimization en Datadog:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="Go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="cargar pruebas JUnit a Datadog" >}}
{{< /card-grid >}}

Si utiliza Bazel para ejecutar pruebas de Go, Java o Python, utilice las [reglas de Bazel para Test Optimization][10] de Datadog.

Además de las pruebas, Test Optimization proporciona visibilidad sobre toda la fase de pruebas de su proyecto.

### Funciones compatibles {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM&#8209;based |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Resultados precisos de tiempo/duración" >}}Resolución en microsegundos en la hora de inicio y duración de la prueba.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Trazas distribuidas en pruebas de integración" >}}Las pruebas que realizan llamadas a servicios externos instrumentados con Datadog muestran la traza distribuida completa en los detalles de sus pruebas.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Informes basados en Agent" >}}Capacidad para enviar información sobre las pruebas a través del Datadog Agent.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Envío de informes Agentless" >}}Capacidad para enviar información sobre las pruebas sin el Datadog Agent.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Visibilidad a nivel de conjunto de pruebas" >}}Visibilidad de todo el proceso de pruebas, incluidas las sesiones, los módulos, los conjuntos de pruebas y las pruebas.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manual" >}}Capacidad para crear programáticamente eventos de CI Visibility para marcos de pruebas que no son compatibles con la instrumentación automática de Datadog.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Propietario del código por prueba" >}}Detección automática del propietario de un archivo de prueba basada en el archivo CODEOWNERS.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (parcialmente)  |
| {{< ci-details title="Inicio/fin del código fuente" >}}Reporte automático de las líneas de inicio y fin de una prueba.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (solo inicio) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (solo inicio) |
| {{< ci-details title="Información de CI y git" >}}Recopilación automática de metadatos del entorno de CI y git, como el proveedor de CI, el SHA del commit de git o la URL del pipeline.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Carga de metadatos de git" >}}Carga automática de la información del árbol de git utilizada para <a href="/tests/test_impact_analysis">Test Impact Analysis</a>.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis *" >}}Capacidad para habilitar <a href="/tests/test_impact_analysis">Test Impact Analysis</a>, que omite pruebas de forma inteligente según la cobertura de código y los metadatos de git.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Soporte de cobertura de código" >}}Capacidad para reportar métricas de <a href="/tests/code_coverage">cobertura de código total</a>.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (manual)   |
| {{< ci-details title="Soporte para pruebas de rendimiento (benchmark)" >}}Detección automática de estadísticas de rendimiento para pruebas de benchmark.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Pruebas parametrizadas" >}}Detección automática de pruebas parametrizadas.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Detección temprana de inestabilidad *" >}}<a href="/tests/flaky_test_management/early_flake_detection">Reintentar automáticamente las pruebas nuevas</a> para detectar su inestabilidad.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Reintentos automáticos de pruebas *" >}}<a href="/tests/flaky_test_management/auto_test_retries">Reintentar automáticamente las pruebas fallidas</a> hasta N veces para evitar que la compilación falle debido a la inestabilidad de las pruebas.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Repetición de pruebas fallidas *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Acceder a la información de las variables locales</a> de las pruebas fallidas que se volvieron a ejecutar.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Integración de RUM de Selenium" >}}<a href="/tests/browser_tests">Vincular automáticamente las sesiones del navegador con los casos de prueba</a> al probar aplicaciones instrumentadas con RUM.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* La función es opcional y debe habilitarse en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][2].

## Configuraciones predeterminadas {#default-configurations}

Las pruebas evalúan el comportamiento del código para un conjunto de condiciones dadas. Algunas de esas condiciones están relacionadas con el entorno donde se ejecutan las pruebas, como el sistema operativo o el entorno de ejecución utilizado. El mismo código ejecutado bajo diferentes conjuntos de condiciones puede comportarse de manera diferente, por lo que los desarrolladores suelen configurar sus pruebas para que se ejecuten en diferentes conjuntos de condiciones y validar que el comportamiento sea el esperado para todas ellas. Este conjunto específico de condiciones se denomina *configuración*.

En Test Optimization, una prueba con múltiples configuraciones se trata como múltiples pruebas, una por cada configuración. En el caso de que una de las configuraciones falle pero las otras pasen, solo esa combinación específica de prueba y configuración se marca como fallida.

Por ejemplo, suponga que está probando un solo commit y tiene una prueba de Python que se ejecuta con tres versiones diferentes de Python. Si la prueba falla para una de esas versiones, esa prueba específica se marca como fallida, mientras que las otras versiones se marcan como aprobadas. Si vuelve a ejecutar las pruebas para el mismo commit y ahora la prueba pasa con las tres versiones de Python, la prueba con la versión que falló anteriormente se marca como aprobada e inestable, mientras que las otras dos versiones permanecen aprobadas, sin que se detecte inestabilidad.

### Atributos de configuración de prueba {#test-configuration-attributes}

Cuando ejecuta sus pruebas con Test Optimization, la biblioteca detecta y proporciona información sobre el entorno donde se ejecutan las pruebas en forma de etiquetas de prueba. Por ejemplo, el nombre del sistema operativo, como `Windows` o `Linux`, y la arquitectura de la plataforma, como `arm64` o `x86_64`, se agregan como etiquetas en cada prueba. Estos valores se muestran en las páginas de resumen del commit y de la rama cuando una prueba falla o es inestable para una configuración específica, pero no para otras.

Las siguientes etiquetas se recopilan automáticamente para identificar las configuraciones de prueba, y algunas pueden aplicarse solo a plataformas específicas:

| Nombre de la etiqueta               | Descripción                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Nombre del sistema operativo donde se ejecutan las pruebas.           |
| `os.family`            | Familia del sistema operativo donde se ejecutan las pruebas.         |
| `os.version`           | Versión del sistema operativo donde se ejecutan las pruebas.        |
| `os.architecture`      | Arquitectura del sistema operativo donde se ejecutan las pruebas.   |
| `runtime.name`         | Nombre del entorno de ejecución de las pruebas.                       |
| `runtime.version`      | Versión del entorno de ejecución.                                  |
| `runtime.vendor`       | Proveedor que creó el entorno de ejecución donde se ejecutan las pruebas. |
| `runtime.architecture` | Arquitectura del entorno de ejecución de las pruebas.               |
| `device.model`         | El modelo del dispositivo que ejecuta las pruebas.                             |
| `device.name`          | Nombre del dispositivo.                                             |
| `ui.appearance`        | Estilo de la interfaz de usuario.                                           |
| `ui.orientation`       | Orientación en la que se ejecuta la interfaz de usuario.                                   |
| `ui.localization`      | Idioma de la aplicación.                                    |

### Configuraciones de prueba parametrizadas {#parameterized-test-configurations}

Cuando ejecuta pruebas parametrizadas, la biblioteca detecta y comunica información sobre los parámetros utilizados. Los parámetros son parte de la configuración de la prueba, por lo que el mismo caso de prueba ejecutado con diferentes parámetros se considera como dos pruebas diferentes en Test Optimization.

Si un parámetro de prueba no es determinista y tiene un valor diferente cada vez que se ejecuta una prueba, cada ejecución de prueba se considera una prueba nueva en Test Optimization. Como consecuencia, es posible que algunas funciones del producto no funcionen correctamente para dichas pruebas: historial de ejecuciones, detección de inestabilidad, Test Impact Analysis y otras.

Algunos ejemplos de parámetros de prueba no deterministas son:

- fecha actual
- un valor aleatorio
- un valor que depende del entorno de ejecución de la prueba (como una ruta de archivo absoluta o el nombre de usuario actual)
- un valor que no tiene una representación de cadena determinista (por ejemplo, una instancia de una clase Java cuyo método `toString()` no está anulado)

Evite usar parámetros de prueba no deterministas. En caso de que esto no sea posible, algunos marcos de prueba proporcionan una forma de especificar una representación de cadena determinista para un parámetro no determinista (como anular el nombre para mostrar del parámetro).

## Configuraciones personalizadas {#custom-configurations}

Existen algunas configuraciones que no se pueden identificar y reportar directamente de forma automática porque pueden depender de variables de entorno, argumentos de ejecución de prueba u otros enfoques que utilizan los desarrolladores. Para esos casos, debe proporcionar los detalles de configuración a la biblioteca para que Test Optimization pueda identificarlos correctamente.

Defina estas etiquetas como parte de la variable de entorno `DD_TAGS` usando el prefijo `test.configuration`.

Por ejemplo, las siguientes etiquetas de configuración de prueba identifican una configuración de prueba donde el tiempo de respuesta del disco es lento y la memoria disponible es baja:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Todas las etiquetas con el prefijo `test.configuration` se usan como etiquetas de configuración, además de las recopiladas automáticamente.

Nota: Las etiquetas `test.configuration` anidadas, como `test.configuration.cpu.memory`, no son compatibles.

Para filtrar usando estas etiquetas de configuración, [debe crear facetas para estas etiquetas][3].

## Mejore su flujo de trabajo de desarrollador {#enhance-your-developer-workflow}

{{< whatsnext desc="Integre Test Optimization con herramientas para reportar datos de Code Coverage, mejorar las pruebas de navegador con RUM y acceder a información en todas las plataformas mediante la optimización de la identificación y resolución de problemas en su ciclo de desarrollo." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Mejora de los flujos de trabajo de los desarrolladores con Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Obtenga información sobre Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumente las pruebas de navegador de Cypress con Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrumentar pruebas de Swift con RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Use datos de pruebas de CI {#use-ci-tests-data}

{{% ci-information-collected %}}

Al crear un [dashboard][4] o un [notebook][5], puede usar datos de pruebas de CI en su consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulte los [Dashboards][6] y la [documentación de Notebooks][7].

## Alertar sobre datos de prueba {#alert-on-test-data}

Cuando evalúe pruebas fallidas o inestables, o el rendimiento de una prueba de CI, puede exportar su consulta de búsqueda en el [Test Optimization Explorer][8] a un [CI Test monitor][9] haciendo clic en el botón {{< ui >}}Export{{< /ui >}}.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[3]: /es/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /es/dashboards
[7]: /es/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /es/monitors/types/ci/
[10]: /es/tests/setup/bazel/