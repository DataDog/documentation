---
title: Tests Swift
kind: documentation
further_reading:
  - link: /continuous_integration/explore_tests
    tag: Documentation
    text: Explorer les résultats de test et les performances
  - link: /continuous_integration/troubleshooting/
    tag: Documentation
    text: Dépannage de l'intégration continue
---
{{< site-region region="us,eu" >}}
## Compatibilité

Langages pris en charge :
* Swift >= 5.2
* Objective-C >= 2.0

Plateformes prises en charge :
* iOS >= 11.0
* macOS >= 10.13
* tvOS >= 11.0

## Installation du SDK de test Swift

Le framework de test peut être installé de deux façons :

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

1. Ajoutez le package `dd-sdk-swift-testing` à votre projet. Vous le trouverez sur [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Package Swift" >}}


2. Associez vos cibles de test avec la bibliothèque `DatadogSDKTesting` issue du package.

{{< img src="continuous_integration/swift_link2.png" alt="Associer SPM Swift" >}}

3. Si vous exécutez des tests d'interface utilisateur, associez également l'appli exécutant les tests avec cette bibliothèque.


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. Ajoutez la dépendance `DatadogSDKTesting` aux cibles de test de votre `Podfile` :

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

2. Si vous exécutez des tests d'interface utilisateur, ajoutez également la dépendance à l'application exécutant les tests.

{{% /tab %}}
{{% tab "Association du framework" %}}

1. Téléchargez et décompressez `DatadogSDKTesting.zip` depuis la page [Releases][1].

2. Copiez et associez vos cibles de test avec le XCFramework obtenu.

{{< img src="continuous_integration/swift_link.png" alt="Associer XCFramework Swift" >}}

3. Si vous exécutez des tests d'interface utilisateur, associez également l'appli exécutant les tests avec cette bibliothèque.

<div class="alert alert-warning"><strong>Remarque </strong>: ce framework est uniquement destiné à des fins de test et ne doit être associé à l'application que lorsque vous exécutez des tests. Ne distribuez pas le framework à vos utilisateurs. </div>


[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}


## Instrumenter vos tests

### Configuration de Datadog

Pour activer l'instrumentation de tests, ajoutez les variables d'environnement suivantes à votre cible de test (ou dans le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)). Vous devrez également sélectionner votre cible principale dans `Expand variables based on` ou `Target for Variable Expansion` si vous utilisez des plans de test :

{{< img src="continuous_integration/swift_env.png" alt="Environnements Swift" >}}

Pour les tests d'interface utilisateur, les variables d'environnement doivent être configurées uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

Définissez toutes ces variables dans votre cible de test :

`DD_TEST_RUNNER`
: Active ou désactive l'instrumentation des tests. Définissez cette valeur sur `$(DD_TEST_RUNNER)` pour pouvoir activer et désactiver l'instrumentation des tests avec une variable d'environnement définie en dehors du processus de test (par exemple, dans le build d'intégration continue).<br/>
**Valeur par défaut** : `false`<br/>
**Valeur recommandée** : `$(DD_TEST_RUNNER)`<br/>
**Exemple** : `true`

`DATADOG_CLIENT_TOKEN`
: Le [token client Datadog][1] à utiliser pour transmettre les résultats de test.<br/>
**Valeur par défaut** : `(vide)`<br/>
**Exemple** : `pub0zxxxyyyxxxyyxxxzzxxyyxxxyyy`

`DD_SERVICE`
: Nom du service ou de la bibliothèque à tester.<br/>
**Valeur par défaut** : Le nom du répertoire<br/>
**Exemple** : `my-ios-app`

`DD_ENV`
: Nom de l'environnement dans lequel les tests sont exécutés. Définissez cette valeur sur `$(DD_ENV)` afin de pouvoir le configurer via une variable d'environnement au moment de l'exécution.<br/>
**Valeur par défaut** : `none`<br/>
**Valeur recommandée** : `$(DD_ENV)`<br/>
**Exemples** : `ci`, `local`

`SRCROOT`
: Le chemin vers la variable d'environnement SRCROOT du projet. Utilisez `$(SRCROOT)` comme valeur, car elle est automatiquement définie par Xcode.<br/>
**Valeur par défaut** : `(vide)`<br/>
**Valeur recommandée** : `$(SRCROOT)`<br/>
**Exemple** : `/Users/ci/source/MyApp`

