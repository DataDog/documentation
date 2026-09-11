---
aliases:
- /es/continuous_integration/intelligent_test_runner/
- /es/intelligent_test_runner
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: Comprueba las últimas versiones de Software Delivery (Es necesario iniciar
    sesión en la aplicación)
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: Blog
  text: Agiliza los tests de CI con Datadog Intelligent Test Runner
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines de CI con Datadog
title: Test Impact Analysis
---

<div class="alert alert-danger"> Esta función se conocía anteriormente como Intelligent Test Runner, y algunas etiquetas (tags) todavía contienen "itr".</div>

## Información general

Test Impact Analysis selecciona y ejecuta automáticamente sólo los tests relevantes para una confirmación determinada en función del código que se está modificando. Reduce significativamente el tiempo dedicado a los tests y los costes generales de CI, al tiempo que mantienes la cobertura de los tests.

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis activado en una sesión de test session que muestra su ahorro de tiempo.">}}

Test Impact Analysis funciona mediante el análisis en conjunto de tests para identificar el código que abarca cada test. A continuación, cruza esa cobertura con los archivos afectados por un nuevo cambio de código. Datadog utiliza esta información para ejecutar una selección de tests relevantes y afectados, omitiendo los que no se ven afectados por el cambio de código y reduciendo la duración total de los tests. Más información sobre [Cómo funciona][1].

Al minimizar el número de tests que se ejecutan por confirmación, Test Impact Analysis reduce la frecuencia de [tests defectuosos][2] que interrumpen tus pipelines. Esto puede ser particularmente frustrante cuando el test que falla no está relacionado con el cambio de código que se está probando. Después de habilitar Test Impact Analysis para tus servicios de test, puedes limitar cada confirmación a tus tests relevantes para asegurar que los tests defectuosos no relacionados con el cambio de código no terminen rompiendo arbitrariamente la compilación.

### Limitaciones de configuración predefinidas

Con la configuración predeterminada, hay situaciones conocidas que pueden hacer que Test Impact Analysis omita tests que deberían haberse ejecutado. En concreto, Test Impact Analysis no es capaz de detectar automáticamente cambios en:

- Dependencias de librería
- Opciones del compilador
- Servicios externos
- Cambios en los archivos de datos en los tests basados en datos

En estos casos, Test Impact Analysis podría omitir los tests afectados con la configuración predefinida.

Existen varios mecanismos de configuración que puedes utilizar en estos casos para asegurarte de que no se omite ningún test:

