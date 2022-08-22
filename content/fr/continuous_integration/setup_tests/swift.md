---
further_reading:
- link: /continuous_integration/explore_tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de l'intégration continue
kind: documentation
title: Tests Swift
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
Le site Datadog que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) n'est pas pris en charge.
</div>
{{< /site-region >}}

## Compatibilité

Langages pris en charge :
* Swift 5.2+
* Objective-C 2.0+

Plateformes prises en charge :
* iOS 11.0+
* macOS 10.13+
* tvOS 11.0+

**Remarque** : si vous vous servez des capacités de simultanéité de Swift, vous devez utiliser Xcode 13.2+ pour représenter de façon précise les spans des tâches asynchrones.

## Installer le SDK de test Swift

Vous pouvez installer le framework de trois façons différentes :

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

1. Ajoutez le package `dd-sdk-swift-testing` à votre projet, disponible sur le site [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Package Swift" >}}


2. Liez vos cibles de test à la bibliothèque `DatadogSDKTesting` du package.

{{< img src="continuous_integration/swift_link2.png" alt="Liaison SPM Swift" >}}

3. Si vous exécutez des tests d'interface utilisateur, liez également l'application exécutant les tests à cette bibliothèque.


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
{{% tab "Liaison de framework" %}}

1. Téléchargez le fichier `DatadogSDKTesting.zip` depuis la page [Releases][1] et décompressez-le.

2. Copiez et liez vos cibles de test avec le XCFramework obtenu.

{{< img src="continuous_integration/swift_link.png" alt="Liaison XCFramework Swift" >}}

3. Si vous exécutez des tests d'interface utilisateur, liez également l'application exécutant les tests à cette bibliothèque.

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}
<div class="alert alert-warning"><strong>Remarque</strong> : ce framework sert uniquement à effectuer des tests, et doit uniquement être lié à l'application lors de l'exécution de tests. Ne transmettez pas ce framework à vos utilisateurs. </div>


## Instrumenter vos tests

### Configuration de Datadog

Pour activer l'instrumentation de tests, ajoutez les variables d'environnement suivantes à votre cible de test (ou dans le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)). Vous devrez également sélectionner votre cible principale dans `Expand variables based on` ou `Target for Variable Expansion` si vous utilisez des plans de test :

{{< img src="continuous_integration/swift_env.png" alt="Environnements Swift" >}}

Pour les tests d'interface utilisateur, les variables d'environnement doivent être configurées uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

Définissez toutes ces variables dans votre cible de test :

`DD_TEST_RUNNER`
: Active ou désactive l'instrumentation des tests. Définissez cette valeur sur `$(DD_TEST_RUNNER)` pour pouvoir activer et désactiver l'instrumentation des tests avec une variable d'environnement définie en dehors du processus de test (par exemple, dans le build d'intégration continue).<br/>
**Valeur par défaut** : `false`<br/>
**Valeur recommandée** : `$(DD_TEST_RUNNER)`

`DD_API_KEY`
: La [clé d'API Datadog][1] utilisée pour importer les résultats de test.<br/>
**Valeur par défaut**: `(vide)`

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

En outre, configurez le site Datadog de façon à utiliser celui que vous avez sélectionné ({{< region-param key="dd_site_name" >}}) :

`DD_SITE` (requis)
: Le [site Datadog][2] vers lequel importer les résultats.<br/>
**Valeur par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}

### Recueillir les métadonnées Git

