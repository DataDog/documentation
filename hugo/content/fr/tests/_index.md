---
aliases:
- /fr/continuous_integration/explore_tests/
- /fr/continuous_integration/guides/test_configurations/
- /fr/continuous_integration/integrate_tests/
- /fr/continuous_integration/tests/
- /fr/tests/repositories/
- /fr/tests/search/
cascade:
  algolia:
    rank: 70
    tags:
    - ci test
    - ci tests
    - test optimization
    - test visibility
    - failed test
    - flaky test
    - supported features
  site_support_id: test_optimization
further_reading:
- link: /monitors/types/ci/
  tag: Documentation
  text: En savoir plus sur les moniteurs de tests CI
- link: /tests/flaky_test_management/
  tag: Documentation
  text: En savoir plus sur la Gestion des tests irréguliers
- link: /tests/browser_tests/
  tag: Documentation
  text: Apprenez à instrumenter vos tests de navigateur avec RUM
- link: /tests/troubleshooting/
  tag: Documentation
  text: Apprenez à résoudre les problèmes liés à Test Optimization
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centre d'apprentissage
  text: Démarrage avec Test Optimization
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Surveillez vos pipelines CI et vos tests avec Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Résolvez les problèmes de tests de bout en bout avec CI Visibility et RUM
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez les problèmes plus rapidement avec l'intégration GitLab Source Code
    dans Datadog
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: Blog
  text: Implémentez des contrôles de qualité des données dbt avec dbt-expectations
- link: https://www.datadoghq.com/blog/platform-engineering-metrics/
  tag: Blog
  text: Métriques de succès pour les équipes d'ingénierie de plateforme
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
title: Test Optimization dans Datadog
---
{{< callout url=# btn_hidden="true" header="Test Optimization fait partie de CI/CD Optimization.">}}CI/CD Optimization combine CI Visibility et Test Optimization dans une interface unifiée. Cette page couvre Test Optimization ; pour les fonctionnalités partagées avec CI Visibility, consultez [CI/CD Optimization][1].

[1]: /fr/cicd/
{{< /callout >}}

{{< learning-center-callout header="Essayez Getting Started with Test Optimization dans le Learning Center." btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  Apprenez à accélérer vos pipelines CI en configurant le monitoring des tests, en identifiant les tests instables et en utilisant Test Impact Analysis pour n'exécuter que les tests pertinents.
{{< /learning-center-callout >}}

## Présentation {#overview}

[Test Optimization][1] offre une vue centrée sur les tests pour évaluer la santé de votre CI en affichant des métriques importantes et les résultats de vos tests. Il peut vous aider à étudier les problèmes de performance et les échecs de tests les plus pertinents pour votre travail, en vous concentrant sur le code dont vous êtes responsable, plutôt que sur les pipelines qui exécutent vos tests.

## Configuration {#setup}

Sélectionnez une option pour configurer Test Optimization dans Datadog :

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="python" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="Téléversez des tests JUnit vers Datadog" >}}
{{< /card-grid >}}

Si vous utilisez Bazel pour exécuter des tests Go, Java ou Python, utilisez les [règles Bazel pour Test Optimization][10] de Datadog.

En plus des tests, Test Optimization offre une visibilité sur l'ensemble de la phase de test de votre projet.

### Fonctionnalités prises en charge {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM&#8209;based |       JavaScript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Mesures précises de l'heure et des durées" >}}Résolution en microsecondes pour l'heure de début et la durée des tests.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Traces distribuées sur les tests d'intégration" >}}Les tests qui effectuent des appels vers des services externes instrumentés avec Datadog affichent la trace distribuée complète dans leurs détails de test.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Rapports basés sur l'Agent" >}}Possibilité de transmettre des informations sur les tests via le Datadog Agent.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Rapports Agentless" >}}Possibilité de transmettre des informations sur les tests sans le Datadog Agent.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Visibilité au niveau de la collection de tests" >}}Visibilité sur l'ensemble du processus de test, y compris la session, le module, les collections de tests et les tests.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manuelle" >}}Possibilité de créer par programmation des événements CI Visibility pour les frameworks de test qui ne sont pas pris en charge par l'instrumentation automatique de Datadog.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Codeowner par test" >}}Détection automatique du propriétaire d'un fichier de test basée sur le fichier CODEOWNERS.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (partiellement)  |
| {{< ci-details title="Début/fin du code source" >}}Rapport automatique des lignes de début et de fin d'un test.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (début uniquement) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (début uniquement) |
| {{< ci-details title="Informations CI et git" >}}Collecte automatique des métadonnées de l'environnement CI et git, telles que le fournisseur CI, le SHA du commit git ou l'URL du pipeline.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Téléversement des métadonnées git" >}}Téléversement automatique des informations sur l'arborescence git utilisées pour <a href="/tests/test_impact_analysis">Test Impact Analysis</a>.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Test Impact Analysis *" >}}Possibilité d'activer <a href="/tests/test_impact_analysis">Test Impact Analysis</a>, qui évite intelligemment l'exécution de certains tests en fonction de la couverture de code et des métadonnées git.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Prise en charge de la couverture de code" >}}Possibilité de transmettre des métriques de <a href="/tests/code_coverage">couverture totale du code</a>.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (méthode manuelle)   |
| {{< ci-details title="Prise en charge des tests de benchmark" >}}Détection automatique des statistiques de performance des tests de benchmark.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Tests paramétrés" >}}Détection automatique des tests paramétrés.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Détection précoce des tests instables *" >}}<a href="/tests/flaky_test_management/early_flake_detection">Relance automatique des nouveaux tests</a> pour détecter leur instabilité.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Relances automatiques des tests *" >}}<a href="/tests/flaky_test_management/auto_test_retries">Relance automatique des tests échoués</a> jusqu'à N fois pour éviter que l'instabilité des tests ne fasse échouer le build.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Rejeu des tests échoués *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Accès aux informations sur les variables locales</a> lors des nouvelles exécutions des tests échoués.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Intégration RUM Selenium" >}}<a href="/tests/browser_tests">Association automatique des sessions de navigateur aux cas de test</a> lors du test d'applications dotées de l'instrumentation RUM.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* La fonctionnalité n'est pas activée par défaut et doit être activée dans [{{< ui >}}CI/CD Optimization settings{{< /ui >}}][2].

