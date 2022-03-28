---
"app_id": "mainstorconcept-ziris"
"app_uuid": "dc8b4d40-72a3-46c2-9f9a-ffaadaeacb83"
"assets":
  "dashboards":
    "JDBC and z/OS": assets/dashboards/JDBC_Dashboard.json
    "z/OS Connect Metrics": assets/dashboards/z_OS_Connect_Metrics.json
  "integration":
    "configuration": {}
    "events":
      "creates_events": false
    "metrics":
      "check": mainstorconcept.zos.connect.basic.elapsed_time
      "metadata_path": metadata.csv
      "prefix": mainstorconcept.zos.
    "service_checks":
      "metadata_path": assets/service_checks.json
    "source_type_name": mainstorconcept-ziris
"author":
  "homepage": "https://mainstorconcept.com"
  "name": mainstorconcept GmbH
  "sales_email": sales@mainstorconcept.com
  "support_email": support@mainstorconcept.com
  "vendor_id": mainstorconcept
"categories":
- marketplace
- mainframe
- tracing
- monitoring
"classifier_tags":
- "Supported OS::Linux"
- "Supported OS::IBM z/OS"
- "Category::Marketplace"
- "Category::Mainframe"
- "Category::Tracing"
- "Category::Monitoring"
- "Offering::Integration"
"dependencies": []
"display_on_public_website": true
"draft": false
"git_integration_title": "mainstorconcept_ziris"
"integration_id": "mainstorconcept-ziris"
"integration_title": "z/IRIS"
"integration_version": ""
"is_public": true
"kind": "integration"
"legal_terms":
  "eula": EULA.pdf
"manifest_version": "2.0.0"
"name": "mainstorconcept_ziris"
"oauth": {}
"pricing":
- "billing_type": flat_fee
  "includes_assets": false
  "product_id": ziris
  "short_description": Prix valable pour un mainframe de 50 MSU maximum. Si votre système est plus important, contactez sales@mainstorconcept.com pour bénéficier d'une offre entreprise spécialisée.
  "unit_price": !!float "4350.0"
"public_title": "z/IRIS"
"short_description": "Recueille les données de performance à partir du mainframe et les transmet à Datadog"
"supported_os":
- linux
- ibm z/os
"tile":
  "configuration": "README.md#Setup"
  "description": Recueille les données de performance à partir du mainframe et les transmet à Datadog
  "media":
  - "caption": z/IRIS - Observabilité du mainframe
    "image_url": images/thumbnail_mainstorconcept_ziris.PNG
    "media_type": video
    "vimeo_id": !!int "630489680"
  - "caption": z/OS et dashboard JDBC
    "image_url": images/datadog_Dashboard_JDBC.PNG
    "media_type": image
  - "caption": Dashboard z/OS Connect
    "image_url": images/datadog_Dashboard_z_OS_Connect.PNG
    "media_type": image
  - "caption": z/IRIS - Observabilité du mainframe
    "image_url": images/thumbnail_mainstorconcept_ziris.PNG
    "media_type": image
  - "caption": "z/IRIS: Component Design"
    "image_url": images/datadog_ziris_opentelemetry_traces.PNG
    "media_type": image
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": z/IRIS
---



## Présentation


[z/IRIS](https://www.mainstorconcept.com/mainframe/z-iris-mainframe-observability) est une solution logicielle sous forme de plug-in qui permet de surveiller les performances du mainframe en dehors de celui-ci.

Les équipes DevOps ont besoin d'analyser les performances du mainframe pour leurs applications professionnelles afin d'élaborer des stratégies pour optimiser ces performances.
L'observabilité du mainframe pour les DevOps est l'un des concepts clés de z/IRIS. Les équipes peuvent s'en servir pour évaluer l'utilisation des ressources du mainframe, analyser ses performances en continu, et mettre en corrélation les métriques et données liées à leurs différentes applications via Datadog.

### Db2 for z/OS distribué
* Observabilité de JDBC avec Db2 for z/OS grâce au tracing :
    * Détection intelligente des deadlocks et envoi d'alertes
    * Surveillance des performances
    * Analyse des performances de JDBC

### Observabilité de z/OS Connect
* Tracing des requêtes d'API REST traitées sur le mainframe :
    * Détermination des latences au sein des systèmes du mainframe
    * Analyse approfondie des applications basée sur les métadonnées
* Diffusion de métriques supplémentaires pour une expérience utilisateur améliorée

### Observabilité de z/OS Work
* Observabilité des tâches groupées sur le mainframe
* Surveillance des espaces d'adressage et des sous-systèmes
* Tracing des activités des utilisateurs TSO

### Métriques z/OS RMF
* Distribution de la file d'attente des unités de travail in-ready par système
* Contention du CPU par système
* Utilisation du CPU par système


### Données collectées

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

Ce n'est pas la métrique que vous recherchez ? Une fonctionnalité importante pour votre organisation est manquante ? Envoyez-nous une demande à l'adresse [info@mainstorconcept.com](mailto:info@mainstorconcept.com).


## Assistance

Si vous avez des questions concernant z/IRIS, ouvrez une [demande d'assistance](https://service.mainstorconcept.com/mscportal/login)
ou contactez-nous à l'adresse [support@mainstorconcept.com](mailto:support@mainstorconcept.com).

Si vous souhaitez planifier une démonstration, contactez-nous à l'adresse [sales@mainstorconcept.com](mailto:sales@mainstorconcept.com).

