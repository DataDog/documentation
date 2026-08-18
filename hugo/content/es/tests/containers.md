---
aliases:
- /es/continuous_integration/setup_tests/containers
- /es/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: Documentación
  text: Más información sobre Test Optimization (optimización de tests)
title: Tests en contenedores
---

## Información general

Si ejecutas tus tests dentro de un contenedor que tu mismo lanzas dentro de la compilación (por ejemplo, utilizando [`docker run`][1] o [`docker-compose`][2]), reenvía las siguientes variables de entorno al contenedor dependiendo de tu proveedor de CI. Esto permite al rastreador de Datadog autodetectar la información de compilación.

Además, debes pasar las variables de entorno necesarias para configurar el rastreador como se describe en las [instrucciones de instrumentación de test por lenguaje][3] (como `DD_SERVICE`, `DD_ENV` y un `DD_TRACE_AGENT_URL` válido que sea accesible desde dentro del contenedor).

## Gestión de variables de entorno 

Esta tabla proporciona una lista no exhaustiva de variables de entorno disponibles para configurar el rastreador:

{{< tabs >}}
{{% tab "AppVeyor" %}}

| Variable de entorno                          | Descripción                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | Indica si la compilación se está ejecutando en el entorno de AppVeyor. Establecido en `True` (o `true` en la imagen de Ubuntu).    |
| `APPVEYOR_BUILD_ID`                          | Un identificador único para la compilación de AppVeyor.                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | El número de compilación asignado por AppVeyor, que se incrementa con cada nueva compilación.                                  |
| `APPVEYOR_BUILD_FOLDER`                      | La ruta al directorio donde se clona el repositorio.                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | Especifica el proveedor de control de origen para el repositorio, como `github`, `bitbucket` o `kiln`.         |
| `APPVEYOR_REPO_NAME`                         | El nombre del repositorio en el formato `owner-name/repo-name`.                                              |
| `APPVEYOR_REPO_BRANCH`                       | La rama del repositorio que se está compilando. Para las solicitudes pull, es la rama base en la que se fusiona la solicitud pull.    |
| `APPVEYOR_REPO_COMMIT`                       | El ID de confirmación (SHA) de la compilación actual.                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | El nombre de la etiqueta para compilaciones iniciadas por una etiqueta. Esta variable es indefinida si la compilación no es iniciada por una etiqueta.  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | La rama del repositorio de la que procede la solicitud pull.                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | El mensaje de confirmación asociado a la compilación actual.                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | El mensaje de confirmación extendido, incluyendo cualquier texto después del primer salto de línea.                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | El nombre del autor de la confirmación.                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | La dirección de correo electrónico del autor de la confirmación.                                                                       |

Para una lista completa de las variables de entorno establecidas por AppVeyor para cada compilación, consulta la [documentación oficial de AppVeyor][101].


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Pipelines de Azure" %}}

| Variable de entorno                  | Descripción                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | Indica que la compilación se está ejecutando en pipelines de Azure.                                                     |
| `BUILD_DEFINITIONNAME`                    | El nombre del pipeline de compilación.                                                                             |
| `BUILD_BUILDID`                           | El ID del registro para la compilación completada.                                                               |
| `BUILD_SOURCESDIRECTORY`                  | La ruta local en el Agent donde se descargan los archivos del código fuente.                                     |
| `BUILD_REPOSITORY_URI`                    | La URL del repositorio desencadenante.                                                                      |
| `BUILD_SOURCEBRANCH`                      | La rama del repositorio desencadenante para el que se puso en cola la compilación.                                                 |
| `BUILD_SOURCEVERSION`                     | El último cambio en el control de versiones del repositorio desencadenante que se incluye en esta compilación.                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | El comentario de la confirmación o conjunto de cambios del repositorio desencadenante.                                             |
| `BUILD_REQUESTEDFORID`                    | El ID del usuario que activó la compilación.                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | El correo electrónico del usuario que activó la compilación.                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | El URI de la cuenta de Team Foundation Server o Azure DevOps Services.                                    |
| `SYSTEM_TEAMPROJECTID`                    | ID del proyecto de equipo para la compilación.                                                                   |
| `SYSTEM_JOBID`                            | El ID del trabajo que se está ejecutando.                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | El ID de la instancia de la tarea dentro del trabajo.                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | La URL del repositorio fuente de la solicitud pull.                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | La rama fuente de la solicitud pull.                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | El ID de confirmación de la rama fuente en la solicitud pull.                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | El nombre para mostrar de la fase en el pipeline.                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | El nombre para mostrar del trabajo en el pipeline.                                                                |

