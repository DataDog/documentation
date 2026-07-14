---
aliases:
- /fr/network_performance_monitoring/network_table
- /fr/network_performance_monitoring/network_page
- /fr/network_monitoring/performance/network_page
- /fr/network_monitoring/performance/network_analytics
description: Explorez les données de votre réseau entre chaque source et destination
  sur votre pile.
further_reading:
- link: https://www.datadoghq.com/blog/network-performance-monitoring
  tag: Blog
  text: Surveillance du réseau cloud
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Simplifier les enquêtes réseau grâce aux requêtes et aux cartes améliorées
- link: /network_monitoring/devices
  tag: Documentation
  text: Surveillance d'appareils en réseau
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guide
  text: Détection de la disponibilité des applications à l'aide de Network Insights
title: Analyse réseau
---
## Aperçu {#overview}

La page Network Analytics fournit un aperçu de la santé globale de votre réseau et affiche [les requêtes recommandées](#recommended-queries) en haut de la page. Ces requêtes recommandées vous permettent d'exécuter des requêtes courantes et de voir des instantanés de métriques pertinentes, afin que vous puissiez observer les changements dans le débit, la latence, les erreurs DNS, et plus encore. En cliquant sur une requête recommandée, la barre de recherche, les regroupements et les graphiques de résumé se remplissent automatiquement pour vous fournir des informations pertinentes sur votre réseau.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Page d'accueil Network Analytics sous Cloud Network Monitoring" >}}

## Requêtes {#queries}

Pour affiner votre recherche au trafic entre des points de terminaison particuliers, regroupez et filtrez vos connexions réseau **avec des étiquettes**. Les étiquettes provenant des intégrations Datadog ou de [l'étiquetage de service unifié][12] peuvent être utilisées pour agréger et filtrer automatiquement. Lorsque vous utilisez l'étiquetage dans la surveillance réseau, vous pouvez tirer parti de la façon dont le trafic réseau circule à travers les zones de disponibilité pour un service particulier ou pour l'ensemble de votre infrastructure. Le regroupement par `client` et `server` étiquettes visualise le flux réseau _entre_ ces deux ensembles d'étiquettes.

De plus, Datadog fournit une liste d'étiquettes par défaut [prêtes à l'emploi](#default-tags) que vous pouvez utiliser pour interroger et analyser efficacement le trafic réseau le plus pertinent pour vos besoins.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="diagramme réseau montrant comment les requêtes sont vues lors du regroupement par étiquettes" style="width:100%;">}}

Par exemple, si vous souhaitez voir le trafic réseau entre votre service de commande appelé `orders-app` et toutes vos zones de disponibilité, utilisez `client_service:orders-app` dans la barre de recherche, et ajoutez les étiquettes `client_service` et `server_availability-zone` dans le menu déroulant **Regrouper par** pour visualiser le flux de trafic entre ces deux ensembles d'étiquettes :

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="Page d'analytique réseau montrant comment les requêtes sont vues lors du filtrage par service et du regroupement par zone de disponibilité" style="width:90%;">}}

La vue par défaut agrège le client et le serveur par l'étiquette `service`. En conséquence, chaque ligne du tableau représente des connexions agrégées de service à service lorsqu'elles sont agrégées sur une période d'une heure. Sélectionnez **Trafic auto-regroupé** pour voir le trafic regroupé en plusieurs étiquettes couramment utilisées telles que `service`, `kube_service`, `short_image`, et `container_name`.

**Remarque** : Pour des informations sur `NA/Untagged` les chemins de trafic, voir [Trafic non résolu](#unresolved-traffic).

### Comprendre les rôles client et serveur par rapport à la direction du trafic {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

La page d'analytique réseau montre les flux de trafic directionnels des clients dans une zone vers les serveurs dans une autre. Ces flux ne sont pas symétriques et peuvent ne pas montrer des « octets envoyés » et « octets reçus » égaux lorsqu'ils sont inversés.

Dans ce contexte :

- Le client fait référence au côté qui initie la connexion.
- Le serveur est le côté qui répond à cette connexion.

Datadog surveille le trafic en fonction de qui a ouvert la connexion. La direction inverse (serveur vers client) est affichée comme un flux séparé et peut avoir des métriques de volume différentes, ou pas de données du tout si aucune connexion n'est initiée dans cette direction.

Par exemple, si un client dans `us-east-1d` communique avec un serveur dans `us-east-1c`, vous pouvez voir un trafic significatif. Cependant, s'il n'y a pas de serveur dans `us-east-1d`, la ligne inverse (`us-east-1c → us-east-1d`) peut montrer peu ou pas de données.

**Remarque** : Les asymétries dans le trafic peuvent également résulter du comportement des applications ou des éléments d'infrastructure (par exemple, des proxys ou des NAT), ou d'un manque d'initiation de connexion dans une direction.

### Requêtes recommandées {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="La page Network Analytics dans Datadog affichant trois requêtes recommandées.">}}

Les requêtes recommandées vous permettent de commencer à enquêter sur votre réseau, que vous soyez en train de résoudre un problème spécifique ou d'obtenir une meilleure compréhension globale de votre réseau. Les requêtes recommandées vous aident à trouver des informations réseau pertinentes sans avoir besoin de rechercher ou de regrouper le trafic. Par exemple, la requête recommandée `Find dependencies of service: web-store` remplit la barre de recherche avec la requête `client_service: web-store` et affiche les principaux services vers lesquels le service web-store envoie du trafic au sein du réseau, et donc ses dépendances en aval.

Toutes les requêtes recommandées disponibles sont fournies en haut de la page d'analytique, et il y a trois requêtes recommandées en haut de la [page DNS][10]. Utilisez ces requêtes pour accéder aux données couramment utilisées, et voir tout changement dans ces données au cours de la dernière heure.

Pour exécuter une requête recommandée, cliquez sur la tuile. Survoler la tuile affiche une description et un résumé des données que la requête retourne.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="La vue détaillée d'une requête recommandée affichant une description et des informations sur la requête, avec quatre dimensions de requête affichées : Search for, View clients as, View servers as, et Visualize as." style="width:70%;">}}

### Panneaux de facettes {#facet-panels}

Utilisez les panneaux de facettes pour parcourir tous les tags disponibles sur vos flux ou filtrer le trafic sans avoir besoin de vous souvenir des noms exacts des tags. Les panneaux de facettes reflètent les tags dans votre requête de barre de recherche. Utilisez les onglets **Client** et **Serveur** pour basculer entre les panneaux de facettes.

#### Facettes personnalisées {#custom-facets}

Agrégez et filtrez vos données de trafic par n'importe quel tag sur la page d'analytique réseau. Une liste des tags inclus se trouve sur le côté gauche de l'écran sous les onglets **Client** et **Serveur**, et dans le menu déroulant **Grouper par**.

Les tags inclus sont `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip`, et `port`, entre autres. Si vous souhaitez agréger ou filtrer le trafic par un tag qui n'est pas déjà dans le menu, ajoutez-le en tant que facette personnalisée :

1. Sélectionnez le bouton **+ Ajouter** en haut à droite des panneaux de facettes.
2. Entrez l'étiquette pertinente sur laquelle vous souhaitez créer une facette personnalisée.
3. Cliquez sur **Ajouter**.

Après la création de la facette personnalisée, utilisez cette étiquette pour filtrer et agréger le trafic sur la page d'analytique réseau et la carte réseau. Toutes les facettes personnalisées peuvent être consultées dans la section `Custom` en bas des panneaux de facettes.

### Recherche par caractères génériques {#wildcard-search}
Pour effectuer une recherche par caractères génériques multi-caractères, utilisez le symbole `*` comme suit :

- `client_service:web*` correspond à tous les services clients qui commencent par web.
- `client_service:*web` correspond à tous les services clients qui se terminent par web.
- `client_service:*web*` correspond à tous les services clients qui contiennent la chaîne web.

Les recherches par caractères génériques fonctionnent au sein des facettes avec cette syntaxe. Cette requête renvoie tous les services clients qui se terminent par la chaîne « mongo » :

`client_service:*mongo`

Pour en savoir plus, consultez la documentation relative à la [syntaxe de recherche][1].

### Étiquettes neutres {#neutral-tags}

Les étiquettes neutres sont des étiquettes qui ne sont spécifiques ni à un client ni à un serveur, et qui s'appliquent plutôt à un flux entier. Vous pouvez rechercher et filtrer le trafic avec ces étiquettes neutres. Par exemple, vous pouvez utiliser ces étiquettes pour filtrer le trafic qui est chiffré en TLS.

Pour une liste complète des étiquettes neutres et de leurs descriptions, consultez [Étiquettes neutres][15] dans la Référence des étiquettes.

### Grouper par {#group-by}

Les groupes vous permettent de regrouper vos données par la valeur d'une étiquette donnée. Par exemple, si vous sélectionnez un regroupement tel que **hôte**, les résultats sont regroupés par hôtes individuels. De plus, vous pouvez avoir de grandes quantités de données qui ne sont pas étiquetées par le regroupement qui vous intéresse. Dans ces situations, vous pouvez utiliser **Trafic auto-groupé** pour regrouper les données par les étiquettes disponibles.

Si vous souhaitez examiner les connexions de tous vos hôtes dans un seul regroupement, ajoutez les étiquettes `client_host` et `Auto-Grouped-Servers` dans le menu déroulant **Grouper par**.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="Page d'analytique NPM triée par hôte et regroupée par Trafic auto-groupé" style="width:90%;">}}

L'option **Trafic auto-groupé** peut vous aider à identifier la source de vos étiquettes. Par exemple, survolez les icônes individuelles pour afficher une infobulle qui indique l'origine de l'étiquette :

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Survoler l'infobulle de l'icône pour afficher la source de l'étiquette" style="width:90%;">}}

## Graphiques récapitulatifs {#summary-graphs}

Les graphiques récapitulatifs sont une vue condensée de votre réseau, que vous pouvez modifier pour afficher le volume, le débit, les connexions ou la latence selon vos besoins. Affichez jusqu'à trois graphiques récapitulatifs à la fois, et changez le type de données et de visualisation pour convenir à votre organisation. Pour mettre à jour la source de données d'un graphique, cliquez sur le titre du graphique et faites une sélection dans le menu déroulant.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="La section des graphiques récapitulatifs de la page Network Analytics, affichant les options disponibles pour filtrer les données : Volume envoyé, Débit envoyé, Volume reçu, Débit reçu, Connexions établies, Connexions fermées, Connexions établies / seconde, Connexions fermées / seconde, et Latence TCP." style="width:80%;">}}

Pour changer le type de visualisation, cliquez sur l'icône de crayon dans le coin supérieur droit du graphique. Sélectionnez parmi les options disponibles, comme indiqué dans la capture d'écran ci-dessous.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Les options de visualisation du graphique récapitulatif affichent les options pour ajuster l'échelle de l'axe Y avec Linear, Log, Pow et Sqrt, et pour ajuster le type de graphique avec Area, Line, Bars, Toplist, Change et Piechart." style="width:60%;">}}

Pour masquer un graphique spécifique, cliquez sur l'icône **masquer le graphique** à côté de l'icône de crayon. Vous pouvez afficher aussi peu qu'un graphique ou jusqu'à trois graphiques. Pour ajouter des graphiques, cliquez sur l'icône plus `+` sur le côté droit du graphique récapitulatif et sélectionnez le graphique à ajouter. Vous pouvez également réinitialiser les graphiques aux graphiques par défaut lors de l'ajout d'un nouveau graphique.

## Tableau {#table}

Le tableau réseau décompose les métriques Volume, Débit, Retransmissions TCP, Temps de réponse (RTT) et variance RTT entre chaque **source** et **destination** définis par votre requête.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="Tableau de données réseau montrant le trafic auto-groupé et les colonnes de débit." >}}

Vous pouvez configurer les colonnes de votre tableau en utilisant l'icône d'engrenage **Customize** (⚙️) en haut à droite du tableau.

Configurez le trafic affiché avec le bouton `Filter Traffic` en haut à droite de la page.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="Détails du flux" style="width:50%;">}}

Le trafic externe (vers des IP publiques) et le trafic de l'Agent Datadog sont affichés par défaut. Pour affiner votre vue, vous pouvez choisir de désactiver les bascules `Show Datadog Traffic` et `Show External Traffic`.

