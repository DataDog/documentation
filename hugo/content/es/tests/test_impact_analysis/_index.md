---
aliases:
- /es/continuous_integration/intelligent_test_runner/
- /es/intelligent_test_runner
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centro de aprendizaje
  text: Introducción a Test Optimization
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Optimice las pruebas de CI con Datadog Intelligent Test Runner
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Haga un seguimiento de todas sus canalizaciones de CI con Datadog
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de la versión
  text: ¡Consulte las últimas versiones de Software Delivery! (Se requiere inicio
    de sesión en la aplicación)
title: Test Impact Analysis
---
<div class="alert alert-danger"> Esta función se conocía anteriormente como Intelligent Test Runner, y algunas etiquetas aún contienen "itr".</div>

## Descripción general {#overview}

Test Impact Analysis selecciona y ejecuta automáticamente solo las pruebas relevantes para un commit determinado según el código que se está cambiando. Reduzca significativamente el tiempo dedicado a las pruebas y los costos generales de CI, mientras mantiene la cobertura de las pruebas.

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis habilitado en una sesión de prueba que muestra su ahorro de tiempo.">}}

Test Impact Analysis funciona analizando su conjunto de pruebas para identificar el código que cubre cada prueba. Luego, realiza una referencia cruzada de esa cobertura con los archivos afectados por un nuevo cambio de código. Datadog utiliza esta información para ejecutar una selección de pruebas relevantes e impactadas, omitiendo las que no se ven afectadas por el cambio de código y reduciendo la duración general de las pruebas. Obtenga más detalles sobre [Cómo funciona][1].

Al minimizar la cantidad de pruebas ejecutadas por commit, Test Impact Analysis reduce la frecuencia con la que las [pruebas inestables][2] interrumpen sus canalizaciones. Esto puede ser particularmente frustrante cuando la inestabilidad de la prueba no está relacionada con el cambio de código que se está probando. Después de habilitar Test Impact Analysis para sus servicios de pruebas, puede limitar cada commit a sus pruebas relevantes para asegurarse de que las pruebas inestables no relacionadas con su cambio de código no terminen interrumpiendo arbitrariamente su compilación.

### Limitaciones de la configuración predeterminada {#out-of-the-box-configuration-limitations}

Con la configuración predeterminada, existen situaciones conocidas que pueden hacer que Test Impact Analysis omita pruebas que deberían haberse ejecutado. Específicamente, Test Impact Analysis no puede detectar automáticamente cambios en:

- Dependencias de bibliotecas
- Opciones del compilador
- Servicios externos
- Cambios en archivos de datos en pruebas basadas en datos

En estos escenarios, Test Impact Analysis podría omitir pruebas afectadas con la configuración predeterminada.

Existen varios mecanismos de configuración que puede usar en estos escenarios para asegurarse de que no se omitan pruebas:

