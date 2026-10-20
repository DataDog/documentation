---
algolia:
  tags:
  - workflow
  - workflows
  - workflow automation
aliases:
- /fr/service_management/workflows/track
description: Surveillez l'activité, les métriques et les coûts des workflows à l'aide
  de dashboards, de pistes d'audit, de la gestion des événements et de l'attribution
  de l'utilisation.
disable_toc: false
further_reading:
- link: /actions/workflows/build
  tag: Documentation
  text: Créez des workflows
- link: /account_management/audit_trail/
  tag: Documentation
  text: Datadog Audit Trail
- link: /account_management/billing/usage_attribution/
  tag: Documentation
  text: Usage Attribution
title: Suivre les workflows
---
{{< site-region region="gov2" >}}
<div class="alert alert-info">Workflow Automation est en préversion sur votre site Datadog sélectionné ({{< region-param key=dd_site_name >}}).</div>
{{< /site-region >}}

Cette page explique comment suivre différents types d'activité et de coûts de workflow.

## Dashboard prêt à l'emploi {#out-of-the-box-dashboard}

Le dashboard Workflows Overview fournit une vue d'ensemble de haut niveau de vos workflows et exécutions Datadog. Pour trouver le dashboard, accédez à votre [liste Dashboard][2] et recherchez {{< ui >}}Workflows Overview{{< /ui >}}.

{{< img src="actions/workflows/workflows-dashboard.png" alt="Le dashboard Workflows Overview" style="width:80%;" >}}


## Afficher les modifications et les exécutions de workflow dans Audit Trail {#view-workflow-edits-and-runs-in-audit-trail}

Vous pouvez afficher les modifications et les exécutions de workflow à l'aide de Audit Trail.

Par exemple, pour voir qui a modifié un workflow :

1. Depuis votre workflow, cliquez sur <i class="icon-cog-2"></i> **(engrenage)** dans le coin supérieur droit et cliquez sur {{< ui >}}View audit events{{< /ui >}}.<br>Une recherche Audit Trail filtrée sur votre workflow s'ouvre.
1. À gauche, sous les filtres {{< ui >}}Core{{< /ui >}}, développez {{< ui >}}Action{{< /ui >}}.
1. Survolez {{< ui >}}Modified{{< /ui >}} et cliquez sur {{< ui >}}Only{{< /ui >}} pour filtrer les résultats afin d'afficher uniquement les modifications de workflow.<br>La colonne {{< ui >}}User ID{{< /ui >}} affiche le nom d'utilisateur de la personne ayant effectué chaque modification.


## Notifier les exécutions {#notify-about-runs}

Consultez [Workflow notifications][3] pour obtenir des instructions sur l'utilisation des notifications de workflow intégrées.


## Suivre les métriques de workflow avec un monitor Datadog {#track-workflow-metrics-with-a-datadog-monitor}

Vous pouvez utiliser des monitors Datadog pour suivre diverses métriques de workflow.

La liste des métriques disponibles est la suivante :

| Métrique | Description |
| ------ | ----------- |
| `datadog.workflows.count`                      | Nombre de workflows non supprimés.                       |
| `datadog.workflows.executions.started`         | Nombre d'instances de workflow ayant démarré.   |
| `datadog.workflows.executions.completed`       | Nombre d'instances de workflow terminées.      |
| `datadog.workflows.steps.executions.started`   | Nombre d'étapes d'instance de workflow ayant démarré.   |
| `datadog.workflows.steps.executions.completed` | Nombre d'étapes d'instance de workflow terminées. |

Pour créer un monitor qui suit si les exécutions quotidiennes de workflow dépassent un certain seuil, effectuez les étapes suivantes :

