---
aliases:
- /es/continuous_integration/guides/code_coverage/
- /es/continuous_integration/integrate_tests/code_coverage/
- /es/continuous_integration/tests/code_coverage/
description: Aprenda a reportar y utilizar Code Coverage en Datadog.
further_reading:
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Resuelva problemas más rápido con la integración de GitLab Source Code en
    Datadog
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /monitors/types/ci
  tag: Documentación
  text: Obtenga información sobre los monitores de CI.
title: Code Coverage en Datadog
---
<div class="alert alert-warning">
Esta función de Test Optimization es heredada. Utilice el nuevo producto dedicado <a href="https://docs.datadoghq.com/code_coverage/">Code Coverage</a> en su lugar.
</div>

## Descripción general {#overview}

Code Coverage mide el porcentaje total de código que ejercita un módulo o una sesión.

Asegúrese de que [Test Optimization][1] ya esté configurado para su lenguaje de programación.

## Reporte Code Coverage {#report-code-coverage}

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibilidad {#compatibility}

* `dd-trace>=4.45.0` y `dd-trace>=5.21.0`.
* `jest>=24.8.0`, solo cuando se ejecuta con `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.
* `vitest>=2.0.0`.

<div class="alert alert-danger">
  <strong>Nota</strong>: El DataDog Tracer no genera datos de Code Coverage. Si sus pruebas se ejecutan con Code Coverage habilitado, <code>dd-trace</code> lo reporta bajo la <code>test.code_coverage.lines_pct</code> etiqueta para sus sesiones de prueba automáticamente.
</div>

#### Mocha/Cucumber-js {#mochacucumber-js}

Solo se admite Code Coverage de [`Istanbul`][1] para `mocha` y `cucumber-js`.

Para reportar el Code Coverage total de sus sesiones de prueba `mocha` y `cucumber-js`, instale [`nyc`][2] y ejecute sus comandos de prueba mediante esa herramienta:

1. Instale `nyc`:

```
npm install --save-dev nyc
```

2. Ejecute sus comandos de prueba mediante `nyc`:

```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest {#jest}
Jest incluye Istanbul de forma predeterminada, por lo que no necesita instalar `nyc`. Simplemente pase `--coverage`:

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

El único [`coverageProvider`][3] admitido es `babel`, que es el predeterminado.

#### Vitest {#vitest}
Vitest requiere dependencias adicionales para ejecutarse con Code Coverage. Consulte la [documentación de vitest][4] para obtener más información. Una vez instaladas las dependencias, pase `--coverage` a su comando de prueba:

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

Después de modificar sus comandos de prueba, ejecute sus pruebas con el nuevo comando `coverage`:

```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilidad {#compatibility-1}
* `dd-trace>=2.31.0`.

Cuando Code Coverage está disponible, el trazador de Datadog (v2.31.0 o posterior) lo informa bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Si utiliza [Coverlet][1] para calcular Code Coverage, indique la ruta del archivo de informe en la variable de entorno `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` al ejecutar `dd-trace`. El archivo de informe debe estar en formato OpenCover o Cobertura. Alternativamente, puede habilitar el cálculo de Code Coverage integrado del trazador de Datadog con la variable de entorno `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

**Nota**: `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` solo se utiliza cuando el comando instrumentado por `dd-trace ci run` es `dotnet test`, `dotnet vstest` o `vstest.console`. Por ejemplo, los resultados en la variable se ignoran al ejecutar `dd-trace ci run -- coverlet TestAssembly.dll --target dotnet --targetargs "test TestAssembly.dll"`.

### Opciones avanzadas {#advanced-options}

La cobertura de código integrada del Datadog Tracer tiene soporte para las opciones `Coverlet` y `VS Code Coverage` a través del archivo `.runsettings`.

#### Estructura de archivos {#file-structure}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Datadog Code Coverage settings -->
                    ...
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

#### Opciones de Coverlet {#coverlet-options}

| Opción                   | Resumen                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | Excluya métodos, clases o ensamblados decorados con atributos de la cobertura de código.                                                                                                                |
| ExcludeByFile            | Excluya archivos fuente específicos de la cobertura de código.                                                                                                                |
| Exclude                  | Excluya del análisis de cobertura de código mediante expresiones de filtro.                                                                                                  |

##### Atributos {#attributes}

Puede excluir un método, una clase completa o un ensamblado de la cobertura de código creando y aplicando el atributo `ExcludeFromCodeCoverage` presente en el espacio de nombres `System.Diagnostics.CodeAnalysis`.

Excluya atributos adicionales con la propiedad `ExcludeByAttribute` y el nombre corto del atributo (el nombre del tipo sin el espacio de nombres).

##### Archivos fuente {#source-files}

Excluya archivos fuente específicos de la cobertura de código con la propiedad `ExcludeByFile`.

* Utilice una o varias rutas, separadas por comas.
* Utilice la ruta del archivo o la ruta del directorio con un comodín (`*`), por ejemplo: `dir1/*.cs`.

##### Filtros {#filters}

Los filtros proporcionan un control preciso sobre lo que se excluye mediante **expresiones de filtro** con la siguiente sintaxis:

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

Se admiten los **comodines**:

* `*` => coincide con cero o más caracteres
* `?` => el carácter prefijado es opcional

**Ejemplos**:

* `[*]*` => Excluye todos los tipos en todos los ensamblados (no se instrumenta nada)
* `[coverlet.*]Coverlet.Core.Coverage` => Excluye la clase `Coverage` en el espacio de nombres `Coverlet.Core` que pertenece a cualquier ensamblado que coincida con `coverlet.*` (por ejemplo, `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => Excluye todos los tipos que pertenecen al espacio de nombres `Coverlet.Core.Instrumentation` en cualquier ensamblado
* `[coverlet.*.tests?]*` => Excluye todos los tipos en cualquier ensamblado que comience con `coverlet.` y termine con `.test` o `.tests` (el `?` hace que el `s` sea opcional)
* `[coverlet.*]*,[*]Coverlet.Core*\` => Excluye los ensamblados que coinciden con `coverlet.*` y excluye todos los tipos que pertenecen al espacio de nombres `Coverlet.Core` en cualquier ensamblado

#### Opciones de cobertura de código de VS {#vs-code-coverage-options}


Consulte [Personalizar el análisis de cobertura de código][2] en la documentación de Microsoft para obtener información adicional.

| Opción                   | Resumen                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Excluye de la cobertura de código métodos, clases o ensamblados decorados con atributos.                                                                                                                |
| Sources\Exclude          | Excluye archivos fuente específicos de la cobertura de código.                                                                                                                |

#### Ejemplo de Runsettings {#runsettings-example}

```xml
<?xml version="1.0" encoding="utf-8"?>
<RunSettings>
    <DataCollectionRunSettings>
        <DataCollectors>
            <DataCollector friendlyName="DatadogCoverage">
                <Configuration>
                    <!-- Coverlet configuration -->
                    <ExcludeByAttribute>CompilerGeneratedAttribute</ExcludeByAttribute>
                    <ExcludeByFile>**/Fibonorial.cs</ExcludeByFile>
                    <Exclude>[myproject.*.tests?]*</Exclude>

                    <!-- VS Code Coverage configuration -->
                    <CodeCoverage>
                        <Attributes>
                            <Exclude>
                                <Attribute>^System\.ObsoleteAttribute$</Attribute>
                            </Exclude>
                        </Attributes>
                        <Sources>
                            <Exclude>
                                <Source>^MyFile\.cs$</Source>
                            </Exclude>
                        </Sources>
                    </CodeCoverage>
                </Configuration>
            </DataCollector>
        </DataCollectors>
    </DataCollectionRunSettings>
</RunSettings>
```

[1]: https://github.com/coverlet-coverage/coverlet
[2]: https://learn.microsoft.com/en-us/visualstudio/test/customizing-code-coverage-analysis?view=vs-2022
{{% /tab %}}
{{% tab "Java" %}}

### Compatibilidad {#compatibility-2}
* `dd-trace-java >= 1.24.2`.

Cuando la cobertura de código está disponible, el Datadog Tracer la reporta bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

[Jacoco][1] es compatible como biblioteca de cobertura de código.

Si su proyecto ya tiene configurado Jacoco, el Datadog Tracer lo instrumenta y reporta los datos de cobertura a Datadog automáticamente.

De lo contrario, puede configurar el SDK para agregar Jacoco a sus ejecuciones de prueba en tiempo de ejecución.
Utilice la variable de entorno `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` para especificar qué [versión de Jacoco][2] desea que se inyecte (por ejemplo: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### Compatibilidad {#compatibility-3}

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* Solo se admite la cobertura de código de [`coverage.py`][1] y [`pytest-cov`][2].


Cuando las pruebas se instrumentan con [`coverage.py`][1] o [`pytest-cov`][2], el Datadog Tracer reporta automáticamente la cobertura de código bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Para informar la cobertura de código total de sus sesiones de prueba con [`coverage.py`][1], siga estos pasos:

1. Instale `coverage`:

```
python3 -m pip install coverage
```

2. Ejecute su prueba con el nuevo comando `coverage`:

```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

Alternativamente, para informar la cobertura de código total de sus sesiones de prueba con [`pytest-cov`][2], siga estos pasos:

1. Instale `pytest`:

```
python3 -m pip install pytest
```

2. Instale `pytest-cov`:

```
python3 -m pip install pytest-cov
```

3. Ejecute su prueba añadiendo la opción `--cov` a su comando `pytest`:

```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### Compatibilidad {#compatibility-4}

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`.

<div class="alert alert-danger">
  <strong>Nota</strong>: La biblioteca de Datadog no genera la cobertura de código total. Si sus pruebas se ejecutan con la cobertura de código habilitada, <code>datadog-ci-rb</code> la reporta bajo la <code>test.code_coverage.lines_pct</code> etiqueta para sus sesiones de prueba automáticamente.
</div>

Si su proyecto tiene configurado [simplecov][1], la biblioteca datadog-ci-rb lo instrumenta e informa los datos de cobertura a Datadog automáticamente bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Esta función está habilitada de forma predeterminada. Utilice la variable de entorno `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` para deshabilitar esta función (por ejemplo: `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`).

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### Compatibilidad {#compatibility-5}

* `go test -cover`

<div class="alert alert-danger">
  <strong>Nota</strong>: La biblioteca de Datadog no genera la cobertura de código total. Si sus pruebas se ejecutan con la cobertura de código habilitada, <code>ddtest instrument</code> la reporta bajo la <code>test.code_coverage.lines_pct</code> etiqueta para sus sesiones de prueba automáticamente.
</div>

Si sus pruebas se ejecutan con la opción `-cover`, `ddtest instrument` reporta automáticamente los datos de cobertura a Datadog bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba. Cuando `go test` ejecuta más de un paquete, establezca también `-coverprofile`, porque el total de la sesión proviene de ese perfil.

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilidad {#compatibility-6}
* `dd-sdk-swift-testing>=2.5.3`.
* `Xcode>=14.3`.

Cuando la cobertura de código está habilitada, Datadog Tracer la reporta bajo la etiqueta `test.code_coverage.lines_pct` para sus sesiones de prueba.

Para habilitar la cobertura de código para proyectos de Xcode, puede seguir esta guía de Apple: [Habilitar la cobertura de código en su plan de prueba][1].

Para pruebas de SPM, agregue el parámetro `--enable-code-coverage` a su invocación de `swift test`.

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "Cargas de informes de JUnit" %}}

### Compatibilidad {#compatibility-7}
* `datadog-ci>=2.17.2`.

Puede cargar un valor de porcentaje de cobertura de código al usar cargas de informes JUnit:

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

En este ejemplo, `85` es el porcentaje de líneas cubiertas por sus pruebas y debe generarse con una herramienta diferente.

El informe de cobertura de código debe generarse en un proceso diferente; de lo contrario, las cargas de informes JUnit no generarán informes de cobertura de código. El nombre de la métrica reportada debe ser `test.code_coverage.lines_pct`.

{{% /tab %}}
{{< /tabs >}}

## Grafique la cobertura de código {#graph-code-coverage}

La cobertura de código reportada se informa como `@test.code_coverage.lines_pct`, lo cual representa el porcentaje total en la faceta, y puede graficarse como cualquier otra faceta de medida en el CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Graph code coverage" style="width:100%" >}}

## Pestaña de cobertura de Test Session {#test-session-coverage-tab}

La cobertura de código reportada también aparece en la pestaña {{< ui >}}Coverage{{< /ui >}} en la página de detalles de una sesión de prueba:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Test sessions code coverage tab" style="width:100%" >}}


## Exportar su gráfico {#export-your-graph}

Puede exportar su gráfico a un [dashboard][2] o a un [notebook][3], y crear un [monitor][4] basado en él haciendo clic en el botón {{< ui >}}Export{{< /ui >}}:

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Export code coverage" style="width:60%" >}}


## Agregar un monitor {#add-a-monitor}

Reciba alertas cuando la cobertura de código de su servicio caiga por debajo de cierto umbral creando un [CI Test Monitor][5]:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Code coverage monitor" style="width:100%" >}}

## Consulte la evolución de la cobertura de código de su rama {#see-your-branchs-code-coverage-evolution}

También puede ver la evolución de la cobertura de código en la [página Branch Overview][6] y verificar si está mejorando o empeorando:

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Branch view's code coverage" style="width:100%" >}}


## Muestre el cambio en la cobertura de código de una solicitud de extracción {#show-code-coverage-change-of-a-pull-request}

El [comentario de resumen de prueba][7] de la solicitud de extracción muestra el cambio en la cobertura de código de una solicitud de extracción de GitHub en comparación con la rama predeterminada.

## Test Impact Analysis y cobertura total de código {#test-impact-analysis-and-total-code-coverage}

[Test Impact Analysis][8] **no** proporciona automáticamente mediciones de cobertura total de código, aunque requiere cobertura de código _por prueba_ para funcionar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tests/
[2]: /es/dashboards
[3]: /es/notebooks
[4]: /es/monitors
[5]: /es/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /es/continuous_integration/tests/developer_workflows#branch-overview
[7]: /es/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /es/tests/test_impact_analysis