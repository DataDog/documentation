---
description: Examinez la vue Autonomous Systems de Network Path
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentation
  text: En savoir plus sur la vue List dans Network Path
- link: /network_monitoring/network_path/path_view
  tag: Documentation
  text: En savoir plus sur la vue Path dans Network Path
- link: /network_monitoring/network_path/glossary
  tag: Documentation
  text: Termes et concepts de Network Path
- link: /network_monitoring/network_path/setup
  tag: Documentation
  text: Configuration de Network Path
title: Vue Systèmes autonomes
---
## Présentation {#overview}

La vue Systèmes autonomes (AS) offre une visibilité sur les fournisseurs de réseau et les fournisseurs d'accès à Internet (FAI) qui acheminent votre trafic via la couche de routage BGP (Border Gateway Protocol). Cette vue surveille la latence et les métriques de performance pour chaque AS dans vos chemins réseau, vous aidant à identifier précisément quels fournisseurs en amont rencontrent des problèmes lorsque les performances de votre réseau se dégradent.

Les problèmes de routage BGP et les problèmes spécifiques aux fournisseurs sont difficiles à diagnostiquer car ils échappent à votre contrôle direct. La vue AS rend visibles ces couches habituellement invisibles, vous fournissant les données pour répondre à des questions telles que « S'agit-il d'un problème d'appairage ? » ou « Notre trafic a-t-il basculé vers un autre fournisseur de transit ? » sans avoir à tracer manuellement les routes ou à analyser les tables BGP.

Pour commencer, accédez au Network Path Explorer et cliquez sur [{{< ui >}}Autonomous Systems (AS){{< /ui >}}][1].

Vous pouvez également vérifier l'état de santé d'un AS depuis un agent IA avec les outils [`list_autonomous_system_statuses`][4] et [`get_autonomous_system_status`][3] dans le Datadog MCP Server. Les outils comparent la latence, la perte de paquets et la visibilité de chaque AS par rapport à une référence sur 7 jours.

## Dashboard {#dashboard}

Le dashboard présente les données de performance sous plusieurs angles :

### Rayon d'impact global {#global-blast-radius}

La carte du rayon d'impact global affiche la latence moyenne par pays sur la période sélectionnée. Cliquez sur n'importe quel pays sur la carte pour filtrer la [liste des systèmes autonomes](#autonomous-systems-table).

### Catégories de trafic {#traffic-categories}
Le panneau des catégories de trafic indique si votre trafic transite principalement par des fournisseurs d'hébergement ou par des FAI traditionnels.

### Répartition du trafic {#traffic-distribution}
Le panneau de répartition du trafic détaille le pourcentage de vos chemins qui traversent chaque région. 

### Nécessite une attention {#need-attention}

La section Nécessite une attention signale automatiquement les AS présentant des pics de latence ou des anomalies de performance, en les classant par gravité afin que vous sachiez sur quoi concentrer votre enquête. Sélectionnez un AS dans la liste pour afficher ses [détails](#autonomous-system-details).

## Tableau des systèmes autonomes {#autonomous-systems-table}

Le tableau détaillé des AS fournit des données opérationnelles pour le dépannage, indiquant : les préfixes que chaque AS annonce, le nombre de vos chemins surveillés qui traversent cet AS, et les problèmes spécifiques détectés (pics de latence, changements de routage ou problèmes de connectivité). Lorsqu'un client signale une dégradation des performances, vous pouvez rapidement déterminer si le problème provient de votre infrastructure, d'un fournisseur de transit spécifique ou d'un FAI du dernier kilomètre — une information essentielle pour escalader le problème à la bonne équipe ou au bon fournisseur.

Le tableau des AS affiche les systèmes autonomes que traversent vos chemins réseau surveillés. Chaque ligne comprend :

ASN
: Le numéro de système autonome.

Name
: Le nom du fournisseur de services qui exploite l'AS.

Pays
: Les pays où le trafic est observé pour l'AS.

Préfixes surveillés
: Les préfixes IP observés pour l'AS sur vos chemins surveillés.

Tests trouvés
: Le nombre de tests traversant l'AS.

Problèmes détectés
: Problèmes observés pour l'AS, tels que des pics de latence ou des pertes de paquets.

Utilisez les commandes de filtrage au-dessus de la liste pour restreindre les résultats par **numéro d'AS**, **pays**, **catégorie** ou **problèmes détectés**.

## Détails du système autonome {#autonomous-system-details}

Cliquez sur un système autonome dans la liste pour ouvrir ses détails. La vue détaillée inclut un onglet {{< ui >}}Traffic{{< /ui >}}, un onglet {{< ui >}}Neighbors{{< /ui >}} et une liste de chemins.

### Trafic {#traffic}

L'onglet {{< ui >}}Traffic{{< /ui >}} affiche un diagramme relationnel du trafic circulant depuis les sources {{< ui >}}Upstream{{< /ui >}} à travers l'AS sélectionné vers les destinations {{< ui >}}Downstream{{< /ui >}}. Survolez un nœud de trafic pour voir ses chemins agrégés et son nombre d'occurrences, et cliquez sur n'importe quel AS pour filtrer ses chemins dans la [liste des chemins](#path-list).

### Voisins {#neighbors}

L'onglet {{< ui >}}Neighbors{{< /ui >}} affiche une visualisation complète des systèmes autonomes en amont et en aval qui sont voisins de celui que vous avez sélectionné. Cliquez sur n'importe quel AS dans le graphique pour filtrer ses chemins dans la [liste des chemins](#path-list).

### Liste des chemins {#path-list}

La liste des chemins inclut les chemins individuels à travers l'AS, avec les colonnes ci-dessous. Cliquez sur n'importe quelle ligne de chemin dans la liste pour l'ouvrir dans la [Vue Chemin][2].

Source
: La source du chemin.

Destination
: La destination du chemin.

Tags
: Tags associés au chemin.

Accessibilité moyenne
: Le pourcentage de sondes traceroute ayant atteint avec succès la destination sur la période sélectionnée.

RTT moyen
: Le temps de parcours moyen pour le chemin.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: /fr/network_monitoring/network_path/path_view/
[3]: /fr/mcp_server/tools/#get_autonomous_system_status
[4]: /fr/mcp_server/tools/#list_autonomous_system_statuses