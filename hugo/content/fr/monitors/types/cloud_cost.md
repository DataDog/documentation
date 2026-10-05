---
description: Surveillez les variations de coûts, les seuils, les prévisions et les
  anomalies de vos coûts cloud, y compris les augmentations des coûts d'IA en temps
  réel.
further_reading:
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
- link: https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview
  tag: Documentation
  text: Cloud Cost Management
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
- link: /monitors/status/
  tag: Documentation
  text: Consulter le statut de votre monitor
- link: https://www.datadoghq.com/blog/ccm-cost-monitors/
  tag: Blog
  text: Réagissez rapidement aux dépassements de coûts avec les monitors de coûts
    pour Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/google-cloud-cost-management/
  tag: Blog
  text: Permettez aux ingénieurs de prendre en charge les coûts Google Cloud avec
    Datadog
title: Monitor Cloud Cost
---
## Présentation {#overview}

Les monitors Cloud Cost vous aident à identifier de manière proactive les variations de coûts et à comprendre si vous prévoyez de dépasser votre budget, afin que vous puissiez en rechercher la cause.

-   Affichez instantanément tous vos monitors de coûts et filtrez ou recherchez par équipe, service, tag, fournisseur ou statut d'alerte.
-   Consultez un résumé du nombre de monitors configurés, de ceux qui envoient des alertes et des domaines de dépenses cloud suivis.
-   Créez de nouveaux monitors de coûts à l'aide de modèles et intervenez sur les monitors qui nécessitent une attention particulière.

Afin de configurer les monitors Cloud Cost, vous devez avoir configuré [Cloud Cost Management][1].

Choisissez la configuration qui correspond aux données de coûts sur lesquelles vous souhaitez générer une alerte :

