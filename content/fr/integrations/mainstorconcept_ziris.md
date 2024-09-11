---
algolia:
  subcategory: Intégrations du Marketplace
app_id: mainstorconcept-ziris
app_uuid: dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83
assets:
  dashboards:
    JDBC and z/OS: assets/dashboards/JDBC_Dashboard.json
    MQ Buffer Pool Manager: assets/dashboards/MQ_Buffer_Pool_Manager.json
    MQ Channel Initiator: assets/dashboards/MQ_Channel_Initiator.json
    MQ Data Manager: assets/dashboards/MQ_Data_Manager.json
    MQ Log Manager: assets/dashboards/MQ_Log_Manager.json
    MQ Message Manager: assets/dashboards/MQ_Message_Manager.json
    MQ Storage Manager: assets/dashboards/MQ_Storage_Manager.json
    z/OS Connect Metrics: assets/dashboards/z_OS_Connect_Metrics.json
    z/OS Infrastructure: assets/dashboards/z_OS_Infrastructure.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: mainstorconcept.zos.connect.elapsed_time
      metadata_path: metadata.csv
      prefix: mainstorconcept.zos.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: mainstorconcept-ziris
  monitors:
    MQ Active Dataset Reads: assets/monitors/mq_active_dataset_reads_monitor.json
    MQ Archive Dataset Reads: assets/monitors/mq_archive_dataset_reads_monitor.json
    MQ Checkpoints: assets/monitors/mq_checkpoints_monitor.json
    MQ Insufficient Storage Events: assets/monitors/mq_insufficient_storage_events_monitor.json
    MQ Storage Contractions: assets/monitors/mq_storage_contractions_monitor.json
    MQ Suspensions: assets/monitors/mq_suspensions_monitor.json
author:
  homepage: https://mainstorconcept.com
  name: mainstorconcept GmbH
  sales_email: sales@mainstorconcept.com
  support_email: support@mainstorconcept.com
  vendor_id: mainstorconcept
categories:
- mainframe
- marketplace
- network
- os & system
- tracing
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
custom_kind: integration
legal_terms:
  eula: EULA.pdf
manifest_version: 2.0.0
name: mainstorconcept_ziris
oauth: {}
pricing:
- billing_type: flat_fee
  includes_assets: false
  product_id: ziris
  short_description: Le tarif inclut 50 millions d'unités de service sur le mainframe.
  unit_price: 4000.0
public_title: z/IRIS
short_description: Recueille les données de performance du système d'exploitation
  IBM z/OS à partir des mainframes
supported_os:
- ibm z/os
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Mainframe
  - Category::Marketplace
  - Category::Network
  - Category::OS & System
  - Category::Tracing
  - Offering::Integration
  - Supported OS::IBM z/OS
  - Supported OS::Linux
  configuration: README.md#Setup
  description: Recueille les données de performance du système d'exploitation IBM
    z/OS à partir des mainframes
  media:
  - caption: z/IRIS - Observabilité du mainframe
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: video
    vimeo_id: 630489680
  - caption: Service Map avec des spans créés par z/IRIS
    image_url: images/datadog-service-map-with-spans-created-by-ziris.png
    media_type: image
  - caption: Dashboards z/IRIS
    image_url: images/datadog-ziris-dashboards.png
    media_type: image
  - caption: Analyser les performances des applications z/OS dans le Trace Explorer
    image_url: images/datadog-trace-explorer-filtering-zos-application-performance-measurements.png
    media_type: image
  - caption: z/IRIS étend les flamegraphs et les listes de spans
    image_url: images/datadog-annotated-zosconnect-cics-db2-trace-page.png
    media_type: image
  - caption: z/IRIS s'intègre à Datadog
    image_url: images/ziris-otel-integration-with-datadog.png
    media_type: image
  - caption: Page de service CICS
    image_url: images/datadog-annotated-cics-service-page.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## Présentation

Améliorez les pratiques d'observabilité de votre entreprise en ajoutant des traces et des métriques à vos applications mainframe backend et utilisez les avantages suivants avec [z/IRIS][1] :

