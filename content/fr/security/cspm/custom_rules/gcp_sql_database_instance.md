---
aliases:
- /fr/security_platform/cspm/custom_rules/gcp_sql_database_instance
kind: documentation
title: gcp_sql_database_instance
---

## `ancestors`
**Type** : `UNORDERED_LIST_STRING`<br>
## `available_maintenance_versions`
**Type** : `UNORDERED_LIST_STRING`<br>
    **Description** : Liste de toutes les versions de maintenance applicables sur l'instance<br>
    **Nom GCP** : `availableMaintenanceVersions`<br>
## `backend_type`
**Type** : `STRING`<br>
    **Description** : Le type de backend. `SECOND_GEN` : Instance de base de données Cloud SQL. `EXTERNAL` : Un serveur de base de données non géré par Google. Cette propriété est en lecture seule ; utilisez la propriété `tier` dans l'objet `settings` pour déterminer le type de base de données. <br>
    **Nom GCP** : `backendType`<br>
        **Valeurs autorisées** :<br>
  - `SQL_BACKEND_TYPE_UNSPECIFIED` - Type de backend inconnu pour l'instance.<br>
  - `FIRST_GEN` - Instance Speckle v1.<br>
  - `SECOND_GEN` - Instance Speckle v2.<br>
  - `EXTERNAL` - Instance sur site.<br>
## `connection_name`
**Type** : `STRING`<br>
    **Description** : Nom de connexion de l'instance Cloud SQL utilisé dans les chaînes de connexion.<br>
    **Nom GCP** : `connectionName`<br>
## `create_time`
**Type** : `TIMESTAMP`<br>
    **Description** : Sortie uniquement. La date de création de l'instance au format [RFC 3339][1], par exemple : `2012-11-15T16:19:00.094Z`.<br>
    **Nom GCP** : `createTime`<br>
## `current_disk_size`
**Type** : `INT64`<br>
    **Description** : L'utilisation actuelle du disque par l'instance en octets. Cette propriété est désormais obsolète. Utilisez la métrique `cloudsql.googleapis.com/database/disk/bytes_used` dans l'API Cloud Monitoring à la place. Consultez [cette annonce][2] pour en savoir plus.<br>
    **Nom GCP** : `currentDiskSize`<br>
## `database_installed_version`
**Type** : `STRING`<br>
    **Description** : Sortie uniquement. Enregistre la version de la base de données actuellement exécutée sur l'instance, y compris la version mineure. Exemple : `MYSQL_8_0_18`.<br>
    **Nom GCP** : `databaseInstalledVersion`<br>
## `database_version`
**Type** : `STRING`<br>
    **Description** : Type et version du moteur de base de données. Le champ `databaseVersion` ne peut pas être modifié après la création de l'instance. <br>
    **Nom GCP** : `databaseVersion`<br>
        **Valeurs autorisées** :<br>
  - `SQL_DATABASE_VERSION_UNSPECIFIED` - Version de la base de données inconnue.<br>
  - `MYSQL_5_1` - La version de la base de données est MySQL 5.1.<br>
  - `MYSQL_5_5` - La version de la base de données est MySQL 5.5.<br>
  - `MYSQL_5_6` - La version de la base de données est MySQL 5.6.<br>
  - `MYSQL_5_7` - La version de la base de données est MySQL 5.7.<br>
  - `POSTGRES_9_6` - La version de la base de données est PostgreSQL 9.6.<br>
  - `POSTGRES_11` - La version de la base de données est PostgreSQL 11.<br>
  - `SQLSERVER_2017_STANDARD` - La version de la base de données est SQL Server 2017 Standard.<br>
  - `SQLSERVER_2017_ENTERPRISE` - La version de la base de données est SQL Server 2017 Enterprise.<br>
  - `SQLSERVER_2017_EXPRESS` - La version de la base de données est SQL Server 2017 Express.<br>
  - `SQLSERVER_2017_WEB` - La version de la base de données est SQL Server 2017 Web.<br>
  - `POSTGRES_10` - La version de la base de données est PostgreSQL 10.<br>
  - `POSTGRES_12` - La version de la base de données est PostgreSQL 12.<br>
  - `MYSQL_8_0` - La version de la base de données est MySQL 8.<br>
  - `MYSQL_8_0_18` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 18.<br>
  - `MYSQL_8_0_26` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 26.<br>
  - `MYSQL_8_0_27` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 27.<br>
  - `MYSQL_8_0_28` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 28.<br>
  - `MYSQL_8_0_29` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 29.<br>
  - `POSTGRES_13` - La version de la base de données est PostgreSQL 13.<br>
  - `POSTGRES_14` - La version de la base de données est PostgreSQL 14.<br>
  - `SQLSERVER_2019_STANDARD` - La version de la base de données est SQL Server 2019 Standard.<br>
  - `SQLSERVER_2019_ENTERPRISE` - La version de la base de données est SQL Server 2019 Enterprise.<br>
  - `SQLSERVER_2019_EXPRESS` - La version de la base de données est SQL Server 2019 Express.<br>
  - `SQLSERVER_2019_WEB` - La version de la base de données est SQL Server 2019 Web.<br>
## `disk_encryption_configuration`
  **Type** : `STRUCT`<br>
  **Description** : La configuration du chiffrement du disque pour une instance spécifique.<br>
  **Nom GCP** : `diskEncryptionConfiguration`
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#diskEncryptionConfiguration`.<br>
        **Nom GCP** : `kind`<br>
   - `kms_key_name`<br>
    **Type** : `STRING`<br>
        **Description** : Nom de ressource de la clé KMS pour le chiffrement du disque<br>
        **Nom GCP** : `kmsKeyName`<br>
## `disk_encryption_status`
  **Type** : `STRUCT`<br>
  **Description** : Le statut du chiffrement du disque pour une instance spécifique.<br>
  **Nom GCP** : `diskEncryptionStatus`
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#diskEncryptionStatus`.<br>
        **Nom GCP** : `kind`<br>
   - `kms_key_version_name`<br>
    **Type** : `STRING`<br>
        **Description** : Version de la clé KMS utilisée pour chiffrer la ressource de l'instance Cloud SQL<br>
        **Nom GCP** : `kmsKeyVersionName`<br>
