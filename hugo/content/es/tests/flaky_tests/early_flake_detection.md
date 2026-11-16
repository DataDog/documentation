---
aliases:
- /es/tests/early_flake_detection
- /es/tests/flaky_test_management/early_flake_detection
description: Detecte la inestabilidad antes de que afecte a su rama predeterminada
  mediante Early Flake Detection.
further_reading:
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
- link: /tests/flaky_test_management
  tag: Documentación
  text: Obtenga información sobre Flaky Test Management
- link: /pr_gates
  tag: Documentación
  text: Aprenda sobre PR Gates.
title: Detección temprana de inestabilidad
---
## Descripción general {#overview}

Early Flake Detection es la solución de inestabilidad de pruebas de Datadog que mejora la calidad del código al identificar [pruebas inestables][1] al principio del ciclo de desarrollo. Para obtener más información sobre las pruebas inestables, consulte [Flaky Test Management][2].

Al ejecutar las pruebas recién añadidas varias veces, Datadog puede detectar la inestabilidad antes de que estas pruebas se fusionen en la rama predeterminada. Un estudio muestra que hasta el [75 % de las pruebas inestables][3] pueden identificarse con este enfoque.

Pruebas conocidas
: El backend de Datadog almacena pruebas únicas para un servicio de pruebas determinado. Antes de que se ejecute una sesión de pruebas, la biblioteca de Datadog obtiene la lista de estas pruebas conocidas.

Detección de nuevas pruebas
: Si una prueba no se encuentra en la lista de pruebas conocidas, se considera **nueva** y se reintenta automáticamente hasta diez veces.

Identificación de inestabilidad
: Ejecutar una prueba varias veces ayuda a descubrir problemas como condiciones de carrera, que pueden hacer que la prueba pase y falle de forma intermitente. Si alguno de los intentos de prueba falla, la prueba se etiqueta automáticamente como inestable.

Ejecutar una prueba varias veces aumenta la probabilidad de exponer condiciones aleatorias que causan inestabilidad. Early Flake Detection ayuda a garantizar que solo se integren pruebas estables y confiables en la rama predeterminada:

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation_new.png" alt="Cómo funciona Early Flake Detection en sus commits" style="width:100%">}}

Puede optar por bloquear la fusión de la rama de funcionalidad con un [PR Gate][4]. Para obtener más información, consulte la [documentación de PR Gates][5].

## Configuración {#setup}

Antes de implementar Early Flake Detection, debe configurar [Test Optimization][6] para su entorno de desarrollo. Si está reportando datos a través del Datadog Agent, utilice la versión 6.40 o 7.40 y posteriores.

### Configuración {#configuration}

Después de configurar su biblioteca de Datadog para Test Optimization, configure Early Flake Detection en [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][7]. Puede aplicar la configuración a nivel de organización, repositorio o servicio de pruebas.

{{< img src="continuous_integration/early_flake_detection_test_settings-1.png" alt="Interruptor de Early Flake Detection en CI/CD Settings." style="width:100%" >}}

1. Abra [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][7].
1. Elija dónde aplicar la configuración:
   - Seleccione la pestaña {{< ui >}}Organization{{< /ui >}} para actualizar el valor predeterminado de la organización.
   - Seleccione la pestaña {{< ui >}}Repository-specific{{< /ui >}} para anular el valor predeterminado de un solo repositorio o para aplicar una anulación a uno de sus servicios de pruebas.
1. En {{< ui >}}Prevention{{< /ui >}}, active el {{< ui >}}Early Flake Detection{{< /ui >}}.

## Compatibilidad {#compatibility}
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

`dd-trace-js>=5.23.0`

La compatibilidad del marco de pruebas es la misma que [Test Optimization Compatibility][1], con la excepción de `playwright`, que solo es compatible a partir de `>=1.38.0`.

[1]: /es/tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

La compatibilidad del marco de pruebas es la misma que [Test Optimization Compatibility][2], con la excepción de `Scala Weaver`.

