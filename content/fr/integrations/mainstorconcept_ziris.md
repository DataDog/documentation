---
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
- marketplace
- mainframe
- tracing
- monitoring
dependencies: []
display_on_public_website: true
draft: true
git_integration_title: mainstorconcept_ziris
integration_id: mainstorconcept-ziris
integration_title: z/IRIS
integration_version: ''
is_public: true
kind: integration
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
  unit_price: 4800.0
public_title: z/IRIS
short_description: Recueille les données de performance du système d'exploitation
  IBM z/OS à partir des mainframes
supported_os:
- linux
- ibm z/os
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::IBM z/OS
  - Category::Marketplace
  - Category::Mainframe
  - Category::Tracing
  - Category::Monitoring
  - Offering::Integration
  configuration: README.md#Setup
  description: Recueille les données de performance du système d'exploitation IBM
    z/OS à partir des mainframes
  media:
  - caption: z/IRIS - Observabilité du mainframe
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: video
    vimeo_id: 630489680
  - caption: z/OS et dashboard JDBC
    image_url: images/datadog_Dashboard_JDBC.PNG
    media_type: image
  - caption: Gestionnaire de pools de buffers MQ z/OS
    image_url: images/datadog_Dashboard_z_OS_MQ_Buffer_Pool_Manager.png
    media_type: image
  - caption: Gestionnaire de logs MQ z/OS
    image_url: images/datadog_Dashboard_z_OS_MQ_Log_Manager.png
    media_type: image
  - caption: Dashboard z/OS Connect
    image_url: images/datadog_Dashboard_z_OS_Connect.PNG
    media_type: image
  - caption: Dashboard sur l'infrastructure z/OS
    image_url: images/datadog_Dashboard_z_OS_Infrastructure.png
    media_type: image
  - caption: z/IRIS - Observabilité du mainframe
    image_url: images/thumbnail_mainstorconcept_ziris.PNG
    media_type: image
  - caption: 'z/IRIS: Component Design'
    image_url: images/datadog_ziris_opentelemetry_traces.PNG
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: z/IRIS
  uninstallation: README.md#Uninstallation
---



## Présentation