## `etag`
**Type** : `STRING`<br>
    **Description** : Ce champ est obsolète et sera supprimé dans une prochaine version de l'API. Utilisez le champ `settings.settingsVersion` à la place.<br>
    **Nom GCP** : `etag`<br>
## `failover_replica`
  **Type** : `STRUCT`<br>
  **Description** : Le nom et le statut du réplica de failover.<br>
  **Nom GCP** : `failoverReplica`
   - `available`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Le statut de disponibilité du réplica de failover. Un statut false indique que le réplica de failover est désynchronisé. Pour que le basculement de l'instance principale vers le réplica de failover soit possible, le statut doit correspondre à true.<br>
        **Nom GCP** : `available`<br>
   - `name`<br>
    **Type** : `STRING`<br>
      **Description** : Le nom du réplica de failover. Si cette propriété est spécifiée à la création de l'instance, un réplica de failover est créé pour l'instance. Le nom n'inclut pas l'ID de projet.<br>
        **Nom GCP** : `name`<br>
## `gce_zone`
**Type** : `STRING`<br>
    **Description** : La zone Compute Engine qui héberge actuellement l'instance. Cette valeur peut être différente de la zone spécifiée lors de la création de l'instance en cas de failover de l'instance vers sa zone secondaire. AVERTISSEMENT : La modification de cette valeur peut entraîner le redémarrage de l'instance.<br>
    **Nom GCP** : `gceZone`<br>
## `instance_type`
**Type** : `STRING`<br>
    **Description** : Le type d'instance. <br>
    **Nom GCP** : `instanceType`<br>
        **Valeurs autorisées** :<br>
  - `SQL_INSTANCE_TYPE_UNSPECIFIED` - Le type d'instance Cloud SQL est inconnu.<br>
  - `CLOUD_SQL_INSTANCE` - Une instance Cloud SQL standard sans réplication à partir d'une instance principale.<br>
  - `ON_PREMISES_INSTANCE` - Une instance exécutée sur le site du client qui n'est pas générée par Cloud SQL.<br>
  - `READ_REPLICA_INSTANCE` - Une instance Cloud SQL utilisée comme réplica avec accès en lecture.<br>
## `ip_addresses`
  **Type** : `UNORDERED_LIST_STRUCT`<br>
  **Description** : Les adresses IP affectées à l'instance.<br>
  **Nom GCP** : `ipAddresses`
   - `ip_address`<br>
    **Type** : `STRING`<br>
        **Description** : L'adresse IP affectée.<br>
        **Nom GCP** : `ipAddress`<br>
   - `time_to_retire`<br>
    **Type** : `TIMESTAMP`<br>
        **Description** : La date à laquelle cette IP doit être retirée, au format [RFC 3339][1]. Exemple : `2012-11-15T16:19:00.094Z`. Ce champ est uniquement disponible lorsque l'IP est programmée pour être retirée.<br>
        **Nom GCP** : `timeToRetire`<br>
   - `type`<br>
    **Type** : `STRING`<br>
        **Description** : Le type d'adresse IP. Une adresse `PRIMARY` est une adresse publique qui peut accepter les connexions entrantes. Une adresse `PRIVATE` est une adresse privée qui peut accepter les connexions entrantes. Une adresse `OUTGOING` est l'adresse source des connexions en provenance de l'instance, si ce type est pris en charge. <br>
        **Nom GCP** : `type`<br>
            **Valeurs autorisées** :<br>
      - `SQL_IP_ADDRESS_TYPE_UNSPECIFIED` - Le type d'adresse IP est inconnu.<br>
      - `PRIMARY` - Adresse IP à laquelle le client est censé se connecter. Il s'agit généralement de l'adresse IP de l'équilibreur de charge.<br>
      - `OUTGOING` - Adresse IP source de la connexion qu'un réplica avec accès en lecture établit avec son instance principale externe. Cette adresse IP peut être ajoutée à une liste d'autorisations par le client s'il utilise un pare-feu pour filtrer les connexions entrantes vers son instance principale sur site.<br>
      - `PRIVATE` - Adresse IP privée utilisée lorsque les IP privées et le peering réseau sont activés.<br>
      - `MIGRATED_1ST_GEN` - Adresse IP v1 d'une instance migrée. L'utilisateur est censé retirer cette IP dès que la migration est terminée. Remarque : les instances v1 avec des adresses IP v1 seront considérées comme des adresses PRIMARY.<br>
## `ipv6_address`
**Type** : `STRING`<br>
    **Description** : L'adresse IPv6 allouée à l'instance. (Obsolète) Cette propriété était uniquement applicable aux instances de première génération.<br>
    **Nom GCP** : `ipv6Address`<br>
## `kind`
**Type** : `STRING`<br>
    **Description** : Correspond toujours à `sql#instance`.<br>
    **Nom GCP** : `kind`<br>
## `labels`
**Type** : `UNORDERED_LIST_STRING`<br>
## `maintenance_version`
**Type** : `STRING`<br>
    **Description** : La version logicielle actuelle de l'instance.<br>
    **Nom GCP** : `maintenanceVersion`<br>
## `master_instance_name`
**Type** : `STRING`<br>
    **Description** : Le nom de l'instance utilisée comme instance principale dans le système de réplication.<br>
    **Nom GCP** : `masterInstanceName`<br>
## `max_disk_size`
**Type** : `INT64`<br>
    **Description** : Le volume disque maximum que l'instance peut occuper en octets.<br>
    **Nom GCP** : `maxDiskSize`<br>
## `name`
**Type** : `STRING`<br>
    **Description** : Nom de l'instance Cloud SQL. Cette propriété n'inclut pas l'ID de projet.<br>
    **Nom GCP** : `name`<br>
