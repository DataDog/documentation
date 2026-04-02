---
aliases:
- /es/continuous_integration/explore_tests/
- /es/continuous_integration/guides/test_configurations/
- /es/continuous_integration/integrate_tests/
- /es/continuous_integration/tests/
cascade:
  algolia:
    rank: 70
    tags:
    - test ci
    - tests ci
    - optimización de tests
    - visibilidad de tests
    - test fallido
    - flaky test
    - funciones compatibles
  site_support_id: test_optimization
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: ¡Echa un vistazo a las últimas versiones de entrega de software! (Es necesario
    iniciar sesión en la aplicación)
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Monitoriza tus pipelines CI y tests con Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Solución de problemas en tests de extremo a extremo con CI Visibility y RUM
- link: /monitors/types/ci/
  tag: Documentación
  text: Más información sobre monitores de tests de CI
- link: /tests/flaky_test_management/
  tag: Documentación
  text: Más información sobre gestión de tests defectuosos
- link: /tests/browser_tests/
  tag: Documentación
  text: Aprende a Instrumentar tus tests de navegador con RUM
- link: /tests/troubleshooting/
  tag: Documentación
  text: Aprende a solucionar problemas de optimización de tests
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Solucionar problemas más rápidamente con la integración de GitLab Source Code
    en Datadog
title: Optimización de tests en Datadog
---

## Información general

La [optimización de tests][1] ofrece una vista del estado de tu CI que prioriza los tests al mostrar métricas y resultados importantes de tus tests. Puede ayudarte a investigar los problemas de rendimiento y las fallas de tests que son más relevantes para tu trabajo, centrándose en el código del que eres responsable, en lugar de en los procesos que ejecutan tus pruebas.

## Instalación

Selecciona una opción para configurar la optimización de tests en Datadog:

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

Además de los tests, la optimización de tests proporciona visibilidad para toda la fase de tests de tu proyecto.

### Funciones compatibles

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM&#8209;based |       JavaScript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Resultados precisos de tiempo/duración" >}}Resolución de microsegundos en el tiempo de inicio y duración del test.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Trazas distribuidas en tests de integración" >}}Los tests que realizan llamadas a servicios externos instrumentados con Datadog muestran la traza (trace) distribuida completa en tus detalles del test.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Informes basados ​​en el Agent" >}}Capacidad de brindar información de tests a través del Datadog Agent.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Informes sin Agent" >}}Capacidad de brindar información de tests sin el Datadog Agent.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Visibilidad a nivel de conjunto de tests" >}}Visibilidad para todo el proceso de prueba, incluidas sesiones, módulos, conjuntos y tests.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manual" >}}Capacidad de crear mediante programación eventos de visibilidad de CI para frameworks de test que no son compatibles con la instrumentación automática de Datadog.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Propietario de código por test" >}}Detección automática del propietario de un archivo de test basado en el archivo CODEOWNERS.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (parcialmente)  |
| {{< ci-details title="Inicio/fin del código fuente" >}}Informe automático de las líneas de inicio y final de un test.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (solo inicio) | {{< X >}} | {{< X >}} (solo inicio)| {{< X >}} | {{< X >}} | {{< X >}} (solo inicio) |
| {{< ci-details title="CI e información de Git" >}}Recopilación automática de metadatos del entorno de Git y CI, como el proveedor de CI, el SHA de confirmación de Git o la URL del pipeline.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Carga de metadatos de Git" >}}Carga automática de la información del árbol de Git utilizada para el <a href="/tests/test_impact_analysis">Análisis del impacto de los tests</a>.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Análisis del impacto de tests*" >}}Capacidad para habilitar el <a href="/tests/test_impact_analysis">Análisis del impacto de los tests</a>, que omite de forma inteligente los tests en función de la cobertura del código y los metadatos de Git.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Soporte de cobertura de código" >}}Capacidad para brindar información de las métricas de <a href="/tests/code_coverage">cobertura de código total</a>.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (manual)   |
| {{< ci-details title="Soporte de tests de referencia" >}}Detección automática de estadísticas de rendimiento para tests de referencia.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Tests parametrizados" >}}Detección automática de tests parametrizados.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Detección temprana de defectos*" >}}<a href="/tests/flaky_test_management/early_flake_detection">Repetir tests nuevos</a> automáticamente para detectar defectos.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Repetir tests automáticamente*" >}}<a href="/tests/flaky_test_management/auto_test_retries">Repetir tests fallidos</a> automáticamente hasta N veces para evitar que la compilación falle debido a defectos en los tests.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Failed test replay *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Acceder a información local variable</a> en tests fallidos reintentados.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Integración de Selenium RUM" >}}<a href="/tests/browser_tests">Vincular sesiones del navegador a casos de tests</a>automáticamente al probar aplicaciones instrumentadas con RUM.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* Esta función es opcional y debe activarse en la [página **Test Optimization Settings**][2] (Configuración de Test Optimization).

## Configuraciones por defecto

Los tests evalúan el comportamiento del código para un conjunto de condiciones dadas. Algunas de esas condiciones están relacionadas con el entorno en el que se ejecutan los tests, como el sistema operativo o el entorno de ejecución utilizado. El mismo código ejecutado bajo diferentes conjuntos de condiciones puede comportarse de manera diferente, por lo que los desarrolladores generalmente configuran sus tests para que se ejecuten en diferentes conjuntos de condiciones y validan que el comportamiento sea el esperado para todas ellas. Este conjunto específico de condiciones se denomina *configuración*.

En la optimización de tests, un test con varias configuraciones se trata como varios tests con un test independiente para cada configuración. En el caso de que una de las configuraciones falle, pero las otras no, solo esa combinación específica de test y configuración se marca como fallida.

