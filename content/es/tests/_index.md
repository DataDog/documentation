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
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centro de Aprendizaje
  text: Introducción a Test Optimization
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la Versión
  text: ¡Consulta las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación)
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Monitorea tus pipelines de CI y pruebas con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Soluciona problemas de pruebas de extremo a extremo con CI Visibility y RUM
- link: /monitors/types/ci/
  tag: Documentación
  text: Aprende sobre Monitores de Pruebas de CI
- link: /tests/flaky_test_management/
  tag: Documentación
  text: Aprende sobre la Gestión de Pruebas Inestables
- link: /tests/browser_tests/
  tag: Documentación
  text: Aprende cómo instrumentar tus pruebas de navegador con RUM
- link: /tests/troubleshooting/
  tag: Documentación
  text: Aprende cómo solucionar problemas de Test Optimization
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Soluciona problemas más rápido con la integración de Código Fuente de GitLab
    en Datadog
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: Blog
  text: Implementa verificaciones de calidad de datos de dbt con dbt-expectations
title: Test Optimization en Datadog
---
{{< learning-center-callout header="Intenta comenzar con Test Optimization en el Centro de Aprendizaje" btn_title="Inscríbete Ahora" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  Aprende cómo acelerar tus pipelines de CI configurando el monitoreo de pruebas, identificando pruebas inestables y utilizando el Análisis de Impacto de Pruebas para ejecutar solo las pruebas que importan.
{{< /learning-center-callout >}}


## Resumen {#overview}

[Test Optimization][1] proporciona una vista de prueba primero sobre la salud de tu CI al mostrar métricas importantes y resultados de tus pruebas. Puede ayudarte a investigar problemas de rendimiento y fallos de pruebas que son más relevantes para tu trabajo, enfocándose en el código del que eres responsable, en lugar de los pipelines que ejecutan tus pruebas.

## Configuración {#setup}

Selecciona una opción para configurar Test Optimization en Datadog:

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="subir pruebas junit a datadog" >}}
{{< /card-grid >}}

</br>

Además de las pruebas, Test Optimization proporciona visibilidad sobre toda la fase de pruebas de tu proyecto.

### Características soportadas {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM&#8209;basado |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Resultados precisos de tiempo/duraciones" >}}Resolución en microsegundos en el tiempo de inicio de la prueba y duración.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Trazas distribuidas en pruebas de integración" >}}Las pruebas que realizan llamadas a servicios externos instrumentados con Datadog muestran la traza distribuida completa en los detalles de su prueba.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Informes basados en agentes" >}}Capacidad para informar información de pruebas a través del Agente de Datadog.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Informes sin agente" >}}Capacidad para informar información de pruebas sin el Agente de Datadog.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Visibilidad a nivel de conjunto de pruebas" >}}Visibilidad sobre todo el proceso de prueba, incluyendo sesión, módulo, conjuntos de pruebas y pruebas.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manual" >}}Capacidad para crear eventos de CI Visibility programáticamente para frameworks de prueba que no son compatibles con la instrumentación automática de Datadog.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Propietario de código por prueba" >}}Detección automática del propietario de un archivo de prueba basado en el archivo CODEOWNERS.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (parcialmente)  |
| {{< ci-details title="Inicio/final del código fuente" >}}Informe automático de las líneas de inicio y final de una prueba.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (solo inicio) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (solo inicio) |
| {{< ci-details title="Información de CI y git" >}}Colección automática de metadatos del entorno de git y CI, como proveedor de CI, SHA de commit de git o URL de pipeline.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Carga de metadatos de git" >}}Carga automática de información del árbol de git utilizada para <a href="/tests/test_impact_analysis">Test Impact Analysis</a>.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis *" >}}Capacidad para habilitar <a href="/tests/test_impact_analysis">Test Impact Analysis</a>, que omite inteligentemente pruebas basadas en la cobertura de código y metadatos de git.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Soporte de cobertura de código" >}}Capacidad para reportar métricas de <a href="/tests/code_coverage">cobertura total de código</a>.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (manual)   |
| {{< ci-details title="Soporte para pruebas de referencia" >}}Detección automática de estadísticas de rendimiento para pruebas de referencia.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Pruebas parametrizadas" >}}Detección automática de pruebas parametrizadas.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Detección temprana de fallos *" >}}Automáticamente <a href="/tests/flaky_test_management/early_flake_detection">reintentar nuevas pruebas</a> para detectar inestabilidad.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Reintentos automáticos de pruebas *" >}}Automáticamente <a href="/tests/flaky_test_management/auto_test_retries">reintentar pruebas fallidas</a> hasta N veces para evitar que la construcción falle debido a inestabilidad en las pruebas.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Reproducción de pruebas fallidas *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Acceder a información de variables locales</a> en pruebas fallidas reintentadas.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Integración de Selenium RUM" >}}Automáticamente <a href="/tests/browser_tests">vincula sesiones del navegador a casos de prueba</a> al probar aplicaciones instrumentadas con RUM.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* La función es opcional y debe habilitarse en la página de [**Test Optimization Settings**][2].

