---
aliases:
- /fr/continuous_integration/explore_tests/
- /fr/continuous_integration/guides/test_configurations/
- /fr/continuous_integration/integrate_tests/
- /fr/continuous_integration/tests/
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
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Release Notes
  text: Découvrez les dernières versions de livraison de logiciels ! (Connexion à
    l'application requise)
- link: https://www.datadoghq.com/blog/datadog-ci-visibility/
  tag: Blog
  text: Surveiller vos pipelines CI et vos tests avec Datadog CI Visibility
- link: https://www.datadoghq.com/blog/ci-test-visibility-with-rum/
  tag: Blog
  text: Dépannage de tests de bout en bout avec CI Visibility et RUM
- link: /monitors/types/ci/
  tag: Documentation
  text: En savoir plus sur les monitors de test CI
- link: /tests/flaky_test_management/
  tag: Documentation
  text: En savoir plus sur la Gestion des tests irréguliers
- link: /tests/browser_tests/
  tag: Documentation
  text: Découvrez comment instrumenter vos tests Browser avec RUM
- link: /tests/troubleshooting/
  tag: Documentation
  text: Apprenez à résoudre les problèmes d'optimisation des tests
- link: https://www.datadoghq.com/blog/gitlab-source-code-integration
  tag: Blog
  text: Résolvez plus rapidement avec l'intégration du code source GitLab dans Datadog
title: Optimisation des tests dans Datadog
---

## Présentation

[Optimisation des tests][1] fournit une vue axée sur les tests de la santé de votre CI en affichant des métriques et des résultats importants de vos tests. Cela peut vous aider à enquêter sur les problèmes de performance et les échecs de tests qui sont les plus pertinents pour votre travail, en se concentrant sur le code dont vous êtes responsable, plutôt que sur les pipelines qui exécutent vos tests.

## Implémentation

Sélectionnez une option pour configurer l'optimisation des tests dans Datadog :

...

</br>

En plus des tests, l'optimisation des tests offre une visibilité sur l'ensemble de la phase de test de votre projet.

### Fonctionnalités prises en charge

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM‑basé |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Accurate time/durations results" >}}Résolution en microsecondes dans le temps de début et la durée du test.{{< /ci-details >}}                                                                                             | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Distributed traces on integration tests" >}}Les tests qui effectuent des appels à des services externes instrumentés avec Datadog montrent la trace distribuée complète dans les détails de leur test.{{< /ci-details >}}                  | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Agent-based reporting" >}}Capacité à rapporter des informations de test via l'Agent Datadog.{{< /ci-details >}}                                                                                                  | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Agentless reporting" >}}Capacité à rapporter des informations de test sans l'Agent Datadog.{{< /ci-details >}}                                                                                                    | ... |       ...      |       ...        | ... | ...             | ... | ... |       ...        |
| {{< ci-details title="Test suite level visibility" >}}Visibilité sur l'ensemble du processus de test, y compris la session, le module, les suites et les tests.{{< /ci-details >}}                                                                 | ... |       ...      |       ...        | ... | ...             | ... | ... |       ...        |
| {{< ci-details title="Manual API" >}}Capacité à créer de manière programmatique des événements de visibilité CI pour des frameworks de test qui ne sont pas pris en charge par l'instrumentation automatique de Datadog.{{< /ci-details >}}                                | ... |       ...      |       ...        | ... | ...             |            |           |                        |
| {{< ci-details title="Codeowner by test" >}}Détection automatique du propriétaire d'un fichier de test basé sur le fichier CODEOWNERS.{{< /ci-details >}}                                                                                      | ... |       ...      |       ...        | ... | ...             | ... | ... | {{< X >}} (partiellement)  |
| {{< ci-details title="Source code start/end" >}}Rapport automatique des lignes de début et de fin d'un test.{{< /ci-details >}}                                                                                                         | ... |       ...      | {{< X >}} (seulement le début) | ... | {{< X >}} (seulement le début)| ... | ... | {{< X >}} (seulement le début) |
| {{< ci-details title="CI and git info" >}}Collecte automatique des métadonnées de l'environnement git et CI, telles que le fournisseur CI, le SHA de commit git ou l'URL du pipeline.{{< /ci-details >}}                                                        | ... |       ...      |       ...        | ... | ...             | ... | ... |       ...        |
| {{< ci-details title="Git metadata upload" >}}Téléchargement automatique des informations de l'arbre git utilisées pour <a href="/tests/test_impact_analysis">Analyse d'impact des tests</a>.{{< /ci-details >}}                                                | ... |       ...      |       ...        | ... | ...             | ... | ... |       ...        |
| {{< ci-details title="Test Impact Analysis *" >}}Capacité d'activer <a href="/tests/test_impact_analysis">Analyse d'impact des tests</a>, qui saute intelligemment des tests en fonction de la couverture de code et des métadonnées git.{{< /ci-details >}} | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Code coverage support" >}}Capacité à rapporter des métriques de <a href="/tests/code_coverage">couverture de code totale</a>.{{< /ci-details >}}                                                                              | ... |       ...      |       ...        | ... | ...             | ... | ... |   Méthode manuelle   |
| {{< ci-details title="Benchmark tests support" >}}Détection automatique des statistiques de performance pour les tests de référence.{{< /ci-details >}}                                                                                           | ... |                      |                        | ... |                       | ... | ... |                        |
| {{< ci-details title="Parameterized tests" >}}Détection automatique des tests paramétrés.{{< /ci-details >}}                                                                                                                      | ... |       ...      |       ...        | ... | ...             | ... |           |                        |
| {{< ci-details title="Early flake detection *" >}}Automatiquement <a href="/tests/flaky_test_management/early_flake_detection">réessayer de nouveaux tests</a> pour détecter la fragilité.{{< /ci-details >}}                                          | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Auto test retries *" >}}Automatiquement <a href="/tests/flaky_test_management/auto_test_retries">réessayer les tests échoués</a> jusqu'à N fois pour éviter d'échouer la construction en raison de la fragilité des tests.{{< /ci-details >}}    | ... |       ...      |       ...        | ... | ...             | ... | ... |                        |
| {{< ci-details title="Failed test replay *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Accéder aux informations sur les variables locales</a> sur les tests échoués réessayés.{{< /ci-details >}}                      | ... |       ...      |       ...        |           |                       |           |           |                        |
| {{< ci-details title="Selenium RUM integration" >}}Automatiquement <a href="/tests/browser_tests">lier les sessions de navigateur aux cas de test</a> lors des tests d'applications instrumentées RUM.{{< /ci-details >}}                            | ... |       ...      |       ...        | ... | ...             |           |           |                        |

* La fonctionnalité est opt-in et doit être activée sur la [**page des paramètres d'optimisation des tests**][2].

## Configurations par défaut

Les tests évaluent le comportement du code pour un ensemble de conditions données. Certaines de ces conditions sont liées à l'environnement dans lequel les tests sont exécutés, comme le système d'exploitation ou l'environnement d'exécution utilisé. Le même code exécuté sous différents ensembles de conditions peut se comporter différemment, donc les développeurs configurent généralement leurs tests pour s'exécuter dans différents ensembles de conditions et valider que le comportement est celui attendu pour tous. Cet ensemble spécifique de conditions est appelé une *configuration*.

Dans l'optimisation des tests, un test avec plusieurs configurations est traité comme plusieurs tests avec un test séparé pour chaque configuration. Dans le cas où l'une des configurations échoue mais que les autres réussissent, seul ce test spécifique et cette combinaison de configuration sont marqués comme échoués.

Par exemple, supposons que vous testez un seul commit et que vous avez un test Python qui s'exécute contre trois versions différentes de Python. Si le test échoue pour l'une de ces versions, ce test spécifique est marqué comme échoué, tandis que les autres versions sont marquées comme réussies. Si vous réessayez les tests contre le même commit et que maintenant le test pour les trois versions de Python réussit, le test avec la version qui a échoué précédemment est maintenant marqué comme à la fois réussi et fragile, tandis que les deux autres versions restent réussies, sans détection de fragilité.

### Attributs de configuration de test

Lorsque vous exécutez vos tests avec l'optimisation des tests, la bibliothèque détecte et rapporte des informations sur l'environnement où les tests sont exécutés sous forme d'étiquettes de test. Par exemple, le nom du système d'exploitation, tel que `Windows` ou `Linux`, et l'architecture de la plateforme, telle que `arm64` ou `x86_64`, sont ajoutés en tant que balises à chaque test. Ces valeurs sont affichées dans le commit et sur les pages de vue d'ensemble des branches lorsqu'un test échoue ou est instable pour une configuration spécifique mais pas pour d'autres.

Les tags suivants sont collectés automatiquement pour identifier les configurations de test, et certains peuvent ne s'appliquer qu'à des plates-formes spécifiques :

| Nom du tag               | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| ...          | Le nom du système d'exploitation sur lequel les tests sont exécutés.           |
| ...            | La famille du système d'exploitation sur lequel les tests sont exécutés.         |
| ...           | La version du système d'exploitation sur lequel les tests sont exécutés.        |
| ...      | L'architecture du système d'exploitation sur lequel les tests sont exécutés.   |
| ...         | Le nom du système de runtime pour les tests.                       |
| ...      | La version du système de runtime.                                  |
| ...       | Le fournisseur qui a créé la plateforme de runtime dans laquelle les tests sont exécutés. |
| ... | L'architecture du système de runtime pour les tests.               |
| ...         | Le modèle de l'appareil qui exécute les tests.                             |
| ...          | Le nom de l'appareil.                                             |
| ...        | Style de l'interface utilisateur.                                           |
| ...       | L'orientation de l'IU de l'exécution.                                   |
| ...      | La langue de l'application                                    |

### Configurations de tests paramétrés

Lorsque vous exécutez des tests paramétrés, la bibliothèque détecte et rapporte des informations sur les paramètres utilisés. Les paramètres font partie de la configuration des tests, donc le même cas de test exécuté avec des paramètres différents est considéré comme deux tests différents dans l'optimisation des tests.

Si un paramètre de test est non déterministe et a une valeur différente chaque fois qu'un test est exécuté, chaque exécution de test est considérée comme un nouveau test dans l'optimisation des tests. En conséquence, certaines fonctionnalités du produit peuvent ne pas fonctionner correctement pour de tels tests : historique des exécutions, détection de la variabilité, analyse de l'impact des tests, et d'autres.

Voici des exemples de paramètres de tests non déterministes :

- date actuelle
- une valeur aléatoire
- une valeur qui dépend de l'environnement dans lequel le test est exécuté (comme un chemin de fichier absolu ou le nom d'utilisateur actuel)
- une valeur qui n'a pas de représentation de chaîne déterministe (par exemple, une instance d'une classe Java dont la `toString()` méthode n'est pas remplacée)

Évitez d'utiliser des paramètres de test non déterministes. Dans le cas où cela n'est pas possible, certains frameworks de test fournissent un moyen de spécifier une représentation de chaîne déterministe pour un paramètre non déterministe (comme remplacer le nom d'affichage du paramètre).

## Configurations personnalisées

Il existe certaines configurations qui ne peuvent pas être identifiées et signalées automatiquement car elles peuvent dépendre de variables d'environnement, d'arguments d'exécution de test ou d'autres approches utilisées par les développeurs. Pour ces cas, vous devez fournir les détails de la configuration à la bibliothèque afin que l'optimisation des tests puisse les identifier correctement.

Définissez ces balises comme partie de la variable d'environnement `DD_TAGS` en utilisant le préfixe `test.configuration`.

Par exemple, les tags de configuration de tests identifient une configuration de test où le délai de réponse du disque est long et où peu de mémoire est disponible :

...

Toutes les balises avec le préfixe `test.configuration` sont utilisées comme balises de configuration, en plus de celles collectées automatiquement.

Remarques : Les balises `test.configuration` imbriquées, telles que `test.configuration.cpu.memory`, ne sont pas prises en charge.

Pour appliquer un filtre avec ces tags de configuration, [vous devez créer des facettes pour ces tags][3].

## Améliorez vos processus de développement

...

## Utiliser des données de tests CI

...

Lors de la création d'un [tableau de bord][4] ou d'un [carnet de notes][5], vous pouvez utiliser les données des tests CI dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez la documentation des [Tableaux de bord][6] et des [Carnets de notes][7].

## Alerte sur les données de tests

Lorsque vous évaluez des tests échoués ou instables, ou la performance d'un test CI, vous pouvez exporter votre requête de recherche dans le [Explorateur d'optimisation des tests][8] vers un [moniteur de tests CI][9] en cliquant sur le bouton **Exporter**.

## Pour aller plus loin

...

[1]: https://app.datadoghq.com/ci/test-repositories
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /fr/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /fr/dashboards
[7]: /fr/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /fr/monitors/types/ci/