## `on_premises_configuration`
  **Type** : `STRUCT`<br>
  **Description** : Configuration spécifique aux instances sur site.<br>
  **Nom GCP** : `onPremisesConfiguration`
   - `ca_certificate`<br>
    **Type** : `STRING`<br>
        **Description** : Représentation PEM du certificat x509 de l'autorité de certification de confiance.<br>
        **Nom GCP** : `caCertificate`<br>
   - `client_certificate`<br>
    **Type** : `STRING`<br>
        **Description** : Représentation PEM du certificat x509 du réplica.<br>
        **Nom GCP** : `clientCertificate`<br>
   - `client_key`<br>
    **Type** : `STRING`<br>
        **Description** : Représentation PEM de la clé privée du réplica. La clé publique correspondante est encodée dans le certificat du client.<br>
        **Nom GCP** : `clientKey`<br>
   - `dump_file_path`<br>
    **Type** : `STRING`<br>
        **Description** : Le fichier dump utilisé pour créer le réplica Cloud SQL.<br>
        **Nom GCP** : `dumpFilePath`<br>
   - `host_port`<br>
    **Type** : `STRING`<br>
        **Description** : Host et port de l'instance sur site, au format `host:port`.<br>
        **Nom GCP** : `hostPort`<br>
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#onPremisesConfiguration`.<br>
        **Nom GCP** : `kind`<br>
   - `password`<br>
    **Type** : `STRING`<br>
        **Description** : Le mot de passe pour se connecter à l'instance sur site.<br>
        **Nom GCP** : `password`<br>
   - `source_instance`<br>
      **Type** : `STRUCT`<br>
      **Description** : La référence à l'instance Cloud SQL si la source est Cloud SQL.<br>
      **Nom GCP** : `sourceInstance`
       - `name`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom de l'instance Cloud SQL référencée. Cette propriété n'inclut pas l'ID de projet.<br>
            **Nom GCP** : `name`<br>
       - `project`<br>
        **Type** : `STRING`<br>
            **Description** : L'ID de projet de l'instance Cloud SQL référencée. La valeur par défaut correspond à l'ID de projet tel que référencé par l'instance.<br>
            **Nom GCP** : `project`<br>
       - `region`<br>
        **Type** : `STRING`<br>
            **Description** : La région de l'instance Cloud SQL référencée.<br>
            **Nom GCP** : `region`<br>
   - `username`<br>
    **Type** : `STRING`<br>
        **Description** : Le nom d'utilisateur pour se connecter à l'instance sur site.<br>
        **Nom GCP** : `username`<br>
## `organization_id`
**Type** : `STRING`<br>
## `out_of_disk_report`
  **Type** : `STRUCT`<br>
  **Description** : Ce champ correspond au rapport généré par la tâche de contrôle d'intégrité proactif de la base de données pour les problèmes de type OutOfDisk. **Écriture** : La tâche de contrôle d'intégrité proactif de la base de données pour OOD. **Lecture** : La tâche de contrôle d'intégrité proactif de la base de données.<br>
  **Nom GCP** : `outOfDiskReport`
   - `sql_min_recommended_increase_size_gb`<br>
    **Type** : `INT32`<br>
        **Description** : L'augmentation minimum recommandée du volume en gigaoctets Ce champ est consommé par le frontend. **Écriture** : La tâche de contrôle d'intégrité proactif de la base de données pour OOD. **Lecture** :<br>
        **Nom GCP** : `sqlMinRecommendedIncreaseSizeGb`<br>
   - `sql_out_of_disk_state`<br>
    **Type** : `STRING`<br>
        **Description** : Ce champ correspond à l'état généré par la tâche de contrôle d'intégrité proactif de la base de données pour les problèmes de type OutOfDisk. **Écriture** : La tâche de contrôle d'intégrité proactif de la base de données pour OOD. **Lecture** : La tâche de contrôle d'intégrité proactif de la base de données.<br>
        **Nom GCP** : `sqlOutOfDiskState`<br>
            **Valeurs autorisées** :<br>
      - `SQL_OUT_OF_DISK_STATE_UNSPECIFIED` - État non spécifié.<br>
      - `NORMAL` - L'instance a suffisamment d'espace libre sur le disque de données.<br>
      - `SOFT_SHUTDOWN` - Le disque de données est presque saturé. Un arrêt est effectué pour empêcher toute corruption des données.<br>
## `parent`
**Type** : `STRING`<br>
## `project`
**Type** : `STRING`<br>
    **Description** : L'ID de projet contenant l'instance Cloud SQL. Le domaine Google Apps est ajouté en préfixe le cas échéant.<br>
    **Nom GCP** : `project`<br>
## `project_id`
**Type** : `STRING`<br>
## `project_number`
**Type** : `STRING`<br>
## `region`
**Type** : `STRING`<br>
    **Description** : La région géographique. Valeurs autorisées : `us-central` (instances `FIRST_GEN` uniquement), `us-central1` (instances `SECOND_GEN` uniquement), `asia-east1` ou `europe-west1`. Par défaut, cette propriété est définie sur `us-central` ou `us-central1` en fonction du type d'instance. La région ne peut pas être modifiée une fois l'instance créée.<br>
    **Nom GCP** : `region`<br>
