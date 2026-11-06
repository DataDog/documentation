---
aliases:
- /fr/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendez Pipeline Visibility en ajoutant des tags et des mesures personnalisés
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: blog
  text: Surveiller les workflows des actions GitHub avec Datadog CI Visibility
title: Configuration de GitHub Actions pour CI Visibility
---
## Présentation {#overview}

[GitHub Actions][1] est un outil d'automatisation qui vous permet de construire, tester et déployer votre code sur GitHub. Créez des workflows qui automatisent chaque étape de votre processus de développement, optimisent les mises à jour logicielles et améliorent la qualité du code grâce aux fonctionnalités de CI/CD intégrées à vos dépôts.

Configurez CI Visibility pour GitHub Actions afin de suivre l'exécution de vos workflows, d'identifier les goulots d'étranglement de performances, de résoudre les problèmes opérationnels et d'optimiser vos processus de déploiement.

### Compatibilité {#compatibility}

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Pipelines en cours][2] | Pipelines en cours | Affichez les exécutions de pipeline en cours. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| [Jobs en cours][28] | Jobs en cours | Affichez les exécutions de jobs actuellement en cours. |
| [Analyse des logs][23] | Analyse des logs | Utilise des modèles LLM sur les logs pertinents pour analyser la cause profonde des jobs CI ayant échoué. |
| Corrélation des logs | Corrélation des logs | Corrélez les spans de pipeline et de job aux logs. Nécessite [Logs Storage](#logs-storage). |
| [Réessais partiels][3] | Réexécutions partielles | Affichez les exécutions de pipeline ayant subi des réessais partiels. |
| [Réessais automatiques de jobs][27] | Réessais automatiques de jobs | Datadog relance les jobs ayant échoué, classés comme transitoires par son modèle d'erreurs IA. |
| Corrélation des métriques d'infrastructure | Corrélation des métriques d'infrastructure | Corrélez les jobs aux [métriques de host d'infrastructure][4] pour les jobs GitHub. |
| [Tags personnalisés][5] [et mesures personnalisées au moment de l'exécution][6] | Tags personnalisés et mesures personnalisées au moment de l'exécution | Configurez des [tags et mesures personnalisés][7] au moment de l'exécution. |
| [Temps de file d'attente][8] | Temps de file d'attente | Affichez la durée pendant laquelle les jobs de pipeline restent dans la file d'attente avant d'être traités. |
| [Temps d'attente d'approbation][9] | Temps d'attente d'approbation | Affichez la durée pendant laquelle les exécutions de workflow et les jobs de workflow attendent des approbations manuelles. |
| [Spans personnalisés][10] | Spans personnalisés | Configurez des spans personnalisés pour vos pipelines. |
| [Filtrer les jobs CI sur le chemin critique][24] | Filtrer les jobs CI sur le chemin critique | Filtrez par jobs sur le chemin critique. |
| [Temps d'exécution][25] | Temps d'exécution | Affichez la durée pendant laquelle les pipelines ont exécuté des jobs. |


Les versions de GitHub suivantes sont prises en charge :

- GitHub.com (SaaS)
- GitHub Enterprise Server (GHES) 3.5.0 ou version ultérieure

### Terminologie {#terminology}

Ce tableau présente la correspondance des concepts entre Datadog CI Visibility et GitHub Actions :

| Datadog  | GitHub Actions |
|----------|----------------|
| Pipeline | Workflow       |
| Job      | Job            |
| Étape     | Step           |

## Configurer l'intégration Datadog {#configure-the-datadog-integration}

### Configurer une application GitHub {#configure-a-github-app}

L'intégration [GitHub Actions][1] utilise une [application GitHub][11] privée pour collecter des informations sur les workflows. Si vous possédez déjà une application, vous pouvez passer à la section suivante.

1. Accédez à la [tuile d'intégration GitHub][12].
2. Cliquez sur {{< ui >}}\+ Create GitHub App{{< /ui >}}.
3. Configurez l'intégration pour un compte personnel ou d'organisation et saisissez le nom de l'organisation GitHub.
3. Sélectionnez les fonctionnalités Datadog que vous souhaitez activer pour l'application GitHub.
4. Dans la section {{< ui >}}Edit Permissions{{< /ui >}}, accordez l'accès `Actions: Read Only`.
5. Cliquez sur {{< ui >}}Create App in GitHub{{< /ui >}} pour terminer le processus de création de l'application sur GitHub.
6. Donnez un nom à l'application, par exemple `Datadog CI Visibility`.
7. Cliquez sur {{< ui >}}Install GitHub App{{< /ui >}} et suivez les instructions sur GitHub.

### Configurer CI Visibility pour GitHub Actions {#configure-ci-visibility-for-github-actions}

Une fois l'application GitHub créée et installée, activez CI Visibility sur les comptes et/ou les référentiels qui vous intéressent.

1. Dans Datadog, accédez à [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] et sélectionnez **GitHub**.
2. Cliquez sur {{< ui >}}Enable Account{{< /ui >}} pour le compte que vous souhaitez activer.
3. Activez CI Visibility pour l'ensemble du compte en cliquant sur le bouton bascule à côté de {{< ui >}}Enable CI Visibility{{< /ui >}}.
4. Alternativement, vous pouvez activer des dépôts individuels en faisant défiler la liste des dépôts et en cliquant sur le bouton bascule {{< ui >}}Enable CI Visibility{{< /ui >}}.

Les pipelines s'afficheront immédiatement après l'activation de CI Visibility pour un compte ou un référentiel.

### Désactivez CI Visibility pour GitHub Actions {#disable-ci-visibility-for-github-actions}

Pour désactiver l'intégration GitHub Actions de CI Visibility :

1. Ouvrez [**Optimisation CI/CD** > **Paramètres** > **GitHub Actions**][14].
2. Choisissez le compte GitHub pour lequel vous souhaitez désactiver CI Visibility, puis cliquez sur {{< ui >}}Account Enabled{{< /ui >}}.
3. Désactivez {{< ui >}}Enable CI Visibility{{< /ui >}}, ou choisissez individuellement le dépôt pour lequel vous souhaitez le désactiver.

### Gérer les logs de jobs {#manage-job-logs}

#### Analyse des logs {#logs-analysis}

L'analyse des logs utilise des modèles LLM pour classer les échecs de jobs par cause première en fonction des logs pertinents provenant de GitHub Actions.

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des logs][23].

L'analyse des logs est activée par défaut dans Datadog. Pour gérer les paramètres de l'analyse des logs, accédez aux [paramètres du dépôt CI/CD][29] et configurez l'analyse des logs au niveau de l'organisation Datadog ou pour les dépôts souhaités.

Vous pouvez également ajouter l'Analyse des logs à un commentaire de PR. Consultez le guide sur [l'utilisation des commentaires de PR][26].

L'activation de l'analyse des logs est également un prérequis pour les [réessais automatiques de jobs][27].

#### Stockage des logs {#logs-storage}

Pour activer le stockage des logs, accédez aux [paramètres du dépôt CI/CD][29] et activez le stockage des logs au niveau de l'organisation Datadog ou pour les dépôts souhaités.

Logs Storage est facturé séparément de CI Visibility. La rétention, l'exclusion et les index des logs sont configurés dans [Log Management][16]. Les logs des jobs GitHub peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:github`.

Les logs des jobs sont collectés dans [Log Management][15] et, une fois stockés, sont automatiquement corrélés avec le workflow GitHub Actions dans CI Visibility. Les fichiers logs de plus d'un Gio sont tronqués.

### Corréler les métriques d'infrastructure aux jobs {#correlate-infrastructure-metrics-to-jobs}

L'intégration GitHub Actions CI Visibility permet une corrélation entre l'infrastructure et les jobs. Pour y parvenir, assurez-vous que le [Datadog Agent][20] est en cours d'exécution sur le host où les jobs sont exécutés. Selon la configuration, des étapes supplémentaires peuvent être nécessaires :

- Pour [Actions Runner Controller][21] : aucune configuration supplémentaire n'est requise. En raison des limitations du Datadog Agent, les jobs plus courts que l'intervalle de collecte minimal du Datadog Agent pourraient ne pas toujours afficher les métriques de corrélation d'infrastructure. Pour ajuster cette valeur, définissez `min_collection_interval` sur moins de 15 secondes dans votre [fichier de configuration de l'Agent][22].

- Pour les autres configurations : pour corréler les jobs avec les hosts qui les exécutent, assurez-vous que le nom du runner GitHub correspond au nom de host de la machine.

Pour voir les métriques, cliquez sur un span de job dans la vue des traces. Une fenêtre s'ouvre avec un onglet {{< ui >}}Infrastructure{{< /ui >}} affichant les métriques du host.

## Visualisez les données de pipeline dans Datadog {#visualize-pipeline-data-in-datadog}

Les pages [**CI Pipeline List**][17] et [**Executions**][18] sont alimentées en données une fois les pipelines terminés.

La page {{< ui >}}CI Pipeline List{{< /ui >}} affiche uniquement les données de la branche par défaut de chaque dépôt. Pour plus d'informations, consultez [Search and Manage CI Pipelines][19].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: /fr/glossary/#running-pipeline
[3]: /fr/glossary/#partial-retry
[4]: /fr/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
[5]: /fr/glossary/#custom-tag
[6]: /fr/glossary/#measure
[7]: /fr/continuous_integration/pipelines/custom_tags_and_measures/?tab=linux
[8]: /fr/glossary/#queue-time
[9]: /fr/glossary/#approval-wait-time
[10]: /fr/glossary/#custom-span
[11]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[12]: https://app.datadoghq.com/integrations/github/
[13]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[14]: https://app.datadoghq.com/ci/settings/ci-cd/github
[15]: /fr/logs/
[16]: /fr/logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /fr/continuous_integration/search/#search-for-pipelines
[20]: /fr/agent
[21]: https://github.com/actions/actions-runner-controller
[22]: /fr/agent/configuration/agent-configuration-files/
[23]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[24]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[25]: /fr/glossary/#pipeline-execution-time
[26]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments
[27]: /fr/continuous_integration/pipelines/automatic_retries/
[28]: /fr/glossary/#running-job
[29]: https://app.datadoghq.com/ci/settings/ci-cd/repositories