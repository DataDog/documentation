---
aliases:
- /fr/product_analytics/user_retention/
- /fr/product_analytics/charts/user_retention/
description: Mesurez la rétention des utilisateurs pour comprendre la satisfaction
  globale des utilisateurs vis-à-vis de votre application.
title: Rétention
---
Les graphiques de rétention visualisent la fréquence à laquelle les utilisateurs reviennent sur une page ou effectuent une action, vous aidant à évaluer la valeur continue de vos produits et fonctionnalités.

{{< img src="/product_analytics/retention/retention_chart.png" alt="Un exemple de graphique Retention Analysis." style="width:90%;" >}}

La rétention des utilisateurs est mesurée au sein d'une *cohorte*, un groupe d'utilisateurs ayant effectué un événement de début défini, tel que cliquer sur un lien spécifié. Un utilisateur de la cohorte est *retenu* s'il effectue ultérieurement l'événement de retour spécifié, tel que cliquer à nouveau sur le même lien ou procéder au paiement.

Seules les vues et les actions peuvent agir en tant qu'événements.

## Prérequis {#prerequisites}

Pour remplir les données de rétention, définissez l'attribut `usr.id` dans votre SDK. Voir [les instructions pour l'envoi d'attributs utilisateur uniques][1].

## Calcul des événements de rétention {#calculating-retention-events}

Les valeurs de rétention sont calculées comme une moyenne pondérée par cohorte, résumant le comportement global de chaque cohorte en tenant compte de sa taille. Les cohortes plus importantes ont plus d'influence sur la valeur finale, ce qui rend le résultat plus représentatif qu'une moyenne. Datadog applique ce calcul à tous les types de visualisation. Par exemple, dans la grille de rétention, la moyenne pondérée remplit la cellule récapitulative pour chaque intervalle de temps.

Pour calculer la valeur d'un intervalle spécifique, comme la semaine 1 dans la grille de rétention, multipliez la valeur de chaque cohorte par sa taille. Additionnez les résultats, puis divisez par la taille totale de la cohorte :

```
Weighted Average = (Σ (cohort_value × cohort_size)) / (Σ cohort_size)
```

Par exemple, la rétention moyenne pondérée de 91 % après 1 semaine est calculée comme suit :

```
(99 * 1.8k + 92 * 2.35k + 81 * 1.75k) / (1.8k + 2.35k + 1.75k)
```

Le taux de rétention de chaque cohorte est mis à l'échelle par son nombre d'utilisateurs avant de contribuer à la métrique globale.

{{< img src="/product_analytics/retention/pana_retention_weighed_avg.png" alt="Exemple de graphique d'analyse de rétention montrant une valeur de rétention moyenne pondérée." style="width:90%;" >}}

<div class="alert alert-info">Le graphique de rétention affiche des valeurs désactivées lorsque les données sont partielles ou incomplètes. Cela se produit lorsque la période est en cours et que la rétention ne peut pas encore être entièrement calculée.</div>

## Créez un graphique de rétention {#create-a-retention-chart}

