---
description: Comprenez comment fonctionne le modèle de détection d'anomalies pour
  les monitors Data Observability, y compris l'entraînement, les états du modèle,
  la saisonnalité et les comportements spécifiques aux métriques.
further_reading:
- link: /data_observability/quality_monitoring/
  tag: Documentation
  text: Quality Monitoring
- link: /monitors/types/data_observability/
  tag: Documentation
  text: Monitor Data Observability
title: Détection d'anomalies pour les monitors Data Observability
---
**Remarque** : Cette page s'applique uniquement aux monitors Data Observability basés sur les anomalies. Si votre monitor utilise la méthode de détection **Threshold**, ce contenu ne s'applique pas.

## Présentation {#overview}

Par défaut, les [monitors Data Observability][1] utilisent un modèle de détection d'anomalies adapté aux modèles courants dans les métriques de qualité des données, tels que la fraîcheur du tableau et le nombre de lignes.

Le modèle apprend de l'historique de la métrique pour définir les limites attendues. Lorsqu'une valeur observée tombe en dehors de ces limites, le monitor déclenche une alerte.

## Période d'entraînement {#training-period}

Lorsque vous créez un monitor de détection d'anomalies, il entre dans une période d'entraînement. Pendant l'entraînement, le monitor collecte des valeurs historiques pour apprendre le comportement de référence de la métrique. Il ne déclenche pas d'alertes pendant cette période et le graphique du monitor apparaît en bleu.

L'entraînement prend généralement entre 3 et 9 jours. Comme de nombreux pipelines de données se comportent différemment le week-end, le modèle doit observer le comportement en semaine et le week-end.

Une fois l'entraînement terminé, le monitor peut déclencher des alertes. Le graphique montre les valeurs observées au fil du temps, avec des limites au-dessus et au-dessous de la ligne sous forme de zone ombrée indiquant les valeurs attendues. La couleur indique l'état actuel :

| Couleur | État | Description |
|-------|-------|-------------|
| Bleu | Entraînement | Le monitor apprend le comportement de référence. Aucune alerte n'est déclenchée. |
| Vert | Normal | La valeur observée se situe dans les limites attendues. |
| Rouge | Alerte | La valeur observée se situe en dehors des limites attendues. |

## État d'alerte {#alert-state}

Lorsqu'une anomalie est détectée, le modèle reste en état d'alerte pendant un certain temps, jusqu'à ce que la valeur observée revienne aux limites attendues initiales ou que l'anomalie ait persisté assez longtemps pour que le modèle la considère comme un nouvel état normal. Pour résoudre manuellement le monitor et le ramener à l'état normal, utilisez [annotations][2].

## Comportement spécifique à la métrique {#metric-specific-behavior}

Le modèle fonctionne différemment selon les métriques :

### Fraîcheur {#freshness}

Les monitors de fraîcheur déclenchent une alerte lorsque le temps écoulé depuis la dernière actualisation est plus long que prévu, sur la base des modèles de mise à jour historiques. Le modèle ajoute une petite marge à la limite supérieure pour éviter de déclencher une alerte en cas de retards mineurs.

### Nombre de lignes {#row-count}

Les monitors de nombre de lignes déclenchent une alerte non seulement en cas de changement inhabituel, mais aussi lorsque le nombre de lignes stagne, ce qui signifie qu'il n'a pas changé depuis plus longtemps que la normale. Un nombre de lignes bloqué peut indiquer un pipeline défectueux.

### Pourcentage (par ex. valeur nulle, unicité) {#percentage-eg-nullness-uniqueness}

Les métriques de pourcentage sont mises à l'échelle de 0 à 100. Si la métrique n'a jamais été égale à 0 ou 100, un changement vers ces valeurs déclenche une alerte.

### Custom SQL {#custom-sql}

Pour les monitors SQL personnalisés, sélectionnez un type de modèle pour votre métrique : **Fraîcheur**, **Pourcentage** ou **Par défaut**.  Le modèle **Default** déduit la plage à partir de l'historique de la métrique. Par exemple, si une métrique personnalisée n'a jamais renvoyé de valeur négative, le modèle limite la borne inférieure à 0.

## Saisonnalité {#seasonality}

Le modèle utilise jusqu'à 400 jours d'historique pour s'ajuster aux modèles saisonniers, aux tendances et aux annotations passées. Par exemple, si une métrique chute systématiquement le dimanche, le modèle traite les valeurs plus faibles du dimanche comme normales plutôt que comme anormales.

Les tendances saisonnières suivantes sont détectées :

| Modèle | Description |
|---------|-------------|
| Heure de la journée | Métriques qui suivent des modèles intrajournaliers, comme un nombre de lignes plus élevé pendant les heures de bureau. |
| Heure de la semaine | Métriques avec des modèles cohérents sur une semaine complète avec une granularité horaire. |
| Jour de la semaine | Métriques qui diffèrent selon les jours de la semaine, comme une activité plus faible le dimanche. |
| Jour du mois | Métriques avec des modèles récurrents liés au mois civil, comme des pics de fin de mois. |

Tous les modèles saisonniers ne sont pas disponibles pour tous les types de métriques. De plus, le modèle nécessite plusieurs cycles complets d'historique normal avant de pouvoir détecter un modèle donné.

## Tendances {#trends}

Le modèle prend en compte si une métrique augmente ou diminue au fil du temps. Pour une métrique qui ajoute systématiquement des lignes chaque semaine, le modèle ajuste les attentes en fonction de la direction et du taux de changement plutôt que de traiter la croissance comme une anomalie.

## Annotations {#annotations}

Les annotations vous permettent de réentraîner immédiatement le modèle lorsqu'il classifie mal un point, soit en manquant une alerte, soit en générant une fausse alerte. Comme les attentes en matière de qualité des données sont souvent spécifiques à chaque métrique, les annotations sont le principal moyen d'adapter le modèle aux besoins de votre équipe.

Les annotations ont deux effets :
- **Correction de l'état actuel** : Marquer un point signalé comme attendu fait passer le monitor de l'état d'alerte à l'état normal lors de l'observation suivante, afin qu'il puisse ensuite alerter sur de nouvelles anomalies.
- **Façonnage des prédictions futures** : Le modèle utilise les points annotés pour ajuster les limites futures, de sorte que les retours améliorent immédiatement la précision.

Consultez [Annoter les limites][2] sur la page du monitor Data Observability pour connaître les types d'annotations disponibles et savoir comment les appliquer.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/data_observability/
[2]: /fr/monitors/types/data_observability/#annotate-bounds