---
description: Planifiez votre installation de Datadog pour garantir son efficacité.
further_reading:
- link: /getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Débuter avec le tagging de service unifié
- link: /getting_started/tracing/
  tag: Documentation
  text: Débuter avec le tracing APM
title: Planifier votre installation de Datadog
---

## Section Overview

Lorsque vous planifiez une nouvelle installation logicielle, il est essentiel de comprendre ses capacités, ses objectifs, ses délais, les équipes impliquées et les modèles d'architecture. Pendant la phase de planification, apprenez les bases de Datadog, définissez vos objectifs les plus importants, familiarisez-vous avec les bonnes pratiques, et identifiez les leviers d'optimisation de votre installation Datadog.

## Conception

### Exercice de cadrage

Il est important de fixer un objectif clair pour l'installation de Datadog. En pratique, toutefois, il est rare de pouvoir anticiper tous les besoins dès le départ. Les équipes produit déploient leurs services de manière itérative, et les équipes opérationnelles encadrent les changements pour limiter les risques. Pour réussir une installation Datadog à grande échelle, il est donc recommandé d’appliquer les principes classiques de gestion de projet. Certains éléments spécifiques à Datadog doivent être pris en compte dans ce processus. 

**Recommandations :**   
Commencez à collecter et à consolider un inventaire de votre organisation dès le départ. Créez une vue d'ensemble complète de vos écosystèmes, langages d’application, solutions de stockage des données, réseau et infrastructure.

Un exemple de formulaire d'inventaire pourrait ressembler à ceci :

```
Application name:  
  Language:  
     Frameworks:  
  Model layer:  
  View layer: 
  Controller layer:  
  Infra type:  
  Operating systems:
```

## Bonnes pratiques générales

Réalisez l'exercice de cadrage pour comprendre les types de technologies que vous utilisez, puis commencez à les associer aux produits principaux de Datadog.

### Tagging des ressources

Datadog est un outil conçu pour mettre en corrélation les données machine avec les applications en cours d'exécution et leurs descripteurs physiques. Il permet d'effectuer des recoupements entre différentes données, quels que soient leurs types. Le nom d'host, les régions cloud, la version du système d’exploitation ou encore l'adresse IP font partie des attributs de ressource appliqués automatiquement. En complément, Datadog vous permet de générer des tags personnalisés comme `cost-code`, `AppName`, `environment` et `version`.

La force de Datadog réside dans sa capacité à maintenir et gérer un vocabulaire unifié, avec des fonctionnalités de données intégrées. Le [tagging de service unifié][1] s''appuie sur des tags réservés qui permettent la corrélation des données de télémétrie dans l'ensemble des fonctionnalités de la plateforme Datadog.

Les tags peuvent prendre la forme de paires `key:value` ou de valeurs simples. Ils permettent d'enrichir les données de performance applicative et les métriques d'infrastructure avec des dimensions supplémentaires. Avant de commencer à superviser votre environnement avec Datadog, exploitez les fonctionnalités de tagging intégrées à vos plateformes : Datadog récupère automatiquement ces tags via ses intégrations. Le tableau ci-dessous montre comment fonctionnent les paires `key:value` et indique si chaque tag est ajouté automatiquement ou manuellement.

| TAG                  | KEY            | VALUE         |  METHOD     |
|----------------------|----------------|---------------| ---------------|
| env:staging     | env            | staging  | automatic
| component_type:database | component_type | database      | manual
| region:us-west-1 | region | us-west-1      | automatic


Le guide [Débuter avec le tagging][2] constitue une excellente introduction à ce sujet. Voici quelques éléments supplémentaires à retenir :

- Un service est défini comme une application unique, déployable indépendamment.
- Les valeurs de tags doivent être cohérentes. Par exemple, « Production » est différent de « Prod ».
- Définissez des sources de vérité pour les tags dynamiques, comme la version du code.

**Recommandations :**  

- Dès que possible, familiarisez-vous avec le [tagging de service unifié][2] de Datadog et élaborez votre stratégie de tagging.
- Alignez votre infrastructure sur les tags collectés et automatisez le processus de tagging autant que possible (par exemple, utilisez les valeurs de hash Git issues des pipelines CI comme tags de version via des labels Kubernetes). Cela permet d'unifier vos données, de créer des alertes plus pertinentes en associant des [propriétaires aux services][72], et de naviguer facilement entre les métriques, les logs et les traces d'un service à l'autre.

