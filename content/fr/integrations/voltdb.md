---
app_id: voltdb
app_uuid: 4ea56824-28da-4beb-8937-c45ef32fdb7f
assets:
  dashboards:
    VoltDB - Overview: assets/dashboards/voltdb_overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: voltdb.cpu.percent_used
      metadata_path: metadata.csv
      prefix: voltdb.
    process_signatures:
    - voltdb
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: VoltDB
  logs:
    source: voltdb
  monitors:
    CPU load: assets/monitors/cpu_load.json
  saved_views:
    voltdb_processes: assets/saved_views/voltdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md
display_on_public_website: true
draft: false
git_integration_title: voltdb
integration_id: voltdb
integration_title: VoltDB
integration_version: 2.1.2
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: voltdb
public_title: VoltDB
short_description: Recueillez des métriques de statut, des métriques de performance
  et d'autres métriques à partir d'un cluster VoltDB.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Store
  - Category::Log Collection
  configuration: README.md#Setup
  description: Recueillez des métriques de statut, des métriques de performance et
    d'autres métriques à partir d'un cluster VoltDB.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: VoltDB
---



## Présentation

Ce check permet de surveiller [VoltDB][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

**Remarque** : ce check doit uniquement être configuré sur un Agent par cluster. Si vous surveillez un cluster réparti sur plusieurs hosts, installez un Agent sur chaque host. Toutefois, activez uniquement l'intégration VoltDB sur un seul host, sans quoi vos métriques seront dupliquées.

### Installation

Le check VoltDB est inclus avec le package de l'[Agent Datadog][3].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Ajoutez un utilisateur `datadog-agent`. Pour ce faire, vous pouvez modifier votre fichier `deployment.xml` VoltDB. **Remarque** : aucun rôle spécifique n'est requis. Vous pouvez donc attribuer le rôle `user` intégré.

    ```xml
    <users>
        <!-- ... -->
        <user name="datadog-agent" password="<PASSWORD>" roles="user" />
    </users>
    ```

2. Modifiez le fichier `voltdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance VoltDB. Consultez le [fichier d'exemple voltdb.d/conf.yaml][4] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
      - url: http://localhost:8080
        username: datadog-agent
        password: "<PASSWORD>"
    ```

3. [Redémarrez l'Agent][5].

#### Prise en charge de TLS

Si la technologie [TLS/SSL][6] est activée sur le port HTTP du client :

1. Exportez le fichier de l'autorité de certification de votre certificat au format PEM :

    ```bash
    keytool -exportcert -file /path/to/voltdb-ca.pem -keystore <KEYSTORE> -storepass <PASSWORD> -alias voltdb -rfc
    ```

1. Exportez votre certificat au format PEM :

    ```bash
    openssl pkcs12 -nodes -in <KEYSTORE> -out /path/to/voltdb.pem -password pass:<PASSWORD>
    ```

    Le fichier obtenu contient la clé privée _non chiffrée_ et le certificat :

    ```
    -----BEGIN PRIVATE KEY-----
    <Private key contents...>
    -----END PRIVATE KEY-----
    -----BEGIN CERTIFICATE-----
    <Certificate contents...>
    -----END CERTIFICATE-----
    ```

2. Dans la configuration de votre instance, pointez `url` vers l'endpoint client prenant en charge TLS et définissez les options `tls_cert` et `tls_ca_cert`. Exemple :

    ```yaml
    instances:
    - # ...
      url: https://localhost:8443
      tls_cert: /path/to/voltdb.pem
      tls_ca_cert: /path/to/voltdb-ca.pem
    ```

3. [Redémarrez l'Agent][5].

#### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

    ```yaml
    logs_enabled: true
    ```

2. Ajoutez ce bloc de configuration à votre fichier `voltdb.d/conf.yaml` pour commencer à recueillir vos logs VoltDB :

    ```yaml
    logs:
      - type: file
        path: /var/log/voltdb.log
        source: voltdb
    ```

  Modifiez la valeur de `path` en fonction de votre environnement. Consultez le [fichier d'exemple `voltdb.d/conf.yaml`][4] pour découvrir toutes les options de configuration disponibles.

  3. [Redémarrez l'Agent][5].

  Pour activer les logs pour les environnements Kubernetes, consultez la section [Collecte de logs Kubernetes][7].

### Validation

[Lancez la sous-commande status de l'Agent][8] et cherchez `voltdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "voltdb" >}}


### Événements

Ce check n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "voltdb" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[7]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/voltdb/assets/service_checks.json
[11]: https://docs.datadoghq.com/fr/help/