1. Dans {{< ui >}}Product Analytics{{< /ui >}}, sélectionnez {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Retention{{< /ui >}}.

1. Définissez les étapes de début et de retour pour lesquelles vous souhaitez comprendre la rétention.

1. (Facultatif) Filtrez ou regroupez les résultats du graphique en fonction de propriétés telles que le pays ou le type d'appareil en utilisant {{< ui >}}Filter by{{< /ui >}} ou {{< ui >}}Compare by{{< /ui >}}.

## Analyser un graphique de rétention {#analyze-a-retention-chart}

Une fois que vous avez créé un graphique de rétention, il affiche la rétention sous forme de pourcentage ou de nombre pour chaque cohorte, ventilé par les périodes de retour que vous avez définies.

{{< img src="/product_analytics/retention/retention_analysis.png" alt="Un graphique de rétention avec des légendes numérotées pour le paramètre de retour dans les options avancées, les commandes d'affichage et de regroupement, le sélecteur de type de graphique, le sélecteur de plage temporelle et une info-bulle de cellule de cohorte." style="width:90%;" >}}

1. Utilisez {{< ui >}}Advanced options{{< /ui >}} pour déterminer le périmètre des événements de retour comptant pour la rétention.

   - {{< ui >}}Returned on{{< /ui >}} : Calcule le pourcentage d'utilisateurs ayant déclenché l'événement de retour au cours d'une période de retour spécifique. Utilisez cette option pour voir la probabilité que les utilisateurs réalisent l'événement de retour après une certaine période (par exemple, des jours ou des semaines) après l'événement de début, ce qui est utile pour évaluer la rétention globale de vos fonctionnalités et produits.
   - {{< ui >}}Returned on or after{{< /ui >}} : Calcule le pourcentage d'utilisateurs ayant déclenché l'événement de retour au cours d'une période de retour spécifique ou de toute période ultérieure. Utilisez cette option pour voir les utilisateurs qui quittent complètement votre produit ou cessent d'utiliser une fonctionnalité clé, ce qui est utile pour évaluer l'efficacité des parcours d'intégration.

2. Utilisez la ligne intitulée {{< ui >}}Viewing{{< /ui >}} pour contrôler ce qui s'affiche.

   - {{< ui >}}All Cohorts{{< /ui >}}, {{< ui >}}Weighted Average{{< /ui >}} ou une cohorte spécifique : Sélectionne la cohorte à tracer. Consultez [Calcul des événements de rétention](#calculating-retention-events) pour comprendre comment la moyenne pondérée est calculée.
   - {{< ui >}}Unique users{{< /ui >}} ou {{< ui >}}Unique accounts{{< /ui >}} : Sélectionne si la rétention est mesurée par `@usr.id`, qui peut être réinitialisée lorsqu'un utilisateur efface ses cookies ou change d'appareil, ou par `@account.id`, qui suit le même compte connecté sur une période plus longue.
   - {{< ui >}}Rate{{< /ui >}} ou {{< ui >}}Count{{< /ui >}} : Sélectionne si la rétention doit être affichée sous forme de pourcentage ou de nombre absolu.
   - {{< ui >}}Each day{{< /ui >}}, {{< ui >}}Each week{{< /ui >}} ou {{< ui >}}Each month{{< /ui >}} : Sélectionne la période qui regroupe les événements de retour. La rétention quotidienne peut être appliquée pour une durée maximale d'un mois, la rétention hebdomadaire pour une durée maximale d'un an et la rétention mensuelle pour une durée maximale de 16 mois.

3. Utilisez le sélecteur de type de graphique pour changer de type de graphique.

   - {{< ui >}}Retention{{< /ui >}} : Inclut à la fois une courbe de rétention, montrant l'évolution de la rétention pour des cohortes spécifiées, et une grille de rétention, montrant des données détaillées sur les cohortes au fil du temps.
   - {{< ui >}}Timeseries{{< /ui >}} : Affiche la rétention au fil du temps pour une période de retour unique que vous choisissez, sans se concentrer sur une cohorte spécifique.
   - {{< ui >}}Query value{{< /ui >}} : Affiche un nombre unique, sous forme de taux ou de compte, pour une période de retour unique que vous choisissez, en utilisant la cohorte sélectionnée : la moyenne pondérée des cohortes ou une cohorte spécifique.
   - {{< ui >}}Top list{{< /ui >}} : Si une propriété {{< ui >}}Compare{{< /ui >}} est spécifiée, affiche un classement ordonné des résultats groupés par taux de rétention ou par nombre pour la période spécifiée.

4. Utilisez le sélecteur de plage temporelle pour modifier la période de données analysée par le graphique.

5. Survolez une cellule pour voir le nombre exact d'utilisateurs revenus au cours de cette période, le taux de retour et son évolution par rapport à la période précédente. Cliquez sur une cellule pour afficher une liste d'utilisateurs et exportez la liste au format CSV.

### Utilisation d'événements identiques ou différents {#using-matching-vs-differing-events}

Vous pouvez configurer les graphiques de rétention avec des événements de début et de retour identiques ou différents.

Si les événements sont identiques, la semaine 0 est toujours à 100 %, car elle représente tous ceux qui ont effectué l'événement initial. Chaque autre cellule compare les utilisateurs de cette semaine à ceux de la semaine 0, en indiquant le pourcentage de la cohorte initiale ayant effectué à nouveau l'événement au cours de cette semaine.

{{< img src="/product_analytics/retention/retention_matching_events.png" alt="Graphique de rétention pour des événements identiques." style="width:90%;" >}}

**17 août 2026** du graphique ci-dessus de gauche à droite :
- 23 % des 10,43 k utilisateurs ayant effectué l'événement cette semaine-là sont revenus pour l'effectuer à nouveau après 1 semaine.
- 21 % de ces utilisateurs sont revenus pour l'effectuer à nouveau après 2 semaines.
- 11 % de ces utilisateurs sont revenus pour l'effectuer à nouveau après 3 semaines.

Si les événements diffèrent, la semaine 0 représente les utilisateurs ayant effectué à la fois l'événement initial et l'événement de retour. Chaque cellule suivante indique le pourcentage de la cohorte initiale ayant effectué l'événement de retour au cours de cette semaine.

{{< img src="/product_analytics/retention/retention_differing_events.png" alt="Graphique de rétention pour des événements différents." style="width:90%;" >}}

**17 août 2026** du graphique ci-dessus de gauche à droite :
- 10,43 k utilisateurs ont effectué l'événement de départ cette semaine-là.
- 41 % de ces utilisateurs ont également effectué l'événement de retour au cours de la même semaine.
- 23 % des utilisateurs ont effectué l'événement de retour après 1 semaine, 20 % après 2 semaines et 11 % après 3 semaines.

[1]: /fr/real_user_monitoring/application_monitoring/browser/advanced_configuration#user-session