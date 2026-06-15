---
app_id: proxysql
app_uuid: aadfa11b-3de5-4827-9cdd-888c4e9587d0
assets:
  dashboards:
    ProxySQL Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: proxysql.active_transactions
      metadata_path: metadata.csv
      prefix: proxysql.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: ProxySQL
  logs:
    source: proxysql
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data store
- log collection
- caching
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/proxysql/README.md
display_on_public_website: true
draft: false
git_integration_title: proxysql
integration_id: proxysql
integration_title: ProxySQL
integration_version: 4.0.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: proxysql
public_title: ProxySQL
short_description: Recueillez vos métriques et logs ProxySQL.
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
  - Category::Caching
  configuration: README.md#Setup
  description: Recueillez vos métriques et logs ProxySQL.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: ProxySQL
---



## Présentation

Ce check permet de surveiller [ProxySQL][1] avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

L'intégration ProxySQL est incluse avec le package de l'[Agent Datadog][3] : vous n'avez donc rien d'autre à installer sur votre serveur.

### Configuration

#### Activation de l'authentification SSL
Pour exiger une validation SSL/TLS complète lors de la connexion à ProxySQL, activez l'option `tls_verify` dans `conf.yaml`. Spécifiez les certificats et mots de passe requis pour la connexion via SSL/TLS.

```yaml
    tls_verify: true
    tls_ca_cert: ca_cert.pem
```

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Pour configurer ce check lorsque l'Agent est exécuté sur un host :

1. Modifiez le fichier `proxysql.d/conf.yaml` dans le dossier `conf.d/` à la racine du [répertoire de configuration de votre Agent][1] pour commencer à recueillir vos données de performance ProxySQL. Consultez le [fichier d'exemple proxysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

##### Collecte de logs

1. La collecte de logs est désactivée par défaut dans l'Agent Datadog. Vous devez l'activer dans `datadog.yaml` :

   ```yaml
   logs_enabled: true
   ```

2. Ajoutez les fichiers de logs qui vous intéressent à votre fichier `proxysql.d/conf.yaml` pour commencer à recueillir vos logs ProxySQL :

   ```yaml
     logs:
         # Default logging file
       - type: file
         path: /var/log/proxysql.log
         source: proxysql
         service: "<SERVICE_NAME>"
         # Logged queries, file needs to be in JSON
         # https://github.com/sysown/proxysql/wiki/Query-Logging
       - type: file
         path: "<QUERY_LOGGING_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
         # Audit log
         # https://github.com/sysown/proxysql/wiki/Audit-log
       - type: file
         path: "<AUDIT_LOG_FILE_PATH>"
         source: proxysql
         service: "<SERVICE_NAME>"
   ```

    Modifiez les valeurs des paramètres `path` et `service` et configurez-les pour votre environnement. Consultez le [fichier d'exemple proxysql.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

3. [Redémarrez l'Agent][3].

[1]: https://docs.datadoghq.com/fr/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/proxysql/datadog_checks/proxysql/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Environnement conteneurisé" %}}

#### Environnement conteneurisé

Consultez la [documentation relative aux modèles d'intégration Autodiscovery][1] pour découvrir comment appliquer les paramètres ci-dessous à un environnement conteneurisé.

#### Collecte de métriques

| Paramètre            | Valeur                                                      |
|----------------------|------------------------------------------------------------|
| `<NOM_INTÉGRATION>` | `proxysql`                                                   |
| `<CONFIG_INIT>`      | vide ou `{}`                                              |
| `<CONFIG_INSTANCE>`  | `{"host": "%%host%%", "port": "%%port%%", "username": "<UTILISATEUR>", "password": "<MOTDEPASSE>"}`       |

##### Collecte de logs

La collecte des logs est désactivée par défaut dans l'Agent Datadog. Pour l'activer, consultez la section [Collecte de logs Kubernetes][2].

| Paramètre      | Valeur                                     |
|----------------|-------------------------------------------|
| `<CONFIG_LOG>` | `{"source": "proxysql", "service": "<NOM_SERVICE>"}` |

[1]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validation

[Lancez la sous-commande status de l'Agent][4] et cherchez `proxysql` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "proxysql" >}}


### Événements

Le check ProxySQL n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "proxysql" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].



[1]: https://proxysql.com/
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/fr/help