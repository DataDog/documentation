---
aliases:
- /fr/continuous_integration/setup_tests/containers
- /fr/continuous_integration/tests/containers
further_reading:
- link: /tests
  tag: Documentation
  text: En savoir plus sur Test Optimization
title: Tests dans Containers
---
## Présentation {#overview}

Utilisez ce guide lorsqu'un job CI lance le processus de test dans un conteneur séparé avec une commande telle que [`docker run`][1] ou [`docker-compose`][2]. Transférez les variables d'environnement de votre fournisseur CI vers le conteneur de test afin que le SDK Datadog puisse détecter les informations de build.

L'exécuteur basé sur Docker intégré d'un fournisseur CI est l'environnement d'exécution principal du job. Ce guide ne s'applique pas à moins qu'une commande dans ce job ne lance les tests dans un autre conteneur. Il ne s'applique pas non plus lorsque les conteneurs fournissent uniquement des services de support, tels qu'une base de données.

Transférez chaque variable requise par les [instructions d'instrumentation de test par langage][3]. Ceci inclut :

- Configuration du SDK, telle que `DD_SERVICE`, `DD_ENV`, et un `DD_TRACE_AGENT_URL` valide auquel le conteneur peut accéder
- Variables d'injection d'exécution, telles que `RUBYOPT`, `NODE_OPTIONS`, ou les options d'outils Java

Les variables définies dans le job CI ou exportées par une étape d'auto-instrumentation ne sont pas automatiquement disponibles à l'intérieur d'un conteneur lancé par ce job.

## Choisissez une méthode d'instrumentation {#choose-an-instrumentation-method}

L'auto-instrumentation s'exécute sur l'exécuteur CI et ne passe pas automatiquement dans un conteneur de test lancé séparément.

- **Image construite dans le job CI actuel :** Exécutez l'auto-instrumentation avant la construction de l'image. Utilisez cette méthode uniquement si la build copie les artefacts du traceur ou les changements de dépendances produits par l'intégration et que vous transférez ses variables d'exécution. Sinon, utilisez l'instrumentation manuelle.
- **Image préconstruite :** Si le job se contente de récupérer ou de référencer un tag ou un condensat d'image, utilisez l'instrumentation manuelle. Un Dockerfile dans le dépôt ne compte pas à moins que le job ne l'utilise pour construire l'image de test.

## Gérer les variables d'environnement {#manage-environment-variables}

Ce tableau fournit une liste non exhaustive des variables d'environnement disponibles pour configurer le SDK :

{{< tabs >}}
{{% tab "AppVeyor" %}}

| Variable d'environnement                          | Description                                                                                                 |
|-----------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `APPVEYOR`                                   | Indique si la build s'exécute dans l'environnement AppVeyor. Défini sur `True` (ou `true` sur l'image Ubuntu).    |
| `APPVEYOR_BUILD_ID`                          | Un identifiant unique pour la build AppVeyor.                                                                  |
| `APPVEYOR_BUILD_NUMBER`                      | Le numéro de build attribué par AppVeyor, qui s'incrémente à chaque nouvelle build.                                  |
| `APPVEYOR_BUILD_FOLDER`                      | Le chemin vers le répertoire où le dépôt est cloné.                                                     |
| `APPVEYOR_REPO_PROVIDER`                     | Spécifie le fournisseur de contrôle de source pour le dépôt, tel que `github`, `bitbucket` ou `kiln`.         |
| `APPVEYOR_REPO_NAME`                         | Le nom du dépôt au format `owner-name/repo-name`.                                              |
| `APPVEYOR_REPO_BRANCH`                       | La branche du dépôt en cours de build. Pour les demandes de tirage, il s'agit de la branche de base dans laquelle la PR est fusionnée.    |
| `APPVEYOR_REPO_COMMIT`                       | L'identifiant de commit (SHA) du build actuel.                                                                     |
| `APPVEYOR_REPO_TAG_NAME`                     | Le nom du tag pour les builds démarrés par un tag. Cette variable est indéfinie si le build n'est pas déclenché par un tag.  |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH`     | La branche du dépôt à partir de laquelle la demande de tirage a été créée.                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE`               | Le message de commit associé à la build actuelle.                                                         |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`      | Le message de commit étendu, incluant tout texte après le premier saut de ligne.                                   |
| `APPVEYOR_REPO_COMMIT_AUTHOR`                | Le nom de l'auteur du commit.                                                                         |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`          | L'adresse e-mail de l'auteur du commit.                                                                       |

Pour une liste complète des variables d'environnement définies par AppVeyor pour chaque build, consultez la [documentation officielle d'AppVeyor][101].


[101]: https://www.appveyor.com/docs/environment-variables/

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Variable d'environnement                  | Description                                                                                             |
|-------------------------------------------|-------------------------------------------------------------------------------------------------------------|
| `TF_BUILD`                                | Indique que le build s'exécute dans Azure Pipelines.                                                     |
| `BUILD_DEFINITIONNAME`                    | Le nom du build pipeline.                                                                             |
| `BUILD_BUILDID`                           | L'ID de l'enregistrement pour le build terminé.                                                               |
| `BUILD_SOURCESDIRECTORY`                  | Le chemin local sur l'agent où vos fichiers de code source sont téléchargés.                                     |
| `BUILD_REPOSITORY_URI`                    | L'URL du dépôt déclencheur.                                                                      |
| `BUILD_SOURCEBRANCH`                      | La branche du dépôt déclencheur pour laquelle le build a été mis en file d'attente.                                                 |
| `BUILD_SOURCEVERSION`                     | La dernière modification de contrôle de version du dépôt déclencheur incluse dans ce build.                    |
| `BUILD_SOURCEVERSIONMESSAGE`              | Le commentaire du commit ou du jeu de modifications pour le dépôt déclencheur.                                             |
| `BUILD_REQUESTEDFORID`                    | L'ID de l'utilisateur qui a déclenché le build.                                                                 |
| `BUILD_REQUESTEDFOREMAIL`                 | L'adresse électronique de l'utilisateur qui a déclenché le build.                                                              |
| `SYSTEM_TEAMFOUNDATIONSERVERURI`          | L'URI du compte Team Foundation Server ou Azure DevOps Services.                                    |
| `SYSTEM_TEAMPROJECTID`                    | L'ID du projet d'équipe pour le build.                                                                   |
| `SYSTEM_JOBID`                            | L'ID du job en cours d'exécution.                                                                           |
| `SYSTEM_TASKINSTANCEID`                   | L'ID de l'instance de tâche au sein du job.                                                                 |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI`  | L'URL du dépôt source pour la demande de tirage.                                                      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`         | La branche source de la demande de tirage.                                                                      |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`       | L'ID de commit de la branche source dans la demande de tirage.                                                     |
| `SYSTEM_STAGEDISPLAYNAME`                 | Le nom complet de l'étape dans le pipeline.                                                              |
| `SYSTEM_JOBDISPLAYNAME`                   | Le nom complet du job dans le pipeline.                                                                |

Pour obtenir une liste complète des variables d'environnement définies par Azure DevOps Pipelines pour chaque build, consultez la [documentation officielle Azure][101].


[101]: https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops
{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| Variable d'environnement               | Description                                                                                                                                                      |
|------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `BITBUCKET_PIPELINE_UUID`          | L'UUID du pipeline.                                                                                                                                        |
| `BITBUCKET_BUILD_NUMBER`           | L'identifiant unique du build. Il s'incrémente à chaque build et peut être utilisé pour créer des noms d'artefacts uniques.                                                |
| `BITBUCKET_CLONE_DIR`              | Le chemin absolu du répertoire dans lequel le dépôt est cloné à l'intérieur du conteneur Docker.                                                                |
| `BITBUCKET_REPO_FULL_NAME`         | Le nom complet du dépôt (tout ce qui suit http://bitbucket.org/).                                                                             |
| `BITBUCKET_GIT_SSH_ORIGIN`         | Votre origine SSH, par exemple : `git@bitbucket.org:/<workspace>/<repo>.git`.                                                                                       |
| `BITBUCKET_COMMIT`                 | Le hash de commit d'un commit ayant déclenché le build.                                                                                                           |
| `BITBUCKET_BRANCH`                 | La branche source. Cette valeur n'est disponible que sur les branches. Non disponible pour les builds basés sur des tags ou les pipelines personnalisés.                                         |
| `BITBUCKET_TAG`                    | Le tag d'un commit ayant déclenché le build. Cette valeur n'est disponible que sur les tags. Non disponible pour les builds basés sur des branches.                                  |


Pour une liste complète des variables d'environnement définies par Bitbucket pour chaque build, consultez la [documentation officielle de Bitbucket][101].

[101]: https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/

{{% /tab %}}
{{% tab "Bitrise" %}}

| Variable d'environnement                | Description                                                                                                      |
|-------------------------------------|------------------------------------------------------------------------------------------------------------------|
| `BITRISE_BUILD_SLUG`                | Le slug qui identifie de manière unique un build sur bitrise.io. Il fait partie de l'URL du build.                             |
| `BITRISE_TRIGGERED_WORKFLOW_ID`     | L'ID du Workflow qui a été déclenché, exposé que le Workflow ait été déclenché manuellement ou automatiquement. |
| `BITRISE_BUILD_NUMBER`              | Numéro de build de la build sur bitrise.io.                                                                         |
| `BITRISE_BUILD_URL`                 | L'URL de la build sur bitrise.io.                                                                              |
| `BITRISE_SOURCE_DIR`                | Chemin vers le répertoire de travail de base. Par défaut, il s'agit du répertoire où Bitrise s'exécute, sauf si vous fournissez une valeur différente. |
| `GIT_REPOSITORY_URL`                | L'URL du dépôt Git qui héberge votre application.                                                               |
| `BITRISE_GIT_COMMIT`                | Le hash du commit Git qui a déclenché la build, le cas échéant.                                     |
| `GIT_CLONE_COMMIT_HASH`             | Le hash du commit que la build utilise (le commit cloné).                                                  |
| `BITRISEIO_GIT_BRANCH_DEST`         | La branche de destination ou cible de la pull request qui a déclenché la build, utilisée uniquement avec les builds déclenchées par des pull requests. |
| `BITRISE_GIT_BRANCH`                | La branche Git qui est build par Bitrise, par exemple, `main`.                                                    |
| `BITRISE_GIT_TAG`                   | Si une build est déclenchée par un tag Git, cette variable d'environnement stocke le tag utilisé.                                          |
| `BITRISE_GIT_MESSAGE`               | Le message de commit, le titre de la pull request, ou le message que vous avez spécifié si vous avez déclenché la build manuellement.        |
| `BITRISE_APP_TITLE`                 | Le titre de votre application sur bitrise.io.                                                                             |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT`  | L'objet du message de commit du commit cloné.                                                          |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`     | Le corps (contenu) du message de commit du commit cloné.                                                   |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`      | Le nom de l'auteur du commit cloné.                                                                     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`     | L'e-mail de l'auteur du commit cloné.                                                                    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`    | Le nom du committer du commit cloné.                                                                  |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`   | L'e-mail du committer du commit cloné.                                                                 |


Pour une liste complète des variables d'environnement définies par Bitrise pour chaque build, consultez la [documentation officielle de Bitrise][101].


[101]: https://devcenter.bitrise.io/en/references/available-environment-variables.html

{{% /tab %}}
{{% tab "Buildkite" %}}

| Variable d'environnement          | Description                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| `BUILDKITE`                   | Toujours vrai.                                                                                   |
| `BUILDKITE_PIPELINE_SLUG`     | Le slug du pipeline sur Buildkite tel qu'utilisé dans les URL.                                                 |
| `BUILDKITE_JOB_ID`            | L'UUID interne que Buildkite utilise pour ce job.                                                   |
| `BUILDKITE_BUILD_ID`          | L'UUID de la build.                                                                          |
| `BUILDKITE_BUILD_NUMBER`      | Le numéro de la build. Ce numéro augmente à chaque build et est unique au sein de chaque pipeline.   |
| `BUILDKITE_BUILD_URL`         | L'URL de cette build sur Buildkite.                                                             |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | Le chemin où l'agent a extrait votre code pour cette build.                             |
| `BUILDKITE_REPO`              | Le dépôt de votre pipeline.                                                                  |
| `BUILDKITE_COMMIT`            | L'objet de commit Git de la build.                                                              |
| `BUILDKITE_BRANCH`            | La branche en cours de build.                                                                         |
| `BUILDKITE_TAG`               | Le nom du tag en cours de build, si cette build a été déclenchée à partir d'un tag.                        |
| `BUILDKITE_MESSAGE`           | Le message associé à la build, généralement le message de commit.                             |
| `BUILDKITE_BUILD_AUTHOR`      | Le nom de l'utilisateur qui a créé le commit en cours de build.                                      |
| `BUILDKITE_BUILD_AUTHOR_EMAIL`| L'adresse e-mail de notification de l'utilisateur qui a créé le commit en cours de build.                        |
| `BUILDKITE_BUILD_CREATOR`     | Le nom de l'utilisateur qui a créé la build.                                                     |
| `BUILDKITE_BUILD_CREATOR_EMAIL` | L'adresse e-mail de notification de l'utilisateur qui a créé la build.                                     |
| `BUILDKITE_AGENT_ID`          | L'UUID de l'agent.                                                                          |
| `BUILDKITE_AGENT_META_DATA_*` | La valeur de chaque tag d'agent. Le nom du tag est ajouté à la fin du nom de la variable.           |


Pour une liste complète des variables d'environnement définies par Buildkite pour chaque build, consultez la [documentation officielle de Buildkite][101].

[101]: https://buildkite.com/docs/pipelines/environment-variables

{{% /tab %}}
{{% tab "CircleCI" %}}

| Variable d'environnement         | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CIRCLECI`                    | Indique si le build est en cours d'exécution dans CircleCI. Toujours défini sur `true`.                                |
| `CIRCLE_PROJECT_REPONAME`     | Le nom du dépôt en cours de build.                                                               |
| `CIRCLE_BUILD_NUM`           | Le numéro du job actuel. Les numéros de job sont uniques pour chaque job.                                  |
| `CIRCLE_BUILD_URL`           | L'URL du job actuel sur CircleCI.                                                              |
| `CIRCLE_WORKFLOW_ID`         | Un identifiant unique pour l'instance de workflow du job actuel.                                      |
| `CIRCLE_WORKING_DIRECTORY`   | Le chemin vers le répertoire de travail où le code est extrait.                                       |
| `CIRCLE_REPOSITORY_URL`      | L'URL du dépôt en cours de build.                                                                 |
| `CIRCLE_SHA1`                | Le hash SHA1 du dernier commit du build actuel.                                                 |
| `CIRCLE_BRANCH`              | La branche du dépôt en cours de build.                                                              |
| `CIRCLE_TAG`                 | Le nom du tag si le build actuel est déclenché par un tag ; sinon, il est vide.                      |
| `CIRCLE_JOB`                 | Le nom du job actuel.                                                                          |


Pour une liste complète des variables d'environnement définies par CircleCI pour chaque build, consultez la [documentation officielle de CircleCI][101].


[101]: https://circleci.com/docs/variables/

{{% /tab %}}
{{% tab "Codefresh" %}}

| Variable d'environnement         | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `CF_BUILD_ID`                | L'identifiant unique du build.                                                                           |
| `CF_PIPELINE_NAME`           | Le chemin complet du pipeline, incluant le projet auquel il est assigné, le cas échéant.                 |
| `CF_BUILD_URL`               | L'URL du build dans Codefresh.                                                                    |
| `CF_STEP_NAME`               | Le nom de l'étape, par exemple, « MyUnitTests ».                                                     |
| `CF_BRANCH`                  | Le nom de la branche ou le tag du dépôt Git associé au pipeline principal au moment de l'exécution. |
| `CF_REVISION`                | La révision du dépôt Git du pipeline principal, au moment de l'exécution.                   |


Pour une liste complète des variables d'environnement définies par Codefresh pour chaque build, consultez la [documentation officielle de Codefresh][101].


[101]: https://codefresh.io/docs/docs/pipelines/variables/

{{% /tab %}}
{{% tab "GitHub Actions" %}}

| Variable d'environnement       | Description                                                                                           |
|----------------------------|-------------------------------------------------------------------------------------------------------|
| `GITHUB_ACTION`            | Le nom de l'action en cours d'exécution, ou l'ID d'une étape. Par exemple : `repo-owner_name-of-action-repo`. |
| `GITHUB_SERVER_URL`        | L'URL du serveur GitHub. Par exemple : `https://github.com`.                                       |
| `GITHUB_RUN_ID`            | Un numéro unique pour chaque exécution de workflow au sein d'un dépôt. Par exemple : `1658821493`.                 |
| `GITHUB_RUN_NUMBER`        | Un numéro unique pour chaque exécution d'un workflow particulier dans un dépôt. Par exemple : `3`.              |
| `GITHUB_RUN_ATTEMPT`       | Un numéro unique pour chaque tentative d'exécution d'un workflow particulier. Par exemple : `3`.                      |
| `GITHUB_WORKFLOW`          | Le nom du workflow. Par exemple : `My test workflow`.                                            |
| `GITHUB_WORKSPACE`         | Le répertoire de travail par défaut sur l'exécuteur pour les étapes. Par exemple : `/home/runner/work/my-repo-name/my-repo-name`. |
| `GITHUB_REPOSITORY`        | Le propriétaire et le nom du dépôt. Par exemple : `octocat/Hello-World`.                                    |
| `GITHUB_SHA`               | Le SHA du commit qui a déclenché le workflow. Par exemple : `ffac537e6cbbf934b08745a378932722df287a53`. |
| `GITHUB_HEAD_REF`          | La référence principale ou la branche source de la pull request (uniquement définie pour les événements `pull_request` ou `pull_request_target`). Par exemple : `feature-branch-1`. |
| `GITHUB_REF`               | La référence complète de la branche ou du tag qui a déclenché le workflow. Par exemple : `refs/heads/feature-branch-1`. |
| `GITHUB_JOB`               | L'ID du job actuel. Par exemple : `greeting_job`.                                           |
| `JOB_CHECK_RUN_ID`         | L'ID de la vérification en cours du job actuel. L'action GitHub Datadog Test Optimization exporte cette variable pour les étapes suivantes. Pour une instrumentation manuelle, définissez `JOB_CHECK_RUN_ID: ${{ job.check_run_id }}`. |


Pour une liste complète des variables d'environnement définies par GitHub Actions pour chaque build, consultez la [documentation officielle de GitHub][101].


[101]: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/variables#default-environment-variables

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable d'environnement              | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `GITLAB_CI`           | Disponible pour tous les jobs exécutés dans CI/CD. `true` lorsqu'il est disponible.                                        |
| `CI_PIPELINE_ID`      | L'ID au niveau de l'instance du pipeline actuel. Cet ID est unique pour tous les projets sur l'instance GitLab. |
| `CI_PIPELINE_URL`     | L'URL des détails du pipeline.                                                                       |
| `CI_PIPELINE_IID`     | L'IID (ID interne) au niveau du projet du pipeline actuel. Unique uniquement au sein du projet actuel.      |
| `CI_PROJECT_PATH`     | L'espace de noms du projet avec le nom du projet inclus.                                                     |
| `CI_PROJECT_URL`      | L'adresse HTTP(S) du projet.                                                                       |
| `CI_PROJECT_DIR`      | Le chemin complet vers lequel le dépôt est cloné, et à partir duquel le job est exécuté.                                   |
| `CI_JOB_STAGE`        | Le nom de l'étape du job.                                                                            |
| `CI_JOB_NAME`         | Le nom du job.                                                                                     |
| `CI_JOB_URL`          | L'URL des détails du job.                                                                                     |
| `CI_JOB_ID`           | L'ID interne du job, unique parmi tous les jobs de l'instance GitLab.                               |
| `CI_RUNNER_ID`        | L'ID unique du runner utilisé.                                                                  |
| `CI_RUNNER_TAGS`      | Une liste séparée par des virgules des tags du runner.                                                              |
| `CI_REPOSITORY_URL`   | Le chemin complet pour cloner le dépôt via Git (HTTP) avec un jeton de job CI/CD.                                  |
| `CI_COMMIT_SHA`       | La révision du commit pour laquelle le projet est construit.                                                            |
| `CI_COMMIT_REF_NAME`  | Le nom de la branche ou du tag pour lequel le projet est construit.                                                        |
| `CI_COMMIT_BRANCH`    | Le nom de la branche du commit. Disponible dans les pipelines de branche.                                                   |
| `CI_COMMIT_TAG`       | Le nom du tag du commit. Disponible uniquement dans les pipelines pour les tags.                                               |
| `CI_COMMIT_AUTHOR`    | L'auteur du commit au format Nom <email>.                                                         |
| `CI_COMMIT_MESSAGE`   | Le message complet du commit.                                                                               |
| `CI_COMMIT_TIMESTAMP` | L'horodatage du commit au format ISO 8601. Par exemple, 2022-01-31T16:47:55Z. UTC par défaut.  |


Pour une liste complète des variables d'environnement définies par GitLab CI pour chaque build, consultez la [documentation officielle de GitLab][101].


[101]: https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
{{% /tab %}}
{{% tab "Jenkins" %}}

| Variable d'environnement              | Description                                                                                              |
|-----------------------|----------------------------------------------------------------------------------------------------------|
| `JENKINS_URL`         | L'URL du Jenkins master qui exécute la build.                                                 |
| `BUILD_TAG`           | Une chaîne de caractères sous la forme `jenkins-${JOB_NAME}-${BUILD_NUMBER}` pour une identification plus facile.                    |
| `BUILD_NUMBER`        | Le numéro de build actuel, tel que « 153 ».                                                                 |
| `BUILD_URL`           | L'URL où les résultats de cette build peuvent être trouvés (telle que http://buildserver/jenkins/job/MyJobName/666/).|
| `WORKSPACE`           | Le chemin absolu de l'espace de travail.                                                                       |
| `JOB_NAME`            | Le nom du projet pour cette build.                                                                  |
| `JOB_URL`             | L'URL des détails du job.                                                                            |
| `GIT_URL`             | L'URL Git utilisée pour le dépôt (telle que git@github.com:user/repo.git ou https://github.com/user/repo.git).|
| `GIT_URL_1`           | L'URL du premier dépôt Git si plusieurs dépôts sont configurés.                            |
| `GIT_COMMIT`          | Le hash Git du commit extrait pour la build.                                                    |
| `GIT_BRANCH`          | La branche Git qui a été extraite pour la build.                                                       |
| `NODE_NAME`           | Le nom du nœud sur lequel le build s'exécute. Égal à 'master' pour le nœud principal.                       |
| `NODE_LABELS`         | Une liste séparée par des virgules des labels assignés au nœud.                                                   |
| `DD_CUSTOM_TRACE_ID`  | Variable personnalisée définie par le plugin Jenkins Datadog pour les ID de trace.                                        |
| `DD_CUSTOM_PARENT_ID` | Variable personnalisée définie par le plugin Jenkins Datadog pour les ID parents.                                        |


Pour une liste complète des variables d'environnement définies par Jenkins pour chaque build, consultez la [documentation officielle de Jenkins][101].


[101]: https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
[102]: https://github.com/jenkinsci/datadog-plugin

{{% /tab %}}
{{% tab "TeamCity" %}}

| Variable d'environnement                     | Description                                                                                                  |
|------------------------------|--------------------------------------------------------------------------------------------------------------|
| `TEAMCITY_VERSION`           | La version du serveur TeamCity.                                                                        |
| `TEAMCITY_BUILDCONF_NAME`    | Le nom de la configuration de build à laquelle appartient la build actuelle.                                           |
| `BUILD_URL`                  | Le lien vers la build actuelle.                                                                             |
| `DATADOG_BUILD_ID`           | Variable personnalisée définie par l'[intégration Datadog TeamCity][102].                                             |

Pour une liste complète des variables d'environnement définies par TeamCity pour chaque build, consultez la [documentation officielle de TeamCity][101].


[101]: https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
[102]: https://plugins.jetbrains.com/plugin/20852-datadog-ci-integration

{{% /tab %}}
{{% tab "Travis CI" %}}

| Variable d'environnement                     | Description                                                                                           |
|------------------------------|-------------------------------------------------------------------------------------------------------|
| `TRAVIS`                     | Toujours défini sur `true` pour indiquer que la build s'exécute sur Travis CI.                              |
| `TRAVIS_BUILD_ID`            | L'ID du build actuel utilisé en interne par Travis CI.                                             |
| `TRAVIS_BUILD_NUMBER`        | Le numéro du build actuel. Par exemple : `4`.                                                    |
| `TRAVIS_BUILD_WEB_URL`       | L'URL vers le log du build.                                                                                 |
| `TRAVIS_BUILD_DIR`           | Le chemin absolu vers le répertoire où le dépôt en cours de build a été copié sur le worker.    |
| `TRAVIS_JOB_WEB_URL`         | L'URL vers le log du job.                                                                                   |
| `TRAVIS_REPO_SLUG`           | Le slug (sous la forme : `owner_name/repo_name`) du dépôt actuellement en cours de build.                   |
| `TRAVIS_COMMIT`              | Le commit que le build actuel teste.                                                         |
| `TRAVIS_BRANCH`              | Pour les builds de type push, le nom de la branche. Pour les builds de type PR, le nom de la branche ciblée par la PR.    |
| `TRAVIS_TAG`                 | Si le build actuel correspond à un tag Git, cette variable est définie sur le nom du tag, sinon elle est vide. |
| `TRAVIS_PULL_REQUEST_SLUG`   | Si le job actuel est une pull request, le slug du dépôt d'origine de la PR.        |
| `TRAVIS_PULL_REQUEST_BRANCH` | Si le job actuel est une pull request, le nom de la branche d'origine de la PR.            |
| `TRAVIS_COMMIT_MESSAGE`      | Le sujet et le corps du commit, non repliés.                                                               |



Pour une liste complète des variables d'environnement définies par Travis CI pour chaque build, consultez la [documentation officielle de Travis CI][101].


[101]: https://docs.travis-ci.com/user/environment-variables/#default-environment-variables

{{% /tab %}}
{{% tab "Buddy CI" %}}

| Variable d'environnement                                | Description                                                                                           |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------|
| `BUDDY`                                 | Indique si l'environnement actuel est un environnement Buddy. Par exemple : `true`.    |
| `BUDDY_SCM_URL`                         | L'URL du dépôt synchronisé avec le projet. Par exemple : `https://github.com/githubaccount/repository`. |
| `BUDDY_EXECUTION_REVISION`              | Le hash SHA1 du commit de l'exécution du pipeline actuel. Par exemple : `46c360492d6372e5335300776806af412755871`. |
| `BUDDY_EXECUTION_BRANCH`                | Le nom de la branche Git de l'exécution du pipeline actuel. Par exemple : `main`.             |
| `BUDDY_EXECUTION_TAG`                   | Le nom du tag Git de l'exécution du pipeline actuel (si tagué). Par exemple : `v1.0.1`.    |
| `BUDDY_PIPELINE_ID`                     | L'ID de l'exécution du pipeline. Par exemple : `1`.                                             |
| `BUDDY_EXECUTION_ID`                    | L'ID de l'exécution du pipeline actuel. Par exemple : `1`.                                     |
| `BUDDY_PIPELINE_NAME`                   | Le nom de l'exécution du pipeline. Par exemple : `Deploy to Production`.                        |
| `BUDDY_EXECUTION_URL`                   | L'URL de l'exécution du pipeline actuel. Par exemple : `https://app.buddy.works/my-workspace/my-project/pipelines/pipeline/1`. |
| `BUDDY_EXECUTION_REVISION_MESSAGE`      | Le message de commit de la révision en cours d'exécution. Par exemple : `we need to write unit tests!`. |
| `BUDDY_EXECUTION_REVISION_COMMITTER_NAME` | Le nom de l'auteur du commit de la révision en cours d'exécution. Par exemple : `Mike Benson`.      |
| `BUDDY_EXECUTION_REVISION_COMMITTER_EMAIL` | L'adresse électronique de l'auteur de la révision en cours d'exécution. Par exemple : `mike.benson@buddy.works`. |


</br>

Pour une liste complète des variables d'environnement définies par Buddy CI pour chaque build, consultez la [documentation officielle de Buddy CI][101].


[101]: https://buddy.works/docs/pipelines/environment-variables#default-environment-variables
{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/engine/reference/run/
[2]: https://docs.docker.com/compose/reference/
[3]: /fr/tests/#setup