## Configuraciones predeterminadas {#default-configurations}

Las pruebas evalúan el comportamiento del código para un conjunto de condiciones dadas. Algunas de esas condiciones están relacionadas con el entorno donde se ejecutan las pruebas, como el sistema operativo o el sistema de ejecución utilizado. El mismo código ejecutado bajo diferentes conjuntos de condiciones puede comportarse de manera diferente, por lo que los desarrolladores suelen configurar sus pruebas para ejecutarse en diferentes conjuntos de condiciones y validar que el comportamiento sea el esperado en todos ellos. Este conjunto específico de condiciones se llama *configuración*.

En Test Optimization, una prueba con múltiples configuraciones se trata como múltiples pruebas, con una prueba separada para cada configuración. En el caso de que una de las configuraciones falle pero las otras pasen, solo esa combinación específica de prueba y configuración se marca como fallida.

Por ejemplo, supongamos que estás probando un solo commit y tienes una prueba en Python que se ejecuta contra tres versiones diferentes de Python. Si la prueba falla para una de esas versiones, esa prueba específica se marca como fallida, mientras que las otras versiones se marcan como pasadas. Si vuelves a intentar las pruebas contra el mismo commit y ahora la prueba para las tres versiones de Python pasa, la prueba con la versión que falló anteriormente se marca ahora como pasada e inestable, mientras que las otras dos versiones permanecen pasadas, sin detectar inestabilidad.

### Atributos de configuración de prueba {#test-configuration-attributes}

Cuando ejecutas tus pruebas con Test Optimization, la biblioteca detecta e informa información sobre el entorno donde se ejecutan las pruebas como etiquetas de prueba. Por ejemplo, el nombre del sistema operativo, como `Windows` o `Linux`, y la arquitectura de la plataforma, como `arm64` o `x86_64`, se añaden como etiquetas en cada prueba. Estos valores se muestran en el commit y en las páginas de resumen de ramas cuando una prueba falla o es inestable para una configuración específica pero no para otras.

Las siguientes etiquetas se recopilan automáticamente para identificar configuraciones de prueba, y algunas pueden aplicarse solo a plataformas específicas:

| Nombre de la etiqueta               | Descripción                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Nombre del sistema operativo donde se ejecutan las pruebas.           |
| `os.family`            | Familia del sistema operativo donde se ejecutan las pruebas.         |
| `os.version`           | Versión del sistema operativo donde se ejecutan las pruebas.        |
| `os.architecture`      | Arquitectura del sistema operativo donde se ejecutan las pruebas.   |
| `runtime.name`         | Nombre del sistema de ejecución para las pruebas.                       |
| `runtime.version`      | Versión del sistema de ejecución.                                  |
| `runtime.vendor`       | Proveedor que construyó la plataforma de ejecución donde se ejecutan las pruebas. |
| `runtime.architecture` | Arquitectura del sistema de ejecución para las pruebas.               |
| `device.model`         | El modelo de dispositivo que ejecuta las pruebas.                             |
| `device.name`          | Nombre del dispositivo.                                             |
| `ui.appearance`        | Estilo de interfaz de usuario.                                           |
| `ui.orientation`       | Orientación en la que se ejecuta la interfaz de usuario.                                   |
| `ui.localization`      | Idioma de la aplicación.                                    |