Para obtener una lista completo de las variables de entorno establecidas por Azure DevOps Pipelines para cada compilación, consulta la [documentación oficial de Azure][101].


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Pipelines de Bitbucket" %}}

| Variable de entorno               | Descripción                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | UUID del pipeline.                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | Identificador único de una compilación. Se incrementa con cada compilación y puede utilizarse para crear nombres de artefactos únicos.                                                |
| `BITBUCKET_CLONE_DIR`              | La ruta absoluta del directorio en el que se clona el repositorio dentro del contenedor de Docker.                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | El nombre completo del repositorio (todo lo que viene después de http://bitbucket.org/).                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | Tu origen de SSH, por ejemplo: `git@bitbucket.org:/<workspace>/<repo>.git`.                                                                                       |
| `BITBUCKET_COMMIT`                 | El hash de la confirmación que inició la compilación.                                                                                                           |
| `BITBUCKET_BRANCH`                 | La rama fuente. Este valor sólo está disponible en las ramas. No está disponible para compilaciones contra etiquetas, o pipelines personalizados.                                         |
| `BITBUCKET_TAG`                    | La etiqueta de la confirmación que inició la compilación. Este valor sólo está disponible en etiquetas. No está disponible para compilaciones contra ramas.                                  |


Para una lista completa de las variables de entorno establecidas por Bitbucket para cada compilación, consulta la [documentación oficial de Bitbucket][101].

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| Variable de entorno                | Descripción                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | El slug que identifica de forma única una compilación en bitrise.io. Forma parte de la URL de la compilación.                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | El ID del flujo de trabajo que se activó, expuesto independientemente de si el flujo de trabajo se activó manual o automáticamente. |
| `BITRISE_BUILD_NUMBER`              | Número de compilación en bitrise.io.                                                                         |
| `BITRISE_BUILD_URL`                 | La URL de la compilación en bitrise.io.                                                                              |
| `BITRISE_SOURCE_DIR`                | Ruta al directorio base en funcionamiento. Por defecto, es el directorio donde se ejecuta Bitrise, a menos que proporciones un valor diferente. |
| `GIT_REPOSITORY_URL`                | La URL del repositorio Git que aloja tu aplicación.                                                               |
| `BITRISE_GIT_COMMIT`                | El hash de la confirmación de Git que activó la compilación, si procede.                                     |
| `GIT_CLONE_COMMIT_HASH`             | El hash de la confirmación que utiliza la compilación (la confirmación clonada).                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | La rama de destino de la solicitud pull que desencadenó la compilación, utilizada sólo con compilaciones desencadenadas por solicitudes pull. |
| `BITRISE_GIT_BRANCH`                | La rama Git compilada por Bitrise, por ejemplo, `main`.                                                    |
| `BITRISE_GIT_TAG`                   | Si una compilación es lanzada por una etiqueta Git, esta variable de entorno almacena la etiqueta utilizada.                                          |
| `BITRISE_GIT_MESSAGE`               | El mensaje de confirmación, el título de la solicitud pull o el mensaje que especificaste si se activó la compilación manualmente.        |
| `BITRISE_APP_TITLE`                 | El título de tu aplicación en bitrise.io.                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | El asunto del mensaje de confirmación de la confirmación clonada.                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | El cuerpo (contenido) del mensaje de confirmación de la confirmación clonada.                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | El nombre del autor de la confirmación clonada.                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | El correo electrónico del autor de la confirmación clonada.                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | El nombre del encargado de la confirmación de la confirmación clonada.                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | El correo electrónico del encargado de la confirmación de la confirmación clonada.                                                                 |


Para una lista completa de las variables de entorno establecidas por Bitrise para cada compilación, consulta la [documentación oficial de Bitrise][101].


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| Variable de entorno          | Descripción                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | Siempre es true.                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | El slug del pipeline en Buildkite como se usa en las URLs.                                                 |
| `BUILDKITE_JOB_ID`            | El UUID interno que Buildkite utiliza para este trabajo.                                                   |
| `BUILDKITE_BUILD_ID`          | UUID de la compilación.                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | El número de compilación. Este número aumenta con cada compilación y es único dentro de cada canal.   |
| `BUILDKITE_BUILD_URL`         | La URL de esta compilación en Buildkite.                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | La ruta en la que el Agent ha comprobado tu código para esta compilación.                             |
| `BUILDKITE_REPO`              | El repositorio de tu pipeline.                                                                  |
| `BUILDKITE_COMMIT`            | El objeto de la confirmación Git de la compilación.                                                              |
| `BUILDKITE_BRANCH`            | La rama en compilación.                                                                         |
| `BUILDKITE_TAG`               | El nombre de la etiqueta que se está compilando, si esta compilación se desencadenó desde una etiqueta.                        |
| `BUILDKITE_MESSAGE`           | El mensaje asociado a la compilación, normalmente el mensaje de confirmación.                             |
| `BUILDKITE_BUILD_AUTHOR`      | El nombre del usuario autor de la confirmación que se está compilando.                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| El correo electrónico de notificación del usuario autor de la confirmación que se está compilando.                        |
| `BUILDKITE_BUILD_CREATOR`     | El nombre del usuario que creó la compilación.                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | El correo electrónico de notificación del usuario que creó la compilación.                                     |
| `BUILDKITE_AGENT_ID`          | UUID del Agent.                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | El valor de cada etiqueta del Agent. El nombre de la etiqueta se añade al final del nombre de la variable.           |


Para una lista completa de las variables de entorno establecidas por Buildkite para cada compilación, consulta la [documentación oficial de Buildkite][101].

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| Variable de entorno         | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | Indica si la compilación se está ejecutando en CircleCI. Siempre se establece en `true`.                                |
| `CIRCLE_PROJECT_REPONAME`     | El nombre del repositorio que se está compilando.                                                               |
| `CIRCLE_BUILD_NUM`           | El número del trabajo actual. Los números de trabajo son únicos para cada trabajo.                                  |
| `CIRCLE_BUILD_URL`           | La URL del trabajo actual en CircleCI.                                                              |
| `CIRCLE_WORKFLOW_ID`         | Un identificador único para la instancia de proceso del trabajo actual.                                      |
| `CIRCLE_WORKING_DIRECTORY`   | La ruta al directorio de trabajo donde se comprueba el código.                                       |
| `CIRCLE_REPOSITORY_URL`      | La URL del repositorio que se está compilando.                                                                 |
| `CIRCLE_SHA1`                | El hash SHA1 de la última confirmación de la compilación actual.                                                 |
| `CIRCLE_BRANCH`              | La rama del repositorio que se está compilando.                                                              |
| `CIRCLE_TAG`                 | El nombre de la etiqueta si la compilación en curso está provocada por una etiqueta; en caso contrario, está vacío.                      |
| `CIRCLE_JOB`                 | El nombre del trabajo actual.                                                                          |


Para una lista completa con todas las variables de entorno que CircleCI establece en cada compilación, consulta la [documentación oficial de CircleCI][101].


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| Variable de entorno         | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | El ID único de la compilación.                                                                           |
| `CF_PIPELINE_NAME`           | La ruta completa del pipeline, incluido el proyecto al que está asignado, si existe.                 |
| `CF_BUILD_URL`               | La URL de la compilación en Codefresh.                                                                    |
| `CF_STEP_NAME`               | El nombre del paso, por ejemplo, "MyUnitTests".                                                     |
| `CF_BRANCH`                  | El nombre de la rama o etiqueta del repositorio Git asociado al pipeline principal en el momento de la ejecución. |
| `CF_REVISION`                | La revisión del repositorio Git del pipeline principal, en el momento de la ejecución.                   |


Para una lista completa de las variables de entorno establecidas por Codefresh para cada compilación, consulta la [documentación oficial de Codefresh][101].


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "Acciones GitHub" %}}

| Variable de entorno       | Descripción                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | El nombre de la acción que se está ejecutando actualmente, o el ID de un paso. Por ejemplo: `repo-owner_name-of-action-repo`. |
| `GITHUB_SERVER_URL`        | La URL del servidor GitHub. Por ejemplo: `https://github.com`.                                       |
| `GITHUB_RUN_ID`            | Un número único para cada proceso ejecutado dentro de un repositorio. Por ejemplo: `1658821493`.                 |
| `GITHUB_RUN_NUMBER`        | Un número único para cada ejecución de un proceso concreto en un repositorio. Por ejemplo: `3`.              |
| `GITHUB_RUN_ATTEMPT`       | Un número único para cada intento de ejecución de un proceso concreto. Por ejemplo: `3`.                      |
| `GITHUB_WORKFLOW`          | El nombre del proceso. Por ejemplo: `My test workflow`.                                            |
| `GITHUB_WORKSPACE`         | El directorio en funcionamiento por defecto en el ejecutor para los pasos. Por ejemplo: `/home/runner/work/my-repo-name/my-repo-name`. |
| `GITHUB_REPOSITORY`        | El propietario y el nombre del repositorio. Por ejemplo: `octocat/Hello-World`.                                    |
| `GITHUB_SHA`               | El SHA de confirmación que desencadenó el proceso. Por ejemplo: `ffac537e6cbbf934b08745a378932722df287a53`. |
| `GITHUB_HEAD_REF`          | La referencia principal o rama fuente de la solicitud pull (sólo se establece para eventos `pull_request` o `pull_request_target`). Por ejemplo: `feature-branch-1`. |
| `GITHUB_REF`               | La referencia completa de la rama o etiqueta que desencadenó el proceso. Por ejemplo: `refs/heads/feature-branch-1`. |
| `GITHUB_JOB`               | El ID del trabajo actual. Por ejemplo: `greeting_job`.                                           |


