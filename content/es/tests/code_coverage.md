---
aliases:
- /es/continuous_integration/guides/code_coverage/
- /es/continuous_integration/integrate_tests/code_coverage/
- /es/continuous_integration/tests/code_coverage/
description: Aprende a informar y utilizar la cobertura de código en Datadog.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /monitors/types/ci
  tag: Documentación
  text: Más información sobre CI Monitors
title: Code Coverage en Datadog
---

{{< callout url="https://www.datadoghq.com/product-preview/code-coverage/" >}}
Datadog está creando un nuevo producto dedicado a la cobertura de código. Apúntate a la versión preliminar.
{{< /callout >}}

## Información general

La cobertura de código es una medida del porcentaje total de cobertura de código que ejerce un módulo o sesión.

Asegúrate de que [Test Optimization][1] ya está configurado para tu lenguaje.

## Informe de cobertura de código

{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

### Compatibilidad

* `dd-trace>=4.45.0` y `dd-trace>=5.21.0`.
* `jest>=24.8.0`, sólo cuando se ejecuta con `jest-circus`.
* `mocha>=5.2.0`.
* `cucumber-js>=7.0.0`.
* `vitest>=2.0.0`.

<div class="alert alert-danger">
  <strong>Nota</strong>: El rastreador de DataDog no genera cobertura de código. Si tus tests se ejecutan con la cobertura de código activada, <code>dd-trace</code> lo informa en la etiqueta <code>test.code_coverage.lines_pct</code> para tus sesiones de tests automáticamente.
</div>

#### Mocha/Cucumber-js

Sólo se admite la cobertura de código [`Istanbul`][1] para `mocha` y `cucumber-js`.

Para informar de la cobertura total del código de tus sesiones de test de `mocha` y `cucumber-js`, instala [`nyc`][2] y envuelve tus comandos de test:

1. Instala `nyc`:
```
npm install --save-dev nyc
```

2. Envuelve tus comandos de test con `nyc`:
```json
{
  "scripts": {
    "test": "mocha",
    "coverage": "nyc npm run test"
  }
}
```

#### Jest
Jest incluye Istanbul por defecto, por lo que no es necesario instalar `nyc`. Basta con pasar `--coverage`:

```json
{
  "scripts": {
    "coverage": "jest --coverage"
  }
}
```

El único [`coverageProvider`][3] admitido es `babel`, que es el predeterminado.

#### Vitest
Vitest requiere dependencias adicionales para ejecutarse con cobertura de código. Consulta [documentación de vitest][4] para más información. Una vez instaladas las dependencias, pasa `--coverage` a tu comando de test:

```json
{
  "scripts": {
    "coverage": "vitest run --coverage"
  }
}
```

Después de modificar tus comandos de test, ejecuta tus tests con el nuevo comando `coverage`:
```
NODE_OPTIONS="-r dd-trace/ci/init" DD_ENV=ci DD_SERVICE=my-javascript-service npm run coverage
```


[1]: https://istanbul.js.org/
[2]: https://github.com/istanbuljs/nyc
[3]: https://jestjs.io/docs/configuration#coverageprovider-string
[4]: https://vitest.dev/guide/coverage.html
{{% /tab %}}

{{% tab ".NET" %}}

### Compatibilidad
* `dd-trace>=2.31.0`.

Cuando la cobertura del código está disponible, el rastreador de Datadog (v2.31.0 o posterior) informa de ella en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Si utilizas [Coverlet][1] para calcular la cobertura del código, indica la ruta del archivo de informe en la variable de entorno `DD_CIVISIBILITY_EXTERNAL_CODE_COVERAGE_PATH` al ejecutar `dd-trace`. El archivo de informe debe estar en los formatos OpenCover o Cobertura. Alternativamente, puedes activar el cálculo de cobertura de código integrado en el rastreador de Datadog con la variable de entorno `DD_CIVISIBILITY_CODE_COVERAGE_ENABLED=true`.

### Opciones avanzadas

La cobertura de código incorporada en el rastreador Datadog es compatible con las opciones `Coverlet` y `VS Code Coverage` a través del archivo `.runsettings`.

#### Estructura del archivo
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

#### Opciones de Coverlet

| Opción                   | Resumen                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ExcludeByAttribute       | Excluir métodos, clases o ensamblados decorados con atributos de la cobertura de código.                                                                                                                |
| ExcludeByFile            | Excluir archivos fuente específicos de la cobertura de código.                                                                                                                |
| Exclude                  | Excluir del análisis de cobertura de código mediante expresiones de filtro.                                                                                                  |

##### Atributos

Puedes excluir un método, una clase entera o un ensamblado de la cobertura de código creando y aplicando el atributo `ExcludeFromCodeCoverage` presente en el espacio de nombres `System.Diagnostics.CodeAnalysis`.

Excluir atributos adicionales con la propiedad `ExcludeByAttribute` y el nombre corto del atributo (el nombre del tipo sin el espacio de nombres).

##### Archivos fuente

Excluye archivos fuente específicos de la cobertura de código con la propiedad `ExcludeByFile`.

* Utiliza una o varias rutas, separadas por comas.
* Utiliza la ruta del archivo o directorio con un comodín (`*`), por ejemplo: `dir1/*.cs`.

##### Filtros

Los filtros proporcionan un control preciso sobre lo que se excluye utilizando **expresiones de filtro** con la siguiente sintaxis:

`[<ASSEMBLY_FILTER>]<TYPE_FILTER>`

Se admiten **comodines**:

* `*` => coincide con cero o más caracteres
* `?` => el carácter prefijado es opcional

**Ejemplos**:

* `[*]*` => excluye todos los tipos en todos los ensamblajes (no se instrumenta nada)
* `[coverlet.*]Coverlet.Core.Coverage` => excluye la clase `Coverage` del espacio de nombres `Coverlet.Core` perteneciente a cualquier ensamblaje que coincida con `coverlet.*` (por ejemplo, `coverlet.core`)
* `[*]Coverlet.Core.Instrumentation.*` => Excluye todos los tipos pertenecientes al espacio de nombres `Coverlet.Core.Instrumentation` en cualquier ensamblaje
* `[coverlet.*.tests?]*` => excluye todos los tipos en cualquier ensamblaje que empiecen por `coverlet.` y terminen por `.test` o `.tests` (el `?` hace que `s` sea opcional)
* `[coverlet.*]*,[*]Coverlet.Core*\` => excluye los ensamblajes que coincidan con `coverlet.*` y excluye todos los tipos pertenecientes al espacio de nombres `Coverlet.Core` en cualquier ensamblaje

#### Opciones de cobertura de código VS


Consulta [Personalizar el análisis de cobertura de código][2] en la documentación de Microsoft para obtener información adicional.

| Opción                   | Resumen                                                                                                                                                         |
|:-------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Attributes\Exclude       | Excluye métodos, clases o ensamblados decorados con atributos de la cobertura de código.                                                                                                                |
| Sources\Exclude          | Excluir archivos fuente específicos de la cobertura de código.                                                                                                                |

#### Ejemplo de Runsettings
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

### Compatibilidad
* `dd-trace-java >= 1.24.2`.

Cuando la cobertura de código está disponible, el rastreador de Datadog informa de ella en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

[Jacoco][1] es compatible con la librería de cobertura de código.

Si tu proyecto ya tiene Jacoco configurado, el rastreador de Datadog lo instrumenta e informa los datos de cobertura a Datadog automáticamente.

De lo contrario, puedes configurar el rastreador para añadir Jacoco a tus ejecuciones de tests en tiempo de ejecución.
Utiliza la variable de entorno `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION` para especificar qué [versión de Jacoco][2] deseas que se inyecte (por ejemplo: `DD_CIVISIBILITY_JACOCO_PLUGIN_VERSION=0.8.11`).


[1]: https://www.eclemma.org/jacoco/
[2]: https://mvnrepository.com/artifact/org.jacoco/org.jacoco.agent
{{% /tab %}}
{{% tab "Python" %}}

### Compatibilidad

* `dd-trace>=2.5.0`.
* `Python>=3.7`.
* `coverage>=4.4.2`.
* `pytest>=3.0.0`.
* `pytest-cov>=2.7.0`.
* `unittest>=3.8`.
* Sólo se admiten las coberturas de código [`coverage.py`][1] y [`pytest-cov`][2].


Cuando los tests se instrumentan con [`coverage.py`][1] o [`pytest-cov`][2], el rastreador de Datadog informa automáticamente de la cobertura de código bajo la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Para informar de la cobertura total de código de tus sesiones de test con [`coverage.py`][1], sigue estos pasos:

1. Instala `coverage`:
```
python3 -m pip install coverage
```

2. Ejecuta tu test con el nuevo comando `coverage`:
```
DD_ENV=ci DD_SERVICE=my-python-service coverage run -m pytest
```

Alternativamente, para informar de la cobertura total de código de tus sesiones de test con [`pytest-cov`][2], sigue estos pasos:

1. Instala `pytest`:
```
python3 -m pip install pytest
```

2. Instala `pytest-cov`:
```
python3 -m pip install pytest-cov
```

3. Ejecuta tu test añadiendo el indicador `--cov` a tu comando `pytest`:
```
DD_ENV=ci DD_SERVICE=my-python-service pytest --cov
```

[1]: https://github.com/nedbat/coveragepy
[2]: https://github.com/pytest-dev/pytest-cov
{{% /tab %}}
{{% tab "Ruby" %}}

### Compatibilidad

* `datadog-ci-rb>=1.7.0`
* `simplecov>=0.18.0`.

<div class="alert alert-danger">
 <strong>Nota</strong>: Datadog biblioteca no genera la cobertura total del código. Si sus pruebas se ejecutan con la cobertura de código activada, <code>Datadog-ci-rb informa de ello en</code> <code>test.code_coverage.lines_pct</code> etiquetar para sus sesiones de prueba automáticamente.
</div>

Si tu proyecto tiene configurado [simplecov][1], la librería satadog-ci-rb lo instrumenta e informa los datos de cobertura a Datadog automáticamente bajo la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Esta función está activada por defecto. Utiliza la variable de entorno `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED` para desactivar esta función (por ejemplo: `DD_CIVISIBILITY_SIMPLECOV_INSTRUMENTATION_ENABLED=0`).

[1]: https://github.com/simplecov-ruby/simplecov
{{% /tab %}}

{{% tab "Go" %}}

### Compatibilidad

* `go test -cover`

<div class="alert alert-danger">
  <strong>Nota</strong>: La librería de DataDog no genera cobertura total de código. Si tus tests se ejecutan con la cobertura de código activada, <code>dd-trace-go</code> lo informa en la etiqueta <code>test.code_coverage.lines_pct</code> para tus sesiones de tests automáticamente.
</div>

Si tus tests se ejecutan con el indicador `-cover`, la librería de Datadog lo instrumenta y automáticamente reporta los datos de cobertura a Datadog bajo la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

{{% /tab %}}

{{% tab "Swift" %}}

### Compatibilidad
* `dd-sdk-swift-testing>=2.5.3`.
* `Xcode>=14.3`.

Cuando la cobertura de código está activada, el rastreador de Datadog informa de ella en la etiqueta `test.code_coverage.lines_pct` para tus sesiones de test.

Para habilitar la cobertura de código en proyectos Xcode puedes seguir esta guía de Apple: [Habilitar la cobertura de código en tu plan de tests][1].

Para los tests SPM, añade el parámetro `--enable-code-coverage` a tu invocación `swift test`.

[1]: https://developer.apple.com/documentation/xcode/determining-how-much-code-your-tests-cover#Enable-code-coverage-in-your-test-plan
{{% /tab %}}

{{% tab "JUnit Report Uploads" %}}

### Compatibilidad
* `datadog-ci>=2.17.2`.

Puedes cargar un valor de porcentaje de cobertura de código cuando utilices la carga de informes JUnit:

```shell
datadog-ci junit upload --service <service_name> --report-measures=test.code_coverage.lines_pct:85 <path>
```

En este ejemplo, `85` es el porcentaje de líneas cubiertas por tus tests y debe generarse con una herramienta diferente.

El informe de cobertura de código debe generarse en un proceso diferente, de lo contrario las cargas de informes JUnit no generarán informes de cobertura de código. El nombre de la métrica informada debe ser `test.code_coverage.lines_pct`.

{{% /tab %}}
{{< /tabs >}}

## Cobertura del código en gráficos

La cobertura de código informada se reporta como `@test.code_coverage.lines_pct`, que representa el porcentaje total en la faceta, y puede ser graficada como cualquier otra faceta de medida en el CI Visibility Explorer.

{{< img src="/continuous_integration/graph_code_coverage.png" text="Cobertura del código en gráficos" style="width:100%" >}}

## Pestaña Cobertura de la sesión de test

La cobertura de código notificada también aparece en la pestaña **Coverage** (Cobertura) en la página de detalles de una sesión de test:

{{< img src="/continuous_integration/code_coverage_tab.png" text="Pestaña Cobertura de código de sesiones de test" style="width:100%" >}}


## Exportar el gráfico

Puedes exportar tu gráfico a un [dashboard][2] o a un [notebook][3] y crear un [monitor][4] basado en él haciendo clic en el botón **Export** (Exportar):

{{< img src="/continuous_integration/code_coverage_export_to.png" text="Exportar cobertura de código" style="width:60%" >}}


## Añadir un monitor

Recibe alertas cada vez que la cobertura de código de tu servicio caiga por debajo de un determinado umbral creando un [Monitor de CI Test][5]:

{{< img src="/continuous_integration/code_coverage_monitor.png" text="Monitor de cobertura de código" style="width:100%" >}}

## Ver la evolución de la cobertura de código de tu rama

También puedes ver la evolución de la cobertura del código en la página [Información general de la rama][6] y comprobar si está mejorando o empeorando:

{{< img src="/continuous_integration/code_coverage_branch_view.png" text="Cobertura del código de la vista de la rama" style="width:100%" >}}


## Mostrar los cambios en la cobertura del código de una solicitud pull

El [comentario de resumen del test][7] de la solicitud pull muestra el cambio en la cobertura del código de una solicitud pull de GitHub en comparación con la rama por defecto.

## Test Impact Analysis y cobertura total del código

[Test Impact Analysis][8] **no** proporciona automáticamente mediciones de la cobertura total del código, aunque requiere una cobertura del código _por test_ para funcionar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tests/
[2]: /es/dashboards
[3]: /es/notebooks
[4]: /es/monitors
[5]: /es/monitors/types/ci/#maintain-code-coverage-percentage
[6]: /es/continuous_integration/tests/developer_workflows#branch-overview
[7]: /es/tests/developer_workflows/#test-summaries-in-github-pull-requests
[8]: /es/tests/test_impact_analysis