- Puede marcar ciertos archivos en su repositorio como [archivos rastreados](#tracked-files), lo que hace que todas las pruebas se ejecuten siempre que estos archivos cambien. Los Dockerfiles, Makefiles, archivos de dependencia y otros archivos de configuración de compilación son buenos candidatos para archivos rastreados.
- Puede marcar ciertas pruebas en su código fuente como no omitibles para asegurarse de que siempre se ejecuten. Esto es adecuado para pruebas basadas en datos o pruebas que interactúan con sistemas externos. Más información en la [página de configuración][3].
- Si está creando un commit arriesgado y desea ejecutar todas las pruebas, agregue `ITR:NoSkip` (sin distinguir entre mayúsculas y minúsculas) en cualquier parte de su mensaje de commit de Git.
- Si GitHub es su proveedor de gestión de código fuente, use la etiqueta `ITR:NoSkip` (sin distinguir entre mayúsculas y minúsculas) para evitar que Test Impact Analysis omita pruebas en solicitudes de extracción. Para usar esta función, configure la aplicación de GitHub usando el [mosaico de integración de GitHub][9] con la función `Software Delivery: Collect Pull Request Information` habilitada. Este mecanismo no funciona con pruebas ejecutadas en GitHub Actions activadas por eventos `pull_request`.
- Puede agregar una lista de [ramas excluidas](#excluded-branches), lo cual deshabilita Test Impact Analysis en esas ramas.

## Límites de escala y precisión {#scale-and-accuracy-limits}

Test Impact Analysis decide qué pruebas omitir comparando los archivos que cubre cada prueba con los archivos que cambia un commit. Los siguientes comportamientos son los casos conocidos en los que esa comparación es intencionalmente conservadora, para que sepa qué esperar.

<div class="alert alert-info">Todos los comportamientos en esta sección son seguros por diseño: solo pueden causar que se ejecuten <strong>más</strong> pruebas, nunca que se omita una prueba cuando debería haberse ejecutado. Para cambios de código que Datadog no puede detectar automáticamente, consulte <a href="#out-of-the-box-configuration-limitations">Limitaciones de la configuración predeterminada</a>.</div>

### Límites de escala {#scale-limits}

Test Impact Analysis aplica los siguientes límites de tamaño:

- Datadog analiza hasta los 100 commits más recientes para un cambio. En conjuntos de cambios grandes, es posible que algunos commits antiguos no se analicen, por lo que se omiten ligeramente menos pruebas.
- Si un solo commit cambia más de 5000 archivos, ese commit no se analiza para determinar su impacto y sus pruebas se ejecutan en lugar de omitirse.
- Si una sola prueba o un conjunto de pruebas cubre más de 16 000 archivos, no se omite.

### Falsos positivos en la coincidencia de cobertura {#false-positives-in-coverage-matching}

Para verificar si una prueba cubre un archivo cambiado, Datadog utiliza una estructura de datos probabilística eficiente en cuanto a espacio (un filtro de Bloom). Estas estructuras tienen una pequeña tasa inherente de falsos positivos (aproximadamente 0,04 %), por lo que una pequeña fracción de las pruebas que podrían haberse omitido puede ejecutarse de todos modos.

Si Test Impact Analysis se comporta de manera inesperada, consulte la página de [Solución de problemas][12].

## Configure una biblioteca de Datadog {#set-up-a-datadog-library}

Antes de configurar Test Impact Analysis, debe configurar [Test Optimization][4] para su lenguaje en particular. Si está reportando datos a través del Agent, utilice la versión 6.40 o 7.40 y posteriores.

{{< whatsnext desc="Elija un lenguaje para configurar Test Impact Analysis en Datadog:" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## Configuración {#configuration}

Después de haber configurado su biblioteca de Datadog para Test Impact Analysis, configúrela desde [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][5]. Habilitar Test Impact Analysis requiere el permiso `Test Optimization Settings Write`.

Test Impact Analysis se puede configurar en tres niveles, y los niveles inferiores pueden anular los valores del nivel superior:

- **Valores predeterminados de la organización**: Se aplican a todos los repositorios a menos que se anulen. Abra {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, luego seleccione la pestaña {{< ui >}}Organization{{< /ui >}}.
- **Repositorio**: Anula los valores predeterminados de la organización para un repositorio específico. Abra {{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}, seleccione la pestaña {{< ui >}}Repository-specific{{< /ui >}} y elija un repositorio.
- **Servicio de pruebas**: Anula la configuración del repositorio para un servicio de pruebas específico. Abra el repositorio, luego edite las anulaciones para el servicio de pruebas de destino.

En los niveles de repositorio y servicio de pruebas, cada configuración puede {{< ui >}}Inherit{{< /ui >}} el valor del nivel superior o establecerse en un valor {{< ui >}}Custom{{< /ui >}} en el nivel actual.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-configuration-1.png" alt="Habilite Test Impact Analysis para un repositorio en la página CI/CD Settings." style="width:80%" >}}

### Ejecutable de Git {#git-executable}

Para que Test Impact Analysis funcione, [Git][6] debe estar disponible en el servidor que ejecuta las pruebas.

### Ramas excluidas {#excluded-branches}

Debido a las [limitaciones](#out-of-the-box-configuration-limitations) descritas anteriormente, la rama predeterminada de su repositorio se excluye automáticamente de tener habilitado Test Impact Analysis. Datadog recomienda esta configuración para garantizar que todas sus pruebas se ejecuten antes de llegar a producción.

Si hay otras ramas que desea excluir, agréguelas en la página CI/CD Settings. La barra de consulta admite el uso del carácter comodín `*` para excluir cualquier rama que coincida, como `release_*`.

Las ramas excluidas recopilan la cobertura de código por prueba, lo que tiene un impacto en el rendimiento sobre el tiempo total de prueba. Sin embargo, este impacto en el rendimiento se mitiga al recopilar la cobertura de código solo cuando Datadog detecta que la ejecución con cobertura de código genera suficiente información de cobertura nueva como para compensar el costo de recopilar la cobertura. Puede verificar si una sesión de prueba tiene habilitada la cobertura de código o no mirando el campo `@test.code_coverage.enabled`.

### Archivos rastreados {#tracked-files}

Los archivos rastreados son archivos que no son de código y que potencialmente pueden afectar sus pruebas. Los cambios en los archivos rastreados podrían hacer que sus pruebas fallen o cambiar la cobertura de código de sus pruebas. Ejemplos de archivos que son buenos candidatos para agregar como archivos rastreados son:

- Dockerfiles utilizados para el entorno de CI
- Archivos que definen sus dependencias (por ejemplo, `pom.xml` en Maven, `requirements.txt` en Python o `package.json` en Javascript)
- Makefiles

Cuando especifica un conjunto de archivos rastreados, Test Impact Analysis ejecuta todas las pruebas si alguno de estos archivos cambia.

Todas las rutas de archivo se consideran relativas a la raíz del repositorio. Puede usar los caracteres comodín `*` y `**` para hacer coincidir varios archivos o directorios. Por ejemplo, `**/*.mdx` coincide con cualquier archivo `.mdx` en el repositorio.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config-1.png" alt="Seleccione las ramas que desea excluir y los archivos rastreados." style="width:80%" >}}

## Rellenado de cobertura de código {#code-coverage-backfilling}

Si utiliza [Code Coverage][10] y Test Impact Analysis juntos, la cobertura general reportada puede verse sesgada porque Test Impact Analysis omite las pruebas que no necesitan ejecutarse para el cambio de código.

El rellenado de cobertura de código ajusta la cobertura total reportada para incluir las pruebas o conjuntos de pruebas que se omitieron, de modo que los ahorros de Test Impact Analysis no distorsionen los totales de cobertura.

El rellenado de cobertura de código es compatible con Java, .NET, Go y JavaScript. No es compatible con Ruby, Python o Swift.

El rellenado se realiza en la medida de lo posible. Para conjuntos de pruebas grandes, es posible que no se rellene la cobertura de algunas pruebas omitidas por Test Impact Analysis. Como resultado, la cobertura total reportada puede ser ligeramente inferior a la cobertura real. El rellenado no afecta qué pruebas se omiten.

### Java, .NET y Go {#java-net-and-go}

Con `dd-trace-java`, `dd-trace-dotnet` y `dd-trace-go`, no se requiere configuración adicional para el rellenado. Estas bibliotecas detectan automáticamente cuándo se ejecutan las pruebas con un motor de cobertura de código y rellenan los datos de cobertura de código de las pruebas omitidas por Test Impact Analysis.

### JavaScript {#javascript}

Con `dd-trace-js`, el rellenado requiere cargar el informe de cobertura de código. Habilite la carga de cobertura de código en la [configuración de CI/CD Optimization a nivel de organización][11] para que la biblioteca de Datadog ajuste la cobertura total reportada para incluir las pruebas o conjuntos de pruebas omitidos.

## Explore las sesiones de prueba {#explore-test-sessions}

Puede explorar el ahorro de tiempo que obtiene con Test Impact Analysis consultando la página del commit de prueba y el panel de sesiones de prueba.

{{< img src="continuous_integration/itr_commit.png" alt="Página del commit de prueba con Test Impact Analysis" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis habilitado en una sesión de prueba que muestra su ahorro de tiempo." style="width:80%;">}}

Cuando Test Impact Analysis está activo y omite pruebas, un texto de color morado muestra la cantidad de tiempo ahorrado en cada sesión de prueba o en cada commit. La barra de duración también cambia a color morado para que pueda identificar qué sesiones de prueba están utilizando Test Impact Analysis en la página [Test Runs][7].

## Explore la adopción y el ahorro global {#explore-adoption-and-global-savings}

Realice un seguimiento del ahorro y la adopción de Test Impact Analysis en su organización a través del [panel de Test Impact Analysis][8] preconfigurado. El panel incluye widgets para realizar un seguimiento de su ahorro general, así como una vista de los datos por repositorio, por autor del commit y por servicio. Visualice el panel para comprender qué partes de su organización están utilizando Test Impact Analysis y obteniendo el mayor provecho de él.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Panel de Test Impact Analysis" style="width:80%;">}}

El panel también realiza un seguimiento de la adopción de Test Impact Analysis en toda su organización.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Panel de Test Impact Analysis" style="width:80%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/test_impact_analysis/how_it_works/
[2]: /es/glossary/#flaky-test
[3]: /es/tests/test_impact_analysis/setup
[4]: /es/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /es/integrations/github/
[10]: /es/code_coverage/
[11]: https://app.datadoghq.com/ci/settings/ci-cd/repositories?tab=organization
[12]: /es/tests/test_impact_analysis/troubleshooting/