---
dependencies: []
disable_edit: true
---
# gcp_sql_database_instance

## `ancestors`
**Type** : `UNORDERED_LIST_STRING`<br>
## `available_maintenance_versions`
**Type** : `UNORDERED_LIST_STRING`<br>
**Nom fournisseur** : `availableMaintenanceVersions`<br>
**Description** : Sortie uniquement. Liste de toutes les versions de maintenance applicables sur l'instance<br>
## `backend_type`
**Type** : `STRING`<br>
**Nom fournisseur** : `backendType`<br>
**Description** : Le type de backend. `SECOND_GEN` : Instance de base de données Cloud SQL. `EXTERNAL` : Un serveur de base de données non géré par Google. Cette propriété est en lecture seule ; utilisez la propriété `tier` dans l'objet `settings` pour déterminer le type de base de données. <br>
**Valeurs autorisées** :<br>
  - `SQL_BACKEND_TYPE_UNSPECIFIED` - Type de backend inconnu pour l'instance.<br>
  - `FIRST_GEN` - Instance Speckle v1.<br>
  - `SECOND_GEN` - Instance Speckle v2.<br>
  - `EXTERNAL` - Instance sur site.<br>
## `connection_name`
**Type** : `STRING`<br>
**Nom fournisseur** : `connectionName`<br>
**Description** : Nom de connexion de l'instance Cloud SQL utilisé dans les chaînes de connexion.<br>
## `create_time`
**Type** : `TIMESTAMP`<br>
**Nom fournisseur** : `createTime`<br>
**Description** : Sortie uniquement. La date de création de l'instance au format [RFC 3339](https://tools.ietf.org/html/rfc3339), par exemple : `2012-11-15T16:19:00.094Z`.<br>
## `current_disk_size`
**Type** : `INT64`<br>
**Nom fournisseur** : `currentDiskSize`<br>
**Description** : L'utilisation actuelle du disque par l'instance en octets. Cette propriété est désormais obsolète. Utilisez la métrique cloudsql.googleapis.com/database/disk/bytes_used dans l'API Cloud Monitoring à la place. Consultez [cette annonce](https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ) pour en savoir plus.<br>
## `database_installed_version`
**Type** : `STRING`<br>
**Nom fournisseur** : `databaseInstalledVersion`<br>
**Description** : Sortie uniquement. Enregistre la version de la base de données actuellement exécutée sur l'instance, y compris la version mineure. Exemple : `MYSQL_8_0_18`.<br>
## `database_version`
**Type** : `STRING`<br>
**Nom fournisseur** : `databaseVersion`<br>
**Description** : Type et version du moteur de base de données. Le champ `databaseVersion` ne peut pas être modifié après la création de l'instance. <br>
**Valeurs autorisées** :<br>
  - `SQL_DATABASE_VERSION_UNSPECIFIED` - Version de la base de données inconnue.<br>
  - `MYSQL_5_1` - La version de la base de données est MySQL 5.1.<br>
  - `MYSQL_5_5` - La version de la base de données est MySQL 5.5.<br>
  - `MYSQL_5_6` - La version de la base de données est MySQL 5.6.<br>
  - `MYSQL_5_7` - La version de la base de données est MySQL 5.7.<br>
  - `SQLSERVER_2017_STANDARD` - La version de la base de données est SQL Server 2017 Standard.<br>
  - `SQLSERVER_2017_ENTERPRISE` - La version de la base de données est SQL Server 2017 Enterprise.<br>
  - `SQLSERVER_2017_EXPRESS` - La version de la base de données est SQL Server 2017 Express.<br>
  - `SQLSERVER_2017_WEB` - La version de la base de données est SQL Server 2017 Web.<br>
  - `POSTGRES_9_6` - La version de la base de données est PostgreSQL 9.6.<br>
  - `POSTGRES_10` - La version de la base de données est PostgreSQL 10.<br>
  - `POSTGRES_11` - La version de la base de données est PostgreSQL 11.<br>
  - `POSTGRES_12` - La version de la base de données est PostgreSQL 12.<br>
  - `POSTGRES_13` - La version de la base de données est PostgreSQL 13.<br>
  - `POSTGRES_14` - La version de la base de données est PostgreSQL 14.<br>
  - `MYSQL_8_0` - La version de la base de données est MySQL 8.<br>
  - `MYSQL_8_0_18` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 18.<br>
  - `MYSQL_8_0_26` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 26.<br>
  - `MYSQL_8_0_27` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 27.<br>
  - `MYSQL_8_0_28` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 28.<br>
  - `MYSQL_8_0_29` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 29.<br>
  - `MYSQL_8_0_30` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 30.<br>
  - `MYSQL_8_0_31` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 31.<br>
  - `MYSQL_8_0_32` - La version majeure de la base de données est MySQL 8.0 et la version mineure est 32.<br>
  - `SQLSERVER_2019_STANDARD` - La version de la base de données est SQL Server 2019 Standard.<br>
  - `SQLSERVER_2019_ENTERPRISE` - La version de la base de données est SQL Server 2019 Enterprise.<br>
  - `SQLSERVER_2019_EXPRESS` - La version de la base de données est SQL Server 2019 Express.<br>
  - `SQLSERVER_2019_WEB` - La version de la base de données est SQL Server 2019 Web.<br>