Le schéma suivant montre à quoi peuvent ressembler les trois tags réservés dans un environnement en cours de configuration :

{{< img src="/administrators_guide/unified_service_tagging_diagram.png" alt="Diagramme du tagging de service unifié avec les 3 tags réservés : Service, Env, Version" style="width:90%;">}}

### Contrôle d'accès

Au niveau de l'architecture, il existe deux grands axes de contrôle d'accès dans Datadog : la structure organisationnelle, et le [contrôle d’accès basé sur les rôles (RBAC)][4].

#### RBAC

Le contrôle d'accès basé sur les rôles dans Datadog peut être connecté à votre système d'authentification SAML existant. Vous pouvez définir des mappages de groupes SAML en vous appuyant sur les rôles par défaut de Datadog et sur les objets d'équipe. Trois rôles sont fournis par défaut, et peuvent être adaptés pour refléter la structure de vos rôles AD/LDAP. Il est également possible de créer des [comptes de service][6] dédiés aux usages non interactifs, comme l'attribution des [clés d'API et d'applications][7], afin de distinguer les actions système des activités utilisateur. Des autorisations fines permettent ensuite de configurer les niveaux d'accès et de protection selon vos besoins.

La fonctionnalité [Teams][8] permet également de créer des groupes souples, informels ou temporaires, que les utilisateurs peuvent rejoindre ou auxquels ils peuvent être ajoutés. Elle est accessible dans l'ensemble des produits Datadog.

#### Structure multi‑organisationnelle

