---
aliases:
- /es/continuous_integration/guides/developer_workflows
- /es/continuous_integration/guides/pull_request_comments
- /es/continuous_integration/integrate_tests/developer_workflows
- /es/continuous_integration/tests/developer_workflows
description: Aprende a utilizar Datadog Test Optimization con funciones adicionales
  de Datadog para acelerar tu proceso de desarrollo.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Monitorizar tus flujos de trabajo de GitHub Actions con Datadog CI Visibility
- link: /integrations/github/
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: /integrations/guide/source-code-integration
  tag: Documentación
  text: Más información sobre la integración del código fuente
- link: /service_management/case_management
  tag: Documentación
  text: Más información sobre Case Management
title: Mejorar los flujos de trabajo de los desarrolladores con Datadog
---

## Información general

[Test Optimization][5] se integra con otros productos de Datadog orientados a desarrolladores, así como con socios externos como GitHub, para agilizar los flujos de trabajo de los desarrolladores con funciones que incluyen la posibilidad de:

- [Activar resúmenes de tests en los comentarios de las solicitudes de extracción de GitHub](#test-summaries-in-github-pull-requests)
- Crear y abrir incidentes en GitHub](#create-and-open-github-issues) 
- Crear incidentes en Jira a través de Case Management](#create-jira-issues)
- Abrir tests en GitHub y en tu IDE](#open-tests-in-github-and-your-ide)

Estas funciones están disponibles para todos los clientes de Test Optimization y no requieren el uso de la [integración Datadog GitHub][4].

## Resúmenes de tests en solicitudes de extracción de GitHub

Datadog se integra con GitHub para mostrar resúmenes de los resultados de tests directamente en los comentarios de tus solicitudes de extracción. Cada resumen contiene información general de la ejecución de los tests, información sobre fallos, mensajes de error de tests fallidos, regresiones de rendimiento y cambios en la cobertura del código.

{{< img src="ci/github_comments_light.png" alt="Vista previa de comentarios de solicitudes de extracción de GitHub" style="width:100%;">}}

Con esta información, los desarrolladores obtienen información instantánea sobre los resultados de sus tests y pueden depurar cualquier tests fallido o defectuosa sin salir de la vista de la solicitud de extracción.

<div class="alert alert-info">Este integración sólo está disponible para servicios de tests alojados en `github.com`.</div>

## Activar los resúmenes de los tests

Puedes activar los resúmenes de los tests en las solicitudes de extracción a través de los siguientes pasos:

1. Instala la [integración GitHub][4]:
   1. Ve a la pestaña **Configuración** en el [cuadro de la integración GitHub][6] y haz clic en **+ Create GitHub App** (+ Crear aplicación GitHub).
   1. Concede a la aplicación permisos de lectura y escritura para solicitudes de extracción.
1. Ve a la página [Configuración de Test Optimization][3].
1. Selecciona el repositorio en el que quieres activar los resúmenes de los tests.
1. Activa el conmutador **Comentarios GitHub**.

{{< img src="ci/enable-settings-github-comments.png" alt="Pestaña Configuración de Test Optimization en Datadog con comentarios GitHub activados para un servicio de test" style="width:100%;">}}

Los comentarios sólo aparecen en las solicitudes de extracción que se abrieron antes de la ejecución del test y que ejecutaron al menos un test de un repositorio habilitado.

## Crear y abrir incidentes en GitHub

Con Test Optimization, puedes crear y abrir incidentes de GitHub previamente rellenados con el contexto relevante de tus tests, así como enlaces profundos a Datadog para agilizar los flujos de trabajo de depuración. La creación de incidentes directamente desde Test Optimization puede ayudarte a realizar un seguimiento y mantener la responsabilidad de los fallos de tests y los tests defectuosos.

### Puntos de entrada en la aplicación

Puedes crear incidentes de GitHub previamente rellenados desde tres áreas dentro de Test Optimization:

- [Página de información general del commit (de la tabla **Commits**)](#commit-overview) 
- [Página de información general de la rama](#branch-overview)
- [Panel lateral de detalles del test](#test-details-view)

#### Información general del commit

La página de información general de cualquier commit se puede encontrar en una rama concreta o en un test concreto.

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Vista previa de incidentes de GitHub Datadog" style="width:100%;">}}

En la página de información general del commit, haz clic en cualquier fila de las tablas `Failed Tests` o `New Flaky Tests` y selecciona **Abrir incidente en GitHub**. 

#### Información general de la rama
En esta página, haz clic en cualquier fila de la tabla **Tests defectuosos** y selecciona **Abrir incidente en GitHub**.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Vista previa de la tabla de incidentes de tests defectuosos de Datadog GitHub" style="width:100%;">}}

#### Vista de los detalles de los tests
Desde una ejecución de test específica, haz clic en el botón **Actions** (Acciones) y selecciona **Abrir incidente en GitHub**. 

{{< img src="ci/github_issues_detail_light.png" alt="Vista previa de la vista de detalles de tests con incidentes de Datadog GitHub" style="width:100%;">}}

También tienes la opción de copiar la descripción de un incidente en Markdown para pegar los detalles del test en otro lugar. La descripción en Markdown contiene información como enlace de ejecución del test, servicio, rama, commit, autor y error. 

{{< img src="ci/github_issues_markdown.png" alt="Copiar una descripción de incidente de GitHub en formato Markdown" style="width:50%;">}}

### Ejemplo de incidente en GitHub
A continuación se muestra el aspecto que podría tener un incidente de GitHub previamente rellenado:
{{< img src="ci/prefilled_github_issue.png" alt="Pre-filled GitHub issue" style="width:80%;">}}

## Crear incidentes en Jira

Con [Case Management][8], puedes crear y abrir incidentes en GitHub previamente rellenados con el contexto relevante de tus tests, así como enlaces profundos a Datadog para agilizar los flujos de trabajo de depuración. La creación de incidentes directamente desde Test Optimization puede ayudarte a realizar un seguimiento y mantener la responsabilidad de los fallos de tests y los tests defectuosos.

Cuando actualizas el estado de un incidente en Jira, el estado en Case Management se actualiza y refleja el estado del último caso.

### Puntos de entrada en la aplicación

Después de haber [configurado la integración Jira][7], puedes crear casos desde tres áreas dentro de Test Optimization:

- [Página de información general del commit (de la tabla **Commits**)](#commit-overview-1)
- Sección [Tests defectuosos](#branch-overview-1)
- [Panel lateral de ejecuciones de tests](#test-runs-view)

Puedes crear manualmente un incidente en Jira a partir de un caso en [Case Management][9] haciendo clic en `Shift + J`.

### Información general del commit

La página de información general de cualquier commit se puede encontrar en una rama concreta o en un test concreto.

{{< img src="continuous_integration/case_failed_test.png" alt="Crear un incidente en Case Management en la página de información general del commit" style="width:100%;">}}

En la página de información general del commit, haz clic en cualquier fila de las tablas `Failed Tests` o `New Flaky Tests` y selecciona **Crear caso**.

#### Información general de la rama
En esta página, haz clic en cualquier fila de la tabla **Tests defectuosos** y selecciona **Crear caso**.

{{< img src="continuous_integration/case_flaky_test.png" alt="Crear un incidente de Case Management en la lista de tests defectuosos" style="width:100%;">}}

#### Vista de ejecuciones de tests
En una ejecución de test específica, haz clic en el botón **Actions** (Acciones) y selecciona **Crear caso**. 

{{< img src="continuous_integration/case_test_runs.png" alt="Crear un incidente en Case Management en el panel lateral de ejecuciones de tests" style="width:100%;">}}

Para obtener más información sobre la configuración de la integración Jira, consulta la [documentación de Case Management][7].

## Abrir tests en GitHub y en tu IDE

### Puntos de entrada en la aplicación

Después de detectar un test fallido o defectuoso en Datadog, tienes la opción de abrir ese test en GitHub o en tu IDE para corregirlo inmediatamente.

En la sección **Mensaje de error** de la pestaña **Información general** de una ejecución de test haz clic en el botón **View Code** (Ver código) para ver las líneas de código relevantes de ese test en Visual Studio Code, IntelliJ o GitHub.

{{< img src="continuous_integration/error_message_code.png" alt="Fragmento de código en línea con un botón que puedes pulsar para ver el código fuente en GitHub o en un IDE" style="width:100%;">}}

El orden de las opciones de este desplegable cambia en función del lenguaje en el que se haya escrito tu test:

- IntelliJ tiene prioridad para los tests basados en Java
- Visual Studio Code tiene prioridad para los tests basados en JavaScript y Python

### Visualización del código fuente en GitHub

También puedes configurar la [integración GitHub][10] para abrir el código fuente de un test fallido o defectuoso en GitHub.

En la sección **Código fuente** de la pestaña **Información general** de una ejecución de test haz clic en el botón **View on GitHub** (Ver en GitHub) para ver las líneas de código relevantes de ese test en GitHub.

{{< img src="continuous_integration/source_code_integration.png" alt="Fragmento de código en línea con un botón que puedes pulsar para ver el código fuente en GitHub o en un IDE" style="width:100%;">}}

### Instalación de complementos IDE

Los complementos y las extensiones IDE son necesarios para ver tu test en tu IDE. 

- Si no tienes instalada la extensión VS Code, haz clic en **View in VS Code** (Ver en VS Code) para abrir la extensión directamente en VS Code para su instalación.
- Si no tienes instalado el complemento de IntelliJ, haz clic en **View in IntelliJ** (Ver en IntelliJ) para obtener la instalación de la extensión. Puedes encontrar las versiones de Datadog compatibles en la [página Versiones de complementos][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-optimization
[4]: /es/integrations/github/
[5]: /es/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /es/service_management/case_management/settings/#jira
[8]: /es/service_management/case_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/cases
[10]: /es/integrations/github/#link-a-repository-in-your-organization-or-personal-account
[11]: https://app.datadoghq.com/ci/test-repositories