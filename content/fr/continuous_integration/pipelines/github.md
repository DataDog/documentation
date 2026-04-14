---
aliases:
- /fr/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
- link: /continuous_integration/pipelines/custom_tags_and_measures/
  tag: Documentation
  text: Étendre Pipeline Visibility en ajoutant des tags et des mesures personnalisés
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: blog
  text: Surveiller les workflows GitHub Actions avec CI Visibility de Datadog
title: Configuration de GitHub Actions pour CI Visibility
---

## Section Overview

[GitHub Actions][1] est un outil d'automatisation qui vous permet de créer, tester et déployer votre code dans GitHub. Créez des workflows qui automatisent chaque étape de votre processus de développement, rationalisant les mises à jour logicielles et améliorant la qualité du code avec des fonctionnalités CI/CD intégrées à vos référentiels.

Configurez CI Visibility pour GitHub Actions pour suivre l'exécution de vos workflows, identifier les goulots d'étranglement de performance, résoudre les problèmes opérationnels et optimiser vos processus de déploiement.

### Compatibilité

| Pipeline Visibility | Plateforme | Définition |
|---|---|---|
| [Pipelines en cours d'exécution][2] | Pipelines en cours d'exécution | Afficher les exécutions de pipeline en cours d'exécution. Les pipelines en file d'attente ou en attente s'affichent avec le statut « Running » sur Datadog. |
| [Analyse des échecs de tâches CI][23] | Analyse des échecs de tâches CI | Utilise des modèles LLM sur les logs pertinents pour analyser la cause racine des tâches CI ayant échoué. |
| [Tentatives partielles][3] | Pipelines partiels | Consultez les exécutions de pipelines faisant lʼobjet de nouvelles tentatives. |
| Corrélation de logs | Corrélation de logs | Mettre en corrélation les spans de pipeline et de tâches avec les logs et activer la [collecte de logs de tâche](#collecter-les-logs-de-tâche). |
| Mise en corrélation des métriques d'infrastructure | Mise en corrélation des métriques d'infrastructure | Mettre en corrélation les tâches avec les [métriques d'hôte d'infrastructure][4] pour les tâches GitHub. |
| [Tags personnalisés][5] [et mesures au runtime][6] | Tags personnalisés et mesures au runtime | Configurer les [tags personnalisés et les mesures][7] au runtime. |
| [Durée de mise en file d'attente][8] | Temps de mise en file d'attente | Afficher le temps pendant lequel les tâches de pipeline restent dans la file d'attente avant le traitement. |
| [Temps d'attente d'approbation][9] | Temps d'attente d'approbation | Consulter la durée pendant laquelle les exécutions de workflow et les tâches de workflow attendent les approbations manuelles. |
| [Spans personnalisées][10] | Spans personnalisées | Configurez des spans personnalisées pour vos pipelines. |
| [Filtrer les tâches CI sur le chemin critique][24] | Filtrer les tâches CI sur le chemin critique | Filtrer par tâches sur le chemin critique. |
| [Temps d'exécution][25] | Durée d'exécution  | Afficher le temps pendant lequel les pipelines ont exécuté des tâches. |


Les versions de GitHub suivantes sont prises en charge :

- GitHub.com (SaaS)
- Serveur GitHub Enterprise 3.5.0 ou une version ultérieure

### Termes

Ce tableau montre le mappage des concepts entre Datadog CI Visibility et GitHub Actions :

| Datadog  | Actions GitHub |
|----------|----------------|
| Pipeline | Workflow       |
| Job      | Job            |
| Step     | Step           |

## Configurer l'intégration Datadog

### Configurer une application GitHub

L'intégration [GitHub Actions][1] utilise une [GitHub App][11] privée pour collecter les informations de workflow. Si vous avez déjà une application, vous pouvez passer à la section suivante.

1. Accédez au [carré d'intégration GitHub][12].
2. Cliquez sur **+ Create GitHub App**.
3. Configurez l'intégration pour un compte personnel ou d'organisation et saisissez le nom de l'organisation GitHub.
3. Sélectionnez les fonctionnalités Datadog que vous souhaitez activer pour l'app GitHub.
4. Dans la section **Edit Permissions**, accordez l'accès `Actions: Read Only`.
5. Cliquez sur **Create App in GitHub** pour terminer le processus de création d'application sur GitHub.
6. Attribuez un nom à l'application, par exemple `Datadog CI Visibility`.
7. Cliquez sur **Install GitHub App**, puis suivez les instructions sur GitHub.

### Configurer CI Visibility pour GitHub Actions

Une fois l'application GitHub créée et installée, activez CI Visibility sur les comptes et/ou les référentiels qui vous intéressent.

1. Dans Datadog, accédez à [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] et sélectionnez **GitHub**.
2. Cliquez sur **Enable Account** pour le compte que vous souhaitez activer.
3. Activez CI Visibility pour l'ensemble du compte en cliquant sur le bouton bascule à côté de **Enable CI Visibility**.
4. Vous avez également la possibilité d'activer des référentiels individuels. Pour ce faire, faites défiler la liste des référentiels et cliquez sur le bouton **Enable CI Visibility**.

Les pipelines s'afficheront immédiatement après l'activation de CI Visibility pour un compte ou un référentiel.

### Désactiver CI Visibility pour GitHub Actions

Pour désactiver l'intégration CI Visibility GitHub Actions :

1. Accédez à la page [CI GitHub Settings][14].
2. Choisissez le compte GitHub pour lequel vous souhaitez désactiver CI Visibility et cliquez sur **Account Enabled**.
3. Désactivez le bouton bascule **Enable CI Visibility**, ou choisissez le référentiel pour lequel vous souhaitez le désactiver individuellement.

### Collecter les logs de tâche

L'intégration CI Visibility GitHub Actions permet également de transférer automatiquement les logs de tâche de workflow vers [Log Management][15].

Pour activer la collecte de logs de tâche :

1. Dans Datadog, accédez à [**Software Delivery** > **CI Visibility** > **Add a Pipeline Provider**][13] et sélectionnez **GitHub**.
2. Cliquez sur **Enable Account** pour le compte que vous souhaitez activer.
3. Activez la collecte de logs de tâche pour l'ensemble du compte en cliquant sur le bouton bascule à côté de **Enable Job Logs Collection**.
4. Vous avez également la possibilité d'activer des référentiels individuels. Pour ce faire, faites défiler la liste des référentiels et cliquez sur le bouton **Enable Job Logs Collection**.

Immédiatement après l'activation de la collecte de logs, les logs de tâche de workflow sont transférés vers Datadog Log Management. Les fichiers de logs de plus de 1 Gio sont tronqués.

Les logs sont facturés séparément de CI Visibility. La rétention, l'exclusion et les index de logs sont configurés dans [Log Management][16]. Les logs pour les tâches GitHub peuvent être identifiés par les tags `datadog.product:cipipeline` et `source:github`.

### Mettre les métriques d'infrastructure en corrélation avec les tâches

L'intégration CI Visibility GitHub Actions permet de mettre en corrélation l'infrastructure et les tâches. Pour y parvenir, assurez-vous que le [Datadog Agent][20] est en cours d'exécution sur l'hôte où les tâches sont exécutées. Selon la configuration, des étapes supplémentaires peuvent être nécessaires :

- Pour [Actions Runner Controller][21] : aucune configuration supplémentaire requise. En raison des limitations du Datadog Agent, les tâches plus courtes que l'intervalle de collecte minimum du Datadog Agent peuvent ne pas toujours afficher les métriques de corrélation d'infrastructure. Pour ajuster cette valeur, consultez la section [Modèle de configuration du Datadog Agent][22] et modifiez `min_collection_interval` pour qu'il soit inférieur à 15 secondes.

- Pour les autres configurations : pour mettre en corrélation les tâches avec les hôtes qui les exécutent, assurez-vous que le nom du runner GitHub correspond au nom d'hôte de la machine.

Pour voir les métriques, cliquez sur un span de tâche dans la vue de trace. Une fenêtre s'ouvre avec un onglet **Infrastructure** affichant les métriques d'hôte.

### Analyse des échecs de tâches CI

Si la collecte de logs de tâche est activée, CI Visibility utilise des modèles LLM pour analyser les tâches CI ayant échoué en fonction des logs pertinents provenant de GitHub Actions.

Vous pouvez également ajouter l'analyse des échecs de tâches à un commentaire de PR. Consultez le guide sur [l'utilisation des commentaires de PR][26].

Pour une explication complète, consultez le guide sur [l'utilisation de l'analyse des échecs de tâches CI][23].

## Visualiser les données de pipeline dans Datadog

Les pages [**CI Pipeline List**][17] et [**Executions**][18] se remplissent de données une fois les pipelines terminés.

La page **CI Pipeline List** affiche les données uniquement pour la branche par défaut de chaque référentiel. Pour en savoir plus, consultez la section [Rechercher et gérer les pipelines CI][19].

## Pour aller plus loin

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
[14]: https://app.datadoghq.com/ci/settings/provider
[15]: /fr/logs/
[16]: /fr/logs/guide/best-practices-for-log-management/
[17]: https://app.datadoghq.com/ci/pipelines
[18]: https://app.datadoghq.com/ci/pipeline-executions
[19]: /fr/continuous_integration/search/#search-for-pipelines
[20]: /fr/agent
[21]: https://github.com/actions/actions-runner-controller
[22]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[23]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[24]: /fr/continuous_integration/guides/identify_highest_impact_jobs_with_critical_path/
[25]: /fr/glossary/#pipeline-execution-time
[26]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/#using-pr-comments