* Visualiser les relations entre les services et les applications hébergées dans le nuage ou sur des serveurs, et le mainframe.
* Découvrez comment les applications mainframe contribuent à l'expérience de l'utilisateur final.
* Réduisez le temps moyen de restauration (MTTR) en tirant parti de [Datadog Watchdog][23] pour détecter automatiquement les anomalies dans les applications z/OS qui ont un impact sur les services des entreprises numériques.
* Améliorer considérablement la communication entre les équipes chargées des applications et les administrateurs des plates-formes mainframe grâce à l'utilisation de dashboards et d'interfaces partageables pour faciliter l'analyse des incidents entre plates-formes.


 z/IRIS envoie des données télémétriques (traces et métriques) provenant de transactions et d'applications exécutées sur des mainframes IBM System Z à Datadog. 

 Après activation :

 * La [Service Map][24] de Datadog affiche lʼintégration avec les services z/OS, tels que CICS, MQ et Db2.
 * Le taux d'appel, le taux d'erreur et la latence sont des indicateurs de performance activés pour les services du mainframe.
 * Les flamegraphs et les listes de spans permettent de visualiser le flux de la requête dans les applications de mainframe.
 * Les pages des traces contiennent des messages d'erreur concernant les systèmes z/OS, le cas échéant.


La télémétrie z/IRIS améliore l'expérience des développeurs et des opérations en étendant leur visibilité aux opérations internes du mainframe. Les utilisateurs de Datadog seront en mesure :

* dʼactiver les dashboards z/IRIS pour surveiller la santé des systèmes et des applications z/OS.
* de créer des monitors pour alerter les équipes sur les violations de SLO dans les applications mainframe.
* dʼanalyser comment les applications mainframe contribuent au temps de réponse total et à la disponibilité globale.
* dʼexaminer comment les changements à l'intérieur et à l'extérieur du mainframe impactent le comportement et la stabilité des applications.
* Dʼaccéder aux messages d'erreur signalés par les applications mainframe qui ont un impact sur l'expérience de l'utilisateur final.

### Méthodes d'intégration

La solution z/IRIS utilise les deux méthodes suivantes pour s'intégrer à Datadog :

* **OpenTelemetry (OTEL) :** Il s'agit d'un cadre d'observabilité entièrement pris en charge par Datadog qui standardise les intégrations APM. z/IRIS transmettra des traces et des métriques vers un collector OpenTelemetry qui est configuré pour exporter la télémétrie vers votre environnement Datadog.
* **API Datadog (bêta) :** z/IRIS est capable de diffuser des traces en utilisant l'API de lʼAgent Datadog ainsi que des événements en utilisant l'API HTTP REST de Datadog. Cette intégration n'est disponible que pour les essais et les projets de validation de concept (POC) afin de réduire les efforts administratifs lors de l'évaluation de z/IRIS. Elle nʼest pas idéale pour des utilisations en production. 

Pour des informations plus détaillées sur les possibilités offertes par lʼintégration de z/IRIS, voir la [documentation z/IRIS][3].

### Tracing distribué

Un span représente une unité de travail ou un processus. Les spans sont des éléments constitutifs des traces distribuées qui décrivent le moment où une demande a été déclenchée et la manière dont les demandes ont circulé à travers les applications et les services.

z/IRIS étend les traces dans Datadog avec des spans qui représentent les processus et les transactions des applications mainframe IBM Z. L'extension de traces offre aux utilisateurs de nouvelles perspectives sur la façon dont les services sur le mainframe sont utilisés par les applications cloud et serveur. Les indicateurs de performance, tels que le taux d'erreur, le taux d'appel et la latence des requêtes, pour les applications basées sur le mainframe, sont activés afin que vous puissiez identifier la santé de lʼintégration du mainframe.

#### Spans

z/IRIS crée des spans pour les transactions et les opérations traitées sur les systèmes mainframe suivants :

* [Db2 pour z/OS][4]
* [z/OS Connect][5]
* [IBM MQ pour z/OS][7]
* [CICS Transaction Server (comme CICS TS)][8]
* [Tâches groupées][6]
* [Activité des utilisateurs TSO][6]

Cette liste est en constante évolution. Contactez [ziris@mainstorconcept.com][2] pour demander des informations sur le support des applications ou des sous-systèmes z/OS qui ne figurent pas dans la liste ci-dessus.

#### tracing de workflow

z/IRIS est capable d'identifier quand des opérations sur le mainframe ont été déclenchées par une demande d'application externe et s'assurera que les données générées seront ajoutées à la trace pour la demande d'application. Par exemple, si une application dans le cloud envoie une demande à une application centrale pour être traitée, z/IRIS détecte alors que le traitement de l'application du mainframe est liée à une demande externe et veille à ce que le span de l'application du mainframe soit ajouté à la trace pour la demande de l'application dans le nuage.

Les workflows de requêtes suivants sont suivis par le tracing du workflow z/IRIS :

* REST API request -> z/OS Connect EE -> SOR (CICS TS, Db2 for z/OS, IMS or IBM MQ) -> Db2 for z/OS 
* JDBC -> Db2 for z/OS
* IBM MQ (Linux, Windows, AIX) -> IBM MQ for z/OS -> CICS TS -> Db2 for z/OS 
* CICS TS -> Db2 for z/OS