## `disk_encryption_configuration`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `diskEncryptionConfiguration`<br>
**Description** : La configuration du chiffrement du disque pour une instance spécifique.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#diskEncryptionConfiguration`.<br>
   - `kms_key_name`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kmsKeyName`<br>
    **Description** : Nom de ressource de la clé KMS pour le chiffrement du disque<br>
## `disk_encryption_status`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `diskEncryptionStatus`<br>
**Description** : Le statut du chiffrement du disque pour une instance spécifique.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#diskEncryptionStatus`.<br>
   - `kms_key_version_name`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kmsKeyVersionName`<br>
    **Description** : Version de la clé KMS utilisée pour chiffrer la ressource de l'instance Cloud SQL<br>
## `etag`
**Type** : `STRING`<br>
**Nom fournisseur** : `etag`<br>
**Description** : Ce champ est obsolète et sera supprimé dans une prochaine version de l'API. Utilisez le champ `settings.settingsVersion` à la place.<br>
## `failover_replica`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `failoverReplica`<br>
**Description** : Le nom et le statut du réplica de failover.<br>
   - `available`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `available`<br>
    **Description** : Le statut de disponibilité du réplica de failover. Un statut false indique que le réplica de failover est désynchronisé. Pour que le basculement de l'instance principale vers le réplica de failover soit possible, le statut doit correspondre à true.<br>
   - `name`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `name`<br>
    **Description** : Le nom du réplica de failover. Si cette propriété est spécifiée à la création de l'instance, un réplica de failover est créé pour l'instance. Le nom n'inclut pas l'ID de projet.<br>
## `gce_zone`
**Type** : `STRING`<br>
**Nom fournisseur** : `gceZone`<br>
**Description** : La zone Compute Engine qui héberge actuellement l'instance. Cette valeur peut être différente de la zone spécifiée lors de la création de l'instance en cas de failover de l'instance vers sa zone secondaire. AVERTISSEMENT : La modification de cette valeur peut entraîner le redémarrage de l'instance.<br>
## `instance_type`
**Type** : `STRING`<br>
**Nom fournisseur** : `instanceType`<br>
**Description** : Le type d'instance. <br>
**Valeurs autorisées** :<br>
  - `SQL_INSTANCE_TYPE_UNSPECIFIED` - Le type d'instance Cloud SQL est inconnu.<br>
  - `CLOUD_SQL_INSTANCE` - Une instance Cloud SQL standard sans réplication à partir d'une instance principale.<br>
  - `ON_PREMISES_INSTANCE` - Une instance exécutée sur le site du client qui n'est pas générée par Cloud SQL.<br>
  - `READ_REPLICA_INSTANCE` - Une instance Cloud SQL utilisée comme réplica avec accès en lecture.<br>
## `ip_addresses`
**Type** : `UNORDERED_LIST_STRUCT`<br>
**Nom fournisseur** : `ipAddresses`<br>
**Description** : Les adresses IP affectées à l'instance.<br>
   - `ip_address`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `ipAddress`<br>
    **Description** : L'adresse IP affectée.<br>
   - `time_to_retire`<br>
    **Type** : `TIMESTAMP`<br>
    **Nom fournisseur** : `timeToRetire`<br>
    **Description** : La date à laquelle cette IP doit être retirée, au format [RFC 3339](https://tools.ietf.org/html/rfc3339). Exemple : `2012-11-15T16:19:00.094Z`. Ce champ est uniquement disponible lorsque l'IP est programmée pour être retirée.<br>
   - `type`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `type`<br>
    **Description** : Le type d'adresse IP. Une adresse `PRIMARY` est une adresse publique qui peut accepter les connexions entrantes. Une adresse `PRIVATE` est une adresse privée qui peut accepter les connexions entrantes. Une adresse `OUTGOING` est l'adresse source des connexions en provenance de l'instance, si ce type est pris en charge. <br>
    **Valeurs autorisées** :<br>
      - `SQL_IP_ADDRESS_TYPE_UNSPECIFIED` - Le type d'adresse IP est inconnu.<br>
      - `PRIMARY` - Adresse IP à laquelle le client est censé se connecter. Il s'agit généralement de l'adresse IP de l'équilibreur de charge.<br>
      - `OUTGOING` - Adresse IP source de la connexion qu'un réplica avec accès en lecture établit avec son instance principale externe. Cette adresse IP peut être ajoutée à une liste d'autorisations par le client s'il utilise un pare-feu pour filtrer les connexions entrantes vers son instance principale sur site.<br>
      - `PRIVATE` - Adresse IP privée utilisée lorsque les IP privées et le peering réseau sont activés.<br>
      - `MIGRATED_1ST_GEN` - Adresse IP v1 d'une instance migrée. L'utilisateur est censé retirer cette IP dès que la migration est terminée. Remarque : les instances v1 avec des adresses IP v1 seront considérées comme des adresses PRIMARY.<br>
## `ipv6_address`
**Type** : `STRING`<br>
**Nom fournisseur** : `ipv6Address`<br>
**Description** : L'adresse IPv6 allouée à l'instance. (Obsolète) Cette propriété était uniquement applicable aux instances de première génération.<br>
## `kind`
**Type** : `STRING`<br>
**Nom fournisseur** : `kind`<br>
**Description** : Correspond toujours à `sql#instance`.<br>
## `labels`
**Type** : `UNORDERED_LIST_STRING`<br>
## `maintenance_version`
**Type** : `STRING`<br>
**Nom fournisseur** : `maintenanceVersion`<br>
**Description** : La version logicielle actuelle de l'instance.<br>
## `master_instance_name`
**Type** : `STRING`<br>
**Nom fournisseur** : `masterInstanceName`<br>
**Description** : Le nom de l'instance utilisée comme instance principale dans le système de réplication.<br>
## `max_disk_size`
**Type** : `INT64`<br>
**Nom fournisseur** : `maxDiskSize`<br>
**Description** : Le volume disque maximum que l'instance peut occuper en octets.<br>
## `name`
**Type** : `STRING`<br>
**Nom fournisseur** : `name`<br>
**Description** : Nom de l'instance Cloud SQL. Cette propriété n'inclut pas l'ID de projet.<br>
## `on_premises_configuration`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `onPremisesConfiguration`<br>
**Description** : Configuration spécifique aux instances sur site.<br>
   - `ca_certificate`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `caCertificate`<br>
    **Description** : Représentation PEM du certificat x509 de l'autorité de certification de confiance.<br>
   - `client_certificate`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `clientCertificate`<br>
    **Description** : Représentation PEM du certificat x509 du réplica.<br>
   - `client_key`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `clientKey`<br>
    **Description** : Représentation PEM de la clé privée du réplica. La clé publique correspondante est encodée dans le certificat du client.<br>
   - `dump_file_path`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `dumpFilePath`<br>
    **Description** : Le fichier dump utilisé pour créer le réplica Cloud SQL.<br>
   - `host_port`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `hostPort`<br>
    **Description** : Host et port de l'instance sur site, au format host:port.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#onPremisesConfiguration`.<br>
   - `password`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `password`<br>
    **Description** : Le mot de passe pour se connecter à l'instance sur site.<br>
   - `source_instance`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `sourceInstance`<br>
    **Description** : La référence à l'instance Cloud SQL si la source est Cloud SQL.<br>
       - `name`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `name`<br>
        **Description** : Le nom de l'instance Cloud SQL référencée. Cette propriété n'inclut pas l'ID de projet.<br>
       - `project`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `project`<br>
        **Description** : L'ID de projet de l'instance Cloud SQL référencée. La valeur par défaut correspond à l'ID de projet tel que référencé par l'instance.<br>
       - `region`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `region`<br>
        **Description** : La région de l'instance Cloud SQL référencée.<br>
   - `username`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `username`<br>
    **Description** : Le nom d'utilisateur pour se connecter à l'instance sur site.<br>
