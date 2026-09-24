---
description: Ajoutez des ventilations par facettes pour diviser votre requête Product
  Analytics en plusieurs valeurs.
title: Grouper les événements Product Analytics
---
Une requête sans ventilation renvoie une valeur unique, telle qu'un nombre total de vues. Ajoutez une *ventilation* pour diviser cette valeur en catégories. Par exemple, pour une requête sur le nombre total de vues, vous pouvez ajouter une ventilation par pays afin de voir d'où proviennent les vues.

## Ajouter une ventilation {#add-a-breakdown}

Cliquez sur {{< ui >}}Add breakdown{{< /ui >}} pour ajouter jusqu'à quatre ventilations à une seule requête. Chaque ventilation apparaît sous forme de ligne sous {{< ui >}}compared by{{< /ui >}} dans le générateur de requêtes.

Chaque ventilation que vous ajoutez divise les résultats en valeurs toujours plus petites. Par exemple, une requête ventilée à la fois par navigateur et par pays renvoie un bucket pour chaque combinaison navigateur-pays dans vos données, comme Chrome/United States et Chrome/Germany.

{{< img src="product_analytics/analytics/group/analytics-breakdown-1.png" alt="Une requête ventilée par navigateur et par pays dans le générateur de graphiques Analytics." style="width:90%;" >}}

## Choisissez une mesure {#choose-a-measure}

Par défaut, une requête mesure le nombre de {{< ui >}}All events{{< /ui >}}.

{{< img src="product_analytics/analytics/group/analytics-measure-count-1.png" alt="Le nombre par défaut de tous les événements dans le générateur de graphiques Analytics." style="width:90%;" >}}

Modifiez {{< ui >}}All events{{< /ui >}} pour une valeur différente afin de voir un nombre unique de la valeur spécifiée. Par exemple, la sélection de {{< ui >}}Browser Name{{< /ui >}} renvoie le nombre de navigateurs distincts ayant consulté une page.

{{< img src="product_analytics/analytics/group/analytics-measure-count-unique-1.png" alt="Un nombre unique par navigateur dans le générateur de graphiques Analytics." style="width:90%;" >}}

Modifiez la mesure pour une agrégation statistique d'une facette numérique, telle que le temps de chargement. Choisissez la moyenne, le minimum, le maximum, la médiane, la somme ou un percentile (75e, 90e, 95e, 98e ou 99e).

{{< img src="product_analytics/analytics/group/analytics-measure-statistical-1.png" alt="Options d'agrégation statistique pour le temps de chargement dans le générateur de graphiques Analytics." style="width:90%;" >}}