## `replica_configuration`
  **Type** : `STRUCT`<br>
  **Description** : Configuration spécifique aux réplicas de failover et aux réplicas avec accès en lecture.<br>
  **Nom GCP** : `replicaConfiguration`
   - `failover_target`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Spécifie si le réplica est la cible de failover. Si le champ est défini sur `true`, le réplica est désigné comme réplica de failover. En cas de défaillance de l'instance principale, le réplica devient la nouvelle instance principale. Un seul réplica peut être spécifié comme cible de failover, et il doit être situé dans une zone différente de celle de l'instance principale.<br>
        **Nom GCP** : `failoverTarget`<br>
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#replicaConfiguration`.<br>
        **Nom GCP** : `kind`<br>
   - `mysql_replica_configuration`<br>
      **Type** : `STRUCT`<br>
      **Description** : Configuration spécifique à MySQL en cas de réplication à partir d'une instance principale MySQL sur site. Les informations de configuration de la réplication, telles que le nom d'utilisateur, le mot de passe, les certificats et les clés ne sont pas stockées dans les métadonnées de l'instance. Les informations de configuration sont uniquement utilisées pour établir la connexion de réplication et sont stockées par MySQL dans un fichier nommé `master.info` dans le répertoire de données.<br>
      **Nom GCP** : `mysqlReplicaConfiguration`
       - `ca_certificate`<br>
        **Type** : `STRING`<br>
            **Description** : Représentation PEM du certificat x509 de l'autorité de certification de confiance.<br>
            **Nom GCP** : `caCertificate`<br>
       - `client_certificate`<br>
        **Type** : `STRING`<br>
            **Description** : Représentation PEM du certificat x509 du réplica.<br>
            **Nom GCP** : `clientCertificate`<br>
       - `client_key`<br>
        **Type** : `STRING`<br>
            **Description** : Représentation PEM de la clé privée du réplica. La clé publique correspondante est encodée dans le certificat du client.<br>
            **Nom GCP** : `clientKey`<br>
       - `connect_retry_interval`<br>
        **Type** : `INT32`<br>
            **Description** : Temps d'attente en secondes entre les tentatives de connexion. La valeur par défaut de MySQL est de 60 secondes.<br>
            **Nom GCP** : `connectRetryInterval`<br>
       - `dump_file_path`<br>
        **Type** : `STRING`<br>
            **Description** : Chemin vers le fichier dump SQL dans Google Cloud Storage à partir duquel le réplica doit être créé. L'URI est au format `gs://NomDuBucket/NomDuFichier`. Les fichiers gzip compressés (`.gz`) sont également pris en charge. Les dumps contiennent les coordonnées des logs binaires utilisées pour lancer la réplication. Pour ce faire, définissez `--master-data` sur `1` lorsque vous utilisez `mysqldump`.<br>
            **Nom GCP** : `dumpFilePath`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#mysqlReplicaConfiguration`.<br>
            **Nom GCP** : `kind`<br>
       - `master_heartbeat_period`<br>
        **Type** : `INT64`<br>
            **Description** : Intervalle en millisecondes entre les heartbeats de réplication.<br>
            **Nom GCP** : `masterHeartbeatPeriod`<br>
       - `password`<br>
        **Type** : `STRING`<br>
            **Description** : Le mot de passe pour la connexion de réplication.<br>
            **Nom GCP** : `password`<br>
       - `ssl_cipher`<br>
        **Type** : `STRING`<br>
            **Description** : La liste des ciphers pouvant être utilisés pour le chiffrement SSL.<br>
            **Nom GCP** : `sslCipher`<br>
       - `username`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom d'utilisateur pour la connexion de réplication.<br>
            **Nom GCP** : `username`<br>
       - `verify_server_certificate`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si la valeur Common Name de l'instance principale doit être vérifiée dans le certificat envoyé lors de la liaison SSL.<br>
            **Nom GCP** : `verifyServerCertificate`<br>
## `replica_names`
**Type** : `UNORDERED_LIST_STRING`<br>
    **Description** : Les réplicas de l'instance.<br>
    **Nom GCP** : `replicaNames`<br>
## `resource_name`
**Type** : `STRING`<br>
## `root_password`
**Type** : `STRING`<br>
    **Description** : Mot de passe root initial. À utiliser uniquement lors de la création.<br>
    **Nom GCP** : `rootPassword`<br>
## `satisfies_pzs`
**Type** : `BOOLEAN`<br>
    **Description** : Statut indiquant si l'instance est conforme à Pzs. Réservé pour une utilisation future.<br>
    **Nom GCP** : `satisfiesPzs`<br>
## `scheduled_maintenance`
  **Type** : `STRUCT`<br>
  **Description** : La date de début d'une prochaine maintenance prévue pour cette instance.<br>
  **Nom GCP** : `scheduledMaintenance`
   - `can_defer`<br>
    **Type** : `BOOLEAN`<br>
   - `can_reschedule`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Détermine si la maintenance prévue doit être reprogrammée.<br>
        **Nom GCP** : `canReschedule`<br>
   - `schedule_deadline_time`<br>
    **Type** : `TIMESTAMP`<br>
        **Description** : La maintenance ne peut pas être reprogrammée au-delà de cette date limite.<br>
        **Nom GCP** : `scheduleDeadlineTime`<br>
   - `start_time`<br>
    **Type** : `TIMESTAMP`<br>
        **Description** : La date de début d'une prochaine maintenance prévue pour cette instance.<br>
        **Nom GCP** : `startTime`<br>
## `secondary_gce_zone`
**Type** : `STRING`<br>
    **Description** : La zone Compute Engine qui héberge actuellement l'instance de failover pour une instance régionale. Cette valeur peut être différente de la zone spécifiée lors de la création de l'instance en cas de failover de l'instance vers sa zone secondaire/de failover.<br>
    **Nom GCP** : `secondaryGceZone`<br>
## `self_link`
**Type** : `STRING`<br>
    **Description** : L'URI de cette ressource.<br>
    **Nom GCP** : `selfLink`<br>
## `server_ca_cert`
  **Type** : `STRUCT`<br>
  **Description** : Configuration SSL.<br>
  **Nom GCP** : `serverCaCert`
   - `cert`<br>
    **Type** : `STRING`<br>
        **Description** : Représentation PEM.<br>
        **Nom GCP** : `cert`<br>
   - `cert_serial_number`<br>
    **Type** : `STRING`<br>
        **Description** : Numéro de série extrait du certificat.<br>
        **Nom GCP** : `certSerialNumber`<br>
   - `common_name`<br>
    **Type** : `STRING`<br>
        **Description** : Nom spécifié par l'utilisateur. Doit uniquement contenir les caractères `[a-zA-Z.-_ ]+`.<br>
        **Nom GCP** : `commonName`<br>
   - `create_time`<br>
    **Type** : `TIMESTAMP`<br>
        **Description** : La date de création du certificat au format [RFC 3339][1], par exemple : `2012-11-15T16:19:00.094Z`.<br>
        **Nom GCP** : `createTime`<br>
   - `expiration_time`<br>
    **Type** : `TIMESTAMP`<br>
        **Description** : La date d'expiration du certificat au format [RFC 3339][1], par exemple : `2012-11-15T16:19:00.094Z`.<br>
        **Nom GCP** : `expirationTime`<br>
   - `instance`<br>
    **Type** : `STRING`<br>
        **Description** : Nom de l'instance de base de données.<br>
        **Nom GCP** : `instance`<br>
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#sslCert`.<br>
        **Nom GCP** : `kind`<br>
   - `self_link`<br>
    **Type** : `STRING`<br>
        **Description** : L'URI de cette ressource.<br>
        **Nom GCP** : `selfLink`<br>
   - `sha1_fingerprint`<br>
    **Type** : `STRING`<br>
        **Description** : Empreinte Sha1.<br>
        **Nom GCP** : `sha1Fingerprint`<br>
