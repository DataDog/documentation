---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/service_management/workflows/track
description: Surveillez l'activité, les métriques et les coûts des workflows à l'aide
  de dashboards, d'audit trails, de gestion d'événements et d'attribution de l'utilisation.
disable_toc: false
further_reading:
- link: /service_management/workflows/build
  tag: Documentation
  text: Créer des workflows
- link: /account_management/audit_trail/
  tag: Documentation
  text: Journal d'audit Datadog
- link: /account_management/billing/usage_attribution/
  tag: Documentation
  text: Attribution de l'utilisation
title: Suivre les workflows
---

Cette page explique comment suivre différents types d'activité de workflow et de coûts de workflow.

## Dashboard prêt à l'emploi

Le dashboard Workflows Overview fournit une vue d'ensemble de haut niveau de vos workflows et exécutions Datadog. Pour trouver le dashboard, accédez à votre [liste de dashboards][2] et recherchez **Workflows Overview**.

{{< img src="service_management/workflows/workflows-dashboard.png" alt="Le dashboard Workflows Overview" style="width:80%;" >}}


## Afficher les modifications et les exécutions de workflow dans Audit Trail

Vous pouvez afficher les modifications et les exécutions de workflow à l'aide d'Audit Trail.

Par exemple, pour voir qui a modifié un workflow :

1. Depuis votre workflow, cliquez sur l'icône <i class="icon-cog-2"></i> **(roue dentée)** dans le coin supérieur droit et cliquez sur **View audit events**.<br>Une recherche Audit Trail filtrée sur votre workflow s'ouvre.
1. À gauche, sous les filtres **Core**, développez **Action**.
1. Passez la souris sur **Modified** et cliquez sur **Only** pour filtrer les résultats afin d'afficher uniquement les modifications de workflow.<br>La colonne **User ID** affiche le nom d'utilisateur de la personne qui a effectué chaque modification.


## Notifier à propos des exécutions

Consultez la section [Notifications de workflow][3] pour obtenir des instructions sur l'utilisation des notifications de workflow intégrées.


## Suivre les métriques de workflow avec un monitor Datadog

Vous pouvez utiliser les monitors Datadog pour suivre diverses métriques de workflow.

La liste des métriques disponibles est :

| Métrique | Rôle |
| ------ | ----------- |
| `datadog.workflows.count`                      | Nombre de workflows non supprimés.                       |
| `datadog.workflows.executions.started`         | Nombre d'instances de workflow qui ont démarré.   |
| `datadog.workflows.executions.completed`       | Nombre d'instances de workflow qui se sont terminées.      |
| `datadog.workflows.steps.executions.started`   | Nombre d'étapes d'instance de workflow qui ont démarré.   |
| `datadog.workflows.steps.executions.completed` | Nombre d'étapes d'instance de workflow qui se sont terminées. |

Pour créer un monitor qui suit si les exécutions de workflow quotidiennes dépassent un certain seuil, effectuez les étapes suivantes :

1. Accédez à [New Monitor][4] et sélectionnez le type de monitor **Metric**.
1. Sous **Define the metric**, pour **a**, remplissez `datadog.workflows.executions.started`.
1. _Facultativement_, pour restreindre le monitor à un workflow spécifique, pour **from**, remplissez `workflow_id:[WORKFLOW-ID]`, en remplaçant `[WORKFLOW-ID]` par l'ID de votre workflow.
1. Pour **Evaluation Details**, utilisez les valeurs suivantes :
    - **Evaluate the** : `sum`
    - **Of the query over the** : `last 1 day`.
1. Pour **Set alert conditions**, choisissez **above**, puis remplissez un seuil d'alerte et d'avertissement. Par exemple, vous pourriez remplir un **Alert threshold** de `200` et un **Warning threshold** de `150`.
1. Sous **Configure notifications & automations**, nommez votre workflow, puis remplissez le texte du message. Par exemple, vous pourriez utiliser un texte de message comme le suivant :

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Le workflow a été exécuté {{warn_threshold}} fois au cours du dernier jour ; une action manuelle pourrait être nécessaire pour éviter l'alerte.
{{/is_warning}}
{{#is_alert}}
Le workflow a été exécuté {{threshold}} fois au cours du dernier jour, ce qui correspond à notre seuil budgétaire pour les workflows. Nous devrions dépublier le workflow pour éviter d'autres exécutions automatiques pour la journée.
{{/is_alert}}
{{< /code-block >}}
1. Cliquez sur **Create**.


## Afficher les événements de workflow dans Event Manager

Vous pouvez utiliser [Event Manager][5] pour afficher les événements de démarrage et de fin de workflow en filtrant sur `source:workflow_automation`.

Pour voir les événements d'un workflow spécifique, dans la zone **Search facets**, recherchez `workflow.workflow_id`. Vous pouvez sélectionner un ensemble spécifique d'ID pour afficher uniquement les événements de ces workflows.

Vous pouvez également filtrer la sortie par **Status** pour voir uniquement les messages `info`, `warn` ou `error`.


## Suivre la facturation des workflows dans Usage Attribution

<div class="alert alert-danger">
Usage Attribution est une fonctionnalité avancée incluse dans le plan Enterprise. Pour tous les autres plans, contactez votre représentant de compte ou <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander cette fonctionnalité.
</div>

Pour suivre la facturation de vos exécutions de workflow, effectuez les étapes suivantes :

1. Accédez à la page [Usage Attribution][6].
1. Sous **Products** à gauche, recherchez **Workflow Executions**.
1. Passez la souris sur **Workflow Executions** et cliquez sur **Only** pour afficher l'attribution de l'utilisation uniquement pour les workflows.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>Vous avez des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Slack de la communauté Datadog][1].


[1]: https://datadoghq.slack.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/service_management/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution