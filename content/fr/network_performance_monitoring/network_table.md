---
title: Page Réseau
kind: documentation
disable_toc: true
description: Explorez les données de votre réseau qui transitent entre chaque source et destination sur votre pile.
further_reading:
- link: "https://www.datadoghq.com/blog/network-performance-monitoring"
  tag: Blog
  text: Surveillance des performances réseau
- link: "https://www.datadoghq.com/blog/monitoring-101-alerting/"
  tag: Blog
  text: "Monitoring 101 : définir des alertes pertinentes"
- link: /network_performance_monitoring/installation
  tag: Documentation
  text: Recueillir vos données réseau avec l'Agent Datadog
---

<div class="alert alert-warning">
Cette fonctionnalité est actuellement en version bêta : pour y accéder, remplissez le <a href="https://app.datadoghq.com/network/2019signup">formulaire de demande d'accès à l'outil de surveillance des performances réseau de Datadog</a>.
</div>

{{< img src="network_performance_monitoring/network_table/main_page.png" alt="Page principale" responsive="true">}}

## Requêtes

Pour affiner votre recherche et visualiser le trafic entre des endpoints précis, agrégez et filtrez les flux au sein de votre réseau en appliquant des **tags**. Vous pouvez sélectionner des tags pour la **_source_** et la **_destination_** via la barre de recherche en haut de la page. 

La capture d'écran suivante montre la vue par défaut, qui agrège la _source_ et la _destination_ en fonction du tag `service`. Ainsi, chaque ligne du tableau représente les flux service-service agrégés sur une période de cinq minutes.

{{< img src="network_performance_monitoring/network_table/context.png" alt="contexte" responsive="true" style="width:80%;">}}

L'exemple suivant montre tous les flux entre les adresses IP d'un service (`service:web-store`) et une zone de disponibilité (`availability-zone:us-east1-b`) :

{{< img src="network_performance_monitoring/network_table/flow_table_filtered.png" alt="Tableau de flux filtré" responsive="true" style="width:80%;">}}

### Volets Facettes

Les volets des facettes reflètent les tags définis dans la requête de la barre de recherche. Basculez entre ces volets à l'aide des onglets _Source_ et _Destination_ en haut :

{{< img src="network_performance_monitoring/network_table/facet_panels.png" alt="Volets des facettes" responsive="true" style="width:30%;">}}

## Données réseau

{{< img src="network_performance_monitoring/network_table/network_data.png" alt="données réseau" responsive="true" style="width:90%;" >}}

Les métriques de votre réseau sont affichées dans les graphiques et le tableau associé. Toutes les métriques envoyées et reçues sont affichées du point de vue de la source :

- **Métriques envoyées** : mesurent les valeurs des flux allant de la _source_ vers la _destination_, du point de vue de la source.
- **Métriques reçues** : mesurent les valeurs des flux allant de la _destination_ vers la _source_, du point de vue de la source.

Lorsqu'une perte de paquets importante se produit, les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)`. Dans ce cas, si la `destination` envoie un grand nombre d'octets vers la `source`, les flux qui partent de la `destination` comprennent ces octets, mais les flux qui partent de la `source` ne les voient pas comme reçus.

**Remarque** : l'intervalle de collecte par défaut est de cinq minutes, et la durée de rétention est de sept jours.

### Graphiques

{{< img src="network_performance_monitoring/network_table/graphs_npm.png" alt="graphiques de performances réseau" responsive="true" style="width:80%;" >}}

Les graphiques suivants sont disponibles :

| Graphique | Description |
| -------- | ------ |
| **Throughput** | Nombre d'octets envoyés ou reçus sur une période donnée. Mesuré en octets (ou en l'un de ses multiples) dans les deux directions.|
| **Bandwidth** | Le taux de transfert des octets envoyés ou reçus sur une période donnée. Mesuré en octets par seconde, dans les deux directions. |
| **Retransmits** | TCP est un protocole orienté connexion qui assure la transmission des paquets dans le bon ordre. Une retransmission signifie qu'un échec a été détecté et que la transmission a été renouvelée pour garantir la bonne livraison des données. La mesure représente le nombre de retransmissions à partir de la `source`. |

Sur chaque graphique, sélectionnez l'icône des paramètres en forme d'engrenage en haut à droite pour modifier l'échelle de l'axe des ordonnées ou le type de graphique affiché :

{{< img src="network_performance_monitoring/network_table/graph_settings.png" alt="Paramètres de graphique" responsive="true" style="width:30%;">}}

### Table (Tableau)

Le tableau Réseau présente les métriques _Throughput_, _Bandwidth_ et _Retransmits_ entre chaque _source_ et chaque _destination_ définie dans votre requête.

{{< img src="network_performance_monitoring/network_table/data_table.png" alt="Tableau de données" responsive="true" style="width:80%;">}}

**Remarque** : utilisez le bouton *Show Unresolved Flows* en haut à droite du tableau pour filtrer les flux dont la source ou la destination n'a pas été résolue (`N/A`), ce qui signifie qu'il s'agit de trafic externe en dehors de votre réseau privé.

Sélectionnez une ligne du tableau de données pour voir les traces et logs associés à un flux _source_ <=> _destination_ donné :

{{< img src="network_performance_monitoring/network_table/flow_details.png" alt="Détails d'un flux" responsive="true" style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
