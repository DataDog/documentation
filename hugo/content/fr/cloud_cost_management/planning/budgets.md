---
aliases:
- /fr/cloud_cost_management/budgets/
description: Une fois l'ingestion des coûts commencée dans Cloud Cost Management,
  configurez des budgets et visualisez votre suivi par rapport à ceux-ci.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-oci
  tag: Blog
  text: Gérez et optimisez vos coûts OCI avec Datadog Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: Blog
  text: Projetez et gérez vos dépenses cloud avec les prévisions budgétaires de Datadog
title: Budgets
---
## Vue d'ensemble {#overview}
Configurez des budgets et permettez aux équipes d'ingénierie de visualiser leur suivi par rapport aux budgets.

Vous pouvez créer deux types de budgets :

- {{< ui >}}Basic{{< /ui >}} : Un budget forfaitaire à niveau unique pour le suivi de vos coûts cloud.
- {{< ui >}}Hierarchical{{< /ui >}} : Un budget à deux niveaux, parent-enfant, pour le suivi des coûts d'une manière qui reflète la structure de votre organisation. Par exemple, si votre organisation comporte des départements composés de nombreuses équipes, vous pouvez établir un budget aux niveaux du département (parent) et de l'équipe (enfant) et suivre la santé budgétaire aux deux niveaux. De plus, cette option vous permet de créer un budget unique au lieu de devoir en créer plusieurs.

## Configurer des budgets {#set-up-budgets}

{{< tabs >}}
{{% tab "Basic" %}}

Pour créer un budget de base :

1. Accédez à [**Cloud Cost > Plan > Budgets**][1], ou créez un budget via l'[API][2] ou [Terraform][3].
1. Cliquez sur {{< ui >}}New Budget{{< /ui >}}.
1. Cliquez sur {{< ui >}}Basic{{< /ui >}} pour créer un budget de base.
1. Vous pouvez ajouter les informations budgétaires soit en {{< ui >}}uploading a CSV{{< /ui >}} utilisant le modèle fourni dans l'interface utilisateur, soit {{< ui >}}enter your budget directly{{< /ui >}} en utilisant les détails ci-dessous.

   {{< img src="cloud_cost/budgets/budget-create-basic-1.mp4" alt="Choisissez si vous souhaitez ajouter les informations budgétaires en téléchargeant un fichier CSV ou en les saisissant directement dans l'interface utilisateur." video="true">}}

   - {{< ui >}}Budget Name{{< /ui >}} : Saisissez un nom pour votre budget.
   - {{< ui >}}Start Date{{< /ui >}} : Saisissez une date de début pour le budget (il peut s'agir d'un mois passé). Les budgets sont définis au niveau mensuel.
   - {{< ui >}}End Date{{< /ui >}} : Définissez une date de fin pour le budget (peut être dans le futur).
   - {{< ui >}}Provider(s){{< /ui >}} : Établissez un budget sur toute combinaison d'AWS, Azure, Google Cloud, Oracle Cloud ou autre SaaS (y compris Datadog ou des coûts personnalisés).
   - {{< ui >}}Dimension to budget by{{< /ui >}} : Spécifiez la dimension à suivre (telle que l'équipe, le service ou l'environnement). Ensuite, définissez les valeurs spécifiques directement dans le tableau budgétaire. Par exemple, pour créer des budgets pour les quatre principales équipes, sélectionnez « team » comme dimension et ajoutez les équipes en tant que lignes dans le tableau. Vous pouvez sélectionner une valeur de tag existante ou en ajouter une nouvelle pour suivre les dépenses futures.

1. Remplissez tous les budgets dans le tableau. Pour appliquer les mêmes valeurs du premier mois au reste des mois, saisissez une valeur dans la première colonne d'une ligne et cliquez sur le bouton {{< ui >}}copy{{< /ui >}}.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vue de création de budget : remplissez les détails du budget." style="width:100%;" >}}

1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /fr/api/latest/cloud-cost-management/#create-or-update-a-budget
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/cost_budget

{{% /tab %}}

{{% tab "Hiérarchique" %}}

Pour créer un budget hiérarchique :

