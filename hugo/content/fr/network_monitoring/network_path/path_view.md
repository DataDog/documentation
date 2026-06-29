---
description: Examiner le Network Path – Path View
further_reading:
- link: /network_monitoring/network_path/setup
  tag: Documentation
  text: Configurer le Network Path
- link: https://www.datadoghq.com/blog/cloud-network-monitoring-datadog/
  tag: Blog
  text: Surveiller une architecture cloud et des dépendances d'application avec la
    solution NPM Datadog
title: Vue sous forme de chemin
---
## Aperçu {#overview}

La section Path View dans Network Path permet un examen détaillé d'un itinéraire particulier, aidant à résoudre les problèmes potentiels qui pourraient survenir de la source à la destination. Elle offre des données complètes sur la latence de bout en bout et la perte de paquets tout au long de l'itinéraire.

Pour accéder à la page de Path View, cliquez sur un chemin dans la [List view][2] ou [AS view][3]. Sur cette page, vous avez la possibilité de changer les couleurs des seuils de latence et de voir l'état de chaque saut.

{{< img src="network_performance_monitoring/network_path/network_path_view_5.png" alt="Network Path view montrant une destination accessible avec 0 % de perte de paquets, 103 ms de latence et l'historique de latence et d'accessibilité." >}}

Cliquez sur n'importe quel chemin entre la source et la destination pour observer des détails supplémentaires tels que `Hop TTL`, `Hop Latency` et `Traversed count`. Ensuite, cliquez sur **View Device Details** pour naviguer vers les Device details dans [NDM][4] pour l'appareil sélectionné.

{{< img src="network_performance_monitoring/network_path/path_details.png" alt="Network Path view mettant en évidence les détails du chemin." style="width:30%;" >}}

## Légende {#legend}

La légende fournit des détails supplémentaires sur l'état de chaque saut.

{{< img src="network_performance_monitoring/network_path/legend.png" alt="Network Path view montrant la légende." style="width:30%;" >}}

Nombre de traversées 
: Nombre de `traceroutes` qui ont traversé le saut.

Achèvement de la traversée 
: Représente si le `traceroute` a pu atteindre avec succès la destination ou non.

Accessibilité
: Le niveau de perte de paquets que la destination subit.

Latence 
: Combien de temps le `traceroute` a mis pour aller d'une source à sa destination.

**Remarque** : La latence de saut à saut peut montrer `N/A` pour les sauts qui étaient incomplets.

## Barre de santé {#health-bar}

Faites glisser la barre de santé de latence et d'accessibilité pour observer un instantané de la latence de bout en bout et de la perte de paquets de bout en bout pour un intervalle de temps spécifique le long du chemin.

**Remarque** : Changer la barre de santé n'affecte pas la plage de temps globale en haut de la page.

{{< img src="network_performance_monitoring/network_path/latency_health_bar_3.mp4" alt="Vidéo du Network Path, sélectionnant la barre de santé de latence et glissant vers une période de temps." video="true" >}}

## Comparaison visuelle {#visual-comparison}

Utilisez la vue de comparaison visuelle pour comparer deux visualisations de chemin côte à côte et identifier ce qui a changé avant et après un incident.

La vue de comparaison fournit :

- Instantanés côte à côte du même Network Path à travers différentes périodes de temps.
- Instantanés côte à côte de deux Network Paths différents (paires de source et de destination différentes).
- Une mise en page verticale qui met en évidence le delta entre les deux requêtes.
- Identification automatique des sauts communs et uniques.
- Un graphique de séries temporelles superposé comparant la latence RTT, la perte de paquets, le jitter et le nombre de sauts.

{{< img src="network_performance_monitoring/network_path/visual_comparison_paths_2.png" alt="Vue de comparaison visuelle montrant le chemin A avec une destination accessible au-dessus du chemin B avec une destination inaccessible, et une chronologie de latence RTT en haut." style="width:100%;" >}}

### Ouvrir la vue de comparaison {#open-the-comparison-view}

Pour ouvrir la vue de comparaison, cliquez sur **Compare** près des contrôles de plage horaire dans la Network Path view. Par défaut, la vue se remplit avec votre plage horaire précédemment sélectionnée et la compare au bloc de temps équivalent précédent. Par exemple, une plage de 3 heures est comparée à la plage de 3 heures précédente. Utilisez les contrôles en haut pour ajuster les plages de temps comparées.

### Naviguer dans la comparaison {#navigate-the-comparison}

Naviguez les chemins séparés de manière indépendante en utilisant les contrôles de zoom, la mini-carte, ou en maintenant ⌘/Ctrl et en faisant défiler avec votre souris.

Cliquez sur **Inspect** sur un saut partagé pour ouvrir une barre latérale détaillant les métadonnées et confirmant que le saut est présent dans les deux vues. Les sauts uniques sont enveloppés dans une couleur distincte pour indiquer qu'ils n'existent que dans une seule vue.

L'onglet **Analysis** fournit une répartition côte à côte, saut par saut, des paquets et de la latence RTT pour chaque plage horaire.

{{< img src="network_performance_monitoring/network_path/network_path_analysis_comparison.png" alt="Onglet Analysis de la vue de comparaison visuelle montrant un tableau de latence RTT des sauts côte à côte pour les chemins A et B." style="width:100%;" >}}

## Graphiques {#graphs}

La section inférieure de la Network Path view fournit des informations supplémentaires sur chaque chemin à travers une série de graphiques.  

### Graphique des métriques de bout en bout {#end-to-end-metrics-graph}

Le graphique des métriques de bout en bout présente une représentation visuelle à la fois de la latence de bout en bout et de la perte de paquets de bout en bout pour chaque chemin, vous permettant de les comparer et de les analyser efficacement.


{{< img src="network_performance_monitoring/network_path/end-to-end-metrics-graph.png" alt="Network Path view montrant le graphique des métriques de bout en bout." >}}

### Graphique de latence de saut à saut {#hop-to-hop-latency-graph}

Le graphique de latence de saut à saut fournit une vue détaillée de la latence pour chaque saut le long du chemin, facilitant l'identification des goulets d'étranglement ou des zones problématiques potentielles.


{{< img src="network_performance_monitoring/network_path/hop-to-hop-latency-graph_3.png" alt="Network Path view montrant le graphique de latence de saut à saut." >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network/path
[2]: /fr/network_monitoring/network_path/list_view
[3]: /fr/network_monitoring/network_path/as_view/
[4]: /fr/network_monitoring/devices