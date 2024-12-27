---
algolia:
  tags:
  - análisis de código
  - datadog code analysis
  - análisis estático
  - software composition analysis
  - SAST
  - SCA
aliases:
- /es/code_analysis/faq
description: Aprende a usar Datadog Code Analysis para abordar problemas de mantenimiento,
  errores y vulnerabilidades de seguridad en el desarrollo a fin de evitar el impacto
  en los clientes.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notas de versiones
  text: ¡Echa un vistazo a las últimas versiones de entrega de software! (Es necesario
    iniciar sesión en la aplicación)
- link: https://www.datadoghq.com/blog/monitor-ci-pipelines/
  tag: Blog
  text: Monitorizar todos tus pipelines de CI con Datadog
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente
- link: /code_analysis/static_analysis
  tag: Documentación
  text: Más información sobre el análisis estático
- link: /security/application_security/software_composition_analysis
  tag: Documentación
  text: Más información sobre Software Composition Analysis
is_beta: false
title: Code Analysis
---

{{< callout url="#" btn_hidden="true" header="¡Obtén la versión preliminar!" >}}
Code Analysis se encuentra en versión preliminar.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis no se encuentra disponible en el sitio {{< region-param key="dd_site_name" >}}.
</div>
{{% /site-region %}}

## Información general

<div class="alert alert-info">Datadog Software Composition Analysis puede encontrar bibliotecas vulnerables a lo largo del ciclo de vida del desarrollo de software (SDLC). Code Analysis resume los resultados encontrados al escanear de manera directa tus repositorios. Para ver todas las vulnerabilidades encontradas en los repositorios y en el tiempo de ejecución consolidadas, consulta <a href="/security/application_security/software_composition_analysis" target="_blank">Application Security</a> a fin de obtener más detalles.</div>

Code Analysis escanea tus repositorios a fin de encontrar vulnerabilidades de seguridad y problemas de calidad del código. Incluye dos funciones: [análisis estático][1] para tu propio código y [Software Composition Analysis (SCA)][2] para dependencias de código abierto en tu base de código. 

Análisis estático
: Escanea tu código personalizado en busca de problemas de mantenimiento, errores, problemas de rendimiento y vulnerabilidades de seguridad al comienzo del ciclo de vida del desarrollo para evitar que los problemas lleguen a producción y, cuando sea posible, proporciona soluciones sugeridas a fin de ayudar a los equipos de ingeniería a abordar estos problemas antes de que afecten a los usuarios.

Software Composition Analysis 
: Escanea las bibliotecas de código abierto que se importan a tus repositorios en busca de vulnerabilidades de seguridad conocidas, riesgos de licencia y bibliotecas al final de su vida útil.


## Configurar Code Analysis en tu repositorio

Haz clic en **+ Add a Repository** (+ Añadir un repositorio) en la página de [**Repositorios de Code Analysis**][9] y elige ejecutar los escaneos directamente en Datadog o en tus pipelines de CI.

{{< tabs >}}
{{% tab "Datadog" %}}

<div class="alert alert-warning">Los escaneos alojados en Datadog solo son compatibles con Software Composition Analysis (SCA) y los repositorios de GitHub. Para habilitar el análisis estático o usar un proveedor de CI diferente, ejecuta los escaneos en tus pipelines de CI.</div>

Con los escaneos alojados en Datadog, el código se escanea en la infraestructura de Datadog en lugar de tu pipeline de CI. Datadog lee el código, ejecuta el analizador estático para realizar un análisis estático o usar Software Composition Analysis y carga los resultados.

El uso de escaneos alojados en Datadog elimina la necesidad de configurar un pipeline de CI para poder usar Code Analysis.

Para habilitar [Software Composition Analysis][101] en los repositorios de GitHub, haz clic en **Select Repositories** (Seleccionar repositorios) en la cuenta de GitHub que quieras y haz clic en el botón de alternancia a fin de habilitar `Enable Software Composition Analysis (SCA)` en todos los repositorios. Si no ves cuentas de GitHub en la lista, [crea una aplicación de GitHub nueva][102] para comenzar.

{{< img src="code_analysis/setup/enable_account.png" alt="Habilita Software Composition Analysis en todos los repositorios de tu cuenta de GitHub" style="width:100%;">}}

De manera opcional, puedes seleccionar repositorios específicos de GitHub para habilitar SCA al hacer clic en el botón de cada repositorio.

{{< img src="code_analysis/setup/enable_repository.png" alt="Habilita Software Composition Analysis en un repositorio de GitHub" style="width:100%;">}}

[101]: /es/code_analysis/software_composition_analysis
[102]: /es/integrations/github/

{{% /tab %}}
{{% tab "CI Pipelines" %}}

Si no quieres ejecutar tus escaneos de manera directa a través de Datadog, puedes seleccionar qué escaneos te gustaría ejecutar ([análisis estático][106] y [Software Composition Analysis][107]) y configurar tu proveedor de pipelines de CI en consecuencia.

## Configurar tu proveedor de CI/CD

Consulta la siguiente documentación para configurar tu proveedor de CI/CD a fin de ejecutar escaneos de análisis estático y SCA:

- [Análisis estático y GitHub Actions][101]
- [Análisis estático y CircleCI Orbs][102]
- [Análisis estático y proveedores de CI genéricos][103]
- [Software Composition Analysis y GitHub Actions][104]
- [Software Composition Analysis y proveedores de CI genéricos][105]

