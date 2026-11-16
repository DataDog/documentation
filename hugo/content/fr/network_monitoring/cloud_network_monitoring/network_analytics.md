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
  text: Cloud Network Monitoring
- link: https://www.datadoghq.com/blog/datadog-npm-search-map-updates/
  tag: Blog
  text: Simplifier les enquêtes réseau grâce aux requêtes et aux cartes améliorées
- link: /network_monitoring/devices
  tag: Documentation
  text: Network Device Monitoring
- link: /network_monitoring/cloud_network_monitoring/guide/detecting_application_availability/
  tag: Guide
  text: Détection de la disponibilité des applications à l'aide de Network Insights
title: Network Analytics
---
## Présentation {#overview}

La page Network Analytics fournit des informations sur l'état global de votre réseau et affiche des [requêtes recommandées](#recommended-queries) en haut de la page. Ces requêtes recommandées vous permettent d'exécuter des requêtes courantes et de voir des instantanés de métriques pertinentes, afin que vous puissiez constater les changements de débit, de latence, d'erreurs DNS, et plus encore. Cliquer sur une requête recommandée remplit automatiquement la barre de recherche, les regroupements et les graphiques récapitulatifs pour vous fournir des informations pertinentes sur votre réseau.

{{< img src="network_performance_monitoring/network_analytics/cnm_network_analytics_3.png" alt="Page d'accueil Network Analytics sous Cloud Network Monitoring" >}}

## Requêtes {#queries}

Pour affiner votre recherche sur le trafic entre des endpoints particuliers, agrégez et filtrez vos connexions réseau **avec des tags**. Les tags des intégrations Datadog ou du [Unified Service Tagging][12] peuvent être utilisés pour l'agrégation et le filtrage automatiques. Lorsque vous utilisez le taggage dans Network Monitoring, vous pouvez tirer parti de la façon dont le trafic réseau circule entre les zones de disponibilité pour un service particulier ou pour l'ensemble de votre infrastructure. Le regroupement par les tags `client` et `server` visualise le flux réseau _entre_ ces deux ensembles de tags.