## `organization_id`
**Type** : `STRING`<br>
## `out_of_disk_report`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `outOfDiskReport`<br>
**Description** : Ce champ correspond au rapport généré par la tâche de contrôle d'intégrité proactif de la base de données pour les problèmes de type OutOfDisk. * Écriture : * La tâche de contrôle d'intégrité proactif de la base de données pour OOD. * Lecture : * La tâche de contrôle d'intégrité proactif de la base de données.<br>
   - `sql_min_recommended_increase_size_gb`<br>
    **Type** : `INT32`<br>
    **Nom fournisseur** : `sqlMinRecommendedIncreaseSizeGb`<br>
    **Description** : L'augmentation minimum recommandée du volume en gigaoctets Ce champ est consommé par le frontend. * Écriture : * La tâche de contrôle d'intégrité proactif de la base de données pour OOD. * Lecture :<br>
   - `sql_out_of_disk_state`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `sqlOutOfDiskState`<br>
    **Description** : Ce champ correspond à l'état généré par la tâche de contrôle d'intégrité proactif de la base de données pour les problèmes de type OutOfDisk. * Écriture : * La tâche de contrôle d'intégrité proactif de la base de données pour OOD. * Lecture : * La tâche de contrôle d'intégrité proactif de la base de données.<br>
    **Valeurs autorisées** :<br>
      - `SQL_OUT_OF_DISK_STATE_UNSPECIFIED` - État non spécifié.<br>
      - `NORMAL` - L'instance a suffisamment d'espace libre sur le disque de données.<br>
      - `SOFT_SHUTDOWN` - Le disque de données est presque saturé. Un arrêt est effectué pour empêcher toute corruption des données.<br>
## `parent`
**Type** : `STRING`<br>
## `project`
**Type** : `STRING`<br>
**Nom fournisseur** : `project`<br>
**Description** : L'ID de projet contenant l'instance Cloud SQL. Le domaine Google Apps est ajouté en préfixe le cas échéant.<br>
## `project_id`
**Type** : `STRING`<br>
## `project_number`
**Type** : `STRING`<br>
## `region`
**Type** : `STRING`<br>
**Nom fournisseur** : `region`<br>
**Description** : La région géographique. Valeurs autorisées : * `us-central` (instances `FIRST_GEN` uniquement), * `us-central1` (instances `SECOND_GEN` uniquement), * `asia-east1` ou `europe-west1`. Par défaut, cette propriété est définie sur `us-central` ou `us-central1` en fonction du type d'instance. La région ne peut pas être modifiée une fois l'instance créée.<br>
## `replica_configuration`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `replicaConfiguration`<br>
**Description** : Configuration spécifique aux réplicas de failover et aux réplicas avec accès en lecture.<br>
   - `failover_target`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `failoverTarget`<br>
    **Description** : Spécifie si le réplica est la cible de failover. Si le champ est défini sur `true`, le réplica est désigné comme réplica de failover. En cas de défaillance de l'instance principale, le réplica devient la nouvelle instance principale. Un seul réplica peut être spécifié comme cible de failover, et il doit être situé dans une zone différente de celle de l'instance principale.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#replicaConfiguration`.<br>
   - `mysql_replica_configuration`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `mysqlReplicaConfiguration`<br>
    **Description** : Configuration spécifique à MySQL en cas de réplication à partir d'une instance principale MySQL sur site. Les informations de configuration de la réplication, telles que le nom d'utilisateur, le mot de passe, les certificats et les clés ne sont pas stockées dans les métadonnées de l'instance. Les informations de configuration sont uniquement utilisées pour établir la connexion de réplication et sont stockées par MySQL dans un fichier nommé `master.info` dans le répertoire de données.<br>
       - `ca_certificate`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `caCertificate`<br>
        **Description** : Représentation PEM du certificat x509 de l'autorité de certification de confiance.<br>
       - `client_certificate`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `clientCertificate`<br>
        **Description** : Représentation PEM du certificat x509 du réplica.<br>
       - `client_key`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `clientKey`<br>
        **Description** : Représentation PEM de la clé privée du réplica. La clé publique correspondante est encodée dans le certificat du client.<br>
       - `connect_retry_interval`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `connectRetryInterval`<br>
        **Description** : Temps d'attente en secondes entre les tentatives de connexion. La valeur par défaut de MySQL est de 60 secondes.<br>
       - `dump_file_path`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `dumpFilePath`<br>
        **Description** : Chemin vers le fichier dump SQL dans Google Cloud Storage à partir duquel le réplica doit être créé. L'URI est au format gs://nomBucket/nomFichier. Les fichiers gzip compressés (.gz) sont également pris en charge. Les dumps contiennent les coordonnées des logs binaires utilisées pour lancer la réplication. Pour ce faire, définissez --master-data sur 1 lorsque vous utilisez mysqldump.<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à `sql#mysqlReplicaConfiguration`.<br>
       - `master_heartbeat_period`<br>
        **Type** : `INT64`<br>
        **Nom fournisseur** : `masterHeartbeatPeriod`<br>
        **Description** : Intervalle en millisecondes entre les heartbeats de réplication.<br>
       - `password`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `password`<br>
        **Description** : Le mot de passe pour la connexion de réplication.<br>
       - `ssl_cipher`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `sslCipher`<br>
        **Description** : La liste des ciphers pouvant être utilisés pour le chiffrement SSL.<br>
       - `username`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `username`<br>
        **Description** : Le nom d'utilisateur pour la connexion de réplication.<br>
       - `verify_server_certificate`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `verifyServerCertificate`<br>
        **Description** : Détermine si la valeur Common Name de l'instance principale doit être vérifiée dans le certificat envoyé lors de la liaison SSL.<br>