{{< site-region region="eu" >}}
En outre, configurez le site Datadog pour utiliser celui que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) :

`DD_SITE` (Required)
: Le [site Datadog][1] vers lequel télécharger les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}

[1]: /fr/getting_started/site/
{{< /site-region >}}

### Collecte des métadonnées Git et des données de build

Les métadonnées Git et les données de build sont collectées automatiquement en utilisant les variables d'environnement du fournisseur de CI, qui doivent être transférées à l'application de test (voir la section [Variables d'environnement du fournisseur de CI](#variables-d-environnement-du-fournisseur-de-ci) ci-dessous pour la liste complète).

Lorsque les tests sont exécutés dans un simulateur, les métadonnées Git complètes sont collectées en utilisant le dossier local `.git`. Dans ce cas, les variables d'environnement relatives à Git n'ont pas besoin d'être transférées.

L'utilisateur peut également fournir les informations Git en utilisant des variables d'environnement personnalisées (ou en les ajoutant dans le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)). Cette méthode est notamment utile lorsque le fournisseur de CI n'est pas pris en charge, ou lorsque le dossier .git n'est pas disponible pour le processus en cours d'exécution. Les variables d'environnement personnalisées sont également utiles pour écraser des informations Git existantes. Lorsqu'elles sont définies, elles prennent l'ascendant sur celles venant du CI ou du dossier .git. Les variables d'environnement prises en charge pour les informations Git comprennent :

`DD_GIT_REPOSITORY_URL`
: URL du répertoire où le code est stocké.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche à laquelle le commit appartient.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag du commit, s'il en a un.<br/>
**Exemple** : `1.0.1`

`DD_GIT_COMMIT_SHA`
: SHA du commit.<br/>
**Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Message de commit.<br/>
**Exemple** : `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Nom de l'auteur.<br/>
**Exemple** : `John Doe`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: E-mail de l'auteur.<br/>
**Exemple** : `john@doe.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Doe`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@doe.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

### Exécution des tests

Après l'installation, exécutez vos tests comme vous le faites habituellement, par exemple en utilisant la commande `xcodebuild test`. Les tests, requêtes réseau et logs d'application sont instrumentés automatiquement. Passez vos variables d'environnement en exécutant vos tests dans le CI, par exemple :

{{< site-region region="us" >}}
{{< code-block lang="bash" >}}
DD_TEST_RUNNER=1 DD_ENV=ci xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
{{< /code-block >}}
{{< /site-region >}}
{{< site-region region="eu" >}}
{{< code-block lang="bash" >}}
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE=datadoghq.eu xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
{{< /code-block >}}
{{< /site-region >}}

### Tests d'interface utilisateur

Pour les tests d'interface utilisateur, la cible de test et l'application exécutée doivent toutes les deux être associées au framework. Les variables d'environnement doivent être définies uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

## Configuration supplémentaire facultative

Pour les paramètres de configuration suivants :
 - Les variables de type `booléen` peuvent utiliser l'une des valeurs suivantes : `1`, `0`, `true`, `false`, `YES` ou `NO`
 - Les variables de type `liste de chaînes` acceptent une liste d'éléments séparés par `,` ou `;`

### Désactivation de l'instrumentation automatique

Le framework active l'instrumentation automatique de toutes les bibliothèques prises en charge, mais ce comportement n'est pas toujours souhaitable. Vous pouvez désactiver l'instrumentation automatique de certaines bibliothèques en définissant les variables d'environnement suivantes (ou en utilisant le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)) :

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Désactive toute l'instrumentation du réseau (Booléen)

`DD_DISABLE_STDOUT_INSTRUMENTATION`
: Désactive toute l'instrumentation de `stdout` (Booléen)

`DD_DISABLE_STDERR_INSTRUMENTATION`
: Désactive toute l'instrumentation de `stderr` (Booléen)

`DD_DISABLE_SDKIOS_INTEGRATION`
: Désactive l'intégration avec les logs et les traces `dd-sdk-ios` (Booléen)

`DD_DISABLE_CRASH_HANDLER`
: Désactive la gestion des plantages et les rapports associés. (Booléen)
<div class="alert alert-warning"><strong>Important</strong> : Si vous désactivez les rapports de plantage, aucune information ne sera transmise pour les tests concernés et aucun échec ne sera signalé. Si vous avez besoin de désactiver les rapports de plantage pour certains de vos tests, utilisez une cible séparée afin de ne pas les désactiver pour l'ensemble des tests.</div>

### Instrumentation automatique du réseau

Des paramètres supplémentaires peuvent être configurés pour l'instrumentation automatique du réseau :

`DD_DISABLE_HEADERS_INJECTION`
: Désactive l'injection des en-têtes de tracing (Booléen)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: Les en-têtes supplémentaires à loguer (Liste de chaînes)

`DD_EXCLUDED_URLS`
: Les URL pour lesquelles vous ne voulez pas loguer ou injecter les en-têtes (Liste de chaînes)

`DD_ENABLE_RECORD_PAYLOAD`
: Active l'envoi d'une portion (1024 octets) des charges utiles dans les requêtes et les réponses (Booléen)

`DD_MAX_PAYLOAD_SIZE`
: Définit le volume maximal de la charge utile transmis. Valeur par défaut : `1024` (Entier)

Vous pouvez également activer ou désactiver des instrumentations automatiques spécifiques pour certains tests depuis votre code Swift ou Objective-C en important le module `DatadogSDKTesting` et en utilisant la classe : `DDInstrumentationControl`.

## Tags personnalisés

### Variables d'environnement

Vous pouvez utiliser la variable d'environnement `DD_TAGS` (ou le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)). Elle doit contenir des paires `key:tag` séparées par des espaces. Par exemple :
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

Si l'une des valeurs commence par le caractère `$`, elle est remplacée par la variable d'environnement du même nom (si elle existe). Par exemple :
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

L'utilisation du caractère `$` permet également de remplacer une variable d'environnement au début d'une valeur si elle contient des caractères non pris en charge par les variables d'environnement (`a-z`, `A-Z` ou `_`). Par exemple :
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### OpenTelemetry

**Remarque** : l'utilisation d'OpenTelemetry est uniquement prise en charge pour Swift.

Le framework de test Swift de Datadog utilise [OpenTelemetry][2] comme technologie de tracing. Vous pouvez accéder au traceur OpenTelemetry avec `DDInstrumentationControl.openTelemetryTracer` puis utiliser n'importe quelle API OpenTelemetry. Par exemple, pour ajouter un tag ou un attribut :

{{< code-block lang="swift" >}}
let tracer = DDInstrumentationControl.openTelemetryTracer
tracer?.activeSpan?.setAttribute(key: "OTelTag", value: "OTelValue")
{{< /code-block >}}

La cible de test doit être explicitement associée à `opentelemetry-swift`.


## Utiliser le fichier Info.plist pour la configuration

Au lieu de définir des variables d'environnement, il est possible de spécifier les valeurs de configuration en les ajoutant au fichier `Info.plist` du bundle de test (et non du bundle de l'application). Si le même paramètre est défini à la fois dans une variable d'environnement et dans le fichier `Info.plist`, la variable d'environnement prend l'ascendant.

## Variables d'environnement du fournisseur de CI

{{< tabs >}}
{{% tab "Jenkins" %}}

| Variable d'environnement | Valeur             |
| -------------------- | ----------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`  |
| `WORKSPACE`          | `$(WORKSPACE)`    |
| `BUILD_TAG`          | `$(BUILD_TAG)`    |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)` |
| `BUILD_URL`          | `$(BUILD_URL)`    |
| `JOB_NAME`           | `$(JOB_NAME)`     |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement | Valeur           |
| -------------------- | --------------- |
| `GIT_COMMIT`         | `$(GIT_COMMIT)` |
| `GIT_URL`            | `$(GIT_URL)`    |
| `GIT_URL_1`          | `$(GIT_URL_1)`  |
| `GIT_BRANCH`         | `$(GIT_BRANCH)` |

{{% /tab %}}
{{% tab "CircleCI" %}}

| Variable d'environnement       | Valeur                         |
| -------------------------- | ----------------------------- |
| `CIRCLECI`                 | `$(CIRCLECI)`                 |
| `CIRCLE_WORKING_DIRECTORY` | `$(CIRCLE_WORKING_DIRECTORY)` |
| `CIRCLE_BUILD_NUM`         | `$(CIRCLE_BUILD_NUM)`         |
| `CIRCLE_BUILD_URL`         | `$(CIRCLE_BUILD_URL)`         |
| `CIRCLE_WORKFLOW_ID`       | `$(CIRCLE_WORKFLOW_ID)`       |
| `CIRCLE_PROJECT_REPONAME`  | `$(CIRCLE_PROJECT_REPONAME)`  |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement    | Valeur                      |
| ----------------------- | -------------------------- |
| `CIRCLE_SHA1`           | `$(CIRCLE_SHA1)`           |
| `CIRCLE_REPOSITORY_URL` | `$(CIRCLE_REPOSITORY_URL)` |
| `CIRCLE_BRANCH`         | `$(CIRCLE_BRANCH)`         |
| `CIRCLE_TAG`            | `$(CIRCLE_TAG)`            |

{{% /tab %}}
{{% tab "GitLab CI" %}}

| Variable d'environnement | Valeur                |
| -------------------- | -------------------- |
| `GITLAB_CI`          | `$(GITLAB_CI)`       |
| `CI_PROJECT_DIR`     | `$(CI_PROJECT_DIR)`  |
| `CI_JOB_STAGE`       | `$(CI_JOB_STAGE)`    |
| `CI_JOB_NAME`        | `$(CI_JOB_NAME)`     |
| `CI_JOB_URL`         | `$(CI_JOB_URL)`      |
| `CI_PIPELINE_ID`     | `$(CI_PIPELINE_ID)`  |
| `CI_PIPELINE_IID`    | `$(CI_PIPELINE_IID)` |
| `CI_PIPELINE_URL`    | `$(CI_PIPELINE_URL)` |
| `CI_PROJECT_PATH`    | `$(CI_PROJECT_PATH)` |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement | Valeur                  |
| -------------------- | ---------------------- |
| `CI_COMMIT_SHA`      | `$(CI_COMMIT_SHA)`     |
| `CI_REPOSITORY_URL`  | `$(CI_REPOSITORY_URL)` |
| `CI_COMMIT_BRANCH`   | `$(CI_COMMIT_BRANCH)`  |
| `CI_COMMIT_TAG`      | `$(CI_COMMIT_TAG)`     |
| `CI_COMMIT_MESSAGE`  | `$(CI_COMMIT_MESSAGE)` |
| `CI_COMMIT_AUTHOR`  | `$(CI_COMMIT_AUTHOR)` |
| `CI_COMMIT_TIMESTAMP`  | `$(CI_COMMIT_TIMESTAMP)` |

{{% /tab %}}
{{% tab "Travis" %}}

| Variable d'environnement       | Valeur                         |
| -------------------------- | ----------------------------- |
| `TRAVIS`                   | `$(TRAVIS)`                   |
| `TRAVIS_BUILD_DIR`         | `$(TRAVIS_BUILD_DIR)`         |
| `TRAVIS_BUILD_ID`          | `$(TRAVIS_BUILD_ID)`          |
| `TRAVIS_BUILD_NUMBER`      | `$(TRAVIS_BUILD_NUMBER)`      |
| `TRAVIS_BUILD_WEB_URL`     | `$(TRAVIS_BUILD_WEB_URL)`     |
| `TRAVIS_JOB_WEB_URL`       | `$(TRAVIS_JOB_WEB_URL)`       |
| `TRAVIS_REPO_SLUG`         | `$(TRAVIS_REPO_SLUG)`         |
| `TRAVIS_PULL_REQUEST_SLUG` | `$(TRAVIS_PULL_REQUEST_SLUG)` |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement         | Valeur                           |
| ---------------------------- | ------------------------------- |
| `TRAVIS_PULL_REQUEST_BRANCH` | `$(TRAVIS_PULL_REQUEST_BRANCH)` |
| `TRAVIS_BRANCH`              | `$(TRAVIS_BRANCH)`              |
| `TRAVIS_COMMIT`              | `$(TRAVIS_COMMIT)`              |
| `TRAVIS_TAG`                 | `$(TRAVIS_TAG)`                 |
| `TRAVIS_COMMIT_MESSAGE`      | `$(TRAVIS_COMMIT_MESSAGE)`      |

{{% /tab %}}
{{% tab "Actions GitHub" %}}

| Variable d'environnement | Valeur                  |
| -------------------- | ---------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`  |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`     |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)` |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`   |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`        |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement | Valeur                  |
| -------------------- | ---------------------- |
| `GITHUB_REF`         | `$(GITHUB_REF)`        |
| `GITHUB_HEAD_REF`    | `$(GITHUB_HEAD_REF)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)` |