#### Tags

Les métadonnées relatives à la requête, à l'utilisation des ressources et au système z/OS concerné sont fournies par le biais de tags que vous pouvez utiliser pour effectuer des requêtes dans le [Trace Explorer][9]. Ces informations sont traitées par [Watchdog Insights][10] pour alerter les utilisateurs sur les anomalies détectées dans les services du mainframe. 

Vous trouverez ci-dessous une liste complète de tous les tags créés avec z/IRIS.

| Nom du tag de trace                                    | Description                                   |
|---------------------------------------------------|-----------------------------------------------|
| db.db2.collection.id                              | ID de la collection Db2                             |
| db.db2.instance_name                              | Nom de l'instance Db2                             |
| db.system                                         | Système de base de données                                     |
| db.user                                           | Utilisateur de la base de données                                       |
| enduser.id                                        | ID de l'utilisateur final                                   |
| host.arch                                         | Architecture du host                             |
| host.name                                         | Nom du host                                     |
| http.client_ip                                    | IP du client HTTP                                |
| http.method                                       | Méthode HTTP                                   |
| http.request_content_length                       | Longueur du contenu de la requête HTTP                   |
| http.response_content_length                      | Longueur du contenu de la réponse HTTP                  |
| http.status_code                                  | Code de statut HTTP                              |
| ibm-mq.manager                                    | Gestionnaire IBM MQ                                |
| ibm.machine.logical_partition                     | Partition logique de la machine IBM                 |
| ibm.machine.model                                 | Modèle de machine IBM                             |
| ibm.machine.type                                  | Type de machine IBM                              |
| messaging.conversation_id                         | ID de la conversation de messagerie                     |
| messaging.destination                             | Destination de la messagerie                         |
| messaging.destination_kind                        | Type de destination de la messagerie                    |
| messaging.system                                  | Système de messagerie                              |
| net.peer.ip                                       | IP du pair réseau                                   |
| net.peer.port                                     | Port du pair réseau                                 |
| net.sock.peer.addr                                | Net sock peer addr                            |
| net.sock.peer.cipher                              | Net sock peer cipher                          |
| net.sock.peer.port                                | Net sock peer port                            |
| os.type                                           | Type de système d'exploitation                                       |
| ziris.job.identifier                              | Identifiant de la tâche z/OS                           |
| zos.cf.calls                                      | Appels CF                                      |
| zos.cf.elapsed.time_ms                            | Temps écoulé CF                               |
| zos.cics.application.name                         | Nom de l'application CICS                         |
| zos.cics.application.operation                    | Fonctionnement de l'application CICS                    |
| zos.cics.application.platform_name                | Nom de la plate-forme d'application CICS                |
| zos.cics.application.version                      | Version de l'application CICS                      |
| zos.cics.atom_service_name                        | Nom du service CICS ATOM                        |
| zos.cics.bts.activity.id                          | ID d'activité du BTS CICS                          |
| zos.cics.bts.activity.name                        | Nom de l'activité du BTS CICS                        |
| zos.cics.bts.process.id                           | ID de processus BTS CICS                           |
| zos.cics.bts.process.name                         | Nom de processus BTS CICS                         |
| zos.cics.bts.process.type                         | Type de processus BTS CICS                         |
| zos.cics.connection.access_type                   | Type d'accès à la connexion CICS                   |
| zos.cics.connection.name                          | Nom de la connexion CICS                          |
| zos.cics.connection.type                          | Type de connexion CICS                          |
| zos.cics.ipconn_name                              | Nom de l'ipconn CICS                              |
| zos.cics.net.peer.name                            | CICS net peer name                            |
| zos.cics.nodejs_application_name                  | Nom de l'application CICS NodeJS                   |
| zos.cics.pipeline_name                            | Nom du pipeline CICS                            |
| zos.cics.region_name                              | Nom de la région CICS                              |
| zos.cics.session.id                               | ID de la session CICS                               |
| zos.cics.session.type                             | Type de session CICS                             |
| zos.cics.tcpipservice.name                        | Nom du service CICS TCP/IP                      |
| zos.cics.tcpipservice.origin.client.ip            | IP du client dʼorigine du service CICS TCP/IP          |
| zos.cics.tcpipservice.origin.client.port          | Port du client dʼorigine du service CICS TCP/IP        |
| zos.cics.tcpipservice.origin.name                 | Nom dʼorigine du service CICS TCP/IP               |
| zos.cics.tcpipservice.origin.port                 | Port dʼorigine du service CICS TCP/IP               |
| zos.cics.tcpipservice.port                        | Port du service CICS TCP/IP                      |
| zos.cics.transaction.api.requests                 | Requêtes d'API pour la transaction CICS                 |
| zos.cics.transaction.auth.time_ms                 | Temps d'authentification pour la transaction CICS                    |
| zos.cics.transaction.class                        | Classe de la transaction CICS                        |
| zos.cics.transaction.cpu.time_ms                  | Temps CPU pour la transaction CICS                     |
| zos.cics.transaction.exception.wait.time_ms       | Temps d'attente des exceptions pour la transaction CICS          |
| zos.cics.transaction.gpu.time_ms                  | Temps GPU pour la transaction CICS                     |
| zos.cics.transaction.group_id                     | ID du groupe de transactions CICS                     |
| zos.cics.transaction.id                           | ID de transaction CICS                           |
| zos.cics.transaction.jvm.elapsed.time_ms          | Temps écoulé de la JVM pour la transaction CICS             |
| zos.cics.transaction.jvm.init.time_ms             | Temps d'initialisation de la JVM pour la transaction CICS                |
| zos.cics.transaction.jvm.wait.time_ms             | Temps d'attente de la JVM pour la transaction CICS                |
| zos.cics.transaction.number                       | Numéro de transaction CICS                       |
| zos.cics.transaction.origin.adapter.data1         | Données de l'adaptateur d'origine de la transaction CICS1         |
| zos.cics.transaction.origin.adapter.data2         | Données de l'adaptateur d'origine de la transaction CICS2         |
| zos.cics.transaction.origin.adapter.data3         | Données de l'adaptateur d'origine de la transaction CICS3         |
| zos.cics.transaction.origin.adapter.product       | Produit de l'adaptateur d'origine de la transaction CICS       |
| zos.cics.transaction.origin.application.id        | ID de l'application d'origine de la transaction CICS        |
| zos.cics.transaction.origin.id                    | ID d'origine de la transaction CICS                    |
| zos.cics.transaction.origin.network.id            | ID de réseau dʼorigine de la transaction CICS            |
| zos.cics.transaction.origin.number                | Numéro d'origine de la transaction CICS                |
| zos.cics.transaction.origin.user_id               | ID de l'utilisateur à l'origine de la transaction CICS               |
| zos.cics.transaction.priority                     | Priorité de la transaction CICS                     |
| zos.cics.transaction.program.name                 | Nom du programme de la transaction CICS                 |
| zos.cics.transaction.program.return_code_current  | Code de retour actuel du programme de la transaction CICS  |
| zos.cics.transaction.program.return_code_original | Code de retour original du programme de la transaction CICS |
| zos.cics.transaction.remote.task.requests         | Requêtes de tâches à distance pour les transactions CICS         |
| zos.cics.transaction.rmi.elapsed.time_ms          | Temps écoulé pour le protocole RMI pour la transaction CICS             |
| zos.cics.transaction.rmi.wait.time_ms             | Temps d'attente du protocole RMI pour la transaction CICS                |
| zos.cics.transaction.routed.host.name             | Nom du host acheminé de la transaction CICS             |
| zos.cics.transaction.start_type                   | Type de démarrage pour la transaction CICS                   |
| zos.cics.transaction.tcb.attachments              | Pièces jointes TCB à la transaction CICS              |
| zos.cics.transaction.tcb.cpu.time_ms              | Temps CPU TCB pour la transaction CICS                 |
| zos.cics.transaction.tcb.elapsed.time_ms          | Temps écoulé pour le protocole TCB pour la transaction CICS             |
| zos.cics.transaction.tcb.wait.time_ms             | Temps d'attente du protocole TCB pour la transaction CICS                |
| zos.cics.transaction.user_id                      | ID d'utilisateur de la transaction CICS                      |
| zos.cics.transaction.wait.time_ms                 | Temps d'attente de la transaction CICS                    |
| zos.cics.transaction.ziip.time_ms                 | Temps ZIIP de la transaction CICS                    |
| zos.cics.urimap.name                              | Nom de l'urimap CICS                              |
| zos.cics.urimap.program_name                      | Nom du programme urimap de CICS                      |
| zos.cics.webservice.name                          | Nom du service web CICS                         |
| zos.cics.webservice.operation_name                | Nom de l'opération du service web CICS               |
| zos.connect.api.name                              | Nom de l'API de z/OS Connect                      |
| zos.connect.api.version                           | Version de l'API de z/OS Connect                   |
| zos.connect.request.id                            | ID de la requête                                    |
| zos.connect.request.timed_out                     | Expiration de la requête                              |
| zos.connect.request.user_name                     | Nom d'utilisateur de la requête                             |
| zos.connect.service.name                          | Nom du service                                  |
| zos.connect.service.version                       | Version du service                               |
| zos.connect.service_provider.name                 | Nom du fournisseur du service                         |
| zos.connect.sor.identifier                        | Identifiant SOR                                |
| zos.connect.sor.reference                         | Référence SOR                                 |
| zos.connect.sor.request.received_time             | Requête SOR reçue                          |
| zos.connect.sor.request.sent_time                 | Date d'envoi de la requête SOR                         |
| zos.connect.sor.resource                          | Ressource SOR                                  |
| zos.correlation.id                                | ID de corrélation z/OS                           |
| zos.cpu.time_ms                                   | Temps CPU z/OS                                 |
| zos.db2.abort.requests                            | Requête d'abandon Db2                             |
| zos.db2.ace                                       | ACE Db2                                       |
| zos.db2.client.application.name                   | Nom de l'application client Db2                   |
| zos.db2.client.auth.id                            | ID d'authentification du client Db2                            |
| zos.db2.client.platform                           | Plateforme client Db2                           |
| zos.db2.connection.id                             | ID de connexion Db2                             |
| zos.db2.consistency.token                         | Consistency token Db2                         |
| zos.db2.cpu.time_ms                               | Temps CPU Db2                                  |
| zos.db2.deadlock.resources                        | Ressources deadlock Db2                        |
| zos.db2.elapsed.time_ms                           | Temps écoulé Db2                              |
| zos.db2.end.timestamp                             | Timestamp de fin Db2                             |
| zos.db2.location.name                             | Nom de l'emplacement Db2                             |
| zos.db2.lock.duration                             | Durée de verrouillage Db2                             |
| zos.db2.lock.request                              | Requête de verrouillage Db2                              |
| zos.db2.lock.state                                | Statut de verrouillage Db2                                |
| zos.db2.luw.id                                    | ID LUW Db2                                    |
| zos.db2.plan.name                                 | Nom du plan Db2                                 |
| zos.db2.product.id                                | ID de produit Db2                                |
| zos.db2.program.name                              | Nom du programme Db2                              |
| zos.db2.received.bytes                            | Octets reçus Db2                            |
| zos.db2.remote.location.name                      | Nom de l'emplacement distant Db2                      |
| zos.db2.response.time_ms                          | Temps de réponse Db2                             |
| zos.db2.sent.bytes                                | Octets envoyés Db2                                |
| zos.db2.sql.lock.statements                       | Instruction SQL lock Db2                        |
| zos.db2.sql.open.statements                       | Instruction SQL open Db2                        |
| zos.db2.sql.prepare.statements                    | Instruction SQL prepare Db2                     |
| zos.db2.sql.storedprocedure.statements            | Procédure stockée SQL Db2                      |
| zos.db2.start.timestamp                           | Timestamp de début Db2                           |
| zos.db2.statement.id                              | ID de l'instruction Db2                              |
| zos.db2.statement.type                            | Type d'instruction Db2                            |
| zos.db2.su.factor                                 | Facteur SU Db2                                 |
| zos.db2.thread.token                              | Token du thread Db2                              |
| zos.db2.uniqueness.value                          | Valeur d'unicité Db2                          |
| zos.db2.unlock.requests                           | Requête de déverrouillage Db2                            |
| zos.db2.version                                   | Version de Db2                                   |
| zos.db2.wait.time_ms                              | Temps d'attente de Db2                                 |
| zos.db2.workload.service.class.name               | Nom de la catégorie de service de la charge de travail Db2               |
| zos.db2.ziip.time_ms                              | Temps ZIIP Db2                                 |
| zos.jes.job.correlator                            | Corrélateur de tâches JES                            |
| zos.job.class                                     | Catégorie de la tâche z/OS                                |
| zos.job.step.cpu.time_ms                          | Temps CPU de l'étape de tâche z/OS                        |
| zos.job.step.cpu.units                            | Unités CPU de l'étape z/OS                           |
| zos.job.step.ended                                | Fin de l'étape de tâche z/OS                           |
| zos.job.step.name                                 | Nom de l'étape de tâche z/OS                            |
| zos.job.step.number                               | Numéro de l'étape de tâche z/OS                          |
| zos.job.step.program_name                         | Nom du programme de l'étape de tâche z/OS                    |
| zos.job.step.return_code                          | Code de retour de l'étape de tâche z/OS                     |
| zos.job.step.ziip.time_ms                         | Temps ZIIP de l'étape de tâche z/OS                       |
| zos.lu.name                                       | Nom de lʼunité logique z/OS                                  |
| zos.mq.accounting_token                           | Token de comptabilité MQ                           |
| zos.mq.buffer_pool                                | Buffer pool MQ                                |
| zos.mq.calls                                      | Appels MQ                                      |
| zos.mq.cf_structure                               | Structure CF MQ                               |
| zos.mq.channel.connection_name                    | Nom de la connexion au canal MQ                    |
| zos.mq.channel.name                               | Nom du canal MQ                               |
| zos.mq.connection.auth_id                         | ID d'authentification de la connexion MQ                         |
| zos.mq.connection.name                            | Nom de la connexion MQ                            |
| zos.mq.connection.type                            | Type de connexion MQ                            |
| zos.mq.connection.user_id                         | ID d'utilisateur de la connexion MQ                         |
| zos.mq.context_token                              | Token de contexte MQ                              |
| zos.mq.correlation_id                             | ID de corrélation MQ                             |
| zos.mq.luw_id                                     | ID LUW MQ                                     |
| zos.mq.messages                                   | Messages MQ                                   |
| zos.mq.mqcb.calls                                 | Appels MQCb MQ                                 |
| zos.mq.mqcb.cpu.time_ms                           | Temps CPU MQCb MQ                              |
| zos.mq.mqcb.elapsed.time_ms                       | Temps écoulé MQCb MQ                          |
| zos.mq.mqclose.calls                              | Appels MQClose MQ                              |
| zos.mq.mqclose.cpu.time_ms                        | Temps CPU MQClose MQ                           |
| zos.mq.mqclose.elapsed.time_ms                    | Temps écoulé MQClose MQ                       |
| zos.mq.mqclose.suspended.calls                    | Appels suspendus MQClose MQ                    |
| zos.mq.mqclose.wait.time_ms                       | Temps d'attente MQClose MQ                          |
| zos.mq.mqget.browse.specific.calls                | MQ MQGet browse specific calls                |
| zos.mq.mqget.browse.unspecific.calls              | MQ MQGet browse unspecific calls              |
| zos.mq.mqget.calls                                | Appels MQGet MQ                                |
| zos.mq.mqget.cpu.time_ms                          | Temps CPU MQGet MQ                             |
| zos.mq.mqget.destructive.specific.calls           | MQ MQGet destructive specific calls           |
| zos.mq.mqget.destructive.unspecific.calls         | MQ MQGet destructive unspecific calls         |
| zos.mq.mqget.elapsed.time_ms                      | Temps écoulé MQGet MQ                         |
| zos.mq.mqget.errors                               | Erreurs MQGet MQ                               |
| zos.mq.mqget.expired.messages                     | Messages expirés MQGet MQ                     |
| zos.mq.mqget.log.forced.wait.time_ms              | temps d'attente forcé du log MQGet MQ                 |
| zos.mq.mqget.log.forced.writes                    | Écritures forcées du log MQGet MQ                    |
| zos.mq.mqget.log.wait.time_ms                     | Temps d'attente du log MQGet MQ                        |
| zos.mq.mqget.log.writes                           | Écritures du log MQGet MQ                           |
| zos.mq.mqget.message.max.size_bytes               | Taille maximale du message MQGet MQ                     |
| zos.mq.mqget.messages.min.size_bytes              | Taille minimale du message MQGet MQ                     |
| zos.mq.mqget.pageset.reads                        | Lectures pageset MQGet MQ                        |
| zos.mq.mqget.pageset.wait.time_ms                 | Temps d'attente pageset MQGet MQ                    |
| zos.mq.mqget.persistent.messages                  | Messages persistants MQGet MQ                  |
| zos.mq.mqget.skipped.messages                     | Messages ignorés MQGet MQ                     |
| zos.mq.mqget.skipped.pages                        | Pages ignorées MQGet MQ                        |
| zos.mq.mqget.successful_calls                     | Appels réussis MQGet MQ                     |
| zos.mq.mqget.suspended.calls                      | Appels suspendus MQGet MQ                      |
| zos.mq.mqget.wait.time_ms                         | Temps d'attente MQGet MQ                            |
| zos.mq.mqinq.calls                                | Appels MQInq MQ                                |
| zos.mq.mqinq.cpu.time_ms                          | Temps CPU MQInq MQ                             |
| zos.mq.mqinq.elapsed.time_ms                      | Temps écoulé MQInq MQ                         |
| zos.mq.mqopen.calls                               | Appels MQOpen MQ                               |
| zos.mq.mqopen.cpu.time_ms                         | Temps CPU MQOpen MQ                            |
| zos.mq.mqopen.elapsed.time_ms                     | Temps écoulé MQOpen MQ                        |
| zos.mq.mqopen.suspended.calls                     | Appels suspendus MQGet MQ                     |
| zos.mq.mqopen.wait.time_ms                        | Temps d'attente MQOpen MQ                           |
| zos.mq.mqput.calls                                | Appels MQGet MQ                                |
| zos.mq.mqput.cpu.time_ms                          | Temps CPU MQPut MQ                             |
| zos.mq.mqput.elapsed.time_ms                      | Temps écoulé MQPut MQ                         |
| zos.mq.mqput.log.forced.wait.time_ms              | temps d'attente forcé du log MQPut MQ                 |
| zos.mq.mqput.log.forced.writes                    | Écritures forcées du log MQPut MQ                    |
| zos.mq.mqput.log.wait.time_ms                     | Temps d'attente du log MQPut MQ                        |
| zos.mq.mqput.log.writes                           | Écritures du log MQPut MQ                           |
| zos.mq.mqput.message.max.size_bytes               | Taille maximale du message MQPut MQ                     |
| zos.mq.mqput.message.min.size_bytes               | Taille minimale du message MQPut MQ                     |
| zos.mq.mqput.pageset.elapsed.time_ms              | Temps écoulé pageset MQPut MQ                 |
| zos.mq.mqput.pageset.writes                       | Écritures du pageset MQPut MQ                       |
| zos.mq.mqput.suspended.calls                      | Appels suspendus MQPut MQ                      |
| zos.mq.mqput.wait.time_ms                         | Temps d'attente MQPut MQ                            |
| zos.mq.mqput1.calls                               | Appels MQPut1 MQ                               |
| zos.mq.mqput1.cpu.time_ms                         | Temps CPU MQPut1 MQ                            |
| zos.mq.mqput1.elapsed.time_ms                     | Temps écoulé MQPut1 MQ                        |
| zos.mq.mqput1.log.forced.wait.time_ms             | temps d'attente forcé du log MQPut1 MQ                |
| zos.mq.mqput1.log.forced.writes                   | Écritures forcées du log MQPut1 MQ                   |
| zos.mq.mqput1.log.wait.time_ms                    | Temps d'attente du log MQPut1 MQ                       |
| zos.mq.mqput1.log.writes                          | Écritures du log MQPut1 MQ                          |
| zos.mq.mqput1.pageset.wait.time_ms                | Temps d'attente pageset MQPut1 MQ                   |
| zos.mq.mqput1.pageset.writes                      | Écritures du pageset MQPut1 MQ                      |
| zos.mq.mqput1.suspended.calls                     | Appels suspendus MQPut1 MQ                     |
| zos.mq.mqput1.wait.time_ms                        | Temps d'attente MQPut1 MQ                           |
| zos.mq.mqset.calls                                | Appels MQSet MQ                                |
| zos.mq.mqset.cpu.time_ms                          | Temps CPU MQSet MQ                             |
| zos.mq.mqset.elapsed.time_ms                      | Temps écoulé MQSet MQ                         |
| zos.mq.mqset.log.forced.wait.time_ms              | temps d'attente forcé du log MQSet MQ                 |
| zos.mq.mqset.log.forced.writes                    | Écritures forcées du log MQSet MQ                    |
| zos.mq.mqset.log.wait.time_ms                     | Temps d'attente du log MQSet MQ                        |
| zos.mq.mqset.log.writes                           | Écritures du log MQSet MQ                           |
| zos.mq.mqsub.selection.calls                      | Appels de sélection MQSub MQ                      |
| zos.mq.pageset                                    | Pageset MQ                                    |
| zos.mq.put.delayed_messages                       | Messages retardés MQ Put                       |
| zos.mq.put.errors                                 | Erreurs MQ Put                                 |
| zos.mq.put.successful_calls                       | Appels réussis MQ Put                       |
| zos.mq.qsg_type                                   | Type QSG MQ                                   |
| zos.mq.queue.index_type                           | Type dʼindex de file MQ                           |
| zos.mq.queue.max_depth                            | Profondeur maximale de file MQ                            |
| zos.mq.topic.mqclose.srb.cpu.time_ms              | Temps CPU SRB MQClose MQ Topic                 |
| zos.mq.topic.mqopen.srb.cpu.time_ms               | Temps CPU SRB MQOpen MQ Topic                  |
| zos.mq.topic.mqput.srb.cpu.time_ms                | Temps CPU SRB MQPut MQ Topic                   |
| zos.mq.topic.mqput1.srb.cpu.time_ms               | Temps CPU SRB MQPut1 MQ Topic                  |
| zos.mq.topic.published_messages                   | Messages publiés MQ Topic                   |
| zos.network.id                                    | ID du réseau z/OS                               |
| zos.racf.group.id                                 | ID du groupe RACF z/OS                            |
| zos.subsystem.name                                | Nom du sous-système z/OS                           |
| zos.tape.mounts                                   | Montages de bande z/OS                              |
| zos.uow                                           | UOW z/OS                                      |
| zos.user.id                                       | ID de l'utilisateur z/OS                                  |
| zos.user.name                                     | Nom de l'utilisateur z/OS                                |
| zos.vtam.application.id                           | ID d'application VTAM                           |
| zos.wlm.report.class.name                         | Nom de la classe du rapport WLM                         |
| zos.wlm.service.class.name                        | Nom de la classe du service WLM                        |
| zos.ziip.time_ms                                  | Temps ZIIP z/OS                                |


