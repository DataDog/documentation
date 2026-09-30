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
- link: https://learn.datadoghq.com/courses/getting-started-test-optimization
  tag: Centre d'apprentissage
  text: Premiers pas avec l'optimisation des tests
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: Notes de version
  text: Découvrez les dernières versions de Software Delivery ! (Connexion à l'application
    requise)
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
- link: https://www.datadoghq.com/blog/dbt-data-quality-testing
  tag: Blog
  text: Implémentez des vérifications de qualité des données dbt avec dbt-expectations
title: Optimisation des tests dans Datadog
---
{{< learning-center-callout header="Essayez les premiers pas avec l'optimisation des tests dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/getting-started-test-optimization">}}
  Apprenez à accélérer vos pipelines CI en configurant la surveillance des tests, en identifiant les tests instables et en utilisant l'analyse d'impact des tests pour exécuter uniquement les tests qui comptent.
{{< /learning-center-callout >}}


## Aperçu {#overview}

[L'optimisation des tests][1] fournit une vue axée sur les tests de la santé de votre CI en affichant des métriques et des résultats importants de vos tests. Cela peut vous aider à enquêter sur les problèmes de performance et les échecs de tests qui sont les plus pertinents pour votre travail, en vous concentrant sur le code dont vous êtes responsable, plutôt que sur les pipelines qui exécutent vos tests.

## Configuration {#setup}

Sélectionnez une option pour configurer l'optimisation des tests dans Datadog :

{{< card-grid card_width="75px" >}}
  {{< image-card href="/tests/setup/dotnet/" src="integrations_logos/dotnet_avatar.svg" alt=".net" >}}
  {{< image-card href="/tests/setup/java/" src="integrations_logos/java_avatar.svg" alt="java" >}}
  {{< image-card href="/tests/setup/javascript/" src="integrations_logos/javascript.png" alt="javascript" >}}
  {{< image-card href="/tests/setup/python/" src="integrations_logos/python_avatar.svg" alt="php" >}}
  {{< image-card href="/tests/setup/ruby/" src="integrations_logos/ruby_avatar.svg" alt="ruby" >}}
  {{< image-card href="/tests/setup/swift/" src="integrations_logos/swift_avatar.svg" alt="swift" >}}
  {{< image-card href="/tests/setup/go/" src="integrations_logos/golang-avatar.png" alt="go" >}}
  {{< image-card href="/tests/setup/junit_xml/" src="integrations_logos/junit_xml.png" alt="Téléversez des tests junit vers Datadog" >}}
{{< /card-grid >}}

</br>

En plus des tests, l'optimisation des tests offre une visibilité sur l'ensemble de la phase de test de votre projet.

### Fonctionnalités prises en charge {#supported-features}

|                                                                                                                                                                                                                                   |   .NET    | Java/JVM&#8209;basé |       Javascript       |  Python   |         Ruby          |   Swift   |     Go    |       JUnit Xml        |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------:|:--------------------:|:----------------------:|:---------:|:---------------------:|:---------:|:---------:|:----------------------:|
| {{< ci-details title="Résultats précis des temps/durées" >}}Résolution en microsecondes pour le temps de début et la durée des tests.{{< /ci-details >}}                                                                                             | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Traces distribuées sur les tests d'intégration" >}}Les tests qui effectuent des appels à des services externes instrumentés avec Datadog montrent la trace distribuée complète dans les détails de leur test.{{< /ci-details >}}                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Rapport basé sur un agent" >}}Capacité à rapporter des informations de test via l'Agent Datadog.{{< /ci-details >}}                                                                                                  | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Rapport sans agent" >}}Capacité à rapporter des informations de test sans l'Agent Datadog.{{< /ci-details >}}                                                                                                    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Affichage au niveau des collections de tests" >}}Visibilité sur l'ensemble du processus de test, y compris la session, le module, les suites et les tests.{{< /ci-details >}}                                                                 | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="API manuelle" >}}Capacité à créer de manière programmatique des événements de visibilité CI pour des frameworks de test qui ne sont pas pris en charge par l'instrumentation automatique de Datadog.{{< /ci-details >}}                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |            |           |                        |
| {{< ci-details title="Propriétaire de code par test" >}}Détection automatique du propriétaire d'un fichier de test basé sur le fichier CODEOWNERS.{{< /ci-details >}}                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} | {{< X >}} (partiellement)  |
| {{< ci-details title="Début/fin du code source" >}}Rapport automatique des lignes de début et de fin d'un test.{{< /ci-details >}}                                                                                                         | {{< X >}} |       {{< X >}}      | {{< X >}} (seulement début) | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} (seulement début) |
| {{< ci-details title="Informations CI et git" >}}Collecte automatique des métadonnées de l'environnement git et CI, telles que le fournisseur CI, le SHA du commit git ou l'URL du pipeline.{{< /ci-details >}}                                                        | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Importation des métadonnées Git" >}}Téléversement automatique des informations de l'arbre git utilisées pour <a href="/tests/test_impact_analysis">l'analyse de l'impact des tests</a>.{{< /ci-details >}}                                                | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |       {{< X >}}        |
| {{< ci-details title="Analyse de l'impact des tests *" >}}Capacité d'activer <a href="/tests/test_impact_analysis">l'analyse de l'impact des tests</a>, qui saute intelligemment les tests en fonction de la couverture de code et des métadonnées git.{{< /ci-details >}} | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Support de la couverture de code" >}}Capacité à rapporter les métriques de <a href="/tests/code_coverage">couverture de code totale</a>.{{< /ci-details >}}                                                                              | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |   {{< X >}} (manuel)   |
| {{< ci-details title="Support des tests de référence" >}}Détection automatique des statistiques de performance pour les tests de référence.{{< /ci-details >}}                                                                                           | {{< X >}} |                      |                        | {{< X >}} |                       | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Tests paramétrés" >}}Détection automatique des tests paramétrés.{{< /ci-details >}}                                                                                                                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} |           |                        |
| {{< ci-details title="Détection précoce des instabilités *" >}}Réessayez automatiquement <a href="/tests/flaky_test_management/early_flake_detection">les nouveaux tests</a> pour détecter les instabilités.{{< /ci-details >}}                                          | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Réessais automatiques des tests *" >}}Réessayez automatiquement <a href="/tests/flaky_test_management/auto_test_retries">les tests échoués</a> jusqu'à N fois pour éviter de faire échouer la build en raison de l'instabilité des tests.{{< /ci-details >}}    | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             | {{< X >}} | {{< X >}} |                        |
| {{< ci-details title="Relecture des tests échoués *" >}}<a href="/tests/flaky_test_management/auto_test_retries#failed-test-replay">Accéder aux informations des variables locales</a> sur les tests échoués réessayés.{{< /ci-details >}}                      | {{< X >}} |       {{< X >}}      |       {{< X >}}        |           |                       |           |           |                        |
| {{< ci-details title="Intégration RUM de Selenium" >}}Liez automatiquement <a href="/tests/browser_tests">les sessions de navigateur aux cas de test</a> lors des tests d'applications instrumentées RUM.{{< /ci-details >}}                            | {{< X >}} |       {{< X >}}      |       {{< X >}}        | {{< X >}} | {{< X >}}             |           |           |                        |