{{% /tab %}}
{{% tab "Buildkite" %}}

| Variable d'environnement            | Valeur                              |
| ------------------------------- | ---------------------------------- |
| `BUILDKITE`                     | `$(BUILDKITE)`                     |
| `BUILDKITE_BUILD_CHECKOUT_PATH` | `$(BUILDKITE_BUILD_CHECKOUT_PATH)` |
| `BUILDKITE_BUILD_ID`            | `$(BUILDKITE_BUILD_ID)`            |
| `BUILDKITE_BUILD_NUMBER`        | `$(BUILDKITE_BUILD_NUMBER)`        |
| `BUILDKITE_BUILD_URL`           | `$(BUILDKITE_BUILD_URL)`           |
| `BUILDKITE_PIPELINE_SLUG`       | `$(BUILDKITE_PIPELINE_SLUG)`       |
| `BUILDKITE_JOB_ID`              | `$(BUILDKITE_JOB_ID)`              |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement           | Valeur                             |
| ------------------------------ | --------------------------------- |
| `BUILDKITE_COMMIT`             | `$(BUILDKITE_COMMIT)`             |
| `BUILDKITE_REPO`               | `$(BUILDKITE_REPO)`               |
| `BUILDKITE_BRANCH`             | `$(BUILDKITE_BRANCH)`             |
| `BUILDKITE_TAG`                | `$(BUILDKITE_TAG)`                |
| `BUILDKITE_MESSAGE`            | `$(BUILDKITE_MESSAGE)`            |
| `BUILDKITE_BUILD_AUTHOR`       | `$(BUILDKITE_BUILD_AUTHOR)`       |
| `BUILDKITE_BUILD_AUTHOR_EMAIL` | `$(BUILDKITE_BUILD_AUTHOR_EMAIL)` |