[z/IRIS](https://www.mainstorconcept.com/mainframe/z-iris-mainframe-observability/z-iris-datadog/?lang=en) est une solution logicielle sous forme de plug-in qui permet de surveiller les performances du mainframe en dehors de celui-ci.

Les équipes DevOps ont besoin d'analyser les performances du mainframe pour leurs applications professionnelles afin d'élaborer des stratégies pour optimiser ces performances. L'observabilité du mainframe pour les DevOps est l'un des concepts clés de z/IRIS. Les équipes peuvent s'en servir pour évaluer l'utilisation des ressources du mainframe, analyser ses performances en continu et mettre en corrélation les métriques et données liées à leurs différentes applications via Datadog.

Après avoir activé z/IRIS, les utilisateurs Datadog peuvent effectuer les opérations suivantes :
* Identifier les applications qui dépendent des services et applications hébergés sur le mainframe.
* Surveiller les latences dans les services hébergés sur le mainframe jusqu'à un niveau de requête.
* Créer des monitors qui réagissent en cas d'anomalies et de dépassement de seuils correspondant aux SLI de votre organisation.
* Analyser les performances des applications hébergées sur le mainframe de bout en bout dans le cadre du service métier.

### Méthodes d'intégration

La solution z/IRIS utilise les deux méthodes suivantes pour s'intégrer à Datadog :

* **OpenTelemetry (OTEL) :** Il s'agit d'un cadre d'observabilité entièrement pris en charge par Datadog qui standardise les intégrations APM. En configurant z/IRIS, vous pouvez facilement transmettre des traces et des métriques vers un collector OpenTelemetry qui va ensuite les exporter vers votre environnement Datadog.
* **API Datadog (version Bêta) :** Les utilisateurs peuvent également choisir de transmettre les traces et les événements via respectivement l'API de l'Agent Datadog et l'API HTTP REST. Cette méthode d'intégration vous permet d'accélérer le processus de démonstration de faisabilité si OpenTelemetry n'est pas encore disponible dans votre organisation.

Pour en savoir plus sur les différentes intégrations de z/IRIS, consultez notre [documentation](https://public.mainstorconcept.com/home/Observability-with-Datadog.1383596033.html) (en anglais).

### Données collectées

### Traces

Les traces APM indiquent quand une requête a été reçue et traitée par un service. Elles permettent également de décrire les relations des applications entre les niveaux de services et l'infrastructure. Les traces créées par z/IRIS fournissent ces informations pour les applications hébergées sur le mainframe. En intégrant les normes de l'industrie et en utilisant les puissantes capacités de mise en corrélation et d'unification de Datadog, l'expérience utilisateur reste la même, quelle que soit l'interface utilisée.

Les systèmes du mainframe suivants sont pris en charge par le tracing z/IRIS. La documentation correspondante contient des informations sur chaque fonctionnalité de tracing, notamment les tags et les structures de la trace :

* [Db2 for z/OS distribué](https://public.mainstorconcept.com/home/Distributed-Db2-for-z%2FOS-Observability.1121746973.html) (en anglais)
* [z/OS Connect](https://public.mainstorconcept.com/home/z%2FOS-Connect-Observability.641040548.html) (en anglais)
* [Tâches groupées et session utilisateur TSO](https://public.mainstorconcept.com/home/z%2FOS-Work-observability.1148813324.html) (en anglais)


### Tags de trace

|Nom du tag de trace                        | Description                    |
|--------------------------------------|--------------------------------|
|zos.connect.api.name                  | Nom de l'API de z/OS Connect       | 
|zos.connect.api.version               | Version de l'API de z/OS Connect    |
|zos.connect.request.id                | ID de la requête                     |
|zos.connect.request.timed_out         | Expiration de la requête               | 
|zos.connect.request.user_name         | Nom d'utilisateur de la requête              | 
|zos.connect.service.name              | Nom du service                   | 
|zos.connect.service.version           | Version du service                | 
|zos.connect.service_provider.name     | Nom du fournisseur du service          | 
|zos.connect.sor.identifier            | Identifiant SOR                 |  
|zos.connect.sor.reference             | Référence SOR                  |  
|zos.connect.sor.request.received_time | Requête SOR reçue           |  
|zos.connect.sor.request.sent_time     | Date d'envoi de la requête SOR          |  
|zos.connect.sor.resource              | Ressource SOR                   |  
|zos.job.class                         | Catégorie de la tâche z/OS                 |  
|ziris.job.identifier                  | Identifiant de la tâche z/OS            |  
|zos.jes.job.correlator                | Corrélateur de tâches JES             |  
|zos.job.step.cpu.units                | Unités CPU de l'étape z/OS            |  
|zos.job.step.program_name             | Nom du programme de l'étape de tâche z/OS     |  
|zos.job.step.ended                    | Fin de l'étape de tâche z/OS            |  
|zos.job.step.name                     | Nom de l'étape de tâche z/OS             |  
|zos.job.step.number                   | Numéro de l'étape de tâche z/OS           |  
|zos.job.step.cpu.time_ms              | Temps CPU de l'étape de tâche z/OS         |  
|zos.job.step.ziip.time_ms             | Temps ZIIP de l'étape de tâche z/OS        |  
|zos.tape.mounts                       | Montages de bande z/OS               |  
|zos.job.step.return_code              | Code de retour de l'étape de tâche z/OS      |  
|zos.racf.group.id                     | ID du groupe RACF z/OS             |  
|zos.user.id                           | ID de l'utilisateur z/OS                   |  
|zos.user.name                         | Nom de l'utilisateur z/OS                 |  
|host.name                             | Nom du host                      |  
|http.method                           | Méthode HTTP                    |  
|http.response_content_length          | Longueur du contenu de la réponse HTTP   |  
|http.request_content_length           | Longueur du contenu de la requête HTTP    |  
|http.status_code                      | Code de statut HTTP               |  
|http.client_ip                        | IP du client HTTP                 |  
|db.system                             | Système de base de données                      |  
|net.peer.ip                           | IP du pair réseau                    |  
|net.peer.port                         | Port du pair réseau                  |  
|enduser.id                            | ID de l'utilisateur final                    |  
|db.db2.collection.id                  | ID de la collection Db2              |  
|db.db2.instance_name                  | Nom de l'instance Db2              |  
|db.user                               | Utilisateur de la base de données                        |  
|zos.db2.wait.time_ms                  | Temps d'attente de Db2                  |  
|zos.db2.unlock.requests               | Requête de déverrouillage Db2             |  
|zos.db2.sql.storedprocedure.statements| Procédure stockée SQL Db2       |  
|zos.db2.start.timestamp               | Timestamp de début Db2            |  
|zos.db2.end.timestamp                 | Timestamp de fin Db2              |  
|zos.db2.response.time_ms              | Temps de réponse Db2              |  
|zos.db2.elapsed.time_ms               | Temps écoulé Db2               |  
|zos.cpu.time_ms                       | Temps CPU                       |  
|zos.db2.abort.requests                | Requête d'abandon Db2              |  
|zos.db2.su.factor                     | Facteur SU Db2                  |  
|zos.db2.workload.service.class.name   | Nom de la catégorie de service de la charge de travail Db2|  
|zos.db2.cpu.time_ms                   | Temps CPU Db2                   |  
|zos.ziip.time_ms                      | Temps ZIIP                      |  
|zos.db2.ziip.time_ms                  | Temps ZIIP Db2                  |  
|zos.db2.remote.location.name          | Nom de l'emplacement distant Db2       |  
|zos.db2.product.id                    | ID de produit Db2                 |  
|zos.db2.sent.bytes                    | Octets envoyés Db2                 |  
|zos.db2.received.bytes                | Octets reçus Db2             |  
|zos.db2.client.application.name       | Nom de l'application client Db2    |  
|zos.db2.client.platform               | Plateforme client Db2            |  
|zos.db2.client.auth.id                | ID d'authentification du client Db2             |  
|zos.db2.sql.prepare.statements        | Instruction SQL prepare Db2      |  
|zos.db2.sql.open.statements           | Instruction SQL open Db2         |  
|zos.db2.sql.lock.statements           | Instruction SQL lock Db2         |  
|zos.db2.connection.id                 | ID de connexion Db2              |  
|zos.db2.consistency.token             | Consistency token Db2          | 
|zos.correlation.id                    | ID de corrélation Db2             |  
|zos.db2.plan.name                     | Nom du plan Db2                  |  
|zos.db2.program.name                  | Nom du programme Db2               |  
|zos.db2.lock.state                    | Statut de verrouillage Db2                 |  
|zos.db2.statement.id                  | ID de l'instruction Db2               |  
|zos.db2.statement.type                | Type d'instruction Db2             |  
|zos.db2.thread.token                  | Token du thread Db2               |  
|zos.uow                               | UOW                            |  
|zos.db2.lock.request                  | Requête de verrouillage Db2               |  
|zos.db2.lock.duration                 | Durée de verrouillage Db2              |  
|zos.db2.deadlock.resources            | Ressources deadlock Db2         |  
|zos.db2.ace                           | ACE Db2                        |  
|zos.db2.location.name                 | Nom de l'emplacement Db2              |  
|zos.db2.luw.id                        | ID LUW Db2                     |  
|zos.db2.uniqueness.value              | Valeur d'unicité Db2           |  
|zos.db2.version                       | Version de Db2                    |  
|zos.lu.name                           | Nom de l'unité logique                        |  
|zos.network.id                        | ID du réseau z/OS                |  
|zos.subsystem.name                    | Nom du sous-système z/OS            |  


### Métriques de mainframe

* [Métriques RMF](https://public.mainstorconcept.com/home/RMF-Metrics-Streaming.636715153.html) 
    * Les métriques RMF offrent des données sur l'utilisation des ressources, avec la possibilité de personnaliser l'intervalle et le niveau de détail.

* [Métriques z/OS Connect](https://public.mainstorconcept.com/home/z%2FOS-Connect-Metrics-Streaming.641040425.html)
    * z/IRIS diffuse les métriques créées à partir des données des entrées IBM z/OS Connect SMF type 123 versions 1 et 2. 

* [Métriques MQ](https://public.mainstorconcept.com/home/MQ-Metrics-Streaming.1424359429.html)
    * Les entrées statistiques MQ (SMF type 115) contiennent une multitude de statistiques provenant de différentes ressources du système. Les nouvelles métriques z/OS MQ de z/IRIS tiennent avant tout compte des indicateurs de performances essentiels pour répondre à vos besoins en matière de surveillance, d'analyse et d'alerte.

Ce n'est pas la métrique que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? Envoyez-nous une demande à l'adresse [info@mainstorconcept.com](mailto:info@mainstorconcept.com).

### Offres entreprise privées

* E-mail : [mainstorconcept GmbH](mailto:ziris@mainstorconcept.com)
* Téléphone : +49 721 7907610

### Licence

Une fois votre offre d'essai commencée, vous recevrez votre licence d'essai z/IRIS par e-mail sous 24 heures.

### Validation

Vérifiez que les composants requis sont disponibles et qu'ils répondent aux [exigences minimales](https://public.mainstorconcept.com/home/Troubleshooting-OpenTelemetry-integration.1121812489.html).

## Assistance

Les clients bénéficiant d'une offre d'essai ou d'une licence peuvent obtenir de l'aide en [effectuant une demande d'assistance](https://service.mainstorconcept.com/mscportal/login) ou en nous contactant à l'adresse [support@mainstorconcept.com](mailto:support@mainstorconcept.com).

Si vous souhaitez organiser une démonstration de z/IRIS pour votre équipe ou que vous avez des questions sur les capacités de z/IRIS lorsqu'il est associé à Datadog, contactez [ziris@mainstorconcept.com](mailto:ziris@mainstorconcept.com).

---
Cette application est disponible sur le Marketplace et développée par un partenaire technologique de Datadog. <a href="https://app.datadoghq.com/marketplace/app/mainstorconcept-ziris" target="_blank">Cliquez ici</a> pour l'acheter.