### Métriques de mainframe

* [Métriques dʼinfrastructure][11] 
    * Surveille l'utilisation des ressources dans le système z/OS. Les métriques dʼinfrastructure prennent en charge l'utilisation et la contention des CPU (tels que les processeurs généraux et les moteurs zIIP).

* [Métriques z/OS Connect][5]
    * Surveille l'activité et les performances des serveurs z/OS Connect, notamment les requêtes entrantes, les codes de retour, les méthodes de requête, la latence du serveur et la latence du fournisseur service (tel que SOR). 

* [Métriques MQ][13]
    * Surveille l'activité des gestionnaires de files d'attente MQ sur z/OS et l'état de leurs ressources (telles que le stockage, les pools de mémoire tampon, les logs et les canaux).

Ce n'est pas la métrique que vous recherchez ? Il manque une fonctionnalité essentielle pour votre organisation ? Envoyez-nous une demande de fonctionnalité à [ziris@mainstorconcept.com][2].

### Offres entreprise privées

* E-mail : [mainstorconcept GmbH][2]
* Téléphone : +49 721 7907610

### Licence

Une fois votre offre d'essai commencée, vous recevrez votre licence d'essai z/IRIS par e-mail sous 24 heures.

### Validation

Vérifiez que les composants pertinents sont disponibles et répondent aux [exigences minimales][14].