Por ejemplo, supongamos que estás probando una única confirmación y tienes un test de Python que se ejecuta en tres versiones diferentes de Python. Si el test falla en una de esas versiones, ese test específico se marca como fallido, mientras que las otras versiones se marcan como aprobadas. Si repites los tests en la misma confirmación y ahora el test para las tres versiones de Python no falla, el test con la versión que falló anteriormente se marcará como aprobado y con defectos, mientras que las otras dos versiones permanecen aprobadas, sin que se detecte ninguna falla.

### Probar los atributos de configuración

Cuando ejecutas tus tests con la optimización de tests, la biblioteca detecta e informa sobre el entorno en el que se ejecutan los tests como etiquetas (tags) de test. Por ejemplo, el nombre del sistema operativo, como `Windows` o `Linux`, y la arquitectura de la plataforma, como `arm64` o `x86_64`, se agregan como etiquetas en cada test. Estos valores se muestran en las páginas de confirmación y de información general de la rama cuando un test falla o es defectuoso para una configuración específica, pero no para otras.

Las siguientes etiquetas se recopilan automáticamente para identificar configuraciones de test y algunas pueden aplicarse solo a plataformas específicas:

| Nombre de la etiqueta               | Descripción                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Nombre del sistema operativo en el que se ejecutan los tests.           |
| `os.family`            | Familia del sistema operativo donde se ejecutan los tests.         |
| `os.version`           | Versión del sistema operativo donde se ejecutan los tests.        |
| `os.architecture`      | Arquitectura del sistema operativo donde se ejecutan los tests.   |
| `runtime.name`         | Nombre del sistema de ejecución de los tests.                       |
| `runtime.version`      | Versión del sistema de ejecución.                                  |
| `runtime.vendor`       | Proveedor que compiló la plataforma de ejecución en la que se ejecutan los tests. |
| `runtime.architecture` | Arquitectura del sistema de ejecución de los tests.               |
| `device.model`         | El modelo de dispositivo que ejecuta los tests.                             |
| `device.name`          | Nombre del dispositivo.                                             |
| `ui.appearance`        | Estilo de la interfaz de usuario.                                           |
| `ui.orientation`       | Orientación en la que se ejecuta la interfaz de usuario.                                   |
| `ui.localization`      | Lenguaje de la solicitud.                                    |

### Configuraciones de tests parametrizados

Cuando se ejecutan tests parametrizados, la biblioteca detecta y genera información sobre los parámetros utilizados. Los parámetros son parte de la configuración del test, por lo que el mismo caso de test ejecutado con diferentes parámetros se considera como dos pruebas diferentes en la optimización de tests.

Si un parámetro de test no es determinista y tiene un valor diferente cada vez que se ejecuta un test, cada ejecución de test se considera un nuevo test en la optimización de tests. Como consecuencia, es posible que algunas funciones del producto no funcionen correctamente para dichos tests: historial de ejecuciones, detección de defectos, análisis del impacto de los tests y otras.

Algunos ejemplos de parámetros de test no deterministas son:

- fecha actual
- un valor aleatorio
- un valor que depende del entorno de ejecución del test (como una ruta de archivo absoluta o el nombre de usuario actual)
- un valor que no tiene una representación de cadena determinista (por ejemplo, una instancia de una clase Java cuyo método `toString()` no se anula)

Evita utilizar parámetros de test no deterministas. En caso de que esto no sea posible, algunos frameworks de test ofrecen una forma de especificar una representación de cadena determinista para un parámetro no determinista (como anular el nombre de visualización del parámetro).

## Configuraciones personalizadas

Hay algunas configuraciones que no se pueden identificar directamente ni informar de forma automática porque pueden depender de variables de entorno, argumentos de ejecución de tests u otros enfoques que utilizan los desarrolladores. En esos casos, debes proporcionar los detalles de configuración a la biblioteca para que la optimización de tests pueda identificarlos correctamente.

Define estas etiquetas como parte de la variable de entorno `DD_TAGS` con el prefijo `test.configuration`.

Por ejemplo, las siguientes etiquetas de configuración de test identifican una configuración de test donde el tiempo de respuesta del disco es lento y la memoria disponible es baja:

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Todas las etiquetas con el prefijo `test.configuration` se utilizan como etiquetas de configuración, además de las recopiladas automáticamente.

Nota: No se admiten las etiquetas `test.configuration` anidadas, como `test.configuration.cpu.memory`.

Para filtrar utilizando estas etiquetas de configuraciones, [debes crear facetas para estas etiquetas][3].

## Mejora el flujo de trabajo de tu desarrollador

{{< whatsnext desc="Integrar Test Optimization con herramientas para informar datos de cobertura de código, mejorar tests de navegador con RUM y acceder a información entre plataformas al mejorar la identificación de problemas y la resolución en tu ciclo de desarrollo." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Mejorar los procesos de desarrollo con Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Obtén información sobre Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumentar tests de navegador de Cypress con Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrumentar tests de Swift con RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Utilizar los datos de los tests CI

{{% ci-information-collected %}}

Al crear un [dashboard][4] o un [notebook][5], puedes utilizar datos de tests CI en tu consulta de búsqueda, lo que actualiza las opciones del widget de visualización. Para obtener más información, consulta la documentación de [Dashboards][6] y [Notebooks][7].

## Alertas sobre los datos de los tests

Cuando estés evaluando tests fallidos o defectuosos, o el rendimiento de un test CI, puedes exportar tu consulta de búsqueda en el [Explorador de optimización de tests][8] a un [monitor de tests CI][9] haciendo clic en el botón **Export**.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /es/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /es/dashboards
[7]: /es/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /es/monitors/types/ci/