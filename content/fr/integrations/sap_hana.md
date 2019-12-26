---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md'
display_name: SAP HANA
git_integration_title: sap_hana
guid: 85dace7c-baf5-4bcc-9fbb-4d3a6b841359
integration_id: sap-hana
integration_title: SAP HANA
is_public: false
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: sap_hana.
metric_to_check: sap_hana.connection.active
name: sap_hana
public_title: Intégration Datadog/SAP HANA
short_description: 'Surveillez les métriques relatives à la mémoire, au réseau, aux volumes et à d''autres éléments de votre système SAP HANA.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [SAP HANA][1] avec l'Agent Datadog.

## Implémentation

### Installation

Le check SAP HANA est inclus avec le paquet de l'[Agent Datadog][2].

#### Préparer HANA

Pour interroger certaines vues, vous devez accorder des autorisations spécifiques à l'utilisateur de surveillance HANA de votre choix. Pour en savoir plus, consultez la section [Accorder des autorisations](#accorder-des-autorisations).

##### Créer l'utilisateur

1. Pour créer un utilisateur, connectez-vous à la base de données système et exécutez la commande suivante :

    ```
    CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>
    ```

2. Exécutez la commande suivante pour autoriser l'utilisateur à se connecter au système :

    ```
    ALTER USER <USER> ENABLE CLIENT CONNECT
    ```

3. (facultatif) Pour éviter toute interruption de service, vous pouvez définir un mot de passe à long terme :

    ```
    ALTER USER <USER> DISABLE PASSWORD LIFETIME
    ```

##### Accorder des autorisations

1. Exécute la commande suivante pour créer un rôle de surveillance (du nom de `DD_MONITOR` pour les exemples ci-dessous) :

    ```
    CREATE ROLE DD_MONITOR
    ```

2. Exécutez la commande suivante pour accorder un accès en lecture seule à l'ensemble des vues système :

    ```
    GRANT CATALOG READ TO DD_MONITOR
    ```

3. Exécutez les commandes suivantes afin d'accorder certaines autorisations pour chaque vue du système :

    ```
    GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR
    GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR
    GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR
    ```

4. Enfin, exécutez la commande suivante pour attribuer le rôle de surveillance à l'utilisateur de votre choix :

    ```
    GRANT DD_MONITOR TO <USER>
    ```

### Configuration

1. Modifiez le fichier `sap_hana.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance sap_hana. Consultez le [fichier d'exemple sap_hana.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `sap_hana` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "sap_hana" >}}


### Checks de service

**sap_hana.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'instance SAP HANA qu'il surveille. Si ce n'est pas le cas, renvoie `OK`.

**sap_hana.status** :<br>
Renvoie `OK` si la base de données SAP HANA surveillée est disponible. Si ce n'est pas le cas, renvoie `CRITICAL`.

### Événements

SAP HANA n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://www.sap.com/products/hana.html
[2]: https://docs.datadoghq.com/fr/agent
[3]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[7]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}