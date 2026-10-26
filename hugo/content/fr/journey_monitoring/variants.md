---
aliases:
- /fr/journey_monitoring/details_report/variants/
description: Définissez et comparez les chemins empruntés par les utilisateurs entre
  les événements de début et de fin d'un parcours.
further_reading:
- link: /journey_monitoring/
  tag: Documentation
  text: En savoir plus sur Journey Monitoring.
- link: /journey_monitoring/configuring_journeys/
  tag: Documentation
  text: Configurez les parcours
- link: /journey_monitoring/details_report/
  tag: Documentation
  text: En savoir plus sur le rapport de détails de parcours
title: Variantes de parcours
---
<div class="alert alert-info">Les variantes de parcours nécessitent un essai actif ou un abonnement payant à <a href="/product_analytics/">Product Analytics</a>.</div>

## Présentation {#overview}

Une **variante** représente un chemin spécifique entre les [événements de début et de fin][8] d'un parcours. Utilisez des variantes pour comparer les [indicateurs clés de performance (KPIs)][3] et les données de télémétrie pour les chemins courants à travers le même parcours.

## Créez une variante {#create-a-variant}

Ajoutez des variantes lorsque vous créez un parcours ou modifiez un parcours existant :

1. Saisissez un nom unique.
2. Ajoutez au moins un [événement d'action ou de vue][9] intermédiaire entre les événements de début et de fin du parcours.
3. Optionnellement, ajoutez des [filtres d'attributs][10] pour limiter la variante à une cohorte spécifique.
4. Enregistrez le parcours.

Le [tunnel][4] se met à jour à mesure que vous ajoutez des événements intermédiaires. Il affiche le volume, le taux de conversion et le temps moyen de conversion pour chaque étape.

### Variantes suggérées {#suggested-variants}

Datadog analyse les séquences courantes d'événements d'action et de vue intermédiaires et suggère des variantes basées sur ces chemins. Les variantes suggérées apparaissent lorsque vous créez un parcours manuellement, que vous en créez un à partir d'un [parcours suggéré][1] ou que vous modifiez un parcours existant.

{{< img src="journey_monitoring/journey-monitoring-details-report-variants.png" alt="Le rapport détaillé Journey Monitoring affichant le panneau des variantes à gauche et une visualisation en tunnel avec les métriques de conversion pour chaque étape de la variante." style="width:100%;" >}}

## Analysez les variantes {#analyze-variants}

Sélectionnez une variante dans le [rapport de détails du parcours][2] pour filtrer les métriques et les données de télémétrie du parcours afin de n'afficher que celles correspondant à ce chemin. Utilisez les données filtrées pour comparer le volume, le taux de conversion, le temps moyen de conversion, les [erreurs frontend][5], les [opérations RUM][6] et la [couverture des tests Synthetic][7] entre les chemins.

## Supprimez une variante {#delete-a-variant}

Dans le rapport de détails du parcours, survolez la variante et cliquez sur l'icône de suppression.

## Pour aller plus loin {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/journey_monitoring/suggested_journeys/
[2]: /fr/journey_monitoring/details_report/
[3]: /fr/journey_monitoring/details_report/#traffic-and-conversion-trends
[4]: /fr/product_analytics/charts/funnel_analysis/
[5]: /fr/error_tracking/
[6]: /fr/real_user_monitoring/operations_monitoring/
[7]: /fr/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[8]: /fr/journey_monitoring/configuring_journeys/#define-start-and-end-conditions
[9]: /fr/product_analytics/data_collected/
[10]: /fr/journey_monitoring/configuring_journeys/#attribute-filters