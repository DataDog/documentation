---
description: Examinez la vue des systèmes autonomes du chemin réseau
further_reading:
- link: /network_monitoring/network_path/list_view
  tag: Documentation
  text: En savoir plus sur la vue liste dans le chemin réseau
- link: /network_monitoring/network_path/path_view
  tag: Documentation
  text: En savoir plus sur la vue du chemin dans le chemin réseau
- link: /network_monitoring/network_path/glossary
  tag: Documentation
  text: Termes et concepts du chemin réseau
- link: /network_monitoring/network_path/setup
  tag: Documentation
  text: Configuration du chemin réseau
title: Vue des systèmes autonomes
---
## Aperçu {#overview}

La vue des systèmes autonomes (AS) offre une visibilité sur les fournisseurs de réseau et les fournisseurs de services Internet (FAI) qui transportent votre trafic à travers la couche de routage du protocole Border Gateway (BGP). Cette vue surveille la latence et les indicateurs de performance pour chaque AS dans vos chemins réseau, vous aidant à identifier exactement quels fournisseurs en amont rencontrent des problèmes lorsque la performance de votre réseau se dégrade.

Les problèmes de routage BGP et les problèmes spécifiques aux fournisseurs sont difficiles à diagnostiquer car ils échappent à votre contrôle direct. La vue AS rend visibles ces couches normalement invisibles, vous fournissant les données nécessaires pour répondre à des questions telles que « Est-ce un problème de peering ? » ou « Notre trafic a-t-il basculé vers un autre fournisseur de transit ? » sans tracer manuellement les routes ou analyser les tables BGP.

Pour commencer, rendez-vous sur Network Path Explorer et cliquez sur [**Autonomous Systems (AS)**][1]

## Dashboard {#dashboard}

Le Dashboard présente les données de performance sous plusieurs perspectives :

### Rayon d'impact global {#global-blast-radius}

La carte du rayon d'impact global montre la latence moyenne par pays sur la période sélectionnée. Cliquez sur n'importe quel pays sur la carte pour filtrer la [liste des systèmes autonomes](#autonomous-systems-table).

### Catégories de trafic {#traffic-categories}
Le panneau des catégories de trafic indique si votre trafic passe principalement par des fournisseurs d'hébergement ou des FAI traditionnels.

### Distribution du trafic {#traffic-distribution}
Le panneau de distribution du trafic décompose le pourcentage de vos chemins qui traversent chaque région. 

### Need Attention {#need-attention}

La section Need Attention signale automatiquement les AS présentant des pics de latence ou des anomalies de performance, les classant par gravité afin que vous sachiez où concentrer votre enquête Sélectionnez un AS dans la liste pour voir ses [détails](#autonomous-system-details).

## Autonomous Systems table {#autonomous-systems-table}

Le tableau détaillé des AS fournit des données opérationnelles pour le dépannage:  des préfixes que chaque AS annonce, combien de vos chemins surveillés traversent cet AS, et quels problèmes spécifiques ont été détectés (pics de latence, changements de routage ou problèmes de connectivité). Lorsqu'un client signale une dégradation de la performance, vous pouvez rapidement déterminer si le problème provient de votre infrastructure, d'un fournisseur de transit spécifique ou d'un FAI de dernier kilomètre—information cruciale pour escalader vers la bonne équipe ou le bon fournisseur.

Le tableau des AS montre les Systèmes Autonomes que traversent vos chemins réseau surveillés. Chaque ligne comprend :

ASN
: Le Numéro de Système Autonome.

Name
: Le nom du fournisseur de services qui gère l'AS.

Pays
: Les pays où le trafic est observé pour l'AS.

Préfixes surveillés
: Les préfixes IP observés pour l'AS à travers vos chemins surveillés.

Tests trouvés
: Le nombre de tests traversant l'AS.

Problèmes détectés
: Problèmes observés pour l'AS, tels que des pics de latence ou des pertes de paquets.

Utilisez les contrôles de filtre au-dessus de la liste pour affiner les résultats par **Numéro d'AS**, **Pays**, **Catégorie** ou **Problèmes détectés**.

## Détails de l'AS {#autonomous-system-details}

Cliquez sur un AS dans la liste pour ouvrir ses détails. La vue détaillée comprend un onglet **Trafic**, un onglet **Voisins** et une liste de chemins.

### Trafic {#traffic}

L'onglet **Trafic** montre un diagramme relationnel du trafic circulant des sources **Amont** à travers l'AS sélectionné vers les destinations **Aval**. Survolez un nœud de trafic pour voir ses chemins agrégés et le nombre d'occurrences, et cliquez sur n'importe quel AS pour filtrer ses chemins dans la [liste des chemins](#path-list).

### Neighbors {#neighbors}

L'onglet **Neighbors** montre une visualisation complète des AS en amont et en aval qui bordent celui que vous avez sélectionné Cliquez sur n'importe quel AS dans le graphique pour filtrer ses chemins dans la [Path list](#path-list)

### Path list {#path-list}

La liste des chemins comprend des chemins individuels à travers l'AS, avec les colonnes ci-dessous. Cliquez sur n'importe quelle ligne de chemin dans la liste pour l'ouvrir dans le [Path View][2]

Source
: La source du chemin.

Destination
: La destination du chemin.

Les tags
: Étiquettes associées au chemin.

Accessibilité moyenne
: Le pourcentage de sondes de traceroute qui ont atteint avec succès la destination pendant la période sélectionnée.

RTT moyen
: Le temps de réponse aller-retour moyen pour le chemin.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/network-path/autonomous-systems
[2]: /fr/network_monitoring/network_path/path_view/