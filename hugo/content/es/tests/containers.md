---
aliases:
- /es/continuous_integration/setup_tests/containers
- /es/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: Documentación
  text: Aprenda sobre Test Optimization
title: Pruebas en contenedores
---
## Descripción general {#overview}

Utilice esta guía cuando un trabajo de CI inicie el proceso de prueba en un contenedor separado con un comando como [`docker run`][1] o [`docker-compose`][2]. Reenvíe las variables de entorno de su proveedor de CI al contenedor de prueba para que el SDK de Datadog pueda detectar la información de compilación.

El ejecutor basado en Docker integrado de un proveedor de CI es el entorno de ejecución principal del trabajo. Esta guía no se aplica a menos que un comando en ese trabajo inicie las pruebas en otro contenedor. Tampoco se aplica cuando los contenedores proporcionan solo servicios de soporte, como una base de datos.

Reenvíe todas las variables requeridas por las [instrucciones de instrumentación de prueba por lenguaje][3]. Esto incluye:

- Configuración del SDK, como `DD_SERVICE`, `DD_ENV` y una `DD_TRACE_AGENT_URL` válida a la que el contenedor pueda acceder
- Variables de inyección en tiempo de ejecución, como `RUBYOPT`, `NODE_OPTIONS` u opciones de herramientas de Java

Las variables establecidas en el trabajo de CI o exportadas por un paso de instrumentación automática no están disponibles automáticamente dentro de un contenedor iniciado por ese trabajo.

## Elija un método de instrumentación {#choose-an-instrumentation-method}

La instrumentación automática se ejecuta en el ejecutor de CI y no pasa automáticamente a un contenedor de prueba iniciado por separado.

- **Imagen creada en el trabajo de CI actual:** Ejecute la instrumentación automática antes de la creación de la imagen. Utilice este método solo si la compilación copia los artefactos del rastreador o los cambios de dependencia producidos por la integración y usted reenvía sus variables de tiempo de ejecución. De lo contrario, utilice la instrumentación manual.
- **Imagen precompilada:** Si el trabajo solo extrae o hace referencia a una etiqueta o resumen de imagen, utilice la instrumentación manual. Un Dockerfile en el repositorio no cuenta a menos que el trabajo lo utilice para crear la imagen de prueba.

## Administrar variables de entorno {#manage-environment-variables}

Esta tabla proporciona una lista no exhaustiva de las variables de entorno disponibles para configurar el SDK:

{{< tabs >}}
{{% tab "AppVeyor" %}}

| Variable de entorno                          | Descripción                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | Indica si la compilación se está ejecutando en el entorno de AppVeyor. Establecido en `True` (o `true` en la imagen de Ubuntu).    |
| `APPVEYOR_BUILD_ID`                          | Un identificador único para la compilación de AppVeyor.                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | El número de compilación asignado por AppVeyor, el cual se incrementa con cada nueva compilación.                                  |
| `APPVEYOR_BUILD_FOLDER`                      | La ruta al directorio donde se clona el repositorio.                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | Especifica el proveedor de control de fuente para el repositorio, como `github`, `bitbucket` o `kiln`.         |
| `APPVEYOR_REPO_NAME`                         | El nombre del repositorio en el formato `owner-name/repo-name`.                                              |
| `APPVEYOR_REPO_BRANCH`                       | La rama del repositorio que se está compilando. Para las solicitudes de extracción (pull requests), es la rama base en la que se fusiona la PR.    |
| `APPVEYOR_REPO_COMMIT`                       | El ID de confirmación (SHA) de la compilación actual.                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | El nombre de la etiqueta para las compilaciones iniciadas por una etiqueta. Esta variable no está definida si la compilación no es activada por una etiqueta.  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | La rama del repositorio desde la cual se originó la solicitud de extracción.                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | El mensaje de confirmación asociado con la compilación actual.                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | El mensaje de confirmación extendido, incluyendo cualquier texto después del primer salto de línea.                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | El nombre del autor de la confirmación.                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | La dirección de correo electrónico del autor de la confirmación.                                                                       |

Para obtener una lista completa de las variables de entorno establecidas por AppVeyor para cada compilación, consulte la [documentación oficial de AppVeyor][101].


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Variable de entorno                  | Descripción                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | Indica que la compilación se está ejecutando en Azure Pipelines.                                                     |
| `BUILD_DEFINITIONNAME`                    | El nombre del pipeline de compilación.                                                                             |
| `BUILD_BUILDID`                           | El ID del registro para la compilación completada.                                                               |
| `BUILD_SOURCESDIRECTORY`                  | La ruta local en el agente donde se descargan los archivos de su código fuente.                                     |
| `BUILD_REPOSITORY_URI`                    | La URL del repositorio desencadenante.                                                                      |
| `BUILD_SOURCEBRANCH`                      | La rama del repositorio desencadenante para la cual se ha puesto en cola la compilación.                                                 |
| `BUILD_SOURCEVERSION`                     | El último cambio de control de versiones del repositorio desencadenante que se incluye en esta compilación.                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | El comentario de la confirmación o conjunto de cambios para el repositorio desencadenante.                                             |
| `BUILD_REQUESTEDFORID`                    | El ID del usuario que desencadenó la compilación.                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | El correo electrónico del usuario que desencadenó la compilación.                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | El URI de la cuenta de Team Foundation Server o Azure DevOps Services.                                    |
| `SYSTEM_TEAMPROJECTID`                    | El ID del proyecto de equipo para la compilación.                                                                   |
| `SYSTEM_JOBID`                            | El ID del trabajo que se está ejecutando.                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | El ID de la instancia de tarea dentro del trabajo.                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | La URL del repositorio fuente para la solicitud de extracción.                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | La rama fuente de la solicitud de extracción.                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | El ID de confirmación de la rama fuente en la solicitud de extracción.                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | El nombre para mostrar de la etapa en el pipeline.                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | El nombre para mostrar del trabajo en el pipeline.                                                                |

