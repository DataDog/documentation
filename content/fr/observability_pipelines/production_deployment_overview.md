---
kind: Documentation
title: Principes et méthodologie de déploiement
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">La fonctionnalité Pipelines d'observabilité n'est pas disponible pour le site Datadog US1-FED.</div>
{{< /site-region >}}

## Présentation

Dans le cadre du déploiement du worker des pipelines d'observabilité au sein de votre infrastructure, il se peut que vous vous posiez un certain nombre de questions, par exemple :

- À quel endroit du réseau le worker des pipelines d'observabilité doit-il être déployé ?
- Comment les données doivent-elles être recueillies ?
- Où les données doivent-elles être traitées ?

Ce guide aborde les différents éléments qui interviennent dans la conception de l'architecture de votre worker de pipelines d'observabilité, et plus particulièrement les points suivants :

- [Réseau](#reseau)
- [Collecte de données](#collecte-de-donnees)
- [Traitement des données](#traitement-des-donnees)
- [Mise en mémoire tampon des données](#mise-en-memoire-tampon-des-donnees)
- [Acheminement des données](#acheminement-des-donnees)

## Réseau

Dans le cadre de la conception du déploiement de votre worker de pipelines d'observabilité, la première étape consiste à comprendre la place occupée par le worker des pipelines d'observabilité au sein de votre réseau et l'endroit où le déployer.

### Respecter les limites du réseau

Étant donné que le worker des pipelines d'observabilité est déployé en tant qu'agrégateur, il convient de le déployer à l'intérieur des limites du réseau pour limiter les coûts liés au trafic de sortie. Les données réceptionnées par le worker des pipelines d'observabilité ne doivent jamais être transférées par le biais du réseau Internet public. Par souci de facilité, Datadog recommande donc de commencer par un agrégateur par région.

### Utiliser des pare-feu et des proxies

Si vous utilisez des pare-feu, limitez les communications de l'Agent à vos agrégateurs et les communications de l'agrégateur à vos sources et récepteurs configurés.

Si vous préférez utiliser un proxy HTTP, le worker des pipelines d'observabilité offre une option de proxy global permettant d'acheminer l'intégralité du trafic HTTP du worker de pipelines d'observabilité via un proxy.

### Utiliser la découverte du DNS et de services

Utilisez la découverte du DNS ou de services pour détecter les agrégateurs et services de votre worker de pipelines d'observabilité. Cette stratégie facilite l'acheminement ainsi que l'équilibrage de charge de votre trafic ; il s'agit également de la stratégie employée par vos agents et répartiteurs de charge pour découvrir vos agrégateurs. Pour séparer clairement les problèmes, le worker des pipelines d'observabilité ne résout pas les requêtes DNS lui-même, mais délègue cette tâche à un résolveur au niveau du système ([résolution de requêtes Linux][1]), par exemple).

{{< img src="observability_pipelines/production_deployment_overview/dns_service_discovery.png" alt="Un diagramme présentant une région cloud avec un cluster d'agents, un cluster de répartiteurs de charge et plusieurs workers de pipelines d'observabilité ; chaque groupe envoie des requêtes distinctes au registre DNS ou au registre de service" style="width:60%;" >}}

### Choix des protocoles

Lors de l'envoi de données au worker des pipelines d'observabilité, Datadog recommande de choisir un protocole facilitant l'équilibrage de charge et permettant d'obtenir une confirmation de réception au niveau de l'application. Nous recommandons de privilégier les protocoles HTTP et gRPC étant donné qu'ils sont couramment utilisés et que de nombreux outils et documents sont disponibles pour gérer efficacement les services utilisant le protocole HTTP/gRPC.

Choisissez la source qui correspond à votre protocole. Chaque source du worker de pipelines d'observabilité implémente des protocoles distincts. Par exemple, les sources et récepteurs du worker de pipelines d'observabilité se servent du protocole gRPC pour les communications du worker de pipelines d'inter-observabilité, tandis que la source HTTPS vous permet de recevoir des données via HTTPS. Consultez la section [Sources][2] pour découvrir leurs protocoles respectifs.

## Collecte de données

Votre pipeline démarre par la collecte de données. Vos services et systèmes génèrent des données[*](#prise-en-charge) qui peuvent être recueillies et envoyées en aval vers vos destinations. Les données sont recueillies au moyen d'agents, et il est primordial de comprendre lequel utiliser pour bien recueillir les données qui vous intéressent.

### Choix des agents

Vous devez choisir l'agent qui aidera votre équipe d'ingénieurs à surveiller leurs systèmes de façon optimale. Aussi, intégrez le worker des pipelines d'observabilité à l'agent le plus adéquat selon la tâche à accomplir, et déployez le worker des pipelines d'observabilité sur des nœuds distincts en tant qu'agrégateur.

Par exemple, la solution [Network Performance Monitoring][4] de Datadog intègre à l'Agent Datadog des systèmes propres au fournisseur et produit des données uniques pour ce dernier. L'Agent Datadog doit donc recueillir et envoyer directement les données à Datadog, puisque ce type de données n'est pas pris en charge dans le worker des pipelines d'observabilité.

Autre exemple :  l'Agent Datadog recueille des métriques de service et les enrichit avec des tags Datadog propres au fournisseur. Dans ce cas précis, l'Agent Datadog doit envoyer les métriques directement à Datadog ou les acheminer via le worker des pipelines d'observabilité. Ce dernier ne doit pas remplacer l'Agent Datadog, car les données produites sont enrichies avec des éléments propres au fournisseur.

Lorsque vous intégrez des éléments à un agent, configurez le worker des pipelines d'observabilité afin qu'il reçoive les données directement à partir de l'agent par le biais du réseau local, en acheminant les données via le worker des pipelines d'observabilité. Utilisez des composants source comme `datadog_agent` ou `open_telemetry` pour recevoir les données de vos agents.

##### Limiter les risques liés à un agent

Lorsque vous intégrez des éléments à un agent, configurez-le de façon à ce qu'il fasse office de simple forwarder de données et acheminez les types de données pris en charge par le biais du worker des pipelines d'observabilité. En procédant de la sorte, vous réduisez les risques de perte de données et d'interruption de service en limitant les responsabilités de l'agent.

## Traitement des données

Pour concevoir un pipeline efficace entre les sources et les récepteurs de votre worker de pipelines d'observabilité, vous devez notamment apprendre à identifier les types de données à traiter et l'endroit où les traiter.

### Choix des données à traiter

Vous pouvez utiliser le worker des pipelines d'observabilité pour traiter vos données[*](#prise-en-charge). Toutefois, les données en temps réel propres au fournisseur, telles que les données de profiling en continu, ne sont pas interopérables et leur traitement ne vous est généralement d'aucune utilité.

#### Traitement à distance

Pour le traitement à distance, le worker des pipelines d'observabilité peut être déployé sur des nœuds distincts en tant qu'agrégateur.

{{< img src="observability_pipelines/production_deployment_overview/aggregator_role.png" alt="Un diagramme présentant un agrégateur du worker de pipelines d'observabilité comportant plusieurs workers qui reçoivent des données du répartiteur d'équilibre du réseau et qui en envoient à différents récepteurs" style="width:100%;" >}}

Le traitement des données ne passe plus par vos nœuds, mais par ceux de l'agrégateur distant. Le traitement à distance est recommandé pour les environnements à haute disponibilité et hautement robustes (autrement dit, la plupart des environnements). En outre, la configuration se veut simplifiée, puisque la restructuration de l'infrastructure indispensable en cas d'ajout d'un agent n'est pas requise avec le traitement à distance.

Consultez la section [Architecture de l'agrégateur][5] pour en savoir plus.

## Mise en mémoire tampon des données

L'efficacité de votre pipeline dépend également de l'endroit où vous mettez vos données en mémoire tampon et de la méthode utilisée.

### Choisir l'endroit où mettre les données en mémoire tampon

Les données doivent être mises en mémoire tampon juste avant d'atteindre vos destinations, et chaque destination doit posséder son propre buffer isolé afin de profiter des avantages suivants :

1. Chaque destination peut configurer son buffer afin qu'il respecte les conditions du récepteur. Consultez la section [Choisir comment mettre les données en mémoire tampon](#choisir-comment-mettre-les-donnees-en-memoire-tampon) 
2. Isoler les buffers pour chaque destination permet d'éviter qu'une destination défectueuse interrompe l'ensemble du pipeline jusqu'à ce que le buffer atteigne la capacité configurée.

Ce sont les raisons pour lesquelles le worker des pipelines d'observabilité associe les buffers à ses récepteurs.

{{< img src="observability_pipelines/production_deployment_overview/where_to_buffer.png" alt="Un diagramme présentant l'agent dans un nœud envoyant des données à un worker des pipelines d'observabilité avec un buffer dans un nœud distinct" style="width:50%;" >}}

### Choisir la manière de mettre les données en mémoire tampon

Les buffers intégrés au worker des pipelines d'observabilité facilitent les opérations en éliminant la nécessité d'avoir recours à des buffers externes complexes.

Au moment de choisir un type de buffer intégré au worker des pipelines d'observabilité, sélectionnez celui qui est le plus adapté en fonction de la nature de la destination. Par exemple, votre système d'enregistrement doit utiliser des buffers de disque afin de garantir une grande durabilité. Votre système d'analyse doit, quant à lui, utiliser des buffers de mémoire pour garantir une faible latence. Par ailleurs, tout excès de données dans un type de buffer peut être transféré vers l'autre type de buffer, ce qui évite de propager la pression à vos clients.

{{< img src="observability_pipelines/production_deployment_overview/how_to_buffer.png" alt="Un diagramme présentant les sources d'un worker de pipelines d'observabilité envoyant des données aux buffers de disque et de mémoire situés à proximité des récepteurs" style="width:100%;" >}}

## Acheminement des données

L'acheminement des données, qui permet à vos agrégateurs d'envoyer les données à la destination adéquate, constitue la dernière étape de la conception de votre pipeline. Utilisez les agrégateurs pour acheminer de manière flexible les données vers le meilleur système, selon les besoins de vos équipes.

### Séparer les systèmes d'enregistrement et d'analyse

Séparez votre système d'enregistrement de votre système d'analyse afin d'optimiser les coûts sans effectuer de compromis susceptibles de nuire à leur fonctionnement. Par exemple, votre système d'enregistrement est capable de regrouper de grandes quantités de données au fil du temps et de les compresser afin de limiter les coûts tout en garantissant une grande durabilité pour l'ensemble des données. Votre système d'analyse, quant à lui, peut échantillonner et nettoyer des données pour réduire les coûts tout en maintenant une faible latence pour les analyses en temps réel.

{{< img src="observability_pipelines/production_deployment_overview/separating_concerns.png" alt="Un diagramme présentant les sources d'un worker de pipelines d'observabilité envoyant des données au buffer de disque, qui transmet ensuite ces données pour qu'elles soient archivées ou les envoie à un disque de stockage en bloc pour qu'elles soient échantillonnées" style="width:100%;" >}}

### Acheminer les données vers vos systèmes d'enregistrement (archivage)

Suivez ces étapes pour renforcer la durabilité de votre système d'enregistrement tout en limitant les coûts :

- Écrivez uniquement sur votre archive à partir du rôle d'agrégateur pour limiter les pertes de données dues au redémarrage du nœud et aux échecs de logiciels.
- Placez un buffer de disque avant le récepteur.
- Activez les confirmations de bout en bout sur toutes les sources.
- Définissez `batch.max_bytes` sur ≥ 5 MiB, `batch.timeout_secs` sur ≥ 5 minutes, puis activez la compression (paramètres par défaut pour l'archivage de récepteurs, comme le récepteur `aws_s3`).
- Archivez des données brutes non traitées afin de pouvoir les relire et de limiter les risques de corruption accidentelle des données pendant leur traitement.

### Acheminer les données vers votre système d'analyse

Suivez ces étapes pour optimiser les analyses de votre système d'analyse tout en limitant les coûts :

- Placez un buffer de mémoire avant le récepteur.
- Définissez `batch.timeout_sec` sur ≤ 5 secondes (paramètre par défaut pour les récepteurs analytiques, tels que `datadog_logs`).
- Utilisez le transform `remap` pour supprimer les attributs non utilisés dans le cadre de l'analyse.
- Filtrez les événements non utilisés dans le cadre de l'analyse.
- Envisagez d'échantillonner les logs en définissant le paramètre `level` sur `info` ou un niveau inférieur pour réduire leur volume.

[1]: https://wiki.archlinux.org/title/Domain_name_resolution
[2]: /fr/observability_pipelines/reference/sources/
[4]: /fr/network_monitoring/performance/
[5]: /fr/observability_pipelines/architecture/

---

<a name="support"></a> * Les pipelines d'observabilité prennent en charge les logs. La prise en charge des métriques est en version bêta.