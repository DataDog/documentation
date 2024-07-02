---
description: Aprende a buscar y filtrar tus ejecuciones de prueba en el Explorador
  de visibilidad de pruebas.
further_reading:
- link: /continuous_integration/tests/
  tag: Documentación
  text: Explorar los datos de las pruebas para encontrar y corregir pruebas con problemas
- link: https://www.datadoghq.com/blog/configure-pipeline-alerts-with-ci-monitors/
  tag: Blog
  text: Configurar alertas de pipeline con los monitores de CI de Datadog
title: Explorador de visibilidad de pruebas
---

## Información general

El Explorador de visibilidad de pruebas permite [buscar y filtrar](#search-and-filter), [visualizar](#visualize) y [exportar](#export) ejecuciones de prueba en múltiples niveles con cualquier etiqueta (tag).

Ve a [**Software Delivery** (Entrega de software) > **Test Visibility** (Visibilidad de pruebas) > **Test Runs** (Ejecuciones de prueba)][6] para ver los resultados de las pruebas de CI en los siguientes niveles: **Session** (Sesión), **Module** (Módulo), **Suite** (Conjunto) y **Test** (Prueba).

{{< img src="/continuous_integration/test_runs.png" text="Página de Ejecuciones de prueba" style="width:100%" >}}

## Facetas comunes

El panel **Test** (Prueba) de la izquierda enumera las facetas predeterminadas que se pueden utilizar para buscar ejecuciones de prueba.

| Faceta | Descripción |
|---|---|
| Estado de la prueba | El resultado de la prueba: `Passed`, `Failed` o `Skipped`. |
| Duración | El tiempo que tarda en completarse la prueba. |
| Servicio de pruebas | El [servicio de pruebas][12] equipado con CI Visibility. |
| Nombre completo de la prueba | Un identificador de una prueba que incluye el nombre de la prueba, el nombre del conjunto de prueba y la configuración o el parámetro si está presente. |
| Nombre de la prueba | Un nombre conciso de un caso de prueba. Se define en la propia prueba. |
| Conjunto de prueba | Un [grupo de pruebas][13] en el que se ejecuta la misma unidad de código en función del lenguaje y el marco de pruebas. |
| Defectuosa | Muestra tanto un estado aprobado como de error en varias ejecuciones de prueba para el mismo commit. |
| Tiene parámetros | Si una prueba tiene o no parámetros: `true` o `false`, respectivamente. |
| Se considera defectuosa | Si se sabe o no que una prueba es defectuosa: `true` o `false`, respectivamente. <br><br>La ejecución de esta prueba ha fallado y la prueba se identifica como defectuosa en la rama actual o en la rama predeterminada. |
| Lenguaje | El lenguaje de programación de la biblioteca desde la que se generó la prueba. |
| Defectuosa por primera vez | Si esta prueba defectuosa se ha producido antes o no: `true` o `false`. <br><br>La ejecución de la prueba identifica la prueba como defectuosa en el commit. La prueba no se identificó previamente como prueba defectuosa en la rama actual o en la rama predeterminada. |
| Regresión del rendimiento | Una ejecución de prueba se marca como regresión cuando su duración quintuplica el promedio o es mayor que la duración máxima para la misma prueba en la rama predeterminada. |
| Media de referencia | Para la regresión de una prueba, indica la duración media de la misma prueba en la rama predeterminada calculada en función de la última semana de ejecuciones de prueba. |
| Desviación estándar de referencia | Para la regresión de una prueba, indica la desviación estándar de la misma prueba en la rama predeterminada calculada en función de las duraciones de la última semana de ejecuciones de prueba. |
| Cambio absoluto | Para la regresión de una prueba, indica el cambio absoluto de la duración de la ejecución de prueba en comparación con la media de referencia. |
| Cambio relativo | Para la regresión de una prueba, indica el cambio relativo de la duración de la ejecución de prueba en comparación con la media de referencia. |
| Cambio de desviación estándar | Indica si la prueba se ha añadido recientemente. |
| Propietarios del código de la prueba | El nombre de los propietarios del código de la prueba deducido de la configuración del repositorio. |
| Huella digital de la prueba | El identificador único de una ejecución de prueba individual. |
| Marco de pruebas | El marco subyacente o el conjunto de herramientas utilizadas para crear y ejecutar pruebas. |
| Comando de prueba | El comando que se utilizó para ejecutar las pruebas. |
| Paquete de pruebas | Equivale a un módulo de pruebas. Se utiliza en las versiones anteriores de la biblioteca de pruebas de Datadog. |
| Nombre completo de la prueba | El nombre completo de la prueba. |
| Módulo de pruebas | El módulo de la prueba, que varía en función del lenguaje:<br><br>En .NET, un módulo de pruebas agrupa todas las pruebas que se ejecutan en el mismo proyecto de pruebas unitarias.<br>En Swift, un módulo de pruebas agrupa todas las pruebas que se ejecutan para un paquete determinado.<br>En JavaScript, los módulos de pruebas se asignan de forma individual a las sesiones de prueba.<br>En Java, un módulo de pruebas agrupa todas las pruebas que se ejecutan en la misma tarea de Maven Surefire, Failsafe o Gradle Test.<br>En Python, un módulo de pruebas agrupa todas las pruebas que se ejecutan con el mismo archivo `.py` como parte de un conjunto de pruebas, el cual suele gestionarse mediante un marco como `unittest` o `pytest`.<br>En Ruby, un módulo de pruebas agrupa todas las pruebas que se ejecutan dentro del mismo archivo de prueba, el cual suele gestionarse mediante un marco como `RSpec` o `Minitest`. |
| Rasgos de la prueba | Los rasgos de la prueba, como `category:flaky`. |
| Tipo de prueba | El tipo de prueba, como `unit benchmark` o `browser`. |
| RUM activa | Indica si la prueba se ejecutó dentro de una sesión web activa de [Real User Monitoring][14]. |
| Es nueva | Indica si la prueba se ha añadido recientemente. |
| Es un reintento | Indica si la prueba se ha ejecutado como resultado de un reintento. |
| Cobertura de código habilitada | Indica si el [Ejecutor de pruebas inteligente][16] ha habilitado la [cobertura de código][17] por prueba para la sesión. |
| Omisiones de ITR | La cantidad de pruebas que el Ejecutor de pruebas inteligente (ITR) omitió durante la sesión. |
| Omisión de pruebas habilitada | Si el Ejecutor de pruebas inteligente puede omitir la sesión o el módulo de pruebas. |
| Tipo de omisión de pruebas | El método o criterio que utiliza el Ejecutor de pruebas inteligente para determinar qué pruebas omitir. |
| Pruebas omitidas | El recuento total de pruebas que no se ejecutaron durante la sesión de prueba, que puede incluir pruebas que se configuraron para omitirse o que se excluyeron manualmente. |
| Tiempo ahorrado | El tiempo ahorrado para la sesión gracias al uso del Ejecutor de pruebas inteligente. |
| Detección temprana de defectos habilitada | Indica si la prueba se ha ejecutado con [Detección temprana de defectos][15]. |
| Motivo de cancelación de Detección temprana de defectos | Indica el motivo de la cancelación de Detección temprana de defectos en una prueba. |

Puedes filtrar por nivel de prueba: sesión, módulo, conjunto y ejecución de prueba. Cada nivel de prueba representa un nivel diferente de agregación de pruebas.

{{< img src="ci/ci-test-suite-visibility.png" alt="Visibilidad de Conjunto de pruebas" style="width:100%;">}}

Para obtener más información sobre las facetas comunes que se pueden utilizar como parte de una consulta de búsqueda en el Explorador de visibilidad de pruebas, consulta [Facetas de ejecuciones de prueba][3].

### Sesiones

Las sesiones de prueba son el nivel más alto de agregación. Cada una corresponde a un comando de prueba, como `yarn test`, `mvn test` o `dotnet test`.

En el caso de la carga de informes de JUnit, hay 1 sesión por archivo de informe cargado.

### Módulo

La definición de módulo varía ligeramente según el lenguaje:

* En .NET, un módulo de pruebas agrupa todas las pruebas que se ejecutan en el mismo [proyecto de pruebas unitarias][9].
* En Swift, un módulo de pruebas agrupa todas las pruebas que se ejecutan para un paquete determinado.
* En JavaScript, los módulos de pruebas se asignan de forma individual a las sesiones de prueba.
* En Java, un módulo de pruebas agrupa todas las pruebas que se ejecutan en la misma tarea de Maven Surefire, Failsafe o Gradle Test.
* En la carga de informes de JUnit, los módulos de pruebas se asignan de forma individual a las sesiones de prueba.

Un ejemplo de módulo es `SwiftLintFrameworkTests`, que corresponde a un objetivo de prueba en [`SwiftLint`][10].

### Conjunto

Un conjunto de pruebas es un grupo de pruebas en el que se ejecuta la misma unidad de código.

Un ejemplo de conjunto de pruebas es `src/commands/junit/__tests__/upload.test.ts`, que corresponde a un archivo de prueba en [`datadog-ci`][11].

Los datos de las ejecuciones de prueba están disponibles en [dashboards][7] y [notebooks][8], lo que permite a los equipos de ingeniería de compilación personalizar su comunicación sobre el trabajo de prioridad alta y las tendencias de CI a lo largo del tiempo.

## Buscar y filtrar

Puedes limitar, ampliar o cambiar el enfoque en un subconjunto de pruebas si haces clic en las facetas de la izquierda o si escribes tu propia consulta personalizada en la barra de búsqueda. Cuando selecciones o anules la selección de facetas, la barra de búsqueda reflejará automáticamente los cambios. Del mismo modo, puedes modificar la consulta desde la barra de búsqueda o escribir una consulta desde cero en dicha barra para seleccionar y anular la selección de las facetas de la izquierda.

- Para aprender a buscar pruebas, consulta [Búsqueda y gestión][1].
- Para aprender a crear consultas, lee [Sintaxis de búsqueda][2].

## Analizar

Agrupa las ejecuciones de prueba consultadas en entidades de nivel superior como campos, patrones y transacciones para derivar o consolidar la información. Mediante el uso de [facetas][3], que no es necesario crear para buscar atributos, puedes hacer lo siguiente:

- Buscar y realizar un seguimiento del progreso de las pruebas que se ejecutan en un pipeline de CI/CD.
- Investigar cada ejecución de trabajo de CI/CD para identificar y solucionar los errores en las pruebas.
- Identificar [pruebas defectuosas][5] para corregirlas.

## Visualizar

Selecciona un tipo de visualización para visualizar los resultados de los filtros y agregaciones y comprender mejor las pruebas. Por ejemplo, puedes ver los resultados de las pruebas en forma de lista para organizar los datos de las pruebas en columnas, o en un [gráfico de series temporales][18] para medir los datos de las pruebas de CI a lo largo del tiempo.

## Exportar

[Exporta tu vista][4] en el Explorador de visibilidad de pruebas para reutilizarla más adelante o en contextos diferentes.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/search
[2]: /es/tests/explorer/search_syntax
[3]: /es/tests/explorer/facets
[4]: /es/tests/explorer/saved_views
[5]: /es/tests/guides/flaky_test_management
[6]: https://app.datadoghq.com/ci/test-runs
[7]: https://app.datadoghq.com/dashboard/lists
[8]: https://app.datadoghq.com/notebook/list
[9]: https://learn.microsoft.com/en-us/visualstudio/test/create-a-unit-test-project?view=vs-2022#to-create-a-unit-test-project
[10]: https://github.com/realm/SwiftLint/blob/7738f0c0a5990201ca6556bdb2f13f8e67b5191d/Package.swift#L71
[11]: https://github.com/DataDog/datadog-ci/blob/6de6ea3bbffa57d8576422535061ca35c759feb6/src/commands/junit/__tests__/upload.test.ts
[12]: /es/glossary/?product=ci-cd#test-service
[13]: /es/glossary/?product=ci-cd#test-suite 
[14]: /es/real_user_monitoring/
[15]: /es/tests/early_flake_detection/
[16]: /es/intelligent_test_runner/
[17]: /es/tests/code_coverage/
[18]: https://app.datadoghq.com/ci/test-runs?viz=timeseries