[2]: /es/tests/setup/java/#compatibility
{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{% tab "Python" %}}

`dd-trace-py >= 3.0.0` (`pytest >= 7.2.0`)

{{% /tab %}}

{{% tab "Ruby" %}}

`datadog-ci-rb>=1.5.0`

{{% /tab %}}

{{% tab "Go" %}}

`ddtest >= 1.14.0`

{{% /tab %}}

{{% tab "Swift" %}}

`dd-sdk-swift-testing>=2.5.2`

{{% /tab %}}

{{< /tabs >}}

<div class="alert alert-warning">
Los servicios de pruebas con más de 100 000 pruebas conocidas requieren una versión de la biblioteca de Datadog que admita la paginación en el punto de conexión de pruebas conocidas. Las versiones mínimas anteriores cubren el lanzamiento inicial de EFD; la compatibilidad con la paginación llegó más tarde. Sin ella, la biblioteca no puede obtener la línea base de pruebas conocidas y Early Flake Detection no se ejecuta en esa sesión.
</div>

Las siguientes versiones de la biblioteca de Datadog añaden compatibilidad con la paginación en el punto de conexión de pruebas conocidas:

| Biblioteca                | Versión mínima |
| ---------------------- | --------------- |
| `dd-trace-js`          | 5.94.0          |
| `dd-trace-java`        | 1.60.0          |
| `dd-trace-dotnet`      | 3.42.0          |
| `ddtrace` (Python)     | 4.6.0           |
| `datadog-ci` (Ruby)    | 1.27.0          |
| `ddtest` (Go)          | 1.14.0          |
| `dd-sdk-swift-testing` | 2.6.7           |

## Explorar resultados en el Test Optimization Explorer {#explore-results-in-the-test-optimization-explorer}

Puede usar las siguientes facetas para consultar las sesiones que ejecutan Early Flake Detection y las pruebas nuevas en [Test Optimization Explorer][8].

* **Test Session**: Las sesiones de prueba que ejecutan Early Flake Detection tienen la etiqueta `@test.early_flake.enabled` establecida en `true`.
* **New Tests**: Las pruebas nuevas tienen la etiqueta `@test.is_new` establecida en `true`, y los reintentos de esta prueba tienen la etiqueta `@test.is_retry` establecida en `true`.

## Solución de problemas {#troubleshooting}

Si sospecha que hay problemas con Early Flake Detection, abra [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][7], busque su repositorio o servicio de pruebas y desactive Early Flake Detection.

### No se está reintentando una prueba nueva {#a-new-test-is-not-being-retried}

Esto puede deberse a dos motivos:

* Esta prueba se ha ejecutado anteriormente.
* Esta prueba tarda más de cinco minutos. Existe un mecanismo para no ejecutar Early Flake Detection en pruebas que son demasiado lentas, ya que reintentar estas pruebas podría causar retrasos significativos en los Pipelines de CI.

Por último, si su servicio de pruebas tiene más de 100 000 pruebas conocidas y su versión de la biblioteca de Datadog no admite la paginación en el punto de conexión de pruebas conocidas, la biblioteca no puede obtener la línea base de pruebas conocidas y no se identifica ninguna prueba como nueva. Para evitar esto, actualice a la versión más reciente del rastreador.

### Se reintentó una prueba que no es nueva {#a-test-was-retried-that-is-not-new}

Si una prueba no ha estado activa durante más de 14 días, podría volver a identificarse como nueva.

Si la biblioteca de Datadog no puede obtener la lista completa de pruebas conocidas, es posible que la biblioteca de Datadog reintente pruebas que no son nuevas. Existe un mecanismo para evitar que este error ralentice el pipeline de CI, pero, si sucede, comuníquese con [Soporte de Datadog][9].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#flaky-test
[2]: /es/tests/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /es/pr_gates/
[5]: /es/pr_gates/setup
[6]: /es/tests
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /es/tests/explorer/
[9]: /es/help/