Para una lista completa de las variables de entorno establecidas por las acciones de GitHub para cada compilación, consulta la [documentación oficial de GitHub][101].


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable de entorno              | Descripción                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | Disponible para todos los trabajos ejecutados en CI/CD. `true` cuando esté disponible.                                        |
| `CI_PIPELINE_ID`      | El ID a nivel de instancia del pipeline actual. Este ID es único para todos los proyectos de la instancia de GitLab. |
| `CI_PIPELINE_URL`     | La URL para los detalles del pipeline.                                                                       |
| `CI_PIPELINE_IID`     | El IID (ID interno) a nivel de proyecto del pipeline actual. Único sólo dentro del proyecto actual.      |
| `CI_PROJECT_PATH`     | El espacio de nombres del proyecto con el nombre del proyecto incluido.                                                     |
| `CI_PROJECT_DIR`      | La ruta completa a la que se clona el repositorio, y desde donde se ejecuta el trabajo.                                   |
| `CI_JOB_STAGE`        | El nombre de la fase del trabajo.                                                                            |
| `CI_JOB_NAME`         | El nombre del trabajo.                                                                                     |
| `CI_JOB_URL`          | La URL de los detalles del trabajo.                                                                                     |
| `CI_JOB_ID`           | El ID interno del trabajo, único para todos los trabajos en la instancia de GitLab.                               |
| `CI_RUNNER_ID`        | El ID único del ejecutor que se está utilizando.                                                                  |
| `CI_RUNNER_TAGS`      | Una lista separada por comas de las etiquetas del ejecutor.                                                              |
| `CI_REPOSITORY_URL`   | La ruta completa para clonar con Git (HTTP) el repositorio con un token de trabajo CI/CD.                                  |
| `CI_COMMIT_SHA`       | La revisión de la confirmación para la que se ha creado el proyecto.                                                            |
| `CI_COMMIT_REF_NAME`  | La rama o nombre de etiqueta para el que se compile el proyecto.                                                        |
| `CI_COMMIT_BRANCH`    | El nombre de la rama de la confirmación. Disponible en los pipelines de rama.                                                   |
| `CI_COMMIT_TAG`       | El nombre de la etiqueta de confirmación. Disponible sólo en pipelines para etiquetas.                                               |
| `CI_COMMIT_AUTHOR`    | El autor de la confirmación en formato Nombre <email>.                                                         |
| `CI_COMMIT_MESSAGE`   | El mensaje de confirmación completo.                                                                               |
| `CI_COMMIT_TIMESTAMP` | La fecha y hora de la confirmación en formato ISO 8601. Por ejemplo, 2022-01-31T16:47:55Z. UTC por defecto.  |