## Configurations par défaut {#default-configurations}

Les tests évaluent le comportement du code pour un ensemble de conditions données. Certaines de ces conditions sont liées à l'environnement dans lequel les tests sont exécutés, comme le système d'exploitation ou l'environnement d'exécution utilisé. Le même code exécuté dans des conditions différentes peut se comporter différemment ; les développeurs configurent donc généralement leurs tests pour qu'ils s'exécutent dans différents ensembles de conditions et valident que le comportement est celui attendu pour chacun d'eux. Cet ensemble spécifique de conditions est appelé une *configuration*.

Dans Test Optimization, un test avec plusieurs configurations est traité comme plusieurs tests, avec un test distinct pour chaque configuration. Dans le cas où l'une des configurations échoue mais que les autres réussissent, seule cette combinaison spécifique de test et de configuration est marquée comme ayant échoué.

Par exemple, supposons que vous testiez un seul commit et que vous ayez un test Python qui s'exécute avec trois versions différentes de Python. Si le test échoue pour l'une de ces versions, ce test spécifique est marqué comme ayant échoué, tandis que les autres versions sont marquées comme ayant réussi. Si vous relancez les tests sur le même commit et que le test réussit désormais pour les trois versions de Python, le test avec la version qui avait précédemment échoué est maintenant marqué à la fois comme réussi et instable, tandis que les deux autres versions restent marquées comme réussies, sans aucune instabilité détectée.

### Attributs de configuration de test {#test-configuration-attributes}

Lorsque vous exécutez vos tests avec Test Optimization, la bibliothèque détecte et signale des informations sur l'environnement dans lequel les tests sont exécutés sous forme de tags de test. Par exemple, le nom du système d'exploitation, tel que `Windows` ou `Linux`, et l'architecture de la plateforme, telle que `arm64` ou `x86_64`, sont ajoutés en tant que tags à chaque test. Ces valeurs sont affichées sur les pages de présentation des commits et des branches lorsqu'un test échoue ou est instable pour une configuration donnée, mais pas pour les autres.

Les tags suivants sont automatiquement collectés pour identifier les configurations de test, et certains peuvent ne s'appliquer qu'à des plateformes spécifiques :