## `service_account_email_address`
**Type** : `STRING`<br>
    **Description** : L'adresse e-mail du compte de service associée à l'instance. Cette propriété est en lecture seule.<br>
    **Nom GCP** : `serviceAccountEmailAddress`<br>
## `settings`
  **Type** : `STRUCT`<br>
  **Description** : Les paramètres utilisateur.<br>
  **Nom GCP** : `settings`
   - `activation_policy`<br>
    **Type** : `STRING`<br>
        **Description** : La politique d'activation spécifie à quel moment l'instance est activée. Elle s'applique uniquement lorsque l'état de l'instance correspond à `RUNNABLE`.<br>
        **Nom GCP** : `activationPolicy`<br>
            **Valeurs autorisées** :<br>
      - `SQL_ACTIVATION_POLICY_UNSPECIFIED` - Plan d'activation inconnu.<br>
      - `ALWAYS` - L'instance est activée et doit rester activée même en cas d'absence de requêtes de connexion.<br>
      - `NEVER` - L'instance est désactivée et ne doit pas être activée, même en cas de réception d'une requête de connexion.<br>
      - `ON_DEMAND` - L'instance est activée dès qu'une requête est reçue.<br>
   - `active_directory_config`<br>
      **Type** : `STRUCT`<br>
      **Description** : Configuration Active Directory, s'applique uniquement à Cloud SQL pour SQL Server.<br>
      **Nom GCP** : `activeDirectoryConfig`
       - `domain`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom du domaine (par exemple, `mondomaine.com`).<br>
            **Nom GCP** : `domain`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#activeDirectoryConfig`.<br>
            **Nom GCP** : `kind`<br>
   - `authorized_gae_applications`<br>
    **Type** : `UNORDERED_LIST_STRING`<br>
        **Description** : Les ID des applications App Engine qui peuvent accéder à cette instance. (Obsolète) S'applique uniquement aux instances de première génération.<br>
        **Nom GCP** : `authorizedGaeApplications`<br>
   - `availability_type`<br>
    **Type** : `STRING`<br>
        **Description** : Type de disponibilité. Pour en savoir plus, consultez [Présentation de la configuration de la haute disponibilité][3]. <br>
        **Nom GCP** : `availabilityType`<br>
            **Valeurs autorisées** :<br>
      - `SQL_AVAILABILITY_TYPE_UNSPECIFIED` - Le type de disponibilité est inconnu.<br>
      - `ZONAL` - L'instance distribue les données depuis une seule zone. En cas de panne dans cette zone, les données risquent de ne plus être accessibles.<br>
      - `REGIONAL` - L'instance peut distribuer les données depuis plusieurs zones dans une région (elle est hautement disponible).<br>
   - `backup_configuration`<br>
      **Type** : `STRUCT`<br>
      **Description** : La configuration de la sauvegarde journalière pour l'instance.<br>
      **Nom GCP** : `backupConfiguration`
       - `backup_retention_settings`<br>
          **Type** : `STRUCT`<br>
          **Description** : Paramètres de rétention des sauvegardes.<br>
          **Nom GCP** : `backupRetentionSettings`
           - `retained_backups`<br>
            **Type** : `INT32`<br>
                **Description** : En fonction de la valeur définie pour `retention_unit`, cette propriété détermine si une sauvegarde doit être supprimée. Si `retention_unit` est défini sur un `COUNT`, le nombre correspondant de sauvegardes sera conservé.<br>
                **Nom GCP** : `retainedBackups`<br>
           - `retention_unit`<br>
            **Type** : `STRING`<br>
                **Description** : L'unité représentée par `retained_backups`. <br>
                **Nom GCP** : `retentionUnit`<br>
                    **Valeurs autorisées** :<br>
              - `RETENTION_UNIT_UNSPECIFIED` - L'unité de rétention des sauvegarde n'est pas spécifiée et sera traitée comme un `COUNT`.<br>
              - `COUNT` - La rétention est définie par un nombre. Par exemple, conserver les 7 dernières sauvegardes.<br>
       - `binary_log_enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : (MySQL uniquement) Détermine si le log binaire est activé. Si la configuration des sauvegardes est désactivée, le log binaire doit également être désactivé.<br>
            **Nom GCP** : `binaryLogEnabled`<br>
       - `enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si cette configuration est activée.<br>
            **Nom GCP** : `enabled`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#backupConfiguration`.<br>
            **Nom GCP** : `kind`<br>
       - `location`<br>
        **Type** : `STRING`<br>
            **Description** : Emplacement de la sauvegarde.<br>
            **Nom GCP** : `location`<br>
       - `point_in_time_recovery_enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : (Postgres uniquement) Détermine si la restauration à un instant dans le passé est activée.<br>
            **Nom GCP** : `pointInTimeRecoveryEnabled`<br>
       - `replication_log_archiving_enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Réservé pour une utilisation future.<br>
            **Nom GCP** : `replicationLogArchivingEnabled`<br>
       - `start_time`<br>
        **Type** : `STRING`<br>
            **Description** : Heure de début de la sauvegarde quotidienne au format UTC 24 heures. Exemple : `HH:MM`.<br>
            **Nom GCP** : `startTime`<br>
       - `transaction_log_retention_days`<br>
        **Type** : `INT32`<br>
            **Description** : Nombre de jours de logs de transaction à conserver pour la restauration à un instant dans le passé. Valeurs acceptées : `1-7`.<br>
            **Nom GCP** : `transactionLogRetentionDays`<br>
   - `collation`<br>
    **Type** : `STRING`<br>
        **Description** : Le nom de la collation de l'instance serveur.<br>
        **Nom GCP** : `collation`<br>
   - `crash_safe_replication_enabled`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Configuration spécifique aux réplicas avec accès en lecture. Indique si les flags de base de données pour la réplication crash-safe sont activés. Cette propriété était uniquement applicable aux instances de première génération.<br>
        **Nom GCP** : `crashSafeReplicationEnabled`<br>
   - `data_disk_size_gb`<br>
    **Type** : `INT64`<br>
        **Description** : La taille du disque de données, en Go. Le taille minimum est de 10 Go.<br>
        **Nom GCP** : `dataDiskSizeGb`<br>
   - `data_disk_type`<br>
    **Type** : `STRING`<br>
        **Description** : Le type de disque de données : `PD_SSD` (par défaut) ou `PD_HDD`. Non applicable aux instances de première génération. <br>
        **Nom GCP** : `dataDiskType`<br>
            **Valeurs autorisées** :<br>
      - `SQL_DATA_DISK_TYPE_UNSPECIFIED` - Le type de disque de données est inconnu.<br>
      - `PD_SSD` - Disque de données SSD.<br>
      - `PD_HDD` - Disque de données HDD.<br>
      - `OBSOLETE_LOCAL_SSD` - Ce champ est obsolète et sera supprimé dans une prochaine version de l'API.<br>
   - `database_flags`<br>
      **Type** : `UNORDERED_LIST_STRUCT`<br>
      **Description** : Les flags de base de données passés à l'instance au démarrage.<br>
      **Nom GCP** : `databaseFlags`
       - `name`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom du flag. Ces flags sont passés au démarrage de l'instance, vous devez donc inclure les options serveur et les variables système. Les flags sont spécifiés avec des underscores et non des tirets. Pour en savoir plus, consultez [Configurer les flags de base de données][4] dans la documentation Cloud SQL.<br>
            **Nom GCP** : `name`<br>
       - `value`<br>
        **Type** : `STRING`<br>
            **Description** : La valeur du flag. Les flags booléens sont définis sur `on` pour true et `off` pour false. Ce champ doit être omis si le flag n'accepte pas de valeur.<br>
            **Nom GCP** : `value`<br>
   - `database_replication_enabled`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Configuration spécifique aux réplicas avec accès en lecture. Détermine si la réplication est activée ou non. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
        **Nom GCP** : `databaseReplicationEnabled`<br>
   - `deny_maintenance_periods`<br>
      **Type** : `UNORDERED_LIST_STRUCT`<br>
      **Description** : Périodes de refus des maintenances.<br>
      **Nom GCP** : `denyMaintenancePeriods`
       - `end_date`<br>
        **Type** : `STRING`<br>
            **Description** : La date de fin de la période de refus des maintenances. Si l'année de la date de fin est vide, l'année de la date de début doit l'être elle aussi. Si l'année est vide, la période de refus des maintenances s'appliquera chaque année. La date doit être au format `aaaa-mm-jj` (par exemple `2020-11-01`) ou au format `mm-jj` (par exemple `11-01`).<br>
            **Nom GCP** : `endDate`<br>
       - `start_date`<br>
        **Type** : `STRING`<br>
            **Description** : La date de début de la période de refus des maintenances. Si l'année de la date de début est vide, l'année de la date de fin doit l'être elle aussi. Si l'année est vide, la période de refus des maintenances s'appliquera chaque année. La date doit être au format `aaaa-mm-jj` (par exemple `2020-11-01`) ou au format `mm-jj` (par exemple `11-01`).<br>
            **Nom GCP** : `startDate`<br>
       - `time`<br>
        **Type** : `STRING`<br>
            **Description** : Heure au fuseau horaire UTC à laquelle la période de refus des maintenances commence à la `start_date` spécifiée et se termine à la `end_date` spécifiée. L'heure doit être au format `HH:mm:SS`. Exemple : `00:00:00`.<br>
            **Nom GCP** : `time`<br>
   - `insights_config`<br>
      **Type** : `STRUCT`<br>
      **Description** : Configuration des insights. Concerne uniquement Postgres pour le moment.<br>
      **Nom GCP** : `insightsConfig`
       - `query_insights_enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si la fonctionnalité Insights sur les requêtes est activée ou non.<br>
            **Nom GCP** : `queryInsightsEnabled`<br>
       - `query_plans_per_minute`<br>
        **Type** : `INT32`<br>
            **Description** : Nombre de plans d'exécution de requête capturés par Insights par minute pour toutes les requêtes combinées. Valeur par défaut : `5`.<br>
            **Nom GCP** : `queryPlansPerMinute`<br>
       - `query_string_length`<br>
        **Type** : `INT32`<br>
            **Description** : Longueur maximale des requêtes en octets. Valeur par défaut : `1024` octets. Plage : `256-4500` octets. Si la longueur d'une requête dépasse la valeur de ce champ, elle est alors tronquée à la valeur spécifiée. Si cette propriété n'est pas définie, la valeur par défaut est utilisée. La modification de la longueur de requête entraînera le redémarrage de la base de données.<br>
            **Nom GCP** : `queryStringLength`<br>
       - `record_application_tags`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si la fonctionnalité Insights sur les requêtes doit enregistrer les tags d'application à partir de la requête.<br>
            **Nom GCP** : `recordApplicationTags`<br>
       - `record_client_address`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si la fonctionnalité Insights sur les requêtes doit enregistrer l'adresse du client.<br>
            **Nom GCP** : `recordClientAddress`<br>
   - `ip_configuration`<br>
      **Type** : `STRUCT`<br>
      **Description** : Les paramètres de gestion de l'IP. Permet d'activer ou de désactiver l'IP de l'instance et de gérer les réseaux externes autorisés à se connecter à l'instance. L'adresse IPv4 ne peut pas être désactivée pour les instances de deuxième génération.<br>
      **Nom GCP** : `ipConfiguration`
       - `allocated_ip_range`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom de la plage d'IP allouée pour l'instance CloudSQL à IP privée. Exemple : `google-managed-services-default`. Si cette propriété est définie, l'IP de l'instance sera créée dans la plage allouée. Le nom de la plage doit répondre aux critères [RFC 1035][5]. Plus précisément, le nom doit comporter entre 1 et 63 caractères et respecter l'expression régulière <code>[a-z]&#40;[-a-z0-9]*[a-z0-9]&#41;?.</code><br>
            **Nom GCP** : `allocatedIpRange`<br>
       - `authorized_networks`<br>
          **Type** : `UNORDERED_LIST_STRUCT`<br>
          **Description** : La liste des réseaux externes autorisés à se connecter à l'instance via l'IP. La syntaxe CIDR (avec barre oblique) doit être utilisée. Exemple : `157.197.200.0/24`.<br>
          **Nom GCP** : `authorizedNetworks`
           - `expiration_time`<br>
            **Type** : `TIMESTAMP`<br>
                **Description** : La date d'expiration de cette entrée du contrôle des accès au format [RFC 3339][1], par exemple : `2012-11-15T16:19:00.094Z`.<br>
                **Nom GCP** : `expirationTime`<br>
           - `kind`<br>
            **Type** : `STRING`<br>
                **Description** : Correspond toujours à `sql#aclEntry`.<br>
                **Nom GCP** : `kind`<br>
           - `name`<br>
            **Type** : `STRING`<br>
                **Description** : Facultatif. Une étiquette utilisée pour identifier cette entrée.<br>
                **Nom GCP** : `name`<br>
           - `value`<br>
            **Type** : `STRING`<br>
                **Description** : La valeur mise sur liste d'autorisation pour le contrôle des accès.<br>
                **Nom GCP** : `value`<br>
       - `ipv4_enabled`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si une adresse IP publique est allouée à l'instance ou non.<br>
            **Nom GCP** : `ipv4Enabled`<br>
       - `private_network`<br>
        **Type** : `STRING`<br>
            **Description** : Le lien de ressource pour le réseau VPC à partir duquel l'instance Cloud SQL est accessible pour l'IP privée. Exemple : `/projects/myProject/global/networks/default`. Ce paramètre peut être mis à jour, mais il ne peut pas être supprimé une fois défini.<br>
            **Nom GCP** : `privateNetwork`<br>
       - `require_ssl`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si le chiffrement SSL doit être exigé sur l'IP ou non.<br>
            **Nom GCP** : `requireSsl`<br>
   - `kind`<br>
    **Type** : `STRING`<br>
        **Description** : Correspond toujours à `sql#settings`.<br>
        **Nom GCP** : `kind`<br>
   - `location_preference`<br>
      **Type** : `STRUCT`<br>
      **Description** : Préférences relatives aux emplacements. Permet à l'instance d'être située le plus près possible d'une application App Engine ou d'une zone Compute Engine pour des performances optimales. Le placement au même endroit que l'application App Engine était uniquement applicable aux instances de première génération.<br>
      **Nom GCP** : `locationPreference`
       - `follow_gae_application`<br>
        **Type** : `STRING`<br>
            **Description** : L'application App Engine à suivre. Doit être dans la même région que l'instance Cloud SQL. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
            **Nom GCP** : `followGaeApplication`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#locationPreference`.<br>
            **Nom GCP** : `kind`<br>
       - `secondary_zone`<br>
        **Type** : `STRING`<br>
            **Description** : La zone Compute Engine à utiliser de préférence comme zone secondaire/de failover (exemple : `us-central1-a`, `us-central1-b`).<br>
            **Nom GCP** : `secondaryZone`<br>
       - `zone`<br>
        **Type** : `STRING`<br>
            **Description** : La zone Compute Engine à utiliser de préférence (exemple : `us-central1-a`, `us-central1-b`). AVERTISSEMENT : La modification de ce paramètre entraînera le redémarrage de l'instance.<br>
            **Nom GCP** : `zone`<br>
   - `maintenance_window`<br>
      **Type** : `STRUCT`<br>
      **Description** : La fenêtre de maintenance pour cette instance. Indique à quel moment l'instance peut être redémarrée à des fins de maintenance.<br>
      **Nom GCP** : `maintenanceWindow`
       - `day`<br>
        **Type** : `INT32`<br>
            **Description** : Jour de la semaine (`1-7`), le premier jour étant le lundi.<br>
            **Nom GCP** : `day`<br>
       - `hour`<br>
        **Type** : `INT32`<br>
            **Description** : Heure de la journée, de `0` à `23`.<br>
            **Nom GCP** : `hour`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#maintenanceWindow`.<br>
            **Nom GCP** : `kind`<br>
       - `update_track`<br>
        **Type** : `STRING`<br>
            **Description** : Paramètre de planification des maintenances : `canary` (à l'avance) ou `stable` (plus tard). [En savoir plus][6]. <br>
            **Nom GCP** : `updateTrack`<br>
                **Valeurs autorisées** :<br>
          - `SQL_UPDATE_TRACK_UNSPECIFIED` - Le paramètre de planification des maintenances est inconnu.<br>
          - `canary` - Pour les mises à jour de l'instance qui nécessitent un redémarrage, cette option indique qu'il est préférable de redémarrer l'instance au début de la fenêtre de maintenance afin de passer à la nouvelle version.<br>
          - `stable` - Pour les mises à jour de l'instance qui nécessitent un redémarrage, cette option indique qu'il est préférable de laisser Cloud SQL choisir quand procéder au redémarrage (dans la fenêtre de maintenance définie, le cas échéant).<br>
   - `password_validation_policy`<br>
      **Type** : `STRUCT`<br>
      **Description** : La politique de validation du mot de passe de l'utilisateur local de l'instance.<br>
      **Nom GCP** : `passwordValidationPolicy`
       - `complexity`<br>
        **Type** : `STRING`<br>
            **Description** : La complexité du mot de passe. <br>
            **Nom GCP** : `complexity`<br>
                **Valeurs autorisées** :<br>
          - `COMPLEXITY_UNSPECIFIED` - Aucune vérification de la complexité n'est spécifiée.<br>
          - `COMPLEXITY_DEFAULT` - Une combinaison de caractères minuscules, majuscules, numériques et non alphanumériques.<br>
       - `disallow_username_substring`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Permet d'empêcher le mot de passe de contenir le nom d'utilisateur.<br>
            **Nom GCP** : `disallowUsernameSubstring`<br>
       - `enable_password_policy`<br>
        **Type** : `BOOLEAN`<br>
            **Description** : Détermine si la politique relative aux mots de passe est activée ou non.<br>
            **Nom GCP** : `enablePasswordPolicy`<br>
       - `min_length`<br>
        **Type** : `INT32`<br>
            **Description** : Le nombre minimum de caractères autorisés.<br>
            **Nom GCP** : `minLength`<br>
       - `password_change_interval`<br>
        **Type** : `STRING`<br>
            **Description** : Intervalle minimum après lequel le mot de passe peut être modifié. Ce flag est uniquement compatible avec PostgresSQL.<br>
            **Nom GCP** : `passwordChangeInterval`<br>
       - `reuse_interval`<br>
        **Type** : `INT32`<br>
            **Description** : Nombre de mots de passe précédents ne pouvant pas être réutilisés.<br>
            **Nom GCP** : `reuseInterval`<br>
   - `pricing_plan`<br>
    **Type** : `STRING`<br>
        **Description** : Le mode de facturation pour cette instance. Peut être défini sur `PER_USE` ou `PACKAGE`. Seule l'option `PER_USE` est prise en charge pour les instances de deuxième génération. <br>
        **Nom GCP** : `pricingPlan`<br>
            **Valeurs autorisées** :<br>
      - `SQL_PRICING_PLAN_UNSPECIFIED` - Mode de facturation inconnu pour cette instance.<br>
      - `PACKAGE` - L'instance est facturée à un tarif fixe mensuel.<br>
      - `PER_USE` - L'instance est facturée par nombre d'utilisations.<br>
   - `replication_type`<br>
    **Type** : `STRING`<br>
        **Description** : Le type de réplication utilisé par cette. Peut être défini sur `ASYNCHRONOUS` ou `SYNCHRONOUS`. (Obsolète) Cette propriété était uniquement applicable aux instances de première génération. <br>
        **Nom GCP** : `replicationType`<br>
            **Valeurs autorisées** :<br>
      - `SQL_REPLICATION_TYPE_UNSPECIFIED` - Type de réplication inconnu pour une instance Cloud SQL.<br>
      - `SYNCHRONOUS` - Mode de réplication synchrone pour les instances de première génération. Il s'agit de la valeur par défaut.<br>
      - `ASYNCHRONOUS` - Mode de réplication asynchrone pour les instances de première génération. Offre un léger gain de performance, mais en cas de défaillance alors que cette option est définie sur asynchrone, vous risquez de perdre plusieurs secondes de mise à jour de vos données.<br>
   - `settings_version`<br>
    **Type** : `INT64`<br>
        **Description** : La version des paramètres de l'instance. Ce champ est obligatoire s'assurer que les mises à jour simultanées sont traitées correctement. Pendant une mise à jour, utilisez la valeur settingsVersion la plus récente pour cette instance et n'essayez pas de mettre à jour cette valeur.<br>
        **Nom GCP** : `settingsVersion`<br>
   - `sql_server_audit_config`<br>
      **Type** : `STRUCT`<br>
      **Description** : Configuration d'audit spécifique à SQL Server.<br>
      **Nom GCP** : `sqlServerAuditConfig`
       - `bucket`<br>
        **Type** : `STRING`<br>
            **Description** : Le nom du bucket de destination (exemple : `gs://monbucket`).<br>
            **Nom GCP** : `bucket`<br>
       - `kind`<br>
        **Type** : `STRING`<br>
            **Description** : Correspond toujours à `sql#sqlServerAuditConfig`<br>
            **Nom GCP** : `kind`<br>
       - `retention_interval`<br>
        **Type** : `STRING`<br>
            **Description** : Durée pendant laquelle les fichiers d'audit générés doivent être conservés.<br>
            **Nom GCP** : `retentionInterval`<br>
       - `upload_interval`<br>
        **Type** : `STRING`<br>
            **Description** : Fréquence de transmission des fichiers d'audit générés.<br>
            **Nom GCP** : `uploadInterval`<br>
   - `storage_auto_resize`<br>
    **Type** : `BOOLEAN`<br>
        **Description** : Permet d'activer ou de désactiver l'augmentation automatique de la taille du stockage. Valeur par défaut : true.<br>
        **Nom GCP** : `storageAutoResize`<br>
   - `storage_auto_resize_limit`<br>
    **Type** : `INT64`<br>
        **Description** : La taille maximale jusqu'à laquelle la capacité de stockage peut être automatiquement augmentée. La valeur par défaut `0`, ce qui correspond à aucune limite.<br>
        **Nom GCP** : `storageAutoResizeLimit`<br>
   - `tier`<br>
    **Type** : `STRING`<br>
        **Description** : Le niveau (ou type de machine) pour cette instance, par exemple : `db-custom-1-3840`. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
        **Nom GCP** : `tier`<br>
   - `user_labels`<br>
    **Type** : `UNORDERED_LIST_STRING`<br>
        **Description** : Étiquettes spécifiées par l'utilisateur, représentées sous la forme d'un dictionnaire où chaque étiquette est une paire key/value unique.<br>
        **Nom GCP** : `userLabels`<br>
## `state`
**Type** : `STRING`<br>
    **Description** : L'état actuel de l'instance Cloud SQL. <br>
    **Nom GCP** : `state`<br>
        **Valeurs autorisées** :<br>
  - `SQL_INSTANCE_STATE_UNSPECIFIED` - L'état de l'instance est inconnu.<br>
  - `RUNNABLE` - L'instance est en cours d'exécution ou a été arrêtée par son propriétaire.<br>
  - `SUSPENDED` - L'instance est indisponible, par exemple en raison d'un problème de facturation.<br>
  - `PENDING_DELETE` - L'instance est en cours de suppression.<br>
  - `PENDING_CREATE` - L'instance est en cours de création.<br>
  - `MAINTENANCE` - L'instance est indisponible pour cause de maintenance.<br>
  - `FAILED` - La création de l'instance a échoué, ou une erreur fatale s'est produite pendant la maintenance.<br>
  - `ONLINE_MAINTENANCE` - Obsolète<br>
## `suspension_reason`
**Type** : `UNORDERED_LIST_STRING`<br>
    **Description** : Si l'état de l'instance est `SUSPENDED`, indique le motif de la suspension.<br>
    **Nom GCP** : `suspensionReason`<br>
## `tags`
**Type** : `UNORDERED_LIST_STRING`<br>


[1]: https://tools.ietf.org/html/rfc3339
[2]: https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ
[3]: https://cloud.google.com/sql/docs/mysql/high-availability
[4]: https://cloud.google.com/sql/docs/mysql/flags
[5]: https://tools.ietf.org/html/rfc1035
[6]: https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen