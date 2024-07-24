---
aliases:
- /fr/continuous_integration/setup_tests/java
- /fr/continuous_integration/tests/java
- /fr/continuous_integration/tests/setup/java
code_lang: java
code_lang_weight: 10
further_reading:
- link: /continuous_integration/tests/containers/
  tag: Documentation
  text: Transmettre des variables d'environnement pour des tests au sein de conteneurs
- link: /continuous_integration/tests
  tag: Documentation
  text: Explorer les résultats de test et les performances
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Tests Java
type: multi-code-lang
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

<div class="alert alert-info">
  Si vous utilisez Jenkins comme fournisseur de CI, vous pouvez vous servir de la <a href="/continuous_integration/pipelines/jenkins/#enable-with-the-jenkins-configuration-ui-1">configuration via l'interface</a> afin d'activer Test Visibility pour vos tâches et pipelines.
</div>

## Compatibilité

Frameworks de test pris en charge :

| Framework de test | Version |
|---|---|
| JUnit 4 | >= 4.10 |
| JUnit 5 | >= 5.3 |
| TestNG | >= 6.4 |
| Spock | >= 2.0 |
| Cucumber | >= 5.4.0 |
| Karate | >= 1.0.0 |
| Scalatest | >= 3.0.8 |
| Scala MUnit | >= 0.7.28 |

Si votre framework de test n'est pas pris en charge, vous pouvez essayer d'instrumenter vos tests avec l'[API de test manuel]{1].

Systèmes de build pris en charge :

| Système de build | Version |
|---|---|
| Gradle | >= 2.0 |
| Maven | >= 3.2.1 |

D'autres systèmes de build, comme Ant et Bazel, sont pris en charge, mais avec les limitations suivantes :
- La configuration et la transmission automatiques de la couverture ne sont pas disponibles.
- Pour le build d'un projet avec plusieurs modules, chaque module doit être transmis dans une trace distincte.

## Passer d'une organisation à une autre

Pour configurer Test Visibility pour Java, procédez comme suit :
1. Configurez la méthode de transmission du traceur.
2. Téléchargez la bibliothèque du traceur sur les hosts sur lesquels vos tests seront exécutés.
3. Exécutez vos tests avec le traceur ajouté.

Vous pouvez suivre les instructions de configuration interactives disponibles sur le [site Datadog][8] ou les instructions ci-dessous.

### Configurer la méthode de transmission

Pour cette étape, vous devez configurer la méthode de transmission des données par le traceur Java à Datadog. Il existe deux principales méthodes :
* Vous pouvez transmettre les données à l'Agent Datadog, qui les envoie à son tour à Datadog.
* Vous pouvez transmettre les données directement à Datadog.

{{< tabs >}}
{{% tab "Fournisseur de CI cloud (sans Agent)" %}}
{{% ci-agentless %}}
{{% /tab %}}

{{% tab "Fournisseur de CI sur site (Agent Datadog)" %}}
{{% ci-agent %}}
{{% /tab %}}
{{< /tabs >}}

### Téléchargement de la bibliothèque du traceur

Vous devez seulement télécharger la bibliothèque du traceur une fois pour chaque serveur.

Si la bibliothèque du traceur est déjà disponible localement sur le serveur, vous pouvez passer directement à l'exécution des tests.

Déclarez la variable `DD_TRACER_FOLDER` avec le chemin vers le dossier vers lequel vous voulez stocker le traceur JAR téléchargé :

{{< code-block lang="shell" >}}
export DD_TRACER_FOLDER=... // e.g. ~/.datadog
{{< /code-block >}}

Exécutez la commande ci-dessous pour télécharger le traceur JAR dans le dossier spécifié :

{{< code-block lang="shell" >}}
wget -O $DD_TRACER_FOLDER/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
{{< /code-block >}}

Vous pouvez exécuter la commande `java -jar $DD_TRACER_FOLDER/dd-java-agent.jar` pour vérifier la version de la bibliothèque du traceur.

### Exécution des tests

{{< tabs >}}
{{% tab "Maven" %}}

Définissez les variables d'environnement suivantes pour configurer le traceur :

`DD_CIVISIBILITY_ENABLED=true` (Required)
: Active la solution CI Visibility.