{{% /tab %}}
{{% tab "Bitbucket Pipelines" %}}

| Variable d'environnement       | Valeur                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement       | Valeur                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_COMMIT`         | `$(BITBUCKET_COMMIT)`         |
| `BITBUCKET_GIT_SSH_ORIGIN` | `$(BITBUCKET_GIT_SSH_ORIGIN)` |
| `BITBUCKET_BRANCH`         | `$(BITBUCKET_BRANCH)`         |
| `BITBUCKET_TAG`            | `$(BITBUCKET_TAG)`            |

{{% /tab %}}
{{% tab "AppVeyor" %}}

| Variable d'environnement     | Valeur                       |
| ------------------------ | --------------------------- |
| `APPVEYOR`               | `$(APPVEYOR)`               |
| `APPVEYOR_BUILD_FOLDER`  | `$(APPVEYOR_BUILD_FOLDER)`  |
| `APPVEYOR_BUILD_ID`      | `$(APPVEYOR_BUILD_ID)`      |
| `APPVEYOR_BUILD_NUMBER`  | `$(APPVEYOR_BUILD_NUMBER)`  |
| `APPVEYOR_REPO_TAG_NAME` | `$(APPVEYOR_REPO_TAG_NAME)` |
| `APPVEYOR_REPO_NAME`     | `$(APPVEYOR_REPO_NAME)`     |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement                     | Valeur                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