1. Accédez à [**Cloud Cost > Plan > Budgets**][1], ou créez un budget via l'[API][2].
1. Cliquez sur {{< ui >}}New Budget{{< /ui >}}.
1. Cliquez sur {{< ui >}}Hierarchical{{< /ui >}} pour créer un budget hiérarchique.
1. Saisissez les informations de votre budget en utilisant les détails ci-dessous.

   - {{< ui >}}Budget Name{{< /ui >}} : Saisissez un nom pour votre budget.
   - {{< ui >}}Start Date{{< /ui >}} : Saisissez une date de début pour le budget (il peut s'agir d'un mois passé). Les budgets sont définis au niveau mensuel.
   - {{< ui >}}End Date{{< /ui >}} : Définissez une date de fin pour le budget (peut être dans le futur).
   - {{< ui >}}Scope to Provider(s){{< /ui >}} : Établissez un budget sur toute combinaison d'AWS, Azure, Google Cloud, Oracle Cloud ou autre SaaS (y compris Datadog ou des coûts personnalisés).
   - {{< ui >}}Parent Level{{< /ui >}} : Sélectionnez le tag de niveau parent.
   - {{< ui >}}Child Level{{< /ui >}} : Sélectionnez le tag de niveau enfant.
   - {{< ui >}}Dimension to budget by{{< /ui >}} : Spécifiez la dimension à suivre (telle que l'équipe, le service ou l'environnement). Ensuite, définissez les valeurs spécifiques directement dans le tableau budgétaire. Par exemple, pour créer des budgets pour les quatre principales équipes, sélectionnez « team » comme dimension et ajoutez les équipes en tant que lignes dans le tableau. Vous pouvez sélectionner une valeur de tag existante ou en ajouter une nouvelle pour suivre les dépenses futures.

1. Remplissez tous les budgets dans le tableau. Pour appliquer les mêmes valeurs du premier mois au reste des mois, saisissez une valeur dans la première colonne d'une ligne et cliquez sur le bouton {{< ui >}}copy{{< /ui >}}.

   {{< img src="cloud_cost/budgets/budget-copy-paste.png" alt="Vue de création de budget : remplissez les détails du budget." style="width:100%;" >}}

1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /fr/api/latest/cloud-cost-management/#create-or-update-a-budget

{{% /tab %}}
{{< /tabs >}}

## Afficher le statut budgétaire {#view-budget-status}
La [page Budgets][1] répertorie tous les budgets de votre organisation, en mettant en évidence le créateur du budget, tous les budgets qui ont été dépassés,
et d'autres détails pertinents. Cliquez sur {{< ui >}}View Performance{{< /ui >}} pour examiner le budget et comprendre ce qui pourrait causer votre dépassement budgétaire.

   {{< img src="cloud_cost/budgets/budget-list-1.png" alt="Lister tous les budgets">}}

Depuis une {{< ui >}}View Performance{{< /ui >}} page d'un budget individuel, vous pouvez basculer l'option de vue en haut à gauche :

<div class="alert alert-info">
Vous ne pouvez pas consulter le budget par rapport aux dépenses réelles avant 15 mois, car les métriques de coût sont conservées pendant 15 mois.
</div>

- Vous pouvez consulter le statut budgétaire pour le {{< ui >}}current month{{< /ui >}} :

   {{< img src="cloud_cost/budgets/budget-status-month-2.png" alt="Vue du statut budgétaire : afficher le mois en cours">}}

- Ou vous pouvez consulter le statut budgétaire pour le {{< ui >}}entire duration (all){{< /ui >}} :

   {{< img src="cloud_cost/budgets/budget-status-all-2.png" alt="Vue du statut budgétaire : afficher le budget total">}}

Pour examiner les budgets :
1. Depuis la page du budget individuel, filtrez les budgets à l'aide du menu déroulant en haut, ou {{< ui >}}Apply filter{{< /ui >}} dans le tableau pour examiner les dimensions qui dépassent le budget.
   {{< img src="cloud_cost/budgets/budget-investigate-3.png" alt="Utilisez le filtre déroulant ou l'option Appliquer le filtre dans le tableau pour examiner les dimensions dépassant le budget.">}}