De plus, Datadog fournit une liste de tags [prêts à l'emploi](#default-tags) que vous pouvez utiliser pour interroger et analyser efficacement le trafic réseau le plus pertinent pour vos besoins.

{{< img src="network_performance_monitoring/network_analytics/network_diagram_with_tags.png" alt="diagramme réseau montrant comment les requêtes sont vues lors du regroupement par tags" style="width:100%;">}}

Par exemple, si vous souhaitez voir le trafic réseau entre votre service de commande appelé `orders-app` et toutes vos zones de disponibilité, utilisez `client_service:orders-app` dans la barre de recherche, et ajoutez les tags `client_service` et `server_availability-zone` dans le menu déroulant {{< ui >}}Group By{{< /ui >}} pour visualiser le flux de trafic entre ces deux ensembles de tags :

{{< img src="network_performance_monitoring/network_analytics/network_analytics_with_client_and_server_tag_2.png" alt="Page Network Analytics montrant comment les requêtes sont vues lors du filtrage par service et du regroupement par zone de disponibilité" style="width:90%;">}}

La vue par défaut agrège le client et le serveur par le tag `service`. Par conséquent, chaque ligne du tableau représente les connexions agrégées de service à service lorsqu'elles sont agrégées sur une période d'une heure. Sélectionnez {{< ui >}}Auto-grouped traffic{{< /ui >}} pour voir le trafic réparti dans plusieurs tags couramment utilisés tels que `service`, `kube_service`, `short_image` et `container_name`.

**Remarque** : Pour plus d'informations sur les chemins de trafic `NA/Untagged`, consultez [Trafic non résolu](#unresolved-traffic).

### Comprendre les rôles de client et de serveur par rapport à la direction du trafic {#understanding-client-and-server-roles-in-relation-to-traffic-direction}

La page Network Analytics affiche les flux de trafic directionnels des clients d'une zone vers les serveurs d'une autre. Ces flux ne sont pas symétriques et peuvent ne pas montrer des « octets envoyés » et « octets reçus » égaux lorsqu'ils sont inversés.

Dans ce contexte :

- Client désigne le côté qui initie la connexion.
- Serveur désigne le côté qui répond à cette connexion.

Datadog surveille le trafic en fonction de qui a ouvert la connexion. La direction inverse (serveur vers client) est affichée comme un flux distinct et peut avoir des métriques de volume différentes, ou aucune donnée si aucune connexion n'est initiée dans cette direction.

Par exemple, si un client dans `us-east-1d` communique avec un serveur dans `us-east-1c`, vous pouvez constater un trafic important. Cependant, s'il n'y a pas de serveur dans `us-east-1d`, la ligne inverse (`us-east-1c → us-east-1d`) peut afficher peu ou pas de données.

**Remarque** : Les asymétries dans le trafic peuvent également résulter du comportement des applications ou d'éléments d'infrastructure (par exemple, des proxys ou des NAT), ou de l'absence d'initiation de connexion dans une direction.

### Requêtes recommandées {#recommended-queries}

{{< img src="network_performance_monitoring/network_analytics/recommended_queries_3.png" alt="La page Network Analytics dans Datadog affichant trois requêtes recommandées">}}

Les requêtes recommandées vous permettent de commencer à analyser votre réseau, que vous soyez en train de résoudre un problème spécifique ou d'obtenir une meilleure compréhension globale de votre réseau. Les requêtes recommandées vous aident à trouver des informations réseau pertinentes sans avoir besoin de rechercher ou de regrouper le trafic. Par exemple, la requête recommandée `Find dependencies of service: web-store` remplit la barre de recherche avec la requête `client_service: web-store` et affiche les principaux services vers lesquels le service web-store envoie du trafic au sein du réseau, et donc ses dépendances en aval.

Toutes les requêtes recommandées disponibles sont fournies en haut de la page Analytics, et il existe trois requêtes recommandées en haut de la [page DNS][10]. Utilisez ces requêtes pour accéder aux données couramment utilisées et voir tout changement dans ces données au cours de la dernière heure.

Pour exécuter une requête recommandée, cliquez sur la vignette. Le survol de la vignette affiche une description et un résumé des données renvoyées par la requête.

{{< img src="network_performance_monitoring/network_analytics/recommended_query_detail.png" alt="La vue détaillée d'une requête recommandée affichant une description et des informations sur la requête, avec quatre dimensions de requête affichées : Rechercher, Voir les clients comme, Voir les serveurs comme et Visualiser comme" style="width:70%;">}}

Vous pouvez également interroger les données de trafic réseau à partir d'un agent IA avec l'outil [`analyze_cloud_network_monitoring`][18] dans le Datadog MCP Server.

### Panneaux de facettes {#facet-panels}

Utilisez les panneaux de facettes pour parcourir tous les tags disponibles sur vos flux ou filtrer le trafic sans avoir à mémoriser les noms exacts des tags. Les panneaux de facettes reflètent les tags de votre requête dans la barre de recherche. Utilisez les onglets {{< ui >}}Client{{< /ui >}} et {{< ui >}}Server{{< /ui >}} pour basculer entre les panneaux de facettes.

#### Facettes personnalisées {#custom-facets}

Agrégez et filtrez vos données de trafic par n'importe quel tag sur la page d'analyse réseau. Une liste des tags inclus se trouve sur le côté gauche de l'écran sous les onglets {{< ui >}}Client{{< /ui >}} et {{< ui >}}Server{{< /ui >}}, et dans le menu déroulant {{< ui >}}Group By{{< /ui >}}.

Les tags inclus sont `service`, `availability zone`, `env`, `environment`, `pod`, `host`, `ip` et `port`, entre autres. Si vous souhaitez agréger ou filtrer le trafic par un tag qui ne figure pas déjà dans le menu, ajoutez-le en tant que facette personnalisée :

1. Sélectionnez le bouton {{< ui >}}\+ Add{{< /ui >}} en haut à droite des panneaux de facettes.
2. Saisissez le tag pertinent sur lequel vous souhaitez créer une facette personnalisée.
3. Cliquez sur {{< ui >}}Add{{< /ui >}}.

Une fois la facette personnalisée créée, utilisez ce tag pour filtrer et agréger le trafic sur la page d'analyse réseau et la carte réseau. Toutes les facettes personnalisées peuvent être consultées dans la section `Custom` en bas des panneaux de facettes.

### Recherche par caractères génériques {#wildcard-search}
Pour effectuer une recherche par caractères génériques multi-caractères, utilisez le symbole `*` comme suit :

- `client_service:web*` correspond à tous les services clients commençant par web.
- `client_service:*web` correspond à tous les services clients se terminant par web.
- `client_service:*web*` correspond à tous les services clients contenant la chaîne web.

Les recherches par caractères génériques fonctionnent au sein des facettes avec cette syntaxe. Cette requête renvoie tous les services clients qui se terminent par la chaîne « mongo » :

`client_service:*mongo`

Pour en savoir plus, consultez la documentation relative à la [syntaxe de recherche][1].

### Tags neutres {#neutral-tags}

Les tags neutres sont des tags qui ne sont pas spécifiques à un client ou à un serveur, et qui s'appliquent plutôt à un flux entier. Vous pouvez rechercher et filtrer le trafic avec ces tags neutres. Par exemple, vous pouvez utiliser ces tags pour filtrer le trafic chiffré par TLS.

Pour obtenir une liste complète des tags neutres et leurs descriptions, consultez [Tags neutres][15] dans la Référence des tags.

### Grouper par {#group-by}

Les groupes vous permettent de regrouper vos données par la valeur d'un tag donné. Par exemple, si vous sélectionnez un regroupement tel que **host**, les résultats sont regroupés par host individuel. De plus, vous pouvez avoir de gros volumes de données qui ne sont pas étiquetés par le regroupement qui vous intéresse. Dans ces situations, vous pouvez utiliser {{< ui >}}Auto-grouped traffic{{< /ui >}} pour regrouper les données par les tags disponibles.

Si vous souhaitez examiner les connexions de tous vos hosts dans un seul regroupement, ajoutez les tags `client_host` et `Auto-Grouped-Servers` dans la liste déroulante {{< ui >}}Group By{{< /ui >}}.

{{< img src="network_performance_monitoring/network_analytics/cnm_auto-grouped_client.png" alt="Page d'analyse NPM triée par host et regroupée par trafic auto-regroupé" style="width:90%;">}}

L'option {{< ui >}}Auto-grouped traffic{{< /ui >}} peut vous aider à identifier la source de vos tags. Par exemple, survolez les icônes individuelles pour afficher une info-bulle qui indique l'origine du tag :

{{< img src="network_performance_monitoring/network_analytics/npm_icon_tooltip.png" alt="Survolez l'icône pour afficher la source du tag dans l'info-bulle." style="width:90%;">}}

## Graphiques récapitulatifs {#summary-graphs}

Les graphiques récapitulatifs sont une vue condensée de votre réseau, que vous pouvez modifier pour afficher le volume, le débit, les connexions ou la latence selon vos besoins. Affichez jusqu'à trois graphiques récapitulatifs à la fois et modifiez le type de données et de visualisation pour les adapter à votre organisation. Pour mettre à jour la source de données d'un graphique, cliquez sur le titre du graphique et effectuez une sélection dans le menu déroulant.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_options.png" alt="La section du graphique récapitulatif de la page Network Analytics, affichant les options disponibles pour filtrer les données : Volume envoyé, Débit envoyé, Volume reçu, Débit reçu, Connexions établies, Connexions fermées, Connexions établies / seconde, Connexions fermées / seconde et Latence TCP." style="width:80%;">}}

Pour modifier le type de visualisation, cliquez sur l'icône en forme de crayon dans le coin supérieur droit du graphique. Faites votre choix parmi les options disponibles, comme illustré dans la capture d'écran ci-dessous.

{{< img src="network_performance_monitoring/network_analytics/summary_graph_visualization_options.png" alt="Les options de visualisation du graphique récapitulatif, qui affichent les options pour ajuster le Y-Axis Scale (Linear, Log, Pow, Sqrt) et le Graph Type (Area, Line, Bars, Toplist, Change, Piechart)." style="width:60%;">}}

Pour masquer un graphique spécifique, cliquez sur l'icône {{< ui >}}hide graph{{< /ui >}} à côté de l'icône en forme de crayon. Vous pouvez afficher au minimum un graphique ou au maximum trois graphiques. Pour ajouter des graphiques, cliquez sur l'icône plus `+` sur le côté droit du graphique récapitulatif et sélectionnez le graphique à ajouter. Vous pouvez également réinitialiser les graphiques aux graphiques par défaut lors de l'ajout d'un nouveau graphique.

## Tableau {#table}

Le tableau réseau détaille les métriques de Volume, Débit, Retransmissions TCP, Temps d'aller-retour (RTT) et variance RTT entre chaque **source** et **destination** définie par votre requête.

{{< img src="network_performance_monitoring/network_analytics/network_table_3.png" alt="Tableau de données réseau affichant les colonnes de trafic et de débit regroupées automatiquement." >}}

Vous pouvez configurer les colonnes de votre tableau à l'aide de l'icône d'engrenage {{< ui >}}Customize{{< /ui >}} (⚙️) en haut à droite du tableau.

Configurez le trafic affiché avec le bouton {{< ui >}}Filter Traffic{{< /ui >}} en haut à droite de la page.

{{< img src="network_performance_monitoring/network_analytics/filter_traffic_toggle.png" alt="Détails du flux" style="width:50%;">}}

Le trafic externe (vers des adresses IP publiques) et le trafic du Datadog Agent sont affichés par défaut. Pour restreindre votre vue, vous pouvez choisir de désactiver les commutateurs {{< ui >}}Show Datadog Traffic{{< /ui >}} et {{< ui >}}Show External Traffic{{< /ui >}}.

### Trafic non résolu {#unresolved-traffic}

Les tags de client et de serveur non résolus sont marqués comme `N/A`. Un endpoint client ou serveur de trafic peut être non résolu car il manque de métadonnées identifiables, telles que des informations de source ou de destination. Cela peut se produire lorsque Datadog ne peut pas résoudre le trafic vers des entités connues telles que des équilibreurs de charge, des services cloud ou des adresses IP spécifiques au sein de l'infrastructure surveillée. En général, le trafic non résolu peut survenir pour les raisons suivantes :

* Les adresses IP client ou serveur du host ou du conteneur ne sont pas marquées avec les tags client ou serveur utilisés pour l'agrégation du trafic.
* L'endpoint se trouve en dehors de votre réseau privé et n'est donc pas marqué par le Datadog Agent.
* L'endpoint est un pare-feu, un maillage de services ou une autre entité où le Datadog Agent ne peut pas être installé.
* La destination n'a pas été marquée avec un service, ou une IP n'a été mappée à aucun service.

La surveillance du trafic non résolu est essentielle pour identifier les angles morts dans la visibilité réseau et garantir que tout le trafic pertinent est pris en compte dans l'analyse des performances et de la sécurité.

Utilisez le bouton {{< ui >}}Show N/A (Unresolved Traffic){{< /ui >}} dans le coin supérieur droit du tableau de données pour filtrer les connexions agrégées avec des clients ou des serveurs non résolus (`N/A`).

### Passer au chemin réseau {#pivot-to-network-path}

Cliquez sur le menu à trois points dans le tableau d'analyse pour passer au [chemin réseau][11] et voir les chemins entre la source et la destination spécifiés dans CNM.

{{< img src="network_performance_monitoring/network_analytics/view_network_path_3.png" alt="Cliquer sur le menu à trois points dans le tableau d'analyse pour afficher le bouton Network Path" style="width:90%;">}}

## Vues enregistrées {#saved-views}

Organisez et partagez des vues des données de trafic. Les vues enregistrées accélèrent le débogage et favorisent la collaboration. Par exemple, vous pouvez créer une vue, l'enregistrer pour vos requêtes courantes et copier son lien pour partager des données réseau avec vos collaborateurs.

- Pour enregistrer une vue : cliquez sur le bouton {{< ui >}}\+ Save{{< /ui >}} et nommez la vue pour enregistrer votre requête actuelle, la configuration du tableau et les sélections de métriques de graphique.
- Pour charger une vue : cliquez sur {{< ui >}}Views{{< /ui >}} en haut à gauche pour voir vos vues enregistrées et sélectionnez une vue dans la liste.
- Pour renommer une vue : survolez une vue dans la liste Saved Views et cliquez sur l'icône d'engrenage pour {{< ui >}}Edit name{{< /ui >}}.
- Pour partager une vue : survolez une vue dans la liste Saved Views et cliquez sur l'icône de lien pour {{< ui >}}Copy permalink{{< /ui >}}.

Pour en savoir plus, consultez la section [Vues enregistrées][5].

## Panneau latéral {#sidepanel}

Le panneau latéral fournit une télémétrie contextuelle pour vous aider à déboguer les dépendances réseau. Utilisez les onglets {{< ui >}}Flows{{< /ui >}}, {{< ui >}}Logs{{< /ui >}}, {{< ui >}}Traces{{< /ui >}} et {{< ui >}}Processes{{< /ui >}} pour déterminer si un nombre élevé de retransmissions ou une latence dans le trafic entre deux endpoints est dû à :

- Un pic de volume de trafic provenant d'un port ou d'une IP spécifique.
- Des processus lourds consommant le CPU ou la mémoire de l'endpoint de destination.
- Erreurs d'application dans le code de l'endpoint client.

{{< img src="network_performance_monitoring/network_analytics/cnm_sidepanel_2.png" alt="Panneau latéral CNM détaillant le trafic entre les services clients." style="width:90%;">}}

### Tags communs {#common-tags}

Le haut du panneau latéral affiche les tags client et serveur communs partagés par les connexions les plus récentes de la dépendance inspectée. Utilisez les tags communs pour obtenir un contexte supplémentaire sur un endpoint défectueux. Par exemple, lors du dépannage d'une communication latente vers un service particulier, les tags de destination communs font apparaître les éléments suivants :
- Contexte granulaire tel que le conteneur, la tâche ou le host vers lequel le trafic circule.
- Contexte plus large tel que la zone de disponibilité, le compte du fournisseur cloud ou le déploiement dans lequel le service s'exécute.

### Traces {#traces}

L'onglet {{< ui >}}Traces{{< /ui >}} affiche les traces APM associées au flux réseau sélectionné. Utilisez cet onglet pour passer d'un problème au niveau réseau (tel qu'une latence élevée ou un nombre élevé de retransmissions) aux traces d'application pour les services concernés.

Pour plus d'informations, consultez [APM][17].

### Security {#security}

L'onglet {{< ui >}}Security{{< /ui >}} met en évidence les menaces réseau potentielles et les résultats détectés par [Workload Protection][6] et [Cloud Security Misconfigurations][7]. Ces signaux sont générés lorsque Datadog détecte une activité réseau correspondant à une [règle de détection ou de conformité][8], ou s'il existe d'autres menaces et erreurs de configuration liées au flux réseau sélectionné.

Pour une référence complète des tags par défaut disponibles pour interroger et filtrer le trafic réseau, consultez [Tags Reference][16].

## Données réseau {#network-data}

Les métriques réseau sont affichées via les graphiques et le tableau associé. Toutes les métriques envoyées et reçues sont affichées du point de vue de la source :

* **Métriques envoyées** : mesurent la valeur de quelque chose de la _source_ vers la _destination_ du point de vue de la source.
* **Métriques reçues** : mesurent la valeur de quelque chose de la _destination_ vers la _source_ du point de vue de la source.

Les valeurs affichées peuvent être différentes pour `sent_metric(source to destination)` et `received_metric(destination to source)` s'il y a un grand nombre de pertes de paquets. Dans ce cas, si le `destination` envoie un grand nombre d'octets au `source`, les connexions agrégées qui proviennent du `destination` incluent ces octets, mais les connexions agrégées qui proviennent du `source` ne les considèrent pas comme reçus.

**Remarque :** Les données sont collectées toutes les 30 secondes, agrégées par tranches de cinq minutes et conservées pendant 14 jours.

### Métriques {#metrics}

#### Charge réseau {#network-load}

Les métriques relatives à la charge réseau suivantes sont disponibles :

| Métrique          |  Description                                                                                                                                    |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Volume**      | Le nombre d'octets envoyés ou reçus sur une période. Mesuré en octets (ou ordres de grandeur associés) de manière bidirectionnelle.                           |
| **Débit**  | Le taux d'octets envoyés ou reçus sur une période. Mesuré en octets par seconde, de manière bidirectionnelle.                                                  |

#### TCP {#tcp}

TCP est un protocole orienté connexion qui garantit la livraison des paquets dans l'ordre. 

Les métriques TCP suivantes sont disponibles : 

| Métrique | Description |
|---|---|
| **Connexions fermées** | Le nombre de connexions TCP dans un état fermé. Mesuré en connexions par seconde depuis le client. |
| **Connexions établies** | Le nombre de connexions TCP dans un état établi. Mesuré en connexions par seconde depuis le client. |
| **Host inaccessible** | Indique quand le host cible est hors ligne ou que le trafic est bloqué par des routeurs ou des pare-feu. Disponible dans **Agent 7.68+**. |
| **Réseau inaccessible** | Indique des problèmes de réseau locaux sur la machine du host du Datadog Agent. Disponible dans **Agent 7.68+**. |
| **Annulations de connexion** | Suit les annulations de connexion TCP et les délais d'attente de connexion dans l'espace utilisateur dans les environnements d'exécution de langage tels que `Go` et `Node.js`. Disponible dans **Agent 7.70+**. |
| **Gigue TCP** | Mesurée comme la variance du temps d'aller-retour lissé TCP. |
| **Latence TCP** | Mesurée comme le temps d'aller-retour lissé TCP, c'est-à-dire le temps entre l'envoi d'une trame TCP et son accusé de réception. |
| **Refus TCP**  | Le nombre de connexions TCP qui ont été refusées par le serveur. Généralement, cela indique une tentative de connexion à une IP/un port qui ne reçoit pas de connexions, ou une mauvaise configuration du pare-feu/de la sécurité. |
| **Réinitialisations TCP**  | Le nombre de connexions TCP qui ont été réinitialisées par le serveur.  |
| **Retransmissions TCP** | Les retransmissions TCP représentent les échecs détectés qui sont retransmis pour garantir la livraison. Mesuré en nombre de retransmissions depuis le client. |
| **Délais d'attente TCP**  | Le nombre de connexions TCP qui ont expiré du point de vue du système d'exploitation. Cela peut indiquer des problèmes généraux de connectivité et de latence.  |

Toutes les métriques sont mesurées depuis le côté `client` de la connexion lorsque cela est possible, sinon depuis le côté serveur.

## Détection automatique des services cloud {#cloud-service-autodetection}

Si vous utilisez des services cloud gérés comme S3 ou Kinesis, vous pouvez surveiller les performances du trafic vers ces services depuis vos applications internes. Délimitez votre vue à une dépendance AWS, Google Cloud ou Azure particulière pour identifier la latence, évaluer les performances de la base de données et visualiser votre réseau de manière plus complète.

{{< img src="network_performance_monitoring/network_analytics/cloud_service.png" alt="Panneau latéral d'une connexion réseau, délimité par `server_service:aws.s3`" >}}

Par exemple, vous pouvez :

- Visualiser le flux de données de votre cluster Kubernetes interne vers `server_service:aws.s3` dans la [Network Map][2].
- Passez à la [ Page Réseau](#table) pour isoler les pods qui établissent le plus grand nombre de connexions vers ce service, et
- Validez que leur requête aboutit en analysant les métriques de performance S3, qui sont corrélées aux performances du trafic directement dans le panneau latéral pour une dépendance donnée, sous l'onglet *Métriques d'intégration*.

CNM mappe automatiquement :

- Appels réseau vers S3 (qui peuvent être ventilés par `s3_bucket`), RDS (qui peuvent être ventilés par `rds_instance_type`), Kinesis, ELB, Elasticache et d'autres [services AWS][3].
- Appels API vers AppEngine, Google DNS, Gmail et d'autres [services Google Cloud][4].

Pour surveiller d'autres endpoints où un Agent ne peut pas être installé (tels que des API publiques), regroupez la destination par le tag [`domain` ](#domain-resolution). Ou consultez la section ci-dessous pour la résolution des services cloud.

### Résolution améliorée des services cloud {#cloud-service-enhanced-resolution}

Avec la [résolution améliorée configurée][9] pour AWS ou Azure, CNM filtre et regroupe le trafic réseau en utilisant les ressources collectées auprès de ces fournisseurs cloud. Les tags disponibles varient selon le fournisseur cloud et la ressource. Datadog applique automatiquement les tags listés ci-dessous en plus de tous les tags définis par l'utilisateur.

#### Amazon Web Services {#amazon-web-services}

{{< tabs >}}
{{% tab "Équilibreurs de charge" %}}
- nom
- équilibreur de charge
- load_balancer_arn
- dns_name (format équilibreur de charge/dns :)
- région
- id_compte
- schéma
- tags personnalisés (définis par l'utilisateur) appliqués aux équilibreurs de charge AWS
{{% /tab %}}

{{% tab "Passerelles NAT" %}}
- gateway_id
- type_de_passerelle
- id_passerelle_nat_aws
- ip_publique_passerelle_nat_aws
- compte_aws
- zone_de_disponibilité
- région
- tags personnalisés (utilisateur) appliquées aux passerelles NAT AWS
{{% /tab %}}

{{% tab "Passerelle Internet VPC" %}}
- gateway_id
- type_de_passerelle
- id_passerelle_internet_aws
- compte_aws
- région
- tags personnalisés (utilisateur) appliquées aux passerelles Internet VPC
{{% /tab %}}

{{% tab "Endpoint VPC" %}}
- gateway_id
- type_de_passerelle
- aws_vpc_endpoint_id
- tags personnalisés (utilisateur) appliquées aux endpoints Internet VPC
{{% /tab %}}

{{< /tabs >}}

#### Azure {#azure}

{{< tabs >}}
{{% tab "Équilibreurs de charge et passerelles d'application" %}}
- nom
- équilibreur de charge
- fournisseur_cloud
- région
- type
- groupe_de_ressources
- nom_du_locataire
- nom_de_l_abonnement
- id_de_l_abonnement
- nom_de_la_sku
- tags personnalisés (définis par l'utilisateur) appliquées aux équilibreurs de charge Azure et aux passerelles d'application
{{% /tab %}}
{{< /tabs >}}

## Résolution de domaine {#domain-resolution}

À partir de l'Agent 7.17+, l'Agent résout les adresses IP en noms de domaine lisibles par l'homme pour le trafic externe et interne. Le domaine vous permet de surveiller les endpoints des fournisseurs cloud où un Datadog Agent ne peut pas être installé, tels que les compartiments S3, les équilibreurs de charge d'application et les API. Les noms de domaine non reconnaissables tels que les domaines DGA provenant de serveurs C&C peuvent indiquer des menaces de sécurité réseau. `domain` **est encodé en tant que tag dans Datadog**, vous pouvez donc l'utiliser dans les requêtes de la barre de recherche et dans le panneau des facettes pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/domain_aggregation_2.png" alt="Agrégation de domaines" >}}

**Remarque** : la résolution DNS est prise en charge pour les hosts sur lesquels la sonde système s'exécute dans l'espace de noms réseau racine, ce qui est généralement dû à l'exécution de la sonde système dans un conteneur sans utiliser le réseau du host.

## Traduction d'adresses réseau (NAT) {#network-address-translation-nat}

Le NAT est un outil utilisé par Kubernetes et d'autres systèmes pour acheminer le trafic entre les conteneurs. Lors de l'examen d'une dépendance spécifique (par exemple, service à service), vous pouvez utiliser la présence ou l'absence d'adresses IP pré-NAT pour distinguer les services natifs Kubernetes, qui effectuent leur propre routage, des services qui s'appuient sur des clients externes pour le routage. Cette fonctionnalité n'inclut pas la résolution des passerelles NAT.

Pour afficher les adresses IP pré-NAT et post-NAT, utilisez le bouton {{< ui >}}Show pre-NAT IPs{{< /ui >}} dans les paramètres du tableau. Lorsque ce paramètre est désactivé, les IP affichées dans les colonnes {{< ui >}}Client IP{{< /ui >}} et {{< ui >}}Server IP{{< /ui >}} sont par défaut des IP post-NAT. Dans les cas où vous avez plusieurs adresses IP pré-NAT pour une adresse IP post-NAT, les 5 adresses IP pré-NAT les plus fréquentes sont affichées. `pre_nat.ip` est un tag comme tout autre dans le produit, il est donc possible de l'utiliser pour agréger et filtrer le trafic.

{{< img src="network_performance_monitoring/network_analytics/prenat_ip2.png" alt="Adresses IP pré-NAT" >}}

## ID de réseau {#network-id}

Les utilisateurs de CNM peuvent configurer leurs réseaux pour avoir des espaces d'adresses IP qui se chevauchent. Par exemple, vous pouvez souhaiter déployer dans plusieurs VPC (clouds privés virtuels) qui ont des plages d'adresses IP qui se chevauchent et qui communiquent uniquement via des équilibreurs de charge ou des passerelles cloud.

Pour classer correctement les destinations du trafic, CNM utilise le concept d'ID de réseau, qui est représenté comme un tag. Un ID de réseau est un identifiant alphanumérique pour un ensemble d'adresses IP qui peuvent communiquer entre elles. Lorsqu'une adresse IP est associée à plusieurs hosts ayant des ID de réseau différents, cet identifiant est utilisé pour déterminer le host précis vers lequel le trafic réseau est envoyé ou dont il provient.

Dans AWS et Google Cloud, l'ID de réseau est automatiquement défini sur l'ID du VPC. Pour d'autres environnements, l'ID de réseau peut être défini manuellement, soit dans `datadog.yaml` comme indiqué ci-dessous, soit en ajoutant le `DD_NETWORK_ID` aux conteneurs de processus et de l'Agent principal.

```yaml
network:
   Id: <your-network-id>
```


## Pour aller plus loin {#further-reading}

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
[18]: /fr/mcp_server/tools/#analyze_cloud_network_monitoring