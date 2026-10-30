---
aliases:
- /fr/continuous_integration/setup_tests/swift
- /fr/continuous_integration/tests/swift
- /fr/continuous_integration/tests/setup/swift
code_lang: swift
code_lang_weight: 50
further_reading:
- link: /tests
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/test_impact_analysis/swift
  tag: Documentation
  text: Accélérez vos jobs de test avec Test Impact Analysis
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests Swift
type: multi-code-lang
---
## Compatibilité {#compatibility}

Langages pris en charge :

| Langue    | Version |
| ----------- | ------- |
| Swift       | >= 6.2  |
| Objective-C | >= 2.0  |
| Xcode       | >= 26.0 |

Plateformes prises en charge :

| Plateforme     | Version  |
| ------------ | -------- |
| iOS / iPadOS | >= 15.0  |
| macOS        | >= 11.0  |
| tvOS         | >= 15.0  |
| macCatalyst  | >= 13.0  |

Frameworks de test pris en charge :

| Framework     | Version du SDK  | Niveau de prise en charge                                     |
| ------------- | ------------ | ------------------------------------------------- |
| XCTest        | Toutes versions | Prise en charge complète                                      |
| Swift Testing | >= 2.7.0     | Prise en charge complète à partir de 2.7.1 ; observation uniquement en 2.7.0 |

## Installation du SDK de test Swift {#installing-the-swift-testing-sdk}

Il existe trois façons d'installer le framework de test :

{{< tabs >}}
{{% tab "Swift Package Manager" %}}

### Utilisation d'un projet Xcode {#using-xcode-project}

1. Ajoutez `dd-sdk-swift-testing` le package à votre projet. Il est situé à [`https://github.com/DataDog/dd-sdk-swift-testing`][1].

{{< img src="continuous_integration/swift_package.png" alt="Package Swift" >}}


2. Liez vos cibles de test avec la bibliothèque `DatadogSDKTesting` du package.

{{< img src="continuous_integration/swift_link2.png" alt="Liaison Swift SPM" >}}

3. Si vous exécutez des tests d'interface utilisateur et n'utilisez pas RUM, ajoutez également la dépendance à vos applications exécutant les tests.

### Utilisation du projet Swift Package {#using-swift-package-project}

1. Ajoutez `dd-sdk-swift-testing` à votre tableau de dépendances de package, par exemple :

{{< code-block lang="swift" >}}
.package(url: "https://github.com/DataDog/dd-sdk-swift-testing.git", from: "2.5.3")
{{< /code-block >}}

2. Pour ajouter le framework de test aux dépendances de vos cibles de test, ajoutez la ligne suivante au tableau des dépendances de vos cibles de test :
{{< code-block lang="swift" >}}
.product(name: "DatadogSDKTesting", package: "dd-sdk-swift-testing")
{{< /code-block >}}


[1]: https://github.com/DataDog/dd-sdk-swift-testing
{{% /tab %}}
{{% tab "Cocoapods" %}}

1. Ajoutez la dépendance `DatadogSDKTesting` aux cibles de test de votre `Podfile` :

{{< code-block lang="ruby" >}}
target 'MyApp' do
  # ...

  target 'MyAppTests' do
    inherit! :search_paths
    pod 'DatadogSDKTesting'
  end
end
{{< /code-block >}}

{{% /tab %}}
{{% tab "Liaison de framework" %}}

1. Téléchargez et décompressez `DatadogSDKTesting.zip` depuis la page [release][1].

2. Copiez et liez vos cibles de test avec le XCFramework résultant.

{{< img src="continuous_integration/swift_link.png" alt="Liaison Swift XCFramework" >}}