2. Cliquez sur {{< ui >}}Copy Link{{< /ui >}} pour partager le budget avec d'autres personnes afin de comprendre pourquoi les budgets sont dépassés. Ou partagez les budgets avec le service financier afin qu'ils puissent comprendre comment vous effectuez le suivi par rapport aux budgets.

## Modifier ou supprimer un budget {#modify-or-delete-a-budget}
Pour modifier un budget, cliquez sur l'icône de modification sur la page Budgets.

{{< img src="cloud_cost/budgets/budget-edit-1.png" alt="Cliquez sur l'icône de modification pour modifier un budget"  style="width:70%;">}}

Pour supprimer un budget, cliquez sur l'icône de corbeille sur la page Budgets.

{{< img src="cloud_cost/budgets/budget-delete-2.png" alt="Cliquez sur l'icône de corbeille pour supprimer un budget"  style="width:70%;">}}

## Ajouter un budget à un dashboard {#add-a-budget-to-a-dashboard}

Vous pouvez ajouter un budget à un dashboard de deux manières :

- Créez un rapport budgétaire et cliquez sur {{< ui >}}Share{{< /ui >}} > {{< ui >}}Save to dashboard{{< /ui >}}.

  {{< img src="cloud_cost/budgets/budget-share-from-dashboard.png" alt="Cliquez sur Partager et Enregistrer dans le dashboard pour ajouter un rapport budgétaire à un dashboard"  style="width:100%;">}}

- Depuis un dashboard, ajoutez le widget {{< ui >}}Budget Summary{{< /ui >}}.

  {{< img src="cloud_cost/budgets/budgets-widgets.png" alt="Recherchez et ajoutez le widget Résumé du budget depuis n'importe quel dashboard"  style="width:100%;">}}

## Créer une alerte pour votre budget {#create-an-alert-for-your-budget}

Créez un [monitor basé sur le budget][2] pour être alerté lorsque les dépenses réelles ou prévues devraient dépasser un pourcentage du budget.

## Afficher les prévisions dans les budgets {#view-forecasts-in-budgets}

Les cartes de budget affichent automatiquement les informations de prévision lorsqu'elles sont disponibles, en montrant les coûts projetés pour chaque période budgétaire. Si les coûts prévus devraient dépasser votre budget, le statut du budget indique {{< ui >}}Projected Over{{< /ui >}} pour vous aider à agir avant de dépasser le budget.

Pour afficher des informations de prévision détaillées dans un budget, cliquez sur {{< ui >}}View Performance{{< /ui >}} et activez {{< ui >}}Show Forecast{{< /ui >}} pour visualiser les coûts prédits parallèlement aux dépenses réelles.

En savoir plus sur le fonctionnement de la [prévision][3] et les exigences en matière de données.

## Personnalisez votre prévision budgétaire {#customize-your-budget-forecast}

Datadog génère automatiquement une **prévision Bits** pour chaque budget, en projetant les coûts futurs à partir de vos dépenses historiques. Lorsque vous disposez d'informations que les prévisions Bits ne peuvent pas prendre en compte, telles qu'un lancement de produit planifié, une migration, une demande saisonnière ou des charges de travail retirées, vous pouvez les remplacer par vos propres valeurs. Ce remplacement est appelé **prévision personnalisée**.

Les valeurs de prévision personnalisées sont :

- Modifiables avec l'autorisation `ccm_forecast_write` (voir [Autorisations](#permissions)).
- Modifiables pour le mois en cours et les mois futurs.

