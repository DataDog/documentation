---
aliases:
- /fr/continuous_integration/setup_tests/java
- /fr/continuous_integration/tests/java
- /fr/continuous_integration/tests/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests dans Containers
- link: /tests/explorer
  tag: Documentation
  text: Explorer les résultats de test et la performance
- link: /tests/flaky_test_management/early_flake_detection
  tag: Documentation
  text: Détectez les irrégularités dans les tests avec Early Flake Detection
- link: /tests/flaky_test_management/auto_test_retries
  tag: Documentation
  text: Relancez les cas de test échoués avec Auto Test Retries
- link: /tests/correlate_logs_and_tests
  tag: Documentation
  text: Corrélez les logs et les traces de test
- link: /tests/troubleshooting/
  tag: Documentation
  text: Dépannage Test Optimization
title: Tests Java
type: multi-code-lang
---
## Compatibilité {#compatibility}

Frameworks de test pris en charge :

| Framework de test | Version |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |
| Scala Weaver | >= 0.8.4 (Uniquement lors de l'utilisation de SBT comme système de build) |

Si votre framework de test n'est pas pris en charge, vous pouvez essayer d'instrumenter vos tests à l'aide de l'[API de test manuel][1].

Systèmes de build pris en charge :

| Système de build | Version |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |
| Bazel | >= 1.2.0 |

<div class="alert alert-info">Si vous utilisez Bazel pour exécuter des tests Java, utilisez les Datadog <a href="/tests/setup/bazel/java/">règles Bazel pour les tests Java</a>.</div>

D'autres systèmes de build, tels qu'Ant ou SBT, sont pris en charge avec les limitations suivantes :
- La configuration et le rapport automatiques de couverture ne sont pas pris en charge.
- Lors de la construction d'un projet multi-modules, chaque module est rapporté dans une trace distincte.

### Android {#android}

Les tests Android qui s'exécutent sur la JVM sont pris en charge. Les tests qui dépendent de l'API Android, tels que les tests Espresso, les tests d'interface utilisateur Compose et certains tests unitaires, ne sont pris en charge qu'avec le framework [Robolectric][11].

Les tests qui nécessitent un émulateur ou un appareil physique ne sont pas pris en charge.

## Configuration {#setup}

Vous pouvez suivre les étapes de configuration interactive sur le [site Datadog][2] ou les instructions ci-dessous.

La configuration du traceur Java Datadog varie en fonction de votre fournisseur CI.

{{< tabs >}}
{{% tab "Fournisseur CI avec prise en charge de l'auto-instrumentation" %}}
{{% ci-autoinstrumentation %}}
{{% /tab %}}

{{% tab "Autre fournisseur CI Cloud" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Fournisseur CI sur site" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### Téléchargement du SDK {#downloading-sdk}

Vous n'avez besoin de télécharger le SDK qu'une seule fois pour chaque serveur.

Si le SDK est déjà disponible localement sur le serveur, vous pouvez passer directement à l'exécution des tests.

Déclarez la variable `DD_TRACER_FOLDER` avec le chemin d'accès au dossier où vous souhaitez stocker le fichier JAR du traceur téléchargé :

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

Exécutez la commande ci-dessous pour télécharger le fichier JAR du SDK dans le dossier spécifié :

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

Vous pouvez exécuter la commande `java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` pour vérifier la version du SDK.

### Exécution de vos tests {#running-your-tests}

Définissez ces variables avant de lancer le processus de test. Pour les exécuteurs de tests parallèles, définissez-les sur le processus parent afin que chaque worker en hérite.

Tout d'abord, définissez les variables d'environnement requises suivantes pour votre outil de build :

{{< tabs >}}
{{% tab "Maven" %}}

`DD_TRACER_FOLDER` (Requis)
: Chemin d'accès au dossier où se trouve le Java Tracer téléchargé.

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Requis)
: Injecte le SDK dans le processus de build Maven.

{{% /tab %}}
{{% tab "Gradle" %}}

`DD_TRACER_FOLDER` (Requis)
: Chemin d'accès au dossier où se trouve le Java Tracer téléchargé.

`GRADLE_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Requis)
: Injecte le SDK dans le processus de lancement Gradle.

{{% /tab %}}
{{% tab "SBT" %}}

`DD_TRACER_FOLDER` (Requis)
: Chemin d'accès au dossier où se trouve le Java Tracer téléchargé.

`SBT_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Requis)
: Injecte le SDK dans les JVM qui exécutent vos tests.

{{% /tab %}}
{{% tab "Other" %}}

`DD_TRACER_FOLDER` (Requis)
: Chemin d'accès au dossier où se trouve le Java Tracer téléchargé.

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (Requis)
: Injecte le SDK dans les JVM qui exécutent vos tests.

{{% /tab %}}
{{< /tabs >}}

Ensuite, définissez les variables d'environnement communes suivantes pour configurer le SDK et sa méthode de reporting :

`DD_CIVISIBILITY_ENABLED=true` (Requis)
: Active Test Optimization.<br/>
**Par défaut**: `false`

`DD_ENV` (Optionnel)
: Nom de l'environnement où les tests sont exécutés.<br/>
**Par défaut**: `(empty)`<br/>
**Exemples**: `local`, `ci`

`DD_SERVICE` (Optionnel)
: Nom du service ou de la bibliothèque à tester.<br/>
**Par défaut**: `unnamed-java-app`

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (Requis pour le mode Agentless)
: Activez le mode Agentless pour envoyer les résultats des tests directement à Datadog.<br/>
**Par défaut** : `false`

`DD_API_KEY` (Requis pour le mode Agentless)
: La clé d'API Datadog utilisée pour authentifier les téléchargements des résultats de test. Cette variable n'active pas le mode Agentless.<br/>
**Par défaut** : `(empty)`

`DD_SITE` (Optionnel pour le mode Agentless)
: Le [site Datadog][4] vers lequel télécharger les résultats de test. Définissez cette configuration lorsque vous utilisez un site autre que US1.<br/>
**Par défaut** : `datadoghq.com`

`DD_TRACE_AGENT_URL` (Uniquement lors de l'utilisation du Datadog Agent)
: L'URL du Datadog Agent pour la collecte des traces, sous la forme `http://hostname:port`.<br/>
**Par défaut** : `http://localhost:8126`

`DD_TEST_SESSION_NAME` (Optionnel)
: Identifie un groupe de tests, tel que `unit-tests`, `integration-tests` ou `smoke-tests`.<br/>
**Par défaut**: Le nom du job CI et la commande de test, ou la commande de test si le nom du job CI n'est pas disponible.<br/>
**Exemple**: `unit-tests`, `integration-tests`, `smoke-tests`

Exécutez vos tests comme vous le faites normalement (par exemple : `mvn test`, `mvn verify`, `./gradlew clean test` ou `sbt test`).

## Configuration {#configuration}

Les valeurs de configuration par défaut fonctionnent bien dans la plupart des cas.

Cependant, pour personnaliser le comportement du SDK, les options de [configuration du SDK Datadog][3] peuvent être utilisées.

### Collecte des métadonnées Git {#collecting-git-metadata}

{{% ci-git-metadata %}}

## Extensions {#extensions}

Le SDK expose un ensemble d'API qui peuvent être utilisées pour étendre ses fonctionnalités par programmation.

### Ajout de tags personnalisés aux tests {#adding-custom-tags-to-tests}

{{< tabs >}}
{{% tab "API OpenTelemetry" %}}

Pour ajouter des tags personnalisés, incluez la bibliothèque [opentelemetry-api][1] en tant que dépendance à la compilation et définissez `dd.trace.otel.enabled` (propriété système) ou `DD_TRACE_OTEL_ENABLED` (variable d'environnement) sur `true`.

Vous pouvez ensuite ajouter des tags personnalisés à vos tests en utilisant le span actif :

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test_owner", "my_team");
// test continues normally
// ...
```

Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][2] de la documentation sur l'instrumentation personnalisée Java.

[1]: https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-api
[2]: /fr/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{% tab "API OpenTracing" %}}

Pour ajouter des tags personnalisés, incluez la bibliothèque [opentracing-util][1] en tant que dépendance à la compilation à votre projet.

Vous pouvez ensuite ajouter des tags personnalisés à vos tests en utilisant le span actif :

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// test continues normally
// ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes.

Pour plus d'informations sur l'ajout de tags, consultez la section [Adding Tags][2] de la documentation sur l'instrumentation personnalisée Java.

[1]: https://mvnrepository.com/artifact/io.opentracing/opentracing-util
[2]: /fr/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags

{{% /tab %}}
{{< /tabs >}}

### Ajout de mesures personnalisées aux tests {#adding-custom-measures-to-tests}

Tout comme pour les tags, vous pouvez ajouter des mesures personnalisées à vos tests en utilisant le span actif :

{{< tabs >}}
{{% tab "API OpenTelemetry" %}}

```java
import io.opentelemetry.api.trace.Span;

// ...
// inside your test
Span span = Span.current();
span.setAttribute("test.memory.usage", 1e8);
// test continues normally
// ...
```

{{% /tab %}}
{{% tab "API OpenTracing" %}}

```java
import io.opentracing.Span;
import io.opentracing.util.GlobalTracer;

// ...
// inside your test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// test continues normally
// ...
```

{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations sur les mesures personnalisées, consultez le [guide Add Custom Measures][6].

### Utilisation de l'API de test manuel {#using-manual-testing-api}

Si vous utilisez l'un des frameworks de test pris en charge, le traceur Java instrumente automatiquement vos tests et envoie les résultats au backend Datadog.

Si vous utilisez un framework qui n'est pas pris en charge, ou une solution de test ad hoc, vous pouvez exploiter l'API de test manuel, qui rapporte également les résultats des tests au backend.

Pour utiliser l'API de test manuel, ajoutez la bibliothèque [`dd-trace-api`][7] en tant que dépendance à la compilation à votre projet.

#### Modèle de domaine {#domain-model}

L'API repose sur quatre concepts : session de test, module de test, collection de tests et test.

##### Session de test {#test-session}

Une session de test représente un build de projet, qui correspond généralement à l'exécution d'une commande de test déclenchée par un utilisateur ou par un script CI.

Pour démarrer une session de test, appelez `datadog.trace.api.civisibility.CIVisibility#startSession` et transmettez le nom du projet et le nom du framework de test que vous avez utilisé.

Lorsque tous vos tests sont terminés, appelez `datadog.trace.api.civisibility.DDTestSession#end`, ce qui force la bibliothèque à envoyer tous les résultats de test restants au backend.

##### Module de test {#test-module}

Un module de test représente une unité de travail plus petite au sein d'une construction de projet, correspondant généralement à un module de projet. Par exemple, un sous-module Maven ou un sous-projet Gradle.

Pour démarrer un module de test, appelez `datadog.trace.api.civisibility.DDTestSession#testModuleStart` et transmettez le nom du module.

Une fois que le module a terminé sa construction et ses tests, appelez `datadog.trace.api.civisibility.DDTestModule#end`.

##### Collection de tests {#test-suite}

Une collection de tests comprend un ensemble de tests qui partagent une fonctionnalité commune.
Ils peuvent partager une initialisation et un nettoyage communs, et peuvent également partager certaines variables.
Une collection de tests correspond généralement à une classe Java qui contient des cas de test.

Créez des collections de tests dans un module de test en appelant `datadog.trace.api.civisibility.DDTestModule#testSuiteStart` et en transmettant le nom de la collection de tests.

Appelez `datadog.trace.api.civisibility.DDTestSuite#end` lorsque tous les tests associés dans la suite ont terminé leur exécution.

##### Test {#test}

Un test représente un cas de test unique qui est exécuté dans le cadre d'une collection de tests.
Il correspond généralement à une méthode qui contient la logique de test.

Créez des tests dans une suite en appelant `datadog.trace.api.civisibility.DDTestSuite#testStart` et en transmettant le nom du test.

Appelez `datadog.trace.api.civisibility.DDTest#end` lorsqu'un test a terminé son exécution.

#### Exemple de code {#code-example}

Le code suivant permet d'utiliser les fonctionnalités de base de l'API :

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// the null arguments in the calls below are optional startTime/endTime values:
// when they are not specified, current time is used
public class ManualTest {
    public static void main(String[] args) throws Exception {
        DDTestSession testSession = CIVisibility.startSession("my-project-name", "my-test-framework", null);
        testSession.setTag("my-tag", "additional-session-metadata");
        try {
            runTestModule(testSession);
        } finally {
            testSession.end(null);
        }
    }

    private static void runTestModule(DDTestSession testSession) throws Exception {
        DDTestModule testModule = testSession.testModuleStart("my-module", null);
        testModule.setTag("my-module-tag", "additional-module-metadata");
        try {
            runFirstTestSuite(testModule);
            runSecondTestSuite(testModule);
        } finally {
            testModule.end(null);
        }
    }

    private static void runFirstTestSuite(DDTestModule testModule) throws Exception {
        DDTestSuite testSuite = testModule.testSuiteStart("my-suite", ManualTest.class, null);
        testSuite.setTag("my-suite-tag", "additional-suite-metadata");
        try {
            runTestCase(testSuite);
        } finally {
            testSuite.end(null);
        }
    }

    private static void runTestCase(DDTestSuite testSuite) throws Exception {
        Method myTestCaseMethod = ManualTest.class.getDeclaredMethod("myTestCase");
        DDTest ddTest = testSuite.testStart("myTestCase", myTestCaseMethod, null);
        ddTest.setTag("my-test-case-tag", "additional-test-case-metadata");
        ddTest.setTag("my-test-case-tag", "more-test-case-metadata");
        try {
            myTestCase();
        } catch (Exception e) {
            ddTest.setErrorInfo(e); // pass error info to mark test case as failed
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // run some test logic
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("this test suite is skipped"); // pass skip reason to mark test suite as skipped
        secondTestSuite.end(null);
    }
}
```

Appelez toujours ``datadog.trace.api.civisibility.DDTestSession#end`` à la fin afin que toutes les informations de test soient transmises à Datadog.

## Bonnes pratiques {#best-practices}

### Représentation déterministe des paramètres de test {#deterministic-test-parameters-representation}

Test Optimization fonctionne mieux lorsque les [paramètres de test sont déterministes][8] et restent identiques entre les exécutions de test.
Si un cas de test possède un paramètre qui varie entre les exécutions de test (tel qu'une date actuelle, un nombre aléatoire ou une instance d'une classe dont la méthode `toString()` n'est pas redéfinie), certaines fonctionnalités du produit peuvent ne pas fonctionner comme prévu.
Par exemple, l'historique des exécutions peut ne pas être disponible, ou le cas de test peut ne pas être classé comme instable même s'il présente une instabilité.

La meilleure façon d'y remédier est de s'assurer que les paramètres du test sont les mêmes d'un cycle à l'autre.

Dans JUnit 5, cela peut également être résolu en [personnalisant la représentation sous forme de chaîne des paramètres de test][9] sans modifier leurs valeurs.
Pour ce faire, utilisez l'interface `org.junit.jupiter.api.Named` ou modifiez le paramètre `name` de l'annotation `org.junit.jupiter.params.ParameterizedTest` :

```java
@ParameterizedTest
@MethodSource("namedArguments")
void parameterizedTest(String s, Date d) {
   // The second parameter in this test case is non-deterministic.
   // In the argument provider method it is wrapped with Named to ensure it has a deterministic name.
}

static Stream<Arguments> namedArguments() {
    return Stream.of(
            Arguments.of(
                    "a string",
                    Named.of("current date", new Date())),
            Arguments.of(
                    "another string",
                    Named.of("a date in the future", new Date(System.currentTimeMillis() + TimeUnit.DAYS.toMillis(1))))
    );
}
```

```java
@ParameterizedTest(name = "[{index}] {0}, a random number from one to ten")
@MethodSource("randomArguments")
void anotherParameterizedTest(String s, int i) {
  // The second parameter in this test case is non-deterministic.
  // The name of the parameterized test is customized to ensure it has a deterministic name.
}

static Stream<Arguments> randomArguments() {
    return Stream.of(
            Arguments.of("a string", ThreadLocalRandom.current().nextInt(10) + 1),
            Arguments.of("another string", ThreadLocalRandom.current().nextInt(10) + 1)
    );
}
```

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

- `mvn test --temp-dir=/var/folders/t1/rs2htfh55mz9px2j4prmpg_c0000gq/T`

Datadog recommande d'utiliser `DD_TEST_SESSION_NAME` si vos commandes de test varient entre les exécutions.

## Dépannage {#troubleshooting}

### Les tests n'apparaissent pas dans Datadog après l'activation de Test Optimization dans le SDK {#the-tests-are-not-appearing-in-datadog-after-enabling-test-optimization-in-the-sdk} :

Vérifiez que le SDK est injecté dans votre processus de build en examinant les logs de votre build.
Si l'injection réussit, vous pouvez voir une ligne contenant `DATADOG TRACER CONFIGURATION`.
Si la ligne n'est pas présente, assurez-vous que les variables d'environnement utilisées pour injecter et configurer le SDK sont disponibles pour le processus de build.
Une erreur courante consiste à définir les variables dans une étape de build et à exécuter les tests dans une autre étape de build. Cette approche peut ne pas fonctionner si les variables ne sont pas propagées entre les étapes de build.

Assurez-vous d'utiliser la dernière version du SDK.

Vérifiez que votre système de build et votre framework de test sont pris en charge par Test Optimization. Consultez la liste des [systèmes de build et frameworks de test pris en charge](#compatibility).

Assurez-vous que la propriété `dd.civisibility.enabled` (ou la variable d'environnement `DD_CIVISIBILITY_ENABLED`) est définie sur `true` dans les arguments du SDK.

Essayez d'exécuter votre build avec la journalisation de débogage du traceur activée en définissant la variable d'environnement `DD_TRACE_DEBUG` sur `true`.
Vérifiez la sortie du build pour détecter toute erreur indiquant une mauvaise configuration du traceur, telle qu'une variable d'environnement `DD_API_KEY` non définie.

### Les tests ou la compilation du code source échouent lors de la construction d'un projet avec le SDK attaché {#tests-or-source-code-compilation-fails-when-building-a-project-with-the-sdk-attached}

Par défaut, Test Optimization exécute la compilation du code Java avec un plugin de compilation attaché.

Le plugin est facultatif, car il ne sert qu'à réduire la surcharge de performance.

Selon la configuration du build, l'ajout du plugin peut parfois perturber le processus de compilation.

Si le plugin interfère avec le build, désactivez-le en ajoutant `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` à la liste des arguments `-javaagent`.
(ou en définissant la variable d'environnement `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false`).

### Les builds échouent car l'artefact dd-javac-plugin-client est introuvable {#builds-fails-because-dd-javac-plugin-client-artifact-cannot-be-found}

Il est possible que le plugin de compilation Java injecté dans le build ne soit pas disponible si le build utilise un stockage d'artefacts personnalisé ou s'il est exécuté en mode hors ligne.

Si tel est le cas, vous pouvez désactiver l'injection du plugin en ajoutant `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` à la liste des arguments `-javaagent`
(ou en définissant la variable d'environnement `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED` sur false).

Le plugin est facultatif, car il ne sert qu'à réduire la surcharge de performance.

### Les tests échouent lors de la build d'un projet avec le SDK attaché {#tests-fail-when-building-a-project-with-the-sdk-attached}

Dans certains cas, l'ajout du SDK peut faire échouer les tests, surtout s'ils exécutent des assertions sur l'état interne de la JVM ou sur des instances de classes de bibliothèques tierces.

Bien que la meilleure approche dans de tels cas soit de mettre à jour les tests, il existe également une option plus rapide consistant à désactiver les intégrations de bibliothèques tierces du SDK.

Les intégrations fournissent des informations supplémentaires sur ce qui se passe dans le code testé et sont particulièrement utiles dans les tests d'intégration, pour surveiller des éléments tels que les requêtes HTTP ou les appels de base de données.
Elles sont activées par défaut.

Pour désactiver une intégration spécifique, reportez-vous au tableau [Datadog Tracer Compatibility][10] pour connaître les noms des propriétés de configuration correspondantes.
Par exemple, pour désactiver l'intégration de la requête client `OkHttp3`, ajoutez `dd.integration.okhttp-3.enabled=false` à la liste des arguments `-javaagent`.

Pour désactiver toutes les intégrations, complétez la liste des arguments `-javaagent` avec `dd.trace.enabled=false` (ou définissez la variable d'environnement `DD_TRACE_ENABLED=false`).

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: #using-manual-testing-api
[2]: https://app.datadoghq.com/ci/setup/test?language=java
[3]: /fr/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: /fr/getting_started/site/
[6]: /fr/tests/guides/add_custom_measures/?tab=java
[7]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[8]: /fr/tests/#parameterized-test-configurations
[9]: https://junit.org/junit5/docs/current/user-guide/#writing-tests-parameterized-tests-display-names
[10]: /fr/tracing/trace_collection/compatibility/java#integrations
[11]: https://robolectric.org/getting-started/