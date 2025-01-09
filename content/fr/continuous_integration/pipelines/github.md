---
aliases:
- /fr/continuous_integration/setup_pipelines/github
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage CI
- link: /continuous_integration/pipelines/custom_tags_and_metrics/
  tag: Documentation
  text: Gagner en visibilité sur les pipelines en ajoutant des tags et des métriques
    personnalisés
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: blog
  text: Surveiller les workflows GitHub Actions avec CI Visibility de Datadog
title: Configurer le tracing sur les workflows GitHub Actions
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Le site Datadog sélectionné ({{< region-param key="dd_site_name" >}}) n'est pas pris en charge.</div>
{{< /site-region >}}

## Compatibilité
- **Versions de GitHub prises en charge** :
  - GitHub.com (SaaS)
  - Serveur GitHub Enterprise 3.5.0 ou une version ultérieure
- **Pipelines partiels** : consultez les exécutions de pipeline en aval qui ont fait l'objet d'une nouvelle tentative partielle

- **Mise en corrélation des logs** : mettez les spans de pipeline en corrélation avec les logs et [activez la collecte des logs de tâches][10]

- **Mise en corrélation des métriques d'infrastructure** : [mettez les métriques d'infrastructure en corrélation][11] avec les tâches de pipeline pour les exécuteurs GitHub auto-hébergés

- **Métriques et tags personnalisés lors de l'exécution** : configurez des métriques et tags personnalisés lors de l'exécution pour des spans de pipeline

- **Délai de mise en file d'attente**: découvrez le temps que les tâches de workflow passent dans la file d'attente avant d'être traitées

## Configurer l'intégration Datadog

### Configurer une application GitHub

L'intégration [GitHub Actions][1] utilise une [application GitHub][2] privée pour recueillir les informations sur les workflows. Si vous possédez déjà une application, vous pouvez passer à la section suivante.

1. Accédez au [carré d'intégration GitHub][3].
2. Cliquez sur **Link GitHub Account**.
3. Suivez les instructions de configuration de l'intégration pour un compte personnel ou pour celui d'une organisation.
4. Dans **Edit Permissions**, accordez l'accès `Actions: Read`.
5. Cliquez sur **Create App in GitHub** pour terminer le processus de création de l'application dans GitHub.
6. Attribuez un nom à l'application, par exemple `Datadog CI Visibility`.
7. Cliquez sur **Install GitHub App**, puis suivez les instructions sur GitHub.

### Configurer le tracing pour GitHub Actions

Une fois l'application GitHub créée et installée, activez CI Visibility sur les comptes et/ou les référentiels qui vous intéressent.

1. Accédez à la page **[Getting Started][4]**, puis cliquez sur **GitHub**.
2. Cliquez sur **Enable Account** pour le compte à activer.
3. Cliquez sur **Enable CI Visibility** pour activer CI Visibility sur l'ensemble du compte.
4. Vous avez également la possibilité d'activer des référentiels individuels. Pour ce faire, faites défiler la liste des référentiels et cliquez sur le bouton **Enable CI Visibility**.

Les pipelines s'afficheront immédiatement après l'activation de CI Visibility pour un compte ou un référentiel.

### Activer la collecte de logs

L'intégration GitHub Actions avec CI Visibility permet également d'envoyer automatiquement les logs des tâches de workflow aux [solutions de gestion des logs][5]. Pour activer les logs, procédez comme suit :

1. Accédez à la page des **[paramètres CI Visibility][6]**.
2. Cliquez sur un compte activé ou sur un compte pour lequel des référentiels sont activés.
3. Cliquez sur **Enable Job Logs Collection** pour activer la collecte de logs sur l'ensemble du compte.
4. Vous avez également la possibilité d'activer des référentiels individuels. Pour ce faire, faites défiler la liste des référentiels et cliquez sur le bouton **Enable Job Logs Collection**.

Dès que vous avez activé la collecte des logs, les logs de tâches de workflow sont envoyés à Datadog. Notez que les logs et CI Visibility sont facturés séparément. La rétention des logs, l'exclusion de logs et les index de logs sont configurés dans les paramètres des logs.

Les fichiers de logs de plus de 1 Go sont tronqués.

### Mettre les métriques d'infrastructure en corrélation avec les tâches

Si vous utilisez des exécuteurs GitHub auto-hébergés, vous pouvez mettre les tâches en corrélation avec l'host qui les exécute. Pour ce faire, assurez-vous que le nom de l'exécuteur GitHub correspond au hostname de la machine sur laquelle il est exécuté. CI Visibility pourra ainsi faire le lien avec les métriques d'infrastructure pertinentes. Pour consulter les métriques, cliquez sur une span de tâche dans la vue Trace. Dans la fenêtre qui s'affiche, vous verrez un nouvel onglet intitulé **Infrastructure** qui contient les métriques du host.

## Visualiser des données de pipeline dans Datadog

Les pages [Pipelines][7] et [Pipeline Executions][8] affichent des données après l'exécution des pipelines.

**Remarque** : la page Pipelines affiche des données uniquement pour la branche par défaut de chaque référentiel.

## Désactiver le tracing sur GitHub Actions

Pour désactiver l'intégration GitHub Actions avec CI Visibility, assurez-vous que l'application GitHub n'est plus abonnée aux événements de tâche de workflow et d'exécution de workflow. Pour supprimer ces événements, procédez comme suit :

1. Accédez à la page [GitHub Apps][9].
2. Cliquez sur **Edit > Permission & events** pour l'application GitHub Datadog concernée (si vous en avez plusieurs, vous devrez répéter ce processus pour chaque application).
3. Faites défiler la page jusqu'à atteindre la section **Subscribe to events**, puis assurez-vous que les options **Workflow job** et **Workflow run** ne sont pas sélectionnées.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.github.com/actions
[2]: https://docs.github.com/developers/apps/getting-started-with-apps/about-apps
[3]: https://app.datadoghq.com/integrations/github/
[4]: https://app.datadoghq.com/ci/setup/pipeline?provider=github
[5]: https://docs.datadoghq.com/fr/logs/
[6]: https://app.datadoghq.com/ci/settings
[7]: https://app.datadoghq.com/ci/pipelines
[8]: https://app.datadoghq.com/ci/pipeline-executions
[9]: https://github.com/settings/apps
[10]: https://docs.datadoghq.com/fr/continuous_integration/pipelines/github/#enable-log-collection
[11]: https://docs.datadoghq.com/fr/continuous_integration/pipelines/github/#correlate-infrastructure-metrics-to-jobs