| Nom du tag               | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Nom du système d'exploitation sur lequel les tests sont exécutés.           |
| `os.family`            | Famille du système d'exploitation sur lequel les tests sont exécutés.         |
| `os.version`           | Version du système d'exploitation sur lequel les tests sont exécutés.        |
| `os.architecture`      | Architecture du système d'exploitation sur lequel les tests sont exécutés.   |
| `runtime.name`         | Nom de l'environnement d'exécution des tests.                       |
| `runtime.version`      | Version de l'environnement d'exécution.                                  |
| `runtime.vendor`       | Fournisseur de l'environnement d'exécution dans lequel les tests sont exécutés. |
| `runtime.architecture` | Architecture de l'environnement d'exécution des tests.               |
| `device.model`         | Le modèle d'appareil exécutant les tests.                             |
| `device.name`          | Nom de l'appareil.                                             |
| `ui.appearance`        | Style de l'interface utilisateur.                                           |
| `ui.orientation`       | Orientation d'affichage de l'interface utilisateur.                                   |
| `ui.localization`      | Langue de l'application.                                    |

### Configurations de test paramétrées {#parameterized-test-configurations}

Lorsque vous exécutez des tests paramétrés, la bibliothèque détecte et signale des informations sur les paramètres utilisés. Les paramètres font partie de la configuration de test ; ainsi, le même cas de test exécuté avec des paramètres différents est considéré comme deux tests distincts dans Test Optimization.

Si un paramètre de test est non déterministe et possède une valeur différente à chaque exécution d'un test, chaque exécution de test est considérée comme un nouveau test dans Test Optimization. Par conséquent, certaines fonctionnalités du produit peuvent ne pas fonctionner correctement pour de tels tests : historique des exécutions, détection de l'instabilité, Test Impact Analysis et autres.

Voici quelques exemples de paramètres de test non déterministes :

- date actuelle
- une valeur aléatoire
- une valeur qui dépend de l'environnement d'exécution du test (telle qu'un chemin de fichier absolu ou le nom d'utilisateur actuel)
- une valeur qui n'a pas de représentation sous forme de chaîne déterministe (par exemple, une instance d'une classe Java dont la méthode `toString()` n'est pas remplacée)

Évitez d'utiliser des paramètres de test non déterministes. Si cela n'est pas possible, certains frameworks de test permettent de spécifier une représentation sous forme de chaîne déterministe pour un paramètre non déterministe (par exemple, en redéfinissant le nom d'affichage du paramètre).

## Configurations personnalisées {#custom-configurations}

Il existe certaines configurations qui ne peuvent pas être directement identifiées et signalées automatiquement, car elles peuvent dépendre de variables d'environnement, d'arguments d'exécution de test ou d'autres méthodes utilisées par les développeurs. Pour ces cas, vous devez fournir les détails de configuration à la bibliothèque afin que Test Optimization puisse les identifier correctement.

Définissez ces tags dans la variable d'environnement `DD_TAGS` en utilisant le préfixe `test.configuration`.

Par exemple, les tags de configuration de test suivants identifient une configuration de test où le temps de réponse du disque est lent et la mémoire disponible est faible :

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Tous les tags avec le préfixe `test.configuration` sont utilisés comme tags de configuration, en plus de ceux collectés automatiquement.

Remarque : les tags `test.configuration` imbriqués, tels que `test.configuration.cpu.memory`, ne sont pas pris en charge.

Afin de filtrer en utilisant ces tags de configuration, [vous devez créer des facettes pour ces tags][3].

## Améliorez votre workflow de développement {#enhance-your-developer-workflow}

{{< whatsnext desc="Intégrez Test Optimization avec des outils pour rapporter les données de couverture de code, améliorez les tests de navigateur avec RUM et accédez à des insights sur toutes les plateformes en rationalisant l'identification et la résolution des problèmes dans votre cycle de développement." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Améliorer vos workflows de développement avec Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Découvrez Code Coverage{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumentez les tests de navigateur Cypress avec Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Tests Swift d'instruments avec RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Utilisez les données des tests CI {#use-ci-tests-data}

{{% ci-information-collected %}}

Lors de la création d'un [dashboard][4] ou d'un [notebook][5], vous pouvez utiliser les données de tests CI dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez les [Dashboards][6] et la [documentation sur les Notebooks][7].

## Alertez sur les données de test {#alert-on-test-data}

Lorsque vous évaluez des tests échoués ou instables, ou les performances d'un test CI, vous pouvez exporter votre requête de recherche dans le [Test Optimization Explorer][8] vers un [CI Test monitor][9] en cliquant sur le bouton {{< ui >}}Export{{< /ui >}}.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[3]: /fr/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /fr/dashboards
[7]: /fr/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /fr/monitors/types/ci/
[10]: /fr/tests/setup/bazel/