[1]: https://github.com/DataDog/dd-sdk-swift-testing/releases
{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-danger">Ce framework n'est utile que pour les tests et ne doit être lié à l'application que lors de l'exécution des tests. Ne distribuez pas le framework à vos utilisateurs. </div>

## Instrumentation de vos tests {#instrumenting-your-tests}

### Framework Swift Testing {#swift-testing-framework}

Le SDK Datadog prend en charge le framework Swift Testing à partir de la version 2.7.0 (observation uniquement) et prend entièrement en charge toutes les fonctionnalités avancées dans la version 2.7.1 et ultérieure.

#### Configuration de l'observation Swift Testing {#setting-up-swift-testing-observation}

Pour activer l'observation pour vos tests Swift Testing :

1. Importez `DatadogSDKTesting` dans vos fichiers sources de test :

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import Testing
{{< /code-block >}}

2. Ajoutez le trait `.datadogTesting` à vos collections de tests ou à vos fonctions de test autonomes :

{{< code-block lang="swift" >}}
@Suite(.datadogTesting)
struct MyTestSuite {
    @Test func myTest() {
        // ...
    }
}

// For standalone test functions:
@Test(.datadogTesting) func myStandaloneTest() {
    // ...
}
{{< /code-block >}}

### Configuration du SDK {#configuring-sdk}

#### Utilisation du projet Xcode {#using-xcode-project-1}

Pour activer l'instrumentation des tests, ajoutez les variables d'environnement suivantes à votre cible de test ou dans le fichier `Info.plist` comme [décrit ci-dessous](#using-infoplist-for-configuration). Vous **devez** sélectionner votre cible principale dans {{< ui >}}Expand variables based on{{< /ui >}} ou {{< ui >}}Target for Variable Expansion{{< /ui >}} si vous utilisez des plans de test :

{{< img src="continuous_integration/swift_env.png" alt="Environnements Swift" >}}

<div class="alert alert-danger">Vous devez avoir votre cible principale dans l'expansion des variables des variables d'environnement ; si elle n'est pas sélectionnée, les variables ne sont pas valides. </div>

Pour les tests d'interface utilisateur (UI Tests), les variables d'environnement doivent être définies uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

#### Utilisation du projet Swift Package {#using-swift-package-project-1}

Pour activer l'instrumentation des tests, vous devez définir les variables d'environnement suivantes pour votre exécution en ligne de commande pour les tests. Vous pouvez également les définir dans l'environnement avant d'exécuter les tests ou vous pouvez les ajouter au début de la commande :

<pre>
<code>
DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD swift test ...

or

DD_TEST_RUNNER=1 DD_API_KEY=<your API_KEY> SRCROOT=$PWD xcodebuild test -scheme ...
</code>
</pre>


Définissez toutes ces variables dans votre cible de test :

`DD_TEST_RUNNER`
: Active ou désactive l'instrumentation des tests. Définissez cette valeur sur `$(DD_TEST_RUNNER)` afin de pouvoir activer et désactiver l'instrumentation des tests avec une variable d'environnement définie en dehors du processus de test (par exemple, dans la build CI).<br/>
**Par défaut**: `false`<br/>
**Recommandé**: `$(DD_TEST_RUNNER)`

`DD_API_KEY` (Requis)
: La [clé d'API Datadog][2] utilisée pour authentifier les téléchargements de résultats de test.<br/>
**Par défaut**: `(empty)`

`DD_TEST_SESSION_NAME` (Optionnel)
: Identifie un groupe de tests, tel que `unit-tests`, `integration-tests` ou `smoke-tests`.<br/>
**Par défaut**: Le nom du job CI et la commande de test, ou la commande de test si le nom du job CI n'est pas disponible.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

`DD_SERVICE` (Optionnel)
: Nom du service ou de la bibliothèque en cours de test.<br/>
**Par défaut** : le nom du dépôt<br/>
**Exemple** : `my-ios-app`

`DD_ENV` (Optionnel)
: Nom de l'environnement où les tests sont exécutés.<br/>
**Par défaut** : `ci` lorsqu'un fournisseur CI est détecté ; sinon, `none`.<br/>
**Recommandé** : `$(DD_ENV)`<br/>
**Exemples** : `local`, `ci`

`SRCROOT`
: Le chemin vers l'emplacement du projet : Si vous utilisez Xcode, utilisez `$(SRCROOT)` pour la valeur, car elle est automatiquement définie par celui-ci.<br/>
**Par défaut** : `(empty)`<br/>
**Recommandé** : `$(SRCROOT)`<br/>
**Exemple** : `/Users/ci/source/MyApp`

Pour plus d'informations sur les tags réservés `service` et `env` , consultez [Unified Service Tagging][8].

Configurez `DD_SITE` pour votre site ({{< region-param key="dd_site_name" >}}) :

`DD_SITE` (Facultatif)
: Le [site Datadog][3] vers lequel télécharger les résultats.<br/>
**Par défaut** : `datadoghq.com`<br/>
**Site sélectionné** : {{< region-param key="dd_site" code="true" >}}

## Collecte des métadonnées Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

### Exécution des tests {#running-tests}

Après l'installation, exécutez vos tests comme vous le faites normalement, par exemple en utilisant la commande `xcodebuild test`. Les tests, les requêtes réseau et les plantages d'application sont instrumentés automatiquement. Transmettez vos variables d'environnement lors de l'exécution de vos tests dans le CI, par exemple :

<pre>
<code>
DD_TEST_RUNNER=1 DD_SITE={{< region-param key="dd_site" >}} xcodebuild \
  -project "MyProject.xcodeproj" \
  -scheme "MyScheme" \
  -destination "platform=macOS,arch=arm64" \
  test
</code>
</pre>

### Tests d'interface utilisateur {#ui-tests}

### Intégration RUM {#rum-integration}

Si l'application testée est instrumentée à l'aide de RUM, les résultats de vos tests d'interface utilisateur et les sessions RUM générées sont automatiquement liés. En savoir plus sur RUM dans le guide [RUM iOS Integration][4]. Une version iOS RUM >= 1.10 est requise.

Les variables d'environnement doivent être définies uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

### SDK d'optimisation des tests {#test-optimisation-sdk}

Si vous n'utilisez pas RUM, vous pouvez lier votre cible d'application avec le SDK de test. Le SDK ajoute une auto-instrumentation à votre application, collecte les requêtes réseau et les logs, et les attache aux traces de test.

Les variables d'environnement doivent être définies uniquement dans la cible de test, car le framework injecte automatiquement ces valeurs dans l'application.

## Configuration optionnelle supplémentaire {#additional-optional-configuration}

Pour les paramètres de configuration suivants :
 Les variables - `Boolean` peuvent utiliser l'une des valeurs suivantes : : `1`, `0`, `true`, `false`, `YES` ou `NO`
 Les variables de liste - `String` acceptent une liste d'éléments séparés par `,` ou `;`

### Activation de l'auto-instrumentation {#enabling-auto-instrumentation}

`DD_ENABLE_STDOUT_INSTRUMENTATION`
: Capture les messages écrits dans `stdout` (par exemple, `print()`) et les rapporte en tant que logs. Cela peut avoir un impact sur votre facture. (Booléen)

`DD_ENABLE_STDERR_INSTRUMENTATION`
: Capture les messages écrits dans `stderr` (par exemple, `NSLog()`, étapes UITest) et les rapporte en tant que logs. Cela peut avoir un impact sur votre facture. (Booléen)

### Désactivation de l'auto-instrumentation {#disabling-auto-instrumentation}

Le framework active l'auto-instrumentation de toutes les bibliothèques prises en charge, mais dans certains cas, cela peut ne pas être souhaité. Vous pouvez désactiver l'auto-instrumentation de certaines bibliothèques en définissant les variables d'environnement suivantes (ou dans le fichier `Info.plist` comme [décrit ci-dessous](#using-infoplist-for-configuration)) :

`DD_DISABLE_NETWORK_INSTRUMENTATION`
: Désactive toute instrumentation réseau (booléen)

`DD_DISABLE_RUM_INTEGRATION`
: Désactive l'intégration avec les sessions RUM (booléen)

`DD_DISABLE_SOURCE_LOCATION`
: Désactive l'emplacement du code source de test et les propriétaires de code (booléen)

`DD_DISABLE_CRASH_HANDLER`
: Désactive la gestion et le rapport des plantages. (Booléen)
<div class="alert alert-danger">Si vous désactivez le rapport de plantage, les tests qui plantent ne sont pas rapportés du tout et n'apparaissent pas comme des échecs de test. Si vous devez désactiver la gestion des plantages pour l'un de vos tests, exécutez-les en tant que cible distincte, afin de ne pas la désactiver pour les autres.</div>

### Auto-instrumentation réseau {#network-auto-instrumentation}

Pour l'auto-instrumentation réseau, vous pouvez ces paramètres supplémentaires :

`DD_DISABLE_HEADERS_INJECTION`
: Désactive toute injection d'en-têtes de traçage (booléen)

`DD_INSTRUMENTATION_EXTRA_HEADERS`
: En-têtes supplémentaires spécifiques que vous souhaitez journaliser (liste de chaînes)

`DD_EXCLUDED_URLS`
: Les URL que vous ne souhaitez pas journaliser ou dans lesquelles vous ne souhaitez pas injecter d'en-têtes (liste de chaînes)

`DD_ENABLE_RECORD_PAYLOAD`
: Active le rapport d'un sous-ensemble (1024 octets) des charges utiles dans les requêtes et les réponses (booléen)

`DD_MAX_PAYLOAD_SIZE`
: Définit la taille maximale rapportée à partir de la charge utile. Par défaut `1024` (entier)

`DD_DISABLE_NETWORK_CALL_STACK`
: Désactive les informations de la pile d'appels dans les spans réseau (booléen)

`DD_ENABLE_NETWORK_CALL_STACK_SYMBOLICATED`
: Affiche les informations de la pile d'appels, non seulement le nom de la méthode, mais aussi les informations précises du fichier et de la ligne. Peut avoir un impact sur les performances de vos tests (booléen)

### Corrélation des tests d'infrastructure {#infrastructure-test-correlation}

Si vous exécutez des tests dans votre propre infrastructure (tests macOS ou sur simulateur), vous pouvez corréler vos tests avec vos métriques d'infrastructure en installant le Datadog Agent et en définissant les éléments suivants :

`DD_CIVISIBILITY_REPORT_HOSTNAME`
: Rapporte le nom de host de la machine lançant les tests (booléen)

Vous pouvez également désactiver ou activer une auto-instrumentation spécifique dans certains tests depuis Swift ou Objective-C en important le module `DatadogSDKTesting` et en utilisant la classe : `DDInstrumentationControl`.

## Tags personnalisés {#custom-tags}

### Variables d'environnement {#environment-variables}

Vous pouvez utiliser une variable d'environnement `DD_TAGS` (ou dans le fichier `Info.plist` comme [ décrit ci-dessous ](#using-infoplist-for-configuration)). Elle doit contenir des paires de `key:tag` séparées par des espaces. Exemple :
{{< code-block lang="bash" >}}
DD_TAGS=tag-key-0:tag-value-0 tag-key-1:tag-value-1
{{< /code-block >}}

Si l'une des valeurs commence par le caractère `$`, elle est remplacée par une variable d'environnement du même nom (si elle existe), par exemple :
{{< code-block lang="bash" >}}
DD_TAGS=home:$HOME
{{< /code-block >}}

L'utilisation du caractère `$` prend également en charge le remplacement d'une variable d'environnement au début d'une valeur si elle contient des caractères non pris en charge par les variables d'environnement (`a-z`, `A-Z` ou `_`), par exemple :
{{< code-block lang="bash" >}}
FOO = BAR
DD_TAGS=key1:$FOO-v1 // expected: key1:BAR-v1
{{< /code-block >}}

### À l'intérieur d'une méthode de test {#inside-a-test-method}

Vous pouvez ajouter des tags personnalisés à l'intérieur de vos méthodes de test. La propriété statique `DDTest.current` renverra l'instance de test actuelle si elle est appelée dans le périmètre de la méthode de test.

{{< code-block lang="swift" >}}
// Somewhere inside the test method
DDTest.current?.setTag(key: "key1", value: "value1")
// test continues normally
// ...
{{< /code-block >}}

### OpenTelemetry {#opentelemetry}

**Remarque** : L'utilisation d'OpenTelemetry n'est prise en charge que pour Swift.

Le framework de test Datadog Swift utilise [OpenTelemetry][6] comme technologie de traçage en arrière-plan. Vous pouvez accéder au traceur OpenTelemetry en utilisant `DDInstrumentationControl.openTelemetryTracer` et utiliser n'importe quelle API OpenTelemetry. Par exemple, pour ajouter un tag ou un attribut :

{{< code-block lang="swift" >}}
import DatadogSDKTesting
import OpenTelemetryApi

let tracer = DDInstrumentationControl.openTelemetryTracer as? Tracer
let span = tracer?.spanBuilder(spanName: "ChildSpan").startSpan()
span?.setAttribute(key: "OTTag2", value: "OTValue2")
span?.end()
{{< /code-block >}}

La cible de test doit être liée explicitement à `opentelemetry-swift`.

### Rapporter la couverture de code {#reporting-code-coverage}

Lorsque la couverture de code est disponible, le SDK Datadog (v2.2.7+) la rapporte sous le tag `test.code_coverage.lines_pct` pour vos sessions de test.

Dans Xcode, vous pouvez activer la collecte de la couverture de code dans votre plan de test ou votre schéma de test, selon la configuration de votre projet.

Vous pouvez voir l'évolution de la couverture des tests dans l'onglet {{< ui >}}Coverage{{< /ui >}} d'une session de test.

## Utilisation d'Info.plist pour la configuration {#using-infoplist-for-configuration}

Au lieu de définir des variables d'environnement, toutes les valeurs de configuration peuvent être fournies en les ajoutant au fichier `Info.plist` du bundle de test (et non du bundle de l'application). Si le même paramètre est défini à la fois dans une variable d'environnement et dans le fichier `Info.plist`, la variable d'environnement est prioritaire.

## Variables d'environnement du fournisseur CI {#ci-provider-environment-variables}

{{< tabs >}}
{{% tab "Jenkins" %}}

| Variable d'environnement | Valeur                  |
| -------------------- | ---------------------- |
| `JENKINS_URL`        | `$(JENKINS_URL)`       |
| `WORKSPACE`          | `$(WORKSPACE)`         |
| `BUILD_TAG`          | `$(BUILD_TAG)`         |
| `BUILD_NUMBER`       | `$(BUILD_NUMBER)`      |
| `BUILD_URL`          | `$(BUILD_URL)`         |
| `JOB_NAME`           | `$(JOB_NAME)`          |
| `DD_CUSTOM_TRACE_ID` | `$(DD_CUSTOM_TRACE_ID)`|

Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

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
| `CI_PROJECT_URL`     | `$(CI_PROJECT_URL)`  |


Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

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
{{% tab "Bitbucket Pipelines" %}}

| Variable d'environnement       | Valeur                         |
| -------------------------- | ----------------------------- |
| `BITBUCKET_CLONE_DIR`      | `$(BITBUCKET_CLONE_DIR)`      |
| `BITBUCKET_BUILD_NUMBER`   | `$(BITBUCKET_BUILD_NUMBER)`   |
| `BITBUCKET_PIPELINE_UUID`  | `$(BITBUCKET_PIPELINE_UUID)`  |
| `BITBUCKET_REPO_FULL_NAME` | `$(BITBUCKET_REPO_FULL_NAME)` |

Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

| Variable d'environnement                     | Valeur                                       |
| ---------------------------------------- | ------------------------------------------- |
| `APPVEYOR_REPO_COMMIT`                   | `$(APPVEYOR_REPO_COMMIT)`                   |
| `APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH` | `$(APPVEYOR_PULL_REQUEST_HEAD_REPO_BRANCH)` |
| `APPVEYOR_REPO_BRANCH`                   | `$(APPVEYOR_REPO_BRANCH)`                   |
| `APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED`  | `$(APPVEYOR_REPO_COMMIT_MESSAGE_EXTENDED)`  |
| `APPVEYOR_REPO_COMMIT_AUTHOR`            | `$(APPVEYOR_REPO_COMMIT_AUTHOR)`            |
| `APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL`      | `$(APPVEYOR_REPO_COMMIT_AUTHOR_EMAIL)`      |

{{% /tab %}}
{{% tab "Azure Pipelines" %}}

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

Configuration Git supplémentaire pour le test d'appareil physique :

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

Configuration Git supplémentaire pour le test d'appareil physique :

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
{{% tab "Xcode Cloud" %}}

| Variable d'environnement    | Valeur                   |
| ----------------------- | ----------------------- |
| `DD_GIT_REPOSITORY_URL` | L'URL du dépôt      |
| `CI_WORKSPACE`          | `$(CI_WORKSPACE)`       |
| `CI_COMMIT`             | `$(CI_COMMIT)`          |
| `CI_BUILD_ID`           | `$(CI_BUILD_ID)`        |
| `CI_BUILD_NUMBER`       | `$(CI_BUILD_NUMBER)`    |
| `CI_WORKFLOW`           | `$(CI_WORKFLOW)`        |
| `CI_TAG`                | `$(CI_TAG)`             |
| `CI_BRANCH`             | `$(CI_BRANCH)`          |
| `CI_GIT_REF`            | `$(CI_GIT_REF)`         |

{{% /tab %}}
{{< /tabs >}}

## Bonnes pratiques {#best-practices}

Suivez ces pratiques pour tirer pleinement parti du framework de test et de Test Optimization.

### Générer le fichier de symboles lors de la compilation {#generate-symbols-file-when-building}

Compilez votre code dans Xcode en utilisant `DWARF with dSYM File` (ou `-Xswiftc -debug-info-format=dwarf` si vous compilez avec `swift`)

Le framework de test utilise des fichiers de symboles pour certaines de ses fonctionnalités, notamment : la symbolisation des plantages, le signalement de l'emplacement de la source de test et le signalement des propriétaires de code. Il génère automatiquement le fichier de symboles lorsque les symboles de débogage sont intégrés dans les binaires, mais cela peut prendre un peu plus de temps à charger.

### Désactiver le bac à sable pour les tests d'interface utilisateur sur macOS {#disable-sandbox-for-ui-tests-on-macos}

Dans certaines versions de Xcode, les bundles de tests d'interface utilisateur sont créés avec un bac à sable par défaut. Les paramètres associés à un bac à sable empêchent le framework de test d'être exécuté par certaines commandes système avec `xcrun`, vous devez donc le désactiver.

Désactivez le bac à sable en ajoutant des droits (Entitlements) au bundle de l'exécuteur de tests d'interface utilisateur, puis en y ajoutant `App Sandbox = NO`. Vous pouvez également créer un fichier `.entitlement` et l'ajouter aux paramètres de build de signature. Ce fichier doit inclure le contenu suivant :

{{< code-block lang="xml" >}}
<key>com.apple.security.app-sandbox</key>
 <false/>
{{< /code-block >}}

### Nom de la session de test `DD_TEST_SESSION_NAME` {#test-session-name-dd-test-session-name}

Utilisez `DD_TEST_SESSION_NAME` pour définir le nom de la session de test et le groupe de tests associé. Voici des exemples de valeurs pour ce tag :

- `unit-tests`
- `integration-tests`
- `smoke-tests`
- `flaky-tests`
- `ui-tests`
- `backend-tests`

Si `DD_TEST_SESSION_NAME` n'est pas spécifié, la valeur par défaut est le nom du job CI et la commande de test. Si le nom du job CI n'est pas disponible, la commande de test est utilisée.

Le nom de la session de test doit être unique au sein d'un dépôt pour vous aider à distinguer différents groupes de tests.

#### Quand utiliser `DD_TEST_SESSION_NAME` {#when-to-use-dd-test-session-name} :

Il existe un ensemble de paramètres que Datadog vérifie pour établir une correspondance entre les sessions de test. La commande de test utilisée pour exécuter les tests en fait partie. Si la commande de test contient une chaîne qui change à chaque exécution, comme un dossier temporaire, Datadog considère que les sessions ne sont pas liées entre elles. Exemple :

- `swift test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommande d'utiliser `DD_TEST_SESSION_NAME` si vos commandes de test varient entre les exécutions.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/tests/#test-suite-level-visibility
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /fr/getting_started/site/
[4]: /fr/tests/swift_tests/
[5]: https://app.datadoghq.com/organization-settings/application-keys
[6]: https://opentelemetry.io/
[7]: /fr/tests/test_impact_analysis/
[8]: /fr/getting_started/tagging/unified_service_tagging