Datadog tire profit des données Git pour vous présenter les résultats de vos tests et les regrouper par référentiel, branche et commit. Les métadonnées Git sont automatiquement recueillies à l'aide des variables d'environnement du fournisseur de CI, qui doivent être transmises à l'application de test (voir la rubrique [Variables d'environnement du fournisseur de CI](#variables-d-environnement-du-fournisseur-de-ci) ci-dessous pour obtenir la liste complète des variables d'environnement).

Lorsque les tests sont exécutés dans un simulateur, les métadonnées Git complètes sont collectées en utilisant le dossier local `.git`. Dans ce cas, les variables d'environnement relatives à Git n'ont pas besoin d'être transférées.

Si vous exécutez des tests pour des fournisseurs de CI non pris en charge, ou sans dossier `.git`, vous pouvez configurer manuellement les données Git à l'aide de variables d'environnement. Ces dernières sont prioritaires et remplacent les informations détectées automatiquement. Configurez les variables d'environnement suivantes pour obtenir des données Git :

`DD_GIT_REPOSITORY_URL`
: URL du référentiel dans lequel le code est stocké. Les URL HTTP et SSH sont prises en charge.<br/>
**Exemple** : `git@github.com:MyCompany/MyApp.git`

`DD_GIT_BRANCH`
: Branche Git concernée par les tests. Ne renseignez pas cette variable si vous fournissez à la place des informations sur les tags.<br/>
**Exemple** : `develop`

`DD_GIT_TAG`
: Tag Git concerné par les tests (le cas échéant). Ne renseignez pas cette variable si vous fournissez à la place des informations sur la branche.<br/>
**Exemple** : `1.0.1`

`DD_GIT_COMMIT_SHA`
: Hash entier du commit.<br/>
**Exemple** : `a18ebf361cc831f5535e58ec4fae04ffd98d8152`

`DD_GIT_COMMIT_MESSAGE`
: Message du commit.<br/>
**Exemple** : `Set release number`

`DD_GIT_COMMIT_AUTHOR_NAME`
: Nom de l'auteur du commit.<br/>
**Exemple** : `John Smith`

`DD_GIT_COMMIT_AUTHOR_EMAIL`
: E-mail de l'auteur du commit.<br/>
**Exemple** : `john@example.com`

`DD_GIT_COMMIT_AUTHOR_DATE`
: Date de l'auteur du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

`DD_GIT_COMMIT_COMMITTER_NAME`
: Nom du responsable du commit.<br/>
**Exemple** : `Jane Smith`

`DD_GIT_COMMIT_COMMITTER_EMAIL`
: E-mail du responsable du commit.<br/>
**Exemple** : `jane@example.com`

`DD_GIT_COMMIT_COMMITTER_DATE`
: Date du responsable du commit, au format ISO 8601.<br/>
**Exemple** : `2021-03-12T16:00:28Z`

### Exécution des tests

Après l'installation, exécutez vos tests comme vous le faites habituellement, par exemple avec la commande `xcodebuild test`. Les tests, requêtes réseau et crashs d'application sont instrumentés automatiquement. Passez vos variables d'environnement en exécutant vos tests dans l'environnement de CI. Exemple :

<pre>
<code>
DD_TEST_RUNNER=1 DD_ENV=ci DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=x86_64" \
  test
</code>
</pre>

### Tests d'interface utilisateur

Pour les tests d'interface utilisateur, la cible de test et l'application exécutée doivent toutes les deux être associées au framework. Les variables d'environnement doivent être définies uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

### Intégration RUM

Si l'application testée est instrumentée avec RUM, les résultats de vos tests d'interface utilisateur et les sessions RUM qui ont été générées sont automatiquement associés. Pour en savoir plus sur la solution RUM, consultez le guide sur l'[intégration RUM pour iOS][3]. La version 1.10+ de RUM pour iOS est requise.


## Configuration supplémentaire facultative

Pour les paramètres de configuration suivants :
 - Les variables de type `booléen` peuvent utiliser l'une des valeurs suivantes : `1`, `0`, `true`, `false`, `YES` ou `NO`
 - Les variables de type `liste de chaînes` acceptent une liste d'éléments séparés par `,` ou `;`

### Activer l'instrumentation automatique

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: Récupère les messages écrits dans `stdout` (par exemple, `print()`) et les transmet sous forme de logs. Cette option peut avoir une incidence sur vos coûts. Valeur booléenne.

`DD_ENABLE_STDERR_INSTRUMENTATION`
: Récupère les messages écrits dans `stderr` (par exemple, `NSLog()` ou les étapes de test d'interface utilisateur) et les transmet sous forme de logs. Cette option peut avoir une incidence sur vos coûts. Valeur booléenne.

### Désactivation de l'instrumentation automatique

Le framework active l'instrumentation automatique de toutes les bibliothèques prises en charge, mais ce comportement n'est pas toujours souhaitable. Vous pouvez désactiver l'instrumentation automatique de certaines bibliothèques en définissant les variables d'environnement suivantes (ou en utilisant le fichier `Info.plist` comme [décrit ci-dessous](#utiliser-le-fichier-infoplist-pour-la-configuration)) :

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Désactive toute l'instrumentation du réseau. Valeur booléenne.

`DD_DISABLE_RUM_INTEGRATION`
: Désactive l'intégration avec des sessions RUM. Valeur booléenne.

`DD_DISABLE_CRASH_HANDLER`
: Désactive la gestion des crashs et les rapports associés. Valeur booléenne.
<div class="alert alert-warning"><strong>Important</strong> : Si vous désactivez les rapports de crash, aucune information ne sera transmise pour les tests concernés et aucun échec ne sera signalé. Si vous avez besoin de désactiver les rapports de crash pour certains de vos tests, utilisez une cible séparée afin de ne pas les désactiver pour l'ensemble des tests.</div>

### Instrumentation automatique du réseau

Des paramètres supplémentaires peuvent être configurés pour l'instrumentation automatique du réseau :

`DD_DISABLE_HEADERS_INJECTION`
: Désactive l'injection des en-têtes de tracing. Valeur booléenne.

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: Les en-têtes supplémentaires à loguer. Liste de chaînes.

`DD_EXCLUDED_URLS`
: Les URL pour lesquelles vous ne voulez pas loguer ou injecter les en-têtes. Liste de chaînes.

`DD_ENABLE_RECORD_PAYLOAD`
: Active l'envoi d'une portion (1 024 octets) des charges utiles dans les requêtes et les réponses. Valeur booléenne.

`DD_MAX_PAYLOAD_SIZE`
: Définit le volume maximal de la charge utile transmis. Valeur par défaut : `1024`. Nombre entier.

`DD_DISABLE_NETWORK_CALL_STACK`
: Masque les informations sur la call stack dans les spans réseau. Valeur booléenne.

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: Affiche les informations sur la call stack, avec notamment le nom de la méthode, mais également des données précises sur les fichiers et lignes concernés. Cette option peut avoir une incidence sur les performances de vos tests. Valeur booléenne.


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

Le framework de test Swift de Datadog utilise la technologie de tracing [OpenTelemetry][4]. Vous pouvez accéder au traceur OpenTelemetry avec `DDInstrumentationControl.openTelemetryTracer`, puis utiliser n'importe quelle API OpenTelemetry. Par exemple, pour ajouter un tag ou un attribut :

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
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
{{% tab "GitHub Actions" %}}

| Variable d'environnement | Valeur                   |
| -------------------- | ----------------------- |
| `GITHUB_WORKSPACE`   | `$(GITHUB_WORKSPACE)`   |
| `GITHUB_REPOSITORY`  | `$(GITHUB_REPOSITORY)`  |
| `GITHUB_RUN_ID`      | `$(GITHUB_RUN_ID)`      |
| `GITHUB_RUN_NUMBER`  | `$(GITHUB_RUN_NUMBER)`  |
| `GITHUB_WORKFLOW`    | `$(GITHUB_WORKFLOW)`    |
| `GITHUB_SHA`         | `$(GITHUB_SHA)`         |
| `GITHUB_SERVER_URL`  | `$(GITHUB_SERVER_URL)`  |
| `GITHUB_RUN_ATTEMPT` | `$(GITHUB_RUN_ATTEMPT)` |

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

## API de test manuel

Si vous utilisez des XCTests pour vos projets Swift, le framework `DatadogSDKTesting` les instrumente automatiquement et envoie les résultats au backend Datadog. Si vous n'utilisez pas de XCTest, vous pouvez utiliser à la place l'API de test manuel Swift/Objective-C, qui transmet les résultats de test au backend.

L'API repose sur trois concepts, à savoir les *sessions de test*, les *collections de tests* et les *tests*.

### Sessions de test

Une session de test englobe tout le processus d'exécution des tests, du lancement des tests par l'utilisateur à la transmission des résultats du dernier test. Les sessions comprennent également le lancement de l'environnement et du processus dans lesquels s'exécutent les tests.

Pour commencer une session de test, appelez `DDTestSession.start()` et passez le nom du module ou du bundle à tester.

Une fois tous vos tests terminés, appelez `session.end()` afin de forcer la bibliothèque à envoyer tous les résultats de test restants au backend.

### Collections de tests

Une collection de tests correspond à un ensemble de tests qui partagent des caractéristiques communes, comme le processus d'initialisation et de nettoyage. Certaines variables peuvent également être utilisées par plusieurs tests d'une collection.

Pour créer des collections de tests lors d'une session de test, appelez `session.suiteStart()` et passez le nom de la collection de tests.

Appelez `suite.end()` lorsque l'exécution de tous les tests d'une collection est terminée.

### Tests

Chaque test est exécuté au sein d'une collection. À la fin de son exécution, un test doit posséder l'un des trois statuts suivants : `pass`, `fail` ou `skip`. Un test peut également inclure des données supplémentaires, comme des attributs ou des informations sur les erreurs.

Pour créer des tests dans une collection, appelez `suite.testStart()` et passez le nom du test. Lorsqu'un test se termine, il doit posséder l'un des statuts prédéfinis.

### Interface de l'API

{{< code-block lang="swift" >}}
class DDTestSession {
    // Début de la session.
    // - Paramètres :
    //   - bundleName : nom du module ou du bundle à tester.
    //   - startTime : facultatif. L'heure de début de la session.
    static func start(bundleName: String, startTime: Date? = nil) -> DDTestSession
    //
    // Fin de la session.
    // - Paramètres :
    //   - endTime : facultatif. L'heure de fin de la session.
    func end(endTime: Date? = nil)
    // Ajoute un tag/attribut à la session de test. La session peut inclure autant de tags que nécessaire.
    // - Paramètres :
    //   - key : le nom du tag. Si un tag existant possède le même nom,
    //     sa valeur est remplacée par la nouvelle valeur.
    //   - value : la valeur du tag. Il peut s'agir d'un nombre comme d'une chaîne.
    func setTag(key: String, value: Any)
    //
    // Début d'une collection lors de cette session.
    // - Paramètres :
    //   - name : le nom de la collection.
    //   - startTime : facultatif. L'heure de début de la collection.
    func suiteStart(name: String, startTime: Date: Date? = nil) -> DDTestSuite
}
    //
public class DDTestSuite : NSObject {
    // Fin de la collection de tests.
    // - Paramètres :
    //   - endTime : facultatif. L'heure de fin de la collection.
    func end(endTime: Date? = nil)
    // Ajoute un tag/attribut à la collection de tests. La collection peut inclure autant de tags que nécessaire.
    // - Paramètres :
    //   - key : le nom du tag. Si un tag existant possède le même nom,
    //     sa valeur est remplacée par la nouvelle valeur.
    //   - value : la valeur du tag. Il peut s'agir d'un nombre comme d'une chaîne.
    func setTag(key: String, value: Any)
    //
    // Début d'un test dans cette collection.
    // - Paramètres :
    //   - name : le nom du test.
    //   - startTime : facultatif. L'heure de début du test.
    func testStart(name: String, startTime: Date: Date? = nil) -> DDTest
}
    //
public class DDTest : NSObject {
    // Ajoute un tag/attribut au test. Le test peut inclure autant de tags que nécessaire.
    // - Paramètres :
    //   - key : le nom du tag. Si un tag existant possède le même nom,
    //     sa valeur est remplacée par la nouvelle valeur.
    //   - value : la valeur du tag. Il peut s'agir d'un nombre comme d'une chaîne.
    func setTag(key: String, value: Any)
    //
    // Ajoute au test des informations sur les erreurs. Un seul ErrorInfo peut être transmis par test.
    // - Paramètres :
    //   - type : le type de l'erreur à signaler.
    //   - message : le message associé à l'erreur.
    //   - callstack : facultatif. La callstack associée à l'erreur.
    func setErrorInfo(type: String, message: String, callstack: String? = nil)
    //
    // Fin du test.
    // - Paramètres :
    //   - status : le statut transmis pour ce test.
    //   - endTime : facultatif. L'heure de fin du test.
    func end(status: DDTestStatus, endTime: Date: Date? = nil)
}
    //
// Liste des statuts pouvant être transmis pour un test :
enum DDTestStatus {
  // Le test a réussi.
  case pass
  //
  // Le test a échoué.
  case fail
  //
  // Le test a été ignoré.
  case skip
}
{{< /code-block >}}

### Exemple de code

Le code suivant permet d'utiliser les fonctionnalités de base de l'API :

{{< code-block lang="swift" >}}
import DatadogSDKTesting
let session = DDTestSession.start(bundleName: "ManualSession")
let suite1 = session.suiteStart(name: "ManualSuite 1")
let test1 = suite1.testStart(name: "Test 1")
test1.setTag(key: "key", value: "value")
test1.end(status: .pass)
let test2 = suite1.testStart(name: "Test 2")
test2.SetErrorInfo(type: "Error Type", message: "Error message", callstack: "Optional callstack")
test2.end(test: test2, status: .fail)
suite1.end()
let suite2 = session.suiteStart(name: "ManualSuite 2")
..
..
session.end()
{{< /code-block >}}

Appelez toujours `session.end()` à la fin de votre code, afin que toutes les informations sur les tests soient transmises à Datadog.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: /fr/getting_started/site/
[3]: /fr/continuous_integration/guides/rum_swift_integration
[4]: https://opentelemetry.io/