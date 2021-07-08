---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    VoltDB - Overview: assets/dashboards/voltdb_overview.json
  logs:
    source: voltdb
  metrics_metadata: metadata.csv
  monitors:
    CPU load: assets/monitors/cpu_load.json
  saved_views:
    voltdb_processes: assets/saved_views/voltdb_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/voltdb/README.md'
display_name: VoltDB
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitor-voltdb-with-datadog/'
    tag: Blog
    text: Surveiller VoltDB avec Datadog
git_integration_title: voltdb
guid: 15abd7c6-1845-405a-8627-f83be1e48b11
integration_id: voltdb
integration_title: VoltDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: voltdb.
metric_to_check: voltdb.cpu.percent_used
name: voltdb
process_signatures:
  - voltdb
public_title: VoltDB
short_description: 'Recueillez des métriques de statut, des métriques de performance et d''autres métriques à partir d''un cluster VoltDB.'
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check permet de surveiller [VoltDB][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

**Remarque** : ce check doit uniquement être configuré sur un Agent par cluster. Si vous surveillez un cluster réparti sur plusieurs hosts, vous pouvez installer un Agent sur chaque host. Toutefois, activez uniquement l'intégration VoltDB sur un seul host, sans quoi vos métriques seront dupliquées.

### Installation

Le check VoltDB est inclus avec le package de l'[Agent Datadog][2].
Vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

1. Ajoutez un utilisateur `datadog-agent`. Pour ce faire, vous pouvez modifier votre fichier `deployment.xml` VoltDB. Veuillez noter qu'aucun rôle spécifique n'est requis : vous pouvez donc attribuer le rôle `user` intégré.

    ```xml
    <users>
        <!-- ... -->
        <user name="datadog-agent" password="<PASSWORD>" roles="user" />
    </users>
    ```

2. Modifiez le fichier `voltdb.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance VoltDB. Consultez le [fichier d'exemple voltdb.d/conf.yaml][3] pour découvrir toutes les options de configuration disponibles.

    ```yaml
    init_config:

    instances:
      - url: http://localhost:8080
        username: datadog-agent
        password: "<PASSWORD>"
    ```

3. [Redémarrez l'Agent][4].

#### Prise en charge de TLS

Si la technologie [TLS/SSL][5] est activée sur le port HTTP du client :

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

3. [Redémarrez l'Agent][4].

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

  Modifiez la valeur de `path` en fonction de votre environnement. Consultez le [fichier d'exemple `voltdb.d/conf.yaml`][3] pour découvrir toutes les options de configuration disponibles.

  3. [Redémarrez l'Agent][4].

  Consultez la [documentation de Datadog][6] pour découvrir comment configurer l'Agent afin de recueillir les logs dans un environnement Kubernetes.

### Validation

[Lancez la sous-commande status de l'Agent][7] et cherchez `voltdb` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "voltdb" >}}


### Checks de service

**voltdb.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à atteindre l'URL VoltDB configurée. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Ce check n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][9].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://voltdb.com
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/voltdb/datadog_checks/voltdb/data/conf.yaml.example
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.voltdb.com/UsingVoltDB/SecuritySSL.php
[6]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/voltdb/metadata.csv
[9]: https://docs.datadoghq.com/fr/help/