## Assistance

Pour obtenir de l'aide ou demander l'ajout d'une fonctionnalité, contactez z/IRIS via les canaux suivants :

- Email : [support@mainstorconcept.com][20] ou [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com) pour une démonstration ou pour des questions sur les fonctionnalités de z/IRIS avec Datadog
- Assistance : [Portail Mainstorconcept][21]

### Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller les performances du mainframe avec lʼoffre de mainstorconcept dans le Marketplace Datadog][22]

[1]: https://www.mainstorconcept.com/z-iris-mainframe-observability/z-iris-datadog/?lang=en
[2]: mailto:ziris@mainstorconcept.com
[3]: https://public.mainstorconcept.com/home/observability-with-datadog
[4]: https://public.mainstorconcept.com/home/distributed-db2-for-z-os-observability
[5]: https://public.mainstorconcept.com/home/z-os-connect-observability
[6]: https://public.mainstorconcept.com/home/z-os-work-observability
[7]: https://public.mainstorconcept.com/home/ibm-mq-for-z-os-observability
[8]: https://public.mainstorconcept.com/home/cics-transaction-observability
[9]: https://docs.datadoghq.com/fr/tracing/trace_explorer/
[10]: https://docs.datadoghq.com/fr/watchdog/
[11]: https://public.mainstorconcept.com/home/rmf-metrics-streaming
[12]: https://public.mainstorconcept.com/home/z-os-connect-metrics-streaming
[13]: https://public.mainstorconcept.com/home/mq-metrics-streaming
[14]: https://public.mainstorconcept.com/home/troubleshooting-opentelemetry-integration
[15]: https://public.mainstorconcept.com/home/irontap-image
[16]: https://public.mainstorconcept.com/home/configure-irontap-container 
[17]: https://public.mainstorconcept.com/home/install-z-iris-clients
[18]: https://public.mainstorconcept.com/home/configure-z-iris-clients
[19]: https://public.mainstorconcept.com/home/z-iris-client-started-task
[20]: mailto:support@mainstorconcept.com
[21]: https://service.mainstorconcept.com/mscportal/login
[22]: https://www.datadoghq.com/blog/mainframe-monitoring-mainstorconcept-datadog-marketplace/
[23]: https://docs.datadoghq.com/fr/watchdog/
[24]: https://docs.datadoghq.com/fr/tracing/services/services_map/

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">Cliquez ici</a> pour l'acheter.