Para obtener una lista de las variables de entorno establecidas por Azure DevOps Pipelines para cada compilación, consulte la [documentación oficial de Azure][101].


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| Variable de entorno               | Descripción                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | El UUID del pipeline.                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | El identificador único para una compilación. Se incrementa con cada compilación y puede utilizarse para crear nombres de artefactos únicos.                                                |
| `BITBUCKET_CLONE_DIR`              | La ruta absoluta del directorio en el que se clona el repositorio dentro del contenedor Docker.                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | El nombre completo del repositorio (todo lo que aparece después de http://bitbucket.org/).                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | Su origen SSH, por ejemplo: `git@bitbucket.org:/<workspace>/<repo>.git`.                                                                                       |
| `BITBUCKET_COMMIT`                 | El hash de confirmación de una confirmación que inició la compilación.                                                                                                           |
| `BITBUCKET_BRANCH`                 | La rama fuente. Este valor solo está disponible en ramas. No disponible para compilaciones de etiquetas o Pipelines personalizadas.                                         |
| `BITBUCKET_TAG`                    | La etiqueta de una confirmación que inició la compilación. Este valor solo está disponible en etiquetas. No disponible para compilaciones de ramas.                                  |


Para obtener una lista de las variables de entorno configuradas por Bitbucket para cada compilación, consulte la [documentación oficial de Bitbucket][101].

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| Variable de entorno                | Descripción                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | El slug que identifica de forma única una compilación en bitrise.io. Es parte de la URL de la compilación.                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | El ID del flujo de trabajo que se activó, expuesto independientemente de si el flujo de trabajo se activó manual o automáticamente. |
| `BITRISE_BUILD_NUMBER`              | Número de compilación de la compilación en bitrise.io.                                                                         |
| `BITRISE_BUILD_URL`                 | La URL de la compilación en bitrise.io.                                                                              |
| `BITRISE_SOURCE_DIR`                | Ruta al directorio de trabajo base. De forma predeterminada, es el directorio donde se ejecuta Bitrise, a menos que proporcione un valor diferente. |
| `GIT_REPOSITORY_URL`                | La URL del repositorio de Git que aloja su aplicación.                                                               |
| `BITRISE_GIT_COMMIT`                | El hash de confirmación (commit) de Git que activó la compilación, cuando corresponda.                                     |
| `GIT_CLONE_COMMIT_HASH`             | El hash de la confirmación (commit) que utiliza la compilación (la confirmación clonada).                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | La rama de destino o de llegada de la solicitud de extracción (pull request) que activó la compilación, utilizada solo con compilaciones activadas por solicitudes de extracción. |
| `BITRISE_GIT_BRANCH`                | La rama de Git que compila Bitrise, por ejemplo, `main`.                                                    |
| `BITRISE_GIT_TAG`                   | Si una compilación es activada por una etiqueta (tag) de Git, esta variable de entorno almacena la etiqueta utilizada.                                          |
| `BITRISE_GIT_MESSAGE`               | El mensaje de confirmación (commit), el título de la solicitud de extracción o el mensaje que especificó si activó la compilación manualmente.        |
| `BITRISE_APP_TITLE`                 | El título de su aplicación en bitrise.io.                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | El asunto del mensaje de confirmación (commit) de la confirmación clonada.                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | El cuerpo (contenido) del mensaje de confirmación del commit clonado.                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | El nombre del autor del commit clonado.                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | El correo electrónico del autor del commit clonado.                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | El nombre del autor de la confirmación del commit clonado.                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | El correo electrónico del autor de la confirmación del commit clonado.                                                                 |


Para obtener una lista completa de las variables de entorno establecidas por Bitrise para cada compilación, consulte la [documentación oficial de Bitrise][101].


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| Variable de entorno          | Descripción                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | Siempre verdadero.                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | El slug de la canalización en Buildkite tal como se utiliza en las URL.                                                 |
| `BUILDKITE_JOB_ID`            | El UUID interno que utiliza Buildkite para este trabajo.                                                   |
| `BUILDKITE_BUILD_ID`          | El UUID de la compilación.                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | El número de compilación. Este número aumenta con cada compilación y es único dentro de cada canalización.   |
| `BUILDKITE_BUILD_URL`         | La URL de esta compilación en Buildkite.                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | La ruta donde el agente ha extraído su código para esta compilación.                             |
| `BUILDKITE_REPO`              | El repositorio de su canalización.                                                                  |
| `BUILDKITE_COMMIT`            | El objeto de commit de Git de la compilación.                                                              |
| `BUILDKITE_BRANCH`            | La rama que se está compilando.                                                                         |
| `BUILDKITE_TAG`               | El nombre de la etiqueta que se está compilando, si esta compilación se activó desde una etiqueta.                        |
| `BUILDKITE_MESSAGE`           | El mensaje asociado con la compilación, generalmente el mensaje de confirmación (commit).                             |
| `BUILDKITE_BUILD_AUTHOR`      | El nombre del usuario que creó la confirmación (commit) que se está compilando.                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| El correo electrónico de notificación del usuario que creó la confirmación (commit) que se está compilando.                        |
| `BUILDKITE_BUILD_CREATOR`     | El nombre del usuario que creó la compilación.                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | El correo electrónico de notificación del usuario que creó la compilación.                                     |
| `BUILDKITE_AGENT_ID`          | El UUID del agente.                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | El valor de cada etiqueta de agente. El nombre de la etiqueta se añade al final del nombre de la variable.           |


Para obtener una lista completa de las variables de entorno configuradas por Buildkite para cada compilación, consulte la [documentación oficial de Buildkite][101].

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| Variable de entorno         | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | Indica si la compilación se está ejecutando en CircleCI. Siempre configurado en `true`.                                |
| `CIRCLE_PROJECT_REPONAME`     | El nombre del repositorio que se está compilando.                                                               |
| `CIRCLE_BUILD_NUM`           | El número del trabajo actual. Los números de trabajo son únicos para cada trabajo.                                  |
| `CIRCLE_BUILD_URL`           | La URL del trabajo actual en CircleCI.                                                              |
| `CIRCLE_WORKFLOW_ID`         | Un identificador único para la instancia de flujo de trabajo del trabajo actual.                                      |
| `CIRCLE_WORKING_DIRECTORY`   | La ruta al directorio de trabajo donde se extrae el código.                                       |
| `CIRCLE_REPOSITORY_URL`      | La URL del repositorio que se está compilando.                                                                 |
| `CIRCLE_SHA1`                | El hash SHA1 de la última confirmación de la compilación actual.                                                 |
| `CIRCLE_BRANCH`              | La rama del repositorio que se está compilando.                                                              |
| `CIRCLE_TAG`                 | El nombre de la etiqueta si la compilación actual se activa mediante una etiqueta; de lo contrario, está vacío.                      |
| `CIRCLE_JOB`                 | El nombre del trabajo actual.                                                                          |


Para obtener una lista de las variables de entorno establecidas por CircleCI para cada compilación, consulte la [documentación oficial de CircleCI][101].


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| Variable de entorno         | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | El ID único de la compilación.                                                                           |
| `CF_PIPELINE_NAME`           | La ruta completa de la canalización, incluido el proyecto al que está asignada, si corresponde.                 |
| `CF_BUILD_URL`               | La URL de la compilación en Codefresh.                                                                    |
| `CF_STEP_NAME`               | El nombre del paso, por ejemplo, "MyUnitTests".                                                     |
| `CF_BRANCH`                  | El nombre de la rama o etiqueta del repositorio Git asociado con la canalización principal en el momento de la ejecución. |
| `CF_REVISION`                | La revisión del repositorio Git de la canalización principal, en el momento de la ejecución.                   |


Para obtener una lista de las variables de entorno establecidas por Codefresh para cada compilación, consulte la [documentación oficial de Codefresh][101].


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| Variable de entorno       | Descripción                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | El nombre de la acción que se está ejecutando actualmente, o el ID de un paso. Por ejemplo: `repo-owner_name-of-action-repo`. |
| `GITHUB_SERVER_URL`        | La URL del servidor de GitHub. Por ejemplo: `https://github.com`.                                       |
| `GITHUB_RUN_ID`            | Un número único para cada ejecución de flujo de trabajo dentro de un repositorio. Por ejemplo: `1658821493`.                 |
| `GITHUB_RUN_NUMBER`        | Un número único para cada ejecución de un flujo de trabajo en particular en un repositorio. Por ejemplo: `3`.              |
| `GITHUB_RUN_ATTEMPT`       | Un número único para cada intento de una ejecución de flujo de trabajo en particular. Por ejemplo: `3`.                      |
| `GITHUB_WORKFLOW`          | El nombre del flujo de trabajo. Por ejemplo: `My test workflow`.                                            |
| `GITHUB_WORKSPACE`         | El directorio de trabajo predeterminado en el ejecutor para los pasos. Por ejemplo: `/home/runner/work/my-repo-name/my-repo-name`. |
| `GITHUB_REPOSITORY`        | El propietario y el nombre del repositorio. Por ejemplo: `octocat/Hello-World`.                                    |
| `GITHUB_SHA`               | El SHA de confirmación que activó el flujo de trabajo. Por ejemplo: `ffac537e6cbbf934b08745a378932722df287a53`. |
| `GITHUB_HEAD_REF`          | La referencia principal o rama fuente de la solicitud de extracción (solo se establece para eventos `pull_request` o `pull_request_target`). Por ejemplo: `feature-branch-1`. |
| `GITHUB_REF`               | La referencia completa de la rama o etiqueta que activó el flujo de trabajo. Por ejemplo: `refs/heads/feature-branch-1`. |
| `GITHUB_JOB`               | El ID del trabajo actual. Por ejemplo: `greeting_job`.                                           |
| `JOB_CHECK_RUN_ID`         | El ID de ejecución de verificación del trabajo actual. La acción de GitHub de Datadog Test Optimization exporta esta variable para los pasos subsiguientes. Para instrumentación manual, establezca `JOB_CHECK_RUN_ID: ${{ job.check_run_id }}`. |


Para obtener una lista completa de las variables de entorno establecidas por GitHub Actions para cada compilación, consulte la [documentación oficial de GitHub][101].


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable de entorno              | Descripción                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | Disponible para todos los trabajos ejecutados en CI/CD. `true` cuando esté disponible.                                        |
| `CI_PIPELINE_ID`      | El ID a nivel de instancia de la canalización actual. Este ID es único en todos los proyectos de la instancia de GitLab. |
| `CI_PIPELINE_URL`     | La URL para los detalles de la canalización.                                                                       |
| `CI_PIPELINE_IID`     | El IID (ID interno) a nivel de proyecto de la canalización actual. Único solo dentro del proyecto actual.      |
| `CI_PROJECT_PATH`     | El espacio de nombres del proyecto con el nombre del proyecto incluido.                                                     |
| `CI_PROJECT_URL`      | La dirección HTTP(S) del proyecto.                                                                       |
| `CI_PROJECT_DIR`      | La ruta completa donde se clona el repositorio y desde donde se ejecuta el trabajo.                                   |
| `CI_JOB_STAGE`        | El nombre de la etapa del trabajo.                                                                            |
| `CI_JOB_NAME`         | El nombre del trabajo.                                                                                     |
| `CI_JOB_URL`          | La URL de los detalles del trabajo.                                                                                     |
| `CI_JOB_ID`           | El ID interno del trabajo, único en todos los trabajos de la instancia de GitLab.                               |
| `CI_RUNNER_ID`        | El ID único del ejecutor que se está utilizando.                                                                  |
| `CI_RUNNER_TAGS`      | Una lista separada por comas de las etiquetas del ejecutor.                                                              |
| `CI_REPOSITORY_URL`   | La ruta completa para clonar (HTTP) el repositorio con un token de trabajo de CI/CD.                                  |
| `CI_COMMIT_SHA`       | La revisión de confirmación para la que se compila el proyecto.                                                            |
| `CI_COMMIT_REF_NAME`  | El nombre de la rama o etiqueta para la que se compila el proyecto.                                                        |
| `CI_COMMIT_BRANCH`    | El nombre de la rama de confirmación. Disponible en canalizaciones de rama.                                                   |
| `CI_COMMIT_TAG`       | El nombre de la etiqueta de confirmación. Disponible solo en canalizaciones para etiquetas.                                               |
| `CI_COMMIT_AUTHOR`    | El autor de la confirmación en formato Nombre <email>.                                                         |
| `CI_COMMIT_MESSAGE`   | El mensaje completo de la confirmación.                                                                               |
| `CI_COMMIT_TIMESTAMP` | La marca de tiempo de la confirmación en formato ISO 8601. Por ejemplo, 2022-01-31T16:47:55Z. UTC de forma predeterminada.  |


Para obtener una lista de las variables de entorno establecidas por GitLab CI para cada compilación, consulte la [documentación oficial de GitLab][101].


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| Variable de entorno              | Descripción                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | La URL del maestro de Jenkins que está ejecutando la compilación.                                                 |
| `BUILD_TAG`           | Una cadena con el formato `jenkins-${JOB_NAME}-${BUILD_NUMBER}` para facilitar la identificación.                    |
| `BUILD_NUMBER`        | El número de compilación actual, como \"153\".                                                                 |
| `BUILD_URL`           | La URL donde se pueden encontrar los resultados de esta compilación (como http://buildserver/jenkins/job/MyJobName/666/).|
| `WORKSPACE`           | La ruta absoluta del espacio de trabajo.                                                                       |
| `JOB_NAME`            | El nombre del proyecto para esta compilación.                                                                  |
| `JOB_URL`             | La URL para los detalles del trabajo.                                                                            |
| `GIT_URL`             | La URL de Git utilizada para el repositorio (como git@github.com:user/repo.git o https://github.com/user/repo.git).|
| `GIT_URL_1`           | La URL del primer repositorio Git si hay varios repositorios configurados.                            |
| `GIT_COMMIT`          | El hash de Git de la confirmación (commit) extraída para la compilación.                                                    |
| `GIT_BRANCH`          | La rama de Git que se extrajo para la compilación.                                                       |
| `NODE_NAME`           | El nombre del nodo en el que se está ejecutando la compilación. Es igual a 'master' para el nodo maestro.                       |
| `NODE_LABELS`         | Una lista separada por comas de las etiquetas asignadas al nodo.                                                   |
| `DD_CUSTOM_TRACE_ID`  | Variable personalizada establecida por el complemento Datadog de Jenkins para los ID de traza.                                        |
| `DD_CUSTOM_PARENT_ID` | Variable personalizada establecida por el complemento Datadog de Jenkins para los ID principales.                                        |


Para obtener una lista de las variables de entorno establecidas por Jenkins para cada compilación, consulte la [documentación oficial de Jenkins][101].


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| Variable de entorno                     | Descripción                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | La versión del servidor de TeamCity.                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | El nombre de la configuración de compilación a la que pertenece la compilación actual.                                           |
| `BUILD_URL`                  | El enlace a la compilación actual.                                                                             |
| `DATADOG_BUILD_ID`           | Variable personalizada establecida por la [Integración de Datadog con TeamCity][102].                                             |

Para obtener una lista de las variables de entorno establecidas por TeamCity para cada compilación, consulte la [documentación oficial de TeamCity][101].


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| Variable de entorno                     | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | Siempre establecido en `true` para indicar que la compilación se está ejecutando en Travis CI.                              |
| `TRAVIS_BUILD_ID`            | El ID de la compilación actual utilizado internamente por Travis CI.                                             |
| `TRAVIS_BUILD_NUMBER`        | El número de la compilación actual. Por ejemplo: `4`.                                                    |
| `TRAVIS_BUILD_WEB_URL`       | URL del registro de la compilación.                                                                                 |
| `TRAVIS_BUILD_DIR`           | La ruta absoluta al directorio donde se ha copiado el repositorio que se está compilando en el trabajador.    |
| `TRAVIS_JOB_WEB_URL`         | URL del registro del trabajo.                                                                                   |
| `TRAVIS_REPO_SLUG`           | El slug (en formato: `owner_name/repo_name`) del repositorio que se está compilando actualmente.                   |
| `TRAVIS_COMMIT`              | La confirmación (commit) que la compilación actual está probando.                                                         |
| `TRAVIS_BRANCH`              | Para compilaciones de tipo push, el nombre de la rama. Para compilaciones de tipo PR, el nombre de la rama a la que apunta la PR.    |
| `TRAVIS_TAG`                 | Si la compilación actual es para una etiqueta de Git, esta variable se establece en el nombre de la etiqueta; de lo contrario, está vacía. |
| `TRAVIS_PULL_REQUEST_SLUG`   | Si el trabajo actual es una solicitud de extracción (pull request), el slug del repositorio del cual se originó la PR.        |
| `TRAVIS_PULL_REQUEST_BRANCH` | Si el trabajo actual es una solicitud de extracción (pull request), el nombre de la rama de la cual se originó la PR.            |
| `TRAVIS_COMMIT_MESSAGE`      | El asunto y el cuerpo de la confirmación (commit), sin ajustar.                                                               |



Para obtener una lista completa de las variables de entorno establecidas por Travis CI para cada compilación, consulte la [documentación oficial de Travis CI][101].


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| Variable de entorno                                | Descripción                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | Representa si el entorno actual es un entorno de Buddy. Por ejemplo: `true`.    |
| `BUDDY_SCM_URL`                         | La URL del repositorio sincronizado con el proyecto. Por ejemplo: `https://github.com/githubaccount/repository`. |
| `BUDDY_EXECUTION_REVISION`              | El hash SHA1 de la confirmación (commit) de la ejecución actual de la canalización. Por ejemplo: `46c360492d6372e5335300776806af412755871`. |
| `BUDDY_EXECUTION_BRANCH`                | El nombre de la rama de Git de la ejecución actual de la canalización. Por ejemplo: `main`.             |
| `BUDDY_EXECUTION_TAG`                   | El nombre de la etiqueta de Git de la ejecución actual de la canalización (si está etiquetada). Por ejemplo: `v1.0.1`.    |
| `BUDDY_PIPELINE_ID`                     | El ID de la canalización de ejecución. Por ejemplo: `1`.                                             |
| `BUDDY_EXECUTION_ID`                    | El ID de la ejecución actual de la canalización. Por ejemplo: `1`.                                     |
| `BUDDY_PIPELINE_NAME`                   | El nombre de la canalización de ejecución. Por ejemplo: `Deploy to Production`.                        |
| `BUDDY_EXECUTION_URL`                   | La URL de la ejecución actual de la canalización. Por ejemplo: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1`. |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | El mensaje de confirmación (commit) de la revisión que se está ejecutando actualmente. Por ejemplo: `we need to write unit tests!`. |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | El nombre de la persona que realizó la confirmación de la revisión que se está ejecutando actualmente. Por ejemplo: `Mike Benson`.      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | La dirección de correo electrónico de la persona que realizó la confirmación de la revisión que se está ejecutando actualmente. Por ejemplo: `mike.benson@buddy.works`. |


</br>

Para obtener una lista completa de las variables de entorno establecidas por Buddy CI para cada compilación, consulte la [documentación oficial de Buddy CI][101].


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /es/tests/#setup