`DD_ENV` (Required)
: Environnement dans lequel les tests sont exécutés (par exemple, `local` pour des tests exécutés sur la machine d'un développeur ou `ci` pour des tests exécutés sur un fournisseur de CI).

`DD_SERVICE` (obligatoire)
: Nom de la bibliothèque ou du service testé.

`DD_TRACER_FOLDER` (Required)
: Chemin vers le dossier où se trouve le traceur Java téléchargé.

`MAVEN_OPTS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (obligatoire)
: Injecte le traceur dans le processus de build Maven.

Exécutez vos tests comme vous le feriez en temps normal (par exemple, avec `mvn test` ou `mvn verify`).

{{% /tab %}}
{{% tab "Gradle" %}}

Assurez-vous que vous avez défini la variable `DD_TRACER_FOLDER` sur le chemin vers lequel vous avez téléchargé le traceur.

Exécutez vos tests à l'aide de la propriété système `org.gradle.jvmargs` pour spécifier le chemin du traceur JAR Java de Datadog.

Lorsque vous spécifiez des arguments de traceur, incluez les éléments suivants :

* Activez CI Visibility en définissant la propriété `dd.civisibility.enabled` sur `true`.
* Définissez l'environnement dans lequel les tests sont exécutés à l'aide de la propriété `dd.env` (par exemple, `local` pour des tests exécutés sur la machine d'un développeur ou `ci` pour des tests exécutés sur un fournisseur de CI).
* Définissez le nom de la bibliothèque ou du service testé dans la propriété `dd.service`.

Exemple :

{{< code-block lang="shell" >}}
./gradlew cleanTest test -Dorg.gradle.jvmargs=\
-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar=\
dd.civisibility.enabled=true,\
dd.env=ci,\
dd.service=my-java-app
{{< /code-block >}}

Le fait de spécifier `org.gradle.jvmargs` dans la ligne de commande écrase la valeur spécifiée ailleurs. Si cette propriété est spécifiée dans un fichier `gradle.properties`, veillez à répliquer les réglages nécessaires dans l'invocation de la ligne de commande.

{{% /tab %}}
{{% tab "Autre" %}}

Définissez les variables d'environnement suivantes pour configurer le traceur :

`DD_CIVISIBILITY_ENABLED=true` (obligatoire)
: Active la solution CI Visibility.

`DD_ENV` (Required)
: Environnement dans lequel les tests sont exécutés (par exemple, `local` pour des tests exécutés sur la machine d'un développeur ou `ci` pour des tests exécutés sur un fournisseur de CI).

`DD_SERVICE` (obligatoire)
: Nom de la bibliothèque ou du service testé.

`DD_TRACER_FOLDER` (Required)
: Chemin vers le dossier où se trouve le traceur Java téléchargé.

`JAVA_TOOL_OPTIONS=-javaagent:$DD_TRACER_FOLDER/dd-java-agent.jar` (obligatoire)
: Injecte le traceur dans les JVM qui exécutent vos tests.

Pour en savoir plus sur les tags réservés `service` et `env`, consultez la section [Tagging de service unifié][8]

Exécutez vos tests comme vous le feriez en temps normal :

{{% /tab %}}
{{< /tabs >}}

## Dépannage de la solution Browser

Les valeurs de configuration par défaut fonctionnent bien dans la plupart des cas.

Cependant, s'il est besoin de personnaliser le comportement du traceur, vous pouvez utiliser les options de [configuration du traceur Datadog][3].

### Recueillir les métadonnées Git

{{% ci-git-metadata %}}

## Extensions

La bibliothèque [dd-trace-api][4] expose un ensemble d'API qui peuvent être utilisées pour étendre la fonctionnalité du traceur au moyen de la programmation.
Pour utiliser les extensions décrites ci-dessous, ajoutez cette bibliothèque  à votre projet en tant que dépendance compile-time.

### Ajouter des tags personnalisés à des tests

Vous pouvez ajouter des tags personnalisés à vos tests à l'aide de la span actuellement active :

```java
// Dans votre test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test_owner", "my_team");
}
// Le test se poursuit normalement
// ...
```

Pour créer des filtres ou des champs `group by` pour ces tags, vous devez d'abord créer des facettes.

Pour en savoir plus sur l'ajout de tags, consultez la rubrique relative à l'[ajout de tags][5] de la documentation relative à l'instrumentation personnalisée Java.

### Ajouter des métriques custom aux tests

Tout comme pour les tags, vous pouvez ajouter des métriques custom à vos tests à l'aide de la span active :

```java
// dans votre test
final Span span = GlobalTracer.get().activeSpan();
if (span != null) {
  span.setTag("test.memory.usage", 1e8);
}
// le test se poursuit normalement
// ...
```

Pour en savoir plus sur les métriques custom, consultez le [guide sur l'ajout de métriques custom][6].

### Utilisation de l'API de test manuel

Si vous utilisez l'un des frameworks de test pris en charge, le traceur Java instrumente vos tests automatiquement et envoie les résultats au backend Datadog.

Si vous utilisez un framework qui n'est pas pris en charge ou une solution de test ad-hoc, vous pouvez exploiter l'API de test manuel, qui transmet également les résultats de test au backend.

#### Modèle de domaine

L'API repose sur quatre concepts, à savoir la session de test, le module de test, la collection de tests et les tests.

##### Session de test

Une session de test représente un build de projet, qui correspond généralement à l'exécution d'une commande de test générée par un utilisateur ou par un script CI.

Pour commencer une session de test, appelez `datadog.trace.api.civisibility.CIVisibility#startSession` et passez le nom du projet et celui du framework de test que vous avez utilisé.