### Trafic non résolu {#unresolved-traffic}

Les tags de client et de serveur non résolus sont marqués comme `N/A`. Un point de terminaison client ou serveur de trafic peut être non résolu car il manque des métadonnées identifiables, telles que des informations sur la source ou la destination. Cela peut se produire lorsque Datadog ne peut pas résoudre le trafic vers des entités connues comme des équilibreurs de charge, des services cloud ou des adresses IP spécifiques au sein de l'infrastructure surveillée. En général, le trafic non résolu peut survenir en raison de :

* Les IPs de client ou de serveur hôte ou conteneur ne sont pas étiquetées avec les tags de client ou de serveur utilisés pour l'agrégation du trafic.
* Le point de terminaison est en dehors de votre réseau privé et n'est donc pas étiqueté par l'Agent Datadog.
* Le point de terminaison est un pare-feu, un maillage de services ou une autre entité où un Agent Datadog ne peut pas être installé.
* La destination n'a pas été étiquetée avec un service, ou une adresse IP n'a pas été mappée à un service.

Surveiller le trafic non résolu est essentiel pour identifier les angles morts dans la visibilité du réseau et garantir que tout le trafic pertinent est pris en compte dans l'analyse de performance et de sécurité.

Utilisez le **Show N/A (Unresolved Traffic)** toggle dans le coin supérieur droit du tableau de données pour filtrer les connexions agrégées avec des clients ou serveurs non résolus (`N/A`).

### Pivot to network path{#pivot-to-network-path}

Cliquez sur le menu à trois points dans le tableau Analytics pour passer à [network path][11] et voir les chemins entre la source et la destination spécifiés dans CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Cliquez sur le menu à trois points dans le tableau Analytics pour afficher le toggle Network Path." style="width:90%;">}}

## Saved views{#saved-views}

Organisez et partagez des vues des données de trafic. Saved Views rendent le débogage plus rapide et favorisent la collaboration. Par exemple, vous pouvez créer une vue, l'enregistrer pour l'avenir pour des requêtes courantes, et copier son lien pour partager les données réseau avec vos coéquipiers.

- To save a view : cliquez sur le bouton **+ Save** et nommez la vue pour enregistrer votre requête actuelle, la configuration du tableau et les sélections de métriques graphiques.
- To load a view : cliquez sur **Views** en haut à gauche pour voir vos Saved Views et sélectionner une vue dans la liste.
- To rename a view : survolez une vue dans la liste des Saved Views et cliquez sur l'icône d'engrenage pour **Edit name**.
- To share a view : survolez une vue dans la liste des Saved Views et cliquez sur l'icône de lien pour **Copy permalink**.

Pour en savoir plus, consultez la section [Vues enregistrées][5].

## Sidepanel{#sidepanel}

Le panneau latéral fournit une télémétrie contextuelle pour vous aider à déboguer les dépendances réseau. Utilisez les onglets Flows, Logs, Traces et Processes pour déterminer si un nombre élevé de retransmissions ou une latence dans le trafic entre deux points de terminaison est dû à :

- Une augmentation du volume de trafic provenant d'un port ou d'une adresse IP particulière.
- Des processus lourds consommant le CPU ou la mémoire du point de terminaison de destination.
- Des erreurs d'application dans le code du point de terminaison client.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="Le panneau latéral CNM détaille le trafic entre le client et le service." style="width:90%;">}}

### Common tags{#common-tags}

Le haut du panneau latéral affiche les étiquettes communes client et serveur partagées par les connexions les plus récentes de la dépendance inspectée. Utilisez des étiquettes communes pour obtenir un contexte supplémentaire sur un point de terminaison défaillant. Par exemple, lors du dépannage d'une communication latente vers un service particulier, les étiquettes de destination communes révèlent ce qui suit :
- Contexte granulaire tel que le conteneur, la tâche ou l'hôte vers lequel le trafic est dirigé.
- Contexte plus large tel que la zone de disponibilité, le compte de fournisseur de cloud ou le déploiement dans lequel le service fonctionne.

### Traces {#traces}

