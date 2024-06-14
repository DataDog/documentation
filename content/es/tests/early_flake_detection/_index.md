---
description: Detecta los defectos antes de que afecten a tu rama predeterminada mediante
  la característica Detección temprana de defectos.
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Visibilidad de pruebas
- link: /tests/guides/flaky_test_management
  tag: Documentación
  text: Más información sobre Gestión de pruebas defectuosas
- link: /quality_gates
  tag: Documentación
  text: Más información sobre Umbrales de calidad
kind: documentación
title: Detección temprana de defectos
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Detección temprana de defectos no está disponible en el sitio seleccionado ({{< region-param key="dd_site_name" >}}) en este momento.</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Detección temprana de defectos está en beta pública.
{{< /callout >}}

## Información general

Detección temprana de defectos es la solución de pruebas defectuosas de Datadog que mejora la calidad del código gracias a la identificación de [pruebas defectuosas][1] al principio del ciclo de desarrollo. Para obtener más información sobre las pruebas defectuosas, consulta [Gestión de pruebas defectuosas][2].

Al ejecutar varias veces las pruebas recién añadidas, Datadog puede detectar defectos antes de que estas pruebas se incorporen a la rama predeterminada. Un estudio muestra que este método permite identificar hasta el [75 % de las pruebas defectuosas][3].

Pruebas conocidas
: el backend de Datadog almacena pruebas únicas para un servicio de pruebas determinado. Antes de que se ejecute una sesión de prueba, la biblioteca de Datadog recupera la lista de estas pruebas conocidas.

Detección de pruebas nuevas
: si una prueba no se encuentra en lista de pruebas conocidas, se considera **nueva** y se reintenta automáticamente hasta diez veces.

Identificación de defectos
: ejecutar una prueba varias veces ayuda a descubrir problemas como las condiciones de secuencia, que pueden hacer que la prueba resulte exitosa y falle de forma intermitente. Si alguno de los intentos de prueba falla, la prueba se etiqueta automáticamente como defectuosa.

Ejecutar una prueba varias veces aumenta la probabilidad de exponer las condiciones aleatorias que causan defectos. Detección temprana de defectos ayuda a garantizar que solo las pruebas estables y fiables se integren en la rama principal.

Puedes elegir bloquear la fusión de la rama de características con un [Umbral de calidad][4]. Para obtener más información, consulta la [documentación de Umbrales de calidad][5].

## Configuración

Antes de implementar Detección temprana de defectos, debes configurar [Visibilidad de pruebas][6] para tu entorno de desarrollo. Si reportas datos a través de Datadog Agent, utiliza las versiones 6.40 o 7.40 y posteriores.

### Configuración

Después de haber configurado tu biblioteca de Datadog para Visibilidad de pruebas, puedes configurar Detección temprana de defectos desde la [página Parámetros del servicio de pruebas][7].

{{< img src="continuous_integration/early_flake_detection_test_settings.png" alt="Detección temprana de defectos en Parámetros del servicio de pruebas." style="width:100%" >}}

1. Ve a [**Software Delivery** (Entrega de software) > **Test Visibility** (Visibilidad de pruebas) > **Settings** (Parámetros)][7].
1. Haz clic en **Configure** (Configurar) en la columna **Early Flake Detection** (Detección temprana de defectos) para elegir un servicio de pruebas.
1. Haz clic en el icono de interruptor para habilitar Detección temprana de defectos y añadir o modificar la lista de [**Ramas excluidas de Detección temprana de defectos**](#manage-excluded-branches).

{{< img src="continuous_integration/early_flake_detection_configuration_modal.png" alt="Habilitación de Detección temprana de defectos y definición de ramas excluidas en la configuración del servicio de pruebas" style="width:60%">}}

## Compatibilidad
{{< tabs >}}
{{% tab "JavaScript/TypeScript" %}}

Se necesitan las siguientes versiones del marco de pruebas y de dd-trace:

`dd-trace-js`:
* `>=5.12.0` para la versión 5.x.
* `>=4.36.0` para la versión 4.x.
* `>=3.57.0` para la versión 3.x.

La compatibilidad del marco de pruebas es la misma que la [Compatibilidad de Visibilidad de pruebas][1], con la excepción de `playwright`, que solo es compatible a partir de la versión `>=1.38.0`.

[1]: /es/tests/setup/javascript/?tab=cloudciprovideragentless#compatibility
{{% /tab %}}

{{% tab "Java" %}}

`dd-trace-java>=1.34.0`

{{% /tab %}}

{{% tab ".NET" %}}

`dd-trace-dotnet>=2.51.0`

{{% /tab %}}

{{< /tabs >}}


## Gestionar ramas excluidas

Detección temprana de defectos no reintentará ninguna prueba de las ramas excluidas. Las pruebas realizadas en estas ramas no se consideran nuevas en el marco de Detección temprana de defectos.

{{< img src="continuous_integration/early_flake_detection_commit_new_test_explanation.png" alt="Funcionamiento de Detección temprana de defectos en los commits" style="width:100%">}}

Puedes gestionar la lista de ramas excluidas en la [página Parámetros del servicio de pruebas][7] y asegurarte de que la característica se adapta a tu flujo de trabajo y estructura de ramas específicos.

## Explorar los resultados en el Explorador de visibilidad de pruebas

Puedes utilizar las siguientes facetas para consultar las sesiones que ejecutan Detección temprana de defectos y pruebas nuevas en el [Explorador de visibilidad de pruebas][8].

* **Sesión de prueba**: las sesiones de prueba que ejecutan Detección temprana de defectos tienen la etiqueta (tag) `@test.early_flake.enabled` establecida en `true`.
* **Pruebas nuevas**: las pruebas nuevas tienen la etiqueta `@test.is_new` establecida en `true`, y los reintentos para estas pruebas tienen la etiqueta `@test.is_retry` establecida en`true`.

## Solucionar problemas

Si crees que hay algún problema con Detección temprana de defectos, ve a la [página Parámetros del servicio de pruebas][7], busca tu servicio de pruebas y haz clic en **Configure** (Configurar). Haz clic en el icono de interruptor para desactivar Detección temprana de defectos.

### No se reintenta una prueba nueva

Esto puede deberse a un par de motivos:

* Esta prueba ya se ha ejecutado en una rama excluida, como `staging`, `main` o `preprod`.
* Esta prueba demora más de cinco minutos. Existe un mecanismo para no ejecutar Detección temprana de defectos en pruebas que son demasiado lentas, ya que hacerlo puede provocar retrasos significativos en los pipelines de CI.

### Se ha reintentado una prueba que no es nueva

Si la biblioteca de Datadog no puede obtener la lista completa de pruebas conocidas, la biblioteca de Datadog puede reintentar pruebas que no son nuevas. Existe un mecanismo para evitar que este error ralentice el pipeline de CI, pero si ocurre, ponte en contacto con [Datadog Support][9].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/glossary/#flaky-test
[2]: /es/tests/guides/flaky_test_management
[3]: https://2020.splashcon.org/details/splash-2020-oopsla/78/A-Large-Scale-Longitudinal-Study-of-Flaky-Tests
[4]: /es/quality_gates/
[5]: /es/quality_gates/setup
[6]: /es/tests
[7]: https://app.datadoghq.com/ci/settings/test-service
[8]: /es/tests/explorer/
[9]: /es/help/