Une fois tous vos tests terminés, appelez `datadog.trace.api.civisibility.DDTestSession#end`, afin de forcer la bibliothèque à envoyer tous les résultats de test restants au backend.

##### Module de test

Un module de test représente une plus petite unité de travail au sein d'un build de projet, qui correspond habituellement à un module de projet. Par exemple, un sous-module Maven ou un sous-projet Gradle.

Pour lancer un module de test, appelez `datadog.trace.api.civisibility.DDTestSession#testModuleStart` et passez le nom du module.

Une fois le build et le test du module terminés, appelez `datadog.trace.api.civisibility.DDTestModule#end`.

##### Collection de tests

Une collection de tests correspond à un ensemble de tests qui partagent des caractéristiques communes, comme le processus d'initialisation et de nettoyage. Certaines variables peuvent également être utilisées par plusieurs tests d'une collection.
Une collection correspond habituellement à une classe Java contenant des cas de test.

Pour créer des collections de tests dans un module de test, appelez `datadog.trace.api.civisibility.DDTestModule#testSuiteStart` et passez le nom de la collection de tests.

Appelez `datadog.trace.api.civisibility.DDTestSuite#end` lorsque l'exécution de tous les tests d'une collection est terminée.

##### Test

Un test représente un simple cas de test exécuté dans le cadre d'une collection de tests.
Cela correspond généralement à une méthode qui contient une logique de test.

Pour créer des tests dans une collection, appelez `datadog.trace.api.civisibility.DDTestSuite#testStart` et passez le nom du test.

Appelez `datadog.trace.api.civisibility.DDTest#end` lorsque l'exécution d'un test est terminée.

#### Exemple de code

Le code suivant permet d'utiliser les fonctionnalités de base de l'API :

```java
package com.datadog.civisibility.example;

import datadog.trace.api.civisibility.CIVisibility;
import datadog.trace.api.civisibility.DDTest;
import datadog.trace.api.civisibility.DDTestModule;
import datadog.trace.api.civisibility.DDTestSession;
import datadog.trace.api.civisibility.DDTestSuite;
import java.lang.reflect.Method;

// les arguments null dans les appels ci-dessous sont des valeurs startTime/endTime facultatives :
// lorsqu'aucune valeur n'est spécifiée, l'heure actuelle est utilisée
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
            ddTest.setErrorInfo(e); // passez des informations d'erreur pour désigner le cas de test comme ayant échoué
        } finally {
            ddTest.end(null);
        }
    }

    private static void myTestCase() throws Exception {
        // exécutez une logique de test
    }

    private static void runSecondTestSuite(DDTestModule testModule) {
        DDTestSuite secondTestSuite = testModule.testSuiteStart("my-second-suite", ManualTest.class, null);
        secondTestSuite.setSkipReason("cette collection de tests est ignorée"); // passez une raison d'ignorer pour marquer la collection de tests comme ayant été ignorée
        secondTestSuite.end(null);
    }
}
```

