---
aliases:
- /fr/continuous_integration/explore_tests/
- /fr/continuous_integration/guides/test_configurations/
- /fr/continuous_integration/integrate_tests/
- /fr/continuous_integration/tests/
cascade:
  site_support_id: test_optimization
  algolia:
    rank: 70
    tags:
    - test ci
    - test ci
    - visibilité des tests
    - test échoué
    - flaky test
    - fonctionnalités prises en charge
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de la livraison de logiciels (connexion à
    l'application requise).
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Surveiller vos pipelines CI et vos tests avec Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Dépannage de tests de bout en bout avec CI Visibility et RUM
- link: /monitors/types/ci/
  tag: Documentation
  text: En savoir plus sur les monitors de test CI
- link: /tests/guides/flaky_test_management/
  tag: Documentation
  text: En savoir plus sur la Gestion des tests irréguliers
- link: /tests/browser_tests/
  tag: Documentation
  text: Découvrez comment instrumenter vos tests Browser avec RUM
- link: /tests/troubleshooting/
  tag: Documentation
  text: Découvrez comment dépanner Test Visibility
title: Test Visibility dans Datadog
---

## Section Overview

[Test Visibility][1] présente les métriques et les résultats importants de vos tests. Ces données sur les tests vous permettent de visualiser l'état de santé global de votre intégration continue. Cette page vous aide à étudier les problèmes de performance et les échecs de tests. Pour garantir la pertinence des données affichées, Datadog tient principalement compte du code auquel vous avez contribué, et accorde une importance moindre aux pipelines que vous gérez (même si les tests y sont exécutés).

## Configuration

Sélectionnez une option pour configurer Test Visibility dans Datadog :

{{< partial name="continuous_integration/ci-tests-setup.html" >}}

</br>

En plus des tests, Test Visibility offre une visibilité sur l'ensemble de la phase de test de votre projet.

### Fonctionnalités prises en charge

|                                                                                                                                                                                                                  |   .NET    | Basé sur Java |       Javascript       |  Python   |   Ruby    |   Swift   |       JUnit Xml        |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Accurate time/durations results" >}}Résolution en microsecondes dans les heures du début et la durée des tests.{{< /ci-details >}}                                                                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Traces distribuées des tests d'intégration" >}}Les tests qui appellent des services externes instrumentés avec Datadog affichent la trace distribuée complète dans les détails de leurs tests.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Signalement basé sur l'Agent" >}}Fonctionnalité permettant de signaler des informations de test via l'Agent Datadog.{{< /ci-details >}}                                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Signalement basé sur l'Agent" >}}Fonctionnalité permettant de signaler des informations de test sans l'Agent Datadog.{{< /ci-details >}}                                                                                   | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Visibilité au niveau de la suite de test" >}}Visibilité sur la totalité du processus de test, y compris la session, le module, les suites et les tests.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manuelle" >}}Permet de créer de façon programmée des événements CI Visibility pour tester les cadres d'application qui ne sont pas pris en charge par l'instrumentation automatique de Datadog.{{< /ci-details >}}               | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Propriétaire du code par test" >}}Détection automatique du propriétaire d'un fichier de test d'après le fichier CODEOWNERS.{{< /ci-details >}}                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (partiellement)  |
| {{< ci-details title="Début/fin du code source" >}}Signalement automatique des lignes de début et de fin d'un test.{{< /ci-details >}}                                                                                        | {{< X >}} |       {{< X >}}      | {{< X >}} (début uniquement) | {{< X >}} | {{< X >}} (début uniquement)| {{< X >}} | {{< X >}} (début uniquement) |
| {{< ci-details title="Informations CI et git" >}}Collecte automatique des métadonnées des environnements git et CI, comme le fournisseur de CI, le SHA du commit git ou l'URL du pipeline.{{< /ci-details >}}                                       | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Importation des métadonnées Git" >}}L'importation automatique des informations sur l'arborescence git utilisées pour Intelligent Test Runner.{{< /ci-details >}}                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Intelligent Test Runner *" >}}Permet d'activer Intelligent Test Runner, qui ignore les tests de façon intelligente en fonction de la couverture du code et des métadonnées git.{{< /ci-details >}}                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Prise en charge de la couverture du code" >}}Permet de rapporter le total des métriques de couverture du code.{{< /ci-details >}}                                                                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |   {{< X >}} (manuel)   |
| {{< ci-details title="Prise en charge des tests de benchmarks" >}}Détection automatique des statistiques relatives aux performances pour les tests de benchmarks.{{< /ci-details >}}                                                                          | {{< X >}} |                      |                        | {{< X >}} |           | {{< X >}} |                        |
| {{< ci-details title="Paramétrage des tests" >}}Détection automatique des tests paramétrés.{{< /ci-details >}}                                                                                                     | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Détection en amont des irrégularités *" >}}Relancez automatiquement des nouveaux tests pour détecter les irrégularités.{{< /ci-details >}}                                                                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} |           |                        |
| {{< ci-details title="Nouvelles tentative automatiques de tests *" >}}Relancez automatiquement des tests échoués jusqu'à N fois, afin d'éviter d'échouer le build en raison d'irrégularités du test.{{< /ci-details >}}                                                |           |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} |           |                        |
| {{< ci-details title="Intégration Selenium/RUM" >}}Associez automatiquement les sessions du navigateur aux scénarios de tests lorsque vous testez les applications instrumentées par le RUM.{{< /ci-details >}}                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           | {{< X >}} |           |                        |