\* La fonctionnalité est facultative et doit être activée sur la page [**Paramètres d'optimisation des tests**][2].

## Configurations par défaut {#default-configurations}

Les tests évaluent le comportement du code pour un ensemble de conditions données. Certaines de ces conditions sont liées à l'environnement dans lequel les tests sont exécutés, comme le système d'exploitation ou l'environnement d'exécution utilisé. Le même code exécuté sous différents ensembles de conditions peut se comporter différemment, donc les développeurs configurent généralement leurs tests pour s'exécuter dans différents ensembles de conditions et valident que le comportement est celui attendu pour tous. Cet ensemble spécifique de conditions est appelé une *configuration*.

Dans l'optimisation des tests, un test avec plusieurs configurations est traité comme plusieurs tests avec un test séparé pour chaque configuration. Dans le cas où l'une des configurations échoue mais que les autres réussissent, seul ce test spécifique et cette combinaison de configuration sont marqués comme échoués.

Par exemple, supposons que vous testiez un seul commit et que vous ayez un test Python qui s'exécute contre trois versions différentes de Python. Si le test échoue pour l'une de ces versions, ce test spécifique est marqué comme échoué, tandis que les autres versions sont marquées comme réussies. Si vous réessayez les tests contre le même commit et que maintenant le test pour les trois versions de Python réussit, le test avec la version qui avait échoué est maintenant marqué comme réussi et instable, tandis que les deux autres versions restent réussies, sans instabilité détectée.

### Attributs de configuration des tests {#test-configuration-attributes}

Lorsque vous exécutez vos tests avec l'optimisation des tests, la bibliothèque détecte et rapporte des informations sur l'environnement dans lequel les tests sont exécutés sous forme d'étiquettes de test. Par exemple, le nom du système d'exploitation, tel que `Windows` ou `Linux`, et l'architecture de la plateforme, telle que `arm64` ou `x86_64`, sont ajoutés comme étiquettes à chaque test. Ces valeurs sont affichées dans le commit et sur les pages de vue d'ensemble des branches lorsqu'un test échoue ou est instable pour une configuration spécifique mais pas pour d'autres.

Les tags suivants sont collectés automatiquement pour identifier les configurations de test, et certains peuvent ne s'appliquer qu'à des plates-formes spécifiques :

| Nom de l'étiquette               | Description                                                     |
|------------------------|-----------------------------------------------------------------|
| `os.platform`          | Nom du système d'exploitation où les tests sont exécutés.           |
| `os.family`            | Famille du système d'exploitation où les tests sont exécutés.         |
| `os.version`           | Version du système d'exploitation où les tests sont exécutés.        |
| `os.architecture`      | Architecture du système d'exploitation où les tests sont exécutés.   |
| `runtime.name`         | Nom du système d'exécution pour les tests.                       |
| `runtime.version`      | Version du système d'exécution.                                  |
| `runtime.vendor`       | Fournisseur qui a construit la plateforme d'exécution où les tests sont exécutés. |
| `runtime.architecture` | Architecture du système d'exécution pour les tests.               |
| `device.model`         | Le modèle de l'appareil exécutant les tests.                             |
| `device.name`          | Nom de l'appareil.                                             |
| `ui.appearance`        | Style de l'interface utilisateur.                                           |
| `ui.orientation`       | Orientation dans laquelle l'interface utilisateur est exécutée.                                   |
| `ui.localization`      | Langue de l'application.                                    |

### Configurations de test paramétrées {#parameterized-test-configurations}

Lorsque vous exécutez des tests paramétrés, la bibliothèque détecte et rapporte des informations sur les paramètres utilisés. Les paramètres font partie de la configuration des tests, donc le même cas de test exécuté avec des paramètres différents est considéré comme deux tests différents dans l'optimisation des tests.

Si un paramètre de test est non déterministe et a une valeur différente chaque fois qu'un test est exécuté, chaque exécution de test est considérée comme un nouveau test dans l'optimisation des tests. En conséquence, certaines fonctionnalités du produit peuvent ne pas fonctionner correctement pour de tels tests : historique des exécutions, détection de l'instabilité, analyse de l'impact des tests, et d'autres.

Voici des exemples de paramètres de tests non déterministes :

- date actuelle
- une valeur aléatoire
- une valeur qui dépend de l'environnement d'exécution du test (comme un chemin de fichier absolu ou le nom d'utilisateur actuel)
- une valeur qui n'a pas de représentation de chaîne déterministe (par exemple, une instance d'une classe Java dont la méthode `toString()` n'est pas redéfinie)

Évitez d'utiliser des paramètres de test non déterministes. Dans le cas où cela n'est pas possible, certains frameworks de test offrent un moyen de spécifier une représentation de chaîne déterministe pour un paramètre non déterministe (comme le fait de remplacer le nom d'affichage du paramètre).

## Configurations personnalisées {#custom-configurations}

Il existe certaines configurations qui ne peuvent pas être identifiées et rapportées automatiquement car elles peuvent dépendre de variables d'environnement, d'arguments d'exécution de test ou d'autres approches utilisées par les développeurs. Pour ces cas, vous devez fournir les détails de configuration à la bibliothèque afin que l'optimisation des tests puisse les identifier correctement.

Définissez ces balises comme partie de la variable d'environnement `DD_TAGS` en utilisant le préfixe `test.configuration`.

Par exemple, les tags de configuration de tests identifient une configuration de test où le délai de réponse du disque est long et où peu de mémoire est disponible :

{{< code-block lang="bash" >}}
DD_TAGS=test.configuration.disk:slow,test.configuration.memory:low
{{< /code-block >}}

Toutes les balises avec le préfixe `test.configuration` sont utilisées comme balises de configuration, en plus de celles collectées automatiquement.

Remarque : Les balises imbriquées `test.configuration`, telles que `test.configuration.cpu.memory`, ne sont pas prises en charge.

Pour appliquer un filtre avec ces tags de configuration, [vous devez créer des facettes pour ces tags][3].

## Améliorez votre flux de travail de développeur {#enhance-your-developer-workflow}

{{< whatsnext desc="Intégrez l'optimisation des tests avec des outils pour rapporter des données de couverture de code, améliorez les tests de navigateur avec RUM et accédez à des informations à travers les plateformes en rationalisant l'identification et la résolution des problèmes dans votre cycle de développement." >}}
{{< nextlink href="/tests/developer_workflows/" >}}Améliorer vos workflows de développement avec Datadog{{< /nextlink >}}
{{< nextlink href="/tests/code_coverage" >}}Découvrez la couverture de code{{< /nextlink >}}
{{< nextlink href="/tests/browser_tests" >}}Instrumentez les tests de navigateur Cypress avec Browser RUM{{< /nextlink >}}
{{< nextlink href="/tests/swift_tests" >}}Tests Swift dʼinstruments avec RUM{{< /nextlink >}}
{{< /whatsnext >}}

## Utilisez les données des tests CI {#use-ci-tests-data}

{{% ci-information-collected %}}

Lors de la création d'un [Dashboard][4] ou d'un [Notebooks][5], vous pouvez utiliser les données des tests CI dans votre requête de recherche, ce qui met à jour les options du widget de visualisation. Pour plus d'informations, consultez la documentation des [Dashboards][6] et des [Notebooks documentation][7].

## Activez les alertes sur les données de test {#alert-on-test-data}

Lorsque vous évaluez des tests échoués ou instables, ou la performance d'un test CI, vous pouvez exporter votre requête de recherche dans le [Test Optimization Explorer][8] vers un [CI Test monitor][9] en cliquant sur le bouton **Exporter**.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/test/health
[2]: https://app.datadoghq.com/ci/settings/test-optimization
[3]: /fr/continuous_integration/explorer/facets/
[4]: https://app.datadoghq.com/dashboard/lists
[5]: https://app.datadoghq.com/notebook/list
[6]: /fr/dashboards
[7]: /fr/notebooks
[8]: https://app.datadoghq.com/ci/test-runs
[9]: /fr/monitors/types/ci/