### Configuraciones de prueba parametrizadas {#parameterized-test-configurations}

Cuando ejecutas pruebas parametrizadas, la biblioteca detecta e informa sobre los parámetros utilizados. Los parámetros son parte de la configuración de prueba, por lo que el mismo caso de prueba ejecutado con diferentes parámetros se considera como dos pruebas diferentes en Test Optimization.

Si un parámetro de prueba es no determinista y tiene un valor diferente cada vez que se ejecuta una prueba, cada ejecución de prueba se considera una nueva prueba en Test Optimization. Como consecuencia, algunas características del producto pueden no funcionar correctamente para tales pruebas: historial de ejecuciones, detección de inestabilidad, Test Impact Analysis, y otras.

Algunos ejemplos de parámetros de prueba no deterministas son:

- fecha actual
- un valor aleatorio
- un valor que depende del entorno de ejecución de la prueba (como una ruta de archivo absoluta o el nombre de usuario actual)
- un valor que no tiene una representación de cadena determinista (por ejemplo, una instancia de una clase de Java cuyo `toString()` método no está sobreescrito)

Evita usar parámetros de prueba no deterministas. En caso de que esto no sea posible, algunos marcos de prueba proporcionan una forma de especificar una representación de cadena determinista para un parámetro no determinista (como sobreescribir el nombre de visualización del parámetro).

## Configuraciones personalizadas {#custom-configurations}

Hay algunas configuraciones que no pueden ser identificadas y reportadas automáticamente porque pueden depender de variables de entorno, argumentos de ejecución de prueba u otros enfoques que los desarrolladores utilizan. Para esos casos, debe proporcionar los detalles de configuración a la biblioteca para que Test Optimization pueda identificarlos correctamente.

Defina estas etiquetas como parte de la `DD_TAGS` variable de entorno usando el prefijo `test.configuration`.

Por ejemplo, las siguientes etiquetas de configuración de prueba identifican una configuración de prueba donde el tiempo de respuesta del disco es lento y la memoria disponible es baja:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Todas las etiquetas con el prefijo `test.configuration` se utilizan como etiquetas de configuración, además de las que se recopilan automáticamente.

Nota: Las etiquetas `test.configuration` anidadas, como `test.configuration.cpu.memory`, no son compatibles.

Para filtrar utilizando estas etiquetas de configuración, [debe crear facetas para estas etiquetas][3].

## Mejore su flujo de trabajo de desarrollador {#enhance-your-developer-workflow}

{{< whatsnext desc="Integre Test Optimization con herramientas para informar datos de Code Coverage, mejore las pruebas de navegador con RUM y acceda a información a través de plataformas al agilizar la identificación y resolución de problemas en su ciclo de desarrollo." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Mejorando los Flujos de Trabajo de Desarrolladores con Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Aprenda sobre Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumente las pruebas de navegador Cypress con Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrumente las pruebas Swift con RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Utilice datos de pruebas de CI {#use-ci-tests-data}

{{% ci-information-collected %}}

Al crear un [dashboard][4] o un [notebook][5], puede utilizar datos de pruebas de CI en su consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para más información, consulte [Dashboards][6] y la [documentación de Notebooks][7].

## Alerte sobre datos de pruebas {#alert-on-test-data}

Cuando esté evaluando pruebas fallidas o inestables, o el rendimiento de una prueba de CI, puede exportar su consulta de búsqueda en el [Test Optimization Explorer][8] a un [CI Test monitor][9] haciendo clic en el botón **Export**.

##  Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /es/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /es/dashboards
[7]: /es/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /es/monitors/types/ci/