-   [Créez un monitor](#create-a-monitor) pour les variations, les seuils, les prévisions, les budgets et les anomalies de coûts finalisées. Ces monitors utilisent des données de facturation finalisées, une fréquence d'évaluation de 30 minutes et une fenêtre d'évaluation différée de 48 heures, car les données de facturation peuvent ne pas être disponibles avant 48 heures après l'utilisation. Par exemple, une analyse rétrospective sur 7 jours évaluée le 15 janvier examine les données de coûts du 6 janvier au 13 janvier.
-   [Créez un monitor d'anomalies d'IA en temps réel](#create-a-real-time-ai-anomaly-monitor) pour générer une alerte dans les 15 minutes lorsque le coût estimé de l'IA provenant de [Agent Observability][102] augmente de manière inattendue.

## Créer un monitor {#create-a-monitor}

Cette procédure couvre les monitors Cloud Cost qui utilisent des données de facturation finalisées : variations, seuils, prévisions, budgets et monitors d'anomalies finalisées. Pour générer une alerte sur le coût estimé de l'IA dans les 15 minutes, consultez [Créer un monitor d'anomalies d'IA en temps réel](#create-a-real-time-ai-anomaly-monitor).

Pour créer un monitor Cloud Cost dans Datadog, accédez à [{{< ui >}}Cloud Cost > Analyze > Cost Monitors{{< /ui >}}][4] et cliquez sur {{< ui >}}\+ New Cost Monitor{{< /ui >}}.

Alternativement, vous pouvez en configurer un depuis [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}} > {{< ui >}}Cloud Cost{{< /ui >}}][3], la navigation principale, le [Cloud Cost Explorer][5], ou via [Terraform][2].

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-create-new.png" alt="Le bouton Créer un monitor sur la page Monitor de coûts" style="width:100%;" >}}

### Sélectionnez un type de monitor de coûts {#select-a-cost-monitor-type}

Vous pouvez choisir parmi les types de monitors suivants :

| Type de monitor | Basé sur une métrique de coût | Objectif                                                                                                                                                                                                                                                   | Exemple                                                                                            |
| ------------ | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Changements      | Oui               | Détectez les changements de coûts quotidiens, hebdomadaires ou mensuels.                                                                                                                                                                                                            | Alerter lorsque la différence entre le coût d'aujourd'hui et celui de la semaine précédente dépasse 5 %.                     |
| Anomalies    | Oui               | Identifiez les modèles de coûts inhabituels ou inattendus. <br> <br> Les monitors finalisés excluent les jours incomplets et nécessitent au moins 1 mois de données de coûts cloud, car des données historiques sont requises pour entraîner l'algorithme. [Les monitors d'anomalies IA en temps réel](#create-a-real-time-ai-anomaly-monitor) alertent sur le coût estimé de l'IA dans les 15 minutes. | Alerter si 3 jours sur les 30 derniers jours présentent des anomalies de coût significatives par rapport aux données historiques, ou alerter dans les 15 minutes lorsque le coût estimé de l'IA augmente de manière inattendue. |
| Seuil    | Oui               | Alerter lorsque les coûts dépassent une valeur définie.                                                                                                                                                                                                                      | Définissez des alertes lorsque le coût total du jour dépasse 10 000 $.                                                |
| Prévision     | Oui               | Alerter si les coûts prévus dépassent un seuil.                                                                                                                                                                                                            | Alerter quotidiennement si le coût prévu pour ce mois devrait dépasser 500 $.                     |
| Budget       | Non                | Alerter si les coûts réels ou [prévus][8] dépassent votre [budget][7].                                                                                                                                                                                         | Alerter si le coût prévu pour le mois devrait dépasser 90 % du budget alloué de 10 000 $.      |

### Spécifiez le coût à suivre {#specify-which-cost-to-track}

{{< tabs >}}
{{% tab "Basé sur une métrique de coût" %}}

Tout type de coût ou métrique rapporté à Datadog est disponible pour les monitors. Vous pouvez utiliser des métriques personnalisées ou des métriques d'observabilité parallèlement à une métrique de coût pour surveiller l'économie unitaire.

| Étape                     | Requis | Par défaut           | Exemple                 |
| ------------------------ | -------- | ----------------- | ----------------------- |
| Sélectionnez la métrique de coût   | Oui      | Tous les fournisseurs     | `azure.cost.actual`     |
| Définissez le `filter by`   | Non       | Rien           | `aws_product:s3`        |
| Grouper par                 | Non       | Rien           | `aws_availability_zone` |
| Ajouter une métrique d'observabilité | Non       | `system.cpu.user` | `aws.s3.all_requests`   |

Utilisez l'éditeur pour définir les types de coûts ou les exportations.

{{< img src="monitors/monitor_types/cloud_cost/cost-monitors-specify-cost.png" alt="Options de source de données Cloud Cost et Métriques pour spécifier les coûts à suivre" style="width:100%;" >}}

{{% /tab %}}
{{% tab "Basé sur le budget" %}}

Sélectionnez un budget existant à surveiller dans la liste déroulante.

{{< img src="monitors/monitor_types/cloud_cost/budget-monitor-select-budget.png" alt="Liste déroulante permettant de spécifier le budget auquel imputer les coûts suivis" style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

Pour plus d'informations, consultez la [documentation Cloud Cost Management][1].

### Définir les conditions d'alerte {#set-alert-conditions}

{{< tabs >}}
{{% tab "Changements" %}}

Si vous utilisez le type de monitor {{< ui >}}Cost Changes{{< /ui >}}, vous pouvez déclencher une alerte lorsque le coût est `increases` ou `decreases` le seuil défini. Le seuil peut être défini à une {{< ui >}}Percentage Change{{< /ui >}} ou à {{< ui >}}Dollar Amount{{< /ui >}}.

Si vous utilisez le {{< ui >}}Percentage Change{{< /ui >}}, vous pouvez exclure les changements inférieurs à un certain seuil en dollars. Par exemple, le monitor alerte en cas de changement de coût supérieur à 5 % pour tout changement supérieur à 500 $.

{{% /tab %}}

{{% tab "Anomalies" %}}

Ces conditions s'appliquent lorsque {{< ui >}}Alert on{{< /ui >}} est {{< ui >}}finalized{{< /ui >}}. Pour générer une alerte sur le coût estimé de l'IA dans les 15 minutes, consultez [Créer un monitor d'anomalies d'IA en temps réel](#create-a-real-time-ai-anomaly-monitor).

Pour le type de monitor {{< ui >}}Cost Anomalies{{< /ui >}}, vous pouvez déclencher une alerte si le coût observé est `above`, `below` ou `above or below` un seuil par rapport aux données historiques.

L'`agile` [algorithme d'anomalie][101] est utilisé avec deux bornes et une saisonnalité mensuelle.

[101]: /fr/dashboards/functions/algorithms/

{{% /tab %}}

{{% tab "Seuil" %}}

Si vous utilisez le type de monitor {{< ui >}}Cost Threshold{{< /ui >}}, vous pouvez déclencher une alerte lorsque le coût cloud est `above`, `below`, `above or equal` ou `below or equal to` un seuil.

{{% /tab %}}
{{% tab "Prévision" %}}

Si vous utilisez le type de monitor {{< ui >}}Cost Forecast{{< /ui >}}, vous pouvez déclencher une alerte lorsque le coût cloud est `above`, `below`, `above or equal`, `below or equal to`, `equal to` ou `not equal to` un seuil.

{{% /tab %}}

{{% tab "Budget" %}}
Si vous utilisez le type de monitor {{< ui >}}Budget{{< /ui >}}, vous pouvez déclencher une alerte lorsque le coût cloud réel ou prévu dépasse un pourcentage du budget que vous avez sélectionné à l'étape précédente.

| Étape             | Objectif                                                                           | Valeurs                            |
| ---------------- | --------------------------------------------------------------------------------- | --------------------------------- |
| Base d'évaluation | Indique si le monitor compare les dépenses réelles ou les dépenses prévues par rapport au budget. | `actual`, `forecasted`            |
| Granularité      | Niveau de détail auquel le coût est évalué.                                   | `overall` (coût total), `per_row` |
| Seuil        | Pourcentage du budget utilisé pour déclencher l'alerte.                       | Nombre compris entre 0 et 100 (%)      |
| Période           | Fenêtre d'évaluation utilisée pour déterminer si le seuil est dépassé.                    | `all_months`, `current_month`     |

Lorsque vous sélectionnez {{< ui >}}is forecasted to reach{{< /ui >}}, le monitor utilise le même [modèle de prévision][8] que les cartes de budget et la page de statut du budget.

[8]: /fr/cloud_cost_management/planning/forecasting/
{{% /tab %}}
{{< /tabs >}}

<br>

### Configurer les notifications et les automatisations {#configure-notifications-and-automations}

Pour des instructions détaillées sur la section {{< ui >}}Configure notifications and automations{{< /ui >}}, consultez la page [Notifications][6].

### Définir les autorisations et les notifications d'audit {#define-permissions-and-audit-notifications}

Choisissez quelles équipes, quels rôles, quels utilisateurs ou quels comptes de service sont autorisés à **afficher** ou **modifier** le monitor. Par défaut, tous les membres de votre organisation y ont accès.

Vous pouvez également activer {{< ui >}}Audit Notifications{{< /ui >}} pour alerter le créateur du monitor et les destinataires chaque fois que le monitor est modifié.

## Créer un monitor d'anomalies IA en temps réel {#create-a-real-time-ai-anomaly-monitor}

Les monitors d'anomalies IA en temps réel détectent les augmentations inattendues du coût estimé de l'IA et alertent dans les 15 minutes. Ils utilisent le coût estimé provenant de [Agent Observability][102], et non les données de facturation cloud finalisées. Datadog identifie les anomalies à partir d'une fenêtre d'évaluation glissante de 4 heures du coût estimé.

### Prérequis {#prerequisites}

- [Agent Observability][102] envoie des données de coût LLM. Le coût estimé est calculé à partir du nombre de jetons et de la tarification du fournisseur. Voir [Coûts d'Agent Observability][103].
- La métrique [`ml_obs.span.llm.total.cost`][104] a été rapportée. L'option {{< ui >}}real time{{< /ui >}} apparaît une fois que cette métrique a été rapportée.
- Au moins 3 jours de données de coût sont disponibles. Datadog recommande 21 jours pour la qualité de la détection.

### Configurez le monitor {#configure-the-monitor}

1. Accédez à [{{< ui >}}Cloud Cost{{< /ui >}} > {{< ui >}}Analyze{{< /ui >}} > {{< ui >}}Cost Monitors{{< /ui >}}][4] et cliquez sur {{< ui >}}\+ New Cost Monitor{{< /ui >}}.
2. Sélectionnez {{< ui >}}Anomalies{{< /ui >}}.
3. Définissez {{< ui >}}Alert on{{< /ui >}} sur {{< ui >}}real time{{< /ui >}} et le type de coût sur {{< ui >}}AI cost{{< /ui >}}. Le monitor envoie des alertes en cas d'anomalies détectées au cours des 15 dernières minutes.
4. Optionnellement, utilisez {{< ui >}}Filter cost to{{< /ui >}} pour définir le périmètre du coût, et {{< ui >}}Detect anomalies on{{< /ui >}} pour grouper par deux tags maximum. `ml_app` et `model_provider` sont listés sous {{< ui >}}Preferred Tags{{< /ui >}}.
5. Définissez un seuil pour le coût total estimé sur les prochaines 24 heures. Saisissez au moins 500 dans la devise de votre organisation. Le monitor envoie des alertes lorsque Datadog détecte une anomalie et que le coût total estimé dépasse ce seuil.
6. [Configure notifications][6].

Pour surveiller plutôt les données de facturation cloud finalisées, réglez {{< ui >}}Alert on{{< /ui >}} sur {{< ui >}}finalized{{< /ui >}} et suivez [Create a monitor](#create-a-monitor). Les monitors d'anomalies finalisées utilisent l'algorithme d'anomalie agile, excluent les jours incomplets et nécessitent au moins 1 mois d'historique des coûts cloud.

## Autres actions que vous pouvez effectuer {#other-actions-you-can-take}

{{< img src="/monitors/monitor_types/cloud_cost/cost-monitors-other-actions.png" alt="Le menu des actions s'ouvre avec des options pour afficher le monitor dans le Cloud Cost Explorer, ainsi que des options pour modifier, cloner et supprimer le monitor." style="width:100%;" >}}

-   {{< ui >}}View in Monitors{{< /ui >}} Pour voir l'historique des alertes de votre monitor, ajuster les visualisations et examiner la fréquence à laquelle il a déclenché des alertes.
-   {{< ui >}}View in Explorer{{< /ui >}} Pour ouvrir le monitor dans le Cloud Cost Explorer pour une analyse plus approfondie.
-   {{< ui >}}Edit{{< /ui >}} un monitor pour mettre à jour les paramètres ou la configuration du monitor.
-   {{< ui >}}Clone{{< /ui >}} un monitor pour créer une copie d'un monitor existant en choisissant {{< ui >}}Actions{{< /ui >}} > {{< ui >}}Clone{{< /ui >}}.
-   {{< ui >}}Delete{{< /ui >}} un monitor pour supprimer définitivement un monitor dont vous n'avez plus besoin.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloud_cost_management/
[2]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/monitor
[3]: https://app.datadoghq.com/monitors/create/cost
[4]: https://app.datadoghq.com/cost/analyze/monitors
[5]: https://app.datadoghq.com/cost/explorer
[6]: /fr/monitors/notify/
[7]: /fr/cloud_cost_management/planning/budgets/
[8]: /fr/cloud_cost_management/planning/forecasting/
[102]: /fr/llm_observability/
[103]: /fr/llm_observability/investigate/cost/
[104]: /fr/llm_observability/investigate/metrics/