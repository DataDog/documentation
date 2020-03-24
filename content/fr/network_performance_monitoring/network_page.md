---
title: Page Network
kind: documentation
description: Explorez les données de votre réseau qui transitent entre chaque source et destination sur votre pile.
aliases:
  - /fr/network_performance_monitoring/network_table
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Surveillance des performances réseau
  - link: /integrations/snmp
    tag: Documentation
    text: Intégration SNMP
  - link: /network_performance_monitoring/installation
    tag: Documentation
    text: Recueillir vos données réseau avec l'Agent Datadog
  - link: /dashboards/widgets/network
    tag: Documentation
    text: Widget Réseau
---
{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="Page principale" >}}

## Requêtes

Pour affiner votre recherche et visualiser le trafic entre des endpoints précis, agrégez et filtrez les flux au sein de votre réseau en appliquant des **tags**. Vous pouvez sélectionner des tags pour la **_source_** et la **_destination_** via la barre de recherche en haut de la page.

La capture d'écran suivante montre la vue par défaut, qui agrège la _source_ et la _destination_ en fonction du tag `service`. Ainsi, chaque ligne du tableau représente les flux service-service agrégés sur une période d'une heure.

{{< img src="network_performance_monitoring/network_page/context_npm.png" alt="contexte"  style="width:80%;">}}

L'exemple suivant montre tous les flux entre les adresses IP des services de la région `us-east-1` et les zones de disponibilité :

{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="Tableau des flux filtré"  style="width:80%;">}}

Vous pouvez définir la période d'agrégation du trafic à l'aide du sélecteur d'intervalle en haut à droite de la page :

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="Intervalle NPM"  style="width:30%;">}}

### Volets des facettes

Les volets des facettes reflètent les tags définis dans la requête de la barre de recherche. Basculez entre ces volets à l'aide des onglets _Source_ et _Destination_ situés en haut de la page :

{{< img src="network_performance_monitoring/network_page/destination_panel.png" alt="Volet Destination"  style="width:20%;">}}

#### Facettes personnalisées

Agrégez et filtrez vos données de trafic à l'aide de n'importe quel tag dans la page Network de Datadog. Une liste de tags autorisés est fournie par défaut. Elle figure dans le menu déroulant de la barre de recherche.

{{< img src="network_performance_monitoring/network_page/drop_down_npm.png" alt="Menu déroulant"  style="width:90%;">}}

Une liste de tags autorisés est fournie par défaut. Elle figure dans le menu déroulant de la barre de recherche.

Parmi les tags autorisés figurent `service`, `availability zone`, `environment`, `pod`, `host`, `ip` ou encore `port`. Si vous souhaitez agréger ou filtrer le trafic en fonction d'un tag qui n'est pas répertorié dans la liste, ajoutez-le en tant que facette personnalisée :

1. Cliquez sur le bouton `+` en haut à droite des volets de facettes.
2. Saisissez le tag à partir duquel vous souhaitez créer une facette personnalisée.
3. Cliquez sur `Create`.

Une fois votre facette personnalisée créée, utilisez ce tag pour filtrer et agréger le trafic depuis la page Network et Map. Toutes les facettes personnalisées sont accessibles sous la section `Custom` des volets de facettes.

## Données réseau

{{< img src="network_performance_monitoring/network_page/network_data.png" alt="données réseau"  style="width:90%;" >}}

Les métriques de votre réseau sont affichées dans les graphiques et le tableau associé. Toutes les métriques envoyées et reçues correspondant aux valeurs de la source :

* **Métriques envoyées** : mesurent les valeurs des flux allant de la _source_ vers la _destination_, du point de vue de la source.
* **Métriques reçues** : mesurent les valeurs des flux allant de la _destination_ vers la _source_, du point de vue de la source.

Lorsqu'une perte de paquets importante se produit, les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)`. Dans ce cas, si la `destination` envoie un grand nombre d'octets vers la `source`, les flux qui partent de la `destination` comprennent ces octets, mais les flux qui partent de la `source` ne les voient pas comme reçus.

**Remarque** : l'intervalle de collecte par défaut est de cinq minutes, et la durée de rétention est de sept jours.

### Métriques

#### Charge réseau

Les métriques relatives à la charge réseau suivantes sont disponibles :

| Métrique          |  Description                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | Nombre d'octets envoyés ou reçus sur une période donnée. Mesuré en octets (ou en l'un de ses multiples) dans les deux directions.                           |
|  **Throughput** | Le taux de transfert des octets envoyés ou reçus sur une période donnée. Mesuré en octets par seconde, dans les deux directions.                                                  |
| **Retransmits** | Une retransmission signifie qu'un échec a été détecté et que la transmission a été renouvelée pour garantir la bonne livraison des données. Cette métrique représente le nombre de trames retransmises à partir de la `source`. |

#### TCP

TCP est un protocole orienté connexion qui assure la transmission des paquets dans le bon ordre. Les métriques TCP suivantes sont disponibles :

| Métrique                    |  Description                                                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Retransmits**           | Une retransmission signifie qu'un échec a été détecté et que la transmission a été renouvelée pour garantir la bonne livraison des données. Cette métrique représente le nombre de retransmissions à partir de la `source`. |
| **Round-trip Time (RTT)** | La durée d'aller-retour permet de mesurer la latence. Cette métrique représente la durée entre l'envoi et la réception d'une trame TCP.                          |
|  **RTT Variance**         | Cette métrique permet de mesurer la variance des durées d'aller-retour.                                                                                                             |

### Résolution DNS

Depuis la version 7.17 de l'Agent, grâce à un processus d'inspection approfondie des paquets, l'Agent convertit les adresses IP en des noms de domaine lisibles pour le trafic interne et externe. Le DNS vous permet de surveiller les endpoints de vos fournisseurs de solutions cloud sur lesquelles il n'est pas possible d'installer un Agent Datadog. Il peut s'agir par exemple d'équilibreurs de charge d'application, d'API ou de compartiments S3. Les noms de domaines ne pouvant pas être identifiés, tels que ceux générés par un algorithme depuis un centre de contrôle, peuvent générer des menaces de sécurité réseau. **Le DNS est encodé sous la forme d'un tag dans Datadog**. Vous pouvez l'ajouter dans les requêtes de la barre de recherche et dans les volets de facettes afin d'agréger et de filtrer le trafic.

{{< img src="network_performance_monitoring/network_page/dns_aggregation.png" alt="Agrégation DNS" >}}

**Remarque** : la résolution DNS fonctionne sur les hosts pour lesquels le system probe s'exécute sur l'espace de nommage réseau à la racine. Cela se produit généralement lorsque le system probe est exécuté dans un conteneur, sans passer par le réseau host.

## Tableau

Le tableau Network présente les métriques _Volume_, _Throughput_, _TCP Retransmits_, _Round-trip Time (RTT)_ et _RTT variance_ entre chaque _source_ et chaque _destination_ définies dans votre requête.

{{< img src="network_performance_monitoring/network_page/data_table.png" alt="Tableau de données" >}}

### Trafic non résolu

Les tags des sources et des destinations non résolues ont pour valeur `N/A`. La non-résolution d'un endpoint de source ou de destination de trafic peut s'expliquer par les raisons suivantes :

* Les adresses IP source ou destination du host ou du conteneur ne disposent pas des tags source ou destination utilisés pour l'agrégation du trafic.
* Le endpoint se situe en dehors de votre réseau privé et n'est donc pas tagué par l'Agent Datadog.
* Le endpoint est un pare-feu, un maillage de service ou une autre entité sur laquelle il n'est pas possible d'installer un Agent Datadog.

Utilisez l'option _Show Unresolved Flows_ dans le coin supérieur droit du tableau de données pour masquer les flux comportant une source ou une destination non résolue (`N/A`).

Sélectionnez une ligne du tableau de données pour afficher les logs, traces et processus associés d'un flux _source_ <=> _destination_ donné :

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="Détails d'un flux"  style="width:80%;">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}