## `replica_names`
**Type** : `UNORDERED_LIST_STRING`<br>
**Nom fournisseur** : `replicaNames`<br>
**Description** : Les réplicas de l'instance.<br>
## `resource_name`
**Type** : `STRING`<br>
## `root_password`
**Type** : `STRING`<br>
**Nom fournisseur** : `rootPassword`<br>
**Description** : Mot de passe root initial. À utiliser uniquement lors de la création. Vous devez définir les mots de passe root pour être en mesure de vous connecter aux instances PostgreSQL.<br>
## `satisfies_pzs`
**Type** : `BOOLEAN`<br>
**Nom fournisseur** : `satisfiesPzs`<br>
**Description** : Statut indiquant si l'instance est conforme à Pzs. Réservé pour une utilisation future.<br>
## `scheduled_maintenance`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `scheduledMaintenance`<br>
**Description** : La date de début d'une prochaine maintenance prévue pour cette instance.<br>
   - `can_defer`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `canDefer`<br>
   - `can_reschedule`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `canReschedule`<br>
    **Description** : Détermine si la maintenance prévue doit être reprogrammée.<br>
   - `schedule_deadline_time`<br>
    **Type** : `TIMESTAMP`<br>
    **Nom fournisseur** : `scheduleDeadlineTime`<br>
    **Description** : La maintenance ne peut pas être reprogrammée au-delà de cette date limite.<br>
   - `start_time`<br>
    **Type** : `TIMESTAMP`<br>
    **Nom fournisseur** : `startTime`<br>
    **Description** : La date de début d'une prochaine maintenance prévue pour cette instance.<br>
