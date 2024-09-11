---
app_id: sap-hana
app_uuid: 53d66afa-de92-4f09-9514-778324f38f5c
assets:
  dashboards:
    SAP HANA Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: sap_hana.uptime
      metadata_path: metadata.csv
      prefix: sap_hana.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: SAP HANA
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- sap
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/sap_hana/README.md
display_on_public_website: true
draft: false
git_integration_title: sap_hana
integration_id: sap-hana
integration_title: SAP HANA
integration_version: 2.2.1
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: sap_hana
public_title: SAP HANA
short_description: Surveillez les métriques relatives à la mémoire, au réseau, aux
  volumes et à d'autres éléments de votre système SAP HANA.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Store
  - Category::SAP
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Surveillez les métriques relatives à la mémoire, au réseau, aux volumes
    et à d'autres éléments de votre système SAP HANA.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: SAP HANA
---



## Présentation

Ce check permet de surveiller [SAP HANA][1] 2.0 SPS 2 avec l'Agent Datadog.

## Implémentation

### Installation

Le check SAP HANA est inclus avec le package de l'[Agent Datadog][2]. Pour utiliser cette intégration, vous devez installer manuellement la bibliothèque [hdbcli][3].


Pour Unix :

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install hdbcli==2.10.15
```

Pour Windows :

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<VERSION_MAJEURE_PYTHON>\python.exe" -m pip install hdbcli==2.10.15
```

#### Préparer HANA

Pour interroger certaines vues, vous devez accorder des autorisations spécifiques à l'utilisateur de surveillance HANA de votre choix. Pour en savoir plus, consultez la section [Accorder des autorisations](#accorder-des-autorisations).

Pour découvrir comment configurer le numéro de port pour les bases de données locataire, multi-locataires et système HANA, consultez la [section de la documentation SAP relative aux connexions][4] (en anglais).

##### Création des utilisateurs

1. Pour créer un utilisateur, connectez-vous à la base de données système et exécutez la commande suivante :

   ```shell
   CREATE RESTRICTED USER <USER> PASSWORD <PASSWORD>;
   ```

2. Exécutez la commande suivante pour autoriser l'utilisateur à se connecter au système :

   ```shell
   ALTER USER <USER> ENABLE CLIENT CONNECT;
   ```

3. (facultatif) Pour éviter toute interruption de service, vous pouvez définir un mot de passe à long terme :

   ```shell
   ALTER USER <USER> DISABLE PASSWORD LIFETIME;
   ```

##### Accorder des autorisations

1. Exécutez la commande suivante pour créer un rôle de surveillance (du nom de `DD_MONITOR` pour les exemples ci-dessous) :

   ```shell
   CREATE ROLE DD_MONITOR;
   ```

2. Exécutez la commande suivante pour accorder un accès en lecture seule à l'ensemble des vues système :

   ```shell
   GRANT CATALOG READ TO DD_MONITOR;
   ```

3. Exécutez les commandes suivantes afin d'accorder certaines autorisations pour chaque vue du système :

   ```shell
   GRANT SELECT ON SYS.M_DATABASE TO DD_MONITOR;
   GRANT SELECT ON SYS.M_DATABASES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_BACKUP_PROGRESS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_CONNECTIONS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_DISK_USAGE TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_LICENSES TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_RS_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_COMPONENT_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_MEMORY TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_SERVICE_STATISTICS TO DD_MONITOR;
   GRANT SELECT ON SYS_DATABASES.M_VOLUME_IO_TOTAL_STATISTICS TO DD_MONITOR;
   ```

4. Enfin, exécutez la commande suivante pour attribuer le rôle de surveillance à l'utilisateur de votre choix :

   ```shell
   GRANT DD_MONITOR TO <USER>;
   ```

### Configuration

1. Modifiez le fichier `sap_hana.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance sap_hana. Consultez le [fichier d'exemple sap_hana.d/conf.yaml][5] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][6].

### Validation

Lancez la [sous-commande status de l'Agent][7] et cherchez `sap_hana` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "sap_hana" >}}


### Événements

SAP HANA n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "sap_hana" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][10].


[1]: https://www.sap.com/products/hana.html
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://pypi.org/project/hdbcli/
[4]: https://help.sap.com/viewer/0eec0d68141541d1b07893a39944924e/2.0.02/en-US/d12c86af7cb442d1b9f8520e2aba7758.html
[5]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/datadog_checks/sap_hana/data/conf.yaml.example
[6]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-restart-the-agent
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/sap_hana/assets/service_checks.json
[10]: https://docs.datadoghq.com/fr/help/