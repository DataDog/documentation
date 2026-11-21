---
description: Examiner la vue Network Path – Path
further_reading:
- link: /network_monitoring/network_path/setup
  tag: Documentation
  text: Configurer Network Path
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Surveiller une architecture cloud et des dépendances d'application avec Datadog
    NPM
title: Vue Path
---
## Présentation {#overview}

La section de la vue Path dans Network Path permet un examen détaillé d'un itinéraire particulier, aidant à résoudre d'éventuels problèmes susceptibles de survenir entre la source et la destination. Elle offre des données complètes sur la latence de bout en bout et la perte de paquets tout au long de l'itinéraire.

Pour accéder à la page de la vue Path, cliquez sur un chemin depuis la [vue List][2] ou la [vue AS][3]. Sur cette page, vous avez la possibilité de modifier les couleurs du seuil de latence et de voir le statut de chaque saut.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Vue Network Path montrant une destination accessible avec 0 % de perte de paquets, 103 ms de latence, ainsi que l'historique de latence et d'accessibilité." >}}

Cliquez sur n'importe quel chemin du saut entre la source et la destination pour observer des détails supplémentaires tels que `Hop TTL`, `Hop Latency` et `Traversed count`. Ensuite, cliquez sur {{< ui >}}View Device Details{{< /ui >}} pour accéder aux détails de l'équipement dans [NDM][4] pour l'équipement sélectionné.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Vue Path dans Network Path mettant en évidence les détails du chemin." style="width:30%;" >}}

## Légende {#legend}

La légende fournit des détails supplémentaires sur le statut de chaque saut.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Vue Path dans Network Path affichant la légende." style="width:30%;" >}}

Nombre de traversées 
: Nombre de `traceroutes` ayant transité par le saut.

Achèvement de la traversée 
: Indique si le `traceroute` a réussi à atteindre la destination ou non.

Accessibilité
: Le niveau de perte de paquets subi par la destination.

Latence 
: Le temps mis par le `traceroute` pour aller d'une source à sa destination.

**Remarque** : La latence saut par saut peut afficher `N/A` pour les sauts incomplets.

## Barre d'état {#health-bar}

Faites glisser la barre d'état de latence et d'accessibilité pour observer un instantané de la latence de bout en bout et de la perte de paquets de bout en bout sur une période spécifique le long du chemin.

**Remarque** : La modification de la barre d'état n'affecte pas la plage temporelle globale en haut de la page.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="Vidéo de Network Path, montrant la sélection de la barre d'état de latence et son déplacement vers une période définie." video="true" >}}

## Analyser avec Bits AI{#analyze-with-bits-ai}

Cliquez sur {{< ui >}}Analyze with Bits AI{{< /ui >}} dans la vue Path pour ouvrir [Bits AI][5] avec le chemin actuel chargé. Bits AI analyse la latence, la perte de paquets et la gigue le long du chemin, afin de pouvoir renvoyer une analyse générée par IA des endroits où les problèmes surviennent.

Vous pouvez également interroger les exécutions de test Network Path, y compris les données saut par saut, à partir d'un agent IA avec l'outil [`get_network_path_test_runs`][6] dans le Datadog MCP Server.

## Visual Comparison {#visual-comparison}

Utilisez la vue Visual Comparison pour comparer deux visualisations de chemin côte à côte et identifier les changements intervenus avant et après un incident.

La vue Visual Comparison fournit :

- Des instantanés côte à côte du même Network Path sur différentes périodes.
- Des instantanés côte à côte de deux Network Paths différents (paires source et destination différentes).
- Une disposition verticale qui met en évidence l'écart entre les deux requêtes.
- Une identification automatique des sauts communs et uniques.
- Un graphique de série temporelle superposé comparant la latence RTT, la perte de paquets, la gigue et le nombre de sauts.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="Vue Visual Comparison montrant le chemin A avec une destination accessible au-dessus du chemin B avec une destination inaccessible, ainsi qu'une chronologie de latence RTT en haut." style="width:100%;" >}}

### Ouvrir la vue Comparison {#open-the-comparison-view}

Pour ouvrir la vue Visual Comparison, cliquez sur {{< ui >}}Compare{{< /ui >}} près des commandes de plage temporelle dans la vue Network Path. Par défaut, la vue Visual Comparison s'affiche avec la plage de temps que vous aviez précédemment sélectionnée et la compare au bloc temporel équivalent précédent. Par exemple, une plage de 3 heures est comparée à la plage de 3 heures précédente. Utilisez les commandes supérieures pour ajuster les plages horaires comparées.

### Parcourir la vue Comparison {#navigate-the-comparison}

Naviguez dans les chemins divisés indépendamment en utilisant les commandes de zoom, la mini-carte, ou en maintenant ⌘/Ctrl et en faisant défiler avec votre souris.

Cliquez sur {{< ui >}}Inspect{{< /ui >}} sur un saut partagé pour ouvrir une barre latérale détaillant les métadonnées et confirmant que le saut est présent dans les deux vues. Les sauts uniques sont entourés d'une couleur distincte pour indiquer qu'ils n'existent que dans une seule vue.

L'onglet {{< ui >}}Analysis{{< /ui >}} fournit une ventilation côte à côte, saut par saut, des paquets et de la latence RTT pour chaque plage horaire :

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Onglet Analysis de la vue Visual Comparison montrant un tableau de latence RTT par saut côte à côte pour les chemins A et B." style="width:100%;" >}}

### Comparer les chemins avec Bits AI {#compare-paths-with-bits-ai}

Depuis la vue Visual Comparison, cliquez sur le bouton Bits AI pour ouvrir [Bits AI][5] avec les deux chemins chargés. Bits AI renvoie une comparaison générée par IA des deux chemins.

## Graphiques {#graphs}

La section inférieure de la page de la vue Path fournit des informations supplémentaires sur chaque chemin via une série de graphiques.  

### Graphique End-to-end metrics {#end-to-end-metrics-graph}

Le graphique End-to-end metrics présente une représentation visuelle à la fois de la latence de bout en bout et de la perte de paquets de bout en bout pour chaque chemin, vous permettant de les comparer et de les analyser efficacement.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Page de la vue Path montrant le graphique End-to-end metrics." >}}

### Graphique Hop-to-hop latency {#hop-to-hop-latency-graph}

Le graphique Hop-to-hop latency fournit une vue détaillée de la latence pour chaque saut le long du chemin, facilitant l'identification des goulots d'étranglement potentiels ou des zones problématiques.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="Page de la vue Path montrant le graphique Hop-to-hop latency." >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /fr/network_monitoring/network_path/list_view
[3]: /fr/network_monitoring/network_path/as_view/
[4]: /fr/network_monitoring/devices
[5]: /fr/bits_ai/
[6]: /fr/mcp_server/tools/#get_network_path_test_runs