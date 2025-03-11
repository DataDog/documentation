---
aliases:
- /es/tests/early_flake_detection
description: Detecta los defectos antes de que afecten a tu rama predeterminada mediante
  la característica Detección temprana de defectos.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization
- link: /tests/flaky_test_management
  tag: Documentación
  text: Más información sobre Gestión de tests defectuosos
- link: /quality_gates
  tag: Documentación
  text: Más información sobre Umbrales de calidad
title: Detección temprana de defectos
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La detección temprana de defectos no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" header="¡Obtén la vista previa!" >}}
La detección temprana de defectos está en vista previa.
{{< /callout >}}

## Resumen

Detección temprana de defectos es la solución de Datadog que mejora la calidad del código identificando [tests defectuosos][1] al principio del ciclo de desarrollo. Para más información sobre tests defectuosos, consulta [Gestión de tests defectuosos][2].

Ejecutando varias veces los tests recién añadidos, Datadog puede detectar errores antes de que estos tests se incorporen a la rama por defecto. En un estudio, se muestra que hasta el [75% de los tests defectuosos][3] pueden ser identificados con este enfoque.

Tests conocidos
 El backend de Datadog almacena tests únicos para un determinado servicio de tests. Antes de que se ejecute una sesión de test, la biblioteca de Datadog recupera la lista de estos tests conocidos.

Detección de nuevos tests
: si un test no se encuentra en la lista de tests conocidos, se considera **nuevo** y se vuelve a intentar automáticamente hasta diez veces.

Identificación de fallos
: ejecutar un test varias veces ayuda a detectar problemas como las condiciones de carrera, que pueden hacer que el test sea exitoso y falle de forma intermitente. Si alguno de los intentos de test falla, el test se etiqueta automáticamente como defectuoso.

Ejecutar un test varias veces aumenta la probabilidad de exponer condiciones aleatorias que causan fallos. La detección temprana de defectos ayuda a garantizar que sólo los tests estables y fiables se integren en la rama por defecto:

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation_new.png" alt="Cómo la detección temprana de defectos funciona en tus confirmaciones" style="width:100%">}}

Puedes optar por bloquear la fusión de la rama de características con una [Quality Gate][4]. Para obtener más información, consulta la [documentación de Quality Gates][5].

## Configuración

Antes de implementar la Detección temprana de defectos, debes configurar [Test optimization][6] para tu entorno de desarrollo. Si estás informando datos a través de Datadog Agent, utiliza la versión 6.40 o 7.40 y posteriores.

### Configuración

Después de haber configurado tu biblioteca de Datadog para Test Optimization, puedes configurar la detección temprana de defectos desde la [página de configuración de Test Optimization][7].

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="La detección temprana de defectos en la configuración de servicios de test." style="width:100%" >}}

1. 1. Ve a [**Software Delivery** > **Test Optimization** > **Settings**][7] (**Entrega de software** > **Test Optimization** > **Configuración**).
1. 2. Haz clic en **Configure** (Configurar) en la columna Early Flake Detection (Detección temprana de defectos) para un servicio de tests.
1. 2. Haz clic en el conmutador para activar la Detección temprana de defectos y añade o modifica la lista de [**Ramas excluidas de la detección temprana de defectos**](#manage-excluded-branches).

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Activar la Detección temprana de defectos y definir las ramas excluidas en la configuración de servicios de tests" style="width:60%">}}

## Compatibilidad
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

Las versiones requeridas del marco de tests y dd-trace son:

`dd-trace-js`:
* `>=5.23.0` para la versión 5.x.
* `>=4.47.0` para la versión 4.x.

La compatibilidad del marco de tests es la misma que la [Compatibilidad de optimización de tests][1], con la excepción de `playwright`, que sólo es compatible a partir de `>=1.38.0`.

[1]: tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">La Detección temprana de defectos está disponible utilizando la fase beta del nuevo complemento pytest. Establece la variable de entorno <code>DD_PYTEST_USE_NEW_PLUGIN_BETA</code> en <code>true</code> para habilitarla.</div>

`dd-trace-py>=2.18.0` (`pytest>=7.2.0`)

{{% /tab %}}

{{% tab "Ruby" %}}

`datadog-ci-rb>=1.5.0`

{{% /tab %}}

{{% tab "Go" %}}

<div class="alert alert-info">Test optimization para Go está en vista previa.</div>

`orchestrion >= 0.9.4 + dd-trace-go >= 1.69.1`

{{% /tab %}}

{{% tab "Swift" %}}

`dd-sdk-swift-testing>=2.5.2`

{{% /tab %}}

{{< /tabs >}}


## Gestionar ramas excluidas

Las ramas excluidas no tienen tests reintentados por la detección temprana de defectos. Los tests realizados en estas ramas no se consideran nuevos a efectos de la detección temprana de defectos. Puedes gestionar la lista de las ramas excluidas en la página [Configuración de Test optimization][7], asegurándote de que la función se adapta a tu flujo de trabajo y estructura de ramas específicos.

## Explorar los resultados en el Test Optimization Explorer

Puedes utilizar las siguientes facetas para consultar las sesiones que ejecutan la Detección temprana de defectos y los nuevos tests en el [Test Optimization Explorer][8].

* **Sesión de tests**: las sesiones de tests que ejecutan Detección temprana de defectos tienen la etiqueta (tag) `@test.early_flake.enabled` establecida en `true`.
* **Tests nuevos**: los tests nuevos tienen la etiqueta `@test.is_new` establecida en `true`, y los reintentos para estos tests tienen la etiqueta `@test.is_retry` establecida en`true`.

## Resolución de problemas

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
[4]: /es/quality_gates/
[5]: /es/quality_gates/setup
[6]: /es/tests
[7]: https://app.datadoghq.com/ci/settings/test-optimization
[8]: /es/tests/explorer/
[9]: /es/help/