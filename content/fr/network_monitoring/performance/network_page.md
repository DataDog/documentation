---
title: Page Network
kind: documentation
description: Explorez les données de votre réseau qui transitent entre chaque source et destination sur votre pile.
aliases:
  - /fr/network_performance_monitoring/network_table
  - /fr/network_performance_monitoring/network_page
further_reading:
  - link: 'https://www.datadoghq.com/blog/network-performance-monitoring'
    tag: Blog
    text: Network Performance Monitoring
  - link: /network_monitoring/devices
    tag: Documentation
    text: Network Device Monitoring
  - link: /network_monitoring/performance/setup
    tag: Documentation
    text: Recueillir vos données réseau avec l'Agent Datadog
  - link: /dashboards/widgets/network
    tag: Documentation
    text: Widget Réseau
---
{{< img src="network_performance_monitoring/network_page/main_page_npm.png" alt="Page principale" >}}

## Requêtes

Pour affiner votre recherche et visualiser le trafic entre des endpoints précis, agrégez et filtrez les connexions agrégées au sein de votre réseau en appliquant des **tags**. Vous pouvez sélectionner des tags pour la **_source_** et la **_destination_** via la barre de recherche en haut de la page.

La capture d'écran suivante montre la vue par défaut, qui agrège la _source_ et la _destination_ en fonction du tag `service`. Ainsi, chaque ligne du tableau représente les connexions service-service agrégées sur une période d'une heure.

{{< img src="network_performance_monitoring/network_page/context_npm.png" alt="contexte"  style="width:80%;">}}

L'exemple suivant montre toutes les connexions agrégées entre les adresses IP des services de la région `us-east-1` et les zones de disponibilité :

{{< img src="network_performance_monitoring/network_page/flow_table_region_az.png" alt="Tableau des connexions agrégées filtré"  style="width:80%;">}}

Vous pouvez définir la période d'agrégation du trafic à l'aide du sélecteur d'intervalle en haut à droite de la page :

{{< img src="network_performance_monitoring/network_page/npm_timeframe.png" alt="Intervalle NPM"  style="width:30%;">}}

### Volets des facettes

Les volets des facettes reflètent les tags définis dans la requête de la barre de recherche. Basculez entre ces volets à l'aide des onglets _Source_ et _Destination_ situés en haut de la page :

{{< img src="network_performance_monitoring/network_page/destination_panel.png" alt="Volet Destination"  style="width:20%;">}}

#### Facettes personnalisées

Agrégez et filtrez vos données de trafic à l'aide de n'importe quel tag dans la page Network de Datadog. Une liste de tags autorisés est fournie par défaut. Elle figure dans le menu déroulant de la barre de recherche :

{{< img src="network_performance_monitoring/network_page/drop_down_npm.png" alt="Menu déroulant"  style="width:90%;">}}

Parmi les tags autorisés figurent `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` ou encore `port`. Si vous souhaitez agréger ou filtrer le trafic en fonction d'un tag qui n'est pas répertorié dans la liste, ajoutez-le en tant que facette personnalisée :

1. Cliquez sur le bouton `+` en haut à droite des volets de facettes.
2. Saisissez le tag à partir duquel vous souhaitez créer une facette personnalisée.
3. Cliquez sur `Create`.

Une fois votre facette personnalisée créée, utilisez ce tag pour filtrer et agréger le trafic depuis la page Network et Map. Toutes les facettes personnalisées sont accessibles sous la section `Custom` des volets de facettes.

## Données réseau

{{< img src="network_performance_monitoring/network_page/network_data.png" alt="données réseau"  style="width:90%;" >}}

Les métriques de votre réseau sont affichées dans les graphiques et le tableau associé. Toutes les métriques envoyées et reçues correspondant aux valeurs de la source :

* **Métriques envoyées** : mesurent les valeurs des flux allant de la _source_ vers la _destination_, du point de vue de la source.
* **Métriques reçues** : mesurent les valeurs des flux allant de la _destination_ vers la _source_, du point de vue de la source.

Lorsqu'une perte de paquets importante se produit, les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)`. Dans ce cas, si la `destination` envoie un grand nombre d'octets vers la `source`, les connexions agrégées qui partent de la `destination` comprennent ces octets, mais les connexions agrégées qui partent de la `source` ne les voient pas comme reçus.

**Remarque** : l'intervalle de collecte par défaut est de cinq minutes, et la durée de rétention est de sept jours.

### Métriques

#### Charge réseau

Les métriques relatives à la charge réseau suivantes sont disponibles :

| Métrique          |  Description                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | Nombre d'octets envoyés ou reçus sur une période donnée. Mesuré en octets (ou en l'un de ses multiples) dans les deux directions.                           |
|  **Throughput** | Le taux de transfert des octets envoyés ou reçus sur une période donnée. Mesuré en octets par seconde, dans les deux directions.                                                  |

#### TCP

TCP est un protocole orienté connexion qui assure la transmission des paquets dans le bon ordre. Les métriques TCP suivantes sont disponibles :

| Métrique                    |  Description                                                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Retransmissions TCP** | Une retransmission TCP signifie qu'un échec a été détecté et que la transmission a été renouvelée pour garantir la bonne livraison des données. Cette métrique représente le nombre de retransmissions à partir de la `source`. |
| **Latence TCP** | Cette métrique mesure la durée lissée d'aller-retour TCP, à savoir le délai entre l'envoi et la réception d'une trame TCP. |
| **Gigue TCP** | Cette métrique mesure l'écart entre les durées lissées d'aller-retour TCP. |
| **Established Connections** | Le nombre de connexions TCP établies. Calculé en nombre de connexions par seconde à partir de la `source`. |
| **Closed Connections** | Le nombre de connexions TCP fermées. Calculé en nombre de connexions par seconde à partir de la `source`. |

### Résolution DNS

Depuis la version 7.17, l'Agent convertit les adresses IP en noms de domaine lisibles pour le trafic interne et externe. Le domaine vous permet de surveiller les endpoints de vos fournisseurs de solutions cloud sur lesquelles il n'est pas possible d'installer un Agent Datadog. Il peut s'agir par exemple d'équilibreurs de charge d'application, d'API ou de compartiments S3. Les noms de domaines ne pouvant pas être identifiés, tels que ceux générés par un algorithme depuis un serveur C&C, peuvent être le signe d'une menace pour la sécurité réseau. **Le domaine est encodé sous la forme d'un tag dans Datadog**. Vous pouvez l'ajouter dans les requêtes de la barre de recherche et dans le volet de facettes afin d'agréger et de filtrer le trafic.

{{< img src="network_performance_monitoring/network_page/domain_aggregation.png" alt="Agrégation de domaine" >}}

**Remarque** : la résolution DNS fonctionne sur les hosts pour lesquels le system probe s'exécute sur l'espace de nommage réseau à la racine. Cela se produit généralement lorsque le system probe est exécuté dans un conteneur, sans passer par le réseau host.

### Adresses IP pré-NAT

Le NAT (Network Address Translation) est un outil utilisé par Kubernetes et d'autres systèmes pour acheminer le trafic entre les conteneurs. Lorsque vous analysez une dépendance spécifique (par exemple entre deux services), la présence ou l'absence d'IP pré-NAT peut vous permettre de faire la distinction entre les services natifs à Kubernetes, qui font leur propre routage, et les services qui dépendent de clients externes pour le routage. Cette fonctionnalité ne prend pas en compte la résolution des passerelles NAT pour le moment.

Pour afficher les IP pré-NAT et post-NAT, utilisez le paramètre _Show pre-NAT IPs_ dans les paramètres du tableau. Lorsque ce paramètre est désactivé, les IP affichées dans les colonnes Source IP et Dest IP correspondent aux IP post-NAT par défaut. Si plusieurs IP pré-NAT existent pour une même IP post-NAT, les 5 IP pré-NAT les plus courantes s'affichent. Le tag `pre_nat.ip` fonctionne comme n'importe quel autre tag : vous pouvez donc l'utiliser pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_page/prenat_ip.png" alt="IP pré-NAT" >}}

### ID réseau

Les utilisateurs de la solution NPM peuvent configurer leurs réseaux de façon à ce que leurs plages d'IP se chevauchent. Par exemple, il peut être préférable d'effectuer un déploiement sur plusieurs VPC (clouds privés virtuels) dont les plages d'adresses se chevauchent et qui communiquent uniquement par le biais de répartiteurs de charge ou de passerelles cloud.

Pour correctement classifier les destinations du trafic, la solution NPM fait appel au concept d'ID réseau. Un ID réseau est représenté par un tag et correspond à un identifiant alphanumérique pour un ensemble d'adresses IP qui peuvent communiquer entre elles. Lorsqu'une adresse IP mappée vers plusieurs hosts ayant des ID réseau différents est détectée, cet identifiant est utilisé pour déterminer avec précision le host vers lequel le trafic réseau est acheminé ou duquel il provient.

Dans AWS et GCP, l'ID réseau est automatiquement défini sur l'ID du VPC. Pour d'autres environnements, l'ID réseau peut être défini manuellement, soit dans le fichier `datadog.yaml` comme indiqué ci-dessous, soit en ajoutant la variable d'environnement `DD_NETWORK_ID` aux conteneurs de l'Agent de processus et de l'Agent principal.

  ```shell
  network:
     Id: <votre-id-réseau>
  ```

### Vues enregistrées

Organisez et partagez vos vues représentant les données de trafic. Les vues enregistrées facilitent le debugging et favorisent la collaboration. Vous pouvez ainsi créer une vue, l'enregistrer pour l'utiliser ultérieurement avec des requêtes basiques et envoyer son lien à votre équipe afin de partager des données réseau.

{{< img src="network_performance_monitoring/network_page/npm_saved_views.png" alt="Vues enregistrées" >}}

- Pour enregistrer une vue, cliquez sur le bouton « + Save » et attribuez un nom à la vue pour enregistrer votre requête actuelle, la configuration du tableau ainsi que les métriques sélectionnées pour les graphiques.
- Pour charger une vue, cliquez sur Views en haut à gauche afin d'afficher vos vues enregistrées, puis sélectionnez une vue dans la liste.
- Pour renommer une vue, passez le curseur sur une vue dans la liste des vues enregistrées, puis cliquez sur l'icône en forme d'engrenage afin d'afficher l'option *Edit name*.
- Pour partager une vue, passez le curseur sur cette vue dans la liste des vues enregistrées, puis cliquez sur l'icône représentant un lien afin d'afficher l'option *Copy permalink*.

Pour en savoir plus, consultez notre documentation sur les [vues enregistrées][1].


## Tableau

Le tableau Network présente les métriques _Volume_, _Throughput_, _TCP Retransmits_, _Round-trip Time (RTT)_ et _RTT variance_ entre chaque _source_ et chaque _destination_ définies dans votre requête.

{{< img src="network_performance_monitoring/network_page/network_table.png" alt="Tableau de données" >}}

Pour configurer les colonnes de votre tableau, utilisez le bouton `Customize` en haut à droite.

Configurez le trafic affiché à l'aide du bouton `Filter Traffic`.

{{< img src="network_performance_monitoring/network_page/filter_traffic_toggles_v2.png" alt="Détails d'un flux"  style="width:80%;">}}

Le trafic externe (vers les IP publiques) et le trafic de l'Agent Datadog sont affichés par défaut. Pour affiner le trafic affiché, vous pouvez désactiver les options `Show Datadog Traffic` et `Show External Traffic`.

### Trafic non résolu

Les tags des sources et des destinations non résolues ont pour valeur `N/A`. La non-résolution d'un endpoint de source ou de destination de trafic peut s'expliquer par les raisons suivantes :

* Les adresses IP source ou destination du host ou du conteneur ne disposent pas des tags source ou destination utilisés pour l'agrégation du trafic.
* Le endpoint se situe en dehors de votre réseau privé et n'est donc pas tagué par l'Agent Datadog.
* Le endpoint est un pare-feu, un maillage de service ou une autre entité sur laquelle il n'est pas possible d'installer un Agent Datadog.

Utilisez l'option _Show N/A (Unresolved Traffic)_ en haut à droite du tableau de données pour masquer les connexions agrégées comportant une source ou une destination non résolue (`N/A`).

Sélectionnez une ligne du tableau de données pour afficher les logs, traces et processus associés d'une connexion agrégée _source_ <=> _destination_ donnée :

{{< img src="network_performance_monitoring/network_page/flow_details.png" alt="Détails d'une connexion agrégée"  style="width:80%;">}}

## Volet latéral

Le volet latéral fournit des données de télémétrie contextuelle pour vous aider à débuguer les dépendances réseau. Utilisez les onglets Flows, Logs, Traces et Processes pour déterminer si un nombre élevé de retransmissions ou une augmentation de la latence du trafic entre deux endpoints est attribuable à :
- un pic de trafic provenant d'un port ou d'une adresse IP en particulier ;
- des processus lourds monopolisant le processeur ou la mémoire de l'endpoint de destination ;
- des erreurs d'application dans le code de l'endpoint source.

{{< img src="network_performance_monitoring/network_page/npm_sidepanel.png" alt="Détails d'un flux"  style="width:80%;">}}

### Tags communs

Les tags de source et de destination communs partagés par les dernières connexions de la dépendance inspectée sont affichés dans la partie supérieure du volet latéral. Utilisez les tags communs pour obtenir des informations de contexte supplémentaires concernant un endpoint défaillant. Par exemple, si vous dépannez une augmentation de la latence des communications vers un service spécifique, des tags de destination communs s'afficheront :
- avec des données de contexte granulaire indiquant notamment le conteneur, la tâche ou le host vers lequel le trafic est acheminé ;
- avec des données de contexte plus large indiquant notamment la zone de disponibilité, le compte du fournisseur de cloud ou le déploiement dans lequel le service s'exécute.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/explorer/saved_views/