L'onglet **Traces** affiche les traces APM associées au flux réseau sélectionné. Utilisez cet onglet pour passer d'un problème au niveau réseau—tel qu'une latence élevée ou des comptes de retransmission élevés—aux traces d'application pour les services impliqués.

Pour plus d'informations, voir [APM][17].

### Sécurité {#security}

L'onglet **Security** met en évidence les menaces potentielles sur le réseau et les résultats détectés par [Workload Protection][6] et [Cloud Security Misconfigurations][7]. Ces signaux sont générés lorsque Datadog détecte une activité réseau qui correspond à une [detection or compliance rule][8], ou s'il y a d'autres menaces et erreurs de configuration liées au flux réseau sélectionné.

Pour une référence complète des tags par défaut disponibles pour interroger et filtrer le trafic réseau, voir [Tags Reference][16].

## Network data{#network-data}

Les métriques réseau sont affichées à travers les graphiques et le tableau associé. Toutes les métriques envoyées et reçues sont affichées du point de vue de la source :

* **Sent metrics** : mesurez la valeur de quelque chose depuis le _source_ jusqu'au _destination_, du point de vue du source.
* **Received metrics** : mesurez la valeur de quelque chose depuis le _destination_ jusqu'au _source_, du point de vue du source.

Les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)` s'il y a un grand nombre de paquets perdus. Dans ce cas, si le `destination` envoie beaucoup d'octets au `source`, les connexions agrégées qui proviennent de `destination` incluent ces octets, mais les connexions agrégées qui proviennent de `source` ne les voient pas comme reçus.

**Remarque :** Les données sont collectées toutes les 30 secondes, agrégées en intervalles de cinq minutes et conservées pendant 14 jours.

### Metrics{#metrics}

#### Network load{#network-load}

Les métriques relatives à la charge réseau suivantes sont disponibles :

| Metric|  Description|
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | Le nombre d'octets envoyés ou reçus sur une période. Mesuré en octets (ou ordres de grandeur) bidirectionnels.                           |
| **Throughput**  | Le taux d'octets envoyés ou reçus sur une période. Mesuré en octets par seconde, bidirectionnel.                                                  |

#### TCP {#tcp}

TCP est un protocole orienté connexion qui garantit la livraison des paquets dans l'ordre. 

Les métriques TCP suivantes sont disponibles : 

| Metric| Description|
|---|---|
| **Closed Connections** | Le nombre de connexions TCP dans un état fermé. Mesuré en connexions par seconde depuis le client. |
| **Established Connections** | Le nombre de connexions TCP dans un état établi. Mesuré en connexions par seconde depuis le client. |
| **Host Unreachable** | Indique lorsque l'hôte cible est hors ligne ou que le trafic est bloqué par des routeurs ou des pare-feu. Disponible dans **Agent 7.68+**. |
| **Network Unreachable** | Indique des problèmes de réseau local sur la machine hôte de l'Agent. Disponible dans **Agent 7.68+**. |
| **Connection Cancels** | Suit les annulations de connexion TCP et les délais d'attente de connexion en espace utilisateur dans des environnements d'exécution tels que `Go` et `Node.js`. Disponible dans **Agent 7.70+**. |
| **TCP Jitter** | Mesuré comme la variance lissée du temps de trajet aller-retour TCP. |
| **TCP Latency** | Mesurée comme le temps aller-retour lissé TCP, c'est-à-dire le temps entre l'envoi d'une trame TCP et la réception de son accusé de réception. |
| **Refus TCP**  | Le nombre de connexions TCP qui ont été refusées par le serveur. Typiquement, cela indique une tentative de connexion à une IP/port qui ne reçoit pas de connexions, ou une mauvaise configuration de pare-feu/sécurité. |
| **Réinitialisations TCP**  | Le nombre de connexions TCP qui ont été réinitialisées par le serveur.  |
| **TCP Retransmits** | Les retransmissions TCP représentent des échecs détectés qui sont retransmises pour garantir la livraison. Mesuré en nombre de retransmissions depuis le client. |
| **Délais d'attente TCP**  | Le nombre de connexions TCP qui ont expiré du point de vue du système d'exploitation. Cela peut indiquer des problèmes de connectivité et de latence généraux.  |

Toutes les métriques sont mesurées du côté `client` de la connexion lorsque cela est possible, sinon du côté serveur.

## Autodétection de service cloud {#cloud-service-autodetection}

Si vous comptez sur des services cloud gérés comme S3 ou Kinesis, vous pouvez surveiller la performance du trafic vers ces services depuis vos applications internes. Limitez votre vue à une dépendance particulière AWS, Google Cloud ou Azure pour identifier la latence, évaluer la performance de la base de données et visualiser votre réseau de manière plus complète.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="Panneau latéral d'une connexion réseau, limité par `server_service:aws.s3`" >}}

Par exemple, vous pouvez :

- Visualisez le flux de données de votre cluster Kubernetes interne vers `server_service:aws.s3` dans la [Carte Réseau][2].
- Accédez à la [Page Réseau](#table) pour isoler quels pods établissent le plus de connexions à ce service, et
- Validez que leur demande est réussie en analysant les métriques de performance S3, qui sont corrélées avec la performance du trafic directement dans le panneau latéral pour une dépendance donnée, sous l'onglet *Métriques d'Intégration*.

CNM cartographie automatiquement :

- Appels réseau à S3 (qui peuvent être décomposés par `s3_bucket`), RDS (qui peuvent être décomposés par `rds_instance_type`), Kinesis, ELB, Elasticache, et d'autres [services AWS][3].
- Appels API à AppEngine, Google DNS, Gmail, et d'autres [services Google Cloud][4].

Pour surveiller d'autres points de terminaison où un Agent ne peut pas être installé (comme les API publiques), regroupez la destination par le tag [`domain`](#domain-resolution). Ou, consultez la section ci-dessous pour la résolution des services cloud.

### Résolution améliorée des services cloud {#cloud-service-enhanced-resolution}

Avec [la résolution améliorée configurée][9] pour AWS ou Azure, CNM filtre et regroupe le trafic réseau en utilisant les ressources collectées auprès de ces fournisseurs de cloud. Les tags disponibles varient selon le fournisseur de cloud et la ressource. Datadog applique automatiquement les étiquettes énumérées ci-dessous en plus de toutes les étiquettes définies par l'utilisateur.

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "Équilibreurs de charge" %}}
- nom
- équilibreur de charge
- load_balancer_arn
- dns_name (format loadbalancer/dns:)
- région
- identifiant_de_compte
- schéma
- tags personnalisés (définis par l'utilisateur) appliqués aux équilibreurs de charge AWS
{{% /tab %}}

{{% tab "Passerelles NAT" %}}
- identifiant_de_la_passerelle
- type_de_passerelle
- identifiant_de_la_passerelle_nat_aws
- adresse_ip_publique_de_la_passerelle_nat_aws
- compte_aws
- zone_de_disponibilité
- région
- tags personnalisés (définis par l'utilisateur) appliqués aux Passerelles NAT AWS
{{% /tab %}}

{{% tab "Passerelle Internet VPC" %}}
- identifiant_de_la_passerelle
- type_de_passerelle
- identifiant_de_la_passerelle_internet_aws
- compte_aws
- région
- tags personnalisés (définis par l'utilisateur) appliqués aux Passerelles Internet VPC
{{% /tab %}}

{{% tab "Point de terminaison VPC" %}}
- identifiant_de_la_passerelle
- type_de_passerelle
- identifiant_du_point_de_terminaison_vpc_aws
- tags personnalisés (définis par l'utilisateur) appliqués aux Points de terminaison Internet VPC
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "Équilibreurs de charge et passerelles d'application" %}}
- nom
- loadbalancer → équilibreur de charge
- fournisseur de cloud
- région
- type
- groupe de ressources
- nom du locataire
- nom de l'abonnement
- identifiant de l'abonnement
- nom du SKU
- tags personnalisés (définis par l'utilisateur) appliqués aux équilibreurs de charge Azure et aux passerelles d'application
{{% /tab %}}
{{< /tabs >}}

## Résolution de domaine {#domain-resolution}

À partir de l'Agent 7.17+, l'Agent résout les adresses IP en noms de domaine lisibles par l'homme pour le trafic externe et interne. Le domaine vous permet de surveiller les points de terminaison du fournisseur de cloud où un Agent Datadog ne peut pas être installé, tels que les buckets S3, les équilibreurs de charge d'application et les API. Des noms de domaine non reconnaissables tels que les domaines DGA des serveurs C&C peuvent indiquer des menaces pour la sécurité du réseau. `domain` **est encodé en tant que tag dans Datadog**, vous pouvez donc l'utiliser dans les requêtes de la barre de recherche et le panneau de facettes pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="Agrégation de domaine" >}}

**Remarque** : La résolution DNS est prise en charge pour les hôtes où le système probe fonctionne sur l'espace de noms réseau racine, ce qui est généralement causé par l'exécution du système-probe dans un conteneur sans utiliser le réseau hôte.

## Traduction d'adresses réseau (NAT) {#network-address-translation-nat}

Le NAT est un outil utilisé par Kubernetes et d'autres systèmes pour router le trafic entre les conteneurs. Lors de l'examen d'une dépendance spécifique (par exemple, service à service), vous pouvez utiliser la présence ou l'absence d'IP pré-NAT pour distinguer les services natifs de Kubernetes, qui effectuent leur propre routage, et les services qui dépendent de clients externes pour le routage. Cette fonctionnalité n'inclut pas la résolution des passerelles NAT.

Pour afficher les adresses IP avant et après la NAT, utilisez le **Afficher les adresses IP avant la NAT** bascule dans les paramètres du tableau. Lorsque ce paramètre est désactivé, les adresses IP affichées dans les colonnes **Adresse IP du client** et **Adresse IP du serveur** sont par défaut des adresses IP après la NAT. Dans les cas où vous avez plusieurs adresses IP avant la NAT pour une adresse IP après la NAT, les 5 adresses IP avant la NAT les plus courantes sont affichées. `pre_nat.ip` est une étiquette comme n'importe quelle autre dans le produit, vous pouvez donc l'utiliser pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="Adresses IP pré-NAT" >}}

## ID de réseau {#network-id}

Les utilisateurs de CNM peuvent configurer leurs réseaux pour avoir des espaces d'adresses IP qui se chevauchent. Par exemple, vous pouvez vouloir déployer dans plusieurs VPC (clouds privés virtuels) qui ont des plages d'adresses IP qui se chevauchent et communiquent uniquement par le biais d'équilibreurs de charge ou de passerelles cloud.

Pour classer correctement les destinations de trafic, CNM utilise le concept d'ID de réseau, qui est représenté comme une étiquette. Un ID de réseau est un identifiant alphanumérique pour un ensemble d'adresses IP qui peuvent communiquer entre elles. Lorsqu'une adresse IP correspondant à plusieurs hôtes avec différents ID de réseau est détectée, cet identifiant est utilisé pour déterminer le réseau hôte particulier vers lequel le trafic va ou vient.

Dans AWS et Google Cloud, l'ID de réseau est automatiquement défini sur l'ID du VPC. Pour d'autres environnements, l'ID de réseau peut être défini manuellement, soit dans `datadog.yaml` comme indiqué ci-dessous, soit en ajoutant le `DD_NETWORK_ID` au processus et aux conteneurs de l'Agent principal.

```yaml
network:
   Id: <your-network-id>
```


## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/logs/search_syntax/
[2]: /fr/network_monitoring/cloud_network_monitoring/network_map/
[3]: /fr/network_monitoring/cloud_network_monitoring/supported_cloud_services/aws_supported_services/
[4]: /fr/network_monitoring/cloud_network_monitoring/supported_cloud_services/gcp_supported_services/
[5]: /fr/logs/explorer/saved_views/
[6]: /fr/security/workload_protection/
[7]: /fr/security/cloud_security_management/misconfigurations/
[8]: /fr/security/detection_rules/
[9]: /fr/network_monitoring/cloud_network_monitoring/setup/#enhanced-resolution
[10]: /fr/network_monitoring/dns/#recommended-queries
[11]: /fr/network_monitoring/network_path
[12]: /fr/getting_started/tagging/unified_service_tagging/
[15]: /fr/network_monitoring/cloud_network_monitoring/tags_reference/#neutral-tags
[16]: /fr/network_monitoring/cloud_network_monitoring/tags_reference/
[17]: /fr/tracing/