## `secondary_gce_zone`
**Type** : `STRING`<br>
**Nom fournisseur** : `secondaryGceZone`<br>
**Description** : La zone Compute Engine qui héberge actuellement l'instance de failover pour une instance régionale. Cette valeur peut être différente de la zone spécifiée lors de la création de l'instance en cas de failover de l'instance vers sa zone secondaire/de failover.<br>
## `self_link`
**Type** : `STRING`<br>
**Nom fournisseur** : `selfLink`<br>
**Description** : L'URI de cette ressource.<br>
## `server_ca_cert`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `serverCaCert`<br>
**Description** : Configuration SSL.<br>
   - `cert`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `cert`<br>
    **Description** : Représentation PEM.<br>
   - `cert_serial_number`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `certSerialNumber`<br>
    **Description** : Numéro de série extrait du certificat.<br>
   - `common_name`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `commonName`<br>
    **Description** : Nom spécifié par l'utilisateur. Doit uniquement contenir les caractères [a-zA-Z.-_ ]+.<br>
   - `create_time`<br>
    **Type** : `TIMESTAMP`<br>
    **Nom fournisseur** : `createTime`<br>
    **Description** : La date de création du certificat au format [RFC 3339](https://tools.ietf.org/html/rfc3339), par exemple : `2012-11-15T16:19:00.094Z`.<br>
   - `expiration_time`<br>
    **Type** : `TIMESTAMP`<br>
    **Nom fournisseur** : `expirationTime`<br>
    **Description** : La date d'expiration du certificat au format [RFC 3339](https://tools.ietf.org/html/rfc3339), par exemple : `2012-11-15T16:19:00.094Z`.<br>
   - `instance`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `instance`<br>
    **Description** : Nom de l'instance de base de données.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#sslCert`.<br>
   - `self_link`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `selfLink`<br>
    **Description** : L'URI de cette ressource.<br>
   - `sha1_fingerprint`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `sha1Fingerprint`<br>
    **Description** : Empreinte Sha1.<br>
## `service_account_email_address`
**Type** : `STRING`<br>
**Nom fournisseur** : `serviceAccountEmailAddress`<br>
**Description** : L'adresse e-mail du compte de service associée à l'instance. Cette propriété est en lecture seule.<br>
## `settings`
**Type** : `STRUCT`<br>
**Nom fournisseur** : `settings`<br>
**Description** : Les paramètres utilisateur.<br>
   - `activation_policy`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `activationPolicy`<br>
    **Description** : La politique d'activation spécifie à quel moment l'instance est activée. Elle s'applique uniquement lorsque l'état de l'instance correspond à RUNNABLE. Valeurs autorisées : * `ALWAYS` : L'instance est activée et doit rester activée même en cas d'absence de requêtes de connexion. * `NEVER` : L'instance est désactivée et ne doit pas être activée, même en cas de réception d'une requête de connexion. <br>
    **Valeurs autorisées** :<br>
      - `SQL_ACTIVATION_POLICY_UNSPECIFIED` - Plan d'activation inconnu.<br>
      - `ALWAYS` - L'instance est toujours opérationnelle.<br>
      - `NEVER` - L'instance ne démarre jamais.<br>
      - `ON_DEMAND` - L'instance est activée dès qu'une requête est reçue.<br>
   - `active_directory_config`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `activeDirectoryConfig`<br>
    **Description** : Configuration Active Directory, s'applique uniquement à Cloud SQL pour SQL Server.<br>
       - `domain`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `domain`<br>
        **Description** : Le nom du domaine (par exemple, mondomaine.com).<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à sql#activeDirectoryConfig.<br>
   - `advanced_machine_features`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `advancedMachineFeatures`<br>
    **Description** : Spécifie la configuration de machine avancée pour l'instance. S'applique uniquement à SQL Server.<br>
       - `threads_per_core`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `threadsPerCore`<br>
        **Description** : Le nombre de threads par cœur physique.<br>
   - `authorized_gae_applications`<br>
    **Type** : `UNORDERED_LIST_STRING`<br>
    **Nom fournisseur** : `authorizedGaeApplications`<br>
    **Description** : Les ID des applications App Engine qui peuvent accéder à cette instance. (Obsolète) S'applique uniquement aux instances de première génération.<br>
   - `availability_type`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `availabilityType`<br>
    **Description** : Type de disponibilité. Valeurs autorisées : * `ZONAL` : L'instance distribue les données depuis une seule zone. En cas de panne dans cette zone, les données risquent de ne plus être accessibles. * `REGIONAL` : L'instance peut distribuer les données depuis plusieurs zones dans une région (elle est hautement disponible). Pour en savoir plus, consultez la documentation [Présentation de la configuration de la haute disponibilité](https://cloud.google.com/sql/docs/mysql/high-availability). <br>
    **Valeurs autorisées** :<br>
      - `SQL_AVAILABILITY_TYPE_UNSPECIFIED` - Le type de disponibilité est inconnu.<br>
      - `ZONAL` - Instance avec disponibilité zonale.<br>
      - `REGIONAL` - Instance avec disponibilité régionale.<br>
   - `backup_configuration`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `backupConfiguration`<br>
    **Description** : La configuration de la sauvegarde journalière pour l'instance.<br>
       - `backup_retention_settings`<br>
        **Type** : `STRUCT`<br>
        **Nom fournisseur** : `backupRetentionSettings`<br>
        **Description** : Paramètres de rétention des sauvegardes.<br>
           - `retained_backups`<br>
            **Type** : `INT32`<br>
            **Nom fournisseur** : `retainedBackups`<br>
            **Description** : En fonction de la valeur définie pour retention_unit, cette propriété détermine si une sauvegarde doit être supprimée. Si retention_unit est défini sur COUNT, le nombre correspondant de sauvegardes sera conservé.<br>
           - `retention_unit`<br>
            **Type** : `STRING`<br>
            **Nom fournisseur** : `retentionUnit`<br>
            **Description** : L'unité représentée par retained_backups. <br>
            **Valeurs autorisées** :<br>
              - `RETENTION_UNIT_UNSPECIFIED` - L'unité de rétention des sauvegardes n'est pas spécifiée et sera considérée comme COUNT.<br>
              - `COUNT` - La rétention est définie par un nombre. Par exemple, « conserver les 7 dernières sauvegardes ».<br>
       - `binary_log_enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `binaryLogEnabled`<br>
        **Description** : (MySQL uniquement) Détermine si le log binaire est activé. Si la configuration des sauvegardes est désactivée, le log binaire doit également être désactivé.<br>
       - `enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `enabled`<br>
        **Description** : Détermine si cette configuration est activée.<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à `sql#backupConfiguration`.<br>
       - `location`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `location`<br>
        **Description** : Emplacement de la sauvegarde.<br>
       - `point_in_time_recovery_enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `pointInTimeRecoveryEnabled`<br>
        **Description** : (Postgres uniquement) Détermine si la restauration à un instant dans le passé est activée.<br>
       - `replication_log_archiving_enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `replicationLogArchivingEnabled`<br>
        **Description** : Réservé pour une utilisation future.<br>
       - `start_time`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `startTime`<br>
        **Description** : Heure de début de la sauvegarde quotidienne au format UTC 24 heures. Exemple : `HH:MM`.<br>
       - `transaction_log_retention_days`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `transactionLogRetentionDays`<br>
        **Description** : Nombre de jours de logs de transaction à conserver pour la restauration à un instant dans le passé, de 1 à 7.<br>
   - `collation`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `collation`<br>
    **Description** : Le nom de la collation de l'instance serveur.<br>
   - `connector_enforcement`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `connectorEnforcement`<br>
    **Description** : Spécifie si les connexions doivent utiliser des connecteurs Cloud SQL. Valeurs autorisées : `NOT_REQUIRED` (les instances Cloud SQL peuvent être connectées sans connecteurs Cloud SQL) et `REQUIRED` (autoriser uniquement les connexions qui utilisent des connecteurs Cloud SQL). Notez que l'option REQUIRED entraîne la désactivation de tous les réseaux autorisés existants. Si ce champ n'est pas spécifié lors de la création d'une instance, la valeur NOT_REQUIRED est utilisée. Si ce champ n'est pas spécifié lors de la mise à jour ou de l'application d'un patch à une instance existante, la valeur reste inchangée. <br>
    **Valeurs autorisées** :<br>
      - `CONNECTOR_ENFORCEMENT_UNSPECIFIED` - Impossible de déterminer si des connecteurs Cloud SQL sont requis ou non.<br>
      - `NOT_REQUIRED` - Les connecteurs Cloud SQL ne sont pas requis.<br>
      - `REQUIRED` - Toutes les connexions doivent utiliser des connecteurs Cloud SQL, y compris le proxy d'authentification Cloud SQL et les connecteurs Java, Python et Go Cloud SQL. Remarque : si cette valeur est définie, tous les réseaux autorisés existants seront désactivés.<br>
   - `crash_safe_replication_enabled`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `crashSafeReplicationEnabled`<br>
    **Description** : Configuration spécifique aux réplicas avec accès en lecture. Indique si les flags de base de données pour la réplication crash-safe sont activés. Cette propriété était uniquement applicable aux instances de première génération.<br>
   - `data_disk_size_gb`<br>
    **Type** : `INT64`<br>
    **Nom fournisseur** : `dataDiskSizeGb`<br>
    **Description** : La taille du disque de données, en Go. Le taille minimum est de 10 Go.<br>
   - `data_disk_type`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `dataDiskType`<br>
    **Description** : Le type de disque de données : `PD_SSD` (par défaut) ou `PD_HDD`. Non applicable aux instances de première génération. <br>
    **Valeurs autorisées** :<br>
      - `SQL_DATA_DISK_TYPE_UNSPECIFIED` - Le type de disque de données est inconnu.<br>
      - `PD_SSD` - Disque de données SSD.<br>
      - `PD_HDD` - Disque de données HDD.<br>
      - `OBSOLETE_LOCAL_SSD` - Ce champ est obsolète et sera supprimé dans une prochaine version de l'API.<br>
   - `database_flags`<br>
    **Type** : `UNORDERED_LIST_STRUCT`<br>
    **Nom fournisseur** : `databaseFlags`<br>
    **Description** : Les flags de base de données passés à l'instance au démarrage.<br>
       - `name`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `name`<br>
        **Description** : Le nom du flag. Ces flags sont passés au démarrage de l'instance, vous devez donc inclure les options serveur et les variables système. Les flags sont spécifiés avec des underscores et non des tirets. Pour en savoir plus, consultez [Configurer les flags de base de données](https://cloud.google.com/sql/docs/mysql/flags) dans la documentation Cloud SQL.<br>
       - `value`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `value`<br>
        **Description** : La valeur du flag. Les flags booléens sont définis sur `on` pour true et `off` pour false. Ce champ doit être omis si le flag n'accepte pas de valeur.<br>
   - `database_replication_enabled`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `databaseReplicationEnabled`<br>
    **Description** : Configuration spécifique aux réplicas avec accès en lecture. Détermine si la réplication est activée ou non. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
   - `deletion_protection_enabled`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `deletionProtectionEnabled`<br>
    **Description** : Configuration pour empêcher la suppression accidentelle d'une instance.<br>
   - `deny_maintenance_periods`<br>
    **Type** : `UNORDERED_LIST_STRUCT`<br>
    **Nom fournisseur** : `denyMaintenancePeriods`<br>
    **Description** : Périodes de refus des maintenances.<br>
       - `end_date`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `endDate`<br>
        **Description** : La date de fin de la période de refus des maintenances. Si l'année de la date de fin est vide, l'année de la date de début doit l'être elle aussi. Si l'année est vide, la période de refus des maintenances s'appliquera chaque année. La date doit être au format aaaa-mm-jj (par exemple 2020-11-01) ou au format mm-jj (par exemple 11-01).<br>
       - `start_date`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `startDate`<br>
        **Description** : La date de début de la période de refus des maintenances. Si l'année de la date de début est vide, l'année de la date de fin doit l'être elle aussi. Si l'année est vide, la période de refus des maintenances s'appliquera chaque année. La date doit être au format aaaa-mm-jj (par exemple 2020-11-01) ou au format mm-jj (par exemple 11-01).<br>
       - `time`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `time`<br>
        **Description** : Heure au fuseau horaire UTC à laquelle la période de refus des maintenances commence à la start_date spécifiée et se termine à la end_date spécifiée. L'heure doit être au format HH:mm:SS. Exemple : 00:00:00.<br>
   - `insights_config`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `insightsConfig`<br>
    **Description** : Configuration des insights. Concerne uniquement Postgres pour le moment.<br>
       - `query_insights_enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `queryInsightsEnabled`<br>
        **Description** : Détermine si la fonctionnalité Insights sur les requêtes est activée ou non.<br>
       - `query_plans_per_minute`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `queryPlansPerMinute`<br>
        **Description** : Nombre de plans d'exécution de requête capturés par Insights par minute pour toutes les requêtes combinées. Valeur par défaut : 5.<br>
       - `query_string_length`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `queryStringLength`<br>
        **Description** : Longueur maximale des requêtes en octets. Valeur par défaut : 1024 octets. Plage : 256-4500 octets. Si la longueur d'une requête dépasse la valeur de ce champ, elle est alors tronquée à la valeur spécifiée. Si cette propriété n'est pas définie, la valeur par défaut est utilisée. La modification de la longueur de requête entraînera le redémarrage de la base de données.<br>
       - `record_application_tags`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `recordApplicationTags`<br>
        **Description** : Détermine si la fonctionnalité Insights sur les requêtes doit enregistrer les tags d'application à partir de la requête.<br>
       - `record_client_address`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `recordClientAddress`<br>
        **Description** : Détermine si la fonctionnalité Insights sur les requêtes doit enregistrer l'adresse du client.<br>
   - `ip_configuration`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `ipConfiguration`<br>
    **Description** : Les paramètres de gestion de l'IP. Permet d'activer ou de désactiver l'IP de l'instance et de gérer les réseaux externes autorisés à se connecter à l'instance. L'adresse IPv4 ne peut pas être désactivée pour les instances de deuxième génération.<br>
       - `allocated_ip_range`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `allocatedIpRange`<br>
        **Description** : Le nom de la plage d'IP allouée pour l'instance Cloud SQL à IP privée. Exemple : google-managed-services-default. Si cette propriété est définie, l'IP de l'instance sera créée dans la plage allouée. Le nom de la plage doit répondre aux critères [RFC 1035](https://tools.ietf.org/html/rfc1035) Plus précisément, le nom doit comporter entre 1 et 63 caractères et respecter l'expression régulière `[a-z]([-a-z0-9]*[a-z0-9])?.`<br>
       - `authorized_networks`<br>
        **Type** : `UNORDERED_LIST_STRUCT`<br>
        **Nom fournisseur** : `authorizedNetworks`<br>
        **Description** : La liste des réseaux externes autorisés à se connecter à l'instance via l'IP. La syntaxe CIDR (avec barre oblique) doit être utilisée. Exemple : `157.197.200.0/24`.<br>
           - `expiration_time`<br>
            **Type** : `TIMESTAMP`<br>
            **Nom fournisseur** : `expirationTime`<br>
            **Description** : La date d'expiration de cette entrée du contrôle des accès au format [RFC 3339](https://tools.ietf.org/html/rfc3339), par exemple : `2012-11-15T16:19:00.094Z`.<br>
           - `kind`<br>
            **Type** : `STRING`<br>
            **Nom fournisseur** : `kind`<br>
            **Description** : Correspond toujours à `sql#aclEntry`.<br>
           - `name`<br>
            **Type** : `STRING`<br>
            **Nom fournisseur** : `name`<br>
            **Description** : Facultatif. Une étiquette utilisée pour identifier cette entrée.<br>
           - `value`<br>
            **Type** : `STRING`<br>
            **Nom fournisseur** : `value`<br>
            **Description** : La valeur mise sur liste d'autorisation pour le contrôle des accès.<br>
       - `enable_private_path_for_google_cloud_services`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `enablePrivatePathForGoogleCloudServices`<br>
        **Description** : Permet de contrôler la connectivité aux instances à IP privée des services Google, tels que BigQuery.<br>
       - `ipv4_enabled`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `ipv4Enabled`<br>
        **Description** : Détermine si une adresse IP publique est allouée à l'instance ou non.<br>
       - `private_network`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `privateNetwork`<br>
        **Description** : Le lien de ressource pour le réseau VPC à partir duquel l'instance Cloud SQL est accessible pour l'IP privée. Exemple : `/projects/myProject/global/networks/default`. Ce paramètre peut être mis à jour, mais il ne peut pas être supprimé une fois défini.<br>
       - `require_ssl`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `requireSsl`<br>
        **Description** : Détermine si le chiffrement SSL doit être exigé sur l'IP ou non.<br>
   - `kind`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `kind`<br>
    **Description** : Correspond toujours à `sql#settings`.<br>
   - `location_preference`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `locationPreference`<br>
    **Description** : Préférences relatives aux emplacements. Permet à l'instance d'être située le plus près possible d'une application App Engine ou d'une zone Compute Engine pour des performances optimales. Le placement au même endroit que l'application App Engine était uniquement applicable aux instances de première génération.<br>
       - `follow_gae_application`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `followGaeApplication`<br>
        **Description** : L'application App Engine à suivre. Doit être dans la même région que l'instance Cloud SQL. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à `sql#locationPreference`.<br>
       - `secondary_zone`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `secondaryZone`<br>
        **Description** : La zone Compute Engine à utiliser de préférence comme zone secondaire/de failover (exemple : us-central1-a, us-central1-b, etc.).<br>
       - `zone`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `zone`<br>
        **Description** : La zone Compute Engine à utiliser de préférence (exemple : us-central1-a, us-central1-b, etc.). AVERTISSEMENT : La modification de ce paramètre peut entraîner le redémarrage de l'instance.<br>
   - `maintenance_window`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `maintenanceWindow`<br>
    **Description** : La fenêtre de maintenance pour cette instance. Indique à quel moment l'instance peut être redémarrée à des fins de maintenance.<br>
       - `day`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `day`<br>
        **Description** : Jour de la semaine (de 1 à 7), le premier jour étant le lundi.<br>
       - `hour`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `hour`<br>
        **Description** : Heure de la journée, de 0 à 23.<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à `sql#maintenanceWindow`.<br>
       - `update_track`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `updateTrack`<br>
        **Description** : Paramètre de planification des maintenances : `canary` (à l'avance) ou `stable` (plus tard). [En savoir plus](https://cloud.google.com/sql/docs/mysql/instance-settings#maintenance-timing-2ndgen). <br>
        **Valeurs autorisées** :<br>
          - `SQL_UPDATE_TRACK_UNSPECIFIED` - Le paramètre de planification des maintenances est inconnu.<br>
          - `canary` - Pour les mises à jour de l'instance qui nécessitent un redémarrage, cette option indique qu'il est préférable de redémarrer l'instance au début de la fenêtre de maintenance afin de passer à la nouvelle version.<br>
          - `stable` - Pour les mises à jour de l'instance qui nécessitent un redémarrage, cette option indique qu'il est préférable de laisser Cloud SQL choisir quand procéder au redémarrage (dans la fenêtre de maintenance définie, le cas échéant).<br>
   - `password_validation_policy`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `passwordValidationPolicy`<br>
    **Description** : La politique de validation du mot de passe de l'utilisateur local de l'instance.<br>
       - `complexity`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `complexity`<br>
        **Description** : La complexité du mot de passe. <br>
        **Valeurs autorisées** :<br>
          - `COMPLEXITY_UNSPECIFIED` - Aucune vérification de la complexité n'est spécifiée.<br>
          - `COMPLEXITY_DEFAULT` - Une combinaison de caractères minuscules, majuscules, numériques et non alphanumériques.<br>
       - `disallow_username_substring`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `disallowUsernameSubstring`<br>
        **Description** : Permet d'empêcher le mot de passe de contenir le nom d'utilisateur.<br>
       - `enable_password_policy`<br>
        **Type** : `BOOLEAN`<br>
        **Nom fournisseur** : `enablePasswordPolicy`<br>
        **Description** : Détermine si la politique relative aux mots de passe est activée ou non.<br>
       - `min_length`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `minLength`<br>
        **Description** : Le nombre minimum de caractères autorisés.<br>
       - `password_change_interval`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `passwordChangeInterval`<br>
        **Description** : Intervalle minimum après lequel le mot de passe peut être modifié. Ce flag est uniquement compatible avec PostgreSQL.<br>
       - `reuse_interval`<br>
        **Type** : `INT32`<br>
        **Nom fournisseur** : `reuseInterval`<br>
        **Description** : Nombre de mots de passe précédents ne pouvant pas être réutilisés.<br>
   - `pricing_plan`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `pricingPlan`<br>
    **Description** : Le mode de facturation pour cette instance. Peut être défini sur `PER_USE` ou `PACKAGE`. Seule l'option `PER_USE` est prise en charge pour les instances de deuxième génération. <br>
    **Valeurs autorisées** :<br>
      - `SQL_PRICING_PLAN_UNSPECIFIED` - Mode de facturation inconnu pour cette instance.<br>
      - `PACKAGE` - L'instance est facturée à un tarif fixe mensuel.<br>
      - `PER_USE` - L'instance est facturée par nombre d'utilisations.<br>
   - `replication_type`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `replicationType`<br>
    **Description** : Le type de réplication utilisé par cette. Peut être défini sur `ASYNCHRONOUS` ou `SYNCHRONOUS`. (Obsolète) Cette propriété était uniquement applicable aux instances de première génération. <br>
    **Valeurs autorisées** :<br>
      - `SQL_REPLICATION_TYPE_UNSPECIFIED` - Type de réplication inconnu pour une instance Cloud SQL.<br>
      - `SYNCHRONOUS` - Mode de réplication synchrone pour les instances de première génération. Il s'agit de la valeur par défaut.<br>
      - `ASYNCHRONOUS` - Mode de réplication asynchrone pour les instances de première génération. Offre un léger gain de performance, mais en cas de défaillance alors que cette option est définie sur asynchrone, vous risquez de perdre plusieurs secondes de mise à jour de vos données.<br>
   - `settings_version`<br>
    **Type** : `INT64`<br>
    **Nom fournisseur** : `settingsVersion`<br>
    **Description** : La version des paramètres de l'instance. Ce champ est obligatoire s'assurer que les mises à jour simultanées sont traitées correctement. Pendant une mise à jour, utilisez la valeur settingsVersion la plus récente pour cette instance et n'essayez pas de mettre à jour cette valeur.<br>
   - `sql_server_audit_config`<br>
    **Type** : `STRUCT`<br>
    **Nom fournisseur** : `sqlServerAuditConfig`<br>
    **Description** : Configuration d'audit spécifique à SQL Server.<br>
       - `bucket`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `bucket`<br>
        **Description** : Le nom du bucket de destination (exemple : gs://monbucket).<br>
       - `kind`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `kind`<br>
        **Description** : Correspond toujours à sql#sqlServerAuditConfig<br>
       - `retention_interval`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `retentionInterval`<br>
        **Description** : Durée pendant laquelle les fichiers d'audit générés doivent être conservés.<br>
       - `upload_interval`<br>
        **Type** : `STRING`<br>
        **Nom fournisseur** : `uploadInterval`<br>
        **Description** : Fréquence de transmission des fichiers d'audit générés.<br>
   - `storage_auto_resize`<br>
    **Type** : `BOOLEAN`<br>
    **Nom fournisseur** : `storageAutoResize`<br>
    **Description** : Permet d'activer ou de désactiver l'augmentation automatique de la taille du stockage. Valeur par défaut : true.<br>
   - `storage_auto_resize_limit`<br>
    **Type** : `INT64`<br>
    **Nom fournisseur** : `storageAutoResizeLimit`<br>
    **Description** : La taille maximale jusqu'à laquelle la capacité de stockage peut être automatiquement augmentée. La valeur par défaut 0, ce qui correspond à aucune limite.<br>
   - `tier`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `tier`<br>
    **Description** : Le niveau (ou type de machine) pour cette instance, par exemple : `db-custom-1-3840`. AVERTISSEMENT : La modification de cette propriété entraînera le redémarrage de l'instance.<br>
   - `time_zone`<br>
    **Type** : `STRING`<br>
    **Nom fournisseur** : `timeZone`<br>
    **Description** : Fuseau horaire du serveur, s'applique uniquement à Cloud SQL pour SQL Server.<br>
   - `user_labels`<br>
    **Type** : `UNORDERED_LIST_STRING`<br>
    **Nom fournisseur** : `userLabels`<br>
    **Description** : Étiquettes spécifiées par l'utilisateur, représentées sous la forme d'un dictionnaire où chaque étiquette est une paire key/value unique.<br>
## `state`
**Type** : `STRING`<br>
**Nom fournisseur** : `state`<br>
**Description** : L'état actuel de l'instance Cloud SQL. <br>
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
**Nom fournisseur** : `suspensionReason`<br>
**Description** : Si l'état de l'instance est SUSPENDED, indique le motif de la suspension.<br>
## `tags`
**Type** : `UNORDERED_LIST_STRING`<br>