| Variable d'environnement             | Valeur                               |
| -------------------------------- | ----------------------------------- |
| `TF_BUILD`                       | `$(TF_BUILD)`                       |
| `BUILD_SOURCESDIRECTORY`         | `$(BUILD_SOURCESDIRECTORY)`         |
| `BUILD_BUILDID`                  | `$(BUILD_BUILDID)`                  |
| `BUILD_DEFINITIONNAME`           | `$(BUILD_DEFINITIONNAME)`           |
| `SYSTEM_TEAMPROJECTID`           | `$(SYSTEM_TEAMPROJECTID)`           |
| `SYSTEM_TEAMFOUNDATIONSERVERURI` | `$(SYSTEM_TEAMFOUNDATIONSERVERURI)` |
| `SYSTEM_JOBID`                   | `$(SYSTEM_JOBID)`                   |
| `SYSTEM_TASKINSTANCEID`          | `$(SYSTEM_TASKINSTANCEID)`          |
| `SYSTEM_JOBDISPLAYNAME`          | `$(SYSTEM_JOBDISPLAYNAME)`          |
| `SYSTEM_STAGEDISPLAYNAME`          | `$(SYSTEM_STAGEDISPLAYNAME)`          |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement                     | Valeur                                       |
| ---------------------------------------- | ------------------------------------------- |
| `BUILD_SOURCEVERSION`                    | `$(BUILD_SOURCEVERSION)`                    |
| `BUILD_REPOSITORY_URI`                   | `$(BUILD_REPOSITORY_URI)`                   |
| `BUILD_SOURCEBRANCH`                     | `$(BUILD_SOURCEBRANCH)`                     |
| `SYSTEM_PULLREQUEST_SOURCECOMMITID`      | `$(SYSTEM_PULLREQUEST_SOURCECOMMITID)`      |
| `SYSTEM_PULLREQUEST_SOURCEBRANCH`        | `$(SYSTEM_PULLREQUEST_SOURCEBRANCH)`        |
| `SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI` | `$(SYSTEM_PULLREQUEST_SOURCEREPOSITORYURI)` |
| `BUILD_SOURCEVERSIONMESSAGE`             | `$(BUILD_SOURCEVERSIONMESSAGE)`             |
| `BUILD_REQUESTEDFORID`                   | `$(BUILD_REQUESTEDFORID)`                   |
| `BUILD_REQUESTEDFOREMAIL`                | `$(BUILD_REQUESTEDFOREMAIL)`                |