- Puedes marcar ciertos archivos en tu repositorio como [archivos rastreados](#tracked-files), lo que hace que todos los tests se ejecuten cada vez que se cambien estos archivos. Los Dockerfiles, Makefiles, archivos de dependencias y otros archivos de configuración de compilación son buenos candidatos para archivos rastreados.
- Puedes marcar ciertos tests en tu código fuente como no omitibles para asegurarte de que siempre se ejecutan. Esto es adecuado para tests basados en datos o tests que interactúan con sistemas externos. Más información en la [página de configuración][3].
- Si estás creando una confirmación arriesgada y deseas ejecutar todos los tests, añade `ITR:NoSkip` (sin distinguir mayúsculas de minúsculas) en cualquier parte del mensaje de confirmación de Git.
- Si GitHub es tu proveedor de gestión de código fuente, utiliza la etiqueta `ITR:NoSkip` (no distingue mayúsculas de minúsculas) para evitar que Test Impact Analysis omita tests en solicitudes pull. Para utilizar esta función, configura la aplicación de GitHub mediante el [cuadro de integración de GitHub][9] con la función `Software Delivery: Collect Pull Request Information` activada. Este mecanismo no funciona con tests ejecutados en acciones de GitHub activados por eventos `pull_request`.
- Puedes añadir una lista de [ramas excluidas](#excluded-branches), que desactiva Test Impact Analysis en esas ramas.

## Configuración de una biblioteca de Datadog

Antes de configurar Test Impact Analysis, debes configurar [Test Optimization][4] para tu idioma en particular. Si envías datos a través del Agent, utiliza la versión 6.40 o 7.40 y posteriores.

{{< whatsnext desc="Elige un lenguaje para configurar Test Impact Analysis en Datadog:" >}}
    {{< nextlink href="intelligent_test_runner/setup/dotnet" >}}.NET{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/java" >}}Java{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/javascript" >}}JavaScript{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/swift" >}}Swift{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/python" >}}Python{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/ruby" >}}Ruby{{< /nextlink >}}
    {{< nextlink href="intelligent_test_runner/setup/go" >}}Go{{< /nextlink >}}
{{< /whatsnext >}}

## Configuración

Una vez que hayas configurado tu biblioteca de Datadog para Test Impact Analysis, configúralo desde la página de [configuración de servicio de test][5]. Para activar Test Impact Analysis se requiere el permiso `Test Optimization Settings Write`.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-Configuración.png" alt="Enable Test Impact Analysis for a test servicio on the Test Optimization Settings page" style="width:80%" >}}

### Git ejecutable

Para que Test Impact Analysis funcione, es necesario que [Git][6] esté disponible en los tests en ejecución de host.

### Ramas excluidas

Debido a las [limitaciones](#out-of-the-box-configuration-limitations) descritas anteriormente, la rama por defecto de tu repositorio se excluye automáticamente de tener activado Test Impact Analysis. Datadog recomienda esta configuración para asegurar que todos tus tests se ejecutan antes de llegar a producción.

Si hay otras ramas que desee excluir, añádalas en la página Configuración de optimización de pruebas. La barra de consulta admite el uso del carácter comodín `*` para excluir cualquier rama que coincida, como `release_*`.

Las ramas excluidas recopilan cobertura de código por test, lo que tiene un impacto en el rendimiento del tiempo total de test. Sin embargo, este impacto en el rendimiento se mitiga recopilando cobertura de código únicamente cuando Datadog detecta que la ejecución con cobertura de código genera suficiente información nueva de cobertura como para compensar el coste de recopilarla. Puedes consultar si una sesión de test tiene activada o no la cobertura de código consultando el campo `@test.code_coverage.enabled`.

### Archivos rastreados

Los archivos rastreados son archivos que no son de código y que pueden afectar a los tests. Los cambios en los archivos de rastreo pueden hacer que tus tests fallen o cambiar la cobertura de código de tus tests. Ejemplos de archivos que son buenos candidatos para añadir como archivos rastreados son:

- Dockerfiles utilizados para el entorno de CI
- Los archivos que definen tus dependencias (por ejemplo, `pom.xml` en Maven, `requirements.txt` en Python, o `package.json` en JavaScript)
- Makefiles

Cuando se especifica un conjunto de archivos rastreados, Test Impact Analysis ejecuta todos los tests si alguno de estos archivos cambia.

Todas las rutas de archivos se consideran relativas a la raíz del repositorio. Puedes utilizar los caracteres comodín `*` y `**` para buscar varios archivos o directorios. Por ejemplo, `**/*.mdx` coincide con cualquier archivo `.mdx` del repositorio.

{{< img src="/getting_started/intelligent_test_runner/test-impact-analysis-gs-config.png" alt="Seleccionar ramas para excluir y archivos rastreados" style="width:80%" >}}

## Explorar las sesiones de test

Puedes explorar el ahorro de tiempo que supone Test Impact Analysis consultando la página de confirmación de tests y el panel de sesiones de test.

{{< img src="continuous_integration/itr_commit.png" alt="Página de confirmación de test con Test Impact Analysis" style="width:80%;">}}

{{< img src="continuous_integration/itr_savings.png" alt="Test Impact Analysis activado en una sesión de test que muestra ahorro de tiempos." style="width:80%;">}}

Cuando Test Impact Analysis está activo y se omiten tests, el texto morado muestra la cantidad de tiempo ahorrado en cada sesión de test o en cada confirmación. La barra de duración también cambia de color a morado para que puedas identificar qué sesiones de test están utilizando Test Impact Analysis en la página [Ejecuciones de tests][7].

## Explorar la adopción y el ahorro global

Realiza un rastreo de los ahorros de tu organización y de la adopción de Test Impact Analysis a través del [dashboard de Test Impact Analysis][8]. El dashboard incluye widgets para realizar un rastreo del ahorro global, así como una vista de los datos por repositorio, por responsable y por servicio. Visita dashboard para saber qué partes de tu organización están utilizando y sacando el máximo partido de Test Impact Analysis.

{{< img src="continuous_integration/itr_dashboard1.png" alt="Dashboard de Test Impact Analysis" style="width:80%;">}}

El dashboard también realiza un rastreo de la adopción de Test Impact Analysis en toda la organización.

{{< img src="continuous_integration/itr_dashboard2.png" alt="Dashboard de Test Impact Analysis" style="width:80%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tests/test_impact_analysis/how_it_works/
[2]: /es/glossary/#flaky-test
[3]: /es/tests/test_impact_analysis/setup
[4]: /es/continuous_integration/tests/
[5]: https://app.datadoghq.com/ci/settings/test-optimization
[6]: https://git-scm.com/
[7]: https://app.datadoghq.com/ci/test-runs
[8]: https://app.datadoghq.com/dash/integration/30941/ci-visibility-intelligent-test-runner
[9]: /es/integrations/github/
