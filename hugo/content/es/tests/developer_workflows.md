---
aliases:
- /es/continuous_integration/guides/developer_workflows
- /es/continuous_integration/guides/pull_request_comments
- /es/continuous_integration/integrate_tests/developer_workflows
- /es/continuous_integration/tests/developer_workflows
description: Aprenda a usar Datadog Test Optimization con funciones adicionales de
  Datadog para acelerar su proceso de desarrollo.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Haga un seguimiento de sus flujos de trabajo de GitHub Actions con Datadog
    CI Visibility
- link: /integrations/github/
  tag: Documentación
  text: Obtenga información sobre la integración con GitHub
- link: /integrations/guide/source-code-integration
  tag: Documentación
  text: Obtenga información sobre la integración de código fuente.
- link: /incident_response/work_management
  tag: Documentación
  text: Obtenga información sobre Work Management.
title: Mejora de los flujos de trabajo de los desarrolladores con Datadog
---
## Descripción general {#overview}

[Test Optimization][5] se integra con otros productos de Datadog orientados a desarrolladores, así como con socios externos como GitHub, para optimizar los flujos de trabajo de los desarrolladores con funciones que incluyen la capacidad de:

- [Habilite los resúmenes de prueba en los comentarios de las solicitudes de extracción de GitHub](#test-summaries-in-github-pull-requests)
- [Cree y abra problemas de GitHub](#create-and-open-github-issues) 
- [Cree problemas de Jira a través de Work Management](#create-jira-issues)
- [Abra pruebas en GitHub y en su IDE](#open-tests-in-github-and-your-ide)

Estas funciones están disponibles para todos los clientes de Test Optimization y no requieren el uso de la [Datadog GitHub integration][4].

## Resúmenes de prueba en solicitudes de extracción de GitHub {#test-summaries-in-github-pull-requests}

Test Optimization se integra con GitHub para mostrar resúmenes de los resultados de la prueba directamente en los comentarios de sus solicitudes de extracción. Cada resumen contiene una descripción general de las ejecuciones de pruebas, información sobre la inestabilidad y mensajes de error para las pruebas fallidas.

{{< img src="ci/github_comments_light.png" alt="Vista previa de comentarios de pull request de Datadog GitHub" style="width:100%;">}}

Con esta información, los desarrolladores obtienen comentarios instantáneos sobre los resultados de sus pruebas y pueden depurar cualquier prueba fallida o inestable sin salir de la pull request view.

<div class="alert alert-info">Esta integración solo está disponible para servicios de prueba alojados en `github.com`.</div>

## Habilite los resúmenes de prueba {#enable-test-summaries}

Puede habilitar los resúmenes de prueba en los pull requests con los siguientes pasos:

1. Instale la [Datadog GitHub integration][4]:
   1. Navegue a la pestaña {{< ui >}}Configuration{{< /ui >}} en el [Datadog GitHub integration tile][6] y haga clic en {{< ui >}}+ Create GitHub App{{< /ui >}}.
   1. Otorgue a la aplicación permisos de lectura y escritura para pull requests.
1. Abra [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][3].
1. Elija dónde aplicar la configuración:
   - Seleccione la pestaña {{< ui >}}Organization{{< /ui >}} para habilitar PR Comments para cada repositorio de forma predeterminada.
   - Seleccione la pestaña {{< ui >}}Repository-specific{{< /ui >}} para habilitar PR Comments para un solo repositorio.
1. En {{< ui >}}General{{< /ui >}}, active el {{< ui >}}PR Comments{{< /ui >}}.

{{< img src="ci/enable-settings-github-comments-1.png" alt="El toggle de PR Comments en la página de CI/CD Settings." style="width:100%;">}}

Los comentarios solo aparecen en pull requests que han ejecutado al menos una prueba para un repositorio habilitado.

## Cree y abra problemas de GitHub {#create-and-open-github-issues}

Con Test Optimization, puede crear y abrir problemas de GitHub prellenados con contexto relevante en sus ejecuciones de prueba, así como enlaces directos a Datadog para flujos de trabajo de depuración más optimizados. Crear problemas directamente desde Test Optimization puede ayudarle a realizar un seguimiento y mantener la responsabilidad de las fallas de las pruebas y las pruebas inestables.

### Puntos de entrada en la aplicación {#in-app-entry-points}

Puede crear problemas de GitHub prellenados desde tres áreas dentro de Test Optimization:

- [Commit Overview page (from the {{< ui >}}Commits{{< /ui >}} table)](#commit-overview) 
- [Branch Overview page](#branch-overview)
- [Test Details side panel](#test-details-view)

#### Commit Overview {#commit-overview}

La página overview de cualquier commit se puede descubrir a través de una branch en particular o desde cualquier test en particular. 

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Vista previa de problemas de GitHub en Datadog" style="width:100%;">}}

Desde la página Commit Overview, haga clic en cualquier fila de las tablas `Failed Tests` o `New Flaky Tests` y seleccione {{< ui >}}Open issue in GitHub{{< /ui >}}. 

#### Branch Overview {#branch-overview}
Desde esta página, haga clic en cualquier fila de la tabla {{< ui >}}Flaky Tests{{< /ui >}} y seleccione {{< ui >}}Open issue in GitHub{{< /ui >}}.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Vista previa de la tabla de pruebas inestables de problemas de GitHub en Datadog" style="width:100%;">}}

#### Test Details View {#test-details-view}
Desde una ejecución de prueba específica, haga clic en el botón {{< ui >}}Actions{{< /ui >}} y seleccione {{< ui >}}Open issue in GitHub{{< /ui >}}. 

{{< img src="ci/github_issues_detail_light.png" alt="Vista previa de la Test Detail View de problemas de GitHub en Datadog." style="width:100%;">}}

También tiene la opción de copiar una descripción del problema en Markdown para pegar los detalles de la prueba en otro lugar. La descripción en Markdown contiene información como el enlace de ejecución de prueba, el servicio, la rama, el commit, el autor y el error. 

{{< img src="ci/github_issues_markdown.png" alt="Copiar descripción del problema en formato Markdown para problemas de GitHub" style="width:50%;">}}

### Ejemplo de problema de GitHub{#sample-github-issue}
A continuación se muestra cómo podría verse un problema de GitHub prellenado:
{{< img src="ci/prefilled_github_issue.png" alt="Problema de GitHub prellenado" style="width:80%;">}}

## Crear problemas de Jira{#create-jira-issues}

Con [Work Management][8], puede crear y abrir problemas de Jira prellenados que contienen contexto relevante relacionado con sus ejecuciones de prueba, así como enlaces directos a Datadog para flujos de trabajo de depuración más optimizados. Crear problemas directamente desde Test Optimization puede ayudarle a realizar un seguimiento y mantener la responsabilidad de las fallas de las pruebas y las pruebas inestables. 

Cuando actualiza el estado de un problema de Jira, el estado en Work Management se actualiza y refleja el estado más reciente del elemento de trabajo.

### In-app entry points {#in-app-entry-points-1}

Después de haber [configurado la Jira integration][7], puede crear elementos de trabajo desde tres áreas dentro de Test Optimization:

- [Commit Overview page (from the {{< ui >}}Commits{{< /ui >}} table)](#commit-overview-1) 
- [Flaky Tests section](#branch-overview-1)
- [Test Runs side panel](#test-runs-view)

Puede crear manualmente un problema de Jira a partir de un elemento de trabajo en [Work Management][9] haciendo clic en `Shift + J`.

### Commit Overview {#commit-overview-1}

La página overview de cualquier commit se puede descubrir a través de una branch en particular o desde cualquier test en particular. 

Desde la página Commit Overview, haga clic en cualquier fila de las tablas `Failed Tests` o `New Flaky Tests` y seleccione {{< ui >}}Create work item{{< /ui >}}.

#### Branch Overview {#branch-overview-1}
Desde esta página, haga clic en cualquier fila de la tabla {{< ui >}}Flaky Tests{{< /ui >}} y seleccione {{< ui >}}Create work item{{< /ui >}}.

#### Ver Test Runs {#test-runs-view}
Desde una ejecución de prueba específica, haga clic en el botón {{< ui >}}Actions{{< /ui >}} y seleccione {{< ui >}}Create work item{{< /ui >}}.

Para obtener más información sobre cómo configurar la Jira integration, consulte la [Work Management documentation][7].

## Abra pruebas en GitHub y en su IDE {#open-tests-in-github-and-your-ide}

### In-app entry points {#in-app-entry-points-2}

Después de detectar una prueba fallida o inestable dentro de Datadog, tiene la opción de abrir esa prueba en GitHub o en su IDE para corregirla de inmediato.

En la sección {{< ui >}}Error Message{{< /ui >}} de la pestaña {{< ui >}}Overview{{< /ui >}} de una ejecución de prueba, haga clic en el botón {{< ui >}}View Code{{< /ui >}} para ver las líneas de código relevantes para esa prueba dentro de Visual Studio Code, IntelliJ o GitHub.

{{< img src="continuous_integration/error_message_code.png" alt="Un fragmento de código en línea con un botón en el que puede hacer clic para ver el código fuente en GitHub o en un IDE" style="width:100%;">}}

El orden de las opciones en este menú desplegable cambia según el lenguaje en el que se haya escrito su prueba:

- IntelliJ tiene prioridad para las pruebas basadas en Java
- Visual Studio Code tiene prioridad para las pruebas basadas en JavaScript y Python

### Viewing source code in GitHub {#viewing-source-code-in-github}

Opcionalmente, puede configurar la [Datadog GitHub integration][10] para abrir el código fuente de una prueba fallida o inestable en GitHub.

En la sección {{< ui >}}Source Code{{< /ui >}} de la pestaña {{< ui >}}Overview{{< /ui >}} de una ejecución de prueba, haga clic en el botón {{< ui >}}View on GitHub{{< /ui >}} para ver las líneas de código relevantes para esa prueba dentro de GitHub.

{{< img src="continuous_integration/source_code_integration.png" alt="Un fragmento de código en línea con un botón en el que puede hacer clic para ver el código fuente en GitHub o en un IDE" style="width:100%;">}}

### Installing IDE plugins {#installing-ide-plugins}

Se requieren plugins y extensiones de IDE para visualizar su prueba en su IDE. 

- Si no tiene instalada la extensión de VS Code, haga clic en {{< ui >}}View in VS Code{{< /ui >}} para abrir la extensión directamente en VS Code para su instalación.
- Si no tiene instalado el plugin de IntelliJ, haga clic en {{< ui >}}View in IntelliJ{{< /ui >}} para instalar la extensión. Las versiones compatibles de Datadog se pueden encontrar en la [Plugin Versions page][2].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[4]: /es/integrations/github/
[5]: /es/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /es/incident_response/work_management/settings/#jira
[8]: /es/incident_response/work_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/work
[10]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account