\* La fonctionnalité nécessite votre consentement. Elle doit être activée sur la [page **Test Service Settings**][2].

## Configurations par défaut

Les tests permettent d'évaluer le comportement du code avec un ensemble de conditions données. Certaines de ces conditions sont liées à l'environnement d'exécution des tests, comme le système d'exploitation ou le runtime utilisé. Le même code exécuté dans des conditions différentes peut avoir un comportement différent. C'est la raison pour laquelle les développeurs configurent généralement leurs tests de façon à les exécuter dans des conditions différentes et valider le comportement attendu pour chacun d'entre eux. Cet ensemble de conditions spécifiques est appelé *configuration*.

Dans Test Visibility, un test avec plusieurs configurations est traité comme plusieurs tests, avec un test correspondant à chaque configuration. Si l'une des configurations échoue mais les autres réussissent, seule cette combinaison test/configuration sera marquée comme ayant échoué

Imaginons par exemple que vous testiez un seul commit et que vous possédiez un test Python qui s'exécute dans trois versions différentes de Python. Si le test échoue pour l'une de ces versions, ce test spécifique est marqué comme ayant échoué, tandis que les autres versions sont marquées comme ayant réussi. Si vous relancez les tests avec le même commit et si le test des trois versions de Python réussit, le test effectué avec la version qui avait échoué est désormais marqué comme ayant réussi et ayant des irrégularités, tandis que les deux autres versions restent réussies, sans détection d'irrégularités.

### Attributs de configuration de test

Lorsque vous exécutez vos tests avec Test Visibility, la bibliothèque détecte et signale les informations relatives à l'environnement dans lequel les tests sont exécutés sous forme de tags de tests. Par exemple, le nom du système d'exploitation, comme `Windows` ou `Linux`, ainsi que l'architecture de la plateforme, comme `arm64` ou `x86_64`, sont ajoutés sous forme de tags à chaque test. Ces valeurs sont affichées dans le commit et sur les pages des aperçus des branches lorsqu'un test échoue ou est défaillant pour une configuration spécifique, mais pas pour les autres.

Les tags suivants sont collectés automatiquement pour identifier les configurations de test, et certains peuvent ne s'appliquer qu'à des plates-formes spécifiques :

| Nom du tag               | Rôle                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Le nom du système d'exploitation sur lequel les tests sont exécutés.           |
| `os.family`            | La famille du système d'exploitation sur lequel les tests sont exécutés.         |
| `os.version`           | La version du système d'exploitation sur lequel les tests sont exécutés.        |
| `os.architecture`      | L'architecture du système d'exploitation sur lequel les tests sont exécutés.   |
| `runtime.name`         | Le nom du système de runtime pour les tests.                       |
| `runtime.version`      | La version du système de runtime.                                  |
| `runtime.vendor`       | Le fournisseur qui a créé la plateforme de runtime dans laquelle les tests sont exécutés. |
| `runtime.architecture` | L'architecture du système de runtime pour les tests.               |
| `device.model`         | Le modèle de l'appareil qui exécute les tests.                             |
| `device.name`          | Le nom de l'appareil.                                             |
| `ui.appearance`        | Style de l'interface utilisateur.                                           |
| `ui.orientation`       | L'orientation de l'IU de l'exécution.                                   |
| `ui.localization`      | La langue de l'application                                    |