Pour les [budgets hiérarchiques](#set-up-budgets), vous modifiez les valeurs de prévision personnalisées au niveau enfant. Le niveau parent reflète la somme de ses enfants.

Une fois définies, vos valeurs personnalisées prévalent sur les prévisions Bits sur la page d'état du budget, dans les totaux des prévisions sur la page Budgets et dans les [monitors de budget][2].

### Ajouter ou modifier des valeurs de prévision personnalisées {#add-or-edit-custom-forecast-values}

{{< tabs >}}
{{% tab "Lors de la création d'un budget" %}}

1. Suivez les étapes décrites dans [Configurer des budgets](#set-up-budgets) pour commencer à créer un budget.
1. Activez {{< ui >}}Customize Bits Forecast{{< /ui >}} pour afficher les colonnes de prévisions intercalées avec les colonnes budgétaires. Chaque mois affiche une colonne {{< ui >}}Budget{{< /ui >}} et une colonne {{< ui >}}Forecast{{< /ui >}}.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create.png" alt="Activez Personnaliser les prévisions Bits pour afficher les colonnes de prévisions" style="width:100%;">}}

1. Chaque cellule de prévision affiche la prévision Bits sous forme d'espace réservé gris. Saisissez un montant en dollars pour la remplacer. Les valeurs négatives ne sont pas autorisées.

   Le graphique de prévisualisation se met à jour au fur et à mesure de vos modifications, ce qui vous permet d'examiner la prévision finale avant d'enregistrer.

  {{< img src="cloud_cost/budgets/cust-fcst-during-create-table.png" alt="Activez Personnaliser les prévisions Bits pour afficher les colonnes de prévisions" style="width:100%;">}}

1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

{{% /tab %}}
{{% tab "Lors de la modification d'un budget" %}}

1. Sur la [Budgets page][1], cliquez sur l'icône de modification pour un budget.

   Les colonnes de prévision apparaissent automatiquement si vous disposez de l'autorisation `ccm_forecast_write`. Chaque cellule de prévision affiche votre valeur de remplacement enregistrée, ou la prévision Bits sous forme d'espace réservé gris lorsqu'aucune valeur de remplacement n'existe.

1. Saisissez ou modifiez un montant en dollars dans n'importe quelle cellule de prévision. Les valeurs négatives ne sont pas autorisées.
1. Pour comparer vos valeurs de remplacement aux valeurs automatiques d'origine, activez {{< ui >}}Show Bits AI forecast{{< /ui >}} pour afficher une colonne Bits AI en lecture seule à côté de chaque colonne de prévision.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

[1]: https://app.datadoghq.com/cost/plan/budgets

{{% /tab %}}
{{< /tabs >}}

Lors de la modification, l'apparence de chaque cellule de prévision indique son état :

| Apparence de la cellule | Signification |
|---|---|
| Texte gris | Espace réservé de prévision Bits : aucune valeur de remplacement n'est définie pour cette cellule. |
| Texte noir | Une valeur de remplacement de prévision personnalisée enregistrée. |
| Texte noir avec un contour bleu | Une valeur de remplacement que vous avez saisie mais pas encore enregistrée. |

Pour supprimer une valeur de remplacement, effacez le contenu de la cellule. La cellule revient à l'espace réservé de prévision Bits gris.

<div class="alert alert-info">Datadog enregistre d'abord le budget, puis enregistre la prévision personnalisée. Si le budget est enregistré mais pas la prévision personnalisée, une notification vous invite à réessayer depuis la page de modification.</div>

### Comment les prévisions personnalisées sont utilisées {#how-custom-forecasts-are-used}

- **État du budget** : La page d'état du budget et les totaux de prévision sur la page Budgets incluent votre prévision personnalisée.
- **monitors de budget** : Lorsque les [monitors de budget][2] s'exécutent, une prévision personnalisée prévaut sur la prévision Bits lorsqu'elle est présente.
- **Exportation CSV** : Le téléchargement d'un budget au format CSV inclut les valeurs de prévision personnalisées lorsqu'elles sont définies.
- **Suppression d'un budget** : La suppression d'un budget supprime également ses valeurs de prévision personnalisées associées.

## Autorisations {#permissions}

| Action | Autorisation requise |
|--------|---------------------|
| Afficher les budgets | `cloud_cost_management_read` |
| Créer, modifier ou supprimer un budget | `ccm_budget_write` |
| Modifier les valeurs de prévision personnalisées | `ccm_forecast_write` |

Pour obtenir la liste complète des autorisations CCM, consultez la [documentation sur les autorisations][4].

## Lectures complémentaires {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/budgets
[2]: /fr/cloud_cost_management/cost_changes/monitors/
[3]: /fr/cloud_cost_management/planning/forecasting
[4]: /fr/cloud_cost_management/setup/permissions