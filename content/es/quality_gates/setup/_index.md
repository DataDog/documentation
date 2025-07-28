---
description: Aprende a configurar reglas de la puerta de calidad en Datadog.
further_reading:
- link: /quality_gates
  tag: Documentación
  text: Más información sobre las puertas de calidad
title: Configurar reglas de la puerta calidad
---

## Información general

Para usar las puertas de calidad de Datadog, puedes definir una o más reglas en la página de [**Reglas de la puerta de calidad**][2] e integrarlas en tu pipeline de CI con el comando [`datadog-ci gate evaluate`][4].

{{< img src="quality_gates/rules_list_2.png" alt="Página de puertas de calidad en Datadog" style="width:100%" >}}

Las puertas de calidad garantizan que solo se despliegue el código que cumple con tus estándares de calidad, lo que automatiza tus procesos de control de calidad y mejora la fiabilidad del software.

## Crear una regla

Para crear una regla de puertas de calidad en Datadog:

1. Dirígete a [**Software Delivery** > **Quality Gates** > **Quality Gate Rules**][2] (Entrega de software > Puertas de calidad > Reglas de la puerta de calidad) y haz clic en **+ New Rule** (+ Regla nueva).
2. Selecciona un tipo de regla: `Test`, `Static Analysis` (análisis estático) o `Software Composition Analysis`.
3. Establece el contexto de la regla, que define cuándo se debe evaluar, al seleccionar `Always evaluate` (Evaluar siempre) o `Select when to evaluate` (Seleccionar cuándo evaluar). Puedes añadir ramas o repositorios para incluirlos o excluirlos del contexto de la regla, o añadir un contexto personalizado.

   {{< img src="quality_gates/setup/custom_scope_1.png" alt="Cómo añadir un contexto personalizado al contexto de una regla en las puertas de calidad" style="width:80%;">}}

   Puedes crear una regla que solo se evalúe en repositorios y ramas específicos. Para personalizar el contexto de la regla, haz clic en `Select when to evaluate` (Seleccionar cuándo evaluar) y especifica la rama o el repositorio que se debe incluir o excluir.

   Para añadir un contexto personalizado (como el nombre de un equipo), haz clic en **+ Add Filter** (+ Añadir filtro) y selecciona **Custom scope** (Contexto personalizado). Ingresa un nombre de etiqueta (tag) sin espacios (como `documentation` o `team-documentation`) y haz clic en **Add Custom Scope** (Añadir contexto personalizado). Ingresa los valores que se deben incluir o excluir. 

   Al añadir un contexto personalizado a una regla, los contextos personalizados se deben pasar al comando `datadog-ci gate evaluate` mediante la opción `--scope`. Para obtener más información, consulta [Comprensión de los contextos de las reglas][13].

4. Define las condiciones de la regla. La condición de la regla indica en qué escenario falla la regla, lo que hace que falle el pipeline relacionado (si la regla está bloqueando). Puedes seleccionar una de las condiciones de regla existentes para el tipo de regla que hayas seleccionado. Si el contexto de la regla se establece en `always evaluate` (evaluar siempre), la regla se evalúa en todos los repositorios y ramas.

   En el siguiente ejemplo se demuestra cómo crear una regla de análisis estático que falla cuando hay una o más infracciones de calidad de código de análisis estático con el estado `error` en un repositorio.

   Selecciona **Static Analysis** (Análsis estático) para el tipo de regla y haz clic en `Always evaluate` (Evaluar siempre) para el contexto de la regla. 

   {{< img src="quality_gates/setup/static_analysis_2.png" alt="Una regla de análisis estático que falla cuando hay cualquier infracción de calidad del código con un estado de error en cualquier servicio" style="width:100%" >}}

   En la sección **Define rule conditions** (Definir condiciones de la regla), selecciona `code quality violations` (infracciones de calidad del código) en el menú desplegable. Luego, selecciona el tipo de estado `error`, selecciona `above or equal to` (superior o igual a) e ingresa el valor `1`. 

