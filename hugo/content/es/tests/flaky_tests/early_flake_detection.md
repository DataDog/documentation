---
aliases:
- /es/tests/early_flake_detection
- /es/tests/flaky_test_management/early_flake_detection
description: Detecta los defectos antes de que afecten a tu rama predeterminada mediante
  la Detección temprana de defectos.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization (optimización de tests)
- link: /tests/flaky_test_management
  tag: Documentación
  text: Más información sobre gestión de tests defectuosos
- link: /pr_gates
  tag: Documentación
  text: Más información sobre PR Gates
title: Detección temprana de defectos
---

## Información general

La detección temprana de defectos es la solución para tests defectuosos de Datadog que mejora la calidad del código gracias a la identificación de [tests defectuosos][1] al principio del ciclo de desarrollo. Para obtener más información sobre los tests defectuosos, consulta [Gestión de tests defectuosos][2].

Al ejecutar varias veces los tests recién añadidos, Datadog puede detectar defectos antes de que estos tests se incorporen a la rama predeterminada. Un estudio muestra que este método permite identificar hasta el [75 % de los tests defectuosos][3].

Tests conocidos
: el backend de Datadog almacena tests únicos para un servicio de tests determinado. Antes de que se ejecute una sesión de tests, la biblioteca de Datadog recupera la lista de estos tests conocidos.

Detección de tests nuevos
: si un test no se encuentra en lista de tests conocidos, se considera **nuevo** y se reintenta automáticamente hasta diez veces.

Identificación de defectos
: ejecutar un test varias veces ayuda a descubrir problemas como las condiciones de secuencia, que pueden hacer que el test resulte exitoso y falle de forma intermitente. Si alguno de los intentos del test falla, el test se etiqueta automáticamente como defectuoso.

Ejecutar un test varias veces aumenta la probabilidad de exponer condiciones aleatorias que causan defectos. La detección temprana de defectos ayuda a garantizar que solo se integren en la rama predeterminada los tests estables y fiables:

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation_new.png" alt="Cómo funciona la detección temprana de defectos en tus confirmaciones" style="width:100%">}}

Puedes elegir bloquear la fusión de la rama de funciones con una [PR Gate][4]. Para obtener más información, consulta la [documentación de PR Gates][5].

## Configurar

Antes de implementar la Detección temprana de defectos, debes configurar [Test Optimización (optimización de tests)][6] para tu entorno de desarrollo. Si estás reportando datos a través del Datadog Agent, utiliza v6.40 o 7.40 y posteriores.

### Configuración

Una vez que hayas configurado tu biblioteca de Datadog para Test Optimization (optimización de tests), puedes configurar la detección temprana de defectos desde la page (página) de parámetros de [Test Optimization (optimización de tests)][7].

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Detección temprana de defectos en Parámetros del servicio de tests." style="width:100%" >}}

1. Ve a [**Software Delivery** (Envío de software) > **Test Optimization** (Optimización de tests) > **Settings** (Parámetros)][7].
1. Haz clic en **Configure** (Configurar) en la columna **Early Flake Detection** (Detección temprana de defectos) para elegir un servicio de tests.
1. Haz clic en el conmutador para activar la Detección Temprana de Defectos.

## Compatibilidad
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

Se necesitan las siguientes versiones del framework de tests y de dd-trace:

`dd-trace-js`:
* `>=5.23.0` para la versión 5.x.
* `>=4.47.0` para la versión 4.x.

La compatibilidad del framework de test es la misma que la [Compatibilidad de Test Optimization (optimización de tests)][1], con la excepción de `playwright`, que solo es compatible a partir de `>=1.38.0`.

[1]: /es/tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

La compatibilidad del framework de test es la misma que la [Compatibilidad de Ttest Optimización (optimización de tests)][2], con la excepción de `Scala Weaver`.

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

`orchestrion >= 0.9.4 + dd-trace-go >= 1.69.1`

{{% /tab %}}

{{% tab "Swift" %}}

`dd-sdk-swift-testing>=2.5.2`

{{% /tab %}}

{{< /tabs >}}


## Explorar los resultados en el Test Optimization Explorer

Puedes utilizar las siguientes facetas para consultar las sesiones que ejecutan la Detección temprana de defectos y los nuevos tests en el [Test Optimization Explorer][8].

* **Sesión de tests**: las sesiones de tests que ejecutan Detección temprana de defectos tienen la etiqueta (tag) `@test.early_flake.enabled` establecida en `true`.
* **Tests nuevos**: los tests nuevos tienen la etiqueta `@test.is_new` establecida en `true`, y los reintentos para estos tests tienen la etiqueta `@test.is_retry` establecida en`true`.

## Solucionar problemas

Si sospechas que hay problemas con la Detección temprana de defectos, ve a la página [Configuración de Test optimization][7], busca tu repositorio y haz clic en **Configure** (Configurar). Desactiva la Detección temprana de defectos haciendo clic en el conmutador.

### No se reintenta un test nuevo

Esto puede deberse a un par de motivos:

* Este test ya se ha realizado anteriormente.
* Este test demora más de cinco minutos. Existe un mecanismo para no ejecutar Detección temprana de defectos en tests que son demasiado lentos, ya que hacerlo puede provocar retrasos significativos en los pipelines de CI.

### Se ha reintentado un test que no es nuevo

Si la biblioteca de Datadog no puede obtener la lista completa de tests conocidos, es posible que la biblioteca de Datadog reintente tests que no son nuevos. Existe un mecanismo para evitar que este error ralentice el pipeline de CI, pero si ocurre, ponte en contacto con [Datadog Support][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#flaky-test
[2]: /es/tests/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /es/pr_gates/
[5]: /es/pr_gates/setup
[6]: /es/tests
[7]: https://app.datadoghq.com/ci/settings/test-optimization
[8]: /es/tests/explorer/
[9]: /es/help/