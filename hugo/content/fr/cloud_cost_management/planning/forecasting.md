---
description: Prévoyez les coûts cloud futurs et prenez des décisions éclairées avec
  Cloud Cost Management Forecasts.
further_reading:
- link: /cloud_cost_management/planning/budgets
  tag: Documentation
  text: En savoir plus sur Cloud Cost Management Budgets.
- link: /cloud_cost_management/reporting/
  tag: Documentation
  text: En savoir plus sur Cloud Cost Management Reports.
- link: /cloud_cost_management/
  tag: Documentation
  text: Cloud Cost Management
- link: https://www.datadoghq.com/blog/cloud-cost-management-budget-forecasting/
  tag: Blog
  text: Projetez et gérez vos dépenses cloud avec les prévisions budgétaires de Datadog
title: Prévisions
---
## Présentation {#overview}

Cloud Cost Management (CCM) Forecasts vous aident à prédire les coûts cloud futurs en fonction des modèles de dépenses historiques. Utilisez les prévisions pour anticiper les tendances des coûts, planifier les budgets plus efficacement et prendre des décisions basées sur les données concernant l'allocation des ressources.

Les prévisions sont disponibles dans :
- [**Rapports**](#view-forecasts-in-reports) : Activez le bouton de prévision sur Cost reports et Budget reports pour visualiser les coûts prévus.
- [**Budgets**](#view-forecasts-in-budgets) : Affichez les coûts prévus directement sur les cartes de budget pour voir si vous prévoyez de dépasser votre budget.

Avec Forecasts, vous pouvez :

- Anticiper **les tendances des dépenses** basées sur vos données historiques pour prévoir les coûts futurs.
- Visualiser **les coûts projetés** parallèlement aux dépenses réelles pour identifier des modèles et comprendre les tendances des coûts.
- Utilisez les données de prévision pour définir **des objectifs budgétaires réalistes** et éviter les dépassements de coûts.
- Vérifiez si les coûts prévus risquent de dépasser **vos objectifs budgétaires** pour suivre la santé de votre budget.

## Comment fonctionne la prévision {#how-forecasting-works}

Cloud Cost Management utilise des algorithmes de prévision pour générer des prédictions de coûts. Le modèle de prévision analyse vos données de dépenses historiques pour identifier des modèles et des tendances dans vos coûts cloud, notamment :

- Les coûts récurrents qui surviennent selon un **planning prévisible** (comme des cycles hebdomadaires ou mensuels).
- Si vos coûts sont **en augmentation, en diminution ou stables** au fil du temps.
- Les changements dans les dépenses qui correspondent à **des périodes ou des événements spécifiques**.

### Options de prévision flexibles {#flexible-forecasting-options}

Vous pouvez générer des prévisions pour divers horizons temporels et intervalles de cumul afin de répondre à vos besoins de planification :

- {{< ui >}}Forecast periods{{< /ui >}} : Prévoyez les coûts pour la prochaine période de facturation, le mois en cours, l'année en cours ou une plage de dates personnalisée basée sur vos données de dépenses historiques.
- {{< ui >}}Rollup intervals{{< /ui >}} : Affichez les prévisions à des intervalles quotidiens ou mensuels en fonction de vos besoins d'analyse.

### Exigences en matière de données {#data-requirements}

Pour générer des prévisions précises, CCM nécessite :

- **Au moins 64 jours consécutifs de données de coûts** : Cela permet de garantir que le modèle dispose d'informations suffisantes pour identifier des modèles significatifs. Si moins de jours sont disponibles, le modèle complète les jours restants avec des zéros pour générer une prévision.
- **Données récentes** : Le modèle utilise jusqu'aux 64 derniers jours de votre historique de coûts pour générer des prédictions.

## Bits forecasts et prévisions personnalisées {#bits-and-custom-forecasts}

La prévision que Datadog génère automatiquement à partir de vos dépenses historiques est appelée **Bits forecast**. Comme elle est basée sur les tendances, elle projette les modèles passés vers l'avenir mais ne peut pas prendre en compte les événements commerciaux planifiés, tels qu'un lancement de produit, une migration ou une demande saisonnière.

Dans [budgets][3], vous pouvez remplacer le Bits forecast par vos propres valeurs mensuelles, appelées **prévision personnalisée**. Datadog superpose votre prévision personnalisée sur le Bits forecast, de sorte que vos remplacements prévalent partout où vous les définissez. Les budgets et les monitors de budget utilisent la prévision avec vos remplacements par défaut.

Pour définir des valeurs de prévision personnalisées, consultez [Personnaliser votre prévision budgétaire][4].

## Afficher Forecasts dans les rapports {#view-forecasts-in-reports}

Accédez à [**Cloud Cost > Analyze > Reports**][1] dans Datadog pour activer Forecasts sur Cost reports et Budget reports.

### Cost reports {#cost-reports}

1. Ouvrez ou créez un rapport {{< ui >}}Cost{{< /ui >}}.
2. Dans le panneau de gauche, activez {{< ui >}}Show forecast{{< /ui >}} pour activer les prévisions.
3. Sélectionnez la période de prévision dans la liste déroulante {{< ui >}}Until end of{{< /ui >}} (période suivante, mois en cours, année en cours ou plage personnalisée).
4. Choisissez un intervalle de cumul (quotidien, hebdomadaire ou mensuel).

{{< img src="cloud_cost/forecasts/cost-report-with-forecast.png" alt="Rapport de coûts affichant le bouton de bascule « Show Forecast » dans le panneau de gauche et les coûts prévus affichés aux côtés des données historiques avec un motif hachuré." style="width:100%;" >}}

Le rapport affiche :
- {{< ui >}}Forecast toggle and controls{{< /ui >}} : Activez les prévisions, sélectionnez la période et choisissez l'intervalle de cumul.
- {{< ui >}}Historical costs{{< /ui >}} : Vos dépenses réelles affichées en couleurs pleines.
- {{< ui >}}Forecasted costs{{< /ui >}} : Coûts prévus affichés avec un motif hachuré.
- {{< ui >}}Forecast summary card{{< /ui >}} : Affiche le coût total prévu pour la période sélectionnée.

### Rapports budgétaires {#budget-reports}

1. Créez un rapport ou ouvrez un rapport {{< ui >}}Budget{{< /ui >}} existant.
2. Dans le panneau de gauche, activez {{< ui >}}Show forecast{{< /ui >}} pour activer les prévisions.
3. Sélectionnez la période de prévision dans la liste déroulante {{< ui >}}Until end of{{< /ui >}} (période suivante, mois en cours, année en cours ou plage personnalisée).

{{< img src="cloud_cost/forecasts/budget_report_forecast-2.png" alt="Rapport budgétaire affichant le bouton « forecast toggle » dans le panneau de gauche et les coûts prévus affichés avec les données historiques." style="width:100%;" >}}

Le rapport affiche :
- {{< ui >}}Forecast toggle and controls{{< /ui >}} : Situé dans le panneau de gauche pour activer les prévisions et sélectionner la période.
- {{< ui >}}Historical costs{{< /ui >}} : Vos dépenses réelles affichées en couleurs pleines.
- {{< ui >}}Forecasted costs{{< /ui >}} : Coûts prévus affichés avec un motif hachuré.
- {{< ui >}}Forecast summary card{{< /ui >}} : Affiche le coût total prévu pour la période sélectionnée.

## Afficher les prévisions dans les budgets {#view-forecasts-in-budgets}

Accédez à [**Cloud Cost > Plan > Budgets**][2] dans Datadog pour afficher Forecasts dans vos résumés budgétaires.

Les cartes de budget affichent automatiquement les informations de prévision lorsqu'elles sont disponibles, en montrant les coûts projetés pour chaque période budgétaire.

Si les coûts prévus devraient dépasser votre budget, le statut du budget indique {{< ui >}}Projected Over{{< /ui >}} pour vous aider à agir avant de dépasser le budget.

{{< img src="cloud_cost/forecasts/budget-list-with-forecast.png" alt="Liste des budgets affichant les valeurs prévisionnelles sur les cartes de budget." style="width:100%;" >}}

Pour afficher des informations détaillées sur les prévisions :

1. Depuis la page Budgets, cliquez sur {{< ui >}}View Performance{{< /ui >}} sur n'importe quel budget pour ouvrir la vue détaillée du budget.
2. Dans la vue de performance budgétaire, activez {{< ui >}}Show Forecast{{< /ui >}} pour activer Forecasts.
3. Le graphique de performance budgétaire affiche :
   - {{< ui >}}Actual costs{{< /ui >}}: Vos dépenses actuelles représentées par des couleurs pleines.
   - {{< ui >}}Forecasted costs{{< /ui >}}: Les coûts prévus représentés par un motif hachuré s'étendant au-delà de vos coûts réels.
   - {{< ui >}}Forecasted Past{{< /ui >}}: Une ligne verticale indiquant où commence la prévision.

{{< img src="cloud_cost/forecasts/updated_budget_status_forecast-1.png" alt="Vue de la performance budgétaire montrant le bouton « forecast toggle » et les coûts prévus affichés avec un motif hachuré." style="width:100%;" >}}

Par défaut, Datadog combine le Bits forecast automatique avec toutes les valeurs de prévision personnalisées que vous définissez dans les budgets. Pour remplacer le Bits forecast par vos propres valeurs mensuelles, consultez [Personnaliser votre prévision budgétaire][4].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/analyze/reports
[2]: https://app.datadoghq.com/cost/plan/budgets
[3]: /fr/cloud_cost_management/planning/budgets
[4]: /fr/cloud_cost_management/planning/budgets#customize-your-budget-forecast