5. Especifica un nombre de regla que describa la regla que estás creando.
6. Selecciona si la regla debe bloquear el pipeline cuando falla. Las reglas sin capacidad de bloqueo son útiles cuando implementas una regla nueva y quieres verificar su comportamiento antes de darle la capacidad de bloqueo.
7. Integra la regla de la puerta de calidad en tu configuración de compilación incluido el [comando `datadog-ci gate evaluate`](#integrate-quality-gates-in-your-cicd-pipeline).
8. Habilita un [check de estado de GitHub](#enable-github-check-creation) para la regla de tu puerta de calidad al configurar los permisos adecuados (como `Checks: Write`) en tus aplicaciones de GitHub. Para darle a este check la capacidad de bloqueo en tus solicitudes pull, debes hacer clic en la casilla de verificación **Required** (Requerido) en la [configuración de ramas protegidas][14] de tu aplicación de GitHub.
9. Haz clic en **Create Rule** (Crear regla).

### Integrar puertas de calidad en tu pipeline de CI/CD

Invoca la evaluación de puertas de calidad al llamar al comando [`datadog-ci gate evaluate`][4]. Las puertas de calidad requieren la versión `2.27.0` o posterior de [`datadog-ci`][7].

<div class="alert alert-info">Para que el comando funcione de forma adecuada, asegúrate de que los eventos (tests, análisis estático e infracciones de Software Composition Analysis) se envíen a Datadog <strong>antes</strong> de que se ejecute el comando <code>datadog-ci gate evaluate</code>. De lo contrario, es posible que las reglas muestren un comportamiento incorrecto debido a la ausencia de estos eventos.
</div>

Este comando:

1. Recupera todas las reglas que tienen [contextos de reglas y contextos personalizados][13] que coinciden con el contexto del pipeline actual (el repositorio, la rama o los contextos personalizados pasados ​​en el comando).
2. Evalúa todas las reglas coincidentes.
3. Falla si fallan una o más reglas de bloqueo, lo que bloquea el pipeline.

| Variables de entorno | Descripción |
|---|---|
| `DD_API_KEY` | Señala tu [clave de API de Datadog][5]. |
| `DD_APP_KEY` | Señala tu [clave de aplicación de Datadog][6]. La clave de aplicación debe tener el permiso `Quality Gates Evaluations` habilitado.|
| `DD_SITE` | (Opcional) Señala tu [sitio de Datadog][12] específico (el valor predeterminado es {{< region-param key="dd_site" code="true" >}}). **Nota**: `DATADOG_SITE` no es compatible. |

Por ejemplo:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=API_KEY DD_APP_KEY=APP_KEY datadog-ci gate evaluate
```

Configura el comportamiento del comando `datadog-ci gate evaluate` con las siguientes marcas:

`--fail-on-empty`
: El comando falla si no se encuentran reglas coincidentes en función del contexto del pipeline actual. De manera predeterminada, el comando se ejecuta correctamente.

`--fail-if-unavailable`
: El comando falla si una o más reglas no se pueden evaluar debido a un problema interno.
De manera predeterminada, el comando se ejecuta correctamente.

`--timeout`
: El comando detiene su ejecución después del tiempo de espera especificado en segundos. El tiempo de espera predeterminado es de 10 minutos. Por lo general, el comando se completa en unos minutos, pero podría tardar más.

`--no-wait`
: Omite el tiempo predeterminado que el comando espera para que los eventos (por ejemplo, tests, infracciones de análisis estático) lleguen a Datadog. El tiempo de espera predeterminado garantiza que los eventos se puedan consultar en Datadog antes de que se ejecuten las reglas, lo que evita evaluaciones incorrectas. Si, en tu pipeline, el trabajo que contiene el comando `datadog-ci gate evaluate` se llama varios minutos después de que se envían los eventos relacionados a Datadog, puedes optar por omitir este tiempo de espera al establecer la marca `--no-wait`. Sin embargo, si se usa incorrectamente, esta marca puede generar evaluaciones de reglas inexactas.

Añade [contextos personalizados][13] al comando con la opción `--contexto` una o más veces:

```shell
datadog-ci gate evaluate --scope team:backend --scope team:frontend
```

Consulta los logs de comandos para ver el estado general de la evaluación de la puerta y la información sobre las reglas que se evaluaron.

{{< img src="ci/datadog_ci_gate_evaluate_logs.png" alt="Logs de datadog-ci gate evaluate" style="width:100%;">}}

### Habilitar la creación de checks en GitHub

Puedes crear de manera automática un [check de GitHub][9] para cada regla evaluada. El check contiene información adicional sobre la evaluación de la regla, como el motivo de la falla y los eventos coincidentes en Datadog. Cuando esta función se encuentra habilitada, los resultados de la evaluación aparecen directamente en GitHub.

Para habilitar los checks de GitHub:

1. Dirígete al [cuadro de integración de GitHub][10]. Si no tienes configurada esta integración o no tienes una aplicación de GitHub en la integración, sigue [la documentación de la integración de GitHub][11] para configurar una.
2. Otorga acceso de `Checks: Write` a la aplicación de GitHub.

Una vez que se otorgue el permiso, podrás ver los checks en GitHub.

**Nota**: Volver a ejecutar un check no vuelve a ejecutar la regla de puertas de calidad correspondiente.

## Gestionar reglas

Puedes editar y eliminar reglas de puertas de calidad al colocar el ratón sobre una regla en la [página de **Reglas de puertas de calidad**][2].

{{< img src="quality_gates/setup/delete_2.png" alt="Edita, clona o elimina una regla de puertas de calidad" style="width:100%;">}}

De manera alternativa, haz clic en una regla de la lista y haz clic en los iconos para **editar**, **clonar** o **eliminar**.

## {{< img src="synthetics/mobile_app_tests.png" alt="Examples of the recording workflow for a Sintético Mobile Test" style="width:100%;">}}

Lanzar localizaciones privadas

Utiliza [Localizaciones privadas sintéticas][15] para monitorizar APIs y sitios web internos, o crea localizaciones personalizadas en áreas críticas para tu negocio.

## {{< img src="synthetics/browser_test.mp4" alt="Browser tests" video=true style="width:100%;">}}

Grabar pruebas de aplicaciones móviles

[1]: /es/account_management/rbac/permissions
[2]: https://app.datadoghq.com/ci/quality-gates
[3]: /es/account_management/audit_trail/events/#ci-visibility-events
[4]: https://github.com/DataDog/datadog-ci/blob/master/src/commands/gate/README.md
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/organization-settings/application-keys
[7]: https://github.com/DataDog/datadog-ci/blob/master/README.md
[8]: /es/continuous_integration/guides/flaky_test_management/
[9]: https://docs.github.com/en/rest/checks
[10]: https://app.datadoghq.com/integrations/github
[11]: https://docs.datadoghq.com/es/integrations/github/
[12]: /es/getting_started/site/
[13]: /es/quality_gates/guide/understanding_rule_scopes
[14]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches