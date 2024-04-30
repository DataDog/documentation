---
aliases:
- /fr/network_performance_monitoring/network_table
- /fr/network_performance_monitoring/network_page
- /fr/network_monitoring/performance/network_page
description: Explorez les données de votre réseau qui transitent entre chaque source
  et destination sur l'ensemble de votre stack.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Network Performance Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Simplifier les enquêtes réseau grâce aux requêtes et aux cartes améliorées
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/performance/setup
  tag: Documentation
  text: Recueillir vos données réseau avec l'Agent Datadog
kind: documentation
title: Analyse réseau
---

## Présentation

La page Network Analytics offre des informations sur l'état général de votre réseau et affiche des [requêtes recommandées](#requetes-recommandees) en haut de la page. Ces dernières vous permettent d'exécuter des requêtes courantes et de consulter des snapshots des métriques pertinentes afin de visualiser l'évolution du nombre de requêtes, la latence, les erreurs DNS, etc. Lorsque vous cliquez sur une requête recommandée, la barre de recherche, les options de regroupement et les graphiques récapitulatifs se mettent automatiquement à jour pour vous fournir des informations pertinentes sur votre réseau.

{{< img src="network_performance_monitoring/network_analytics/main_page_npm3.png" alt="Page d'accueil Network Analytics dans Network Performance" >}}

## Requêtes

Pour affiner votre recherche et visualiser le trafic entre des endpoints précis, agrégez et filtrez les connexions agrégées au sein de votre réseau en appliquant des **tags**. Vous pouvez sélectionner des tags pour le client et le serveur via la barre de recherche en haut de la page. La connexion provient du client et se termine au serveur.

{{< img src="network_performance_monitoring/network_analytics/network_diagram2.png" alt="diagramme réseau illustrant les requêtes entrantes et sortantes" style="width:100%;">}}

La capture d'écran suivante montre la vue par défaut, qui agrège le client et le serveur en fonction du tag `service`. Ainsi, chaque ligne du tableau représente les connexions d'un service à un autre agrégées sur une période d'une heure.

{{< img src="network_performance_monitoring/network_analytics/context_npm2.png" alt="Interface de requête avec les saisies Search for, View clients as et View servers as" style="width:90%;">}}

L'exemple suivant montre toutes les connexions agrégées entre les adresses IP des services de la région `us-east-1` et les zones de disponibilité :

{{< img src="network_performance_monitoring/network_analytics/flow_table_region_az2.png" alt="Tableau des connexions agrégées filtré" style="width:80%;">}}

Vous pouvez définir la période d'agrégation du trafic à l'aide du sélecteur d'intervalle en haut à droite de la page :

{{< img src="network_performance_monitoring/network_analytics/npm_timeframe.png" alt="Intervalle NPM" style="width:30%;">}}

Les tags issus des intégrations Datadog ou du tagging de service unifié peuvent servir à agréger et filtrer automatiquement les données de trafic. Consultez la section relative aux [facettes personnalisées](#facettes-personnalisees) plus loin sur cette page pour découvrir d'autres tags. Pour afficher le trafic compartimenté au sein de plusieurs tags couramment utilisés, tels que `service`, `kube_service`, `short_image`, et `container_name`, sélectionnez « Auto-grouped traffic ».

Vous pouvez filtrer les données pour afficher uniquement le trafic où le client/serveur correspond à un CIDR par le biais de `CIDR(network.client.ip, 10.0.0.0/8)` ou de `CIDR(network.server.ip, 10.0.0.0/8)`.

### Requêtes recommandées

{{< img src="network_performance_monitoring/network_analytics/recommended_query_options.png" alt="La page Network Analytics dans Datadog affichant trois requêtes recommandées">}}

Les requêtes recommandées vous permettent de démarrer une enquête réseau, que vous cherchiez à dépanner un problème isolé ou à mieux comprendre votre réseau. Ces requêtes vous aident à trouver rapidement des informations réseau pertinentes sans avoir à rechercher les données de trafic ou à les regrouper. À titre d'exemple, la requête recommandée `Find dependencies of service: web-store` saisit automatiquement la requête `client_service: web-store` dans la barre de recherche et affiche les principaux services vers lesquels le service web-store envoie du trafic au sein du réseau, et par conséquent, ses dépendances en aval.

Les requêtes recommandées disponibles sont affichées en haut de la page Analytics, et elles sont au nombre de trois en haut de la [page DNS][10]. Utilisez ces requêtes pour accéder aux données couramment utilisées et afficher les modifications apportées à celles-ci au cours de l'heure écoulée.

Pour exécuter une requête recommandée, cliquez sur le carré. Si vous le survolez avec la souris, une description et un résumé des données renvoyées par la requête s'affichent.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="La vue détaillée d'une requête recommandée affichant une description et des informations sur la requête, à savoir quatre dimensions affichées : Search for, View clients as, View servers as et Visualize as" style="width:80%;">}}

### Volets des facettes

Vous pouvez utiliser les volets des facettes pour parcourir tous les tags disponibles sur vos flux, ou filtrer le trafic lorsque vous ne vous souvenez plus des tags précis que vous recherchiez. Les volets des facettes reflètent les tags définis dans la requête de la barre de recherche. Basculez entre ces volets à l'aide des onglets **Client** et **Server** situés en haut de la page :

{{< img src="network_performance_monitoring/network_analytics/destination_panel2.png" alt="Volet Destination" style="width:20%;">}}

#### Facettes personnalisées

Agrégez et filtrez vos données de trafic à l'aide de n'importe quel tag sur la page Network de Datadog. Une liste d'inclusion est fournie par défaut pour les tags. Elle se trouve dans le menu déroulant de la barre de recherche :

{{< img src="network_performance_monitoring/network_analytics/drop_down_npm.png" alt="Menu déroulant" style="width:90%;">}}

Cette liste comprend notamment les tags `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` et `port`. Si vous souhaitez agréger ou filtrer le trafic en fonction d'un tag qui n'est pas répertorié dans la liste, ajoutez-le en tant que facette personnalisée :

1. Cliquez sur le bouton `+` en haut à droite des volets de facettes.
2. Saisissez le tag à partir duquel vous souhaitez créer une facette personnalisée.
3. Cliquez sur `Create`.

Une fois votre facette personnalisée créée, utilisez ce tag pour filtrer et agréger le trafic depuis la page Network et Map. Toutes les facettes personnalisées sont accessibles sous la section `Custom` des volets de facettes.

### Recherche avec un wildcard
Afin d'effectuer une recherche avec un wildcard pour plusieurs caractères, utilisez le symbole `*` comme illustré ci-dessous :

- `client_service:web*` renvoie tous les services client qui commencent par « web ».
- `client_service:*web` renvoie tous les services client qui se terminent par « web ».
- `client_service:web*` renvoie tous les services client qui contiennent le texte « web ».

Les wildcards peuvent être utilisés au sein d'une facette avec cette syntaxe. La requête suivante renvoie tous les services client se terminant par le texte « mongo » :

`client_service:*mongo`

Pour en savoir plus, consultez la documentation relative à la [syntaxe de recherche][1].

### Regrouper en fonction de

Les groupes vous permettent de regrouper vos données selon la valeur d'un tag donné. Si vous sélectionnez par exemple un regroupement tel que **host**, les résultats sont regroupés par hosts individuels. Vous pouvez également choisir de consulter toutes vos données au sein d'un groupe spécifique à l'aide de l'option **Ungrouped traffic**. Il se peut également que vous possédiez de gros blocs de données qui ne sont pas tagués selon le regroupement qui vous intéresse. Auquel cas, vous pouvez utiliser l'option **Auto-grouped traffic** afin de regrouper les données en fonction des tags disponibles.

## Graphiques de synthèse

Les graphiques de synthèse offrent une vue condensée de votre réseau que vous pouvez modifier pour afficher le volume, le débit de requêtes, les connexions ou la latence, selon ce qui vous intéresse. Vous pouvez afficher jusqu'à trois graphiques de synthèse simultanément, et modifier les données affichées ainsi que le type de visualisation en fonction des besoins de votre organisation. Pour modifier la source de données d'un graphique, cliquez sur le titre du graphique et sélectionnez un élément dans le menu déroulant.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="La section Graphique de synthèse de la page Network Analytics, avec les options disponibles pour filtrer les données : Volume Sent, Throughput Sent, Volume Received, Throughput Received, Established Connections, Closed Connections, Established Connections / Second, Closed Connections / Second et TCP Latency" style="width:80%;">}}

Pour modifier le type de visualisation, cliquez sur l'icône en forme de crayon en haut à droite du graphique. Sélectionnez l'une des options disponibles, comme indiqué sur la capture d'écran ci-dessous.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Graphique de synthèse affichant les options de visualisation permettant de régler l'échelle de l'axe des ordonnées (Linear, Log, Pow et Sqrt) et le type de graphique (Area, Line, Bars, Toplist, Change et Piechart)" style="width:80%;">}}

Pour masquer un graphique spécifique, cliquez sur l'icône correspondante en regard de celle en forme de crayon. Vous pouvez afficher entre un et trois graphiques. Pour en ajouter, cliquez sur l'icône plus (`+`) située à droite du graphique de synthèse, puis sélectionnez le graphique à ajouter. Depuis la section permettant d'ajouter un nouveau graphique, vous pouvez également réinitialiser les graphiques par défaut.

{{< img src="network_performance_monitoring/network_analytics/summary_graphs_reset_graphs.png" alt="Section Graphiques de synthèse affichant les options Add graph et Reset Graphs" style="width:80%;">}}

## Données réseau

{{< img src="network_performance_monitoring/network_analytics/network_data2.png" alt="données réseau" style="width:90%;" >}}

Les métriques de votre réseau sont affichées dans les graphiques et le tableau associé. Toutes les métriques envoyées et reçues correspondent aux valeurs de la source :

* **Métriques envoyées** : mesurent les valeurs des flux allant de la _source_ vers la _destination_, du point de vue de la source.
* **Métriques reçues** : mesurent les valeurs des flux allant de la _destination_ vers la _source_, du point de vue de la source.

Lorsqu'une perte de paquets importante se produit, les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)`. Dans ce cas, si la `destination` envoie un grand nombre d'octets vers la `source`, les connexions agrégées qui partent de la `destination` comprennent ces octets, mais les connexions agrégées qui partent de la `source` ne les voient pas comme reçus.

**Remarque** : les données sont recueillies toutes les 30 secondes, agrégées dans des compartiments de 5 minutes et conservées pendant 14 jours.

### Métriques

#### Charge réseau

Les métriques relatives à la charge réseau suivantes sont disponibles :

| Métrique          |  Description                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | Nombre d'octets envoyés ou reçus sur une période donnée. Mesuré en octets (ou en l'un de ses multiples) dans les deux directions.                           |
|  **Throughput** | Le taux de transfert des octets envoyés ou reçus sur une période donnée. Mesuré en octets par seconde, dans les deux directions.                                                  |

#### Signaux mobiles

TCP est un protocole orienté connexion qui assure la transmission des paquets dans le bon ordre. Les métriques TCP ci-dessous sont disponibles. Remarque : toutes les métriques sont instrumentées du point de vue du côté `client` de la connexion, le cas échéant. Sinon, elles sont instrumentées du point de vue du serveur.

| Métrique                      | Description                                                                                                                              |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| **TCP Retransmits**         | Une retransmission TCP signifie qu'un échec a été détecté et que la transmission a été renouvelée pour garantir la bonne livraison des données. Cette métrique représente le nombre de retransmissions à partir du client. |
| **TCP Latency**             | Cette métrique mesure la durée lissée d'aller-retour TCP, à savoir le délai entre l'envoi et la réception d'une trame TCP.                              |
| **TCP Jitter**              | Cette métrique mesure la variance entre les durées lissées d'aller-retour TCP.                                                                                       |
| **Established Connections** | Le nombre de connexions TCP établies. Calculé en nombre de connexions par seconde à partir du client.                               |
| **Closed Connections**      | Le nombre de connexions TCP clôturées. Calculé en nombre de connexions par seconde à partir du client.                                     |

### Détection automatique des services cloud

Si vous utilisez des services cloud gérés, comme S3 ou Kinesis, vous pouvez surveiller les performances du trafic entre vos applications internes et ces services. Filtrez votre vue sur une dépendance AWS, Google Cloud ou Azure précise pour déterminer la latence, évaluer les performances des bases de données et consulter une vue d'ensemble de votre réseau.

{{< img src="network_performance_monitoring/network_analytics/cloud-service-hero-docs2.png" alt="Carte des services cloud" >}}

Vous pouvez par exemple :

- visualiser le flux de données entre votre cluster Kubernetes interne et `server_service:aws.s3` dans la [Network Map][2] ;
- basculer sur la [page Network](#tableau) pour isoler les pods qui établissent le plus de connexions au service ; et
- confirmer que leur requête est bien transmise en analysant les métriques de performance S3, qui sont directement corrélées avec les performances du trafic dans le volet latéral de la dépendance en question, sous l'onglet *Integration Metrics*.

La solution NPM mappe automatiquement :

- les appels réseau vers S3 (ces appels peuvent être répartis par `s3_bucket`), RDS (ces appels peuvent être répartis par `rds_instance_type`), Kinesis, ELB, Elasticache et d'autres [services AWS][3] ;
- les appels d'API vers AppEngine, Google DNS, Gmail et d'autres [services Google Cloud][4].

Pour surveiller d'autres endpoints sur lesquels l'Agent ne peut pas être installé (par exemple, des API publiques), depuis la vue d'ensemble du réseau, regroupez la destination en fonction du [tag `domain`](#resolution-du-domaine). Consultez la section ci-dessous pour la résolution sur les services cloud.

### Résolution améliorée sur les services cloud
Si vous avez [configuré][9] la résolution améliorée pour AWS ou Azure, la solution NPM peut filtrer et regrouper les données du trafic réseau en utilisant plusieurs ressources recueillies auprès de ces fournisseurs de solutions cloud. Les ensembles de tags pouvant être appliqués aux données varient d'un fournisseur de solutions cloud à un autre et d'une ressource à une autre. Outre les tags définis par l'utilisateur, Datadog applique les tags définis ci-dessous.

 #### Amazon Web Services
 {{< tabs >}}
 {{% tab "Équilibreurs de charge" %}}
 - name
 - loadbalancer
 - load_balancer_arn
 - dns_name (format loadbalancer/dns:)
 - region
 - account_id
 - scheme
 - tags personnalisés (définis par l'utilisateur) appliqués aux équilibreurs de charge AWS
 {{% /tab %}}

 {{% tab "Passerelles NAT" %}}
 - gateway_id
 - gateway_type
 - aws_nat_gateway_id
 - aws_nat_gateway_public_ip
 - aws_account
 - availability-zone
 - region
 - tags personnalisés (définis par l'utilisateur) appliqués aux passerelles NAT AWS
 {{% /tab %}}

 {{% tab "Passerelle Internet VPC" %}}
 - gateway_id
 - gateway_type
 - aws_internet_gateway_id
 - aws_account
 - region
 - tags personnalisés (définis par l'utilisateur) appliqués aux passerelles Internet VPC
 {{% /tab %}}

{{% tab "Endpoint VPC" %}}
 - gateway_id
 - gateway_type
 - aws_vpc_endpoint_id
 - tags personnalisés (définis par l'utilisateur) appliqués aux endpoints Internet VPC
 {{% /tab %}}

 {{< /tabs >}}

#### Aide
##### Équilibreurs de charge et passerelles d'application
 - name
 - loadbalancer
 - cloud_provider
 - region
 - type
 - resource_group
 - tenant_name
 - subscription_name
 - subscription_id
 - sku_name
 - tags personnalisés (définis par l'utilisateur) appliqués aux équilibreurs de charge et passerelles d'application Azure


### Résolution du domaine

Depuis la version 7.17, l'Agent convertit les adresses IP en noms de domaine lisibles pour le trafic interne et externe. Le domaine vous permet de surveiller les endpoints de vos fournisseurs de solutions cloud sur lesquelles il n'est pas possible d'installer un Agent Datadog. Il peut s'agir par exemple d'équilibreurs de charge d'application, d'API ou de compartiments S3. Les noms de domaines ne pouvant pas être identifiés, tels que ceux générés par un algorithme depuis un serveur C&C, peuvent être le signe d'une menace pour la sécurité réseau. `domain` est **encodé sous la forme d'un tag dans Datadog**. Vous pouvez l'ajouter dans les requêtes de la barre de recherche et dans le volet des facettes afin d'agréger et de filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation2.png" alt="Agrégation de domaine" >}}

**Remarque** : la résolution DNS fonctionne sur les hosts pour lesquels le system probe s'exécute sur l'espace de nommage réseau racine. Cela se produit généralement lorsque le system probe est exécuté dans un conteneur, sans passer par le réseau host.

### Network Address Translation (NAT)

Le NAT est un outil utilisé par Kubernetes et d'autres systèmes pour acheminer le trafic entre les conteneurs. Lorsque vous analysez une dépendance spécifique (par exemple entre deux services), la présence ou l'absence d'IP pré-NAT peut vous permettre de faire la distinction entre les services natifs à Kubernetes, qui font leur propre routage, et les services qui dépendent de clients externes pour le routage. Cette fonctionnalité ne prend actuellement pas en compte la résolution des passerelles NAT.

Pour afficher les IP pré-NAT et post-NAT, utilisez le paramètre **Show pre-NAT IPs** dans les paramètres du tableau. Lorsque ce paramètre est désactivé, les IP affichées dans les colonnes **Client IP** et **Server IP** correspondent aux IP post-NAT par défaut. Si plusieurs IP pré-NAT existent pour une même IP post-NAT, les 5 IP pré-NAT les plus courantes s'affichent. Le tag `pre_nat.ip` fonctionne comme n'importe quel autre tag : vous pouvez donc l'utiliser pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="IP pré-NAT" >}}

### ID réseau

Les utilisateurs de la solution NPM peuvent configurer leurs réseaux de façon à ce que leurs plages d'IP se chevauchent. Par exemple, il peut être préférable d'effectuer un déploiement sur plusieurs VPC (clouds privés virtuels) dont les plages d'adresses se chevauchent et qui communiquent uniquement par le biais de répartiteurs de charge ou de passerelles cloud.

Pour correctement classifier les destinations du trafic, la solution NPM fait appel au concept d'ID réseau. Un ID réseau est représenté par un tag et correspond à un identifiant alphanumérique pour un ensemble d'adresses IP qui peuvent communiquer entre elles. Lorsqu'une adresse IP mappée vers plusieurs hosts ayant des ID réseau différents est détectée, cet identifiant est utilisé pour déterminer avec précision le host vers lequel le trafic réseau est acheminé ou duquel il provient.

Dans AWS et Google Cloud, l'ID réseau est automatiquement défini sur l'ID du VPC. Pour d'autres environnements, l'ID réseau peut être défini manuellement, soit dans le fichier `datadog.yaml` comme indiqué ci-dessous, soit en ajoutant la variable d'environnement `DD_NETWORK_ID` aux conteneurs de l'Agent de processus et de l'Agent principal.

  ```yaml
  network:
     Id: <votre-id-réseau>
  ```

### Vues enregistrées

Organisez et partagez vos vues représentant les données de votre trafic. Les vues enregistrées facilitent le debugging et favorisent la collaboration. Vous pouvez ainsi créer une vue, l'enregistrer pour l'utiliser ultérieurement avec des requêtes basiques et envoyer son lien à votre équipe afin de partager des données réseau.

{{< img src="network_performance_monitoring/network_analytics/npm_saved_views2.png" alt="Vues enregistrées" >}}

- Pour enregistrer une vue, cliquez sur le bouton *+ Save* et attribuez un nom à la vue. Cela enregistre votre requête actuelle, la configuration du tableau ainsi que les métriques sélectionnées pour les graphiques.
- Pour charger une vue, cliquez sur *Views* en haut à gauche afin d'afficher la liste de vues enregistrées, puis sélectionnez une vue.
- Pour renommer une vue, passez le curseur sur cette vue dans la liste des vues enregistrées, cliquez sur l'icône en forme d'engrenage, puis sur l'option *Edit name*.
- Pour partager une vue, passez le curseur sur cette vue dans la liste des vues enregistrées, cliquez sur l'icône représentant un lien, puis sur l'option *Copy permalink*.

Pour en savoir plus, consultez la section [Vues enregistrées][5].


## Tableau

Le tableau Network présente les métriques _Volume_, _Throughput_, _TCP Retransmits_, _Round-trip Time (RTT)_ et _RTT variance_ entre chaque _source_ et chaque _destination_ définies dans votre requête.

{{< img src="network_performance_monitoring/network_analytics/network_table2.png" alt="Tableau de données" >}}

Pour configurer les colonnes de votre tableau, utilisez le bouton `Customize` en haut à droite.

Configurez le trafic affiché à l'aide du bouton `Filter Traffic`.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggles_v2.png" alt="Détails d'un flux" style="width:80%;">}}

Le trafic externe (vers les IP publiques) et le trafic de l'Agent Datadog sont affichés par défaut. Pour affiner le trafic affiché, vous pouvez désactiver les options `Show Datadog Traffic` et `Show External Traffic`.

### Trafic non résolu

Les tags client et serveur non résolus ont pour valeur `N/A`. La non-résolution d'un endpoint serveur ou client de trafic peut s'expliquer par les raisons suivantes :

* Les adresses IP serveur ou client du host ou du conteneur ne disposent pas des tags client ou serveur utilisés pour l'agrégation du trafic.
* Le endpoint se situe en dehors de votre réseau privé et n'est donc pas tagué par l'Agent Datadog.
* Le endpoint est un pare-feu, un maillage de service ou une autre entité sur laquelle il n'est pas possible d'installer un Agent Datadog.

Utilisez l'option **Show N/A (Unresolved Traffic)** en haut à droite du tableau de données pour masquer les connexions agrégées comportant un client ou un serveur non résolu (`N/A`).

Sélectionnez une ligne du tableau de données pour afficher les logs, traces et processus associés d'une connexion agrégée **client** <=> **server** donnée :

{{< img src="network_performance_monitoring/network_analytics/flow_details.png" alt="Détails d'une connexion agrégée" style="width:80%;">}}

## Volet latéral

Le volet latéral fournit des données de télémétrie contextuelle pour vous aider à débuguer les dépendances réseau. Utilisez les onglets Flows, Logs, Traces et Processes pour déterminer si un nombre élevé de retransmissions ou une augmentation de la latence du trafic entre deux endpoints est attribuable à :
- un pic de trafic provenant d'un port ou d'une adresse IP en particulier ;
- des processus lourds monopolisant le processeur ou la mémoire de l'endpoint de destination ;
- des erreurs d'application dans le code de l'endpoint client.

{{< img src="network_performance_monitoring/network_analytics/npm_sidepanel2.png" alt="Détails d'un flux" style="width:80%;">}}

### Tags communs

Les tags client et serveur communs partagés par les dernières connexions de la dépendance inspectée sont affichés dans la partie supérieure du volet latéral. Utilisez les tags communs pour obtenir des informations de contexte supplémentaires concernant un endpoint défaillant. Par exemple, si vous dépannez une augmentation de la latence des communications vers un service spécifique, des tags de destination communs afficheront les informations suivantes :
- avec des données de contexte granulaire indiquant notamment le conteneur, la tâche ou le host vers lequel le trafic est acheminé ;
- avec des données de contexte plus large indiquant notamment la zone de disponibilité, le compte du fournisseur de cloud ou le déploiement dans lequel le service s'exécute.

### Sécurité

L'onglet **Security** affiche les menaces réseau potentielles et les signaux détectés par [Cloud Security Management Threats][6] et [Cloud Security Management Misconfigurations][7]. Ces signaux sont générés lorsque Datadog détecte une activité réseau qui correspond à une [règle de détection ou de conformité][8], ou s'il existe d'autres menaces ou problèmes de configuration liés au flux réseau sélectionné.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search_syntax/
[2]: /fr/network_monitoring/performance/network_map/
[3]: /fr/network_monitoring/performance/guide/aws_supported_services/
[4]: /fr/network_monitoring/performance/guide/gcp_supported_services/
[5]: /fr/logs/explorer/saved_views/
[6]: /fr/security/threats/
[7]: /fr/security/cloud_security_management/misconfigurations/
[8]: /fr/security/detection_rules/
[9]: /fr/network_monitoring/performance/setup/#enhanced-resolution
[10]: /fr/network_monitoring/dns/#recommended-queries