1. Accédez à [New Monitor][4] et sélectionnez le type de monitor {{< ui >}}Metric{{< /ui >}}.
1. Sous {{< ui >}}Define the metric{{< /ui >}}, pour {{< ui >}}a{{< /ui >}}, renseignez `datadog.workflows.executions.started`.
1. _Optionnellement_, pour restreindre le monitor à un workflow spécifique, pour {{< ui >}}from{{< /ui >}}, renseignez `workflow_id:[WORKFLOW-ID]`, en remplaçant `[WORKFLOW-ID]` par l'ID de votre workflow.
1. Pour {{< ui >}}Evaluation Details{{< /ui >}}, utilisez les valeurs suivantes :
    - {{< ui >}}Evaluate the{{< /ui >}} : `sum`
    - {{< ui >}}Of the query over the{{< /ui >}} : `last 1 day`.
1. Pour {{< ui >}}Set alert conditions{{< /ui >}}, choisissez {{< ui >}}above{{< /ui >}}, puis renseignez un seuil d'alerte et un seuil d'avertissement. Par exemple, vous pourriez renseigner un {{< ui >}}Alert threshold{{< /ui >}} de `200` et un {{< ui >}}Warning threshold{{< /ui >}} de `150`.
1. Sous {{< ui >}}Configure notifications & automations{{< /ui >}}, nommez votre workflow, puis renseignez le texte du message. Par exemple, vous pourriez utiliser un texte de message comme le suivant :

    {{< code-block lang="none" >}}@slack-alert-channel

{{#is_warning}}
Workflow has executed {{warn_threshold}} times in the last day; manual action might be needed to avoid alerting.
{{/is_warning}}
{{#is_alert}}
Workflow has executed {{threshold}} times in the last day, which is our budget threshold for workflows. We should unpublish the workflow to avoid any more automatic executions for the day.
{{/is_alert}}
{{< /code-block >}}
1. Cliquez sur {{< ui >}}Create{{< /ui >}}.


## Afficher les événements de workflow dans le Gestionnaire d'événements {#view-workflow-events-in-event-manager}

Vous pouvez utiliser [Event Manager][5] pour afficher les événements de début et de fin de workflow en filtrant sur `source:workflow_automation`.

Pour voir les événements d'un workflow spécifique, dans la zone {{< ui >}}Search facets{{< /ui >}}, recherchez `workflow.workflow_id`. Vous pouvez sélectionner un ensemble spécifique d'ID pour afficher uniquement les événements de ces workflows.

Vous pouvez également filtrer la sortie par {{< ui >}}Status{{< /ui >}} pour voir uniquement les messages `info`, `warn` ou `error`.


## Suivre la facturation des workflows dans l'Attribution d'utilisation {#track-workflow-billing-in-usage-attribution}

<div class="alert alert-danger">
L'attribution de l'utilisation est une fonctionnalité avancée incluse dans le forfait Enterprise. Pour tous les autres forfaits, contactez votre responsable de compte ou <a href="mailto:success@datadoghq.com">success@datadoghq.com</a> pour demander cette fonctionnalité.
</div>

Pour suivre la facturation de vos exécutions de workflow, effectuez les étapes suivantes :

1. Accédez à la page [Usage Attribution][6].
1. Sous {{< ui >}}Products{{< /ui >}} à gauche, recherchez {{< ui >}}Workflow Executions{{< /ui >}}.
1. Survolez {{< ui >}}Workflow Executions{{< /ui >}} et cliquez sur {{< ui >}}Only{{< /ui >}} pour afficher l'attribution de l'utilisation uniquement pour les workflows.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>Avez-vous des questions ou des commentaires ? Rejoignez le canal **#workflows** sur le [Datadog Community Slack][1].


[1]: https://chat.datadoghq.com/
[2]: https://app.datadoghq.com/dashboard/lists
[3]: /fr/actions/workflows/build/#workflow-notifications
[4]: https://app.datadoghq.com/monitors/create
[5]: https://app.datadoghq.com/event/explorer?query=source%3Aworkflow_automation
[6]: https://app.datadoghq.com/billing/usage-attribution