{{% /tab %}}
{{% tab "Bitrise" %}}

| Variable d'environnement   | Valeur                     |
| ---------------------- | ------------------------- |
| `BITRISE_SOURCE_DIR`   | `$(BITRISE_SOURCE_DIR)`   |
| `BITRISE_TRIGGERED_WORKFLOW_ID`  | `$(BITRISE_TRIGGERED_WORKFLOW_ID)`  |
| `BITRISE_BUILD_SLUG`   | `$(BITRISE_BUILD_SLUG)`   |
| `BITRISE_BUILD_NUMBER` | `$(BITRISE_BUILD_NUMBER)` |
| `BITRISE_BUILD_URL`    | `$(BITRISE_BUILD_URL)`    |

Configuration Git supplémentaire pour le test d'appareils physiques :

| Variable d'environnement               | Valeur                                 |
| ---------------------------------- | ------------------------------------- |
| `GIT_REPOSITORY_URL`               | `$(GIT_REPOSITORY_URL)`               |
| `BITRISE_GIT_COMMIT`               | `$(BITRISE_GIT_COMMIT)`               |
| `BITRISE_GIT_BRANCH`               | `$(BITRISE_GIT_BRANCH)`               |
| `BITRISE_GIT_TAG`                  | `$(BITRISE_GIT_TAG)`                  |
| `GIT_CLONE_COMMIT_HASH`            | `$(GIT_CLONE_COMMIT_HASH)`            |
| `BITRISE_GIT_MESSAGE`              | `$(BITRISE_GIT_MESSAGE)`              |
| `GIT_CLONE_COMMIT_MESSAGE_SUBJECT` | `$(GIT_CLONE_COMMIT_MESSAGE_SUBJECT)` |
| `GIT_CLONE_COMMIT_MESSAGE_BODY`    | `$(GIT_CLONE_COMMIT_MESSAGE_BODY)`    |
| `GIT_CLONE_COMMIT_AUTHOR_NAME`     | `$(GIT_CLONE_COMMIT_AUTHOR_NAME)`     |
| `GIT_CLONE_COMMIT_AUTHOR_EMAIL`    | `$(GIT_CLONE_COMMIT_AUTHOR_EMAIL)`    |
| `GIT_CLONE_COMMIT_COMMITER_NAME`   | `$(GIT_CLONE_COMMIT_COMMITER_NAME)`   |
| `GIT_CLONE_COMMIT_COMMITER_EMAIL`  | `$(GIT_CLONE_COMMIT_COMMITER_EMAIL)`  |

{{% /tab %}}
{{< /tabs >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/client-tokens

{{< /site-region >}}
{{< site-region region="us3,gov" >}}
Le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) n'est actuellement pas pris en charge.
{{< /site-region >}}