Para una lista completa de variables de entorno establecidas por GitLab CI para cada compilación, consulta la [documentación oficial de GitLab][101].


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| Variable de entorno              | Descripción                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | La URL del master de Jenkins que está ejecutando la compilación.                                                 |
| `BUILD_TAG`           | Una cadena de la forma `jenkins-${JOB_NAME}-${BUILD_NUMBER}` para facilitar la identificación.                    |
| `BUILD_NUMBER`        | El número de compilación actual, como "153".                                                                 |
| `BUILD_URL`           | La URL donde se pueden encontrar los resultados de esta compilación (como http://buildserver/jenkins/job/MyJobName/666/).|
| `WORKSPACE`           | La ruta absoluta del espacio de trabajo.                                                                       |
| `JOB_NAME`            | El nombre del proyecto para esta compilación.                                                                  |
| `JOB_URL`             | La URL para los detalles del trabajo.                                                                            |
| `GIT_URL`             | La URL de Git utilizada para el repositorio (como git@github.com:user/repo.git o https://github.com/user/repo.git).|
| `GIT_URL_1`           | La URL del primer repositorio de Git si se configuran múltiples repositorios.                            |
| `GIT_COMMIT`          | El hash de Git de la confirmación verificada para la compilación.                                                    |
| `GIT_BRANCH`          | La rama de Git que se comprobó para la compilación.                                                       |
| `NODE_NAME`           | El nombre del nodo en el que se ejecuta la compilación. Es igual a 'master' para el nodo maestro.                       |
| `NODE_LABELS`         | Una lista separada por comas de las etiquetas asignadas al nodo.                                                   |
| `DD_CUSTOM_TRACE_ID`  | Variable personalizada establecida por el complemento de Jenkins Datadog para los ID de traza.                                        |
| `DD_CUSTOM_PARENT_ID` | Variable personalizada establecida por el complemento de Jenkins Datadog para los IDs principales.                                        |


Para una lista completa de las variables de entorno establecidas por Jenkins para cada compilación, consulta la [documentación oficial de Jenkins][101].


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| Variable de entorno                     | Descripción                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | La versión del servidor TeamCity.                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | El nombre de la configuración de la confirmación a la que pertenece la compilación actual.                                           |
| `BUILD_URL`                  | El enlace a la compilación actual.                                                                             |
| `DATADOG_BUILD_ID`           | Variable personalizada establecida por la [integración de Datadog TeamCity][102].                                             |

Para una lista completa de las variables de entorno establecidas por TeamCity para cada compilación, consulta la [documentación oficial de TeamCity][101].


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| Variable de entorno                     | Descripción                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | Siempre se establece en `true` para indicar que la compilación se está ejecutando en Travis CI.                              |
| `TRAVIS_BUILD_ID`            | El ID de la compilación actual utilizado internamente por Travis CI.                                             |
| `TRAVIS_BUILD_NUMBER`        | El número de la compilación actual. Por ejemplo: `4`.                                                    |
| `TRAVIS_BUILD_WEB_URL`       | URL del log de la compilación.                                                                                 |
| `TRAVIS_BUILD_DIR`           | La ruta absoluta al directorio donde se ha copiado el repositorio que se está compilando en el worker.    |
| `TRAVIS_JOB_WEB_URL`         | URL del log del trabajo.                                                                                   |
| `TRAVIS_REPO_SLUG`           | El slug (en formato: `owner_name/repo_name`) del repositorio que se está compilando actualmente.                   |
| `TRAVIS_COMMIT`              | La confirmación que la compilación actual está probando.                                                         |
| `TRAVIS_BRANCH`              | Para las compilaciones push, el nombre de la rama. Para las compilaciones de solicitudes pull, el nombre de la rama a la que se dirige la solicitud pull.    |
| `TRAVIS_TAG`                 | Si la compilación actual es para una etiqueta de Git, esta variable se establece con el nombre de la etiqueta, de lo contrario está vacía. |
| `TRAVIS_PULL_REQUEST_SLUG`   | Si el trabajo actual es una solicitud pull, el slug del repositorio desde el que se originó la solicitud pull.        |
| `TRAVIS_PULL_REQUEST_BRANCH` | Si el trabajo actual es una solicitud pull, el slug de la rama desde la que se originó la solicitud pull.            |
| `TRAVIS_COMMIT_MESSAGE`      | El sujeto y el cuerpo de la confirmación, extraídos.                                                               |



Para una lista completa de variables de entorno establecidas por Travis CI para cada compilación, consulta la [documentación oficial de Travis CI][101].


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| Variable de entorno                                | Descripción                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | Representa si el entorno actual es un entorno de Buddy. Por ejemplo: `true`.    |
| `BUDDY_SCM_URL`                         | La URL del repositorio sincronizado con el proyecto. Por ejemplo: `https://github.com/githubaccount/repository`. |
| `BUDDY_EXECUTION_REVISION`              | El hash SHA1 de la confirmación de la ejecución actual del pipeline. Por ejemplo: `46c360492d6372e5335300776806af412755871`. |
| `BUDDY_EXECUTION_BRANCH`                | El nombre de la rama de Git de la ejecución actual del pipeline. Por ejemplo: `main`.             |
| `BUDDY_EXECUTION_TAG`                   | El nombre de la etiqueta de Git de la ejecución actual del pipeline (si está etiquetado). Por ejemplo: `v1.0.1`.    |
| `BUDDY_PIPELINE_ID`                     | El ID del pipeline de ejecución. Por ejemplo: `1`.                                             |
| `BUDDY_EXECUTION_ID`                    | El ID de la ejecución actual del pipeline. Por ejemplo: `1`.                                     |
| `BUDDY_PIPELINE_NAME`                   | El nombre del pipeline de ejecución. Por ejemplo: `Deploy to Production`.                        |
| `BUDDY_EXECUTION_URL`                   | La URL de la ejecución actual del pipeline. Por ejemplo: `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1`. |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | El mensaje de confirmación de la revisión actual. Por ejemplo: `we need to write unit tests!`. |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | El nombre del encargado de la confirmación de la revisión actual. Por ejemplo: `Mike Benson`.      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | La dirección de correo electrónico del encargado de la confirmación de la revisión actual. Por ejemplo: `mike.benson@buddy.works`. |


</br>

Para una lista completa de las variables de entorno establecidas por Buddy CI para cada compilación, consulta la [documentación oficial de Buddy CI][101].


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /es/tests/#setup