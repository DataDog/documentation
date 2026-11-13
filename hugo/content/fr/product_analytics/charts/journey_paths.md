---
description: Visualisez les chemins les plus courants empruntés par les utilisateurs
  entre deux événements, y compris les chemins des sessions qui ont été abandonnées
  avant d'atteindre le second événement.
title: Parcours utilisateur
---
Les parcours utilisateur montrent les chemins les plus courants empruntés par les utilisateurs entre des événements sélectionnés.

Utilisez les parcours utilisateur pour :
- Voir comment les utilisateurs naviguent dans les parcours clés et effectuent des flux de travail.
- Comprendre si les utilisateurs se convertissent efficacement ou s'ils font des détours inattendus.
- Examinez où et pourquoi les utilisateurs abandonnent.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_conversion_chart.png" alt="Un graphique de parcours utilisateur rendu montrant les principaux chemins empruntés par les utilisateurs entre deux vues." style="width:100%;" >}}

## Créer un graphique de parcours utilisateur {#create-a-journey-paths-chart}

1. Dans {{< ui >}}Product Analytics{{< /ui >}}, sélectionnez {{< ui >}}Create New{{< /ui >}} > {{< ui >}}Journey Paths{{< /ui >}}.

2. Définissez {{< ui >}}User steps{{< /ui >}} en sélectionnant au moins deux événements entre lesquels vous souhaitez analyser les chemins. 

   Pour une étape donnée, cliquez sur {{< ui >}}or...{{< /ui >}} pour spécifier plusieurs événements, ou cliquez sur l'icône de filtre pour filtrer l'étape selon des propriétés spécifiées. 

3. (Facultatif) Filtrez les résultats du graphique en fonction de propriétés telles que le pays ou le type d'appareil à l'aide des critères {{< ui >}}Filter by{{< /ui >}}.

## Analyser un graphique de parcours utilisateur {#analyze-a-journey-paths-chart}

Une fois que vous avez défini les étapes d'un parcours utilisateur, le graphique affiche les chemins les plus courants empruntés par les utilisateurs entre celles-ci.

Chaque chemin indique le pourcentage et le nombre de sessions ayant suivi ce chemin, ainsi que le temps moyen passé sur celui-ci. Les chemins sans événements listés représentent les sessions qui sont passées directement de l'événement de début à l'événement de fin, sans vues ou actions intermédiaires.

{{< img src="product_analytics/journeys/journey_paths/pana_journey_paths_customization.png" alt="Un graphique de parcours utilisateur avec des légendes numérotées pour le sélecteur de conversion/abandon, le sélecteur d'étape, la plage de dates, les bascules de type d'événement, View more, le menu des options de chemin et les commandes More Paths/Fewer Paths." style="width:100%;" >}}

Vous pouvez affiner les graphiques de parcours utilisateur de différentes manières pour vous concentrer sur les chemins que vous souhaitez analyser.

1. Utilisez le sélecteur {{< ui >}}Converted{{< /ui >}} / {{< ui >}}Dropped{{< /ui >}} pour basculer entre les chemins qui ont atteint l'étape finale et ceux qui ont été abandonnés. Les chemins d'abandon n'ont pas de nœud de fin.

2. Dans les parcours comportant plusieurs étapes, utilisez le sélecteur d'étape pour choisir la paire d'étapes entre lesquelles analyser les chemins.  

3. Utilisez le sélecteur de plage temporelle pour modifier la période de données analysée par le graphique.

4. Utilisez les commutateurs {{< ui >}}Views{{< /ui >}} et {{< ui >}}Actions{{< /ui >}} pour contrôler quels types d'événements apparaissent en tant que nœuds de chemin. Les vues, les actions et les actions personnalisées s'affichent chacune avec une couleur et une icône distinctes dans le diagramme, afin que vous puissiez identifier le type d'événement à chaque étape d'un chemin.

5. Pour les chemins tronqués, cliquez sur {{< ui >}}View more{{< /ui >}} pour révéler les événements suivants dans ce chemin. Cliquez sur {{< ui >}}View less{{< /ui >}} pour le réduire à nouveau.

6. Cliquez sur un événement pour ouvrir un menu proposant des options pour afficher les session replays ou les utilisateurs associés à ce chemin. Ou maintenez **Option** (macOS) ou **Alt** (Windows/Linux) enfoncée et cliquez sur un événement pour le masquer du diagramme.

7. Utilisez {{< ui >}}More Paths{{< /ui >}} et {{< ui >}}Fewer Paths{{< /ui >}} pour contrôler le nombre de chemins affichés.