### Configurations de tests paramétrés

Lorsque vous exécutez des tests paramétrés, la bibliothèque détecte et signale les informations sur les paramètres utilisés. Les paramètres font partie d'une configuration de test, ce qui signifie que les mêmes scénarios de tests exécutés avec des paramètres différents sont considérés comme étant deux tests différents dans Test Visibility.

Si un paramètre de test n'est pas déterministe et possède une valeur différente à chaque exécution de test, alors chaque exécution de test est considérée comme étant un nouveau test dans Test Visibility. Ainsi, certaines fonctionnalités peuvent ne pas fonctionner correctement pour ces tests : historique des exécutions, détection des irrégularités, Intelligent Test Runner et d'autres encore.

Voici des exemples de paramètres de tests non déterministes :

- date actuelle
- une valeur aléatoire
- une valeur qui dépend de l'environnement dans lequel le test est exécuté (comme un chemin de fichier absolu ou le nom d'utilisateur actuel)
- une valeur qui ne possède pas de représentation de chaîne déterministe (par exemple, une instance d'une classe java dont la méthode `toString()` n'est pas remplacée)

Évitez d'utiliser des paramètres de test non déterministes. Si ce n'est pas possible, certains cadres d'application de tests permettent de spécifier une représentation de chaîne déterministe pour un paramètre non déterministe (comme le remplacement du nom d'affichage du paramètre).

## Configurations personnalisées

Certaines configurations ne peuvent pas être directement identifiées et sont signalées automatiquement, car elles dépendent des variables d'environnement, des arguments d'exécution de tests ou d'autres approches utilisées par les développeurs. Dans ces situations, vous devez fournir les détails de la configuration dans la bibliothèque, afin que Test Visibility puisse les identifier correctement.

Définissez ces tags comme faisant partie de la variable d'environnement `DD_TAGS` à l'aide du préfixe `test.configuration`.

Par exemple, les tags de configuration de tests identifient une configuration de test où le délai de réponse du disque est long et où peu de mémoire est disponible :

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Tous les tags possédant le préfixe `test.configuration` sont utilisés comme étant des tags de configuration, en plus de ceux qui ont été collectés automatiquement.

Remarque : les tags `test.configuration` imbriqués, comme `test.configuration.cpu.memory`, ne sont pas pris en charge.

Pour appliquer un filtre avec ces tags de configuration, [vous devez créer des facettes pour ces tags][3].

## Améliorez vos processus de développement

{{< whatsnext desc="Intégrez Test Visibility avec des outils permettant de rapporter des données de couverture du code, d'améliorer les tests de navigateurs avec le RUM et d'accéder aux informations sur toutes les plateformes en simplifiant l'identification et la résolution des problèmes dans vos cycles de développement." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Améliorer les processus de développement avec Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}En savoir plus sur la couverture de code{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumenter Cypress Browser Tests avec le RUM Browser{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Instrumenter Swift Tests avec le RUM Browser{{< /nextlink >}}
{{< /whatsnext >}}

## Utiliser des données de tests CI

{{% ci-information-collected %}}

Lorsque vous créez un [dashboard][4] ou un [notebook][5], vous pouvez utiliser des données de tests CI dans votre requête de recherche, qui modifient les options des widgets de visualisation. Pour en savoir plus, consultez la documentation relative aux  [Dashboards][6] et aux [Notebooks][7].

## Alerte sur les données de tests

Lorsque vous évaluez des tests échoués ou irréguliers, ou les performances d'un test CI, vous pouvez exporter votre requête de recherche dans le [Test Visibility Explorer][8] vers un [monitor CI Test][9] en cliquant sur l'option **Export**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test-services
[2]: https://app.datadoghq.com/ci/settings/test-service
[3]: /fr/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /fr/dashboards
[7]: /fr/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /fr/monitors/types/ci/