Appelez toujours ``datadog.trace.api.civisibility.DDTestSession#end`` à la fin de votre code, afin que toutes les informations sur les tests soient transmises à Datadog.

## Aide

### Les tests n'apparaissent pas dans Datadog après l'activation de CI  Visibility dans le traceur

Vérifiez que le traceur est injecté dans votre processus de build. Passez en revue les logs de votre build. Si l'injection a fonctionné, vous devriez voir une ligne avec le texte `DATADOG TRACER CONFIGURATION`. Si vous ne trouvez pas cette ligne, vérifiez que les variables d'environnement utilisées pour injecter et configurer le traceur sont disponibles dans le processus de build. Il arrive régulièrement que les variables soient définies dans une étape de build, mais que les tests soient exécutés dans une autre étape de build. Si les variables ne sont pas propagées entre les étapes de build, cette approche n'est pas valide.

Vérifiez que vous utilisez la dernière version du traceur.

Vérifiez que votre système de build et votre framework de test sont pris en charge par CI Visibility. Consultez la liste des [systèmes de build et des frameworks de test pris en charge](#compatibilite).

Vérifiez que la propriété `dd.civisibility.enabled` (ou la variable d'environnement `DD_CIVISIBILITY_ENABLED`) est définie sur `true` dans les arguments du traceur.

Recherchez dans la sortie du build d'éventuelles erreurs indiquant des problèmes de configuration du traceur, tels qu'une variable d'environnement `DD_API_KEY` non définie.

### Les tests ou la compilation du code source échouent lors de la génération d'un projet avec le traceur associé

Par défaut, CI Visibility exécute une compilation du code Java avec un plug-in de compilateur associé.

Le plug-in est facultatif, étant donné qu'il sert seulement à améliorer les performances.

Selon la configuration de build, l'ajout du plug-in peut parfois perturber le processus de compilation.

Si le plug-in interfère avec le build, désactivez-le en ajoutant `dd.civisibility.compiler.plugin.auto.configuration.enabled=false` à la liste d'arguments `-javaagent` (ou en définissant la variable d'environnement `DD_CIVISIBILITY_COMPILER_PLUGIN_AUTO_CONFIGURATION_ENABLED=false`).

### Les tests échouent lors de la génération d'un projet avec le traceur associé

Dans certains cas, le fait d'associer le traceur peut faire échouer des tests, en particulier s'ils exécutent des assertions sur l'état interne de la JVM ou des instances de classes de bibliothèques tierces.

Même s'il est plus adapté dans ces cas-là de mettre à jour les tests, il existe également une option plus rapide qui consiste à désactiver les intégrations de la bibliothèque tierce du traceur.

Les intégrations apportent des statistiques supplémentaires sur le déroulement du code testé et sont particulièrement utiles dans des tests d'intégration, pour surveiller des éléments tels que des requêtes HTTP ou des appels de base de données.
Elles sont activées par défaut.

Pour désactiver une intégration spécifique, référez-vous au tableau de [compatibilité du traceur Datadog][7] afin d'obtenir les noms des propriétés de configuration adéquats.
Par exemple, pour désactiver l'intégration de requête pour le client `OkHttp3`, ajoutez `dd.integration.okhttp-3.enabled=false` à la liste d'arguments `-javaagent`.

Pour désactiver toutes les intégrations, ajoutez `dd.trace.enabled=false` à la liste d'arguments `-javaagent` (ou définissez la variable d'environnement `DD_TRACE_ENABLED=false`).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[8]: https://app.datadoghq.com/ci/setup/test?language=java
[1]: #using-manual-testing-api
[2]: ?tab=other#running-your-tests
[3]: /fr/tracing/trace_collection/library_config/java/?tab=containers#configuration
[4]: https://mvnrepository.com/artifact/com.datadoghq/dd-trace-api
[5]: /fr/tracing/trace_collection/custom_instrumentation/java?tab=locally#adding-tags
[6]: /fr/continuous_integration/guides/add_custom_metrics/?tab=java
[7]: /fr/tracing/trace_collection/compatibility/java#integrations
[8]: /fr/getting_started/tagging/unified_service_tagging