[101]: /es/code_analysis/static_analysis/github_actions 
[102]: /es/code_analysis/static_analysis/circleci_orbs 
[103]: /es/code_analysis/static_analysis/generic_ci_providers 
[104]: /es/code_analysis/software_composition_analysis/github_actions 
[105]: /es/code_analysis/software_composition_analysis/generic_ci_providers 
[106]: /es/code_analysis/static_analysis
[107]: /es/code_analysis/software_composition_analysis

{{% /tab%}}
{{< /tabs>}}

## Configurar la integración de GitHub 

Puedes configurar una aplicación de GitHub con el [cuadro de integración de GitHub][7] y al configurar la [integración de código fuente][8] para ver los fragmentos de código infractores como parte de los resultados del análisis estático en Datadog.

{{< img src="code_analysis/source_code_integration.png" alt="Enlace a GitHub desde la vista de Code Analysis" style="width:100%;">}}

Para obtener más información, consulta la [documentación de la integración de código fuente][10].

## Integraciones de análisis estático

Con el análisis estático, puedes recibir comentarios automatizados sobre prácticas de codificación deficientes y vulnerabilidades de seguridad en el código que escribes [directamente en un IDE][11], como [VS Code][3] o [IntelliJ y PyCharm][4], y en tus [solicitudes pull en GitHub][5]. 

{{< img src="developers/ide_plugins/vscode/static-analysis-issue.png" alt="Un resultado de análisis estático en Visual Studio Code" style="width:100%;">}}

## Buscar y gestionar repositorios

Una vez que hayas configurado Code Analysis, podrás ver un resumen de los resultados de los escaneos de análisis estáticos y SCA de cada uno de tus repositorios en la [página de **Code Analysis**][9]. De manera predeterminada, los resultados resumidos se muestran para la última confirmación analizada en la rama predeterminada del repositorio, lo que garantiza que estés viendo todos los problemas existentes en cada repositorio que quieras clasificar y solucionar.

{{< img src="code_analysis/repositories.png" alt="Una lista de repositorios con resultados de escaneo de código y biblioteca en la página de Code Analysis" style="width:100%;">}}

Selecciona un repositorio de la lista para buscar y gestionar las infracciones de ese repositorio específico. De manera predeterminada, los resultados se muestran para la última confirmación escaneada en la rama predeterminada del repositorio, pero puedes cambiar la rama o la confirmación en la parte superior de la página. Los resultados también se pueden filtrar por facetas de servicio o equipo. Para obtener más información sobre cómo se vinculan los resultados a los servicios y equipos de Datadog, consulta [Empezando con Code Analysis][12].

Independientemente de la rama o confirmación seleccionada, todos los resultados se organizan en las siguientes vistas:

{{< tabs >}}
{{% tab "Code Vulnerabilities" %}}

{{< img src="code_analysis/shopist_code_vulnerabilities.png" alt="Vulnerabilidades del código en la página de Code Analysis del servicio y repositorio de Datadog Shopist" style="width:100%;">}}

Identifica y aborda los riesgos de seguridad del código detectados mediante el análisis estático en la vista **Code Vulnerabilities** (Vulnerabilidades del código).

{{% /tab %}}
{{% tab "Calidad del código" %}}

{{< img src="code_analysis/shopist_code_quality.png" alt="Vulnerabilidades en la calidad del código en la página de Code Analysis del servicio y repositorio de Datadog Shopist" style="width:100%;">}}

Identifica y aborda las prácticas de codificación deficientes detectadas mediante el análisis estático en la vista **Code Quality** (Calidad del código).

{{% /tab %}}
{{% tab "biblioteca Vulnerabilidades" %}}

{{< img src="code_analysis/shopist_lib_vulnerabilities.png" alt="Vulnerabilidades de la biblioteca en la página de Code Analysis del servicio y repositorio de Datadog Shopist" style="width:100%;">}}

Identifica y aborda las bibliotecas de código abierto vulnerables detectadas mediante SCA en la vista **Library Vulnerabilities** (Vulnerabilidades de la biblioteca).

{{% /tab %}}
{{% tab "biblioteca Catálogo" %}}

{{< img src="code_analysis/shopist_lib_list.png" alt="Una lista de bibliotecas en la página de Code Analysis del servicio y repositorio de Datadog Shopist" style="width:100%;">}}

Gestiona la lista completa de bibliotecas detectadas mediante SCA que se han importado a tu base de código en la vista **Library Catalog** (Catálogo de bibliotecas).

{{% /tab%}}
{{< /tabs>}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/code_analysis/static_analysis
[2]: /es/code_analysis/software_composition_analysis
[3]: /es/developers/ide_plugins/vscode/#static-analysis
[4]: /es/developers/ide_plugins/idea/#static-analysis
[5]: /es/code_analysis/github_pull_requests/
[6]: /es/code_analysis/static_analysis_rules
[7]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[8]: /es/integrations/guide/source-code-integration
[9]: https://app.datadoghq.com/ci/code-analysis
[10]: /es/integrations/guide/source-code-integration/?tab=codeanalysis
[11]: /es/code_analysis/ide_plugins/
[12]: /es/getting_started/code_analysis/?tab=incipipelines#linking-services-to-code-violations-and-libraries