Les grandes entreprises qui utilisent Datadog ont souvent besoin de gérer plusieurs installations distinctes. C'est notamment le cas des fournisseurs de services managés, qui doivent assurer une stricte séparation des données entre leurs clients. Parfois, cette isolation est également requise au sein d'une même entreprise. Pour répondre à ce type de configuration, Datadog prend en charge la gestion de [plusieurs comptes d'organisation][5]. Il est ainsi possible de suivre la consommation globale au niveau du compte parent, tout en maintenant une séparation technique complète entre les différentes entités. La gestion des organisations enfants s'effectue depuis un compte parent unique.

**Recommandations :**

- Élaborez un plan clair pour la gestion des rôles utilisateurs dans Datadog.    
- Utilisez des comptes de service pour l'administration des clés d'API.
- Exploitez les équipes pour regrouper des ressources comme les dashboards, les services, les monitors ou les incidents.

## Bonnes pratiques liées aux produits

### APM

La solution APM de Datadog s'appuie sur le tagging de service unifié, qui constitue un élément clé de l'expérience opérationnelle. Ces tags facilitent la corrélation entre les différentes sources de données de télémétrie. C'est grâce à ce mécanisme que Datadog peut, par exemple, déterminer automatiquement le propriétaire d'un processus Java détecté dynamiquement.  
Dans la plupart des cas, la configuration par défaut d'APM suffit. Cependant, si vous souhaitez par exemple modifier les taux d'échantillonnage ou ajuster d'autres paramètres APM, vous pouvez suivre les recommandations ci-dessous.   

**Recommandations :** 
- Identifiez les services à instrumenter et précisez leur type : sur host, en conteneur ou serverless.
- Sélectionnez la méthode d'instrumentation la plus appropriée selon le langage utilisé ou le contexte d'exécution ; cela peut aller d'une configuration rapide à une [instrumentation manuelle][75].
- Référez-vous à la documentation sur les [contrôles d'ingestion][9].  
- Utilisez [la configuration à distance][10] pour ajuster dynamiquement le taux d'échantillonnage des traces selon vos besoins, sans redémarrer l'Agent. Pour aller plus loin, consultez les [cas d'usage du taux d'échantillonnage][11].  
- Vérifiez que le [tagging de service unifié][12] est correctement appliqué, et revoyez la [sémantique des tags de span][13].
- Activez les [dépendances de services déduites][51] pour que Datadog puisse identifier automatiquement les noms de service à partir des attributs de span.

### Log Management

Les fonctionnalités de Log Management permettent à vos équipes de diagnostiquer et résoudre rapidement les problèmes d'infrastructure. Avec [Logging without LimitsTM][14], vous avez la possibilité de définir des règles de collecte de logs flexibles et d'en extraire des données exploitables sous forme de métriques custom. Vous pouvez également recevoir des alertes sur des erreurs critiques présentes dans les logs, sans avoir besoin de les indexer (c'est-à-dire de les stocker).

{{< img src="/administrators_guide/logging_without_limits.png" alt="Diagramme Logging without Limits" style="width:90%;">}}

L'architecture d'indexation des logs dans Datadog repose sur un système distribué, orienté colonnes et optimisé pour les requêtes à fort volume et les agrégations complexes. Pour en savoir plus sur cette architecture, consultez les articles de [découverte de Husky][47] et [de présentation détaillée de Husky][48].

La plateforme prend en charge plusieurs couches de stockage des logs, chacune adaptée à des besoins spécifiques, comme décrit ci-dessous :

|  | Données capturées | Rétention | Récupération dans Datadog | Facteur de coût |
| :---- | :---- | :---- | :---- | :---- |
| Ignoré | Non | Aucune | Aucune | N/A |
| [Ingestion][15] | Logs-to-metrics | 15 min dans LiveTail | Aucune | Volume |
| [Archive][16] | À la réhydratation | Illimitée | Lente | Volume |
| [Transfert de logs][17] | Logs-to-metrics | Dépend de la cible | Aucune | Volume |
| [Index][18] | Oui | 3, 7, 15, 30 jours | Immédiate | Volume et nombre de messages |
| [Flex Logs][19] | Oui\* | [Niveaux de stockage][74] | Rapide | Volume de récupération |

\* Flex Logs ne prend pas en charge les monitors, alertes ni Watchdog. Cependant, vous pouvez appliquer un log-to-metrics sur le flux d'ingestion avant l'indexation (standard ou flex) et utiliser les métriques générées dans les monitors. La corrélation avec d'autres données de télémétrie, telles que les traces, reste possible.

Voici quelques cas d'usage courants d'ingestion et de surveillance des logs pris en charge par ces fonctionnalités de base :

Normalisation du format de logs  
: Contrôle centralisé de la date, des valeurs et des références via des tables de correspondance.

Gestion des données sensibles et des données personnelles (PII)
: Les données personnelles (PII) et les données sensibles sont filtrées en priorité par le scanner Sensitive Data Scanner (SDS).

Routage et transfert
: Une interface centralisée pour envoyer les logs vers un index, une archive ou une destination de transfert.

Exploitation optimisée 
: Définition souple des champs de logs et réduction des volumes à faible valeur.

Archivage global des logs 
: Archivage de tous les logs par défaut.  

SIEM global 
: Analyse de sécurité automatique de tous les logs dès leur ingestion.

**Recommandations :**  
- Choisissez la méthode de transfert de vos logs vers Datadog : soit en les envoyant directement vers les endpoints d'ingestion de logs de Datadog, soit via des outils comme Fluentbit, Syslog ou Logstash. 
- Affinez votre stratégie d'ingestion des logs et consultez les bonnes pratiques en matière de gestion des logs.
- Comprenez le fonctionnement de [Logging without Limits][14]TM : identifiez les services qui génèrent le plus de logs, analysez les schémas de logs à fort volume et configurez des filtres d'exclusion sur les modèles de logs non pertinents. 
- Configurez vos [archives de logs][16].

### Real User Monitoring

Real User Monitoring (RUM) et Session Replay permettent d'observer en détail l'expérience vécue par les utilisateurs finaux de vos applications ou services. Installez RUM sur les applications contenant des sessions à forte valeur afin de tirer parti des données collectées pour orienter vos optimisations. Session Replay génère une reconstitution visuelle fidèle des interactions utilisateur, particulièrement utile pour analyser les problèmes signalés. Vous obtenez ainsi une vue précise de l'expérience client réelle, un atout essentiel en environnement de production.    

**Recommandations :** 

- Identifiez les sites web, écrans d'applications mobiles, actions utilisateur et éléments de code frontend essentiels à votre activité.
- Déployez RUM et Session Replay en production et dans les environnements proches de la production.
- [Mettez de côté les erreurs front-end][21].  
- Configurez le [taux d'échantillonnage RUM][22]. 

### Surveillance Synthetic

Synthetic Monitoring est une solution complète de tests synthétiques qui couvre les applications web, les applications mobiles et les API. Les résultats obtenus peuvent être corrélés au comportement de l'application, puis analysés dans le contexte des bases de données, files de messages et services en aval.  

**Recommandations :**

- Identifiez les endpoints d'API et parcours utilisateurs les plus stratégiques pour votre activité, et testez-les régulièrement.
- Élaborez une feuille de route des transactions métier à tester.
- Utilisez Synthetic Monitoring conjointement avec [APM et RUM][49].
- Consultez les [éléments à prendre en compte concernant la consommation de Synthetic Monitoring][23].
- Réduisez la maintenance des tests grâce aux [sous-tests][24].
- Choisissez avec soin les emplacements de test : privilégiez ceux qui reflètent la localisation réelle de vos utilisateurs.     
- Utilisez les checks [HTTP][25] ou [TCP][50] pour surveiller l'expiration de certificats SSL ou vérifier la disponibilité de base.  

## Intégrations

Datadog propose plus de {{< translate key="integration_count" >}} intégrations pour centraliser l'ensemble des métriques et des logs de votre infrastructure, et ainsi bénéficier d'une observabilité complète. Ces intégrations, qu'elles soient basées sur un service SaaS ou sur l'Agent, collectent des métriques exploitables dans Datadog. Les intégrations basées sur un host sont configurées via des fichiers YAML situés dans le répertoire `conf.d`, tandis que les intégrations en conteneur utilisent des métadonnées comme les annotations ou les labels. 

Il existe différents types d'intégrations dans Datadog. L'ordre dans lequel elles sont présentées ici correspond à la priorité d'installation recommandée par Datadog.

| Catégorie                                      | Rôle                                                                                                                                                                                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Technologies cloud ([AWS][52], [Google Cloud][53], [Azure][54])  | Ces intégrations utilisent des identifiants provisionnés pour interroger les endpoints de monitoring et collecter des métriques. Affinez leur configuration afin de limiter l'ingestion aux données de télémétrie réellement utiles.                                                                                                  |
| Gestion des incidents ([Slack][55], [Jira][56], [PagerDuty][57])     | Ces intégrations envoient des notifications lors d'événements, et sont essentielles pour mettre en place un système d'alerte efficace.                                                                                                                          |
| Infrastructure ([orchestration][58], [systèmes d'exploitation][59], [réseau][60]) | Ces intégrations constituent la base du monitoring de votre infrastructure. Elles collectent à la fois des métriques et des logs.                                                                                                               |
| Couches de données ([systèmes de données][61], [files de messages][62])      | Ces intégrations interrogent généralement les tables internes de métriques des bases de données, ce qui nécessite souvent qu'un administrateur de base de données configure les accès pour l'Agent.                                                                                              |
| Développement ([automatisation][63], [langages][64], [gestion de code][65]) | Ces intégrations envoient des métriques vers Datadog et nécessitent une configuration côté émetteur. Certaines peuvent requérir DogStatsD pour transmettre les métriques.                                                                                                               |
| Sécurité et conformité ([Okta][66], [Open Policy Agent][67])   | Ces intégrations permettent de vérifier la conformité de votre système avec vos exigences en matière de sécurité.                                                                                                     |

**Recommandations** :

- Commencez à collecter des métriques sur vos projets dès les premières étapes du développement.
- Les Agents installés intègrent automatiquement des intégrations système et NTP, et peuvent détecter automatiquement les technologies prises en charge sur le host. ([Live processes](#live-processes) doit être activé pour bénéficier de cette fonctionnalité) 
- Vous pouvez choisir librement les services à superviser dans la liste ci-dessus. Si certains services que vous souhaitez surveiller ne disposent pas d'intégration dédiée, explorez les options suivantes : [Live processes](#live-processes), [Universal Service Monitoring][68], une [intégration de processus][69] ou un [check personnalisé][70].  

## Ressources supplémentaires

Vous avez franchi des étapes clés et mis en œuvre les bonnes pratiques avec APM, RUM, Synthetic Monitoring et Log Management. Voici d'autres ressources utiles à prendre en compte lors de la phase de planification de votre installation.

### Live processes 

Utilisez [Live processes][26] pour consulter en un seul endroit tous les processus en cours d'exécution. Par exemple, vous pouvez accéder aux informations au niveau PID d'un processus Apache actif, ce qui facilite l'analyse et la résolution de problèmes transitoires. Vous pouvez également rechercher des processus exécutés sur un host spécifique, dans une zone de disponibilité donnée, ou associés à une charge de travail particulière. [Configurez][27] Live processes sur vos hosts, conteneurs ou instances AWS ECS Fargate pour bénéficier de cette fonctionnalité.

### Disponibilité, latence et expiration des certificats SSL 

Le fonctionnement des serveurs web dépend de la disponibilité réseau des ports, de la validité des certificats SSL, et de la faible latence des connexions. Installez le [HTTP_Check][25] pour superviser des endpoints HTTP locaux ou distants, détecter les codes de réponse incorrects (comme 404), et utilisez des tests API Synthetic pour identifier les [certificats SSL][71] proches de l'expiration.

### Cloud Network Monitoring

Les serveurs web sont presque toujours connectés à d'autres services via une couche réseau, vulnérable aux pertes de paquets et aux retransmissions. Utilisez l'[intégration réseau][28] de Datadog et activez le [Cloud Network Monitoring][29] pour obtenir une visibilité sur le trafic réseau entre services, conteneurs, zones de disponibilité et autres tags de votre infrastructure.

## Services de plateforme

La supervision de l'infrastructure dans Datadog s'accompagne de produits complémentaires qui renforcent l'observabilité de vos environnements.

### Software Catalog

Le [Software Catalog][30] fournit une vue d'ensemble de vos services, en indiquant ceux qui viennent d'être déployés, ceux qui ne l'ont pas été depuis un certain temps, ceux qui remontent le plus d'erreurs ou qui sont actuellement en incident, et bien plus encore.

Software Catalog vous aide également à évaluer la couverture de votre configuration d'observabilité. Au fil du déploiement, vous pouvez consulter l'onglet **Setup Guidance** de chacun de vos services pour vérifier que les configurations attendues sont bien en place :

{{< img src="/administrators_guide/software_catalog_2.png" alt="Écran d'accueil du Software Catalog" style="width:90%;">}}

Vous pouvez ajouter des composants que vous ne prévoyez pas de superviser immédiatement, comme des tâches cron ou des bibliothèques, afin de constituer une vue complète de votre système. Cela vous permet aussi d'assigner à l'avance les membres d'équipe responsables de ces composants en vue des prochaines étapes du déploiement de Datadog.

Consultez la [liste des endpoints][33] pour catégoriser, surveiller la performance et la fiabilité de vos API, et gérer leur ownership.

### Catalogue de ressources

Utilisez le [Resource Catalog][46] pour consulter les informations clés sur vos ressources : métadonnées, ownership, configurations, relations entre composants et risques de sécurité actifs. Il constitue le point central de toutes les ressources de votre infrastructure. Resource Catalog offre une visibilité sur la conformité de l'infrastructure, encourage les bonnes pratiques de tagging, réduit les risques applicatifs en mettant en évidence les vulnérabilités de sécurité, fournit une vue synthétique des pratiques de sécurité à la direction technique, et permet d'exporter les ressources à des fins de traçabilité ou d'audit.

Vous pouvez utiliser Resource Catalog dans de nombreux contextes, notamment pour :

- comprendre l'ownership des ressources et identifier celles qui sont orphelines afin de les nettoyer ;
- planifier la mise à niveau de composants utilisant des versions obsolètes ;
- accéder rapidement à la configuration et aux métadonnées pour accélérer la gestion d'incident ;
- maintenir une posture de sécurité solide en repérant et en corrigeant les erreurs de configuration et les failles identifiées.

### Event Management

Sans configuration supplémentaire, [Event Management][31] vous permet de visualiser l'état d'événements tiers, ainsi que ceux générés par l'Agent ou les intégrations installées. Event Management de Datadog centralise les événements externes, comme les alertes et les changements, mais aussi ceux créés automatiquement par Datadog à partir d'autres produits (monitors, Error Tracking, etc.). Vous pouvez également l'utiliser pour envoyer des alertes et des notifications basées sur des requêtes d'événements.

### Error Tracking

Visualisez les erreurs là où elles se produisent avec [Error Tracking][32]. Error Tracking peut ingérer les erreurs provenant de la solution APM, de Log Management et de RUM, afin de faciliter le débogage.

### Fleet Automation  

Administrez et gérez de façon centralisée tous vos Agents Datadog avec [Fleet Automation][34]. Fleet Automation permet d'identifier les Agents à mettre à jour, d'envoyer une flare à l'assistance, ou encore de désactiver et faire pivoter des clés d'API.

{{< img src="/administrators_guide/fleet_automation.png" alt="Écran d'accueil de Fleet Management" style="width:90%;">}}

### Configuration à distance

Utilisez la [configuration à distance][35] de Datadog (activée par défaut) pour configurer à distance et modifier le comportement des composants déployés dans votre infrastructure (par exemple, Agents, bibliothèques de tracing ou worker Observability Pipelines). Pour plus d'informations, consultez la liste des [produits et fonctionnalités compatibles][36].

### Notebooks 

Les [Notebooks][37] Datadog vous permettent de partager des informations avec votre équipe, notamment lors d'incidents ou d'analyses de problèmes.

## Optimiser la collecte de données 

Datadog collecte un large volume de données dans vos environnements. Il est donc essentiel de limiter les points de collecte et de mettre en place des garde-fous. Cette section décrit les mécanismes de contrôle de la collecte de données de télémétrie, et vous aide à les adapter aux besoins spécifiques de votre organisation.

### Infrastructure

Datadog interagit avec les API de monitoring des hyperviseurs (Hyper-V, vSphere, PCF), des orchestrateurs de conteneurs (Kubernetes, Rancher, Docker) et des fournisseurs cloud publics (AWS, Azure, GCP). La plateforme permet [la découverte automatique][38] des ressources présentes dans ces environnements (pods, VM, EC2, ALB, Azure SQL, blobs GCP, etc.). Il est important de limiter le nombre de ressources supervisées, car cela a un impact direct sur la facturation.

**Recommandations** :   

Activez la collecte de ressources pour [AWS][39] et [GCP][44] afin d'obtenir un inventaire, ainsi que des informations de coûts et de sécurité. Limitez la collecte de métriques pour vos [ressources Azure][40] et vos environnements [conteneurisés][45].

## Niveaux de service

Pendant la phase de planification, vous constaterez que toutes les instances d'observabilité n'ont pas la même importance. Certaines sont critiques, d'autres non. Il peut donc être utile de définir des modèles de couverture selon les environnements que vous souhaitez superviser avec Datadog. Par exemple, un environnement de production pourra faire l'objet d'une supervision complète, alors qu'un environnement de développement pourra se limiter à des outils spécifiques pour les développeurs.

**Recommandations** :

- Définissez des estimations de niveaux de service dès le début du projet. Même approximatives, elles seront utiles au fur et à mesure que l'adoption de Datadog se généralise.

### Cycle de développement logiciel (SDLC)

Pour commencer à définir vos modèles d'installation, combinez les éléments issus de l'[exercice de cadrage](#exercice-de-cadrage) avec la formation [Datadog 101][73], puis élaborez un plan d'action adapté. L'exemple suivant présente un modèle d'installation structuré par environnement SDLC (dev, QA, stage, prod). Vous pouvez bien sûr le modifier selon vos normes et vos contraintes. Commencez également à aligner vos équipes sur la définition de ce qu'est une « installation standard Datadog » dans votre organisation.

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Refuser/Autoriser | Autoriser | Autoriser | Allow |
| **Surveillance Synthetic** | Refuser | Refuser/Autoriser | Autoriser | Autoriser |
| **Log Management** | Autoriser | Autoriser | Autoriser | Autoriser |
| **RUM** | Refuser | Refuser/Autoriser |  Autoriser | Autoriser |
| **DBM** | Refuser/Autoriser | Refuser/Autoriser | Autoriser | Autoriser |
| **Live Processes** | Refuser | Refuser/Autoriser | Autoriser | Autoriser |
|  |  |  |  |  |

**Recommandations** :
Tous les outils ne conviennent pas à tous les contextes. Évaluez les cas d'usage des produits Datadog en fonction de vos besoins réels. Tenez compte des niveaux du SDLC, de l'importance de l'application et de la finalité de chaque produit Datadog.

## Résumé

Il est essentiel d'établir une feuille de route réaliste pour l'installation de Datadog. Dans cette section, vous avez exploré la phase de planification et les bonnes pratiques à mettre en place pour garantir le succès de votre déploiement. Vous avez identifié les parties prenantes, rassemblé les connaissances nécessaires, défini vos modèles d'installation, planifié vos optimisations, et compilé une liste de bonnes pratiques pour les produits clés. Ces fondations vous préparent pour les prochaines étapes de l'installation de Datadog : le déploiement et l'exploitation.

## Étapes suivantes

Pendant la phase de [déploiement][41], élaborez une méthodologie détaillée en vous concentrant sur la construction de votre configuration Datadog, en itérant sur votre environnement, en mettant en place des mécanismes de soutien internes, et en vous préparant à la mise en production.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}



[1]: /fr/getting_started/tagging/unified_service_tagging/
[2]: /fr/getting_started/tagging/
[3]: /fr/getting_started/tagging/unified_service_tagging
[4]: /fr/account_management/rbac/?tab=datadogapplication
[5]: /fr/account_management/multi_organization/
[6]: /fr/account_management/org_settings/service_accounts/
[7]: /fr/account_management/api-app-keys/
[8]: /fr/account_management/teams/
[9]: /fr/tracing/trace_pipeline/ingestion_controls/
[10]: /fr/tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /fr/tracing/guide/ingestion_sampling_use_cases/
[12]: /fr/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[13]: /fr/tracing/trace_collection/tracing_naming_convention/
[14]: /fr/logs/guide/getting-started-lwl/
[15]: /fr/logs/log_configuration/logs_to_metrics/
[16]: /fr/logs/log_configuration/archives/?tab=awss3
[17]: /fr/logs/log_configuration/forwarding_custom_destinations/?tab=http
[18]: /fr/logs/log_configuration/indexes
[19]: /fr/logs/log_configuration/flex_logs/
[20]: /fr/logs/guide/best-practices-for-log-management/
[21]: /fr/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event
[22]: /fr/real_user_monitoring/guide/best-practices-for-rum-sampling/
[23]: https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring#synthetic-testing--monitoring-common-questions
[24]: /fr/synthetics/browser_tests/advanced_options/#subtests
[25]: /fr/integrations/http_check/
[26]: /fr/infrastructure/process/?tab=linuxwindows
[27]: /fr/infrastructure/process/?tab=linuxwindows\#installation
[28]: /fr/integrations/network/
[29]: /fr/network_monitoring/cloud_network_monitoring/
[30]: /fr/software_catalog/
[31]: /fr/service_management/events/
[32]: /fr/error_tracking/
[33]: /fr/software_catalog/endpoints/
[34]: /fr/agent/fleet_automation/
[35]: /fr/remote_configuration
[36]: /fr/remote_configuration#supported-products-and-features
[37]: /fr/notebooks/
[38]: /fr/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[39]: /fr/account_management/billing/aws/#aws-resource-exclusion
[40]: /fr/integrations/guide/azure-portal/?tab=vmextension\#metric-collection
[41]: /fr/administrators_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /fr/integrations/ping/
[44]: /fr/integrations/google_cloud_platform/?tab=project#resource-changes-collection
[45]: /fr/containers/guide/container-discovery-management/?tab=datadogoperator
[46]: /fr/infrastructure/resource_catalog/
[47]: https://www.datadoghq.com/blog/engineering/introducing-husky/
[48]: https://www.datadoghq.com/blog/engineering/husky-deep-dive/
[49]: /fr/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[50]: /fr/integrations/tcp_check/?tab=host#data-collected
[51]: /fr/tracing/services/inferred_services
[52]: /fr/integrations/amazon_web_services/
[53]: /fr/integrations/google_cloud_platform/
[54]: /fr/integrations/azure/
[55]: /fr/integrations/slack/?tab=datadogforslack
[56]: /fr/integrations/jira/
[57]: /fr/integrations/pagerduty/
[58]: /fr/integrations/#cat-orchestration
[59]: /fr/integrations/#cat-os-system
[60]: /fr/integrations/network/
[61]: /fr/integrations/#cat-data-stores
[62]: /fr/integrations/#cat-message-queues
[63]: /fr/integrations/#cat-automation
[64]: /fr/integrations/#cat-languages
[65]: /fr/integrations/#cat-source-control
[66]: /fr/integrations/okta/
[67]: /fr/integrations/open_policy_agent/
[68]: /fr/universal_service_monitoring/
[69]: /fr/integrations/process/
[70]: /fr/developers/custom_checks/#should-you-write-a-custom-agent-check-or-an-integration
[71]: /fr/synthetics/api_tests/ssl_tests/
[72]: /fr/software_catalog/service_definitions/
[73]: https://learn.datadoghq.com/courses/dd-101-sre
[74]: /fr/logs/log_configuration/flex_logs/#configure-storage-tiers
[75]: /fr/tracing/trace_collection/